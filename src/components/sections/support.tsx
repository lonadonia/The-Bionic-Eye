import Image from "next/image";
import { support } from "@/content/copy";
import { filmLength, films, photos } from "@/content/media";
import { ui } from "@/content/ui";
import { DotField, IrisRings } from "../decor";
import { SectionIntro } from "../section-intro";
import { SupportSelector, type SupportMedia } from "../support-selector";
import { WatchVideo } from "../video/watch-video";

const sizes = "(min-width: 80rem) 740px, (min-width: 64rem) 58vw, 100vw";

/**
 * Real media for the service areas. Sales shows the C10 itself; Training plays the supplied
 * C10 Academy film; the other areas keep the team's own field demonstration, because the pack has
 * no photograph of a workshop, an authorisation process or a warranty service.
 */
const media: SupportMedia[] = [
  {
    id: "ready",
    frame: (
      <div className="media-frame support__frame">
        <Image src={photos.ready.src} alt={photos.ready.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: "50% 52%" }} />
      </div>
    ),
  },
  {
    id: "field",
    frame: (
      <div className="media-frame support__frame">
        <Image src={photos.demonstration.src} alt={photos.demonstration.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: "50% 40%" }} />
      </div>
    ),
  },
  {
    id: "academy",
    frame: <WatchVideo film={films.academy} frameClass="support__frame" caption={false} sizes={sizes} />,
    caption: (
      <>
        <span className="media-caption__title">{films.academy.title}</span>
        <span className="media-caption__meta">
          {filmLength(films.academy)}, {ui.film.withSound}
        </span>
      </>
    ),
  },
];

const mediaFor: Record<string, string> = {
  sales: "ready",
  "oa-support": "field",
  training: "academy",
  servicing: "field",
  warranty: "field",
};

/**
 * Full service support: service selection and the supplied paragraphs at left, a large media
 * surface at right with a cyan structural edge, and the technician/van film as a substantial
 * viewer below. The five announced areas select the intact paragraph that covers them.
 */
export function Support() {
  return (
    <section id="support" aria-labelledby="support-heading" className="section support">
      <div className="support__plane" aria-hidden="true" />
      <IrisRings className="support__iris" />
      <DotField className="support__dots" />
      <div className="shell">
        <SectionIntro id="support-heading" heading={support.heading} />
        <div className="mt-[var(--intro-gap)]">
          <SupportSelector
            services={support.services}
            paragraphs={support.paragraphs}
            supplyHeading={support.supplyHeading}
            media={media}
            mediaFor={mediaFor}
          />
        </div>

        <div className="support__van">
          <WatchVideo
            film={films.cleaningVan}
            className="support__van-film"
            caption={false}
            sizes="(min-width: 80rem) 840px, (min-width: 64rem) 66vw, 100vw"
          />
          <div className="support__van-text">
            <p className="media-caption__title">{films.cleaningVan.title}</p>
            <p className="media-caption__meta">
              {filmLength(films.cleaningVan)}, {ui.film.withSound}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
