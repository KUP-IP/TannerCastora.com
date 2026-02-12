import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const book = await prisma.book.findFirst();
  return NextResponse.json(book);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  const book = await prisma.book.update({
    where: { id: data.id },
    data: {
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      amazonUrl: data.amazonUrl,
      hardcoverStripeUrl: data.hardcoverStripeUrl || null,
      softcoverStripeUrl: data.softcoverStripeUrl || null,
      hardcoverSignedStripeUrl: data.hardcoverSignedStripeUrl || null,
      softcoverSignedStripeUrl: data.softcoverSignedStripeUrl || null,
      noteText: data.noteText || null,
      secondaryNoteText: data.secondaryNoteText || null,
    },
  });

  return NextResponse.json(book);
}