import { cta, hero } from "@/content/copy";
import { films } from "@/content/media";
import { BrandMark } from "../brand-mark";
import { HeroWave } from "../decor";
import { HeroFilm } from "../video/hero-background";

/**
 * Hero. One copy of the content in reading order: headline → film → introduction → action.
 * Phones stack it in that order on one dark surface. From 1024px the film becomes the full-bleed
 * environment: the copy sits in a protected reading zone at left, the drone and its jet stay clear
 * at right. Identity details frame it: the supplied eye symbol as a large watermark fading out
 * behind the reading zone, a fine frame boundary, the section rule with its lens ring above the
 * headline, and a curved wing edge whose cyan line draws itself once as the page opens.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero">
      <BrandMark className="hero__mark" />
      <div className="hero__frame" aria-hidden="true" />
      <div className="shell hero__grid">
        <span className="accent-rule hero__rule hero-in" aria-hidden="true" style={{ ["--i" as string]: 0 }} />
        <h1 id="hero-heading" className="t-h1 hero__title hero-in" style={{ ["--i" as string]: 0 }}>
          {hero.heading}
        </h1>
        <HeroFilm film={films.hero} full={films.heroFull} />
        <div className="hero__intro t-body hero-in" style={{ ["--i" as string]: 1 }}>
          {hero.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="hero__actions hero-in" style={{ ["--i" as string]: 3 }}>
          <a href={cta.demonstration.href} className="btn btn-primary btn-lg">
            {cta.demonstration.label}
          </a>
        </div>
      </div>
      <HeroWave />
    </section>
  );
}
