import { regulation } from "@/content/copy";
import { ArrowRight } from "../icons";
import { RichText } from "../rich-text";
import { SectionIntro } from "../section-intro";
import { SelectServiceLink } from "../select-service-link";

/**
 * Operating legally: calm after the product chapter. A document-style sheet with a measured rule
 * and a discreet cyan edge holds the complete supplied note at a broad reading measure; the
 * operator-held-authorisation sentence is set heavier. No badges, seals or certification motifs.
 * "How authorisation works" has no supplied destination yet, so in this prototype it opens the
 * Operational Authorisation support entry on this page (see handover).
 */
export function Legal() {
  return (
    <section id="regulation" aria-labelledby="regulation-heading" className="section legal">
      <div className="shell grid-12 gap-y-[var(--intro-gap)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionIntro id="regulation-heading" heading={regulation.heading} />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <div className="sheet">
            <div className="sheet__body t-body">
              {regulation.paragraphs.map((parts, i) => (
                <p key={i}>
                  <RichText parts={parts} />
                </p>
              ))}
            </div>
            <div className="sheet__foot">
              <SelectServiceLink serviceId="oa-support" className="btn btn-secondary">
                {regulation.link}
                <ArrowRight size={18} />
              </SelectServiceLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
