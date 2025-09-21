import { CalendarDays, Clock } from 'lucide-react';
import { formatForDisplay } from '@omniposter/core';
import { DateTime } from 'luxon';

const mockEvents = [
  {
    id: 'event-1',
    title: 'YouTube · Demo YouTube Upload',
    scheduleAt: DateTime.now().plus({ hours: 5 }).toISO(),
    timezone: 'Europe/Berlin',
  },
  {
    id: 'event-2',
    title: 'Instagram · Behind the scenes',
    scheduleAt: DateTime.now().plus({ days: 1 }).toISO(),
    timezone: 'Europe/Berlin',
  },
];

export function CalendarPreview() {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/80 p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Upcoming schedule</h2>
          <p className="text-xs text-slate-400">Drag and drop posts from the calendar to adjust timing.</p>
        </div>
        <CalendarDays className="h-5 w-5 text-slate-500" />
      </div>
      <ul className="mt-4 space-y-3">
        {mockEvents.map((event) => (
          <li key={event.id} className="rounded-lg border border-white/5 bg-slate-950/70 px-4 py-3 text-sm">
            <p className="font-medium text-white">{event.title}</p>
            <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              {formatForDisplay(event.scheduleAt, event.timezone)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
