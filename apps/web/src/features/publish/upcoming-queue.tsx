'use client';

import { useMemo } from 'react';
import { demoScheduledPosts } from '@/features/calendar/demo-posts';
import { PlatformIcon } from '@/lib/ui/platform-icon';

export function UpcomingQueue() {
  const queue = useMemo(() => demoScheduledPosts.slice(0, 5), []);

  return (
    <section className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Queued posts</h2>
        <button className="text-sm text-fuchsia-400 hover:text-fuchsia-300">View all</button>
      </div>
      <ul className="mt-4 space-y-4">
        {queue.map((item) => (
          <li key={item.id} className="flex items-start gap-3 rounded-xl border border-slate-800/50 bg-slate-900/40 p-3">
            <PlatformIcon platform={item.platform} />
            <div>
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-slate-400">{item.accountLabel}</p>
              <p className="text-xs text-slate-500">Scheduled {new Date(item.scheduleAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
