export type AnalyticsOverviewRangeKey = 'today' | '7d' | '1m' | '3m' | '1y';

export type AnalyticsSnapshot = {
  id: string;
  postTargetId: string;
  collectedAt: string;
  metrics: Record<string, number>;
};
