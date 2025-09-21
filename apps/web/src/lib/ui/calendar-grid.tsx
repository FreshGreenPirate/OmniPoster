'use client';

import { addDays, eachDayOfInterval, format, startOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';

export type CalendarEvent = {
  id: string;
  title: string;
  platform: string;
  accountLabel: string;
  scheduleAt: string;
};

export function Calendar({ events, timezone }: { events: CalendarEvent[]; timezone: string }) {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end: addDays(start, 6) });

  const eventsByDay = events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const date = format(new Date(event.scheduleAt), 'yyyy-MM-dd');
    acc[date] = acc[date] ? [...acc[date], event] : [event];
    return acc;
  }, {});

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-800/50">
      <header className="flex items-center justify-between bg-slate-900/60 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Week of</p>
          <p className="text-lg font-semibold text-white">{format(start, 'd MMM yyyy')}</p>
        </div>
        <p className="text-xs text-slate-400">Timezone: {timezone}</p>
      </header>
      <div className="grid grid-cols-7 divide-x divide-slate-800/50">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const dayEvents = eventsByDay[key] ?? [];
          return (
            <div key={key} className="min-h-[180px] bg-slate-950/60 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{format(day, 'EEE')}</p>
              <p className={cn('text-lg font-semibold', format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') && 'text-fuchsia-400')}>
                {format(day, 'd')}
              </p>
              <ul className="mt-3 space-y-2">
                {dayEvents.map((event) => (
                  <li key={event.id} className="rounded-lg border border-slate-800/70 bg-slate-900/70 p-2">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="text-xs text-slate-400">{event.platform} • {event.accountLabel}</p>
                    <p className="text-xs text-slate-500">{format(new Date(event.scheduleAt), 'HH:mm')}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
