import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';
import { nextRunFromBuffer } from '@omniposter/core';

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { targets: true },
  });
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  for (const target of post.targets) {
    const runAt = nextRunFromBuffer(target.scheduleAt, target.uploadBuffer);
    await prisma.scheduledJob.create({
      data: {
        type: 'UPLOAD',
        targetId: target.id,
        runAt,
        backoffStrategy: 'exponential',
      },
    });
    await prisma.scheduledJob.create({
      data: {
        type: 'PUBLISH',
        targetId: target.id,
        runAt: target.scheduleAt,
        backoffStrategy: 'exponential',
      },
    });
    await prisma.postTarget.update({
      where: { id: target.id },
      data: { status: 'QUEUED' },
    });
  }
  await prisma.post.update({ where: { id: post.id }, data: { status: 'QUEUED' } });
  return NextResponse.json({ success: true });
}
