"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/copy";
import { site } from "@/content/copy";
import { ui } from "@/content/ui";
import { ArrowUpRight, Close, Menu } from "./icons";

type HeaderNavProps = {
  items: readonly NavItem[];
  cta: { label: string; href: string };
};

const inPage = (item: NavItem) => !item.external && item.href !== "#top";

function NavLink({
  item,
  className,
  current,
  onNavigate,
}: {
  item: NavItem;
  className: string;
  current?: boolean;
  onNavigate?: () => void;
}) {
  if (item.external) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noopener" onClick={onNavigate}>
        {item.label}
        <ArrowUpRight size={15} />
        <span className="sr-only"> {ui.header.external}</span>
      </a>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onNavigate} aria-current={current ? "location" : undefined}>
      {item.label}
    </a>
  );
}

export function HeaderNav({ items, cta }: HeaderNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Scroll-spy for the labels that have a section on this page. Observed, never scroll-polled.
  useEffect(() => {
    const targets = items
      .filter(inPage)
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    const top = document.getElementById("top");
    const topObserver = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(null), {
      rootMargin: "-45% 0px -50% 0px",
    });
    if (top) topObserver.observe(top);
    return () => {
      observer.disconnect();
      topObserver.disconnect();
    };
  }, [items]);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  // Drawer: Escape closes, focus stays inside, page scroll is locked, desktop width closes it.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 74rem)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <>
      <nav aria-label="Main" className="site-nav">
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <NavLink item={item} className="site-nav__link" current={active === item.href} />
            </li>
          ))}
        </ul>
      </nav>

      <a href={cta.href} className="btn btn-primary btn-compact site-header__cta">
        {cta.label}
      </a>

      <button
        ref={menuButton}
        type="button"
        className="site-header__menu"
        aria-expanded={open}
        aria-controls="site-drawer"
        onClick={() => setOpen(true)}
      >
        <Menu size={18} />
        {ui.header.menu}
      </button>

      {open ? (
        <div id="site-drawer" ref={panel} role="dialog" aria-modal="true" aria-label={ui.header.menuTitle} className="drawer">
          <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-deep-line">
            <p className="t-label text-on-deep-2">{ui.header.menuTitle}</p>
            <button type="button" onClick={close} className="site-header__menu ml-0">
              <Close size={18} />
              {ui.header.close}
            </button>
          </div>
          <nav aria-label="Main" className="shell flex-1 py-3">
            <ul>
              {items.map((item) => (
                <li key={item.label} className="border-b border-deep-line">
                  <NavLink item={item} className="drawer__link" onNavigate={() => setOpen(false)} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="shell grid gap-5 border-t border-deep-line py-6">
            <a href={cta.href} onClick={() => setOpen(false)} className="btn btn-primary w-full">
              {cta.label}
            </a>
            <p className="t-label flex flex-wrap gap-x-6 gap-y-2">
              <a className="link" href={site.phone.href}>
                {site.phone.display}
              </a>
              <a className="link" href={site.email.href}>
                {site.email.display}
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
