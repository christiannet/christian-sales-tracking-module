import jwt from 'jsonwebtoken';

const JWT_SECRET    = 'C0dy_123';
const JWT_EXPIRES_IN = '8h';

export interface JwtPayload {
  promoterId: number;
  email:      string;
  name:       string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
