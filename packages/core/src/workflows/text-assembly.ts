import type { PostComposerInputSchema } from '../schemas/post';
import type { PostTargetPlatform } from '../types/post';

const PLATFORM_DEFAULT_ATTACH: Record<PostTargetPlatform, 'prepend' | 'append' | 'replace'> = {
  youtube: 'append',
  instagram: 'append',
  tiktok: 'append',
  snapchat: 'append',
  pinterest: 'append',
  facebook: 'append',
  twitter: 'append',
  reddit: 'append',
  discord: 'append',
  linkedin: 'append',
  whatsapp: 'append',
  telegram: 'append',
  bluesky: 'append'
};

const hashtagNormalizers: Record<PostTargetPlatform, (tags: string[]) => string[]> = {
  youtube: (tags) => tags.map((tag) => tag.replace(/^#/, '')).filter(Boolean),
  instagram: (tags) => tags.map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)),
  tiktok: (tags) => tags.map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)),
  snapchat: (tags) => tags,
  pinterest: (tags) => tags,
  facebook: (tags) => tags,
  twitter: (tags) => tags,
  reddit: (tags) => tags,
  discord: (tags) => tags,
  linkedin: (tags) => tags,
  whatsapp: (tags) => tags,
  telegram: (tags) => tags,
  bluesky: (tags) => tags
};

export type AssembledPost = {
  platform: PostTargetPlatform;
  text: string;
};

export function assemblePostText(input: PostComposerInputSchema) {
  return input.targets.map((target) => {
    const attachMode = input.templateAttachMode ?? PLATFORM_DEFAULT_ATTACH[target.platform];
    const templateBody = input.templateBody ?? '';
    const baseText = resolveTemplate(templateBody, input, target.platform);
    const userText = input.userText;
    const mergedText = mergeText(userText, baseText, attachMode);
    const hashtags = normalizeHashtags(target.platform, target.hashtags ?? []);
    const textWithHashtags =
      input.hashtagSource === 'auto' && hashtags.length > 0
        ? `${mergedText}\n\n${renderHashtags(target.platform, hashtags)}`
        : mergedText;

    return {
      platform: target.platform,
      text: textWithHashtags
    } satisfies AssembledPost;
  });
}

function resolveTemplate(templateBody: string, input: PostComposerInputSchema, platform: PostTargetPlatform) {
  return templateBody
    .replace(/{{topic}}/g, input.title ?? '')
    .replace(/{{cta}}/g, 'Subscribe for more!')
    .replace(/{{hashtags}}/g, (input.targets.find((t) => t.platform === platform)?.hashtags ?? []).join(' '))
    .replace(/{{date}}/g, new Date().toLocaleDateString())
    .replace(/{{platform}}/g, platform)
    .replace(/{{brand}}/g, input.brandId);
}

function mergeText(userText: string, templateBody: string, attachMode: 'prepend' | 'append' | 'replace') {
  switch (attachMode) {
    case 'prepend':
      return `${templateBody}\n\n${userText}`.trim();
    case 'append':
      return `${userText}\n\n${templateBody}`.trim();
    case 'replace':
      return templateBody.trim();
  }
}

function normalizeHashtags(platform: PostTargetPlatform, hashtags: string[]) {
  const normalizer = hashtagNormalizers[platform];
  return normalizer ? normalizer(hashtags) : hashtags;
}

function renderHashtags(platform: PostTargetPlatform, hashtags: string[]) {
  if (platform === 'youtube') {
    return hashtags.join(', ');
  }
  return hashtags.join(' ');
}
