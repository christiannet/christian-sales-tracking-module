import { Component, input } from '@angular/core';
import { MatButtonModule }           from '@angular/material/button';
import { MatIconModule }             from '@angular/material/icon';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  readonly label    = input.required<string>();
  readonly icon     = input.required<string>();
  readonly loading  = input(false);
  readonly disabled = input(false);
}
