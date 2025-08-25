import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Try to add the noteText field via raw SQL
    try {
      await prisma.$executeRaw`ALTER TABLE "Book" ADD COLUMN IF NOT EXISTS "noteText" TEXT`;
      console.log('Successfully added noteText column');
    } catch (error) {
      console.log('Column might already exist or error adding:', error);
    }

    // Try to add the secondaryNoteText field via raw SQL
    try {
      await prisma.$executeRaw`ALTER TABLE "Book" ADD COLUMN IF NOT EXISTS "secondaryNoteText" TEXT`;
      console.log('Successfully added secondaryNoteText column');
    } catch (error) {
      console.log('Column might already exist or error adding:', error);
    }

    // Verify the fields exist by trying to query them
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        noteText: true,
        secondaryNoteText: true,
      }
    });

    return NextResponse.json({ 
      message: 'Migration completed successfully!',
      books: books.length,
      note: 'The noteText and secondaryNoteText fields are now available. You can set them from the admin panel.'
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Failed to run migration', details: error },
      { status: 500 }
    );
  }
}