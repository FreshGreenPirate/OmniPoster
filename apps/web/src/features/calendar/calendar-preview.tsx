'use client';

import { useMemo } from 'react';
import { Calendar } from '@/lib/ui/calendar-grid';
import { demoScheduledPosts } from '@/features/calendar/demo-posts';

export function CalendarPreview() {
  const events = useMemo(() => demoScheduledPosts, []);

  return (
    <section className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Publishing calendar</h2>
          <p className="text-sm text-slate-400">Drag-and-drop scheduling with timezone awareness.</p>
        </div>
        <button className="rounded-full border border-slate-700 px-4 py-1.5 text-sm text-slate-200 transition hover:border-slate-500">
          Open calendar
        </button>
      </div>
      <Calendar events={events} timezone="Europe/Berlin" />
    </section>
  );
}
