'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const demoBrands = [
  {
    id: 'demo-brand',
    name: 'OmniPoster Demo',
    avatarUrl: '/brand.png',
    color: '#6366f1',
  },
];

export function TopBar() {
  const [activeBrand] = useState(demoBrands[0]);
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-slate-900/80 px-6 backdrop-blur">
      <button className="flex items-center gap-3 text-left text-sm">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/80 font-semibold text-white">
          {activeBrand.name[0]}
        </span>
        <span>
          <span className="block text-xs text-slate-400">Workspace</span>
          <span className="block font-medium">{activeBrand.name}</span>
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>
      <div className="flex items-center gap-4">
        <Link href="/notifications" className="text-sm text-slate-300 hover:text-white">
          Notifications
        </Link>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
          DA
        </span>
      </div>
    </header>
  );
}
