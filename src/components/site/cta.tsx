import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

/**
 * CtaLink — an anchor styled as a button.
 *
 * The base-ui Button primitive renders a real <button> and has no `asChild`
 * prop, so for link-style CTAs (the common case across this site) we style an
 * <a> directly with buttonVariants. Keeps one consistent button look without
 * pulling in a Slot polyfill.
 */
type CtaLinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>;

export function CtaLink({
  className,
  variant,
  size,
  ...props
}: CtaLinkProps) {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
