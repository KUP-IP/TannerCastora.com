import { Section, SectionLabel } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { site } from "@/lib/site";

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

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <CtaLink
            href={`mailto:${site.contactEmail}`}
            size="lg"
            className="rounded-full"
          >
            Email Tanner
          </CtaLink>
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
        <p className="mt-6 text-sm text-muted-foreground">
          <a
            href={`mailto:${site.contactEmail}`}
            className="underline-offset-4 hover:underline"
          >
            {site.contactEmail}
          </a>
          <span className="mx-2 text-muted-foreground/50" aria-hidden>
            ·
          </span>
          <a
            href={`tel:${site.phoneTel}`}
            className="underline-offset-4 hover:underline"
          >
            {site.phone}
          </a>
        </p>
      </div>
    </Section>
  );
}
