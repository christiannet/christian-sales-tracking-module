export type BadgeType = 'HALF_WAY' | 'ALMOST_THERE' | 'GOAL_ACHIEVED';

export interface Progress {
  promoterId: number;
  promoterName: string;
  monthlyGoal: number;
  currentSales: number;
  percentage: number;
  badges: BadgeType[];
  month: number;
  year: number;
}

export interface BadgeConfig {
  type: BadgeType;
  icon: string;
  label: string;
  color: string;
  description: string;
  threshold: number;
}

export const BADGE_CONFIGS: BadgeConfig[] = [
  {
    type: 'HALF_WAY',
    icon: 'military_tech',
    label: 'Bronze',
    color: '#CD7F32',
    description: '50% of monthly goal reached',
    threshold: 50,
  },
  {
    type: 'ALMOST_THERE',
    icon: 'military_tech',
    label: 'Silver',
    color: '#C0C0C0',
    description: '80% of monthly goal reached',
    threshold: 80,
  },
  {
    type: 'GOAL_ACHIEVED',
    icon: 'emoji_events',
    label: 'Gold',
    color: '#FFD700',
    description: '100% of monthly goal reached!',
    threshold: 100,
  },
];
