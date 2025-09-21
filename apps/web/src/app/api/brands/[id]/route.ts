import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const brand = await prisma.brand.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json({ brand });
}
