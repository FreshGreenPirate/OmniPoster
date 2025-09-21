import { PLATFORM_LABEL } from '@omniposter/core';
import { Badge } from '@/components/workspaces/badge';

interface AccountCardProps {
  account: {
    id: string;
    platform: keyof typeof PLATFORM_LABEL;
    label: string;
    externalId: string;
    status: string;
  };
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-white/5 bg-slate-900/70 px-4 py-3 text-sm">
      <div>
        <p className="font-medium text-white">{account.label}</p>
        <p className="text-xs text-slate-400">{PLATFORM_LABEL[account.platform]} · {account.externalId}</p>
      </div>
      <Badge>{account.status}</Badge>
    </div>
  );
}
