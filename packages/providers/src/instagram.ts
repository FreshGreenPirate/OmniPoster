import type {
  Metrics,
  PostTargetConfig,
  PublishResult,
  SocialPublisher,
  UploadSession,
} from "@omniposter/core";
import { createAuthorizedClient, OAuthTokenSet } from "./utils";

export interface InstagramPublisherOptions extends OAuthTokenSet {
  instagramBusinessAccountId: string;
}

export function createInstagramPublisher(
  options: InstagramPublisherOptions
): SocialPublisher {
  const client = createAuthorizedClient(
    "https://graph.facebook.com/v18.0",
    options.accessToken
  );

  return {
    async initUpload(target): Promise<UploadSession> {
      const spec = target.platformSpecific as Record<string, any>;
      const response = await client.post(
        `/${options.instagramBusinessAccountId}/media`,
        {
          media_type: "REELS",
          video_url: spec?.videoUrl,
          caption: spec?.caption ?? "",
          cover_url: spec?.coverUrl,
          first_comment: spec?.firstComment,
          share_to_feed: spec?.shareToFeed ?? true,
        }
      );

      return {
        uploadId: response.data.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      };
    },

    async uploadChunk() {
      // Upload handled by Graph API via URL ingestion.
    },

    async finalizeUpload(session) {
      await client.post(`/${session.uploadId}/publish`);
      return { externalId: session.uploadId };
    },

    async publish(target): Promise<PublishResult> {
      const spec = target.platformSpecific as Record<string, any>;
      const response = await client.post(
        `/${options.instagramBusinessAccountId}/media_publish`,
        {
          creation_id: spec?.creationId ?? spec?.creation_id ?? target.id,
        }
      );

      const mediaId = response.data.id;
      return {
        externalId: mediaId,
        url: `https://www.instagram.com/p/${mediaId}/`,
        publishedAt: new Date(target.scheduleAt),
      };
    },

    async postFirstComment(target, body) {
      const spec = target.platformSpecific as Record<string, any>;
      const mediaId = spec?.mediaId;
      if (!mediaId) return;
      await client.post(`/${mediaId}/comments`, { message: body });
    },

    async getMetrics(target): Promise<Metrics> {
      const spec = target.platformSpecific as Record<string, any>;
      const mediaId = spec?.mediaId;
      if (!mediaId) return {};
      const response = await client.get(`/${mediaId}/insights`, {
        params: {
          metric: "impressions,reach,saved,video_views",
        },
      });
      const metrics: Metrics = {};
      for (const item of response.data.data ?? []) {
        metrics[item.name as keyof Metrics] = Number(item.values?.[0]?.value ?? 0);
      }
      return metrics;
    },
  };
}
