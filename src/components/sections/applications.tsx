import Image from "next/image";
import { applications, type ApplicationItem } from "@/content/copy";
import { films, photos } from "@/content/media";
import { SectionIntro } from "../section-intro";
import { WatchVideo } from "../video/watch-video";

/**
 * Which entries have credible supplied imagery. Only three do; the other four are text-led,
 * because no photograph in the pack shows wind turbine towers, heritage work, graffiti removal or
 * surface coating, and a nearby image must not be relabelled as evidence for them.
 */
const visual: Record<string, { kind: "photo"; photo: (typeof photos)[keyof typeof photos]; focus: string; sizes: string } | { kind: "film" }> = {
  facades: { kind: "photo", photo: photos.facade, focus: "46% 50%", sizes: "(min-width: 80rem) 737px, (min-width: 64rem) 57vw, (min-width: 48rem) 50vw, 100vw" },
  solar: { kind: "photo", photo: photos.solar, focus: "50% 40%", sizes: "(min-width: 80rem) 520px, (min-width: 64rem) 40vw, (min-width: 48rem) 50vw, 100vw" },
  industrial: { kind: "film" },
};

function Caption({ item }: { item: ApplicationItem }) {
  if (!item.qualifier) return <p className="tile__caption">{item.text}</p>;
  const main = item.text.slice(0, item.text.length - item.qualifier.length);
  return (
    <p className="tile__caption">
      {main}
      <span className="tile__qualifier">{item.qualifier}</span>
    </p>
  );
}

export function Applications() {
  const textItems = applications.items.filter((i) => !visual[i.id]);
  return (
    <section id="applications" aria-labelledby="applications-heading" className="section bg-paper">
      <div className="shell">
        <SectionIntro id="applications-heading" heading={applications.heading} />

        <div className="gallery-wrap mt-[var(--intro-gap)]">
          {/* One list in the supplied order; the grid places it as 7/5 then 5/7. */}
          <ul className="gallery" aria-labelledby="applications-heading">
            {applications.items.map((item) => {
              const v = visual[item.id];
              if (!v) {
                const first = textItems[0].id === item.id;
                const last = textItems[textItems.length - 1].id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`tile tile--text tile--${item.id} ${first ? "tile--text-first" : ""} ${last ? "tile--text-last" : ""}`}
                  >
                    <Caption item={item} />
                  </li>
                );
              }
              return (
                <li key={item.id} className={`tile tile--image tile--${item.id}`} data-reveal>
                  {v.kind === "photo" ? (
                    <div className="tile__media">
                      <div className="media-frame tile__frame">
                        <Image
                          src={v.photo.src}
                          alt={v.photo.alt}
                          fill
                          sizes={v.sizes}
                          className="object-cover"
                          style={{ objectPosition: v.focus }}
                        />
                      </div>
                    </div>
                  ) : (
                    <WatchVideo
                      film={films.fieldCladding}
                      className="tile__media"
                      frameClass="tile__frame"
                      focus="60% 40%"
                      caption={false}
                      sizes="(min-width: 80rem) 520px, (min-width: 64rem) 40vw, 100vw"
                    />
                  )}
                  <Caption item={item} />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Supporting footage: frames share one height, so the portrait clip sits level with the montage. */}
        <div className="footage mt-14 lg:mt-20">
          <div className="footage__item--landscape" data-reveal>
            <WatchVideo film={films.montage} sizes="(min-width: 80rem) 954px, (min-width: 48rem) 74vw, 100vw" />
          </div>
          <div className="footage__item--portrait" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            <WatchVideo film={films.claddingPortrait} frameClass="aspect-[4/5] md:aspect-[9/16]" focus="50% 26%" sizes="(min-width: 80rem) 302px, (min-width: 48rem) 24vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
