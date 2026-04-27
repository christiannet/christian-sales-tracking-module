import { Request, Response } from 'express';
import { GetProgressUseCase } from '../../domain/use-cases/GetProgressUseCase';

export class ProgressController {
  public constructor(
    private readonly getProgress: GetProgressUseCase,
  ) {}

  public getByUserId = (req: Request, res: Response): void => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) { res.status(400).json({ error: 'Invalid userId' }); return; }
      const { year, month } = req.query;
      res.json(this.getProgress.execute(
        userId,
        year  ? Number(year)  : undefined,
        month ? Number(month) : undefined,
      ));
    } catch (err) {
      const status = err instanceof Error && err.message.includes('not found') ? 404 : 500;
      res.status(status).json({ error: err instanceof Error ? err.message : 'Internal server error' });
    }
  };
}
