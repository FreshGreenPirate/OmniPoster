import { Suspense } from "react";
import Link from "next/link";
import { CalendarIcon, BarChart3, LinkIcon, Upload, Settings2 } from "lucide-react";
import { Shell } from "@/components/shell";
import { QuickLinks } from "@/components/quick-links";
import { BrandSwitcher } from "@/components/brand-switcher";
import { CalendarPreview } from "@/components/calendar-preview";

export default function HomePage() {
  return (
    <Shell>
      <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-6">
        <header className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">OmniPoster</h1>
              <p className="text-slate-300">
                Coordinate every video, caption, and conversation from one command center.
              </p>
            </div>
            <BrandSwitcher />
          </div>
          <QuickLinks />
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard
            title="Publish"
            description="Queue posts, manage uploads, and track approvals."
            href="/dashboard/publish"
            icon={<Upload className="h-5 w-5" />}
          />
          <DashboardCard
            title="Analyze"
            description="Spot performance trends and double down on what works."
            href="/dashboard/analyze"
            icon={<BarChart3 className="h-5 w-5" />}
          />
          <DashboardCard
            title="Link in Bio"
            description="Build beautiful link hubs that stay in sync with your content."
            href="/dashboard/link-in-bio"
            icon={<LinkIcon className="h-5 w-5" />}
          />
          <DashboardCard
            title="Calendar"
            description="Drag-and-drop scheduling with timezone intelligence."
            href="/dashboard/calendar"
            icon={<CalendarIcon className="h-5 w-5" />}
          />
          <DashboardCard
            title="Auto Publishing"
            description="Automate first comments, retries, and notifications."
            href="/dashboard/automation"
            icon={<Settings2 className="h-5 w-5" />}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Suspense fallback={<div className="h-80 rounded-2xl bg-slate-900/40" />}>
            <CalendarPreview />
          </Suspense>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="text-lg font-semibold">Why creators choose OmniPoster</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>✅ Native uploads for YouTube, Instagram, and TikTok.</li>
              <li>✅ First comment automations and link-in-bio builder.</li>
              <li>✅ Agency-friendly workspaces and permissions.</li>
              <li>✅ Internationalization ready from day one.</li>
            </ul>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function DashboardCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-brand hover:bg-slate-900"
    >
      <div className="flex items-center gap-3 text-slate-200">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand">
          {icon}
        </span>
        <h3 className="text-xl font-semibold group-hover:text-white">{title}</h3>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </Link>
  );
}
