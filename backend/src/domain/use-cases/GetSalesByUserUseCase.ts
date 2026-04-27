import { Sale } from '../entities/Sale';
import { ISaleRepository } from '../repositories/ISaleRepository';
import { IPromoterRepository } from '../repositories/IPromoterRepository';

export class GetSalesByUserUseCase {
  public constructor(
    private readonly saleRepository: ISaleRepository,
    private readonly promoterRepository: IPromoterRepository,
  ) {}

  public execute(userId: number): Sale[] {
    const promoter = this.promoterRepository.findById(userId);
    if (!promoter) throw new Error(`Promoter with id ${userId} not found`);
    return this.saleRepository.findByPromoterId(userId);
  }
}
