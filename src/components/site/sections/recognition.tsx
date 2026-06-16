import {
  Section,
  SectionLabel,
  SectionHeading,
} from "@/components/site/section";

/**
 * Recognition — section 3: Emmy nod / testimonials (the social-proof beat,
 * mirroring Smith's testimonials block).
 *
 * TCX.3 supplies the real Emmy wording + any verified testimonials/quotes.
 * The quotes below are PLACEHOLDER scaffolding only.
 */
const quotes = [
  {
    quote:
      "Placeholder recognition quote. A verified testimonial or award detail lands here in TCX.3 — read at the reference quality bar.",
    source: "Source / Outlet",
    flag: "verify · TCX.3",
  },
  {
    quote:
      "A second placeholder quote balances the pair so the grid reads complete and the social-proof beat lands with weight.",
    source: "Source / Outlet",
    flag: "verify · TCX.3",
  },
];

export function Recognition() {
  return (
    <Section id="recognition" width="wide" className="bg-accent/30">
      <div className="max-w-2xl">
        <SectionLabel>Recognition</SectionLabel>
        <SectionHeading>Recognized for the work</SectionHeading>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {quotes.map((q, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <span
              aria-hidden
              className="font-display text-5xl leading-none text-brand/30"
            >
              &ldquo;
            </span>
            <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-foreground/85">
              {q.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-5 text-sm font-medium">
              {q.source}{" "}
              <span className="font-normal text-muted-foreground">
                — {q.flag}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
