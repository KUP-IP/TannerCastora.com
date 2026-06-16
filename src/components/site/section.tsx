import { cn } from "@/lib/utils";

/**
 * Section — shared layout primitive for every home-flow section.
 *
 * TCX.1: establishes consistent vertical rhythm + a single content measure so
 * the page reads as one calm, single-column-ish column (Smith quality bar).
 * TCX.2 will refine the spacing/type tokens; sections should keep using this
 * wrapper rather than re-implementing padding per-section.
 */
export function Section({
  id,
  className,
  children,
  width = "default",
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  width?: "default" | "wide" | "full";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 w-full px-6 py-20 sm:px-8 sm:py-28",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          width === "default" && "max-w-2xl",
          width === "wide" && "max-w-4xl",
          width === "full" && "max-w-6xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * SectionLabel — small eyebrow/kicker above a section heading.
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}

/**
 * Placeholder — clearly-labeled stub box so reviewers can see WHAT lands here
 * and in WHICH packet, without mistaking a stub for finished work.
 */
export function Placeholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 py-10 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
}
