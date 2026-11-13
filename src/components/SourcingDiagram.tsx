"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useInViewOnce } from "@/lib/hooks";

/** Route maritime ILLUSTRATIVE (de l'Italie vers Casablanca). Volontairement abstraite : aucune ville ni fournisseur nommés. */
const ROUTE = "M400 90 C 270 110, 170 170, 110 290";

const CONTAINER_COLORS = ["#b79b63", "#c9d0da", "#7c8898", "#e3d3a8", "#5f7699", "#c9d0da", "#b79b63"];

/** Cargo porte-conteneurs (vue de profil, proue à gauche). Dessiné autour de (0,0). */
function CargoShip() {
  const cols = 6;
  const boxes: { x: number; y: number; c: string }[] = [];
  for (let i = 0; i < cols; i++) {
    const rows = i === 0 ? 1 : i === 1 ? 2 : 3; // la proue est plus basse
    for (let r = 0; r < rows; r++) {
      boxes.push({ x: -37 + i * 8.6, y: -10 - r * 5.2, c: CONTAINER_COLORS[(i * 2 + r * 3) % CONTAINER_COLORS.length] });
    }
  }
  return (
    <g className="ship__bob">
      {/* eau et sillage */}
      <path className="ship__wave" d="M-56 9 q4 -3 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.9" />
      <path className="ship__wake" d="M40 8 q14 3 34 1" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4" />
      <path className="ship__wake" d="M38 10.5 q12 3 28 2" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 5" />
      <path d="M-46 3 q-5 2 -9 5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />

      {/* conteneurs */}
      {boxes.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width="8" height="5" fill={b.c} stroke="#0b1f3a" strokeWidth="0.45" />
      ))}

      {/* superstructure (passerelle) à l'arrière */}
      <rect x="18.5" y="-17" width="15" height="12" fill="#f4f6f9" stroke="#0b1f3a" strokeWidth="0.45" />
      <rect x="20.5" y="-23" width="11" height="6" fill="#e6eaf0" stroke="#0b1f3a" strokeWidth="0.45" />
      <rect x="21.5" y="-21.3" width="9" height="1.8" fill="#0b1f3a" />
      <rect x="20" y="-14.2" width="12" height="1.4" fill="#0b1f3a" opacity="0.55" />
      <rect x="20" y="-10.8" width="12" height="1.4" fill="#0b1f3a" opacity="0.55" />
      <rect x="28.5" y="-28" width="3.4" height="5" fill="#b79b63" stroke="#0b1f3a" strokeWidth="0.4" />
      <path d="M24 -23 V-30 M21.8 -28.2 H26.2" stroke="#c9d0da" strokeWidth="0.7" />

      {/* coque */}
      <path d="M-45 -5 L-41 7 H33.5 L38 -5 Z" fill="#17335c" stroke="#c9d0da" strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M-44.2 -2.6 H37" stroke="#b79b63" strokeWidth="1.1" />
      <path d="M-41.6 4.2 H34.6" stroke="#7a2e2e" strokeWidth="2" opacity="0.85" />
    </g>
  );
}

/**
 * Schéma illustratif Italie → Casablanca.
 * Le cargo avance sur la route au rythme du défilement ; le sillage se trace derrière lui.
 */
