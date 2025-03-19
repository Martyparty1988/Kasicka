import { Request, Response } from 'express';
import { Order, OrderItem, Item, Villa, User } from '../models';
import sequelize from '../config/database';

/**
 * Get all orders
 * @route GET /api/orders
 */
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Check if user is admin or manager to see all orders
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    
    // If not admin or manager, only show user's own orders
    const whereClause = isAdminOrManager ? {} : { userId: req.user?.userId };
    
    const orders = await Order.findAll({
      where: whereClause,
      include: [
        { model: Villa },
        { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get order by ID
 * @route GET /api/orders/:id
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id, {
      include: [
        { model: Villa },
        { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
        { 
          model: OrderItem,
          include: [{ model: Item }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to view this order
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    const isOrderOwner = req.user && order.userId === req.user.userId;
    
    if (!isAdminOrManager && !isOrderOwner) {
      return res.status(403).json({ message: 'You do not have permission to view this order' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Create a new order
 * @route POST /api/orders
 */
export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      villaId,
      orderItems,
      guestCount,
      nightsCount,
      discountPercentage,
      currency,
      exchangeRate,
      notes
    } = req.body;

    if (!villaId || !orderItems || !guestCount || !nightsCount || !currency) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate villa
    const villa = await Villa.findByPk(villaId);
    if (!villa) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid villa ID' });
    }

    // Generate order number
    const orderCount = await Order.count();
    const orderNumber = `ORD-${new Date().getFullYear()}${String(orderCount + 1).padStart(4, '0')}`;

    // Create order
    const newOrder = await Order.create({
      villaId,
      userId: req.user?.userId,
      orderNumber,
      status: 'pending',
      guestCount,
      nightsCount,
      discountPercentage: discountPercentage || 0,
      currency,
      exchangeRate,
      totalAmount: 0, // Will be calculated
      totalAmountWithDiscount: 0, // Will be calculated
      cityTaxAmount: 0, // Will be calculated
      finalAmount: 0, // Will be calculated
      notes
    }, { transaction });

    // Create order items
    let totalAmount = 0;
    
    for (const item of orderItems) {
      // Validate item
      const dbItem = await Item.findByPk(item.itemId);
      if (!dbItem) {
        await transaction.rollback();
        return res.status(400).json({ message: `Invalid item ID: ${item.itemId}` });
      }

      // Get price based on currency
      const pricePerUnit = currency === 'CZK' ? dbItem.priceCzk : dbItem.priceEur;
      
      if (!pricePerUnit && !dbItem.isCustomPrice) {
        await transaction.rollback();
        return res.status(400).json({ message: `Price not available for item: ${dbItem.name}` });
      }

      // For custom price items, use the provided price
      const finalPricePerUnit = dbItem.isCustomPrice ? item.pricePerUnit : pricePerUnit;
      const itemTotalPrice = finalPricePerUnit * item.quantity;
      
      // Create order item
      await OrderItem.create({
        orderId: newOrder.id,
        itemId: item.itemId,
        quantity: item.quantity,
        pricePerUnit: finalPricePerUnit,
        totalPrice: itemTotalPrice,
        discountApplied: !dbItem.isCityTax && discountPercentage > 0
      }, { transaction });

      // Add to total (excluding city tax)
      if (!dbItem.isCityTax) {
        totalAmount += itemTotalPrice;
      }
    }

    // Calculate city tax
    const cityTaxPerNightPerGuest = currency === 'CZK' ? 50 : 2; // 2 EUR or 50 CZK
    const cityTaxAmount = guestCount * nightsCount * cityTaxPerNightPerGuest;

    // Calculate discount
    const discountAmount = (discountPercentage / 100) * totalAmount;
    const totalAmountWithDiscount = totalAmount - discountAmount;

    // Calculate final amount
    const finalAmount = totalAmountWithDiscount + cityTaxAmount;

    // Update order with calculated values
    await newOrder.update({
      totalAmount,
      totalAmountWithDiscount,
      cityTaxAmount,
      finalAmount
    }, { transaction });

    await transaction.commit();

    // Fetch the complete order with items
    const completeOrder = await Order.findByPk(newOrder.id, {
      include: [
        { model: Villa },
        { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
        { 
          model: OrderItem,
          include: [{ model: Item }]
        }
      ]
    });

    return res.status(201).json(completeOrder);
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update an order
 * @route PUT /api/orders/:id
 */
export const updateOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const {
      status,
      guestCount,
      nightsCount,
      discountPercentage,
      currency,
      exchangeRate,
      notes
    } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to update this order
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    const isOrderOwner = req.user && order.userId === req.user.userId;
    
    if (!isAdminOrManager && !isOrderOwner) {
      await transaction.rollback();
      return res.status(403).json({ message: 'You do not have permission to update this order' });
    }

    // Update order
    await order.update({
      status: status || order.status,
      guestCount: guestCount !== undefined ? guestCount : order.guestCount,
      nightsCount: nightsCount !== undefined ? nightsCount : order.nightsCount,
      discountPercentage: discountPercentage !== undefined ? discountPercentage : order.discountPercentage,
      currency: currency || order.currency,
      exchangeRate: exchangeRate !== undefined ? exchangeRate : order.exchangeRate,
      notes: notes !== undefined ? notes : order.notes
    }, { transaction });

    // If guest count, nights count, or discount percentage changed, recalculate totals
    if (guestCount !== undefined || nightsCount !== undefined || discountPercentage !== undefined) {
      // Get all order items
      const orderItems = await OrderItem.findAll({
        where: { orderId: id },
        include: [{ model: Item }],
        transaction
      });

      // Calculate total amount
      let totalAmount = 0;
      
      for (const orderItem of orderItems) {
        if (!orderItem.item.isCityTax) {
          totalAmount += orderItem.totalPrice;
        }
        
        // Update discount applied flag
        if (!orderItem.item.isCityTax && discountPercentage > 0 && !orderItem.discountApplied) {
          await orderItem.update({ discountApplied: true }, { transaction });
        } else if (!orderItem.item.isCityTax && discountPercentage === 0 && orderItem.discountApplied) {
          await orderItem.update({ discountApplied: false }, { transaction });
        }
      }

      // Calculate city tax
      const cityTaxPerNightPerGuest = order.currency === 'CZK' ? 50 : 2; // 2 EUR or 50 CZK
      const cityTaxAmount = order.guestCount * order.nightsCount * cityTaxPerNightPerGuest;

      // Calculate discount
      const discountAmount = (order.discountPercentage / 100) * totalAmount;
      const totalAmountWithDiscount = totalAmount - discountAmount;

      // Calculate final amount
      const finalAmount = totalAmountWithDiscount + cityTaxAmount;

      // Update order with calculated values
      await order.update({
        totalAmount,
        totalAmountWithDiscount,
        cityTaxAmount,
        finalAmount
      }, { transaction });
    }

    await transaction.commit();

    // Fetch the updated order with items
    const updatedOrder = await Order.findByPk(id, {
      include: [
        { model: Villa },
        { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
        { 
          model: OrderItem,
          include: [{ model: Item }]
        }
      ]
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Delete an order
 * @route DELETE /api/orders/:id
 */
export const deleteOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete order items first
    await OrderItem.destroy({
      where: { orderId: id },
      transaction
    });

    // Delete order
    await order.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get order items
 * @route GET /api/orders/:id/items
 */
export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to view this order
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    const isOrderOwner = req.user && order.userId === req.user.userId;
    
    if (!isAdminOrManager && !isOrderOwner) {
      return res.status(403).json({ message: 'You do not have permission to view this order' });
    }

    const orderItems = await OrderItem.findAll({
      where: { orderId: id },
      include: [{ model: Item }]
    });

    return res.status(200).json(orderItems);
  } catch (error) {
    console.error('Error fetching order items:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Calculate order totals
 * @route POST /api/orders/:id/calculate
 */
export const calculateOrderTotals = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id, {
      include: [
        { 
          model: OrderItem,
          include: [{ model: Item }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to update this order
    const isAdminOrManager = req.user && ['Administrator', 'Manager'].includes(req.user.role);
    const isOrderOwner = req.user && order.userId === req.user.userId;
    
    if (!isAdminOrManager && !isOrderOwner) {
      return res.status(403).json({ message: 'You do not have permission to update this order' });
    }

    // Calculate total amount
    let totalAmount = 0;
    
    for (const orderItem of order.orderItems || []) {
      if (!orderItem.item.isCityTax) {
        totalAmount += orderItem.totalPrice;
      }
    }

    // Calculate city tax
    const cityTaxPerNightPerGuest = order.currency === 'CZK' ? 50 : 2; // 2 EUR or 50 CZK
    const cityTaxAmount = order.guestCount * order.nightsCount * cityTaxPerNightPerGuest;

    // Calculate discount
    const discountAmount = (order.discountPercentage / 100) * totalAmount;
    const totalAmountWithDiscount = totalAmount - discountAmount;

    // Calculate final amount
    const finalAmount = totalAmountWithDiscount + cityTaxAmount;

    // Update order with calculated values
    await order.update({
      totalAmount,
      totalAmountWithDiscount,
      cityTaxAmount,
      finalAmount
    });

    // Return the updated order
    const updatedOrder = await Order.findByPk(id, {
      include: [
        { model: Villa },
        { model: User, attributes: ['id', 'username', 'firstName', 'lastName'] },
        { 
          model: OrderItem,
          include: [{ model: Item }]
        }
      ]
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error calculating order totals:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
