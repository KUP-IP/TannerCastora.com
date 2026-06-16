import { navItems, site } from "@/lib/site";
import { CtaLink } from "@/components/site/cta";

/**
 * SiteHeader — sticky top nav (the persistent landmark across the home flow).
 *
 * TCX.1: structure + a single obvious primary CTA (Get in touch) reachable from
 * anywhere, per the project requirement. Visual polish lands in TCX.2.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        <a href="#hero" className="text-base font-semibold tracking-tight">
          {site.name}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <CtaLink href="#contact" size="sm" className="rounded-full">
          Get in touch
        </CtaLink>
      </nav>
    </header>
  );
}
