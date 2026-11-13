"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Le héros réagit au défilement : le texte s'estompe en montant, l'image descend plus lentement (profondeur). */
export default function HeroScroll({
  kind,
  className = "",
  children,
}: {
  kind: "text" | "media";
  className?: string;
  children: ReactNode;
}) {
  const reduce = !!useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], kind === "media" ? [0, 110] : [0, -70]);
  const opacity = useTransform(scrollY, [0, 620], [1, kind === "media" ? 0.85 : 0.15]);
  return (
    <motion.div className={className} style={reduce ? undefined : { y, opacity }}>
      {children}
    </motion.div>
  );
}
