'use client';

import { Youtube, Instagram, Music4, Hash, Share2, MessageSquare } from 'lucide-react';

const platformColors: Record<string, string> = {
  youtube: 'bg-red-600',
  instagram: 'bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400',
  tiktok: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 border border-slate-700',
  default: 'bg-slate-800'
};

export function PlatformIcon({ platform }: { platform: string }) {
  const iconClass = 'h-4 w-4 text-white';
  const baseClass = platformColors[platform] ?? platformColors.default;

  const icon = (() => {
    switch (platform) {
      case 'youtube':
        return <Youtube className={iconClass} />;
      case 'instagram':
        return <Instagram className={iconClass} />;
      case 'tiktok':
        return <Music4 className={iconClass} />;
      case 'twitter':
        return <Share2 className={iconClass} />;
      case 'reddit':
        return <MessageSquare className={iconClass} />;
      default:
        return <Hash className={iconClass} />;
    }
  })();

  return (
    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${baseClass}`}>{icon}</span>
  );
}
