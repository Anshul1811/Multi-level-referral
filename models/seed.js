// seed.js
import { User, Earning } from './index.js';

export const seed = async () => {
  try {
    // await Earning.destroy({ where: {} });
    // await User.destroy({ where: {} });

    // Step 1: Create 10 users with referral chains
    const users = await User.bulkCreate([
      { name: 'Alice', email: 'alice@example.com', mobile: '9999990001', referral_code: 'ALICE123' },
      { name: 'Bob', email: 'bob@example.com', mobile: '9999990002', referral_code: 'BOB123', referred_by: 'ALICE123' },
      { name: 'Charlie', email: 'charlie@example.com', mobile: '9999990003', referral_code: 'CHARLIE123', referred_by: 'BOB123' },
      { name: 'David', email: 'david@example.com', mobile: '9999990004', referral_code: 'DAVID123', referred_by: 'ALICE123' },
      { name: 'Eve', email: 'eve@example.com', mobile: '9999990005', referral_code: 'EVE123', referred_by: 'DAVID123' },
      { name: 'Frank', email: 'frank@example.com', mobile: '9999990006', referral_code: 'FRANK123', referred_by: 'EVE123' },
      { name: 'Grace', email: 'grace@example.com', mobile: '9999990007', referral_code: 'GRACE123', referred_by: 'ALICE123' },
      { name: 'Heidi', email: 'heidi@example.com', mobile: '9999990008', referral_code: 'HEIDI123', referred_by: 'GRACE123' },
      { name: 'Ivan', email: 'ivan@example.com', mobile: '9999990009', referral_code: 'IVAN123', referred_by: 'BOB123' },
      { name: 'Judy', email: 'judy@example.com', mobile: '9999990010', referral_code: 'JUDY123', referred_by: 'CHARLIE123' },
    ]);

    const userMap = Object.fromEntries(users.map(u => [u.referral_code, u]));

    const purchases = [
      // user, amount
      ['CHARLIE123', 2200],
      ['EVE123', 1800],
      ['FRANK123', 3500],
      ['GRACE123', 1100],
      ['HEIDI123', 1500],
      ['IVAN123', 2500],
      ['JUDY123', 1700],
      ['BOB123', 2000],
      ['DAVID123', 3000],
      ['CHARLIE123', 1500],
      ['FRANK123', 1200],
      ['HEIDI123', 1400],
      ['JUDY123', 1300],
      ['IVAN123', 1600],
      ['EVE123', 1100]
    ];

    const earnings = [];

    for (const [refCode, amount] of purchases) {
      const buyer = userMap[refCode];
      const level1 = Object.values(userMap).find(u => u.referral_code === buyer.referred_by);
      const level2 = level1 && Object.values(userMap).find(u => u.referral_code === level1.referred_by);

      // Debit entry
      earnings.push({
        user_id: buyer.user_id,
        amount,
        level1_referral: level1?.user_id || null,
        level2_referral: level2?.user_id || null,
        type: 'expense',
        action: 'debit'
      });

      if (level1) {
        earnings.push({
          user_id: level1.user_id,
          amount: +(amount * 0.05).toFixed(2),
          type: 'L1 referral',
          action: 'credit'
        });
      }

      if (level2) {
        earnings.push({
          user_id: level2.user_id,
          amount: +(amount * 0.01).toFixed(2),
          type: 'L2 referral',
          action: 'credit'
        });
      }
    }

    await Earning.bulkCreate(earnings);

    console.log('Seed data inserted.');
  } catch (err) {
    console.error('Seed failed:', err);
  }
};