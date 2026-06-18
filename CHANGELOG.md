# Changelog

All notable changes to LifeTracker are documented here.  
Format: **New** · **Fixed** · **Changed** · **Removed**

---

## [v1.9] — 2026-06-18

### New
- **Trade Edit & Delete** — Trade history rows now have per-row edit and delete action buttons, available in both the Trades tab and the full history modal. Edit modal supports date, type (buy/sell toggle), quantity, and price; changes save immediately without recalculating portfolio cost basis.
- **Dual Investment Pie Charts** — Dashboard investment panel now shows two doughnuts side by side: "By Symbol" (top 7 holdings with "+N more" overflow label) and "By Type" (asset class breakdown). Both display 1-decimal allocation percentages.
- **Privacy Button Sidebar Redesign** — Privacy toggle moved from standalone position to inline next to the Settings button when sidebar is expanded; collapses to a solo icon above Help when sidebar is collapsed. Auto-hides when both Budget and Investments modules are hidden. Applied across all 9 pages.
- **Timer Type Persistence** — Pomodoro mode selection (Pomodoro / Flow / Countdown) now survives page reloads by saving to `lt_pomo_cfg.timerType`, independent of the 8-hour `lt_pomo_state` TTL.
- **Midnight-Crossing Session Split** — Flow laps and auto-logged sessions that cross midnight are now split into two separate time log entries — one per calendar day — ensuring accurate daily totals.
- **Filter & Tab Persistence** — Time Log active filter (today/week/month/all) and Budget active tab (overview/categories/transactions) are saved to localStorage and restored on page reload.

### Fixed
- **Daily P&L Calculation** — Daily period return now uses close-to-close comparison (last two history data points) instead of comparing current price to buy price, fixing wildly incorrect figures for long-held assets.
- **KPI Source Unified** — Focus Widget KPI (flow minutes, yesterday comparison, streak) now reads from time logs with `source='pomodoro'` instead of pomo session records, so date edits in Time Log instantly reflect in KPI without requiring a full recalculation.
- **Module Toggle on Dashboard** — Hiding a module while already on Dashboard no longer incorrectly redirected to `index.html`; settings panel now auto-reopens on the Modules tab after module-triggered redirects from other pages.
- **Timer Face HH:MM:SS** — Timer display and browser tab title now show `HH:MM:SS` format whenever elapsed/remaining time exceeds 60 minutes, for all timer modes (was previously countdown-only).
- **Toast Theme Backgrounds** — Toast notifications now use explicit per-theme background colors instead of `var(--bg-elevated)`, which was semi-transparent in several themes. Info toast icon and border color switched from blue to accent.
- **Focus Widget Module Awareness** — Sidebar and topbar Pomodoro widgets now hide immediately when the Pomodoro module is toggled off in Settings, and reappear when re-enabled, without a page reload.
- **Seed Badge Layout** — Demo data warning badge no longer overflows or gets clipped in narrow topbar configurations; changed from `position:absolute` to flex-flow with `margin-auto` centering.
- **Modal Close Clickthrough** — `.cm-closing` overlay now has `pointer-events:none` during the 110ms close animation, preventing accidental clicks on buttons underneath.
- **Store.updateTimeLog Pomo Sync** — When a Pomodoro-sourced time log is edited (date or duration), the matching pomo session record is also updated, including a midnight edge case where the session date differs from the log date.

### Changed
- **Investment Table Alignment** — All numeric and type columns in both the portfolio and trades tables are now center-aligned for visual consistency (was right-aligned and inconsistent).
- **Allocation Percentage Precision** — Asset allocation now displays one decimal place (`%12.3` instead of `%12`) in the portfolio table, legend, and dashboard pie charts.
- **Budget Chart Tooltip** — Stacked bar chart interaction mode changed from `index` to `nearest`; tooltip `bodyColor` and `footerColor` now explicitly set to ensure readable contrast across all themes.

---

## [v1.8] — 2026-06-17

