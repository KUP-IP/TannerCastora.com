# Content Flags — TannerCastora.com (TCX.3 → resolved in TCX.6)

The TCX.6 finalization pass cleared the prior "verify before publish" gates with
operator-confirmed values. Remaining open items are operator-owned and not
content blockers.

All copy was sourced from Tanner's own resume (treated as publishable per the
TCX.3 source-of-truth verification) and written in his voice.

## Open (operator-owned, not a content blocker)

1. **DNS cutover timing** — canonical domain is `tannercastora.com` (with the
   "a"), wired into `SITE_URL` / `metadataBase` / canonical + OG URLs. No Vercel
   custom domain or DNS change has been made; the operator owns the cutover
   timing. Metadata is correct and resolves fine on preview deploys until then.

## Resolved in TCX.6 (operator-confirmed)

1. **Public contact email** — RESOLVED. `Castoramedia1@gmail.com` confirmed as
   the primary public contact; shown in Contact + primary "Email Tanner" CTA.
   — `src/lib/site.ts` → `site.contactEmail`

2. **Book purchase link** — RESOLVED. Live Amazon URL set and the buy button is
   enabled: `https://us.amazon.com/Stig-South-Dakota-State-Football/dp/1960729047`
   (ISBN 9781960729040). — `src/lib/site.ts` → `book.purchaseUrl`

3. **Phone number** — RESOLVED. `440-591-9132` published in the Contact section
   as a `tel:` link (operator-approved). — `src/lib/site.ts` → `site.phone`

4. **Hero clip** — RESOLVED. Hero swapped from the book time-lapse to a KELO
   anchor-desk broadcasting segment from Tanner's 2026 reel (source 88–99s),
   re-encoded to `public/media/hero.{mp4,webm}` + `hero-poster.jpg`.

5. **Canonical domain spelling** — RESOLVED. `tannercastora.com` (with the "a")
   confirmed and wired (see open item #1 for DNS-cutover timing).

6. **Location / recency wording** — the site presents Tanner as Cleveland-based
   and available now and does not assert current SD roles. Framing stands; no
   change required.

## Confirmed / verified (from Tanner's resume — published)

- Name, positioning (Emmy-nominated sports broadcaster & journalist; anchor +
  play-by-play, basketball & football).
- Broadcasting/journalism history: CBS/KELO anchor & reporter; ESPN+ Kent State
  play-by-play; Big Sioux / Brookings Radio; freelance journalism (98k-view X
  story).
- Recognition: 2022 Upper Midwest Emmy nomination (Best Sports Feature Story);
  2022 SD Broadcasters Assn. Sportscaster of the Year nomination; 2026 Sioux
  Falls Business 30 Under 30.
- Book: *Stig and the Rise of South Dakota State Football* — 170+ interviews,
  308 pages, self-funded $30k startup, Oct 2025 release, $65k+ sales, 40+ retail
  locations.
- Education: Kent State B.A. Broadcast Journalism; NCAA D-I basketball;
  Cleveland-area native.
- Links published: LinkedIn, X, YouTube reel, Medium.

## References (do NOT publish their contact info)

John Stiegelmeier, V.J. Smith, Sean Bower — available on request only; not
listed on the site.

## Owed assets (TCX.4 — not content flags)

Hero video (in Drive), broadcasting reel embed (YouTube link is live in copy now),
resume PDF, book cover image, portrait photo, OG share image.
