import type { PostTarget } from '@omni/core/types/post';

export type UploadSession = {
  provider: string;
  sessionId: string;
  uploadUrl: string;
  metadata?: Record<string, unknown>;
};

export type PublishInitResult = {
  uploadId: string;
  metadata?: Record<string, unknown>;
};

export type PublishResult = {
  externalId: string;
  url?: string;
  publishedAt: string;
};

export type Metrics = {
  views: number;
  likes: number;
  comments: number;
};

export interface SocialPublisher {
  initUpload(target: PostTarget): Promise<UploadSession>;
  uploadChunk(session: UploadSession, payload: ArrayBuffer): Promise<void>;
  finalizeUpload(session: UploadSession): Promise<PublishInitResult>;
  publish(target: PostTarget, options: { text: string }): Promise<PublishResult>;
  postFirstComment(target: PostTarget, body: string): Promise<void>;
  getMetrics(target: PostTarget): Promise<Metrics>;
}
