"use client";

import { useEffect, useRef } from "react";
import SourcingDiagram from "./SourcingDiagram";

/** Mots qui passent de « estompé » à « net » selon la progression de la scène (--p). */
function FillWords({ text, from, to }: { text: string; from: number; to: number }) {
  const words = text.split(" ");
  const n = words.length;
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="fw" style={{ ["--s" as string]: (from + ((to - from) * i) / n).toFixed(3) }}>
            {w}
          </span>
          {i < n - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/**
 * Scène épinglée : la section reste bloquée à l'écran pendant que l'on défile.
 * Pendant ce temps le cargo avance de l'Italie vers Casablanca et le texte devient net, mot après mot.
 */
export default function SourcingScene({
  label,
  title,
  text,
  from,
  to,
  caption,
}: {
  label: string;
  title: string;
  text: string;
  from: string;
  to: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section--navy on-dark" aria-labelledby="sourcing-title">
      <div ref={ref} className="scene">
        <div className="scene__pin">
          <div className="container">
            <div className="sourcing">
              <div className="sourcing__text">
                <p className="eyebrow">{label}</p>
                <h2 className="h2" id="sourcing-title">
                  <FillWords text={title} from={0.02} to={0.26} />
                </h2>
                <p className="lead">
                  <FillWords text={text} from={0.24} to={0.74} />
                </p>
                <div className="scene__bar" aria-hidden="true">
                  <i />
                </div>
              </div>
              <SourcingDiagram from={from} to={to} caption={caption} sceneRef={ref} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
