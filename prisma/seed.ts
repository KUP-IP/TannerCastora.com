import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tannercastora.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Stig#2025$Football!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      role: 'admin',
    },
  });

  await prisma.book.deleteMany();
  await prisma.book.create({
    data: {
      title: 'Stig and The Rise of South Dakota State Football',
      tagline: 'In 1997, South Dakota State football was a struggling Division II program with empty stands and broken dreams. Twenty years later, they hoisted a national championship trophy. This is the untold story of Coach John "Stig" Stiegelmeier and the farm kids, walk-ons, and overlooked recruits who defied every odd, survived the brutal transition to Division I, and built a dynasty in the frozen plains of South Dakota. Discover how a team nobody believed in became the team nobody could beat.',
      description: '',
      coverPath: '/images/book-cover.jpg',
      amazonUrl: 'https://www.amazon.com/dp/PLACEHOLDER',
    },
  });

  await prisma.author.deleteMany();
  await prisma.author.create({
    data: {
      name: 'Author Name',
      bioShort: 'Award-winning sports journalist with over 20 years of experience covering college football.',
      bioFull: 'Award-winning sports journalist with over 20 years of experience covering college football. Born and raised in South Dakota, they have followed the Jackrabbits through their entire transformation. Their work has appeared in major sports publications, and they have authored several books on college athletics. This intimate portrait of Coach Stiegelmeier and the SDSU football program draws on exclusive interviews with players, coaches, and staff members spanning two decades.',
      photoPath: '/images/author-photo.jpg',
    },
  });

  await prisma.socialLink.deleteMany();
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

  await prisma.asset.deleteMany();

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });