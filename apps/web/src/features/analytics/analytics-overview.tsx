'use client';

import { useQuery } from '@tanstack/react-query';
import { Activity } from 'lucide-react';
import { analyticsService } from '@/lib/services/analytics-service';

const ranges: Array<{ key: 'today' | '7d' | '1m' | '3m' | '1y'; label: string }> = [
  { key: 'today', label: 'Today' },
  { key: '7d', label: 'Last 7 days' },
  { key: '1m', label: '1 month' },
  { key: '3m', label: '3 months' },
  { key: '1y', label: '1 year' }
];

export function AnalyticsOverview() {
  const { data } = useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: () => analyticsService.fetchOverview({ range: '7d' }),
    staleTime: 60_000
  });

  return (
    <section className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6 shadow-xl shadow-black/40">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Performance at a glance</h2>
          <p className="text-sm text-slate-400">Aggregated metrics from YouTube, Instagram, and TikTok.</p>
        </div>
        <Activity className="h-6 w-6 text-fuchsia-400" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
        {ranges.map((range) => {
          const card = data?.[range.key];
          return (
            <article
              key={range.key}
              className="rounded-xl border border-slate-800/50 bg-slate-900/40 p-4 transition hover:border-fuchsia-500/60 hover:bg-slate-900/70"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">{range.label}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{card?.posts ?? 0} posts</h3>
              <dl className="mt-3 space-y-1 text-xs text-slate-400">
                <div className="flex justify-between">
                  <dt>Views</dt>
                  <dd>{card?.views.toLocaleString() ?? '0'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Likes</dt>
                  <dd>{card?.likes.toLocaleString() ?? '0'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Comments</dt>
                  <dd>{card?.comments.toLocaleString() ?? '0'}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
