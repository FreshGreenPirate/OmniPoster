import { Job } from 'bullmq';
import IORedis from 'ioredis';
import { assembleText, TemplateDefinition } from '@omniposter/core';
import { prisma } from './utils';
import { YoutubePublisher, InstagramPublisher, TikTokPublisher } from '@omniposter/providers';

export function createPublishProcessor(_connection: IORedis) {
  return async function publishProcessor(job: Job) {
    const target = await prisma.postTarget.findUnique({
      where: { id: job.data.targetId },
      include: { account: true, post: true },
    });
    if (!target) return;
    const publisher = createPublisher(target.account.platform);

    let templateDef: TemplateDefinition | undefined;
    if (target.post.selectedTemplateId) {
      const template = await prisma.template.findUnique({ where: { id: target.post.selectedTemplateId } });
      if (template) {
        templateDef = {
          body: template.body,
          attachMode: template.attachMode,
        };
      }
    }

    const text = assembleText({
      platform: target.account.platform as any,
      baseText: target.post.userText,
      hashtagMode: target.post.hashtagSource,
      hashtags: ['omniposter', 'launch'],
      template: templateDef,
    });
    const result = await publisher.publish(target as any, { text });
    await prisma.postTarget.update({
      where: { id: target.id },
      data: {
        status: 'PUBLISHED',
        resultRef: result.metadata ?? {},
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
      throw new Error(`Unsupported platform ${platform}`);
  }
}
