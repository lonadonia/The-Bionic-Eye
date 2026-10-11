"use client";

import { formatTime } from "@/content/media";
import { Play } from "./icons";
import { CHAPTER_EVENT } from "./video/hero-film";

/** Jumps the hero film to the moment an application is introduced on screen. */
export function ChapterLink({ time, label }: { time: number; label: string }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent<number>(CHAPTER_EVENT, { detail: time }));
      }}
      className="t-meta group/ch inline-flex min-h-10 items-center gap-2 text-graphite transition-colors hover:text-signal-deep"
    >
      <span className="inline-grid h-6 w-6 place-items-center border border-current">
        <Play size={11} />
      </span>
      <span>
        In the film <span className="text-ink group-hover/ch:text-signal-deep">{formatTime(time)}</span>
        <span className="sr-only"> — play the {label} chapter</span>
      </span>
    </a>
  );
}
