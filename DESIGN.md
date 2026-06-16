# TannerCastora.com — Design System (TCX.2, locked)

> The locked visual language for the site. Built to the **vj-smith.com** quality
> bar **before** content/media land, so later packets (TCX.3 content, TCX.4 media)
> drop real material into already-designed sections. **Theme centrally only** —
> tokens live in `src/app/globals.css`; shared primitives in `src/components/`.
> Never write one-off styles per page.

Design skill used: **`frontend-design`** (Anthropic Claude Code skill, fetched via
the Bridge). Applied with `design:design-critique` discipline for the self-critique pass.

---

## 1. Visual direction — "Anchor Desk Editorial"

The vj-smith.com reference is calm, restrained, photo/video-led: near-black on
white, one muted accent, generous whitespace, and a hero **video** as the
signature moment. We elevate that bar from its Wix-generic execution into a
refined broadcast-editorial system — a characterful serif display for headlines
(on-air gravitas + warmth) over a clean grotesque body (trustworthy legibility),
warm near-black ink on soft warm paper, and **one** broadcast-blue accent used
sparingly. The page should make a hiring manager read Tanner as credible,
talented, and available within ~5 seconds.

**Mood + adjectives:** editorial · warm · trustworthy · video-forward.

---

## 2. Tokens (`src/app/globals.css`)

### Typography
- **Display:** Fraunces (serif, `opsz`+`SOFT` axes) → all `h1/h2/h3` + `.font-display`. Headlines only.
- **Body:** Geist Sans (`--font-sans`) → all running text, UI.
- **Mono:** Geist Mono (`--font-mono`) → incidental labels.
- **Loading:** all `display: "swap"` — the hero never blocks on a webfont (no FOIT, fast first paint).
- **Scale:** fluid editorial — hero `text-5xl → text-8xl`; section heads `text-3xl → 2.75rem`; lead `text-lg → text-xl`; body 1rem; eyebrow `--text-eyebrow` (0.78rem, 0.18em tracking, uppercase).

### Color (OKLCH; light-first, dark theme present)
| Token | Light | Role |
|---|---|---|
| `--background` | warm paper `oklch(0.985 0.004 85)` | page surface (not pure white) |
| `--foreground` | warm ink `oklch(0.205 0.008 75)` | body text |
| `--primary` | ink `oklch(0.215 …)` | headings, primary buttons |
| `--muted-foreground` | `oklch(0.475 …)` | secondary text (AA on paper) |
| `--brand` | broadcast blue `oklch(0.52 0.13 245)` | **the one accent** — links, focus, bullets, quote marks, selection |
| `--accent` | warm tint | alternating section bands |
| `--border` | `oklch(0.9 …)` | hairlines |

Accent discipline: brand blue appears **only** in links, focus rings, about-credential bullets, the recognition quote mark, and text selection. Everything else is ink/paper/muted.

### Spacing & rhythm
- Section vertical air: `py-24 → py-32` (generous, Smith-bar).
- Content measures via `<Section width>`: `narrow` max-w-xl · `default` max-w-2xl · `wide` max-w-5xl · `full` max-w-6xl.
- Gutters: `px-6 → px-8`.

### Grid & layout
- Single-column-ish editorial flow; two-column splits (`about`, `book`) collapse to one on mobile (mobile-first).
- Global page max width `max-w-6xl` (header/footer); content columns narrower for readable measure.

### Radius
- `--radius: 0.5rem`; scale `sm…3xl`. CTAs use full pill (`rounded-full`); cards/frames `rounded-2xl`.

### Motion
- Easings: `--ease-editorial`, `--ease-out-soft`. Durations: `--duration-fast/base/slow` (180/320/560ms).
- One orchestrated entrance: `.reveal` + `.reveal-1…4` staggered load on the hero.
- **Reduced-motion:** globally honored — `prefers-reduced-motion: reduce` collapses all animation/transition/smooth-scroll.

### Imagery / media treatment
- Portraits `aspect-[4/5]`; book cover `aspect-[2/3]`; reel `aspect-video` — all fixed-ratio frames → **zero layout shift**.
- `<Placeholder>` renders designed editorial frames (subtle grain + optional play affordance), never raw dashed boxes, so the page reads finished pre-asset.

### Hero-video treatment (`src/components/site/hero-video.tsx`)
The signature moment, centralized. Contract baked in once: `autoPlay + muted +
loop + playsInline`, `poster` for instant paint, `object-cover` in a fixed frame
(no shift), a gradient **scrim** guaranteeing foreground text contrast over any
frame, and `aria-hidden` (decorative). Pre-asset it shows a warm cinematic wash.
**TCX.4 only passes `src` + `poster`.**

---

## 3. Themed base components
- **Section primitives** (`section.tsx`): `Section` (wrapper/measure), `SectionLabel` (eyebrow + accent rule), `SectionHeading` (serif scale), `SectionLead`, `Placeholder`.
- **Button** (`ui/button.tsx`): sizes scaled up for the editorial bar (`lg` = h-12); variants `default` (ink) · `outline` · `secondary` · `ghost` · `brand` (blue) · `link`; calm `ease-out-soft` motion. `CtaLink` reuses these variants for anchor-as-button (base-ui Button has no `asChild`).
- **Nav** (`site-header.tsx`): sticky frosted bar, serif wordmark, underline-on-hover links, one primary CTA, mobile `Sheet` menu.
- **Footer** (`site-footer.tsx`): serif wordmark + tagline + nav repeat + baseline rule.
- **Cards:** recognition quotes — `rounded-2xl` bordered cards on `bg-card`, serif quote glyph in brand, hover shadow.

---

## 4. Section shells (all 7, styled with placeholders)
hero (serif lockup + central HeroVideo + staggered reveal) · about (sticky
portrait + bordered credential list, brand bullets) · recognition (two quote
cards) · broadcasting (media placeholder w/ play affordance) · resume (banded,
two CTAs) · book (compact, cover + **outline** CTA — deliberately quieter than
contact, person-first) · contact (largest serif headline — the conversion climax).
Alternating `bg-accent/30` bands give rhythm (recognition, resume, contact).

---

## 5. Self-critique pass (done; system locked)
Reviewed against the Smith bar + `design:design-critique` discipline:
- **Fixed:** header used non-standard `h-18` → swapped to explicit `h-[4.5rem]`. Fraunces `WONK` axis dropped (whimsical; a job-search broadcaster wants gravitas, not wonk) — kept `opsz`+`SOFT` for warmth.
- **Verified:** accent restraint (blue in ≤5 intentional roles); AA contrast (warm ink on paper, muted on paper, brand on paper); zero layout shift (all media in fixed-ratio frames); `display:swap` so hero never blocks; reduced-motion honored; book CTA demoted to `outline` so the book never out-shouts contact.
- **Intentional one-offs (documented, not drift):** hero + contact headings use bespoke larger scales than `SectionHeading` because they are the entrance and the conversion climax. All other heads route through the shared primitive.

**Status: locked.** `npm run build` green. Deploy-preview verification deferred
to W6 by orchestrator decision (live Vercel project gated); verified here via a
clean production build + this in-repo critique.
