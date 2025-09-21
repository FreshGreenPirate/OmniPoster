import { Job } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from './utils';
import { YoutubePublisher, InstagramPublisher } from '@omniposter/providers';

export function createFirstCommentProcessor(_connection: IORedis) {
  return async function firstCommentProcessor(job: Job) {
    const target = await prisma.postTarget.findUnique({
      where: { id: job.data.targetId },
      include: { account: true, firstCommentPolicy: true },
    });
    if (!target || !target.firstCommentPolicy) return;
    const policy = target.firstCommentPolicy;
    const rules = (policy.rules as unknown as { body: string; delayMinutes?: number }[]) ?? [];
    const sorted = [...rules].sort((a, b) => (a.delayMinutes ?? 0) - (b.delayMinutes ?? 0));
    const firstRule = sorted[0];
    if (!firstRule) return;
    const publisher = createPublisher(target.account.platform);
    await publisher.postFirstComment(target as any, firstRule.body);
  };
}

function createPublisher(platform: string) {
  const credentials = { accessToken: 'demo-token' };
  switch (platform) {
    case 'youtube':
      return new YoutubePublisher(credentials);
    case 'instagram':
      return new InstagramPublisher(credentials);
    default:
      throw new Error(`First comments not supported for ${platform}`);
  }
}
