"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Film } from "@/content/media";
import { ui } from "@/content/ui";
import { Pause, Play } from "../icons";

type HeroFilmProps = {
  film: Film;
  /** Server-rendered hero copy (kicker, headline, intro, actions). */
  children: ReactNode;
  /** Server-rendered benefit rail, laid out beside the film control. */
  rail: ReactNode;
};

/**
 * Hero film. The optimised poster is the LCP image and always paints first; the silent loop fades in
 * over it only once it has actually started playing, and only while the hero is on screen. Visitors who prefer
 * reduced motion keep the still (they can still choose Play). The film is decorative — the text
 * carries the content — so it is hidden from assistive technology; one labelled button pauses it
 * (WCAG 2.2.2), with a hairline that tracks playback.
 */
export function HeroFilm({ film, children, rail }: HeroFilmProps) {
  const video = useRef<HTMLVideoElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  // The film covers the poster from its first decoded frame on; pausing keeps the current frame.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current && !reduced.matches) {
          v.play().catch(() => undefined);
        } else if (!entry.isIntersecting && !v.paused) {
          v.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Progress hairline: one rAF loop, only while playing; writes a transform, never React state.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const v = video.current;
      if (v && progress.current && v.duration) {
        progress.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => undefined);
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <>
      <div className="hero__media" aria-hidden="true">
        <Image
          src={film.poster}
          alt=""
          fill
          preload
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="hero__poster"
        />
        <video
          ref={video}
          className="hero__video"
          data-started={started}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPlaying={() => setStarted(true)}
          onPause={() => setPlaying(false)}
        >
          {film.src.small ? <source src={film.src.small} type="video/mp4" media="(max-width: 767px)" /> : null}
          <source src={film.src.large} type="video/mp4" />
        </video>
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="shell hero__inner">
        {children}
        <div className="hero__rail hero-in" style={{ ["--i" as string]: 6 }}>
          {rail}
          <div className="film-ctl">
            <div className="film-ctl__meta t-meta text-white/75" aria-hidden="true">
              {ui.hero.filmLabel}
              <div className="film-ctl__track">
                <span ref={progress} className="film-ctl__progress" />
              </div>
            </div>
            <button
              type="button"
              onClick={toggle}
              className="film-ctl__btn"
              aria-label={playing ? ui.hero.pause : ui.hero.play}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
