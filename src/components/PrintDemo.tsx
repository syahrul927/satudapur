"use client";

import { useEffect, useRef, useState } from "react";

/* Auto-print demo: an online order chip arrives, then a kitchen ticket
   prints out of the slot and unrolls. One story, loops with a fade.

   Beats (all timings in one effect so they stay in sync):
   1. order chip slides in                      t=0
   2. receipt emerges from the slot             t=900
   3. receipt holds, fully printed              t=900+1100
   4. fade out, reset, loop                     t=3400 (loop length) */

type Job = { platform: "grab" | "gofood" | "shopee"; label: string; id: string; item: string; qty: number };

const JOBS: Job[] = [
  { platform: "grab", label: "GrabFood", id: "#1042", item: "Ayam Geprek", qty: 2 },
  { platform: "gofood", label: "GoFood", id: "#2301", item: "Nasi Padang Rendang", qty: 1 },
  { platform: "shopee", label: "ShopeeFood", id: "#871", item: "Dimsum (3)", qty: 1 },
];

const LOOP_MS = 3400;

export default function PrintDemo() {
  const [jobIdx, setJobIdx] = useState(0);
  const [phase, setPhase] = useState<"order" | "printing" | "done" | "reset">("order");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      /* static final state: receipt fully printed */
      setPhase("done");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;
    const schedule = (fn: () => void, ms: number) =>
      timers.push(setTimeout(() => !cancelled && fn(), ms));

    const runLoop = () => {
      setPhase("order");
      schedule(() => setPhase("printing"), 900);
      schedule(() => setPhase("done"), 2000);
      schedule(() => {
        /* fade the whole stage, then swap content while invisible */
        root.animate(
          [
            { opacity: 1 },
            { opacity: 0 },
          ],
          { duration: 280, easing: "ease-in", fill: "forwards" }
        );
        schedule(() => {
          setJobIdx((i) => (i + 1) % JOBS.length);
          setPhase("order");
          root.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 240,
            easing: "ease-out",
            fill: "forwards",
          });
        }, 300);
      }, LOOP_MS);
      schedule(runLoop, LOOP_MS + 320);
    };
    runLoop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const job = JOBS[jobIdx];

  return (
    <div className="fdemo print-demo" ref={rootRef}>
      <div
        className={`pd-order${phase !== "order" ? " arrived" : ""}`}
        aria-hidden="true"
      >
        <span className={`pd-plat ${job.platform}`} />
        <span className="pd-oid">
          {job.label} <b>{job.id}</b>
        </span>
        <span className="pd-item">
          {job.qty}× {job.item}
        </span>
      </div>

      <div className="pd-printer" aria-hidden="true">
        <div className="pd-slab">
          <span className="pd-slot" />
        </div>
        <div className={`pd-receipt-wrap${phase === "order" ? "" : " open"}`}>
          <div className="pd-receipt">
            <span className="pd-rhead">— DAPUR —</span>
            <span className="pd-rrow">
              {job.qty}× {job.item}
            </span>
            <span className="pd-rdash" />
            <span className="pd-rrow pd-rtotal">Pesanan {job.id}</span>
          </div>
        </div>
      </div>

      <p className="pd-note">
        {phase === "order" ? "Pesanan masuk…" : "Tercetak otomatis ke dapur ✓"}
      </p>
    </div>
  );
}
