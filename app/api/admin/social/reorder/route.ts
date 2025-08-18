import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const updates: Array<{ id: number; order: number }> = await request.json();
  
  await Promise.all(
    updates.map((item) =>
      prisma.socialLink.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );

  return NextResponse.json({ success: true });
}