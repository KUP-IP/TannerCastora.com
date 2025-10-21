import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const start = Date.now();
    const result = await prisma.$queryRaw`select 1 as ok`;
    const durationMs = Date.now() - start;

    return NextResponse.json({
      ok: true,
      db: {
        result,
        durationMs,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}


