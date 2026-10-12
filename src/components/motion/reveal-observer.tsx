"use client";

import { useEffect } from "react";

/**
 * One-shot scroll reveals for every `[data-reveal]` element on the page.
 *
 * Nothing is hidden in the server HTML. After hydration, only elements that are still below the
 * fold are set to their "pending" state (so nothing visible ever blinks out), and each one is
 * revealed once when it reaches the viewport — scrolling back up never replays it. Visitors who
 * prefer reduced motion, and browsers without IntersectionObserver, see everything immediately.
 *
 * Variants (value of data-reveal): "" — fade and 16px rise; "mask" / "mask-left" — the image
 * unclips upward / from the left. Stagger with the CSS custom property --reveal-delay.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const viewportBottom = window.innerHeight;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > viewportBottom * 0.92,
    );
    if (!targets.length) return;

    // A fully clipped element has no visible area, so masked elements are watched via their parent.
    const watched = new Map<Element, HTMLElement[]>();
    for (const el of targets) {
      const node = el.dataset.reveal?.startsWith("mask") && el.parentElement ? el.parentElement : el;
      watched.set(node, [...(watched.get(node) ?? []), el]);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const el of watched.get(entry.target) ?? []) el.dataset.revealState = "in";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    for (const el of targets) el.dataset.revealState = "pending";
    for (const node of watched.keys()) observer.observe(node);

    return () => {
      observer.disconnect();
      // Never leave content hidden if the observer is torn down (e.g. fast refresh in development).
      for (const el of targets) if (el.dataset.revealState === "pending") el.dataset.revealState = "in";
    };
  }, []);

  return null;
}
