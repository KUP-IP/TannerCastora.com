/**
 * Central site config + content for TannerCastora.com.
 *
 * TCX.3 (Content & Identity) populated this with real copy in Tanner's voice and
 * his verified facts (sourced from his own resume — treated as publishable).
 *
 * TCX.6 finalization resolved the prior content flags (email, phone, book
 * purchase URL, hero clip, canonical domain spelling) — see /CONTENT-FLAGS.md.
 * Only DNS cutover timing remains operator-owned.
 *
 *   - Media (hero video, reel, resume PDF, OG image) lands in TCX.4.
 *   - Visual system / tokens were locked in TCX.2.
 */

// Canonical domain confirmed by operator: tannercastora.com (WITH the "a").
// Drives metadataBase + canonical/OG URLs. DNS cutover timing is operator-owned;
// metadata only — no Vercel domain or DNS changes are made here.
// Preview deploys pass NEXT_PUBLIC_SITE_URL=<preview-url> at build so the OG/share
// card resolves on the preview; production (canonical domain) uses the default.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tannercastora.com";

export const site = {
  name: "Tanner Castora",
  // Person-first SEO title — his name leads, role qualifies.
  title: "Tanner Castora — Sports Broadcaster & Journalist",
  // Positioning line (hero). Value prop + role, in his voice.
  tagline:
    "Emmy-nominated sports broadcaster and journalist — anchor desk, play-by-play, and the stories in between",
  // Hero availability / "what he's looking for" line.
  availability: "Cleveland, OH · Available now",
  lookingFor:
    "Looking for my next on-air home — anchor, play-by-play, or sports reporting.",
  description:
    "Tanner Castora is an Emmy-nominated sports broadcaster and journalist — " +
    "anchor desk, play-by-play across basketball and football, and the author of " +
    "Stig and the Rise of South Dakota State Football. Cleveland-based and " +
    "available now. Watch the reel, read the resume, and get in touch.",

  // --- Contact ---------------------------------------------------------------
  // Confirmed primary public contact email (operator-approved, TCX.6).
  contactEmail: "Castoramedia1@gmail.com",
  // Operator-approved for public display; wired as a tel: link.
  phone: "440-591-9132",
  phoneTel: "+14405919132",
  linkedinUrl: "https://www.linkedin.com/in/tanner-castora-335a0b159",
  xUrl: "https://x.com/Tanner_Castora",
  youtubeReelUrl: "https://www.youtube.com/watch?v=CbcNqnRAi5Y",
  // Just the ID, for the lightweight click-to-play <YouTubeFacade> (TCX.4).
  youtubeReelId: "CbcNqnRAi5Y",
  mediumUrl: "https://medium.com/@Tannercastora",

  // --- Resume (TCX.4) --------------------------------------------------------
  // Real PDF served from /public (the repo), never hotlinked from Drive.
  resumePdf: "/Tanner-Castora-Resume.pdf",
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

// --- About: bio + credential bullets (the Smith "Meet" block) ----------------
// Two short paragraphs in Tanner's voice (first person, warm, plainspoken).
export const bio = [
  "I'm a sports broadcaster and journalist who grew up on the games — first as a " +
    "Division I basketball player, then on the other side of the camera. I've " +
    "anchored the weekend sports desk at a CBS affiliate, called play-by-play for " +
    "basketball and football, and chased down the stories most people never get to " +
    "tell. The thing I love hasn't changed since I was a kid: the moment, the people " +
    "in it, and getting it right.",
  "I'm a Cleveland-area native, recently back home and looking for my next on-air " +
    "home. Along the way I wrote a book about a Hall-of-Fame coach, built a sports-talk " +
    "show from scratch, and learned how to shoot, write, and edit a story end to end. " +
    "Whether it's the anchor desk, the broadcast booth, or a feature that takes a month " +
    "to report, I bring the same thing every time — preparation, warmth, and a real " +
    "respect for the audience.",
];

// Credential bullets — broadcasting / journalism / authorship.
export const credentials = [
  "Emmy-nominated sports anchor & reporter — CBS / KELO, Sioux Falls",
  "Play-by-play voice — basketball & football, including ESPN+ college hoops",
  "Sports journalist — features, a weekly sports-talk show, and a story that drew 98,000 views on X",
  "Author of Stig and the Rise of South Dakota State Football",
] as const;

// --- Recognition: the social-proof beat (Emmy nod first) ---------------------
export const recognition = [
  {
    title: "Upper Midwest Emmy nomination",
    detail: "Best Sports Feature Story (2022)",
  },
  {
    title: "Sportscaster of the Year nomination",
    detail: "South Dakota Broadcasters Association (2022)",
  },
  {
    title: "30 Under 30",
    detail: "Sioux Falls Business (2026)",
  },
] as const;

// --- Book: one supporting section --------------------------------------------
export const book = {
  title: "Stig and the Rise of South Dakota State Football",
  blurb:
    "The biography of Hall-of-Fame coach John “Stig” Stiegelmeier — built " +
    "from 170+ interviews across 308 pages. I raised the startup costs myself, and " +
    "since its 2025 release the book has passed $65,000 in sales and reached more " +
    "than 40 retail locations.",
  // Confirmed live purchase URL (operator-approved, TCX.6) — enables the buy button.
  purchaseUrl:
    "https://us.amazon.com/Stig-South-Dakota-State-Football/dp/1960729047" as
      | string
      | null,
} as const;
