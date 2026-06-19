import {
  Section,
  SectionLabel,
  SectionHeading,
} from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { LoopVideo } from "@/components/site/loop-video";
import { author, media } from "@/lib/site";

/**
 * Author (#author) — v2 Wave B: the full author / book page.
 *
 * Flow: featured time-lapse + first photo → an obvious buy block (book model +
 * "Buy now" → Amazon Kindle) → story copy with images interleaved → a styled
 * review callout + rating highlight → the verbatim closing paragraph → a photo
 * collage. The book-background image sits behind the whole section at low
 * opacity (same "anchoring media" treatment as Home) so copy stays legible.
 *
 * All copy lives in @/lib/site (the `author` object) — never hardcoded here.
 */
export function Book() {
  return (
    <Section id="author" width="wide" className="relative overflow-hidden">
      {/* Subtle, full-section background — book-background.jpg, heavily damped
          and washed with the page background so text/photos read cleanly. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.book.background}
          alt=""
          className="h-full w-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <div className="max-w-2xl">
        <SectionLabel>Author</SectionLabel>
        <SectionHeading>{author.title}</SectionHeading>
      </div>

      {/* Featured: book time-lapse + the first book photo. */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <LoopVideo
          src={media.timelapse.sources}
          poster={media.timelapse.poster}
          aspect="aspect-[4/3]"
          label="Time-lapse of Tanner writing Stig and the Rise of South Dakota State Football"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.book.pic1}
          alt="Stig and the Rise of South Dakota State Football"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-sm"
        />
      </div>

      {/* Buy block — make purchasing obvious. Book Model.png + a prominent CTA. */}
      <div className="mt-14 grid items-center gap-8 rounded-3xl border border-border bg-card/70 p-8 shadow-sm backdrop-blur-sm sm:p-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.book.model}
          alt="Stig and the Rise of South Dakota State Football — available now"
          loading="lazy"
          className="mx-auto w-full max-w-sm object-contain md:mx-0"
        />
        <div>
          <p className="eyebrow mb-3">Available now</p>
          <h3 className="font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            Get the book
          </h3>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
            Read it on Kindle in seconds — or any device with the free Kindle
            app. One tap and it&apos;s yours.
          </p>
          <div className="mt-7">
            <CtaLink
              href={author.purchaseUrl}
              size="lg"
              className="rounded-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy now on Amazon
            </CtaLink>
          </div>
        </div>
      </div>

      {/* Story — copy with images interleaved (verbatim). */}
      <div className="mx-auto mt-16 max-w-3xl">
        {author.story.map((block, i) => (
          <div key={i} className="mt-10 first:mt-0">
            <p className="max-w-prose text-lg leading-relaxed text-foreground/90 text-pretty">
              {block.text}
            </p>
            {block.images.length > 0 && (
              <div
                className={
                  block.images.length > 1
                    ? "mt-6 grid gap-5 sm:grid-cols-2"
                    : "mt-6"
                }
              >
                {block.images.map((img) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review callout + rating highlight. */}
      <figure className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-accent/40 p-8 sm:p-10">
        <span
          aria-hidden
          className="font-display text-5xl leading-none text-brand/30"
        >
          &ldquo;
        </span>
        <blockquote className="-mt-3 font-display text-xl font-medium leading-snug text-foreground text-balance sm:text-2xl">
          {author.review.quote}
        </blockquote>
        <figcaption className="mt-5 text-sm text-muted-foreground">
          — {author.review.attribution}
        </figcaption>
        <p className="mt-6 border-t border-border pt-6 text-base font-medium text-foreground">
          {author.review.ratings}
        </p>
      </figure>

      {/* Verbatim closing paragraph. */}
      <p className="mx-auto mt-14 max-w-3xl text-lg leading-relaxed text-foreground/90 text-pretty">
        {author.closing}
      </p>

      {/* Bottom collage — ordered BookReplacement1 (pic5) → BookPicture6
          (the "waiting in line" photo, kept in the MIDDLE) → BookPicture7. */}
      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.book.pic5}
          alt="Stig and the Rise of South Dakota State Football"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-sm"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.book.pic6}
          alt="Readers waiting in line at a book signing"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-sm"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.book.pic7}
          alt="Tanner Castora with the book"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-sm"
        />
      </div>
    </Section>
  );
}
