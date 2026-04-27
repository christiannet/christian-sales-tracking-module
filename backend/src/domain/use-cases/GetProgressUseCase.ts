import { ISaleRepository } from '../repositories/ISaleRepository';
import { IPromoterRepository } from '../repositories/IPromoterRepository';

export type BadgeType = 'HALF_WAY' | 'ALMOST_THERE' | 'GOAL_ACHIEVED';

export interface ProgressResult {
  promoterId:   number;
  promoterName: string;
  monthlyGoal:  number;
  currentSales: number;
  percentage:   number;
  badges:       BadgeType[];
  month:        number;
  year:         number;
}

export class GetProgressUseCase {
  public constructor(
    private readonly saleRepository: ISaleRepository,
    private readonly promoterRepository: IPromoterRepository,
  ) {}

  public execute(userId: number, year?: number, month?: number): ProgressResult {
    const now         = new Date();
    const targetYear  = year  ?? now.getFullYear();
    const targetMonth = month ?? now.getMonth() + 1;

    const promoter = this.promoterRepository.findById(userId);
    if (!promoter) throw new Error(`Promoter with id ${userId} not found`);

    const sales        = this.saleRepository.findByPromoterIdAndMonth(userId, targetYear, targetMonth);
    const currentSales = sales.reduce((sum, s) => sum + s.amount, 0);
    const rawPct       = promoter.monthlyGoal > 0 ? (currentSales / promoter.monthlyGoal) * 100 : 0;
    const percentage   = Math.min(rawPct, 100);

    const badges: BadgeType[] = [];
    if (percentage >= 50)  badges.push('HALF_WAY');
    if (percentage >= 80)  badges.push('ALMOST_THERE');
    if (percentage >= 100) badges.push('GOAL_ACHIEVED');

    return { promoterId: userId, promoterName: promoter.name, monthlyGoal: promoter.monthlyGoal,
             currentSales, percentage, badges, month: targetMonth, year: targetYear };
  }
}
