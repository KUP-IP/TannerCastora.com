import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Update book cover
    const bookUpdated = await prisma.book.updateMany({
      data: {
        coverPath: '/uploads/1755542688365-Stig_book_cover_r18-v2.4.png',
      },
    });

    // Update author photo (using the latest upload)
    const authorUpdated = await prisma.author.updateMany({
      data: {
        photoPath: '/uploads/1755543196134-Tanner-47.jpg',
      },
    });

    return NextResponse.json({ 
      message: 'Assets updated successfully!',
      bookUpdated: bookUpdated.count,
      authorUpdated: authorUpdated.count
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update assets' },
      { status: 500 }
    );
  }
}