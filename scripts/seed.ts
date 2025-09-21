import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@omniposter.dev' },
    update: {},
    create: {
      email: 'demo@omniposter.dev',
      name: 'Demo Creator'
    }
  });

  const brand = await prisma.brand.create({
    data: {
      ownerId: user.id,
      name: 'OmniPoster Demo',
      primaryColor: '#8B5CF6',
      defaultTimezone: 'Europe/Berlin'
    }
  });

  await prisma.brandMember.create({
    data: {
      brandId: brand.id,
      userId: user.id,
      role: 'OWNER'
    }
  });

  await prisma.template.create({
    data: {
      brandId: brand.id,
      scope: 'brand_platform',
      platform: 'youtube',
      name: 'YouTube Default',
      body: '🎬 {{topic}}\n\n{{cta}}\n\n{{hashtags}}',
      attachMode: 'append'
    }
  });

  console.log('Seed completed');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
