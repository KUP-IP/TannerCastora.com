import React from "react";

/**
 * emphasizeTitle — renders body copy with the book title italicized wherever it
 * appears (Outline PART 3 request). Plain helper (no client hooks) so it works
 * inside server components. Returns the original string untouched if the title
 * isn't present.
 */
const BOOK_TITLE = "Stig and The Rise of South Dakota State Football";

export function emphasizeTitle(text: string): React.ReactNode {
  if (!text.includes(BOOK_TITLE)) return text;
  const segments = text.split(BOOK_TITLE);
  const nodes: React.ReactNode[] = [];
  segments.forEach((seg, i) => {
    if (i > 0) {
      nodes.push(
        <em key={`title-${i}`} className="italic">
          {BOOK_TITLE}
        </em>,
      );
    }
    if (seg) nodes.push(<React.Fragment key={`seg-${i}`}>{seg}</React.Fragment>);
  });
  return nodes;
}
