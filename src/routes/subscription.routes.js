import { Router } from 'express';
import { createSubscription, selectLastSubscriptionByUser, getAllSubscriptionsByUser } from '../controllers/subscription.controller.js';

const router = Router();

router.post('/subscription', createSubscription);
router.post('/getSubscription', selectLastSubscriptionByUser);
router.get('/subscription/:id', getAllSubscriptionsByUser);

export default router;