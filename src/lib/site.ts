/* Site-wide constants — single place to edit before launch.
   Values come from env (see .env.example); fallbacks keep the demo working
   until real values exist. NOTE: NEXT_PUBLIC_* vars are baked in at build
   time — change them in .env.local, then rebuild/redeploy.

   Direct `process.env.NEXT_PUBLIC_X` references are REQUIRED here: Next.js
   only inlines literal, static reads into client bundles. A helper doing
   `process.env[key]` compiles fine but resolves to the fallback in the
   browser — that bug shipped once already. Don't refactor into a function. */

export const SITE = {
  name: "SatuDapur",
  /** Final production domain, no trailing slash. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://satudapur.id",
  tagline: "Banyak pintunya, satu dapurnya.",
  description:
    "POS kasir gratis selamanya. Otomatiskan GrabFood, GoFood & ShopeeFood: satu layar untuk semua pesanan, auto-print ke dapur, stok & harga sinkron, laporan settlement jelas.",
  /** WhatsApp lead channel — international format, no + or dashes. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "6281234567890",
  waText:
    process.env.NEXT_PUBLIC_WA_TEXT ??
    "Halo SatuDapur! Saya mau tahu lebih tentang POS untuk restoran saya.",
  /** Google Apps Script Web App URL (doPost) — where the waiting-list form submits.
      Empty = demo mode: form shows success but logs nothing. */
  appScriptUrl: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "",
};

export const WA_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.waText)}`;

/** Waiting-list submit target. Empty string = form shows a friendly fallback (no silent dead submit). */
export const APP_SCRIPT_URL = SITE.appScriptUrl;
