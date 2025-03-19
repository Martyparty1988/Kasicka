import { Request, Response } from 'express';
import { Category, Item } from '../models';

/**
 * Get all categories
 * @route GET /api/categories
 */
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true }
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get category by ID
 * @route GET /api/categories/:id
 */
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id, isActive: true }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Create a new category
 * @route POST /api/categories
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, iconUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const newCategory = await Category.create({
      name,
      description,
      iconUrl,
      isActive: true
    });

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update a category
 * @route PUT /api/categories/:id
 */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, iconUrl, isActive } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update({
      name: name || category.name,
      description: description !== undefined ? description : category.description,
      iconUrl: iconUrl !== undefined ? iconUrl : category.iconUrl,
      isActive: isActive !== undefined ? isActive : category.isActive
    });

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Delete a category
 * @route DELETE /api/categories/:id
 */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Soft delete by setting isActive to false
    await category.update({ isActive: false });

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get items by category ID
 * @route GET /api/categories/:id/items
 */
export const getCategoryItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findOne({
      where: { id, isActive: true }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const items = await Item.findAll({
      where: { categoryId: id, isActive: true }
    });

    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching category items:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
