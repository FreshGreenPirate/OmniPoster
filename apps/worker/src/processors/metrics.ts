import { Job } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from './utils';
import { YoutubePublisher, InstagramPublisher, TikTokPublisher } from '@omniposter/providers';

export function createMetricsProcessor(_connection: IORedis) {
  return async function metricsProcessor(job: Job) {
    const target = await prisma.postTarget.findUnique({
      where: { id: job.data.targetId },
      include: { account: true },
    });
    if (!target) return;
    const publisher = createPublisher(target.account.platform);
    const metrics = await publisher.getMetrics(target as any);
    await prisma.analyticsSnapshot.create({
      data: {
        postTargetId: target.id,
        metrics,
      },
    });
  };
}

function createPublisher(platform: string) {
  const credentials = { accessToken: 'demo-token' };
  switch (platform) {
    case 'youtube':
      return new YoutubePublisher(credentials);
    case 'instagram':
      return new InstagramPublisher(credentials);
    case 'tiktok':
      return new TikTokPublisher(credentials);
    default:
      throw new Error(`Metrics not implemented for ${platform}`);
  }
}
