import { site } from "@/lib/site";
import { CtaLink } from "@/components/site/cta";

/**
 * Hero — section 1 of the person-first flow. THE signature moment.
 *
 * TCX.4 wires the actual time-lapse video (autoplay, muted, looped, poster
 * fallback). For now the video frame is a clearly-labeled placeholder so the
 * layout and the name/positioning/CTA above-the-fold are real and reviewable.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden scroll-mt-20"
    >
      {/* PLACEHOLDER hero media — TCX.4 replaces with the autoplay time-lapse video + poster. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-muted via-background to-background"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 flex items-center justify-center"
      >
        <span className="rounded-full border border-dashed border-border/70 px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground/70">
          Hero video — wired in TCX.4
        </span>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 text-center sm:px-8">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {site.name}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground sm:text-xl">
          {/* PLACEHOLDER positioning line — final copy in TCX.3 (Tanner's voice). */}
          {site.tagline}.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <CtaLink href="#contact" size="lg" className="rounded-full">
            Get in touch
          </CtaLink>
          <CtaLink
            href="#broadcasting"
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            Watch the reel
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