### New
- **Module Visibility** — New "Modules" tab in Settings lets users hide any of the 8 side modules (Pomodoro, Time, Habits, Gym, Plans, Goals, Budget, Investments); data is preserved, only removed from the sidebar and dashboard. Hidden modules' dashboard panels and KPI cards hide automatically.
- **Investment Tabs** — Investments page now has two tabs: "Portfolio" (existing asset table) and "Trade History" (filterable transaction log). Tab state persists with the topbar switching between views.
- **Trade History Modal** — Full chronological trade log accessible from a "History" button; supports month-by-month navigation and search by symbol or name; shows realized P&L per sell row.

### Fixed
- **Trade Quantity Backfill** — One-time migration (`_fixBackfilledQty`) corrects quantity values in backfilled buy records that were written with incorrect amounts in earlier versions.
- **Tooltip Z-index in `<th>`** — Tooltip-core now handles tables correctly; `<th>` tooltips no longer get clipped by `overflow:hidden` on parent elements.

### Changed
- **Dashboard panel hiding** — Dashboard panels now hide automatically when their corresponding module is disabled, keeping the overview clean without manual panel toggling.

---

## [v1.7] — 2026-06-17

### New
- **Version badge** — A small version label (e.g., `v1.7`) appears below the "LifeTracker" logo text in the sidebar; collapses and fades when the sidebar is collapsed.
- **Help modal expansion** — Every module now has a full description and feature list in the Help modal, available in all five languages (TR / EN / ZH / ES / FR).

### Fixed
- **Sidebar FOUC** — An `html.sb-collapsed` class is applied via inline script before any CSS paints when the sidebar was previously collapsed, preventing the momentary full-width flash on page load. All collapsed-sidebar styles are duplicated under `html.sb-collapsed` selectors so they apply before JS runs.

> **LTS designation** — v1.7 was designated LTS because it delivered the first stable FOUC-free sidebar experience across all 9 pages, forming a solid baseline for subsequent feature additions.

---

## [v1.6] — 2026-06-16

### New
- **Theme-aware favicon** — the browser tab icon updates its stroke color to match the active theme's `--accent` on every theme switch; implemented via a Blob URL SVG regenerated at runtime (no external file needed)
- **Sidebar hamburger button restored** — the `☰` (menu) toggle button is back in the sidebar logo area, to the right of the logo text; when the sidebar is collapsed it appears above the logo icon (`order: -1`) so it remains always reachable
- **FOUC prevention** — an inline `<script>` at the top of every HTML page reads `lt_settings.theme` and `lt_settings.uiScale` from `localStorage` before any CSS loads, applying `data-theme` and `font-size` immediately to eliminate the brief white-flash / wrong-scale flicker on page load

### Fixed
- **Settings/panel overlay clipping** — the dropdown overlay that opens from topbar buttons (panel manager, settings) no longer slides under the sidebar or topbar; minimum `left` is now clamped to `sidebar.offsetWidth + 4 px` and minimum `top` to `topbar.offsetHeight + 4 px`

### Changed
- **Sidebar toggle icon** — changed from `panel-left-close` back to `menu` (three-line hamburger); position is now the logo area for both expanded and collapsed states, consistent with the pre-v1.5 behavior
- **Dashboard time-distribution chart** — line and point colors changed from `--chart-3` (fixed blue) to `--accent` (theme-aware); dark theme renders a silver-white line, other themes use their accent color

---

## [v1.5] — 2026-06-16

### New
- **Investments: Trade System** — "Trade Assets" action button replaces the old "Add Asset" button and presents three options: Add New, Buy More, and Sell
- **Sell Asset** — modal for partial or full position close; calculates realized P&L (FIFO cost basis); reduces quantity or removes the asset entirely when fully sold
- **Buy More** — modal for adding to an existing position; updates the weighted average cost automatically
- **Trade History panel** — filterable table on the Investments page showing all buy and sell transactions; date range filter uses the CDP range picker; displays realized P&L per sell trade
- **Realized P&L row** — appears in the Returns panel when at least one sell trade exists; shows cumulative realized gain/loss
- **Period return includes realized trades** — portfolio performance calculations now factor in closed positions within the selected time window
- **Data migration on init** — `_migrateRealizedToTrades()` upgrades any existing `lt_inv_realized` records to the new `lt_inv_trades` schema; `_backfillAssetTrades()` synthesizes buy records for assets that were added before the trade log existed
- **`--accent-contrast` CSS variable** — each theme declares the correct foreground color for text placed on an accent-colored background (e.g., active tab, primary button); prevents illegible same-color-on-color combos
- **`--accent-alt` CSS variable** — secondary accent shade available in all 12 themes for gradient and secondary highlight use
- **CustomModal left-aligned button** — `align: 'left'` on a button descriptor pushes it to the left of the footer row (used for "← Back" navigation inside investment modals)
- **CDP range clear button always visible** — clear button is always rendered even when no date is selected (dimmed with `pointer-events:none`); eliminates the confusing "clear appears only after selection" UX

