import express from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.put('/change-password/:userId', AuthController.changePassword);

export default router;