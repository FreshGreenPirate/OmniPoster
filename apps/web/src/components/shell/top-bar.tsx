'use client';

import { useState } from 'react';
import { Bell, ChevronsUpDown, Search } from 'lucide-react';
import Image from 'next/image';
import { BrandSwitcher } from '@/components/brand-switcher';
import { cn } from '@/lib/utils';

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800/70 bg-slate-900/60 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className={cn(
            'flex items-center gap-2 rounded-full border border-slate-700/60 px-3 py-1.5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white',
            searchOpen && 'border-slate-400 text-white'
          )}
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:block">Search actions</span>
        </button>
        <BrandSwitcher />
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full border border-slate-700/60 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white">
          <Bell className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-2 rounded-full border border-slate-700/60 px-3 py-1 text-left text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
          <Image src="https://avatars.githubusercontent.com/u/1" alt="User" width={28} height={28} className="rounded-full" />
          <div className="hidden sm:block">
            <p className="font-medium">Taylor Creator</p>
            <p className="text-xs text-slate-400">OWNER</p>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </header>
  );
}
