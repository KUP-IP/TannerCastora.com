import FaviconSocialIcon from './FaviconSocialIcon';
import { SocialLink } from '@prisma/client';

interface NavBarProps {
  socialLinks: SocialLink[];
}

export default function NavBar({ socialLinks }: NavBarProps) {
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-b from-brand-blue/10 to-transparent dark:from-brand-blue/20 dark:to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-end items-center space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label={link.label}
            >
              <FaviconSocialIcon url={link.url} label={link.label} icon={link.icon || undefined} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}