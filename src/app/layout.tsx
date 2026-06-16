import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_URL, site } from "@/lib/site";

/**
 * Typography (TCX.2 design system):
 *   - Display: Fraunces — a characterful "old-style" serif with optical sizing,
 *     carrying on-air editorial gravitas + warmth on headings.
 *   - Body: Geist Sans — a clean, trustworthy grotesque for legible reading.
 *   - Mono: Geist Mono — incidental UI / labels.
 * All loaded with `display: "swap"` so the hero never blocks on a webfont.
 */
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

/**
 * SEO + share scaffolding (TCX.1 DoD; media landed in TCX.4).
 * Person-first title, meta description, Open Graph + Twitter card, favicon.
 * The OG image at /public/og.png is now Tanner's real headshot (1200×630) — the
 * link preview when the site is texted or emailed. Favicon/app icons are
 * auto-wired from src/app/{favicon.ico,icon.png,apple-icon.png}.
 * metadataBase uses the confirmed canonical domain (TannerCastora.com, with the
 * "a") but DNS is held pending cutover — preview deploys still resolve fine.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: "%s — Tanner Castora",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "Tanner Castora",
    "sportscaster",
    "broadcast journalist",
    "play-by-play",
    "sports anchor",
    "Cleveland",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og.png", // Tanner's headshot, 1200×630 (TCX.4)
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  // Icons (favicon.ico + icon.png + apple-icon.png) are auto-wired by the
  // App Router file convention from src/app/* (TCX.4 dropped Tanner's headshot
  // crops there), so no explicit `icons` block is needed — and an explicit one
  // would suppress the modern PNG + apple-touch variants.
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
