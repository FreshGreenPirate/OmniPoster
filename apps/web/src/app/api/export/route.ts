import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get('brandId');
  const format = searchParams.get('format') ?? 'json';
  if (!brandId) {
    return NextResponse.json({ error: 'brandId required' }, { status: 400 });
  }
  const posts = await prisma.post.findMany({
    where: { brandId },
    include: { targets: true },
  });
  if (format === 'csv') {
    const header = 'Post ID,Status,Schedule At,Platform\n';
    const rows = posts
      .flatMap((post) =>
        post.targets.map((target) => `${post.id},${target.status},${target.scheduleAt.toISOString()},${target.accountId}`)
      )
      .join('\n');
    return new NextResponse(header + rows, {
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  }
  return NextResponse.json({ posts });
}
