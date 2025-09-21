import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get('brandId');
  if (!brandId) {
    return NextResponse.json({ events: [] });
  }
  const targets = await prisma.postTarget.findMany({
    where: {
      post: { brandId },
    },
    include: { post: true },
  });
  const events = targets.map((target) => ({
    id: target.id,
    title: target.post.title ?? target.post.userText.slice(0, 40),
    scheduleAt: target.scheduleAt,
    status: target.status,
  }));
  return NextResponse.json({ events });
}
