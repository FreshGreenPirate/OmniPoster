import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, discordWebhook } = body;
  return NextResponse.json({
    success: true,
    saved: {
      email,
      discordWebhook,
    },
  });
}
