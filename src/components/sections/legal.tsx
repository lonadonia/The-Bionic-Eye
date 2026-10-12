import { legal, support } from "@/content/copy";
import { ui } from "@/content/ui";
import { ChevronRight } from "../icons";
import { SectionHead } from "../section-head";
import { ServiceSelectLink } from "../service-link";

/** Section 05 — a short, factual note set like a document, not a banner. */
export function Legal() {
  const oa = support.services.find((s) => s.id === "operational-authorisation-support");
  return (
    <section id="operating-legally" aria-labelledby="legal-heading" className="chapter bg-paper">
      <div className="shell">
        <SectionHead index={legal.index} />

        <div className="grid-12 mt-10 gap-y-8 lg:mt-14">
          <h2 id="legal-heading" className="t-h2 col-span-4 md:col-span-8 lg:col-span-4" data-reveal>
            {legal.heading}
          </h2>

          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6" data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
            <div className="doc-rail">
              <p className="t-label text-slate">{legal.statement.lead.replace(":", "")}</p>
              <p className="mt-2 font-display text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-[1.2] font-semibold tracking-[-0.02em]">
                <span className="sr-only">{legal.statement.lead} </span>
                {legal.statement.text}
              </p>
              <p className="t-meta muted mt-3">
                {ui.legal.sourcePrefix} {legal.statementSource}
              </p>

              <ServiceSelectLink
                serviceId={oa?.id ?? "operational-authorisation-support"}
                className="group mt-8 flex min-h-14 items-center justify-between gap-4 border-y border-line py-3 transition-colors hover:border-ink"
              >
                <span className="t-h4 group-hover:text-signal-ink">{legal.crossRef.label}</span>
                <ChevronRight size={18} className="shrink-0 text-slate transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal-ink" />
              </ServiceSelectLink>

              <aside aria-label="Content dependency" className="mt-6 flex flex-col gap-2 text-slate sm:flex-row sm:items-baseline sm:gap-4">
                <p className="chip shrink-0">{ui.legal.pendingLabel}</p>
                <p className="t-small">{legal.pending}</p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
