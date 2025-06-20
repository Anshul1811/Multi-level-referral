import express from 'express';
import { UserProfitReport , UserReferralAnalytics} from '../controller/reportController.js';
import { handlePurchase } from '../controller/purchaseController.js';

const router = express.Router();

// routes for analytics
router.post('/getUserReport', UserProfitReport);
router.post('/referrals', UserReferralAnalytics); 


//Route for purchase
router.post('/purchase', handlePurchase);


export default router;
