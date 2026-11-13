"use client";

import { useInViewOnce } from "@/lib/hooks";

/**
 * Titre qui se révèle mot par mot (chaque mot monte derrière un masque).
 * Le texte complet reste lisible par les lecteurs d'écran ; sans JavaScript, tout est visible.
 */
export default function WordReveal({
  text,
  delay = 0,
  step = 65,
  immediate = false,
}: {
  text: string;
  delay?: number;
  step?: number;
  immediate?: boolean;
}) {
  const [ref, on] = useInViewOnce<HTMLSpanElement>({ immediate });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`wr${on ? " in" : ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="wr__m">
              <span className="wr__w" style={{ transitionDelay: `${delay + i * step}ms` }}>
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  );
}
