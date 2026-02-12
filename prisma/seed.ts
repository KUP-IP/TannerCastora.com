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

  // ⚠️ WARNING: This will DELETE ALL existing book data!
  // Only run this if you want to reset to production defaults
  // await prisma.book.deleteMany();
  await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Stig and The Rise of South Dakota State Football',
      tagline: 'In 1997, South Dakota State football was your everyday Division II program. Twenty-six years later, they were Division I national champions. This is the story of coach John "Stig" Stiegelmeier — the man who led the way — and the overlooked recruits who defied the odds, survived the grim transition to Division I, and steadily built a powerhouse program in the frozen plains of South Dakota. Discover how a program nobody seemed to believe in became the team nobody could beat. With over 150 interviews with Stig, former players and coaches, this is the definitive book on SDSU Football.',
      description: 'In 1997, South Dakota State football was your everyday Division II program. Twenty-six years later, they were Division I national champions. This is the story of coach John "Stig" Stiegelmeier — the man who led the way — and the overlooked recruits who defied the odds, survived the grim transition to Division I, and steadily built a powerhouse program in the frozen plains of South Dakota. Discover how a program nobody seemed to believe in became the team nobody could beat. With over 150 interviews with Stig, former players and coaches, this is the definitive book on SDSU Football.',
      coverPath: 'https://tyudmirfexpaebtnlqza.supabase.co/storage/v1/object/public/uploads/book/1756183646997-Web%20Cover.jpg',
      amazonUrl: '',
      hardcoverStripeUrl: 'https://buy.stripe.com/dRmcN58thc1qc5bgLt1B601',
      softcoverStripeUrl: 'https://buy.stripe.com/4gMeVdeRFc1q1qx2UD1B600',
      noteText: null,
      secondaryNoteText: 'Next book signing: October 23rd, Scheels in Sioux Falls from 6-8pm ',
      createdAt: new Date('2025-08-20T19:19:57.81Z'),
    },
  });

  // ⚠️ WARNING: This will DELETE ALL existing author data!
  // Only run this if you want to reset to production defaults
  // await prisma.author.deleteMany();
  await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Tanner Castora',
      bioShort: 'Tanner Castora grew up in Strongsville, Ohio, a suburb of Cleveland.',
      bioFull: 'Tanner Castora grew up in Strongsville, Ohio, a suburb of Cleveland. After graduating from Strongsville High School, he attended South Carolina Upstate on a full athletic scholarship for basketball.\n\nA year later, Tanner transferred to Kent State University in Northeast Ohio, where he was a part of the Golden Flashes basketball team that advanced to the Men\'s NCAA Tournament. The following year he shifted his focus from basketball to broadcasting after being hired as the color analyst for the Kent State basketball telecasts on ESPN 3. He occasionally filled in as the play-by-play broadcaster as well before graduating from Kent State with a journalism degree in 2020.\n\nIn 2021, he was hired by KELOLAND, the CBS affiliate in Sioux Falls, South Dakota, where he became an Emmy nominated sports reporter and sports anchor. Since finishing his two-year contract with KELOLAND in 2023, he has worked to establish himself as an independent and freelance journalist and broadcaster. With thousands of followers on his Medium page (an online publishing platform), Tanner has been credentialed to cover several events as an independent journalist, including the Men\'s 2024 NCAA Tournament in Omaha, Nebraska, and the 2024 NFL Hall of Fame Game in Canton, Ohio. He has also done play-by-play work for Big Sioux Media and hosts a weekly sports radio show on Brookings Radio—all while writing this biography.\n\nTanner is a believer and follower of Jesus Christ.',
      photoPath: '/uploads/1755543196134-Tanner-47.jpg',
    },
  });

  // ⚠️ WARNING: This will DELETE ALL existing social links!
  // Only run this if you want to reset to production defaults
  // await prisma.socialLink.deleteMany();
  
  // Upsert social links with current production data
  await prisma.socialLink.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      label: 'Tanner\'s X',
      url: 'https://x.com/Tanner_Castora',
      icon: 'x',
      order: 1,
    },
  });
  
  await prisma.socialLink.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      label: 'Tanner Medium page ',
      url: 'https://medium.com/@Tannercastora',
      icon: 'medium',
      order: 1,
    },
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