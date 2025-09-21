'use client';

import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CollapsibleSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg border border-white/5 bg-slate-950/70">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 transition', open ? 'rotate-180' : 'rotate-0')} />
      </button>
      {open && <div className="border-t border-white/5 p-4 text-sm text-slate-200">{children}</div>}
    </div>
  );
}
