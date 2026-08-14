import { navItems, site } from "@/lib/site";

/**
 * SiteFooter (TCX.2 themed) — the closing landmark.
 *
 * A calm sign-off: serif wordmark + tagline, a repeat of the nav, and a thin
 * baseline with copyright + a quiet KUP Solutions sponsor lockup.
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

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-border/70 pt-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <a
            href={site.sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit flex-col items-center gap-2 sm:items-end"
          >
            <span className="eyebrow text-muted-foreground/80">Sponsored by</span>
            <picture>
              <source srcSet={site.sponsor.logoWebp} type="image/webp" />
              <img
                src={site.sponsor.logoPng}
                alt={site.sponsor.name}
                width={118}
                height={40}
                className="h-8 w-auto opacity-85 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] group-hover:opacity-100 sm:h-10"
              />
            </picture>
          </a>
        </div>
      </div>
    </footer>
  );
}
