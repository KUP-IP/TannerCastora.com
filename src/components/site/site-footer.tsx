import { navItems, site } from "@/lib/site";

/**
 * SiteFooter (TCX.2 themed) — the closing landmark.
 *
 * A calm sign-off: serif wordmark + tagline, a repeat of the nav, and a thin
 * baseline rule. Slightly darker than the page so it reads as the page's foot.
 */
export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-medium tracking-tight text-foreground">
              {site.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.tagline}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
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
          </nav>
        </div>

        <div className="mt-12 border-t border-border/70 pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
