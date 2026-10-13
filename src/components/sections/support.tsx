import Image from "next/image";
import { support } from "@/content/copy";
import { films, photos } from "@/content/media";
import { SectionIntro } from "../section-intro";
import { SupportSelector } from "../support-selector";
import { WatchVideo } from "../video/watch-video";

/**
 * Full service support. The shared image is the team's own field demonstration; it is not
 * swapped per service, because the pack has no photograph of a workshop, a training session or a
 * warranty service. The supplied support films sit together directly under the copy.
 */
export function Support() {
  const photo = photos.demonstration;
  return (
    <section id="support" aria-labelledby="support-heading" className="section bg-paper">
      <div className="shell">
        <SectionIntro id="support-heading" heading={support.heading} />

        <div className="mt-[var(--intro-gap)]">
          <SupportSelector
            services={support.services}
            paragraphs={support.paragraphs}
            supplyHeading={support.supplyHeading}
            media={
              <div className="media-frame aspect-[16/9]" data-reveal>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 80rem) 852px, (min-width: 64rem) 66vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 38%" }}
                />
              </div>
            }
          />
        </div>

        <div className="clips mt-10 lg:mt-12">
          <WatchVideo film={films.cleaningVan} sizes="(min-width: 80rem) 411px, (min-width: 48rem) 32vw, 100vw" />
          <WatchVideo film={films.academy} sizes="(min-width: 80rem) 411px, (min-width: 48rem) 32vw, 100vw" />
          <WatchVideo film={films.cleanStation} sizes="(min-width: 80rem) 411px, (min-width: 48rem) 32vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
