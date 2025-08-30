import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import AboutAuthor from '@/components/AboutAuthor';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Always fetch fresh data
export const revalidate = 0; // Disable caching
export const fetchCache = 'force-no-store'; // Force no caching

export default async function Home() {
  try {
    console.log('🔄 Fetching data at runtime...');
    console.log('🔍 Environment check:', {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasPostgresUrl: !!process.env.POSTGRES_URL,
      hasPostgresPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
      databaseUrlStart: process.env.DATABASE_URL?.substring(0, 50) + '...',
      postgresUrlStart: process.env.POSTGRES_URL?.substring(0, 50) + '...'
    });
    
    // Test database connection by getting all records
    const allBooks = await prisma.book.findMany();
    const allAuthors = await prisma.author.findMany();
    
    console.log('🔍 Database connection test:', {
      totalBooks: allBooks.length,
      totalAuthors: allAuthors.length,
      bookIds: allBooks.map(b => b.id),
      authorIds: allAuthors.map(a => a.id)
    });
    
    const [book, author, socialLinks] = await Promise.all([
      prisma.book.findFirst(),
      prisma.author.findFirst(),
      prisma.socialLink.findMany({ orderBy: { order: 'asc' } }),
    ]);

    console.log('✅ Data fetched successfully:', {
      bookTitle: book?.title,
      authorName: author?.name,
      authorBioShort: author?.bioShort?.substring(0, 50) + '...',
      socialLinksCount: socialLinks?.length,
      bookCoverPath: book?.coverPath,
      bookId: book?.id,
      authorId: author?.id,
      timestamp: new Date().toISOString()
    });

    if (!book || !author) {
      console.error('❌ Missing required data:', { book: !!book, author: !!author });
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      );
    }

  return (
    <>
      <NavBar socialLinks={socialLinks} />
      <main>
        <Hero
          title={book.title}
          tagline={book.tagline}
          description={book.description}
          coverPath={book.coverPath}
          amazonUrl={book.amazonUrl}
          hardcoverStripeUrl={book.hardcoverStripeUrl}
          softcoverStripeUrl={book.softcoverStripeUrl}
          noteText={book.noteText}
          secondaryNoteText={book.secondaryNoteText}
        />
        <AboutAuthor
          name={author.name}
          bioShort={author.bioShort}
          bioFull={author.bioFull}
          photoPath={author.photoPath}
        />
      </main>
      <Footer 
        amazonUrl={book.amazonUrl} 
        hardcoverStripeUrl={book.hardcoverStripeUrl}
        softcoverStripeUrl={book.softcoverStripeUrl}
        socialLinks={socialLinks} 
      />
    </>
  );
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading content. Please try again.</p>
      </div>
    );
  }
}
