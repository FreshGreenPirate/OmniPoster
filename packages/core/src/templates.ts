import { formatISO } from 'date-fns';
import { DateTime } from 'luxon';
import type { Platform } from './platforms';
import { PLATFORM_DEFAULT_ATTACH_MODE } from './platforms';

export type TemplateVariables = Record<string, string | number | null | undefined>;

export interface TemplateDefinition {
  body: string;
  attachMode?: 'prepend' | 'append' | 'replace';
}

export interface AssembleTextOptions {
  platform: Platform;
  baseText: string;
  template?: TemplateDefinition | null;
  variables?: TemplateVariables;
  hashtags?: string[];
  hashtagMode?: 'auto' | 'manual';
  scheduledAt?: string | Date;
  brandName?: string;
}

const VARIABLE_REGEX = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;

export const renderTemplate = (template: string, variables: TemplateVariables = {}): string => {
  return template.replace(VARIABLE_REGEX, (_match, key) => {
    const value = variables[key];
    if (value === null || value === undefined) return '';
    if (value instanceof Date) return formatISO(value);
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    return '';
  });
};

const ensureHashtagFormat = (platform: Platform, hashtags: string[]): string[] => {
  if (!hashtags.length) return [];
  switch (platform) {
    case 'youtube':
      return hashtags.map((tag) => tag.replace(/^#/g, '').trim()).filter(Boolean);
    case 'instagram':
    case 'tiktok':
      return hashtags
        .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`))
        .map((tag) => tag.replace(/\s+/g, ''))
        .filter(Boolean);
    default:
      return hashtags;
  }
};

const joinHashtags = (platform: Platform, hashtags: string[]): string => {
  if (!hashtags.length) return '';
  switch (platform) {
    case 'youtube':
      return hashtags.join(', ');
    case 'instagram':
    case 'tiktok':
      return hashtags.join(' ');
    default:
      return hashtags.join(' ');
  }
};

const defaultVariables = (options: AssembleTextOptions): TemplateVariables => {
  const { platform, brandName, scheduledAt } = options;
  const when = scheduledAt
    ? typeof scheduledAt === 'string'
      ? DateTime.fromISO(scheduledAt)
      : DateTime.fromJSDate(scheduledAt)
    : null;
  return {
    platform,
    brand: brandName ?? '',
    date: when ? when.toLocaleString(DateTime.DATETIME_MED) : '',
  } satisfies TemplateVariables;
};

export const assembleText = (options: AssembleTextOptions): string => {
  const variables = { ...defaultVariables(options), ...options.variables } satisfies TemplateVariables;
  const renderedTemplate = options.template
    ? renderTemplate(options.template.body, variables)
    : '';
  const attachMode = options.template?.attachMode ?? PLATFORM_DEFAULT_ATTACH_MODE[options.platform];
  const baseText = renderTemplate(options.baseText, variables).trim();

  const hashtags = options.hashtagMode === 'auto' ? ensureHashtagFormat(options.platform, options.hashtags ?? []) : options.hashtags ?? [];
  const hashtagString = joinHashtags(options.platform, hashtags);

  const parts = {
    prepend: attachMode === 'prepend' ? `${renderedTemplate}\n\n${baseText}`.trim() : baseText,
    append: attachMode === 'append' ? `${baseText}\n\n${renderedTemplate}`.trim() : baseText,
    replace: attachMode === 'replace' ? renderedTemplate : baseText,
  } as const;

  const finalText = attachMode === 'prepend' ? parts.prepend : attachMode === 'append' ? parts.append : parts.replace;
  return hashtagString ? `${finalText}\n\n${hashtagString}`.trim() : finalText;
};
