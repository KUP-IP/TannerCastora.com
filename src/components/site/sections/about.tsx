import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
  Placeholder,
} from "@/components/site/section";

/**
 * About — section 2: who he is + credentials. Leads with the PERSON, not the book.
 *
 * TCX.3 writes the real bio in Tanner's voice + verified credential bullets.
 * Credentials below are PLACEHOLDER and must be confirmed before publishing
 * (Emmy wording, station/title history — open question #3).
 */
const credentials = [
  {
    text: "Emmy-nominated sports broadcaster",
    flag: "verify wording — TCX.3",
  },
  {
    text: "Anchor & play-by-play · CBS / KELO, Sioux Falls",
    flag: "verify — TCX.3",
  },
  {
    text: "Sports journalist & published author",
    flag: "verify — TCX.3",
  },
];

export function About() {
  return (
    <Section id="about" width="wide">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16">
        {/* Portrait placeholder — real photo in TCX.4. */}
        <Placeholder
          label="Portrait photo — TCX.4"
          className="aspect-[4/5] w-full md:sticky md:top-28"
        />

        <div>
          <SectionLabel>About</SectionLabel>
          <SectionHeading>Meet Tanner</SectionHeading>
          <SectionLead className="mt-6">
            {/* PLACEHOLDER bio — TCX.3 replaces with Tanner's own words. */}
            A short, warm, plainspoken introduction in Tanner&apos;s voice lands
            here in TCX.3 — sourced from his current site, his about-me, and his
            outline doc. It leads with the person and his work, not the book.
          </SectionLead>

          <p className="mt-5 leading-relaxed text-muted-foreground">
            A second paragraph of placeholder bio fills out the column so the
            measure and rhythm read at the reference quality bar — enough text to
            show how real copy will sit against the portrait.
          </p>

          <ul className="mt-9 space-y-4 border-t border-border pt-8">
            {credentials.map((c) => (
              <li key={c.text} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                <span className="text-base leading-relaxed">
                  {c.text}{" "}
                  <em className="text-sm not-italic text-muted-foreground">
                    ({c.flag})
                  </em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
