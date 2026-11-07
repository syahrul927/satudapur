import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SITE } from "@/lib/site";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "SatuDapur — POS Kasir Gratis untuk Restoran & Kafe",
    template: "%s | SatuDapur",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "id_ID",
    url: SITE.url,
    title: "SatuDapur — POS Kasir Gratis untuk Restoran & Kafe",
    description:
      "Satu tablet untuk semua pesanan GrabFood, GoFood & ShopeeFood. Kasir gratis selamanya, bayar hanya untuk otomatisasi online.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SatuDapur — POS kasir gratis dengan pesanan online di satu layar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SatuDapur — POS Kasir Gratis untuk Restoran & Kafe",
    description:
      "Satu tablet untuk semua pesanan online. Kasir gratis selamanya, bayar hanya untuk otomatisasi.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/* JSON-LD: SoftwareApplication + FAQPage (FAQ content mirrors the visible FAQ section) */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: SITE.description,
      url: SITE.url,
      inLanguage: "id-ID",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "IDR", name: "Gratis" },
        {
          "@type": "Offer",
          price: "149000",
          priceCurrency: "IDR",
          name: "Pro",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apakah SatuDapur benar-benar gratis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya. Semua fitur kasir — dine-in, takeaway, manajemen menu, cetak struk, dan laporan harian — gratis selamanya, tanpa masa trial dan tanpa kartu kredit. Anda hanya membayar Rp149rb/bulan jika ingin mengaktifkan integrasi otomatis ke GrabFood, GoFood, dan ShopeeFood.",
          },
        },
        {
          "@type": "Question",
          name: "Berapa lama setup-nya?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sekitar 15 menit. Buat akun, masukkan daftar menu, dan langsung bisa dipakai sebagai kasir. Untuk menghubungkan aplikasi online cukup masukkan kredensial merchant sekali.",
          },
        },
        {
          "@type": "Question",
          name: "Aplikasi online apa saja yang terintegrasi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GrabFood, GoFood, dan ShopeeFood. Semua pesanan dari ketiganya masuk ke satu layar kasir yang sama, dan perubahan harga atau status habis tersinkron otomatis ke ketiga platform.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah pesanan online otomatis dicetak ke dapur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya. Pesanan online langsung tercetak ke printer dapur atau muncul di Kitchen Display tanpa diketik ulang oleh kasir.",
          },
        },
        {
          "@type": "Question",
          name: "Bagaimana dengan komisi platform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dashboard SatuDapur memisahkan omzet kotor, potongan komisi platform (biasanya ±20%), dan estimasi uang yang benar-benar cair ke rekening Anda, jadi rekonsiliasi bulanan tidak lagi membingungkan.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${baloo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
