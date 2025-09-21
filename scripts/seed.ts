import { PrismaClient, Platform, Role, PostStatus, UploadBuffer } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@omniposter.app" },
    update: {},
    create: {
      email: "demo@omniposter.app",
      name: "OmniPoster Demo",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
  });

  const brand = await prisma.brand.upsert({
    where: { id: "demo-brand" },
    update: {},
    create: {
      id: "demo-brand",
      ownerId: user.id,
      name: "OmniPoster Demo",
      primaryColor: "#7C3AED",
      defaultTimezone: "America/New_York",
    },
  });

  await prisma.brandMember.upsert({
    where: { id: "demo-member" },
    update: {},
    create: {
      id: "demo-member",
      brandId: brand.id,
      userId: user.id,
      role: Role.OWNER,
    },
  });

  const youtubeAccount = await prisma.account.upsert({
    where: { id: "demo-youtube" },
    update: {},
    create: {
      id: "demo-youtube",
      brandId: brand.id,
      platform: Platform.youtube,
      label: "YouTube EN",
      externalIds: { channelId: "UC123" },
      orderIndex: 0,
    },
  });

  const template = await prisma.template.upsert({
    where: { id: "demo-template" },
    update: {},
    create: {
      id: "demo-template",
      brandId: brand.id,
      scope: "brand_platform",
      platform: Platform.youtube,
      name: "YouTube Hype",
      body: "{{topic}} drops today! {{hashtags}}",
      attachMode: "append",
    },
  });

  const media = await prisma.mediaAsset.upsert({
    where: { id: "demo-media" },
    update: {},
    create: {
      id: "demo-media",
      brandId: brand.id,
      storageKey: "demo/demo.mp4",
      mimeType: "video/mp4",
      sourceType: "upload",
    },
  });

  const post = await prisma.post.upsert({
    where: { id: "demo-post" },
    update: {},
    create: {
      id: "demo-post",
      brandId: brand.id,
      title: "Weekly Deep Dive",
      userText: "Exploring the wonders of the ocean.",
      selectedTemplateId: template.id,
      status: PostStatus.QUEUED,
      timezone: "America/New_York",
    },
  });

  await prisma.postTarget.upsert({
    where: { id: "demo-post-target" },
    update: {},
    create: {
      id: "demo-post-target",
      postId: post.id,
      accountId: youtubeAccount.id,
      scheduleAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      uploadBuffer: UploadBuffer.m30,
      mediaAssetId: media.id,
      platformSpecific: {
        caption: "Dive into facts!",
        tags: ["ocean", "facts"],
      },
    },
  });

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
