import Image from "next/image";
import { system } from "@/content/copy";
import { films, photos } from "@/content/media";
import { datasheet, keyFigures, specFootnotes, specGroups, specTitle } from "@/content/specs";
import { Download } from "../icons";
import { SectionHead } from "../section-head";
import { SpecGroup } from "../spec-group";
import { WatchVideo } from "../video/watch-video";

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-reveal>
      <h3 className="t-h3">{title}</h3>
      <div className="mt-4 grid gap-4 text-paper/85">{children}</div>
    </div>
  );
}

function Point({ lead, text }: { lead: string; text: string }) {
  return (
    <p className="t-body flex gap-3">
      <span aria-hidden="true" className="mt-[0.62em] h-1.5 w-1.5 shrink-0 bg-signal-bright" />
      <span>
        <strong className="font-semibold text-paper">{lead}</strong> {text}
      </span>
    </p>
  );
}

export function System() {
  const [general, ...rest] = specGroups;

  return (
    <section id="the-system" aria-labelledby="system-heading">
      {/* — Ink band: how the system works — */}
      <div className="on-ink section">
        <div className="shell">
          <SectionHead index={system.index} label={system.label} aside={specTitle} />

          <div className="grid-12 mt-8 gap-y-6 lg:mt-12">
            <h2 id="system-heading" className="t-h2 col-span-4 md:col-span-6 lg:col-span-7" data-reveal>
              {system.heading}
            </h2>
            <p className="t-lede col-span-4 text-paper/85 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal>
              {system.lede}
            </p>
          </div>

          <div className="grid-12 mt-12 gap-y-10 lg:mt-16">
            <div className="col-span-4 md:col-span-8 lg:col-span-7" data-reveal>
              <WatchVideo
                film={films.systemIntroduction}
                sizes="(min-width: 90rem) 760px, (min-width: 64rem) 55vw, 100vw"
                titleClassName="t-h4 text-paper"
              />
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:pl-4">
              <Feature title={system.radar.title}>
                <p className="t-body">{system.radar.body}</p>
                {system.radar.points.map((p) => (
                  <Point key={p.lead} lead={p.lead} text={p.text} />
                ))}
              </Feature>
            </div>
          </div>

          <div className="grid-12 mt-12 gap-y-10 border-t border-ink-line pt-10 lg:mt-16 lg:pt-12">
            <div className="col-span-4 grid content-start gap-y-10 md:col-span-4 lg:col-span-6 lg:pr-8">
              <Feature title={system.rtk.title}>
                <p className="t-body">{system.rtk.body}</p>
              </Feature>
              <div className="border-t border-ink-line pt-10">
                <Feature title={system.washing.title}>
                  <Point lead={system.washing.lead} text={system.washing.text} />
                </Feature>
              </div>
            </div>
            <figure className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8" data-reveal>
              <div className="relative aspect-[3/2] overflow-hidden bg-ink-raised">
                <Image
                  src={photos.renderedWall.src}
                  alt={photos.renderedWall.alt}
                  fill
                  sizes="(min-width: 90rem) 530px, (min-width: 64rem) 38vw, (min-width: 48rem) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>

          <div className="mt-12 border-t border-ink-line pt-10 lg:mt-16 lg:pt-12">
            <div className="grid-12 gap-y-8">
              <div className="col-span-4 md:col-span-8 lg:col-span-3" data-reveal>
                <h3 className="t-h3">{system.workflow.heading}</h3>
                <p className="t-body mt-3 text-paper/75">{system.workflow.intro}</p>
              </div>
              <ol className="col-span-4 grid gap-y-8 md:col-span-8 md:grid-cols-3 md:gap-x-5 lg:col-span-9 lg:gap-x-6">
                {system.workflow.steps.map((step, i) => (
                  <li key={step.title} className="border-t border-paper/55 pt-4" data-reveal style={{ ["--reveal-offset" as string]: `${i * 6}%` }}>
                    <p className="flex items-baseline gap-3">
                      <span className="t-figure text-signal-bright">{i + 1}.</span>
                      <span className="t-h3">{step.title}:</span>
                    </p>
                    <p className="t-body mt-3 text-paper/85">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* — Paper panel: the datasheet, exactly as supplied — */}
      <div className="bg-paper py-[clamp(4rem,7vw,7rem)]">
        <div className="shell">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-4 md:col-span-5 lg:col-span-6">
              <p className="t-label muted">{system.index}.1 · Datasheet</p>
              <h3 className="t-h2 mt-3" data-reveal>
                {specTitle}
              </h3>
            </div>
            <div className="col-span-4 md:col-span-3 md:justify-self-end lg:col-span-6">
              <a
                href={datasheet.href}
                download
                className="btn btn-ghost btn-compact"
              >
                <Download size={18} />
                {datasheet.label}
                <span className="t-meta muted font-medium">{datasheet.meta}</span>
              </a>
            </div>
          </div>

          <figure className="relative mx-auto mt-10 max-w-[64rem] lg:mt-12" data-reveal>
            <Image
              src={photos.productSide.src}
              alt={photos.productSide.alt}
              width={photos.productSide.width}
              height={photos.productSide.height}
              sizes="(min-width: 64rem) 1024px, 100vw"
              className="h-auto w-full"
            />
          </figure>

          <dl className="mt-8 grid grid-cols-2 border-t border-ink lg:mt-10 lg:grid-cols-4" aria-label="Headline specifications">
            {keyFigures.map((f, i) => (
              <div
                key={f.label}
                className={`border-line border-b py-5 pr-4 lg:border-b-0 lg:py-7 ${i % 2 === 1 ? "border-l pl-4" : ""} ${
                  i > 0 ? "lg:border-l lg:pl-6" : ""
                }`}
              >
                <dt className="t-meta muted">{f.label}</dt>
                <dd className="t-figure mt-3">{f.value}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Specification groups" className="mt-10 border-t border-line pt-5 lg:mt-12">
            <ul className="-mx-1 flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible">
              {specGroups.map((g, i) => (
                <li key={g.id} className="shrink-0 snap-start">
                  <a
                    href={`#spec-${g.id}`}
                    className="t-meta inline-flex min-h-10 items-center gap-2 border border-line px-3 text-ink transition-colors hover:border-ink"
                  >
                    <span className="text-signal-deep">{system.index}.{i + 1}</span>
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 grid gap-x-12 gap-y-10 lg:mt-10 lg:grid-cols-2">
            <SpecGroup group={general} index={`${system.index}.1`} collapsedOnMobile={false} />
            <div className="grid content-start gap-y-10">
              {rest.map((g, i) => (
                <SpecGroup key={g.id} group={g} index={`${system.index}.${i + 2}`} collapsedOnMobile />
              ))}
            </div>
          </div>

          <ul className="t-meta muted mt-10 grid gap-1.5 border-t border-line pt-5">
            {specFootnotes.map((n) => (
              <li key={n.mark} className="flex gap-2">
                <span className="w-5 shrink-0 text-signal-deep">{n.mark}</span>
                {n.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
