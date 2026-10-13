import Image from "next/image";
import { system, type Spec } from "@/content/copy";
import { films, photos } from "@/content/media";
import { ui } from "@/content/ui";
import { SectionIntro } from "../section-intro";
import { WatchVideo } from "../video/watch-video";

/** One specification value. Styled spans only: the text, read in order, is the supplied value. */
function SpecValue({ spec }: { spec: Spec }) {
  return (
    <>
      {spec.lines.map((line, i) => (
        <span key={i} className="spec__line">
          {line.map((part, j) => (
            <span key={j} className={`spec__${part.role}`}>
              {part.text}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

/**
 * The system: one section in two tones. The dark band pairs the supplied copy with a bounded
 * film frame in normal flow (no pinned scenes, no spacer). The white product stage rises over the
 * seam and sets the C10 beside the five supplied figures, which are always visible.
 */
export function System() {
  return (
    <section id="system" aria-labelledby="system-heading">
      <div className="on-deep system-band">
        <div className="shell grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionIntro id="system-heading" heading={system.heading} />
            <div className="t-body measure mt-[var(--intro-gap)] grid gap-4 text-white/85" data-reveal>
              {system.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:pt-14" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            <WatchVideo
              film={films.systemIntroduction}
              marks
              sizes="(min-width: 80rem) 737px, (min-width: 64rem) 57vw, 100vw"
            />
          </div>
        </div>
      </div>

      <div className="system-stage-band">
        <div className="shell">
          <div className="stage-panel">
            <figure className="stage m-0" data-reveal>
              <Image
                src={photos.productSide.src}
                alt={photos.productSide.alt}
                width={photos.productSide.width}
                height={photos.productSide.height}
                sizes="(min-width: 80rem) 600px, (min-width: 64rem) 48vw, 88vw"
                className="stage__img"
              />
              <figcaption className="stage__caption">{system.product}</figcaption>
            </figure>

            <div className="specs">
              <h3 id="specs-heading" className="specs__title">
                {ui.system.specsLabel}
              </h3>
              <dl aria-labelledby="specs-heading">
                {system.specs.map((s) => (
                  <div key={s.id} className={`spec spec--${s.id}`}>
                    <dt>{s.label}</dt>
                    <dd>
                      <SpecValue spec={s} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
