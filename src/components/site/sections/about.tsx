import {
  Section,
  SectionLabel,
  SectionHeading,
} from "@/components/site/section";
import { meetFeature, meetBlocks } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Meet Tanner (#meet) — the editorial bio (v2 rebuild of the old About).
 *
 * A feature portrait opens the section, then the bio runs as alternating
 * text/image blocks (reference: bennemtin.com/about). Copy is verbatim
 * operator-supplied; images interleave at the marked spots. The final block
 * carries two images, laid out as a pair. All content lives in @/lib/site.
 */
export function Meet() {
  return (
    <Section id="meet" width="wide">
      <SectionLabel>Meet Tanner</SectionLabel>
      <SectionHeading className="max-w-3xl">
        From a Division I court to the anchor desk — and onto the page.
      </SectionHeading>

      {/* Feature portrait */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={meetFeature}
        alt="Tanner Castora"
        loading="lazy"
        className="rise mt-10 aspect-[16/10] w-full rounded-2xl border border-border object-cover object-top sm:mt-12"
      />

      {/* Interleaved bio blocks — alternating text / image columns */}
      <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
        {meetBlocks.map((block, i) => {
          const reversed = i % 2 === 1;
          const isPair = block.images.length > 1;
          return (
            <div
              key={i}
              className={cn(
                "grid items-center gap-8 md:gap-14",
                // A single image → 2-up text/image; a pair → text over a wider
                // image row so both photos breathe.
                isPair
                  ? "md:grid-cols-1"
                  : "md:grid-cols-2",
              )}
            >
              <p
                className={cn(
                  "rise text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl",
                  reversed && !isPair && "md:order-2",
                )}
              >
                {block.text}
              </p>

              <div
                className={cn(
                  "rise",
                  isPair && "grid grid-cols-1 gap-6 sm:grid-cols-2",
                  reversed && !isPair && "md:order-1",
                )}
              >
                {block.images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
