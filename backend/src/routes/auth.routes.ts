import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/change-password', authMiddleware, authController.changePassword);

export default router;
