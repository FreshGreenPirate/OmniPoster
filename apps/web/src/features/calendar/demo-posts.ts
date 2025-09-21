import type { CalendarEvent } from '@/lib/ui/calendar-grid';

export const demoScheduledPosts: CalendarEvent[] = [
  {
    id: '1',
    title: 'Fun Fact Friday - YT Shorts',
    platform: 'youtube',
    accountLabel: 'YouTube EN',
    scheduleAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Behind the scenes reel',
    platform: 'instagram',
    accountLabel: 'Instagram Stories',
    scheduleAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString()
  },
  {
    id: '3',
    title: 'TikTok trend remix',
    platform: 'tiktok',
    accountLabel: 'TikTok Main',
    scheduleAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
  }
];
