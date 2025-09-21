import type { Platform } from './platforms';

export type Role = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  locale: string;
  createdAt: Date;
}

export interface Brand {
  id: string;
  ownerId: string;
  name: string;
  avatarUrl: string | null;
  primaryColor: string | null;
  defaultTimezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandMember {
  id: string;
  brandId: string;
  userId: string;
  role: Role;
  createdAt: Date;
}

export interface Account {
  id: string;
  brandId: string;
  platform: Platform;
  label: string;
  externalIds: Record<string, string>;
  isActive: boolean;
  createdAt: Date;
  orderIndex: number;
}

export interface AccountCredential {
  id: string;
  accountId: string;
  provider: string;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: Date | null;
  scopes: string[];
  metadata: Record<string, unknown> | null;
}

export interface Template {
  id: string;
  brandId: string | null;
  scope: 'global' | 'platform' | 'brand_platform';
  platform: Platform | null;
  name: string;
  body: string;
  attachMode: 'prepend' | 'append' | 'replace';
  defaultForPlatform: boolean;
  isActive: boolean;
}

export interface MediaAsset {
  id: string;
  brandId: string;
  storageKey: string;
  mimeType: string;
  durationSec: number | null;
  width: number | null;
  height: number | null;
  sizeBytes: number;
  checksum: string;
  sourceType: 'upload' | 'url' | 'cloud';
  sourceUrl: string | null;
  createdAt: Date;
}

export interface Post {
  id: string;
  brandId: string;
  title: string | null;
  userText: string;
  selectedTemplateId: string | null;
  resolvedText: string | null;
  hashtagSource: 'auto' | 'manual';
  status: 'DRAFT' | 'QUEUED' | 'UPLOADING' | 'PUBLISHED' | 'FAILED';
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostTarget {
  id: string;
  postId: string;
  accountId: string;
  scheduleAt: Date;
  uploadBuffer: 5 | 10 | 15 | 30 | 60 | 180 | 360 | 720 | 1440 | 2880;
  mediaAssetId: string;
  thumbnailAssetId: string | null;
  firstCommentPolicyId: string | null;
  platformSpecific: Record<string, unknown>;
  resultRef: Record<string, unknown> | null;
  status: Post['status'];
}

export interface FirstCommentRule {
  body: string;
  delayMinutes: PostTarget['uploadBuffer'];
}

export interface FirstCommentPolicy {
  id: string;
  brandId: string;
  rules: FirstCommentRule[];
  pinPreferred: boolean;
  appliesToPlatforms: Platform[];
}

export interface ScheduledJob {
  id: string;
  type: 'UPLOAD' | 'PUBLISH' | 'FIRST_COMMENT' | 'METRICS_REFRESH';
  targetId: string;
  runAt: Date;
  attempts: number;
  backoffStrategy: string | null;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  lastError: string | null;
}

export interface AnalyticsSnapshot {
  id: string;
  postTargetId: string;
  collectedAt: Date;
  metrics: Record<string, unknown>;
}

export interface AuditLog {
  id: string;
  brandId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  createdAt: Date;
}
