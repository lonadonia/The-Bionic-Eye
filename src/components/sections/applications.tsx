import Image from "next/image";
import { applications, type ApplicationItem } from "@/content/copy";
import { films, photos } from "@/content/media";
import { DotField, IrisRings } from "../decor";
import { SectionIntro } from "../section-intro";
import { AmbientFilm } from "../video/ambient-film";

/**
 * Applications. One list in the supplied order, set as a balanced grid that stays inside the
 * page frame: row one pairs the facade photograph (7 columns) with the solar array (5), row two
 * pairs the industrial cladding film (6) with a text-led panel (6) of equal height. Only those
 * three entries have credible supplied imagery; the other four share the panel, because no
 * photograph in the pack shows wind turbine towers, heritage work, graffiti removal or surface
 * coating, and a nearby image must not be relabelled as evidence for them. Captions of the pictured
 * entries sit on white cards that overlap the picture edge (all seven entries share the lens
 * marker). A dark film band with three films at one shared height closes the section. Every film
 * plays in place as a short silent loop.
 */
const visual: Record<string, "facades" | "solar" | "industrial"> = {
  facades: "facades",
  solar: "solar",
  industrial: "industrial",
};
const still = { facades: photos.facade, solar: photos.solar };

function Caption({ item }: { item: ApplicationItem }) {
  if (!item.qualifier) return <p className="app__caption">{item.text}</p>;
  const main = item.text.slice(0, item.text.length - item.qualifier.length);
  return (
    <p className="app__caption">
      {main}
      <span className="app__qualifier">{item.qualifier}</span>
    </p>
  );
}

export function Applications() {
  const textItems = applications.items.filter((i) => !visual[i.id]);
  return (
    <section id="applications" aria-labelledby="applications-heading" className="section apps">
      <IrisRings className="apps__iris" />
      <DotField className="apps__dots" />
      <div className="shell apps__shell">
        <div className="apps__head">
          <SectionIntro id="applications-heading" heading={applications.heading} />
          <span className="apps__head-line" aria-hidden="true" />
        </div>

        <ul className="apps__grid" aria-labelledby="applications-heading">
          {applications.items.map((item) => {
            const kind = visual[item.id];
            if (!kind) {
              const first = textItems[0].id === item.id;
              const last = textItems[textItems.length - 1].id === item.id;
              return (
                <li key={item.id} className={`app app--text app--${item.id} ${first ? "app--text-first" : ""} ${last ? "app--text-last" : ""}`}>
                  <span className="app__marker" aria-hidden="true" />
                  <Caption item={item} />
                </li>
              );
            }
            return (
              <li key={item.id} className={`app app--media app--${item.id}`} data-motion="stagger">
                {kind === "industrial" ? (
                  <AmbientFilm
                    film={films.fieldCladding}
                    className="app__media"
                    frameClass="app__frame"
                    focus="60% 40%"
                    caption={false}
                    full={false}
                    sizes="(min-width: 80rem) 630px, (min-width: 64rem) 48vw, 100vw"
                  />
                ) : (
                  <div className="app__media">
                    <div className="media-frame app__frame">
                      <Image
                        src={still[kind].src}
                        alt={still[kind].alt}
                        fill
                        sizes={
                          kind === "facades"
                            ? "(min-width: 80rem) 740px, (min-width: 64rem) 58vw, 100vw"
                            : "(min-width: 80rem) 520px, (min-width: 64rem) 40vw, (min-width: 48rem) 50vw, 100vw"
                        }
                        className="object-cover"
                        style={{ objectPosition: kind === "facades" ? "62% 42%" : "50% 40%" }}
                      />
                    </div>
                  </div>
                )}
                <div className="app__card">
                  <span className="app__marker" aria-hidden="true" />
                  <Caption item={item} />
                </div>
              </li>
            );
          })}
        </ul>

        {/* Supporting application films on a dark band: one shared height, widths 5 / 4 / 3 columns. */}
        <div className="film-band on-deep">
          <DotField className="film-band__dots" />
          <div className="film-strip">
            <div className="film-strip__item film-strip__item--wide" data-motion="stagger">
              <AmbientFilm film={films.montage} frameClass="film-strip__frame" sizes="(min-width: 80rem) 520px, (min-width: 48rem) 42vw, 100vw" />
            </div>
            <div className="film-strip__item film-strip__item--mid" data-motion="stagger">
              <AmbientFilm film={films.systemIntroduction} frameClass="film-strip__frame" sizes="(min-width: 80rem) 410px, (min-width: 48rem) 33vw, 100vw" />
            </div>
            <div className="film-strip__item film-strip__item--narrow" data-motion="stagger">
              <AmbientFilm
                film={films.claddingPortrait}
                frameClass="film-strip__frame"
                focus="50% 8%"
                sizes="(min-width: 80rem) 300px, (min-width: 48rem) 25vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
