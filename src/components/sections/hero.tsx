import { cta, hero, site } from "@/content/copy";
import { films } from "@/content/media";
import { ArrowRight } from "../icons";
import { HeroBackground } from "../video/hero-background";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading">
      <div className="hero on-ink">
        <HeroBackground film={films.hero} />

        <div className="hero__content shell">
          <div className="section-head">
            <p className="t-label flex items-baseline gap-3">
              <span className="section-head__index t-index">{hero.index}</span>
              <span>{site.pageName}</span>
            </p>
            <p className="t-label hidden text-right text-paper/80 sm:block">{site.dealerLine}</p>
          </div>

          <div className="mt-auto grid-12 pt-16">
            <div className="col-span-4 md:col-span-7 lg:col-span-8">
              <p className="t-label flex items-center gap-2.5">
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-signal-bright" />
                {hero.kicker}
              </p>
              <h1 id="hero-heading" className="t-display mt-5">
                {hero.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="t-lede mt-6 max-w-[36rem] text-paper/90">{hero.intro}</p>
              <div className="mt-8">
                <a href={cta.href} className="btn btn-primary w-full sm:w-auto">
                  {cta.label}
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <ul className="grid border-b border-line sm:grid-cols-3" aria-label="Meet the ABZ Innovation C10">
          {hero.triad.map((line, i) => (
            <li
              key={line}
              data-reveal
              style={{ ["--reveal-offset" as string]: `${i * 6}%` }}
              className={`border-line py-5 sm:py-8 ${i > 0 ? "border-t sm:border-t-0 sm:border-l sm:pl-6 lg:pl-8" : ""} ${
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
