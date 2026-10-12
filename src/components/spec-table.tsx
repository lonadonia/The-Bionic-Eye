"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import type { SpecGroup, SpecRow } from "@/content/specs";
import { ui } from "@/content/ui";
import { ChevronDown, Close, Search } from "./icons";

type Footnote = { mark: string; text: string };

/** Case- and accent-insensitive fold, one output character per input character where possible. */
const foldChar = (c: string) => c.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const fold = (s: string) => Array.from(s, foldChar).join("");

/** Wraps the first match of `q` in <mark>, mapping folded indices back to the original string. */
function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const chars = Array.from(text);
  if (chars.some((c) => foldChar(c).length !== 1)) return <>{text}</>;
  const at = chars.map(foldChar).join("").indexOf(q);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {chars.slice(0, at).join("")}
      <mark>{chars.slice(at, at + q.length).join("")}</mark>
      {chars.slice(at + q.length).join("")}
    </>
  );
}

const noteId = (mark: string) => `spec-note-${mark.length}`;

/**
 * The complete "Specifications of C10" datasheet — every row, unit and footnote, verbatim.
 * Desktop: two balanced columns of groups, always open, read like the printed sheet.
 * Phones: keyboard-operable disclosure groups (General open by default).
 * "Find a specification" filters all rows as you type (accent-insensitive, so "karcher" finds
 * "Kärcher"), highlights the match, opens matching groups and announces the result count.
 */
export function SpecTable({ groups, footnotes }: { groups: SpecGroup[]; footnotes: readonly Footnote[] }) {
  const uid = useId();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const q = fold(deferred.trim());
  const [open, setOpen] = useState<Set<string>>(() => new Set([groups[0].id]));

  const total = useMemo(() => groups.reduce((n, g) => n + g.rows.length, 0), [groups]);
  const filtered = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, rows: q ? g.rows.filter((r) => fold(r.label).includes(q) || fold(r.value).includes(q)) : g.rows }))
        .filter((g) => g.rows.length > 0),
    [groups, q],
  );
  const matchCount = filtered.reduce((n, g) => n + g.rows.length, 0);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const row = (r: SpecRow) => (
    <div key={r.label} className="spec-row">
      <dt>
        <Highlight text={r.label} q={q} />
        {r.mark ? (
          <a href={`#${noteId(r.mark)}`} className="spec-mark" aria-label={`see note ${r.mark.length}`}>
            {r.mark}
          </a>
        ) : null}
      </dt>
      <dd>
        <Highlight text={r.value} q={q} />
      </dd>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-3 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-[28rem]">
          <label htmlFor={`${uid}-q`} className="sr-only">
            {ui.specs.filterLabel}
          </label>
          <Search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate" />
          <input
            id={`${uid}-q`}
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            placeholder={`${ui.specs.filterLabel}…`}
            className="field__input search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && query) {
                e.preventDefault();
                setQuery("");
              }
            }}
            aria-describedby={`${uid}-count`}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-1.5 inline-flex min-h-9 -translate-y-1/2 items-center gap-1.5 rounded-[2px] px-2.5 text-[0.8125rem] font-semibold text-slate hover:text-ink"
            >
              <Close size={14} />
              {ui.specs.clear}
            </button>
          ) : null}
        </div>
        <p id={`${uid}-count`} className="t-meta muted md:text-right" aria-live="polite">
          {q ? ui.specs.matches(matchCount, total, deferred.trim()) : ui.specs.total(total, groups.length)}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="border-b border-line py-10">
          <p className="t-h4">{ui.specs.matches(0, total, deferred.trim())}</p>
          <p className="t-body muted mt-2">{ui.specs.noneHint}</p>
          <button type="button" className="btn btn-secondary btn-compact mt-5" onClick={() => setQuery("")}>
            {ui.specs.clear}
          </button>
        </div>
      ) : (
        <div className="gap-x-14 lg:columns-2">
          {filtered.map((g) => {
            const isOpen = Boolean(q) || open.has(g.id);
            const regionId = `${uid}-${g.id}`;
            const head = (
              <>
                <span>{g.title}</span>
                <span className="t-meta muted ml-auto font-medium">{ui.specs.groupCount(g.rows.length)}</span>
              </>
            );
            return (
              <section
                key={g.id}
                id={`spec-${g.id}`}
                aria-labelledby={`${regionId}-h`}
                className="break-inside-avoid pt-8 lg:pt-10"
              >
                <h3 id={`${regionId}-h`} className="t-h4">
                  <span className="spec-group__head hidden lg:flex">{head}</span>
                  <button
                    type="button"
                    className="spec-group__head lg:hidden"
                    aria-expanded={isOpen}
                    aria-controls={regionId}
                    onClick={() => toggle(g.id)}
                  >
                    {head}
                    <ChevronDown
                      size={18}
                      className={`shrink-0 self-center transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <dl id={regionId} className={isOpen ? "block" : "hidden lg:block"}>
                  {g.rows.map(row)}
                </dl>
              </section>
            );
          })}
        </div>
      )}

      <ol className="t-meta muted mt-10 grid gap-1.5" aria-label="Notes">
        {footnotes.map((n) => (
          <li key={n.mark} id={noteId(n.mark)} className="flex gap-2">
            <span className="w-5 shrink-0 text-signal-ink" aria-hidden="true">
              {n.mark}
            </span>
            {n.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
