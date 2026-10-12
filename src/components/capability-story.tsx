"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type Capability = {
  id: string;
  /** Short identifier for the stage index (a word taken from the title). */
  short: string;
  title: string;
  body: ReactNode;
  /** focus: object-position for the 3:2 crop (film stills anchor left so the ABZ watermark stays whole). */
  media: { src: string; alt: string; caption: string; focus?: string };
};

const STAGE_SIZES = "(min-width: 90rem) 760px, (min-width: 64rem) 56vw, 100vw";

/**
 * The engineering chapter's scroll-anchored sequence. On desktop (fine pointer, motion allowed) the
 * stage stays pinned beside the narrative and cross-fades to the matching real image as each
 * capability crosses the reading line; the index under the stage shows where you are and jumps to
 * any capability. Everywhere else — touch, small screens, reduced motion — the same content renders
 * as ordinary stacked image + text (pure CSS switch, so it holds without JavaScript too).
 * Nothing is pinned with JS and no scroll events are used: an IntersectionObserver picks the step.
 */
export function CapabilityStory({ items }: { items: Capability[] }) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = steps.current.filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    steps.current[i]?.scrollIntoView({ block: "center" });
  };

  return (
    <div className="grid-12 gap-y-14">
      <div className="story-stage col-span-7">
        <div className="sticky top-[max(6rem,calc(50vh-17.5rem))]">
          <div className="tech-frame text-fog">
            <div className="media-frame relative aspect-[3/2]">
              {items.map((item, i) => (
                <div key={item.id} className="story-stage__layer" data-active={active === i}>
                  <Image
                    src={item.media.src}
                    alt={active === i ? item.media.alt : ""}
                    fill
                    sizes={STAGE_SIZES}
                    className="object-cover"
                    style={{ objectPosition: item.media.focus }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-start justify-between gap-6">
            <div className="flex flex-1 gap-3" role="group" aria-label="Capabilities">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className="story-index__btn"
                  aria-current={active === i ? "true" : undefined}
                  aria-label={`Show ${item.title}`}
                  onClick={() => goTo(i)}
                >
                  <span className="tnum mr-2 text-signal-bright">{i + 1}</span>
                  {item.short}
                </button>
              ))}
            </div>
            <p className="t-meta muted shrink-0 pt-3 text-right">
              {items[active].media.caption}
            </p>
          </div>
        </div>
      </div>

      <div className="story-steps">
        {items.map((item, i) => (
          <article
            key={item.id}
            ref={(el) => {
              steps.current[i] = el;
            }}
            data-step={i}
            data-active={active === i}
            aria-labelledby={`${item.id}-title`}
            className="story-step border-t border-ink-line py-10 first:border-t-0 first:pt-0 lg:border-t-0 lg:py-0"
          >
            <figure className="story-inline-media mb-7">
              <div className="media-frame relative aspect-[3/2]">
                <Image
                  src={item.media.src}
                  alt={item.media.alt}
                  fill
                  sizes={STAGE_SIZES}
                  className="object-cover"
                  style={{ objectPosition: item.media.focus }}
                />
              </div>
              <figcaption className="t-meta muted mt-2.5">{item.media.caption}</figcaption>
            </figure>
            <div className="story-step__text">
              <p className="t-meta tnum text-signal-bright">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <h3 id={`${item.id}-title`} className="story-step__title t-h3 mt-3 max-w-[22ch]">
                {item.title}
              </h3>
              <div className="story-step__body mt-5 grid gap-4">{item.body}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
