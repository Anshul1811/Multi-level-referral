import { Earning, User, sequelize } from '../models/index.js';

export const UserProfitReport = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ message: 'user_id is required' });

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const earnings = await Earning.findAll({
      where: { user_id },
      order: [['created_at', 'DESC']]
    });

    const [totals] = await Earning.findAll({
      where: {
        user_id,
        action: 'credit'
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.literal(`CASE WHEN type = 'L1 referral' THEN amount ELSE 0 END`)), 'level1_earnings'],
        [sequelize.fn('SUM', sequelize.literal(`CASE WHEN type = 'L2 referral' THEN amount ELSE 0 END`)), 'level2_earnings'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'total_earned']
      ],
      raw: true
    });

    res.json({
      user_id,
      total_earned: parseFloat(totals.total_earned || 0),
      level1_earnings: parseFloat(totals.level1_earnings || 0),
      level2_earnings: parseFloat(totals.level2_earnings || 0),
      transactions: earnings.map(e => ({
        amount: e.amount,
        type: e.type,
        action: e.action,
        created_at: e.created_at
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const UserReferralAnalytics = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ message: 'user_id is required' });

  try {
    const user = await sequelize.query(
    `SELECT referral_code FROM users WHERE user_id = :userId`,
    {
      replacements: { userId : user_id },
      type: sequelize.QueryTypes.SELECT
    }
  );
  
  if (!user.length) return res.status(404).json({ message: 'User not found' });
  
  const referralCode = user[0].referral_code;
  
  const referrals = await sequelize.query(`
    WITH RECURSIVE referral_tree AS (
      SELECT user_id, name, email, referral_code, referred_by, 1 AS level
      FROM users
      WHERE referred_by = :refCode
  
      UNION ALL
  
      SELECT u.user_id, u.name, u.email, u.referral_code, u.referred_by, rt.level + 1
      FROM users u
      JOIN referral_tree rt ON u.referred_by = rt.referral_code
      WHERE rt.level < 2
    )
    SELECT * FROM referral_tree
    ORDER BY level, user_id;
  `, {
    replacements: { refCode: referralCode },
    type: sequelize.QueryTypes.SELECT
  });
  

    const level1 = referrals.filter(r => r.level === 1);
    const level2 = referrals.filter(r => r.level === 2);

    const result = level1.map(l1User => {
      return {
        user_id: l1User.user_id,
        name: l1User.name,
        email: l1User.email,
        level2_referrals: level2
          .filter(l2User => l2User.referred_by === l1User.referral_code)
          .map(l2User => ({
            user_id: l2User.user_id,
            name: l2User.name,
            email: l2User.email
          }))
      };
    });

    res.json({
      user_id,
      direct_referrals: result
    });
  } catch (err) {
    console.error('Referral Analytics Error:', err);
    res.status(500).json({ error: err.message });
  }
};
