'use client';

import CTAButton from './CTAButton';

interface PurchaseButtonsProps {
  hardcoverUrl?: string | null;
  softcoverUrl?: string | null;
  amazonUrl?: string | null;
  className?: string;
}

export default function PurchaseButtons({ 
  hardcoverUrl, 
  softcoverUrl,
  amazonUrl,
  className = ''
}: PurchaseButtonsProps) {
  // Count how many URLs are provided
  const urls = [hardcoverUrl, softcoverUrl, amazonUrl].filter(Boolean);
  
  // If no URLs are provided, don't render anything
  if (urls.length === 0) {
    return null;
  }

  // Build the buttons array
  const buttons = [];
  
  if (hardcoverUrl) {
    buttons.push(
      <CTAButton 
        key="hardcover"
        href={hardcoverUrl} 
        text="Buy Hardcover" 
        variant="primary" 
      />
    );
  }
  
  if (softcoverUrl) {
    buttons.push(
      <CTAButton 
        key="softcover"
        href={softcoverUrl} 
        text="Buy Softcover" 
        variant="secondary" 
      />
    );
  }
  
  if (amazonUrl) {
    buttons.push(
      <CTAButton 
        key="amazon"
        href={amazonUrl} 
        text="Buy on Amazon" 
        variant="amazon" 
      />
    );
  }

  // If only one button, don't need flex container
  if (buttons.length === 1) {
    return <div className={className}>{buttons[0]}</div>;
  }

  // Multiple buttons - use flex container
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {buttons}
    </div>
  );
}