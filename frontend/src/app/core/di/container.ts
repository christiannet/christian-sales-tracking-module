import 'reflect-metadata';
import { Container } from 'inversify';
import { HttpClient } from '@angular/common/http';
import { TYPES } from './types';
import { IAuthService, IPromoterService, ISaleService } from './interfaces';
import { AuthService }     from '../services/auth.service';
import { PromoterService } from '../services/promoter.service';
import { SaleService }     from '../services/sale.service';

let container: Container | null = null;

export function setupContainer(http: HttpClient): Container {
  if (container) return container;

  container = new Container();

  container
    .bind<HttpClient>(TYPES.HttpClient)
    .toConstantValue(http);

  // Factories close over `http` so each service gets the Angular HttpClient
  // instance that was bridged in from Angular's DI system.
  container
    .bind<IAuthService>(TYPES.IAuthService)
    .toDynamicValue(() => new AuthService(http))
    .inSingletonScope();

  container
    .bind<IPromoterService>(TYPES.IPromoterService)
    .toDynamicValue(() => new PromoterService(http))
    .inSingletonScope();

  container
    .bind<ISaleService>(TYPES.ISaleService)
    .toDynamicValue(() => new SaleService(http))
    .inSingletonScope();

  return container;
}

export function getContainer(): Container {
  if (!container) throw new Error('DI container not initialized. Call setupContainer first.');
  return container;
}
