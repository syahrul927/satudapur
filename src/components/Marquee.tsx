"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "Satu layar semua pesanan",
  "Auto-print ke dapur",
  "Stok & harga sinkron",
  "Settlement transparan",
  "Tanpa input ulang",
  "Kasir gratis selamanya",
];

/* Marquee: duplicate track once for seamless -50% loop */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (track) track.innerHTML += track.innerHTML;
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {ITEMS.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
