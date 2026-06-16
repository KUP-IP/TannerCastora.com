import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/sections/hero";
import { About } from "@/components/site/sections/about";
import { Recognition } from "@/components/site/sections/recognition";
import { Broadcasting } from "@/components/site/sections/broadcasting";
import { Resume } from "@/components/site/sections/resume";
import { Book } from "@/components/site/sections/book";
import { Contact } from "@/components/site/sections/contact";

/**
 * Home — the person-first section flow (TCX.1 shell).
 * Order is binding: hero → about → recognition → broadcasting → resume → book → contact.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Recognition />
        <Broadcasting />
        <Resume />
        <Book />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
