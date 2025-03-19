import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import * as villaController from '../controllers/villa.controller';

const router = express.Router();

// Public routes
router.get('/', villaController.getAllVillas);
router.get('/:id', villaController.getVillaById);

// Protected routes
router.post('/', authMiddleware, roleMiddleware(['Administrator', 'Manager']), villaController.createVilla);
router.put('/:id', authMiddleware, roleMiddleware(['Administrator', 'Manager']), villaController.updateVilla);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrator']), villaController.deleteVilla);

// Villa specific inventory
router.get('/:id/inventory', villaController.getVillaInventory);

export default router;
