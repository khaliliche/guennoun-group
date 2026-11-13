"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInViewOnce } from "@/lib/hooks";

/** Effet « rideau » : l'image se dévoile de haut en bas avec un léger zoom arrière. */
export default function RevealBox({
  className = "",
  style,
  delay = 0,
  immediate = false,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  delay?: number;
  immediate?: boolean;
  children: ReactNode;
}) {
  const [ref, on] = useInViewOnce<HTMLDivElement>({ immediate });
  return (
    <div
      ref={ref}
      className={`${className} curtain${on ? " in" : ""}`}
      style={{ ...style, ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
