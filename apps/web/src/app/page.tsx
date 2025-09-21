import { Suspense } from 'react';
import { BrandSwitcher } from '@/components/workspaces/brand-switcher';
import { AccountsPanel } from '@/components/workspaces/accounts-panel';
import { CalendarPreview } from '@/components/calendar/calendar-preview';
import { AnalyticsSummary } from '@/components/analytics/analytics-summary';
import { LinkInBioPreview } from '@/components/link-in-bio/link-in-bio-preview';

export default async function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <BrandSwitcher />
          <Suspense fallback={<div className="rounded-lg border border-white/5 p-6">Loading accounts...</div>}>
            <AccountsPanel />
          </Suspense>
        </div>
        <div className="space-y-6">
          <CalendarPreview />
          <AnalyticsSummary />
        </div>
      </section>
      <section>
        <LinkInBioPreview />
      </section>
    </div>
  );
}