### Fixed
- **Modal backdrop accidental close** — both `CustomModal` and `UI.openModal()` now track which element received `mousedown`; dragging text from inside the modal onto the backdrop no longer dismisses it
- **Period P&L baseline for new assets** — assets purchased within the selected period now use their buy price as the comparison baseline instead of falling back to stale or missing price history
- **Asset icon color** — asset initials badge now uses `color-mix(in srgb, var(--accent) …)` for background/border instead of a per-asset hash color, keeping the table visually consistent across all themes

### Changed
- **Dark theme redesigned** — deeper blacks (`--bg-base: #080808`, `--bg-surface: #111111`), near-white/silver accent (`#DEDEDE`), stronger shadows; achieves a premium monochrome look distinct from the purple-accented default
- **File renames** — `pomodoro.html` → `focusmode.html` and `js/pomodoro.js` → `js/focusmode.js`; `time.html` → `timelog.html` and `js/time.js` → `js/timelog.js`; all internal links updated across every HTML file
- **Sidebar toggle button moved** — collapse/expand button relocated from the sidebar logo area to the sidebar footer for better ergonomics
- **`btn_back` i18n key** — added in all five languages (TR / EN / ZH / ES / FR)
- **`lt_inv_trades` storage key** — replaces the old `lt_inv_realized` format; schema: `[{ id, type, date, symbol, name, assetType, quantity, price, buyCurrency, costBasis?, realizedPnL? }]`

---

## [v1.4] — 2026-06-15

### New
- **Countdown scroll picker** — HH:MM:SS segments are independently scrollable via mouse wheel, click-drag, and arrow keys; duration is now set directly on the timer face rather than in settings
- **Timer alarm** — Web Audio API generates a 3-tone sine wave melody (880 Hz × 2 + 1108 Hz with natural decay) when Pomodoro work time ends, a break ends, or a countdown reaches zero; no external audio files required

### Fixed
- **Countdown ring sync** — SVG ring fills proportionally as the picker value increases and empties at 00:00:00
- **Countdown start flicker** — picker is destroyed and the display is updated synchronously in the same JS tick before the timer thread starts, eliminating the momentary blank frame
- **Picker resets to 00:00:00** — after reset or session complete the picker always initialises to 00:00:00 instead of retaining previous values
- **Finish modal elapsed time** — "save current time" now correctly shows elapsed time across all modes (Pomodoro, Flow, Overtime, Countdown); previously showed remaining time for some paths
- **Hard reset preserves task** — `_hardReset()` no longer calls `_resetTaskUI()`, so the selected task remains active after a full clear
- **Focus widget idle detection** — `_isIdle()` now reads `cdH / cdM / cdS` from config instead of the removed `countdown` field, fixing a stale-reference crash on other pages
- **Sub-minute countdown logging** — sessions under 60 seconds are stored as fractional minutes (`sessionDur / 60`) instead of being rounded up to 1 minute via `|| 1`
- **`calcTaskPomodoros` date filter** — parenthesisation bug fixed; the date filter now correctly applies to both `taskId`-matched and `taskText`-matched log entries (previously, taskId matches bypassed the date constraint)
- **Missing i18n key** — `pomo_flow_opt3_desc_count` added in all 5 languages (TR / EN / ZH / ES / FR)

### Changed
- **Countdown settings removed** — countdown duration no longer appears in the timer settings panel; the scroll picker is the only way to set it
- **Timer display font scale** — countdown face uses 2.9 rem (3.75 rem in fullscreen) so HH:MM:SS fits neatly inside the ring
- **Countdown completion sequence** — alarm plays first; UI reset and time logging occur 2.5 s later, giving the melody time to finish
- **Subtask check animation** — `.cbx-square` and `.cbx-sm` checkmarks now animate with a stroke-draw effect when checked

