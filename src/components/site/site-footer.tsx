import { navItems, site } from "@/lib/site";

/**
 * SiteFooter — closing landmark; repeats the nav + primary contact.
 * TCX.1 structure only; styling refined in TCX.2.
 */
export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold tracking-tight">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.tagline}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pb-8 sm:px-8">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
