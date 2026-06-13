const Plans = {
  view: 'kanban',
  _dragSubIdx: null,
  _addPlanDateCdp: null,
  _editPlanDateCdp: null,
  _addPlanModal: null,
  _editPlanModal: null,
  _editingPlanId: null,

  _PRIS: [
    { value: 'high',   key: 'plans_pri_high'   },
    { value: 'medium', key: 'plans_pri_medium' },
    { value: 'low',    key: 'plans_pri_low'    },
  ],
  _PLAN_CATS: [
    { value: 'Proje',   key: 'plans_cat_project'    },
    { value: 'Eğitim',  key: 'plans_cat_education'  },
    { value: 'Finans',  key: 'plans_cat_finance'    },
    { value: 'Yatırım', key: 'plans_cat_investment' },
    { value: 'Kişisel', key: 'plans_cat_personal'   },
    { value: 'Sağlık',  key: 'plans_cat_health'     },
    { value: 'Diğer',   key: 'plans_cat_other'      },
  ],

  openPriDropdown(btn, formId) {
    if (!btn._ddInst) {
      const hiddenId = formId === 'addPlanForm' ? 'addPlanPriHidden' : 'editPlanPriHidden';
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = document.getElementById(hiddenId)?.value || 'medium';
          dd.setItems(this._PRIS.map(p => ({ value: p.value, label: UI.t(p.key), active: p.value === cur })));
        },
        onSelect: (val) => {
          const inp = document.getElementById(hiddenId);
          if (inp) inp.value = val;
          btn.querySelector('.dd-label').textContent = UI.t(this._PRIS.find(p => p.value === val).key);
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  openCatDropdown(btn, formId) {
    if (!btn._ddInst) {
      const hiddenId = formId === 'addPlanForm' ? 'addPlanCatHidden' : 'editPlanCatHidden';
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = document.getElementById(hiddenId)?.value || 'Proje';
          dd.setItems(this._PLAN_CATS.map(c => ({ value: c.value, label: UI.t(c.key), active: c.value === cur })));
        },
        onSelect: (val) => {
          const inp = document.getElementById(hiddenId);
          if (inp) inp.value = val;
          btn.querySelector('.dd-label').textContent = UI.t(this._PLAN_CATS.find(c => c.value === val).key);
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _setPriBtn(btnId, value) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const p = this._PRIS.find(p => p.value === value);
    btn.querySelector('.dd-label').textContent = p ? UI.t(p.key) : value;
  },

  _setPlanCatBtn(btnId, value) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const c = this._PLAN_CATS.find(c => c.value === value);
    btn.querySelector('.dd-label').textContent = c ? UI.t(c.key) : value;
  },

  togglePlanDate(type) {
    (type === 'add' ? this._addPlanDateCdp : this._editPlanDateCdp).toggle();
  },

  init() {
    UI.initTopbar({ noPrivacy: true }); UI.initEsc();
    this.render();
    document.getElementById('addPlanBtn').addEventListener('click', () => this.openAddPlanModal());
    document.getElementById('toggleKanban').addEventListener('click', () => { this.view='kanban'; this.renderContent(); this.setToggle(); });
    document.getElementById('toggleList').addEventListener('click',   () => { this.view='list';   this.renderContent(); this.setToggle(); });
    document.addEventListener('lt:language-change', () => this.render());
    document.addEventListener('lt:theme-change',    () => this.render());
  },

  setToggle() {
    document.getElementById('toggleKanban').classList.toggle('active', this.view==='kanban');
    document.getElementById('toggleList').classList.toggle('active',   this.view==='list');
  },

  _planFormHTML(mode) {
    const isEdit = mode === 'edit';
    const p = isEdit ? 'edit' : 'add';
    const subtaskSection = isEdit ? `
      <div class="form-group">
        <label class="form-label">${UI.t('plans_subtasks')}</label>
        <div id="editSubTasksList" style="margin-bottom:0.5rem"></div>
        <div style="display:flex;gap:0.5rem;align-items:flex-start">
          <textarea class="form-control" id="newSubTaskInput" rows="1"
            placeholder="${UI.t('plans_subtask_placeholder')}"
            onkeydown="Plans._onSubTaskKeydown(event)"
            style="resize:none;overflow:hidden;min-height:2.625rem;line-height:1.5;flex:1"></textarea>
          <button type="button" class="btn btn-secondary" onclick="Plans.addSubTask(Plans._editingPlanId)" style="flex-shrink:0;height:2.625rem"><svg data-lucide="plus"></svg></button>
        </div>
      </div>` : '';
    return `<form id="${p}PlanForm">
      <div class="form-group">
        <label class="form-label">${UI.t('lbl_title')}</label>
        <input class="form-control" type="text" name="${isEdit ? 'editPlanTitle' : 'planTitle'}" placeholder="${UI.t('plans_title_placeholder')}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">${UI.t('lbl_priority')}</label>
          <button type="button" id="${p}PlanPriBtn" onclick="Plans.openPriDropdown(this,'${p}PlanForm')"
            style="width:100%;display:flex;align-items:center;gap:0.5rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.t('plans_pri_medium')}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="${p}PlanPriHidden" name="${isEdit ? 'editPlanPriority' : 'planPriority'}" value="medium">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('lbl_category')}</label>
          <button type="button" id="${p}PlanCatBtn" onclick="Plans.openCatDropdown(this,'${p}PlanForm')"
            style="width:100%;display:flex;align-items:center;gap:0.5rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.t('plans_cat_project')}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="${p}PlanCatHidden" name="${isEdit ? 'editPlanCat' : 'planCat'}" value="Proje">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('plans_end_date')}</label>
        <button type="button" id="${p}PlanDueBtn" onclick="Plans.togglePlanDate('${mode}')"
          style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
          <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
          <span id="${p}PlanDueLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
        </button>
        <input type="hidden" name="${isEdit ? 'editPlanDue' : 'planDue'}" id="${p}PlanDueInput" value="">
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('lbl_notes')}</label>
        <textarea class="form-control" name="${isEdit ? 'editPlanNotes' : 'planNotes'}" rows="3" placeholder="${UI.t('plans_notes_placeholder')}" style="resize:vertical"></textarea>
      </div>
      ${subtaskSection}
    </form>`;
  },

  openAddPlanModal() {
    this._addPlanModal = new CustomModal({
      title: UI.t('plans_add_modal'),
      icon: 'plus',
      content: this._planFormHTML('add'),
      width: 520,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => this.save() },
      ],
    });
    this._addPlanModal.open();
    lucide.createIcons({ nodes: [this._addPlanModal.getBody()] });
    this._addPlanDateCdp = new CustomDatePicker({
      btn: 'addPlanDueBtn', input: 'addPlanDueInput', align: 'left', clearable: true,
      onSelect: date => { document.getElementById('addPlanDueLabel').textContent = UI.formatDate(date); },
      onClear:  ()   => { document.getElementById('addPlanDueLabel').textContent = ''; },
    });
  },

  render() {
    this.renderKPIs();
    this.renderContent();
  },

  renderKPIs() {
    const items = Store.getPlans().items;
    const todo  = items.filter(p=>p.status==='todo').length;
    const prog  = items.filter(p=>p.status==='progress').length;
    const done  = items.filter(p=>p.status==='done').length;
    const cards = [
      { label: UI.t('plans_todo'),     value: String(todo), mono: false, change: UI.t('plans_kpi_pending'),                 changeUp: false, icon: 'circle',       iconColor: '#8888AA' },
      { label: UI.t('plans_progress'), value: String(prog), mono: false, change: UI.t('plans_kpi_ongoing'),                 changeUp: true,  icon: 'loader',       iconColor: '#FBBF24' },
      { label: UI.t('plans_done'),     value: String(done), mono: false, change: UI.t('plans_kpi_from_total', items.length), changeUp: true,  icon: 'check-circle', iconColor: '#34D399' },
    ];
    const grid = document.getElementById('kpi-grid');
    grid.innerHTML = cards.map(c=>UI.kpiCard(c)).join('');
    grid.className = 'kpi-grid kpi-grid-3';
    lucide.createIcons({nodes:[grid]});
  },

  renderContent() {
    const c = document.getElementById('plans-content');
    if (this.view === 'kanban') { c.innerHTML = this.kanbanHTML(); }
    else { c.innerHTML = this.listHTML(); }
    lucide.createIcons({nodes:[c]});
  },

  kanbanHTML() {
    const items = Store.getPlans().items;
    const cols = [
      { key: 'todo',     label: UI.t('status_todo'),     dotCls: 'dot-blue'   },
      { key: 'progress', label: UI.t('status_progress'), dotCls: 'dot-yellow' },
      { key: 'done',     label: UI.t('status_done'),     dotCls: 'dot-green'  },
    ];
    return `<div class="kanban-board">${cols.map(col => {
      const cards = items.filter(p=>p.status===col.key);
      return `<div class="kanban-col">
        <div class="kanban-col-header">
          <div class="kanban-col-title"><span class="dot ${col.dotCls}"></span>${col.label}</div>
          <span class="kanban-count">${cards.length}</span>
        </div>
        <div class="kanban-items">
          ${cards.length ? cards.map(p => this.kanbanCard(p)).join('') : `<div style="padding:1.25rem;color:var(--text-muted);font-size:0.8125rem;text-align:center">${UI.t('plans_no_tasks')}</div>`}
        </div>
      </div>`;
    }).join('')}</div>`;
  },

  kanbanCard(p) {
    const td = UI.today();
    const overdue = p.dueDate && p.dueDate < td && p.status !== 'done';
    const subTasks = p.subTasks || [];
    const doneCount = subTasks.filter(s => s.done).length;
    const pct = subTasks.length ? Math.round((doneCount / subTasks.length) * 100) : 0;

    const subHTML = subTasks.length ? `
      <div class="plan-sub-progress-wrap">
        <div class="plan-sub-progress-bar" style="width:${pct}%"></div>
      </div>
      <div class="plan-sub-count">${UI.t('plans_subtask_count', doneCount, subTasks.length)}</div>
      <div class="plan-sub-list">
        ${subTasks.map(st => `
          <div class="plan-sub-item${st.done ? ' plan-sub-item--done' : ''}" onclick="Plans.toggleSubTask('${p.id}','${st.id}')">
            ${CheckboxCore.html({ done: st.done, type: 'square', color: 'var(--accent)' })}
            <span class="plan-sub-label" style="white-space:pre-wrap">${UI.esc(st.title)}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    return `<div class="kanban-card">
      <div class="plan-card-header">
        <div class="kanban-card-title" style="margin-bottom:0">${UI.esc(p.title)}</div>
        <button class="btn btn-icon plan-edit-btn" onclick="Plans.openEdit('${p.id}')" data-tooltip="${UI.t('plans_edit_modal')}"><svg data-lucide="pencil" style="width:0.8125rem;height:0.8125rem"></svg></button>
      </div>
      <div class="kanban-card-meta" style="margin-top:0.5rem">
        ${UI.priorityBadge(p.priority)}
        ${UI.catBadge(p.category)}
        ${p.dueDate ? `<span style="font-family:var(--font-mono);font-size:0.6875rem;color:${overdue?'var(--red)':'var(--text-muted)'}">${UI.formatDate(p.dueDate)}</span>` : ''}
      </div>
      ${subHTML}
      <div style="display:flex;gap:0.375rem;margin-top:0.625rem">
        ${p.status!=='done'     ? `<button class="btn btn-sm btn-secondary" onclick="Plans.move('${p.id}','${p.status==='todo'?'progress':'done'}')"><svg data-lucide="${p.status==='todo'?'play':'check'}"></svg>${p.status==='todo'?UI.t('plans_start'):UI.t('plans_complete')}</button>` : ''}
        ${p.status==='progress' ? `<button class="btn btn-sm btn-secondary" onclick="Plans.move('${p.id}','todo')"><svg data-lucide="rotate-ccw"></svg></button>` : ''}
        <button class="btn btn-icon btn-danger" onclick="Plans.delete('${p.id}')"><svg data-lucide="trash-2"></svg></button>
      </div>
    </div>`;
  },

  listHTML() {
    const items = Store.getPlans().items.slice().sort((a,b)=>{
      const order = {todo:0,progress:1,done:2};
      return (order[a.status]||0)-(order[b.status]||0) || (a.dueDate||'').localeCompare(b.dueDate||'');
    });
    const td = UI.today();
    const statusMap = { todo: 'badge-blue', progress: 'badge-yellow', done: 'badge-green' };
    const statusLbl = { todo: UI.t('status_todo'), progress: UI.t('status_progress'), done: UI.t('status_done') };
    return `<div class="panel">
      <div class="table-container">
        <table class="data-table">
          <thead><tr>
            <th>${UI.t('plans_status_col')}</th>
            <th>${UI.t('plans_title_col')}</th>
            <th>${UI.t('plans_cat_col')}</th>
            <th>${UI.t('plans_priority_col')}</th>
            <th>${UI.t('plans_due_col')}</th>
            <th>${UI.t('plans_subtasks')}</th>
            <th></th>
          </tr></thead>
          <tbody>${items.map(p => {
            const overdue = p.dueDate && p.dueDate < td && p.status !== 'done';
            const subs = p.subTasks || [];
            const doneSubs = subs.filter(s=>s.done).length;
            return `<tr>
              <td><span class="badge ${statusMap[p.status]}">${statusLbl[p.status]}</span></td>
              <td style="font-weight:500">${p.title}</td>
              <td>${UI.catBadge(p.category)}</td>
              <td>${UI.priorityBadge(p.priority)}</td>
              <td class="mono" style="color:${overdue?'var(--red)':'var(--text-muted)'}">${UI.formatDate(p.dueDate)}</td>
              <td class="mono" style="font-size:0.75rem;color:var(--text-muted)">${subs.length ? UI.t('plans_subtask_count', doneSubs, subs.length) : '—'}</td>
              <td style="display:flex;gap:0.375rem;padding:0.625rem 1rem">
                ${p.status!=='done'?`<button class="btn btn-sm btn-secondary" onclick="Plans.move('${p.id}','${p.status==='todo'?'progress':'done'}')"><svg data-lucide="${p.status==='todo'?'play':'check'}"></svg></button>`:''}
                <button class="btn btn-icon" onclick="Plans.openEdit('${p.id}')"><svg data-lucide="pencil"></svg></button>
                <button class="btn btn-icon btn-danger" onclick="Plans.delete('${p.id}')"><svg data-lucide="trash-2"></svg></button>
              </td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>
    </div>`;
  },

  // ── Themed confirm dialog ─────────────────────────────────
  // ── Save / Edit ───────────────────────────────────────────
  save() {
    const f = document.getElementById('addPlanForm');
    const title = f.planTitle.value.trim();
    if (!title) return;
    if (Store.get('plans_seeded')) { Store.setPlans({ items: [] }); Store.set('plans_seeded', null); }
    Store.addPlan({ title, status:'todo', priority:document.getElementById('addPlanPriHidden').value, dueDate:f.planDue.value, category:document.getElementById('addPlanCatHidden').value, notes:f.planNotes.value.trim(), subTasks:[] });
    this._addPlanModal.close();
    UI.toast(UI.t('plans_added'), 'success');
    this.render();
  },

  openEdit(id) {
    const p = Store.getPlans().items.find(p => p.id === id);
    if (!p) return;
    this._editingPlanId = id;
    this._editPlanModal = new CustomModal({
      title: UI.t('plans_edit_modal'),
      icon: 'pencil',
      content: this._planFormHTML('edit'),
      width: 560,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => this.saveEdit() },
      ],
      onClose: () => { this._editingPlanId = null; },
    });
    this._editPlanModal.open();
    lucide.createIcons({ nodes: [this._editPlanModal.getBody()] });

    const f = document.getElementById('editPlanForm');
    f.editPlanTitle.value = p.title;
    document.getElementById('editPlanPriHidden').value = p.priority;
    this._setPriBtn('editPlanPriBtn', p.priority);
    document.getElementById('editPlanCatHidden').value = p.category;
    this._setPlanCatBtn('editPlanCatBtn', p.category);
    f.editPlanDue.value = p.dueDate || '';
    document.getElementById('editPlanDueLabel').textContent = p.dueDate ? UI.formatDate(p.dueDate) : '';
    f.editPlanNotes.value = p.notes || '';

    this._editPlanDateCdp = new CustomDatePicker({
      btn: 'editPlanDueBtn', input: 'editPlanDueInput', align: 'left', clearable: true,
      onSelect: date => { document.getElementById('editPlanDueLabel').textContent = UI.formatDate(date); },
      onClear:  ()   => { document.getElementById('editPlanDueLabel').textContent = ''; },
    });

    const subInput = document.getElementById('newSubTaskInput');
    if (subInput) {
      subInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      });
    }
    this._renderEditSubTasks(id);
  },

  saveEdit() {
    const id    = this._editingPlanId;
    const f     = document.getElementById('editPlanForm');
    const title = f.editPlanTitle.value.trim();
    if (!title) return;
    Store.updatePlan(id, {
      title,
      priority: document.getElementById('editPlanPriHidden').value,
      category: document.getElementById('editPlanCatHidden').value,
      dueDate:  f.editPlanDue.value,
      notes:    f.editPlanNotes.value.trim()
    });
    this._editPlanModal.close();
    UI.toast(UI.t('plans_updated'), 'success');
    this.render();
  },

  // ── Sub-task rendering ────────────────────────────────────
  _renderEditSubTasks(planId) {
    const p        = Store.getPlans().items.find(p => p.id === planId);
    const subTasks = p ? (p.subTasks || []) : [];
    const container = document.getElementById('editSubTasksList');
    if (!container) return;

    if (!subTasks.length) {
      container.innerHTML = `<div style="color:var(--text-muted);font-size:0.8125rem;padding:0.25rem 0">${UI.t('plans_no_subtasks')}</div>`;
      return;
    }

    container.innerHTML = subTasks.map(st => `
      <div class="edit-sub-row" data-sub-id="${st.id}" draggable="true">
        <span class="sub-drag-handle"><svg data-lucide="grip-vertical" style="width:0.875rem;height:0.875rem;pointer-events:none"></svg></span>
        ${CheckboxCore.html({ done: st.done, type: 'square', color: 'var(--accent)', onclick: `Plans.toggleSubTask('${planId}','${st.id}')` })}
        <span class="edit-sub-label${st.done ? ' edit-sub-label--done' : ''}" style="white-space:pre-wrap">${st.title.replace(/</g,'&lt;')}</span>
        <button type="button" class="btn btn-icon edit-sub-edit-btn" onclick="Plans._editSubTaskInline('${planId}','${st.id}')" data-tooltip="${UI.t('btn_edit')}"><svg data-lucide="pencil" style="width:0.75rem;height:0.75rem"></svg></button>
        <button type="button" class="btn btn-icon btn-danger edit-sub-del" onclick="Plans.deleteSubTask('${planId}','${st.id}')" data-tooltip="${UI.t('btn_delete')}"><svg data-lucide="x" style="width:0.75rem;height:0.75rem"></svg></button>
      </div>
    `).join('');

    lucide.createIcons({ nodes: [container] });
    this._initSubTaskDrag(planId);
  },

  // ── Inline editing ────────────────────────────────────────
  _editSubTaskInline(planId, subId) {
    const row = document.querySelector(`#editSubTasksList [data-sub-id="${subId}"]`);
    if (!row) return;
    const labelEl = row.querySelector('.edit-sub-label');
    const editBtn = row.querySelector('.edit-sub-edit-btn');
    const origTitle = labelEl.textContent;

    // textarea: Enter=kaydet, Shift+Enter=yeni satır
    const ta = document.createElement('textarea');
    ta.className = 'form-control';
    ta.value = origTitle;
    ta.rows = 1;
    ta.style.cssText = 'flex:1;font-size:0.8125rem;padding:3px 8px;resize:none;overflow:hidden;line-height:1.5;min-height:1.875rem';

    labelEl.replaceWith(ta);
    if (editBtn) editBtn.style.display = 'none';

    // Auto-resize
    const resize = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
    ta.addEventListener('input', resize);
    resize();

    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);

    let cancelled = false;

    const save = () => {
      if (cancelled) { this._renderEditSubTasks(planId); return; }
      const newTitle = ta.value.trim();
      if (!newTitle) { ta.focus(); return; }
      const p = Store.getPlans().items.find(p => p.id === planId);
      const subTasks = (p.subTasks || []).map(st => st.id === subId ? { ...st, title: newTitle } : st);
      Store.updatePlan(planId, { subTasks });
      this._renderEditSubTasks(planId);
      this.renderContent();
    };

    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); cancelled = false; ta.blur(); }
      if (e.key === 'Escape')               { e.preventDefault(); cancelled = true;  ta.blur(); }
      // Shift+Enter → default (yeni satır)
    });
    ta.addEventListener('blur', save);
  },

  // ── Drag & drop sub-tasks ────────────────────────────────
  _initSubTaskDrag(planId) {
    const list = document.getElementById('editSubTasksList');
    const rows = list.querySelectorAll('.edit-sub-row');

    rows.forEach((row, idx) => {
      row.addEventListener('dragstart', e => {
        this._dragSubIdx = idx;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => row.classList.add('sub-dragging'), 0);
      });

      row.addEventListener('dragend', () => {
        row.classList.remove('sub-dragging');
        list.querySelectorAll('.edit-sub-row').forEach(r => {
          r.classList.remove('sub-drag-over-top', 'sub-drag-over-bot');
        });
        this._dragSubIdx = null;
      });

      row.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        list.querySelectorAll('.edit-sub-row').forEach(r => r.classList.remove('sub-drag-over-top', 'sub-drag-over-bot'));
        const mid = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2;
        row.classList.add(e.clientY < mid ? 'sub-drag-over-top' : 'sub-drag-over-bot');
      });

      row.addEventListener('dragleave', e => {
        if (!row.contains(e.relatedTarget)) {
          row.classList.remove('sub-drag-over-top', 'sub-drag-over-bot');
        }
      });

      row.addEventListener('drop', e => {
        e.preventDefault();
        row.classList.remove('sub-drag-over-top', 'sub-drag-over-bot');
        const fromIdx = this._dragSubIdx;
        if (fromIdx === null || fromIdx === idx) return;

        const p    = Store.getPlans().items.find(p => p.id === planId);
        const subs = [...(p.subTasks || [])];
        const [moved] = subs.splice(fromIdx, 1);

        const mid = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2;
        let insertAt = e.clientY < mid ? idx : idx + 1;
        if (fromIdx < idx) insertAt = Math.max(0, insertAt - 1);

        subs.splice(Math.min(subs.length, insertAt), 0, moved);
        Store.updatePlan(planId, { subTasks: subs });
        this._renderEditSubTasks(planId);
        this.renderContent();
      });
    });
  },

  // ── Sub-task CRUD ─────────────────────────────────────────
  addSubTask(planId) {
    const input = document.getElementById('newSubTaskInput');
    const title = input.value.trim();
    if (!title) return;
    const p        = Store.getPlans().items.find(p => p.id === planId);
    const subTasks = [...(p.subTasks || []), { id: Store._id(), title, done: false }];
    Store.updatePlan(planId, { subTasks });
    input.value = '';
    input.style.height = 'auto';
    input.focus();
    this._renderEditSubTasks(planId);
    this.renderContent();
  },

  _onSubTaskKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.addSubTask(this._editingPlanId);
    }
    // Shift+Enter → default (new line in textarea)
  },

  toggleSubTask(planId, subTaskId) {
    const p        = Store.getPlans().items.find(p => p.id === planId);
    const subTasks = (p.subTasks || []).map(st => st.id === subTaskId ? { ...st, done: !st.done } : st);
    Store.updatePlan(planId, { subTasks });
    if (this._editPlanModal && this._editPlanModal._overlay && this._editPlanModal._overlay.isConnected && this._editingPlanId === planId) {
      this._renderEditSubTasks(planId);
    }
    this.renderContent();
  },

  deleteSubTask(planId, subTaskId) {
    DeleteManager.confirm({ module: 'plans', title: UI.t('btn_delete'), message: UI.t('plans_confirm_delete_sub'), confirmLabel: UI.t('btn_delete'), onConfirm: () => {
      const p        = Store.getPlans().items.find(p => p.id === planId);
      const subTasks = (p.subTasks || []).filter(st => st.id !== subTaskId);
      Store.updatePlan(planId, { subTasks });
      this._renderEditSubTasks(planId);
      this.renderContent();
    }});
  },

  move(id, status) {
    Store.updatePlan(id, { status });
    UI.toast(status==='done' ? '🎉' : UI.t('plans_updated'), 'success');
    this.render();
  },

  delete(id) {
    DeleteManager.confirm({ module: 'plans', title: UI.t('btn_delete'), message: UI.t('plans_confirm_delete'), confirmLabel: UI.t('btn_delete'), onConfirm: () => {
      Store.deletePlan(id);
      UI.toast(UI.t('plans_deleted'), 'info');
      this.render();
    }});
  },

  triggerImport() {
    const input = document.getElementById('lt-plans-import-file');
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
        const isKey = k => k.startsWith('lt_plans') || k === 'lt_panels_plans';
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
