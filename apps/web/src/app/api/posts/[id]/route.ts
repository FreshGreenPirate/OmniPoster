import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { targets: true },
  });
  return NextResponse.json({ post });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const post = await prisma.post.update({
    where: { id: params.id },
    data,
    include: { targets: true },
  });
  return NextResponse.json({ post });
}
