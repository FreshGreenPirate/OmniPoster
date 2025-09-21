import type { SocialPublisher } from "@omniposter/core";

interface PlaceholderOptions {
  platform: string;
}

function createPlaceholderPublisher({ platform }: PlaceholderOptions): SocialPublisher {
  return {
    async initUpload() {
      throw new Error(`${platform} upload not yet implemented`);
    },
    async uploadChunk() {
      throw new Error(`${platform} upload not yet implemented`);
    },
    async finalizeUpload() {
      throw new Error(`${platform} upload not yet implemented`);
    },
    async publish() {
      throw new Error(`${platform} publish not yet implemented`);
    },
  } as SocialPublisher;
}

export const SnapchatPublisher = () =>
  createPlaceholderPublisher({ platform: "Snapchat" });
export const PinterestPublisher = () =>
  createPlaceholderPublisher({ platform: "Pinterest" });
export const FacebookPublisher = () =>
  createPlaceholderPublisher({ platform: "Facebook Pages" });
export const TwitterPublisher = () =>
  createPlaceholderPublisher({ platform: "X/Twitter" });
export const RedditPublisher = () =>
  createPlaceholderPublisher({ platform: "Reddit" });
export const DiscordPublisher = () =>
  createPlaceholderPublisher({ platform: "Discord" });
export const LinkedInPublisher = () =>
  createPlaceholderPublisher({ platform: "LinkedIn" });
export const WhatsAppPublisher = () =>
  createPlaceholderPublisher({ platform: "WhatsApp" });
export const TelegramPublisher = () =>
  createPlaceholderPublisher({ platform: "Telegram" });
export const BlueskyPublisher = () =>
  createPlaceholderPublisher({ platform: "Bluesky" });
