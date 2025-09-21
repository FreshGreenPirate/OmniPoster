import type { PostTarget } from '@omniposter/core';
import { OAuthPublisher } from '../util/oauth';
import type { Metrics, ProviderOptions, PublishInitResult, PublishResult, SocialPublisher, UploadSession } from '../types';

type TikTokSpecific = {
  caption?: string;
  coverTime?: number;
  videoId?: string;
  tiktokUserId?: string;
  scheduleType?: 'PUBLISH_NOW' | 'SCHEDULE';
  privacy?: string;
};

const getSpec = (target: PostTarget): TikTokSpecific => {
  return (target.platformSpecific ?? {}) as TikTokSpecific;
};

export class TikTokPublisher extends OAuthPublisher implements SocialPublisher {
  constructor(options: ProviderOptions) {
    super({ ...options, baseURL: 'https://open.tiktokapis.com/v2' });
  }

  async initUpload(target: PostTarget): Promise<UploadSession> {
    const spec = getSpec(target);
    try {
      const { data } = await this.http.post('/post/publish/video/init/', {
        post_info: {
          title: spec.caption ?? '',
          privacy_level: spec.privacy ?? 'PUBLIC',
          disable_duet: false,
          disable_stitch: false,
          schedule_time:
            spec.scheduleType === 'SCHEDULE'
              ? Math.floor(target.scheduleAt.getTime() / 1000)
              : undefined,
        },
      });
      return {
        sessionId: data.upload_id,
        uploadUrl: data.upload_url,
        metadata: data,
      };
    } catch (error) {
      return this.handleError(error, 'tiktok');
    }
  }

  async uploadChunk(session: UploadSession, chunk: ArrayBuffer | Buffer): Promise<void> {
    try {
      await this.http.post(session.uploadUrl, chunk, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
    } catch (error) {
      this.handleError(error, 'tiktok');
    }
  }

  async finalizeUpload(session: UploadSession): Promise<PublishInitResult> {
    return {
      externalId: session.sessionId,
      metadata: session.metadata,
    };
  }

  async publish(target: PostTarget, options: { text: string }): Promise<PublishResult> {
    const spec = getSpec(target);
    try {
      const { data } = await this.http.post('/post/publish/video', {
        upload_id: (target.resultRef as any)?.upload_id ?? spec.videoId,
        post_info: {
          title: spec.caption ?? options.text,
          privacy_level: spec.privacy ?? 'PUBLIC',
          schedule_time:
            spec.scheduleType === 'SCHEDULE' ? Math.floor(target.scheduleAt.getTime() / 1000) : undefined,
        },
      });
      return {
        externalId: data.id,
        metadata: data,
      };
    } catch (error) {
      return this.handleError(error, 'tiktok');
    }
  }

  async postFirstComment(): Promise<void> {
    // TikTok API does not support automated first comments yet.
  }

  async getMetrics(target: PostTarget): Promise<Metrics> {
    try {
      const videoId = (target.resultRef as any)?.videoId ?? getSpec(target).videoId;
      if (!videoId) return {};
      const { data } = await this.http.get('/post/publish/status/', {
        params: {
          post_id: videoId,
        },
      });
      return {
        views: data.data?.play_count,
        likes: data.data?.like_count,
        comments: data.data?.comment_count,
        shares: data.data?.share_count,
      };
    } catch (error) {
      return this.handleError(error, 'tiktok');
    }
  }
}
