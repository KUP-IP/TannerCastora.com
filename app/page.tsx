import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import AboutAuthor from '@/components/AboutAuthor';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Always fetch fresh data
export const revalidate = 0; // Disable caching

export default async function Home() {
  const [book, author, socialLinks] = await Promise.all([
    prisma.book.findFirst(),
    prisma.author.findFirst(),
    prisma.socialLink.findMany({ orderBy: { order: 'asc' } }),
  ]);

  if (!book || !author) {
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
}
