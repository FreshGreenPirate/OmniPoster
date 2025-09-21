export type HashtagMode = 'auto' | 'manual';

export type PostStatus = 'DRAFT' | 'QUEUED' | 'UPLOADING' | 'PUBLISHED' | 'FAILED';

export type PostTargetStatus = PostStatus;

export type UploadBuffer = 5 | 10 | 15 | 30 | 60 | 180 | 360 | 720 | 1440 | 2880;

export type PostTargetPlatform =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'snapchat'
  | 'pinterest'
  | 'facebook'
  | 'twitter'
  | 'reddit'
  | 'discord'
  | 'linkedin'
  | 'whatsapp'
  | 'telegram'
  | 'bluesky';

export type PostTarget = {
  id: string;
  postId: string;
  accountId: string;
  scheduleAt: string;
  uploadBuffer: UploadBuffer;
  mediaAssetId: string;
  thumbnailAssetId?: string | null;
  firstCommentPolicyId?: string | null;
  platformSpecific: Record<string, unknown>;
  resultRef?: Record<string, unknown> | null;
  status: PostTargetStatus;
};

export type PostComposerInput = {
  brandId: string;
  title?: string | null;
  userText: string;
  hashtagSource: HashtagMode;
  templateId?: string | null;
  timezone: string;
  targets: Array<{
    platform: PostTargetPlatform;
    accountId: string;
    scheduleAt: string;
    uploadBuffer: UploadBuffer;
    platformSpecific?: Record<string, unknown>;
    hashtags?: string[];
  }>;
  templateBody?: string;
  templateAttachMode?: 'prepend' | 'append' | 'replace';
};
