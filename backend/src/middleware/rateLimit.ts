import { Request, Response, NextFunction } from 'express';

// Extremely lightweight rate-limiter logic stub since we don't have express-rate-limit installed
const requestCounts = new Map<string, { count: number; expiresAt: number }>();

export const rateLimiter = (options: { max: number; windowMs: number }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.expiresAt) {
      requestCounts.set(ip, { count: 1, expiresAt: now + options.windowMs });
      return next();
    }

    if (record.count >= options.max) {
      return res.status(429).json({
        error_en: 'Too many requests, please try again later.',
        error_ht: 'Ou fè twòp demann, tanpri eseye ankò pita.',
      });
    }

    record.count++;
    next();
  };
};

export const apiLimiter = rateLimiter({ max: 60, windowMs: 15 * 60 * 1000 }); // 60 req / 15m
export const authLimiter = rateLimiter({ max: 5, windowMs: 15 * 60 * 1000 }); // 5 req / 15m for auth
