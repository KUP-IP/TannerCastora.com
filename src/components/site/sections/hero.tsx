import { site } from "@/lib/site";
import { CtaLink } from "@/components/site/cta";
import { HeroVideo } from "@/components/site/hero-video";

/**
 * Hero — section 1 and THE signature moment (Tanner's favorite of the Smith
 * reference: "the video at the start").
 *
 * The video treatment is centralized in <HeroVideo>; TCX.4 supplies src/poster.
 * Above the scrim: a serif name lockup, one positioning line, and the primary
 * pair of CTAs (Get in touch + Watch the reel) — the "let's talk" payloads.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden scroll-mt-24"
    >
      {/* PLACEHOLDER hero media — TCX.4 passes src + poster to <HeroVideo>. */}
      <HeroVideo />

      <div className="mx-auto w-full max-w-3xl px-6 text-center sm:px-8">
        <p className="reveal reveal-1 eyebrow mb-6 justify-center text-muted-foreground">
          Cleveland, OH · Available now
        </p>
        <h1 className="reveal reveal-2 font-display text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-balance sm:text-7xl md:text-8xl">
          {site.name}
        </h1>
        <p className="reveal reveal-3 mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {/* PLACEHOLDER positioning line — final copy in TCX.3 (Tanner's voice). */}
          {site.tagline}.
        </p>
        <div className="reveal reveal-4 mt-10 flex flex-wrap items-center justify-center gap-3">
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
