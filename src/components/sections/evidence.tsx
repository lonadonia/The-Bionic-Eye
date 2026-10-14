import { evidence } from "@/content/copy";
import { RichText } from "../rich-text";
import { SectionIntro } from "../section-intro";

/**
 * Proven in the field: the two supplied case-study sentences as two separate articles, set large,
 * with restrained extra weight on the supplied values — still inside their full sentences, never
 * pulled out as standalone metrics or counters. The qualification sits directly beneath both, at
 * every width. No photograph is presented as evidence of these specific jobs.
 */
export function Evidence() {
  return (
    <section id="evidence" aria-labelledby="evidence-heading" className="section evidence">
      <div className="shell grid-12 gap-y-[var(--intro-gap)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionIntro id="evidence-heading" heading={evidence.heading} />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <p className="t-lede evidence__intro">{evidence.intro}</p>
          <div className="evidence__cases">
            {evidence.cases.map((parts, i) => (
              <article key={i} className="case">
                <p className="case__text">
                  <RichText parts={parts} />
                </p>
              </article>
            ))}
          </div>
          <p className="evidence__note">{evidence.qualification}</p>
        </div>
      </div>
    </section>
  );
}
