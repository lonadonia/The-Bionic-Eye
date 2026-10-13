"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Film } from "@/content/media";
import { ui } from "@/content/ui";
import { Pause, Play } from "../icons";

type Connection = { saveData?: boolean };

/**
 * Hero film. The optimised poster is the LCP image and always paints first; the silent loop
 * fades in over it only once it is actually playing, and only while the hero is on screen.
 * Reduced motion, Save-Data and the static capture state keep the poster (the visitor can still
 * press Play). Nothing is fetched until playback starts. The film is decorative (the copy
 * carries the content), so only its control is exposed to assistive technology. The control
 * follows actual playback (the "playing" event), so it never claims a film is running when the
 * browser cannot play it.
 */
export function HeroFilm({ film }: { film: Film }) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean((navigator as Navigator & { connection?: Connection }).connection?.saveData);
    const capture = document.documentElement.dataset.capture !== undefined;
    const autoplay = !reduced && !saveData && !capture;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && autoplay && !userPaused.current) {
          v.play().catch(() => undefined);
        } else if (!entry.isIntersecting && !v.paused) {
          v.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

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
    <div className="hero__media">
      <Image
        src={film.poster}
        alt=""
        fill
        preload
        fetchPriority="high"
        quality={75}
        sizes="(min-width: 64rem) 100vw, (min-width: 40rem) 92vw, 100vw"
        className="hero__poster"
      />
      <video
        ref={video}
        className="hero__video"
        data-started={started}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        onPlaying={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      >
        {film.src.small ? <source src={film.src.small} type="video/mp4" media="(max-width: 767px)" /> : null}
        <source src={film.src.large} type="video/mp4" />
      </video>
      <div className="hero__scrim" aria-hidden="true" />
      <button type="button" onClick={toggle} className="film-control">
        <span className="film-control__icon" aria-hidden="true">
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </span>
        <span>{playing ? ui.film.pause : ui.film.play}</span>
        <span className="sr-only">, {ui.film.heroName}</span>
      </button>
    </div>
  );
}
