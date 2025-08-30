import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log('🔄 Force updating production database...');
    
    // Update the author data
    const updatedAuthor = await prisma.author.update({
      where: { id: 1 },
      data: {
        name: "Tanner Castora",
        bioShort: "Growing up in the suburbs of Cleveland, Ohio, Tanner Castora went on to graduate from Kent State University with a degree in broadcast journalism.",
        bioFull: "Growing up in the suburbs of Cleveland, Ohio, Tanner Castora went on to graduate from Kent State University with a degree in broadcast journalism.\n\nIn 2021, he was hired by KELOLAND — the CBS affiliate in Sioux Falls, South Dakota — where he became an Emmy nominated sports reporter and anchor. Since finishing his two-year contract with KELOLAND in 2023, he has worked to establish himself as an independent/freelance journalist and broadcaster.\n\nWith thousands of followers on his X and Medium page (an online publishing platform), Tanner has been credentialed to cover several events as an independent journalist, including the Men's 2024 NCAA Tournament in Omaha, Nebraska, and the 2024 NFL Hall of Fame Game in Canton, Ohio. He has also done play-by-play work for Big Sioux Media and has been a guest on several podcasts and radio shows.\n\nTanner's work has been featured in various publications, including the Sioux Falls Argus Leader, the Brookings Register, and the Yankton Daily Press & Dakotan. He has also contributed to several sports blogs and websites.\n\nWhen not covering sports, Tanner enjoys spending time with his family, reading, and exploring the great outdoors. He currently resides in Sioux Falls, South Dakota, with his wife and their two children."
      }
    });

    // Update the book cover image
    const updatedBook = await prisma.book.update({
      where: { id: 1 },
      data: {
        coverPath: "https://tyudmirfexpaebtnlqza.supabase.co/storage/v1/object/public/uploads/book/1756183646997-Web%20Cover.jpg"
      }
    });

    console.log('✅ Production database updated successfully:', {
      authorName: updatedAuthor.name,
      bookCoverPath: updatedBook.coverPath
    });

    return NextResponse.json({
      success: true,
      message: 'Production database updated successfully',
      author: {
        name: updatedAuthor.name,
        bioShort: updatedAuthor.bioShort?.substring(0, 50) + '...'
      },
      book: {
        title: updatedBook.title,
        coverPath: updatedBook.coverPath
      }
    });

  } catch (error) {
    console.error('❌ Error updating production database:', error);
    return NextResponse.json(
      { error: 'Failed to update production database', details: error },
      { status: 500 }
    );
  }
}
