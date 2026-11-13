"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Image de fond du bandeau partenariat : zoom arrière et glissement lent pendant le défilement. */
export default function CtaBackdrop({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.32, 1.14]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="cta-wrap__box" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img src={src} alt="" className="cta-wrap__bg" loading="lazy" decoding="async" style={reduce ? undefined : { scale, y }} />
    </div>
  );
}
