import { defaultI18nConfig } from '@omniposter/core';

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    defaultLocale: defaultI18nConfig.defaultLocale,
    locales: defaultI18nConfig.supportedLocales,
  },
};

export default nextConfig;
