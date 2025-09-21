import type { PostTarget } from '@omniposter/core';
import { OAuthPublisher } from '../util/oauth';
import type { Metrics, ProviderOptions, PublishInitResult, PublishResult, SocialPublisher, UploadSession } from '../types';

type InstagramSpecific = {
  caption?: string;
  coverUrl?: string;
  mediaType?: 'REELS' | 'STORIES' | 'POST';
  mediaUrl?: string;
  firstComment?: string;
  igUserId?: string;
  containerId?: string;
};

const getSpec = (target: PostTarget): InstagramSpecific => {
  return (target.platformSpecific ?? {}) as InstagramSpecific;
};

export class InstagramPublisher extends OAuthPublisher implements SocialPublisher {
  constructor(options: ProviderOptions) {
    super({ ...options, baseURL: 'https://graph.facebook.com/v18.0' });
  }

  private getUserId(target: PostTarget): string {
    const spec = getSpec(target);
    const userId = spec.igUserId ?? (target.resultRef as any)?.igUserId;
    if (!userId) throw new Error('Missing Instagram user id');
    return userId;
  }

  async initUpload(target: PostTarget): Promise<UploadSession> {
    const spec = getSpec(target);
    try {
      const userId = this.getUserId(target);
      const { data } = await this.http.post(`/${userId}/media`, {
        media_type: spec.mediaType ?? 'REELS',
        video_url: spec.mediaUrl ?? target.mediaAssetId,
        caption: spec.caption,
        thumb_offset: spec.coverUrl ? 0 : undefined,
      });
      return {
        sessionId: data.id,
        uploadUrl: '',
        metadata: data,
      };
    } catch (error) {
      return this.handleError(error, 'instagram');
    }
  }

  async uploadChunk(): Promise<void> {
    // Instagram Graph API uses hosted media URLs so chunked uploads are not required.
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
      const userId = this.getUserId(target);
      const containerId = spec.containerId ?? (target.resultRef as any)?.id;
      if (!containerId) {
        throw new Error('Missing Instagram media container id');
      }
      const { data } = await this.http.post(`/${userId}/media_publish`, {
        creation_id: containerId,
        caption: spec.caption ?? options.text,
      });
      return {
        externalId: data.id,
        metadata: data,
      };
    } catch (error) {
      return this.handleError(error, 'instagram');
    }
  }

  async postFirstComment(target: PostTarget, body: string): Promise<void> {
    const spec = getSpec(target);
    try {
      const mediaId = spec.containerId ?? (target.resultRef as any)?.mediaId;
      if (!mediaId) return;
      await this.http.post(`/${mediaId}/comments`, {
        message: body,
      });
    } catch (error) {
      this.handleError(error, 'instagram');
    }
  }

  async getMetrics(target: PostTarget): Promise<Metrics> {
    const spec = getSpec(target);
    try {
      const mediaId = spec.containerId ?? (target.resultRef as any)?.mediaId;
      if (!mediaId) return {};
      const { data } = await this.http.get(`/${mediaId}`, {
        params: {
          fields: 'comments_count,like_count,play_count,permalink',
        },
      });
      return {
        views: data.play_count,
        likes: data.like_count,
        comments: data.comments_count,
        permalink: data.permalink,
      };
    } catch (error) {
      return this.handleError(error, 'instagram');
    }
  }
}
