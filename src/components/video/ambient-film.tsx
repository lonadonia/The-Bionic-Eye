"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { filmLength, type Film } from "@/content/media";
import { ui } from "@/content/ui";
import { Expand, Pause, Play } from "../icons";
import { FilmDialogButton } from "./film-dialog";

type Connection = { saveData?: boolean };

type AmbientFilmProps = {
  film: Film;
  sizes: string;
  className?: string;
  /** Classes for the frame (aspect ratio or height). */
  frameClass?: string;
  /** Crop focal point (object-position) for the poster and the loop. */
  focus?: string;
  /** Show the caption (film title and the length of the full film). */
  caption?: boolean;
  /** Offer the complete film with sound in the media viewer (clicking the frame). */
  full?: boolean;
};

/**
 * Film that plays in place: a short silent loop cut from the same supplied film, muted and inline,
 * playing only while it is on screen (so several never compete off screen). The poster paints
 * first and stays when the visitor prefers reduced motion, has Save-Data on, or in the static
 * capture state. There is no label over the picture: on hover or keyboard focus two small icon
 * controls appear — pause/play (so moving content can always be stopped) and, where the full film
 * exists, "watch with sound", which opens it in the media viewer. Clicking the frame does the same.
 */
export function AmbientFilm({ film, sizes, className = "", frameClass = "aspect-video", focus, caption = true, full = true }: AmbientFilmProps) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const loop = film.loop!;
  const position = focus ? { objectPosition: focus } : undefined;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean((navigator as Navigator & { connection?: Connection }).connection?.saveData);
    const capture = document.documentElement.dataset.capture !== undefined;
    const autoplay = !reduced && !saveData && !capture;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && autoplay && !userPaused.current) v.play().catch(() => undefined);
        else if (!entry.isIntersecting && !v.paused) v.pause();
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

  return (
    <figure className={`ambient m-0 ${className}`}>
      <div className={`media-frame ambient__frame ${frameClass}`}>
        <Image src={loop.poster} alt={film.description} fill sizes={sizes} className="ambient__poster" style={position} />
        <video
          ref={video}
          className="ambient__video"
          data-started={started}
          src={loop.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          style={position}
          onPlaying={() => {
            setStarted(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        />
        {full ? (
          <FilmDialogButton film={film} className="ambient__open" showTime={false}>
            <span className="ambient__icon ambient__icon--open" aria-hidden="true">
              <Expand size={16} />
            </span>
            <span className="sr-only">{ui.film.watchWithSound}</span>
          </FilmDialogButton>
        ) : null}
        <button type="button" className="ambient__icon ambient__toggle" onClick={toggle}>
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span className="sr-only">
            {playing ? ui.film.pause : ui.film.play}, {film.title}
          </span>
        </button>
      </div>
      {caption ? (
        <figcaption className="media-caption ambient__caption">
          <span className="media-caption__title">{film.title}</span>
          <span className="media-caption__meta">
            {filmLength(film)}
            {film.hasAudio ? `, ${ui.film.withSound}` : ""}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
