import { Request, Response } from 'express';
import { IPromoterRepository } from '../../domain/repositories/IPromoterRepository';
import { signToken } from '../../infrastructure/auth/jwt';

export class AuthController {
  public constructor(
    private readonly repo: IPromoterRepository,
  ) {}

  public login = (req: Request, res: Response): void => {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const promoter = this.repo.findByEmailAndPassword(email.trim().toLowerCase(), password);
    if (!promoter) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const token = signToken({ promoterId: promoter.id, email: promoter.email, name: promoter.name });
    res.json({ token, promoter });
  };
}
