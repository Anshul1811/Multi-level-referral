import { Earning, User } from '../models/index.js';
import { notifyAll } from '../utils/sseClients.js';

export const handlePurchase = async (req, res) => {
  const { user_id, amount, level1_referral, level2_referral } = req.body;

  if (!user_id || !amount) {
    return res.status(400).json({ message: 'user_id and amount are required' });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Earning.create({
      user_id,
      amount,
      level1_referral,
      level2_referral,
      type: 'expense',
      action: 'debit'
    });

    // Only credit referrals if amount ≥ 1000
    if (amount >= 1000) {
      // Level 1
      if (level1_referral) {
        const l1_amount = amount * 0.05;

        const l1Earning = await Earning.create({
          user_id: level1_referral,
          amount: l1_amount,
          type: 'L1 referral',
          action: 'credit'
        });

        notifyAll({
          user_id: l1Earning.user_id,
          amount: l1Earning.amount,
          type: l1Earning.type,
          action: l1Earning.action,
          created_at: l1Earning.created_at
        });
      }

      // Level 2
      if (level2_referral) {
        const l2_amount = amount * 0.01;

        const l2Earning = await Earning.create({
          user_id: level2_referral,
          amount: l2_amount,
          type: 'L2 referral',
          action: 'credit'
        });

        notifyAll({
          user_id: l2Earning.user_id,
          amount: l2Earning.amount,
          type: l2Earning.type,
          action: l2Earning.action,
          created_at: l2Earning.created_at
        });
      }
    }

    res.status(200).json({ message: 'Purchase recorded. Referrals credited if eligible.' });

  } catch (err) {
    console.error('Error in purchase:', err);
    res.status(500).json({ error: err.message });
  }
};