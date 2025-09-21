import { Suspense } from 'react';
import { AnalyticsOverview } from '@/features/analytics/analytics-overview';
import { CalendarPreview } from '@/features/calendar/calendar-preview';
import { UpcomingQueue } from '@/features/publish/upcoming-queue';
import { PostComposer } from '@/features/composer/post-composer';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-white">Welcome back, Taylor 👋</h1>
          <p className="text-sm text-slate-400">
            Your multi-platform publishing cockpit. Review upcoming posts, monitor analytics, and coordinate your team.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-fuchsia-400">
            Compose post
          </button>
          <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
            Bulk upload
          </button>
        </div>
      </div>
      <PostComposer />
      <Suspense fallback={<div className="rounded-xl border border-slate-800/60 p-6">Loading analytics...</div>}>
        <AnalyticsOverview />
      </Suspense>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CalendarPreview />
        </div>
        <div className="lg:col-span-2">
          <UpcomingQueue />
        </div>
      </div>
    </div>
  );
}
