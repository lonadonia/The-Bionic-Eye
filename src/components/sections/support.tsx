import { site, support } from "@/content/copy";
import { films, formatTime, photos } from "@/content/media";
import { ui } from "@/content/ui";
import { SectionHead } from "../section-head";
import { ServiceExplorer, type ServiceView } from "../service-explorer";
import { WatchVideo } from "../video/watch-video";

/**
 * Each service is paired with the client's own evidence where it exists: the UK field demonstration
 * (Sales — where a demonstration leads), C10 Academy (Training) and the ABZ Clean Station guide
 * (Servicing). Services with no supplied copy or media get a typographic plate and a pending flag.
 */
const media: Record<string, ServiceView["media"]> = {
  sales: { kind: "photo", src: photos.demonstration.src, alt: photos.demonstration.alt },
  "operational-authorisation-support": { kind: "plate" },
  training: { kind: "film", film: films.academy },
  servicing: { kind: "film", film: films.cleanStation },
  "enhanced-warranty-option": { kind: "plate" },
};

const services: ServiceView[] = support.services.map((s) => ({
  id: s.id,
  title: s.title,
  note: s.note,
  media: media[s.id],
  ...(s.id === "operational-authorisation-support"
    ? { related: { label: ui.support.related, href: "#operating-legally" } }
    : {}),
}));

/** Section 04 — reassurance: five services, each with its evidence, then The Bionic Eye's own film. */
export function Support() {
  const van = films.cleaningVan;
  return (
    <section id="full-service-support" aria-labelledby="support-heading" className="chapter bg-mist">
      <div className="shell">
        <SectionHead index={support.index} aside={site.company} />

        <div className="mt-10 lg:mt-14">
          <ServiceExplorer services={services} heading={support.heading} headingId="support-heading" />
        </div>

        <div className="grid-12 mt-20 gap-y-6 border-t border-line pt-10 lg:mt-28 lg:pt-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4" data-reveal>
            <p className="t-label text-signal-ink">{ui.support.filmsHeading}</p>
            <h3 className="t-h3 mt-3">{van.title}</h3>
            <p className="t-meta muted mt-2">
              Excerpt, {formatTime(van.duration)} of {formatTime(van.fullDuration ?? van.duration)}
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-8" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <WatchVideo film={van} caption={false} sizes="(min-width: 90rem) 866px, (min-width: 64rem) 62vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
