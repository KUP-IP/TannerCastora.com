import {
  Section,
  SectionLabel,
  SectionHeading,
  SectionLead,
} from "@/components/site/section";
import { YouTubeFacade } from "@/components/site/youtube-facade";
import { media, site } from "@/lib/site";

/**
 * Broadcasting Reel (#reel) — v2 Wave B hybrid. One of the two "let's talk"
 * payloads (reel + resume), reachable in one tap from the hero CTA.
 *
 * Three clips, all click-to-play (nothing autoplays):
 *   1. Reporting & Anchoring — SELF-HOSTED <video controls poster> encoded into
 *      the repo (720p H.264 mp4 + VP9 webm, audio kept). No YouTube payload,
 *      no Drive hotlink — the headline reel lives on our own domain.
 *   2. Play-by-play — lightweight YouTube click-to-play façade.
 *   3. Radio — lightweight YouTube click-to-play façade.
 */
const clips = [
  {
    key: "playbyplay",
    label: "Play-by-play",
    videoId: site.reelPlayByPlayId,
    title: "Tanner Castora — Play-by-play",
  },
  {
    key: "radio",
    label: "Radio",
    videoId: site.reelRadioId,
    title: "Tanner Castora — Radio",
  },
];

export function Broadcasting() {
  return (
    <Section id="reel" width="wide">
      <div className="max-w-2xl">
        <SectionLabel>Broadcasting Reel</SectionLabel>
        <SectionHeading>On the air</SectionHeading>
        <SectionLead className="mt-5">
          The anchor desk, field reporting, and play-by-play work — here&apos;s
          a look at Tanner on the mic.
        </SectionLead>
      </div>

      {/* 1) Reporting & Anchoring — self-hosted, click-to-play with controls. */}
      <figure className="mt-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
          <video
            className="aspect-video w-full bg-black"
            controls
            preload="none"
            playsInline
            poster={media.reelAnchoring.poster}
          >
            {media.reelAnchoring.sources.map((s) => (
              <source key={s.url} src={s.url} type={s.type} />
            ))}
          </video>
        </div>
        <figcaption className="mt-3 text-sm font-medium text-muted-foreground">
          Reporting & Anchoring
        </figcaption>
      </figure>

      {/* 2–3) Play-by-play + Radio — YouTube façades. */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {clips.map((c) => (
          <figure key={c.key}>
            <YouTubeFacade
              videoId={c.videoId}
              title={c.title}
              className="aspect-video w-full"
            />
            <figcaption className="mt-3 text-sm font-medium text-muted-foreground">
              {c.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
