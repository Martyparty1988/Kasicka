import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, firstName, lastName, roleId } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists (if provided)
    if (email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      username,
      passwordHash,
      email,
      firstName,
      lastName,
      roleId: roleId || 4, // Default to Guest role if not specified
      isActive: true,
      lastLogin: new Date()
    });

    // Remove password hash from response
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      roleId: newUser.roleId,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt
    };

    return res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({
      where: { username, isActive: true },
      include: [{ model: Role }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role?.name || 'Guest'
      },
      secret,
      { expiresIn: '1h' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user.id },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role?.name || 'Guest'
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Refresh token
 * @route POST /api/auth/refresh-token
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Verify refresh token
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(refreshToken, secret) as { userId: number };

    // Find user
    const user = await User.findOne({
      where: { id: decoded.userId, isActive: true },
      include: [{ model: Role }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role?.name || 'Guest'
      },
      secret,
      { expiresIn: '1h' }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { userId: user.id },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 */
export const logout = async (req: Request, res: Response) => {
  // In a stateless JWT authentication system, the client is responsible for
  // discarding the token. The server doesn't need to do anything.
  return res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * Get current user
 * @route GET /api/auth/me
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findOne({
      where: { id: req.user.userId, isActive: true },
      include: [{ model: Role }],
      attributes: { exclude: ['passwordHash'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error getting current user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Change password
 * @route POST /api/auth/change-password
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    // Find user
    const user = await User.findOne({
      where: { id: req.user.userId, isActive: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await user.update({ passwordHash });

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
