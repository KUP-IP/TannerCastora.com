import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Update book with correct tagline and keep images
    const bookUpdated = await prisma.book.updateMany({
      data: {
        tagline: 'In 1997, South Dakota State football was a struggling Division II program with empty stands and broken dreams. Twenty years later, they hoisted a national championship trophy. This is the untold story of Coach John "Stig" Stiegelmeier and the farm kids, walk-ons, and overlooked recruits who defied every odd, survived the brutal transition to Division I, and built a dynasty in the frozen plains of South Dakota. Discover how a team nobody believed in became the team nobody could beat.',
        coverPath: '/uploads/1755542688365-Stig_book_cover_r18-v2.4.png',
      },
    });

    // Update author with correct bio and photo
    const authorUpdated = await prisma.author.updateMany({
      data: {
        name: 'Author Name',
        bioShort: 'Award-winning sports journalist with over 20 years of experience covering college football.',
        bioFull: 'Award-winning sports journalist with over 20 years of experience covering college football. Born and raised in South Dakota, they have followed the Jackrabbits through their entire transformation. Their work has appeared in major sports publications, and they have authored several books on college athletics. This intimate portrait of Coach Stiegelmeier and the SDSU football program draws on exclusive interviews with players, coaches, and staff members spanning two decades.',
        photoPath: '/uploads/1755543196134-Tanner-47.jpg',
      },
    });

    // Add social links if they don't exist
    const existingLinks = await prisma.socialLink.count();
    let socialLinksCreated = 0;
    
    if (existingLinks === 0) {
      await prisma.socialLink.createMany({
        data: [
          {
            label: 'X',
            url: 'https://x.com/placeholder',
            icon: 'x',
            order: 0,
          },
          {
            label: 'YouTube',
            url: 'https://youtube.com/@placeholder',
            icon: 'youtube',
            order: 1,
          },
        ],
      });
      socialLinksCreated = 2;
    }

    return NextResponse.json({ 
      message: 'Production data fixed successfully!',
      bookUpdated: bookUpdated.count,
      authorUpdated: authorUpdated.count,
      socialLinksCreated,
      note: 'Social links added. You can edit them in the admin panel.'
    });
  } catch (error) {
    console.error('Fix production error:', error);
    return NextResponse.json(
      { error: 'Failed to fix production data' },
      { status: 500 }
    );
  }
}