import { Router } from 'express';
import { createSession, finishSession, selectSession } from '../controllers/session.controller.js';

const router = Router();

router.post('/session', createSession);
router.get('/session', selectSession);
router.post('/logout', finishSession);


export default router;