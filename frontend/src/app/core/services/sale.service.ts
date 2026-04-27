import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale, CreateSaleDto } from '../models/sale.model';
import { Progress } from '../models/progress.model';
import { ISaleService } from '../di/interfaces';
import { environment } from '../../../../../environments/environment';

const API = environment.apiUrl;

export class SaleService implements ISaleService {
  public constructor(private readonly http: HttpClient) {}

  public create(dto: CreateSaleDto): Observable<Sale> {
    return this.http.post<Sale>(`${API}/sales`, dto);
  }

  public getByUserId(userId: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${API}/sales/${userId}`);
  }

  public getProgress(userId: number, year?: number, month?: number): Observable<Progress> {
    let params = new HttpParams();
    if (year)  params = params.set('year',  year);
    if (month) params = params.set('month', month);
    return this.http.get<Progress>(`${API}/progress/${userId}`, { params });
  }
}
