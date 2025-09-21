import { NextResponse } from 'next/server';
import { demoBrands } from '@/features/brands/demo-brands';

export async function GET() {
  return NextResponse.json({ data: demoBrands });
}

export async function POST(request: Request) {
  const payload = await request.json();
  return NextResponse.json({ data: { ...payload, id: 'brand_mock' } }, { status: 201 });
}
