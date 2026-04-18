import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error_en: 'Unauthorized: No token provided',
      error_ht: 'Ou pa gen otorizasyon: Pa gen kòd sekirite',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'super-secret-jwt-key';
    const decoded = jwt.verify(token, secret) as any;
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({
      error_en: 'Unauthorized: Invalid token',
      error_ht: 'Ou pa gen otorizasyon: Kòd sekirite a pa valab',
    });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      error_en: 'Forbidden: Admin access only',
      error_ht: 'Entèdi: Aksè pou administratè sèlman',
    });
  }
  next();
};