---

## [v1.3] — 2026-06-15

### New
- **Subtask inline edit** — pencil icon converts the label to a `<textarea>` in place; Enter saves, Escape cancels, Shift+Enter inserts a newline; auto-resizes as text grows
- **Subtask drag & drop** — subtask rows within an expanded task are reorderable via HTML5 drag; focus panel syncs immediately on drop
- **Subtask inline add** — an always-visible add form sits at the bottom of each expanded subtask panel (separated by a dashed border); input is refocused after save for rapid entry
- **Subtask themed delete** — deletion goes through `DeleteManager.confirm` with a styled overlay; native `confirm()` is no longer used
- **Day carry-over** — `_carryOverTodos()` automatically migrates incomplete todos from previous days to today on page load
- **Seed data fix** — sample todos use `ago(0)` so first-open seed entries land on today, not a stale date

### Fixed
- **Pomodoro counter over-target** — counter no longer stops at the task target; it continues past 2/2 and correctly shows 3/2, 2.7/2, etc.
- **Force-complete removed** — the `pomosAllDone` auto-complete mechanic is gone; tasks are never force-finished by the counter
- **Counter source of truth** — counter advances exclusively from completed log entries and flag splits across all modes (no tick-based interpolation)
- **Flag counter clamping** — removed `Math.max(0, …)` from `_onTaskChange`, the flag split handler, and `_recalcPomosAfterFlagDelete`; over-target progress is now preserved correctly

### Changed
- **Dashboard focus stats** — explicit `border-right` dividers added; values and labels are centred within each stat cell

---

## [v1.2] — 2026-06-14

### New
- **Centralized KPI engine** — `FocusWidget.getKPIData()` and `FocusWidget.renderKPIs()` serve as the single source of truth for sessions, flow time, and streak across all pages
- **`lt:pomo-kpi-change` event** — dispatched automatically by `Store.addTimeLog`, `deleteTimeLog`, `_autoLogTime`, and flag add/delete; consumers re-render without polling
- **`[data-focus-kpi]` attribute** — any element with this attribute is auto-populated by `renderKPIs()`
- **Fullscreen KPI bar** (`#pomo-fs-kpi`) — shows today's sessions, flow time, and streak while in fullscreen; displayed as a normal-flow element at the bottom of the timer panel (no scrollbar)
- **Fullscreen KPI toggle** — on/off switch in timer settings under "Fullscreen"; persisted as `lt_pomo_cfg.fsKpi`
- **Dashboard focus bar expanded** — bottom strip now shows 3 columns: today's sessions (accent), flow time (green), daily streak (yellow); reads from `FocusWidget.getKPIData()` removing duplicate calculation
- **`pomo-todo-add-btn`** CSS class — "Add Task" button replaced with ghost style matching the mode-select buttons (transparent background, accent border, color-mix hover)

### Fixed
- **Float flow time comparison** — `ydFlowMins` floored with `Math.floor()` preventing "116.68 mins" display caused by `_autoLogTime` storing `elapsed / 60` as a float
- **Yesterday comparison sub-text** — showed today's count when no yesterday data existed; now shows "— no data yesterday"
- **Pomodoro counter in all modes** — `_onTaskChange()` previously ignored running state; counter now activates when the timer is already running in Pomodoro mode by computing completed sessions from logs via `Store.calcTaskPomodoros()`
- **🍅 emoji disappears on F5** — `livePomosDone` now falls back to `lt_pomo_state` (8h TTL) before `PomodoroPage._initialized` is set, preserving the tomato count across page reloads
- **Manual time log entries excluded from double-count** — `lt_time` entries with `source !== 'pomodoro'` are now included in both today's and yesterday's flow time (previously only Pomodoro sessions counted)
- **Fullscreen scrollbar** — `overflow:hidden` added to `.page-content` in fullscreen; `#pomo-fs-kpi` uses `margin-top:auto` to stick to the bottom without overflowing

