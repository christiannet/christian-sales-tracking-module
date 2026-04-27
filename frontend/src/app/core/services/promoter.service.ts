import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Promoter } from '../models/promoter.model';
import { IPromoterService } from '../di/interfaces';
import { environment } from '../../../../../environments/environment';

const API = environment.apiUrl;

export class PromoterService implements IPromoterService {
  public constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<Promoter[]> {
    return this.http.get<Promoter[]>(`${API}/promoters`).pipe(
      map(data => (Array.isArray(data) ? data : [])),
    );
  }

  public getById(id: number): Observable<Promoter> {
    return this.http.get<Promoter>(`${API}/promoters/${id}`);
  }
}
