"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Close, Menu } from "./icons";

type NavItem = { id: string; index: string; label: string };
type Link = { display: string; href: string };

type HeaderNavProps = {
  items: readonly NavItem[];
  cta: { label: string; href: string };
  phone: Link;
  email: Link;
};

export function HeaderNav({ items, cta, phone, email }: HeaderNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Header state: transparent while the top 8px of the page is in view. Observed, not scroll-polled,
  // and written straight to <html data-top> so no React render happens while scrolling.
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;";
    document.body.prepend(sentinel);
    const observer = new IntersectionObserver(([entry]) => {
      document.documentElement.dataset.top = String(entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Scroll-spy: highlight the section currently crossing the reading line.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [items]);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  // Drawer: Escape to close, focus trap, scroll lock, auto-close when the desktop nav appears.
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
    const mq = window.matchMedia("(min-width: 80rem)");
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
      <nav aria-label="On this page" className="ml-auto hidden pr-1 xl:block">
        <ul className="flex items-center gap-7">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className="site-nav__link"
              >
                {item.label}
                <span aria-hidden="true" className="site-nav__bar" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a href={phone.href} className="site-header__phone hidden border-l border-current/20 pl-6 hover:text-signal-ink xl:block">
        {phone.display}
      </a>

      <a href={cta.href} className="btn btn-primary btn-compact ml-auto hidden sm:inline-flex xl:ml-0">
        {cta.label}
      </a>

      <button
        ref={menuButton}
        type="button"
        className="site-header__menu ml-auto sm:ml-0 xl:hidden"
        aria-expanded={open}
        aria-controls="site-drawer"
        onClick={() => setOpen(true)}
      >
        <Menu size={18} />
        Menu
      </button>

      {open ? (
        <div
          id="site-drawer"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Page navigation"
          className="on-ink fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain"
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-ink-line lg:h-[4.25rem]">
            <p className="t-label text-fog">On this page</p>
            <button type="button" onClick={close} className="site-header__menu">
              <Close size={18} />
              Close
            </button>
          </div>
          <ul className="shell flex-1 py-4">
            {items.map((item) => (
              <li key={item.id} className="border-b border-ink-line">
                <a href={`#${item.id}`} onClick={() => setOpen(false)} className="drawer-link">
                  <span className="t-meta text-signal-bright">{item.index}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="shell grid gap-5 border-t border-ink-line py-6">
            <a href={cta.href} onClick={() => setOpen(false)} className="btn btn-primary btn-lg w-full">
              {cta.label}
            </a>
            <div className="t-small flex flex-wrap gap-x-6 gap-y-2 text-fog">
              <a className="link" href={phone.href}>
                {phone.display}
              </a>
              <a className="link" href={email.href}>
                {email.display}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
