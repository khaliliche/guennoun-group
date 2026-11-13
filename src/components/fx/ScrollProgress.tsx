"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Fine ligne champagne en haut de page, qui se remplit au fil de la lecture. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
