import { evidence } from "@/content/copy";
import { RichText } from "../rich-text";
import { SectionIntro } from "../section-intro";

/**
 * Proven in the field: the two supplied case-study sentences as two balanced text articles, with
 * restrained weight on the supplied values. The qualification sits immediately below them at
 * every width. No counters, no re-unitised figures and no photographs presented as proof of
 * these specific jobs.
 */
export function Evidence() {
  return (
    <section id="evidence" aria-labelledby="evidence-heading" className="section bg-paper">
      <div className="shell grid-12 gap-y-[var(--intro-gap)]">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionIntro id="evidence-heading" heading={evidence.heading} />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <p className="t-lede max-w-[34em]">{evidence.intro}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-[var(--gap)]">
            {evidence.cases.map((parts, i) => (
              <article key={i} className="case" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <p className="t-body text-[clamp(1.125rem,1.08rem+0.19vw,1.25rem)] leading-[1.55]">
                  <RichText parts={parts} />
                </p>
              </article>
            ))}
          </div>
          <p className="t-caption mt-6 text-[0.9375rem] text-secondary">{evidence.qualification}</p>
        </div>
      </div>
    </section>
  );
}
