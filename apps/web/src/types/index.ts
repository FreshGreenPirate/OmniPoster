export interface Brand {
  id: string;
  name: string;
  avatarUrl: string;
  primaryColor: string;
  defaultTimezone: string;
}

export interface ConnectedAccount {
  id: string;
  platform: string;
  label: string;
  isActive: boolean;
  orderIndex: number;
}

export interface ScheduledPost {
  id: string;
  title: string;
  scheduleAt: string;
  status: string;
  platform: string;
}
