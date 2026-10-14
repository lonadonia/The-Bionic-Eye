import Image from "next/image";
import { applications, type ApplicationItem } from "@/content/copy";
import { films, photos } from "@/content/media";
import { SectionIntro } from "../section-intro";
import { WatchVideo } from "../video/watch-video";

/**
 * Applications gallery. One list in the supplied order, placed as an editorial 7/5 then 5/7 grid:
 * a featured facade frame that runs out to the page edge, the solar array still, and a playable
 * field clip of industrial cladding. Only those three entries have credible supplied imagery; the
 * other four share a text-led panel, because no photograph in the pack shows wind turbine towers,
 * heritage work, graffiti removal or surface coating, and a nearby image must not be relabelled
 * as evidence for them. The remaining application films follow as a strip of real viewers.
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
      <div className="shell">
        <SectionIntro id="applications-heading" heading={applications.heading} />

        <ul className="apps__grid" aria-labelledby="applications-heading">
          {applications.items.map((item) => {
            const kind = visual[item.id];
            if (!kind) {
              const first = textItems[0].id === item.id;
              const last = textItems[textItems.length - 1].id === item.id;
              return (
                <li key={item.id} className={`app app--text app--${item.id} ${first ? "app--text-first" : ""} ${last ? "app--text-last" : ""}`}>
                  <Caption item={item} />
                </li>
              );
            }
            return (
              <li key={item.id} className={`app app--media app--${item.id}`} data-motion="stagger">
                {kind === "industrial" ? (
                  <WatchVideo
                    film={films.fieldCladding}
                    className="app__media"
                    frameClass="app__frame"
                    focus="60% 40%"
                    caption={false}
                    sizes="(min-width: 80rem) 520px, (min-width: 64rem) 40vw, 100vw"
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
                            ? "(min-width: 80rem) 820px, (min-width: 64rem) 62vw, 100vw"
                            : "(min-width: 80rem) 520px, (min-width: 64rem) 40vw, (min-width: 48rem) 50vw, 100vw"
                        }
                        className="object-cover"
                        style={{ objectPosition: kind === "facades" ? "56% 40%" : "50% 40%" }}
                      />
                    </div>
                  </div>
                )}
                <Caption item={item} />
              </li>
            );
          })}
        </ul>

        {/* Supporting application films: one shared frame height across landscape and portrait. */}
        <div className="film-strip">
          <div className="film-strip__item film-strip__item--landscape" data-motion="stagger">
            <WatchVideo film={films.montage} focus="40% 50%" sizes="(min-width: 80rem) 500px, (min-width: 48rem) 40vw, 100vw" />
          </div>
          <div className="film-strip__item film-strip__item--landscape" data-motion="stagger">
            <WatchVideo film={films.systemIntroduction} sizes="(min-width: 80rem) 500px, (min-width: 48rem) 40vw, 100vw" />
          </div>
          <div className="film-strip__item film-strip__item--portrait" data-motion="stagger">
            <WatchVideo
              film={films.claddingPortrait}
              frameClass="aspect-[4/5] md:aspect-[9/16]"
              focus="50% 26%"
              sizes="(min-width: 80rem) 170px, (min-width: 48rem) 14vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
