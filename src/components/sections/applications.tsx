import Image from "next/image";
import { applications } from "@/content/copy";
import { films } from "@/content/media";
import { SectionHead } from "../section-head";
import { AmbientVideo } from "../video/ambient-video";

export function Applications() {
  return (
    <section id="applications" aria-labelledby="applications-heading" className="section bg-concrete">
      <div className="shell">
        <SectionHead index={applications.index} label={applications.label} aside="ABZ Innovation C10" />

        <div className="grid-12 mt-8 gap-y-6 lg:mt-12">
          <h2 id="applications-heading" className="t-h2 col-span-4 md:col-span-6 lg:col-span-7" data-reveal>
            {applications.heading}
          </h2>
          <p className="t-lede col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal>
            {applications.lede}
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-6" aria-label="What the C10 cleans">
          {applications.items.map((item, i) => (
            <li key={item.id} data-reveal style={{ ["--reveal-offset" as string]: `${i * 6}%` }}>
              <article aria-labelledby={`${item.id}-title`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 90rem) 310px, (min-width: 64rem) 22vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-3 border-t border-ink pt-3">
                  <span className="t-meta t-index text-signal-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h3 id={`${item.id}-title`} className="t-h3">
                    {item.label}
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="grid-12 mt-16 gap-y-5 lg:mt-24">
          <div className="col-span-4 md:col-span-8 lg:col-span-8" data-reveal>
            <AmbientVideo film={films.applicationsMontage} />
          </div>
          <div className="relative col-span-4 md:col-span-4 lg:col-span-4" data-reveal>
            <AmbientVideo
              film={films.applicationsCladding}
              className="lg:absolute lg:inset-0"
              frameClass="aspect-[4/5] lg:aspect-auto lg:min-h-0 lg:flex-1"
              focus="50% 18%"
            />
          </div>
          <div className="col-span-4 border-t border-ink pt-4 md:col-span-4 md:self-start lg:col-span-8 lg:mt-5" data-reveal>
            <p className="t-label">{applications.versatility.lead}</p>
            <ul className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-6">
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
