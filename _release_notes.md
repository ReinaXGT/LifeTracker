## What's New

### New
- **Mobile UI overhaul** — Full responsive layer rewritten in `css/mobile.css`. All panels, KPI cards, charts, tables, and grids are now capped to viewport width. Overflow isolation applied at containment boundaries instead of `body` to avoid breaking `position:fixed` elements on iOS Safari. Sidebar, topbar, modals, and dropdowns all work correctly at ≤768px.
- **Fullscreen Pomodoro on mobile** — `#pomo-fs-controls` collapses to icon-only 34×34px buttons stacked vertically on small screens so the timer face stays unobstructed.
- **Budget: Add transactions to past cycles** — Cycle History modal now has an "Add Transaction" button per cycle. Supports one-at-a-time or rapid "Add & Continue" entry; cycle totals recalculate instantly.
- **Seed data explanation modal** — On first load with demo data, a modal explains that all entries are samples and provides a direct link to Settings → Data Management.
- **Investments: Add Deposit shortcut** — "Add Deposit" option added to the asset trade dropdown alongside New Asset / Buy More / Sell.
- **Habits grid: frozen name column** — Habit name column stays visible while scrolling the history grid horizontally.

### Fixed
- **CDP date picker overflow on mobile** — Picker no longer overflows screen edges on small screens; snaps inward with an 8px margin.
- **Dashboard net-worth TRY rate fallback** — Uses `lt_settings.tryRate` (manual override) correctly when the exchange rate API is unavailable.
- **Investments price fetch double-reload** — Batch price-fetch no longer triggers `_load()` once per asset; fires once when all prices are complete.
- **Investments deposit scroll sync** — Deposit table header and body scroll in lock-step, preventing column misalignment.
- **Tooltips on touch devices** — `TooltipCore` now detects pointer-coarse / hover-none environments and suppresses tooltip display on mobile.
- **Chart tooltip center overlap** — External chart tooltip uses quadrant-aware positioning relative to the canvas center; no longer covers center labels.
- **Budget Import button hidden on non-Transactions tabs** — "Veri Aktar" button now appears on all budget tabs (Overview, Categories, Transactions).
