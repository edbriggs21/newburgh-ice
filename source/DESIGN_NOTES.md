# Handoff: Newburgh Ice — Team Portal (Sports-Broadcast Redesign)

## Overview
A responsive team-management portal for the **Newburgh Ice** 14U travel softball team. It covers seven sections — Home, Schedule, Roster, Tryouts, Billing, Drills, and Contact — with a bold "sports-broadcast" visual treatment (dark navy stack, ice-blue energy accents, condensed display type, a live results ticker, and skewed scorebug elements). Two of the screens (Tryout Registration and Contact) have working forms with a success state.

## About the Design Files
The files in this bundle are **design references created in HTML/React** — a working prototype showing the intended look and behavior, **not production code to ship directly**. The task is to **recreate this design in your target codebase** using its established framework, component library, and conventions. If there is no existing app yet, choose the most appropriate framework (the prototype is plain React, so a React/Next app is the lowest-friction path) and implement the design there.

`App.jsx` is a single self-contained React component tree using only inline styles — it's readable as a literal spec, but in a real app you'd split it into components and move tokens into your design system.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions are all specified below and present in the prototype. Recreate the UI pixel-accurately using your codebase's libraries and patterns.

## Tech notes about the prototype
- **Single component file**: `App.jsx` exports `window.App` (a React function component). All UI, data, and helpers live in it.
- **Fonts**: loaded via Google Fonts in `Newburgh Ice.dc.html` — `Anton` (display) and `Barlow` (UI/body).
- **Keyframes** (`tickerScroll`, `pulseGlow`, `sweep`) are defined in the `.dc.html` `<style>` block, referenced by inline `animation:` shorthands in `App.jsx`.
- **No external state/data libraries** — all data is hard-coded const arrays at the top of `App.jsx` (`TEAM`, `ANNOUNCEMENTS`, `SCHEDULE`, `PLAYERS`, `BILLING`, `FUNDRAISERS`, `TRYOUT_INFO`, `DRILLS`). In production these become API/data calls.

---

## Design Tokens

### Color palette (object `C` in App.jsx)
| Token | Hex | Use |
|---|---|---|
| `bg0` | `#060B14` | App background (near-black navy) |
| `bg1` | `#0B1524` | Sidebar / ticker / inputs |
| `bg2` | `#0F1E30` | Cards / panels |
| `bg3` | `#16293F` | Raised tiles, nav glyph idle |
| `line` | `rgba(255,255,255,0.09)` | Hairline borders |
| `lineStr` | `rgba(52,180,232,0.45)` | Accent/active borders |
| `cyan` | `#34B4E8` | Primary brand accent (matches logo) |
| `cyanBright` | `#5BD2FF` | Hover / highlight cyan |
| `ice` | `#A8D8EA` | Soft ice-blue text |
| `iceDeep` | `#1683B8` | Gradient stop (dark cyan) |
| `white` | `#EAF3FA` | Primary text |
| `muted` | `#7E93A8` | Secondary text |
| `mutedDk` | `#56697D` | Tertiary text / placeholders |
| `green` | `#34D399` | Wins / paid / complete |
| `red` | `#F2545B` | Losses / balance due |
| `amber` | `#FBBF24` | Tryouts / hitting / fundraising highlight |

Brand is intentionally tight: cyan + navy + white, with green/red/amber reserved for functional status only.

### Typography
- **Display** (`F.d`): `'Anton', Impact, sans-serif` — used for big numbers, records, section titles, scorebug names. Almost always `font-style: italic`, `text-transform: uppercase`. Anton is a single weight (400) but reads as ultra-bold/condensed.
- **Body/UI** (`F.b`): `'Barlow', system-ui, sans-serif` — weights 400–900 used. Labels are typically `weight 800`, `letter-spacing 1–2.5px`, `text-transform: uppercase`, sizes 10–13px.
- Section titles: `clamp(26px, 5vw, 38px)`, italic, uppercase, with a 7px skewed cyan→iceDeep gradient bar to the left.
- Big stat numbers: `clamp(32px, 6vw, 46px)`. Hero record: 58–76px.

