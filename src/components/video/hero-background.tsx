"use client";

import { useEffect, useRef, useState } from "react";
import type { Film } from "@/content/media";
import { Pause, Play } from "../icons";

/**
 * Full-bleed background film behind the hero headline. It is decorative (the text carries the
 * content), so the video is hidden from assistive technology. It plays muted and looped only while
 * visible, never for visitors who prefer reduced motion (the poster frame shows instead), and a
 * single icon button pauses or resumes it (WCAG 2.2.2).
 */
export function HeroBackground({ film }: { film: Film }) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (entry.isIntersecting && !userPaused.current && !prefersReduced) {
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
      <video
        ref={video}
        className="hero-video"
        poster={film.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {film.src.small ? <source src={film.src.small} type="video/mp4" media="(max-width: 767px)" /> : null}
        <source src={film.src.large} type="video/mp4" />
      </video>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="shell relative h-full">
          <button
            type="button"
            onClick={toggle}
            className="hero-toggle pointer-events-auto"
            aria-label={playing ? "Pause background film" : "Play background film"}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </div>
    </>
  );
}
