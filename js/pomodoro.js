const PomodoroPage = {
  C:          2 * Math.PI * 130,
  timerType:  'pomodoro',
  mode:       'work',
  timeLeft:   0,
  running:    false,
  _iv:        null,
  _worker:    null,
  _broadcastCh: null,
  _epochStart: null,
  _epochTimeLeft: 0,
  _epochOvertimeSecs: 0,
  settingsOpen: false,
  _sessionDur:  0,
  _flowSaved:   false,
  _laps:        [],
  _fullscreen:  false,
  _editingTodoId: null,
  _overtime:    false,
  _overtimeSecs: 0,
  _openTodos:   {},
  _restoredWasRunning: false,
  _taskPomosTotal:     null,   // Görev için planlanan toplam pomodoro (kesirli olabilir)
  _taskPomosRemaining: null,   // Kalan pomodoro sayısı
  _taskPomoCurrent:    0,      // Mevcut oturumun temsil ettiği pomodoro fraksiyonu
  _activeTaskId:       '',     // Seçili görev ID — DOM yerine buradan oku
  _activeTaskText:     '',     // Seçili görev adı — DOM yerine buradan oku
  _ddDismissed:        false,  // Dropdown açılıp görev seçilmeden kapatıldıysa true
  _pendingDeleteFlagIdx: null,
  _deleteFlagModal:    null,
  _finishHandled:      false,
  _finishModal:        null,

  _fmtSecs(s) {
    s = Math.round(s);
    const m = Math.floor(s / 60), sec = s % 60;
    const ms = UI.t('mins_suffix'), ss = UI.t('secs_suffix');
    if (m === 0) return `${sec}${ss}`;
    if (sec === 0) return `${m}${ms}`;
    return `${m}${ms} ${sec}${ss}`;
  },

  get cfg() {
    return {
      work:      (parseInt(document.getElementById('pomoWorkDur')?.value)      || 25) * 60,
      short:     (parseInt(document.getElementById('pomoShortDur')?.value)     || 5)  * 60,
      long:      (parseInt(document.getElementById('pomoLongDur')?.value)      || 15) * 60,
      countdown: (parseInt(document.getElementById('pomoCountdownDur')?.value) || 25) * 60,
    };
  },

  _saveCfg() {
    const prev = (Store.get('pomo_cfg') || {}).work || 25;
    const next = parseInt(document.getElementById('pomoWorkDur')?.value) || 25;
    Store.set('pomo_cfg', {
      work:      next,
      short:     parseInt(document.getElementById('pomoShortDur')?.value)     || 5,
      long:      parseInt(document.getElementById('pomoLongDur')?.value)      || 15,
      countdown: parseInt(document.getElementById('pomoCountdownDur')?.value) || 25,
    });
    // Work süresi değişince tüm görevlerin pomoDone'unu yeni süreye göre yeniden hesapla
    if (prev !== next) Store.syncAllTaskProgress();
  },

  _loadCfg() {
    const c = Store.get('pomo_cfg');
    if (!c) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    if (c.work)      set('pomoWorkDur',      c.work);
    if (c.short)     set('pomoShortDur',     c.short);
    if (c.long)      set('pomoLongDur',      c.long);
    if (c.countdown) set('pomoCountdownDur', c.countdown);
  },

  _initialTime() {
    if (this.timerType === 'flow')      return 0;
    if (this.timerType === 'countdown') return this.cfg.countdown;
    return this.cfg[this.mode];
  },

  // ── State persistence ────────────────────────────────────────
  _saveState(forceStop = false) {
    const sel = document.getElementById('pomoTaskSelect');
    Store.set('pomo_state', {
      timerType:          this.timerType,
      mode:               this.mode,
      timeLeft:           this.timeLeft,
      wasRunning:         forceStop ? false : this.running,
      laps:               this._laps,
      sessionDur:         this._sessionDur,
      savedAt:            Date.now(),
      savedDate:          UI.today(),
      taskId:             sel?.value   || '',
      taskText:           sel?.selectedOptions[0]?.dataset.text || sel?.selectedOptions[0]?.text || '',
      overtime:           this._overtime,
      overtimeSecs:       this._overtimeSecs,
      taskPomosTotal:     this._taskPomosTotal,
      taskPomosRemaining: this._taskPomosRemaining,
      taskPomoCurrent:    this._taskPomoCurrent,
    });
  },

  _restoreState() {
    const s = Store.get('pomo_state');
    if (!s || !s.savedAt) { Store.set('pomo_state', null); return false; }
    // Discard state older than 8 hours
    if (Date.now() - s.savedAt > 8 * 60 * 60 * 1000) {
      Store.set('pomo_state', null);
      return false;
    }

    // Adjust timeLeft / overtimeSecs for time elapsed while away
    const away = Math.floor((Date.now() - s.savedAt) / 1000);
    let timeLeft = s.timeLeft;
    let overtimeSecs = s.overtimeSecs || 0;
    if (s.wasRunning) {
      if (s.overtime) {
        overtimeSecs += away;
      } else {
        timeLeft = s.timerType === 'flow'
          ? timeLeft + away
          : Math.max(0, timeLeft - away);
      }
    }

    this.timerType           = s.timerType  || 'pomodoro';
    this.mode                = s.mode       || 'work';
    this.timeLeft            = timeLeft;
    this._laps               = s.laps       || [];
    this._sessionDur         = s.sessionDur || 0;
    this._flowSaved          = false;
    this._overtime           = s.overtime   || false;
    this._overtimeSecs       = overtimeSecs;
    this._restoredWasRunning = s.wasRunning || false;
    // Task pomodoro state — cleared below if different day, set after day check
    this._taskPomosTotal     = s.taskPomosTotal     ?? null;
    this._taskPomosRemaining = s.taskPomosRemaining ?? null;
    this._taskPomoCurrent    = s.taskPomoCurrent    || 0;

    // Apply UI for restored type
    document.querySelectorAll('.pomo-type-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.type === this.timerType)
    );
    document.getElementById('pomo-subtabs').style.display =
      this.timerType === 'pomodoro' ? 'flex' : 'none';
    const dotsRow = document.getElementById('pomoSessions');
    if (dotsRow) dotsRow.style.visibility = this.timerType === 'pomodoro' ? 'visible' : 'hidden';

    const cv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const MODE_COLORS = { work: cv('--accent'), short: cv('--green'), long: cv('--blue') };
    const ring = document.getElementById('pomoRing');
    if (this._overtime) {
      if (ring) ring.style.stroke = cv('--yellow');
    } else if (ring) {
      ring.style.stroke = this.timerType === 'pomodoro'
        ? MODE_COLORS[this.mode] : cv('--accent');
    }

    const LABELS = { flow: UI.t('pomo_flow'), countdown: UI.t('pomo_countdown'),
                     work: UI.t('pomo_work'), short: UI.t('pomo_short'), long: UI.t('pomo_long') };
    document.getElementById('pomo-mode-label').textContent = this._overtime
      ? UI.t('pomo_overtime')
      : (this.timerType === 'pomodoro' ? LABELS[this.mode] : LABELS[this.timerType]);

    document.querySelectorAll('.pomo-mode-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.mode === this.mode)
    );

    // Store taskId/taskText for deferred application after _loadTasks()
    // Use local date from savedAt to avoid UTC-vs-local mismatch
    const _savedAt = new Date(s.savedAt);
    const savedDate = s.savedDate ||
      `${_savedAt.getFullYear()}-${String(_savedAt.getMonth()+1).padStart(2,'0')}-${String(_savedAt.getDate()).padStart(2,'0')}`;
    const sameDay = savedDate === UI.today();
    this._restoredTaskId   = sameDay ? (s.taskId   || '') : '';
    this._restoredTaskText = sameDay ? (s.taskText || '') : '';
    // Different day: task pomodoro counters belong to yesterday, clear them
    if (!sameDay) {
      this._taskPomosTotal     = null;
      this._taskPomosRemaining = null;
      this._taskPomoCurrent    = 0;
    }

    return true;
  },

  _applyRestoredTask() {
    if (!this._restoredTaskId) return;
    const sel = document.getElementById('pomoTaskSelect');
    if (!sel) return;
    // Only restore if task still exists in today's active list
    const opt = Array.from(sel.options).find(o => o.value === this._restoredTaskId);
    if (!opt) {
      this._restoredTaskId   = '';
      this._restoredTaskText = '';
      return;
    }
    sel.value = this._restoredTaskId;
    // Trigger animation: hide select, show watermark
    const wrap   = document.getElementById('task-select-wrap');
    const active = document.getElementById('pomo-active-task');
    this._activeTaskId   = this._restoredTaskId;
    this._activeTaskText = this._restoredTaskText;
    this._updateTaskTrigger();
    wrap.classList.add('task-hidden');
    active.textContent = this._restoredTaskText;
    setTimeout(() => active.classList.add('visible'), 50);
    this._restoredTaskId = '';
    this._restoredTaskText = '';
    this._renderSubtaskPanel();
  },

  // ── Button state management ──────────────────────────────────
  // state: 'idle' | 'running' | 'paused'
  _showButtons(state) {
    const start  = document.getElementById('pomoStart');
    const flag   = document.getElementById('pomoFlag');
    const pause  = document.getElementById('pomoPause');
    const reset  = document.getElementById('pomoReset');
    const finish = document.getElementById('pomoFinish');

    const hide = el => { if (el) el.style.display = 'none'; };
    const show = el => { if (el) el.style.display = ''; };

    hide(start); hide(flag); hide(pause); hide(reset); hide(finish);

    const minLabel = document.getElementById('pomo-minute-label');
    if (minLabel) minLabel.style.display = 'none';

    if (state === 'idle') {
      show(start);
      start.innerHTML = `<svg data-lucide="play" style="width:1.0625rem;height:1.0625rem"></svg> ${UI.t('pomo_start')}`;
      start.className = 'btn btn-primary pomo-ctrl-btn';
      start.style.minWidth = '180px';
      start.style.fontSize = '15px';
      start.style.padding  = '12px 32px';
    } else if (state === 'running') {
      show(pause);
      show(flag);
      show(reset);
      if (this._overtime) show(finish);
      if (minLabel) minLabel.style.display = '';
    } else if (state === 'paused') {
      show(finish);
      show(start);
      start.innerHTML = `<svg data-lucide="play" style="width:1.0625rem;height:1.0625rem"></svg> ${UI.t('pomo_resume')}`;
      start.className = 'btn btn-primary pomo-ctrl-btn';
      start.style.minWidth = '150px';
      start.style.fontSize = '14px';
      start.style.padding  = '10px 24px';
      show(reset);
    }

    lucide.createIcons({ nodes: [document.getElementById('pomo-btn-row')] });
  },

  // ── Init ─────────────────────────────────────────────────────
  init() {
    UI.initTopbar({ noPrivacy: true });
    UI.initEsc();

    this._initWorker();

    try { this._broadcastCh = new BroadcastChannel('lt_pomo_widget'); } catch (_) {}

    // Load persisted durations before anything reads cfg
    this._loadCfg();

    // Try to restore previous session state
    const restored = this._restoreState();
    if (!restored) {
      this.timeLeft = this._initialTime();
    }

    this._loadTasks();
    this._applyRestoredTask();
    this._updateDisplay(true);
    this._updatePomosCounter();
    this._renderDots();
    this._renderLaps();
    this.renderKPIs();
    Store.syncAllTaskProgress();
    this.renderTodoList();

    this._initialized = true;

    // Restored state: çalışıyorsa otomatik devam et, duraklatılmışsa paused göster
    if (restored) {
      const canResume = this._overtime || this.timerType === 'flow' || this.timeLeft > 0;
      if (this._restoredWasRunning && canResume) {
        this.start(true); // otomatik devam — duraklatmaz
      } else if (canResume) {
        this._showButtons('paused');
      } else {
        this._showButtons('idle');
      }
    } else {
      this._showButtons('idle');
    }

    // Save state and re-sync on tab visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this._saveState();
      } else if (this.running && this._epochStart) {
        // Tab came back — immediately correct the display without waiting for next tick
        this._tick();
      }
    });
    window.addEventListener('beforeunload', () => this._saveState(true));
    window.addEventListener('storage', (e) => {
      if (e.key === 'lt_habits_todos') { this.renderTodoList(); this._loadTasks(); }
    });

    document.addEventListener('lt:language-change', () => {
      this.renderKPIs();
      this._renderLaps();
      this._loadTasks();
      this.renderTodoList();
      if (!this.running) {
        const LABELS = { flow: UI.t('pomo_flow'), pomodoro: UI.t('pomo_work'), countdown: UI.t('pomo_countdown'),
                         work: UI.t('pomo_work'), short: UI.t('pomo_short'), long: UI.t('pomo_long') };
        const lbl = this._overtime ? UI.t('pomo_overtime')
          : (this.timerType === 'pomodoro' ? LABELS[this.mode] : LABELS[this.timerType]);
        const el = document.getElementById('pomo-mode-label');
        if (el) el.textContent = lbl;
      }
    });

    document.addEventListener('lt:theme-change', () => {
      this.renderKPIs();
      const cv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
      const ring = document.getElementById('pomoRing');
      if (!ring) return;
      if (this._overtime) {
        ring.style.stroke = cv('--yellow');
      } else if (this.timerType === 'pomodoro') {
        const MC = { work: cv('--accent'), short: cv('--green'), long: cv('--blue') };
        ring.style.stroke = MC[this.mode];
      } else {
        ring.style.stroke = cv('--accent');
      }
    });


    document.getElementById('pomoStart' ).addEventListener('click', () => this.toggleStart());
    document.getElementById('pomoPause' ).addEventListener('click', () => this.pause());
    document.getElementById('pomoReset' ).addEventListener('click', () => this.reset());
    document.getElementById('pomoFlag'  ).addEventListener('click', () => this.addFlag());
    document.getElementById('pomoFinish').addEventListener('click', () => this._confirmFinish());
    document.getElementById('pomoSettingsToggle').addEventListener('click', () => this._toggleSettings());
    document.getElementById('pomoTaskSwitchBtn').addEventListener('click', () => this.switchTask());
    document.getElementById('pomoFullscreenToggle').addEventListener('click', () => this.toggleFullscreen());

    // Sync state when browser exits fullscreen via Escape or browser UI
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && this._fullscreen) {
        this._fullscreen = false;
        document.body.classList.remove('pomo-fullscreen');
        const btn = document.getElementById('pomoFullscreenToggle');
        if (btn) {
          btn.innerHTML = `<svg data-lucide="maximize-2" style="width:0.875rem;height:0.875rem"></svg> ${UI.t('pomo_fullscreen')}`;
          lucide.createIcons({ nodes: [btn] });
        }
      }
    });

    // Escape exits CSS-only fullscreen (when browser fullscreen is unavailable)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._fullscreen && !document.fullscreenElement) {
        this.toggleFullscreen();
      }
    });

    document.querySelectorAll('.pomo-type-btn').forEach(btn =>
      btn.addEventListener('click', () => this.setTimerType(btn.dataset.type))
    );
    document.querySelectorAll('.pomo-mode-btn').forEach(btn =>
      btn.addEventListener('click', () => this.setMode(btn.dataset.mode))
    );

    document.getElementById('pomoTaskSelect').addEventListener('change', () => this._onTaskChange());

    ['pomoWorkDur', 'pomoShortDur', 'pomoLongDur', 'pomoCountdownDur'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => {
        this._saveCfg();
        if (!this.running) {
          // Pomodoro görevi seçiliyse kesirli oturum süresini yeniden hesapla
          if (this._taskPomosRemaining && this._taskPomosRemaining > 0.001
              && this.timerType === 'pomodoro' && this.mode === 'work') {
            this._applyTaskPomoSession();
          } else {
            this.timeLeft = this._initialTime();
            this._updateDisplay(true);
          }
        }
      });
    });
  },

  // ── Kesirli Pomodoro: mevcut oturumu ayarla ─────────────────
  _applyTaskPomoSession() {
    if (!this._taskPomosRemaining || this._taskPomosRemaining <= 0.001) return;
    const workSecs = this.cfg.work; // cfg.work zaten saniye cinsinden (dakika × 60)
    // Bu oturumun temsil ettiği pomodoro fraksiyonu (en fazla 1 tam pomodoro)
    this._taskPomoCurrent = Math.min(this._taskPomosRemaining, 1);
    const sessionSecs = Math.max(1, Math.round(this._taskPomoCurrent * workSecs));
    this.timeLeft    = sessionSecs;
    this._sessionDur = sessionSecs;
    this._updateDisplay(true);
    this._updatePomosCounter();
  },

  // ── Pomodoro sayaç göstergesini güncelle ─────────────────────
  _updatePomosCounter() {
    const el = document.getElementById('pomo-pomos-counter');
    if (!el) return;
    if (this._taskPomosRemaining !== null && this._taskPomosTotal !== null && this._taskPomosRemaining > 0.001) {
      const done  = Math.round((this._taskPomosTotal - this._taskPomosRemaining) * 10) / 10;
      const total = this._taskPomosTotal;
      el.textContent = `🍅 ${done} / ${total}`;
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  },

  // ── Task change: animate select away, show task name ─────────
  _onTaskChange() {
    const sel      = document.getElementById('pomoTaskSelect');
    const wrap     = document.getElementById('task-select-wrap');
    const active   = document.getElementById('pomo-active-task');
    const opt      = sel.selectedOptions[0];
    const taskText = opt?.dataset.text || opt?.text || '';
    const hasTask  = sel.value !== '';

    if (hasTask) {
      this._activeTaskId   = sel.value;
      this._activeTaskText = taskText;
      const pomCount = parseFloat(opt?.dataset.pomodoros);
      const durMins  = parseInt(opt?.dataset.duration);
      if (!isNaN(pomCount) && pomCount > 0 && !this.running && this.timerType === 'pomodoro' && this.mode === 'work') {
        // Pomodoro tabanlı: timer'ı kesirli pomodoro sayısına göre ayarla
        this._taskPomosTotal     = pomCount;
        this._taskPomosRemaining = pomCount;
        this._applyTaskPomoSession();
      } else if (!isNaN(pomCount) && pomCount > 0 && this.timerType === 'flow') {
        // Flow modu + pomodoro sayısı: zaman loglarından mevcut ilerlemeyi hesapla
        this._taskPomosTotal  = pomCount;
        const pomoDoneFromLogs = Store.calcTaskPomodoros(this._activeTaskId, taskText);
        this._taskPomosRemaining = Math.max(0, Math.round((pomCount - pomoDoneFromLogs) * 1000) / 1000);
        this._taskPomoCurrent    = 0;
        this._updatePomosCounter();
      } else if (!isNaN(durMins) && durMins > 0 && !this.running && this.timerType === 'pomodoro' && this.mode === 'work') {
        // Dakika tabanlı (eski sistem): timer'ı direkt ayarla
        this._taskPomosTotal     = null;
        this._taskPomosRemaining = null;
        this._taskPomoCurrent    = 0;
        this.timeLeft    = durMins * 60;
        this._sessionDur = this.timeLeft;
        this._updateDisplay(true);
        this._updatePomosCounter();
      } else {
        // Ne pomodoro ne süre girilmiş — takibi temizle
        this._taskPomosTotal     = null;
        this._taskPomosRemaining = null;
        this._taskPomoCurrent    = 0;
        this._updatePomosCounter();
      }
      this._updateTaskTrigger();
      wrap.classList.add('task-hidden');
      active.textContent = taskText;
      setTimeout(() => active.classList.add('visible'), 50);
    } else {
      // Görev seçimi kaldırıldı — pomodoro takibi ve default süreyi geri yükle
      this._activeTaskId   = '';
      this._activeTaskText = '';
      this._ddDismissed    = false;
      this._taskPomosTotal     = null;
      this._taskPomosRemaining = null;
      this._taskPomoCurrent    = 0;
      this._updatePomosCounter();
      if (!this.running && this.timerType === 'pomodoro' && this.mode === 'work') {
        this.timeLeft    = this._initialTime();
        this._sessionDur = 0;
        this._updateDisplay(true);
      }
      this._updateTaskTrigger();
      wrap.classList.remove('task-hidden');
      active.classList.remove('visible');
      setTimeout(() => { active.textContent = ''; }, 500);
    }
    this._renderSubtaskPanel();
  },

  // Görev seçme arayüzünü sıfırla — finish, reset ve switchTask sonrası çağrılır
  _resetTaskUI() {
    const wrap   = document.getElementById('task-select-wrap');
    const active = document.getElementById('pomo-active-task');
    const sel    = document.getElementById('pomoTaskSelect');
    if (!wrap || !active) return;
    wrap.classList.remove('task-hidden');
    active.classList.remove('visible');
    setTimeout(() => { active.textContent = ''; }, 400);
    if (sel) sel.value = '';
    this._activeTaskId   = '';
    this._activeTaskText = '';
    this._ddDismissed    = false;
    this._updateTaskTrigger();
    const panel  = document.getElementById('pomo-subtask-panel');
    const spacer = document.getElementById('pomo-subtask-spacer');
    if (panel)  panel.style.display  = 'none';
    if (spacer) spacer.style.display = 'none';
    // Pomodoro takibini temizle
    this._taskPomosTotal     = null;
    this._taskPomosRemaining = null;
    this._taskPomoCurrent    = 0;
    this._updatePomosCounter();
  },

  switchTask() {
    const sel           = document.getElementById('pomoTaskSelect');
    const currentTaskId = sel?.value || '';
    const timerRunning  = this.running;

    // Görev seçiliyse veya timer çalışıyorsa her zaman onay iste
    // (bugün daha sorma tercihi kaydedilmişse direkt geç)
    if (Store.get('pomo_switch_skip') === UI.today()) {
      this._doSwitchTask();
      return;
    }
    if (currentTaskId || timerRunning) {
      const taskNameEl = document.getElementById('taskSwitchConfirmTaskName');
      if (taskNameEl) {
        const taskText = sel?.selectedOptions[0]?.dataset.text || sel?.selectedOptions[0]?.text || '';
        if (taskText) {
          taskNameEl.innerHTML =
            `<svg data-lucide="clipboard-list" style="width:0.8125rem;height:0.8125rem;color:var(--text-muted);flex-shrink:0;vertical-align:-2px;margin-right:0.375rem"></svg>${taskText}`;
          lucide.createIcons({ nodes: [taskNameEl] });
          taskNameEl.style.display = 'flex';
          taskNameEl.style.alignItems = 'center';
        } else {
          taskNameEl.style.display = 'none';
        }
      }
      const msgEl = document.getElementById('taskSwitchConfirmMsg');
      if (msgEl) msgEl.textContent = timerRunning
        ? UI.t('pomo_switch_running_msg')
        : UI.t('pomo_switch_elapsed_msg');
      const _taskText = sel?.selectedOptions[0]?.dataset.text || sel?.selectedOptions[0]?.text || '';
      const _msg = timerRunning ? UI.t('pomo_switch_running_msg') : UI.t('pomo_switch_elapsed_msg');
      const _timerBadge = timerRunning
        ? `<p style="display:flex;align-items:center;gap:0.375rem;font-size:0.75rem;font-weight:600;color:#FBBF24;margin:0 0 0.875rem">
             <span style="width:0.4375rem;height:0.4375rem;border-radius:50%;background:#FBBF24;flex-shrink:0"></span>
             ${UI.t('pomo_switch_running_label')}
           </p>`
        : '';
      const _taskBlock = _taskText
        ? `<p style="font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--text-muted);margin:0 0 0.375rem">${UI.t('pomo_task_switch_current')}</p>
           <p style="font-size:0.9375rem;font-weight:700;color:var(--text-primary);margin:0 0 1rem;display:flex;align-items:center;gap:0.5rem">
             <svg data-lucide="clipboard-list" style="width:0.9375rem;height:0.9375rem;color:var(--accent);flex-shrink:0"></svg>
             <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_taskText}</span>
           </p>`
        : '';
      this._taskSwitchModal = new CustomModal({
        title:   UI.t('pomo_task_switch'),
        icon:    'shuffle',
        variant: 'default',
        width:   420,
        content: _timerBadge + _taskBlock +
          `<p style="font-size:0.8125rem;color:var(--text-secondary);margin:0 0 1.25rem;line-height:1.75">${_msg}</p>
           <div id="taskSwitch-skip-row" style="display:flex;align-items:center;gap:0.625rem;cursor:pointer;user-select:none;width:100%">
             ${CheckboxCore.html({ done: false, type: 'sm', color: 'var(--accent)' })}
             <span style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.4;flex:1">${UI.t('pomo_switch_no_today')}</span>
           </div>`,
        buttons: [
          { label: UI.t('btn_cancel'),              variant: 'secondary', onClick: m => m.close() },
          { label: UI.t('pomo_switch_confirm_btn'), variant: 'primary',   onClick: () => {
            const _skipRow = document.getElementById('taskSwitch-skip-row');
            if (_skipRow && CheckboxCore.isChecked(_skipRow.querySelector('.cbx'))) {
              Store.set('pomo_switch_skip', UI.today());
            }
            this._taskSwitchModal?.close();
            this._doSwitchTask();
          }},
        ],
      });
      this._taskSwitchModal.open();
      const _tsRow = document.getElementById('taskSwitch-skip-row');
      if (_tsRow) _tsRow.addEventListener('click', () => {
        CheckboxCore.toggle(_tsRow.querySelector('.cbx'));
      });
      return;
    }
    this._doSwitchTask();
  },

  _doSwitchTask() {
    const wrap   = document.getElementById('task-select-wrap');
    const active = document.getElementById('pomo-active-task');
    const sel    = document.getElementById('pomoTaskSelect');
    wrap.classList.remove('task-hidden');
    active.classList.remove('visible');
    setTimeout(() => { active.textContent = ''; }, 400);
    if (sel) sel.value = '';
    this._updateTaskTrigger();
    this._loadTasks();
    setTimeout(() => document.getElementById('pomoTaskTrigger')?.focus(), 420);
    const panel  = document.getElementById('pomo-subtask-panel');
    const spacer = document.getElementById('pomo-subtask-spacer');
    if (panel)  panel.style.display  = 'none';
    if (spacer) spacer.style.display = 'none';
    // Pomodoro sayacını temizle
    this._taskPomosTotal     = null;
    this._taskPomosRemaining = null;
    this._taskPomoCurrent    = 0;
    this._updatePomosCounter();
    this.renderKPIs();
  },

  _updateActiveTask() {
    const sel    = document.getElementById('pomoTaskSelect');
    const active = document.getElementById('pomo-active-task');
    const wrap   = document.getElementById('task-select-wrap');
    if (!sel || !active) return;
    const hasTask = sel.value !== '';
    if (hasTask) {
      wrap.classList.add('task-hidden');
      active.textContent = sel.selectedOptions[0]?.text || '';
      active.classList.add('visible');
    } else {
      wrap.classList.remove('task-hidden');
      active.classList.remove('visible');
      active.textContent = '';
    }
  },

  // ── Timer type ───────────────────────────────────────────────
  setTimerType(type) {
    if (type === this.timerType) return;
    const hasLaps   = this._laps.length > 0;
    const shouldWarn = hasLaps || this.running;
    if (shouldWarn) {
      if (Store.get('pomo_mode_switch_skip') === UI.today()) {
        if (hasLaps) this._saveLapsToTimeLogs();
        this._doSetTimerType(type);
        return;
      }
      const _totalSecs = this._laps.reduce((s, l) => s + l.split, 0);
      const _totalMins = Math.round(_totalSecs / 60);
      const _thirdLine = hasLaps
        ? `<p style="margin:0;font-size:0.8125rem;color:var(--accent);font-weight:500">${UI.t('pomo_mode_switch_duration', UI.fmtMinutes(Math.max(_totalMins, 1)))}</p>`
        : `<p style="margin:0;font-size:0.8125rem;color:var(--text-muted);line-height:1.5">${UI.t('pomo_mode_switch_no_flags')}</p>`;

      const modal = new CustomModal({
        title:   UI.t('pomo_mode_switch_title'),
        icon:    'triangle-alert',
        variant: 'danger',
        width:   400,
        zIndex:  9000,
        content: `<div style="display:flex;flex-direction:column;gap:0.75rem">
          <p style="margin:0;font-size:0.9375rem;font-weight:600;color:var(--text-primary)">${UI.t('pomo_mode_switch_msg')}</p>
          <p style="margin:0;font-size:0.8125rem;color:var(--text-secondary);line-height:1.5">${UI.t('pomo_mode_switch_flags')}</p>
          ${_thirdLine}
          <div id="pomo-skip-row" style="display:flex;align-items:center;gap:0.625rem;cursor:pointer;user-select:none;padding-top:0.25rem;width:100%">
            ${CheckboxCore.html({ done: false, type: 'sm', color: 'var(--red)', extraClass: 'cbx-bordered' })}
            <span style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.4;flex:1">${UI.t('pomo_mode_switch_dontask')}</span>
          </div>
        </div>`,
        buttons: [
          { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
          { label: UI.t('pomo_mode_switch_confirm'), variant: 'danger',
            onClick: m => {
              const _skipRow2 = document.getElementById('pomo-skip-row');
              if (_skipRow2 && CheckboxCore.isChecked(_skipRow2.querySelector('.cbx'))) {
                Store.set('pomo_mode_switch_skip', UI.today());
              }
              m.close();
              if (hasLaps) this._saveLapsToTimeLogs();
              this._doSetTimerType(type);
            }},
        ],
      });
      modal.open();
      const row = document.getElementById('pomo-skip-row');
      if (row) row.addEventListener('click', () => { CheckboxCore.toggle(row.querySelector('.cbx')); });
      return;
    }
    this._doSetTimerType(type);
  },

  _saveLapsToTimeLogs() {
    if (!this._laps.length) return;
    const today    = UI.today();
    const taskText = this._activeTaskText || '';
    const now      = new Date();
    const nowHHMM  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    // Her lapı ayrı time log girişi olarak kaydet
    this._laps.forEach(lap => {
      const durationMin = Math.round(lap.split / 60);
      if (durationMin < 1) return;
      const completedAt = lap.localTime || nowHHMM;
      this._autoLogTime(durationMin, completedAt, today, 'flow');
    });

    // Toplam süreyi tek bir pomo session olarak kaydet (KPI widgetları için)
    const totalSecs = this._laps.reduce((s, l) => s + l.split, 0);
    const totalMins = Math.round(totalSecs / 60);
    if (totalMins >= 1) {
      const lastLapTime = this._laps[this._laps.length - 1].localTime || nowHHMM;
      this._clearSeedSessions();
      Store.addPomoSession({ date: today, mode: 'flow', task: taskText, duration: totalMins, completedAt: lastLapTime });
      UI.toast(UI.t('pomo_flow_saved', totalMins), 'success');
    }
    // _stopAndSave → _saveFlowSession'ın tekrar çalışmasını önle
    this._flowSaved = true;
  },

  _doSetTimerType(type) {
    if (this.running) this._stopAndSave();
    this.timerType   = type;
    this._flowSaved  = false;
    this._laps       = [];
    this._sessionDur = 0;
    this._renderLaps();

    document.querySelectorAll('.pomo-type-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.type === type)
    );

    document.getElementById('pomo-subtabs').style.display    = type === 'pomodoro' ? 'flex' : 'none';
    document.getElementById('pomoSessions').style.visibility = type === 'pomodoro' ? 'visible' : 'hidden';

    const cv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const ring = document.getElementById('pomoRing');
    if (ring) ring.style.stroke = cv('--accent');

    const LABELS = { flow: UI.t('pomo_flow'), pomodoro: UI.t('pomo_work'), countdown: UI.t('pomo_countdown') };
    document.getElementById('pomo-mode-label').textContent = LABELS[type];

    this.timeLeft = this._initialTime();
    this._updateDisplay(true);
    this._showButtons('idle');
    this.renderKPIs();
  },

  // ── Pomodoro sub-mode ─────────────────────────────────────────
  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('.pomo-mode-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.mode === mode)
    );
    const cv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const COLORS = { work: cv('--accent'), short: cv('--green'), long: cv('--blue') };
    const ring = document.getElementById('pomoRing');
    if (ring) ring.style.stroke = COLORS[mode];
    this._sessionDur = 0;
    const LABELS = { work: UI.t('pomo_work'), short: UI.t('pomo_short'), long: UI.t('pomo_long') };
    document.getElementById('pomo-mode-label').textContent = LABELS[mode];
    this.reset();
  },

  // ── Start / Pause / Reset ─────────────────────────────────────
  toggleStart() { this.running ? this.pause() : this.start(); },

  start(isResume = false) {
    if (this._overtime) {
      this.running = true;
      this._startTimer();
      this._showButtons('running');
      return;
    }
    if (this.timerType !== 'flow' && this.timeLeft <= 0) this.timeLeft = this._initialTime();
    if (this.timerType === 'flow' && this.timeLeft === 0) this._flowSaved = false;
    // Resume: _sessionDur zaten restore'dan geliyor, sıfırlama
    // Fresh start: görev süresi seçilmişse (timeLeft > _initialTime) onu koru
    if (!isResume) {
      this._sessionDur = this.timerType === 'flow' ? 0 : this.timeLeft;
    }
    this.running = true;
    this._startTimer();
    this._showButtons('running');
    document.dispatchEvent(new CustomEvent('lt:pomo-state-change'));
  },

  pause() {
    this.running = false;
    this._stopTimer();
    this._saveState();
    this._showButtons('paused');
    document.dispatchEvent(new CustomEvent('lt:pomo-state-change'));
  },

  reset() {
    if (this._overtime) {
      this._stopTimer();
      this.running = false;
      this._overtime = false;
      this._overtimeSecs = 0;
      this.timeLeft = this._initialTime();
      const ring = document.getElementById('pomoRing');
      const cv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
      const MC = { work: cv('--accent'), short: cv('--green'), long: cv('--blue') };
      if (ring) ring.style.stroke = MC[this.mode] || cv('--accent');
      document.getElementById('pomo-mode-label').textContent = UI.t('pomo_work');
      this._updateDisplay(true);
      this._showButtons('idle');
      Store.set('pomo_state', null);
      document.title = UI.pageTitle();
      return;
    }
    if (this.running) { this._stopTimer(); this.running = false; }
    // Bayraksız flow veya herhangi bir modda bayrak varsa seçenek modalı göster
    if (this.timerType === 'flow' || this._laps.length > 0) {
      this._showFlowResetModal();
      return;
    }
    this._laps = [];
    this.timeLeft = this._initialTime();
    this._updateDisplay(true);
    this._showButtons('idle');
    Store.set('pomo_state', null);
    document.title = UI.pageTitle();
  },

  // ── Flow reset modal ──────────────────────────────────────────
  _showFlowResetModal() {
    const hasLaps = this._laps.length > 0;
    const lastLap = hasLaps ? this._laps[this._laps.length - 1] : null;
    const saveDesc  = hasLaps ? UI.t('pomo_flow_save_desc', this._fmtSecs(lastLap.elapsed)) : UI.t('pomo_flow_save_none');
    const flagText  = hasLaps ? UI.t('pomo_flags_count', this._laps.length) : UI.t('pomo_flags_none');
    const hardDesc  = this.timerType === 'flow' ? UI.t('pomo_flow_hard_flow') : UI.t('pomo_flow_hard_count');
    const noLapStyle = !hasLaps ? 'opacity:.4;cursor:not-allowed;' : '';

    this._flowResetHandled = false;
    this._flowResetModal = new CustomModal({
      title:   UI.t('pomo_flow_reset_title'),
      icon:    'rotate-ccw',
      width:   440,
      content: `<div style="display:flex;flex-direction:column;gap:0.625rem">
        <p style="font-size:0.8125rem;color:var(--text-muted);margin:0 0 4px">
          <strong>${flagText}</strong>. <span>${UI.t('pomo_flow_reset_question')}</span>
        </p>
        <button id="flow-reset-save-btn" class="flow-reset-option opt-save" onclick="PomodoroPage._resetSaveToLastFlag()"
          style="${noLapStyle}" ${!hasLaps ? 'disabled' : ''}>
          <span class="opt-title">${UI.t('pomo_flow_opt1_title')}</span>
          <span class="opt-desc">${saveDesc}</span>
        </button>
        <button id="flow-reset-rewind-btn" class="flow-reset-option opt-rewind" onclick="PomodoroPage._resetFromLastFlag()"
          style="${noLapStyle}" ${!hasLaps ? 'disabled' : ''}>
          <span class="opt-title">${UI.t('pomo_flow_opt2_title')}</span>
          <span class="opt-desc">${UI.t('pomo_flow_opt2_desc')}</span>
        </button>
        <button class="flow-reset-option opt-hard" onclick="PomodoroPage._hardReset()">
          <span class="opt-title">${hardDesc}</span>
          <span class="opt-desc">${this.timerType === 'flow' ? UI.t('pomo_flow_opt3_desc_flow') : UI.t('pomo_flow_opt3_desc_count')}</span>
        </button>
      </div>`,
      buttons: [],
      onClose: () => {
        if (!this._flowResetHandled) {
          this._showButtons('paused');
        }
      },
    });
    this._flowResetModal.open();
  },

  // Option 1: log up to last flag, discard the rest
  _resetSaveToLastFlag() {
    this._flowResetHandled = true;
    this._flowResetModal?.close();
    const lastLap  = this._laps[this._laps.length - 1];
    const taskId   = this._activeTaskId   || '';
    const taskText = this._activeTaskText || '';

    if (lastLap) {
      const now         = new Date();
      const completedAt = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const durationMin = lastLap.elapsed > 0 ? lastLap.elapsed / 60 : 1 / 60;
      const mode = this.timerType === 'flow' ? 'flow' : this.mode;
      this._clearSeedSessions();
      Store.addPomoSession({ date: UI.today(), mode, task: taskText, duration: durationMin, completedAt });
      this._autoLogTime(durationMin, completedAt, UI.today(), mode);
      UI.toast(UI.t('pomo_session_saved', this._fmtSecs(lastLap.elapsed)), 'success');
      this.renderKPIs();
    }

    this._flowSaved = true;
    this._laps      = [];
    this._renderLaps();
    this._showButtons('idle');

    // Pomodoro takibi varsa zaman loglarından senkronize et, görevi seçili tut
    if (taskId && this._taskPomosTotal !== null) {
      const pomoDoneFromLogs = Store.calcTaskPomodoros(taskId, taskText);
      this._taskPomosRemaining = Math.max(0, Math.round((this._taskPomosTotal - pomoDoneFromLogs) * 1000) / 1000);
      this._taskPomoCurrent    = 0;

      if (this._taskPomosRemaining <= 0.001) {
        // Tüm pomodorolar tamamlandı
        this._taskPomosRemaining = null;
        this._taskPomosTotal     = null;
        this.timeLeft = this._initialTime();
        this._updateDisplay(true);
        this._resetTaskUI();
      } else {
        // Kalan pomodoro var — görevi seçili tut, sayacı güncelle
        this.timeLeft = this._initialTime();
        this._updateDisplay(true);
        this._updatePomosCounter();
        this.renderTodoList();
      }
    } else {
      this.timeLeft = this._initialTime();
      this._updateDisplay(true);
      this._resetTaskUI();
    }

    Store.set('pomo_state', null);
    document.title = UI.pageTitle();
  },

  // Option 2: rewind timer to last flag time and resume
  _resetFromLastFlag() {
    this._flowResetHandled = true;
    this._flowResetModal?.close();
    const lastLap = this._laps[this._laps.length - 1];
    if (!lastLap) { this._hardReset(); return; }
    // flow: elapsed = timeLeft değeri (artan); countdown/pomodoro: timeLeft = sessionDur - elapsed
    if (this.timerType === 'flow') {
      this.timeLeft = lastLap.elapsed;
    } else {
      this.timeLeft = Math.max(1, this._sessionDur - lastLap.elapsed);
    }
    this._updateDisplay(true);
    this.running = true;
    this._startTimer();
    this._showButtons('running');
  },

  // Option 3: discard everything, no log
  _hardReset() {
    this._flowResetHandled = true;
    this._flowResetModal?.close();
    this._flowSaved = false;
    this._laps      = [];
    this._renderLaps();
    this.timeLeft = this._initialTime();
    this._updateDisplay(true);
    this._showButtons('idle');
    this._resetTaskUI();
    Store.set('pomo_state', null);
    document.title = UI.pageTitle();
  },

  // ── Finish (pause screen / overtime): log elapsed, reset ─────────────────
  _confirmFinish() {
    this._showFinishModal();
  },

  _showFinishModal() {
    const timeDisplay = document.getElementById('pomoTime')?.textContent?.trim() || '';
    const hasLaps  = this._laps.length > 0;
    const lastLap  = hasLaps ? this._laps[this._laps.length - 1] : null;
    const flagFmt  = lastLap ? this._fmtSecs(lastLap.elapsed) : '';
    const noLapStyle = !hasLaps ? 'opacity:.4;cursor:not-allowed;' : '';
    const wasOvertimeRunning = this.running && this._overtime;

    this._finishHandled = false;
    this._finishModal = new CustomModal({
      title:   UI.t('pomo_finish_confirm_title'),
      icon:    'flag',
      width:   440,
      content: `<div style="display:flex;flex-direction:column;gap:0.625rem">
        <p style="font-size:0.8125rem;color:var(--text-muted);margin:0 0 4px">
          ${UI.t('pomo_finish_select_msg')}
        </p>
        <button class="flow-reset-option opt-save" onclick="PomodoroPage._doFinishWithTime()">
          <span class="opt-title">${UI.t('pomo_finish_opt1_title')}</span>
          <span class="opt-desc">${UI.t('pomo_finish_opt1_desc', timeDisplay)}</span>
        </button>
        <button class="flow-reset-option opt-rewind" onclick="PomodoroPage._doFinishWithFlags()"
          style="${noLapStyle}" ${!hasLaps ? 'disabled' : ''}>
          <span class="opt-title">${UI.t('pomo_finish_opt2_title')}</span>
          <span class="opt-desc">${hasLaps ? UI.t('pomo_finish_opt2_desc', flagFmt) : UI.t('pomo_finish_opt2_no_flags')}</span>
        </button>
      </div>`,
      buttons: [],
      onClose: () => {
        if (!this._finishHandled) {
          this._showButtons(wasOvertimeRunning ? 'running' : 'paused');
        }
      },
    });
    this._finishModal.open();
  },

  _doFinishWithTime() {
    this._finishHandled = true;
    this._finishModal?.close();
    this.finish();
  },

  _doFinishWithFlags() {
    this._finishHandled = true;
    this._finishModal?.close();
    this._resetSaveToLastFlag();
  },

  finish() {
    this._stopTimer();
    this.running = false;

    let elapsed;
    const wasOvertime = this._overtime;
    if (this._overtime) {
      elapsed = (this._sessionDur || this._initialTime()) + this._overtimeSecs;
    } else if (this.timerType === 'flow') {
      elapsed = this.timeLeft;
    } else {
      elapsed = (this._sessionDur || this._initialTime()) - this.timeLeft;
    }
    this._overtime = false;
    this._overtimeSecs = 0;
    const durationMin = elapsed > 0 ? elapsed / 60 : 1 / 60;

    const taskId   = this._activeTaskId   || '';
    const taskText = this._activeTaskText || '';

    if (elapsed > 0) {
      const now = new Date();
      const completedAt = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const mode = this.timerType === 'flow' ? 'flow' : this.mode;
      this._clearSeedSessions();
      Store.addPomoSession({ date: UI.today(), mode, task: taskText, duration: durationMin, completedAt });
      this._autoLogTime(durationMin, completedAt, UI.today(), mode);
      UI.toast(UI.t('pomo_session_saved', this._fmtSecs(elapsed)), 'success');
      this.renderKPIs();
      this._renderDots();
    }

    // Pomodoro sayacını güncelle — bu oturumda kaç pomodoro tamamlandı?
    let pomosAllDone = false;
    const sessionPomos = this._taskPomoCurrent; // kaç pomodoro tamamlandı bu oturumda
    if (this._taskPomosRemaining !== null && sessionPomos > 0) {
      this._taskPomosRemaining = Math.max(0, this._taskPomosRemaining - sessionPomos);
      this._taskPomoCurrent    = 0;
      if (this._taskPomosRemaining <= 0.001) {
        this._taskPomosRemaining = null;
        this._taskPomosTotal     = null;
        pomosAllDone             = true;
      }
    }

    if (taskId) {
      if (sessionPomos > 0) {
        // Pomodoro ilerlemesini kaydet (tamamlansın ya da tamamlanmasın)
        this._incrementTaskPomoDone(taskId, durationMin, sessionPomos);
      }
      if (pomosAllDone) {
        // Tüm pomodorolar bitti — görevi tamamla
        this._checkAllFocusSubtasks();
        this._markTaskDone(taskId, 0); // spentMin zaten _incrementTaskPomoDone'da eklendi
      } else if (this._taskPomosRemaining === null && sessionPomos === 0) {
        // Pomodoro takibi yok (dakika tabanlı veya takipsiz) — finish her zaman tamamlar
        this._checkAllFocusSubtasks();
        this._markTaskDone(taskId, durationMin);
      }
      this._loadTasks();
      this.renderTodoList();
    }

    // Overtime bitişinde otomatik molaya geç
    if (wasOvertime) {
      // Görev pomolardan kaldıysa task seçimini koru, bitmişse sıfırla
      if (pomosAllDone || this._taskPomosRemaining === null) {
        this._resetTaskUI();
      } else {
        this._updatePomosCounter();
      }
      const workToday = Store.getPomo().sessions.filter(s => s.date === UI.today() && s.mode === 'work').length;
      this.setMode(workToday % 4 === 0 ? 'long' : 'short');
      Store.set('pomo_state', null);
      return;
    }

    this._flowSaved = true;
    this._laps      = [];
    this._renderLaps();
    this._showButtons('idle');
    if (pomosAllDone || this._taskPomosRemaining === null) {
      // Tüm pomolar tamamlandı ya da pomodoro takibi yok — UI sıfırla
      this.timeLeft = this._initialTime();
      this._updateDisplay(true);
      this._resetTaskUI();
    } else {
      // Kalan pomodoro var — task seçimini koru, sonraki oturum süresini ayarla
      this._updatePomosCounter();
      this._applyTaskPomoSession();
    }
    Store.set('pomo_state', null);
    document.title = UI.pageTitle();
  },

  _stopAndSave() {
    if (this.timerType === 'flow' && this.timeLeft >= 60) this._saveFlowSession();
    this._stopTimer();
    this.running = false;
  },

  // ── Timer infrastructure ──────────────────────────────────────
  _initWorker() {
    try {
      const code = 'let iv=null;self.onmessage=function(e){if(e.data==="start"){clearInterval(iv);iv=setInterval(function(){self.postMessage("tick");},500);}else if(e.data==="stop"){clearInterval(iv);iv=null;}};';
      const blob = new Blob([code], { type: 'application/javascript' });
      this._worker = new Worker(URL.createObjectURL(blob));
      this._worker.onmessage = () => { if (this.running) this._tick(); };
      this._worker.postMessage('start'); // keep tab alive for entire page lifetime
    } catch (_) {
      this._worker = null;
    }
  },

  _startTimer() {
    this._stopTimer();
    this._epochStart = Date.now();
    this._epochTimeLeft = this.timeLeft;
    this._epochOvertimeSecs = this._overtimeSecs;
    if (this._worker) {
      this._worker.postMessage('start');
    } else {
      this._iv = setInterval(() => { if (this.running) this._tick(); }, 500);
    }
  },

  _stopTimer() {
    // Worker keeps running to prevent tab sleep — only reset epoch and fallback interval
    clearInterval(this._iv);
    this._iv = null;
    this._epochStart = null;
  },

  // ── Tick ─────────────────────────────────────────────────────
  _tick() {
    if (!this.running || !this._epochStart) return;
    const elapsed = Math.floor((Date.now() - this._epochStart) / 1000);

    // KPI'ı her 60 saniyede bir canlı güncelle
    if (!this._kpiTickCt) this._kpiTickCt = 0;
    if (++this._kpiTickCt % 120 === 0) this.renderKPIs();

    if (this._overtime) {
      this._overtimeSecs = this._epochOvertimeSecs + elapsed;
      this._updateDisplay(false);
      if (this._broadcastCh) this._broadcastCh.postMessage('tick');
      return;
    }

    if (this.timerType === 'flow') {
      this.timeLeft = this._epochTimeLeft + elapsed;
      this._updateDisplay(false);
      if (this._broadcastCh) this._broadcastCh.postMessage('tick');
    } else {
      const next = Math.max(0, this._epochTimeLeft - elapsed);
      this.timeLeft = next;
      if (next === 0) {
        this._stopTimer();
        this._complete();
        return;
      }
      this._updateDisplay(false);
      if (this._broadcastCh) this._broadcastCh.postMessage('tick');
    }
  },

  // ── Complete ─────────────────────────────────────────────────
  _complete() {
    // _stopTimer already called in _tick() before _complete(); guard for direct calls
    this._stopTimer();
    this.running = false;
    this._updateDisplay(false);

    const taskId2  = this._activeTaskId   || '';
    const taskText = this._activeTaskText || '';
    const now       = new Date();
    const completedAt = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const durationMin = Math.round(this._sessionDur / 60) || 1;

    if (this.timerType === 'countdown') {
      Store.addPomoSession({ date: UI.today(), mode: 'countdown', task: taskText, duration: durationMin, completedAt });
      this._autoLogTime(durationMin, completedAt, UI.today(), 'countdown');
      if (taskId2) { this._checkAllFocusSubtasks(); this._markTaskDone(taskId2, durationMin); this._loadTasks(); this.renderTodoList(); }
      UI.toast(UI.t('pomo_toast_countdown_done'), 'success');
      this._showButtons('idle');
      this.timeLeft = this._initialTime();
      this._updateDisplay(true);
      this._resetTaskUI();
      Store.set('pomo_state', null);
      this.renderKPIs();
      this._renderDots();
    } else if (this.mode === 'work') {
      // Süresi doldu ama kullanıcı hazır değil — overtime başlat
      this._overtime = true;
      this._overtimeSecs = 0;
      this.running = true;
      this._startTimer();
      const ring = document.getElementById('pomoRing');
      if (ring) ring.style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--yellow').trim();
      document.getElementById('pomo-mode-label').textContent = UI.t('pomo_overtime');
      UI.toast(UI.t('pomo_toast_overtime', taskText ? ' — ' + taskText : ''), 'info');
      this._showButtons('running');
      // Do NOT save session or switch mode yet
    } else {
      // Mola bitti
      UI.toast(UI.t('pomo_toast_break_done'), 'info');
      this.setMode('work');
      // Görevde kalan pomodoro varsa sonraki oturumu ayarla
      if (this._taskPomosRemaining !== null && this._taskPomosRemaining > 0.001) {
        this._applyTaskPomoSession();
      }
      Store.set('pomo_state', null);
      this.renderKPIs();
      this._renderDots();
    }
  },

  // ── Flag: tüm modlarda çalışır ───────────────────────────────
  addFlag() {
    if (!this.running) return;
    const prev = this._laps.length ? this._laps[this._laps.length - 1].elapsed : 0;
    const now  = new Date();
    const localTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    // flow: elapsed = artan sayaç (timeLeft büyür); diğerleri: tüketilen süre
    const elapsed = this.timerType === 'flow' ? this.timeLeft : (this._sessionDur - this.timeLeft);
    const split   = elapsed - prev;
    this._laps.push({ elapsed, split, num: this._laps.length + 1, localTime });
    this._renderLaps();

    // Flow modu + pomodoro takibi: flag split süresi üzerinden sayacı ilerlet
    if (this.timerType === 'flow' && this._taskPomosRemaining !== null && split > 0) {
      const pomoFraction = Math.round((split / this.cfg.work) * 1000) / 1000;
      this._taskPomoCurrent    = Math.round((this._taskPomoCurrent + pomoFraction) * 1000) / 1000;
      this._taskPomosRemaining = Math.max(0, Math.round((this._taskPomosRemaining - pomoFraction) * 1000) / 1000);
      this._updatePomosCounter();
      // pomoDone'u habits_todos'a yaz ki todo listesi de güncellensin
      const flagTaskId = this._activeTaskId;
      if (flagTaskId) {
        this._incrementTaskPomoDone(flagTaskId, split / 60, pomoFraction);
        this.renderTodoList();
      }
      this._saveState();
    }
    // Her flag'de KPI'ı güncelle (akış süresi dahil)
    this.renderKPIs();
  },

  _renderLaps() {
    const el    = document.getElementById('pomo-laps');
    const fsEl  = document.getElementById('pomo-fs-flags');
    if (!el) return;
    if (!this._laps.length) {
      el.style.display = 'none';
      if (fsEl) fsEl.style.display = 'none';
      return;
    }
    el.style.display = '';
    this._renderFsFlags(fsEl);

    const _fmt = s => {
      const m = Math.floor(s / 60), sec = s % 60;
      return `${m}:${String(sec).padStart(2, '0')}`;
    };

    const SG  = "font-family:'Space Grotesk',sans-serif;font-variant-numeric:tabular-nums;";
    const TH  = (txt, align = 'left') =>
      `<span style="font-size:0.625rem;font-weight:600;color:var(--text-muted);letter-spacing:.7px;text-transform:uppercase;text-align:${align}">${txt}</span>`;
    const ROW = (border) =>
      `display:flex;align-items:center;height:2.75rem;padding:0 1rem;gap:0;box-sizing:border-box;${border ? 'border-bottom:1px solid var(--border);' : ''}`;

    const DEL_COL = 'width:3rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding-left:0.5rem';

    el.innerHTML =
      `<div style="display:flex;align-items:center;padding:0.5rem 1rem;gap:0;border-bottom:1px solid var(--border);background:var(--bg-elevated)">
        <span style="width:2.5rem">${TH('#')}</span>
        <span style="width:5.625rem">${TH(UI.t('pomo_lap_split'))}</span>
        <span style="flex:1">${TH(UI.t('pomo_lap_total'))}</span>
        <span style="width:3.25rem;text-align:right">${TH(UI.t('pomo_lap_time'), 'right')}</span>
        <span style="${DEL_COL}"></span>
      </div>` +
      (document.body.classList.contains('pomo-fullscreen') ? this._laps.slice(-3) : this._laps).slice().reverse().map((l, i, arr) => {
        const origIdx = l.num - 1;
        return `<div style="${ROW(i < arr.length - 1)}">
          <span style="width:2.5rem;height:1.625rem;display:flex;align-items:center;font-size:0.75rem;color:var(--text-muted)">#${l.num}</span>
          <span style="width:5.625rem;height:1.625rem;display:flex;align-items:center;${SG}font-size:0.8125rem;font-weight:700;color:#34D399">+${_fmt(l.split)}</span>
          <span style="flex:1;height:1.625rem;display:flex;align-items:center;${SG}font-size:0.8125rem;font-weight:600;color:var(--text-primary)">${_fmt(l.elapsed)}</span>
          <span style="width:3.25rem;height:1.625rem;display:flex;align-items:center;justify-content:flex-end;${SG}font-size:0.75rem;color:var(--text-muted)">${l.localTime || '—'}</span>
          <div style="${DEL_COL}">
            <button onclick="PomodoroPage.deleteFlagConfirm(${origIdx})"
              data-tooltip="${UI.t('btn_delete')}"
              style="width:1.625rem;height:1.625rem;display:flex;align-items:center;justify-content:center;background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.35);border-radius:0.5rem;cursor:pointer;color:#F87171;transition:background .15s,border-color .15s;flex-shrink:0;padding:0"
              onmouseenter="this.style.background='rgba(248,113,113,.25)';this.style.borderColor='rgba(248,113,113,.6)'"
              onmouseleave="this.style.background='rgba(248,113,113,.12)';this.style.borderColor='rgba(248,113,113,.35)'">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex-shrink:0"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>`;
      }).join('');
  },

  _renderFsFlags(fsEl) {
    if (!fsEl) return;
    const isFS = document.body.classList.contains('pomo-fullscreen');
    if (!isFS || !this._laps.length) { fsEl.style.display = 'none'; return; }

    const _fmt = s => { const m = Math.floor(s / 60), sec = s % 60; return `${m}:${String(sec).padStart(2, '0')}`; };
    const SG = "font-family:'Space Grotesk',sans-serif;font-variant-numeric:tabular-nums;";
    const last3 = this._laps.slice(-3);

    fsEl.style.display = 'flex';
    fsEl.innerHTML =
      `<div style="font-size:0.625rem;font-weight:700;color:var(--text-muted);letter-spacing:.8px;text-transform:uppercase;margin-bottom:0.625rem;padding:0 2px">
        ${UI.t('pomo_btn_flag')} (${this._laps.length})
       </div>` +
      last3.map((l, i) => `
        <div class="pomo-fsub" style="animation-delay:${i * 70}ms">
          <div style="width:1.125rem;height:1.125rem;border-radius:0.3125rem;border:2px solid #34D399;
                      display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#34D39918">
            <svg data-lucide="flag" style="width:0.5625rem;height:0.5625rem;color:#34D399"></svg>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:1px">
            <span style="${SG}font-size:0.8125rem;font-weight:700;color:#34D399">+${_fmt(l.split)}</span>
            <span style="${SG}font-size:0.75rem;color:var(--text-muted)">#${l.num} — ${_fmt(l.elapsed)}</span>
          </div>
        </div>`).join('');

    lucide.createIcons({ nodes: [fsEl] });
  },

  // ── Flag silindi: pomo sayacını kalan lap'lardan yeniden hesapla ──
  _recalcPomosAfterFlagDelete() {
    if (this._taskPomosTotal === null || !this._activeTaskId) return;
    const fromLogs = Store.calcTaskPomodoros(this._activeTaskId, this._activeTaskText);
    const fromLaps = Math.round(
      this._laps.reduce((s, l) => s + l.split / this.cfg.work, 0) * 1000
    ) / 1000;
    this._taskPomoCurrent    = fromLaps;
    this._taskPomosRemaining = Math.max(
      0,
      Math.round((this._taskPomosTotal - fromLogs - fromLaps) * 1000) / 1000
    );
    // Storage'ı da güncelle (ghost progress önleme)
    const data = Store.get('habits_todos') || { items: [] };
    const item = data.items.find(t => t.id === this._activeTaskId);
    if (item) {
      item.pomoDone = Math.round((fromLogs + fromLaps) * 1000) / 1000;
      Store.set('habits_todos', data);
    }
    this._updatePomosCounter();
    this.renderTodoList();
  },

  // ── Flag silme ────────────────────────────────────────────────
  deleteFlagConfirm(idx) {
    const skip = Store.get('pomo_flag_del_skip');
    if (skip === UI.today()) {
      this._laps.splice(idx, 1);
      this._laps.forEach((l, i) => { l.num = i + 1; });
      this._recalcPomosAfterFlagDelete();
      this._renderLaps();
      this._saveState();
      this.renderKPIs();
      UI.toast(UI.t('pomo_flag_deleted'), 'info');
      return;
    }
    this._pendingDeleteFlagIdx = idx;
    this._deleteFlagModal = new CustomModal({
      title:   UI.t('btn_delete'),
      icon:    'trash-2',
      variant: 'danger',
      width:   400,
      content: `<p style="color:var(--text-secondary);font-size:0.875rem;line-height:1.6;margin:0 0 1.125rem">${UI.t('pomo_flag_del_confirm_msg')}</p>
        <div id="flagDel-skip-row" style="display:flex;align-items:center;gap:0.625rem;cursor:pointer;user-select:none;width:100%">
          ${CheckboxCore.html({ done: false, type: 'sm', color: 'var(--red)', extraClass: 'cbx-bordered' })}
          <span style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.4;flex:1">${UI.t('pomo_flag_del_no_today')}</span>
        </div>`,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: () => this._cancelFlagDelete() },
        { label: UI.t('btn_delete'), variant: 'danger',    onClick: () => this._confirmFlagDelete() },
      ],
    });
    this._deleteFlagModal.open();
    const _fdRow = document.getElementById('flagDel-skip-row');
    if (_fdRow) _fdRow.addEventListener('click', () => { CheckboxCore.toggle(_fdRow.querySelector('.cbx')); });
  },

  _confirmFlagDelete() {
    const _fdSkipRow = document.getElementById('flagDel-skip-row');
    if (_fdSkipRow && CheckboxCore.isChecked(_fdSkipRow.querySelector('.cbx'))) {
      Store.set('pomo_flag_del_skip', UI.today());
    }
    this._deleteFlagModal?.close();
    const idx = this._pendingDeleteFlagIdx;
    this._pendingDeleteFlagIdx = null;
    if (idx === null || idx === undefined) return;
    this._laps.splice(idx, 1);
    this._laps.forEach((l, i) => { l.num = i + 1; });
    this._recalcPomosAfterFlagDelete();
    this._renderLaps();
    this._saveState();
    this.renderKPIs();
    UI.toast(UI.t('pomo_flag_deleted'), 'info');
  },

  _cancelFlagDelete() {
    this._pendingDeleteFlagIdx = null;
    this._deleteFlagModal?.close();
  },

  // ── Todo list ─────────────────────────────────────────────────
  _getTodos() {
    return (Store.get('habits_todos') || { items: [] }).items;
  },

  _saveTodos(items) {
    Store.set('habits_todos', { items });
  },

  _todoFormHTML(mode) {
    const isEdit = mode === 'edit';
    const textF   = isEdit ? 'editTodoText'       : 'todoText';
    const pomosF  = isEdit ? 'editTodoPomodoros'  : 'todoPomodoros';
    const durF    = isEdit ? 'editTodoDuration'   : 'todoDuration';
    const catSel  = isEdit ? 'editTodoCategorySelect' : 'addTodoCategorySelect';
    const catBtn  = isEdit ? 'editTodoCategoryBtn'    : 'addTodoCategoryBtn';
    const catDot  = isEdit ? 'editTodoCategoryDot'    : 'addTodoCategoryDot';
    const catLbl  = isEdit ? 'editTodoCategoryLabel'  : 'addTodoCategoryLabel';
    const catF    = isEdit ? 'editTodoCategory'   : 'todoCategory';
    const noteF   = isEdit ? 'editTodoNote'       : 'todoNote';
    const subList = isEdit ? 'editSubtaskList'    : 'addSubtaskList';
    const formId  = isEdit ? 'editTodoForm'       : 'addTodoForm';
    const CHEV = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>`;
    const cats = ['Çalışma','Öğrenme','Egzersiz','Sosyal','Uyku','Diğer'].map(v => `<option value="${v}">${v}</option>`).join('');
    return `<form id="${formId}" onsubmit="return false"><div style="display:flex;flex-direction:column;gap:1rem">
      <div class="form-group">
        <label class="form-label">${UI.t('pomo_task_text_label')}</label>
        <input class="form-control" type="text" name="${textF}" placeholder="${UI.t('pomo_task_placeholder')}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" style="display:flex;align-items:center;gap:0.375rem">
            <span>${UI.t('pomo_pomodoro_count')}</span>
            <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span>
          </label>
          <input class="form-control" type="number" name="${pomosF}" min="0.1" max="20" step="0.1" placeholder="1"
            oninput="if(this.value.trim())this.form.${durF}.value=''">
        </div>
        <div class="form-group">
          <label class="form-label" style="display:flex;align-items:center;gap:0.375rem">
            <span>${UI.t('pomo_est_duration')}</span>
            <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span>
          </label>
          <div style="display:flex;align-items:center;gap:0.5rem">
            <input class="form-control" type="number" name="${durF}" min="1" max="480" placeholder="30" style="flex:1"
              oninput="if(this.value.trim())this.form.${pomosF}.value=''">
            <span style="color:var(--text-muted);font-size:0.8125rem;white-space:nowrap">${UI.t('pomo_minutes_label')}</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('lbl_category')}</label>
        <select name="${catF}" id="${catSel}" style="display:none">${cats}</select>
        <button type="button" id="${catBtn}" onclick="PomodoroPage._openCategoryDropdown(this,'${catSel}')"
          style="width:100%;display:flex;align-items:center;gap:0.5rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;text-align:left;overflow:hidden">
          <span id="${catDot}" style="width:0.625rem;height:0.625rem;border-radius:50%;background:#7C6CFC;flex-shrink:0"></span>
          <span id="${catLbl}" style="font-size:0.8125rem;color:var(--text-primary);flex:1">${UI.t('pomo_cat_work')}</span>
          ${CHEV}
        </button>
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;gap:0.375rem">
          <span>${UI.t('pomo_note_label')}</span>
          <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span>
        </label>
        <textarea class="form-control" name="${noteF}" rows="2" placeholder="${UI.t('pomo_note_placeholder')}"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;justify-content:space-between">
          <span><span>${UI.t('pomo_subtasks_label')}</span> <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span></span>
          <button type="button" class="btn btn-ghost btn-sm" onclick="PomodoroPage._addSubtaskField('${subList}')">
            <svg data-lucide="plus" style="width:0.75rem;height:0.75rem"></svg> ${UI.t('pomo_add_subtask_btn')}
          </button>
        </label>
        <div id="${subList}"></div>
      </div>
    </div></form>`;
  },

  openTodoModal() {
    this._addTodoModal = new CustomModal({
      title:   UI.t('pomo_new_todo_title'),
      icon:    'plus-circle',
      width:   520,
      content: this._todoFormHTML('add'),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => this.saveTodo() },
      ],
    });
    this._addTodoModal.open();
    this._selectCategory('Çalışma', 'addTodoCategorySelect', '#7C6CFC');
    document.getElementById('addTodoForm').addEventListener('submit', e => { e.preventDefault(); this.saveTodo(); });
  },

  saveTodo() {
    const f    = document.getElementById('addTodoForm');
    const text = f.todoText.value.trim();
    if (!text) return;
    const rawPomos = parseFloat(f.todoPomodoros.value);
    const rawMins  = parseInt(f.todoDuration.value);
    const pomodoros = (!isNaN(rawPomos) && rawPomos > 0) ? rawPomos : ((!isNaN(rawMins) && rawMins > 0) ? null : 1);
    const duration  = (!isNaN(rawMins) && rawMins > 0 && !pomodoros) ? rawMins : null;
    const category = f.todoCategory.value;
    const note     = f.todoNote.value.trim() || null;
    const subtasks = this._readSubtasks('addSubtaskList');
    const items    = this._getTodos();
    items.push({ id: Store._id(), text, date: UI.today(), done: false, pomodoros, duration, pomoDone: 0, category, note, subtasks });
    this._saveTodos(items);
    this._addTodoModal?.close();
    UI.toast(UI.t('pomo_task_added'), 'success');
    this.renderTodoList();
    this._loadTasks();
  },

  toggleTodo(id) {
    const items = this._getTodos();
    const t = items.find(i => i.id === id);
    if (t) {
      t.done = !t.done;
      // Görev yeniden aktif edildiğinde alt görevler de sıfırlanır
      if (!t.done && t.subtasks?.length) {
        t.subtasks.forEach(s => { s.done = false; });
      }
    }
    this._saveTodos(items);
    this.renderTodoList();
    this._loadTasks();
  },

  deleteTodo(id) {
    DeleteManager.confirm({
      module:       'todo',
      title:        UI.t('btn_delete'),
      message:      UI.t('pomo_confirm_del_todo'),
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        this._saveTodos(this._getTodos().filter(i => i.id !== id));
        this.renderTodoList();
        this._loadTasks();
      },
    });
  },

  _addSubtaskField(containerId, text, done) {
    const container = document.getElementById(containerId);
    const id = Store._id();
    const div = document.createElement('div');
    div.className = 'subtask-input-row';
    div.dataset.subtaskId = id;
    div.dataset.done = done ? 'true' : 'false';
    div.style.cssText = 'display:flex;align-items:center;gap:0.5rem;margin-top:0.375rem';
    div.innerHTML = `
      <div style="width:1rem;height:1rem;border-radius:0.25rem;border:2px solid var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;background:${done ? 'var(--blue)' : 'transparent'};border-color:${done ? 'var(--blue)' : 'var(--border)'}"
        onclick="this.dataset.done=this.dataset.done==='true'?'false':'true';this.closest('.subtask-input-row').dataset.done=this.dataset.done;this.style.background=this.dataset.done==='true'?'var(--blue)':'transparent';this.style.borderColor=this.dataset.done==='true'?'var(--blue)':'var(--border)'">
      </div>
      <input class="form-control" type="text" placeholder="${UI.t('pomo_subtask_placeholder')}" value="${(text||'').replace(/"/g,'&quot;')}"
        style="flex:1;font-size:0.8125rem;padding:0.3125rem 0.625rem"
        onkeydown="if(event.key==='Enter'){event.preventDefault();event.stopPropagation();if(this.value.trim())PomodoroPage._addSubtaskField('${containerId}');}">
      <button type="button" onclick="this.closest('.subtask-input-row').remove()" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;padding:0.25rem;display:flex;align-items:center">
        <svg data-lucide="x" style="width:0.8125rem;height:0.8125rem"></svg>
      </button>`;
    container.appendChild(div);
    lucide.createIcons({ nodes: [div] });
    if (!text) div.querySelector('input').focus();
  },

  _readSubtasks(containerId) {
    return [...document.querySelectorAll(`#${containerId} .subtask-input-row`)]
      .map(row => ({
        id: row.dataset.subtaskId || Store._id(),
        text: row.querySelector('input').value.trim(),
        done: row.dataset.done === 'true'
      }))
      .filter(s => s.text);
  },

  _CAT_LIST: [
    { val: 'Çalışma',  color: '#7C6CFC', key: 'pomo_cat_work' },
    { val: 'Öğrenme',  color: '#60A5FA', key: 'pomo_cat_learn' },
    { val: 'Egzersiz', color: '#34D399', key: 'pomo_cat_exercise' },
    { val: 'Sosyal',   color: '#F472B6', key: 'pomo_cat_social' },
    { val: 'Uyku',     color: '#FBBF24', key: 'pomo_cat_sleep' },
    { val: 'Diğer',    color: '#8888AA', key: 'pomo_cat_other' },
  ],

  _openCategoryDropdown(btn, selectId) {
    // Lazy-init: selectId closure'a kaptırılır — add ve edit butonları ayrı instance
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn,
        items: [],
        onOpen: (dd) => {
          const cur = document.getElementById(selectId)?.value || 'Çalışma';
          dd.setItems(this._CAT_LIST.map(c => ({
            value: c.val, label: UI.t(c.key), color: c.color,
            active: c.val === cur,
          })));
        },
        onSelect: (val, item) => this._selectCategory(val, selectId, item.color),
        minWidth: 180,
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _selectCategory(val, selectId, color) {
    const sel = document.getElementById(selectId);
    if (sel) sel.value = val;

    const isAdd   = selectId === 'addTodoCategorySelect';
    const dotId   = isAdd ? 'addTodoCategoryDot'   : 'editTodoCategoryDot';
    const labelId = isAdd ? 'addTodoCategoryLabel' : 'editTodoCategoryLabel';

    const cat = this._CAT_LIST.find(c => c.val === val);
    const dot   = document.getElementById(dotId);
    const label = document.getElementById(labelId);
    if (dot)   dot.style.background = color || (cat ? cat.color : '#7C6CFC');
    if (label) label.textContent    = cat ? UI.t(cat.key) : val;
  },

  editTodo(id) {
    const todo = this._getTodos().find(t => t.id === id);
    if (!todo) return;
    this._editingTodoId = id;
    this._editTodoModal = new CustomModal({
      title: UI.t('pomo_edit_task'), icon: 'edit-3', width: 460,
      content: this._todoFormHTML('edit'),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => { this._editingTodoId = null; m.close(); } },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => this.saveEditTodo() },
      ],
    });
    this._editTodoModal.open();

    const f = document.getElementById('editTodoForm');
    f.editTodoText.value      = todo.text;
    f.editTodoPomodoros.value = todo.pomodoros != null ? todo.pomodoros : '';
    f.editTodoDuration.value  = todo.duration  != null ? todo.duration  : '';
    f.editTodoNote.value      = todo.note || '';
    const catVal = todo.category || 'Çalışma';
    const catObj = this._CAT_LIST.find(c => c.val === catVal);
    this._selectCategory(catVal, 'editTodoCategorySelect', catObj ? catObj.color : '#7C6CFC');
    (todo.subtasks || []).forEach(s => this._addSubtaskField('editSubtaskList', s.text, s.done));
    f.addEventListener('submit', e => { e.preventDefault(); this.saveEditTodo(); });
  },

  saveEditTodo() {
    const id = this._editingTodoId;
    if (!id) return;
    const f    = document.getElementById('editTodoForm');
    const text = f.editTodoText.value.trim();
    if (!text) return;
    const items = this._getTodos();
    const idx   = items.findIndex(t => t.id === id);
    if (idx === -1) return;
    const eRawPomos = parseFloat(f.editTodoPomodoros.value);
    const eRawMins  = parseInt(f.editTodoDuration.value);
    const ePomodoros = (!isNaN(eRawPomos) && eRawPomos > 0) ? eRawPomos : ((!isNaN(eRawMins) && eRawMins > 0) ? null : 1);
    const eDuration  = (!isNaN(eRawMins) && eRawMins > 0 && !ePomodoros) ? eRawMins : null;
    items[idx] = {
      ...items[idx],
      text,
      pomodoros: ePomodoros,
      duration:  eDuration,
      pomoDone:  items[idx].pomoDone || 0,
      category:  f.editTodoCategory.value,
      note:      f.editTodoNote.value.trim() || null,
      subtasks:  this._readSubtasks('editSubtaskList'),
    };

    // DOM değişikliklerinden ÖNCE seçili görev ID'sini kaydet.
    // _loadTasks() sel.innerHTML'i yeniden oluşturur; bazı tarayıcılarda
    // bu işlem sonrası sel.value güvenilmez biçimde ilk option'a sıfırlanabilir.
    const _sel = document.getElementById('pomoTaskSelect');
    const _prevSelectedId = _sel?.value || '';

    this._saveTodos(items);
    this._editingTodoId = null;
    this._editTodoModal?.close();
    UI.toast(UI.t('pomo_task_updated'), 'success');
    this.renderTodoList();
    this._loadTasks();

    // _loadTasks() sonrası sel.value sıfırlanmış olabilir — zorla geri yükle
    if (_prevSelectedId && _sel) {
      _sel.value = _prevSelectedId;
      this._updateTaskTrigger();
    }

    // Seçili görev düzenlendiyse ve zaman akmamışsa pomodoro sayacını/süresini güncelle
    // Zaman akmış = timer çalışıyor VEYA timeLeft, sessionDur'dan küçük (tick olmuş)
    const _isSelected       = _prevSelectedId === id;
    const _timeHasNotFlowed = !this.running && this.timeLeft >= this._sessionDur;

    if (_isSelected && _timeHasNotFlowed) {
      if (ePomodoros && ePomodoros > 0 && this.timerType === 'pomodoro' && this.mode === 'work') {
        // Daha önce tamamlanan pomodoro sayısını koru:
        // seanslar arası geçişte timeLeft === sessionDur olabilir (yeni seans hazır);
        // bu durumda remaining'i sıfırdan başlatmak tamamlanan seansları silerdi.
        const _alreadyDone = (this._taskPomosTotal !== null && this._taskPomosRemaining !== null)
          ? Math.max(0, this._taskPomosTotal - this._taskPomosRemaining)
          : 0;
        const _newRemaining = Math.max(0, ePomodoros - _alreadyDone);
        this._taskPomosTotal     = ePomodoros;
        this._taskPomosRemaining = _newRemaining;
        if (_newRemaining > 0.001) {
          this._applyTaskPomoSession(); // timeLeft, _sessionDur ve sayacı günceller
        } else {
          // Yeni toplam daha önce tamamlanandan küçük/eşit — sayacı gizle
          this._taskPomosTotal     = null;
          this._taskPomosRemaining = null;
          this._taskPomoCurrent    = 0;
          this._updatePomosCounter();
        }
      } else if (eDuration && eDuration > 0 && this.timerType === 'pomodoro' && this.mode === 'work') {
        // Dakika tabanlı → timer süresini güncelle
        this._taskPomosTotal     = null;
        this._taskPomosRemaining = null;
        this._taskPomoCurrent    = 0;
        this.timeLeft    = eDuration * 60;
        this._sessionDur = this.timeLeft;
        this._updateDisplay(true);
        this._updatePomosCounter();
      } else {
        // Pomodoro da süre de yok → takibi temizle
        this._taskPomosTotal     = null;
        this._taskPomosRemaining = null;
        this._taskPomoCurrent    = 0;
        this._updatePomosCounter();
      }
    }
    this._renderSubtaskPanel();
  },

  _todoDragId: null,

  _todoDragStart(id, e) {
    if (e.target.closest('button') || e.target.closest('.cbx')) { e.preventDefault(); return; }
    this._todoDragId = id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    setTimeout(() => {
      const el = document.querySelector(`#todo-active .hc-row[data-id="${id}"]`);
      if (el) el.classList.add('hc-dragging');
    }, 0);
  },

  _todoDragOver(id, e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id === this._todoDragId) return;
    document.querySelectorAll('#todo-active .hc-row').forEach(r => r.classList.remove('hc-drag-over-top', 'hc-drag-over-bot'));
    const el = document.querySelector(`#todo-active .hc-row[data-id="${id}"]`);
    if (!el) return;
    const mid = el.getBoundingClientRect().top + el.offsetHeight / 2;
    el.classList.add(e.clientY < mid ? 'hc-drag-over-top' : 'hc-drag-over-bot');
  },

  _todoDragEnd() {
    document.querySelectorAll('#todo-active .hc-row').forEach(r =>
      r.classList.remove('hc-dragging', 'hc-drag-over-top', 'hc-drag-over-bot')
    );
    this._todoDragId = null;
  },

  _todoDrop(targetId, e) {
    e.preventDefault();
    document.querySelectorAll('#todo-active .hc-row').forEach(r =>
      r.classList.remove('hc-dragging', 'hc-drag-over-top', 'hc-drag-over-bot')
    );
    if (!this._todoDragId || this._todoDragId === targetId) { this._todoDragId = null; return; }

    const items = this._getTodos();
    const from  = items.findIndex(t => t.id === this._todoDragId);
    const to    = items.findIndex(t => t.id === targetId);
    if (from === -1 || to === -1) { this._todoDragId = null; return; }

    const el  = document.querySelector(`#todo-active .hc-row[data-id="${targetId}"]`);
    const mid = el ? el.getBoundingClientRect().top + el.offsetHeight / 2 : 0;
    const insertAfter = el ? e.clientY >= mid : false;

    const [item] = items.splice(from, 1);
    const newTo  = items.findIndex(t => t.id === targetId);
    items.splice(insertAfter ? newTo + 1 : newTo, 0, item);
    this._saveTodos(items);
    this._todoDragId = null;
    this.renderTodoList();
  },

  toggleSubtask(todoId, subId) {
    const items = this._getTodos();
    const todo  = items.find(t => t.id === todoId);
    if (!todo || !todo.subtasks) return;
    const sub = todo.subtasks.find(s => s.id === subId);
    if (sub) sub.done = !sub.done;
    this._saveTodos(items);
    this.renderTodoList();
    this._renderSubtaskPanel();
  },

  toggleSubtaskPanel(id) {
    this._openTodos[id] = !this._openTodos[id];
    const panel = document.getElementById(`subtasks-${id}`);
    if (panel) panel.style.display = this._openTodos[id] ? '' : 'none';
  },

  renderTodoList() {
    const td        = UI.today();
    const todos     = this._getTodos().filter(t => t.date === td);
    const active    = todos.filter(t => !t.done);
    const completed = todos.filter(t =>  t.done);

    const hdr = document.getElementById('todo-header');
    if (hdr) hdr.textContent = `${completed.length} / ${todos.length}`;

    const CAT_COLORS = { Çalışma:'#7C6CFC', Öğrenme:'#60A5FA', Egzersiz:'#34D399', Sosyal:'#F472B6', Uyku:'#FBBF24', Diğer:'#8888AA' };
    const _catLabel = k => ({ Çalışma: UI.t('pomo_cat_work'), Öğrenme: UI.t('pomo_cat_learn'), Egzersiz: UI.t('pomo_cat_exercise'), Sosyal: UI.t('pomo_cat_social'), Uyku: UI.t('pomo_cat_sleep'), Diğer: UI.t('pomo_cat_other') }[k] || k);

    const subtaskPanel = (t) => {
      const subs = t.subtasks || [];
      if (!subs.length) return '';
      const isOpen = !!this._openTodos[t.id];
      const rows = subs.map(s =>
        `<div class="hc-row hc-subtask${s.done ? ' hc-done' : ''}">
          <div style="width:2rem;flex-shrink:0"></div>
          ${CheckboxCore.html({ done: s.done, type: 'square', color: 'var(--blue)', onclick: `event.stopPropagation();PomodoroPage.toggleSubtask('${t.id}','${s.id}')` })}
          <span style="font-size:0.8125rem;color:var(--text-secondary);flex:1;${s.done ? 'text-decoration:line-through;color:var(--text-muted)' : ''}">${s.text}</span>
        </div>`
      ).join('');
      return `<div id="subtasks-${t.id}" style="display:${isOpen ? '' : 'none'}">${rows}</div>`;
    };

    const row = (t, isCompleted) => {
      const subs = t.subtasks || [];
      const hasSubtasks = subs.length > 0;
      const isOpen = !!this._openTodos[t.id];
      const catColor = CAT_COLORS[t.category] || '#8888AA';
      const catBadge = t.category
        ? `<span style="font-size:0.625rem;font-weight:700;padding:2px 7px;border-radius:0.25rem;background:${catColor}22;color:${catColor};flex-shrink:0;white-space:nowrap">${_catLabel(t.category)}</span>`
        : '';

      let timeBadge = '';
      if (isCompleted) {
        if (t.spentMinutes) {
          timeBadge = `<span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:700;color:var(--green);flex-shrink:0;white-space:nowrap">⏱ ${t.spentMinutes}${UI.t('mins_suffix')}</span>`;
        }
        if (t.pomodoros) {
          const pd = Math.round((t.pomoDone || 0) * 10) / 10;
          timeBadge += `<span style="font-size:0.6875rem;font-weight:700;color:var(--green);flex-shrink:0;white-space:nowrap;margin-left:0.25rem">🍅 ${pd}/${t.pomodoros}</span>`;
        }
      } else {
        if (t.pomodoros) {
          let pd;
          if (t.id === this._activeTaskId && this._taskPomosTotal !== null) {
            pd = Math.round((this._taskPomosTotal - (this._taskPomosRemaining || 0)) * 10) / 10;
          } else {
            pd = Math.round((t.pomoDone || 0) * 10) / 10;
          }
          const color = pd > 0 ? 'var(--green)' : 'var(--accent)';
          timeBadge = `<span style="font-size:0.6875rem;font-weight:700;color:${color};flex-shrink:0;white-space:nowrap">🍅 ${pd}/${t.pomodoros}</span>`;
        } else if (t.duration) {
          timeBadge = `<span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:700;color:var(--accent);flex-shrink:0;white-space:nowrap">${t.duration}${UI.t('mins_suffix')}</span>`;
        }
      }

      const timeLabel = (isCompleted && t.completedAt)
        ? `<span style="font-family:var(--font-mono);font-size:0.6875rem;color:var(--text-secondary);flex-shrink:0">${t.completedAt}</span>`
        : '';

      const subBadge = hasSubtasks
        ? `<span onclick="event.stopPropagation();PomodoroPage.toggleSubtaskPanel('${t.id}')" style="display:inline-flex;align-items:center;justify-content:center;width:1.25rem;height:1.25rem;border-radius:50%;background:rgba(96,165,250,0.15);border:1.5px solid rgba(96,165,250,0.45);color:var(--blue);font-size:0.625rem;font-weight:700;flex-shrink:0;font-family:var(--font-mono);cursor:pointer;line-height:1;padding:0" data-tooltip="${subs.filter(s=>s.done).length}/${subs.length} tamamlandı">${subs.length}</span>`
        : '';

      const clickArea = hasSubtasks
        ? `onclick="PomodoroPage.toggleSubtaskPanel('${t.id}')" style="cursor:pointer;flex:1;min-width:0;display:flex;align-items:center;gap:0.5rem"`
        : `style="flex:1;min-width:0;display:flex;align-items:center;gap:0.5rem"`;

      const textBlock = t.note
        ? `<div ${clickArea}>
            <div style="display:flex;flex-direction:column;gap:1px;min-width:0">
              <span class="hc-name${t.done ? ' hc-strike' : ''}">${t.text}</span>
              <span style="font-size:0.6875rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.note}</span>
            </div>
            ${subBadge}
          </div>`
        : `<div ${clickArea}>
            <span class="hc-name${t.done ? ' hc-strike' : ''}" style="min-width:0">${t.text}</span>
            ${subBadge}
          </div>`;

      const editBtn = !isCompleted
        ? `<button class="hc-del hc-edit-btn" data-tooltip="${UI.t('btn_edit')}" onclick="event.stopPropagation();PomodoroPage.editTodo('${t.id}')">
             <svg data-lucide="pencil" style="width:0.75rem;height:0.75rem"></svg>
           </button>`
        : '';

      const dragAttrs = !t.done
        ? ` draggable="true" ondragstart="PomodoroPage._todoDragStart('${t.id}',event)" ondragover="PomodoroPage._todoDragOver('${t.id}',event)" ondragend="PomodoroPage._todoDragEnd()" ondrop="PomodoroPage._todoDrop('${t.id}',event)"`
        : '';
      return `<div class="hc-row${t.done ? ' hc-done' : ''}" data-id="${t.id}"${dragAttrs}>
        ${CheckboxCore.html({ done: t.done, type: 'circle', color: 'var(--blue)', onclick: `event.stopPropagation();PomodoroPage.toggleTodo('${t.id}')` })}
        ${textBlock}
        ${catBadge}
        ${timeBadge}
        ${timeLabel}
        ${editBtn}
        <button class="hc-del" data-tooltip="Sil" onclick="event.stopPropagation();PomodoroPage.deleteTodo('${t.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>${subtaskPanel(t)}`;
    };

    const activeEl    = document.getElementById('todo-active');
    const completedEl = document.getElementById('todo-completed');
    const compSection = document.getElementById('todo-completed-section');

    compSection.style.display = 'none';

    if (!todos.length) {
      activeEl.innerHTML = `<div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.875rem">${UI.t('pomo_todo_empty')}</div>`;
    } else {
      const sorted = [...active, ...completed];
      activeEl.innerHTML = sorted.map(t => row(t, t.done)).join('');
    }

    lucide.createIcons({ nodes: [activeEl] });
  },

  // ── Mark todo task as done ────────────────────────────────────
  _markTaskDone(taskId, spentMin) {
    if (!taskId) return;
    const data = Store.get('habits_todos') || { items: [] };
    const item = data.items.find(t => t.id === taskId);
    if (item && !item.done) {
      item.done = true;
      if (spentMin) item.spentMinutes = (item.spentMinutes || 0) + spentMin;
      const now = new Date();
      item.completedAt = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      Store.set('habits_todos', data);
    }
  },

  // ── Pomodoro oturum sayacını artır (tamamlanmadan önce ilerleme kaydeder) ──
  // Flag marking sırasında anlık görüntü için incremental çalışır; session end
  // sonrasında _autoLogTime içindeki syncTaskProgress loglardan reconcile eder.
  _incrementTaskPomoDone(taskId, spentMin, pomosThisSession) {
    if (!taskId) return;
    const data = Store.get('habits_todos') || { items: [] };
    const item = data.items.find(t => t.id === taskId);
    if (!item) return;
    if (spentMin)         item.spentMinutes = (item.spentMinutes || 0) + spentMin;
    if (pomosThisSession) item.pomoDone     = Math.round(((item.pomoDone || 0) + pomosThisSession) * 1000) / 1000;
    Store.set('habits_todos', data);
  },

  // ── Focus subtask panel ─────────────────────────────────────
  _renderSubtaskPanel() {
    const panel  = document.getElementById('pomo-subtask-panel');
    const spacer = document.getElementById('pomo-subtask-spacer');
    if (!panel) return;

    const sel    = document.getElementById('pomoTaskSelect');
    const taskId = sel?.value || '';

    const _hide = () => {
      panel.style.display  = 'none';
      if (spacer) spacer.style.display = 'none';
    };

    if (!taskId) { _hide(); return; }

    const todos = (Store.get('habits_todos') || { items: [] }).items;
    const todo  = todos.find(t => t.id === taskId);
    const subs  = (todo?.subtasks || []).filter(s => s.text);

    if (!subs.length) { _hide(); return; }

    const isFS = document.body.classList.contains('pomo-fullscreen');

    panel.style.display = 'flex';
    // Spacer: panel fixed olduğunda layout'u etkilemez — her zaman gizli
    if (spacer) spacer.style.display = 'none';

    const header = isFS
      ? `<div style="font-size:0.625rem;font-weight:700;color:var(--text-muted);letter-spacing:.8px;text-transform:uppercase;margin-bottom:0.625rem;padding:0 2px">${UI.t('pomo_subtasks_header')}</div>`
      : '';

    panel.innerHTML = header + subs.map((s, i) => `
      <div class="pomo-fsub"
        ${isFS ? `style="animation-delay:${i * 70}ms"` : ''}
        onclick="PomodoroPage.toggleFocusSubtask('${s.id}','${taskId}')">
        ${CheckboxCore.html({ done: s.done, type: 'sm', color: 'var(--accent)', extraClass: 'pomo-fsub-cb' })}
        <span class="pomo-fsub-text${s.done ? ' done' : ''}">${s.text}</span>
      </div>`).join('');

    lucide.createIcons({ nodes: [panel] });
  },

  toggleFocusSubtask(subId, taskId) {
    const data = Store.get('habits_todos') || { items: [] };
    const todo = data.items.find(t => t.id === taskId);
    if (!todo?.subtasks) return;
    const sub = todo.subtasks.find(s => s.id === subId);
    if (sub) sub.done = !sub.done;
    Store.set('habits_todos', data);
    this._renderSubtaskPanel();
    this.renderTodoList();
  },

  // Bitir'e basıldığında kalan alt görevleri otomatik işaretle
  _checkAllFocusSubtasks() {
    const sel    = document.getElementById('pomoTaskSelect');
    const taskId = sel?.value || '';
    if (!taskId) return;
    const data = Store.get('habits_todos') || { items: [] };
    const todo = data.items.find(t => t.id === taskId);
    if (!todo?.subtasks?.length) return;
    let changed = false;
    todo.subtasks.forEach(s => { if (!s.done) { s.done = true; changed = true; } });
    if (changed) {
      Store.set('habits_todos', data);
      this._renderSubtaskPanel();
    }
  },

  _clearSeedSessions() {
    if (Store.get('pomo_seeded')) { Store.setPomo({ sessions: [] }); Store.set('pomo_seeded', null); }
    if (Store.get('time_seeded')) { Store.setTime({ logs: [] }); Store.set('time_seeded', null); }
  },

  // ── Auto-log to Time module ───────────────────────────────────
  _autoLogTime(durationMin, completedAt, date, mode) {
    if (mode === 'short' || mode === 'long') return; // breaks are not logged
    const taskId   = this._activeTaskId   || '';
    const taskText = this._activeTaskText || '';

    let category = 'Çalışma';
    if (taskId) {
      const todos = (Store.get('habits_todos') || { items: [] }).items;
      const todo  = todos.find(t => t.id === taskId);
      if (todo?.category) category = todo.category;
    }

    const project = taskText || UI.t('pomo_default_project');

    const [eh, em] = completedAt.split(':').map(Number);
    const durationSecs = Math.round(durationMin * 60);
    let startSec = eh * 3600 + em * 60 - durationSecs;
    if (startSec < 0) startSec += 86400;
    const start = `${String(Math.floor(startSec / 3600)).padStart(2,'0')}:${String(Math.floor((startSec % 3600) / 60)).padStart(2,'0')}`;

    Store.addTimeLog({ date, category, project, start, end: completedAt, duration: durationMin, source: 'pomodoro', taskId });
    // Log yazıldıktan sonra görevin pomoDone'unu loglardan yeniden hesapla
    if (taskId) Store.syncTaskProgress(taskId);
  },

  // ── Flow: save session ────────────────────────────────────────
  _saveFlowSession() {
    if (this._flowSaved) return;
    this._flowSaved = true;
    const taskText = this._activeTaskText || '';
    const now      = new Date();
    const completedAt = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const durationMin = this.timeLeft > 0 ? this.timeLeft / 60 : 1 / 60;
    this._clearSeedSessions();
    Store.addPomoSession({ date: UI.today(), mode: 'flow', task: taskText, duration: durationMin, completedAt });
    this._autoLogTime(durationMin, completedAt, UI.today(), 'flow');
    UI.toast(UI.t('pomo_flow_saved', this._fmtSecs(this.timeLeft)), 'success');
    this.renderKPIs();
  },

  // ── Display ──────────────────────────────────────────────────
  _updateDisplay(instant = false) {
    const secs = this.timeLeft;
    let ts;

    if (this._overtime) {
      const m = Math.floor(this._overtimeSecs / 60);
      const s = this._overtimeSecs % 60;
      ts = `+${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } else if (this.timerType === 'flow') {
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = secs % 60;
      ts = h > 0
        ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        : `${m}:${String(s).padStart(2, '0')}`;
    } else {
      const m = Math.floor(secs / 60), s = secs % 60;
      ts = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    const el = document.getElementById('pomoTime');
    if (el) {
      el.textContent = ts;
      const isFS = document.body.classList.contains('pomo-fullscreen');
      if (ts.length >= 8) {
        el.style.fontSize = isFS ? '3.75rem' : '2.9rem';
      } else if (ts.length >= 7) {
        el.style.fontSize = isFS ? '4.5rem' : '3.5rem';
      } else {
        el.style.fontSize = '';
      }
    }

    const ring = document.getElementById('pomoRing');
    if (ring) {
      let offset;
      if (this._overtime) {
        offset = 0; // ring dolu kalır
      } else if (this.timerType === 'flow') {
        offset = this.C * (1 - Math.min(secs / (90 * 60), 1));
      } else {
        const total = this._sessionDur || this._initialTime() || 1;
        offset = this.C * (1 - secs / total);
      }
      if (instant) {
        ring.style.transition = 'none';
        ring.style.strokeDashoffset = offset;
        void ring.getBoundingClientRect();
        ring.style.transition = 'stroke-dashoffset 1s linear, stroke .3s';
      } else {
        ring.style.strokeDashoffset = offset;
      }
    }

    const minLabel = document.getElementById('pomo-minute-label');
    if (minLabel && this.running) {
      let elapsed;
      if (this._overtime) {
        elapsed = (this._sessionDur || this._initialTime()) + this._overtimeSecs;
      } else if (this.timerType === 'flow') {
        elapsed = secs;
      } else {
        const total = this._sessionDur || this._initialTime() || 1;
        elapsed = total - secs;
      }
      const min = Math.floor(elapsed / 60) + 1;
      minLabel.textContent = UI.t('pomo_minute_n', min);
    }
  },

  // ── Dots ─────────────────────────────────────────────────────
  _renderDots() {
    const c = document.getElementById('pomoSessions');
    if (!c) return;
    const count = Store.getPomo().sessions.filter(s => s.date === UI.today() && s.mode === 'work').length;
    const n = Math.max(count, 4);
    c.innerHTML = Array.from({ length: n }, (_, i) =>
      `<div class="pomo-dot${i < count ? ' done' : ''}"></div>`
    ).join('') + (count > 0 ? `<span style="font-size:0.75rem;color:var(--text-muted);margin-left:0.375rem">${UI.t('pomo_sessions_n', count)}</span>` : '');
  },

  // ── Tasks ────────────────────────────────────────────────────
  _loadTasks() {
    const td    = UI.today();
    const todos = (Store.get('habits_todos') || { items: [] }).items
                    .filter(t => t.date === td && !t.done);
    const sel   = document.getElementById('pomoTaskSelect');
    if (!sel) return;
    const catLabel = k => ({ Çalışma: UI.t('pomo_cat_work'), Öğrenme: UI.t('pomo_cat_learn'), Egzersiz: UI.t('pomo_cat_exercise'), Sosyal: UI.t('pomo_cat_social'), Uyku: UI.t('pomo_cat_sleep'), Diğer: UI.t('pomo_cat_other') }[k] || k);
    sel.innerHTML = `<option value="">${UI.t('pomo_task_select')}</option>` +
      todos.map(t => {
        const pomoInfo = t.pomodoros ? `🍅 ${t.pomoDone || 0}/${t.pomodoros}` : '';
        const durInfo  = (!t.pomodoros && t.duration) ? `${t.duration}${UI.t('mins_suffix')}` : '';
        const meta  = [catLabel(t.category), pomoInfo || durInfo].filter(Boolean).join(', ');
        const label = meta ? `${UI.esc(t.text)} — ${meta}` : UI.esc(t.text);
        return `<option value="${t.id}" data-text="${UI.esc(t.text)}" data-pomodoros="${t.pomodoros || ''}" data-duration="${t.duration || ''}">${label}</option>`;
      }).join('');
    this._updateTaskTrigger();
  },

  _updateTaskTrigger() {
    const lbl = document.getElementById('pomoTaskLabel');
    const sel = document.getElementById('pomoTaskSelect');
    if (!lbl) return;
    const id = sel?.value || '';
    if (!id) {
      lbl.textContent      = UI.t('pomo_task_select');
      lbl.style.color      = 'var(--text-muted)';
      lbl.style.fontStyle  = 'italic';
      lbl.style.textAlign  = 'center';
    } else {
      const opt = sel?.selectedOptions[0];
      lbl.textContent      = opt?.dataset.text || opt?.textContent || '';
      lbl.style.color      = 'var(--text-primary)';
      lbl.style.fontStyle  = 'normal';
      lbl.style.textAlign  = 'left';
    }
  },

  _activateFreeFlow() {
    if (this._ddDismissed) return;
    this._ddDismissed    = true;
    this._activeTaskText = UI.t('pomo_default_project');

    const wrap   = document.getElementById('task-select-wrap');
    const active = document.getElementById('pomo-active-task');
    const btn    = document.getElementById('pomoTaskTrigger');

    // Gerçek görev seçimindeki aynı buton pulse animasyonu
    if (btn) {
      btn.classList.remove('dd-btn-selected');
      void btn.offsetWidth;
      btn.classList.add('dd-btn-selected');
      btn.addEventListener('animationend', () => btn.classList.remove('dd-btn-selected'), { once: true });
    }

    // Görev seçim alanını gizle (gerçek görev seçimiyle aynı animasyon)
    wrap?.classList.add('task-hidden');

    // Timer altındaki watermark'ı göster
    if (active) {
      active.textContent = UI.t('pomo_default_project');
      setTimeout(() => active.classList.add('visible'), 50);
    }
  },

  _openTaskDropdown(btn) {
    if (!btn._ddInst) {
      const catLabel = k => ({
        'Çalışma': UI.t('pomo_cat_work'),  'Öğrenme':  UI.t('pomo_cat_learn'),
        'Egzersiz': UI.t('pomo_cat_exercise'), 'Sosyal': UI.t('pomo_cat_social'),
        'Uyku':    UI.t('pomo_cat_sleep'),  'Diğer':    UI.t('pomo_cat_other'),
      }[k] || k);

      btn._ddInst = new CustomDropdown({
        btn,
        items: [],
        onOpen: (dd) => {
          const td    = UI.today();
          const todos = (Store.get('habits_todos') || { items: [] }).items.filter(t => t.date === td && !t.done);
          const curId = document.getElementById('pomoTaskSelect')?.value || '';

          if (!todos.length) {
            dd.setEmptyHtml(
              `<div style="padding:1.25rem 1rem;text-align:center">` +
              `<div style="font-size:1.75rem;margin-bottom:0.5rem">📋</div>` +
              `<div style="font-size:0.8125rem;color:var(--text-secondary);font-weight:500;margin-bottom:0.25rem">${UI.t('pomo_no_tasks_today')}</div>` +
              `<div style="font-size:0.6875rem;color:var(--text-muted)">${UI.t('pomo_todo_hint')}</div>` +
              `</div>`
            );
            dd.setItems([]);
            return;
          }
          dd.setEmptyHtml('');
          dd.setItems([
            { value: '', label: UI.t('pomo_default_project'), _isPlaceholder: true },
            ...todos.map(t => {
              const pomoInfo = t.pomodoros ? `🍅 ${t.pomoDone || 0}/${t.pomodoros}` : '';
              const durInfo  = (!t.pomodoros && t.duration) ? `${t.duration}${UI.t('mins_suffix')}` : '';
              const meta = [catLabel(t.category), pomoInfo || durInfo].filter(Boolean).join(' · ');
              return {
                value: t.id, label: t.text,
                _meta: meta, _pomodoros: t.pomodoros || '', _duration: t.duration || '',
                active: t.id === curId,
              };
            }),
          ]);
        },
        renderItem: (item, isActive) => {
          if (item._isPlaceholder) {
            return `<span class="dd-item-label" style="color:var(--text-muted);font-style:italic">${item.label}</span>`;
          }
          return `<div style="flex:1;min-width:0">` +
            `<div style="font-size:0.8125rem;color:var(--text-muted);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${isActive ? '600' : '400'}">${item.label}</div>` +
            (item._meta ? `<div style="font-size:0.6875rem;color:var(--text-muted);margin-top:2px;font-style:normal">${item._meta}</div>` : '') +
            `</div>` +
            `<svg class="dd-item-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        },
        onSelect: (id, item) => {
          if (item?._isPlaceholder) {
            PomodoroPage._activateFreeFlow();
            return;
          }
          PomodoroPage._selectTask(id, item?.label || '', item?._pomodoros || '', item?._duration || '');
        },
        onClose: () => {
          if (!PomodoroPage._activeTaskId) {
            PomodoroPage._activateFreeFlow();
          }
        },
        minWidth: 320,
        maxHeight: 320,
        align: 'left',
        keepOpenOnScroll: true,
      });
    }
    btn._ddInst.toggle();
  },

  _selectTask(id, dataText, dataPomodoros, dataDuration) {
    const sel = document.getElementById('pomoTaskSelect');
    if (!sel) return;
    if (id && !Array.from(sel.options).find(o => o.value === id)) {
      const ghost = document.createElement('option');
      ghost.value = id;
      ghost.dataset.text      = dataText      || '';
      ghost.dataset.pomodoros = dataPomodoros || '';
      ghost.dataset.duration  = dataDuration  || '';
      ghost.textContent = dataText || '';
      sel.appendChild(ghost);
    }
    sel.value = id;
    sel.dispatchEvent(new Event('change'));
  },

  // ── KPIs ─────────────────────────────────────────────────────
  renderKPIs() {
    const pomo = Store.getPomo();
    const td   = UI.today();
    // Tüm modları say (work + flow + countdown)
    const todaySessions  = pomo.sessions.filter(s => s.date === td);
    const todayMins      = todaySessions.reduce((a, s) => a + (s.duration || (s.mode === 'work' ? 25 : 0)), 0);
    const todayFlowMins  = pomo.sessions.filter(s => s.date === td && s.mode === 'flow')
                                        .reduce((a, s) => a + (s.duration || 0), 0);
    // Dün tarihi (her iki karşılaştırma için)
    const ydDate = new Date(); ydDate.setDate(ydDate.getDate() - 1);
    const ydStr  = ydDate.toISOString().split('T')[0];

    // Aktif oturumun henüz kaydedilmemiş süresini canlı ekle
    // Flow: çalışıyor veya duraklatılmış (F5) fark etmez — lap splitleri her zaman sayılır
    let liveSessionMins = 0;
    let liveFlowSecs    = 0;
    if (this.timerType === 'flow') {
      liveFlowSecs    = this._laps.reduce((s, l) => s + l.split, 0);
      liveSessionMins = Math.round(liveFlowSecs / 60);
    } else if (this.running && this.timerType === 'pomodoro' && this.mode === 'work' && this._sessionDur > 0) {
      liveSessionMins = Math.round((this._sessionDur - this.timeLeft) / 60);
    }
    const displayFlowMins = todayFlowMins + liveSessionMins;

    // Aktif görev pomodoro takibi varsa canlı tamamlanan sayısını hesapla
    let livePomosDone = null;
    if (this._taskPomosTotal !== null && this._taskPomosRemaining !== null) {
      livePomosDone = Math.round((this._taskPomosTotal - this._taskPomosRemaining) * 10) / 10;
    }

    // Dünkü akış ve odaklanma süresi karşılaştırması
    const yesterdayFlowMins   = pomo.sessions.filter(s => s.date === ydStr && s.mode === 'flow')
                                             .reduce((a, s) => a + (s.duration || 0), 0);
    const yesterdaySessions   = pomo.sessions.filter(s => s.date === ydStr);
    const yesterdaySessionCnt = yesterdaySessions.length;
    // livePomosDone aktifken dünü de pomodoro birimine çevir (cfg.work dakika cinsinden)
    const workMins = Store.get('pomo_cfg')?.work || 25;
    const yesterdayPomoEquiv  = Math.round(
      yesterdaySessions.reduce((a, s) => a + (s.duration || workMins) / workMins, 0) * 10
    ) / 10;
    // Seans sayısı = toplam süre / oturum süresi (oransal, ondalıklı)
    const yesterdayMins    = yesterdaySessions.reduce((a, s) => a + (s.duration || (s.mode === 'work' ? workMins : 0)), 0);
    const yesterdayCompare = livePomosDone !== null
      ? yesterdayPomoEquiv
      : Math.round(yesterdayMins / workMins * 10) / 10;

    // Günlük seri: zaman takibi loglarından ardışık gün sayısı
    const timeLogs = (Store.getTime().logs || []);
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      if (timeLogs.some(l => l.date === ds)) streak++;
      else break;
    }

    // Toplam süre (kaydedilmiş + canlı) / oturum süresi → oransal seans sayısı
    // livePomosDone sadece mevcut görevin done sayısını verir; diğer günün oturumlarını atlar.
    // Her zaman todayMins + canlı ilerleme formülünü kullan; 🍅 formatı için livePomosDone ayrı tutulur.
    const todayCount = Math.round((todayMins + liveSessionMins) / workMins * 10) / 10;
    const todayValue = livePomosDone !== null
      ? `${todayCount} 🍅`
      : UI.t('pomo_sessions_n', todayCount);
    const todayUp  = todayCount > 0;
    const streakUp = streak > 0;
    document.getElementById('kpi-grid').innerHTML = `
      <div class="pomo-stat-item">
        <span class="pomo-stat-label">${UI.t('pomo_kpi_today')}</span>
        <span class="pomo-stat-value">${todayValue}</span>
        <span class="pomo-stat-sub" style="color:${
          yesterdaySessionCnt === 0
            ? 'var(--text-muted)'
            : todayCount >= yesterdayCompare ? 'var(--green)' : 'var(--red)'
        }">
          ${yesterdaySessionCnt === 0
            ? UI.t('pomo_sessions_n', todayCount)
            : (() => {
                const diff = Math.round(Math.abs(todayCount - yesterdayCompare) * 10) / 10;
                return todayCount >= yesterdayCompare
                  ? `▲ ${UI.t('pomo_sessions_n', diff)} ${UI.t('pomo_vs_yday_more')}`
                  : `▼ ${UI.t('pomo_sessions_n', diff)} ${UI.t('pomo_vs_yday_less')}`;
              })()
          }
        </span>
      </div>
      <div class="pomo-stat-item">
        <span class="pomo-stat-label">${UI.t('pomo_kpi_flow')}</span>
        <span class="pomo-stat-value">${displayFlowMins} ${UI.t('mins_suffix')}</span>
        <span class="pomo-stat-sub" style="color:${
          yesterdayFlowMins === 0
            ? 'var(--text-muted)'
            : displayFlowMins >= yesterdayFlowMins ? 'var(--green)' : 'var(--red)'
        }">
          ${yesterdayFlowMins === 0
            ? `— ${UI.t('pomo_vs_yday_none')}`
            : displayFlowMins >= yesterdayFlowMins
              ? `▲ ${UI.fmtMinutes(displayFlowMins - yesterdayFlowMins)} ${UI.t('pomo_vs_yday_more')}`
              : `▼ ${UI.fmtMinutes(yesterdayFlowMins - displayFlowMins)} ${UI.t('pomo_vs_yday_less')}`
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
  },

  // ── Fullscreen ────────────────────────────────────────────────
  toggleFullscreen() {
    this._fullscreen = !this._fullscreen;
    document.body.classList.toggle('pomo-fullscreen', this._fullscreen);

    const btn = document.getElementById('pomoFullscreenToggle');
    if (btn) {
      btn.innerHTML = this._fullscreen
        ? `<svg data-lucide="minimize-2" style="width:0.875rem;height:0.875rem"></svg> ${UI.t('pomo_minimize')}`
        : `<svg data-lucide="maximize-2" style="width:0.875rem;height:0.875rem"></svg> ${UI.t('pomo_fullscreen')}`;
      lucide.createIcons({ nodes: [btn] });
    }
    const exitBtn = document.getElementById('pomo-fs-exit');
    if (exitBtn) lucide.createIcons({ nodes: [exitBtn] });

    if (this._fullscreen) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }

    // Subtask ve flags panellerini tam ekran moduna göre yeniden konumlandır
    this._renderSubtaskPanel();
    this._renderFsFlags(document.getElementById('pomo-fs-flags'));
    this._updateDisplay(true);
  },

  // ── Settings ──────────────────────────────────────────────────
  _toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
    const panel = document.getElementById('pomo-settings-panel');
    if (!panel) return;

    if (this.settingsOpen) {
      // Paneli body'e taşı — stacking context sorununu önler
      this._settingsPanelParent = panel.parentElement;
      this._settingsPanelNext   = panel.nextSibling;

      const bd = document.createElement('div');
      bd.id = 'pomo-settings-backdrop';
      bd.style.cssText = 'position:fixed;inset:0;z-index:1001;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);animation:lt-fade-in 140ms ease';
      bd.addEventListener('click', () => this._toggleSettings());
      document.body.appendChild(bd);

      panel.style.cssText = [
        'display:block',
        'position:fixed',
        'top:50%',
        'left:50%',
        'transform:translate(-50%,-50%)',
        'z-index:1002',
        'background:var(--bg-surface)',
        'border:1px solid var(--border)',
        'border-radius:var(--radius-lg)',
        'padding:1.5rem',
        'box-shadow:0 24px 64px rgba(0,0,0,.45)',
        'min-width:22rem',
        'width:360px',
        'animation:lt-slide-up 180ms cubic-bezier(.22,1,.36,1)',
      ].join(';');
      document.body.appendChild(panel);
      lucide.createIcons({ nodes: [panel] });
    } else {
      const bd = document.getElementById('pomo-settings-backdrop');
      if (bd) bd.remove();
      panel.style.cssText = 'display:none';
      if (this._settingsPanelParent) {
        this._settingsPanelParent.insertBefore(panel, this._settingsPanelNext || null);
      }
    }
  }
};

