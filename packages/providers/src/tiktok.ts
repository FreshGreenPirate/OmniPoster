import type {
  Metrics,
  PostTargetConfig,
  PublishResult,
  SocialPublisher,
  UploadSession,
} from "@omniposter/core";
import { createAuthorizedClient, OAuthTokenSet } from "./utils";

export interface TikTokPublisherOptions extends OAuthTokenSet {
  advertiserId: string;
}

export function createTikTokPublisher(
  options: TikTokPublisherOptions
): SocialPublisher {
  const client = createAuthorizedClient(
    "https://open.tiktokapis.com/v2",
    options.accessToken
  );

  return {
    async initUpload(target): Promise<UploadSession> {
      const spec = target.platformSpecific as Record<string, any>;
      const response = await client.post("/post/publish/video/init/", {
        advertiser_id: options.advertiserId,
        video_md5: spec?.checksum,
        video_size: spec?.sizeBytes,
      });
      return {
        uploadId: response.data.upload_id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30),
      };
    },

    async uploadChunk(session, chunk) {
      await client.post("/post/publish/video/upload/", chunk, {
        params: {
          advertiser_id: options.advertiserId,
          upload_id: session.uploadId,
        },
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
    },

    async finalizeUpload(session) {
      await client.post("/post/publish/video/complete/", {
        advertiser_id: options.advertiserId,
        upload_id: session.uploadId,
      });
      return { externalId: session.uploadId };
    },

    async publish(target): Promise<PublishResult> {
      const spec = target.platformSpecific as Record<string, any>;
      const response = await client.post("/post/publish/", {
        advertiser_id: options.advertiserId,
        post_info: {
          upload_id: spec?.uploadId,
          text: spec?.caption ?? spec?.text ?? "",
          disable_comment: spec?.disableComments ?? false,
          disable_duet: spec?.disableDuet ?? false,
          disable_stitch: spec?.disableStitch ?? false,
          is_draft: spec?.isDraft ?? false,
          schedule_time: Math.floor(target.scheduleAt.getTime() / 1000),
        },
      });

      const postId = response.data.post_id;
      return {
        externalId: postId,
        url: response.data.share_url,
        publishedAt: new Date(target.scheduleAt),
      };
    },

    async getMetrics(target): Promise<Metrics> {
      const spec = target.platformSpecific as Record<string, any>;
      const response = await client.get("/post/insights/", {
        params: {
          advertiser_id: options.advertiserId,
          post_ids: spec?.postId,
        },
      });
      const entry = response.data.metrics?.[0];
      if (!entry) return {};
      return {
        views: Number(entry.play ?? 0),
        likes: Number(entry.like ?? 0),
        comments: Number(entry.comment ?? 0),
        shares: Number(entry.share ?? 0),
      };
    },
  };
}
