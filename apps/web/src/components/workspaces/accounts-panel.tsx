import { SUPPORTED_PRIMARY_PLATFORMS, PLATFORM_LABEL } from '@omniposter/core';
import { CollapsibleSection } from '@/components/workspaces/collapsible-section';
import { AccountCard } from '@/components/workspaces/account-card';

const mockAccounts = [
  {
    id: 'yt-1',
    platform: 'youtube',
    label: 'YouTube EN',
    externalId: 'UC123',
    status: 'Connected',
  },
  {
    id: 'yt-2',
    platform: 'youtube',
    label: 'YouTube DE',
    externalId: 'UC456',
    status: 'Connected',
  },
  {
    id: 'ig-1',
    platform: 'instagram',
    label: 'Instagram Main',
    externalId: '@omniposter',
    status: 'Needs Review',
  },
  {
    id: 'tt-1',
    platform: 'tiktok',
    label: 'TikTok Fun',
    externalId: '@omniposter',
    status: 'Connected',
  },
];

export function AccountsPanel() {
  const grouped = SUPPORTED_PRIMARY_PLATFORMS.map((platform) => ({
    platform,
    accounts: mockAccounts.filter((account) => account.platform === platform),
  }));

  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/80 p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-200">Connected accounts</h2>
          <p className="text-xs text-slate-400">Manage OAuth connections and posting permissions.</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {grouped.map((group) => (
          <CollapsibleSection key={group.platform} title={`${PLATFORM_LABEL[group.platform]} (${group.accounts.length})`}>
            <div className="space-y-2">
              {group.accounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          </CollapsibleSection>
        ))}
      </div>
    </div>
  );
}
