import type { Job } from "bullmq";
import { createYouTubePublisher, createInstagramPublisher, createTikTokPublisher } from "@omniposter/providers";
import type { PostTargetConfig } from "@omniposter/core";

export interface MetricsJobData {
  target: PostTargetConfig;
  credentials: {
    platform: "youtube" | "instagram" | "tiktok";
    token: string;
    refreshToken?: string;
  };
}

export async function processMetricsJob(job: Job<MetricsJobData>) {
  const { target, credentials } = job.data;
  switch (credentials.platform) {
    case "youtube": {
      const publisher = createYouTubePublisher({
        accessToken: credentials.token,
        refreshToken: credentials.refreshToken,
        channelId: String(target.accountId),
      });
      await publisher.getMetrics?.(target);
      break;
    }
    case "instagram": {
      const publisher = createInstagramPublisher({
        accessToken: credentials.token,
        instagramBusinessAccountId: String(target.accountId),
      });
      await publisher.getMetrics?.(target);
      break;
    }
    case "tiktok": {
      const publisher = createTikTokPublisher({
        accessToken: credentials.token,
        advertiserId: String(target.accountId),
      });
      await publisher.getMetrics?.(target);
      break;
    }
    default:
      throw new Error(`Metrics not supported for ${credentials.platform}`);
  }
}
