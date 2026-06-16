import { Section, SectionLabel, Placeholder } from "@/components/site/section";

/**
 * Broadcasting — section 4: the reel (click-to-play). One of the two "let's
 * talk" payloads (reel + resume), reachable in one tap from the hero CTA.
 *
 * TCX.4 wires the actual broadcasting reel (still owed by Tanner). For now the
 * player is a clearly-labeled placeholder.
 */
export function Broadcasting() {
  return (
    <Section id="broadcasting" width="wide">
      <SectionLabel>Broadcasting</SectionLabel>
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        On the air
      </h2>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        {/* PLACEHOLDER copy — TCX.3. */}
        A short line introducing the reel lands here. Anchor desk and
        play-by-play across basketball and football.
      </p>

      {/* PLACEHOLDER reel player — TCX.4 wires click-to-play video. */}
      <Placeholder
        label="Broadcasting reel — click-to-play video, wired in TCX.4 (asset owed by Tanner)"
        className="mt-8 aspect-video w-full"
      />
    </Section>
  );
}
