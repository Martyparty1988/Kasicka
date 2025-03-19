import { Request, Response } from 'express';
import { Item, Category } from '../models';

/**
 * Get all items
 * @route GET /api/items
 */
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.findAll({
      where: { isActive: true },
      include: [{ model: Category }]
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get item by ID
 * @route GET /api/items/:id
 */
export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findOne({
      where: { id, isActive: true },
      include: [{ model: Category }]
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Create a new item
 * @route POST /api/items
 */
export const createItem = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      categoryId,
      priceCzk,
      priceEur,
      imageUrl,
      isCustomPrice,
      isSharedAcrossVillas,
      isCityTax
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Item name is required' });
    }

    // Validate category if provided
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    const newItem = await Item.create({
      name,
      description,
      categoryId,
      priceCzk,
      priceEur,
      imageUrl,
      isCustomPrice: isCustomPrice || false,
      isSharedAcrossVillas: isSharedAcrossVillas || false,
      isCityTax: isCityTax || false,
      isActive: true
    });

    // Fetch the created item with category included
    const createdItem = await Item.findByPk(newItem.id, {
      include: [{ model: Category }]
    });

    return res.status(201).json(createdItem);
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update an item
 * @route PUT /api/items/:id
 */
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      categoryId,
      priceCzk,
      priceEur,
      imageUrl,
      isCustomPrice,
      isSharedAcrossVillas,
      isCityTax,
      isActive
    } = req.body;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Validate category if provided
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    await item.update({
      name: name || item.name,
      description: description !== undefined ? description : item.description,
      categoryId: categoryId !== undefined ? categoryId : item.categoryId,
      priceCzk: priceCzk !== undefined ? priceCzk : item.priceCzk,
      priceEur: priceEur !== undefined ? priceEur : item.priceEur,
      imageUrl: imageUrl !== undefined ? imageUrl : item.imageUrl,
      isCustomPrice: isCustomPrice !== undefined ? isCustomPrice : item.isCustomPrice,
      isSharedAcrossVillas: isSharedAcrossVillas !== undefined ? isSharedAcrossVillas : item.isSharedAcrossVillas,
      isCityTax: isCityTax !== undefined ? isCityTax : item.isCityTax,
      isActive: isActive !== undefined ? isActive : item.isActive
    });

    // Fetch the updated item with category included
    const updatedItem = await Item.findByPk(id, {
      include: [{ model: Category }]
    });

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Delete an item
 * @route DELETE /api/items/:id
 */
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Soft delete by setting isActive to false
    await item.update({ isActive: false });

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
