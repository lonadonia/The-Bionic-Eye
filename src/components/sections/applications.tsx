import Image from "next/image";
import { applications } from "@/content/copy";
import { films } from "@/content/media";
import { SectionHead } from "../section-head";
import { AmbientVideo } from "../video/ambient-video";

/**
 * Gallery layout per application, in the film's own order. Wide (≈8:7) and tall (4:5) crops alternate
 * in a 7/5 · 5/7 checkerboard on desktop (the wide frame fills the row the 4:5 frame sets, so caption
 * rules line up exactly); phones get a wide · two-up · wide rhythm. Focal points keep
 * the C10 and its spray inside every crop. Reveals differ by position (wipe vs. rise).
 */
const tiles: Record<string, { item: string; frame: string; focus: string; reveal: string; delay: number; sizes: string }> = {
  "solar-panel-cleaning": {
    item: "col-span-2 lg:col-span-7",
    frame: "aspect-[4/3] lg:aspect-auto lg:flex-1",
    focus: "50% 38%",
    reveal: "mask-left",
    delay: 0,
    sizes: "(min-width: 90rem) 760px, (min-width: 64rem) 56vw, 100vw",
  },
  "facade-cleaning": {
    item: "col-span-1 lg:col-span-5",
    frame: "aspect-[4/5]",
    focus: "60% 40%",
    reveal: "mask",
    delay: 140,
    sizes: "(min-width: 90rem) 540px, (min-width: 64rem) 40vw, 50vw",
  },
  "roof-moss-removal": {
    item: "col-span-1 lg:col-span-5",
    frame: "aspect-[4/5]",
    focus: "50% 45%",
    reveal: "mask",
    delay: 0,
    sizes: "(min-width: 90rem) 540px, (min-width: 64rem) 40vw, 50vw",
  },
  "gutter-cleaning": {
    item: "col-span-2 lg:col-span-7",
    frame: "aspect-[4/3] lg:aspect-auto lg:flex-1",
    focus: "55% 36%",
    reveal: "mask-left",
    delay: 140,
    sizes: "(min-width: 90rem) 760px, (min-width: 64rem) 56vw, 100vw",
  },
};

export function Applications() {
  return (
    <section id="applications" aria-labelledby="applications-heading" className="chapter bg-paper">
      <div className="shell">
        <SectionHead index={applications.index} label={applications.label} aside="ABZ Innovation C10" />

        <div className="grid-12 mt-10 gap-y-5 lg:mt-14">
          <h2 id="applications-heading" className="t-h2 col-span-4 md:col-span-6 lg:col-span-6" data-reveal>
            {applications.heading}
          </h2>
          <p
            className="t-lede muted col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            {applications.lede}
          </p>
        </div>

        <ul
          className="mt-12 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:mt-16 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14"
          aria-label="What the C10 cleans"
        >
          {applications.items.map((item) => {
            const t = tiles[item.id];
            return (
              <li key={item.id} className={`${t.item} lg:flex`}>
                <figure className="m-0 flex w-full flex-col">
                  <div
                    className={`media-frame zoom-on-hover ${t.frame}`}
                    data-reveal={t.reveal}
                    style={{ ["--reveal-delay" as string]: `${t.delay}ms` }}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes={t.sizes}
                      className="object-cover"
                      style={{ objectPosition: t.focus }}
                    />
                  </div>
                  <figcaption
                    className="mt-3.5 flex items-baseline gap-3 border-t border-ink/70 pt-3 lg:mt-4"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${t.delay + 160}ms` }}
                  >
                    <h3 className="t-h4 lg:text-[1.25rem]">{item.label}</h3>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <div className="grid-12 mt-16 gap-y-10 lg:mt-24 lg:gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-8" data-reveal>
            <AmbientVideo film={films.applicationsMontage} sizes="(min-width: 90rem) 866px, (min-width: 64rem) 62vw, 100vw" />
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-4" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <AmbientVideo
              film={films.applicationsCladding}
              className="lg:h-full"
              frameClass="media-frame--fill aspect-[4/5] lg:aspect-auto lg:flex-1"
              focus="50% 22%"
              sizes="(min-width: 90rem) 422px, (min-width: 64rem) 30vw, (min-width: 48rem) 50vw, 100vw"
            />
          </div>
          <div className="col-span-4 md:col-span-4 md:self-center lg:col-span-8 lg:self-start" data-reveal>
            <h3 className="t-h4">{applications.versatility.lead}</h3>
            <ul className="mt-4 grid gap-4 border-t border-line pt-5 lg:grid-cols-2 lg:gap-8">
              {applications.versatility.points.map((p) => (
                <li key={p} className="t-body flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-signal" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
