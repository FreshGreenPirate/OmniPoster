import { NextResponse } from 'next/server';
import { assemblePostText } from '@omni/core/workflows/text-assembly';
import { postComposerInputSchema } from '@omni/core/schemas/post';

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = postComposerInputSchema.parse(payload);
  const assembled = assemblePostText(parsed);
  return NextResponse.json({ data: { ...parsed, assembled, id: 'post_mock' } }, { status: 201 });
}
