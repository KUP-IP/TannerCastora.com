'use client';

/* eslint-disable @next/next/no-img-element */

interface FaviconSocialIconProps {
  url: string;
  label: string;
  icon?: string;
}

export default function FaviconSocialIcon({ url, label, icon }: FaviconSocialIconProps) {
  // Map of known social media platforms to their favicon URLs
  const socialFavicons: Record<string, string> = {
    x: 'https://abs.twimg.com/favicons/twitter.3.ico',
    twitter: 'https://abs.twimg.com/favicons/twitter.3.ico',
    youtube: 'https://www.youtube.com/s/desktop/cac0e897/img/favicon_32x32.png',
    facebook: 'https://www.facebook.com/favicon.ico',
    instagram: 'https://www.instagram.com/favicon.ico',
    tiktok: 'https://www.tiktok.com/favicon.ico',
    linkedin: 'https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca',
    threads: 'https://www.threads.net/favicon.ico',
    reddit: 'https://www.redditinc.com/favicon.ico',
    pinterest: 'https://s.pinimg.com/webapp/favicon-54a5b2af.png',
    snapchat: 'https://www.snapchat.com/favicon.ico',
    discord: 'https://discord.com/assets/favicon.ico',
    twitch: 'https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png',
    github: 'https://github.com/favicon.ico',
    medium: 'https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png',
    spotify: 'https://www.scdn.co/i/_global/favicon.png',
  };

  // Get favicon URL based on icon type or extract from URL
  const getFaviconUrl = () => {
    // First check if it's a known social platform
    if (icon && socialFavicons[icon.toLowerCase()]) {
      return socialFavicons[icon.toLowerCase()];
    }
    
    // For custom URLs, try to get the favicon from the domain
    try {
      const urlObj = new URL(url);
      // Use Google's favicon service as fallback for any domain
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    } catch {
      // If URL is invalid, return a generic globe icon URL
      return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48bGluZSB4MT0iMiIgeTE9IjEyIiB4Mj0iMjIiIHkyPSIxMiI+PC9saW5lPjxwYXRoIGQ9Ik0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEweiI+PC9wYXRoPjwvc3ZnPg==';
    }
  };

  return (
    <img 
      src={getFaviconUrl()} 
      alt={label}
      className="w-10 h-10 rounded"
      onError={(e) => {
        // Fallback to Google favicon service if direct favicon fails
        const target = e.target as HTMLImageElement;
        if (!target.src.includes('google.com/s2/favicons')) {
          try {
            const urlObj = new URL(url);
            target.src = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
          } catch {
            // Ultimate fallback to generic icon
            target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48bGluZSB4MT0iMiIgeTE9IjEyIiB4Mj0iMjIiIHkyPSIxMiI+PC9saW5lPjxwYXRoIGQ9Ik0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEweiI+PC9wYXRoPjwvc3ZnPg==';
          }
        }
      }}
    />
  );
}