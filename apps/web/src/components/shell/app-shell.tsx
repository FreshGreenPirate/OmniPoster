'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { SidebarNav } from './sidebar-nav';
import { TopBar } from './top-bar';

const navItems = [
  { href: '/create', label: 'Create' },
  { href: '/publish', label: 'Publish' },
  { href: '/analyze', label: 'Analyze' },
  { href: '/engage', label: 'Engage' },
  { href: '/collaborate', label: 'Collaborate' },
  { href: '/start', label: 'Start Page' }
];

const quickLinks = [
  { href: '/calendar', label: 'Calendar' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/link-in-bio', label: 'Link in Bio' },
  { href: '/bulk-upload', label: 'Bulk Upload' },
  { href: '/auto-publishing', label: 'Auto Publishing' },
  { href: '/hashtag-research', label: 'Hashtag Research' },
  { href: '/agencies', label: 'Agencies' },
  { href: '/scheduling', label: 'Scheduling' },
  { href: '/planning', label: 'Planning' }
];

export default function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname() ?? "";

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950/70 md:block">
        <div className="flex h-16 items-center gap-2 px-6 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-2xl">
            ⧉
          </span>
          <span>OmniPoster</span>
        </div>
        <SidebarNav items={navItems} pathname={pathname} />
        <div className="mt-8 px-6">
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Quick links</p>
          <ul className="space-y-1 text-sm text-slate-200">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-md px-2 py-1 transition hover:bg-slate-800/50',
                    pathname.startsWith(item.href) && 'bg-slate-800/60 text-white'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-slate-950/30 px-6 pb-16 pt-6">
          <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
