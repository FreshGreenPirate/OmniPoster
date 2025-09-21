'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavItem = {
  href: string;
  label: string;
};

export function SidebarNav({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <nav className="px-3">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800/60',
                pathname.startsWith(item.href) && 'bg-slate-800 text-white'
              )}
            >
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
