import type { PostTarget } from '@omniposter/core';
import type { Metrics, ProviderFactory, PublishInitResult, PublishResult, SocialPublisher, UploadSession } from '../types';

const unsupported = (provider: string): never => {
  throw new Error(
    `${provider} provider is currently a placeholder. Implement integration before using. TODO: add full API client.`
  );
};

class PlaceholderPublisher implements SocialPublisher {
  constructor(private readonly name: string) {}
  async initUpload(): Promise<UploadSession> {
    unsupported(this.name);
  }
  async uploadChunk(): Promise<void> {
    unsupported(this.name);
  }
  async finalizeUpload(): Promise<PublishInitResult> {
    unsupported(this.name);
  }
  async publish(): Promise<PublishResult> {
    unsupported(this.name);
  }
  async postFirstComment(): Promise<void> {
    unsupported(this.name);
  }
  async getMetrics(): Promise<Metrics> {
    unsupported(this.name);
  }
}

export const createPlaceholderProvider = (name: string): ProviderFactory => {
  return () => new PlaceholderPublisher(name);
};

export const SnapchatProvider = createPlaceholderProvider('snapchat');
export const PinterestProvider = createPlaceholderProvider('pinterest');
export const FacebookPagesProvider = createPlaceholderProvider('facebook');
export const TwitterProvider = createPlaceholderProvider('twitter');
export const RedditProvider = createPlaceholderProvider('reddit');
export const DiscordProvider = createPlaceholderProvider('discord');
export const LinkedInProvider = createPlaceholderProvider('linkedin');
export const WhatsAppProvider = createPlaceholderProvider('whatsapp');
export const TelegramProvider = createPlaceholderProvider('telegram');
export const BlueskyProvider = createPlaceholderProvider('bluesky');
