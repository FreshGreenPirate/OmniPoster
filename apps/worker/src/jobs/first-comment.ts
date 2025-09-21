import type { Job } from "bullmq";
import { createYouTubePublisher, createInstagramPublisher } from "@omniposter/providers";
import type { PostTargetConfig } from "@omniposter/core";

export interface FirstCommentJobData {
  target: PostTargetConfig;
  body: string;
  credentials: {
    platform: "youtube" | "instagram";
    token: string;
    refreshToken?: string;
  };
}

export async function processFirstCommentJob(job: Job<FirstCommentJobData>) {
  const { target, body, credentials } = job.data;

  switch (credentials.platform) {
    case "youtube": {
      const publisher = createYouTubePublisher({
        accessToken: credentials.token,
        refreshToken: credentials.refreshToken,
        channelId: String(target.accountId),
      });
      await publisher.postFirstComment?.(target, body);
      break;
    }
    case "instagram": {
      const publisher = createInstagramPublisher({
        accessToken: credentials.token,
        instagramBusinessAccountId: String(target.accountId),
      });
      await publisher.postFirstComment?.(target, body);
      break;
    }
    default:
      throw new Error(`First comments not supported for ${credentials.platform}`);
  }
}
