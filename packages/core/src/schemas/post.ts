import { z } from 'zod';

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
  z.literal(2880)
]);

export const postTargetSchema = z.object({
  platform: z.string(),
  accountId: z.string(),
  scheduleAt: z.string(),
  uploadBuffer: uploadBufferSchema,
  platformSpecific: z.record(z.unknown()).optional(),
  hashtags: z.array(z.string()).optional()
});

export const postComposerInputSchema = z.object({
  brandId: z.string(),
  title: z.string().optional().nullable(),
  userText: z.string(),
  hashtagSource: z.enum(['auto', 'manual']),
  templateId: z.string().optional().nullable(),
  timezone: z.string(),
  targets: z.array(postTargetSchema),
  templateBody: z.string().optional(),
  templateAttachMode: z.enum(['prepend', 'append', 'replace']).optional()
});

export type PostComposerInputSchema = z.infer<typeof postComposerInputSchema>;
