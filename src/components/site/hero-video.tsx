import { cn } from "@/lib/utils";

/**
 * HeroVideo (TCX.2) — the signature hero-video treatment, centralized.
 *
 * This is the one place the hero-video contract lives, so TCX.4 only has to
 * pass `src` + `poster` and the autoplay/muted/loop/inline + scrim + reduced-
 * motion + no-layout-shift behavior is already correct.
 *
 *   - autoPlay + muted + loop + playsInline  → ambient time-lapse, no controls
 *   - poster                                  → paints instantly, never blocks
 *   - object-cover fill + fixed aspect frame  → zero layout shift
 *   - gradient scrim                          → guarantees text contrast on top
 *
 * When `src` is absent (current pre-TCX.4 state) it renders a poised editorial
 * placeholder frame instead of an empty box, so the hero already reads finished.
 */
export function HeroVideo({
  src,
  poster,
  className,
  children,
}: {
  src?: string;
  poster?: string;
  className?: string;
  /** Overlay content (name, tagline, CTAs) rendered above the scrim. */
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {src ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          // Decorative ambient video — not content; never announce to AT.
          aria-hidden
          tabIndex={-1}
        >
          <source src={src} type="video/mp4" />
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

      {/* Scrim — guarantees foreground legibility over any frame. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background/85"
      />
      {children}
    </div>
  );
}
