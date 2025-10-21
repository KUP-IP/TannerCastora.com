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
        bioShort: "Tanner Castora grew up in Strongsville, Ohio, a suburb of Cleveland.",
        bioFull: `Tanner Castora grew up in Strongsville, Ohio, a suburb of Cleveland. After graduating from Strongsville High School, he attended South Carolina Upstate on a full athletic scholarship for basketball.

A year later, Tanner transferred to Kent State University in Northeast Ohio, where he was a part of the Golden Flashes basketball team that advanced to the Men’s NCAA Tournament. The following year he shifted his focus from basketball to broadcasting after being hired as the color analyst for the Kent State basketball telecasts on ESPN 3. He occasionally filled in as the play-by-play broadcaster as well before graduating from Kent State with a journalism degree in 2020.

In 2021, he was hired by KELOLAND, the CBS affiliate in Sioux Falls, South Dakota, where he became an Emmy nominated sports reporter and sports anchor. Since finishing his two-year contract with KELOLAND in 2023, he has worked to establish himself as an independent and freelance journalist and broadcaster. With thousands of followers on his Medium page (an online publishing platform), Tanner has been credentialed to cover several events as an independent journalist, including the Men’s 2024 NCAA Tournament in Omaha, Nebraska, and the 2024 NFL Hall of Fame Game in Canton, Ohio. He has also done play-by-play work for Big Sioux Media and hosts a weekly sports radio show on Brookings Radio—all while writing this biography.

Tanner is a believer and follower of Jesus Christ.`
      }
    });

    // Update the book description and optionally cover image
    const updatedBook = await prisma.book.update({
      where: { id: 1 },
      data: {
        description: `In 1997, South Dakota State football was your everyday Division II program. Twenty-six years later, they were Division I national champions. This is the story of coach John "Stig" Stiegelmeier — the man who led the way — and the overlooked recruits who defied the odds, survived the grim transition to Division I, and steadily built a powerhouse program in the frozen plains of South Dakota. Discover how a program nobody seemed to believe in became the team nobody could beat. With over 150 interviews with Stig, former players and coaches, this is the definitive book on SDSU Football.`,
        // Keep current coverPath; we will update once the new image URL is provided/uploaded.
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
