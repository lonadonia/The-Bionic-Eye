"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { filmLength, formatTime, type Film } from "@/content/media";
import { ui } from "@/content/ui";
import { Play } from "../icons";

type WatchVideoProps = {
  film: Film;
  sizes: string;
  className?: string;
  /** Classes for the frame (aspect ratio, height, motif). */
  frameClass?: string;
  /** Poster crop focal point (object-position). */
  focus?: string;
  /** Show the functional caption (file title and length) below the frame. */
  caption?: boolean;
  /** Visible label inside the frame; defaults to "Play film". */
  label?: string;
  /** Draw the corner-mark framing motif just outside the frame. */
  marks?: boolean;
};

/**
 * Click-to-watch film. Nothing is downloaded until the visitor asks: the frame shows a chosen
 * operational poster and a labelled play control, then swaps to native, keyboard-accessible video
 * controls (sound only where the file has it, never autoplayed with sound). Excerpts state their
 * length against the full film. Pauses itself when scrolled away.
 */
export function WatchVideo({
  film,
  sizes,
  className = "",
  frameClass = "aspect-video",
  focus,
  caption = true,
  label,
  marks = false,
}: WatchVideoProps) {
  const [active, setActive] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!active) return;
    const v = video.current;
    if (!v) return;
    v.focus();
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !v.paused) v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [active]);

  const length = filmLength(film);
  const objectPosition = focus ? { objectPosition: focus } : undefined;

  return (
    <figure className={`m-0 ${className}`}>
      <div className={marks ? "corner-marks" : "contents"}>
      <div className={`media-frame ${active ? "" : "is-playable"} ${frameClass}`}>
        {active ? (
          <video
            ref={video}
            src={film.src.large}
            poster={film.poster}
            controls
            autoPlay
            muted={!film.hasAudio}
            playsInline
            preload="auto"
            style={objectPosition}
            aria-label={`${film.title}. ${film.description}`}
          />
        ) : (
          <button type="button" onClick={() => setActive(true)} className="absolute inset-0 block w-full cursor-pointer text-left">
            <Image src={film.poster} alt="" fill sizes={sizes} className="object-cover" style={objectPosition} />
            <span className="play-chip">
              <span className="play-chip__icon" aria-hidden="true">
                <Play size={14} />
              </span>
              <span className="play-chip__label">{label ?? ui.film.play}</span>
              <span className="tnum font-medium opacity-80">{formatTime(film.duration)}</span>
              <span className="sr-only">
                {" "}
                — {film.title}, {length.toLowerCase()}
                {film.hasAudio ? `, ${ui.film.withSound}` : ""}. {film.description}
              </span>
            </span>
          </button>
        )}
      </div>
      </div>
      {caption ? (
        <figcaption className="media-caption">
          <span className="media-caption__title">{film.title}</span>
          <span className="media-caption__meta">
            {length}
            {film.hasAudio ? `, ${ui.film.withSound}` : ""}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
