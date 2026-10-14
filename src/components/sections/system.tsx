import Image from "next/image";
import { system, type Spec } from "@/content/copy";
import { photos, productViews } from "@/content/media";
import { ui } from "@/content/ui";
import { Callout } from "../callout";
import { CleaningSystemStory } from "../cleaning-system-story";
import { DotField, IrisRings, WingCurve } from "../decor";
import { ProductExplorer } from "../product-explorer";
import { SectionIntro } from "../section-intro";

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

/** Two substantial detail frames, both real: a studio close-up and the same part at work. */
const details = [
  { photo: photos.nozzleStudio, nozzle: { x: 0.742, y: 0.468 }, caption: ui.system.studio, dir: "up-right" as const },
  { photo: photos.nozzleOperation, nozzle: { x: 0.448, y: 0.43 }, caption: ui.system.inOperation, dir: "down-left" as const },
];

/**
 * The system: the page's main visual explanation, in three connected compositions.
 * A. Product explorer — the supplied introduction and the five figures beside a large white stage
 *    on a broad cyan plane, with real alternate views and two detail frames always in view.
 * B. Cleaning system — real frames from the Clean Station guide linking the drone at work to its
 *    ground equipment (a bounded scroll scene on desktop, a plain pair everywhere else).
 * All copy is the contest copy, complete and in reading order.
 */
export function System() {
  return (
    <section id="system" aria-labelledby="system-heading" className="system on-deep">
      <div className="shell system__grid">
        <div className="system__copy">
          <SectionIntro id="system-heading" heading={system.heading} />
          <p className="t-lede system__lede">{system.paragraphs[0]}</p>
        </div>

        <div className="system__visual">
          <IrisRings className="system__iris" />
          <ProductExplorer views={productViews} product={system.product} />

          <div className="details">
            {details.map((d) => (
              <figure key={d.photo.src} className="detail" data-motion="detail">
                <div className="detail__frame">
                  <Image
                    src={d.photo.src}
                    alt={d.photo.alt}
                    fill
                    sizes="(min-width: 80rem) 370px, (min-width: 64rem) 28vw, (min-width: 40rem) 50vw, 100vw"
                    className="object-cover"
                  />
                  <Callout label={ui.system.nozzle} x={d.nozzle.x} y={d.nozzle.y} dir={d.dir} />
                </div>
                <figcaption className="detail__caption">{d.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="specs system__specs">
          <h3 id="specs-heading" className="specs__title">
            {ui.system.specsLabel}
          </h3>
          <dl>
            {system.specs.map((s) => (
              <div key={s.id} className={`spec spec--${s.id}`}>
                <dt>{s.label}</dt>
                <dd>
                  <SpecValue spec={s} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-body specs__note">{system.paragraphs[1]}</p>
        </div>
      </div>

      <WingCurve className="system__wing" />
      <DotField className="system__dots" />
      <div className="shell system__story">
        <CleaningSystemStory />
      </div>
    </section>
  );
}
