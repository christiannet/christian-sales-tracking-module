import { Request, Response } from 'express';
import { CreateSaleUseCase }     from '../../domain/use-cases/CreateSaleUseCase';
import { GetSalesByUserUseCase } from '../../domain/use-cases/GetSalesByUserUseCase';

export class SaleController {
  public constructor(
    private readonly createSale:     CreateSaleUseCase,
    private readonly getSalesByUser: GetSalesByUserUseCase,
  ) {}

  public create = (req: Request, res: Response): void => {
    try {
      const { promoterId, amount, description, saleDate } = req.body as {
        promoterId?: unknown; amount?: unknown; description?: unknown; saleDate?: unknown;
      };
      if (!promoterId || !amount || !description) {
        res.status(400).json({ error: 'promoterId, amount and description are required' });
        return;
      }
      res.status(201).json(this.createSale.execute({
        promoterId:  Number(promoterId),
        amount:      Number(amount),
        description: String(description),
        saleDate:    saleDate ? new Date(String(saleDate)) : undefined,
      }));
    } catch (err) {
      res.status(500).json({ error: this.message(err) });
    }
  };

  public getByUserId = (req: Request, res: Response): void => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) { res.status(400).json({ error: 'Invalid userId' }); return; }
      res.json(this.getSalesByUser.execute(userId));
    } catch (err) {
      const status = err instanceof Error && err.message.includes('not found') ? 404 : 500;
      res.status(status).json({ error: this.message(err) });
    }
  };

  private message(err: unknown): string {
    return err instanceof Error ? err.message : 'Internal server error';
  }
}
