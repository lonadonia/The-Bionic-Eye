"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Film } from "@/content/media";
import { ui } from "@/content/ui";
import { ChevronDown, ChevronRight } from "./icons";
import { SELECT_SERVICE_EVENT, ServiceLink } from "./service-link";
import { WatchVideo } from "./video/watch-video";

export type ServiceView = {
  id: string;
  title: string;
  /** Approved description, where the client supplied one. */
  note?: string;
  media:
    | { kind: "photo"; src: string; alt: string }
    | { kind: "film"; film: Film }
    | { kind: "plate" };
  related?: { label: string; href: string };
};

const MEDIA_SIZES = "(min-width: 90rem) 760px, (min-width: 64rem) 56vw, 100vw";

function Media({ s }: { s: ServiceView }) {
  if (s.media.kind === "film") {
    return <WatchVideo film={s.media.film} sizes={MEDIA_SIZES} />;
  }
  if (s.media.kind === "photo") {
    return (
      <div className="media-frame relative aspect-video">
        <Image src={s.media.src} alt={s.media.alt} fill sizes={MEDIA_SIZES} className="object-cover" />
      </div>
    );
  }
  // No supplied image for this service: a brand plate, never a stand-in photo.
  return (
    <div className="aspect-video">
      <div className="svc-plate">
        {/* eslint-disable-next-line @next/next/no-img-element -- vector brand mark served as-is */}
        <img
          src="/media/brand/tbe-symbol-white.svg"
          alt=""
          width={2286}
          height={943}
          className="relative mb-auto h-auto w-[clamp(4.5rem,9vw,7rem)] opacity-90"
          decoding="async"
          loading="lazy"
        />
        <p className="relative t-meta text-fog">{ui.support.pendingTitle}</p>
      </div>
    </div>
  );
}

function Body({ s }: { s: ServiceView }) {
  return (
    <div className="mt-6 grid gap-4 lg:mt-7">
      {s.note ? (
        <p className="t-body max-w-[36rem]">{s.note}</p>
      ) : (
        <div className="grid gap-2 text-slate">
          <p className="chip">{ui.legal.pendingLabel}</p>
          <p className="t-small max-w-[34rem]">{ui.support.pendingText}</p>
        </div>
      )}
      <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ServiceLink serviceId={s.id} className="btn btn-secondary">
          {ui.support.enquire(s.title)}
        </ServiceLink>
        {s.related ? (
          <a href={s.related.href} className="t-small link font-medium">
            {s.related.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Full service support. Desktop: a vertical tab list beside one stable-height panel; switching
 * cross-fades between stacked panels (no layout shift). Arrow keys, Home and End move between tabs.
 * Phones: the same services as an accordion. One state drives both, and the "Operating legally"
 * cross-reference can open a service from elsewhere on the page.
 */
export function ServiceExplorer({ services, heading, headingId }: { services: ServiceView[]; heading: string; headingId: string }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(true);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const i = services.findIndex((s) => s.id === (e as CustomEvent<string>).detail);
      if (i >= 0) {
        setActive(i);
        setMobileOpen(true);
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, [services]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = services.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (active + 1) % services.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (active - 1 + services.length) % services.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      {/* Desktop: tabs + panel */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="col-span-5">
          <h2 id={headingId} className="t-h2 max-w-[12ch]">
            {heading}
          </h2>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-labelledby={headingId}
            className="mt-10 border-t border-line"
          >
            {services.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`${uid}-tab-${s.id}`}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls={`${uid}-panel-${s.id}`}
                tabIndex={active === i ? 0 : -1}
                className="svc-tab"
                onClick={() => setActive(i)}
                onKeyDown={onTabKey}
              >
                {s.title}
                <ChevronRight size={18} className="svc-tab__icon" />
              </button>
            ))}
          </div>
        </div>
        <div className="svc-panels col-span-7 pt-2">
          {services.map((s, i) => (
            <div
              key={s.id}
              id={`${uid}-panel-${s.id}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${s.id}`}
              className="svc-panel"
              data-active={active === i}
            >
              <Media s={s} />
              <h3 className="t-h3 mt-7">{s.title}</h3>
              <Body s={s} />
            </div>
          ))}
        </div>
      </div>

      {/* Phones and tablets: accordion */}
      <div className="lg:hidden">
        <h2 id={`${headingId}-m`} className="t-h2">
          {heading}
        </h2>
        <ul className="mt-8 border-t border-line">
          {services.map((s, i) => {
            const open = mobileOpen && active === i;
            return (
              <li key={s.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`${uid}-acc-${s.id}`}
                    aria-expanded={open}
                    aria-controls={`${uid}-region-${s.id}`}
                    className="svc-tab border-b-0"
                    onClick={() => {
                      if (active === i) setMobileOpen((o) => !o);
                      else {
                        setActive(i);
                        setMobileOpen(true);
                      }
                    }}
                  >
                    {s.title}
                    <ChevronDown size={18} className="svc-tab__icon" />
                  </button>
                </h3>
                <div
                  id={`${uid}-region-${s.id}`}
                  role="region"
                  aria-labelledby={`${uid}-acc-${s.id}`}
                  hidden={!open}
                  className="pb-8"
                >
                  <Media s={s} />
                  <Body s={s} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
