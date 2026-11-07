"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CHECK = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 8.5L6 12L13.5 4.5"
      stroke="#00B14F"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Order = {
  p: "grab" | "gofood" | "shopee" | "dine";
  g: string;
  name: string;
  items: string;
  total: string;
};

const ORDERS: Order[] = [
  { p: "gofood", g: "G", name: "Pesanan GoFood #2301", items: "1× Nasi Padang Rendang", total: "Rp 35.000" },
  { p: "grab", g: "G", name: "Pesanan GrabFood #1042", items: "2× Ayam Geprek, 1× Es Teh", total: "Rp 52.000" },
  { p: "shopee", g: "S", name: "Pesanan ShopeeFood #871", items: "3× Dimsum, 2× Es Jeruk", total: "Rp 78.000" },
  { p: "gofood", g: "G", name: "Pesanan GoFood #2302", items: "1× Soto Ayam, 1× Es Jeruk", total: "Rp 28.000" },
  { p: "grab", g: "G", name: "Pesanan GrabFood #1043", items: "1× Ayam Geprek, 1× Teh Jus", total: "Rp 27.000" },
  { p: "shopee", g: "S", name: "Pesanan ShopeeFood #872", items: "2× Mie Ayam Bakso", total: "Rp 44.000" },
  { p: "dine", g: "D", name: "Meja 4 · Dine-in", items: "2× Paket Hemat, 2× Es Teh", total: "Rp 96.000" },
];

const MAX_VISIBLE = 4;

type FeedRow = Order & { id: number; printed: boolean };

/* Snapshot of the evicted row: rendered as a React element pinned absolutely
   at its last in-flow position while it fades out. No DOM surgery. */
type Ghost = { row: FeedRow; top: number; left: number; width: number };
type Box = { top: number; left: number; width: number };

function OrderCard({ r }: { r: FeedRow }) {
  return (
    <>
      <span className={`oplat ${r.p}`}>{r.g}</span>
      <span className="oinfo">
        <span className="oname">{r.name}</span>
        <br />
        <span className="oitems">{r.items}</span>
      </span>
      <span className="ototal">{r.total}</span>
      <span className="oprint">{r.p === "dine" ? "Struk" : "Dapur"}</span>
    </>
  );
}

