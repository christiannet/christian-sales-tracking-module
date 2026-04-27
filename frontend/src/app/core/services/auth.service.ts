import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Promoter } from '../models/promoter.model';
import { IAuthService } from '../di/interfaces';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;
const USER_KEY     = 'salesTracker_currentUser';
const TOKEN_KEY    = 'salesTracker_token';

interface LoginResponse {
  token:    string;
  promoter: Promoter;
}

export class AuthService implements IAuthService {
  private readonly _currentUser = signal<Promoter | null>(this.loadStoredUser());
  private readonly _token       = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly currentUser = this._currentUser.asReadonly();

  public constructor(private readonly http: HttpClient) {}

  private loadStoredUser(): Promoter | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as Promoter) : null;
    } catch {
      return null;
    }
  }

  public login(email: string, password: string): Observable<Promoter> {
    return this.http
      .post<LoginResponse>(`${API}/auth/login`, { email, password })
      .pipe(
        tap(({ token, promoter }) => {
          this._token.set(token);
          localStorage.setItem(TOKEN_KEY, token);
          this.setCurrentUser(promoter);
        }),
        map(({ promoter }) => promoter),
      );
  }

  public setCurrentUser(promoter: Promoter): void {
    this._currentUser.set(promoter);
    localStorage.setItem(USER_KEY, JSON.stringify(promoter));
  }

  public logout(): void {
    this._currentUser.set(null);
    this._token.set(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  public isLoggedIn(): boolean {
    return this._currentUser() !== null;
  }

  public getToken(): string | null {
    return this._token();
  }
}
