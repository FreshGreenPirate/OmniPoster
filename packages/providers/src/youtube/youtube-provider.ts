import { randomUUID } from 'crypto';
import axios from 'axios';
import type { PostTarget } from '@omni/core/types/post';
import type { Metrics, PublishInitResult, PublishResult, SocialPublisher, UploadSession } from '../types';

const YOUTUBE_UPLOAD_URL = 'https://www.googleapis.com/upload/youtube/v3/videos';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

type YoutubeConfig = {
  title?: string;
  defaultTitle?: string;
  description?: string;
  privacyStatus?: string;
  mimeType?: string;
  tags?: string[];
  channelId?: string;
};

type YoutubeUploadSession = UploadSession & { accessToken: string };

export class YoutubePublisher implements SocialPublisher {
  constructor(private readonly accessToken: string) {}

  async initUpload(target: PostTarget): Promise<YoutubeUploadSession> {
    const config = (target.platformSpecific as YoutubeConfig | undefined) ?? {};
    const { data } = await axios.post(
      `${YOUTUBE_UPLOAD_URL}?uploadType=resumable`,
      {
        snippet: {
          title: config.title ?? config.defaultTitle ?? 'Untitled',
          description: config.description ?? ''
        },
        status: {
          privacyStatus: config.privacyStatus ?? 'private'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'X-Upload-Content-Type': config.mimeType ?? 'video/mp4'
        }
      }
    );

    return {
      provider: 'youtube',
      sessionId: data.id ?? randomUUID(),
      uploadUrl: data.uploadUrl ?? data.location,
      accessToken: this.accessToken
    };
  }

  async uploadChunk(session: YoutubeUploadSession, payload: ArrayBuffer): Promise<void> {
    await axios.put(session.uploadUrl, payload, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'video/mp4'
      }
    });
  }

  async finalizeUpload(session: YoutubeUploadSession): Promise<PublishInitResult> {
    return {
      uploadId: session.sessionId
    };
  }

  async publish(target: PostTarget, options: { text: string }): Promise<PublishResult> {
    const config = (target.platformSpecific as YoutubeConfig | undefined) ?? {};
    const { data } = await axios.post(
      `${YOUTUBE_API_URL}/videos?part=snippet,status`,
      {
        snippet: {
          title: config.title ?? config.defaultTitle ?? 'Untitled',
          description: options.text,
          tags: config.tags ?? []
        },
        status: {
          privacyStatus: config.privacyStatus ?? 'private'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );

    return {
      externalId: data.id,
      url: `https://youtube.com/watch?v=${data.id}`,
      publishedAt: new Date().toISOString()
    };
  }

  async postFirstComment(target: PostTarget, body: string): Promise<void> {
    const config = (target.platformSpecific as YoutubeConfig | undefined) ?? {};
    const videoId = (target.resultRef as { videoId?: string } | undefined)?.videoId;
    if (!videoId) return;
    await axios.post(
      `${YOUTUBE_API_URL}/commentThreads?part=snippet`,
      {
        snippet: {
          channelId: config.channelId,
          videoId,
          topLevelComment: {
            snippet: {
              textOriginal: body
            }
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );
  }

  async getMetrics(target: PostTarget): Promise<Metrics> {
    const videoId = (target.resultRef as { videoId?: string } | undefined)?.videoId;
    if (!videoId) {
      return { views: 0, likes: 0, comments: 0 };
    }

    const { data } = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        id: videoId,
        part: 'statistics'
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    const stats = data.items?.[0]?.statistics ?? {};

    return {
      views: Number(stats.viewCount ?? 0),
      likes: Number(stats.likeCount ?? 0),
      comments: Number(stats.commentCount ?? 0)
    };
  }
}
