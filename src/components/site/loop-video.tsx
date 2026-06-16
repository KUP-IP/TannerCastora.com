import { cn } from "@/lib/utils";

/**
 * LoopVideo — an inline, ambient looping video that lives *inside* a content
 * column (as opposed to <HeroVideo>, which is a full-bleed background).
 *
 * Used for the book time-lapse at the bottom of Home: muted + loop + autoplay
 * (muted autoplay is universally allowed), playsInline, with a poster that
 * paints instantly so it never blocks layout. Rounded editorial frame to match
 * the "Anchor Desk Editorial" system.
 *
 * `src` accepts an ordered list of { url, type } sources (webm first, mp4
 * fallback). Aspect ratio fixes the frame so there's zero layout shift.
 */
type VideoSource = { url: string; type: string };

export function LoopVideo({
  src,
  poster,
  className,
  aspect = "aspect-video",
  label,
}: {
  src: readonly VideoSource[];
  poster?: string;
  className?: string;
  /** Tailwind aspect utility for the frame (default 16:9). */
  aspect?: string;
  /** Accessible label for the ambient clip. */
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-muted",
        aspect,
        className,
      )}
    >
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        tabIndex={-1}
      >
        {src.map((s) => (
          <source key={s.url} src={s.url} type={s.type} />
        ))}
      </video>
    </div>
  );
}
