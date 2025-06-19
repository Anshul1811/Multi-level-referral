// seed.js
import { User, Earning } from './index.js';

export const seed = async () => {
  try {
    // Clear old data 
    await User.destroy({ where: {} });
    await Earning.destroy({ where: {} });

    // Insert mock users
    const users = await User.bulkCreate([
      {
        name: 'Alice',
        mobile: '9999990001',
        email: 'alice@example.com',
        referral_code: 'ALICE123',
        referred_by: null
      },
      {
        name: 'Bob',
        mobile: '9999990002',
        email: 'bob@example.com',
        referral_code: 'BOB123',
        referred_by: 'ALICE123'
      },
      {
        name: 'Charlie',
        mobile: '9999990003',
        email: 'charlie@example.com',
        referral_code: 'CHARLIE123',
        referred_by: 'BOB123'
      }
    ]);

    const [alice, bob, charlie] = users;

    await Earning.bulkCreate([
      {
        user_id: charlie.user_id,
        amount: 2000,
        level1_referral: bob.user_id,
        level2_referral: charlie.user_id,
        type: 'expense',
        action: 'debit'
      },
      {
        user_id: bob.user_id,
        amount: 100,
        type: 'L1 referral',
        action: 'credit'
      },
      {
        user_id: alice.user_id,
        amount: 20,
        type: 'L2 referral',
        action: 'credit'
      }
    ]);

    console.log('Seed data inserted.');
  } catch (err) {
    console.error(' Seed failed:', err);
  }
};