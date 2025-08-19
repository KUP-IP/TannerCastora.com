import Image from 'next/image';
import CTAButton from './CTAButton';

interface HeroProps {
  title: string;
  tagline: string;
  description: string;
  coverPath: string;
  amazonUrl: string;
}

export default function Hero({ title, tagline, coverPath, amazonUrl }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent dark:from-transparent dark:via-brand-blue/10 dark:to-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0">
            <Image
              src={coverPath}
              alt={`${title} book cover`}
              fill
              className="object-cover rounded-lg shadow-2xl"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {tagline}
            </p>
            <CTAButton href={amazonUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}