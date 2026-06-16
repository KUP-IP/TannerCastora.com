import { cn } from "@/lib/utils";

/**
 * Section primitives — the central editorial layout + type system (TCX.2).
 *
 * Every home-flow section composes these rather than re-implementing padding,
 * measure, or heading styles. This is where the "Anchor Desk Editorial" rhythm
 * lives: generous vertical air, one calm content measure, serif display heads.
 * See /DESIGN.md for the full system.
 */

/* --- Section wrapper: vertical rhythm + content measure ------------------ */
export function Section({
  id,
  className,
  children,
  width = "default",
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  width?: "narrow" | "default" | "wide" | "full";
}) {
  return (
    <section
      id={id}
      className={cn(
        // Generous, Smith-bar vertical air; scroll offset clears the sticky nav.
        "scroll-mt-24 w-full px-6 py-24 sm:px-8 sm:py-32",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          width === "narrow" && "max-w-xl",
          width === "default" && "max-w-2xl",
          width === "wide" && "max-w-5xl",
          width === "full" && "max-w-6xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}

/* --- Eyebrow: kicker + broadcast accent tick ----------------------------- */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3">
      <span aria-hidden className="accent-rule" />
      <span className="eyebrow">{children}</span>
    </p>
  );
}

/* --- Section heading: serif display, editorial scale --------------------- */
export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        // `rise` gives every section heading the calm Smith-bar scroll reveal
        // (pure-CSS, reduced-motion-safe — see globals.css).
        "rise font-display text-3xl font-medium leading-[1.08] tracking-[-0.01em] text-balance sm:text-4xl md:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/* --- Lead paragraph: the larger intro line under a heading --------------- */
export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Placeholder — clearly-labeled media stub so reviewers see WHAT lands here and
 * in WHICH packet. Styled to read as an intentional editorial frame (not a raw
 * dashed box), with a subtle play-style affordance for media slots.
 */
export function Placeholder({
  label,
  className,
  media = false,
}: {
  label: string;
  className?: string;
  media?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/ph relative flex items-center justify-center overflow-hidden rounded-2xl",
        "border border-border bg-gradient-to-br from-secondary to-muted",
        "px-6 py-10 text-center",
        className,
      )}
    >
      {/* subtle grain/tint so it reads as a designed frame, not an empty div */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3">
        {media && (
          <span
            aria-hidden
            className="flex size-12 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 translate-x-px text-foreground"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
        <span className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
