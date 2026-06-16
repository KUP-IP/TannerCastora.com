import { Section, SectionLabel } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { site } from "@/lib/site";

/**
 * Contact — section 7: the conversion beat. Make contacting Tanner frictionless;
 * this is the primary CTA's destination and the site's whole reason to exist.
 *
 * Copy + links are real (TCX.3). FLAG: confirm the public email address before
 * the production cutover (CONTENT-FLAGS.md #1).
 */
const socials = [
  { label: "LinkedIn", href: site.linkedinUrl },
  { label: "X", href: site.xUrl },
  { label: "YouTube", href: site.youtubeReelUrl },
  { label: "Medium", href: site.mediumUrl },
];

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
          {site.contactEmail}
        </p>
      </div>
    </Section>
  );
}
