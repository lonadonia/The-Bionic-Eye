import { cta, hero } from "@/content/copy";
import { films } from "@/content/media";
import { HeroFilm } from "../video/hero-background";

/**
 * Hero. One copy of the content in reading order: headline → film → introduction → action.
 * Phones stack it in that order; from 1024px the film becomes the full-bleed background and the
 * copy sits in a 600px reading zone on the left, leaving the drone and its jet clear on the right.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero">
      <div className="shell hero__grid">
        <h1 id="hero-heading" className="t-h1 hero__title hero-in" style={{ ["--i" as string]: 0 }}>
          {hero.heading}
        </h1>
        <HeroFilm film={films.hero} />
        <div className="hero__intro t-body hero-in" style={{ ["--i" as string]: 1 }}>
          {hero.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="hero__actions hero-in" style={{ ["--i" as string]: 3 }}>
          <a href={cta.demonstration.href} className="btn btn-primary">
            {cta.demonstration.label}
          </a>
        </div>
      </div>
    </section>
  );
}
