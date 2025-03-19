import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists in request (set by authMiddleware)
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      // Check if user role is in allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
      
      next();
    } catch (error) {
      console.error('Role authorization error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};
