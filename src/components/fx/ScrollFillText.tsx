"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({
  word,
  range,
  progress,
  reduce,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="fill__w" style={reduce ? undefined : { opacity }}>
      {word}
    </motion.span>
  );
}

/** Paragraphe dont les mots « s'allument » un à un au fil du défilement. */
export default function ScrollFillText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });
  const words = text.split(" ");
  const n = words.length;
  return (
    <p ref={ref} className="fill">
      {words.map((w, i) => {
        const start = i / n;
        const end = Math.min(1, start + 3 / n);
        return (
          <span key={i}>
            <Word word={w} range={[start, end]} progress={scrollYProgress} reduce={reduce} />
            {i < n - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
