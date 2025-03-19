import express from 'express';
import villaRoutes from './villa.routes';
import categoryRoutes from './category.routes';
import itemRoutes from './item.routes';
import villaItemRoutes from './villaItem.routes';
import userRoutes from './user.routes';
import roleRoutes from './role.routes';
import orderRoutes from './order.routes';
import invoiceRoutes from './invoice.routes';
import paymentMethodRoutes from './paymentMethod.routes';
import settingRoutes from './setting.routes';
import authRoutes from './auth.routes';

const router = express.Router();

// Auth routes
router.use('/auth', authRoutes);

// API routes
router.use('/villas', villaRoutes);
router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/villa-items', villaItemRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/orders', orderRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/payment-methods', paymentMethodRoutes);
router.use('/settings', settingRoutes);

export default router;
