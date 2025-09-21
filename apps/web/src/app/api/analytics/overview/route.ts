import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get('brandId');
  if (!brandId) {
    return NextResponse.json({ metrics: [] });
  }
  const targets = await prisma.postTarget.findMany({
    where: {
      post: { brandId },
      status: 'PUBLISHED',
    },
    include: { analytics: true },
  });
  const metrics = targets.map((target) => ({
    targetId: target.id,
    metrics: target.analytics.at(-1)?.metrics ?? {},
  }));
  return NextResponse.json({ metrics });
}
