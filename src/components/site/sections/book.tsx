import {
  Section,
  SectionLabel,
  SectionHeading,
  Placeholder,
} from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { book } from "@/lib/site";

/**
 * Book — section 6: ONE supporting section, not the spine.
 *
 * Title + blurb are real (TCX.3). The purchase link is live (operator-confirmed
 * Amazon URL, TCX.6), so the buy button is enabled. Kept deliberately compact so
 * the book stays secondary to the person.
 */
export function Book() {
  return (
    <Section id="book" width="wide">
      <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:items-center md:gap-16">
        {/* Book cover placeholder — real image in TCX.4. */}
        <Placeholder
          label="Book cover — TCX.4"
          className="aspect-[2/3] w-full max-w-[240px] justify-self-center md:justify-self-start"
        />

        <div>
          <SectionLabel>The book</SectionLabel>
          <SectionHeading className="text-2xl sm:text-3xl md:text-4xl">
            {book.title}
          </SectionHeading>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
            {book.blurb}
          </p>
          <div className="mt-8">
            {book.purchaseUrl ? (
              <CtaLink
                href={book.purchaseUrl}
                size="lg"
                variant="outline"
                className="rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy the book
              </CtaLink>
            ) : (
              <span
                aria-disabled
                title="Purchase link coming soon — pending confirmation"
                className="inline-flex h-11 cursor-not-allowed items-center rounded-full border border-border px-6 text-sm font-medium text-muted-foreground opacity-70"
              >
                Buy the book — link coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
