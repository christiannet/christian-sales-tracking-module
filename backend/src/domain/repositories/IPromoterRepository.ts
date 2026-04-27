import { Promoter } from '../entities/Promoter';

export interface IPromoterRepository {
  findById(id: number): Promoter | null;
  findByEmail(email: string): Promoter | null;
  findByEmailAndPassword(email: string, password: string): Promoter | null;
  findAll(): Promoter[];
  create(data: Omit<Promoter, 'id' | 'createdAt'>): Promoter;
}
