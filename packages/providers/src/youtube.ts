import axios from "axios";
import type {
  Metrics,
  PostTargetConfig,
  PublishInitResult,
  PublishResult,
  SocialPublisher,
  UploadSession,
} from "@omniposter/core";
import { createAuthorizedClient, OAuthTokenSet } from "./utils";

export interface YouTubePublisherOptions extends OAuthTokenSet {
  channelId: string;
}

interface ResumableSession {
  sessionUri: string;
}

async function initResumableUpload(
  options: YouTubePublisherOptions,
  target: PostTargetConfig
): Promise<ResumableSession> {
  const { accessToken } = options;
  const spec = target.platformSpecific as Record<string, any>;
  const response = await axios.post(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      snippet: {
        title: spec?.title ?? "Untitled",
        description: spec?.description ?? "",
        tags: spec?.tags ?? [],
        categoryId: spec?.categoryId ?? "22",
      },
      status: {
        privacyStatus: spec?.privacyStatus ?? "private",
        publishAt: target.scheduleAt.toISOString(),
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Upload-Content-Type": spec?.mimeType ?? "video/*",
      },
    }
  );

  const sessionUri = response.headers["location"] as string;
  if (!sessionUri) {
    throw new Error("Missing YouTube resumable session URI");
  }

  return { sessionUri };
}

async function uploadResumableChunk(session: ResumableSession, chunk: Buffer) {
  await axios.put(session.sessionUri, chunk, {
    headers: {
      "Content-Length": chunk.byteLength,
      "Content-Range": `bytes 0-${chunk.byteLength - 1}/${chunk.byteLength}`,
    },
  });
}

async function finalizeResumableUpload(session: ResumableSession) {
  await axios.post(session.sessionUri, undefined, {
    headers: {
      "Content-Length": 0,
    },
  });
}

export function createYouTubePublisher(
  options: YouTubePublisherOptions
): SocialPublisher {
  return {
    async initUpload(target): Promise<UploadSession> {
      const session = await initResumableUpload(options, target);
      return {
        uploadId: session.sessionUri,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      };
    },

    async uploadChunk(session, chunk) {
      await uploadResumableChunk({ sessionUri: session.uploadId }, Buffer.from(chunk));
    },

    async finalizeUpload(session): Promise<PublishInitResult> {
      await finalizeResumableUpload({ sessionUri: session.uploadId });
      return { externalId: session.uploadId };
    },

    async publish(target): Promise<PublishResult> {
      const client = createAuthorizedClient(
        "https://www.googleapis.com/youtube/v3",
        options.accessToken
      );
      const spec = target.platformSpecific as Record<string, any>;

      const response = await client.post("/videos", {
        part: "status",
        id: spec?.videoId,
        status: {
          privacyStatus: spec?.privacyStatus ?? "private",
          publishAt: target.scheduleAt.toISOString(),
        },
      });

      const videoId = response.data.id ?? spec?.videoId;

      if (target.thumbnailAssetId && spec?.thumbnailDataUrl) {
        await client.post(
          `/thumbnails/set?videoId=${videoId}`,
          Buffer.from(spec.thumbnailDataUrl, "base64"),
          {
            headers: {
              "Content-Type": "image/jpeg",
            },
          }
        );
      }

      return {
        externalId: videoId,
        url: `https://youtube.com/watch?v=${videoId}`,
        publishedAt: new Date(target.scheduleAt),
      };
    },

    async postFirstComment(target, body) {
      const client = createAuthorizedClient(
        "https://www.googleapis.com/youtube/v3",
        options.accessToken
      );
      const spec = target.platformSpecific as Record<string, any>;

      await client.post("/commentThreads?part=snippet", {
        snippet: {
          videoId: spec?.videoId,
          topLevelComment: {
            snippet: {
              textOriginal: body,
            },
          },
        },
      });
    },

    async getMetrics(target): Promise<Metrics> {
      const client = createAuthorizedClient(
        "https://www.googleapis.com/youtube/v3",
        options.accessToken
      );
      const spec = target.platformSpecific as Record<string, any>;
      const response = await client.get("/videos", {
        params: {
          id: spec?.videoId,
          part: "statistics",
        },
      });

      const stats = response.data.items?.[0]?.statistics ?? {};
      return {
        views: Number(stats.viewCount ?? 0),
        likes: Number(stats.likeCount ?? 0),
        comments: Number(stats.commentCount ?? 0),
      };
    },
  };
}
