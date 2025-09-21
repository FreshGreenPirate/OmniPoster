import { PrismaClient, Platform, Role, TemplateAttachMode, TemplateScope, PostStatus } from '@prisma/client';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@omniposter.app' },
    update: {},
    create: {
      email: 'demo@omniposter.app',
      name: 'Demo Admin',
    },
  });

  const brand = await prisma.brand.upsert({
    where: { id: 'demo-brand' },
    update: {},
    create: {
      id: 'demo-brand',
      ownerId: user.id,
      name: 'OmniPoster Demo',
      primaryColor: '#6366f1',
      defaultTimezone: 'Europe/Berlin',
    },
  });

  await prisma.brandMember.upsert({
    where: {
      brandId_userId: {
        brandId: brand.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      brandId: brand.id,
      userId: user.id,
      role: Role.OWNER,
    },
  });

  const youtubeAccount = await prisma.account.upsert({
    where: { id: 'demo-youtube' },
    update: {},
    create: {
      id: 'demo-youtube',
      brandId: brand.id,
      platform: Platform.youtube,
      label: 'YouTube EN',
      externalIds: { channelId: 'UC123' },
      orderIndex: 0,
    },
  });

  const instagramAccount = await prisma.account.upsert({
    where: { id: 'demo-instagram' },
    update: {},
    create: {
      id: 'demo-instagram',
      brandId: brand.id,
      platform: Platform.instagram,
      label: 'Instagram Main',
      externalIds: { userId: '178414' },
      orderIndex: 1,
    },
  });

  const tiktokAccount = await prisma.account.upsert({
    where: { id: 'demo-tiktok' },
    update: {},
    create: {
      id: 'demo-tiktok',
      brandId: brand.id,
      platform: Platform.tiktok,
      label: 'TikTok Fun',
      externalIds: { advertiserId: '12345' },
      orderIndex: 2,
    },
  });

  await prisma.template.createMany({
    data: [
      {
        brandId: brand.id,
        scope: TemplateScope.brand_platform,
        platform: Platform.youtube,
        name: 'YouTube Default',
        body: 'Remember to like and subscribe! #{{topic}}',
        attachMode: TemplateAttachMode.append,
        defaultForPlatform: true,
      },
      {
        brandId: brand.id,
        scope: TemplateScope.brand_platform,
        platform: Platform.instagram,
        name: 'Insta CTA',
        body: 'Follow for more {{topic}} tips!',
        attachMode: TemplateAttachMode.prepend,
        defaultForPlatform: true,
      },
    ],
    skipDuplicates: true,
  });

  const asset = await prisma.mediaAsset.upsert({
    where: { id: 'demo-asset' },
    update: {},
    create: {
      id: 'demo-asset',
      brandId: brand.id,
      storageKey: 'demo/video.mp4',
      mimeType: 'video/mp4',
      sizeBytes: 1024 * 1024 * 5,
      checksum: 'demo-checksum',
      sourceType: 'upload',
    },
  });

  const post = await prisma.post.upsert({
    where: { id: 'demo-post' },
    update: {},
    create: {
      id: 'demo-post',
      brandId: brand.id,
      userText: 'New video dropping soon about {{topic}}!',
      title: 'Demo Drop',
      hashtagSource: 'auto',
      status: PostStatus.QUEUED,
      timezone: 'Europe/Berlin',
      selectedTemplateId: null,
    },
  });

  const scheduleTime = DateTime.now().plus({ days: 1 }).toJSDate();

  const commentPolicy = await prisma.firstCommentPolicy.upsert({
    where: { id: 'demo-comment-policy' },
    update: {},
    create: {
      id: 'demo-comment-policy',
      brandId: brand.id,
      rules: [
        { body: 'Thanks for watching! Drop your thoughts below 👇', delayMinutes: 5 },
        { body: 'Need the links? Check our bio.', delayMinutes: 15 },
      ],
      appliesToPlatforms: ['youtube', 'instagram'],
      pinPreferred: true,
    },
  });

  await prisma.postTarget.upsert({
    where: { id: 'demo-target-youtube' },
    update: {},
    create: {
      id: 'demo-target-youtube',
      postId: post.id,
      accountId: youtubeAccount.id,
      scheduleAt: scheduleTime,
      uploadBuffer: 60,
      mediaAssetId: asset.id,
      platformSpecific: {
        title: 'Demo YouTube Upload',
        tags: ['omniposter', 'demo'],
        visibility: 'unlisted',
      },
      status: PostStatus.QUEUED,
      firstCommentPolicyId: commentPolicy.id,
    },
  });

  await prisma.postTarget.upsert({
    where: { id: 'demo-target-instagram' },
    update: {},
    create: {
      id: 'demo-target-instagram',
      postId: post.id,
      accountId: instagramAccount.id,
      scheduleAt: scheduleTime,
      uploadBuffer: 30,
      mediaAssetId: asset.id,
      platformSpecific: {
        caption: 'Behind the scenes',
      },
      status: PostStatus.QUEUED,
    },
  });

  await prisma.postTarget.upsert({
    where: { id: 'demo-target-tiktok' },
    update: {},
    create: {
      id: 'demo-target-tiktok',
      postId: post.id,
      accountId: tiktokAccount.id,
      scheduleAt: scheduleTime,
      uploadBuffer: 30,
      mediaAssetId: asset.id,
      platformSpecific: {
        caption: 'TikTok teaser',
      },
      status: PostStatus.QUEUED,
    },
  });

  console.log('Seed complete');
}

main().finally(async () => {
  await prisma.$disconnect();
});
