import CTAButton from './CTAButton';
import FaviconSocialIcon from './FaviconSocialIcon';
import { SocialLink } from '@prisma/client';
import Image from 'next/image';

interface FooterProps {
  amazonUrl: string;
  socialLinks: SocialLink[];
}

export default function Footer({ amazonUrl, socialLinks }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Read the Story?</h3>
        <p className="text-gray-300 mb-8">
          Discover the incredible journey of South Dakota State Football
        </p>
        <CTAButton href={amazonUrl} variant="secondary" />
        
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center items-center space-x-6 mt-8 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={link.label}
              >
                <FaviconSocialIcon url={link.url} label={link.label} icon={link.icon || undefined} />
              </a>
            ))}
          </div>
        )}
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex items-center justify-center gap-3">
            <a href="https://kup.solutions" target="_blank" rel="noopener noreferrer" aria-label="Visit kup.solutions">
              <Image
                src="/images/kup.solutions.logo2.png"
                alt="kup.solutions logo"
                width={140}
                height={48}
                className="h-8 w-auto"
                priority={false}
              />
            </a>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}