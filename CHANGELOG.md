# Changelog

All notable changes to LifeTracker are documented here.  
Format: **New** · **Fixed** · **Changed** · **Removed**

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
