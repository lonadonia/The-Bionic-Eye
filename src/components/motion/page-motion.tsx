"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Page entrances (GSAP + ScrollTrigger), limited to the places where motion explains a
 * relationship between real visuals:
 * - Applications: media tiles arrive in a short stagger (75 ms, 22 px).
 * - The system: the product stage settles (700 ms), then the detail frames open and their
 *   callouts draw in after the image they belong to.
 * Everything is visible in the server HTML. Only elements still below the fold are prepared,
 * each plays once, and nothing runs with reduced motion or in the static capture state
 * (?capture=1). The cleaning-system scene manages itself (CleaningSystemStory).
 */
export function PageMotion() {
  useGSAP(() => {
    if (document.documentElement.dataset.capture !== undefined) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const below = (els: Element[]) => els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);

      const tiles = below(gsap.utils.toArray<HTMLElement>('[data-motion="stagger"]'));
      if (tiles.length) {
        gsap.set(tiles, { autoAlpha: 0, y: 22 });
        ScrollTrigger.batch(tiles, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.075, overwrite: true }),
        });
      }

      const stage = below(gsap.utils.toArray<HTMLElement>('[data-motion="stage"]'))[0];
      if (stage) {
        const details = gsap.utils.toArray<HTMLElement>('[data-motion="detail"]');
        const callouts = gsap.utils.toArray<HTMLElement>(
          '.explorer [data-motion="callout"]:not([data-hidden]), .details [data-motion="callout"]',
        );
        // Hand the elements back to CSS afterwards (view switching shows and hides callouts).
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
          onComplete: () => gsap.set([stage, ...details, ...callouts], { clearProps: "opacity,visibility,transform,clipPath" }),
        });
        tl.from(stage, { autoAlpha: 0, y: 32, duration: 0.7 })
          .from(details, { clipPath: "inset(0 0 100% 0 round 14px)", duration: 0.6, stagger: 0.12 }, "-=0.25")
          .from(callouts, { autoAlpha: 0, scale: 0.6, duration: 0.4, stagger: 0.08 }, "-=0.2");
        ScrollTrigger.create({ trigger: stage, start: "top 80%", once: true, onEnter: () => tl.play() });
      }
    });
    return () => mm.revert();
  });

  return null;
}
