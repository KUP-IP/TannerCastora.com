import SocialIcon from './SocialIcon';
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
              className="text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-yellow transition-colors"
              aria-label={link.label}
            >
              <SocialIcon icon={link.icon || 'link'} label={link.label} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}