import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const author = await prisma.author.findFirst();
  return NextResponse.json(author);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  const author = await prisma.author.update({
    where: { id: data.id },
    data: {
      name: data.name,
      bioShort: data.bioShort,
      bioFull: data.bioFull,
    },
  });

  return NextResponse.json(author);
}