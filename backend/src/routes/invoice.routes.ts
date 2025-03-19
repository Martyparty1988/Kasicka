import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import * as invoiceController from '../controllers/invoice.controller';

const router = express.Router();

// Protected routes
router.get('/', authMiddleware, invoiceController.getAllInvoices);
router.get('/:id', authMiddleware, invoiceController.getInvoiceById);
router.post('/', authMiddleware, roleMiddleware(['Administrator', 'Manager', 'Staff']), invoiceController.createInvoice);
router.put('/:id', authMiddleware, roleMiddleware(['Administrator', 'Manager']), invoiceController.updateInvoice);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrator']), invoiceController.deleteInvoice);
router.get('/:id/pdf', authMiddleware, invoiceController.generatePdf);
router.get('/:id/jpeg', authMiddleware, invoiceController.generateJpeg);
router.put('/:id/status', authMiddleware, roleMiddleware(['Administrator', 'Manager']), invoiceController.updateStatus);

export default router;
