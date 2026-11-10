# HeroMock — rehearsal notes

## Gold copied
`hero-demo` (animated hero with gesture/satellite). Framing rules carried over:
window pinned one gutter in and running past an edge, satellite straddling,
only filler bleeding.

## What this is
POS tablet for the hero right column, replacing OrderFeed. Free design per brief
("no app yet, free design"): diner-styled POS queue screen + kitchen ticket
satellite.

- Tablet pinned top-left of the stage, runs past the stage bottom (real crop —
  only the bottom filler row bleeds).
- Kitchen ticket straddles the tablet's left edge, re-pops on every print.
- 9.5s loop: order arrives on top (FLIP shift + ghost out + counter roll) →
  flips to TERCETAK → ticket pops with that order's items → second order →
  loop restarts on the next arrival (no rewind).
- Poster (SSR state): settled 5-row feed, all TERCETAK, ticket matching the
  top row — tells the story alone.
- `prefers-reduced-motion`: beats skipped entirely, poster stays static.
  Clock is live (30s tick); counter and ticket are static.
- Compact (≤640px): ticket becomes a static header chip, tablet bleeds right
  by design — a redesign, not a squeeze.

## Verified in rehearsal
- Arrival beat frozen mid-flight: fresh unprinted row on top, rows shifted,
  ticket holding, counter rolled.
- Ticket-pop beat frozen mid-pop: ticket content matches the row just flipped
  to TERCETAK; sawtooth foot straddles the edge.
- Loop seam: restart lands on the next arrival, no visible reset.
- 1280 full: eye lands on ticket/tablet, one object leads, nothing real cropped.
- 390 compact: chip leads, badges whole, right bleed is filler only.
- Reduced-motion poster: static, complete, matches SSR seed.

## Not checked
- Real devices (only desktop + emulated mobile viewport in Chrome).
- Performance under CPU throttle; FLIP measures on every arrival but loop is
  9.5s with two beats, low load.
- The four feature-section demos (PrintDemo, StockSyncDemo, SettleDemo) —
  unchanged this round.
