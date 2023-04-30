import { Router } from 'express';
import { createCode } from '../controllers/confirmation.controller.js';

const router = Router();

router.post('/createConfirmation', createCode)

export default router;