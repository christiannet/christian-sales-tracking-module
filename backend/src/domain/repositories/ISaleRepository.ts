import { Sale } from '../entities/Sale';

export interface ISaleRepository {
  create(data: Omit<Sale, 'id' | 'createdAt'>): Sale;
  findByPromoterId(promoterId: number): Sale[];
  findByPromoterIdAndMonth(promoterId: number, year: number, month: number): Sale[];
  findAll(): Sale[];
}
