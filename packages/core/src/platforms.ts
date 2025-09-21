export const SUPPORTED_PRIMARY_PLATFORMS = ['youtube', 'instagram', 'tiktok'] as const;
export const SUPPORTED_PLACEHOLDER_PLATFORMS = [
  'snapchat',
  'pinterest',
  'facebook',
  'twitter',
  'reddit',
  'discord',
  'linkedin',
  'whatsapp',
  'telegram',
  'bluesky'
] as const;

export const ALL_PLATFORMS = [
  ...SUPPORTED_PRIMARY_PLATFORMS,
  ...SUPPORTED_PLACEHOLDER_PLATFORMS
] as const;

export type Platform = (typeof ALL_PLATFORMS)[number];

export const PLATFORM_LABEL: Record<Platform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  snapchat: 'Snapchat',
  pinterest: 'Pinterest',
  facebook: 'Facebook',
  twitter: 'X / Twitter',
  reddit: 'Reddit',
  discord: 'Discord',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  bluesky: 'Bluesky'
};

export const PLATFORM_DEFAULT_ATTACH_MODE: Record<Platform, 'prepend' | 'append' | 'replace'> = {
  youtube: 'append',
  instagram: 'prepend',
  tiktok: 'prepend',
  snapchat: 'append',
  pinterest: 'append',
  facebook: 'append',
  twitter: 'append',
  reddit: 'append',
  discord: 'append',
  linkedin: 'append',
  whatsapp: 'append',
  telegram: 'append',
  bluesky: 'append'
};
