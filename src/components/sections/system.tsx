import { system } from "@/content/copy";
import { films, photos, systemStills } from "@/content/media";
import { specTitle } from "@/content/specs";
import { ui } from "@/content/ui";
import { CapabilityStory, type Capability } from "../capability-story";
import { SectionHead } from "../section-head";
import { WatchVideo } from "../video/watch-video";
import { Specifications } from "./specifications";

function Point({ lead, text }: { lead: string; text: string }) {
  return (
    <p className="story-step__point t-body flex gap-3">
      <span>
        <strong className="font-semibold text-white">{lead}</strong> {text}
      </span>
    </p>
  );
}

const capabilities: Capability[] = [
  {
    id: "radar",
    short: ui.system.capabilitiesShort.radar,
    title: system.radar.title,
    body: (
      <>
        <p className="t-body">{system.radar.body}</p>
        {system.radar.points.map((p) => (
          <Point key={p.lead} lead={p.lead} text={p.text} />
        ))}
      </>
    ),
    media: { src: photos.renderedWall.src, alt: photos.renderedWall.alt, caption: ui.system.photoCaption },
  },
  {
    id: "rtk",
    short: ui.system.capabilitiesShort.rtk,
    title: system.rtk.title,
    body: <p className="t-body">{system.rtk.body}</p>,
    media: { src: systemStills.rtk.src, alt: systemStills.rtk.alt, caption: ui.system.stillCaption("01:41"), focus: "0% 50%" },
  },
  {
    id: "washing",
    short: ui.system.capabilitiesShort.washing,
    title: system.washing.title,
    body: <Point lead={system.washing.lead} text={system.washing.text} />,
    media: { src: systemStills.washing.src, alt: systemStills.washing.alt, caption: ui.system.stillCaption("02:02"), focus: "0% 50%" },
  },
];

/** Section 03 — the engineering chapter (graphite), then its datasheet (paper). */
export function System() {
  return (
    <section id="the-system" aria-labelledby="system-heading">
      <div className="on-ink pt-[clamp(5rem,9vw,9rem)] pb-[clamp(13rem,22vw,20rem)]">
        <div className="shell">
          <SectionHead index={system.index} label={system.label} aside={specTitle} />

          <div className="grid-12 mt-10 gap-y-5 lg:mt-14">
            <h2 id="system-heading" className="t-h2 col-span-4 md:col-span-6 lg:col-span-6" data-reveal>
              {system.heading}
            </h2>
            <p
              className="t-lede col-span-4 text-white/80 md:col-span-6 lg:col-span-5 lg:col-start-8 lg:self-end"
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
            >
              {system.lede}
            </p>
          </div>

          {/* Cinematic film moment: settles from 94% to full size as it enters (CSS view timeline). */}
          <div className="scrub-settle mt-12 lg:mt-16">
            <WatchVideo
              film={films.systemIntroduction}
              large
              sizes="(min-width: 90rem) 1312px, 100vw"
              note={ui.system.filmCaption}
            />
          </div>

          <div className="mt-20 lg:mt-32">
            <CapabilityStory items={capabilities} />
          </div>

          <Workflow />
        </div>
      </div>

      <Specifications />
    </section>
  );
}

function Workflow() {
  const { workflow } = system;
  return (
    <div className="mt-20 lg:mt-32">
      <div className="grid-12 gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-4" data-reveal>
          <h3 className="t-h3 max-w-[16ch]">{workflow.heading}</h3>
          <p className="t-body mt-3 text-fog">{workflow.intro}</p>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          {/* The process line draws as it scrolls into view; each step sits on a tick. */}
          <div className="relative hidden h-px bg-white/18 md:block" aria-hidden="true">
            <span className="scrub-draw absolute inset-0 bg-signal-bright" />
          </div>
          <ol className="grid gap-y-8 md:grid-cols-3 md:gap-x-6">
            {workflow.steps.map((step, i) => (
              <li
                key={step.title}
                className="relative border-t border-white/18 pt-5 md:border-t-0 md:pt-7"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
              >
                <span aria-hidden="true" className="absolute top-0 left-0 hidden h-3 w-px -translate-y-1.5 bg-signal-bright md:block" />
                <p className="flex items-baseline gap-3">
                  <span className="t-label tnum text-signal-bright">{i + 1}.</span>
                  <span className="t-h4">{step.title}</span>
                </p>
                <p className="t-body mt-3 text-white/78">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
