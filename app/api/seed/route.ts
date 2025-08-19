import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Check if data already exists
    const existingBook = await prisma.book.findFirst();
    if (existingBook) {
      return NextResponse.json({ message: 'Database already seeded' });
    }

    // Create book
    await prisma.book.create({
      data: {
        title: 'Stig and The Rise of South Dakota State Football',
        tagline: 'The definitive story of how a small-town program became a dynasty.',
        description: `From humble beginnings to national championships, "Stig and The Rise of South Dakota State Football" chronicles the extraordinary transformation of SDSU football under head coach John Stiegelmeier. This compelling narrative captures the grit, determination, and vision that built a championship culture in Brookings, featuring exclusive interviews, behind-the-scenes stories, and unforgettable moments that defined a program's ascent to greatness. A must-read for every Jackrabbit fan and lover of college football.`,
        coverPath: '/images/book-cover.jpg',
        amazonUrl: 'https://www.amazon.com/dp/XXXXXXXXXX',
      },
    });

    // Create author
    await prisma.author.create({
      data: {
        name: 'Tanner Castora',
        bioShort: 'Sports journalist and SDSU alumnus with a passion for telling the untold stories of college football.',
        bioFull: `Tanner Castora is an award-winning sports journalist and proud South Dakota State University alumnus. 
        With over a decade of experience covering college athletics, Tanner has developed a reputation for in-depth 
        storytelling that captures both the triumphs and challenges of competitive sports. His work has appeared in 
        numerous publications, and he has been recognized for his ability to bring the human element to sports journalism. 
        "Stig and The Rise of South Dakota State Football" represents years of research, interviews, and firsthand 
        observations of one of college football's most remarkable success stories.`,
        photoPath: '/images/author.jpg',
      },
    });

    // Create admin user
    const hashedPassword = await bcrypt.hash('Stig#2025$Football!', 10);
    await prisma.user.create({
      data: {
        email: 'admin@tannercastora.com',
        passwordHash: hashedPassword,
        role: 'admin',
      },
    });

    return NextResponse.json({ 
      message: 'Database seeded successfully!',
      note: 'You can now login at /admin with admin@tannercastora.com'
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}