import type { Job } from "bullmq";
import type { PostTargetConfig } from "@omniposter/core";
import { createYouTubePublisher, createInstagramPublisher, createTikTokPublisher } from "@omniposter/providers";

export interface UploadJobData {
  target: PostTargetConfig;
  credentials: {
    platform: "youtube" | "instagram" | "tiktok";
    token: string;
    refreshToken?: string;
  };
}

export async function processUploadJob(job: Job<UploadJobData>) {
  const { target, credentials } = job.data;
  switch (credentials.platform) {
    case "youtube": {
      const publisher = createYouTubePublisher({
        accessToken: credentials.token,
        refreshToken: credentials.refreshToken,
        channelId: String(target.accountId),
      });
      const session = await publisher.initUpload(target);
      await publisher.finalizeUpload(session);
      break;
    }
    case "instagram": {
      const publisher = createInstagramPublisher({
        accessToken: credentials.token,
        instagramBusinessAccountId: String(target.accountId),
      });
      const session = await publisher.initUpload(target);
      await publisher.finalizeUpload(session);
      break;
    }
    case "tiktok": {
      const publisher = createTikTokPublisher({
        accessToken: credentials.token,
        advertiserId: String(target.accountId),
      });
      const session = await publisher.initUpload(target);
      await publisher.finalizeUpload(session);
      break;
    }
    default:
      throw new Error(`Unsupported platform: ${credentials.platform}`);
  }
}
