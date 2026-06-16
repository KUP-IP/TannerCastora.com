"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { navItems, site } from "@/lib/site";
import { CtaLink } from "@/components/site/cta";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

/**
 * SiteHeader (TCX.2 themed) — the persistent landmark.
 *
 * Editorial, quiet: a serif wordmark, understated nav links with an animated
 * underline, one obvious primary CTA, and a mobile sheet menu. The bar starts
 * transparent-ish and frosts on scroll via the translucent backdrop.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        <a
          href="#hero"
          className="font-display text-lg font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          {site.name}
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 ease-[var(--ease-out-soft)] group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CtaLink
            href="#contact"
            size="sm"
            className="hidden rounded-full sm:inline-flex"
          >
            Get in touch
          </CtaLink>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetTitle className="px-6 pt-6 font-display text-lg">
                {site.name}
              </SheetTitle>
              <ul className="mt-4 flex flex-col px-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-secondary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto p-6">
                <CtaLink
                  href="#contact"
                  size="lg"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full"
                >
                  Get in touch
                </CtaLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
