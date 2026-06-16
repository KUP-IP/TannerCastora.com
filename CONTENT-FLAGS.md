# Content Flags — TannerCastora.com (TCX.3)

Items below were wired with the best known value but **must be confirmed by
Tanner / the operator before the production cutover.** Nothing here is a blocker
for preview deploys; each is a "verify before publish" gate.

All copy was sourced from Tanner's own resume (treated as publishable per the
TCX.3 source-of-truth verification) and written in his voice. Anything *not* on
the resume was either omitted or flagged below.

## Must confirm before publishing

1. **Public contact email** — wired as `Castoramedia1@gmail.com` (the address on
   his resume), shown in the Contact section and used for the primary "Email
   Tanner" CTA. **Confirm this is the address Tanner wants shown publicly** (vs.
   a dedicated/aliased address). — `src/lib/site.ts` → `site.contactEmail`

2. **Book purchase link** — currently **stubbed-and-flagged**: the buy button
   renders as a disabled "link coming soon" state because `book.purchaseUrl` is
   `null`. Likely Amazon URL pending confirmation:
   `https://us.amazon.com/Stig-South-Dakota-State-Football/dp/1960729047`
   (ISBN 9781960729040). **Do not enable until the operator confirms.** Set
   `book.purchaseUrl` in `src/lib/site.ts` to go live.

3. **Location / recency wording** — the resume lists South Dakota roles dated
   into 2026 while Tanner has "recently moved to Cleveland." The site presents
   him as **Cleveland-based and available now** and does not assert current SD
   roles. **Confirm this framing with Tanner** (and whether any SD role is still
   active). — hero `site.availability` / `site.lookingFor`, bio in `src/lib/site.ts`

4. **Phone number** — `440-591-9132` is on the resume but is **not published**
   on the site. Add only if the operator approves. — not currently wired.

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
