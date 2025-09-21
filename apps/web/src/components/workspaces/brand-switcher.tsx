import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const mockBrands = [
  {
    id: 'demo-brand',
    name: 'OmniPoster Demo',
    avatarUrl: null,
    primaryColor: '#6366f1',
    timezone: 'Europe/Berlin',
  },
  {
    id: 'funfacts',
    name: 'Fun Fact Guy',
    avatarUrl: null,
    primaryColor: '#f59e0b',
    timezone: 'America/New_York',
  },
];

export function BrandSwitcher() {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/80 p-6 shadow">
      <h2 className="text-sm font-semibold text-slate-200">Brands</h2>
      <p className="mt-1 text-xs text-slate-400">Switch between workspaces and manage members.</p>
      <ul className="mt-4 space-y-2">
        {mockBrands.map((brand) => (
          <li key={brand.id}>
            <Link
              href={`/brands/${brand.id}`}
              className="flex items-center justify-between rounded-lg border border-white/5 px-4 py-3 text-sm transition hover:border-brand hover:bg-brand/10"
            >
              <div>
                <p className="font-medium text-white">{brand.name}</p>
                <p className="text-xs text-slate-400">Timezone: {brand.timezone}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/brands/new" className="mt-4 block text-center text-xs font-semibold text-brand hover:underline">
        Create new brand
      </Link>
    </div>
  );
}
