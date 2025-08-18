'use client';

interface CTAButtonProps {
  href: string;
  text?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function CTAButton({
  href,
  text = 'Buy on Amazon',
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const baseStyles = 'inline-block px-8 py-4 font-semibold text-lg rounded-lg transition-all duration-200 transform hover:scale-105';
  const variantStyles = variant === 'primary'
    ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg'
    : 'bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-blue/5';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {text}
    </a>
  );
}