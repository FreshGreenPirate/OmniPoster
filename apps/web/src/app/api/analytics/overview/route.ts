import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics-service';

export async function GET(request: NextRequest) {
  const range = (request.nextUrl.searchParams.get('range') ?? '7d') as 'today' | '7d' | '1m' | '3m' | '1y';
  const data = await analyticsService.fetchOverview({ range });
  return NextResponse.json({ data });
}
