import Image from "next/image";
import { system } from "@/content/copy";
import { photos } from "@/content/media";
import { datasheet, keyFigures, specFootnotes, specGroups, specTitle } from "@/content/specs";
import { ui } from "@/content/ui";
import { Download } from "../icons";
import { SpecTable } from "../spec-table";

/**
 * Parts of the C10 that are unambiguous in the studio render, each labelled with the datasheet row
 * that describes it (label and value exactly as in specs.ts). Positions are percentages of the render.
 */
const parts = [
  { label: "Rotor dimensions", x: 11.5, y: 31 },
  { label: "Spray lance", x: 71, y: 57.6 },
  { label: "Spray nozzle", x: 90.4, y: 57.2 },
].map((p) => {
  const row = specGroups.flatMap((g) => g.rows).find((r) => r.label === p.label);
  if (!row) throw new Error(`Datasheet row not found: ${p.label}`);
  return { ...p, value: row.value };
});

/** Splits a datasheet value for typesetting only — the rendered text is unchanged. */
function splitFigure(value: string) {
  const m = value.match(/^(\D*?)(\d[\d.,]*)(\s*)(.*)$/);
  return m ? { prefix: m[1], num: m[2], gap: m[3], unit: m[4] } : { prefix: "", num: value, gap: "", unit: "" };
}

/** 03.1 — the datasheet: the product rises out of the dark chapter onto a silver stage. */
export function Specifications() {
  return (
    <div id="specifications" className="bg-paper pb-[clamp(5rem,9vw,9rem)]">
      <div className="shell">
        <figure
          className="product-stage relative z-10 -mt-[clamp(10rem,17vw,15.5rem)] px-[5%] pt-[clamp(2.5rem,5vw,4.5rem)] pb-6 md:pb-8"
          aria-labelledby="product-stage-caption"
        >
          <div className="tech-frame-inset" aria-hidden="true" />
          <div className="scrub-drift relative mx-auto max-w-[62rem]">
            <Image
              src={photos.productSide.src}
              alt={photos.productSide.alt}
              width={photos.productSide.width}
              height={photos.productSide.height}
              sizes="(min-width: 75rem) 992px, 90vw"
              className="product-stage__img h-auto w-full"
            />
            {parts.map((p, i) => (
              <span key={p.label} className="pin" style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden="true">
                {i + 1}
              </span>
            ))}
          </div>
          <figcaption id="product-stage-caption" className="relative mx-auto mt-6 max-w-[62rem] md:mt-8">
            <p className="sr-only">ABZ Innovation C10, side view. {ui.specs.annotationsLabel}:</p>
            <ol className="grid gap-x-8 gap-y-3 border-t border-ink/15 pt-4 sm:grid-cols-3">
              {parts.map((p, i) => (
                <li key={p.label} className="flex items-baseline gap-3">
                  <span className="pin pin--static" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="t-small">
                    <span className="text-slate">{p.label}</span>{" "}
                    <span className="font-display font-semibold">{p.value}</span>
                  </span>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>

        <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mt-20">
          <div>
            <p className="t-label">
              <span className="text-signal-ink tnum">{system.index}.1</span>
              <span className="ml-3">{ui.specs.label}</span>
            </p>
            <h2 className="t-h2 mt-4" data-reveal>
              {specTitle}
            </h2>
          </div>
          <a href={datasheet.href} download className="btn btn-secondary self-start md:self-auto">
            <Download size={18} />
            {datasheet.label}
            <span className="t-meta muted font-medium">{datasheet.meta}</span>
          </a>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 lg:mt-12 lg:grid-cols-4 lg:gap-x-6" aria-label="Headline specifications">
          {keyFigures.map((f, i) => {
            const { prefix, num, gap, unit } = splitFigure(f.value);
            return (
              <div
                key={f.label}
                className="metric flex flex-col-reverse"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              >
                <dt className="t-small muted mt-3">{f.label}</dt>
                <dd className="t-figure">
                  {prefix ? <span className="mr-[0.08em] text-[0.5em] font-semibold tracking-normal text-slate">{prefix}</span> : null}
                  {num}
                  {gap}
                  <span className="text-[0.42em] font-semibold tracking-[-0.01em] text-slate">{unit}</span>
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-14 lg:mt-20">
          <SpecTable groups={specGroups} footnotes={specFootnotes} />
        </div>
      </div>
    </div>
  );
}
