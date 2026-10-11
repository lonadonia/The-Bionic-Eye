"use client";

import { useId, useState } from "react";
import type { SpecGroup as SpecGroupData } from "@/content/specs";
import { ArrowDown } from "./icons";
import { useMediaQuery } from "./use-media-query";

type Props = { group: SpecGroupData; index: string; collapsedOnMobile: boolean };

/**
 * One datasheet group. Always fully open from 1024px up (the panel is read like a printed sheet);
 * on smaller screens the later groups start collapsed so the key figures and first group lead.
 */
export function SpecGroup({ group, index, collapsedOnMobile }: Props) {
  const isCompact = useMediaQuery("(max-width: 63.98rem)");
  // null = the visitor has not toggled yet, so the viewport decides the default.
  const [toggled, setToggled] = useState<boolean | null>(null);
  const open = toggled ?? !(collapsedOnMobile && isCompact);
  const setOpen = (next: (current: boolean) => boolean) => setToggled(next(open));
  const regionId = useId();

  const heading = (
    <>
      <span className="t-meta t-index text-signal-deep">{index}</span>
      <span>{group.title}</span>
      <span className="t-meta muted ml-auto font-medium">{group.rows.length} items</span>
    </>
  );

  return (
    <section id={`spec-${group.id}`} aria-labelledby={`${regionId}-h`} className="scroll-mt-28 break-inside-avoid">
      <h4 id={`${regionId}-h`} className="t-h4 border-b border-ink">
        <span className="hidden items-baseline gap-3 pb-3 lg:flex">{heading}</span>
        <button
          type="button"
          className="flex w-full items-baseline gap-3 py-3.5 text-left lg:hidden"
          aria-expanded={open}
          aria-controls={regionId}
          onClick={() => setOpen((o) => !o)}
        >
          {heading}
          <ArrowDown size={16} className={`shrink-0 self-center transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </h4>
      <dl id={regionId} className={open ? "block" : "hidden lg:block"}>
        {group.rows.map((row) => (
          <div key={row.label} className="spec-row">
            <dt>
              {row.label}
              {row.mark ? (
                <sup className="ml-0.5 text-signal-deep" aria-label={row.mark === "*" ? "see note 1" : "see note 2"}>
                  {row.mark}
                </sup>
              ) : null}
            </dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
