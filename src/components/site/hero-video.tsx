import { cn } from "@/lib/utils";

/**
 * HeroVideo (TCX.2) — the signature hero-video treatment, centralized.
 *
 * This is the one place the hero-video contract lives, so TCX.4 only has to
 * pass sources + `poster` and the autoplay/muted/loop/inline + scrim + reduced-
 * motion + no-layout-shift behavior is already correct.
 *
 *   - autoPlay + muted + loop + playsInline  → ambient time-lapse, no controls
 *   - poster                                  → paints instantly, never blocks
 *   - preload="metadata"                      → first paint rides the poster,
 *                                               the video bytes stream after
 *   - webm + mp4 sources                       → webm (smaller) first, mp4 for
 *                                               Safari/iOS — both single-digit MB
 *   - object-cover fill + fixed aspect frame  → zero layout shift
 *   - gradient scrim                          → guarantees text contrast on top
 *
 * `src` accepts a single URL or an ordered list of { url, type } sources.
 * When no source is given it renders a poised editorial placeholder frame
 * instead of an empty box, so the hero already reads finished.
 */
type VideoSource = { url: string; type: string };

export function HeroVideo({
  src,
  poster,
  className,
  children,
}: {
  /** Single mp4 URL, or an ordered list of sources (webm first, mp4 fallback). */
  src?: string | VideoSource[];
  poster?: string;
  className?: string;
  /** Overlay content (name, tagline, CTAs) rendered above the scrim. */
  children?: React.ReactNode;
}) {
  const sources: VideoSource[] =
    typeof src === "string"
      ? [{ url: src, type: "video/mp4" }]
      : Array.isArray(src)
        ? src
        : [];

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {sources.length > 0 ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          // First paint rides the poster; the (single-digit MB) video streams
          // after — so the hero never blocks load on mobile.
          preload="metadata"
          poster={poster}
          // Decorative ambient video — not content; never announce to AT.
          aria-hidden
          tabIndex={-1}
        >
          {sources.map((s) => (
            <source key={s.url} src={s.url} type={s.type} />
          ))}
        </video>
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
      ) : (
        // Pre-asset placeholder: warm cinematic wash so the hero reads designed.
        <div
          aria-hidden
          className="h-full w-full bg-[radial-gradient(120%_80%_at_50%_0%,var(--accent)_0%,var(--background)_60%,var(--background)_100%)]"
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="eyebrow text-muted-foreground/70">
              Hero video · wired in TCX.4
            </span>
          </div>
        </div>
      )}

      {/* Scrim — a two-layer treatment that guarantees the lockup reads premium
          over ANY frame (the time-lapse is busy by nature):
            1. a vertical wash that anchors the top nav + grounds the footer CTAs,
            2. a center-weighted radial that calms the noisy midground directly
               behind the name lockup, so the serif floats instead of competing.
          This is the difference between "text on a video" and the Smith-bar calm. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/55 to-background/95"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,var(--background)_0%,var(--background)_30%,transparent_78%)] opacity-90"
      />
      {children}
    </div>
  );
}
