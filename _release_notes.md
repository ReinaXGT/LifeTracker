## What's New

### New
- **Live cross-tab sync** — Theme, language, privacy mode, UI scale, currency, sidebar state, hidden modules and panel visibility now update instantly in every open tab and page.
- **Offline-ready** — Chart.js and Lucide are bundled in `js/vendor/`; the app no longer shows empty charts or blank pages without internet.
- **Cache-busting & self-healing pages** — Content-hashed asset URLs plus a build guard that reloads stale pages; `tools/serve.py` dev server with caching disabled.
- **Singular/plural forms** — "1 day", "1 session" (EN/ES/FR) read correctly.

### Fixed
- **Demo data reappearing** — Demo data is created exactly once per install and can no longer come back after deleting, emptying modules or importing. Wiping data in one tab now clears the demo state in all other tabs.
- **Budget showing old data as the current period** — Importing a backup with transactions from past months no longer shows them as this cycle's totals; elapsed cycles are archived into Cycle History automatically, one entry per month.
- **Doubled storage prefix** — Panel visibility and sidebar state keys corrected (`lt_panels_*`, `lt_sidebar_collapsed`) with automatic migration.
- **English chart axes** — Thousands are shown as "K" instead of the Turkish "B".
- **Fractional Pomodoro sessions** — Session counts are whole numbers.
