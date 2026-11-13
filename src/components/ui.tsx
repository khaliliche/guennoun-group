import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Icons";
import Reveal from "./Reveal";
import RevealBox from "./fx/RevealBox";
import WordReveal from "./fx/WordReveal";
import CtaBackdrop from "./fx/CtaBackdrop";
import { pathFor, type Locale } from "@/content/site";
import { getDict } from "@/content";
import { splitTitle } from "@/lib/text";

export function Button({
  href,
  variant = "solid-navy",
  small = false,
  children,
}: {
  href: string;
  variant?: "solid-navy" | "solid-light" | "outline";
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <Link className={`btn btn--${variant}${small ? " btn--sm" : ""}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="link-arrow" href={href}>
      {children}
      <Arrow />
    </Link>
  );
}

export function SectionHead({
  label,
  title,
  intro,
  id,
}: {
  label: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{label}</p>
      <h2 className="h2" id={id}>
        <WordReveal text={title} />
      </h2>
      {intro && <p className="lead">{intro}</p>}
    </Reveal>
  );
}

/** Emplacement photo : clairement identifié comme temporaire. Aucune fausse image d'activité réelle. */
export function PhotoPlaceholder({ locale, wide = false }: { locale: Locale; wide?: boolean }) {
  const c = getDict(locale).common;
  return (
    <div className={`placeholder${wide ? " placeholder--wide" : ""}`} role="img" aria-label={`${c.placeholderTitle}. ${c.placeholderText}`}>
      <span className="placeholder__corner" aria-hidden="true" />
      <span className="placeholder__corner placeholder__corner--end" aria-hidden="true" />
      <span className="placeholder__badge" aria-hidden="true">
        {c.placeholderTitle}
      </span>
      <p className="placeholder__title" aria-hidden="true">
        {c.placeholderTitle}
      </p>
      <p className="placeholder__text" aria-hidden="true">
        {c.placeholderText}
      </p>
    </div>
  );
}

export type ImageKey = "garage" | "logistics" | "tower" | "boardroom";

/**
 * Image ILLUSTRATIVE (non issue de GUENNOUN GROUP) : toujours signalée par un badge.
 * À remplacer par des photographies authentiques de l'entreprise.
 */
export function ConceptImage({
  locale,
  name,
  ratio = "4 / 5",
  position = "center",
  delay = 0,
  immediate = false,
}: {
  locale: Locale;
  name: ImageKey;
  ratio?: string;
  position?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const c = getDict(locale).common;
  return (
    <RevealBox className="photo" style={{ aspectRatio: ratio }} delay={delay} immediate={immediate}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/${name}.jpg`} alt={c.imageAlt[name]} loading="lazy" decoding="async" style={{ objectPosition: position }} />
      <span className="photo__badge">{c.conceptualImage}</span>
    </RevealBox>
  );
}

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <i />
      <i />
    </div>
  );
}

export function PageHero({ label, title, intro }: { label: string; title: string; intro: string }) {
  return (
    <section className="page-hero on-dark">
      <Aurora />
      <div className="container">
        <p className="hero__label">{label}</p>
        <h1 className="page-hero__title">
          <WordReveal text={title} immediate delay={150} step={70} />
        </h1>
        <p className="page-hero__intro">{intro}</p>
      </div>
    </section>
  );
}

export function CtaBand({
  locale,
  title,
  text,
  buttonLabel,
  partnership = true,
  bg,
}: {
  locale: Locale;
  title: string;
  text: string;
  buttonLabel: string;
  partnership?: boolean;
  bg?: ImageKey;
}) {
  const href = pathFor(locale, "contact") + (partnership ? "?category=partnership" : "");
  return (
    <section className="section--night on-dark cta-wrap">
      {bg && <CtaBackdrop src={`/images/${bg}.jpg`} />}
      <Reveal className="container cta-band">
        <span className="cta-band__rule" aria-hidden="true" />
        <h2>
          <WordReveal text={title} step={80} />
        </h2>
        <p>{text}</p>
        <Button href={href} variant="solid-light">
          {buttonLabel}
        </Button>
      </Reveal>
    </section>
  );
}

export function HeroTitle({ title }: { title: string }) {
  return (
    <h1 className="hero__title" id="hero-title">
      {splitTitle(title).map((line, i) => (
        <span key={line}>
          <WordReveal text={line} immediate delay={250 + i * 520} step={85} />
        </span>
      ))}
    </h1>
  );
}

export { Aurora };
