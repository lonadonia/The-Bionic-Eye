import { applications, cta, hero, site } from "@/content/copy";
import { films } from "@/content/media";
import { ArrowRight } from "../icons";
import { HeroFilm } from "../video/hero-film";

export function Hero() {
  const chapters = applications.items.map((a) => ({ id: a.id, label: a.label, time: a.chapter }));

  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-6 pb-16 lg:pt-10 lg:pb-24">
      <div className="shell">
        <div className="section-head">
          <p className="t-label flex items-baseline gap-3">
            <span className="section-head__index t-index">{hero.index}</span>
            <span>{site.pageName}</span>
          </p>
          <p className="t-label muted hidden text-right sm:block">{site.dealerLine}</p>
        </div>

        <div className="grid-12 mt-8 items-end gap-y-8 lg:mt-12">
          <h1 id="hero-heading" className="t-display col-span-4 md:col-span-8 lg:col-span-12 xl:col-span-8">
            {hero.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="col-span-4 md:col-span-6 lg:col-span-7 xl:col-span-4 xl:pb-1.5">
            <p className="t-label flex items-center gap-2.5">
              <span aria-hidden="true" className="inline-block h-2 w-2 bg-signal" />
              {hero.kicker}
            </p>
            <p className="t-lede mt-4 max-w-[36rem]">{hero.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={cta.href} className="btn btn-primary w-full sm:w-auto">
                {cta.label}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <HeroFilm film={films.hero} chapters={chapters} />
        </div>

        <ul
          className="mt-14 grid border-t border-ink sm:grid-cols-3 lg:mt-20"
          aria-label="Meet the ABZ Innovation C10"
        >
          {hero.triad.map((line, i) => (
            <li
              key={line}
              data-reveal
              style={{ ["--reveal-offset" as string]: `${i * 6}%` }}
              className={`border-b border-line py-5 sm:border-b-0 sm:py-7 ${i > 0 ? "sm:border-l sm:pl-6 lg:pl-8" : ""} ${
                i < 2 ? "sm:pr-6" : ""
              }`}
            >
              <span className="t-meta t-index text-signal-deep">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-[clamp(1.5rem,1.05rem+1.6vw,2.5rem)] leading-[1.02] font-semibold tracking-[-0.025em] [font-stretch:110%]">
                {line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
