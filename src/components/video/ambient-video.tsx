"use client";

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
};

/**
 * Muted, looping field footage that plays only while visible and never for visitors who prefer
 * reduced motion. A control bar sits below the frame (never over burned-in titles or watermarks)
 * with a visible pause control (WCAG 2.2.2) and, where the file has audio, a sound toggle.
 */
export function AmbientVideo({ film, frameClass = "aspect-video", className = "", focus }: AmbientVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

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

  const meta = film.fullDuration
    ? `Excerpt · ${formatTime(film.duration)} of ${formatTime(film.fullDuration)}`
    : `Video · ${formatTime(film.duration)}`;

  return (
    <figure className={`m-0 flex flex-col ${className}`}>
      <div className={`media-frame ${frameClass}`}>
        <video
          ref={video}
          poster={film.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={film.description}
          style={focus ? { objectPosition: focus } : undefined}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={film.src.large} type="video/mp4" />
        </video>
      </div>
      <figcaption className="media-bar">
        <span className="flex gap-2">
          <button type="button" onClick={toggle} className="media-btn">
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {playing ? "Pause" : "Play"}
            <span className="sr-only"> video</span>
          </button>
          {film.hasAudio ? (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="media-btn"
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
            >
              {muted ? <SoundOff size={15} /> : <SoundOn size={15} />}
            </button>
          ) : null}
        </span>
        <span className="t-meta muted">{meta}</span>
      </figcaption>
    </figure>
  );
}
