import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
} from "@/components/site/section";
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
    <Section id="resume" className="bg-accent/30">
      <SectionLabel>Resume</SectionLabel>
      <SectionHeading>The resume</SectionHeading>
      <SectionLead className="mt-5">
        {/* PLACEHOLDER copy — TCX.3. */}
        View or download the full resume — experience, stations, and credits, in
        one tap.
      </SectionLead>

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
