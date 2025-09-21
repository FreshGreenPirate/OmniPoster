import type { PostTarget } from '@omniposter/core';

export interface UploadSession {
  sessionId: string;
  uploadUrl: string;
  metadata?: Record<string, unknown>;
}

export interface PublishInitResult {
  externalId: string;
  uploadUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface PublishResult {
  externalId: string;
  permalink?: string;
  metadata?: Record<string, unknown>;
}

export interface Metrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  [key: string]: unknown;
}

export interface SocialPublisher {
  initUpload(target: PostTarget): Promise<UploadSession>;
  uploadChunk(session: UploadSession, chunk: ArrayBuffer | Buffer): Promise<void>;
  finalizeUpload(session: UploadSession): Promise<PublishInitResult>;
  publish(target: PostTarget, options: { text: string }): Promise<PublishResult>;
  postFirstComment(target: PostTarget, body: string): Promise<void>;
  getMetrics(target: PostTarget): Promise<Metrics>;
}

export type ProviderFactory<T extends SocialPublisher = SocialPublisher> = (options: ProviderOptions) => T;

export interface ProviderOptions {
  accessToken: string;
  refreshToken?: string | null;
  expiresAt?: Date | null;
  accountMetadata?: Record<string, unknown>;
}
