import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const snapshotPath = '.data/supabase-snapshot.json';
  const raw = fs.readFileSync(snapshotPath, 'utf-8');
  const data = JSON.parse(raw) as {
    Book: any[];
    Author: any[];
    SocialLink: any[];
    Asset: any[];
    User: any[];
  };

  console.log('🧹 Clearing existing local data...');
  await prisma.socialLink.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.user.deleteMany();

  console.log('📥 Seeding users...');
  if (data.User?.length) {
    await prisma.user.createMany({ data: data.User.map(u => ({
      id: u.id,
      email: u.email,
      passwordHash: u.passwordHash,
      role: u.role,
      createdAt: new Date(u.createdAt),
    })) });
  }

  console.log('📥 Seeding books...');
  if (data.Book?.length) {
    await prisma.book.createMany({ data: data.Book.map(b => ({
      id: b.id,
      title: b.title,
      tagline: b.tagline,
      description: b.description,
      coverPath: b.coverPath,
      amazonUrl: b.amazonUrl,
      hardcoverStripeUrl: b.hardcoverStripeUrl ?? null,
      softcoverStripeUrl: b.softcoverStripeUrl ?? null,
      noteText: b.noteText ?? null,
      secondaryNoteText: b.secondaryNoteText ?? null,
      createdAt: new Date(b.createdAt),
    })) });
  }

  console.log('📥 Seeding authors...');
  if (data.Author?.length) {
    await prisma.author.createMany({ data: data.Author.map(a => ({
      id: a.id,
      name: a.name,
      bioShort: a.bioShort,
      bioFull: a.bioFull,
      photoPath: a.photoPath,
    })) });
  }

  console.log('📥 Seeding social links...');
  if (data.SocialLink?.length) {
    await prisma.socialLink.createMany({ data: data.SocialLink.map(s => ({
      id: s.id,
      label: s.label,
      url: s.url,
      icon: s.icon ?? null,
      order: s.order ?? 0,
    })) });
  }

  console.log('📥 Seeding assets...');
  if (data.Asset?.length) {
    await prisma.asset.createMany({ data: data.Asset.map(a => ({
      id: a.id,
      key: a.key,
      path: a.path,
      alt: a.alt,
    })) });
  }

  console.log('✅ Local DB seeded from Supabase snapshot');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
