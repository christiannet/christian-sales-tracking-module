import { Component, input, output, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule }             from '@angular/material/card';
import { MatIconModule }             from '@angular/material/icon';
import { MatFormFieldModule }        from '@angular/material/form-field';
import { MatInputModule }            from '@angular/material/input';
import { MatDatepickerModule }       from '@angular/material/datepicker';
import { provideNativeDateAdapter }  from '@angular/material/core';
import { ToastrService }             from 'ngx-toastr';
import { SaleService }               from '../../../core/services/sale.service';
import { SubmitButtonComponent }     from '../submit-button/submit-button.component';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule,
    SubmitButtonComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss'],
})
export class SaleFormComponent {
  readonly promoterId   = input.required<number>();
  readonly promoterName = input.required<string>();
  readonly saleSaved    = output<void>();

  readonly submitting = signal(false);

  readonly saleForm = inject(FormBuilder).nonNullable.group({
    amount:      ['', [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    saleDate:    [new Date(), Validators.required],
  });

  private readonly saleService = inject(SaleService);
  private readonly toastr      = inject(ToastrService);

  blockInvalidAmountKeys(event: KeyboardEvent): void {
    if (['e', 'E', '+', '-', ','].includes(event.key)) event.preventDefault();
  }

  submitSale(): void {
    if (this.saleForm.invalid) return;
    this.submitting.set(true);

    const { amount, description, saleDate } = this.saleForm.getRawValue();
    this.saleService.create({
      promoterId:  this.promoterId(),
      amount:      Number(amount),
      description,
      saleDate:    new Date(saleDate.setHours(12, 0, 0, 0)).toISOString(),
    }).subscribe({
      next: () => {
        this.toastr.success('Sale registered successfully!');
        this.saleForm.reset({ amount: '', description: '', saleDate: new Date() });
        this.submitting.set(false);
        this.saleSaved.emit();
      },
      error: () => {
        this.toastr.error('Error registering sale. Try again.');
        this.submitting.set(false);
      },
    });
  }
}
