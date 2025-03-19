import { Request, Response } from 'express';
import { Invoice, Order, PaymentMethod, OrderItem, Item, User, Villa } from '../models';
import sequelize from '../config/database';

/**
 * Get all invoices
 * @route GET /api/invoices
 */
export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    // Check if user is admin or manager to see all invoices
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    
    // If not admin or manager, only show user's own invoices
    let whereClause = {};
    
    if (!isAdminOrManager) {
      // Get orders for the current user
      const userOrders = await Order.findAll({
        where: { userId: req.user?.userId },
        attributes: ['id']
      });
      
      const orderIds = userOrders.map(order => order.id);
      whereClause = { orderId: orderIds };
    }
    
    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [
        { 
          model: Order,
          include: [
            { model: Villa },
            { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] }
          ]
        },
        { model: PaymentMethod }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    return res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get invoice by ID
 * @route GET /api/invoices/:id
 */
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const invoice = await Invoice.findByPk(id, {
      include: [
        { 
          model: Order,
          include: [
            { model: Villa },
            { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
            { 
              model: OrderItem,
              include: [{ model: Item }]
            }
          ]
        },
        { model: PaymentMethod }
      ]
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if user has permission to view this invoice
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    const isOrderOwner = req.user && invoice.order.userId === req.user.userId;
    
    if (!isAdminOrManager && !isOrderOwner) {
      return res.status(403).json({ message: 'You do not have permission to view this invoice' });
    }

    return res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Create a new invoice
 * @route POST /api/invoices
 */
export const createInvoice = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      orderId,
      paymentMethodId,
      status,
      dueDate,
      notes
    } = req.body;

    if (!orderId || !paymentMethodId) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Order ID and payment method ID are required' });
    }

    // Validate order
    const order = await Order.findByPk(orderId);
    if (!order) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Validate payment method
    const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
    if (!paymentMethod) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid payment method ID' });
    }

    // Check if invoice already exists for this order
    const existingInvoice = await Invoice.findOne({ where: { orderId } });
    if (existingInvoice) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invoice already exists for this order' });
    }

    // Generate invoice number
    const invoiceCount = await Invoice.count();
    const invoiceNumber = `INV-${new Date().getFullYear()}${String(invoiceCount + 1).padStart(4, '0')}`;

    // Set issued date to today
    const issuedDate = new Date();
    
    // Set due date to 14 days from now if not provided
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 14);

    // Create invoice
    const newInvoice = await Invoice.create({
      orderId,
      invoiceNumber,
      paymentMethodId,
      status: status || 'pending',
      issuedDate,
      dueDate: dueDate ? new Date(dueDate) : defaultDueDate,
      paidDate: status === 'paid' ? new Date() : null,
      totalAmount: order.finalAmount,
      currency: order.currency,
      notes
    }, { transaction });

    // Update order status to invoiced
    await order.update({ status: 'invoiced' }, { transaction });

    await transaction.commit();

    // Fetch the complete invoice with related data
    const completeInvoice = await Invoice.findByPk(newInvoice.id, {
      include: [
        { 
          model: Order,
          include: [
            { model: Villa },
            { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
            { 
              model: OrderItem,
              include: [{ model: Item }]
            }
          ]
        },
        { model: PaymentMethod }
      ]
    });

    return res.status(201).json(completeInvoice);
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating invoice:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update an invoice
 * @route PUT /api/invoices/:id
 */
export const updateInvoice = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const {
      paymentMethodId,
      status,
      dueDate,
      paidDate,
      notes
    } = req.body;

    const invoice = await Invoice.findByPk(id);

    if (!invoice) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Validate payment method if provided
    if (paymentMethodId) {
      const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
      if (!paymentMethod) {
        await transaction.rollback();
        return res.status(400).json({ message: 'Invalid payment method ID' });
      }
    }

    // Update invoice
    await invoice.update({
      paymentMethodId: paymentMethodId || invoice.paymentMethodId,
      status: status || invoice.status,
      dueDate: dueDate ? new Date(dueDate) : invoice.dueDate,
      paidDate: paidDate ? new Date(paidDate) : (status === 'paid' && !invoice.paidDate ? new Date() : invoice.paidDate),
      notes: notes !== undefined ? notes : invoice.notes
    }, { transaction });

    // If status changed to paid, update order status
    if (status === 'paid' && invoice.status !== 'paid') {
      const order = await Order.findByPk(invoice.orderId);
      if (order) {
        await order.update({ status: 'completed' }, { transaction });
      }
    }

    await transaction.commit();

    // Fetch the updated invoice with related data
    const updatedInvoice = await Invoice.findByPk(id, {
      include: [
        { 
          model: Order,
          include: [
            { model: Villa },
            { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
            { 
              model: OrderItem,
              include: [{ model: Item }]
            }
          ]
        },
        { model: PaymentMethod }
      ]
    });

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating invoice:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Delete an invoice
 * @route DELETE /api/invoices/:id
 */
export const deleteInvoice = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const invoice = await Invoice.findByPk(id);

    if (!invoice) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Update order status back to pending
    const order = await Order.findByPk(invoice.orderId);
    if (order) {
      await order.update({ status: 'pending' }, { transaction });
    }

    // Delete invoice
    await invoice.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting invoice:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Generate PDF invoice
 * @route GET /api/invoices/:id/pdf
 */
export const generatePdf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const invoice = await Invoice.findByPk(id, {
      include: [
        { 
          model: Order,
          include: [
            { model: Villa },
            { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
            { 
              model: OrderItem,
              include: [{ model: Item }]
            }
          ]
        },
        { model: PaymentMethod }
      ]
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if user has permission to view this invoice
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    const isOrderOwner = req.user && invoice.order.userId === req.user.userId;
    
    if (!isAdminOrManager && !isOrderOwner) {
      return res.status(403).json({ message: 'You do not have permission to view this invoice' });
    }

    // In a real implementation, we would generate a PDF here
    // For now, we'll just return the invoice data with a message
    return res.status(200).json({
      message: 'PDF generation would happen here in production',
      invoice
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Generate JPEG invoice
 * @route GET /api/invoices/:id/jpeg
 */
export const generateJpeg = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const invoice = await Invoice.findByPk(id, {
      include: [
        { 
          model: Order,
          include: [
            { model: Villa },
            { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
            { 
              model: OrderItem,
              include: [{ model: Item }]
            }
          ]
        },
        { model: PaymentMethod }
      ]
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if user has permission to view this invoice
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    const isOrderOwner = req.user && invoice.order.userId === req.user.userId;
    
    if (!isAdminOrManager && !isOrderOwner) {
      return res.status(403).json({ message: 'You do not have permission to view this invoice' });
    }

    // In a real implementation, we would generate a JPEG here
    // For now, we'll just return the invoice data with a message
    return res.status(200).json({
      message: 'JPEG generation would happen here in production',
      invoice
    });
  } catch (error) {
    console.error('Error generating JPEG:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update invoice status
 * @route PUT /api/invoices/:id/status
 */
export const updateStatus = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Status is required' });
    }

    const invoice = await Invoice.findByPk(id);

    if (!invoice) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Update invoice status
    await invoice.update({
      status,
      paidDate: status === 'paid' && !invoice.paidDate ? new Date() : invoice.paidDate
    }, { transaction });

    // If status changed to paid, update order status
    if (status === 'paid' && invoice.status !== 'paid') {
      const order = await Order.findByPk(invoice.orderId);
      if (order) {
        await order.update({ status: 'completed' }, { transaction });
      }
    }

    await transaction.commit();

    // Fetch the updated invoice with related data
    const updatedInvoice = await Invoice.findByPk(id, {
      include: [
        { 
          model: Order,
          include: [
            { model: Villa },
            { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] }
          ]
        },
        { model: PaymentMethod }
      ]
    });

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating invoice status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
