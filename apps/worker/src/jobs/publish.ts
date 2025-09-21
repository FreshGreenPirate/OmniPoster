import type { Job } from "bullmq";
import { assembleText } from "@omniposter/core";
import {
  createYouTubePublisher,
  createInstagramPublisher,
  createTikTokPublisher,
} from "@omniposter/providers";
import type { PostTargetConfig } from "@omniposter/core";

export interface PublishJobData {
  target: PostTargetConfig;
  template?: string | null;
  attachMode?: "prepend" | "append" | "replace";
  hashtags?: string[];
  credentials: {
    platform: "youtube" | "instagram" | "tiktok";
    token: string;
    refreshToken?: string;
  };
}

export async function processPublishJob(job: Job<PublishJobData>) {
  const { target, template = null, attachMode = "append", hashtags = [], credentials } = job.data;

  const baseText = String((target.platformSpecific as Record<string, any>)?.caption ?? "");
  const context = {
    platform: credentials.platform,
    brand: String(target.postId),
    hashtags,
  } as any;
  const resolvedText = assembleText(baseText, template, attachMode, context);

  switch (credentials.platform) {
    case "youtube": {
      const publisher = createYouTubePublisher({
        accessToken: credentials.token,
        refreshToken: credentials.refreshToken,
        channelId: String(target.accountId),
      });
      await publisher.publish({ ...target, platformSpecific: { ...target.platformSpecific, title: resolvedText } });
      break;
    }
    case "instagram": {
      const publisher = createInstagramPublisher({
        accessToken: credentials.token,
        instagramBusinessAccountId: String(target.accountId),
      });
      await publisher.publish({ ...target, platformSpecific: { ...target.platformSpecific, caption: resolvedText } });
      break;
    }
    case "tiktok": {
      const publisher = createTikTokPublisher({
        accessToken: credentials.token,
        advertiserId: String(target.accountId),
      });
      await publisher.publish({ ...target, platformSpecific: { ...target.platformSpecific, caption: resolvedText } });
      break;
    }
    default:
      throw new Error(`Unsupported platform: ${credentials.platform}`);
  }
}
