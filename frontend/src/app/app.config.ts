import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }            from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations }        from '@angular/platform-browser/animations';
import { HttpClient }               from '@angular/common/http';
import { provideToastr }            from 'ngx-toastr';
import { routes }                   from './app.routes';
import { authInterceptor }          from './core/interceptors/auth.interceptor';
import { setupContainer, getContainer } from './core/di/container';
import { TYPES }                    from './core/di/types';
import { AuthService }              from './core/services/auth.service';
import { PromoterService }          from './core/services/promoter.service';
import { SaleService }              from './core/services/sale.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 3500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),

    // Bootstrap the Inversify container with Angular's HttpClient, then expose
    // each service back into Angular's DI tree using the concrete class as token
    // so existing components (inject(AuthService), etc.) keep working unchanged.
    {
      provide: AuthService,
      useFactory: (http: HttpClient) =>
        setupContainer(http).get<AuthService>(TYPES.IAuthService),
      deps: [HttpClient],
    },
    {
      provide: PromoterService,
      useFactory: () => getContainer().get<PromoterService>(TYPES.IPromoterService),
      deps: [],
    },
    {
      provide: SaleService,
      useFactory: () => getContainer().get<SaleService>(TYPES.ISaleService),
      deps: [],
    },
  ],
};
