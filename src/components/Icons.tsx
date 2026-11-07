/* Inline SVG icons — same style as the hero checkmark in page.tsx.
   All are decorative (aria-hidden); the adjacent text carries meaning. */

type IconProps = { size?: number };

function base(size: number, children: React.ReactNode, viewBox = "0 0 24 24") {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Monitor / POS screen */
export function MonitorIcon({ size = 24 }: IconProps) {
  return base(
    size,
    <>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </>,
  );
}

/** Thermal printer / receipt printer */
export function PrinterIcon({ size = 24 }: IconProps) {
  return base(
    size,
    <>
      <path d="M7 8V3.5h10V8" />
      <path d="M5 8h14a2.5 2.5 0 0 1 2.5 2.5V16a2 2 0 0 1-2 2H20" />
      <path d="M4 18a2 2 0 0 1-2-2v-5.5A2.5 2.5 0 0 1 4.5 8" />
      <path d="M7 14h10v6.5H7z" />
      <path d="M9.5 17h5M9.5 18.8h3" />
    </>,
  );
}

/** Refresh / sync arrows */
export function SyncIcon({ size = 24 }: IconProps) {
  return base(
    size,
    <>
      <path d="M20.5 11a8.5 8.5 0 0 0-15.4-4.2M3.5 13a8.5 8.5 0 0 0 15.4 4.2" />
      <path d="M5.5 3.5v3.5H9M18.5 20.5V17H15" />
    </>,
  );
}

/** Wallet with coins / money */
export function WalletIcon({ size = 24 }: IconProps) {
  return base(
    size,
    <>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h11A2.5 2.5 0 0 1 19 7.5" />
      <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
      <path d="M16.5 13.5h4.5" />
      <circle cx="16.5" cy="13.5" r="0.4" fill="currentColor" stroke="none" />
    </>,
  );
}

/** Party popper / celebration — waitlist success */
export function PartyIcon({ size = 40 }: IconProps) {
  return base(
    size,
    <>
      <path d="M4.5 19.5 9 9.5c.6-1.4 2.6-1.4 3.2 0l4 9.2c.5 1.2-.9 2.3-2 1.6l-4.3-2.7a1.2 1.2 0 0 0-1.3 0l-2.1 1.4c-1 .7-2.4-.3-2-1.5z" transform="rotate(180 10.5 14.5)" />
      <path d="M13.5 6.5c1-1.5 3-1.5 4 0M14.5 3c.5-.8 2-.8 2.5 0" />
      <path d="M17 9.5l2.5 1M18.5 6l2.5-.5" />
    </>,
  );
}
