import { BarChart3 } from 'lucide-react';

const ranges = [
  { id: 'today', label: 'Today', posts: 2, views: 1500, likes: 230, comments: 41 },
  { id: '7d', label: 'Last 7 days', posts: 8, views: 11200, likes: 980, comments: 220 },
  { id: '1m', label: '1 month', posts: 32, views: 42000, likes: 3890, comments: 880 },
];

export function AnalyticsSummary() {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/80 p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Performance overview</h2>
          <p className="text-xs text-slate-400">Aggregate metrics fetched via provider APIs.</p>
        </div>
        <BarChart3 className="h-5 w-5 text-slate-500" />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {ranges.map((range) => (
          <div key={range.id} className="rounded-lg border border-white/5 bg-slate-950/70 p-4 text-sm">
            <p className="font-medium text-white">{range.label}</p>
            <dl className="mt-3 space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <dt>Posts</dt>
                <dd>{range.posts}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Views</dt>
                <dd>{range.views.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Likes</dt>
                <dd>{range.likes.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Comments</dt>
                <dd>{range.comments.toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
