import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const account = await prisma.account.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json({ account });
}
