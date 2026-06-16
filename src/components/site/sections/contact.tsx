import { Section, SectionLabel } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { site } from "@/lib/site";

/**
 * Contact — section 7: the conversion beat. Make contacting Tanner frictionless;
 * this is the primary CTA's destination and the site's whole reason to exist.
 *
 * TCX.3 confirms the real email + LinkedIn (open question #2). Values below are
 * PLACEHOLDER from site config and must be verified before publishing.
 */
export function Contact() {
  return (
    <Section id="contact" width="narrow" className="bg-accent/30">
      <div className="text-center">
        <div className="flex justify-center">
          <SectionLabel>Contact</SectionLabel>
        </div>
        <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl md:text-6xl">
          Let&apos;s talk.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          {/* PLACEHOLDER copy — TCX.3. */}
          Hiring for an anchor, play-by-play, or reporting role? Reach out — the
          reel and resume are a tap away.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {/* PLACEHOLDER contact targets — verify real email + LinkedIn (TCX.3). */}
          <CtaLink
            href={`mailto:${site.contactEmail}`}
            size="lg"
            className="rounded-full"
          >
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
        <p className="mt-6 text-xs text-muted-foreground">
          Placeholder contact details — confirm real email & LinkedIn before
          publishing (TCX.3).
        </p>
      </div>
    </Section>
  );
}
