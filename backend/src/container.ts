import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

import { IPromoterRepository }      from './domain/repositories/IPromoterRepository';
import { ISaleRepository }          from './domain/repositories/ISaleRepository';
import { SQLitePromoterRepository } from './infrastructure/repositories/SQLitePromoterRepository';
import { SQLiteSaleRepository }     from './infrastructure/repositories/SQLiteSaleRepository';
import { CreateSaleUseCase }        from './domain/use-cases/CreateSaleUseCase';
import { GetSalesByUserUseCase }    from './domain/use-cases/GetSalesByUserUseCase';
import { GetProgressUseCase }       from './domain/use-cases/GetProgressUseCase';
import { PromoterController }       from './presentation/controllers/PromoterController';
import { SaleController }           from './presentation/controllers/SaleController';
import { ProgressController }       from './presentation/controllers/ProgressController';
import { AuthController }           from './presentation/controllers/AuthController';

const container = new Container();

// ── Repositories (singletons — one DB connection shared) ─────────────────────
container
  .bind<IPromoterRepository>(TYPES.IPromoterRepository)
  .toDynamicValue(() => new SQLitePromoterRepository())
  .inSingletonScope();

container
  .bind<ISaleRepository>(TYPES.ISaleRepository)
  .toDynamicValue(() => new SQLiteSaleRepository())
  .inSingletonScope();

// ── Use cases (transient — lightweight, stateless) ────────────────────────────
container
  .bind<CreateSaleUseCase>(TYPES.CreateSaleUseCase)
  .toDynamicValue((ctx) => new CreateSaleUseCase(
    ctx.container.get<ISaleRepository>(TYPES.ISaleRepository),
    ctx.container.get<IPromoterRepository>(TYPES.IPromoterRepository),
  ));

container
  .bind<GetSalesByUserUseCase>(TYPES.GetSalesByUserUseCase)
  .toDynamicValue((ctx) => new GetSalesByUserUseCase(
    ctx.container.get<ISaleRepository>(TYPES.ISaleRepository),
    ctx.container.get<IPromoterRepository>(TYPES.IPromoterRepository),
  ));

container
  .bind<GetProgressUseCase>(TYPES.GetProgressUseCase)
  .toDynamicValue((ctx) => new GetProgressUseCase(
    ctx.container.get<ISaleRepository>(TYPES.ISaleRepository),
    ctx.container.get<IPromoterRepository>(TYPES.IPromoterRepository),
  ));

// ── Controllers (singletons — reused per request) ─────────────────────────────
container
  .bind<PromoterController>(TYPES.PromoterController)
  .toDynamicValue((ctx) => new PromoterController(
    ctx.container.get<IPromoterRepository>(TYPES.IPromoterRepository),
  ))
  .inSingletonScope();

container
  .bind<SaleController>(TYPES.SaleController)
  .toDynamicValue((ctx) => new SaleController(
    ctx.container.get<CreateSaleUseCase>(TYPES.CreateSaleUseCase),
    ctx.container.get<GetSalesByUserUseCase>(TYPES.GetSalesByUserUseCase),
  ))
  .inSingletonScope();

container
  .bind<ProgressController>(TYPES.ProgressController)
  .toDynamicValue((ctx) => new ProgressController(
    ctx.container.get<GetProgressUseCase>(TYPES.GetProgressUseCase),
  ))
  .inSingletonScope();

container
  .bind<AuthController>(TYPES.AuthController)
  .toDynamicValue((ctx) => new AuthController(
    ctx.container.get<IPromoterRepository>(TYPES.IPromoterRepository),
  ))
  .inSingletonScope();

export { container };
