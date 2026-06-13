// ─────────────────────────────────────────────────────────────────────────────
// FocusWidget — tüm sayfalarda çalışan Focus Mode widget sistemi
//
//  • Sidebar widget : Ayarlar'ın üstünde canlı süre + Focus Mode linki
//  • Topbar widget  : Dashboard başlığının sağında mod + süre + kontrol butonları
//                     (sadece pomodoro.html dışındaki sayfalarda gösterilir)
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
      ? (cfg.countdown || 25) * 60
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
    // Diğer sayfalar için: anlık timeLeft/overtimeSecs'i hesapla, lt_pomo_state'e yaz
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

  // Duraklat / Devam Et
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

  // Bayrak (tüm modlar)
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

  // Durdur
  function _stop() {
    if (_isPomoPage && PomodoroPage._initialized) {
      const P = PomodoroPage;
      if (P._overtime) P.finish();
      else             P.reset();
      _update(); return;
    }
    // Diğer sayfalar → state'i temizle (sessiz durdur)
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
    if (_isPomoPage) return; // Pomodoro sayfasında topbar widget gösterme
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

    // Set translated titles after injection
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
    const lbl   = _label(state);
    const time  = _fmt(state);
    const min   = _elapsedMin(state);

    const pulse = !_isIdle(state);
    w.querySelector('.ftw-dot').style.background   = col;
    w.querySelector('.ftw-dot').style.boxShadow    = pulse ? `0 0 10px ${col}99` : 'none';
    w.querySelector('.ftw-dot').classList.toggle('ftw-dot-pulse', pulse);
    w.querySelector('.ftw-time').textContent       = time;
    w.querySelector('.ftw-time').style.color       = col;
    w.style.setProperty('--ftw-accent', col);

    // Pause / Resume ikonu
    const pauseBtn = document.getElementById('ftw-pause');
    if (pauseBtn) {
      const icon = state.running ? 'pause' : 'play';
      pauseBtn.innerHTML = `<svg data-lucide="${icon}" style="width:0.875rem;height:0.875rem"></svg>`;
      pauseBtn.dataset.tooltip = state.running ? UI.t('pomo_pause') : UI.t('pomo_resume');
      lucide.createIcons({ nodes: [pauseBtn] });
    }

    // Bayrak: çalışırken tüm modlarda göster
    const flagBtn = document.getElementById('ftw-flag');
    if (flagBtn) flagBtn.style.display = state.running ? '' : 'none';

    // Kaçıncı dakika tooltip
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
      _initWorker();
      _initChannel();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) _update();
      });
      document.addEventListener('lt:pomo-state-change', () => _update());
    },
    togglePause() { _togglePause(); },
    addFlag()     { _addFlag();     },
    stop()        { _stop();        },
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FocusWidget.init());
} else {
  FocusWidget.init();
}
