"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { filmLength, formatTime, type Film } from "@/content/media";
import { ui } from "@/content/ui";
import { Close, Play } from "../icons";

type FilmDialogButtonProps = {
  film: Film;
  /** Visible label; defaults to "Play film". */
  label?: string;
  className?: string;
  /** Show the running time beside the label. */
  showTime?: boolean;
  children?: ReactNode;
};

/**
 * Media viewer. A button opens the supplied film in a native modal <dialog>: the browser traps
 * focus, Escape closes it and focus returns to the button. The video element (native controls,
 * sound where the file has it) only exists while the dialog is open, so nothing is downloaded
 * until the visitor asks for it and nothing keeps playing after it closes.
 */
export function FilmDialogButton({ film, label, className = "", showTime = true, children }: FilmDialogButtonProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const titleId = `film-${film.id}-title`;

  return (
    <>
      <button ref={trigger} type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {children ?? (
          <>
            <span className="film-btn__icon" aria-hidden="true">
              <Play size={14} />
            </span>
            <span>{label ?? ui.film.play}</span>
            {showTime ? <span className="film-btn__time tnum">{formatTime(film.duration)}</span> : null}
          </>
        )}
        <span className="sr-only">
          {" "}
          — {film.title}, {filmLength(film).toLowerCase()}
          {film.hasAudio ? `, ${ui.film.withSound}` : ""}
        </span>
      </button>

      <dialog
        ref={dialog}
        className="viewer"
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          // A click on the backdrop (the dialog box itself, outside the panel) closes it.
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {open ? (
          <div className="viewer__panel">
            <div className="viewer__bar">
              <p id={titleId} className="viewer__title">
                {film.title}
                <span className="viewer__meta tnum">
                  {filmLength(film)}
                  {film.hasAudio ? `, ${ui.film.withSound}` : ""}
                </span>
              </p>
              <button type="button" className="viewer__close" onClick={() => setOpen(false)} autoFocus>
                <Close size={18} />
                <span className="sr-only">{ui.film.close}</span>
              </button>
            </div>
            <div className="viewer__frame">
              <video
                src={film.src.large}
                poster={film.poster}
                controls
                autoPlay
                playsInline
                preload="auto"
                aria-label={`${film.title}. ${film.description}`}
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
