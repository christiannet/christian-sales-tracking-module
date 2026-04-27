import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../infrastructure/auth/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers['authorization'];

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header missing or malformed. Expected: Bearer <token>' });
    return;
  }

  try {
    const token = header.slice(7);
    verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
