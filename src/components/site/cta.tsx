"use client";

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
 *
 * Protocol links (`mailto:`, `tel:`) and in-page hashes are handled in click
 * code. Next.js App Router can swallow native navigation, which made contact
 * CTAs look dead on production.
 */
type CtaLinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>;

function scrollToHash(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function CtaLink({
  className,
  variant,
  size,
  href,
  onClick,
  ...props
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !href) return;
        if (href.startsWith("mailto:") || href.startsWith("tel:")) {
          e.preventDefault();
          window.location.href = href;
          return;
        }
        if (href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          scrollToHash(href);
          history.pushState(null, "", href);
        }
      }}
    />
  );
}
