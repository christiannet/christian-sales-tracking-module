import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Promoter } from '../models/promoter.model';
import { Sale, CreateSaleDto } from '../models/sale.model';
import { Progress } from '../models/progress.model';

export interface IAuthService {
  readonly currentUser: Signal<Promoter | null>;
  login(email: string, password: string): Observable<Promoter>;
  setCurrentUser(promoter: Promoter): void;
  logout(): void;
  isLoggedIn(): boolean;
  getToken(): string | null;
}

export interface IPromoterService {
  getAll(): Observable<Promoter[]>;
  getById(id: number): Observable<Promoter>;
}

export interface ISaleService {
  create(dto: CreateSaleDto): Observable<Sale>;
  getByUserId(userId: number): Observable<Sale[]>;
  getProgress(userId: number, year?: number, month?: number): Observable<Progress>;
}
