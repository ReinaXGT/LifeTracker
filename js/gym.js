const Gym = (() => {
  let _gymDateCdp  = null;
  let _bodyDateCdp = null;
  let _gymModal = null;
  let _gymBodyModal = null;
  let _gymTemplateModal = null;
  let _gymTemplateEditModal = null;
  let _editId = null;
  let _editBodyId = null;
  let _editTemplateId = null;
  let _exCount = 0;
  let _pendingTemplateExercises = null;
  let _editMode = false;
  let _dragSrcId = null;
  let _prsFull = [];
  let _historyFull = [];
  let _templatesFull = [];
  let _progressExercise = '';

  const TYPE_COLORS = {
    strength:    'gym-type-strength',
    cardio:      'gym-type-cardio',
    flexibility: 'gym-type-flexibility',
    crossfit:    'gym-type-crossfit',
    sport:       'gym-type-sport',
    other:       'gym-type-other',
  };

  const TYPE_KEYS = {
    strength:    'gym_type_badge_strength',
    cardio:      'gym_type_badge_cardio',
    flexibility: 'gym_type_badge_flexibility',
    crossfit:    'gym_type_badge_crossfit',
    sport:       'gym_type_badge_sport',
    other:       'gym_type_badge_other',
  };

  const GYM_TYPE_OPTS = [
    { value:'strength',    dotColor:'var(--accent)',      labelKey:'gym_type_strength' },
    { value:'cardio',      dotColor:'var(--green)',       labelKey:'gym_type_cardio' },
    { value:'flexibility', dotColor:'var(--blue)',        labelKey:'gym_type_flexibility' },
    { value:'crossfit',    dotColor:'#FBBF24',            labelKey:'gym_type_crossfit' },
    { value:'sport',       dotColor:'var(--red)',         labelKey:'gym_type_sport' },
    { value:'other',       dotColor:'var(--text-muted)',  labelKey:'gym_type_other' },
  ];

  const _CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>`;

  function _updateTypeBtn(btnId, val) {
    const opt = GYM_TYPE_OPTS.find(o => o.value === val) || GYM_TYPE_OPTS[0];
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const dot  = btn.querySelector('.gym-csel-dot');
    const name = btn.querySelector('.gym-csel-name');
    if (dot)  dot.style.background = opt.dotColor;
    if (name) name.textContent = UI.t(opt.labelKey);
  }

  function _openTypeDropdown(btn, selectId, btnId) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const sel = document.getElementById(selectId);
          const cur = sel?.value || 'strength';
          dd.setItems(GYM_TYPE_OPTS.map(o => ({
            value: o.value, color: o.dotColor, label: UI.t(o.labelKey), active: o.value === cur,
          })));
        },
        onSelect: (val) => {
          const sel = document.getElementById(selectId);
          if (sel) { sel.value = val; sel.dispatchEvent(new Event('change')); }
          _updateTypeBtn(btnId, val);
        },
        minWidth: 200, align: 'left',
      });
    }
    btn._ddInst.toggle();
  }

  function _openTemplateDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const templates = Store.getGymTemplates().templates;
          const cur = document.getElementById('gym-template-select')?.value || '';
          dd.setItems([
            { value: '', color: null, label: UI.t('gym_load_template_title') },
            ...templates.map(t => {
              const typeOpt = GYM_TYPE_OPTS.find(o => o.value === t.type);
              return { value: t.id, color: typeOpt?.dotColor || null, label: t.name, active: t.id === cur };
            }),
          ]);
        },
        onSelect: (val) => {
          const sel = document.getElementById('gym-template-select');
          if (sel) sel.value = val;
          _syncTemplateBtnLabel(val);
        },
        minWidth: 200, align: 'left',
      });
    }
    btn._ddInst.toggle();
  }

  function _syncTemplateBtnLabel(val) {
    const btn = document.getElementById('gym-template-btn');
    if (!btn) return;
    const lbl = btn.querySelector('.gym-csel-name');
    if (!lbl) return;
    if (!val) {
      lbl.textContent = UI.t('gym_load_template_title');
      lbl.style.color = 'var(--text-muted)';
    } else {
      const t = Store.getGymTemplates().templates.find(x => x.id === val);
      lbl.textContent = t ? t.name : UI.t('gym_load_template_title');
      lbl.style.color = t ? 'var(--text-primary)' : 'var(--text-muted)';
    }
  }

  function _openExerciseDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const names = new Set();
          _workouts().forEach(w => (w.exercises || []).forEach(ex => {
            if (ex.name && ex.weight > 0) names.add(ex.name.trim());
          }));
          dd.setItems([
            { value: '', label: UI.t('gym_progress_select'), active: !_progressExercise },
            ...[...names].sort().map(n => ({ value: n, label: n, active: n === _progressExercise })),
          ]);
        },
        onSelect: (val) => {
          _progressExercise = val;
          const lbl = document.getElementById('gym-progress-ex-label');
          if (lbl) {
            lbl.textContent = val || UI.t('gym_progress_select');
            lbl.style.color = val ? 'var(--text-primary)' : 'var(--text-muted)';
          }
          _renderProgress();
        },
        minWidth: 200, align: 'left',
      });
    }
    btn._ddInst.toggle();
  }

  const MUSCLE_KEYS = {
    chest:     'gym_muscle_chest',
    back:      'gym_muscle_back',
    legs:      'gym_muscle_legs',
    shoulders: 'gym_muscle_shoulders',
    arms:      'gym_muscle_arms',
    core:      'gym_muscle_core',
    cardio:    'gym_muscle_cardio',
  };

  const MUSCLE_COLORS = {
    chest:     '#7C6CFC',
    back:      '#34D399',
    legs:      '#60A5FA',
    shoulders: '#FBBF24',
    arms:      '#F87171',
    core:      '#F472B6',
    cardio:    '#A78BFA',
  };

  // Panel definitions — defaultW: columns (1–4)
  const _PANEL_DEFS = [
    { id: 'gym-panel-body',      labelKey: 'gym_panel_body',      defaultW: 4 },
    { id: 'gym-panel-chart',     labelKey: 'gym_panel_chart',     defaultW: 2 },
    { id: 'gym-panel-prs',       labelKey: 'gym_panel_prs',       defaultW: 2 },
    { id: 'gym-panel-templates', labelKey: 'gym_panel_templates', defaultW: 2 },
    { id: 'gym-panel-history',   labelKey: 'gym_panel_history',   defaultW: 2 },
    { id: 'gym-panel-progress',  labelKey: 'gym_panel_progress',  defaultW: 4 },
    { id: 'gym-panel-volume',    labelKey: 'gym_panel_volume',    defaultW: 2 },
    { id: 'gym-panel-muscles',   labelKey: 'gym_panel_muscles',   defaultW: 2 },
  ];

  // ── Panel order / size persistence ────────────────────────

  function _getPanelOrder() {
    const saved = Store.get('gym_panel_order');
    const allIds = _PANEL_DEFS.map(p => p.id);
    if (saved && Array.isArray(saved)) {
      // Merge: keep saved order, append any new panels not yet in saved
      const merged = saved.filter(id => allIds.includes(id));
      allIds.forEach(id => { if (!merged.includes(id)) merged.push(id); });
      return merged;
    }
    return allIds;
  }

  function _savePanelOrder(order) { Store.set('gym_panel_order', order); }

  function _getPanelSizes() { return Store.get('gym_panel_sizes') || {}; }

  function _savePanelSizes(sizes) { Store.set('gym_panel_sizes', sizes); }

  function _getPanelW(id) {
    const sizes = _getPanelSizes();
    if (sizes[id] != null) return sizes[id];
    const def = _PANEL_DEFS.find(p => p.id === id);
    return def ? def.defaultW : 2;
  }

  function changePanelWidth(id, delta) {
    const sizes = _getPanelSizes();
    const next = Math.max(1, Math.min(4, _getPanelW(id) + delta));
    sizes[id] = next;
    _savePanelSizes(sizes);
    _renderPanelGrid();
  }

  // ── Edit mode (lock/unlock) ────────────────────────────────

  function toggleEditMode() {
    _editMode = !_editMode;
    _updateLockBtn();
    _renderPanelGrid();
  }

  function _updateLockBtn() {
    const btn = document.getElementById('gym-edit-btn');
    if (!btn) return;
    if (_editMode) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-secondary');
      btn.innerHTML = '<svg data-lucide="lock-open"></svg>';
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
      btn.innerHTML = '<svg data-lucide="lock"></svg>';
    }
    lucide.createIcons({ nodes: [btn] });
  }

  // ── Data helpers ───────────────────────────────────────────

  function _workouts()   { return Store.getGym().workouts; }
  function _gymCfg()     { const d = Store.get('gym_cfg') || {}; return { weeklyGoal: 4, weightUnit: 'kg', offDays: [], ...d }; }
  function _setGymCfg(d) { Store.set('gym_cfg', d); }
  function _weightUnit() { return _gymCfg().weightUnit || 'kg'; }

  const KG_TO_LB = 2.20462;

  function _wt(kg, decimals) {
    if (kg == null || kg === '') return '—';
    const unit = _weightUnit();
    if (unit === 'lb') {
      const val = kg * KG_TO_LB;
      return (decimals != null ? val.toFixed(decimals) : Math.round(val * 10) / 10) + ' lb';
    }
    return (decimals != null ? Number(kg).toFixed(decimals) : kg) + ' kg';
  }

  function _unitLabel() { return _weightUnit(); }

  function _updateToggleUI() {
    const unit = _weightUnit();
    const kgBtn = document.getElementById('gymToggleKG');
    const lbBtn = document.getElementById('gymToggleLB');
    if (!kgBtn || !lbBtn) return;
    kgBtn.classList.toggle('active', unit === 'kg');
    lbBtn.classList.toggle('active', unit === 'lb');
    const slider = document.getElementById('gymUnitSlider');
    if (slider) slider.classList.toggle('on-lb', unit === 'lb');
  }

  function setWeightUnit(unit) {
    _setGymCfg({ ..._gymCfg(), weightUnit: unit });
    _updateToggleUI();
    _render();
  }

  // ── Themed confirm dialog ──────────────────────────────────

  // ── Seed data auto-clear ───────────────────────────────────

  function _clearSeedSection(section) {
    if (!Store.get('gym_seeded')) return;
    if (section === 'workouts' && !Store.get('gym_workouts_user')) {
      Store.setGym({ workouts: [] });
      Store.set('gym_workouts_user', true);
    } else if (section === 'body' && !Store.get('gym_body_user')) {
      Store.setGymBody({ logs: [] });
      Store.set('gym_body_user', true);
    } else if (section === 'templates' && !Store.get('gym_templates_user')) {
      Store.setGymTemplates({ templates: [] });
      Store.set('gym_templates_user', true);
    }
  }

  // ── Calculation helpers ────────────────────────────────────

  function _calcStreak() {
    const offDays = new Set(_gymCfg().offDays || []);
    const dates   = new Set(_workouts().map(w => w.date));
    if (!dates.size) return 0;
    let streak = 0;
    let cur    = new Date(UI.today() + 'T00:00:00');
    for (let i = 0; i < 365; i++) {
      const s   = cur.getFullYear() + '-' + String(cur.getMonth()+1).padStart(2,'0') + '-' + String(cur.getDate()).padStart(2,'0');
      const dow = cur.getDay();
      if (offDays.has(dow)) { if (dates.has(s)) streak++; cur.setDate(cur.getDate() - 1); continue; }
      if (dates.has(s)) { streak++; }
      else { break; }
      cur.setDate(cur.getDate() - 1);
    }
    return streak;
  }

  function _weekRange(weeksAgo) {
    const today = new Date(UI.today() + 'T00:00:00');
    const dow = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1) - weeksAgo * 7);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return {
      start: monday.toISOString().split('T')[0],
      end:   sunday.toISOString().split('T')[0],
    };
  }

  function _calcVolume(workout) {
    return (workout.exercises || []).reduce((sum, ex) => {
      const s = parseInt(ex.sets) || 0;
      const r = parseInt(ex.reps) || 0;
      const w = parseFloat(ex.weight) || 0;
      return sum + s * r * w;
    }, 0);
  }

  function _calc1RM(weight, reps) {
    if (!weight || !reps) return null;
    return Math.round(weight * (1 + reps / 30));
  }

  function _muscleLabel(key) {
    return key ? UI.t(MUSCLE_KEYS[key] || 'gym_muscle_none') : '—';
  }

  function _muscleSelect(val = '') {
    const label    = val ? UI.t(MUSCLE_KEYS[val]) : UI.t('gym_muscle_none');
    const dotColor = val ? (MUSCLE_COLORS[val] || 'var(--text-muted)') : null;
    const opts     = Object.keys(MUSCLE_KEYS)
      .map(k => `<option value="${k}"${val === k ? ' selected' : ''}>${UI.t(MUSCLE_KEYS[k])}</option>`)
      .join('');
    return `<select class="gym-ex-muscle" style="display:none"><option value=""></option>${opts}</select>
      <button type="button" class="gym-csel gym-csel-sm" data-tooltip="${UI.t('gym_muscle_label')}" onclick="Gym._openMuscleDropdown(this)">
        <span class="gym-csel-dot" style="background:${dotColor || 'var(--text-muted)'};opacity:${dotColor ? '1' : '0.3'}"></span>
        <span class="gym-csel-name" style="font-size:0.6875rem;${!val ? 'color:var(--text-muted)' : ''}">${label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>
      </button>`;
  }

  function _openMuscleDropdown(btn) {
    if (!btn._ddInst) {
      const sel = btn.previousElementSibling; // captured BEFORE CustomDropdown wraps btn
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = sel?.value || '';
          dd.setItems([
            { value: '', color: null, label: UI.t('gym_muscle_none'), active: !cur },
            ...Object.keys(MUSCLE_KEYS).map(k => ({
              value: k, color: MUSCLE_COLORS[k] || 'var(--text-muted)',
              label: UI.t(MUSCLE_KEYS[k]), active: k === cur,
            })),
          ]);
        },
        onSelect: (val) => {
          const prev = sel?.value || '';
          if (sel) sel.value = val;
          const dot  = btn.querySelector('.gym-csel-dot');
          const name = btn.querySelector('.gym-csel-name');
          if (dot) {
            dot.style.background = val ? (MUSCLE_COLORS[val] || 'var(--text-muted)') : 'var(--text-muted)';
            dot.style.opacity    = val ? '1' : '0.3';
          }
          if (name) {
            name.textContent = val ? UI.t(MUSCLE_KEYS[val]) : UI.t('gym_muscle_none');
            name.style.color = val ? '' : 'var(--text-muted)';
          }
          if ((prev === 'cardio') !== (val === 'cardio')) {
            const row = btn.closest('.gym-ex-row');
            const metricsEl = row?.querySelector('.gym-ex-metrics');
            if (metricsEl) {
              const tmp = document.createElement('div');
              tmp.innerHTML = _exMetricsHtml(val === 'cardio');
              metricsEl.replaceWith(tmp.firstElementChild);
            }
          }
        },
        minWidth: 200, align: 'left',
      });
    }
    btn._ddInst.toggle();
  }

  // ── Panel grid HTML builders ───────────────────────────────

  function _panelContentHtml(id) {
    switch (id) {
      case 'gym-panel-chart':
        return `<div class="panel-body" style="padding:1rem"><canvas id="gym-freq-chart" height="180"></canvas></div>`;
      case 'gym-panel-volume':
        return `<div class="panel-body" style="padding:1rem"><canvas id="gym-volume-chart" height="180"></canvas></div>`;
      case 'gym-panel-muscles':
        return `<div class="panel-body" style="padding:0"><div id="gym-muscles"></div></div>`;
      case 'gym-panel-prs':
        return `<div class="panel-body" style="padding:0;overflow-x:auto"><div id="gym-prs"></div></div>`;
      case 'gym-panel-progress':
        return `<div>
          <div class="gym-progress-header">
            <label>${UI.t('gym_panel_progress')}</label>
            <div style="flex:1;min-width:0">
              <button type="button" id="gym-progress-ex-btn" class="gym-csel" onclick="Gym._openExerciseDropdown(this)">
                <span id="gym-progress-ex-label" class="gym-csel-name" style="color:var(--text-muted)">${UI.t('gym_progress_select')}</span>
                ${_CHEVRON_SVG}
              </button>
            </div>
          </div>
          <div id="gym-progress-chart-wrap" style="padding:1rem;display:none"><canvas id="gym-progress-chart" height="180"></canvas></div>
          <p id="gym-progress-empty" style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.8125rem"></p>
        </div>`;
      case 'gym-panel-body':
        return `<div>
          <div style="padding:0.75rem 1rem;display:none" id="gym-body-chart-wrap"><canvas id="gym-body-chart" height="140"></canvas></div>
          <div class="gym-body-recent" id="gym-body-table"></div>
        </div>`;
      case 'gym-panel-templates':
        return `<div class="panel-body" style="padding:0"><div id="gym-templates"></div></div>`;
      case 'gym-panel-history':
        return `<div class="panel-body" style="padding:0"><div id="gym-history"></div></div>`;
      default:
        return `<div class="panel-body"></div>`;
    }
  }

  function _panelShellHtml(id) {
    const def = _PANEL_DEFS.find(p => p.id === id);
    const label = def ? UI.t(def.labelKey) : id;
    const w = _getPanelW(id);

    const dragHandle = _editMode
      ? `<svg data-lucide="grip-vertical" class="drag-handle-icon"></svg>`
      : '';

    const sizeCtrl = _editMode
      ? `<div class="gym-size-ctrl">
          <button class="btn btn-icon btn-secondary" onclick="Gym.changePanelWidth('${id}',-1)"><svg data-lucide="minus" style="width:0.75rem;height:0.75rem"></svg></button>
          <span style="font-size:0.6875rem;font-family:var(--font-mono);color:var(--text-muted);min-width:1rem;text-align:center">${w}</span>
          <button class="btn btn-icon btn-secondary" onclick="Gym.changePanelWidth('${id}',1)"><svg data-lucide="plus" style="width:0.75rem;height:0.75rem"></svg></button>
        </div>`
      : '';

    return `<div id="${id}" class="panel gym-draggable-panel${_editMode ? ' gym-panel-drag-enabled' : ''}"
              style="grid-column:span ${w}"
              draggable="${_editMode ? 'true' : 'false'}">
      <div class="panel-header">
        ${dragHandle}
        <h3 class="panel-title">${label}</h3>
        ${sizeCtrl}
      </div>
      ${_panelContentHtml(id)}
    </div>`;
  }

  function _renderPanelGrid() {
    const order = _getPanelOrder();
    const visible = order.filter(id => UI.isPanelVisible(id));
    const grid = document.getElementById('gym-panels-grid');
    grid.innerHTML = visible.map(id => _panelShellHtml(id)).join('');
    lucide.createIcons({ nodes: [grid] });

    _renderChart();
    _renderVolumeChart();
    _renderMuscles();
    _renderPRs();
    _renderProgress();
    _renderBody();
    _renderTemplates();
    _renderHistory();

    if (_editMode) _initDragEvents();
  }

  // ── Drag & drop ────────────────────────────────────────────

  function _initDragEvents() {
    const panels = document.querySelectorAll('#gym-panels-grid .gym-draggable-panel');
    panels.forEach(panel => {
      panel.addEventListener('dragstart', e => {
        _dragSrcId = panel.id;
        panel.classList.add('gym-panel-dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      panel.addEventListener('dragend', () => {
        panel.classList.remove('gym-panel-dragging');
        panels.forEach(p => p.classList.remove('gym-panel-drag-over'));
      });
      panel.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        panels.forEach(p => p.classList.remove('gym-panel-drag-over'));
        if (panel.id !== _dragSrcId) panel.classList.add('gym-panel-drag-over');
      });
      panel.addEventListener('dragleave', () => {
        panel.classList.remove('gym-panel-drag-over');
      });
      panel.addEventListener('drop', e => {
        e.preventDefault();
        if (!_dragSrcId || _dragSrcId === panel.id) return;
        const order = _getPanelOrder();
        const from = order.indexOf(_dragSrcId);
        const to   = order.indexOf(panel.id);
        if (from === -1 || to === -1) return;
        order.splice(from, 1);
        order.splice(to, 0, _dragSrcId);
        _savePanelOrder(order);
        _dragSrcId = null;
        _renderPanelGrid();
      });
    });
  }

  // ── KPIs ───────────────────────────────────────────────────

  function _renderKPIs() {
    const ws    = _workouts();
    const today = UI.today();
    const { start: wStart, end: wEnd } = _weekRange(0);
    const mPfx  = today.slice(0, 7);
    const cfg   = _gymCfg();

    const weekWorkouts = ws.filter(w => w.date >= wStart && w.date <= wEnd);
    const weekCount    = weekWorkouts.length;
    const monthCount   = ws.filter(w => w.date.startsWith(mPfx)).length;
    const totalMins    = ws.reduce((s, w) => s + (parseInt(w.duration) || 0), 0);
    const totalHrs     = (totalMins / 60).toFixed(1);
    const streak       = _calcStreak();
    const weeklyGoal   = cfg.weeklyGoal || 4;
    const weekVolume   = weekWorkouts.reduce((s, w) => s + _calcVolume(w), 0);
    const weekVolTon   = (weekVolume / 1000).toFixed(2);
    const fillPct      = Math.min(100, Math.round((weekCount / weeklyGoal) * 100));

    const el = document.getElementById('gym-kpi');
    el.innerHTML = [
      _weekKpiHtml(weekCount, weekVolTon, weeklyGoal, fillPct),
      UI.kpiCard({ label: UI.t('gym_kpi_month'),       value: String(monthCount), icon: 'calendar-check', iconColor: '#34D399', change: UI.t('gym_kpi_sessions'),   changeUp: monthCount > 0, mono: true }),
      UI.kpiCard({ label: UI.t('gym_kpi_total_hours'), value: totalHrs,           icon: 'timer',          iconColor: '#60A5FA', change: UI.t('gym_kpi_hours_sub'),  changeUp: totalMins > 0,  mono: true }),
      _streakKpiHtml(streak, cfg.offDays || []),
    ].join('');

    const fillEl = el.querySelector('.gym-goal-fill');
    if (fillEl) fillEl.style.width = fillPct + '%';

    lucide.createIcons({ nodes: [el] });
  }

  function _weekKpiHtml(sessions, volTon, goal, fillPct) {
    return `<div class="kpi-card" style="cursor:default">
      <div class="kpi-card-header">
        <span class="kpi-label">${UI.t('gym_kpi_week')}</span>
        <span class="kpi-icon" style="background:rgba(124,108,252,.15)"><svg data-lucide="dumbbell" style="color:#7C6CFC"></svg></span>
      </div>
      <div class="kpi-value mono">${sessions} <span style="font-size:0.8125rem;font-weight:500;color:var(--text-muted)">${UI.t('gym_kpi_sessions')}</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.375rem">
        <span style="font-size:0.6875rem;color:var(--text-muted)">${UI.t('gym_kpi_volume')}</span>
        <span class="mono" style="font-size:0.75rem;font-weight:700;color:var(--accent)">${volTon}t</span>
      </div>
      <div style="display:flex;align-items:center;gap:0.375rem;margin-top:0.25rem">
        <span style="font-size:0.6875rem;color:var(--text-muted);flex:1">${UI.t('gym_kpi_goal')}</span>
        <span class="mono" style="font-size:0.6875rem;font-weight:600;color:var(--text-secondary)">${sessions}/${goal}</span>
        <input type="number" min="1" max="14" value="${goal}" style="width:2.375rem;font-size:0.6875rem;padding:1px 4px;border-radius:0.3125rem;border:1px solid var(--border);background:var(--bg-elevated);color:var(--text-primary);text-align:center"
          onchange="Gym.setWeeklyGoal(this.value)" data-tooltip="${UI.t('gym_weekly_goal_label')}">
      </div>
      <div class="gym-goal-bar" style="margin-top:0.375rem"><div class="gym-goal-fill"></div></div>
    </div>`;
  }

  function _streakKpiHtml(streak, offDays) {
    const offSet   = new Set(offDays);
    const offCount = offSet.size;
    const days = [
      { key: 'day_mon', d: 1 }, { key: 'day_tue', d: 2 }, { key: 'day_wed', d: 3 },
      { key: 'day_thu', d: 4 }, { key: 'day_fri', d: 5 }, { key: 'day_sat', d: 6 },
      { key: 'day_sun', d: 0 },
    ];
    const btns = days.map(({ key, d }) =>
      `<button type="button" class="gym-off-day-btn${offSet.has(d) ? ' active' : ''}"
        onclick="event.stopPropagation();Gym.toggleOffDay(${d})"
        data-tooltip="${UI.t('gym_off_day_title')}">${UI.t(key)}</button>`
    ).join('');
    const badge = offCount > 0
      ? `<span style="margin-left:auto;font-size:0.5rem;font-family:var(--font-mono);font-weight:700;color:var(--red);background:rgba(248,113,113,.15);padding:0.0625rem 0.375rem;border-radius:0.75rem;line-height:1.6">${offCount}</span>`
      : '';
    return `<div class="kpi-card" style="cursor:default">
      <div class="kpi-card-header">
        <span class="kpi-label">${UI.t('gym_kpi_streak')}</span>
        <span class="kpi-icon" style="background:rgba(251,146,60,.15)"><svg data-lucide="flame" style="color:#FB923C"></svg></span>
      </div>
      <div class="kpi-value mono">${streak} <span style="font-size:0.8125rem;font-weight:500;color:var(--text-muted)">${UI.t('gym_kpi_streak_sub')}</span></div>
      <div style="margin-top:0.625rem">
        <div style="display:flex;align-items:center;gap:0.3125rem;margin-bottom:0.3125rem">
          <svg data-lucide="moon" style="width:0.625rem;height:0.625rem;color:var(--text-muted);flex-shrink:0"></svg>
          <span style="font-size:0.5625rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--text-muted)">${UI.t('gym_off_days')}</span>
          ${badge}
        </div>
        <div class="gym-off-days-bar">${btns}</div>
      </div>
    </div>`;
  }

  function setWeeklyGoal(val) {
    const n = Math.max(1, Math.min(14, parseInt(val) || 4));
    _setGymCfg({ ..._gymCfg(), weeklyGoal: n });
    _renderKPIs();
  }

  function toggleOffDay(day) {
    const cfg  = _gymCfg();
    const offs = new Set(cfg.offDays || []);
    offs.has(day) ? offs.delete(day) : offs.add(day);
    _setGymCfg({ ...cfg, offDays: [...offs] });
    _renderKPIs();
  }

  // ── Frequency chart ────────────────────────────────────────

  function _renderChart() {
    const canvas = document.getElementById('gym-freq-chart');
    if (!canvas) return;
    const ws          = _workouts();
    const labels      = [];
    const data        = [];
    const ptColors    = [];
    const ptRadius    = [];
    for (let i = 7; i >= 0; i--) {
      const { start, end } = _weekRange(i);
      const count = ws.filter(w => w.date >= start && w.date <= end).length;
      labels.push(i === 0 ? UI.t('gym_this_week') : `W-${i}`);
      data.push(count);
      ptColors.push(i === 0 ? _cv('--green') : _cv('--accent'));
      ptRadius.push(i === 0 ? 5 : 3);
    }
    Charts.line('gym-freq-chart', labels,
      [{ label: UI.t('gym_kpi_sessions'), data, pointColors: ptColors, pointRadius: ptRadius }],
      { solidFill: true, yFmt: v => Math.round(v), tip: ctx => `${ctx.raw} ${UI.t('gym_sessions_suffix')}` }
    );
  }

  // ── Volume chart ───────────────────────────────────────────

  function _renderVolumeChart() {
    const canvas = document.getElementById('gym-volume-chart');
    if (!canvas) return;
    const ws     = _workouts();
    const labels = [];
    const data   = [];
    for (let i = 7; i >= 0; i--) {
      const { start, end } = _weekRange(i);
      labels.push(i === 0 ? UI.t('gym_this_week') : `W-${i}`);
      const vol = ws
        .filter(w => w.date >= start && w.date <= end)
        .reduce((s, w) => s + _calcVolume(w), 0);
      data.push(parseFloat((vol / 1000).toFixed(2)));
    }
    Charts.bar('gym-volume-chart', labels,
      [{ label: UI.t('gym_volume_label'), data, color: '#A78BFA' }],
      { yFmt: v => v + 't', tip: ctx => `${ctx.raw}t ${UI.t('gym_volume_unit')}` }
    );
  }

  // ── Muscle distribution ────────────────────────────────────

  function _renderMuscles() {
    const el = document.getElementById('gym-muscles');
    if (!el) return;
    const counts = {};
    _workouts().forEach(w => {
      (w.exercises || []).forEach(ex => {
        if (ex.muscle) counts[ex.muscle] = (counts[ex.muscle] || 0) + 1;
      });
    });
    if (!Object.keys(counts).length) {
      el.innerHTML = `<p style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.8125rem">${UI.t('gym_no_muscle_data')}</p>`;
      return;
    }
    const labels = Object.keys(counts).map(k => UI.t(MUSCLE_KEYS[k] || k));
    const data   = Object.values(counts);
    const colors = Object.keys(counts).map(k => MUSCLE_COLORS[k] || '#7C6CFC');
    el.innerHTML = '<canvas id="gym-muscle-chart" height="220"></canvas>';
    Charts.doughnut('gym-muscle-chart', labels, data, { colors, tip: ctx => `${ctx.label}: ${ctx.raw}` });
  }

  // ── "Show more" handlers (called from inline onclick) ──────

  function showPRsMore(btn) {
    const more = _prsFull.slice(2);
    if (!more.length) return;
    const rows = more.map(pr => {
      const oneRM = _calc1RM(pr.weight, pr.reps);
      return `<tr>
        <td style="font-weight:500">${pr.name}</td>
        <td class="mono" style="text-align:center;font-weight:700;color:var(--accent)">${_wt(pr.weight)}</td>
        <td class="mono" style="text-align:center;color:var(--text-secondary)">${oneRM ? _wt(oneRM) : '—'}</td>
        <td class="mono" style="text-align:right;color:var(--text-muted)">${UI.formatDate(pr.date)}</td>
      </tr>`;
    }).join('');
    const html = `<table class="data-table">
      <thead><tr>
        <th>${UI.t('gym_pr_exercise')}</th>
        <th style="text-align:center">${UI.t('gym_pr_weight')} (${_unitLabel()})</th>
        <th style="text-align:center">${UI.t('gym_pr_1rm')} (${_unitLabel()})</th>
        <th style="text-align:right">${UI.t('gym_pr_date')}</th>
      </tr></thead>
      <tbody>${rows}</tbody></table>`;
    UI.showExpandOverlay(btn, UI.t('gym_panel_prs'), html);
  }

  function showBodyMore(btn) {
    const allLogs = Store.getGymBody().logs;
    const more = allLogs.slice(2);
    if (!more.length) return;
    const tUnit = _unitLabel();
    const rows = more.map(l => `<tr>
      <td class="mono" style="color:var(--text-muted)">${UI.formatDate(l.date)}</td>
      <td class="mono" style="text-align:center;font-weight:700;color:var(--accent)">${l.weight ? _wt(l.weight, 1) : '—'}</td>
      <td class="mono" style="text-align:center">${l.bodyFat ? l.bodyFat + ' %' : '—'}</td>
      <td class="mono" style="text-align:center">${l.waist ? l.waist + ' cm' : '—'}</td>
      <td style="display:flex;gap:0.25rem;align-items:center">
        <button class="btn btn-icon btn-secondary" data-tooltip="${UI.t('btn_edit')}" onclick="Gym.editBody('${l.id}');UI.closeExpandOverlay()"><svg data-lucide="pencil"></svg></button>
        <button class="btn btn-icon btn-secondary" style="color:var(--red)" data-tooltip="${UI.t('btn_delete')}" onclick="Gym.delBody('${l.id}');UI.closeExpandOverlay()"><svg data-lucide="trash-2"></svg></button>
      </td>
    </tr>`).join('');
    const html = `<table class="data-table">
      <thead><tr>
        <th>${UI.t('gym_body_table_date')}</th>
        <th style="text-align:center">${UI.t('gym_body_table_weight')} (${tUnit})</th>
        <th style="text-align:center">${UI.t('gym_body_table_fat')}</th>
        <th style="text-align:center">${UI.t('gym_body_table_waist')}</th>
        <th style="width:4.5rem"></th>
      </tr></thead>
      <tbody>${rows}</tbody></table>`;
    UI.showExpandOverlay(btn, UI.t('gym_panel_body'), html);
  }

  function showHistoryMore(btn) {
    const more = _historyFull.slice(2);
    if (!more.length) return;
    const html = more.map(w => _workoutCardHtml(w)).join('');
    UI.showExpandOverlay(btn, UI.t('gym_panel_history'), html);
  }

  function showTemplatesMore(btn) {
    const more = _templatesFull.slice(2);
    if (!more.length) return;
    const html = more.map(_templateCardHtml).join('');
    UI.showExpandOverlay(btn, UI.t('gym_panel_templates'), html);
  }

  // ── Workout card HTML (shared between history + overlay) ───

  function _workoutCardHtml(w) {
    const vol     = _calcVolume(w);
    const exChips = (w.exercises || []).map(ex => {
      const meta = ex.muscle === 'cardio'
        ? [ex.exDuration ? ex.exDuration + ' min' : '', ex.exDistance ? ex.exDistance + ' km' : ''].filter(Boolean).join(' · ')
        : [ex.sets ? ex.sets + 's' : '', ex.reps ? ex.reps + 'r' : '', ex.weight ? _wt(ex.weight) : ''].filter(Boolean).join(' × ');
      const muscleChip = ex.muscle ? `<span class="gym-muscle-chip">${_muscleLabel(ex.muscle)}</span>` : '';
      return `<span class="gym-ex-chip">${ex.name}${meta ? `<span class="gym-ex-chip-meta"> · ${meta}</span>` : ''}${muscleChip}</span>`;
    }).join('');
    return `<div class="gym-card">
      <div class="gym-card-header">
        <span class="gym-type-badge ${TYPE_COLORS[w.type] || 'gym-type-other'}">${UI.t(TYPE_KEYS[w.type] || 'gym_type_badge_other')}</span>
        <span class="gym-card-date">${UI.formatDate(w.date)}</span>
        ${w.duration ? `<span class="gym-card-dur">${w.duration} ${UI.t('gym_minutes_label')}</span>` : ''}
        ${w.distance  ? `<span class="gym-card-dist">📍 ${w.distance} km</span>` : ''}
        ${w.rpe       ? `<span class="gym-card-rpe">RPE ${w.rpe}</span>` : ''}
        ${vol > 0     ? `<span style="font-size:0.6875rem;color:var(--text-muted);font-family:var(--font-mono);margin-left:2px">${(vol/1000).toFixed(1)}t</span>` : ''}
        <div class="gym-card-actions">
          <button class="btn btn-icon btn-secondary" onclick="Gym.edit('${w.id}')" data-tooltip="${UI.t('btn_edit')}"><svg data-lucide="pencil"></svg></button>
          <button class="btn btn-icon btn-secondary" onclick="Gym.del('${w.id}')" style="color:var(--red)" data-tooltip="${UI.t('btn_delete')}"><svg data-lucide="trash-2"></svg></button>
        </div>
      </div>
      ${w.notes ? `<div class="gym-card-notes">${w.notes}</div>` : ''}
      <div class="gym-ex-chips">${exChips || `<span style="font-size:0.75rem;color:var(--text-muted)">${UI.t('gym_no_exercises')}</span>`}</div>
    </div>`;
  }

  // ── Show-more button HTML ──────────────────────────────────

  function _showMoreBtn(handlerStr, count) {
    return `<div style="padding:0.5rem 0.75rem;border-top:1px solid var(--border)">
      <button class="btn btn-secondary lt-show-more-btn" onclick="${handlerStr}">
        <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem"></svg>
        ${UI.t('dash_n_more', count)}
      </button>
    </div>`;
  }

  // ── PRs ────────────────────────────────────────────────────

  function _renderPRs() {
    const el = document.getElementById('gym-prs');
    if (!el) return;
    const prMap = {};
    _workouts().forEach(w => {
      (w.exercises || []).forEach(ex => {
        const key = (ex.name || '').trim().toLowerCase();
        if (!key || !(ex.weight > 0)) return;
        if (!prMap[key] || ex.weight > prMap[key].weight)
          prMap[key] = { name: ex.name, weight: ex.weight, reps: ex.reps, date: w.date };
      });
    });
    _prsFull = Object.values(prMap).sort((a, b) => b.weight - a.weight);
    if (!_prsFull.length) {
      el.innerHTML = `<div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.8125rem">${UI.t('gym_no_prs')}</div>`;
      return;
    }
    const visible = _prsFull.slice(0, 2);
    const rows = visible.map(pr => {
      const oneRM = _calc1RM(pr.weight, pr.reps);
      return `<tr>
        <td style="font-weight:500">${pr.name}</td>
        <td class="mono" style="text-align:center;font-weight:700;color:var(--accent)">${_wt(pr.weight)}</td>
        <td class="mono" style="text-align:center;color:var(--text-secondary)">${oneRM ? _wt(oneRM) : '—'}</td>
        <td class="mono" style="text-align:right;color:var(--text-muted)">${UI.formatDate(pr.date)}</td>
      </tr>`;
    }).join('');
    el.innerHTML = `<table class="data-table">
      <thead><tr>
        <th>${UI.t('gym_pr_exercise')}</th>
        <th style="text-align:center">${UI.t('gym_pr_weight')} (${_unitLabel()})</th>
        <th style="text-align:center">${UI.t('gym_pr_1rm')} (${_unitLabel()})</th>
        <th style="text-align:right">${UI.t('gym_pr_date')}</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${_prsFull.length > 2 ? _showMoreBtn(`Gym.showPRsMore(this)`, _prsFull.length - 2) : ''}`;
    lucide.createIcons({ nodes: [el] });
  }

  // ── Exercise progress ──────────────────────────────────────

  function _renderProgress() {
    const wrap  = document.getElementById('gym-progress-chart-wrap');
    const empty = document.getElementById('gym-progress-empty');
    if (!wrap || !empty) return;

    const exerciseName = _progressExercise;

    if (!exerciseName) {
      wrap.style.display  = 'none';
      empty.style.display = '';
      empty.textContent   = UI.t('gym_progress_select');
      return;
    }

    const points = [];
    _workouts().slice().reverse().forEach(w => {
      (w.exercises || []).forEach(ex => {
        if ((ex.name || '').trim().toLowerCase() === exerciseName.toLowerCase() && ex.weight > 0)
          points.push({ date: w.date, weight: ex.weight });
      });
    });

    if (!points.length) {
      wrap.style.display  = 'none';
      empty.style.display = '';
      empty.textContent   = UI.t('gym_progress_no_data');
      return;
    }

    wrap.style.display  = '';
    empty.style.display = 'none';

    const unit   = _unitLabel();
    const labels = points.map(p => UI.formatDate(p.date));
    const data   = points.map(p =>
      unit === 'lb' ? Math.round(p.weight * KG_TO_LB * 10) / 10 : p.weight
    );
    Charts.line('gym-progress-chart', labels,
      [{ label: unit, data, color: '#7C6CFC' }],
      { yFmt: v => v + ' ' + unit, tip: ctx => `${ctx.raw} ${unit}` }
    );
  }

  // ── Body measurements ──────────────────────────────────────

  function _renderBody() {
    const tableEl = document.getElementById('gym-body-table');
    if (!tableEl) return;
    const chartWrap = document.getElementById('gym-body-chart-wrap');
    const allLogs = Store.getGymBody().logs;
    const chartLogs = allLogs.slice().reverse(); // oldest first

    if (!allLogs.length) {
      if (chartWrap) chartWrap.style.display = 'none';
      tableEl.innerHTML = `<p style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.8125rem">${UI.t('gym_body_no_data')}</p>`;
      return;
    }

    if (chartWrap) chartWrap.style.display = '';
    const unit    = _unitLabel();
    const labels  = chartLogs.map(l => UI.formatDate(l.date));
    const weights = chartLogs.map(l =>
      l.weight == null ? null :
      unit === 'lb' ? Math.round(l.weight * KG_TO_LB * 10) / 10 : l.weight
    );
    Charts.line('gym-body-chart', labels,
      [{ label: `${UI.t('gym_body_weight_chart')} (${unit})`, data: weights, color: '#34D399' }],
      { yFmt: v => v + ' ' + unit, tip: ctx => `${ctx.raw} ${unit}` }
    );

    const visible = allLogs.slice(0, 2);
    const tUnit   = _unitLabel();
    const rows = visible.map(l => `<tr>
      <td class="mono" style="color:var(--text-muted)">${UI.formatDate(l.date)}</td>
      <td class="mono" style="text-align:center;font-weight:700;color:var(--accent)">${l.weight ? _wt(l.weight, 1) : '—'}</td>
      <td class="mono" style="text-align:center">${l.bodyFat ? l.bodyFat + ' %' : '—'}</td>
      <td class="mono" style="text-align:center">${l.waist ? l.waist + ' cm' : '—'}</td>
      <td style="display:flex;gap:0.25rem;align-items:center">
        <button class="btn btn-icon btn-secondary" data-tooltip="${UI.t('btn_edit')}" onclick="Gym.editBody('${l.id}')"><svg data-lucide="pencil"></svg></button>
        <button class="btn btn-icon btn-secondary" style="color:var(--red)" data-tooltip="${UI.t('btn_delete')}" onclick="Gym.delBody('${l.id}')"><svg data-lucide="trash-2"></svg></button>
      </td>
    </tr>`).join('');
    tableEl.innerHTML = `<table class="data-table">
      <thead><tr>
        <th>${UI.t('gym_body_table_date')}</th>
        <th style="text-align:center">${UI.t('gym_body_table_weight')} (${tUnit})</th>
        <th style="text-align:center">${UI.t('gym_body_table_fat')}</th>
        <th style="text-align:center">${UI.t('gym_body_table_waist')}</th>
        <th style="width:4.5rem"></th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${allLogs.length > 2 ? _showMoreBtn(`Gym.showBodyMore(this)`, allLogs.length - 2) : ''}`;
    lucide.createIcons({ nodes: [tableEl] });
  }

  // ── Templates ──────────────────────────────────────────────

  function _templateCardHtml(t) {
    const exercises = t.exercises || [];
    const exRows = exercises.map(e => {
      const parts = [];
      if (e.muscle === 'cardio') {
        if (e.exDuration) parts.push(`${e.exDuration} min`);
        if (e.exDistance) parts.push(`${e.exDistance} km`);
      } else {
        if (e.sets)   parts.push(`${e.sets} set`);
        if (e.reps)   parts.push(`${e.reps} tek`);
        if (e.weight) parts.push(`${e.weight}kg`);
      }
      return `<div class="gym-template-ex-row">
        <span class="gym-template-ex-name">${e.name}</span>
        ${parts.length ? `<span class="gym-template-ex-detail">${parts.join(' · ')}</span>` : ''}
      </div>`;
    }).join('');
    return `<div class="gym-template-card">
      <div class="gym-template-info">
        <div style="display:flex;align-items:center;gap:0.5rem">
          <div class="gym-template-name">${t.name}</div>
          ${t.type ? `<span class="gym-type-badge gym-type-${t.type}" style="font-size:0.625rem;padding:2px 0.4375rem">${UI.t(TYPE_KEYS[t.type] || 'gym_type_badge_other')}</span>` : ''}
        </div>
        <div class="gym-template-meta">${exercises.length} ${UI.t('gym_exercises_label').toLowerCase()}</div>
        ${exRows ? `<div class="gym-template-ex-list">${exRows}</div>` : ''}
      </div>
      <div class="gym-template-actions">
        <button class="btn btn-secondary" style="font-size:0.75rem;padding:0.3125rem 0.625rem;gap:0.3125rem;white-space:nowrap" data-tooltip="${UI.t('gym_template_load_btn')}" onclick="Gym.loadTemplate('${t.id}');UI.closeExpandOverlay()">
          <svg data-lucide="download" style="width:0.8125rem;height:0.8125rem"></svg>
          <span>${UI.t('gym_template_load_btn')}</span>
        </button>
        <button class="btn btn-icon btn-secondary" data-tooltip="${UI.t('gym_template_duplicate')}" onclick="Gym.duplicateTemplate('${t.id}');UI.closeExpandOverlay()">
          <svg data-lucide="copy"></svg>
        </button>
        <button class="btn btn-icon btn-secondary" data-tooltip="${UI.t('btn_edit')}" onclick="Gym.editTemplate('${t.id}');UI.closeExpandOverlay()">
          <svg data-lucide="pencil"></svg>
        </button>
        <button class="btn btn-icon btn-secondary" style="color:var(--red)" data-tooltip="${UI.t('btn_delete')}" onclick="Gym.delTemplate('${t.id}');UI.closeExpandOverlay()">
          <svg data-lucide="trash-2"></svg>
        </button>
      </div>
    </div>`;
  }

  function _renderTemplates() {
    const el = document.getElementById('gym-templates');
    if (!el) return;
    _templatesFull = Store.getGymTemplates().templates;
    if (!_templatesFull.length) {
      el.innerHTML = `<p style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.8125rem">${UI.t('gym_no_templates')}</p>`;
      _refreshTemplateSelect();
      return;
    }
    const visible = _templatesFull.slice(0, 2);
    el.innerHTML = visible.map(_templateCardHtml).join('') +
      (_templatesFull.length > 2 ? _showMoreBtn(`Gym.showTemplatesMore(this)`, _templatesFull.length - 2) : '');
    lucide.createIcons({ nodes: [el] });
    _refreshTemplateSelect();
  }

  function _refreshTemplateSelect() {
    const templates = Store.getGymTemplates().templates;
    const sel = document.getElementById('gym-template-select');
    if (!sel) return;
    sel.innerHTML = `<option value="">${UI.t('gym_load_template_title')}</option>` +
      templates.map(t => `<option value="${t.id}">${UI.esc(t.name)}</option>`).join('');
    _syncTemplateBtnLabel(sel.value);
  }

  // ── History ────────────────────────────────────────────────

  function _renderHistory() {
    const el = document.getElementById('gym-history');
    if (!el) return;
    _historyFull = _workouts();
    if (!_historyFull.length) { el.innerHTML = UI.emptyState(UI.t('gym_no_workouts'), 'dumbbell'); return; }

    const visible = _historyFull.slice(0, 2);
    el.innerHTML = visible.map(w => _workoutCardHtml(w)).join('') +
      (_historyFull.length > 2 ? _showMoreBtn(`Gym.showHistoryMore(this)`, _historyFull.length - 2) : '');
    lucide.createIcons({ nodes: [el] });
  }

  // ── Full render ────────────────────────────────────────────

  function _render() {
    _renderKPIs();
    _renderPanelGrid();
  }

  // ── Exercise form rows ─────────────────────────────────────

  function _addExRow(name = '', sets = '', reps = '', weight = '', muscle = '', containerId = 'gym-ex-list', exDuration = '', exDistance = '') {
    _exCount++;
    const id  = `gym-ex-${_exCount}`;
    const row = document.createElement('div');
    row.className = 'gym-ex-row';
    row.id = id;
    row.innerHTML = `
      <div class="gym-ex-name-col">
        <input class="form-control gym-ex-name" type="text" placeholder="${UI.t('gym_exercise_name_ph')}" value="${name}">
        ${_muscleSelect(muscle)}
      </div>
      ${_exMetricsHtml(muscle === 'cardio', sets, reps, weight, exDuration, exDistance)}
      <button type="button" class="btn btn-icon btn-secondary" style="color:var(--red);flex-shrink:0;margin-top:2px" onclick="document.getElementById('${id}').remove()"><svg data-lucide="x"></svg></button>
    `;
    document.getElementById(containerId).appendChild(row);
    lucide.createIcons({ nodes: [row] });
  }

  function _exMetricsHtml(isCardio, sets = '', reps = '', weight = '', exDuration = '', exDistance = '') {
    if (isCardio) {
      return `<div class="gym-ex-metrics">
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.125rem;flex-shrink:0">
          <input class="form-control" style="width:109px;text-align:center" type="number" min="1" placeholder="—" data-tooltip="${UI.t('gym_ex_duration_label')}" value="${exDuration}">
          <span style="font-size:0.5625rem;font-weight:700;color:var(--accent);letter-spacing:.06em">DK</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.125rem;flex-shrink:0">
          <input class="form-control" style="width:109px;text-align:center" type="number" min="0" step="0.1" placeholder="—" data-tooltip="${UI.t('gym_ex_distance_label')}" value="${exDistance}">
          <span style="font-size:0.5625rem;font-weight:700;color:var(--accent);letter-spacing:.06em">KM</span>
        </div>
      </div>`;
    }
    const lbl = 'font-size:0.5625rem;font-weight:700;color:var(--text-muted);letter-spacing:.06em;text-align:center';
    return `<div class="gym-ex-metrics">
      <div style="display:flex;flex-direction:column;align-items:center;gap:0.125rem;flex-shrink:0">
        <input class="form-control gym-ex-small" type="number" min="1" max="99"  placeholder="—" data-tooltip="${UI.t('gym_sets_label')}"  value="${sets}">
        <span style="${lbl}">SET</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:0.125rem;flex-shrink:0">
        <input class="form-control gym-ex-small" type="number" min="1" max="999" placeholder="—" data-tooltip="${UI.t('gym_reps_label')}"  value="${reps}">
        <span style="${lbl}">TEK</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:0.125rem;flex-shrink:0">
        <input class="form-control gym-ex-small" type="number" min="0" step="0.5" placeholder="—" data-tooltip="${UI.t('gym_weight_label')}" value="${weight}">
        <span style="${lbl}">KG</span>
      </div>
    </div>`;
  }

  function _getFormExercises(containerId = 'gym-ex-list') {
    const exercises = [];
    document.querySelectorAll(`#${containerId} .gym-ex-row`).forEach(row => {
      const nameEl   = row.querySelector('.gym-ex-name');
      const muscleEl = row.querySelector('.gym-ex-muscle');
      const inputs   = [...row.querySelectorAll('.gym-ex-metrics input')];
      const name = nameEl.value.trim();
      if (!name) return;
      const muscle = muscleEl ? muscleEl.value : '';
      if (muscle === 'cardio') {
        exercises.push({
          id: Store._id(), name, muscle,
          exDuration: parseFloat(inputs[0]?.value) || null,
          exDistance: parseFloat(inputs[1]?.value) || null,
        });
      } else {
        exercises.push({
          id: Store._id(), name, muscle,
          sets:   parseInt(inputs[0]?.value)   || null,
          reps:   parseInt(inputs[1]?.value)   || null,
          weight: parseFloat(inputs[2]?.value) || null,
        });
      }
    });
    return exercises;
  }

  // ── Modal HTML builders ────────────────────────────────────

  function _gymFormHTML() {
    return `<form id="gym-form">
      <div class="form-group" style="margin-bottom:0.75rem">
        <div style="display:flex;gap:0.5rem;align-items:center">
          <div style="flex:1">
            <select id="gym-template-select" style="display:none"></select>
            <button type="button" id="gym-template-btn" class="gym-csel" onclick="Gym._openTemplateDropdown(this)" style="font-size:0.8125rem">
              <span class="gym-csel-name" style="color:var(--text-muted)">${UI.t('gym_load_template_title')}</span>
              ${_CHEVRON_SVG}
            </button>
          </div>
          <button type="button" id="gym-load-template-btn" class="btn btn-secondary" style="white-space:nowrap;font-size:0.75rem;padding:0.3125rem 0.625rem">
            <svg data-lucide="download" style="width:0.875rem;height:0.875rem"></svg>
            <span>${UI.t('gym_template_load_btn')}</span>
          </button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('lbl_date')}</label>
          <button type="button" id="gym-date-btn" onclick="Gym.toggleGymDate('workout')"
            style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
            <span id="gym-date-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
          </button>
          <input type="hidden" id="gym-date" value="">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('gym_duration_label')}</label>
          <input class="form-control" type="number" id="gym-duration" min="1" max="600" placeholder="örn: 60">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('gym_type_label')}</label>
          <select id="gym-type" style="display:none">
            ${GYM_TYPE_OPTS.map(o => `<option value="${o.value}">${UI.t(o.labelKey)}</option>`).join('')}
          </select>
          <button type="button" id="gym-type-btn" class="gym-csel" onclick="Gym._openTypeDropdown(this,'gym-type','gym-type-btn')">
            <span class="gym-csel-dot" style="background:var(--accent)"></span>
            <span class="gym-csel-name">${UI.t('gym_type_strength')}</span>
            ${_CHEVRON_SVG}
          </button>
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('gym_rpe_label')}</label>
          <input class="form-control" type="number" id="gym-rpe" min="1" max="10" step="0.5" placeholder="1–10">
        </div>
      </div>
      <div class="form-group" id="gym-distance-row" style="display:none">
        <label class="form-label">${UI.t('gym_distance_label')}</label>
        <input class="form-control" type="number" id="gym-distance" min="0" step="0.1" placeholder="örn: 5.5">
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('gym_notes_label')}</label>
        <textarea class="form-control" id="gym-notes" rows="2" placeholder="${UI.t('gym_notes_placeholder')}" style="resize:vertical"></textarea>
      </div>
      <div class="form-group">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem">
          <label class="form-label" style="margin:0">${UI.t('gym_exercises_label')}</label>
          <button type="button" id="gym-add-ex-btn" class="btn btn-secondary" style="font-size:0.75rem;padding:0.3125rem 0.625rem;gap:0.25rem">
            <svg data-lucide="plus" style="width:0.875rem;height:0.875rem"></svg>
            <span>${UI.t('gym_add_exercise_btn')}</span>
          </button>
        </div>
        <div class="gym-ex-header">
          <span class="gym-ex-col-name">${UI.t('gym_exercises_label')}</span>
          <span class="gym-ex-col-num"></span>
          <span class="gym-ex-col-num"></span>
          <span class="gym-ex-col-num"></span>
          <span style="width:2.25rem"></span>
        </div>
        <div id="gym-ex-list"></div>
      </div>
    </form>`;
  }

  function _gymBodyFormHTML() {
    return `<form id="gym-body-form">
      <div class="form-group">
        <label class="form-label">${UI.t('lbl_date')}</label>
        <button type="button" id="gym-body-date-btn" onclick="Gym.toggleGymDate('body')"
          style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
          <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
          <span id="gym-body-date-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
        </button>
        <input type="hidden" id="gym-body-date" value="">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('gym_body_weight_label')}</label>
          <input class="form-control" type="number" id="gym-body-weight" min="20" max="300" step="0.1" placeholder="örn: 75.5">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('gym_body_fat_label')}</label>
          <input class="form-control" type="number" id="gym-body-fat" min="1" max="70" step="0.1" placeholder="örn: 18.5">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('gym_body_waist_label')}</label>
          <input class="form-control" type="number" id="gym-body-waist" min="40" max="200" step="0.5" placeholder="örn: 82">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('gym_body_chest_label')}</label>
          <input class="form-control" type="number" id="gym-body-chest" min="40" max="200" step="0.5" placeholder="örn: 96">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('gym_body_arm_label')}</label>
          <input class="form-control" type="number" id="gym-body-arm" min="15" max="60" step="0.5" placeholder="örn: 35">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('gym_body_leg_label')}</label>
          <input class="form-control" type="number" id="gym-body-leg" min="30" max="100" step="0.5" placeholder="örn: 55">
        </div>
      </div>
    </form>`;
  }

  function _gymTemplateEditFormHTML() {
    return `<div class="form-row">
      <div class="form-group" style="flex:2">
        <label class="form-label">${UI.t('lbl_title')}</label>
        <input class="form-control" type="text" id="gym-tedit-name" placeholder="${UI.t('gym_template_name_ph')}" maxlength="50">
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">${UI.t('gym_template_type_label')}</label>
        <select id="gym-tedit-type" style="display:none">
          ${GYM_TYPE_OPTS.map(o => `<option value="${o.value}">${UI.t(o.labelKey)}</option>`).join('')}
        </select>
        <button type="button" id="gym-tedit-type-btn" class="gym-csel" onclick="Gym._openTypeDropdown(this,'gym-tedit-type','gym-tedit-type-btn')">
          <span class="gym-csel-dot" style="background:var(--accent)"></span>
          <span class="gym-csel-name">${UI.t('gym_type_strength')}</span>
          ${_CHEVRON_SVG}
        </button>
      </div>
    </div>
    <div class="form-group">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem">
        <label class="form-label" style="margin:0">${UI.t('gym_exercises_label')}</label>
        <button type="button" id="gym-tedit-add-ex-btn" class="btn btn-secondary" style="font-size:0.75rem;padding:0.3125rem 0.625rem;gap:0.25rem">
          <svg data-lucide="plus" style="width:0.875rem;height:0.875rem"></svg>
          <span>${UI.t('gym_add_exercise_btn')}</span>
        </button>
      </div>
      <div class="gym-ex-header">
        <span class="gym-ex-col-name">${UI.t('gym_exercises_label')}</span>
        <span class="gym-ex-col-num"></span>
        <span class="gym-ex-col-num"></span>
        <span class="gym-ex-col-num"></span>
        <span style="width:2.25rem"></span>
      </div>
      <div id="gym-tedit-ex-list"></div>
    </div>`;
  }

  // ── Modal open/close ───────────────────────────────────────

  function _openAddModal() {
    _editId = null;
    _gymModal = new CustomModal({
      title: UI.t('gym_add_modal'),
      content: _gymFormHTML(),
      width: 580,
      buttons: [
        { label: UI.t('gym_template_save_btn'), variant: 'secondary', onClick: () => _openSaveTemplateModal() },
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _save() },
      ],
    });
    _gymModal.open();
    lucide.createIcons({ nodes: [_gymModal.getBody()] });
    document.getElementById('gym-ex-list').innerHTML = '';
    _exCount = 0;
    document.getElementById('gym-date').value = UI.today();
    document.getElementById('gym-date-label').textContent = UI.formatDate(UI.today());
    _gymDateCdp = new CustomDatePicker({
      btn: 'gym-date-btn', input: 'gym-date', align: 'left',
      onSelect: date => { document.getElementById('gym-date-label').textContent = UI.formatDate(date); },
    });
    _updateDistanceRow();
    _updateTypeBtn('gym-type-btn', 'strength');
    _refreshTemplateSelect();
    document.getElementById('gym-form').addEventListener('submit', e => { e.preventDefault(); _save(); });
    document.getElementById('gym-add-ex-btn').addEventListener('click', () => _addExRow());
    document.getElementById('gym-load-template-btn').addEventListener('click', _loadTemplateFromSelect);
    document.getElementById('gym-type').addEventListener('change', _updateDistanceRow);
  }

  function edit(id) {
    const w = _workouts().find(w => w.id === id);
    if (!w) return;
    _editId = id;
    _gymModal = new CustomModal({
      title: UI.t('gym_edit_modal'),
      content: _gymFormHTML(),
      width: 580,
      buttons: [
        { label: UI.t('gym_template_save_btn'), variant: 'secondary', onClick: () => _openSaveTemplateModal() },
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _save() },
      ],
    });
    _gymModal.open();
    lucide.createIcons({ nodes: [_gymModal.getBody()] });
    document.getElementById('gym-date').value = w.date;
    document.getElementById('gym-date-label').textContent = w.date ? UI.formatDate(w.date) : '';
    document.getElementById('gym-type').value = w.type || 'strength';
    _updateTypeBtn('gym-type-btn', w.type || 'strength');
    document.getElementById('gym-duration').value = w.duration || '';
    document.getElementById('gym-notes').value    = w.notes || '';
    document.getElementById('gym-rpe').value      = w.rpe || '';
    document.getElementById('gym-distance').value = w.distance || '';
    document.getElementById('gym-ex-list').innerHTML = '';
    _exCount = 0;
    (w.exercises || []).forEach(ex => _addExRow(ex.name, ex.sets || '', ex.reps || '', ex.weight || '', ex.muscle || '', 'gym-ex-list', ex.exDuration || '', ex.exDistance || ''));
    _gymDateCdp = new CustomDatePicker({
      btn: 'gym-date-btn', input: 'gym-date', align: 'left',
      onSelect: date => { document.getElementById('gym-date-label').textContent = UI.formatDate(date); },
    });
    _updateDistanceRow();
    _refreshTemplateSelect();
    document.getElementById('gym-form').addEventListener('submit', e => { e.preventDefault(); _save(); });
    document.getElementById('gym-add-ex-btn').addEventListener('click', () => _addExRow());
    document.getElementById('gym-load-template-btn').addEventListener('click', _loadTemplateFromSelect);
    document.getElementById('gym-type').addEventListener('change', _updateDistanceRow);
  }

  function _updateDistanceRow() {
    const type = document.getElementById('gym-type').value;
    const row  = document.getElementById('gym-distance-row');
    if (row) row.style.display = type === 'cardio' ? '' : 'none';
  }

  // ── Save workout ───────────────────────────────────────────

  function _save() {
    const date = document.getElementById('gym-date').value;
    if (!date) return;
    const type      = document.getElementById('gym-type').value;
    const duration  = parseInt(document.getElementById('gym-duration').value)   || null;
    const notes     = document.getElementById('gym-notes').value.trim();
    const rpe       = parseFloat(document.getElementById('gym-rpe').value)      || null;
    const distance  = parseFloat(document.getElementById('gym-distance').value) || null;
    const exercises = _getFormExercises();

    if (_editId) {
      Store.updateWorkout(_editId, { date, type, duration, notes, rpe, distance, exercises });
      UI.toast(UI.t('gym_workout_updated'), 'success');
    } else {
      _clearSeedSection('workouts');
      Store.addWorkout({ date, type, duration, notes, rpe, distance, exercises });
      UI.toast(UI.t('gym_workout_added'), 'success');
    }
    _gymModal.close();
    _render();
  }

  function del(id) {
    DeleteManager.confirm({ module: 'gym', title: UI.t('btn_delete'), message: UI.t('gym_confirm_delete'), confirmLabel: UI.t('btn_delete'), onConfirm: () => {
      Store.deleteWorkout(id);
      UI.toast(UI.t('gym_workout_deleted'), 'success');
      _render();
    }});
  }

  // ── Body measurements ──────────────────────────────────────

  function _openBodyModal() {
    _editBodyId = null;
    _gymBodyModal = new CustomModal({
      title: UI.t('gym_body_modal_title'),
      icon: 'ruler',
      content: _gymBodyFormHTML(),
      width: 480,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveBody() },
      ],
    });
    _gymBodyModal.open();
    lucide.createIcons({ nodes: [_gymBodyModal.getBody()] });
    document.getElementById('gym-body-date').value = UI.today();
    document.getElementById('gym-body-date-label').textContent = UI.formatDate(UI.today());
    _bodyDateCdp = new CustomDatePicker({
      btn: 'gym-body-date-btn', input: 'gym-body-date', align: 'left',
      onSelect: date => { document.getElementById('gym-body-date-label').textContent = UI.formatDate(date); },
    });
    document.getElementById('gym-body-form').addEventListener('submit', e => { e.preventDefault(); _saveBody(); });
  }

  function editBody(id) {
    const log = Store.getGymBody().logs.find(l => l.id === id);
    if (!log) return;
    _editBodyId = id;
    _gymBodyModal = new CustomModal({
      title: UI.t('gym_body_edit_modal_title'),
      icon: 'ruler',
      content: _gymBodyFormHTML(),
      width: 480,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveBody() },
      ],
    });
    _gymBodyModal.open();
    lucide.createIcons({ nodes: [_gymBodyModal.getBody()] });
    document.getElementById('gym-body-date').value   = log.date    || '';
    document.getElementById('gym-body-date-label').textContent = log.date ? UI.formatDate(log.date) : '';
    document.getElementById('gym-body-weight').value = log.weight  || '';
    document.getElementById('gym-body-fat').value    = log.bodyFat || '';
    document.getElementById('gym-body-waist').value  = log.waist   || '';
    document.getElementById('gym-body-chest').value  = log.chest   || '';
    document.getElementById('gym-body-arm').value    = log.arm     || '';
    document.getElementById('gym-body-leg').value    = log.leg     || '';
    _bodyDateCdp = new CustomDatePicker({
      btn: 'gym-body-date-btn', input: 'gym-body-date', align: 'left',
      onSelect: date => { document.getElementById('gym-body-date-label').textContent = UI.formatDate(date); },
    });
    document.getElementById('gym-body-form').addEventListener('submit', e => { e.preventDefault(); _saveBody(); });
  }

  function _saveBody() {
    const date    = document.getElementById('gym-body-date').value;
    if (!date) return;
    const weight  = parseFloat(document.getElementById('gym-body-weight').value) || null;
    const bodyFat = parseFloat(document.getElementById('gym-body-fat').value)    || null;
    const waist   = parseFloat(document.getElementById('gym-body-waist').value)  || null;
    const chest   = parseFloat(document.getElementById('gym-body-chest').value)  || null;
    const arm     = parseFloat(document.getElementById('gym-body-arm').value)    || null;
    const leg     = parseFloat(document.getElementById('gym-body-leg').value)    || null;
    if (_editBodyId) {
      Store.updateBodyMeasurement(_editBodyId, { date, weight, bodyFat, waist, chest, arm, leg });
      UI.toast(UI.t('gym_body_updated'), 'success');
    } else {
      _clearSeedSection('body');
      Store.addBodyMeasurement({ date, weight, bodyFat, waist, chest, arm, leg });
      UI.toast(UI.t('gym_body_added'), 'success');
    }
    _editBodyId = null;
    _gymBodyModal.close();
    _renderBody();
  }

  function delBody(id) {
    DeleteManager.confirm({ module: 'gym', title: UI.t('btn_delete'), message: UI.t('gym_confirm_delete'), confirmLabel: UI.t('btn_delete'), onConfirm: () => {
      Store.deleteBodyMeasurement(id);
      UI.toast(UI.t('gym_body_deleted'), 'success');
      _renderBody();
    }});
  }

  // ── Templates ──────────────────────────────────────────────

  function _openSaveTemplateModal() {
    _editTemplateId = null;
    _pendingTemplateExercises = _getFormExercises();
    if (!_pendingTemplateExercises.length) {
      UI.toast(UI.t('gym_no_exercises'), 'warning');
      return;
    }
    _gymTemplateModal = new CustomModal({
      title: UI.t('gym_template_modal_title'),
      icon: 'bookmark',
      content: `<div class="form-group">
        <label class="form-label">${UI.t('lbl_title')}</label>
        <input class="form-control" type="text" id="gym-template-name" placeholder="${UI.t('gym_template_name_ph')}" maxlength="50">
      </div>`,
      width: 400,
      zIndex: 1200,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveTemplate() },
      ],
    });
    _gymTemplateModal.open();
    setTimeout(() => { const el = document.getElementById('gym-template-name'); if (el) el.focus(); }, 50);
  }

  function renameTemplate(id) {
    const t = Store.getGymTemplates().templates.find(t => t.id === id);
    if (!t) return;
    _editTemplateId = id;
    _pendingTemplateExercises = null;
    _gymTemplateModal = new CustomModal({
      title: UI.t('gym_template_rename_title'),
      icon: 'pencil',
      content: `<div class="form-group">
        <label class="form-label">${UI.t('lbl_title')}</label>
        <input class="form-control" type="text" id="gym-template-name" placeholder="${UI.t('gym_template_name_ph')}" maxlength="50">
      </div>`,
      width: 400,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveTemplate() },
      ],
    });
    _gymTemplateModal.open();
    document.getElementById('gym-template-name').value = t.name;
  }

  function editTemplate(id) {
    const t = Store.getGymTemplates().templates.find(t => t.id === id);
    if (!t) return;
    _editTemplateId = id;
    _gymTemplateEditModal = new CustomModal({
      title: UI.t('gym_template_edit_title'),
      icon: 'pencil',
      content: _gymTemplateEditFormHTML(),
      width: 580,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveTemplateEdit() },
      ],
    });
    _gymTemplateEditModal.open();
    lucide.createIcons({ nodes: [_gymTemplateEditModal.getBody()] });
    document.getElementById('gym-tedit-name').value = t.name;
    document.getElementById('gym-tedit-type').value = t.type || 'strength';
    _updateTypeBtn('gym-tedit-type-btn', t.type || 'strength');
    const container = document.getElementById('gym-tedit-ex-list');
    container.innerHTML = '';
    (t.exercises || []).forEach(ex => _addExRow(ex.name, ex.sets || '', ex.reps || '', ex.weight || '', ex.muscle || '', 'gym-tedit-ex-list', ex.exDuration || '', ex.exDistance || ''));
    document.getElementById('gym-tedit-add-ex-btn').addEventListener('click', () => _addExRow('', '', '', '', '', 'gym-tedit-ex-list'));
  }

  function _saveTemplateEdit() {
    const name = document.getElementById('gym-tedit-name').value.trim();
    if (!name) return;
    const type = document.getElementById('gym-tedit-type').value;
    const exercises = _getFormExercises('gym-tedit-ex-list');
    Store.updateGymTemplate(_editTemplateId, { name, type, exercises });
    UI.toast(UI.t('gym_template_updated'), 'success');
    _editTemplateId = null;
    _gymTemplateEditModal.close();
    _renderTemplates();
  }

  function _saveTemplate() {
    const name = document.getElementById('gym-template-name').value.trim();
    if (!name) return;
    if (_editTemplateId) {
      Store.updateGymTemplate(_editTemplateId, { name });
      UI.toast(UI.t('gym_template_updated'), 'success');
    } else {
      _clearSeedSection('templates');
      const type = document.getElementById('gym-type').value;
      Store.addGymTemplate({ name, type, exercises: _pendingTemplateExercises || [] });
      UI.toast(UI.t('gym_template_added'), 'success');
    }
    _editTemplateId = null;
    _pendingTemplateExercises = null;
    _gymTemplateModal.close();
    _renderTemplates();
  }

  function loadTemplate(id) {
    const t = Store.getGymTemplates().templates.find(t => t.id === id);
    if (!t) return;
    if (!(_gymModal && _gymModal._overlay && _gymModal._overlay.isConnected)) {
      _openAddModal();
    }
    document.getElementById('gym-ex-list').innerHTML = '';
    _exCount = 0;
    if (t.type) {
      document.getElementById('gym-type').value = t.type;
      _updateTypeBtn('gym-type-btn', t.type);
    }
    (t.exercises || []).forEach(ex => _addExRow(ex.name, ex.sets || '', ex.reps || '', ex.weight || '', ex.muscle || ''));
    _updateDistanceRow();
    document.getElementById('gym-template-select').value = '';
    _syncTemplateBtnLabel('');
  }

  function _loadTemplateFromSelect() {
    const id = document.getElementById('gym-template-select').value;
    if (!id) { UI.toast(UI.t('gym_load_template_title'), 'info'); return; }
    loadTemplate(id);
  }

  function duplicateTemplate(id) {
    const t = Store.getGymTemplates().templates.find(t => t.id === id);
    if (!t) return;
    _clearSeedSection('templates');
    const exercises = (t.exercises || []).map(ex => ({ ...ex, id: Store._id() }));
    Store.addGymTemplate({ name: t.name + ' (kopya)', type: t.type, exercises });
    UI.toast(UI.t('gym_template_duplicated'), 'success');
    _renderTemplates();
  }

  function delTemplate(id) {
    DeleteManager.confirm({ module: 'gym', title: UI.t('btn_delete'), message: UI.t('gym_template_confirm_delete'), confirmLabel: UI.t('btn_delete'), onConfirm: () => {
      Store.deleteGymTemplate(id);
      UI.toast(UI.t('gym_template_deleted'), 'success');
      _renderTemplates();
    }});
  }

  // ── Import ─────────────────────────────────────────────────

  function _triggerGymImport() {
    const input = document.getElementById('lt-gym-import-file');
    if (input) { input.value = ''; input.click(); }
  }

  function _importGymData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        const isKey = k => k.startsWith('lt_gym') || k === 'lt_panels_gym';
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
  }

  // ── Init ───────────────────────────────────────────────────

  return {
    init() {
      UI.initTopbar({ noPrivacy: true });
      UI.initEsc();

      // Reset panel order to new default (one-time migration)
      if (!Store.get('gym_panel_order_v2')) {
        Store.set('gym_panel_order', _PANEL_DEFS.map(p => p.id));
        Store.set('gym_panel_order_v2', true);
      }

      // Set volume & muscles hidden by default on first load
      if (!Store.get('gym_panels_initialized')) {
        const state = Store.get('lt_panels_gym') || {};
        if (!('gym-panel-volume'  in state)) state['gym-panel-volume']  = false;
        if (!('gym-panel-muscles' in state)) state['gym-panel-muscles'] = false;
        Store.set('lt_panels_gym', state);
        Store.set('gym_panels_initialized', true);
      }

      UI.registerPagePanels('gym', _PANEL_DEFS.map(p => ({ id: p.id, label: UI.t(p.labelKey) })));
      const _pmBtn = document.getElementById('panel-manager-btn');
      const _lockBtn = document.getElementById('gym-edit-btn');
      if (_pmBtn && _lockBtn) _lockBtn.parentNode.insertBefore(_pmBtn, _lockBtn);

      document.getElementById('gym-add-btn').addEventListener('click', _openAddModal);
      document.getElementById('gym-add-body-btn').addEventListener('click', _openBodyModal);

      document.addEventListener('lt:language-change', () => _render());
      document.addEventListener('lt:theme-change',    () => _render());
      document.addEventListener('lt:panel-change',    () => _renderPanelGrid());


      _updateToggleUI();
      _render();
    },
    toggleGymDate(type) { (type === 'workout' ? _gymDateCdp : _bodyDateCdp).toggle(); },
    edit,
    del,
    editBody,
    delBody,
    renameTemplate,
    editTemplate,
    duplicateTemplate,
    delTemplate,
    loadTemplate,
    setWeeklyGoal,
    toggleOffDay,
    setWeightUnit,
    toggleEditMode,
    changePanelWidth,
    showPRsMore,
    showBodyMore,
    showHistoryMore,
    showTemplatesMore,
    _openTypeDropdown,
    _openTemplateDropdown,
    _openExerciseDropdown,
    _openMuscleDropdown,
    triggerImport: _triggerGymImport,
    importData: _importGymData,
  };
})();
