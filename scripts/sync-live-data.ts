import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function syncLiveData() {
  console.log('🔄 Starting live data sync...');

  try {
    // Fetch live data from Supabase
    console.log('📥 Fetching live data from Supabase...');
    
    const { data: books, error: booksError } = await supabase
      .from('Book')
      .select('*');
    
    if (booksError) throw booksError;

    const { data: authors, error: authorsError } = await supabase
      .from('Author')
      .select('*');
    
    if (authorsError) throw authorsError;

    const { data: socialLinks, error: socialLinksError } = await supabase
      .from('SocialLink')
      .select('*')
      .order('order');
    
    if (socialLinksError) throw socialLinksError;

    const { data: assets, error: assetsError } = await supabase
      .from('Asset')
      .select('*');
    
    if (assetsError) throw assetsError;

    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('*');
    
    if (usersError) throw usersError;

    console.log('✅ Live data fetched successfully');
    console.log(`📚 Books: ${books?.length || 0}`);
    console.log(`👤 Authors: ${authors?.length || 0}`);
    console.log(`🔗 Social Links: ${socialLinks?.length || 0}`);
    console.log(`🖼️ Assets: ${assets?.length || 0}`);
    console.log(`👥 Users: ${users?.length || 0}`);

    // Clear local database
    console.log('🧹 Clearing local database...');
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.socialLink.deleteMany();
    await prisma.asset.deleteMany();
    await prisma.user.deleteMany();

    // Insert live data into local database
    console.log('💾 Syncing data to local database...');

    if (books && books.length > 0) {
      await prisma.book.createMany({
        data: books.map(book => ({
          id: book.id,
          title: book.title,
          tagline: book.tagline,
          description: book.description,
          coverPath: book.coverPath,
          amazonUrl: book.amazonUrl,
          hardcoverStripeUrl: book.hardcoverStripeUrl,
          softcoverStripeUrl: book.softcoverStripeUrl,
          noteText: book.noteText,
          secondaryNoteText: book.secondaryNoteText,
          createdAt: new Date(book.createdAt),
        }))
      });
      console.log(`✅ Synced ${books.length} books`);
    }

    if (authors && authors.length > 0) {
      await prisma.author.createMany({
        data: authors.map(author => ({
          id: author.id,
          name: author.name,
          bioShort: author.bioShort,
          bioFull: author.bioFull,
          photoPath: author.photoPath,
        }))
      });
      console.log(`✅ Synced ${authors.length} authors`);
    }

    if (socialLinks && socialLinks.length > 0) {
      await prisma.socialLink.createMany({
        data: socialLinks.map(link => ({
          id: link.id,
          label: link.label,
          url: link.url,
          icon: link.icon,
          order: link.order,
        }))
      });
      console.log(`✅ Synced ${socialLinks.length} social links`);
    }

    if (assets && assets.length > 0) {
      await prisma.asset.createMany({
        data: assets.map(asset => ({
          id: asset.id,
          key: asset.key,
          path: asset.path,
          alt: asset.alt,
        }))
      });
      console.log(`✅ Synced ${assets.length} assets`);
    }

    if (users && users.length > 0) {
      await prisma.user.createMany({
        data: users.map(user => ({
          id: user.id,
          email: user.email,
          passwordHash: user.passwordHash,
          role: user.role,
          createdAt: new Date(user.createdAt),
        }))
      });
      console.log(`✅ Synced ${users.length} users`);
    }

    console.log('🎉 Live data sync completed successfully!');
    console.log('📊 Local database now matches live site exactly');

  } catch (error) {
    console.error('❌ Error syncing live data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncLiveData();
