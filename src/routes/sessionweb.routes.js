import { Router } from "express";
import { createSessionWeb } from "../controllers/sessionweb.controller.js";

const router = Router();

router.post('/sessionweb', createSessionWeb);

export default router;