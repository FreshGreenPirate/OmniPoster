import Link from "next/link";
import { CalendarIcon, BarChart3, LinkIcon, Hash, Bot, Layers } from "lucide-react";

const quickLinks = [
  { label: "Calendar", href: "/dashboard/calendar", icon: CalendarIcon },
  { label: "Analytics", href: "/dashboard/analyze", icon: BarChart3 },
  { label: "Link in Bio", href: "/dashboard/link-in-bio", icon: LinkIcon },
  { label: "Bulk Upload", href: "/dashboard/bulk", icon: Layers },
  { label: "Auto Publishing", href: "/dashboard/automation", icon: Bot },
  { label: "Hashtag Research", href: "/dashboard/hashtags", icon: Hash },
];

export function QuickLinks() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-slate-300 transition hover:border-brand hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 group-hover:bg-brand/20">
              <Icon className="h-4 w-4" />
            </span>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
