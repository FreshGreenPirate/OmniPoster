import { addDays, format } from "date-fns";
import { Fragment } from "react";
import { CalendarIcon } from "lucide-react";

const today = new Date();

const demoEvents = Array.from({ length: 7 }).map((_, index) => {
  const date = addDays(today, index);
  return {
    id: `event-${index}`,
    date,
    platform: ["YouTube", "Instagram", "TikTok"][index % 3],
    title: index % 2 === 0 ? "Weekly Drop" : "Behind the Scenes",
    status: ["Queued", "Uploading", "Published"][index % 3],
  };
});

export function CalendarPreview() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Upcoming schedule</h2>
          <p className="text-sm text-slate-400">Timezone aware across your entire team.</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400">
          <CalendarIcon className="h-4 w-4" />
          {format(today, "MMMM d, yyyy")}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {demoEvents.map((event) => (
          <Fragment key={event.id}>
            <div className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-900/60 p-4">
              <div>
                <p className="text-sm uppercase text-slate-400">{format(event.date, "EEE d MMM")}</p>
                <p className="text-lg font-semibold text-white">{event.title}</p>
                <p className="text-xs text-slate-400">{event.platform}</p>
              </div>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                {event.status}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
