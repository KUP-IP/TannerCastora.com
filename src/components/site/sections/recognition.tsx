import {
  Section,
  SectionLabel,
  SectionHeading,
} from "@/components/site/section";
import { recognition } from "@/lib/site";

/**
 * Recognition — section 3: the social-proof beat (Emmy nod leads), mirroring
 * Smith's testimonials block.
 *
 * Awards are real (TCX.3), sourced from Tanner's resume, and live in @/lib/site.
 */
export function Recognition() {
  return (
    <Section id="recognition" width="wide" className="bg-accent/30">
      <div className="max-w-2xl">
        <SectionLabel>Recognition</SectionLabel>
        <SectionHeading>Recognized for the work</SectionHeading>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {recognition.map((r) => (
          <figure
            key={r.title}
            className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <span
              aria-hidden
              className="font-display text-5xl leading-none text-brand/30"
            >
              ★
            </span>
            <figcaption className="mt-4 flex-1">
              <p className="font-display text-xl font-medium leading-snug text-foreground">
                {r.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.detail}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
