import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const accounts = await prisma.account.findMany({
    where: { brandId: params.id },
    orderBy: { orderIndex: 'asc' },
  });
  return NextResponse.json({ accounts });
}
