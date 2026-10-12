"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatTime, type Film } from "@/content/media";
import { Play } from "../icons";

type WatchVideoProps = {
  film: Film;
  sizes: string;
  className?: string;
  /** Frame aspect ratio classes. */
  frameClass?: string;
  /** Larger play control for a cinematic, full-width frame. */
  large?: boolean;
  /** Hide the caption below the frame (when the surrounding layout already titles the film). */
  caption?: boolean;
  /** Extra note after the duration, e.g. "With sound". */
  note?: string;
};

/**
 * Click-to-watch film with sound. Nothing is downloaded until the visitor asks for it: the frame
 * shows an optimised poster and a labelled play control, then swaps to native, keyboard-accessible
 * video controls. Excerpts state their length against the full film. Pauses itself when it is
 * hidden (e.g. its support tab is deselected).
 */
export function WatchVideo({
  film,
  sizes,
  className = "",
  frameClass = "aspect-video",
  large = false,
  caption = true,
  note,
}: WatchVideoProps) {
  const [active, setActive] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!active) return;
    const v = video.current;
    v?.focus();
    if (!v) return;
    // Stop playback when the film scrolls away or its container is hidden.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !v.paused) v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [active]);

  const length = film.fullDuration
    ? `Excerpt, ${formatTime(film.duration)} of ${formatTime(film.fullDuration)}`
    : `${formatTime(film.duration)}`;

  return (
    <figure className={`m-0 ${className}`}>
      <div className={`media-frame ${frameClass}`}>
        {active ? (
          <video
            ref={video}
            src={film.src.large}
            poster={film.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={`${film.title}. ${film.description}`}
          />
        ) : (
          <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 block w-full text-left">
            <Image
              src={film.poster}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[900ms] ease-[var(--ease-settle)] group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden="true" />
            <span className={`play-chip ${large ? "play-chip--lg" : ""}`}>
              <span className="play-chip__icon" aria-hidden="true">
                <Play size={large ? 16 : 14} />
              </span>
              Play film
              <span className="tnum font-medium opacity-75">{formatTime(film.duration)}</span>
              <span className="sr-only">
                {" "}
                — {film.title}, {length.toLowerCase()}, with sound
              </span>
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="t-label">{film.title}</span>
          <span className="t-meta muted">
            {length}
            {note ? `, ${note.toLowerCase()}` : ""}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
