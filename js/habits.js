const _hbExternalTooltip = TooltipCore.chartExternal({ id: 'hb-donut-ext-tooltip' });

const Habits = {
  DAYS: 30,
  _currentDate: null,
  _editingHabitId: null,
  _dragId: null,
  _addModal: null,
  _editModal: null,
  _mgrModal: null,

  _getDayLabels() {
    return [UI.t('day_mon'), UI.t('day_tue'), UI.t('day_wed'), UI.t('day_thu'), UI.t('day_fri'), UI.t('day_sat'), UI.t('day_sun')];
  },

  _dateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  init() {
    UI.initTopbar({ noPrivacy: true });
    UI.initEsc();
    this._currentDate = UI.today();
    document.getElementById('today-date-label').textContent = UI.longDate().split(',')[0];
    document.getElementById('addHabitBtn').addEventListener('click', () => this.openAddModal());
    document.getElementById('manageHabitsBtn').addEventListener('click', () => this.openHabitsMgr());
    this._autoEmoji();
    this._startMidnightWatch();
    this.render();
    document.addEventListener('lt:language-change', () => {
      document.getElementById('today-date-label').textContent = UI.longDate().split(',')[0];
      this.render();
    });
    document.addEventListener('lt:theme-change', () => this.render());
  },

  _autoEmoji() {
    const MAP = [
      [/kahvalt/i,           '🍳'],
      [/kitap|okuma|oku/i,   '📚'],
      [/duş|banyo|soğuk/i,   '🚿'],
      [/plan(la)?|günü/i,    '📋'],
      [/film|dizi|izle/i,    '🎬'],
      [/akış|flow|deep.?work|odak/i, '🌊'],
      [/diş|fırça/i,         '🦷'],
      [/yüz|cilt|jel/i,      '✨'],
      [/uyandı|yataktan|erken kalk/i, '🌅'],
      [/koş|spor|egzersiz|yürü/i,    '🏃'],
      [/meditasyon|nefes/i,  '🧘'],
      [/su|water/i,          '💧'],
      [/uyku|uyu/i,          '😴'],
      [/yazma|günlük|journal/i, '✍️'],
      [/müzik|çal/i,         '🎵'],
      [/ai|yapay zeka/i,     '🤖'],
      [/unity|blender|3d/i,  '🎮'],
      [/dil|ingilizce|spanish/i, '🗣️'],
      [/vitamin|ilaç/i,      '💊'],
      [/yemek|pişir/i,       '🍽️'],
    ];

    const hb = Store.getHabits();
    let changed = false;
    hb.list.forEach(h => {
      if (h.icon && h.icon !== '✓') return;
      const match = MAP.find(([re]) => re.test(h.name));
      if (match) { h.icon = match[1]; changed = true; }
    });
    if (changed) Store.setHabits(hb);
  },

  _onTypeChange() {
    const type = document.querySelector('[name=habitType]:checked')?.value;
    if (!type) return;
    document.getElementById('habitDaysGroup').style.display = type === 'scheduled' ? '' : 'none';
    document.querySelectorAll('.hm-type-opt').forEach(opt => {
      const r = opt.querySelector('[name=habitType]');
      if (r) opt.classList.toggle('selected', r.checked);
    });
  },

  _onEditTypeChange() {
    const type = document.querySelector('[name=editHabitType]:checked')?.value;
    if (!type) return;
    document.getElementById('editHabitDaysGroup').style.display = type === 'scheduled' ? '' : 'none';
    document.querySelectorAll('.hm-edit-type-opt').forEach(opt => {
      const r = opt.querySelector('[name=editHabitType]');
      if (r) opt.classList.toggle('selected', r.checked);
    });
  },

  _habitFormHTML(mode) {
    const isEdit = mode === 'edit';
    const nameField  = isEdit ? 'editHabitName'  : 'habitName';
    const iconField  = isEdit ? 'editHabitIcon'  : 'habitIcon';
    const colorField = isEdit ? 'editHabitColor' : 'habitColor';
    const typeField  = isEdit ? 'editHabitType'  : 'habitType';
    const daysId     = isEdit ? 'editHabitDaysGroup' : 'habitDaysGroup';
    const typeClass  = isEdit ? 'hm-edit-type-opt hm-type-opt' : 'hm-type-opt';
    const formId     = isEdit ? 'editHabitForm' : 'addHabitForm';
    const dayBtns = [
      { day:1, key:'day_mon' }, { day:2, key:'day_tue' }, { day:3, key:'day_wed' },
      { day:4, key:'day_thu' }, { day:5, key:'day_fri' }, { day:6, key:'day_sat' },
      { day:0, key:'day_sun' },
    ].map(d => `<button type="button" class="hm-day-btn" data-day="${d.day}" onclick="this.classList.toggle('active')">${UI.t(d.key)}</button>`).join('');
    return `<form id="${formId}" onsubmit="return false"><div style="display:flex;flex-direction:column;gap:1rem">
      <div class="form-group">
        <label class="form-label">${UI.t('habits_name_label')}</label>
        <input class="form-control" type="text" name="${nameField}" placeholder="${UI.t('habits_name_placeholder')}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('habits_icon_label')}</label>
          <input class="form-control" type="text" name="${iconField}" placeholder="🏃" maxlength="2" style="font-size:1.25rem;text-align:center">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('lbl_color')}</label>
          <input class="form-control" type="color" name="${colorField}" value="#7C6CFC" style="height:2.625rem;cursor:pointer;padding:0.25rem 0.5rem">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('habits_type_label')}</label>
        <div class="hm-type-row">
          <label class="${typeClass} selected">
            <input type="radio" name="${typeField}" value="permanent" checked>
            <div class="hm-type-opt-icon"><svg data-lucide="infinity"></svg></div>
            <div class="hm-type-opt-text">
              <span class="hm-type-name">${UI.t('habits_type_permanent')}</span>
              <span class="hm-type-desc">${UI.t('habits_type_permanent_desc')}</span>
            </div>
          </label>
          <label class="${typeClass}">
            <input type="radio" name="${typeField}" value="scheduled">
            <div class="hm-type-opt-icon"><svg data-lucide="calendar-check"></svg></div>
            <div class="hm-type-opt-text">
              <span class="hm-type-name">${UI.t('habits_type_timed')}</span>
              <span class="hm-type-desc">${UI.t('habits_type_timed_desc')}</span>
            </div>
          </label>
        </div>
      </div>
      <div class="form-group" id="${daysId}" style="display:none">
        <label class="form-label">${UI.t('habits_days_label')}</label>
        <div class="hm-day-picker">${dayBtns}</div>
      </div>
    </div></form>`;
  },

  openAddModal() {
    this._addModal = new CustomModal({
      title:   UI.t('habits_add_modal'),
      icon:    'plus-circle',
      width:   480,
      content: this._habitFormHTML('add'),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => this.save() },
      ],
    });
    this._addModal.open();
    document.querySelectorAll('[name=habitType]').forEach(r =>
      r.addEventListener('change', () => this._onTypeChange())
    );
    document.getElementById('addHabitForm').addEventListener('submit', e => { e.preventDefault(); this.save(); });
  },

  openHabitsMgr() {
    if (this._mgrModal && this._mgrModal._overlay?.isConnected) {
      this.renderHabitsMgr();
      return;
    }
    this._mgrModal = new CustomModal({
      title:   UI.t('habits_manage_modal'),
      icon:    'settings-2',
      width:   540,
      content: '<div id="habits-mgr-list"></div>',
      buttons: [],
    });
    this._mgrModal.open();
    this.renderHabitsMgr();
  },

  renderHabitsMgr() {
    const { list } = Store.getHabits();
    const el = document.getElementById('habits-mgr-list');
    if (!list.length) {
      el.innerHTML = `<div style="padding:2.5rem;text-align:center;color:var(--text-muted);font-size:0.875rem">${UI.t('habits_no_habits')}</div>`;
      return;
    }
    const DAY_LABELS = ['day_sun','day_mon','day_tue','day_wed','day_thu','day_fri','day_sat'].map(k => UI.t(k));
    el.innerHTML = list.map(h => {
      const isScheduled = h.type === 'scheduled';
      const daysText = isScheduled
        ? (h.days || []).slice().sort((a,b)=>a-b).map(d => DAY_LABELS[d]).join(' · ')
        : '';
      const metaLine = isScheduled
        ? `<span class="hm-mgr-meta">${daysText || UI.t('habits_no_day_selected')}</span>`
        : `<span class="hm-mgr-meta" style="color:var(--text-muted)">${UI.t('habits_daily')}</span>`;
      return `<div class="hm-mgr-row">
        <div class="hm-mgr-dot" style="background:${h.color}"></div>
        <span class="hm-mgr-emoji">${h.icon || '✓'}</span>
        <div class="hm-mgr-info">
          <span class="hm-mgr-name">${UI.esc(h.name)}</span>
          ${metaLine}
        </div>
        <div class="hm-mgr-actions">
          <button class="btn btn-ghost btn-sm" onclick="Habits.editHabit('${h.id}')">
            <svg data-lucide="pencil" style="width:0.8125rem;height:0.8125rem"></svg>${UI.t('habits_edit')}
          </button>
          <button class="btn btn-danger btn-sm" onclick="Habits.deleteHabit('${h.id}')">
            <svg data-lucide="trash-2" style="width:0.8125rem;height:0.8125rem"></svg>${UI.t('habits_delete')}
          </button>
        </div>
      </div>`;
    }).join('');
    lucide.createIcons({ nodes: [el] });
  },

  editHabit(id) {
    const { list } = Store.getHabits();
    const h = list.find(x => x.id === id);
    if (!h) return;

    if (this._mgrModal) this._mgrModal.close();

    this._editingHabitId = id;
    this._editModal = new CustomModal({
      title:   UI.t('habits_edit_modal'),
      icon:    'pencil',
      width:   480,
      content: this._habitFormHTML('edit'),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => { m.close(); this.openHabitsMgr(); } },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => this.saveEditHabit() },
      ],
    });
    this._editModal.open();

    const f = document.getElementById('editHabitForm');
    f.editHabitName.value  = h.name;
    f.editHabitIcon.value  = h.icon || '';
    f.editHabitColor.value = h.color || '#7C6CFC';

    document.querySelectorAll('[name=editHabitType]').forEach(r => {
      r.checked = r.value === (h.type || 'permanent');
    });
    document.querySelectorAll('.hm-edit-type-opt').forEach(opt => {
      const r = opt.querySelector('[name=editHabitType]');
      if (r) opt.classList.toggle('selected', r.checked);
    });
    document.querySelectorAll('#editHabitDaysGroup .hm-day-btn').forEach(btn => {
      btn.classList.toggle('active', (h.days || []).includes(parseInt(btn.dataset.day)));
    });
    document.getElementById('editHabitDaysGroup').style.display = h.type === 'scheduled' ? '' : 'none';

    document.querySelectorAll('[name=editHabitType]').forEach(r =>
      r.addEventListener('change', () => this._onEditTypeChange())
    );
    document.getElementById('editHabitForm').addEventListener('submit', e => { e.preventDefault(); this.saveEditHabit(); });
  },

  closeEditModal() {
    if (this._editModal) this._editModal.close();
    this.openHabitsMgr();
  },

  saveEditHabit() {
    const f    = document.getElementById('editHabitForm');
    const name = f.editHabitName.value.trim();
    if (!name) return;

    const type = document.querySelector('[name=editHabitType]:checked').value;
    let days = [];
    if (type === 'scheduled') {
      days = [...document.querySelectorAll('#editHabitDaysGroup .hm-day-btn.active')]
               .map(b => parseInt(b.dataset.day));
      if (!days.length) { UI.toast(UI.t('habits_min_one_day'), 'warning'); return; }
    }

    this._updateHabit(this._editingHabitId, {
      name,
      icon:  f.editHabitIcon.value || '✓',
      color: f.editHabitColor.value,
      type,
      days,
    });

    this._editingHabitId = null;
    if (this._editModal) this._editModal.close();
    UI.toast(UI.t('habits_updated'), 'success');
    this.render();
    this.openHabitsMgr();
  },

  _updateHabit(id, updates) {
    const hb  = Store.getHabits();
    const idx = hb.list.findIndex(h => h.id === id);
    if (idx > -1) hb.list[idx] = { ...hb.list[idx], ...updates };
    Store.setHabits(hb);
  },

  _startMidnightWatch() {
    setInterval(() => {
      const now = UI.today();
      if (now !== this._currentDate) {
        this._currentDate = now;
        document.getElementById('today-date-label').textContent = UI.longDate().split(',')[0];
        this.render();
      }
    }, 60000);
  },

  _getSkipped() {
    return (Store.get('habits_skip') || {})[UI.today()] || [];
  },

  skipHabit(habitId) {
    const data = Store.get('habits_skip') || {};
    const td = UI.today();
    if (!data[td]) data[td] = [];
    if (!data[td].includes(habitId)) data[td].push(habitId);
    Store.set('habits_skip', data);
    this.renderDailyChecklist();
    this.renderKPIs();
  },

  unskipHabit(habitId) {
    const data = Store.get('habits_skip') || {};
    const td = UI.today();
    if (data[td]) data[td] = data[td].filter(id => id !== habitId);
    Store.set('habits_skip', data);
    this.renderDailyChecklist();
    this.renderKPIs();
  },

  _scheduledHabits(dateStr) {
    const { list } = Store.getHabits();
    const dow = new Date(dateStr + 'T00:00:00').getDay();
    return list.filter(h => {
      if (h.type === 'scheduled') return (h.days || []).includes(dow);
      return true;
    });
  },

  render() {
    this.renderKPIs();
    this.renderDailyView();
  },

  renderDailyView() {
    this.renderDailyChecklist();
    this.renderGrid();
    this.renderDonutRow();
  },

  renderKPIs() {
    const { logs } = Store.getHabits();
    const td = UI.today();
    const todayHabits = this._scheduledHabits(td);
    const skippedIds  = this._getSkipped();
    const countable   = todayHabits.filter(h => !skippedIds.includes(h.id));
    const doneHabits  = logs.filter(l => l.date === td && l.done && countable.some(h => h.id === l.habitId)).length;
    const totalToday  = countable.length;
    const doneToday   = doneHabits;

    let weekPossible = 0, weekDone = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = this._dateStr(d);
      const sched = this._scheduledHabits(ds);
      weekPossible += sched.length;
      weekDone += logs.filter(l => l.date === ds && l.done && sched.some(h => h.id === l.habitId)).length;
    }
    const weekPct = weekPossible > 0 ? Math.round(weekDone / weekPossible * 100) : 0;

    const { list } = Store.getHabits();
    let bestStreak = 0;
    list.forEach(h => {
      let s = 0;
      for (let i = 0; i < 90; i++) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const ds = this._dateStr(d);
        if (h.type === 'scheduled' && !(h.days || []).includes(d.getDay())) continue;
        if (logs.find(l => l.habitId === h.id && l.date === ds && l.done)) s++;
        else break;
      }
      bestStreak = Math.max(bestStreak, s);
    });

    const pctToday = totalToday ? Math.round(doneToday / totalToday * 100) : 0;
    const stats = [
      { label: UI.t('habits_today_done'),   value: `${doneToday} / ${totalToday}`, sub: `%${pctToday}`,         icon: 'check-circle', color: '#34D399' },
      { label: UI.t('habits_week_success'), value: `%${weekPct}`,                  sub: UI.t('habits_last7'),   icon: 'trending-up',  color: '#60A5FA' },
      { label: UI.t('habits_streak_best'), value: UI.t('pomo_days_n', bestStreak), sub: UI.t('habits_streak_unit'), icon: 'zap', color: '#FBBF24' },
    ];
    const row = document.getElementById('kpi-stats-row');
    if (!row) return;
    row.innerHTML = stats.map(s => `
      <div class="hb-stat-item">
        <div class="hb-stat-icon" style="background:${s.color}22">
          <svg data-lucide="${s.icon}" style="color:${s.color}"></svg>
        </div>
        <div class="hb-stat-body">
          <span class="hb-stat-label">${s.label}</span>
          <span class="hb-stat-value">${s.value}</span>
          <span class="hb-stat-sub">${s.sub}</span>
        </div>
      </div>`).join('');
    lucide.createIcons({ nodes: [row] });
  },

  renderDailyChecklist() {
    const { logs } = Store.getHabits();
    const td          = UI.today();
    const todayHabits = this._scheduledHabits(td);
    const doneIds     = logs.filter(l => l.date === td && l.done).map(l => l.habitId);
    const skippedIds  = this._getSkipped();
    const active      = todayHabits.filter(h => !doneIds.includes(h.id) && !skippedIds.includes(h.id));
    const completed   = todayHabits.filter(h =>  doneIds.includes(h.id));
    const skipped     = todayHabits.filter(h =>  skippedIds.includes(h.id) && !doneIds.includes(h.id));
    const countable   = todayHabits.filter(h => !skippedIds.includes(h.id));

    const row = (h, done, isSkipped) => {
      let streak = 0;
      for (let i = 0; i < 90; i++) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const ds = this._dateStr(d);
        if (h.type === 'scheduled' && !(h.days || []).includes(d.getDay())) continue;
        if (logs.find(l => l.habitId === h.id && l.date === ds && l.done)) streak++;
        else break;
      }
      const badge = h.type === 'scheduled'
        ? `<span style="font-size:0.625rem;font-weight:600;padding:2px 0.375rem;border-radius:0.25rem;background:rgba(96,165,250,.15);color:var(--blue);margin-right:2px;flex-shrink:0">${UI.t('habits_time_badge')}</span>`
        : '';
      const actionBtn = done ? '' : isSkipped
        ? `<button class="hc-undo" data-tooltip="${UI.t('habits_unskip')}" onclick="Habits.unskipHabit('${h.id}')">
             <svg data-lucide="rotate-ccw" style="width:0.8125rem;height:0.8125rem"></svg>
           </button>`
        : `<button class="hc-del" data-tooltip="${UI.t('habits_skip')}" onclick="Habits.skipHabit('${h.id}')">
             <svg data-lucide="minus" style="width:0.8125rem;height:0.8125rem"></svg>
           </button>`;
      const draggable = isSkipped ? '' : `draggable="true"
        ondragstart="Habits.dragStart('${h.id}', event)"
        ondragover="Habits.dragOver('${h.id}', event)"
        ondrop="Habits.drop('${h.id}', event)"
        ondragend="Habits.dragEnd()"`;
      return `<div class="hc-row${done ? ' hc-done' : ''}${isSkipped ? ' hc-skipped' : ''}"
        data-id="${h.id}" ${draggable}>
        ${CheckboxCore.html({ done, type: 'circle', color: 'var(--green)', onclick: isSkipped ? '' : `Habits.toggle('${h.id}')` })}
        <span class="hc-icon">${h.icon || '✓'}</span>
        <span class="hc-name${done ? ' hc-strike' : ''}">${h.name}</span>
        ${badge}
        <div style="flex:1"></div>
        ${streak > 1 && !isSkipped ? `<span class="hc-streak" style="color:${h.color}">🔥 ${streak}</span>` : ''}
        ${actionBtn}
      </div>`;
    };

    const activeEl   = document.getElementById('daily-active');
    const completedEl = document.getElementById('daily-completed');
    const skippedEl  = document.getElementById('daily-skipped');
    const compSection = document.getElementById('completed-section');
    const skipSection = document.getElementById('skipped-section');
    document.getElementById('checklist-header').textContent = `${completed.length} / ${countable.length}`;

    if (!todayHabits.length) {
      activeEl.innerHTML = `<div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.875rem">
        ${UI.t('habits_none_today')} <a href="#" onclick="event.preventDefault();Habits.openAddModal()" style="color:var(--accent)">${UI.t('habits_add_link')}</a>
      </div>`;
    } else if (!active.length && countable.length > 0) {
      activeEl.innerHTML = `<div style="padding:1.25rem;text-align:center;color:var(--green);font-size:0.875rem;font-weight:600">🎉 ${UI.t('habits_all_done')}</div>`;
    } else {
      activeEl.innerHTML = active.map(h => row(h, false, false)).join('');
    }

    if (completed.length) {
      completedEl.innerHTML = completed.map(h => row(h, true, false)).join('');
      compSection.style.display = 'block';
    } else {
      compSection.style.display = 'none';
    }

    if (skipped.length) {
      skippedEl.innerHTML = skipped.map(h => row(h, false, true)).join('');
      skipSection.style.display = 'block';
    } else {
      skipSection.style.display = 'none';
    }

    lucide.createIcons({ nodes: [activeEl, completedEl, skippedEl] });
  },

  _getTodos() {
    return (Store.get('habits_todos') || { items: [] }).items;
  },

  _saveTodos(items) {
    Store.set('habits_todos', { items });
  },

  _getWeekDays() {
    const today = new Date();
    const dow   = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() + (dow === 0 ? -6 : 1 - dow));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return this._dateStr(d);
    });
  },

  _dayStats(date) {
    const { logs } = Store.getHabits();
    const scheduled  = this._scheduledHabits(date);
    const doneHabits = logs.filter(l => l.date === date && l.done && scheduled.some(h => h.id === l.habitId)).length;
    const total = scheduled.length;
    const done  = doneHabits;
    return { total, done, pct: total > 0 ? Math.round(done / total * 100) : -1 };
  },

  renderDonutRow() {
    const weekDays  = this._getWeekDays();
    const today     = UI.today();
    const dayLabels = this._getDayLabels();

    const dayData = weekDays.map((date, i) => {
      const isFuture = date > today;
      const isToday  = date === today;
      const stats    = isFuture ? { total: 0, done: 0, pct: -1 } : this._dayStats(date);
      return { date, isFuture, isToday, stats, label: dayLabels[i], canvasId: `hb-donut-day-${i}` };
    });

    const elapsed = dayData.filter(d => !d.isFuture);
    const wTotal  = elapsed.reduce((s, d) => s + d.stats.total, 0);
    const wDone   = elapsed.reduce((s, d) => s + d.stats.done, 0);
    const weekPct = wTotal > 0 ? Math.round(wDone / wTotal * 100) : 0;

    const dayItems = dayData.map(({ isFuture, isToday, stats, label, canvasId }) => {
      const pctLabel = isFuture || stats.pct < 0 ? '—' : stats.pct + '%';
      return `<div class="hb-donut-item">
        <div class="hb-donut-wrap">
          <canvas id="${canvasId}"></canvas>
          ${isToday ? '<div class="hb-donut-today-dot"></div>' : ''}
        </div>
        <span class="hb-donut-label${isToday ? ' hb-donut-today-label' : ''}">${label}</span>
        <span class="hb-donut-pct">${pctLabel}</span>
      </div>`;
    }).join('');

    const weekItem = `<div class="hb-donut-item hb-donut-week">
      <div class="hb-donut-wrap">
        <canvas id="hb-donut-week"></canvas>
      </div>
      <span class="hb-donut-label" style="color:var(--accent)">${UI.t('habits_week_title')}</span>
      <span class="hb-donut-pct" style="color:var(--accent)">${weekPct}%</span>
    </div>`;

    document.getElementById('donut-row').innerHTML = dayItems + weekItem;

    dayData.forEach(({ isFuture, stats, canvasId }) => {
      const noData = isFuture || stats.pct < 0;
      const clrBorder = _cv('--border');
      if (noData) {
        Charts.doughnut(canvasId, [''], [1], { colors: [clrBorder], externalTooltip: _hbExternalTooltip });
      } else {
        Charts.doughnut(canvasId, [UI.t('habits_completed_label'), UI.t('habits_remaining_label')], [stats.pct, 100 - stats.pct], { colors: [_cv('--green'), clrBorder], externalTooltip: _hbExternalTooltip });
      }
    });

    const hasWeekData = wTotal > 0;
    Charts.doughnut('hb-donut-week',
      [UI.t('habits_completed_label'), UI.t('habits_remaining_label')],
      hasWeekData ? [weekPct, 100 - weekPct] : [1, 0],
      { colors: hasWeekData ? [_cv('--accent'), _cv('--border')] : [_cv('--border'), _cv('--bg-elevated')], externalTooltip: _hbExternalTooltip }
    );
  },

  renderGrid() {
    const { list, logs } = Store.getHabits();
    const td = UI.today();
    const c  = document.getElementById('habits-grid-container');
    if (!list.length) { c.innerHTML = ''; return; }

    const DAY_TR = ['day_sun','day_mon','day_tue','day_wed','day_thu','day_fri','day_sat'].map(k => UI.t(k));
    const WEEK_COLORS = ['#F472B6', '#A78BFA', '#22D3EE', '#FBBF24', '#34D399'];
    const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    const dates = Array.from({ length: this.DAYS }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (this.DAYS - 1 - i));
      return this._dateStr(d);
    });

    const weeks = [];
    let curWeek = [];
    dates.forEach((date, i) => {
      const dow = new Date(date + 'T00:00:00').getDay();
      if (i > 0 && dow === 1) { weeks.push(curWeek); curWeek = []; }
      curWeek.push(date);
    });
    if (curWeek.length) weeks.push(curWeek);

    const weekEndSet = new Set(weeks.slice(0, -1).map(w => w[w.length - 1]));

    const weekHeaders = weeks.map((wk, wi) => {
      const col = WEEK_COLORS[wi % WEEK_COLORS.length];
      const sep = wi < weeks.length - 1 ? ' hg-week-sep' : '';
      return `<th colspan="${wk.length}" class="hg-week-th${sep}" style="color:${col}">${UI.t('habits_week_n', wi + 1)}</th>`;
    }).join('');

    const dayAbbrs = dates.map(d => {
      const dow = new Date(d + 'T00:00:00').getDay();
      const cls = (d === td ? ' hg-today-col' : '') + (weekEndSet.has(d) ? ' hg-week-sep' : '');
      return `<th class="hg-day-th${cls}">${DAY_TR[dow]}</th>`;
    }).join('');

    const dayNums = dates.map(d => {
      const num = parseInt(d.split('-')[2]);
      const cls = (d === td ? ' hg-today-col' : '') + (weekEndSet.has(d) ? ' hg-week-sep' : '');
      return `<th class="hg-num-th${cls}">${num}</th>`;
    }).join('');

    const dataRows = list.map(h => {
      const scheduledDates = dates.filter(d => {
        const dow = new Date(d + 'T00:00:00').getDay();
        return h.type !== 'scheduled' || (h.days || []).includes(dow);
      });
      const done30 = scheduledDates.filter(d => logs.find(l => l.habitId === h.id && l.date === d && l.done)).length;
      const pct    = scheduledDates.length > 0 ? Math.round(done30 / scheduledDates.length * 100) : 0;

      const cells = dates.map(d => {
        const dow = new Date(d + 'T00:00:00').getDay();
        const isScheduled = h.type !== 'scheduled' || (h.days || []).includes(dow);
        const done    = !!logs.find(l => l.habitId === h.id && l.date === d && l.done);
        const isToday = d === td;
        const isFuture = d > td;
        const sep = weekEndSet.has(d) ? ' hg-week-sep' : '';

        if (!isScheduled) return `<td class="hg-cell hg-cell-skip${sep}"><div class="hg-box"></div></td>`;
        if (isFuture)     return `<td class="hg-cell hg-cell-future${sep}"><div class="hg-box"></div></td>`;

        const cls = `hg-cell${done ? ' hg-cell-done' : ''}${isToday ? ' hg-cell-today' : ''}${sep}`;
        return `<td class="${cls}"${done ? ` style="--hc:${h.color}"` : ''} onclick="Habits.toggleDate('${h.id}','${d}')" data-tooltip="${UI.formatDate(d)}"><div class="hg-box">${done ? CHECK : ''}</div></td>`;
      }).join('');

      const schedBadge = h.type === 'scheduled' ? `<span class="hg-sched-badge">${UI.t('habits_time_badge')}</span>` : '';

      return `<tr class="hg-row">
        <td class="hg-name-td"><span class="hg-icon">${h.icon || '✓'}</span><span class="hg-habit-name">${h.name}${schedBadge}</span></td>
        <td class="hg-pct-td"><span class="hg-pct" style="color:${h.color}">%${pct}</span></td>
        ${cells}
      </tr>`;
    }).join('');

    c.innerHTML = `<div class="panel">
      <div class="panel-header">
        <span class="panel-title">${UI.t('habits_30_day')}</span>
        <span style="font-size:0.75rem;color:var(--text-muted)">${UI.t('habits_older')} &nbsp;&nbsp; ${UI.t('habits_today_arrow')}</span>
      </div>
      <div style="overflow-x:auto;padding-bottom:8px">
        <table class="hg-table">
          <thead>
            <tr class="hg-week-row">
              <th class="hg-name-th">${UI.t('habits_habit_col')}</th>
              <th class="hg-pct-th" style="border-right:1px solid var(--border)">${UI.t('habits_pct_col')}</th>
              ${weekHeaders}
            </tr>
            <tr>
              <th class="hg-name-th"></th>
              <th class="hg-pct-th" style="border-right:1px solid var(--border)"></th>
              ${dayAbbrs}
            </tr>
            <tr>
              <th class="hg-name-th"></th>
              <th class="hg-pct-th" style="border-right:1px solid var(--border)"></th>
              ${dayNums}
            </tr>
          </thead>
          <tbody>${dataRows}</tbody>
        </table>
      </div>
    </div>`;
  },

  dragStart(id, e) {
    if (e.target.closest('button') || e.target.closest('.cbx')) { e.preventDefault(); return; }
    this._dragId = id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    setTimeout(() => {
      const el = document.querySelector(`.hc-row[data-id="${id}"]`);
      if (el) el.classList.add('hc-dragging');
    }, 0);
  },

  dragOver(id, e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id === this._dragId) return;
    document.querySelectorAll('.hc-row').forEach(r => r.classList.remove('hc-drag-over-top', 'hc-drag-over-bot'));
    const el = document.querySelector(`.hc-row[data-id="${id}"]`);
    if (!el) return;
    const mid = el.getBoundingClientRect().top + el.offsetHeight / 2;
    el.classList.add(e.clientY < mid ? 'hc-drag-over-top' : 'hc-drag-over-bot');
  },

  dragEnd() {
    document.querySelectorAll('.hc-row').forEach(r =>
      r.classList.remove('hc-dragging', 'hc-drag-over-top', 'hc-drag-over-bot')
    );
    this._dragId = null;
  },

  drop(targetId, e) {
    e.preventDefault();
    document.querySelectorAll('.hc-row').forEach(r =>
      r.classList.remove('hc-dragging', 'hc-drag-over-top', 'hc-drag-over-bot')
    );
    if (!this._dragId || this._dragId === targetId) { this._dragId = null; return; }

    const hb   = Store.getHabits();
    const from = hb.list.findIndex(h => h.id === this._dragId);
    const to   = hb.list.findIndex(h => h.id === targetId);
    if (from === -1 || to === -1) { this._dragId = null; return; }

    const el  = document.querySelector(`.hc-row[data-id="${targetId}"]`);
    const mid = el ? el.getBoundingClientRect().top + el.offsetHeight / 2 : 0;
    const insertAfter = el ? e.clientY >= mid : false;

    const [item] = hb.list.splice(from, 1);
    const newTo  = hb.list.findIndex(h => h.id === targetId);
    hb.list.splice(insertAfter ? newTo + 1 : newTo, 0, item);
    Store.setHabits(hb);
    this._dragId = null;
    this.renderDailyChecklist();
    this.renderGrid();
  },

  toggle(habitId) {
    Store.toggleHabitLog(habitId, UI.today());
    this.renderKPIs();
    this.renderDailyChecklist();
    this.renderGrid();
    this.renderDonutRow();
  },

  toggleDate(habitId, date) {
    Store.toggleHabitLog(habitId, date);
    this.renderGrid();
    const isThisWeek = this._getWeekDays().includes(date);
    if (isThisWeek) { this.renderDonutRow(); this.renderKPIs(); }
    if (date === UI.today()) { this.renderDailyChecklist(); }
  },

  save() {
    const f    = document.getElementById('addHabitForm');
    const name = f.habitName.value.trim();
    if (!name) return;

    const type = document.querySelector('[name=habitType]:checked').value;
    let days = [];
    if (type === 'scheduled') {
      days = [...document.querySelectorAll('.hm-day-btn.active')].map(b => parseInt(b.dataset.day));
      if (!days.length) { UI.toast(UI.t('habits_min_one_day'), 'warning'); return; }
    }

    if (Store.get('habits_seeded')) { Store.setHabits({ list: [], logs: [] }); Store.set('habits_seeded', null); }
    Store.addHabit({ name, color: f.habitColor.value, icon: f.habitIcon.value || '✓', type, days });
    if (this._addModal) this._addModal.close();
    UI.toast(UI.t('habits_added'), 'success');
    this.render();
  },

  deleteHabit(id) {
    DeleteManager.confirm({
      module:       'habits',
      title:        UI.t('habits_delete'),
      message:      UI.t('habits_confirm_delete'),
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        Store.deleteHabit(id);
        UI.toast(UI.t('habits_deleted'), 'info');
        this.render();
        if (this._mgrModal?._overlay?.isConnected) this.renderHabitsMgr();
      },
    });
  },

  triggerImport() {
    const input = document.getElementById('lt-habits-import-file');
    if (input) { input.value = ''; input.click(); }
  },

  importData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        const isKey = k => k.startsWith('lt_habits') || k === 'lt_panels_habits';
        const keys = Object.keys(data).filter(isKey);
        if (!keys.length) throw new Error();
        const _doImport = () => {
          Object.keys(localStorage).filter(isKey).forEach(k => localStorage.removeItem(k));
          keys.forEach(k => localStorage.setItem(k, JSON.stringify(data[k])));
          UI.toast(UI.t('import_data_ok'), 'success');
          setTimeout(() => location.reload(), 800);
        };
        new CustomModal({
          title: UI.t('settings_import_title'), icon: 'upload', variant: 'default',
          content: `<p style="margin:0;font-size:0.8125rem;color:var(--text-secondary)">${UI.t('import_data_confirm')}</p>`,
          width: 420, zIndex: 9000,
          buttons: [
            { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
            { label: UI.t('settings_import_btn'), variant: 'primary', onClick: m => { m.close(); _doImport(); } },
          ],
        }).open();
      } catch { UI.toast(UI.t('import_data_err'), 'error'); }
    };
    reader.readAsText(file);
  },
};
