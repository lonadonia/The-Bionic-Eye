"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { SupportParagraph, SupportService } from "@/content/copy";
import { ui } from "@/content/ui";
import { ChevronRight } from "./icons";

export const SELECT_SERVICE_EVENT = "tbe:select-service";

export type SupportMedia = { id: string; frame: ReactNode; caption?: ReactNode };

type SupportSelectorProps = {
  services: readonly SupportService[];
  paragraphs: readonly SupportParagraph[];
  supplyHeading: string;
  /** Real media layers (server-rendered). Several services may share one layer. */
  media: readonly SupportMedia[];
  /** Which media layer each service shows (service id → media id). */
  mediaFor: Record<string, string>;
};

/**
 * Full service support. The five service areas are a single-choice selector (radio group: arrow
 * keys, Home and End). Choosing one emphasises the supplied paragraph that covers it — every
 * paragraph stays visible and whole, because two of them cover two services each — and shows the
 * real media associated with it in a stable frame with a brief crossfade. Services without a
 * distinct supplied asset keep the shared field photograph rather than borrowing an unrelated one.
 * Other parts of the page can select a service via SELECT_SERVICE_EVENT.
 */
export function SupportSelector({ services, paragraphs, supplyHeading, media, mediaFor }: SupportSelectorProps) {
  const [active, setActive] = useState(0);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const activeParagraph = services[active].paragraph;
  const activeMedia = mediaFor[services[active].id];

  useEffect(() => {
    const onSelect = (e: Event) => {
      const i = services.findIndex((s) => s.id === (e as CustomEvent<string>).detail);
      if (i >= 0) setActive(i);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, [services]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = services.length;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (active + 1) % n
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
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
    <div className="support__grid">
      <div className="support__copy">
        <div role="radiogroup" aria-label={ui.support.selectorLabel} className="selector">
          {services.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                options.current[i] = el;
              }}
              id={`service-${s.id}`}
              type="button"
              role="radio"
              aria-checked={active === i}
              aria-controls={`supply-${s.paragraph}`}
              tabIndex={active === i ? 0 : -1}
              className="selector__option"
              onClick={() => setActive(i)}
              onKeyDown={onKey}
            >
              {s.title}
              <ChevronRight size={18} className="selector__icon" />
            </button>
          ))}
        </div>

        <div className="supply">
          <h3 className="t-h3">{supplyHeading}</h3>
          <div className="supply__list t-body">
            {paragraphs.map((p) => (
              <p key={p.id} id={`supply-${p.id}`} className="supply__para" data-active={p.id === activeParagraph}>
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="support__media">
        <div className="support__surface">
          {media.map((m) => (
            <div key={m.id} className="support__layer" data-active={m.id === activeMedia} inert={m.id !== activeMedia}>
              {m.frame}
            </div>
          ))}
        </div>
        <div className="support__captions">
          {media.map((m) =>
            m.caption ? (
              <div key={m.id} className="support__caption" data-active={m.id === activeMedia} aria-hidden={m.id !== activeMedia}>
                {m.caption}
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
