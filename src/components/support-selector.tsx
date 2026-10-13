"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { SupportParagraph, SupportService } from "@/content/copy";
import { ui } from "@/content/ui";
import { ChevronRight } from "./icons";

export const SELECT_SERVICE_EVENT = "tbe:select-service";

type SupportSelectorProps = {
  services: readonly SupportService[];
  paragraphs: readonly SupportParagraph[];
  supplyHeading: string;
  /** Shared operational image (server-rendered): first on phones, beneath the copy on desktop. */
  media: ReactNode;
};

/**
 * Full service support. The five service areas are a single-choice selector (radio group: arrow
 * keys, Home and End). Choosing one emphasises the supplied paragraph that covers it. Every
 * paragraph stays visible and whole: two of them cover two services each, so nothing is split or
 * re-attributed. Other parts of the page can select a service via SELECT_SERVICE_EVENT.
 */
export function SupportSelector({ services, paragraphs, supplyHeading, media }: SupportSelectorProps) {
  const [active, setActive] = useState(0);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const activeParagraph = services[active].paragraph;

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
    <div className="grid-12 gap-y-8">
      {/* Phones: image, then selector, then the copy it points into. Desktop: the selector sits
          level with the paragraphs it highlights; the shared image follows beneath them. */}
      <div className="order-2 col-span-4 md:col-span-8 lg:order-none lg:col-span-4 lg:row-span-2">
        <div role="radiogroup" aria-label={ui.support.selectorLabel} className="selector is-sticky lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
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
      </div>

      <div className="order-3 col-span-4 md:col-span-8 lg:order-none lg:col-span-8">
        <h3 className="t-h3 lg:-mt-1">{supplyHeading}</h3>
        <div className="supply t-body measure mt-5">
          {paragraphs.map((p) => (
            <p key={p.id} id={`supply-${p.id}`} className="supply__para" data-active={p.id === activeParagraph}>
              {p.text}
            </p>
          ))}
        </div>
      </div>

      <div className="order-1 col-span-4 md:col-span-8 lg:order-none lg:col-span-8 lg:col-start-5">{media}</div>
    </div>
  );
}
