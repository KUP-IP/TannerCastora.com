'use client';

interface CTAButtonProps {
  href: string;
  text?: string;
  variant?: 'primary' | 'secondary' | 'amazon';
  className?: string;
}

export default function CTAButton({
  href,
  text = 'Order Kindle E-Book',
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const baseStyles = 'inline-block px-8 py-4 font-semibold text-lg rounded-lg transition-all duration-200 transform hover:scale-105';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg';
      break;
    case 'secondary':
      variantStyles = 'bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-blue/5 dark:hover:bg-white';
      break;
    case 'amazon':
      variantStyles = 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg';
      break;
    default:
      variantStyles = 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg';
  }

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