import { regulation } from "@/content/copy";
import { ArrowRight } from "../icons";
import { RichText } from "../rich-text";
import { SectionIntro } from "../section-intro";
import { SelectServiceLink } from "../select-service-link";

/**
 * Operating legally: a designed information panel, not small print. The full supplied paragraphs
 * sit at a readable measure beside a graphite rule; the operator-held-authorisation sentence is set
 * in a heavier weight. "How authorisation works" has no supplied destination yet, so in this
 * prototype it opens the Operational Authorisation support entry on this page (see handover).
 */
export function Legal() {
  return (
    <section id="regulation" aria-labelledby="regulation-heading" className="section bg-soft">
      <div className="shell grid-12 gap-y-[var(--intro-gap)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionIntro id="regulation-heading" heading={regulation.heading} />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <div className="reg-text t-body">
            {regulation.paragraphs.map((parts, i) => (
              <p key={i}>
                <RichText parts={parts} />
              </p>
            ))}
            <p className="mt-2">
              <SelectServiceLink serviceId="oa-support" className="btn btn-secondary">
                {regulation.link}
                <ArrowRight size={18} />
              </SelectServiceLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
