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
        <div className="mb-10">
          <h4 className="text-xl font-semibold text-gray-900 mb-3 text-center">
            Listen to Tanner’s radio show “The Jackrabbit Jump” on Spotify
          </h4>
          <div className="rounded-xl overflow-hidden max-w-xl mx-auto">
            <iframe
              title="Spotify – The Jackrabbit Jump"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/show/4gBD5ixBICqjX6I3DOMhuy?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
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
            <div className="text-lg text-gray-700 leading-relaxed mb-4">
              {isExpanded ? (
                bioFull.split('\n').map((paragraph, index) => (
                  <p key={index} className={index > 0 ? 'mt-4' : ''}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{bioShort}</p>
              )}
            </div>
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