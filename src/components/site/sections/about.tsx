import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
} from "@/components/site/section";
import { bio, credentials } from "@/lib/site";

/**
 * About — section 2: who he is + credentials. Leads with the PERSON, not the book.
 *
 * Bio + credential bullets are real (TCX.3), sourced from Tanner's resume and
 * written in his voice, and live in @/lib/site as the single source of truth.
 */
export function About() {
  return (
    <Section id="about" width="wide">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16">
        {/* Portrait (TCX.4) — Tanner's headshot, optimized and served from the
            repo. Lazy + fixed aspect frame so it never shifts layout. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/portrait.jpg"
          alt="Tanner Castora"
          loading="lazy"
          className="aspect-[4/5] w-full rounded-2xl border border-border object-cover object-top md:sticky md:top-28"
        />

        <div>
          <SectionLabel>About</SectionLabel>
          <SectionHeading>Meet Tanner</SectionHeading>
          <SectionLead className="mt-6">{bio[0]}</SectionLead>

          <p className="mt-5 leading-relaxed text-muted-foreground">
            {bio[1]}
          </p>

          <ul className="mt-9 space-y-4 border-t border-border pt-8">
            {credentials.map((c) => (
              <li key={c} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                <span className="text-base leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
