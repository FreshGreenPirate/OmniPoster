import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300', className)}>{children}</span>;
}
