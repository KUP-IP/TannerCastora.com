import { Section, SectionLabel, Placeholder } from "@/components/site/section";

/**
 * About — section 2: who he is + credentials. Leads with the PERSON, not the book.
 *
 * TCX.3 writes the real bio in Tanner's voice + verified credential bullets.
 * Credentials below are PLACEHOLDER and must be confirmed before publishing
 * (Emmy wording, station/title history — open question #3).
 */
export function About() {
  return (
    <Section id="about" width="wide">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start md:gap-14">
        {/* Portrait placeholder — real photo in TCX.4. */}
        <Placeholder
          label="Portrait photo — TCX.4"
          className="aspect-[4/5] w-full"
        />

        <div>
          <SectionLabel>About</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Meet Tanner
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {/* PLACEHOLDER bio — TCX.3 replaces with Tanner's own words. */}
            Placeholder bio. A short, warm, plainspoken introduction in Tanner&apos;s
            voice lands here in TCX.3 — sourced from his current site, his
            about-me, and his outline doc. It leads with the person and his work,
            not the book.
          </p>

          <ul className="mt-7 space-y-3 text-base">
            {/* PLACEHOLDER credentials — VERIFY each before publishing (open question #3). */}
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
              <span>Emmy-nominated sports broadcaster <em className="text-muted-foreground">(verify wording — TCX.3)</em></span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
              <span>Anchor & play-by-play, CBS / KELO Sioux Falls <em className="text-muted-foreground">(verify — TCX.3)</em></span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
              <span>Sports journalist & author <em className="text-muted-foreground">(verify — TCX.3)</em></span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
