import { describe, expect, it } from 'vitest';
import { assemblePostText } from '../workflows/text-assembly';

const baseInput = {
  brandId: 'brand_1',
  userText: 'Hello world',
  hashtagSource: 'auto' as const,
  timezone: 'Europe/Berlin',
  targets: [
    {
      platform: 'instagram' as const,
      accountId: 'acc_1',
      scheduleAt: new Date().toISOString(),
      uploadBuffer: 30,
      hashtags: ['travel', '#wander']
    }
  ]
};

describe('assemblePostText', () => {
  it('adds hash prefix for instagram tags', () => {
    const result = assemblePostText(baseInput);
    expect(result[0]?.text).toContain('#travel');
    expect(result[0]?.text).toContain('#wander');
  });

  it('strips hash for youtube tags', () => {
    const result = assemblePostText({
      ...baseInput,
      targets: [
        {
          platform: 'youtube',
          accountId: 'acc_yt',
          scheduleAt: new Date().toISOString(),
          uploadBuffer: 30,
          hashtags: ['#shorts', 'Learning']
        }
      ]
    });
    expect(result[0]?.text).toContain('shorts');
    expect(result[0]?.text).toContain('Learning');
    expect(result[0]?.text).not.toContain('#shorts');
  });
});