export default function SourcingDiagram({
  from,
  to,
  caption,
  sceneRef,
}: {
  from: string;
  to: string;
  caption: string;
  sceneRef?: RefObject<HTMLElement | null>;
}) {
  const [ref, on] = useInViewOnce<HTMLElement>({ margin: "0px 0px -15% 0px" });
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<SVGGElement>(null);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const fig = ref.current;
    const path = pathRef.current;
    const trail = trailRef.current;
    const ship = shipRef.current;
    if (!fig || !path || !trail || !ship) return;

    const len = path.getTotalLength();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trail.style.strokeDasharray = `${len}`;
    let raf = 0;
    let wasArrived = false;

    const place = (p: number) => {
      const pt = path.getPointAtLength(p * len);
      const a = path.getPointAtLength(Math.max(0, p * len - 2));
      const b = path.getPointAtLength(Math.min(len, p * len + 2));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI; // ≈ 130° (vers le bas-gauche)
      const tilt = Math.max(-5, Math.min(5, (angle - 180) * 0.12));
      ship.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${(pt.y - 9).toFixed(1)}) rotate(${tilt.toFixed(1)}) scale(1.6)`);
      trail.style.strokeDashoffset = `${len * (1 - p)}`;
      const done = p > 0.985;
      if (done !== wasArrived) {
        wasArrived = done;
        setArrived(done);
      }
    };

    const update = () => {
      raf = 0;
      if (reduce) return place(1);
      const scene = sceneRef?.current;
      if (scene) {
        // Scène épinglée : le cargo voyage entre 10 % et 82 % du défilement de la scène, puis reste à quai.
        const sr = scene.getBoundingClientRect();
        const total = sr.height - window.innerHeight;
        const prog = total > 0 ? Math.max(0, Math.min(1, -sr.top / total)) : 1;
        return place(Math.max(0, Math.min(1, (prog - 0.1) / 0.72)));
      }
      const r = fig.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      const p = Math.max(0, Math.min(1, (vh * 0.95 - center) / (vh * 0.55)));
      place(p);
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
  }, [ref, sceneRef]);

  const vLines: number[] = [];
  for (let i = 0; i <= 520; i += 40) vLines.push(i);

  return (
    <figure ref={ref} className={`diagram${on ? " in" : ""}${arrived ? " is-arrived" : ""}`} style={{ margin: 0 }}>
      <svg viewBox="0 0 520 380" role="img" aria-label={`${from} → ${to}`}>
        <rect x="0.5" y="0.5" width="519" height="379" fill="none" stroke="rgba(255,255,255,0.18)" />
        {vLines.map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="380" stroke="rgba(255,255,255,0.05)" />
        ))}
        {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} stroke="rgba(255,255,255,0.05)" />
        ))}

        {/* route complète (pointillés) et sillage parcouru */}
        <path ref={pathRef} d={ROUTE} fill="none" stroke="rgba(201,208,218,0.28)" strokeWidth="1" strokeDasharray="3 6" />
        <path ref={trailRef} d={ROUTE} fill="none" stroke="#e3d3a8" strokeWidth="1.4" strokeLinecap="round" />

        {/* ports de départ et d'arrivée */}
        {[
          { cx: 400, cy: 90, dest: false },
          { cx: 110, cy: 290, dest: true },
        ].map((pt) => (
          <g key={`${pt.cx}-${pt.cy}`} className={pt.dest ? "diagram__dest" : undefined}>
            <circle className="diagram__pulse" cx={pt.cx} cy={pt.cy} r="13" fill="none" stroke="#b79b63" strokeWidth="1">
              <animate attributeName="r" values="13;34" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="3.2s" repeatCount="indefinite" />
            </circle>
            {pt.dest && <circle className="diagram__arrive" cx={pt.cx} cy={pt.cy} r="13" fill="none" stroke="#e3d3a8" strokeWidth="1.4" />}
            <circle cx={pt.cx} cy={pt.cy} r="13" fill="none" stroke="#b79b63" strokeWidth="1" />
            <circle cx={pt.cx} cy={pt.cy} r="4" fill="#b79b63" />
          </g>
        ))}

        <text className="diagram__label" x="400" y="58" textAnchor="middle">
          {from}
        </text>
        <text className="diagram__label" x="110" y="330" textAnchor="middle">
          {to}
        </text>

        {/* le cargo (position fixée au chargement, puis pilotée par le défilement) */}
        <g ref={shipRef} className="ship" transform="translate(400 81) scale(1.6)">
          <CargoShip />
        </g>
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
