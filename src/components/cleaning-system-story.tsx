"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { films, photos } from "@/content/media";
import { ui } from "@/content/ui";
import { Callout } from "./callout";
import { FilmDialogButton } from "./video/film-dialog";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ZOOM = 1.9;

/**
 * Nozzle position measured on the 05:16 frame: (0.385, 0.531) of the whole 16:9 picture, as on phones.
 * From 1024px the frame is 3:2 with the picture centred, so the same point sits at x = 0.3637
 * ((0.385 − 0.0781) / 0.8438); CSS moves the callout there (.story__callout) and the zoom uses it.
 */
const NOZZLE = { x: 0.385, y: 0.531 };
const NOZZLE_DESKTOP = { x: 0.3637, y: 0.531 };

/**
 * The cleaning system: two real frames from the supplied ABZ Clean Station guide, shown as an
 * asymmetric 60/40 pair — the C10 at work on its hose, and the Clean Station ground unit it is fed
 * from — each with access to the guide footage it comes from.
 *
 * The pair is the default everywhere (phones, reduced motion, the static capture, no
 * JavaScript). On desktop with motion allowed the block becomes one bounded scroll scene: it pins
 * for about one screen and steps through three real views of the same pictures — the whole
 * operation, the nozzle and its jet (a closer look at the same 4K frame, nothing added), then the
 * pair. Visible controls give the same three views without scrolling. React state changes only
 * when the view changes, never on each scroll frame.
 */
export function CleaningSystemStory() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const opFrame = useRef<HTMLDivElement>(null);
  const opZoom = useRef<HTMLDivElement>(null);
  const stFrame = useRef<HTMLDivElement>(null);
  const stCaption = useRef<HTMLDivElement>(null);
  const goTo = useRef<(i: number) => void>(() => undefined);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const [scene, setScene] = useState(false);
  const [view, setView] = useState(2);

  useGSAP(
    () => {
      if (document.documentElement.dataset.capture !== undefined) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem) and (prefers-reduced-motion: no-preference)", () => {
        const frame = opFrame.current!;
        const zoom = opZoom.current!;
        const station = [stFrame.current!, stCaption.current!];
        const callout = zoom.querySelector<HTMLElement>(".callout");
        const box = stage.current!;
        let current = 0;
        let fromScroll = 0;

        // Views 1–2: the operation frame grows from its 60% slot to the whole stage (the stage clips it).
        const grow = () => box.clientWidth / frame.clientWidth;
        const apply = (i: number, instant = false) => {
          current = i;
          const d = instant ? 0 : 0.85;
          const ease = "power3.inOut";
          gsap.to(frame, { scale: i < 2 ? grow() : 1, duration: d, ease, overwrite: "auto" });
          gsap.to(zoom, { scale: i === 1 ? ZOOM : 1, duration: d, ease, overwrite: "auto" });
          // Keep the callout at its true size while the picture around it grows.
          if (callout) gsap.to(callout, { scale: 1 / ((i < 2 ? grow() : 1) * (i === 1 ? ZOOM : 1)), duration: d, ease, overwrite: "auto" });
          gsap.to(station, {
            autoAlpha: i < 2 ? 0 : 1,
            x: i < 2 ? 48 : 0,
            duration: instant ? 0 : 0.6,
            delay: i < 2 || instant ? 0 : 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          box.dataset.view = String(i);
          setView(i);
        };

        gsap.set(frame, { transformOrigin: "0% 50%" });
        gsap.set(zoom, { transformOrigin: `${NOZZLE_DESKTOP.x * 100}% ${NOZZLE_DESKTOP.y * 100}%` });
        setScene(true);
        apply(0, true);

        const header = () => document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 84;
        ScrollTrigger.create({
          trigger: root.current,
          pin: true,
          start: () => `top ${header() + 24}px`,
          end: "+=110%",
          onUpdate: (self) => {
            const i = self.progress < 0.34 ? 0 : self.progress < 0.68 ? 1 : 2;
            if (i !== fromScroll) {
              fromScroll = i;
              apply(i);
            }
          },
          onRefresh: () => apply(current, true),
        });

        goTo.current = (i: number) => apply(i);
        return () => {
          goTo.current = () => undefined;
          delete box.dataset.view;
          setScene(false);
          setView(2);
        };
      });
    },
    { scope: root },
  );

  // The scene's controls render after the trigger is created; re-measure once they are in the layout.
  useEffect(() => {
    if (scene) ScrollTrigger.refresh();
  }, [scene]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = ui.system.scene.length;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (view + 1) % n
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (view - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    goTo.current(next);
    options.current[next]?.focus();
  };

  return (
    <div ref={root} className="story">
      {scene ? (
        <div role="radiogroup" aria-label={ui.system.sceneLabel} className="story__controls">
          {ui.system.scene.map((label, i) => (
            <button
              key={label}
              ref={(el) => {
                options.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={view === i}
              tabIndex={view === i ? 0 : -1}
              className="story__control"
              onClick={() => goTo.current(i)}
              onKeyDown={onKey}
            >
              <span className="story__control-index tnum" aria-hidden="true">
                {i + 1}
              </span>
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="story__body">
        {/* Frames (clipped stage on desktop), then captions; phones interleave them frame → caption. */}
        <div ref={stage} className="story__stage">
          <div ref={opFrame} className="story__frame story__frame--operation">
            <div ref={opZoom} className="story__zoom">
              <Image src={photos.operation.src} alt={photos.operation.alt} fill sizes="(min-width: 64rem) 2048px, 100vw" className="story__img" />
              <Callout label={ui.system.nozzle} x={NOZZLE.x} y={NOZZLE.y} dir="up-right" className="story__callout" />
            </div>
          </div>
          <div ref={stFrame} className="story__frame story__frame--station">
            <Image
              src={photos.cleanStation.src}
              alt={photos.cleanStation.alt}
              fill
              sizes="(min-width: 64rem) 560px, 100vw"
              className="story__img"
              style={{ objectPosition: "0% 50%" }}
            />
          </div>
        </div>

        <div className="story__captions">
          <div className="story__caption story__caption--operation">
            <p className="story__cap-title">{ui.system.inOperation}</p>
            <p className="story__cap-meta">
              {films.stationOperation.title}, {ui.system.frame("05:16").toLowerCase()}
            </p>
            <FilmDialogButton film={films.stationOperation} className="film-btn" />
          </div>
          <div ref={stCaption} className="story__caption story__caption--station">
            <p className="story__cap-title">{ui.system.cleanStation}</p>
            <p className="story__cap-meta">
              {films.cleanStation.title}, {ui.system.frame("00:22").toLowerCase()}
            </p>
            <FilmDialogButton film={films.cleanStation} className="film-btn" />
          </div>
        </div>
      </div>
    </div>
  );
}
