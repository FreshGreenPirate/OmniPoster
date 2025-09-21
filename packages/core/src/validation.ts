import { z } from 'zod';
import { ALL_PLATFORMS } from './platforms';

export const platformSchema = z.enum(ALL_PLATFORMS);

export const idSchema = z.string().uuid();

export const uploadBufferSchema = z.union([
  z.literal(5),
  z.literal(10),
  z.literal(15),
  z.literal(30),
  z.literal(60),
  z.literal(180),
  z.literal(360),
  z.literal(720),
  z.literal(1440),
  z.literal(2880),
]);

export const scheduleSchema = z.object({
  postId: idSchema,
  accountId: idSchema,
  scheduleAt: z.string().datetime(),
  uploadBuffer: uploadBufferSchema,
});

export const templateSchema = z.object({
  id: idSchema.optional(),
  name: z.string().min(1),
  body: z.string().min(1),
  attachMode: z.enum(['prepend', 'append', 'replace']).default('append'),
  platform: platformSchema.nullable().optional(),
  scope: z.enum(['global', 'platform', 'brand_platform']).default('brand_platform'),
});

export const mediaAssetSchema = z.object({
  id: idSchema.optional(),
  mimeType: z.string().min(1),
  sizeBytes: z.number().nonnegative(),
  checksum: z.string().min(1),
});

export const firstCommentRuleSchema = z.object({
  body: z.string().min(1),
  delayMinutes: uploadBufferSchema,
});

export const firstCommentPolicySchema = z.object({
  id: idSchema.optional(),
  brandId: idSchema,
  pinPreferred: z.boolean().default(false),
  appliesToPlatforms: z.array(platformSchema).min(1),
  rules: z.array(firstCommentRuleSchema).min(1),
});
