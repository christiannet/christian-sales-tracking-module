import { Sale } from '../entities/Sale';
import { ISaleRepository } from '../repositories/ISaleRepository';
import { IPromoterRepository } from '../repositories/IPromoterRepository';

export interface CreateSaleInput {
  promoterId: number;
  amount: number;
  description: string;
  saleDate?: Date;
}

export class CreateSaleUseCase {
  public constructor(
    private readonly saleRepository: ISaleRepository,
    private readonly promoterRepository: IPromoterRepository,
  ) {}

  public execute(input: CreateSaleInput): Sale {
    const promoter = this.promoterRepository.findById(input.promoterId);
    if (!promoter) throw new Error(`Promoter with id ${input.promoterId} not found`);
    return this.saleRepository.create({
      promoterId:  input.promoterId,
      amount:      input.amount,
      description: input.description,
      saleDate:    input.saleDate ?? new Date(),
    });
  }
}
