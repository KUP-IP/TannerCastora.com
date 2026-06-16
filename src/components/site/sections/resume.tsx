import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
} from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";

/**
 * Resume — section 5: on-page highlights + PDF view/download. The second
 * "let's talk" payload, reachable in one tap.
 *
 * Copy + highlights are real (TCX.3), sourced from Tanner's resume. TCX.4 drops
 * the real PDF into /public and points the links at it (served from the repo).
 */
const highlights = [
  {
    role: "Sports Reporter & Anchor",
    org: "CBS / KELO · Sioux Falls, SD",
    note: "Anchored weekend sports blocks; shot, wrote, and edited weekly feature stories.",
  },
  {
    role: "Color & Play-by-Play",
    org: "ESPN+ / Teleproductions · Kent State basketball",
    note: "Men's and women's college hoops.",
  },
  {
    role: "Play-by-Play & Sports-Talk Host",
    org: "Big Sioux Sports Media · Brookings Radio",
    note: "High school sports play-by-play and a weekly sports-talk show.",
  },
  {
    role: "B.A., Broadcast Journalism",
    org: "Kent State University",
    note: "NCAA Division I basketball; Cleveland-area native.",
  },
];

export function Resume() {
  return (
    <Section id="resume" className="bg-accent/30">
      <SectionLabel>Resume</SectionLabel>
      <SectionHeading>The resume</SectionHeading>
      <SectionLead className="mt-5">
        A decade around the games — anchor desk, broadcast booth, and the
        reporting in between. The highlights are below; the full resume is one
        tap away.
      </SectionLead>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {highlights.map((h) => (
          <li
            key={h.role}
            className="grid gap-1 py-5 sm:grid-cols-[1fr_1.4fr] sm:gap-6"
          >
            <div>
              <p className="font-medium leading-snug">{h.role}</p>
              <p className="text-sm text-muted-foreground">{h.org}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {h.note}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-9 flex flex-wrap gap-3">
        {/* PLACEHOLDER links — TCX.4 points these at the real PDF in /public. */}
        <CtaLink href="#resume" size="lg" className="rounded-full">
          View resume (PDF — TCX.4)
        </CtaLink>
        <CtaLink
          href="#resume"
          size="lg"
          variant="outline"
          className="rounded-full"
        >
          Download PDF (TCX.4)
        </CtaLink>
      </div>
    </Section>
  );
}
