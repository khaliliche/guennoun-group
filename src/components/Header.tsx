"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { Arrow } from "./Icons";
import { navPages, pathFor, type Locale, type PageId } from "@/content/site";
import type { Dict } from "@/content/fr";

type Props = {
  locale: Locale;
  page: PageId;
  nav: Dict["nav"];
  common: Dict["common"];
  descriptor: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header({ locale, page, nav, common, descriptor }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  // Ombre légère après défilement
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 160) setHidden(false);
      else if (y > last + 1) setHidden(true);
      else if (y < last - 1) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile accessible : verrouillage du défilement, focus piégé, Échap, retour du focus
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1180px)");
    const onMq = () => mq.matches && close();

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = previousOverflow;
      toggle?.focus();
    };
  }, [open, close]);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}`}>
        <div className="container site-header__inner">
          <Logo locale={locale} descriptor={descriptor} />

          <nav className="desktop-nav" aria-label={common.mainNav}>
            <ul className="nav-list">
              {navPages.map((p) => (
                <li key={p}>
                  <Link
                    className="nav-link"
                    href={pathFor(locale, p)}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {nav[p]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="desktop-actions">
            <LanguageSwitcher locale={locale} page={page} label={common.language} />
            <Link className="btn btn--outline btn--sm" href={pathFor(locale, "contact")}>
              {nav.cta}
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? common.closeMenu : common.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="mobile-menu on-dark"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={common.mainNav}
        >
          <div className="container mobile-menu__bar">
            <Logo locale={locale} descriptor={descriptor} variant="footer" />
            <button type="button" className="menu-toggle" aria-label={common.closeMenu} onClick={close}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
          <div className="container" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <nav aria-label={common.mainNav} className="mobile-menu__list">
              {navPages.map((p, i) => (
                <Link
                  key={p}
                  className="mobile-menu__link"
                  href={pathFor(locale, p)}
                  aria-current={p === page ? "page" : undefined}
                  onClick={close}
                >
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {nav[p]}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <LanguageSwitcher locale={locale} page={page} label={common.language} onNavigate={close} />
              <Link className="btn btn--solid-light" href={pathFor(locale, "contact")} onClick={close}>
                {nav.cta}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