export default function OrderFeed() {
  /* seed ids deterministic (0-3) so SSR/hydration match; runtime pushes use ref counter */
  const [rows, setRows] = useState<FeedRow[]>(() =>
    [3, 2, 1, 0].map((i) => ({ ...ORDERS[i], id: i, printed: true }))
  );
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const [clock, setClock] = useState("--:--");
  const oidx = useRef(4);
  const uid = useRef(4);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const rowsRef = useRef(rows);
  rowsRef.current = rows;

  /* clock — client-only so SSR markup matches */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0")
      );
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pushOrder = () => {
      const o = ORDERS[oidx.current % ORDERS.length];
      oidx.current++;
      const row: FeedRow = { ...o, id: uid.current++, printed: false };

      /* State keeps exactly MAX_VISIBLE rows. The row pushed out of the list
         becomes the ghost — positioned from its last measured box, so it never
         participates in (or disturbs) the new layout. */
      const cur = rowsRef.current;
      const evicted = cur.length >= MAX_VISIBLE ? cur[cur.length - 1] : null;
      const box = evicted ? prevBoxes.current.get(evicted.id) : undefined;
      if (evicted && box && !reduced()) {
        setGhost({ row: evicted, top: box.top, left: box.left, width: box.width });
        window.setTimeout(() => setGhost(null), 300); // ghostOut runs 250ms
      }

      const next = [row, ...cur.slice(0, MAX_VISIBLE - 1)];
      /* sync ref immediately so rapid consecutive pushes (dev StrictMode
         double-invoke) always read the freshest list */
      rowsRef.current = next;
      setRows(next);

      /* print badge after short delay */
      setTimeout(() => {
        setRows((prev) =>
          prev.map((r) => (r.id === row.id ? { ...r, printed: true } : r))
        );
      }, 650);
    };

    const start = () => {
      if (timer.current) return;
      pushOrder();
      timer.current = setInterval(pushOrder, 2800);
    };
    const stop = () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };

    start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* Animations run in useLayoutEffect (pre-paint): the committed layout and
     its animations land in the same frame — no visible slam.
     FLIP is diff-based: any re-render that doesn't move rows (e.g. the
     `printed` badge toggle) measures identical tops and animates nothing. */
  const listRef = useRef<HTMLDivElement>(null);
  const seenIds = useRef(new Set<number>());
  const prevBoxes = useRef(new Map<number, Box>());

  useLayoutEffect(() => {
    const feed = listRef.current;
    if (!feed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* tops in feed-relative coords (feed is position:relative) so they stay
       valid for absolutely-positioning the ghost regardless of page scroll */
    const feedRect = feed.getBoundingClientRect();
    const flow = (Array.from(feed.children) as HTMLElement[]).filter(
      (c) => !c.classList.contains("ghost")
    );
    const boxes = new Map<number, Box>();
    for (const c of flow) {
      const r = c.getBoundingClientRect();
      boxes.set(Number(c.dataset.id), {
        top: r.top - feedRect.top,
        left: r.left - feedRect.left,
        width: r.width,
      });
    }

    /* first-ever run (mount): record boxes only, no animation — SSR rows
       should appear static */
    const mounted = prevBoxes.current.size > 0;

    let fresh: HTMLElement | undefined;
    for (const c of flow) {
      const id = Number(c.dataset.id);
      if (!seenIds.current.has(id)) {
        seenIds.current.add(id);
        if (!fresh) fresh = c;
      }
    }

    if (mounted) {
      if (fresh) {
        fresh.animate(
          [
            { opacity: 0, transform: "translateY(-10px) scale(.98)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          { duration: 350, easing: "cubic-bezier(.23,1,.32,1)", fill: "both" }
        );
      }

      /* FLIP: rows pushed down by the insertion glide from their old spot */
      for (const c of flow) {
        if (c === fresh) continue;
        const id = Number(c.dataset.id);
        const prev = prevBoxes.current.get(id);
        if (!prev) continue;
        const delta = (boxes.get(id)?.top ?? 0) - prev.top;
        if (Math.abs(delta) < 4) continue;
        c.animate(
          [
            { transform: `translateY(${-delta}px)` },
            { transform: "translateY(0)" },
          ],
          { duration: 300, easing: "cubic-bezier(.23,1,.32,1)", fill: "backwards" }
        );
      }
    }

    prevBoxes.current = boxes;
  }, [rows]);

  return (
    <div className="mock-wrap rise" style={{ "--i": 3 } as React.CSSProperties}>
      <div className="src-row">
        <div className="src-chip"><span className="src-dot grab" />GrabFood</div>
        <div className="src-chip"><span className="src-dot gofood" />GoFood</div>
        <div className="src-chip"><span className="src-dot shopee" />ShopeeFood</div>
      </div>
      <div className="connector" aria-hidden="true" />
      <div
        className="tablet"
        role="img"
        aria-label="Simulasi: pesanan dari GrabFood, GoFood, dan ShopeeFood masuk ke satu layar kasir"
      >
        <div className="tablet-screen">
          <div className="tablet-head">
            <span className="tablet-title">Semua pesanan, satu layar</span>
            <span className="clock">{clock}</span>
          </div>
          <div className="feed" id="feed" ref={listRef} aria-live="polite">
            {rows.map((r) => (
              <div
                key={r.id}
                className={`order${r.printed ? " printed" : ""}`}
                data-id={r.id}
              >
                <OrderCard r={r} />
              </div>
            ))}
            {ghost && (
              <div
                className="order ghost"
                aria-hidden="true"
                style={{ top: ghost.top, left: ghost.left, width: ghost.width }}
              >
                <OrderCard r={ghost.row} />
              </div>
            )}
          </div>
          <p className="feed-hint">
            Pesanan online masuk otomatis — kasir tidak menyentuh layar.
          </p>
        </div>
      </div>
    </div>
  );
}
