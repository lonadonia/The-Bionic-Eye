import { legal } from "@/content/copy";
import { ArrowRight } from "../icons";

export function Legal() {
  return (
    <section id="operating-legally" aria-labelledby="legal-heading" className="section bg-paper">
      <div className="shell">
        <div className="section-head">
          <h2 id="legal-heading" className="t-label flex items-baseline gap-3">
            <span className="section-head__index t-index">{legal.index}</span>
            <span>{legal.heading}</span>
          </h2>
        </div>

        <div className="grid-12 mt-8 gap-y-10 lg:mt-12">
          <div className="col-span-4 border-l-[3px] border-signal pl-5 md:col-span-8 lg:col-span-7 lg:pl-8" data-reveal>
            <p className="t-label muted">{legal.statement.lead.replace(":", "")}</p>
            <p className="mt-3 text-[clamp(1.625rem,1.1rem+2vw,3rem)] leading-[1.05] font-semibold tracking-[-0.025em] [font-stretch:108%]">
              <span className="sr-only">{legal.statement.lead} </span>
              {legal.statement.text}
            </p>
            <p className="t-meta muted mt-4">Source: {legal.statementSource}</p>
          </div>

          <div className="col-span-4 grid content-start gap-6 md:col-span-8 lg:col-span-4 lg:col-start-9" data-reveal>
            <a href={legal.crossRef.href} className="group flex items-baseline justify-between gap-4 border-y border-ink py-4">
              <span className="flex items-baseline gap-3">
                <span className="t-meta t-index text-signal-deep">04.02</span>
                <span className="t-h4 group-hover:text-signal-deep">{legal.crossRef.label}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 self-center transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <aside aria-label="Content dependency" className="border border-dashed border-graphite p-4 text-graphite">
              <p className="pending-tag">Copy pending</p>
              <p className="t-body mt-3">{legal.pending}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
