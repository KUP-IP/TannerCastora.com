# TannerCastora.com — Build Context (CLAUDE.md)

> Project: **PRJCT-2741 · TannerCastora.com** (re-scoped 2026-06-15)
> Hub: https://app.notion.com/p/2cf02bb8e4e448ebafa911ef38ad0614

## What we're building

A **live, person-first** website that helps **Tanner Castora** get hired. Not a book site — a site about *him*. The book is one supporting section, not the spine.

Built to the **simplicity and quality bar of the reference site: https://www.vj-smith.com/** (Tanner's pick — he specifically likes "the video at the start," so the hero video is the signature element).

## Who Tanner is

- Emmy-nominated broadcaster, KELO CBS Sioux Falls — anchor desk + play-by-play (basketball & football)
- Sports journalist; author of *Stig and the Rise of South Dakota State Football*
- Recently moved to Cleveland, OH; actively job-hunting (this site is a job-search tool)
- Voice: warm, plainspoken, confident

## Reference structure (vj-smith.com → adapt for Tanner)

Smith's home flow: hero promo **video** → "Meet V.J." (portrait + credential bullets) → testimonials → books grid (buy buttons) → contact. Simple, photo/video-led, mostly single-column.

**Tanner's person-first home flow:**
1. Hero — his time-lapse video (autoplay muted, looped, poster fallback) + name + one-line positioning
2. About / who he is — short bio in his voice + credential bullets (broadcasting, journalism, authorship)
3. Recognition — Emmy nod / testimonials
4. Broadcasting — reel (click-to-play)
5. Resume — PDF view/download
6. Book — ONE section, with a working purchase link
7. Contact

## Stack & deploy

- Next.js + Tailwind + shadcn (already scaffolded here)
- Deploy target: **Vercel**
- Mobile-first, clean, fast. No CMS, no book-funnel machinery (301s/GA4-preservation are explicitly out of scope).

## Design-first

This build is **design-led**. Before content or media land, establish the full visual system to the Smith quality bar — type, color, spacing, motion tokens + themed shadcn components + the hero-video treatment. **Fetch and use the `frontend-design` skill** for all UI/design/refinement work; it owns the design-token and styling constraints for this environment. Design once, centrally (tokens + shared components) — never one-off per page.

## Assets & comms (three-way: Isaiah + Tanner + Keepr)

- **Shared Drive folder** (Tanner drops assets + an outline doc here): https://drive.google.com/drive/folders/1nFHilwD1BTYMbbe8vx_yK2aW_sPv3YmI
  - Hero time-lapse video: uploaded 2026-06-12
  - Broadcasting reel: still incoming from Tanner
  - Resume PDF + book purchase URL: from Tanner
- Anything Tanner puts in that folder (docs, photos) is build context — read it.
- Tanner contact: iMessage +14405919132. Outbound messages to Tanner are drafted for Isaiah's approval before sending.

## Workflow

Rapid **iterate-and-deploy**: build → deploy to Vercel → send Tanner the link → he reacts via text → loop. Lightweight smoke only (loads, nav, hero plays, mobile, links, resume). Don't block the build on missing assets — stub + flag what Tanner still owes.

## Packets (Notion PACKETS DS, all scoped to PRJCT-2741)

Sequence (design-led, person-first):

1. **TCX.1 — Foundation & Smith-Structure Shell** — scaffold the repo + routes + layout shell + section skeleton; first Vercel deploy. (Design system itself → TCX.2.)
2. **TCX.2 — Design System & Visual Direction** — fetch `frontend-design`; lock type/color/spacing/motion tokens + themed components + hero-video treatment to the Smith bar; style every section shell with placeholders; self-critique and lock.
3. **TCX.3 — Content & Identity** — copy in Tanner's voice from his current site + about-me + outline doc, into the designed sections; book demoted to one section.
4. **TCX.4 — Media Wiring** — hero video, broadcasting reel, resume PDF, book purchase link; posters + mobile fallbacks.
5. **TCX.5 — Refinement & Polish** — design critique vs the Smith bar; responsive, accessibility, performance, motion/micro-interactions; redeploy.
6. **TCX.6 — Ship & Iterate** — production deploy, smoke, send Tanner the link, feedback loop until sign-off.

Dependency: TCX.1 → TCX.2 → {TCX.3 ∥ TCX.4} → TCX.5 → TCX.6.

## Don'ts

- Don't make the book the center. Don't migrate off this repo/stack. Don't invent facts about Tanner — flag anything that needs his confirmation. Don't build heavyweight launch/QA/rollback machinery. Don't one-off styles — work through the TCX.2 design system.


---

## Audience & what makes this succeed

**Who this is for:** hiring decision-makers in sports broadcasting and journalism — news directors, station managers, recruiters, producers — usually on a phone, often arriving from a link Tanner texts or emails, or from Googling his name.

**Success looks like:** within ~5 seconds a visitor reads Tanner as credible, talented, and currently available; his reel and resume are one tap away; contacting him is frictionless. The site's job is to convert a viewer into an interview. Judge every decision against: *does this help a hiring manager say "let's talk"?*

## Discoverability & contact (don't skip — these convert)

- His name in the page `<title>` + a meta description; an Open Graph / Twitter card with his photo (the link preview when texted/emailed is the first impression); a favicon; clean semantic headings.
- One obvious primary CTA — contact / get in touch — reachable from the hero and the contact section. Reel and resume each reachable in one tap.
- Contact section needs a real method (email / LinkedIn). Serve all assets from the repo (download them) — never hotlink from Drive.

## Open questions — confirm before publishing

1. **Domain spelling** — repo says TannerCastora.com; the Notion project is titled TannerCastor.com. His surname is Castora. Confirm the exact live domain before production; don't hardcode the wrong one.
2. **Contact details** — Tanner's email + LinkedIn URL (phone optional).
3. **Verify claims** — Emmy nomination wording, station/title history, exact book title. Never publish an unconfirmed credential — omit or stub-and-flag.
4. **Outstanding assets** — reel, resume PDF, book purchase URL owed by Tanner; hero video is in the Drive folder (confirm retrievable build-side).
