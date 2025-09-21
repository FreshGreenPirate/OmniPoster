import { z } from "zod";

export const Platforms = [
  "youtube",
  "instagram",
  "tiktok",
  "snapchat",
  "pinterest",
  "facebook",
  "twitter",
  "reddit",
  "discord",
  "linkedin",
  "whatsapp",
  "telegram",
  "bluesky",
] as const;

export type Platform = (typeof Platforms)[number];

export const UploadBufferMinutes = [
  5,
  10,
  15,
  30,
  60,
  180,
  360,
  720,
  1440,
  2880,
] as const;

export type UploadBuffer = (typeof UploadBufferMinutes)[number];

export const postStatusSchema = z.enum([
  "DRAFT",
  "QUEUED",
  "UPLOADING",
  "PUBLISHED",
  "FAILED",
]);

export type PostStatus = z.infer<typeof postStatusSchema>;

export interface UploadSession {
  uploadId: string;
  expiresAt: Date;
  metadata?: Record<string, unknown>;
}

export interface PublishInitResult {
  externalId?: string;
  additionalData?: Record<string, unknown>;
}

export interface PublishResult {
  externalId: string;
  url?: string;
  publishedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface Metrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  impressions?: number;
}

export interface FirstCommentRule {
  body: string;
  delayMinutes: UploadBuffer;
}

export interface PostTargetConfig {
  id: string;
  postId: string;
  accountId: string;
  scheduleAt: Date;
  uploadBuffer: UploadBuffer;
  mediaAssetId: string;
  thumbnailAssetId?: string | null;
  platformSpecific: Record<string, unknown>;
}

export interface SocialPublisher {
  initUpload(target: PostTargetConfig): Promise<UploadSession>;
  uploadChunk(session: UploadSession, chunk: Buffer | Uint8Array): Promise<void>;
  finalizeUpload(session: UploadSession): Promise<PublishInitResult>;
  publish(target: PostTargetConfig, options?: Record<string, unknown>): Promise<PublishResult>;
  postFirstComment?(target: PostTargetConfig, body: string): Promise<void>;
  getMetrics?(target: PostTargetConfig): Promise<Metrics>;
}

export const hashtagFormatter = {
  youtube: (tags: string[]) =>
    tags
      .map((tag) => tag.replace(/^#+/, ""))
      .filter(Boolean)
      .join(", "),
  instagram: (tags: string[]) =>
    tags
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
      .join(" "),
  tiktok: (tags: string[]) =>
    tags
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
      .join(" "),
};

export interface TemplateInterpolationContext {
  topic?: string;
  cta?: string;
  hashtags?: string[];
  date?: string;
  platform?: string;
  brand?: string;
}

const templateVariableRegex = /{{\s*(\w+)\s*}}/g;

export function interpolateTemplate(
  body: string,
  context: TemplateInterpolationContext
): string {
  return body.replace(templateVariableRegex, (_, variable: string) => {
    const key = variable as keyof TemplateInterpolationContext;
    const value = context[key];
    if (!value) {
      return "";
    }

    if (Array.isArray(value)) {
      return value.join(" ");
    }

    return String(value);
  });
}

export function assembleText(
  baseText: string,
  template: string | null,
  attachMode: "prepend" | "append" | "replace",
  context: TemplateInterpolationContext
) {
  const interpolated = template ? interpolateTemplate(template, context) : "";
  switch (attachMode) {
    case "prepend":
      return [interpolated, baseText].filter(Boolean).join("\n\n").trim();
    case "append":
      return [baseText, interpolated].filter(Boolean).join("\n\n").trim();
    case "replace":
      return interpolated || baseText;
    default:
      return baseText;
  }
}

export class OmniPosterError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly meta?: Record<string, unknown>
  ) {
    super(message);
    this.name = "OmniPosterError";
  }
}

export function exponentialBackoff(attempt: number, baseDelayMs = 1000) {
  return Math.min(60_000, baseDelayMs * 2 ** attempt);
}
