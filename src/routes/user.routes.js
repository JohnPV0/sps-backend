import { Router } from "express";
import { verifyUser, createUser, existEmail, confirmAccount, getDataUser, updateUser } from "../controllers/user.controller.js";

const router = Router()

router.post('/login', verifyUser);
router.post('/register', createUser);
router.post('/verifyEmail', existEmail);
router.post('/confirmAccount', confirmAccount);
router.post('/auth/login', verifyUser);
router.post('/getDataUser', getDataUser);
router.patch('/user', updateUser);

export default router;  