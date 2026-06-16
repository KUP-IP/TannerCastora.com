import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
  Placeholder,
} from "@/components/site/section";

/**
 * Broadcasting — section 4: the reel (click-to-play). One of the two "let's
 * talk" payloads (reel + resume), reachable in one tap from the hero CTA.
 *
 * TCX.4 wires the actual broadcasting reel (still owed by Tanner). For now the
 * player is a clearly-labeled, media-styled placeholder.
 */
export function Broadcasting() {
  return (
    <Section id="broadcasting" width="wide">
      <div className="max-w-2xl">
        <SectionLabel>Broadcasting</SectionLabel>
        <SectionHeading>On the air</SectionHeading>
        <SectionLead className="mt-5">
          {/* PLACEHOLDER copy — TCX.3. */}
          A short line introducing the reel lands here — anchor desk and
          play-by-play across basketball and football.
        </SectionLead>
      </div>

      {/* PLACEHOLDER reel player — TCX.4 wires click-to-play video. */}
      <Placeholder
        media
        label="Broadcasting reel · click-to-play video, wired in TCX.4 (asset owed by Tanner)"
        className="mt-10 aspect-video w-full"
      />
    </Section>
  );
}
