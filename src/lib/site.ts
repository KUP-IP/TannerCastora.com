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
  // v2 (operator-confirmed) reel link — opens YouTube in a new tab from the
  // Home "Watch the reel" CTA.
  youtubeReelUrl: "https://www.youtube.com/watch?v=ewtg3VBZo2g",
  // Just the ID, for the lightweight click-to-play <YouTubeFacade> (TCX.4).
  youtubeReelId: "ewtg3VBZo2g",
  // v2 Wave B — the Broadcasting Reel section is a hybrid: the reporting/anchoring
  // reel is self-hosted (media.reelAnchoring), while play-by-play and radio are
  // lightweight YouTube click-to-play façades (operator-confirmed IDs).
  reelPlayByPlayId: "VUT7KpdQ8z8",
  reelRadioId: "vEeN611flcU",
  mediumUrl: "https://medium.com/@Tannercastora",

  // Footer sponsor credit — KUP lockup served from /public (never hotlinked).
  sponsor: {
    name: "KUP Solutions",
    url: "https://kup.solutions",
    logoWebp: "/brand/kup-logo.webp",
    logoPng: "/brand/kup-logo.png",
  },

  // --- Resume (TCX.4) --------------------------------------------------------
  // Real PDF served from /public (the repo), never hotlinked from Drive.
  resumePdf: "/Tanner-Castora-Resume.pdf",
  // Letter of recommendation (from Coach John Stiegelmeier) — view/download (PART 3).
  letterPdf: "/Letter-of-Recommendation.pdf",
} as const;

// --- Media map (v2 Wave A) ---------------------------------------------------
// Every web-optimized asset is downloaded into the repo (public/media) and
// referenced by path here — NEVER hotlinked from Drive. Source → optimized
// filename mapping is recorded inline so Wave B can wire the rest.
//
//   HOME
//     Picture2.jpg  → /media/home-feature.jpg   (in use, Home)
//     Picture1.jpg  → /media/home-alt.jpg        (optional/alt — unused for now)
//     TimeLapse.mp4 → /media/timelapse.{mp4,webm} + /media/timelapse-poster.jpg
//   MEET TANNER
//     Picture5.jpg  → /media/meet-feature.jpg
//     Picture6.jpg  → /media/meet-1.jpg
//     Picture7.jpg  → /media/meet-2.jpg
//     Picture8.jpg  → /media/meet-3.jpg
//     Picture9.jpeg → /media/meet-4.jpg
//     Picture10.jpg → /media/meet-5.jpg
//     Picture11.jpg → /media/meet-6.jpg
//   AUTHOR / BOOK (optimized for Wave B — produced, not yet wired)
//     BookPicture1.jpg → /media/book-1.jpg   BookPicture2.JPG → /media/book-2.jpg
//     BookPicture3.jpg → /media/book-3.jpg   BookPicture4.jpg → /media/book-4.jpg
//     BookPicture5.jpg → /media/book-5.jpg   BookPicture6.jpg → /media/book-6.jpg
//     BookPicture7.jpg → /media/book-7.jpg   Book Model.png  → /media/book-model.png
//     BookBackground.jpg → /media/book-background.jpg
export const media = {
  // Home
  homeFeature: "/media/home-feature.jpg",
  homeAlt: "/media/home-alt.jpg",
  timelapse: {
    poster: "/media/timelapse-poster.jpg",
    sources: [
      { url: "/media/timelapse.webm", type: "video/webm" },
      { url: "/media/timelapse.mp4", type: "video/mp4" },
    ],
  },
  // Meet Tanner
  meetFeature: "/media/meet-feature.jpg",
  meet1: "/media/meet-1.jpg",
  meet2: "/media/meet-2.jpg",
  meet3: "/media/meet-3.jpg",
  meet4: "/media/meet-4.jpg",
  meet5: "/media/meet-5.jpg",
  meet6: "/media/meet-6.jpg",
  // Author / book (Wave B)
  book: {
    pic1: "/media/book-1.jpg",
    pic2: "/media/book-2.jpg",
    pic3: "/media/book-3.jpg",
    pic4: "/media/book-4.jpg",
    pic5: "/media/book-5.jpg",
    pic6: "/media/book-6.jpg",
    pic7: "/media/book-7.jpg",
    model: "/media/book-model.png",
    background: "/media/book-background.jpg",
  },
  // Broadcasting reel (Wave B) — self-hosted reporting/anchoring reel, encoded
  // from Drive source to 720p H.264 mp4 + VP9 webm (audio kept), with a poster.
  // Served from the repo; click-to-play <video controls>, NOT autoplay.
  reelAnchoring: {
    poster: "/media/reel-anchoring-poster.jpg",
    sources: [
      { url: "/media/reel-anchoring.webm", type: "video/webm" },
      { url: "/media/reel-anchoring.mp4", type: "video/mp4" },
    ],
  },
} as const;

// Section anchors — single source of truth for nav + in-page links.
//
// v2 restructure (operator-confirmed): still ONE page, reorganized so the nav
// reads Home · Meet Tanner · Author · Broadcasting Reel · Resume. Section IDs
// were renamed to match these anchors (hero→home, about→meet, book→author,
// broadcasting→reel). Recognition + Contact are KEPT in the page (Wave B
// refines them) — they're just not surfaced as top-level nav jump points.
export const sections = [
  { id: "home", label: "Home" },
  { id: "meet", label: "Meet Tanner" },
  { id: "author", label: "Author" },
  { id: "reel", label: "Broadcasting Reel" },
  { id: "resume", label: "Resume" },
] as const;