### Changed
- **Todo checkboxes and subtask squares** — `var(--blue)` replaced with `var(--accent)` throughout (theme-aware)
- **Subtask counter badge** — border and background now use runtime accent color via `getComputedStyle` instead of hardcoded blue
- **Todo counter header** — both numbers (completed / total) rendered in `var(--accent)`
- **Pause button** — accent-tinted border and background via `color-mix(in srgb, var(--accent) …, transparent)`
- **Panel header buttons** (Task Switch, Settings, Fullscreen) — removed hardcoded `var(--text-muted)` color; now use accent-tinted color with accent border on hover
- **Flag delete tooltip** — `data-tooltip-pos="right"` (was unset, defaulting to top)
- **Todo item divider** — `rgba(255,255,255,.10)` replacing near-invisible `var(--border)`
- **Flag panel spacing** — laps block brought closer to the minute label in both normal and fullscreen modes (`margin-top: 1.5rem → 0.5rem`)
- **Fullscreen layout** — reduced padding on `#pomo-type-row` (2rem → 1rem), `#pomo-timer-body` bottom padding removed, laps `margin-top` reduced; empty `#pomoSessions` hidden in fullscreen to eliminate phantom gap
- **Fullscreen KPI text** — compact `padding`, `font-size`, and `white-space:nowrap` overrides scoped to `#pomo-fs-kpi` items
- **`lt_pomo_cfg`** — now also stores `fsKpi: boolean`
- **i18n** — `pomo_settings_fs_kpi` key added in TR, EN, ZH, ES, FR

---

## [v1.1] — 2026-06-14

### New
- **Checkbox system redesign** — all checkboxes use accent-colored borders; hover shows semi-transparent accent fill with glow; checked state keeps transparent background with a neon glowing accent checkmark
- **Timer mode buttons** (Flow / Pomodoro / Countdown) — accent-tinted borders, hover accent fill, active state with `bg-elevated` + glow
- **Pomodoro sub-tab buttons** (Pomodoro / Short Break / Long Break) — unified visual language matching mode buttons
- **Flow duration KPI** — now calculated only from flags and saved session logs; live ticking no longer causes fractional values

### Fixed
- **Flag deletion recalculation** — remaining split times are now correctly recalculated after a flag is deleted
- **Overtime flags** — flags placed during Pomodoro overtime now correctly exceed the configured session duration
- **Subtask input Enter key** — pressing Enter no longer opens a duplicate empty field when one already exists
- **Flow duration KPI fractions** — values like `217.0166...` now display as `217`
- **Subtask panel drift** — lap table moved outside `#pomo-body-row`; focus panel subtasks no longer drift downward when flags are added

### Changed
- **Focus mode subtask panel** — widened to ~45 characters per line; checkboxes center-align on multi-line text

---

## [v1.0] — 2026-06-14

Initial release.

### Modules
- **Dashboard** — at-a-glance KPI summary with draggable panels and period selector
- **Focus Mode** — Pomodoro / Flow / Countdown timer with to-do list, flag splits, subtasks, overtime mode, fullscreen, Web Worker background accuracy, and cross-tab sync via BroadcastChannel
- **Time Tracking** — daily log with category & project tags, 30-day charts
- **Habits** — daily and scheduled habits with streaks, skip system, 30-day heatmap, weekly donuts
- **Gym** — workout tracker with 1RM calculation, templates, body measurements, personal records
- **Plans** — Kanban board (To-Do / In Progress / Done) with multi-line sub-tasks and drag-and-drop
- **Goals** — dream and milestone management with progress bars and category tags
- **Budget** — income/expense categories, budget cycles, net savings chart, draggable/resizable panels
- **Investments** — portfolio tracker with live prices (Alpha Vantage), exchange rates, P&L by period

### Global
- 12 themes, 5 languages (TR/EN/ZH/ES/FR), UI scale slider (60%–140%)
- Privacy mode, sidebar collapse, full JSON backup (export / import / delete)
- Per-page panel visibility manager
- Custom UI components: `CustomDropdown`, `CustomDatePicker`, `CustomTimePicker`, `CheckboxCore`, `TooltipCore`, `ColorPicker`
- All data stored in `localStorage` with `lt_` prefix — fully offline, no backend
