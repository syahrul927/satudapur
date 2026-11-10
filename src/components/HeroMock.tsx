"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Hero mock — "banyak pintunya, satu dapurnya."
   POS tablet pinned one gutter from the top-left, running past the
   bottom of the stage (real crop). A kitchen ticket straddles the
   tablet's left edge and re-prints on every arrival.

   Beats (9.5s loop):
   1. t=1200  order A slides in on top, rows shift down, oldest ghosts
              out, counter rolls
   2. t=2400  A flips to "Tercetak" — ticket pops with A's items
   3. t=4600  order B arrives the same way
   4. t=5800  B flips, ticket swaps
   5. hold to t=9500, loop restarts on the next arrival
   Poster = settled 4-row feed + ticket + counter (the SSR state). */

type Plat = "grab" | "gofood" | "shopee" | "dine";
type Row = {
  key: number;
  plat: Plat;
  name: string;
  items: string;
  total: string;
  printed: boolean;
  ghost?: boolean;
  ghostTop?: number;
};

const SCRIPT = [
  { plat: "gofood" as Plat, name: "Sinta", items: "1× Nasi Padang Rendang", total: "Rp33.000", id: "#2301" },
  { plat: "shopee" as Plat, name: "Putra", items: "3× Dimsum (3)", total: "Rp27.000", id: "#0871" },
  { plat: "grab" as Plat, name: "Wulan", items: "1× Soto Ayam", total: "Rp24.000", id: "#1042" },
  { plat: "dine" as Plat, name: "Meja 5", items: "2× Es Teh, 1× Roti Bakar", total: "Rp45.000", id: "MEJA 5" },
];

const SEED: Row[] = [
  { key: 0, plat: "grab", name: "Raka", items: "2× Ayam Geprek", total: "Rp52.000", printed: true },
  { key: 1, plat: "gofood", name: "Dewi", items: "1× Sate Ayam", total: "Rp29.000", printed: true },
  { key: 2, plat: "shopee", name: "Budi", items: "2× Nasi Uduk", total: "Rp22.000", printed: true },
  { key: 3, plat: "dine", name: "Meja 4", items: "4× Es Teh Manis", total: "Rp16.000", printed: true },
  { key: 4, plat: "grab", name: "Tari", items: "1× Es Kopi Susu", total: "Rp18.000", printed: true },
];

const PLAT_SHORT: Record<Plat, string> = { grab: "G", gofood: "GF", shopee: "S", dine: "D" };

const EASE = "cubic-bezier(.23,1,.32,1)";

export default function HeroMock() {
  const [rows, setRows] = useState<Row[]>(SEED);
  const [count, setCount] = useState(126);
  const [clock, setClock] = useState("17.42");
  const [ticket, setTicket] = useState({ items: "2× Ayam Geprek", id: "#1042", n: 0 });

  const queueRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<number, HTMLDivElement>());
  const prevRects = useRef<Map<number, DOMRect> | null>(null);
  const rowsRef = useRef(rows);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  rowsRef.current = rows;

  /* FLIP: rows make room for the newcomer, the newcomer unfolds */
  useLayoutEffect(() => {
    const prev = prevRects.current;
    if (!prev) return;
    prevRects.current = null;
    rowRefs.current.forEach((el, k) => {
      if (el.dataset.ghost) return;
      const p = prev.get(k);
      if (!p) {
        const h = el.getBoundingClientRect().height;
        el.animate(
          [
            { height: "0px", opacity: 0, transform: "translateY(-12px)" },
            { height: `${h}px`, opacity: 1, transform: "none" },
          ],
          { duration: 430, easing: EASE }
        );
      } else {
        const dy = p.top - el.getBoundingClientRect().top;
        if (Math.abs(dy) > 1)
          el.animate(
            [{ transform: `translateY(${dy}px)` }, { transform: "none" }],
            { duration: 430, easing: EASE }
          );
      }
    });
  }, [rows]);

  const arrive = (idx: number) => {
    const queue = queueRef.current;
    if (!queue) return;
    const prev = new Map<number, DOMRect>();
    rowRefs.current.forEach((el, k) => prev.set(k, el.getBoundingClientRect()));
    prevRects.current = prev;

    const entry = SCRIPT[idx % SCRIPT.length];
    const last = rowsRef.current[rowsRef.current.length - 1];
    const lastEl = rowRefs.current.get(last.key);
    const qTop = queue.getBoundingClientRect().top;
    const ghostTop = lastEl ? lastEl.getBoundingClientRect().top - qTop : 0;

    setRows((rs) => [
      { ...entry, key: 10 + idx, printed: false },
      ...rs.map((r) => (r.key === last.key ? { ...r, ghost: true, ghostTop } : r)),
    ]);
    setCount((c) => c + 1);
    timers.current.push(setTimeout(() => setRows((rs) => rs.filter((r) => !r.ghost)), 300));
  };

  const print = (idx: number) => {
    const entry = SCRIPT[idx % SCRIPT.length];
    setRows((rs) => rs.map((r) => (r.key === 10 + idx ? { ...r, printed: true } : r)));
    setTicket((t) => ({ items: entry.items, id: entry.id, n: t.n + 1 }));
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const at = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(() => !cancelled && fn(), ms));

    let i = 0;
    const cycle = () => {
      at(() => arrive(i), 1200);
      at(() => print(i), 2400);
      at(() => arrive(i + 1), 4600);
      at(() => print(i + 1), 5800);
      at(() => {
        i += 2;
        cycle();
      }, 9500);
    };
    cycle();

    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        `${String(d.getHours()).padStart(2, "0")}.${String(d.getMinutes()).padStart(2, "0")}`
      );
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hm" aria-hidden="true">
      <div className="hm-tablet">
        <div className="hm-screen">
          <div className="hm-head">
            <span className="hm-title">
              <span className="dotlive" /> SatuDapur POS
            </span>
            <span className="hm-headr">
              <span className="hm-count-chip">
                Hari ini <b key={count} className="hm-count">{count}</b>
              </span>
              <span className="hm-clock">{clock}</span>
            </span>
          </div>

          <div className="hm-queue" ref={queueRef}>
            {rows.map((r) => (
              <div
                key={r.key}
                ref={(el) => {
                  if (el) rowRefs.current.set(r.key, el);
                  else rowRefs.current.delete(r.key);
                }}
                className={`order${r.printed ? " printed" : ""}${r.ghost ? " ghost" : ""}`}
                data-ghost={r.ghost ? "" : undefined}
                style={r.ghost ? { top: r.ghostTop } : undefined}
              >
                <span className={`oplat ${r.plat}`}>{PLAT_SHORT[r.plat]}</span>
                <span className="oinfo">
                  <span className="oname">{r.name}</span>
                  <span className="oitems">{r.items}</span>
                </span>
                <span className="ototal">{r.total}</span>
                <span className="oprint">Tercetak</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hm-ticket" key={ticket.n}>
        <span className="t-head">— DAPUR —</span>
        <span className="t-dash" />
        <span className="t-row">{ticket.items}</span>
        <span className="t-dash" />
        <span className="t-id">{ticket.id} · tercetak otomatis</span>
      </div>
    </div>
  );
}