// The 5 top-level nav jump points (the logo also routes Home, but Home stays in
// the list so the active section is always represented).
export const navItems = sections.filter((s) => s.id !== "home");

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

// --- HOME (#home): the two intro paragraphs under the name ------------------
// Lead line: Tanner's Aug 11 wording (shortened from the prior KELO sentence —
// "too much going on there"). Book paragraph is unchanged v2 copy.
export const homeIntro = [
  "Emmy-nominated sports reporter / best selling author in the Upper Midwest",
  "Released in October 2025, his book, Stig and The Rise of South Dakota State " +
    "Football has sold several thousand copies and is now carried in stores " +
    "across the region.",
] as const;

// --- MEET TANNER (#meet): editorial bio, images interleaved at marked spots --
// Verbatim v2 copy (operator-supplied). Each block's paragraph is followed by
// the image(s) noted; the final block carries two images. Feature image
// (meet-feature) sits above all blocks. Optimized filenames match media.meet*.
export const meetFeature = media.meetFeature;
export const meetBlocks = [
  {
    text:
      "After graduating from Strongsville High School (Northeast Ohio), Tanner " +
      "Castora attended South Carolina Upstate on a full Division I basketball " +
      "scholarship.",
    images: [{ src: media.meet1, alt: "Tanner Castora" }],
  },
  {
    text:
      "He eventually transferred to Kent State University, where he was part " +
      "of the basketball team that reached the NCAA Tournament before " +
      "transitioning into broadcasting to call games on ESPN3. He " +
      "ultimately graduated with a journalism degree.",
    images: [{ src: media.meet2, alt: "Tanner Castora" }],
  },
  {
    text:
      "He was soon hired by KELO – the CBS affiliate in Sioux Falls, South " +
      "Dakota – where he became an Emmy-nominated sports reporter and anchor. " +
      "After finishing his two-year contract with KELO, Tanner worked to " +
      "establish himself as an independent/freelance journalist and broadcaster.",
    images: [{ src: media.meet3, alt: "Tanner Castora" }],
  },
  {
    text:
      "Along with hosting a weekly sports radio show and doing play-by-play " +
      "work for several high school and college programs, Tanner dedicated the " +
      "majority of his time to writing the biography of John Stiegelmeier – a " +
      "beloved hall-of-fame college football coach at South Dakota State.",
    images: [{ src: media.meet4, alt: "Tanner Castora" }],
  },
  {
    text:
      "After countless days of research and conducting over 170 interviews, " +
      "Stig and The Rise of South Dakota State Football was released in " +
      "October 2025.",
    images: [
      { src: media.meet5, alt: "Tanner Castora" },
      { src: media.meet6, alt: "Tanner Castora" },
    ],
  },
] as const;

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

// --- AUTHOR (#author): the full author / book section (v2 Wave B) ------------
// Verbatim operator-supplied copy. Images interleave between story paragraphs
// (referenced by media.book.*). The buy button points at the live Amazon Kindle
// listing (operator-confirmed) and opens in a new tab. All copy lives here so
// the JSX stays declarative.
export const author = {
  title: "Stig and the Rise of South Dakota State Football",
  // The Amazon Kindle eBook listing — the v2 buy target (replaces the old
  // paperback link). Opens in a new tab.
  purchaseUrl:
    "https://www.amazon.com/Stig-South-Dakota-State-Football-ebook/dp/B0FVS22L83",
  // Story copy, in order, each paragraph paired with the image(s) that follow it.
  story: [
    {
      text:
        "Shortly after leading South Dakota State Football to their first " +
        "national championship (January 2023), John Stiegelmeier – best known " +
        "as “Coach Stig” – retired after 26 years as head coach.",
      images: [{ src: media.book.pic2, alt: "Coach Stig" }],
    },
    {
      text:
        "While covering SDSU athletics for KELO, Tanner developed a friendship " +
        "with Stig and pitched the idea of a book following his retirement. " +
        "After two years of weekly meetings and dozens of interviews with " +
        "former players and assistants, Tanner released Stig and The Rise of " +
        "South Dakota State Football in October 2025.",
      images: [
        { src: media.book.pic3, alt: "Tanner Castora and Coach Stig" },
        { src: media.book.pic4, alt: "Stig and the Rise of South Dakota State Football" },
      ],
    },
    {
      text:
        "The book chronicles Stig's greatest challenges and triumphs as a " +
        "father, husband, and coach, while revealing behind-the-scenes stories " +
        "of NFL players Tucker Kraft, Dallas Goedert, Mason McCormick, and " +
        "others during SDSU's rise to its first national championship.",
      images: [],
    },
  ],
  // Amazon review pull-quote + rating highlight.
  review: {
    quote:
      "This was one of the best books I have ever read. I had a hard time " +
      "putting it down and was sad when I finished it. I wanted it to be longer.",
    attribution: "Michelle Young (Amazon review)",
    ratings: "Rated 5★ on Amazon and 4.8★ on Goodreads.",
  },
  // Verbatim closing paragraph.
  closing:
    "Fueled by strong online sales, more than a dozen successful book " +
    "signings, and placement in over 60 retail stores, Tanner has sold " +
    "several thousand copies of the book and become one of the best selling " +
    "authors in the Upper Midwest.",
} as const;
