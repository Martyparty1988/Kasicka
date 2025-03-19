import { Request, Response } from 'express';
import { Villa, VillaItem, Item } from '../models';

/**
 * Get all villas
 * @route GET /api/villas
 */
export const getAllVillas = async (req: Request, res: Response) => {
  try {
    const villas = await Villa.findAll({
      where: { isActive: true }
    });
    return res.status(200).json(villas);
  } catch (error) {
    console.error('Error fetching villas:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get villa by ID
 * @route GET /api/villas/:id
 */
export const getVillaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const villa = await Villa.findOne({
      where: { id, isActive: true }
    });

    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }

    return res.status(200).json(villa);
  } catch (error) {
    console.error('Error fetching villa:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Create a new villa
 * @route POST /api/villas
 */
export const createVilla = async (req: Request, res: Response) => {
  try {
    const { name, description, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Villa name is required' });
    }

    const newVilla = await Villa.create({
      name,
      description,
      imageUrl,
      isActive: true
    });

    return res.status(201).json(newVilla);
  } catch (error) {
    console.error('Error creating villa:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update a villa
 * @route PUT /api/villas/:id
 */
export const updateVilla = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, isActive } = req.body;

    const villa = await Villa.findByPk(id);

    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }

    await villa.update({
      name: name || villa.name,
      description: description !== undefined ? description : villa.description,
      imageUrl: imageUrl !== undefined ? imageUrl : villa.imageUrl,
      isActive: isActive !== undefined ? isActive : villa.isActive
    });

    return res.status(200).json(villa);
  } catch (error) {
    console.error('Error updating villa:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Delete a villa
 * @route DELETE /api/villas/:id
 */
export const deleteVilla = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const villa = await Villa.findByPk(id);

    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }

    // Soft delete by setting isActive to false
    await villa.update({ isActive: false });

    return res.status(200).json({ message: 'Villa deleted successfully' });
  } catch (error) {
    console.error('Error deleting villa:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get villa inventory
 * @route GET /api/villas/:id/inventory
 */
export const getVillaInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const villa = await Villa.findOne({
      where: { id, isActive: true }
    });

    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }

    // Get villa-specific items
    const villaItems = await VillaItem.findAll({
      where: { villaId: id, isAvailable: true },
      include: [
        {
          model: Item,
          where: { isActive: true }
        }
      ]
    });

    // Get shared items across all villas
    const sharedItems = await Item.findAll({
      where: { isSharedAcrossVillas: true, isActive: true }
    });

    // Combine villa-specific and shared items
    const inventory = {
      villaSpecificItems: villaItems,
      sharedItems: sharedItems
    };

    return res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching villa inventory:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
