"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { ProductView } from "@/content/media";
import { ui } from "@/content/ui";
import { Callout } from "./callout";

type ProductExplorerProps = {
  views: readonly ProductView[];
  product: string;
};

/**
 * Product explorer: a large white stage holding the real studio photographs of the C10. The view
 * selector is a single-choice group (radio semantics: arrow keys, Home and End; touch and click)
 * with a thumbnail of each genuine photograph. Switching crossfades between photographs on one
 * fixed 16:10 canvas, so the stage never changes height. A nozzle callout appears only on views
 * where the nozzle is plainly visible; its position was measured on each photograph.
 * No 3D model and no rotation: three real angles.
 */
export function ProductExplorer({ views, product }: ProductExplorerProps) {
  const [active, setActive] = useState(0);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const view = views[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = views.length;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (active + 1) % n
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (active - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    options.current[next]?.focus();
  };

  return (
    <div className="explorer">
      <figure className="stage" data-motion="stage">
        <div className="stage__canvas">
          {views.map((v, i) => (
            <Image
              key={v.id}
              src={v.photo.src}
              alt={i === active ? v.photo.alt : ""}
              aria-hidden={i === active ? undefined : true}
              fill
              sizes="(min-width: 80rem) 760px, (min-width: 64rem) 58vw, 100vw"
              className="stage__img"
              data-active={i === active}
            />
          ))}
          {views.map((v, i) =>
            "nozzle" in v && v.nozzle ? (
              <Callout
                key={v.id}
                label={ui.system.nozzle}
                x={v.nozzle.x}
                y={v.nozzle.y}
                dir={v.nozzle.y > 0.7 ? "right" : "down-left"}
                hidden={i !== active}
              />
            ) : null,
          )}
        </div>
        <figcaption className="stage__caption">
          <span>{product}</span>
          <span className="stage__view" aria-live="polite">
            {ui.system.views[view.id]}
          </span>
        </figcaption>
      </figure>

      <div role="radiogroup" aria-label={ui.system.viewsLabel} className="views">
        {views.map((v, i) => (
          <button
            key={v.id}
            ref={(el) => {
              options.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active === i}
            tabIndex={active === i ? 0 : -1}
            className="views__option"
            onClick={() => setActive(i)}
            onKeyDown={onKey}
          >
            <span className="views__thumb" aria-hidden="true">
              <Image src={v.photo.src} alt="" width={96} height={60} sizes="96px" className="views__thumb-img" />
            </span>
            <span className="views__label">{ui.system.views[v.id]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
