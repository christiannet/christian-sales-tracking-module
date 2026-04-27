import { Request, Response } from 'express';
import { IPromoterRepository } from '../../domain/repositories/IPromoterRepository';

export class PromoterController {
  public constructor(
    private readonly repository: IPromoterRepository,
  ) {}

  public getAll = (_req: Request, res: Response): void => {
    try {
      res.json(this.repository.findAll());
    } catch (err) {
      res.status(500).json({ error: this.message(err) });
    }
  };

  public getById = (req: Request, res: Response): void => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) { res.status(400).json({ error: 'Invalid id' }); return; }
      const promoter = this.repository.findById(id);
      if (!promoter)  { res.status(404).json({ error: 'Promoter not found' }); return; }
      res.json(promoter);
    } catch (err) {
      res.status(500).json({ error: this.message(err) });
    }
  };

  private message(err: unknown): string {
    return err instanceof Error ? err.message : 'Internal server error';
  }
}
