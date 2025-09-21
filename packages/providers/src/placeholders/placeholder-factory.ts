import type { PostTarget } from '@omni/core/types/post';

const placeholderPlatforms = [
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

export type PlaceholderPlatform = (typeof placeholderPlatforms)[number];

class PlaceholderPublisher implements SocialPublisher {
  constructor(private readonly platform: PlaceholderPlatform) {}

  async initUpload(): Promise<UploadSession> {
    return {
      provider: this.platform,
      sessionId: `stub-${this.platform}-${Date.now()}`,
      uploadUrl: ''
    };
  }

  async uploadChunk(): Promise<void> {
    throw new Error(`TODO: Implement ${this.platform} chunk uploads`);
  }

  async finalizeUpload(): Promise<PublishInitResult> {
    throw new Error(`TODO: Implement ${this.platform} finalize upload`);
  }

  async publish(): Promise<PublishResult> {
    throw new Error(`TODO: Implement ${this.platform} publish`);
  }

  async postFirstComment(): Promise<void> {
    throw new Error(`TODO: Implement ${this.platform} first comment support`);
  }

  async getMetrics(): Promise<Metrics> {
    throw new Error(`TODO: Implement ${this.platform} metrics retrieval`);
  }
}

export function createPlaceholderPublisher(platform: PlaceholderPlatform): SocialPublisher {
  return new PlaceholderPublisher(platform);
}
