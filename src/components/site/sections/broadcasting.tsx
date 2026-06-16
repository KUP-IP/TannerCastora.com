import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
} from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { YouTubeFacade } from "@/components/site/youtube-facade";
import { site } from "@/lib/site";

/**
 * Broadcasting — section 4: the reel. One of the two "let's talk" payloads
 * (reel + resume), reachable in one tap from the hero CTA.
 *
 * Copy is real (TCX.3). The reel is Tanner's canonical 2026 YouTube reel, wired
 * (TCX.4) as a lightweight click-to-play façade: thumbnail only on first paint,
 * the real player mounts on click — never autoplays, never taxes mobile load.
 */
export function Broadcasting() {
  return (
    <Section id="reel" width="wide">
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

      {/* Click-to-play reel — façade loads only the thumbnail until pressed. */}
      <YouTubeFacade
        videoId={site.youtubeReelId}
        title="Tanner Castora — 2026 Broadcasting Reel"
        className="mt-10 aspect-video w-full"
      />
    </Section>
  );
}
