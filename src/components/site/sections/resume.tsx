import { Section, SectionLabel } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";

/**
 * Resume — section 5: PDF view/download. The second "let's talk" payload,
 * reachable in one tap.
 *
 * TCX.4 drops the real resume PDF into /public and points these links at it
 * (served from the repo — never hotlinked). Links below are PLACEHOLDER.
 */
export function Resume() {
  return (
    <Section id="resume" className="bg-muted/30">
      <SectionLabel>Resume</SectionLabel>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        The resume
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        {/* PLACEHOLDER copy — TCX.3. */}
        View or download the full resume — experience, stations, and credits.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
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
