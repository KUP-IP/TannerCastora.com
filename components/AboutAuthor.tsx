'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AboutAuthorProps {
  name: string;
  bioShort: string;
  bioFull: string;
  photoPath: string;
}

export default function AboutAuthor({ name, bioShort, bioFull, photoPath }: AboutAuthorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          About the Author
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-square rounded-lg overflow-hidden max-w-xs mx-auto">
              <Image
                src={photoPath}
                alt={`${name} photo`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{name}</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {isExpanded ? bioFull : bioShort}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-brand-blue hover:text-brand-blue/90 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}