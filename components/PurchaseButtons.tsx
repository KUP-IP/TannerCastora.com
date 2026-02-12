'use client';

import CTAButton from './CTAButton';

interface PurchaseButtonsProps {
  hardcoverUrl?: string | null;
  softcoverUrl?: string | null;
  hardcoverSignedUrl?: string | null;
  softcoverSignedUrl?: string | null;
  amazonUrl?: string | null;
  noteText?: string | null;
  secondaryNoteText?: string | null;
  className?: string;
}

export default function PurchaseButtons({
  hardcoverUrl,
  softcoverUrl,
  hardcoverSignedUrl,
  softcoverSignedUrl,
  amazonUrl,
  noteText,
  secondaryNoteText,
  className = ''
}: PurchaseButtonsProps) {
  // Count how many URLs are provided
  const urls = [hardcoverUrl, softcoverUrl, hardcoverSignedUrl, softcoverSignedUrl, amazonUrl].filter(Boolean);

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
        text="Order Hardcover"
        variant="primary"
      />
    );
  }

  if (softcoverUrl) {
    buttons.push(
      <CTAButton
        key="softcover"
        href={softcoverUrl}
        text="Order Softcover"
        variant="secondary"
      />
    );
  }

  if (hardcoverSignedUrl) {
    buttons.push(
      <CTAButton
        key="hardcover-signed"
        href={hardcoverSignedUrl}
        text="Order Signed Hardcover"
        variant="primary"
      />
    );
  }

  if (softcoverSignedUrl) {
    buttons.push(
      <CTAButton
        key="softcover-signed"
        href={softcoverSignedUrl}
        text="Order Signed Softcover"
        variant="secondary"
      />
    );
  }

  if (amazonUrl) {
    buttons.push(
      <CTAButton
        key="amazon"
        href={amazonUrl}
        text="Order Kindle E-Book"
        variant="amazon"
      />
    );
  }

  // If only one button, don't need flex container
  if (buttons.length === 1) {
    return (
      <div className={className}>
        {buttons[0]}
        {noteText && (
          <div className="mt-4 flex justify-start">
            <div className="bg-brand-yellow text-brand-blue dark:text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              {noteText}
            </div>
          </div>
        )}
        {secondaryNoteText && (
          <div className="mt-4 flex justify-start">
            <div className="text-brand-blue dark:text-white text-sm">
              {secondaryNoteText}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Multiple buttons - use flex container
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-4">
        {buttons}
      </div>
      {noteText && (
        <div className="mt-4 flex justify-start">
          <div className="bg-brand-yellow text-brand-blue dark:text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
            {noteText}
          </div>
        </div>
      )}
      {secondaryNoteText && (
        <div className="mt-4 flex justify-start">
          <div className="text-brand-blue dark:text-white text-sm">
            {secondaryNoteText}
          </div>
        </div>
      )}
    </div>
  );
}