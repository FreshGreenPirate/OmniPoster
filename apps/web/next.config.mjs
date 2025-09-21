import { i18n } from "./next-i18next.config.mjs";

const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  transpilePackages: ["@omniposter/core", "@omniposter/providers"],
};

export default nextConfig;
