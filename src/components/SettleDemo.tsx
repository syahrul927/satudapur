"use client";

import { useEffect, useRef, useState } from "react";

/* Settlement demo: bars grow and rupiah values count up when scrolled
   into view. The payoff row ("Estimasi cair") lands last, then holds —
   no loop; the story ends where it should. */

const fmt = new Intl.NumberFormat("id-ID");

type Row = { key: "omzet" | "komisi" | "cair"; label: string; value: number; pct: number };

const ROWS: Row[] = [
  { key: "omzet", label: "Omzet kotor", value: 1_240_000, pct: 100 },
  { key: "komisi", label: "Komisi ±20%", value: 248_000, pct: 20 },
  { key: "cair", label: "Estimasi cair", value: 992_000, pct: 80 },
];

const DUR = 1100;
const STAGGER = 180;

export default function SettleDemo() {
  const [run, setRun] = useState(0); /* increments once on first view */
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || reduced) {
      setRun((r) => r + 1); /* jump to final state */
      started.current = true;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started.current) {
          started.current = true;
          setRun((r) => r + 1);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div className="fdemo settle-demo" ref={rootRef}>
      <div className="settle" key={run}>
        {ROWS.map((row, i) => (
          <SettleRow key={row.key} row={row} idx={i} run={run} />
        ))}
      </div>
    </div>
  );
}

function SettleRow({ row, idx, run }: { row: Row; idx: number; run: number }) {
  const [n, setN] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (run === 0) return; /* not in view yet */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = idx * STAGGER;

    if (reduced) {
      setN(row.value);
      return;
    }

    let raf = 0;
    const t = setTimeout(() => {
      barRef.current?.animate(
        [{ width: "0%" }, { width: `${row.pct}%` }],
        { duration: DUR, easing: "cubic-bezier(.23,1,.32,1)", fill: "both" }
      );
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / DUR);
        const eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
        setN(Math.round(row.value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [run, row.value, idx]);

  const sign = row.key === "komisi" ? "−" : "";
  return (
    <div className={`srow ${row.key}`}>
      <span className="slabel">{row.label}</span>
      <span className="sbar">
        <span className="sfill" style={{ width: `${row.pct}%` }} ref={barRef} />
      </span>
      <span className="sval">
        {sign}Rp {fmt.format(n)}
      </span>
    </div>
  );
}
