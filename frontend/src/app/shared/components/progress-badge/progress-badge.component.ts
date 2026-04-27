import { Component, Input, OnChanges } from '@angular/core';
import { NgClass, NgStyle }            from '@angular/common';
import { MatIconModule }               from '@angular/material/icon';
import { MatTooltipModule }            from '@angular/material/tooltip';
import { BadgeType, BadgeConfig, BADGE_CONFIGS } from '../../../core/models/progress.model';

/** Presentational component that renders a single progress badge (bronze, silver, or gold). */
@Component({
  selector: 'app-progress-badge',
  standalone: true,
  imports: [NgClass, NgStyle, MatIconModule, MatTooltipModule],
  templateUrl: './progress-badge.component.html',
  styleUrls: ['./progress-badge.component.scss'],
})
export class ProgressBadgeComponent implements OnChanges {
  /** The badge variant to display. */
  @Input({ required: true }) public badgeType!: BadgeType;
  /** Whether the badge has been earned by the current promoter. */
  @Input() public earned = false;

  /** The resolved configuration object for the current `badgeType`. */
  public config!: BadgeConfig;

  /**
   * Resolves the display configuration whenever `badgeType` or `earned` changes.
   */
  public ngOnChanges(): void {
    this.config = BADGE_CONFIGS.find((b) => b.type === this.badgeType)!;
  }
}
