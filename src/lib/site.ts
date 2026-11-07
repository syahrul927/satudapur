/* Site-wide constants — single place to edit before launch.
   TODO(user): replace WA number + domain when known. */
export const SITE = {
  name: "SatuDapur",
  /** Final production domain, no trailing slash. */
  url: "https://satudapur.id",
  tagline: "Banyak pintunya, satu dapurnya.",
  description:
    "POS kasir gratis selamanya. Otomatiskan GrabFood, GoFood & ShopeeFood: satu layar untuk semua pesanan, auto-print ke dapur, stok & harga sinkron, laporan settlement jelas.",
  /** WhatsApp lead channel — international format, no + or dashes. */
  whatsapp: "6281234567890",
  waText:
    "Halo SatuDapur! Saya mau tahu lebih tentang POS untuk restoran saya.",
  /** Google Apps Script Web App URL (doPost) — where the waiting-list form submits.
      TODO(user): deploy Apps Script (see apps-script/Code.gs) and paste the /exec URL here. */
  appScriptUrl: "",
};

export const WA_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.waText)}`;

/** Waiting-list submit target. Empty string = form shows a friendly fallback (no silent dead submit). */
export const APP_SCRIPT_URL = SITE.appScriptUrl;
