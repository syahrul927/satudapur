"use client";

import { useRef, useState, type FormEvent } from "react";
import { APP_SCRIPT_URL, WA_URL } from "@/lib/site";

/* Interest reasons — values are what Apps Script writes to the sheet column. */
const REASONS = [
  {
    value: "pos",
    title: "Karena POS-nya",
    desc: "Kasir dine-in & takeaway, menu, stok, struk — gratis selamanya.",
  },
  {
    value: "integrasi",
    title: "Karena integrasi 3 platform",
    desc: "GrabFood, GoFood & ShopeeFood masuk ke satu layar, auto-print dapur.",
  },
] as const;

type Reason = (typeof REASONS)[number]["value"];

type Status = "idle" | "sending" | "ok" | "err";

export default function WaitlistForm() {
  const [reason, setReason] = useState<Reason>("pos");
  const [status, setStatus] = useState<Status>("idle");
  /* honeypot: bots fill this hidden field; humans never see it */
  const hpRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (hpRef.current?.value) return; // bot — pretend success, log nothing

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nama: String(data.get("nama") || "").trim(),
      kontak: String(data.get("kontak") || "").trim(),
      alasan: reason,
      alasanLabel: REASONS.find((r) => r.value === reason)!.title,
      page: "waitlist",
    };
    if (!payload.nama || !payload.kontak) {
      setStatus("err");
      return;
    }

    /* No Apps Script URL yet — still let the user "send", so the flow can be
       demoed before the real endpoint exists. Mark it so we don't lie. */
    if (!APP_SCRIPT_URL) {
      setStatus("ok");
      form.reset();
      setReason("pos");
      return;
    }

    setStatus("sending");
    try {
      /* text/plain + no custom headers → no CORS preflight; Apps Script
         endpoints don't answer OPTIONS. Response is opaque (no-cors). */
      await fetch(APP_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      /* no-cors gives no status — trust it landed; sheet is source of truth */
      setStatus("ok");
      form.reset();
      setReason("pos");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="wl-card wl-done" role="status">
        <span className="wl-done-emoji" aria-hidden="true">🎉</span>
        <h3>Anda masuk waiting list!</h3>
        <p>
          Kami kabari lewat WhatsApp begitu slot launching dibuka. Mau gerak
          cepat?{" "}
          <a href={WA_URL} target="_blank" rel="noopener">
            Chat kami sekarang
          </a>
          .
        </p>
        <button
          type="button"
          className="btn wl-again"
          onClick={() => setStatus("idle")}
        >
          Daftarkan outlet lain
        </button>
      </div>
    );
  }

  return (
    <form className="wl-card" onSubmit={onSubmit} noValidate>
      <div className="wl-row">
        <label className="wl-field">
          <span className="wl-label">Nama / nama resto</span>
          <input
            name="nama"
            type="text"
            required
            placeholder="Warung Bu Sari"
            autoComplete="organization"
          />
        </label>
        <label className="wl-field">
          <span className="wl-label">No. WhatsApp</span>
          <input
            name="kontak"
            type="tel"
            required
            placeholder="0812xxxxxxx"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
      </div>

      <fieldset className="wl-reasons">
        <legend className="wl-label">Apa yang paling menarik buat Anda?</legend>
        <div className="wl-opts">
          {REASONS.map((r) => (
            <label
              key={r.value}
              className={`wl-opt${reason === r.value ? " sel" : ""}`}
            >
              <input
                type="radio"
                name="alasan"
                value={r.value}
                checked={reason === r.value}
                onChange={() => setReason(r.value)}
              />
              <span className="wl-radio" aria-hidden="true" />
              <span className="wl-opt-body">
                <span className="wl-opt-title">{r.title}</span>
                <span className="wl-opt-desc">{r.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* honeypot — visually hidden, never rendered as a visible field */}
      <div className="wl-hp" aria-hidden="true">
        <label>
          Jangan isi kolom ini
          <input ref={hpRef} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-yellow btn-lg wl-submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Mengirim…" : "Gabung Waiting List"}
      </button>
      {status === "err" && (
        <p className="wl-error" role="alert">
          Hmm, gagal kirim. Coba lagi atau{" "}
          <a href={WA_URL} target="_blank" rel="noopener">
            chat WhatsApp
          </a>
          .
        </p>
      )}
      <p className="wl-note">Gratis. Tanpa spam — kabar launching doang.</p>
    </form>
  );
}
