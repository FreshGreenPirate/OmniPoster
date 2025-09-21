'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CalendarDays, BarChart3, LinkIcon, UploadCloud, Rocket, Hash, Users, Clock, ClipboardList } from 'lucide-react';

const primaryNav = [
  { label: 'Create', href: '/create', icon: Rocket },
  { label: 'Publish', href: '/publish', icon: UploadCloud },
  { label: 'Analyze', href: '/analyze', icon: BarChart3 },
  { label: 'Engage', href: '/engage', icon: Users },
  { label: 'Collaborate', href: '/collaborate', icon: ClipboardList },
  { label: 'Start Page', href: '/start', icon: LinkIcon },
];

const quickLinks = [
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Link in Bio', href: '/link-in-bio', icon: LinkIcon },
  { label: 'Bulk Upload', href: '/bulk-upload', icon: UploadCloud },
  { label: 'Auto Publishing', href: '/auto-publishing', icon: Rocket },
  { label: 'Hashtag Research', href: '/hashtags', icon: Hash },
  { label: 'Agencies', href: '/agencies', icon: Users },
  { label: 'Scheduling', href: '/scheduling', icon: Clock },
  { label: 'Planning', href: '/planning', icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname() ?? '';

  return (
    <aside className="flex w-72 flex-col border-r border-white/5 bg-slate-950/90 backdrop-blur">
      <div className="flex h-16 items-center px-6 text-lg font-semibold">OmniPoster</div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Workspace</p>
          <ul className="space-y-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-800/60',
                    pathname.startsWith(item.href) && 'bg-slate-800 text-white'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Shortcuts</p>
          <ul className="space-y-1">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-800/60',
                    pathname.startsWith(item.href) && 'bg-slate-800 text-white'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
