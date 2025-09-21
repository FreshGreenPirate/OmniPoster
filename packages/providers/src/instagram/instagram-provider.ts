import axios from 'axios';
import type { PostTarget } from '@omni/core/types/post';
import type { Metrics, PublishInitResult, PublishResult, SocialPublisher, UploadSession } from '../types';

const GRAPH_URL = 'https://graph.facebook.com/v18.0';

type InstagramConfig = {
  videoUrl?: string;
  caption?: string;
  creationId?: string;
  firstComment?: string;
};

type InstagramUploadSession = UploadSession & { containerId: string };

type TargetWithResult = PostTarget & { resultRef?: { creationId?: string; mediaId?: string } };

export class InstagramPublisher implements SocialPublisher {
  constructor(private readonly accessToken: string, private readonly igUserId: string) {}

  async initUpload(target: PostTarget): Promise<InstagramUploadSession> {
    const config = (target.platformSpecific as InstagramConfig | undefined) ?? {};
    const { data } = await axios.post(
      `${GRAPH_URL}/${this.igUserId}/media`,
      {
        video_url: config.videoUrl,
        caption: config.caption ?? '',
        media_type: 'REELS'
      },
      {
        params: { access_token: this.accessToken }
      }
    );

    return {
      provider: 'instagram',
      sessionId: data.id,
      uploadUrl: '',
      containerId: data.id
    };
  }

  async uploadChunk(): Promise<void> {
    // Direct uploads use URL reference in MVP
  }

  async finalizeUpload(session: InstagramUploadSession): Promise<PublishInitResult> {
    return {
      uploadId: session.containerId
    };
  }

  async publish(target: TargetWithResult, _options: { text: string }): Promise<PublishResult> {
    const config = (target.platformSpecific as InstagramConfig | undefined) ?? {};
    const creationId = config.creationId ?? target.resultRef?.creationId;
    if (!creationId) {
      throw new Error('Instagram creation id required before publish');
    }

    const { data } = await axios.post(
      `${GRAPH_URL}/${this.igUserId}/media_publish`,
      {
        creation_id: creationId,
        access_token: this.accessToken
      }
    );

    const firstComment = config.firstComment;
    if (firstComment) {
      await this.postFirstComment(
        {
          ...target,
          resultRef: { mediaId: data.id }
        },
        firstComment
      );
    }

    return {
      externalId: data.id,
      url: `https://www.instagram.com/p/${data.id}/`,
      publishedAt: new Date().toISOString()
    };
  }

  async postFirstComment(target: TargetWithResult, body: string): Promise<void> {
    const mediaId = target.resultRef?.mediaId;
    if (!mediaId) return;
    await axios.post(
      `${GRAPH_URL}/${mediaId}/comments`,
      {
        message: body,
        access_token: this.accessToken
      }
    );
  }

  async getMetrics(target: TargetWithResult): Promise<Metrics> {
    const mediaId = target.resultRef?.mediaId;
    if (!mediaId) {
      return { views: 0, likes: 0, comments: 0 };
    }

    const { data } = await axios.get(`${GRAPH_URL}/${mediaId}/insights`, {
      params: {
        metric: 'impressions,reach,video_views,likes,comments,saves,shares',
        access_token: this.accessToken
      }
    });

    const metrics = Object.fromEntries(
      data.data.map((item: { name: string; values: Array<{ value: number }> }) => [item.name, Number(item.values?.[0]?.value ?? 0)])
    );

    return {
      views: (metrics.video_views ?? metrics.impressions ?? 0) as number,
      likes: (metrics.likes ?? 0) as number,
      comments: (metrics.comments ?? 0) as number
    };
  }
}
