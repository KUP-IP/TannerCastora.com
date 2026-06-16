import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
  Placeholder,
} from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { site } from "@/lib/site";

/**
 * Broadcasting — section 4: the reel. One of the two "let's talk" payloads
 * (reel + resume), reachable in one tap from the hero CTA.
 *
 * Copy is real (TCX.3). The embedded click-to-play player is wired in TCX.4;
 * until then the reel is one tap away via the YouTube link below.
 */
export function Broadcasting() {
  return (
    <Section id="broadcasting" width="wide">
      <div className="max-w-2xl">
        <SectionLabel>Broadcasting</SectionLabel>
        <SectionHeading>On the air</SectionHeading>
        <SectionLead className="mt-5">
          Anchor desk and the broadcast booth — weekend sports blocks, live
          shots, and play-by-play across basketball and football. Here&apos;s a
          look at the work.
        </SectionLead>
        <div className="mt-7">
          <CtaLink
            href={site.youtubeReelUrl}
            size="lg"
            className="rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch the reel on YouTube
          </CtaLink>
        </div>
      </div>

      {/* Embedded click-to-play player is wired in TCX.4. */}
      <Placeholder
        media
        label="Broadcasting reel · embedded player wired in TCX.4 — watch now via the YouTube link above"
        className="mt-10 aspect-video w-full"
      />
    </Section>
  );
}
