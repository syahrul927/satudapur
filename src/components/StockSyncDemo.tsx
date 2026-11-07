"use client";

import { useEffect, useRef, useState } from "react";

const DELAYS = [0, 70, 140]; /* stagger: Grab, GoFood, Shopee */

const PLATFORMS = [
  { key: "grab", label: "GrabFood" },
  { key: "gofood", label: "GoFood" },
  { key: "shopee", label: "ShopeeFood" },
];

export default function StockSyncDemo() {
  const [habis, setHabis] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);

  /* DOM-driven pill stagger + WAAPI pulse, keyed off state (not DOM listener —
     native listener fires before React updates aria-checked, causing off-by-one) */
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pills = Array.from(
      demoRef.current?.querySelectorAll<HTMLSpanElement>(".pill") ?? []
    );
    const note = noteRef.current;
    if (!note) return;

    const timers = pills.map((pill, i) =>
      setTimeout(() => {
        pill.classList.toggle("off", habis);
        const st = pill.querySelector(".st");
        if (st) st.textContent = habis ? "Habis" : "Tersedia";
        if (!reducedMotion && habis) {
          pill.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(.94)" },
              { transform: "scale(1)" },
            ],
            { duration: 220, easing: "cubic-bezier(.23,1,.32,1)" }
          );
        }
      }, reducedMotion ? 0 : DELAYS[i])
    );
    note.textContent = habis
      ? "Terkirim ke 3 platform dalam < 1 detik — tanpa buka aplikasi lain."
      : 'Toggle di atas = satu tombol "Habis" di SatuDapur.';
    note.classList.toggle("ok", habis);
    return () => timers.forEach(clearTimeout);
  }, [habis]);

  return (
    <div className="fdemo" ref={demoRef}>
      <div className="sync-row">
        <div className="sync-item">
          Es Kopi Susu
          <small>Rp 18.000 · stok 4 tersisa</small>
        </div>
        <button
          className="toggle"
          role="switch"
          aria-checked={habis}
          aria-label="Tandai Es Kopi Susu habis"
          onClick={() => setHabis((v) => !v)}
        >
          <span className="knob" />
        </button>
      </div>
      <div className="pill-row">
        {PLATFORMS.map((p) => (
          <span key={p.key} className={`pill ${p.key}`}>
            <i />
            {p.label} <span className="st">Tersedia</span>
          </span>
        ))}
      </div>
      <p className="sync-note" ref={noteRef}>
        Toggle di atas = satu tombol "Habis" di SatuDapur.
      </p>
    </div>
  );
}
