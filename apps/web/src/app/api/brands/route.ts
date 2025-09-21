import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET() {
  const brands = await prisma.brand.findMany({
    include: {
      members: true,
    },
  });
  return NextResponse.json({ brands });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, ownerId, defaultTimezone } = body;
  if (!name || !ownerId) {
    return NextResponse.json({ error: 'name and ownerId are required' }, { status: 400 });
  }
  const brand = await prisma.brand.create({
    data: {
      name,
      ownerId,
      defaultTimezone: defaultTimezone ?? 'UTC',
    },
  });
  return NextResponse.json({ brand });
}