### Spacing / radius / motion
- Card radius `14px`; tiles/inputs `10–12px`; hero `16–18px`.
- Card padding `18px 20px`; hero padding `40px 44px` (desktop) / `28px 22px` (mobile).
- Grid/flex gaps: `11–16px`.
- Skew motif: accent chips, tags, glyphs use `transform: skewX(-8deg to -12deg)` with the inner content counter-skewed back, echoing the italic logo.
- Card hover: `translateY(-3px)`, border → `lineStr`, shadow `0 14px 34px rgba(0,0,0,.45)`, transition `.2s`.
- Shadows: idle card `0 2px 10px rgba(0,0,0,.25)`; cyan button hover `0 10px 26px rgba(52,180,232,.4)`.

### Breakpoint
- Single breakpoint at **900px** (`useWide()` hook). ≥900 = desktop (left sidebar). <900 = mobile (top header + bottom tab bar).

---

## Layout / Shell
- **Desktop (≥900px)**: fixed left `<aside>` 250px wide (`bg1`, right hairline border, `position: sticky; height: 100vh`) containing: full logo + "14U TRAVEL SOFTBALL" kicker, vertical nav (7 items), and a "2026 Record 2–1 / Coach Rivera" card pinned at the bottom. Main column is flex:1, with a sticky results **Ticker** at the top, then content centered at `max-width: 1120px`, padding `30px 40px 70px`.
- **Mobile (<900px)**: sticky top header (logo left; pulsing green dot + "2026" right), sticky Ticker below it, content padding `20px 16px 96px`, and a fixed **bottom tab bar** with all 7 items (skewed letter glyph + tiny label).

### Nav items (`TABS`)
Each: `{ id, label, ch }` where `ch` is a single-letter jersey glyph (H, S, R, T, B, D, C). Active state: cyan glyph background + glow, white label, and (desktop) a 3px cyan bar on the left edge + faint cyan gradient wash.

### Ticker (broadcast lower-third)
- 42px tall bar (`bg1`, hairline top/bottom). A cyan "LATEST" tag on the left with a clipped angled right edge and a pulsing dot (`pulseGlow 1.4s` keyframe).
- Scrolling content: NEXT game, recent W/L results (color-coded dots: green/red), fundraiser progress, tryouts note. Implemented as two duplicated rows inside `animation: tickerScroll 34s linear infinite` (`translateX(0 → -50%)`) for a seamless loop.

---

## Screens / Views

### 1. Home
- **Hero**: rounded panel, `radial-gradient(120% 120% at 85% 10%, bg3, bg1, bg0)`, with diagonal cyan "speed streak" decorations (`Streaks`). Contains: season kicker, large logo image, then a record block — `Anton` `2–1` (62–76px) + "OVERALL RECORD", a vertical divider, and `67%` + "WIN PERCENTAGE" in cyan. Numbers **count up** on mount (`useCountUp`, cubic ease-out, ~950ms).
- **Stat tiles row**: 4 `StatTile`s (Wins/green, Losses/red, Roster/cyan, Upcoming/amber). Each: `bg2`, 3px top accent bar, big Anton number, uppercase label.
- **Next-up scorebug**: gradient panel with a 6px cyan left bar and a slow light **sweep** animation. "NEXT UP" tag, big date, "Newburgh Ice vs OPPONENT" (cyan italic), time/location, and a "Full Schedule →" button.
- **Announcements**: 2-col (desktop) / 1-col grid of cards, each with a 3px top accent colored by tag (Results=green, Tryouts=amber, else cyan), a skewed tag, date, bold title, body.
- **Upcoming Events**: list of `EventRow`s.

### 2. Schedule
- Section title + filter `Chip`s: All / Game / Tournament / Practice.
- "UPCOMING" and "PAST RESULTS" groups, each a vertical list of **`EventRow`** (shared component).
- **EventRow**: panel with a colored 6px left bar (cyan upcoming, green win, red loss). Date block (month label + big Anton day), hairline divider, matchup ("vs Opponent" italic uppercase) + time/location. Right side shows either the result (big Anton, green/red) or a type tag.

### 3. Roster
- Search input (filters by name or position).
- Responsive grid of player cards (`minmax(280px,1fr)` desktop / 1-col mobile). Each card: skewed jersey-number tile (Anton cyan), name + position, and a paid/due status dot (glowing) + label. Whole card is clickable.
- **Player detail view**: back button, header band (gradient + streaks) with a large skewed gradient number tile, name (Anton italic), position, and paid/due tag; then a 5-up stat grid (Position, Bats, Throws, Grad, GPA) as mini tiles, and the bio paragraph.

