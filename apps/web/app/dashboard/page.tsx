import { Shell } from "@/components/shell";
import { CalendarPreview } from "@/components/calendar-preview";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Shell>
      <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
        <header>
          <h1 className="text-2xl font-semibold">Brand Overview</h1>
          <p className="text-sm text-slate-400">
            Snapshot of your scheduled content, engagement, and collaborators.
          </p>
        </header>
        <Suspense fallback={<div className="h-80 rounded-2xl bg-slate-900/40" />}>
          <CalendarPreview />
        </Suspense>
      </div>
    </Shell>
  );
}
