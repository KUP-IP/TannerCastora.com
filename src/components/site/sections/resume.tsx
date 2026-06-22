import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
} from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { site } from "@/lib/site";

/**
 * Resume — section 5: a clean, single-message handoff to the PDF. The second
 * "let's talk" payload, reachable in one tap.
 *
 * Simplified (Outline P2): no on-page highlight rows — just the prompt and the
 * two buttons (view / download), both wired to the real PDF served from
 * /public (never hotlinked).
 */
export function Resume() {
  return (
    <Section id="resume" className="bg-accent/30">
      <SectionLabel>Resume</SectionLabel>
      <SectionHeading>The resume</SectionHeading>
      <SectionLead className="mt-5">
        Tanner&apos;s full resume is just one tap away.
      </SectionLead>

      <div className="mt-9 flex flex-wrap gap-3">
        {/* Real PDF served from /public. View opens in a new tab — the
            mobile-safe fallback, since iOS Safari renders PDFs inline there
            rather than forcing a download. */}
        <CtaLink
          href={site.resumePdf}
          size="lg"
          className="rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          View resume (PDF)
        </CtaLink>
        <CtaLink
          href={site.resumePdf}
          size="lg"
          variant="outline"
          className="rounded-full"
          download="Tanner-Castora-Resume.pdf"
        >
          Download resume
        </CtaLink>
      </div>

      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Letter of recommendation
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <CtaLink
          href={site.letterPdf}
          size="lg"
          className="rounded-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          View letter (PDF)
        </CtaLink>
        <CtaLink
          href={site.letterPdf}
          size="lg"
          variant="outline"
          className="rounded-full"
          download="Tanner-Castora-Letter-of-Recommendation.pdf"
        >
          Download letter
        </CtaLink>
      </div>
    </Section>
  );
}