### 4. Tryouts
- Info hero (gradient + streaks): "TRYOUT DATES" tag, the two date lines in Anton italic, then Location / Age Group / Cost as labeled fields.
- Two panels: "What to Bring" (cyan ✓ list) and "Tryout Process" (numbered skewed glyph steps).
- **Registration form** (`Field` components): Player Name*, DOB (date), Position, Parent Email*, Parent Phone, Previous Experience (textarea). Validates name + email present, else `alert`. On submit → success state ("You're Registered", confirmation email echo, "Register Another Player" reset button).

### 5. Billing
- 3 `StatTile`s: Season Total ($845), Paid Up, Outstanding.
- "Fee Breakdown": 2-col grid of fee cards (description + due/notes, big cyan Anton amount).
- "Payment Status": 2-col grid of player rows (skewed number tile + name + paid/due tag).
- "Fundraisers": 3-up cards each with a **`ProgressBar`** (raised vs goal, % — cyan gradient fill, green when 100%) and end date.

### 6. Drills
- Filter chips: All + unique skills (Fielding, Hitting, Throwing).
- 2-col grid of drill cards: 6px left accent colored by skill (Hitting=amber, Fielding=cyan, Throwing=green), title (Anton italic), skill tag + time tag, description.

### 7. Contact
- 2-col layout (desktop): left = coach info panel (gradient + streaks, "HEAD COACH" tag, name, Email/Phone/Home Field). Right = **message form** (Name*, Email*, Subject, Message* textarea). Validates name+email+body, else `alert`. On submit → success state ("Message Sent", "Send Another").

---

## Reusable components (in App.jsx)
- `Tag` — skewed broadcast pill (configurable bg/fg).
- `Panel` — card with optional `hover` lift + `onClick`.
- `SectionTitle` — gradient bar + Anton italic uppercase heading + optional sub.
- `StatTile` — accent-topped big-number stat.
- `Button` — cyan uppercase CTA with hover glow.
- `Chip` — filter toggle.
- `NavGlyph` — skewed letter tile for nav.
- `ProgressBar` — fundraiser progress.
- `Field` — labeled input/textarea (module scope so inputs keep focus across re-renders).
- `Streaks` — diagonal cyan speed-line decoration.
- `Ticker`, `EventRow` — described above.

## Interactions & Behavior
- **Navigation**: single `tab` state in `App`; clicking a nav item swaps the rendered page. No router (add one in production — `/schedule`, `/roster/:id`, etc.).
- **Roster**: `selected` player id state toggles list ↔ detail. `search` filters.
- **Schedule / Drills**: local `filter` state drives chip filtering.
- **Forms**: controlled inputs in component state; minimal required-field validation via `alert`; boolean success state swaps to a confirmation panel.
- **Count-up**: `useCountUp(target, dur)` — rAF cubic ease-out with a `setTimeout` fallback to guarantee the final value.
- **Animations**: ticker scroll (34s linear infinite), pulsing live dots (1.4s), hero sweep (4.5s). All decorative.
- **Responsive**: `useWide()` listens to resize, flips shell layout at 900px.

> Note: the prototype intentionally has **no per-tab page transition**, because preview iframes pause CSS animations and an opacity-based entrance left content hidden. In a real app you can safely re-add a fade/slide entrance (e.g. Framer Motion) since it won't be running in a paused background iframe.

## State Management
Local React state only:
- `App`: `tab` (active section), `wide` (from `useWide`).
- `RosterPage`: `selected`, `search`.
- `SchedulePage` / `DrillsPage`: `filter`.
- `TryoutsPage`: `registered`, `form`.
- `ContactPage`: `sent`, `msg`.
No data fetching in the prototype — replace the const data arrays with your data layer.

## Assets
- `assets/newburgh-ice-logo.png` — the official Newburgh Ice wordmark with the white background knocked out to transparency (3× upscaled, edge flood-filled, alpha-feathered) so it sits cleanly on dark backgrounds. Use this transparent version, not the original white-bg upload.

## Files
- `App.jsx` — the entire React app (UI + data + helpers).
- `Newburgh Ice.dc.html` — host page: loads React, the Google Fonts, the keyframes, and mounts `App`. Open this to run the prototype.
- `assets/newburgh-ice-logo.png` — transparent logo.
