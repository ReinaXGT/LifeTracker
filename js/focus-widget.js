// ─────────────────────────────────────────────────────────────────────────────
// FocusWidget — tüm sayfalarda çalışan Focus Mode widget sistemi
//
//  • Sidebar widget : Ayarlar'ın üstünde canlı süre + Focus Mode linki
//  • Topbar widget  : Dashboard başlığının sağında mod + süre + kontrol butonları
//                     (sadece pomodoro.html dışındaki sayfalarda gösterilir)
//  • KPI motoru     : Akış Süresi / Bugün Tamamlanan / Günlük Seri hesaplaması
//                     PomodoroPage ve diğer sayfalar için merkezi hesaplama kaynağı
//                     [data-focus-kpi] elementlere otomatik render eder
//
// Strateji:
//   pomodoro.html → PomodoroPage'den doğrudan okur / metotlarını çağırır (0 gecikme)
//   Diğer sayfalar→ lt_pomo_state'ten okur, savedAt farkını hesaplayarak sanal süre döndürür;
//                   kontrol butonları lt_pomo_state'i doğrudan günceller
// ─────────────────────────────────────────────────────────────────────────────
const FocusWidget = (() => {
  let _iv            = null;
  let _worker        = null;
  let _channel       = null;
  let _isPomoPage    = false;
  let _originalTitle = '';
  let _kpiStreak     = null; // cache: { date: 'YYYY-MM-DD', value: N }

  // ── Yardımcılar ────────────────────────────────────────────────────────────
  const LABEL_KEYS = {
    flow: 'pomo_flow', countdown: 'pomo_countdown',
    work: 'pomo_work', short: 'pomo_short', long: 'pomo_long',
  };

  function _themeAccent() {
    return getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#7C6CFC';
  }

  function _isIdle(state) {
    if (state.timerType === 'flow') return state.timeLeft === 0;
    const cfg = Store.get('pomo_cfg') || {};
    const modeMap = { work: cfg.work || 25, short: cfg.short || 5, long: cfg.long || 15 };
    const cfgSec  = state.timerType === 'countdown'
      ? ((cfg.cdH || 0) * 3600 + (cfg.cdM || 0) * 60 + (cfg.cdS || 0)) || 1
      : (modeMap[state.mode] || 25) * 60;
    return state.timeLeft >= cfgSec;
  }

  function _color(state) {
    const styles = getComputedStyle(document.body);
    if (state.overtime) return '#F97316';
    if (state.running)  return styles.getPropertyValue('--green').trim() || '#34D399';
    return _isIdle(state)
      ? _themeAccent()
      : styles.getPropertyValue('--red').trim() || '#F87171';
  }

  function _label(state) {
    if (state.overtime) return UI.t('pomo_overtime');
    const key = state.timerType === 'pomodoro'
      ? (LABEL_KEYS[state.mode] || 'pomo_work')
      : (LABEL_KEYS[state.timerType] || 'pomo_work');
    return UI.t(key);
  }

  function _fmt(state) {
    const { timeLeft, timerType, overtime, overtimeSecs } = state;
    if (overtime) {
      const m = Math.floor(overtimeSecs / 60), s = overtimeSecs % 60;
      return `+${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    if (timerType === 'flow') {
      const h = Math.floor(timeLeft / 3600);
      const m = Math.floor((timeLeft % 3600) / 60);
      const s = timeLeft % 60;
      return h > 0
        ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
        : `${m}:${String(s).padStart(2,'0')}`;
    }
    const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function _elapsedMin(state) {
    const { timeLeft, timerType, overtime, overtimeSecs, _sessionDur } = state;
    let elapsed = 0;
    if (overtime) {
      elapsed = (_sessionDur || 0) + overtimeSecs;
    } else if (timerType === 'flow') {
      elapsed = timeLeft;
    } else {
      elapsed = (_sessionDur || 0) - timeLeft;
    }
    return Math.floor(elapsed / 60) + 1;
  }

  // ── State okuma ─────────────────────────────────────────────────────────────
  function _getState() {
    if (_isPomoPage && PomodoroPage._initialized) {
      const P   = PomodoroPage;
      const saved = Store.get('pomo_state');
      if (!P.running && !P._overtime && !saved) return null;

      let taskText = '';
      const activeEl = document.getElementById('pomo-active-task');
      if (activeEl && activeEl.classList.contains('visible')) taskText = activeEl.textContent || '';
      if (!taskText && saved) taskText = saved.taskText || '';

      return {
        running: P.running, timeLeft: P.timeLeft,
        overtime: P._overtime, overtimeSecs: P._overtimeSecs,
        timerType: P.timerType, mode: P.mode, taskText,
        _sessionDur: P._sessionDur,
      };
    }

    const s = Store.get('pomo_state');
    if (!s) return null;
    if (Date.now() - s.savedAt > 8 * 60 * 60 * 1000) return null;

    const away = Math.floor((Date.now() - s.savedAt) / 1000);
    let timeLeft     = s.timeLeft;
    let overtimeSecs = s.overtimeSecs || 0;

    if (s.wasRunning) {
      if (s.overtime)             overtimeSecs += away;
      else if (s.timerType === 'flow') timeLeft += away;
      else                        timeLeft = Math.max(0, timeLeft - away);
    }

    if (timeLeft <= 0 && !s.overtime && s.timerType !== 'flow') return null;

    return {
      running: s.wasRunning, timeLeft, overtime: s.overtime || false,
      overtimeSecs, timerType: s.timerType, mode: s.mode || 'work',
      taskText: s.taskText || '', _sessionDur: s.sessionDur || 0,
    };
  }

  // ── Kontrol aksiyonları ─────────────────────────────────────────────────────
  function _calcCurrentState() {
    const s = Store.get('pomo_state');
    if (!s) return null;
    const away = Math.floor((Date.now() - s.savedAt) / 1000);
    let timeLeft     = s.timeLeft;
    let overtimeSecs = s.overtimeSecs || 0;
    if (s.wasRunning) {
      if (s.overtime)             overtimeSecs += away;
      else if (s.timerType === 'flow') timeLeft += away;
      else                        timeLeft = Math.max(0, timeLeft - away);
    }
    return { ...s, timeLeft, overtimeSecs };
  }

  function _togglePause() {
    if (_isPomoPage && PomodoroPage._initialized) {
      PomodoroPage.running ? PomodoroPage.pause() : PomodoroPage.start(true);
      _update(); return;
    }
    const cur = _calcCurrentState();
    if (!cur) return;
    Store.set('pomo_state', {
      ...cur, wasRunning: !cur.wasRunning, savedAt: Date.now(),
    });
    _update();
  }

  function _addFlag() {
    if (_isPomoPage && PomodoroPage._initialized) {
      PomodoroPage.addFlag(); _update(); return;
    }
    const cur = _calcCurrentState();
    if (!cur || !cur.wasRunning) return;
    const laps = cur.laps || [];
    const prev = laps.length ? laps[laps.length - 1].elapsed : 0;
    const now  = new Date();
    const localTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const elapsed = cur.timerType === 'flow' ? cur.timeLeft : ((cur.sessionDur || 0) - cur.timeLeft);
    const split   = elapsed - prev;
    laps.push({ elapsed, split, num: laps.length + 1, localTime });
    Store.set('pomo_state', { ...cur, laps, savedAt: Date.now(), wasRunning: true });
    _update();
  }

  function _stop() {
    if (_isPomoPage && PomodoroPage._initialized) {
      const P = PomodoroPage;
      if (P._overtime) P.finish();
      else             P.reset();
      _update(); return;
    }
    Store.set('pomo_state', null);
    _update();
  }

  // ── Sidebar widget güncelle ─────────────────────────────────────────────────
  function _updateSidebar(state) {
    const w = document.getElementById('focus-sidebar-widget');
    if (!w) return;
    if (!state) { w.style.display = 'none'; return; }
    w.style.display = 'block';

    const col   = _color(state);
    const dotEl = w.querySelector('.fw-dot');
    const timeEl = w.querySelector('.fw-time');
    const lblEl  = w.querySelector('.fw-label');
    const taskEl = w.querySelector('.fw-task');

    if (dotEl)  { const pulse = !_isIdle(state); dotEl.style.background = col; dotEl.style.boxShadow = pulse ? `0 0 8px ${col}88` : 'none'; dotEl.classList.toggle('fw-dot-pulse', pulse); }
    if (timeEl) { timeEl.textContent = _fmt(state); timeEl.style.color = col; }
    if (lblEl)  { lblEl.textContent = _label(state); }
    if (taskEl) { taskEl.textContent = state.taskText; taskEl.style.display = state.taskText ? '' : 'none'; }
  }

  // ── Topbar widget inject & güncelle ────────────────────────────────────────
  function _injectTopbar() {
    if (_isPomoPage) return;
    const right = document.querySelector('header.topbar .topbar-right');
    if (!right || document.getElementById('focus-topbar-widget')) return;

    const el = document.createElement('div');
    el.id        = 'focus-topbar-widget';
    el.className = 'ftw';
    el.innerHTML = `
      <div class="ftw-info">
        <span class="ftw-dot"></span>
        <div class="ftw-texts">
          <span class="ftw-time">00:00</span>
        </div>
      </div>
      <div class="ftw-sep"></div>
      <div class="ftw-controls">
        <button class="ftw-btn" id="ftw-pause" data-tooltip="" onclick="FocusWidget.togglePause()">
          <svg data-lucide="pause" style="width:0.875rem;height:0.875rem"></svg>
        </button>
        <button class="ftw-btn ftw-btn-flag" id="ftw-flag" data-tooltip="" onclick="FocusWidget.addFlag()" style="display:none">
          <svg data-lucide="flag" style="width:0.875rem;height:0.875rem"></svg>
        </button>
        <button class="ftw-btn ftw-btn-stop" id="ftw-stop" data-tooltip="" onclick="FocusWidget.stop()">
          <svg data-lucide="square" style="width:0.875rem;height:0.875rem"></svg>
        </button>
        <a class="ftw-btn ftw-btn-open" href="pomodoro.html" data-tooltip="">
          <svg data-lucide="external-link" style="width:0.8125rem;height:0.8125rem"></svg>
        </a>
      </div>`;
    right.insertBefore(el, right.firstChild);

    lucide.createIcons({ nodes: [el] });

    const pause = document.getElementById('ftw-pause');
    const flag  = document.getElementById('ftw-flag');
    const stop  = document.getElementById('ftw-stop');
    const open  = el.querySelector('.ftw-btn-open');
    if (pause) pause.dataset.tooltip = UI.t('fw_pause_resume');
    if (flag)  flag.dataset.tooltip  = UI.t('fw_add_flag');
    if (stop)  stop.dataset.tooltip  = UI.t('fw_stop');
    if (open)  open.dataset.tooltip  = UI.t('fw_open_focus');
  }

  function _updateTopbar(state) {
    if (_isPomoPage) return;
    const w = document.getElementById('focus-topbar-widget');
    if (!w) return;

    if (!state) { w.style.display = 'none'; return; }
    w.style.display = 'flex';

    const col   = _color(state);
    const time  = _fmt(state);
    const min   = _elapsedMin(state);

    const pulse = !_isIdle(state);
    w.querySelector('.ftw-dot').style.background   = col;
    w.querySelector('.ftw-dot').style.boxShadow    = pulse ? `0 0 10px ${col}99` : 'none';
    w.querySelector('.ftw-dot').classList.toggle('ftw-dot-pulse', pulse);
    w.querySelector('.ftw-time').textContent       = time;
    w.querySelector('.ftw-time').style.color       = col;
    w.style.setProperty('--ftw-accent', col);

    const pauseBtn = document.getElementById('ftw-pause');
    if (pauseBtn) {
      const icon = state.running ? 'pause' : 'play';
      pauseBtn.innerHTML = `<svg data-lucide="${icon}" style="width:0.875rem;height:0.875rem"></svg>`;
      pauseBtn.dataset.tooltip = state.running ? UI.t('pomo_pause') : UI.t('pomo_resume');
      lucide.createIcons({ nodes: [pauseBtn] });
    }

    const flagBtn = document.getElementById('ftw-flag');
    if (flagBtn) flagBtn.style.display = state.running ? '' : 'none';

    const timeEl = w.querySelector('.ftw-time');
    if (timeEl) timeEl.dataset.tooltip = state.running ? UI.t('pomo_minute_n', min) : UI.t('fw_paused');
  }

  // ── Ana güncelleme döngüsü ─────────────────────────────────────────────────
  function _updateTitle(state) {
    if (state && state.running) {
      document.title = `❚❚ ${_fmt(state)} — LifeTracker`;
    } else if (state && !_isIdle(state)) {
      document.title = `▶  ${_fmt(state)} — LifeTracker`;
    } else {
      const correct = (typeof UI !== 'undefined' && UI.pageTitle) ? UI.pageTitle() : _originalTitle;
      if (document.title !== correct) document.title = correct;
    }
  }

  function _update() {
    const state = _getState();
    _updateSidebar(state);
    _updateTopbar(state);
    _updateTitle(state);
  }

  // ── KPI Motor ──────────────────────────────────────────────────────────────
  function _calcKPIData() {
    const td       = UI.today();
    const pomo     = Store.getPomo();
    const timeLogs = Store.getTime().logs || [];

    // Dün tarihi
    const ydDate = new Date(); ydDate.setDate(ydDate.getDate() - 1);
    const ydStr  = `${ydDate.getFullYear()}-${String(ydDate.getMonth()+1).padStart(2,'0')}-${String(ydDate.getDate()).padStart(2,'0')}`;

    // Bugünkü mola-dışı pomodoro oturumları
    const sessions = pomo.sessions.filter(s => s.date === td && s.mode !== 'short' && s.mode !== 'long');
    const pomoTodaySecs = sessions.reduce((a, s) => a + (s.duration || 0), 0) * 60;

    // Bugünkü manuel zaman logları (pomodoro çift-sayımını önlemek için source=pomodoro hariç)
    const manualTodaySecs = timeLogs
      .filter(l => l.date === td && l.source !== 'pomodoro')
      .reduce((a, l) => a + (l.duration || 0), 0) * 60;

    // Canlı laps: PomoPage açıksa doğrudan, değilse lt_pomo_state'ten
    let laps = [];
    if (_isPomoPage && typeof PomodoroPage !== 'undefined' && PomodoroPage._initialized) {
      laps = PomodoroPage._laps || [];
    } else {
      const s = Store.get('pomo_state');
      if (s && Date.now() - s.savedAt < 8 * 60 * 60 * 1000) laps = s.laps || [];
    }
    const lapSecs  = laps.length > 0 ? laps[laps.length - 1].elapsed : 0;
    const flowMins = Math.floor((pomoTodaySecs + manualTodaySecs + lapSecs) / 60);

    const workMins     = Store.get('pomo_cfg')?.work || 25;
    const sessionCount = Math.round(flowMins / workMins * 10) / 10;

    // Dün karşılaştırması — pomodoro oturumları + manuel zaman logları
    const ydPomoMins = pomo.sessions
      .filter(s => s.date === ydStr && s.mode !== 'short' && s.mode !== 'long')
      .reduce((a, s) => a + (s.duration || 0), 0);
    const ydManualMins = timeLogs
      .filter(l => l.date === ydStr && l.source !== 'pomodoro')
      .reduce((a, l) => a + (l.duration || 0), 0);
    const ydFlowMins = Math.floor(ydPomoMins + ydManualMins);
    const ydCount = Math.round(ydFlowMins / workMins * 10) / 10;

    // Günlük seri — günde bir kez hesaplanır (cache)
    if (!_kpiStreak || _kpiStreak.date !== td) {
      let streak = 0;
      for (let i = 0; i < 365; i++) {
        const d  = new Date(); d.setDate(d.getDate() - i);
        const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        if (timeLogs.some(l => l.date === ds)) streak++;
        else break;
      }
      _kpiStreak = { date: td, value: streak };
    }

    // Aktif görev pomodoro takibi — bellek önce, fallback lt_pomo_state (F5 sonrası)
    // NOT: _initialized kontrolü yok — renderKPIs(), _initialized=true'dan ÖNCE çağrılır
    let livePomosDone = null;
    if (_isPomoPage && typeof PomodoroPage !== 'undefined') {
      if (PomodoroPage._taskPomosTotal !== null && PomodoroPage._taskPomosRemaining !== null) {
        livePomosDone = Math.round((PomodoroPage._taskPomosTotal - PomodoroPage._taskPomosRemaining) * 10) / 10;
      }
      if (livePomosDone === null) {
        const st = Store.get('pomo_state');
        if (st && (st.taskPomosTotal ?? 0) > 0 && Date.now() - st.savedAt < 8 * 60 * 60 * 1000) {
          livePomosDone = Math.round(Math.max(0, (st.taskPomosTotal ?? 0) - (st.taskPomosRemaining ?? 0)) * 10) / 10;
        }
      }
    }

    return { flowMins, sessionCount, ydFlowMins, ydCount, streak: _kpiStreak.value, workMins, livePomosDone };
  }

  function _kpiHTML(d) {
    const { flowMins, sessionCount, ydFlowMins, ydCount, streak, livePomosDone } = d;
    const todayValue = livePomosDone !== null
      ? `${sessionCount} 🍅`
      : UI.t('pomo_sessions_n', sessionCount);
    const streakUp = streak > 0;
    return `
      <div class="pomo-stat-item">
        <span class="pomo-stat-label">${UI.t('pomo_kpi_today')}</span>
        <span class="pomo-stat-value">${todayValue}</span>
        <span class="pomo-stat-sub" style="color:${
          ydCount === 0
            ? 'var(--text-muted)'
            : sessionCount >= ydCount ? 'var(--green)' : 'var(--red)'
        }">
          ${ydCount === 0
            ? `— ${UI.t('pomo_vs_yday_none')}`
            : (() => {
                const diff = Math.round(Math.abs(sessionCount - ydCount) * 10) / 10;
                return sessionCount >= ydCount
                  ? `▲ ${UI.t('pomo_sessions_n', diff)} ${UI.t('pomo_vs_yday_more')}`
                  : `▼ ${UI.t('pomo_sessions_n', diff)} ${UI.t('pomo_vs_yday_less')}`;
              })()
          }
        </span>
      </div>
      <div class="pomo-stat-item">
        <span class="pomo-stat-label">${UI.t('pomo_kpi_flow')}</span>
        <span class="pomo-stat-value">${flowMins} ${UI.t('mins_suffix')}</span>
        <span class="pomo-stat-sub" style="color:${
          ydFlowMins === 0
            ? 'var(--text-muted)'
            : flowMins >= ydFlowMins ? 'var(--green)' : 'var(--red)'
        }">
          ${ydFlowMins === 0
            ? `— ${UI.t('pomo_vs_yday_none')}`
            : flowMins >= ydFlowMins
              ? `▲ ${UI.fmtMinutes(flowMins - ydFlowMins)} ${UI.t('pomo_vs_yday_more')}`
              : `▼ ${UI.fmtMinutes(ydFlowMins - flowMins)} ${UI.t('pomo_vs_yday_less')}`
          }
        </span>
      </div>
      <div class="pomo-stat-item">
        <span class="pomo-stat-label">${UI.t('pomo_kpi_streak')}</span>
        <span class="pomo-stat-value">${UI.t('pomo_days_n', streak)}</span>
        <span class="pomo-stat-sub" style="color:${streakUp ? 'var(--yellow)' : 'var(--text-muted)'}">
          ${streakUp ? '▲' : '▼'} ${UI.t('pomo_streak_sub')}
        </span>
      </div>`;
  }

  function _renderKPIContainers() {
    const els = document.querySelectorAll('[data-focus-kpi]');
    if (!els.length) return;
    const html = _kpiHTML(_calcKPIData());
    els.forEach(el => { el.innerHTML = html; });
  }

  // ── Worker & Channel ───────────────────────────────────────────────────────
  function _initWorker() {
    try {
      const code = 'let iv=null;self.onmessage=function(e){if(e.data==="start"){clearInterval(iv);iv=setInterval(function(){self.postMessage("tick");},1000);}else if(e.data==="stop"){clearInterval(iv);iv=null;}};';
      const blob = new Blob([code], { type: 'application/javascript' });
      _worker = new Worker(URL.createObjectURL(blob));
      _worker.onmessage = () => _update();
      _worker.postMessage('start');
    } catch (_) {
      _worker = null;
      _iv = setInterval(_update, 1000);
    }
  }

  function _initChannel() {
    try {
      _channel = new BroadcastChannel('lt_pomo_widget');
      _channel.onmessage = () => _update();
    } catch (_) {}
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    init() {
      _isPomoPage    = typeof PomodoroPage !== 'undefined';
      _originalTitle = document.title;
      _injectTopbar();
      _update();
      _renderKPIContainers();
      _initWorker();
      _initChannel();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) _update();
      });
      document.addEventListener('lt:pomo-state-change', () => _update());
      document.addEventListener('lt:pomo-kpi-change',   () => { _kpiStreak = null; _renderKPIContainers(); });
      document.addEventListener('lt:language-change',   () => _renderKPIContainers());
      document.addEventListener('lt:theme-change',      () => _renderKPIContainers());
    },
    togglePause() { _togglePause(); },
    addFlag()     { _addFlag();     },
    stop()        { _stop();        },
    getKPIData()  { return _calcKPIData(); },
    renderKPIs(containerEl) {
      if (containerEl) containerEl.innerHTML = _kpiHTML(_calcKPIData());
    },
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FocusWidget.init());
} else {
  FocusWidget.init();
}
