const Goals = {
  _defaultColor: '#7C6CFC',
  _colors: ['#7C6CFC','#A78BFA','#60A5FA','#2DD4BF','#34D399','#FBBF24','#FB923C','#F87171','#F472B6','#E879F9'],

  // paylaşımlı modal state (aynı anda tek modal açık olduğundan güvenli)
  _modalMilestones: [],
  _currentGoalColor: '#7C6CFC',
  _editMode: false,
  _addDateCdp: null,
  _editDateCdp: null,
  _addGoalModal: null,
  _editGoalModal: null,

  // inline checkmark SVG
  _checkSvg: `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  _CATS: [
    { value: 'Kariyer',  key: 'goals_cat_kariyer'  },
    { value: 'Seyahat',  key: 'goals_cat_seyahat'  },
    { value: 'Sağlık',   key: 'goals_cat_saglik'   },
    { value: 'Eğitim',   key: 'goals_cat_egitim'   },
    { value: 'Kişisel',  key: 'goals_cat_kisisel'  },
    { value: 'Finansal', key: 'goals_cat_finansal' },
  ],

  toggleGoalDate(type) {
    (type === 'add' ? this._addDateCdp : this._editDateCdp).toggle();
  },

  openCatDropdown(btn, formId) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = document.getElementById(formId)?.goalCat?.value || 'Kariyer';
          dd.setItems(this._CATS.map(c => ({
            value: c.value, label: UI.t(c.key), active: c.value === cur,
          })));
        },
        onSelect: (val) => {
          const f = document.getElementById(formId);
          if (f) f.goalCat.value = val;
          this._setCatBtn(btn.id, val);
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _setCatBtn(btnId, value) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const cat = this._CATS.find(c => c.value === value);
    btn.querySelector('.dd-label').textContent = cat ? UI.t(cat.key) : value;
  },

  init() {
    UI.initTopbar({ noPrivacy: true });
    UI.initEsc();
    this.render();

    document.getElementById('addGoalBtn').addEventListener('click', () => this.openAddGoalModal());
    document.addEventListener('lt:language-change', () => this.render());
    document.addEventListener('lt:theme-change',    () => this.render());
  },

  _goalFormHTML(mode) {
    const isEdit = mode === 'edit';
    return `
      <form id="${mode}GoalForm" style="display:flex;flex-direction:column;gap:1rem">
        ${isEdit ? `<input type="hidden" name="goalId">` : ''}
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="grid-column:1/-1;margin-bottom:0">
            <label class="form-label">${UI.t('lbl_title')}</label>
            <input class="form-control" type="text" name="goalTitle" placeholder="${UI.t('goals_title_placeholder')}">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('lbl_desc')}</label>
          <textarea class="form-control" name="goalDesc" rows="2" placeholder="${UI.t('goals_desc_placeholder')}" style="resize:vertical"></textarea>
        </div>
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('goals_category')}</label>
            <button type="button" id="${mode}GoalCatBtn" onclick="Goals.openCatDropdown(this, '${mode}GoalForm')"
              style="width:100%;display:flex;align-items:center;gap:0.5rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
              <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.t('goals_cat_kariyer')}</span>
              <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
            </button>
            <input type="hidden" name="goalCat" value="Kariyer">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('goals_emoji')}</label>
            <input class="form-control" type="text" name="goalEmoji" placeholder="🎯" maxlength="2">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('goals_target_date')}</label>
          <button type="button" id="${mode}GoalDateBtn" onclick="Goals.toggleGoalDate('${mode}')"
            style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
            <span id="${mode}GoalDateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
          </button>
          <input type="hidden" name="goalDate" id="${mode}GoalDateInput" value="">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('goals_color')}</label>
          <div id="${mode}-color-picker" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:2px"></div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('goals_milestones')}</label>
          <div id="${mode}-ms-list" style="margin-bottom:0.5rem"></div>
          <div style="display:flex;gap:0.375rem">
            <input type="text" id="${mode}-ms-input" class="form-control" placeholder="${UI.t('goals_ms_placeholder')}"
              style="font-size:0.8125rem"
              onkeydown="if(event.key==='Enter'){event.preventDefault();Goals._modalAddMs('${mode}-ms-input');}">
            <button type="button" class="btn btn-secondary" style="flex-shrink:0;padding:0 0.875rem"
              onclick="Goals._modalAddMs('${mode}-ms-input')">
              <svg data-lucide="plus"></svg>
            </button>
          </div>
        </div>
      </form>
    `;
  },

  openAddGoalModal() {
    this._modalMilestones = [];
    this._currentGoalColor = this._defaultColor;

    this._addGoalModal = new CustomModal({
      title:        UI.t('goals_new_modal'),
      content:      this._goalFormHTML('add'),
      width:        540,
      zIndex:       1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => this.save() },
      ],
    });
    this._addGoalModal.open();

    this._addDateCdp = new CustomDatePicker({
      btn: 'addGoalDateBtn', input: 'addGoalDateInput',
      align: 'left', clearable: true,
      onSelect: date => { document.getElementById('addGoalDateLabel').textContent = UI.formatDate(date); },
      onClear:  ()   => { document.getElementById('addGoalDateLabel').textContent = ''; },
    });

    this._setCatBtn('addGoalCatBtn', 'Kariyer');
    this._renderColorPicker('add-color-picker');
    this._renderModalMs('add-ms-list');
    lucide.createIcons({ nodes: [this._addGoalModal.getBody()] });
    document.getElementById('addGoalForm').addEventListener('submit', e => { e.preventDefault(); this.save(); });
  },

  render() {
    this.renderCards();
    if (this._editMode) this._initDragEvents();
  },

  toggleEditMode() {
    this._editMode = !this._editMode;
    const btn = document.getElementById('goalLockBtn');
    if (btn) {
      btn.className = `btn btn-icon ${this._editMode ? 'btn-primary' : 'btn-secondary'}`;
      btn.dataset.tooltip = UI.t(this._editMode ? 'goals_reorder_close' : 'goals_reorder');
      btn.innerHTML = `<svg data-lucide="${this._editMode ? 'lock-open' : 'lock'}"></svg>`;
      lucide.createIcons({ nodes: [btn] });
    }
    this.render();
  },

  _initDragEvents() {
    const cards = [...document.querySelectorAll('#goals-grid [data-goal-id]')];
    let dragSrcId = null;

    cards.forEach(card => {
      card.addEventListener('dragstart', e => {
        // buton ya da input üzerinden başlayan drag'leri iptal et
        if (e.target.closest('button, input, textarea, select')) { e.preventDefault(); return; }
        dragSrcId = card.dataset.goalId;
        e.dataTransfer.setData('text/plain', dragSrcId);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => card.classList.add('goal-card-dragging'), 0);
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('goal-card-dragging');
        cards.forEach(c => c.classList.remove('goal-card-drag-over'));
      });

      card.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (card.dataset.goalId !== dragSrcId) {
          cards.forEach(c => c.classList.remove('goal-card-drag-over'));
          card.classList.add('goal-card-drag-over');
        }
      });

      card.addEventListener('dragleave', e => {
        if (!card.contains(e.relatedTarget)) card.classList.remove('goal-card-drag-over');
      });

      card.addEventListener('drop', e => {
        e.preventDefault();
        card.classList.remove('goal-card-drag-over');
        const targetId = card.dataset.goalId;
        if (!dragSrcId || dragSrcId === targetId) return;
        const data = Store.getGoals();
        const si   = data.items.findIndex(g => g.id === dragSrcId);
        const di   = data.items.findIndex(g => g.id === targetId);
        if (si !== -1 && di !== -1) {
          const [moved] = data.items.splice(si, 1);
          data.items.splice(di, 0, moved);
          Store.setGoals(data);
          this.render();
        }
      });
    });
  },

  // ── renk seçici ───────────────────────────────────────────

  _renderColorPicker(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = this._colors.map(c => {
      const active = c === this._currentGoalColor;
      const activeShadow = `0 0 0 2px var(--bg-surface),0 0 0 4px ${c}`;
      const hoverShadow  = `0 0 0 2px var(--bg-surface),0 0 0 4px ${c}`;
      return `<div onclick="Goals._setModalColor('${c}','${containerId}')"
        onmouseover="this.style.boxShadow='${hoverShadow}'"
        onmouseout="this.style.boxShadow='${active ? activeShadow : 'none'}'"
        style="width:1.625rem;height:1.625rem;border-radius:50%;background:${c};cursor:pointer;flex-shrink:0;
               box-shadow:${active ? activeShadow : 'none'};
               transition:box-shadow 150ms ease-out"></div>`;
    }).join('');
  },

  _setModalColor(color, pickerId) {
    this._currentGoalColor = color;
    this._renderColorPicker(pickerId);
    const listId = pickerId === 'add-color-picker' ? 'add-ms-list' : 'edit-ms-list';
    this._renderModalMs(listId);
  },

  // ── milestone yardımcıları ─────────────────────────────────

  _normMs(ms) {
    return (ms || []).map(m =>
      typeof m === 'string'
        ? { id: Store._id(), text: m.replace(/^[✓◦]\s*/, '').trim(), done: m.includes('✓') }
        : m
    );
  },

  _calcProgress(ms) {
    if (!ms.length) return 0;
    return Math.round(ms.filter(m => m.done).length / ms.length * 100);
  },

  _customCb(done, color) {
    return CheckboxCore.html({ done, type: 'square', color });
  },

  _renderModalMs(listId) {
    const el = document.getElementById(listId);
    if (!el) return;
    const col = this._currentGoalColor;
    if (!this._modalMilestones.length) {
      el.innerHTML = `<p style="font-size:0.75rem;color:var(--text-muted);padding:2px 0 0.375rem">${UI.t('goals_ms_empty_modal')}</p>`;
      return;
    }
    el.innerHTML = this._modalMilestones.map((m, i) => {
      const border = i < this._modalMilestones.length - 1 ? 'border-bottom:1px solid var(--border)' : '';
      return `<div class="ms-drag-row" draggable="true" data-ms-idx="${i}"
        style="display:flex;align-items:center;gap:0.5rem;padding:7px 0;${border}">
        <span data-ms-drag-handle data-tooltip="Sürükle"
          style="cursor:grab;color:var(--text-muted);flex-shrink:0;display:flex;align-items:center;touch-action:none">
          <svg data-lucide="grip-vertical" style="width:0.875rem;height:0.875rem;pointer-events:none"></svg>
        </span>
        <span onclick="Goals._modalToggleMs('${m.id}','${listId}')">${this._customCb(m.done, col)}</span>
        <input type="text" value="${m.text.replace(/"/g, '&quot;')}"
          class="form-control"
          style="font-size:0.8125rem;padding:3px 0.5rem;height:1.75rem;flex:1;${m.done ? 'color:var(--text-muted);text-decoration:line-through' : ''}"
          oninput="Goals._modalEditMs('${m.id}',this.value)"
          onkeydown="if(event.key==='Enter')event.preventDefault()">
        <button type="button" class="btn btn-icon btn-danger"
          style="width:1.625rem;height:1.625rem;min-width:unset;padding:0;flex-shrink:0"
          onclick="Goals._modalDeleteMs('${m.id}','${listId}')">
          <svg data-lucide="trash-2" style="width:0.75rem;height:0.75rem"></svg>
        </button>
      </div>`;
    }).join('');
    lucide.createIcons({ nodes: [el] });
    this._initMsDrag(el, listId);
  },

  _initMsDrag(container, listId) {
    let dragSrc = null;
    container.querySelectorAll('.ms-drag-row').forEach(row => {
      row.addEventListener('dragstart', e => {
        if (!e.target.closest('[data-ms-drag-handle]')) { e.preventDefault(); return; }
        dragSrc = +row.dataset.msIdx;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => { row.style.opacity = '0.35'; }, 0);
      });
      row.addEventListener('dragend', () => {
        row.style.opacity = '';
        container.querySelectorAll('.ms-drag-row').forEach(r => r.classList.remove('ms-doh-top', 'ms-doh-bot'));
      });
      row.addEventListener('dragover', e => {
        e.preventDefault();
        container.querySelectorAll('.ms-drag-row').forEach(r => r.classList.remove('ms-doh-top', 'ms-doh-bot'));
        const mid = row.getBoundingClientRect().top + row.offsetHeight / 2;
        row.classList.add(e.clientY < mid ? 'ms-doh-top' : 'ms-doh-bot');
      });
      row.addEventListener('drop', e => {
        e.preventDefault();
        if (dragSrc === null) return;
        const dropIdx = +row.dataset.msIdx;
        if (dragSrc === dropIdx) return;
        const mid = row.getBoundingClientRect().top + row.offsetHeight / 2;
        const after = e.clientY >= mid;
        const ms = [...this._modalMilestones];
        const [item] = ms.splice(dragSrc, 1);
        let target = dropIdx > dragSrc ? dropIdx - 1 : dropIdx;
        if (after) target++;
        ms.splice(Math.max(0, Math.min(ms.length, target)), 0, item);
        this._modalMilestones = ms;
        this._renderModalMs(listId);
      });
    });
  },

  _modalAddMs(inputId) {
    const inp  = document.getElementById(inputId);
    const text = (inp ? inp.value : '').trim();
    if (!text) return;
    this._modalMilestones.push({ id: Store._id(), text, done: false });
    const listId = inputId === 'add-ms-input' ? 'add-ms-list' : 'edit-ms-list';
    this._renderModalMs(listId);
    if (inp) { inp.value = ''; inp.focus(); }
  },

  _modalDeleteMs(id, listId) {
    DeleteManager.confirm({
      module:       'goals',
      title:        UI.t('btn_delete'),
      message:      UI.t('goals_ms_confirm_del'),
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        this._modalMilestones = this._modalMilestones.filter(m => m.id !== id);
        this._renderModalMs(listId);
      },
    });
  },

  _modalToggleMs(id, listId) {
    const m = this._modalMilestones.find(m => m.id === id);
    if (m) m.done = !m.done;
    this._renderModalMs(listId);
  },

  _modalEditMs(id, text) {
    const m = this._modalMilestones.find(m => m.id === id);
    if (m) m.text = text;
  },

  _catKeys: {
    'Kariyer': 'goals_cat_kariyer',
    'Seyahat': 'goals_cat_seyahat',
    'Sağlık':  'goals_cat_saglik',
    'Eğitim':  'goals_cat_egitim',
    'Kişisel': 'goals_cat_kisisel',
    'Finansal':'goals_cat_finansal',
  },

  _esc(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  },

  // ── kart render ───────────────────────────────────────────

  renderCards() {
    const items = Store.getGoals().items;
    const container = document.getElementById('goals-grid');
    if (!items.length) {
      container.innerHTML = `<div style="grid-column:1/-1"><div class="panel"><div class="panel-body">${UI.emptyState(UI.t('goals_none_dreams'),'star')}</div></div></div>`;
      lucide.createIcons({ nodes: [container] });
      return;
    }

    container.innerHTML = items.map(g => {
      const col      = g.color || this._defaultColor;
      const ms       = this._normMs(g.milestones);
      const progress = this._calcProgress(ms);
      const daysLeft = g.targetDate ? Math.ceil((new Date(g.targetDate) - new Date()) / 86400000) : null;
      const daysLabel = daysLeft !== null
        ? (daysLeft > 0 ? UI.t('goals_days_left', daysLeft) : UI.t('goals_days_overdue', Math.abs(daysLeft)))
        : null;

      const checkboxRows = ms.length
        ? ms.map(m => `
          <div onclick="event.stopPropagation();Goals.toggleMilestone('${g.id}','${m.id}')"
            style="display:flex;align-items:center;gap:0.625rem;padding:0.375rem 0;border-bottom:1px solid var(--border);cursor:pointer">
            ${this._customCb(m.done, col)}
            <span style="font-size:0.8125rem;flex:1;user-select:none;
              color:${m.done ? 'var(--text-muted)' : 'var(--text-secondary)'};
              ${m.done ? 'text-decoration:line-through' : ''}">${m.text}</span>
          </div>`).join('')
        : `<p style="font-size:0.75rem;color:var(--text-muted);padding:0.25rem 0;font-style:italic">${UI.t('goals_ms_empty_card')}</p>`;

      const dragClass = this._editMode ? ' goal-card-drag-enabled' : '';
      const dragAttr  = this._editMode ? 'draggable="true"' : '';
      const gripHandle = this._editMode
        ? `<div style="display:flex;justify-content:center;align-items:center;margin:-2px 0 6px;color:var(--text-muted);pointer-events:none">
            <svg data-lucide="grip-horizontal" style="width:1rem;height:1rem"></svg>
           </div>`
        : '';

      return `<div class="goal-card${dragClass}" ${dragAttr} data-goal-id="${g.id}" style="border-left:3px solid ${col};--goal-color:${col}">
        ${gripHandle}
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span class="goal-emoji">${g.emoji || '🎯'}</span>
          <div style="display:flex;align-items:center;gap:0.375rem">
            <span class="badge" style="background:${col}22;color:${col};border-color:${col}44">${UI.t(this._catKeys[g.category] || g.category)}</span>
            <button class="btn btn-icon btn-secondary" onclick="event.stopPropagation();Goals.editOpen('${g.id}')" data-tooltip="${UI.t('goals_edit_btn')}"><svg data-lucide="pencil"></svg></button>
            <button class="btn btn-icon btn-danger" onclick="event.stopPropagation();Goals.delete('${g.id}')" data-tooltip="${UI.t('goals_del_btn')}"><svg data-lucide="trash-2"></svg></button>
          </div>
        </div>
        <div>
          <div class="goal-title">${UI.esc(g.title)}</div>
          ${g.desc ? `<div class="goal-desc">${UI.esc(g.desc)}</div>` : ''}
        </div>
        <div style="padding-top:4px">${checkboxRows}</div>
        <div>
          <div class="goal-footer" style="margin-bottom:0.5rem">
            <span class="goal-pct" style="color:${col}">%${progress}</span>
            ${daysLabel !== null ? `<span style="font-family:var(--font-mono);font-size:0.75rem;color:${daysLeft !== null && daysLeft < 30 ? 'var(--red)' : 'var(--text-muted)'}">${daysLabel}</span>` : ''}
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${progress}%;background:${col}"></div>
          </div>
        </div>
      </div>`;
    }).join('');

    lucide.createIcons({ nodes: [container] });
  },

  // ── kaydet / düzenle / sil ────────────────────────────────

  save() {
    const f = document.getElementById('addGoalForm');
    const title = f.goalTitle.value.trim();
    if (!title) return;
    const ms = this._modalMilestones.filter(m => m.text.trim());
    if (Store.get('goals_seeded')) { Store.setGoals({ items: [] }); Store.set('goals_seeded', null); }
    Store.addGoal({
      title,
      desc:       f.goalDesc.value.trim(),
      category:   f.goalCat.value,
      targetDate: f.goalDate.value,
      progress:   this._calcProgress(ms),
      emoji:      f.goalEmoji.value || '🎯',
      color:      this._currentGoalColor,
      milestones: ms,
    });
    f.reset();
    document.getElementById('addGoalDateLabel').textContent = '';
    this._modalMilestones = [];
    this._currentGoalColor = this._defaultColor;
    this._addGoalModal.close();
    UI.toast(UI.t('goals_dream_added'), 'success');
    this.render();
  },

  editOpen(id) {
    const goal = Store.getGoals().items.find(g => g.id === id);
    if (!goal) return;
    this._modalMilestones  = this._normMs(goal.milestones);
    this._currentGoalColor = goal.color || this._defaultColor;

    this._editGoalModal = new CustomModal({
      title:        UI.t('goals_edit_modal'),
      content:      this._goalFormHTML('edit'),
      width:        540,
      zIndex:       1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => this.saveEdit() },
      ],
    });
    this._editGoalModal.open();

    const f = document.getElementById('editGoalForm');
    f.goalId.value    = goal.id;
    f.goalTitle.value = goal.title;
    f.goalDesc.value  = goal.desc || '';
    f.goalCat.value   = goal.category;
    this._setCatBtn('editGoalCatBtn', goal.category);
    f.goalEmoji.value = goal.emoji || '🎯';
    f.goalDate.value  = goal.targetDate || '';
    document.getElementById('editGoalDateLabel').textContent = goal.targetDate ? UI.formatDate(goal.targetDate) : '';

    this._editDateCdp = new CustomDatePicker({
      btn: 'editGoalDateBtn', input: 'editGoalDateInput',
      align: 'left', clearable: true,
      onSelect: date => { document.getElementById('editGoalDateLabel').textContent = UI.formatDate(date); },
      onClear:  ()   => { document.getElementById('editGoalDateLabel').textContent = ''; },
    });

    this._renderColorPicker('edit-color-picker');
    this._renderModalMs('edit-ms-list');
    lucide.createIcons({ nodes: [this._editGoalModal.getBody()] });
    f.addEventListener('submit', e => { e.preventDefault(); this.saveEdit(); });
  },

  saveEdit() {
    const f = document.getElementById('editGoalForm');
    const title = f.goalTitle.value.trim();
    if (!title) return;
    const ms = this._modalMilestones.filter(m => m.text.trim());
    Store.updateGoal(f.goalId.value, {
      title,
      desc:       f.goalDesc.value.trim(),
      category:   f.goalCat.value,
      emoji:      f.goalEmoji.value || '🎯',
      targetDate: f.goalDate.value,
      color:      this._currentGoalColor,
      milestones: ms,
      progress:   this._calcProgress(ms),
    });
    this._editGoalModal.close();
    UI.toast(UI.t('goals_dream_updated'), 'success');
    this.render();
  },

  toggleMilestone(goalId, milestoneId) {
    const goal = Store.getGoals().items.find(g => g.id === goalId);
    if (!goal) return;
    const ms = this._normMs(goal.milestones);
    const m  = ms.find(m => m.id === milestoneId);
    if (m) m.done = !m.done;
    const progress = this._calcProgress(ms);
    Store.updateGoal(goalId, { milestones: ms, progress });
    if (progress === 100) UI.toast(UI.t('goals_all_done'), 'success');
    this.render();
  },

  delete(id) {
    const goal = Store.getGoals().items.find(g => g.id === id);
    if (!goal) return;
    DeleteManager.confirm({
      module:       'goals',
      title:        UI.t('goals_delete_modal'),
      message:      `<span style="font-weight:600;color:var(--text-primary)">${goal.emoji || '🎯'} ${UI.esc(goal.title)}</span><br><span style="font-size:0.75rem">${UI.t('goals_delete_confirm_q')}</span>`,
      confirmLabel: UI.t('goals_delete_yes'),
      onConfirm: () => {
        Store.deleteGoal(id);
        UI.toast(UI.t('goals_dream_deleted'), 'info');
        this.render();
      },
    });
  },

  triggerImport() {
    const input = document.getElementById('lt-goals-import-file');
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
        const isKey = k => k.startsWith('lt_goals') || k === 'lt_panels_goals';
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
