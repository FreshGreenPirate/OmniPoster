import type { PostTarget } from '@omniposter/core';
import { OAuthPublisher } from '../util/oauth';
import type { Metrics, ProviderOptions, PublishInitResult, PublishResult, SocialPublisher, UploadSession } from '../types';

type YouTubeSpecific = {
  title?: string;
  description?: string;
  tags?: string[];
  defaultLanguage?: string;
  visibility?: string;
  mimeType?: string;
  videoId?: string;
  categoryId?: string;
};

interface YouTubeUploadSession extends UploadSession {
  videoId?: string;
}

const getSpec = (target: PostTarget): YouTubeSpecific => {
  return (target.platformSpecific ?? {}) as YouTubeSpecific;
};

export class YoutubePublisher extends OAuthPublisher implements SocialPublisher {
  constructor(options: ProviderOptions) {
    super({ ...options, baseURL: 'https://www.googleapis.com' });
  }

  async initUpload(target: PostTarget): Promise<YouTubeUploadSession> {
    const spec = getSpec(target);
    try {
      const response = await this.http.post(
        '/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
        {
          snippet: {
            title: spec.title ?? 'Scheduled upload',
            description: spec.description ?? '',
            tags: spec.tags ?? [],
            defaultLanguage: spec.defaultLanguage ?? 'en',
          },
          status: {
            privacyStatus: spec.visibility ?? 'private',
            selfDeclaredMadeForKids: false,
            publishAt: target.scheduleAt.toISOString(),
          },
        },
        {
          headers: {
            'X-Upload-Content-Type': spec.mimeType ?? 'video/*',
          },
        }
      );
      const uploadUrl = response.headers['location'];
      if (!uploadUrl) throw new Error('Missing upload URL');
      return {
        sessionId: response.headers['x-guploader-uploadid'] ?? `yt_${Date.now()}`,
        uploadUrl,
      };
    } catch (error) {
      return this.handleError(error, 'youtube');
    }
  }

  async uploadChunk(session: UploadSession, chunk: ArrayBuffer | Buffer): Promise<void> {
    try {
      await this.http.put(session.uploadUrl, chunk, {
        headers: {
          'Content-Length': chunk instanceof Buffer ? chunk.length : chunk.byteLength,
        },
      });
    } catch (error) {
      this.handleError(error, 'youtube');
    }
  }

  async finalizeUpload(session: YouTubeUploadSession): Promise<PublishInitResult> {
    return {
      externalId: session.videoId ?? session.sessionId,
      uploadUrl: session.uploadUrl,
    };
  }

  async publish(target: PostTarget, options: { text: string }): Promise<PublishResult> {
    const spec = getSpec(target);
    try {
      const { data } = await this.http.post(
        '/youtube/v3/videos?part=snippet,status',
        {
          id: spec.videoId,
          snippet: {
            title: spec.title ?? target.postId,
            description: options.text,
            tags: spec.tags ?? [],
            categoryId: spec.categoryId ?? '22',
          },
          status: {
            privacyStatus: spec.visibility ?? 'private',
            publishAt: target.scheduleAt.toISOString(),
          },
        }
      );
      return {
        externalId: data.id,
        permalink: `https://youtube.com/watch?v=${data.id}`,
        metadata: data,
      };
    } catch (error) {
      return this.handleError(error, 'youtube');
    }
  }

  async postFirstComment(target: PostTarget, body: string): Promise<void> {
    const spec = getSpec(target);
    try {
      await this.http.post('/youtube/v3/commentThreads?part=snippet', {
        snippet: {
          videoId: spec.videoId,
          topLevelComment: {
            snippet: {
              textOriginal: body,
            },
          },
        },
      });
    } catch (error) {
      this.handleError(error, 'youtube');
    }
  }

  async getMetrics(target: PostTarget): Promise<Metrics> {
    const spec = getSpec(target);
    try {
      const videoId = spec.videoId ?? (target.resultRef as any)?.videoId;
      if (!videoId) return {};
      const { data } = await this.http.get('/youtube/v3/videos', {
        params: {
          part: 'statistics',
          id: videoId,
        },
      });
      const stats = data.items?.[0]?.statistics ?? {};
      return {
        views: Number(stats.viewCount ?? 0),
        likes: Number(stats.likeCount ?? 0),
        comments: Number(stats.commentCount ?? 0),
      };
    } catch (error) {
      return this.handleError(error, 'youtube');
    }
  }
}
