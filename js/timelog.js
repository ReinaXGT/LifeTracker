const TimePage = {
  _filter: 'all',
  _filterDateFrom: '',
  _filterDateTo: '',
  _filterDateCdp: null,
  _histOffset: 0,
  _histTab: 'summary',
  _histCtx: null,
  _editingId: null,
  _pendingDeleteId: null,
  _logDateCdp: null,
  _startTimeCtp: null,
  _endTimeCtp: null,
  _addLogModal: null,
  _histModal: null,
  _deleteModal: null,
  _createTaskModal: null,

  _TASK_CAT_COLORS: {
    'Çalışma': '#7C6CFC', 'Öğrenme': '#60A5FA', 'Egzersiz': '#34D399',
    'Sosyal': '#FBBF24', 'Uyku': '#A78BFA', 'Diğer': '#94A3B8',
  },

  _LOG_CATS: [
    { value: 'Çalışma',  key: 'pomo_cat_work'     },
    { value: 'Öğrenme',  key: 'pomo_cat_learn'    },
    { value: 'Egzersiz', key: 'pomo_cat_exercise' },
    { value: 'Sosyal',   key: 'pomo_cat_social'   },
    { value: 'Uyku',     key: 'pomo_cat_sleep'    },
    { value: 'Diğer',    key: 'pomo_cat_other'    },
  ],

  openLogCatDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn,
        items: [],
        onOpen: (dd) => {
          const cur = document.getElementById('addLogForm')?.logCat?.value || 'Çalışma';
          dd.setItems(this._LOG_CATS.map(c => ({
            value: c.value, label: UI.t(c.key), active: c.value === cur,
          })));
        },
        onSelect: (val) => {
          const f = document.getElementById('addLogForm');
          if (f) f.logCat.value = val;
          this._setLogCatBtn(val);
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _setLogCatBtn(value) {
    const btn = document.getElementById('logCatBtn');
    if (!btn) return;
    const cat = this._LOG_CATS.find(c => c.value === value);
    btn.querySelector('.dd-label').textContent = cat ? UI.t(cat.key) : value;
  },

  openLogProjectDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn,
        items: [],
        onOpen: (dd) => {
          const todos = (Store.get('habits_todos') || { items: [] }).items;
          const today = UI.today();
          const curId = document.getElementById('logProjectTaskId')?.value || '';
          const todayTasks = todos.filter(t => !t.done && t.date === today);
          const items = [{ value: '__create__', label: UI.t('time_task_create'), icon: 'plus-circle' }];
          if (todayTasks.length) {
            items.push({ separator: true });
            items.push({ header: UI.t('time_task_today') });
            todayTasks.forEach(t => items.push({ value: t.id, label: t.text, active: t.id === curId }));
          }
          dd.setItems(items);
        },
        onSelect: (val) => {
          if (val === '__create__') {
            btn._ddInst.close();
            this.openCreateTaskModal(btn);
            return;
          }
          const todos = (Store.get('habits_todos') || { items: [] }).items;
          const task = todos.find(t => t.id === val);
          if (task) {
            document.getElementById('logProjectInput').value = task.text;
            document.getElementById('logProjectTaskId').value = task.id;
            const lbl = btn.querySelector('.dd-label');
            if (lbl) { lbl.textContent = task.text; lbl.style.color = 'var(--text-primary)'; }
          }
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  openCreateTaskCatDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn,
        items: [],
        onOpen: (dd) => {
          const cur = document.querySelector('[name="taskCategory"]')?.value || 'Çalışma';
          dd.setItems(this._LOG_CATS.map(c => ({
            value: c.value, label: UI.t(c.key), active: c.value === cur,
            color: this._TASK_CAT_COLORS[c.value],
          })));
        },
        onSelect: (val) => {
          const f = document.getElementById('createTaskForm');
          if (f) f.taskCategory.value = val;
          const color = this._TASK_CAT_COLORS[val] || '#94A3B8';
          document.getElementById('createTaskCatDot').style.background = color;
          const cat = this._LOG_CATS.find(c => c.value === val);
          document.getElementById('createTaskCatLabel').textContent = cat ? UI.t(cat.key) : val;
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _addSubtaskField(containerId, text, done) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const id  = Store._id();
    const div = document.createElement('div');
    div.className      = 'subtask-input-row';
    div.dataset.subtaskId = id;
    div.dataset.done   = done ? 'true' : 'false';
    div.style.cssText  = 'display:flex;align-items:center;gap:8px;margin-top:6px';
    div.innerHTML = `
      <div style="width:1rem;height:1rem;border-radius:0.25rem;border:2px solid var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;background:${done ? 'var(--blue)' : 'transparent'};border-color:${done ? 'var(--blue)' : 'var(--border)'}"
        onclick="this.dataset.done=this.dataset.done==='true'?'false':'true';this.closest('.subtask-input-row').dataset.done=this.dataset.done;this.style.background=this.dataset.done==='true'?'var(--blue)':'transparent';this.style.borderColor=this.dataset.done==='true'?'var(--blue)':'var(--border)'">
      </div>
      <input class="form-control" type="text" placeholder="${UI.t('pomo_subtask_placeholder')}" value="${(text||'').replace(/"/g,'&quot;')}"
        style="flex:1;font-size:0.8125rem;padding:0.3125rem 0.625rem"
        onkeydown="if(event.key==='Enter'){event.preventDefault();event.stopPropagation();if(this.value.trim())TimePage._addSubtaskField('${containerId}');}">
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
        id:   row.dataset.subtaskId || Store._id(),
        text: row.querySelector('input').value.trim(),
        done: row.dataset.done === 'true',
      }))
      .filter(s => s.text);
  },

  _createTaskFormHTML() {
    const CHEV = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>`;
    return `<form id="createTaskForm" onsubmit="return false"><div style="display:flex;flex-direction:column;gap:16px">
      <div class="form-group">
        <label class="form-label">${UI.t('pomo_task_text_label')}</label>
        <input class="form-control" type="text" name="taskText" placeholder="${UI.t('pomo_task_placeholder')}" autofocus>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" style="display:flex;align-items:center;gap:6px">
            <span>${UI.t('pomo_pomodoro_count')}</span>
            <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span>
          </label>
          <input class="form-control" type="number" name="taskPomodoros" min="0.1" max="20" step="0.1" placeholder="1"
            oninput="if(this.value.trim())this.form.taskDuration.value=''">
        </div>
        <div class="form-group">
          <label class="form-label" style="display:flex;align-items:center;gap:6px">
            <span>${UI.t('pomo_est_duration')}</span>
            <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span>
          </label>
          <div style="display:flex;align-items:center;gap:8px">
            <input class="form-control" type="number" name="taskDuration" min="1" max="480" placeholder="30" style="flex:1"
              oninput="if(this.value.trim())this.form.taskPomodoros.value=''">
            <span style="color:var(--text-muted);font-size:0.8125rem;white-space:nowrap">${UI.t('pomo_minutes_label')}</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('lbl_category')}</label>
        <button type="button" id="createTaskCatBtn" onclick="TimePage.openCreateTaskCatDropdown(this)"
          style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
          <span id="createTaskCatDot" style="width:0.625rem;height:0.625rem;border-radius:50%;background:#7C6CFC;flex-shrink:0"></span>
          <span id="createTaskCatLabel" class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.t('pomo_cat_work')}</span>
          ${CHEV}
        </button>
        <input type="hidden" name="taskCategory" value="Çalışma">
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;gap:6px">
          <span>${UI.t('pomo_note_label')}</span>
          <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span>
        </label>
        <textarea class="form-control" name="taskNote" rows="2" placeholder="${UI.t('pomo_note_placeholder')}"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;justify-content:space-between">
          <span>${UI.t('pomo_subtasks_label')} <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:400">(${UI.t('lbl_optional')})</span></span>
          <button type="button" class="btn btn-ghost btn-sm" onclick="TimePage._addSubtaskField('createSubtaskList')">
            <svg data-lucide="plus" style="width:0.75rem;height:0.75rem"></svg> ${UI.t('pomo_add_subtask_btn')}
          </button>
        </label>
        <div id="createSubtaskList"></div>
      </div>
    </div></form>`;
  },

  openCreateTaskModal(projectBtn) {
    this._createTaskModal = new CustomModal({
      title: UI.t('pomo_new_todo_title'),
      icon: 'plus-circle',
      width: 500,
      content: this._createTaskFormHTML(),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => this._saveNewTask(projectBtn) },
      ],
    });
    this._createTaskModal.open();
    document.getElementById('createTaskForm').addEventListener('submit', e => { e.preventDefault(); this._saveNewTask(projectBtn); });
  },

  _saveNewTask(projectBtn) {
    const f = document.getElementById('createTaskForm');
    if (!f) return;
    const text = f.taskText.value.trim();
    if (!text) { UI.toast(UI.t('time_task_required'), 'error'); return; }
    const rawPomos = parseFloat(f.taskPomodoros.value);
    const rawMins  = parseInt(f.taskDuration.value);
    const pomodoros = (!isNaN(rawPomos) && rawPomos > 0) ? rawPomos : ((!isNaN(rawMins) && rawMins > 0) ? null : 1);
    const duration  = (!isNaN(rawMins) && rawMins > 0 && !pomodoros) ? rawMins : null;
    const category  = f.taskCategory.value || 'Çalışma';
    const note      = f.taskNote.value.trim() || null;
    const subtasks  = this._readSubtasks('createSubtaskList');
    const newTask   = { id: Store._id(), text, date: UI.today(), done: false, pomodoros, duration, pomoDone: 0, category, note, subtasks };
    const data      = Store.get('habits_todos') || { items: [] };
    data.items.push(newTask);
    Store.set('habits_todos', data);
    this._createTaskModal?.close();
    UI.toast(UI.t('pomo_task_added'), 'success');
    if (projectBtn) {
      document.getElementById('logProjectInput').value = newTask.text;
      document.getElementById('logProjectTaskId').value = newTask.id;
      const lbl = projectBtn.querySelector('.dd-label');
      if (lbl) { lbl.textContent = newTask.text; lbl.style.color = 'var(--text-primary)'; }
      if (projectBtn._ddInst) { projectBtn._ddInst.destroy(); projectBtn._ddInst = null; }
    }
  },

  toggleLogDate()  { this._logDateCdp.toggle(); },
  toggleLogStart() { this._startTimeCtp?.toggle(); },
  toggleLogEnd()   { this._endTimeCtp?.toggle(); },

  _logFormHTML() {
    return `<form id="addLogForm" onsubmit="return false"><div style="display:flex;flex-direction:column;gap:16px">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('lbl_date')}</label>
          <button type="button" id="logDateBtn" onclick="TimePage.toggleLogDate()"
            style="width:100%;display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
            <span id="logDateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
          </button>
          <input type="hidden" name="logDate" id="logDateInput" value="">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('lbl_category')}</label>
          <button type="button" id="logCatBtn" onclick="TimePage.openLogCatDropdown(this)"
            style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.t('pomo_cat_work')}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" name="logCat" value="Çalışma">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('time_project_label')}</label>
        <button type="button" id="logProjectBtn" onclick="TimePage.openLogProjectDropdown(this)"
          style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
          <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-muted);text-align:left">${UI.t('time_project_placeholder')}</span>
          <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
        </button>
        <input type="hidden" name="logProject" id="logProjectInput" value="">
        <input type="hidden" id="logProjectTaskId" value="">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('time_start_label')}</label>
          <button type="button" id="logStartBtn" onclick="TimePage.toggleLogStart()"
            style="width:100%;display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="clock" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
            <span class="ctp-label" id="logStartLabel" style="flex:1;font-size:0.8125rem;font-family:var(--font-mono);color:var(--text-muted);text-align:left">--:--</span>
          </button>
          <input type="hidden" name="logStart" id="logStartInput" value="">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('time_end_label')}</label>
          <button type="button" id="logEndBtn" onclick="TimePage.toggleLogEnd()"
            style="width:100%;display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="clock" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
            <span class="ctp-label" id="logEndLabel" style="flex:1;font-size:0.8125rem;font-family:var(--font-mono);color:var(--text-muted);text-align:left">--:--</span>
          </button>
          <input type="hidden" name="logEnd" id="logEndInput" value="">
        </div>
      </div>
    </div></form>`;
  },

  _historyModalHTML() {
    return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <button class="btn btn-ghost btn-sm" onclick="TimePage.prevHistoryMonth()" style="gap:6px">
        <svg data-lucide="chevron-left" style="width:1rem;height:1rem"></svg><span>${UI.t('time_prev_month')}</span>
      </button>
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px">
        <span id="hist-month-label" style="font-size:1rem;font-weight:700;font-family:var(--font-mono);color:var(--text-primary)"></span>
        <span style="font-size:0.6875rem;color:var(--text-muted)">${UI.t('time_hist_total')}: <span id="hist-total" style="color:var(--accent);font-weight:600"></span></span>
      </div>
      <button class="btn btn-ghost btn-sm" id="hist-next-btn" onclick="TimePage.nextHistoryMonth()" style="gap:6px">
        <span>${UI.t('time_next_month')}</span><svg data-lucide="chevron-right" style="width:1rem;height:1rem"></svg>
      </button>
    </div>
    <div id="hist-stats-row" style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap"></div>
    <div id="hist-tab-content"></div>`;
  },

  /* 24h → "hh:mm AM/PM" gösterim formatı */
  _fmt12(time) {
    if (!time) return '--:--';
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12  = h % 12 || 12;
    return `${String(h12).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}`;
  },

  _setTimeLbl(id, time) {
    const lbl = document.getElementById(id);
    if (!lbl) return;
    lbl.textContent    = time ? this._fmt12(time) : '--:--';
    lbl.style.color    = time ? 'var(--text-primary)' : 'var(--text-muted)';
    lbl.style.fontSize = '12px';
  },

  _openLogModal(title, btnLabel) {
    /* Önceki picker instance'larını temizle */
    this._startTimeCtp?.destroy();
    this._endTimeCtp?.destroy();

    this._addLogModal = new CustomModal({
      title, icon: 'clock', width: 480,
      content: this._logFormHTML(),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => { this._editingId = null; m.close(); } },
        { label: btnLabel, variant: 'primary', onClick: () => this.save() },
      ],
    });
    this._addLogModal.open();
    this._logDateCdp = new CustomDatePicker({
      btn: 'logDateBtn', input: 'logDateInput', align: 'left',
      onSelect: date => { document.getElementById('logDateLabel').textContent = UI.formatDate(date); },
    });
    this._startTimeCtp = new CustomTimePicker({
      btn: 'logStartBtn', input: 'logStartInput', align: 'left',
      onSelect: time => this._setTimeLbl('logStartLabel', time),
    });
    this._endTimeCtp = new CustomTimePicker({
      btn: 'logEndBtn', input: 'logEndInput', align: 'left',
      onSelect: time => this._setTimeLbl('logEndLabel', time),
    });
    document.getElementById('addLogForm').addEventListener('submit', e => { e.preventDefault(); this.save(); });
  },

  init() {
    UI.initTopbar({ noPrivacy: true }); UI.initEsc();
    const lbl = document.getElementById('logFilterDateLabel');
    if (lbl) lbl.textContent = UI.t('time_filter_date_placeholder');
    const _savedTimelogUi = Store.get('timelog_ui');
    if (_savedTimelogUi?.filter) this._filter = _savedTimelogUi.filter;
    this.render();
    document.getElementById('addLogBtn').addEventListener('click', () => this._openAdd());
    document.getElementById('historyBtn').addEventListener('click', () => this.openHistory());
    document.querySelectorAll('.time-filter-btn').forEach(btn =>
      btn.addEventListener('click', () => this.setFilter(btn.dataset.filter))
    );
    // Apply saved filter button state after binding events
    if (this._filter !== 'all') this.setFilter(this._filter);
    document.addEventListener('lt:language-change', () => {
      if (!this._filterDateFrom) {
        const l = document.getElementById('logFilterDateLabel');
        if (l) { l.textContent = UI.t('time_filter_date_placeholder'); l.style.color = 'var(--text-secondary)'; }
      }
      this.render();
    });
    document.addEventListener('lt:theme-change', () => this.render());
  },

  _openAdd() {
    this._editingId = null;
    this._openLogModal(UI.t('time_add_modal'), UI.t('btn_add'));
    const logDate = UI.today();
    document.getElementById('logDateInput').value = logDate;
    document.getElementById('logDateLabel').textContent = UI.formatDate(logDate);
    this._setLogCatBtn('Çalışma');
  },

  edit(id) {
    const log = Store.getTime().logs.find(l => l.id === id);
    if (!log) return;
    this._editingId = id;
    this._openLogModal(UI.t('time_edit_modal'), UI.t('btn_save'));
    const f = document.getElementById('addLogForm');
    document.getElementById('logDateInput').value = log.date;
    document.getElementById('logDateLabel').textContent = log.date ? UI.formatDate(log.date) : '';
    f.logCat.value = log.category;
    this._setLogCatBtn(log.category);
    if (log.project) {
      document.getElementById('logProjectInput').value = log.project;
      document.getElementById('logProjectTaskId').value = log.taskId || '';
      const projBtn = document.getElementById('logProjectBtn');
      if (projBtn) {
        const lbl = projBtn.querySelector('.dd-label');
        if (lbl) { lbl.textContent = log.project; lbl.style.color = 'var(--text-primary)'; }
      }
    }
    this._startTimeCtp.setValue(log.start || '');
    this._endTimeCtp.setValue(log.end || '');
    if (!log.start) this._setTimeLbl('logStartLabel', '');
    if (!log.end)   this._setTimeLbl('logEndLabel', '');
  },

  setFilter(f) {
    this._filter = f;
    Store.set('timelog_ui', { filter: f });
    document.querySelectorAll('.time-filter-btn').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.filter === f)
    );
    this.renderTable();
  },

  toggleLogFilterDate() {
    if (!this._filterDateCdp) {
      this._filterDateCdp = new CustomDatePicker({
        btn: 'logFilterDateBtn', input: 'logFilterDateInput',
        inputTo: 'logFilterDateInputTo',
        align: 'right', clearable: true, range: true,
        onStartSelect: from => {
          const lbl = document.getElementById('logFilterDateLabel');
          if (lbl) { lbl.textContent = UI.formatDate(from) + ' →'; lbl.style.color = 'var(--accent)'; }
        },
        onSelect: (from, to) => {
          this._filterDateFrom = from;
          this._filterDateTo   = to;
          const lbl = document.getElementById('logFilterDateLabel');
          if (lbl) {
            lbl.textContent = from === to ? UI.formatDate(from) : `${UI.formatDate(from)} – ${UI.formatDate(to)}`;
            lbl.style.color = 'var(--text-primary)';
          }
          this.renderTable();
        },
        onClear: () => {
          this._filterDateFrom = '';
          this._filterDateTo   = '';
          const lbl = document.getElementById('logFilterDateLabel');
          if (lbl) { lbl.textContent = UI.t('time_filter_date_placeholder'); lbl.style.color = 'var(--text-secondary)'; }
          this.renderTable();
        },
      });
    }
    this._filterDateCdp.toggle();
  },

  _filteredLogs() {
    const d30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const cutoff = `${d30.getFullYear()}-${String(d30.getMonth()+1).padStart(2,'0')}-${String(d30.getDate()).padStart(2,'0')}`;
    let logs = Store.getTime().logs.filter(l => l.date >= cutoff);
    if (this._filter === 'manual')   logs = logs.filter(l => l.source !== 'pomodoro');
    if (this._filter === 'pomodoro') logs = logs.filter(l => l.source === 'pomodoro');
    if (this._filterDateFrom) {
      const to = this._filterDateTo || this._filterDateFrom;
      logs = logs.filter(l => l.date >= this._filterDateFrom && l.date <= to);
    }
    return logs;
  },

  render() {
    this.renderKPIs();
    this.renderThirtyDayBar();
    this.renderDailyBar();
    this.renderTable();
  },

  renderKPIs() {
    const logs    = Store.getTime().logs;
    const td      = UI.today();
    const _ld = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const weekAgo = (() => { const d=new Date(); d.setDate(d.getDate()-7); return _ld(d); })();
    const monAgo  = (() => { const d=new Date(); d.setDate(d.getDate()-30); return _ld(d); })();

    const todayLogs  = logs.filter(l => l.date === td);
    const todayMin   = todayLogs.reduce((a,l) => a + l.duration, 0);
    const todayFocus = todayLogs.filter(l => l.source === 'pomodoro').reduce((a,l) => a + l.duration, 0);
    const weekMin    = logs.filter(l => l.date >= weekAgo).reduce((a,l) => a + l.duration, 0);
    const monMin     = logs.filter(l => l.date >= monAgo).reduce((a,l)  => a + l.duration, 0);
    const focusPct   = todayMin > 0 ? Math.round(todayFocus / todayMin * 100) : 0;

    const cards = [
      { label: UI.t('time_today_kpi'), value: UI.fmtMinutesHM(todayMin), change: focusPct > 0 ? UI.t('time_focus_pct', focusPct) : UI.t('time_total_dur'), changeUp: true, icon: 'sun',         iconColor: '#FBBF24' },
      { label: UI.t('time_week_kpi'),  value: UI.fmtMinutesHM(weekMin),  change: UI.t('time_last7'),  changeUp: true, icon: 'calendar',    iconColor: '#60A5FA' },
      { label: UI.t('time_month_kpi'), value: UI.fmtMinutesHM(monMin),   change: UI.t('time_last30'), changeUp: true, icon: 'bar-chart-2', iconColor: '#7C6CFC' },
    ];
    const grid = document.getElementById('kpi-grid');
    grid.innerHTML = cards.map(c => UI.kpiCard(c)).join('');
    grid.className = 'kpi-grid kpi-grid-3';
    lucide.createIcons({ nodes:[grid] });
  },

  renderThirtyDayBar() {
    const _ld = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const logs     = Store.getTime().logs;
    const today    = new Date();
    const todayStr = UI.today();
    const labels = [], data = [], ptColors = [], ptRadius = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const ds = _ld(d);
      const mins = logs.filter(l => l.date === ds).reduce((a,l) => a + l.duration, 0);
      labels.push(d.getDate());
      data.push(mins);
      const isToday = ds === todayStr;
      ptColors.push(isToday ? _cv('--green') : _cv('--accent'));
      ptRadius.push(isToday ? 5 : 3);
    }
    const ms = UI.t('mins_suffix'), hs = UI.t('hours_suffix');
    Charts.line('thirtyDayChart', labels, [
      { label: UI.t('time_duration_label'), data, color: _cv('--accent'), pointColors: ptColors, pointRadius: ptRadius }
    ], {
      solidFill: true,
      yFmt: v => { const m = Math.round(v); return m < 60 ? (m ? m + ms : '0') : parseFloat((m/60).toFixed(1)) + hs; },
      tip:  c => ` ${UI.fmtMinutesHM(c.parsed.y)}`
    });
  },

  renderDailyBar() {
    const _ld = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const logs      = Store.getTime().logs;
    const dayLabels = [UI.t('day_mon'), UI.t('day_tue'), UI.t('day_wed'), UI.t('day_thu'), UI.t('day_fri'), UI.t('day_sat'), UI.t('day_sun')];
    const today     = new Date();
    const todayStr  = UI.today();
    const labels = [], data = [], ptColors = [], ptRadius = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today); d.setDate(today.getDate() - i);
      const ds = _ld(d);
      const mins = logs.filter(l => l.date === ds).reduce((a,l) => a + l.duration, 0);
      labels.push(dayLabels[(d.getDay()+6)%7]);
      data.push(mins);
      const isToday = ds === todayStr;
      ptColors.push(isToday ? _cv('--green') : _cv('--accent-alt'));
      ptRadius.push(isToday ? 5 : 3);
    }
    const ms = UI.t('mins_suffix'), hs = UI.t('hours_suffix');
    Charts.line('dailyBarChart', labels, [
      { label: UI.t('time_duration_label'), data, color: _cv('--accent-alt'), pointColors: ptColors, pointRadius: ptRadius }
    ], {
      solidFill: true,
      yFmt: v => { const m = Math.round(v); return m < 60 ? (m ? m + ms : '0') : parseFloat((m/60).toFixed(1)) + hs; },
      tip:  c => ` ${UI.fmtMinutesHM(c.parsed.y)}`
    });
  },

  renderTable() {
    const logs  = this._filteredLogs();
    const tbody = document.getElementById('logBody');
    if (!logs.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted)">${UI.t('time_no_logs')}</td></tr>`;
      return;
    }
    const sourceBadge = l => l.source === 'pomodoro'
      ? `<span style="font-size:0.5625rem;font-weight:700;padding:0.125rem 0.375rem;border-radius:0.25rem;background:var(--accent-glow);color:var(--accent);margin-left:0.3125rem;vertical-align:middle;white-space:nowrap">${UI.t('time_auto_end')}</span>`
      : '';
    tbody.innerHTML = logs.map(l => `
      <tr style="${l.source === 'pomodoro' ? 'opacity:.92' : ''}">
        <td class="mono">${UI.formatDate(l.date)}</td>
        <td>${UI.catBadge(l.category)}${sourceBadge(l)}</td>
        <td>${UI.esc(l.project)}</td>
        <td class="mono">${l.start} → ${l.end}</td>
        <td class="mono" style="color:var(--accent);font-weight:600">${UI.fmtMinutes(l.duration)}</td>
        <td style="text-align:right;padding-right:1rem">
          <div style="display:inline-flex;gap:6px">
            <button class="btn btn-icon btn-secondary" onclick="TimePage.edit('${l.id}')"><svg data-lucide="pencil"></svg></button>
            <button class="btn btn-icon btn-danger" onclick="TimePage.delete('${l.id}')"><svg data-lucide="trash-2"></svg></button>
          </div>
        </td>
      </tr>`).join('');
    lucide.createIcons({ nodes:[tbody] });
  },

  openHistory() {
    this._histOffset = 0;
    this._histTab = 'summary';
    this._histModal = new CustomModal({
      title:    UI.t('time_history_modal'),
      subtitle: UI.t('time_hist_subtitle'),
      icon:     'calendar-range',
      width:    720,
      content:  this._historyModalHTML(),
      buttons:  [],
    });
    this._histModal.open();
    const header = this._histModal._overlay?.querySelector('.cm-header');
    if (header) {
      const closeBtn = header.querySelector('[data-cm-close]');
      const sw = document.createElement('div');
      sw.id = 'hist-tab-switcher';
      sw.style.cssText = 'display:flex;background:var(--bg-elevated);border-radius:var(--radius-sm);padding:3px;gap:2px;border:1px solid var(--border);margin-right:8px;flex-shrink:0';
      sw.innerHTML = `
        <button class="hist-tab-btn" data-tab="summary" onclick="TimePage.switchHistTab('summary')"
          style="padding:4px 14px;border:none;border-radius:calc(var(--radius-sm) - 2px);font-size:0.6875rem;font-weight:600;cursor:pointer;transition:background .15s,color .15s;background:var(--accent);color:var(--accent-contrast,#fff);white-space:nowrap">
          ${UI.t('time_hist_tab_summary')}
        </button>
        <button class="hist-tab-btn" data-tab="logs" onclick="TimePage.switchHistTab('logs')"
          style="padding:4px 14px;border:none;border-radius:calc(var(--radius-sm) - 2px);font-size:0.6875rem;font-weight:600;cursor:pointer;transition:background .15s,color .15s;background:transparent;color:var(--text-muted);white-space:nowrap">
          ${UI.t('time_hist_tab_logs')}
        </button>`;
      header.insertBefore(sw, closeBtn);
    }
    requestAnimationFrame(() => this._renderHistoryModal());
  },

  switchHistTab(tab) {
    this._histTab = tab;
    document.querySelectorAll('.hist-tab-btn').forEach(b => {
      const active = b.dataset.tab === tab;
      b.style.background = active ? 'var(--accent)' : 'transparent';
      b.style.color      = active ? 'var(--accent-contrast,#fff)' : 'var(--text-muted)';
    });
    this._renderHistTabContent();
  },

  prevHistoryMonth() { this._histOffset--; this._renderHistoryModal(); },
  nextHistoryMonth() { this._histOffset = Math.min(0, this._histOffset + 1); this._renderHistoryModal(); },

  _renderHistoryModal() {
    const logs = Store.getTime().logs;
    const ref  = new Date(); ref.setDate(1); ref.setMonth(ref.getMonth() + this._histOffset);
    const year = ref.getFullYear();
    const mon  = ref.getMonth();
    const days = new Date(year, mon + 1, 0).getDate();
    const today = UI.today();

    const lang = UI.getLang();
    const MONTHS = lang === 'en' ? UI.MONTHS_LONG_EN : lang === 'zh' ? UI.MONTHS_LONG_ZH
                 : lang === 'es' ? UI.MONTHS_LONG_ES : lang === 'fr' ? UI.MONTHS_LONG_FR : UI.MONTHS_LONG;
    const MONTHS_SHORT = lang === 'en' ? UI.MONTHS_SHORT_EN : lang === 'zh' ? UI.MONTHS_SHORT_ZH
                       : lang === 'es' ? UI.MONTHS_SHORT_ES : lang === 'fr' ? UI.MONTHS_SHORT_FR : UI.MONTHS_SHORT;

    document.getElementById('hist-month-label').textContent = `${MONTHS[mon]} ${year}`;
    document.getElementById('hist-next-btn').disabled = this._histOffset >= 0;

    const yearMon = `${year}-${String(mon+1).padStart(2,'0')}`;
    const dayData = [];
    for (let d = 1; d <= days; d++) {
      const ds = `${yearMon}-${String(d).padStart(2,'0')}`;
      const dayLogs = logs.filter(l => l.date === ds);
      dayData.push({ d, ds, mins: dayLogs.reduce((a,l) => a + l.duration, 0), logs: dayLogs });
    }

    const totalMins = dayData.reduce((a,b) => a + b.mins, 0);
    document.getElementById('hist-total').textContent = UI.fmtMinutesHM(totalMins);

    this._histCtx = { logs, dayData, totalMins, year, mon, days, today, yearMon, MONTHS, MONTHS_SHORT };
    this._renderHistStats();
    this._renderHistTabContent();
  },

  _renderHistStats() {
    const { dayData, totalMins, logs, yearMon } = this._histCtx;
    const activeDays = dayData.filter(d => d.mins > 0).length;
    const dailyAvg   = activeDays > 0 ? Math.round(totalMins / activeDays) : 0;

    const catTotals = {};
    logs.filter(l => l.date.startsWith(yearMon)).forEach(l => {
      catTotals[l.category] = (catTotals[l.category] || 0) + l.duration;
    });
    const topCat = Object.entries(catTotals).sort((a,b) => b[1]-a[1])[0];

    const chip = (label, value) =>
      `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:6px 14px;flex:1;min-width:70px">
        <span style="font-size:0.625rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--text-muted)">${label}</span>
        <span style="font-size:0.875rem;font-weight:700;font-family:var(--font-mono);color:var(--text-primary)">${value}</span>
      </div>`;

    const el = document.getElementById('hist-stats-row');
    if (!el) return;
    el.innerHTML = [
      chip(UI.t('time_hist_active_days'), activeDays),
      chip(UI.t('time_hist_daily_avg'), UI.fmtMinutesHM(dailyAvg)),
      topCat ? chip(UI.t('time_hist_top_cat'), UI.esc(topCat[0])) : '',
    ].join('');
  },

  _renderHistTabContent() {
    if (this._histTab === 'summary') this._renderHistSummary();
    else                              this._renderHistLogs();
  },

  _renderHistSummary() {
    const { dayData, totalMins, mon, today, MONTHS_SHORT, days } = this._histCtx;
    const el = document.getElementById('hist-tab-content');
    if (!el) return;

    el.innerHTML = `
      <div class="chart-container" style="height:180px;margin-bottom:1.25rem">
        <canvas id="histMonthChart"></canvas>
      </div>
      <div style="font-size:0.6875rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.375rem">${UI.t('time_panel_weekly')}</div>
      <div id="hist-weekly"></div>`;

    const labels   = dayData.map(d => d.d);
    const data     = dayData.map(d => d.mins);
    const colors   = dayData.map(d => d.ds === today ? _cv('--green') : _cv('--accent'));
    const green    = _cv('--green');
    const ms = UI.t('mins_suffix'), hs = UI.t('hours_suffix');
    Charts.line('histMonthChart', labels, [
      { label: UI.t('time_duration_label'), data, pointColors: colors, pointRadius: colors.map(c => c === green ? 5 : 3) }
    ], {
      solidFill: true,
      yFmt: v => { const m = Math.round(v); return m < 60 ? (m ? m + ms : '0') : parseFloat((m/60).toFixed(1)) + hs; },
      tip:  c => ` ${UI.fmtMinutesHM(c.parsed.y)}`
    });

    const weeks = [];
    let wk = null;
    for (let i = 0; i < days; i++) {
      const { d, mins } = dayData[i];
      const dow = (new Date(this._histCtx.year, mon, d).getDay() + 6) % 7;
      if (dow === 0 || !wk) wk = { start: d, end: d, mins: 0 };
      wk.mins += mins;
      wk.end = d;
      if (dow === 6 || i === days - 1) { weeks.push({ ...wk }); wk = null; }
    }

    document.getElementById('hist-weekly').innerHTML = weeks.map(w => {
      const pct = totalMins > 0 ? Math.round(w.mins / totalMins * 100) : 0;
      return `
        <div style="display:flex;align-items:center;gap:14px;padding:0.5625rem 0;border-top:1px solid var(--border)">
          <span style="font-size:0.6875rem;color:var(--text-muted);font-family:var(--font-mono);min-width:6.5rem">${w.start} ${MONTHS_SHORT[mon]} — ${w.end} ${MONTHS_SHORT[mon]}</span>
          <div style="flex:1;height:0.3125rem;border-radius:0.1875rem;background:var(--bg-elevated);overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${w.mins > 0 ? 'var(--accent)' : 'transparent'};border-radius:0.1875rem"></div>
          </div>
          <span style="font-size:0.8125rem;font-weight:600;font-family:var(--font-mono);color:${w.mins > 0 ? 'var(--text-primary)' : 'var(--text-muted)'};min-width:3.75rem;text-align:right">${UI.fmtMinutesHM(w.mins)}</span>
        </div>`;
    }).join('');
  },

  _renderHistLogs() {
    const { dayData, mon, MONTHS_SHORT } = this._histCtx;
    const el = document.getElementById('hist-tab-content');
    if (!el) return;

    const activeDays = [...dayData].reverse().filter(d => d.logs.length > 0);
    if (!activeDays.length) {
      el.innerHTML = `<div style="text-align:center;padding:2.5rem;color:var(--text-muted);font-size:0.875rem">${UI.t('time_no_logs')}</div>`;
      return;
    }

    el.innerHTML = activeDays.map(({ d, logs: dayLogs }) => {
      const dayTotal = dayLogs.reduce((a,l) => a + l.duration, 0);
      const logsHtml = dayLogs.map(l => `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-top:1px solid var(--border)">
          <div style="flex-shrink:0">${UI.catBadge(l.category)}</div>
          <span style="flex:1;font-size:0.8125rem;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${UI.esc(l.project || l.category)}</span>
          <span style="font-size:0.6875rem;font-family:var(--font-mono);color:var(--text-muted);white-space:nowrap;width:8.5rem;flex-shrink:0">${l.start || '--:--'} → ${l.end || '--:--'}</span>
          <span style="font-size:0.8125rem;font-weight:600;font-family:var(--font-mono);color:var(--accent);width:5.5rem;flex-shrink:0">${UI.fmtMinutes(l.duration)}</span>
          <div style="display:flex;gap:4px;flex-shrink:0">
            <button class="btn btn-icon btn-secondary" style="width:26px;height:26px" onclick="TimePage.edit('${l.id}')"><svg data-lucide="pencil" style="width:0.75rem;height:0.75rem"></svg></button>
            <button class="btn btn-icon btn-danger" style="width:26px;height:26px" onclick="TimePage.delete('${l.id}')"><svg data-lucide="trash-2" style="width:0.75rem;height:0.75rem"></svg></button>
          </div>
        </div>`).join('');
      return `
        <div style="margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0 6px">
            <span style="font-size:0.75rem;font-weight:700;color:var(--text-primary);font-family:var(--font-mono)">${d} ${MONTHS_SHORT[mon]}</span>
            <span style="font-size:0.75rem;font-weight:600;font-family:var(--font-mono);color:var(--text-secondary)">${UI.fmtMinutesHM(dayTotal)}</span>
          </div>
          ${logsHtml}
        </div>`;
    }).join('');
    lucide.createIcons({ nodes: [el] });
  },

  save() {
    const f = document.getElementById('addLogForm');
    const start = f.logStart.value, end = f.logEnd.value;
    if (!start || !end) { UI.toast(UI.t('time_invalid_range'),'error'); return; }
    const [sh,sm] = start.split(':').map(Number);
    const [eh,em] = end.split(':').map(Number);
    let duration = (eh*60+em) - (sh*60+sm);
    if (duration < 0) duration += 24 * 60; // gece yarısı geçen loglar
    if (duration === 0) { UI.toast(UI.t('time_invalid_range'),'error'); return; }
    const taskId = document.getElementById('logProjectTaskId')?.value || null;
    const data = { date:f.logDate.value, category:f.logCat.value, project:f.logProject.value.trim()||f.logCat.value, start, end, duration };
    if (taskId) data.taskId = taskId;
    if (this._editingId) {
      Store.updateTimeLog(this._editingId, data);
      if (taskId) Store.syncTaskProgress(taskId);
      this._editingId = null;
      this._addLogModal?.close();
      UI.toast(UI.t('time_log_updated'),'success');
    } else {
      if (Store.get('time_seeded')) { Store.setTime({ logs: [] }); Store.set('time_seeded', null); }
      Store.addTimeLog(data);
      if (taskId) Store.syncTaskProgress(taskId);
      this._addLogModal?.close();
      UI.toast(UI.t('time_log_added'),'success');
    }
    requestAnimationFrame(() => this.render());
  },

  _syncDeletedLog(log) {
    if (!log) return;
    if (log.taskId) {
      Store.syncTaskProgress(log.taskId);
    } else if (log.source === 'pomodoro' && log.project) {
      const todos = (Store.get('habits_todos') || { items: [] }).items;
      const task  = todos.find(t => t.text === log.project && t.pomodoros);
      if (task) Store.syncTaskProgress(task.id);
    }
  },

  delete(id) {
    const skip = Store.get('time_del_skip');
    if (skip === UI.today()) {
      const log = Store.getTime().logs.find(l => l.id === id);
      Store.deleteTimeLog(id);
      this._syncDeletedLog(log);
      UI.toast(UI.t('time_log_deleted'), 'info');
      this.render();
      return;
    }
    this._pendingDeleteId = id;
    this._deleteModal = new CustomModal({
      title:   UI.t('btn_delete'),
      icon:    'trash-2',
      variant: 'danger',
      width:   400,
      content: `<p style="color:var(--text-secondary);font-size:0.875rem;line-height:1.6;margin:0 0 1.125rem">${UI.t('time_del_confirm_msg')}</p>
        <div id="timeDel-skip-row" style="display:flex;align-items:center;gap:0.625rem;cursor:pointer;user-select:none">
          ${CheckboxCore.html({ done: false, type: 'sm', color: 'var(--red)', extraClass: 'cbx-bordered' })}
          <span style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.4;flex:1">${UI.t('time_del_no_today')}</span>
        </div>`,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: () => this._cancelDelete() },
        { label: UI.t('btn_delete'), variant: 'danger',    onClick: () => this._confirmDelete() },
      ],
    });
    this._deleteModal.open();
    const _tdRow = document.getElementById('timeDel-skip-row');
    if (_tdRow) _tdRow.addEventListener('click', () => { CheckboxCore.toggle(_tdRow.querySelector('.cbx')); });
  },

  _confirmDelete() {
    const _tdSkipRow = document.getElementById('timeDel-skip-row');
    if (_tdSkipRow && CheckboxCore.isChecked(_tdSkipRow.querySelector('.cbx'))) {
      Store.set('time_del_skip', UI.today());
    }
    this._deleteModal?.close();
    if (!this._pendingDeleteId) return;
    const log = Store.getTime().logs.find(l => l.id === this._pendingDeleteId);
    Store.deleteTimeLog(this._pendingDeleteId);
    this._syncDeletedLog(log);
    this._pendingDeleteId = null;
    UI.toast(UI.t('time_log_deleted'), 'info');
    this.render();
  },

  _cancelDelete() {
    this._pendingDeleteId = null;
    this._deleteModal?.close();
  },

  triggerImport() {
    const input = document.getElementById('lt-time-import-file');
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
        const isKey = k => k.startsWith('lt_time') || k === 'lt_panels_time';
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
