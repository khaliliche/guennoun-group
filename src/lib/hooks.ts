"use client";

import { useEffect, useRef, useState } from "react";

/** Passe à `true` une seule fois, quand l'élément entre dans l'écran (ou juste après le chargement si `immediate`). */
export function useInViewOnce<T extends Element>(opts: { margin?: string; immediate?: boolean } = {}) {
  const { margin = "0px 0px -10% 0px", immediate = false } = opts;
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (immediate || !("IntersectionObserver" in window)) {
      const t = window.setTimeout(() => setOn(true), 40);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, immediate]);

  return [ref, on] as const;
}
