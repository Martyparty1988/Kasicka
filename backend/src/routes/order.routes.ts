import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import * as orderController from '../controllers/order.controller';

const router = express.Router();

// Public routes
router.get('/:id', authMiddleware, orderController.getOrderById);

// Protected routes
router.get('/', authMiddleware, orderController.getAllOrders);
router.post('/', authMiddleware, orderController.createOrder);
router.put('/:id', authMiddleware, orderController.updateOrder);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrator', 'Manager']), orderController.deleteOrder);
router.get('/:id/items', authMiddleware, orderController.getOrderItems);
router.post('/:id/calculate', authMiddleware, orderController.calculateOrderTotals);

export default router;
