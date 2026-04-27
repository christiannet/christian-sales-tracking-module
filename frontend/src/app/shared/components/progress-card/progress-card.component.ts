import { Component, input, computed } from '@angular/core';
import { DecimalPipe }               from '@angular/common';
import { MatCardModule }             from '@angular/material/card';
import { MatIconModule }             from '@angular/material/icon';
import { MatProgressBarModule }      from '@angular/material/progress-bar';
import { MatDividerModule }          from '@angular/material/divider';
import { Progress, BADGE_CONFIGS }   from '../../../core/models/progress.model';
import { ProgressBadgeComponent }    from '../progress-badge/progress-badge.component';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [DecimalPipe, MatCardModule, MatIconModule, MatProgressBarModule,
            MatDividerModule, ProgressBadgeComponent],
  templateUrl: './progress-card.component.html',
  styleUrls:  ['./progress-card.component.scss'],
})
export class ProgressCardComponent {
  readonly progress = input.required<Progress>();

  readonly allBadges = BADGE_CONFIGS;

  readonly remaining = computed(() =>
    Math.max(0, this.progress().monthlyGoal - this.progress().currentSales),
  );

  readonly progressBarColor = computed<'primary' | 'accent' | 'warn'>(() => {
    const pct = this.progress().percentage;
    if (pct >= 100) return 'accent';
    if (pct >= 50)  return 'primary';
    return 'warn';
  });

  readonly monthLabel = computed(() => {
    const { year, month } = this.progress();
    return new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  });

  hasBadge(type: string): boolean {
    return this.progress().badges.includes(type as never);
  }
}
