import { Section, SectionLabel, Placeholder } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";

/**
 * Book — section 6: ONE supporting section, not the spine.
 *
 * TCX.3 confirms the exact title; TCX.4 wires the working purchase link. Kept
 * deliberately compact so the book stays secondary to the person.
 */
export function Book() {
  return (
    <Section id="book" width="wide">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-14">
        {/* Book cover placeholder — real image in TCX.4. */}
        <Placeholder
          label="Book cover — TCX.4"
          className="aspect-[2/3] w-full max-w-[260px]"
        />

        <div>
          <SectionLabel>Book</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {/* PLACEHOLDER title — verify exact wording (TCX.3). */}
            Stig and the Rise of South Dakota State Football
          </h2>
          <p className="mt-4 max-w-prose text-lg text-muted-foreground">
            {/* PLACEHOLDER blurb — TCX.3. */}
            A short, one-paragraph blurb lands here in TCX.3 — the book as a
            supporting credential, not the center of the site.
          </p>
          <div className="mt-7">
            {/* PLACEHOLDER purchase link — TCX.4 wires the real working URL. */}
            <CtaLink href="#book" size="lg" className="rounded-full">
              Buy the book (link — TCX.4)
            </CtaLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
