import { site, homeIntro, media } from "@/lib/site";
import { CtaLink } from "@/components/site/cta";
import { HeroVideo } from "@/components/site/hero-video";
import { LoopVideo } from "@/components/site/loop-video";

/**
 * Home (#home) — section 1 and THE signature moment (Tanner's favorite of the
 * Smith reference: "the video at the start").
 *
 * Two parts, one screen-flow:
 *   1. A full-bleed hero — the KELO anchor-desk clip behind the name lockup,
 *      two intro paragraphs, and the three primary CTAs.
 *   2. Below the fold, still within #home: a feature photo, then the book
 *      time-lapse. The time-lapse closes the section, so Home reads as its own
 *      screen before Meet Tanner begins.
 */
export function Home() {
  return (
    <section id="home" className="scroll-mt-24">
      {/* --- Hero (full-bleed anchor-desk video) --- */}
      <div className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden">
        <HeroVideo
          poster="/media/hero-poster.jpg"
          src={[
            { url: "/media/hero.webm", type: "video/webm" },
            { url: "/media/hero.mp4", type: "video/mp4" },
          ]}
        />

        <div className="mx-auto w-full max-w-3xl px-6 text-center sm:px-8">
          <h1 className="reveal reveal-2 font-display text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-balance sm:text-7xl md:text-8xl">
            {site.name}
          </h1>
          <p className="reveal reveal-3 mx-auto mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {homeIntro[0]}
          </p>
          <p className="reveal reveal-3 mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-foreground/75">
            {homeIntro[1]}
          </p>
          <div className="reveal reveal-4 mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaLink
              href={`mailto:${site.contactEmail}`}
              size="lg"
              className="rounded-full"
            >
              Get in touch
            </CtaLink>
            <CtaLink
              href={site.youtubeReelUrl}
              size="lg"
              variant="outline"
              className="rounded-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch the reel
            </CtaLink>
            <CtaLink
              href="#author"
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              Book
            </CtaLink>
          </div>
        </div>
      </div>

      {/* --- Below the hero: feature photo + book time-lapse (closes #home) --- */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.homeFeature}
          alt="Tanner Castora"
          loading="lazy"
          className="rise w-full rounded-2xl border border-border object-cover"
        />

        <figure className="rise mt-10 sm:mt-14">
          <LoopVideo
            src={media.timelapse.sources}
            poster={media.timelapse.poster}
            label="Time-lapse of Tanner Castora writing and producing his book"
          />
          <figcaption className="mt-4 text-center text-sm text-muted-foreground">
            From first page to finished book — a time-lapse of the work behind{" "}
            <span className="text-foreground">
              Stig and the Rise of South Dakota State Football
            </span>
            .
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
