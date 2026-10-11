"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatTime, type Film } from "@/content/media";
import { Pause, Play, SoundOff, SoundOn } from "../icons";
import { useReducedMotion } from "./use-reduced-motion";

export const CHAPTER_EVENT = "tbe:chapter";

export type Chapter = { id: string; label: string; time: number };

type HeroFilmProps = { film: Film; chapters: Chapter[] };

/**
 * The primary hero asset. Plays muted and looped while on screen (unless the visitor prefers
 * reduced motion or has paused it), keeps its burned-in title cards fully visible (no cropping),
 * and exposes chapter navigation that other sections can trigger via the CHAPTER_EVENT.
 */
export function HeroFilm({ film, chapters }: HeroFilmProps) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(film.duration);
  const [failed, setFailed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

  // Play while visible; pause when scrolled away (saves battery and bandwidth).
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (!userPaused.current && !prefersReduced) {
            v.play().catch((err: unknown) => {
              if (err instanceof DOMException && err.name === "NotAllowedError") setBlocked(true);
            });
          }
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const seek = useCallback((t: number, autoplay = true) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = t;
    setTime(t);
    if (autoplay) {
      userPaused.current = false;
      v.play().catch(() => undefined);
    }
  }, []);

  // Chapter links elsewhere on the page (Applications) jump to the matching moment in the film.
  useEffect(() => {
    const onChapter = (event: Event) => {
      const t = (event as CustomEvent<number>).detail;
      seek(t);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      frame.current?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
      frame.current?.focus({ preventScroll: true });
    };
    window.addEventListener(CHAPTER_EVENT, onChapter);
    return () => window.removeEventListener(CHAPTER_EVENT, onChapter);
  }, [seek]);

  const togglePlay = () => {
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

  const activeChapter = [...chapters].reverse().find((c) => time + 0.3 >= c.time)?.id;
  const progress = duration ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <figure className="m-0">
      <div
        ref={frame}
        tabIndex={-1}
        className="cropmarks bleed-mobile text-ink outline-none"
        aria-label={`Film: ${film.title}`}
        role="group"
      >
        <div className="media-frame aspect-video">
          <video
            ref={video}
            className="h-full w-full object-contain"
            poster={film.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-describedby="hero-film-desc"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || film.duration)}
            onError={() => setFailed(true)}
          >
            {film.src.small ? <source src={film.src.small} type="video/mp4" media="(max-width: 767px)" /> : null}
            <source src={film.src.large} type="video/mp4" />
          </video>

          {!playing && (reduced || failed || blocked) ? (
            <button
              type="button"
              onClick={togglePlay}
              disabled={failed}
              className="absolute inset-0 grid place-items-center bg-ink/25 text-paper transition-colors hover:bg-ink/35 disabled:cursor-not-allowed"
            >
              <span className="media-ctl text-[0.9375rem]">
                {failed ? (
                  "Film unavailable"
                ) : (
                  <>
                    <Play size={18} /> Play film · {formatTime(duration)}
                  </>
                )}
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 md:grid-cols-[auto_auto_1fr_auto]">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="media-btn"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? "Pause" : "Play"}
            <span className="sr-only"> film</span>
          </button>
          {film.hasAudio ? (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="media-btn"
            >
              {muted ? <SoundOff size={16} /> : <SoundOn size={16} />}
              {muted ? "Sound off" : "Sound on"}
              <span className="sr-only"> — toggle film sound</span>
            </button>
          ) : null}
        </div>

        <p className="t-meta justify-self-end md:justify-self-start">
          <span className="sr-only">Elapsed </span>
          {formatTime(time)} <span className="muted">/ {formatTime(duration)}</span>
        </p>

        <div className="relative col-span-2 md:col-span-1">
          <input
            type="range"
            className="scrubber relative z-10"
            min={0}
            max={duration || film.duration}
            step={0.1}
            value={time}
            aria-label="Seek film"
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
            style={{ ["--progress" as string]: `${progress}%` }}
            onChange={(e) => seek(Number(e.target.value), !video.current?.paused)}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {chapters.map((c) => (
              <span
                key={c.id}
                className={`absolute top-1/2 h-3 w-px -translate-y-1/2 ${activeChapter === c.id ? "bg-signal" : "bg-graphite"}`}
                style={{ left: `${(c.time / (duration || film.duration)) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <p className="t-meta muted col-span-2 md:col-span-1 md:text-right">
          {film.title} · ABZ Innovation
        </p>
      </div>

      <ol className="mt-5 grid grid-cols-2 border-t border-line lg:grid-cols-4" aria-label="Chapters in this film">
        {chapters.map((c, i) => {
          const isActive = activeChapter === c.id;
          return (
            <li key={c.id} className={`border-b border-line lg:border-b-0 ${i % 2 === 1 ? "border-l lg:border-l" : ""} ${i > 0 ? "lg:border-l" : ""}`}>
              <button
                type="button"
                onClick={() => seek(c.time)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex w-full items-baseline gap-3 px-3 py-3.5 text-left transition-colors lg:px-4 ${
                  isActive ? "text-ink" : "text-graphite hover:text-ink"
                }`}
              >
                <span className={`t-meta ${isActive ? "text-signal-deep" : ""}`}>{formatTime(c.time)}</span>
                <span className="text-[0.9375rem] leading-snug font-semibold">{c.label}</span>
                <span
                  aria-hidden="true"
                  className={`ml-auto hidden h-2 w-2 shrink-0 self-center sm:block ${isActive ? "bg-signal" : "bg-transparent"}`}
                />
              </button>
            </li>
          );
        })}
      </ol>

      <figcaption id="hero-film-desc" className="sr-only">
        {film.description}
      </figcaption>
    </figure>
  );
}
