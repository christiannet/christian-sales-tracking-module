import { Component, input } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatCardModule }             from '@angular/material/card';
import { MatIconModule }             from '@angular/material/icon';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner';
import { MatTableModule }            from '@angular/material/table';
import { Sale }                      from '../../../core/models/sale.model';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [DecimalPipe, DatePipe, MatCardModule, MatIconModule,
            MatProgressSpinnerModule, MatTableModule],
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss'],
})
export class SalesHistoryComponent {
  readonly sales   = input.required<Sale[]>();
  readonly loading = input.required<boolean>();

  readonly displayedColumns = ['saleDate', 'description', 'amount'];
}
