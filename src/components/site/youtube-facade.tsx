"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * YouTubeFacade (TCX.4) — a lightweight click-to-play YouTube embed.
 *
 * Why a façade instead of a raw <iframe>: a bare YouTube iframe pulls hundreds
 * of KB of player JS + cookies on first paint, even before anyone presses play.
 * This renders just the thumbnail + a play affordance; the real iframe (with
 * autoplay) only mounts on click. So the reel is one tap away without taxing
 * the mobile-first first-paint budget — and it never autoplays.
 *
 * The thumbnail is served straight from YouTube's image CDN (i.ytimg.com),
 * which is an image host, not a tracking embed — no Drive hotlink, no player
 * payload until intent.
 */
export function YouTubeFacade({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  // maxresdefault is the sharp 1280×720 thumb; hqdefault is the always-present
  // fallback if a given upload has no maxres frame.
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbFallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-secondary",
        className,
      )}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerated-performance; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group/yt absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== thumbFallback) img.src = thumbFallback;
            }}
          />
          {/* Scrim for play-button contrast + a subtle editorial darken. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent transition-colors group-hover/yt:from-background/30"
          />
          {/* Play affordance — mirrors the design-system Placeholder play tick. */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-transform duration-200 group-hover/yt:scale-105"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-7 translate-x-px text-foreground"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
