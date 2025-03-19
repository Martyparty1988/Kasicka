import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import * as categoryController from '../controllers/category.controller';

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/items', categoryController.getCategoryItems);

// Protected routes
router.post('/', authMiddleware, roleMiddleware(['Administrator', 'Manager']), categoryController.createCategory);
router.put('/:id', authMiddleware, roleMiddleware(['Administrator', 'Manager']), categoryController.updateCategory);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrator']), categoryController.deleteCategory);

export default router;
