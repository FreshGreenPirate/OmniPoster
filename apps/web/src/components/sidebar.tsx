"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  CalendarIcon,
  BarChart3,
  Users2,
  LinkIcon,
  Upload,
  Hash,
  MessageCircle,
  Layers,
  Bot,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Create", href: "/dashboard/create", icon: Sparkles },
  { label: "Publish", href: "/dashboard/publish", icon: Upload },
  { label: "Analyze", href: "/dashboard/analyze", icon: BarChart3 },
  { label: "Engage", href: "/dashboard/engage", icon: MessageCircle },
  { label: "Collaborate", href: "/dashboard/collaborate", icon: Users2 },
  { label: "Start Page", href: "/dashboard/link-in-bio", icon: LinkIcon },
];

const quickLinks = [
  { label: "Calendar", href: "/dashboard/calendar", icon: CalendarIcon },
  { label: "Analytics", href: "/dashboard/analyze", icon: BarChart3 },
  { label: "Link in Bio", href: "/dashboard/link-in-bio", icon: LinkIcon },
  { label: "Bulk Upload", href: "/dashboard/bulk", icon: Layers },
  { label: "Auto Publishing", href: "/dashboard/automation", icon: Bot },
  { label: "Hashtag Research", href: "/dashboard/hashtags", icon: Hash },
  { label: "Agencies", href: "/dashboard/agencies", icon: Users2 },
  { label: "Scheduling", href: "/dashboard/publish", icon: CalendarIcon },
  { label: "Planning", href: "/dashboard/create", icon: Sparkles },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-72 flex-col border-r border-slate-900/60 bg-slate-950/80 p-6">
      <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
        <Sparkles className="h-5 w-5 text-brand" />
        OmniPoster
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-6">
        <div>
          <p className="text-xs uppercase text-slate-500">Main</p>
          <ul className="mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-brand/20 text-brand shadow-inner"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-500">Quick Links</p>
          <ul className="mt-3 space-y-1">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
