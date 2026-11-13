"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "../Icons";
import { pad2 } from "@/lib/text";

export type ShowcaseItem = {
  title: string;
  text: string;
  image: string;
  focus: string; // point de zoom, ex. "50% 60%"
  icon: IconName;
};

/**
 * Défilement « image bloquée + texte qui défile » :
 * l'image reste épinglée pendant que les textes défilent à côté ; elle change et zoome vers un détail différent
 * à chaque domaine. Sur mobile, l'image reste collée en haut de l'écran.
 */
export default function StickyShowcase({ items, badge }: { items: ShowcaseItem[]; badge: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = items[active];
  const images = Array.from(new Set(items.map((i) => i.image)));
  const firstFocus = (src: string) => items.find((i) => i.image === src)!.focus;

  return (
    <div className="showcase">
      <div className="showcase__media">
        <div className="showcase__frame">
          {images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`showcase__img${src === cur.image ? " is-active" : ""}`}
              style={{ transformOrigin: src === cur.image ? cur.focus : firstFocus(src) }}
            />
          ))}
          <div className="showcase__shade" aria-hidden="true" />
          <span className="photo__badge">{badge}</span>
          <div className="showcase__meta" aria-hidden="true">
            <span className="showcase__count">
              <b>{pad2(active + 1)}</b> / {pad2(items.length)}
            </span>
            <span className="showcase__name" key={active}>
              {cur.title}
            </span>
          </div>
        </div>
      </div>

      <ol className="showcase__list">
        {items.map((it, i) => (
          <li
            key={it.title}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`showcase__item${i === active ? " is-active" : ""}`}
          >
            <div className="showcase__top">
              <span className="card__num">{pad2(i + 1)}</span>
              <Icon name={it.icon} className="card__icon" />
            </div>
            <h3 className="showcase__title">{it.title}</h3>
            <p className="showcase__text">{it.text}</p>
            <span className="showcase__rule" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </div>
  );
}
