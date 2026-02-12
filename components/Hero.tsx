import Image from 'next/image';
import PurchaseButtons from './PurchaseButtons';

interface HeroProps {
  title: string;
  tagline: string;
  description: string;
  coverPath: string;
  amazonUrl: string;
  hardcoverStripeUrl?: string | null;
  softcoverStripeUrl?: string | null;
  hardcoverSignedUrl?: string | null;
  softcoverSignedUrl?: string | null;
  noteText?: string | null;
  secondaryNoteText?: string | null;
}

export default function Hero({ title, tagline, coverPath, amazonUrl, hardcoverStripeUrl, softcoverStripeUrl, hardcoverSignedUrl, softcoverSignedUrl, noteText, secondaryNoteText }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent dark:from-transparent dark:via-brand-blue/10 dark:to-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <Image
                src={coverPath}
                alt={`${title} book cover`}
                width={400}
                height={600}
                className="w-full h-auto rounded-lg shadow-2xl"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 400px"
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {tagline}
            </p>
            <PurchaseButtons
              hardcoverUrl={hardcoverStripeUrl || null}
              softcoverUrl={softcoverStripeUrl || null}
              hardcoverSignedUrl={hardcoverSignedUrl || null}
              softcoverSignedUrl={softcoverSignedUrl || null}
              amazonUrl={amazonUrl}
              noteText={noteText || null}
              secondaryNoteText={secondaryNoteText || null}
            />
          </div>
        </div>
      </div>
    </section>
  );
}