import { Section, SectionLabel } from "@/components/site/section";

/**
 * Recognition — section 3: Emmy nod / testimonials (the social-proof beat,
 * mirroring Smith's testimonials block).
 *
 * TCX.3 supplies the real Emmy wording + any verified testimonials/quotes.
 * The quotes below are PLACEHOLDER scaffolding only.
 */
export function Recognition() {
  return (
    <Section id="recognition" width="wide" className="bg-muted/30">
      <SectionLabel>Recognition</SectionLabel>
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Recognized for the work
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* PLACEHOLDER testimonials/credit — TCX.3 supplies verified quotes + Emmy detail. */}
        {[1, 2].map((n) => (
          <figure
            key={n}
            className="rounded-2xl border border-border bg-background p-7"
          >
            <blockquote className="text-lg leading-relaxed text-muted-foreground">
              &ldquo;Placeholder recognition quote {n}. A verified testimonial or
              award detail lands here in TCX.3.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm font-medium">
              Source / Outlet <span className="text-muted-foreground">— verify (TCX.3)</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
