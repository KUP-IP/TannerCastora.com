import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Home as HomeSection } from "@/components/site/sections/hero";
import { Meet } from "@/components/site/sections/about";
import { Recognition } from "@/components/site/sections/recognition";
import { Broadcasting } from "@/components/site/sections/broadcasting";
import { Resume } from "@/components/site/sections/resume";
import { Book } from "@/components/site/sections/book";
import { Contact } from "@/components/site/sections/contact";

/**
 * Home page — the person-first, single-page flow (v2 restructure).
 *
 * Nav-anchored sections: Home (#home) · Meet Tanner (#meet) · Author (#author)
 * · Broadcasting Reel (#reel) · Resume (#resume). Recognition + Contact are
 * kept in the page and reachable by scroll / the contact CTA.
 *
 * Final v2 order (Wave B): home → meet → recognition → author (Book, #author,
 * the full author/book page) → reel (Broadcasting, #reel, self-host + 2 YT) →
 * resume → contact.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HomeSection />
        <Meet />
        <Recognition />
        <Book />
        <Broadcasting />
        <Resume />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
