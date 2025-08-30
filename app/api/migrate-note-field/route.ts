import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check if columns already exist without modifying the database
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        noteText: true,
        secondaryNoteText: true,
      }
    });

    return NextResponse.json({ 
      message: 'Migration check completed - no database modifications made',
      books: books.length,
      note: 'The noteText and secondaryNoteText fields are available. No database changes were made during this check.'
    });
  } catch (error) {
    console.error('Migration check error:', error);
    return NextResponse.json(
      { error: 'Failed to check migration status', details: error },
      { status: 500 }
    );
  }
}