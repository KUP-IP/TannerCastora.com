/**
 * Central site config + placeholder content for the TannerCastora.com shell.
 *
 * TCX.1 SCOPE: structure + clearly-labeled placeholders only.
 *   - Real copy lands in TCX.3 (Content & Identity).
 *   - Media (hero video, reel, resume PDF, OG image) lands in TCX.4.
 *   - Final design tokens / visual system land in TCX.2.
 *
 * Anything marked PLACEHOLDER / TODO below is intentionally a stub and must be
 * confirmed against Tanner's own source material before publishing (never ship
 * an unverified credential).
 */

// Canonical domain confirmed by operator: TannerCastora.com (WITH the "a").
// Used only as a metadataBase placeholder here — DNS is held by the operator
// pending cutover, so do not treat this as a live custom domain yet.
export const SITE_URL = "https://tannercastora.com";

export const site = {
  name: "Tanner Castora",
  // Person-first title — his name leads, role qualifies. (DoD: SEO title)
  title: "Tanner Castora — Sportscaster & Broadcast Journalist",
  // PLACEHOLDER positioning line — refine in TCX.3 (Tanner's voice).
  tagline: "Emmy-nominated sports broadcaster and journalist",
  description:
    "Tanner Castora is an Emmy-nominated sports broadcaster and journalist — " +
    "anchor, play-by-play voice, and author. Watch the reel, read the resume, " +
    "and get in touch.",
  // PLACEHOLDER contact — confirm real email + LinkedIn before publish (TCX.3 / open question #2).
  contactEmail: "hello@tannercastora.com", // TODO: confirm real address
  linkedinUrl: "https://www.linkedin.com/", // TODO: confirm real profile URL
} as const;

// Section anchors — single source of truth for nav + in-page links.
// Order IS the person-first home flow.
export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "recognition", label: "Recognition" },
  { id: "broadcasting", label: "Broadcasting" },
  { id: "resume", label: "Resume" },
  { id: "book", label: "Book" },
  { id: "contact", label: "Contact" },
] as const;

// Nav shows the meaningful jump points (not "Home" — the logo handles that).
export const navItems = sections.filter((s) => s.id !== "hero");
