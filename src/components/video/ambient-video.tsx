"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatTime, type Film } from "@/content/media";
import { Pause, Play, SoundOff, SoundOn } from "../icons";

type AmbientVideoProps = {
  film: Film;
  /** Classes for the frame: aspect ratio and any responsive sizing, e.g. "aspect-video". */
  frameClass?: string;
  className?: string;
  /** Focal point when the frame crops the footage (object-position). */
  focus?: string;
  /** Rendered width hint for the poster (next/image `sizes`). */
  sizes?: string;
};

/**
 * Muted, looping field footage that plays only while visible and never for visitors who prefer
 * reduced motion. The poster is a lazy, optimised image (it never competes with the hero for
 * bandwidth); the film fades in over it once playing. A slim caption bar sits below the frame
 * (never over burned-in titles or watermarks) with a visible pause control (WCAG 2.2.2) and,
 * where the file has audio, a sound toggle.
 */
export function AmbientVideo({
  film,
  frameClass = "aspect-video",
  className = "",
  focus,
  sizes = "(min-width: 64rem) 66vw, 100vw",
}: AmbientVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  // Once the film has shown a frame it stays visible, so pausing never snaps back to the poster.
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

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
      { threshold: 0.35 },
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

  const length = film.fullDuration
    ? `Excerpt, ${formatTime(film.duration)} of ${formatTime(film.fullDuration)}`
    : formatTime(film.duration);

  return (
    <figure className={`m-0 flex flex-col ${className}`}>
      <div className={`media-frame ${frameClass}`}>
        <Image src={film.poster} alt="" fill sizes={sizes} className="object-cover" style={focus ? { objectPosition: focus } : undefined} />
        <video
          ref={video}
          className="ambient-video"
          data-started={started}
          muted
          loop
          playsInline
          preload="none"
          aria-label={film.description}
          style={focus ? { objectPosition: focus } : undefined}
          onPlay={() => setPlaying(true)}
          onPlaying={() => setStarted(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={film.src.large} type="video/mp4" />
        </video>
      </div>
      <figcaption className="media-caption">
        <span className="flex gap-2">
          <button type="button" onClick={toggle} className="media-btn">
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? "Pause" : "Play"}
            <span className="sr-only"> {film.title}</span>
          </button>
          {film.hasAudio ? (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="media-btn"
              aria-label={muted ? `Turn sound on for ${film.title}` : `Turn sound off for ${film.title}`}
              aria-pressed={!muted}
            >
              {muted ? <SoundOff size={15} /> : <SoundOn size={15} />}
            </button>
          ) : null}
        </span>
        <span className="t-meta text-right">
          <span className="font-display font-semibold">{film.title}</span>
          <span className="muted"> — {length}</span>
        </span>
      </figcaption>
    </figure>
  );
}
