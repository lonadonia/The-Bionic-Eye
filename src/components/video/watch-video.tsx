"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatTime, type Film } from "@/content/media";
import { Play } from "../icons";

type WatchVideoProps = {
  film: Film;
  sizes: string;
  /** Visual tone of the caption below the frame. */
  className?: string;
  titleClassName?: string;
};

/**
 * Click-to-watch film with sound. Nothing is downloaded until the visitor asks for it: the frame
 * shows an optimised poster and a labelled play control, then swaps to native, keyboard-accessible
 * video controls. Excerpts state their length against the full film.
 */
export function WatchVideo({ film, sizes, className = "", titleClassName = "t-h4" }: WatchVideoProps) {
  const [active, setActive] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (active) video.current?.focus();
  }, [active]);

  const meta = film.fullDuration
    ? `Excerpt · ${formatTime(film.duration)} of ${formatTime(film.fullDuration)}`
    : `Film · ${formatTime(film.duration)}`;

  return (
    <figure className={`m-0 ${className}`}>
      <div className="media-frame aspect-video">
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
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 block w-full text-left"
          >
            <Image
              src={film.poster}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-[var(--ease-precise)] group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" aria-hidden="true" />
            <span className="media-ctl absolute bottom-3 left-3 text-[0.875rem]">
              <Play size={16} />
              Play
              <span className="font-medium opacity-80">· {formatTime(film.duration)}</span>
              <span className="sr-only">
                {" "}
                — {film.title}, {meta.toLowerCase()}, with sound
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3.5 grid gap-1">
        <span className={titleClassName}>{film.title}</span>
        <span className="t-meta muted">{meta}</span>
      </figcaption>
    </figure>
  );
}
