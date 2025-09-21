import { createMockDelay } from '@omni/core/utils/async';
import type { AnalyticsOverviewRangeKey } from '@omni/core/types/analytics';

export type AnalyticsCard = {
  posts: number;
  views: number;
  likes: number;
  comments: number;
};

export class AnalyticsService {
  async fetchOverview({ range }: { range: AnalyticsOverviewRangeKey }) {
    await createMockDelay(80);
    return {
      today: { posts: 2, views: 12400, likes: 1860, comments: 230 },
      '7d': { posts: 12, views: 98000, likes: 15600, comments: 2600 },
      '1m': { posts: 46, views: 332000, likes: 81200, comments: 12400 },
      '3m': { posts: 120, views: 980000, likes: 214000, comments: 42000 },
      '1y': { posts: 420, views: 4200000, likes: 1120000, comments: 184000 }
    } satisfies Record<AnalyticsOverviewRangeKey, AnalyticsCard>;
  }
}

export const analyticsService = new AnalyticsService();
