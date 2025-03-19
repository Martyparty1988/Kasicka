import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import * as itemController from '../controllers/item.controller';

const router = express.Router();

// Public routes
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);

// Protected routes
router.post('/', authMiddleware, roleMiddleware(['Administrator', 'Manager']), itemController.createItem);
router.put('/:id', authMiddleware, roleMiddleware(['Administrator', 'Manager']), itemController.updateItem);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrator']), itemController.deleteItem);

export default router;
