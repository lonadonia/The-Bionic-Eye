import { cta, hero } from "@/content/copy";
import { films } from "@/content/media";
import { ui } from "@/content/ui";
import { ArrowDown } from "../icons";
import { HeroFilm } from "../video/hero-background";

/** Section 01 — the C10 Use Case film is the visual; copy sits bottom-left and leaves the drone clear. */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero">
      <HeroFilm
        film={films.hero}
        rail={
          <ul className="hero__benefits" aria-label={hero.kicker}>
            {hero.triad.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        }
      >
        <div className="hero__copy">
          <p className="hero__kicker hero-in" style={{ ["--i" as string]: 0 }}>
            {hero.kicker}
          </p>
          <h1 id="hero-heading" className="t-display hero__title">
            {hero.heading.map((line, i) => (
              <span key={line} className="hero-in" style={{ ["--i" as string]: i + 1 }}>
                {line}
              </span>
            ))}
          </h1>
          <p className="t-lede hero__intro hero-in" style={{ ["--i" as string]: 3 }}>
            {hero.intro}
          </p>
          <div className="hero__actions hero-in" style={{ ["--i" as string]: 4 }}>
            <a href={cta.href} className="btn btn-primary btn-lg w-full sm:w-auto">
              {cta.label}
            </a>
            <a href={ui.hero.secondary.href} className="btn btn-text">
              <span>{ui.hero.secondary.label}</span>
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </HeroFilm>
    </section>
  );
}
