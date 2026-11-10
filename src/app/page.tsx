import HeroMock from "@/components/HeroMock";
import Marquee from "@/components/Marquee";
import StockSyncDemo from "@/components/StockSyncDemo";
import PrintDemo from "@/components/PrintDemo";
import SettleDemo from "@/components/SettleDemo";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import WaitlistForm from "@/components/WaitlistForm";
import {
  MonitorIcon,
  PrinterIcon,
  SyncIcon,
  WalletIcon,
} from "@/components/Icons";
import { WA_URL } from "@/lib/site";

function Check({ color = "#00B14F" }: { color?: string }) {
  const content = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8.5L6 12L13.5 4.5"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return content;
}

const CHECK = <Check />;

export default function Home() {
  return (
    <>
      <Nav />
      <Reveal />

      {/* ================= HERO ================= */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-pill rise" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="dot" /> POS + Omnichannel untuk F&B Indonesia
            </span>
            <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
              Banyak pintunya, <span className="hl">satu dapurnya.</span>
            </h1>
            <p className="hero-sub rise" style={{ "--i": 2 } as React.CSSProperties}>
              Pesanan dari GrabFood, GoFood, ShopeeFood, dan pelanggan langsung di kasir —
              semua mengalir ke satu tablet POS. Dapur otomatis cetak, stok & harga tetap
              sinkron, tanpa input ulang.
            </p>
            <div className="hero-cta rise" style={{ "--i": 3 } as React.CSSProperties}>
              <a className="btn btn-primary btn-lg" href="#waitlist">
                Gabung Waiting List
              </a>
              <a className="btn btn-lg" href="#cara">
                Lihat Cara Kerja
              </a>
            </div>
            <div className="hero-checks rise" style={{ "--i": 4 } as React.CSSProperties}>
              <span>{CHECK} Gratis untuk kasir</span>
              <span>{CHECK} Setup ±15 menit</span>
              <span>{CHECK} Tanpa kartu kredit</span>
            </div>
            <div className="hero-platforms rise" style={{ "--i": 5 } as React.CSSProperties}>
              <span className="pchip grab"><i />GrabFood</span>
              <span className="pchip gofood"><i />GoFood</span>
              <span className="pchip shopee"><i />ShopeeFood</span>
              <span className="pchip"><i style={{ background: "var(--ink)" }} />Dine-in</span>
            </div>
          </div>

          <HeroMock />
        </div>
      </header>

      <Marquee />

      {/* ================= PAINS ================= */}
      <section className="section" id="masalah">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-tag reveal">— Masalahnya</span>
            <h2 className="sec-h reveal" style={{ "--i": 1 } as React.CSSProperties}>
              Kasir Anda berhak <span className="hl">lebih baik.</span>
            </h2>
            <p className="sec-p reveal" style={{ "--i": 2 } as React.CSSProperties}>
              Empat luka yang kita dengar terus dari pemilik restoran — dan yang SatuDapur
              tutup total.
            </p>
          </div>
          <div className="pain-grid">
            <article className="pain reveal" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="tag">Meja Kasir</span>
              <span className="num">01</span>
              <h3>Tablet berjejer, meja kasir penuh</h3>
              <p>
                Satu kasir memantau 3 device sekaligus — Grab, Gojek, Shopee — sambil
                melayani pelanggan yang antre di depan mata.
              </p>
            </article>
            <article className="pain reveal" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="tag">Human Error</span>
              <span className="num">02</span>
              <h3>Kerja dua kali (double input)</h3>
              <p>
                Pesanan online masuk, lalu diketik ulang ke POS toko untuk cetak struk dan
                potong stok. Salah harga, lupa topping — kejadian.
              </p>
            </article>
            <article className="pain reveal" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="tag">3 Aplikasi</span>
              <span className="num">03</span>
              <h3>Update menu yang bikin frustrasi</h3>
              <p>
                Satu menu habis, staf harus buka 3 aplikasi berbeda untuk menonaktifkannya —
                kalau telat, driver yang jadi korban.
              </p>
            </article>
            <article className="pain reveal" style={{ "--i": 3 } as React.CSSProperties}>
              <span className="tag">Keuangan</span>
              <span className="num">04</span>
              <h3>Rekonsiliasi keuangan buta</h3>
              <p>
                Harga online di-markup, komisi platform memotong ±20%. Mencocokkan uang yang
                benar-benar cair ke bank? Pusing tiap bulan.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        className="section"
        id="fitur"
        style={{
          background: "var(--wash)",
          borderTop: "var(--bw) solid var(--line)",
          borderBottom: "var(--bw) solid var(--line)",
        }}
      >
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-tag reveal">— Fitur Jagoan</span>
            <h2 className="sec-h reveal" style={{ "--i": 1 } as React.CSSProperties}>
              POS kasir & omnichannel:{" "}
              <span className="hl">semua beres.</span>
            </h2>
            <p className="sec-p reveal" style={{ "--i": 2 } as React.CSSProperties}>
              Inti kasirnya gratis selamanya. Yang Anda bayar hanya otomatisasi online-nya —
              dan itu yang bikin hemat waktu.
            </p>
          </div>
          <div className="feat-grid">
            <article className="feat reveal" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="ficon"><MonitorIcon /></span>
              <h3>Satu layar, semua pesanan</h3>
              <p>
                GrabFood, GoFood, ShopeeFood, dan dine-in masuk ke satu tablet POS yang
                sama. Kasir tak lagi berdiri di antara 3 layar.
              </p>
            </article>

            <article className="feat reveal" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="ficon"><PrinterIcon /></span>
              <h3>Auto-print ke dapur</h3>
              <p>
                Pesanan online langsung tercetak ke printer dapur atau Kitchen Display —
                tanpa kasir menyentuh layar sama sekali. Lihat simulasi:
              </p>
              <PrintDemo />
            </article>

            <article className="feat feat-wide reveal" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="ficon"><SyncIcon /></span>
              <h3>Sync harga & stok otomatis</h3>
              <p>
                Ubah sekali di SatuDapur — harga baru dan status habis menyebar ke Grab,
                Gojek, dan Shopee dalam hitungan detik. Coba sendiri:
              </p>
              <StockSyncDemo />
            </article>

            <article className="feat feat-wide reveal" style={{ "--i": 3 } as React.CSSProperties}>
              <span className="ficon"><WalletIcon /></span>
              <h3>Laporan laba bersih (anti-pusing)</h3>
              <p>
                Dashboard otomatis memisahkan omzet kotor, potongan komisi platform, dan
                estimasi uang yang benar-benar cair ke rekening Anda:
              </p>
              <SettleDemo />
            </article>
          </div>
        </div>
      </section>

      {/* ================= STEPS ================= */}
      <section className="section" id="cara">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-tag reveal">— Cara Kerja</span>
            <h2 className="sec-h reveal" style={{ "--i": 1 } as React.CSSProperties}>
              3 langkah, <span className="hl">autopilot.</span>
            </h2>
            <div className="sec-p reveal" style={{ "--i": 2 } as React.CSSProperties}>
              Onboarding dirancang semudah mungkin. Langkah 1 bisa Anda selesaikan hari ini
              juga, gratis.
            </div>
          </div>
          <div className="steps">
            <article className="step reveal" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="snum">1</span>
              <h3>Buat akun & setup menu</h3>
              <p>
                Daftar SatuDapur, masukkan daftar menu, atur harga dine-in. Langsung pakai
                sebagai aplikasi kasir toko hari ini juga — tanpa biaya.
              </p>
              <span className="stag free">Gratis</span>
            </article>
            <article className="step reveal" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="snum">2</span>
              <h3>Hubungkan aplikasi online</h3>
              <p>
                Masukkan kredensial merchant GrabFood, GoFood, dan ShopeeFood ke SatuDapur.
                Sekali saja, lalu lupakan.
              </p>
              <span className="stag pro">Upgrade Pro</span>
            </article>
            <article className="step reveal" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="snum">3</span>
              <h3>Sistem berjalan otomatis</h3>
              <p>
                Atur markup harga online (misal +20%). Semua pesanan, perubahan stok, dan
                laporan keuangan kini tersentralisasi di SatuDapur.
              </p>
              <span className="stag auto">Autopilot</span>
            </article>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section
        className="section"
        id="harga"
        style={{
          background: "var(--wash)",
          borderTop: "var(--bw) solid var(--line)",
          borderBottom: "var(--bw) solid var(--line)",
        }}
      >
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-tag reveal">— Harga</span>
            <h2 className="sec-h reveal" style={{ "--i": 1 } as React.CSSProperties}>
              POS kasir gratis & harga Pro untuk{" "}
              <span className="hl">otomatisasi.</span>
            </h2>
            <p className="sec-p reveal" style={{ "--i": 2 } as React.CSSProperties}>
              Freemium yang jujur: inti POS tidak pernah berbayar. Anda hanya bayar saat
              integrasi online aktif.
            </p>
          </div>
          <div className="price-grid">
            <article className="price reveal" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="pname">Gratis</div>
              <div className="pamount">
                Rp0 <small>selamanya</small>
              </div>
              <p className="pdesc">
                Semua yang Anda butuhkan untuk kasir toko — tanpa trik, tanpa masa trial.
              </p>
              <ul className="plist">
                <li><Check /> Kasir dine-in & takeaway</li>
                <li><Check /> Manajemen menu & stok</li>
                <li><Check /> Cetak struk & tiket dapur</li>
                <li><Check /> Laporan penjualan harian</li>
              </ul>
              <a className="btn btn-block" href="#waitlist">
                Mulai Gratis
              </a>
            </article>

            <article className="price pro reveal" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="sticker">Paling laris</span>
              <div className="pname">Pro — Otomatisasi</div>
              <div className="pamount">
                Rp149rb <small>/bln per outlet</small>
              </div>
              <p className="pdesc">
                Seluruh kekuatan autopilot untuk kanal online Anda.
              </p>
              <ul className="plist">
                <li><Check color="#FFD53E" /> Integrasi GrabFood, GoFood & ShopeeFood</li>
                <li><Check color="#FFD53E" /> Sync otomatis harga & stok</li>
                <li><Check color="#FFD53E" /> Auto-print dapur & Kitchen Display</li>
                <li><Check color="#FFD53E" /> Markup harga online otomatis</li>
                <li><Check color="#FFD53E" /> Laporan laba bersih & settlement</li>
              </ul>
              <a className="btn btn-yellow btn-block" href="#waitlist">
                Aktifkan Pro
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section" id="faq">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-tag reveal">— FAQ</span>
            <h2 className="sec-h reveal" style={{ "--i": 1 } as React.CSSProperties}>
              Pertanyaan yang <span className="hl">sering masuk.</span>
            </h2>
          </div>
          <div className="faq-list">
            {[
              {
                q: "Apakah SatuDapur benar-benar gratis?",
                a: "Ya. Semua fitur kasir — dine-in, takeaway, manajemen menu, cetak struk, dan laporan harian — gratis selamanya, tanpa masa trial dan tanpa kartu kredit. Anda hanya membayar Rp149rb/bulan jika ingin mengaktifkan integrasi otomatis ke GrabFood, GoFood, dan ShopeeFood.",
              },
              {
                q: "Berapa lama setup-nya?",
                a: "Sekitar 15 menit. Buat akun, masukkan daftar menu, dan langsung bisa dipakai sebagai kasir. Untuk menghubungkan aplikasi online cukup masukkan kredensial merchant sekali.",
              },
              {
                q: "Aplikasi online apa saja yang terintegrasi?",
                a: "GrabFood, GoFood, dan ShopeeFood. Semua pesanan dari ketiganya masuk ke satu layar kasir yang sama, dan perubahan harga atau status habis tersinkron otomatis ke ketiga platform.",
              },
              {
                q: "Apakah pesanan online otomatis dicetak ke dapur?",
                a: "Ya. Pesanan online langsung tercetak ke printer dapur atau muncul di Kitchen Display tanpa diketik ulang oleh kasir.",
              },
              {
                q: "Bagaimana dengan komisi platform?",
                a: "Dashboard SatuDapur memisahkan omzet kotor, potongan komisi platform (biasanya ±20%), dan estimasi uang yang benar-benar cair ke rekening Anda, jadi rekonsiliasi bulanan tidak lagi membingungkan.",
              },
            ].map((item, i) => (
              <details className="faq reveal" key={item.q} style={{ "--i": i } as React.CSSProperties}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <p className="faq-cta reveal" style={{ "--i": 5 } as React.CSSProperties}>
            Masih ada pertanyaan?{" "}
            <a href={WA_URL} target="_blank" rel="noopener">
              Chat kami di WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      {/* ================= FINAL CTA / WAITLIST ================= */}
      <section className="final" id="waitlist">
        <div className="wrap">
          <h2 className="reveal">
            Waktunya <span className="hl">satukan dapur</span> Anda.
          </h2>
          <p className="reveal" style={{ "--i": 1 } as React.CSSProperties}>
            SatuDapur launching sebentar lagi. Daftar sekarang — dapat kabar
            pertama + slot onboarding prioritas saat rilis.
          </p>
          <div className="reveal wl-wrap" style={{ "--i": 2 } as React.CSSProperties}>
            <WaitlistForm />
          </div>
          <p className="final-note reveal" style={{ "--i": 3 } as React.CSSProperties}>
            Setup ±15 menit · Tanpa kartu kredit
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="wrap footer-in">
          <a className="logo" href="/">
            <span className="logo-mark">S</span> SatuDapur
          </a>
          <span>Banyak pintunya, satu dapurnya.</span>
          <span>© 2026 SatuDapur</span>
        </div>
      </footer>
    </>
  );
}
