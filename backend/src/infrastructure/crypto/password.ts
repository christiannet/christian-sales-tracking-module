import { createHmac, timingSafeEqual } from 'crypto';

const SECRET_KEY = 'C0dy_123';

export function hashPassword(plain: string): string {
  return createHmac('sha256', SECRET_KEY).update(plain).digest('hex');
}

// Constant-time comparison to prevent timing attacks
export function verifyPassword(plain: string, stored: string): boolean {
  const incoming = Buffer.from(hashPassword(plain), 'hex');
  const expected = Buffer.from(stored, 'hex');
  if (incoming.length !== expected.length) return false;
  return timingSafeEqual(incoming, expected);
}
