import { Component, OnInit, inject, signal } from '@angular/core';
import { Router }                    from '@angular/router';

import { MatToolbarModule }          from '@angular/material/toolbar';
import { MatButtonModule }           from '@angular/material/button';
import { MatIconModule }             from '@angular/material/icon';
import { MatTooltipModule }          from '@angular/material/tooltip';
import { ToastrService }             from 'ngx-toastr';

import { SaleService }               from '../../core/services/sale.service';
import { AuthService }               from '../../core/services/auth.service';
import { Progress }                  from '../../core/models/progress.model';
import { Sale }                      from '../../core/models/sale.model';
import { ProgressCardComponent }     from '../../shared/components/progress-card/progress-card.component';
import { SaleFormComponent }         from '../../shared/components/sale-form/sale-form.component';
import { SalesHistoryComponent }     from '../../shared/components/sales-history/sales-history.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ProgressCardComponent,
    SaleFormComponent,
    SalesHistoryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public progress = signal<Progress | null>(null);
  public sales    = signal<Sale[]>([]);
  public loading  = signal(false);

  private readonly saleService = inject(SaleService);
  private readonly authService = inject(AuthService);
  private readonly router      = inject(Router);
  private readonly toastr      = inject(ToastrService);

  public get currentUser() { return this.authService.currentUser(); }

  public ngOnInit(): void {
    if (!this.currentUser) { this.router.navigate(['/login']); return; }
    this.loadData();
  }

  public loadData(): void {
    const id = this.currentUser!.id;
    this.loading.set(true);

    this.saleService.getProgress(id).subscribe({
      next: (p) => this.progress.set(p),
      error: ()  => this.toastr.error('Could not load progress'),
    });

    this.saleService.getByUserId(id).subscribe({
      next: (s)  => { this.sales.set(s); this.loading.set(false); },
      error: ()  => this.loading.set(false),
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
