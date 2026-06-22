"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * LoopVideo — inline ambient looping video (the book time-lapse). Muted + loop +
 * autoplay (universally allowed muted), playsInline, with a poster that paints
 * instantly so it never blocks layout.
 *
 * PART 3: the frame is clickable — tap/click expands the clip to full screen
 * (native Fullscreen API on desktop, webkitEnterFullscreen on iOS Safari).
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
  const ref = useRef<HTMLVideoElement>(null);

  const openFullscreen = () => {
    const v = ref.current as
      | (HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
          webkitRequestFullscreen?: () => void;
        })
      | null;
    if (!v) return;
    if (v.requestFullscreen) void v.requestFullscreen();
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openFullscreen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openFullscreen();
        }
      }}
      aria-label={
        label ? `${label} — tap to play full screen` : "Play video full screen"
      }
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted",
        aspect,
        className,
      )}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden
        tabIndex={-1}
      >
        {src.map((s) => (
          <source key={s.url} src={s.url} type={s.type} />
        ))}
      </video>

      {/* Expand affordance — appears on hover/focus. */}
      <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
        Tap for full screen
      </span>
    </div>
  );
}
