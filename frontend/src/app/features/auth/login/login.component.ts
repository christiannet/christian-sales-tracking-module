import { Component, OnInit, inject, signal } from '@angular/core';
import { Router }                            from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule }                     from '@angular/material/card';
import { MatButtonModule }                   from '@angular/material/button';
import { MatIconModule }                     from '@angular/material/icon';
import { MatFormFieldModule }                from '@angular/material/form-field';
import { MatInputModule }                    from '@angular/material/input';
import { MatProgressSpinnerModule }          from '@angular/material/progress-spinner';
import { MatDividerModule }                  from '@angular/material/divider';
import { SubmitButtonComponent }             from '../../../shared/components/submit-button/submit-button.component';
import { AuthService }                       from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    SubmitButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loading      = signal(false);
  public error        = signal('');
  public hidePassword = signal(true);

  private readonly authService = inject(AuthService);
  private readonly router      = inject(Router);
  private readonly fb          = inject(FormBuilder);

  public form = this.fb.nonNullable.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  public submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err.status === 401
            ? 'Incorrect email or password.'
            : 'Could not connect to the server. Make sure the backend is running.',
        );
      },
    });
  }
}
