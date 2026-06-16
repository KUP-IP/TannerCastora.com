import { Section, SectionLabel } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { site } from "@/lib/site";

/**
 * Contact — section 7: the conversion beat. Make contacting Tanner frictionless;
 * this is the primary CTA's destination.
 *
 * TCX.3 confirms the real email + LinkedIn (open question #2). Values below are
 * PLACEHOLDER from site config and must be verified before publishing.
 */
export function Contact() {
  return (
    <Section id="contact" className="bg-muted/30">
      <div className="text-center">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s talk
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          {/* PLACEHOLDER copy — TCX.3. */}
          Hiring for an anchor, play-by-play, or reporting role? Reach out — the
          reel and resume are above.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* PLACEHOLDER contact targets — verify real email + LinkedIn (TCX.3). */}
          <CtaLink href={`mailto:${site.contactEmail}`} size="lg" className="rounded-full">
            Email Tanner
          </CtaLink>
          <CtaLink
            href={site.linkedinUrl}
            size="lg"
            variant="outline"
            className="rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </CtaLink>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Placeholder contact details — confirm real email & LinkedIn before publishing (TCX.3).
        </p>
      </div>
    </Section>
  );
}
