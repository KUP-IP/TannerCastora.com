import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const socialLinks = await prisma.socialLink.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(socialLinks);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  
  const count = await prisma.socialLink.count();
  if (count >= 6) {
    return NextResponse.json({ error: 'Maximum 6 social links allowed' }, { status: 400 });
  }

  const socialLink = await prisma.socialLink.create({
    data: {
      label: data.label,
      url: data.url,
      icon: data.icon,
      order: data.order ?? count,
    },
  });

  return NextResponse.json(socialLink);
}