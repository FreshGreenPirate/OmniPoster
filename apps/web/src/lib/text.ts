import { assembleText, hashtagFormatter } from "@omniposter/core";

interface BuildTextOptions {
  baseText: string;
  template?: string | null;
  attachMode?: "prepend" | "append" | "replace";
  platform: "youtube" | "instagram" | "tiktok";
  hashtags?: string[];
  context?: Record<string, string>;
}

export function buildPlatformText(options: BuildTextOptions) {
  const { baseText, template = null, attachMode = "append", platform, hashtags = [], context = {} } = options;
  const formattedHashtags = hashtagFormatter[platform]?.(hashtags) ?? hashtags.join(" ");

  return assembleText(baseText, template, attachMode, {
    hashtags: [formattedHashtags],
    platform,
    ...context,
  });
}
