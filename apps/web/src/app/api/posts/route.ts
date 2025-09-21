import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function POST(req: Request) {
  const body = await req.json();
  const { brandId, userText, targets } = body;
  if (!brandId || !userText) {
    return NextResponse.json({ error: 'brandId and userText are required' }, { status: 400 });
  }
  const post = await prisma.post.create({
    data: {
      brandId,
      userText,
      targets: {
        create: (targets?.map((target: any) => ({
          accountId: target.accountId,
          scheduleAt: new Date(target.scheduleAt),
          uploadBuffer: target.uploadBuffer,
          mediaAssetId: target.mediaAssetId,
          platformSpecific: target.platformSpecific ?? {},
        })) ?? [],
      },
    },
    include: {
      targets: true,
    },
  });
  return NextResponse.json({ post });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get('brandId');
  const posts = await prisma.post.findMany({
    where: { brandId: brandId ?? undefined },
    include: { targets: true },
  });
  return NextResponse.json({ posts });
}
