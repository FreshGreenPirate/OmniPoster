'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { demoBrands } from '@/features/brands/demo-brands';

export function BrandSwitcher() {
  const brands = useMemo(() => demoBrands, []);
  const [selected] = useState(brands[0]);

  return (
    <button className="flex items-center gap-2 rounded-full border border-slate-700/60 px-3 py-1 text-left text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
      <Image src={selected.avatarUrl} alt={selected.name} width={28} height={28} className="rounded-full" />
      <div className="hidden sm:block">
        <p className="font-medium">{selected.name}</p>
        <p className="text-xs text-slate-400">{selected.defaultTimezone}</p>
      </div>
      <ChevronsUpDown className="h-4 w-4 text-slate-500" />
      <span className="ml-2 flex items-center gap-1 rounded-full border border-dashed border-slate-600 px-2 py-0.5 text-xs text-slate-400">
        <Plus className="h-3 w-3" />
        Add brand
      </span>
    </button>
  );
}
