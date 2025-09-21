import axios from 'axios';
import type { PostTarget } from '@omni/core/types/post';
import type { Metrics, PublishInitResult, PublishResult, SocialPublisher, UploadSession } from '../types';

const TIKTOK_API_URL = 'https://open.tiktokapis.com/v2';

type TikTokConfig = {
  coverTimestamp?: number;
  draftId?: string;
  title?: string;
  defaultTitle?: string;
};

type TikTokResult = { draftId?: string; postId?: string; shareUrl?: string };

type TikTokUploadSession = UploadSession & { draftId: string };

export class TikTokPublisher implements SocialPublisher {
  constructor(private readonly accessToken: string) {}

  async initUpload(target: PostTarget): Promise<TikTokUploadSession> {
    const config = (target.platformSpecific as TikTokConfig | undefined) ?? {};
    const { data } = await axios.post(
      `${TIKTOK_API_URL}/post/publish/inbox/video/init/`,
      {
        video_type: 'PUBLISH',
        source_info: {
          source: 'FILE_UPLOAD',
          video_cover_timestamp_ms: config.coverTimestamp ?? 0
        }
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );

    return {
      provider: 'tiktok',
      sessionId: data.upload_id,
      uploadUrl: data.upload_url,
      draftId: data.draft_id
    };
  }

  async uploadChunk(session: TikTokUploadSession, payload: ArrayBuffer): Promise<void> {
    await axios.put(session.uploadUrl, payload, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'video/mp4'
      }
    });
  }

  async finalizeUpload(session: TikTokUploadSession): Promise<PublishInitResult> {
    return {
      uploadId: session.draftId
    };
  }

  async publish(target: PostTarget & { resultRef?: TikTokResult }, options: { text: string }): Promise<PublishResult> {
    const config = (target.platformSpecific as TikTokConfig | undefined) ?? {};
    const draftId = target.resultRef?.draftId ?? config.draftId;
    if (!draftId) {
      throw new Error('TikTok draftId missing. Call initUpload first.');
    }

    const { data } = await axios.post(
      `${TIKTOK_API_URL}/post/publish/inbox/video/submit/`,
      {
        draft_id: draftId,
        post_info: {
          title: config.title ?? config.defaultTitle ?? 'Untitled',
          description: options.text
        }
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );

    return {
      externalId: data.post_id,
      url: data.share_url,
      publishedAt: new Date().toISOString()
    };
  }

  async postFirstComment(): Promise<void> {
    // TikTok API does not support automated first comments currently.
  }

  async getMetrics(target: PostTarget & { resultRef?: TikTokResult }): Promise<Metrics> {
    const postId = target.resultRef?.postId;
    if (!postId) {
      return { views: 0, likes: 0, comments: 0 };
    }

    const { data } = await axios.get(`${TIKTOK_API_URL}/post/publish/status/`, {
      params: {
        post_id: postId
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    const metrics = data.post_status?.metrics ?? {};

    return {
      views: Number(metrics.play_count ?? 0),
      likes: Number(metrics.like_count ?? 0),
      comments: Number(metrics.comment_count ?? 0)
    };
  }
}
