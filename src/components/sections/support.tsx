import Image from "next/image";
import { site, support } from "@/content/copy";
import { films, photos } from "@/content/media";
import { ArrowRight } from "../icons";
import { ServiceLink } from "../service-link";
import { WatchVideo } from "../video/watch-video";

export function Support() {
  const supportFilms = [films.academy, films.cleanStation, films.cleaningVan];

  return (
    <section id="full-service-support" aria-labelledby="support-heading" className="section bg-concrete">
      <div className="shell">
        <div className="section-head">
          <h2 id="support-heading" className="t-label flex items-baseline gap-3">
            <span className="section-head__index t-index">{support.index}</span>
            <span>{support.heading}</span>
          </h2>
          <p className="t-label muted hidden text-right sm:block">{site.company}</p>
        </div>

        <div className="grid-12 mt-6 gap-y-10 lg:mt-10">
          <ol className="col-span-4 md:col-span-8 lg:col-span-7" aria-label={support.heading}>
            {support.services.map((s, i) => (
              <li key={s.id} className="border-b border-ink/25" data-reveal style={{ ["--reveal-offset" as string]: `${i * 6}%` }}>
                <ServiceLink
                  serviceId={s.id}
                  className="group flex flex-wrap items-baseline gap-x-4 gap-y-2 py-5 transition-colors hover:text-signal-deep lg:py-6"
                >
                  <span className="t-meta t-index w-7 shrink-0 text-signal-deep">{s.index}</span>
                  <span className="min-w-0 flex-1 text-[clamp(1.625rem,1.15rem+1.7vw,2.5rem)] leading-[1.04] font-semibold tracking-[-0.026em] [font-stretch:108%]">
                    {s.title}
                    <span className="sr-only"> — enquire</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 self-center text-ink transition-transform duration-300 ease-[var(--ease-precise)] group-hover:translate-x-1 group-hover:text-signal-deep"
                  >
                    <ArrowRight size={22} />
                  </span>
                  {s.note ? (
                    <span className="basis-full pl-11">
                      <span className="t-body muted block max-w-[34rem]">{s.note}</span>
                    </span>
                  ) : null}
                </ServiceLink>
              </li>
            ))}
          </ol>

          <figure className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pt-5" data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              <Image
                src={photos.demonstration.src}
                alt={photos.demonstration.alt}
                fill
                sizes="(min-width: 90rem) 530px, (min-width: 64rem) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {supportFilms.map((film) => (
            <div key={film.id} data-reveal>
              <WatchVideo film={film} sizes="(min-width: 90rem) 420px, (min-width: 64rem) 30vw, (min-width: 48rem) 46vw, 100vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
