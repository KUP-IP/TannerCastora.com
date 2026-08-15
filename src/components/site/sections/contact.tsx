import { Section, SectionLabel } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { contactMailtoHref, site } from "@/lib/site";

/**
 * Contact — section 7: the conversion beat. Make contacting Tanner frictionless;
 * this is the primary CTA's destination and the site's whole reason to exist.
 *
 * Copy + links are real and confirmed (email + phone operator-approved, TCX.6).
 */
// v2 Wave B: YouTube removed from contact — the Broadcasting Reel section now
// covers video. Email + phone lead; LinkedIn, X, and Medium round it out.
const socials = [
  { label: "LinkedIn", href: site.linkedinUrl },
  { label: "X", href: site.xUrl },
  { label: "Medium", href: site.mediumUrl },
];

export function Contact() {
  return (
    <Section id="contact" width="narrow" className="bg-accent/30">
      <div className="text-center">
        <div className="flex justify-center">
          <SectionLabel>Contact</SectionLabel>
        </div>
        <h2 className="rise font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl md:text-6xl">
          Let&apos;s talk.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          Hiring for an anchor, play-by-play, or reporting role? I&apos;d love to
          hear about it. Email is the fastest way to reach me — the reel and
          resume are a tap away above.
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <CtaLink
            href={contactMailtoHref()}
            size="lg"
            className="rounded-full"
          >
            Email Tanner
          </CtaLink>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:contents">
            {socials.map((s) => (
              <CtaLink
                key={s.label}
                href={s.href}
                size="lg"
                variant="outline"
                className="rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </CtaLink>
            ))}
          </div>
        </div>
        <p className="mt-6 flex flex-col items-center text-sm text-muted-foreground sm:flex-row sm:justify-center">
          <CtaLink
            href={contactMailtoHref()}
            variant="link"
            className="inline-flex h-auto min-h-11 items-center px-0 text-sm font-normal"
          >
            {site.contactEmail}
          </CtaLink>
          <span className="hidden text-muted-foreground/50 sm:mx-2 sm:inline" aria-hidden>
            ·
          </span>
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
          >
            {site.phone}
          </a>
        </p>
      </div>
    </Section>
  );
}
