'use client';

import { useState } from 'react';
import { assemblePostText } from '@omni/core/workflows/text-assembly';
import type { PostComposerInputSchema } from '@omni/core/schemas/post';

export function PostComposer() {
  const [input, setInput] = useState<PostComposerInputSchema | null>(null);
  const [preview, setPreview] = useState<string>('');

  function handlePreview(example: PostComposerInputSchema) {
    setInput(example);
    const [first] = assemblePostText(example);
    setPreview(first?.text ?? '');
  }

  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6">
      <h2 className="text-lg font-semibold text-white">Post Composer</h2>
      <p className="mt-2 text-sm text-slate-400">Unified workflow across YouTube, Instagram, and TikTok.</p>
      <button
        className="mt-4 rounded-full bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white"
        onClick={() =>
          handlePreview({
            brandId: 'brand_1',
            userText: 'New video dropping soon!',
            hashtagSource: 'auto',
            timezone: 'Europe/Berlin',
            targets: [
              {
                platform: 'youtube',
                accountId: 'acc_youtube',
                scheduleAt: new Date().toISOString(),
                uploadBuffer: 30,
                hashtags: ['Launch', '#Premiere']
              }
            ]
          })
        }
      >
        Preview template merge
      </button>
      {input && (
        <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
          Previewing {input.targets.length} target{input.targets.length === 1 ? '' : 's'}
        </p>
      )}
      {preview && (
        <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-800/70 bg-slate-900/50 p-4 text-sm text-slate-200">
          {preview}
        </pre>
      )}
    </div>
  );
}
