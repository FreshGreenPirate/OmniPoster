import { describe, expect, it } from 'vitest';
import { assembleText } from '../templates';

describe('assembleText', () => {
  it('attaches template text according to mode', () => {
    const result = assembleText({
      platform: 'youtube',
      baseText: 'Base',
      template: { body: 'Template', attachMode: 'prepend' },
      hashtagMode: 'manual',
      hashtags: [],
    });
    expect(result).toBe('Template\n\nBase');
  });

  it('formats hashtags for instagram', () => {
    const result = assembleText({
      platform: 'instagram',
      baseText: 'Caption',
      hashtagMode: 'auto',
      hashtags: ['travel', '#adventure'],
    });
    expect(result.endsWith('#travel #adventure')).toBeTruthy();
  });
});
