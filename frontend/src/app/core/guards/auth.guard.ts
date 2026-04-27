import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Functional route guard that protects authenticated-only routes.
 * Redirects to `/login` when no active session is detected.
 *
 * @returns `true` if the user is logged in, or a `UrlTree` redirecting to `/login`.
 */
export const authGuard = (): boolean | ReturnType<Router['parseUrl']> => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.parseUrl('/login');
};
