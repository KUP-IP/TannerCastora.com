import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Prefer local DB for Prisma regardless of exported envs
let localDatabaseUrl: string | undefined = process.env.DATABASE_URL;
try {
  const parsed = dotenv.parse(fs.readFileSync('.env.local'));
  if (parsed.DATABASE_URL) {
    localDatabaseUrl = parsed.DATABASE_URL;
  }
} catch {
  // ignore if .env.local missing
}

// Fallback to typical local dev URL if still undefined
if (!localDatabaseUrl) {
  localDatabaseUrl = 'postgresql://keepup@localhost:5433/stig_site_dev?schema=public';
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: localDatabaseUrl as string,
    },
  },
});

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('🔼 Syncing local DB -> Supabase (production)...');

  // Read from local DB
  const [books, authors, socialLinks, assets, users] = await Promise.all([
      prisma.book.findMany(),
      prisma.author.findMany(),
      prisma.socialLink.findMany(),
      prisma.asset.findMany(),
      prisma.user.findMany(),
  ]);

  console.log('Local snapshot:', {
    books: books.length,
    authors: authors.length,
    socialLinks: socialLinks.length,
    assets: assets.length,
    users: users.length,
  });

  // Upsert helpers
  async function upsert(table: string, rows: any[]) {
    if (!rows.length) return { count: 0 };
    const { error } = await supabase.from(table).upsert(rows as any, { onConflict: 'id' } as any);
    if (error) throw error;
    return { count: rows.length };
  }

  // Ensure target tables exist and then upsert
  console.log('📤 Upserting tables on Supabase...');
  await upsert('Book', books.map(b => ({
    id: b.id,
    title: b.title,
    tagline: b.tagline,
    description: b.description,
    coverPath: b.coverPath,
    amazonUrl: b.amazonUrl,
    hardcoverStripeUrl: b.hardcoverStripeUrl,
    softcoverStripeUrl: b.softcoverStripeUrl,
    noteText: b.noteText,
    secondaryNoteText: b.secondaryNoteText,
    createdAt: b.createdAt.toISOString(),
  })));

  await upsert('Author', authors.map(a => ({
    id: a.id,
    name: a.name,
    bioShort: a.bioShort,
    bioFull: a.bioFull,
    photoPath: a.photoPath,
  })));

  await upsert('SocialLink', socialLinks.map(s => ({
    id: s.id,
    label: s.label,
    url: s.url,
    icon: s.icon,
    order: s.order,
  })));

  await upsert('Asset', assets.map(a => ({
    id: a.id,
    key: a.key,
    path: a.path,
    alt: a.alt,
  })));

  await upsert('User', users.map(u => ({
    id: u.id,
    email: u.email,
    passwordHash: u.passwordHash,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  })));

  console.log('✅ Supabase updated from local database');
}

main().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
