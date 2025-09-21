import { Job } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from './utils';
import { YoutubePublisher, InstagramPublisher, TikTokPublisher } from '@omniposter/providers';
import type { PostTarget } from '@omniposter/core';

export function createUploadProcessor(_connection: IORedis) {
  return async function uploadProcessor(job: Job) {
    const target = await prisma.postTarget.findUnique({
      where: { id: job.data.targetId },
      include: { account: true, post: true },
    });
    if (!target) return;
    const publisher = createPublisher(target);
    const session = await publisher.initUpload(target as unknown as PostTarget);
    await publisher.finalizeUpload(session);
    await prisma.postTarget.update({
      where: { id: target.id },
      data: {
        status: 'UPLOADING',
        resultRef: session.metadata ?? {},
      },
    });
  };
}

function createPublisher(target: any) {
  const credentials = { accessToken: 'demo-token' };
  switch (target.account.platform) {
    case 'youtube':
      return new YoutubePublisher(credentials);
    case 'instagram':
      return new InstagramPublisher(credentials);
    case 'tiktok':
      return new TikTokPublisher(credentials);
    default:
      throw new Error(`Unsupported platform ${target.account.platform}`);
  }
}
