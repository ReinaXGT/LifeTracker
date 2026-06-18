const Budget = {
  cur: '₺',
  activeGroup: null,
  activeView: 'overview',
  _pieChart: null,
  _incExpChart: null,
  _dailyChart: null,
  _subcatChart: null,
  _detailsOpen: {},
  _editMode: false,
  _panelOrder: null,
  _panelSizes: null,
  _editingGroupId: null,
  _netHistChart: null,
  _filterDateCdp: null,
  _addTxCdp: null,
  _editTxCdp: null,
  _cycleCdp: null,
  _addTxModal: null,
  _editTxModal: null,
  _addGroupModal: null,
  _editGroupModal: null,
  _addSubModal: null,
  _editSubModal: null,
  _cfgModal: null,
  _histCycleIdx: 0,
  _histModal: null,
  _histAddTxCdp: null,
  _histEditTxCdp: null,
  _histAddTxModal: null,
  _histEditTxModal: null,
  _histFilterQ: '',
  _histFilterGroup: '',
  _histFilterFrom: '',
  _histFilterTo: '',
  _histFilterDateCdp: null,
  _dailyCdp: null,
  _dailyFilterFrom: '',
  _dailyFilterTo: '',
  _dailyRenderedFrom: '',
  _dailyRenderedTo: '',
  _histFilterGroupDD: null,

  init() {
    UI.initTopbar(); UI.initEsc();
    this.cur = Store.getSettings().currency || '₺';
    this._cleanupBoguscycles();
    this._checkCycleReset();
    this._updateTopbarActions();
    this._bindEvents();
    this._registerPanels();
    this._filterDateCdp = new CustomDatePicker({
      btn: 'filterDateBtn', input: 'filterDateFrom', inputTo: 'filterDateTo',
      align: 'right', clearable: true, range: true,
      onStartSelect: from => {
        const lbl = document.getElementById('filterDateLabel');
        if (lbl) { lbl.textContent = UI.formatDate(from) + ' →'; lbl.style.color = 'var(--accent)'; }
      },
      onSelect: (from, to) => {
        const lbl = document.getElementById('filterDateLabel');
        if (lbl) {
          lbl.textContent = from === to ? UI.formatDate(from) : `${UI.formatDate(from)} – ${UI.formatDate(to)}`;
          lbl.style.color = 'var(--text-primary)';
        }
        this.renderTransactions();
      },
      onClear: () => {
        const lbl = document.getElementById('filterDateLabel');
        if (lbl) { lbl.textContent = UI.t('bud_filter_date'); lbl.style.color = 'var(--text-secondary)'; }
        this.renderTransactions();
      },
    });
    const _initLbl = document.getElementById('filterDateLabel');
    if (_initLbl) _initLbl.textContent = UI.t('bud_filter_date');
    const _savedDf = Store.get('budget_daily_filter');
    if (_savedDf) {
      this._dailyFilterFrom = _savedDf.from || '';
      this._dailyFilterTo   = _savedDf.to   || '';
    }
    const _savedBudgetUi = Store.get('budget_ui');
    if (_savedBudgetUi?.activeView && _savedBudgetUi.activeView !== 'overview') {
      this.setView(_savedBudgetUi.activeView);
    } else {
      this.render();
    }
    document.addEventListener('lt:privacy-change',  () => this.render());
    document.addEventListener('lt:panel-change',    () => { this._registerPanels(); this.renderOverview(); });
    document.addEventListener('lt:language-change', () => {
      this._registerPanels(); this.render();
      const from = document.getElementById('filterDateFrom')?.value;
      const to   = document.getElementById('filterDateTo')?.value;
      if (!from && !to) {
        const lbl = document.getElementById('filterDateLabel');
        if (lbl) { lbl.textContent = UI.t('bud_filter_date'); lbl.style.color = 'var(--text-secondary)'; }
      }
    });
    document.addEventListener('lt:theme-change',    () => { this._registerPanels(); this.render(); });
    document.addEventListener('lt:currency-change', e  => { this.cur = e.detail.currency; this.render(); });

    // Close details overlay on outside click or Escape
    document.addEventListener('click', e => {
      const overlay = document.getElementById('budget-details-overlay');
      if (overlay && overlay.style.display !== 'none' &&
          !overlay.contains(e.target) && !e.target.closest('.budget-details-toggle')) {
        this.closeDetailsOverlay();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeDetailsOverlay();
    });
    this._initOverlayDrag();
  },

  // ── View switching ───────────────────────────────────────
  setView(v) {
    if (this._editMode && v !== 'overview') this._editMode = false;
    this.activeView = v;
    Store.set('budget_ui', { activeView: v });
    document.querySelectorAll('.bvtab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + v).classList.add('active');
    ['overview', 'categories', 'transactions'].forEach(name => {
      document.getElementById('view-' + name).style.display = name === v ? '' : 'none';
    });
    this._updateTopbarActions();
    this.render();
  },

  _updateTopbarActions() {
    const el = document.getElementById('topbar-actions');
    const cfgBtn    = `<button class="btn btn-icon btn-secondary" onclick="Budget.openCycleSettings()" data-tooltip="${UI.t('bud_cycle_settings_title')}" style="width:34px;height:34px;min-width:34px;padding:0"><svg data-lucide="settings-2"></svg></button>`;
    const importBtn = `<button class="btn btn-secondary" onclick="Budget._triggerBudgetImport()" style="display:flex;align-items:center;gap:6px;height:34px"><svg data-lucide="upload"></svg>${UI.t('bud_import_budget_btn')}</button>`;
    const histBtn   = `<button class="btn btn-secondary" onclick="Budget.openCycleHistory()" style="display:flex;align-items:center;gap:6px;height:34px"><svg data-lucide="history"></svg>${UI.t('bud_history_btn')}</button>`;
    if (this.activeView === 'transactions') {
      el.innerHTML = `${cfgBtn}${histBtn}${importBtn}<button class="btn btn-primary" style="height:34px;display:flex;align-items:center;gap:6px" onclick="Budget.openAddTx()"><svg data-lucide="plus"></svg>${UI.t('bud_add_tx_btn')}</button>`;
    } else if (this.activeView === 'categories') {
      el.innerHTML = `${cfgBtn}${histBtn}${importBtn}<button class="btn btn-secondary" style="height:34px;display:flex;align-items:center;gap:6px" onclick="Budget.openAddGroup()"><svg data-lucide="folder-plus"></svg>${UI.t('bud_add_group_btn')}</button>`;
    } else {
      const lockBtn = `<button class="btn btn-icon ${this._editMode ? 'btn-primary' : 'btn-secondary'}" onclick="Budget.toggleEditMode()" data-tooltip="${this._editMode ? UI.t('bud_edit_close') : UI.t('bud_edit_open')}" style="width:34px;height:34px;min-width:34px;padding:0"><svg data-lucide="${this._editMode ? 'lock-open' : 'lock'}"></svg></button>`;
      el.innerHTML = `${lockBtn}${cfgBtn}${histBtn}${importBtn}`;
    }
    lucide.createIcons({ nodes: [el] });
  },

  // ── Budget Import ─────────────────────────────────────────
  _triggerBudgetImport() {
    const input = document.getElementById('lt-budget-import-file');
    if (input) { input.value = ''; input.click(); }
  },

  _importBudgetData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        // budget.html'e ait tüm anahtarlar: lt_budget*, lt_panels_budget
        const isBudgetKey = k => k.startsWith('lt_budget') || k === 'lt_panels_budget';
        const budgetKeys  = Object.keys(data).filter(isBudgetKey);
        if (!budgetKeys.length) throw new Error();
        const _doImport = () => {
          Object.keys(localStorage)
            .filter(k => isBudgetKey(k) || k === 'lt_lt_budget_panel_order' || k === 'lt_lt_budget_panel_sizes')
            .forEach(k => localStorage.removeItem(k));
          budgetKeys.forEach(k => localStorage.setItem(k, JSON.stringify(data[k])));
          // _checkCycleReset()'in yanlış döngü sonu tetiklemesini önle
          const importedCfg = data['lt_budget_cfg'] || {};
          const cycleDay    = importedCfg.cycleDay || 1;
          const safeStart   = this._calcCycleStart(cycleDay);
          localStorage.setItem('lt_budget_cfg', JSON.stringify({ ...importedCfg, cycleDay, lastCycleStart: safeStart }));
          UI.toast(UI.t('bud_import_budget_ok'), 'success');
          setTimeout(() => location.reload(), 800);
        };
        new CustomModal({
          title:   UI.t('settings_import_title'),
          icon:    'upload',
          variant: 'default',
          content: `<p>${UI.t('bud_import_budget_confirm')}</p>`,
          width:   420,
          zIndex:  9000,
          buttons: [
            { label: UI.t('btn_cancel'),          variant: 'secondary', onClick: m => m.close() },
            { label: UI.t('settings_import_btn'), variant: 'primary',   onClick: m => { m.close(); _doImport(); } },
          ],
        }).open();
      } catch {
        UI.toast(UI.t('bud_import_budget_err'), 'error');
      }
    };
    reader.readAsText(file);
  },

  // ── Budget Cycle ─────────────────────────────────────────
  _localDateStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },

  _applyFontScale(html) {
    const s = 1.1;
    return html
      .replace(/\bfont-size:([\d.]+)rem/g, (_, r) => `font-size:${(+r * s).toFixed(4)}rem`)
      .replace(/\bheight:([\d.]+)rem/g,    (_, r) => `height:${(+r * s).toFixed(4)}rem`)
      .replace(/\bwidth:([\d.]+)rem/g,     (_, r) => `width:${(+r * s).toFixed(4)}rem`);
  },

  _calcCycleStart(cycleDay) {
    const today = new Date();
    const day   = today.getDate();
    const d = day >= cycleDay
      ? new Date(today.getFullYear(), today.getMonth(), cycleDay)
      : new Date(today.getFullYear(), today.getMonth() - 1, cycleDay);
    return this._localDateStr(d);
  },

  // Timezone bug'ından kaynaklanan 0-günlük sahte döngü kayıtlarını temizle
  _cleanupBoguscycles() {
    const cycles = Store.get('budget_cycles');
    if (!cycles || cycles.length === 0) return;
    const cleaned = cycles.filter(c => c.start !== c.end);
    if (cleaned.length !== cycles.length) {
      Store.set('budget_cycles', cleaned);
    }
  },

  _checkCycleReset() {
    const cfg          = Store.get('budget_cfg') || {};
    const cycleDay     = cfg.cycleDay || 1;
    const currentStart = this._calcCycleStart(cycleDay);

    if (cfg.lastCycleStart && cfg.lastCycleStart !== currentStart) {
      // 1-günlük fark = timezone migration artefaktı — reset tetikleme, sadece güncelle
      const [sy, sm, sd] = cfg.lastCycleStart.split('-').map(Number);
      const [cy, cm, cd] = currentStart.split('-').map(Number);
      const storedTs     = new Date(sy, sm - 1, sd).getTime();
      const calcTs       = new Date(cy, cm - 1, cd).getTime();
      const diffDays     = Math.round((calcTs - storedTs) / 86400000);

      if (Math.abs(diffDays) === 1) {
        // Timezone migration: eski yanlış tarih düzeltiliyor, döngü sıfırlanmıyor
        // Yanlış kaydedilmiş son cycle kaydını geri al (varsa ve aynı tarihten geliyorsa)
        const cycles = Store.get('budget_cycles') || [];
        if (cycles.length > 0) {
          const [fs, fm, fd] = cycles[0].start.split('-').map(Number);
          const firstTs = new Date(fs, fm - 1, fd).getTime();
          const ageDays = Math.round((storedTs - firstTs) / 86400000);
          // En üstteki kayıt tam bu yanlış lastCycleStart'tan geliyorsa sil
          if (Math.abs(ageDays) <= 1) {
            cycles.shift();
            Store.set('budget_cycles', cycles);
          }
        }
      } else if (diffDays > 1) {
        // Gerçek döngü sonu — sıfırla
        const { transactions, groups } = Store.getBudget();
        if (transactions.length > 0) {
          const income  = transactions.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
          const expense = transactions.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
          const prevEnd = new Date(cy, cm - 1, cd);
          prevEnd.setDate(prevEnd.getDate() - 1);
          const cycles  = Store.get('budget_cycles') || [];
          cycles.unshift({ start: cfg.lastCycleStart, end: this._localDateStr(prevEnd), income, expense, net: income - expense, transactions: [...transactions], groups: JSON.parse(JSON.stringify(groups)) });
          Store.set('budget_cycles', cycles);
          const b = Store.getBudget();
          b.transactions = [];
          Store.setBudget(b);
        }
      }
      // diffDays < 0: hesaplanan tarih geçmişte — dokunma
    }
    Store.set('budget_cfg', { ...cfg, cycleDay, lastCycleStart: currentStart });
  },

  // ── Cycle History ─────────────────────────────────────────

  openCycleHistory() {
    this._histCycleIdx    = 0;
    this._histFilterQ     = '';
    this._histFilterGroup = '';
    this._histFilterFrom  = '';
    this._histFilterTo    = '';
    this._histModal = new CustomModal({
      title:   UI.t('bud_history_title'),
      icon:    'history',
      width:   900,
      zIndex:  1050,
      content: '<div id="hist-body-inner" style="min-height:7.5rem"></div>',
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
      ],
    });
    this._histModal.open();
    this._renderCycleHistory();
  },

  _renderCycleHistory() {
    const el = document.getElementById('hist-body-inner');
    if (!el) return;
    const cycles = Store.get('budget_cycles') || [];
    if (!cycles.length) {
      el.innerHTML = `<div style="padding:2.5rem 0;text-align:center">${UI.emptyState(UI.t('bud_history_empty'), 'calendar')}</div>`;
      lucide.createIcons({ nodes: [el] });
      return;
    }
    const idx      = this._histCycleIdx;
    const cycle    = cycles[idx];
    const hasPrev  = idx < cycles.length - 1;
    const hasNext  = idx > 0;
    const cycleNum = cycles.length - idx;
    const fmtD     = d => d ? UI.formatDate(d) : '—';
    const netColor = cycle.net >= 0 ? 'var(--green)' : 'var(--red)';
    const netSign  = cycle.net >= 0 ? '+' : '';
    const { groups } = Store.getBudget();

    const summaryHtml = `
      <div style="display:flex;gap:12px;margin-bottom:16px">
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:var(--green);text-transform:uppercase;margin-bottom:4px">${UI.t('bud_total_income')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:var(--text-primary)">${UI.maskCurrency(cycle.income, this.cur)}</div>
        </div>
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:var(--red);text-transform:uppercase;margin-bottom:4px">${UI.t('bud_total_expense')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:var(--text-primary)">${UI.maskCurrency(cycle.expense, this.cur)}</div>
        </div>
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:${netColor};text-transform:uppercase;margin-bottom:4px">${UI.t('bud_net_balance')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:${netColor}">${netSign}${UI.maskCurrency(Math.abs(cycle.net), this.cur)}</div>
        </div>
      </div>`;

    const txs = cycle.transactions;
    let txHtml = '';

    if (txs === undefined || txs === null) {
      txHtml = `<div style="text-align:center;padding:1.5rem;color:var(--text-muted);font-size:0.8125rem">${UI.t('bud_history_no_data')}</div>`;
    } else {
      const q      = this._histFilterQ.toLowerCase();
      const gf     = this._histFilterGroup;
      const dfFrom = this._histFilterFrom;
      const dfTo   = this._histFilterTo;

      let rows = [...txs].sort((a, b) => b.date.localeCompare(a.date));
      if (q)      rows = rows.filter(t => (t.desc || '').toLowerCase().includes(q) || (groups.find(g => g.id === t.groupId)?.name || '').toLowerCase().includes(q));
      if (gf)     rows = rows.filter(t => t.groupId === gf);
      if (dfFrom) rows = rows.filter(t => t.date >= dfFrom);
      if (dfTo)   rows = rows.filter(t => t.date <= dfTo);

      const hasActiveFilter = q || gf || dfFrom || dfTo;
      const clearBtnHtml = hasActiveFilter
        ? `<button onclick="Budget._histClearFilters()" data-tooltip="${UI.t('bud_clear_date')}"
             style="display:flex;align-items:center;justify-content:center;width:1.75rem;height:1.75rem;background:transparent;border:none;cursor:pointer;color:var(--text-muted);padding:0;flex-shrink:0">
             <svg data-lucide="x-circle" style="width:0.9375rem;height:0.9375rem"></svg>
           </button>`
        : '';

      const dateLabel = (dfFrom && dfTo)
        ? (dfFrom === dfTo ? UI.formatDate(dfFrom) : `${UI.formatDate(dfFrom)} – ${UI.formatDate(dfTo)}`)
        : UI.t('bud_filter_date');
      const dateLabelColor = (dfFrom || dfTo) ? 'var(--text-primary)' : 'var(--text-secondary)';

      const filterBarHtml = `
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
          <div class="search-wrap" style="min-width:160px;flex:1">
            <svg data-lucide="search"></svg>
            <input class="form-control" id="histFilterSearch" value="${this._histFilterQ.replace(/"/g,'&quot;')}"
              style="height:2rem;padding-top:0;padding-bottom:0;box-sizing:border-box"
              placeholder="${UI.t('bud_hist_search')}"
              oninput="Budget._onHistFilterSearch(this.value)">
          </div>
          <div style="position:relative;display:inline-flex;height:2rem;flex-shrink:0">
            <button type="button" id="histFilterDateBtn" onclick="Budget._toggleHistDateFilter()"
              style="display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2rem;box-sizing:border-box;
                     background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;white-space:nowrap">
              <svg data-lucide="calendar" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
              <span id="histFilterDateLabel" style="font-size:0.8125rem;color:${dateLabelColor}">${dateLabel}</span>
            </button>
            <input type="hidden" id="histFilterFrom" value="${dfFrom}">
            <input type="hidden" id="histFilterTo" value="${dfTo}">
          </div>
          <button type="button" id="histFilterGroupBtn" onclick="Budget._openHistGroupFilter(this)"
            style="display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2rem;min-width:150px;
                   box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);
                   border-radius:var(--radius-sm);cursor:pointer;white-space:nowrap;flex-shrink:0">
            <span id="histFilterGroupLabel" style="flex:1;font-size:0.8125rem;color:${gf ? 'var(--text-primary)' : 'var(--text-secondary)'};text-align:left">
              ${gf ? (groups.find(g => g.id === gf)?.name || UI.t('bud_hist_all_cats')) : UI.t('bud_hist_all_cats')}
            </span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="histFilterGroupVal" value="${gf}">
          ${clearBtnHtml}
        </div>`;

      if (!rows.length) {
        txHtml = filterBarHtml + `<div style="padding:1.5rem 0;text-align:center">${UI.emptyState(txs.length ? UI.t('bud_no_tx') : UI.t('bud_history_no_tx'), 'receipt')}</div>`;
      } else {
        const tbody = rows.map(t => {
          const g       = groups.find(g => g.id === t.groupId);
          const s       = g?.subs.find(s => s.id === t.subId);
          const subName = s?.name || '';
          return `<tr>
            <td class="mono">${UI.formatDate(t.date)}</td>
            <td class="mono ${t.type === 'income' ? 'pos' : 'neg'}">${t.type === 'income' ? '+' : '-'}${UI.maskCurrency(t.amount, this.cur)}</td>
            <td>${subName ? `<span class="badge badge-purple">${subName}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
            <td>${g ? `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;color:${g.color}"><span style="width:7px;height:7px;border-radius:2px;background:${g.color};display:inline-block"></span>${UI.esc(g.name)}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
            <td style="color:var(--text-secondary)">${UI.esc(t.desc)}</td>
            <td style="display:flex;gap:6px;align-items:center">
              <button class="btn btn-icon btn-secondary" onclick="Budget._histEditTx(${idx},'${t.id}')" data-tooltip="${UI.t('habits_edit')}"><svg data-lucide="pencil"></svg></button>
              <button class="btn btn-icon btn-danger" onclick="Budget._histDeleteTx(${idx},'${t.id}')"><svg data-lucide="trash-2"></svg></button>
            </td>
          </tr>`;
        }).join('');
        txHtml = filterBarHtml + `
          <div style="overflow-x:auto">
            <table class="data-table" style="width:100%">
              <thead><tr>
                <th>${UI.t('bud_date_col')}</th>
                <th>${UI.t('bud_amount_col')}</th>
                <th>${UI.t('bud_sub_cat_label')}</th>
                <th>${UI.t('bud_group_col')}</th>
                <th>${UI.t('bud_desc_label')}</th>
                <th style="width:90px"></th>
              </tr></thead>
              <tbody>${tbody}</tbody>
            </table>
          </div>`;
      }
    }

    const addBtnHtml = (txs !== undefined && txs !== null) ? `
      <div style="display:flex;justify-content:flex-end;margin-bottom:12px">
        <button class="btn btn-primary" onclick="Budget._histAddTx(${idx})" style="display:flex;align-items:center;gap:6px;height:2.125rem">
          <svg data-lucide="plus"></svg>${UI.t('bud_history_add_tx')}
        </button>
      </div>` : '';

    el.innerHTML = this._applyFontScale(`
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;gap:12px">
        <button class="btn btn-icon btn-secondary" onclick="Budget._histNavTo(${idx + 1})" ${!hasPrev ? 'disabled' : ''} style="width:2.125rem;height:2.125rem;flex-shrink:0"><svg data-lucide="chevron-left"></svg></button>
        <div style="text-align:center;flex:1">
          <div style="font-weight:700;font-size:0.875rem;color:var(--text-primary)">${UI.t('bud_history_cycle')} ${cycleNum}</div>
          <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px">${fmtD(cycle.start)} – ${fmtD(cycle.end)}</div>
        </div>
        <button class="btn btn-icon btn-secondary" onclick="Budget._histNavTo(${idx - 1})" ${!hasNext ? 'disabled' : ''} style="width:2.125rem;height:2.125rem;flex-shrink:0"><svg data-lucide="chevron-right"></svg></button>
      </div>
      ${summaryHtml}
      ${addBtnHtml}
      ${txHtml}`);

    lucide.createIcons({ nodes: [el] });
    this._initHistFilterCdps();
  },

  _initHistFilterCdps() {
    if (!document.getElementById('histFilterDateBtn')) return;
    this._histFilterDateCdp = new CustomDatePicker({
      btn: 'histFilterDateBtn', input: 'histFilterFrom', inputTo: 'histFilterTo',
      align: 'right', clearable: true, range: true,
      onStartSelect: from => {
        const lbl = document.getElementById('histFilterDateLabel');
        if (lbl) { lbl.textContent = UI.formatDate(from) + ' →'; lbl.style.color = 'var(--accent)'; }
      },
      onSelect: (from, to) => {
        this._histFilterFrom = from;
        this._histFilterTo   = to;
        this._renderCycleHistory();
      },
      onClear: () => {
        this._histFilterFrom = '';
        this._histFilterTo   = '';
        this._renderCycleHistory();
      },
    });
  },

  _histNavTo(idx) {
    const cycles = Store.get('budget_cycles') || [];
    if (idx < 0 || idx >= cycles.length) return;
    this._histCycleIdx = idx;
    this._renderCycleHistory();
  },

  _onHistFilterSearch(val) {
    this._histFilterQ = val;
    this._renderCycleHistory();
  },

  _openHistGroupFilter(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const { groups } = Store.getBudget();
          dd.setItems([
            { value: '', label: UI.t('bud_hist_all_cats'), active: this._histFilterGroup === '' },
            ...groups.map(g => ({ value: g.id, label: g.name, active: g.id === this._histFilterGroup })),
          ]);
        },
        onSelect: (value) => {
          this._histFilterGroup = value;
          this._renderCycleHistory();
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _toggleHistDateFilter() {
    this._histFilterDateCdp?.toggle();
  },

  _toggleDailyDateFilter() { this._dailyCdp?.toggle(); },

  _shiftDailyDateRange(days) {
    let from = this._dailyFilterFrom;
    let to   = this._dailyFilterTo;
    if (!from || !to) {
      from = this._dailyRenderedFrom || UI.today();
      to   = this._dailyRenderedTo   || UI.today();
    }

    const shift = str => {
      const d = new Date(str + 'T00:00:00');
      d.setDate(d.getDate() + days);
      return this._localDateStr(d);
    };
    this._dailyFilterFrom = shift(from);
    this._dailyFilterTo   = shift(to);
    this._saveDailyFilter();

    const inFrom = document.getElementById('dailyFilterFrom');
    const inTo   = document.getElementById('dailyFilterTo');
    if (inFrom) inFrom.value = this._dailyFilterFrom;
    if (inTo)   inTo.value   = this._dailyFilterTo;

    const lbl = document.getElementById('dailyFilterDateLabel');
    if (lbl) {
      const f = this._dailyFilterFrom, t = this._dailyFilterTo;
      lbl.textContent = f === t ? UI.formatDate(f) : `${UI.formatDate(f)} – ${UI.formatDate(t)}`;
      lbl.style.color = 'var(--text-primary)';
    }
    this.renderDailyChart();
  },

  _initDailyCdp() {
    if (!document.getElementById('dailyFilterDateBtn')) return;
    this._dailyCdp = new CustomDatePicker({
      btn: 'dailyFilterDateBtn', input: 'dailyFilterFrom', inputTo: 'dailyFilterTo',
      align: 'right', clearable: true, range: true,
      onStartSelect: from => {
        const lbl = document.getElementById('dailyFilterDateLabel');
        if (lbl) { lbl.textContent = UI.formatDate(from) + ' →'; lbl.style.color = 'var(--accent)'; }
      },
      onSelect: (from, to) => {
        this._dailyFilterFrom = from;
        this._dailyFilterTo   = to;
        this._saveDailyFilter();
        const lbl = document.getElementById('dailyFilterDateLabel');
        if (lbl) {
          lbl.textContent = from === to ? UI.formatDate(from) : `${UI.formatDate(from)} – ${UI.formatDate(to)}`;
          lbl.style.color = 'var(--text-primary)';
        }
        this.renderDailyChart();
      },
      onClear: () => {
        this._dailyFilterFrom = '';
        this._dailyFilterTo   = '';
        this._saveDailyFilter();
        const lbl = document.getElementById('dailyFilterDateLabel');
        if (lbl) { lbl.textContent = UI.t('bud_filter_date'); lbl.style.color = 'var(--text-secondary)'; }
        this.renderDailyChart();
      },
    });
  },

  _saveDailyFilter() {
    Store.set('budget_daily_filter', { from: this._dailyFilterFrom, to: this._dailyFilterTo });
  },

  _histClearFilters() {
    this._histFilterQ     = '';
    this._histFilterGroup = '';
    this._histFilterFrom  = '';
    this._histFilterTo    = '';
    this._renderCycleHistory();
  },

  _histRecalc(cycles, idx) {
    const txs           = cycles[idx].transactions || [];
    cycles[idx].income  = txs.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
    cycles[idx].expense = txs.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
    cycles[idx].net     = cycles[idx].income - cycles[idx].expense;
    Store.set('budget_cycles', cycles);
  },

  _histTxSubDropdown(btn, hiddenId) {
    const { groups } = Store.getBudget();
    if (!groups.some(g => g.subs.length)) { UI.toast(UI.t('bud_no_subs_hint'), 'info'); return; }
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const { groups } = Store.getBudget();
          const cur = document.getElementById(hiddenId)?.value || '';
          const items = [];
          groups.forEach(g => g.subs.forEach(s => items.push({ value: s.id, label: `${g.name} · ${s.name}`, active: s.id === cur })));
          dd.setItems(items);
        },
        onSelect: (val) => {
          const inp = document.getElementById(hiddenId);
          if (inp) inp.value = val;
          const { groups } = Store.getBudget();
          let label = UI.t('bud_select_sub');
          groups.forEach(g => g.subs.forEach(s => { if (s.id === val) label = `${g.name} · ${s.name}`; }));
          const lbl = btn.querySelector('.dd-label');
          if (lbl) { lbl.style.color = 'var(--text-primary)'; lbl.textContent = label; }
        },
        minWidth: 240, align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _toggleHistTxDate(type) {
    if (type === 'add'  && this._histAddTxCdp)  this._histAddTxCdp.toggle();
    if (type === 'edit' && this._histEditTxCdp) this._histEditTxCdp.toggle();
  },

  _histAddTx(cycleIdx) {
    const cycles  = Store.get('budget_cycles') || [];
    const cycle   = cycles[cycleIdx];
    const defDate = cycle?.start || UI.today();

    const html = `
      <form id="histAddTxForm" style="display:flex;flex-direction:column;gap:16px">
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('lbl_date')}</label>
            <button type="button" id="histAddTxDateBtn" onclick="Budget._toggleHistTxDate('add')"
              style="width:100%;display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
              <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
              <span id="histAddTxDateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.formatDate(defDate)}</span>
            </button>
            <input type="hidden" id="histAddTxDateInput" value="${defDate}">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('bud_amount_label')}</label>
            <input class="form-control" type="number" id="histAddTxAmount" min="0" step="0.01" placeholder="0.00">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_desc_label')}</label>
          <input class="form-control" type="text" id="histAddTxDesc" placeholder="${UI.t('bud_tx_desc_placeholder')}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_sub_cat_label')}</label>
          <button type="button" id="histAddTxSubBtn" onclick="Budget._histTxSubDropdown(this,'histAddTxSubHidden')"
            style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-muted);text-align:left">${UI.t('bud_select_sub')}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="histAddTxSubHidden" value="">
        </div>
      </form>`;

    this._histAddTxModal = new CustomModal({
      title:   UI.t('bud_history_add_tx'),
      icon:    'plus-circle',
      content: html,
      width:   480,
      zIndex:  1100,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => this._histSaveAddTx(cycleIdx) },
      ],
    });
    this._histAddTxModal.open();
    this._histAddTxCdp = new CustomDatePicker({
      btn: 'histAddTxDateBtn', input: 'histAddTxDateInput', align: 'left',
      onSelect: date => { document.getElementById('histAddTxDateLabel').textContent = UI.formatDate(date); },
    });
    lucide.createIcons({ nodes: [this._histAddTxModal.getBody()] });
    document.getElementById('histAddTxForm').addEventListener('submit', e => { e.preventDefault(); this._histSaveAddTx(cycleIdx); });
  },

  _histSaveAddTx(cycleIdx) {
    const date   = document.getElementById('histAddTxDateInput')?.value;
    const amount = parseFloat(document.getElementById('histAddTxAmount')?.value);
    const desc   = document.getElementById('histAddTxDesc')?.value.trim() || '';
    const subId  = document.getElementById('histAddTxSubHidden')?.value;
    if (!date || !subId || !amount || isNaN(amount)) return;

    const { groups } = Store.getBudget();
    const g       = groups.find(g => g.subs.some(s => s.id === subId));
    const groupId = g?.id || '';
    const type    = g?.type === 'income' ? 'income' : 'expense';

    const cycles = Store.get('budget_cycles') || [];
    if (!cycles[cycleIdx]) return;
    if (!cycles[cycleIdx].transactions) cycles[cycleIdx].transactions = [];
    cycles[cycleIdx].transactions.unshift({ id: Store._id(), date, desc, groupId, subId, amount, type });
    this._histRecalc(cycles, cycleIdx);

    this._histAddTxModal.close();
    UI.toast(UI.t('bud_trans_added'), 'success');
    this._renderCycleHistory();
    this.renderNetHistoryChart();
  },

  _histEditTx(cycleIdx, txId) {
    const cycles = Store.get('budget_cycles') || [];
    const cycle  = cycles[cycleIdx];
    if (!cycle || !cycle.transactions) return;
    const t = cycle.transactions.find(t => t.id === txId);
    if (!t) return;

    const { groups } = Store.getBudget();
    const existG    = groups.find(g => g.subs.some(s => s.id === t.subId));
    const existS    = existG?.subs.find(s => s.id === t.subId);
    const subLabel  = (existG && existS) ? `${existG.name} · ${existS.name}` : UI.t('bud_select_sub');
    const subColor  = (existG && existS) ? 'var(--text-primary)' : 'var(--text-muted)';

    const html = `
      <form id="histEditTxForm" style="display:flex;flex-direction:column;gap:16px">
        <input type="hidden" id="histEditTxId" value="${t.id}">
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('lbl_date')}</label>
            <button type="button" id="histEditTxDateBtn" onclick="Budget._toggleHistTxDate('edit')"
              style="width:100%;display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
              <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
              <span id="histEditTxDateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.formatDate(t.date)}</span>
            </button>
            <input type="hidden" id="histEditTxDateInput" value="${t.date}">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('bud_amount_label')}</label>
            <input class="form-control" type="number" id="histEditTxAmount" min="0" step="0.01" value="${t.amount}" placeholder="0.00">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_edit_desc_label')}</label>
          <input class="form-control" type="text" id="histEditTxDesc" value="${(t.desc || '').replace(/"/g, '&quot;')}" placeholder="${UI.t('bud_tx_desc_placeholder')}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_sub_cat_label')}</label>
          <button type="button" id="histEditTxSubBtn" onclick="Budget._histTxSubDropdown(this,'histEditTxSubHidden')"
            style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;font-size:0.8125rem;color:${subColor};text-align:left">${subLabel}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="histEditTxSubHidden" value="${t.subId || ''}">
        </div>
      </form>`;

    this._histEditTxModal = new CustomModal({
      title:   UI.t('bud_edit_tx_modal'),
      content: html,
      width:   480,
      zIndex:  1100,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => this._histSaveEditTx(cycleIdx) },
      ],
    });
    this._histEditTxModal.open();
    this._histEditTxCdp = new CustomDatePicker({
      btn: 'histEditTxDateBtn', input: 'histEditTxDateInput', align: 'left',
      onSelect: date => { document.getElementById('histEditTxDateLabel').textContent = UI.formatDate(date); },
    });
    lucide.createIcons({ nodes: [this._histEditTxModal.getBody()] });
    document.getElementById('histEditTxForm').addEventListener('submit', e => { e.preventDefault(); this._histSaveEditTx(cycleIdx); });
  },

  _histSaveEditTx(cycleIdx) {
    const date   = document.getElementById('histEditTxDateInput')?.value;
    const amount = parseFloat(document.getElementById('histEditTxAmount')?.value);
    const desc   = document.getElementById('histEditTxDesc')?.value.trim() || '';
    const subId  = document.getElementById('histEditTxSubHidden')?.value;
    const txId   = document.getElementById('histEditTxId')?.value;
    if (!date || !subId || !amount || isNaN(amount)) return;

    const { groups } = Store.getBudget();
    const g       = groups.find(g => g.subs.some(s => s.id === subId));
    const groupId = g?.id || '';
    const type    = g?.type === 'income' ? 'income' : 'expense';

    const cycles = Store.get('budget_cycles') || [];
    if (!cycles[cycleIdx] || !cycles[cycleIdx].transactions) return;
    const tIdx = cycles[cycleIdx].transactions.findIndex(t => t.id === txId);
    if (tIdx === -1) return;
    cycles[cycleIdx].transactions[tIdx] = { ...cycles[cycleIdx].transactions[tIdx], date, desc, groupId, subId, amount, type };
    this._histRecalc(cycles, cycleIdx);

    this._histEditTxModal.close();
    UI.toast(UI.t('bud_tx_updated'), 'success');
    this._renderCycleHistory();
    this.renderNetHistoryChart();
  },

  _histDeleteTx(cycleIdx, txId) {
    DeleteManager.confirm({
      module:       'budget',
      title:        UI.t('bud_confirm_title'),
      message:      UI.t('bud_confirm_delete_trans'),
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        const cycles = Store.get('budget_cycles') || [];
        if (!cycles[cycleIdx] || !cycles[cycleIdx].transactions) return;
        cycles[cycleIdx].transactions = cycles[cycleIdx].transactions.filter(t => t.id !== txId);
        this._histRecalc(cycles, cycleIdx);
        UI.toast(UI.t('bud_trans_deleted'), 'info');
        this._renderCycleHistory();
        this.renderNetHistoryChart();
      },
    });
  },

  openCycleSettings() {
    const cfg      = Store.get('budget_cfg') || {};
    const cycleDay = cfg.cycleDay || 1;
    const startStr = this._calcCycleStart(cycleDay);

    const html = `
      <div style="display:flex;flex-direction:column;gap:18px">
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="display:grid;grid-template-columns:1fr 32px 1fr">
            <span style="font-size:0.6875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.07em">${UI.t('bud_cycle_start')}</span>
            <span></span>
            <span style="font-size:0.6875rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.07em">${UI.t('bud_cycle_end')}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 32px 1fr;align-items:center;gap:0">
            <div class="form-group" style="margin:0;position:relative">
              <button type="button" id="cycleStartDateBtn" onclick="Budget.toggleCycleDatePicker()"
                style="width:100%;height:2.5rem;box-sizing:border-box;display:flex;align-items:center;gap:8px;
                       padding:0 0.75rem;background:rgba(124,108,252,.08);border:1.5px solid var(--accent);
                       border-radius:var(--radius-sm);cursor:pointer;text-align:left;transition:background 150ms,border-color 150ms">
                <svg data-lucide="calendar" style="width:0.875rem;height:0.875rem;color:var(--accent);flex-shrink:0"></svg>
                <span id="cycleStartDateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);font-family:var(--font-mono)"></span>
                <svg data-lucide="chevron-down" style="width:0.75rem;height:0.75rem;color:var(--accent);flex-shrink:0"></svg>
              </button>
              <input type="hidden" id="cycleStartDate" value="">
            </div>
            <div style="display:flex;justify-content:center;align-items:center">
              <svg data-lucide="arrow-right" style="width:0.875rem;height:0.875rem;color:var(--text-muted)"></svg>
            </div>
            <div style="height:2.5rem;box-sizing:border-box;display:flex;align-items:center;gap:8px;
                        padding:0 0.75rem;background:var(--bg-elevated);border:1px solid var(--border);
                        border-radius:var(--radius-sm);opacity:.6;pointer-events:none">
              <svg data-lucide="calendar-check" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
              <span id="cycleEndDate" style="flex:1;font-size:0.8125rem;color:var(--text-secondary);font-family:var(--font-mono)"></span>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:center">
            <div id="cycleDurationBadge" style="display:inline-flex;align-items:center;gap:5px;padding:0.25rem 0.75rem;
                 background:rgba(124,108,252,.07);border:1px solid rgba(124,108,252,.18);
                 border-radius:20px;font-size:0.6875rem;color:var(--accent);font-weight:600;font-family:var(--font-mono)">
              <svg data-lucide="timer" style="width:0.6875rem;height:0.6875rem"></svg>
              <span id="cycleDurationText">—</span>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;padding:0.6875rem 0.875rem;
             background:rgba(96,165,250,.05);border:1px solid rgba(96,165,250,.15);border-radius:var(--radius-sm)">
          <svg data-lucide="info" style="width:0.8125rem;height:0.8125rem;color:var(--blue);flex-shrink:0;margin-top:2px"></svg>
          <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.65;margin:0">${UI.t('bud_cycle_desc')}</p>
        </div>
      </div>`;

    this._cfgModal = new CustomModal({
      title:        UI.t('bud_cycle_settings_title'),
      icon:         'calendar-range',
      content:      html,
      width:        420,
      zIndex:       1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   icon: 'check', onClick: () => this.saveCycleSettings() },
      ],
    });
    this._cfgModal.open();

    document.getElementById('cycleStartDate').value = startStr;
    document.getElementById('cycleStartDateLabel').textContent = UI.formatDate(startStr);

    this._cycleCdp = new CustomDatePicker({
      btn: 'cycleStartDateBtn', input: 'cycleStartDate', align: 'left',
      onSelect: date => {
        document.getElementById('cycleStartDateLabel').textContent = UI.formatDate(date);
        this._onCycleStartChange();
      },
    });
    this._onCycleStartChange();
    lucide.createIcons({ nodes: [this._cfgModal.getBody()] });
  },

  _onCycleStartChange() {
    const startVal = document.getElementById('cycleStartDate').value;
    if (!startVal) return;
    const [y, m, d] = startVal.split('-').map(Number);
    const end    = new Date(y, m, d - 1);
    const endStr = this._localDateStr(end);
    document.getElementById('cycleEndDate').textContent = UI.formatDate(endStr);

    const dayCount = Math.round((new Date(y, m, d) - new Date(y, m - 1, d)) / 86400000);
    const txt = document.getElementById('cycleDurationText');
    if (txt) txt.textContent = dayCount + ' gün';
    lucide.createIcons({ nodes: [document.getElementById('cycleDurationBadge')] });
  },

  saveCycleSettings() {
    const startVal = document.getElementById('cycleStartDate').value;
    if (!startVal) return;
    const day  = parseInt(startVal.split('-')[2], 10);
    const cfg  = Store.get('budget_cfg') || {};
    Store.set('budget_cfg', { ...cfg, cycleDay: day, lastCycleStart: startVal });
    this._cfgModal.close();
    UI.toast(UI.t('bud_cycle_saved'), 'success');
  },

  render() {
    if (this.activeView === 'overview') {
      this.renderKPIs();
      this.renderOverview();
    } else if (this.activeView === 'categories') {
      this.renderCategoriesView();
    } else {
      this._fillFilterGroup();
      this.renderTransactions();
    }
  },

  // ── Panel order helpers ──────────────────────────────────
  _getPanelOrder() {
    if (!this._panelOrder) {
      const all = ['budget-panel-summary', 'budget-panel-daily', 'budget-panel-nethistory', 'budget-panel-inc', 'budget-panel-pie', 'budget-panel-subcats'];
      // Eski çift-prefix kaydından (lt_lt_budget_panel_order) tek-prefix'e migrate et
      let stored = Store.get('budget_panel_order');
      if (!stored) {
        const legacy = Store.get('lt_budget_panel_order');
        if (legacy) { stored = legacy; Store.set('budget_panel_order', legacy); localStorage.removeItem('lt_lt_budget_panel_order'); }
      }
      if (stored) {
        const filtered = stored.filter(id => id !== 'budget-panel-bar');
        const missing  = all.filter(id => !filtered.includes(id));
        this._panelOrder = missing.length ? [...filtered, ...missing] : filtered;
        if (filtered.length !== stored.length || missing.length) this._savePanelOrder();
      } else {
        this._panelOrder = all;
      }
    }
    return this._panelOrder;
  },

  _savePanelOrder() {
    Store.set('budget_panel_order', this._panelOrder);
  },

  // ── Panel size helpers ────────────────────────────────────
  _getPanelSizes() {
    if (!this._panelSizes) {
      const defaults = {
        'budget-panel-summary':    { wStep: 4, hStep: 5 },
        'budget-panel-daily':      { wStep: 4, hStep: 3 },
        'budget-panel-pie':        { wStep: 1, hStep: 3 },
        'budget-panel-inc':        { wStep: 1, hStep: 3 },
        'budget-panel-subcats':    { wStep: 2, hStep: 3 },
        'budget-panel-nethistory': { wStep: 4, hStep: 3 },
      };
      // Eski çift-prefix kaydından (lt_lt_budget_panel_sizes) tek-prefix'e migrate et
      let stored = Store.get('budget_panel_sizes');
      if (!stored) {
        const legacy = Store.get('lt_budget_panel_sizes');
        if (legacy) { stored = legacy; Store.set('budget_panel_sizes', legacy); localStorage.removeItem('lt_lt_budget_panel_sizes'); }
      }
      this._panelSizes = stored ? { ...defaults, ...stored } : defaults;
    }
    // migrate old cols format
    Object.values(this._panelSizes).forEach(sz => {
      if (sz.cols !== undefined && sz.wStep === undefined) {
        sz.wStep = sz.cols === 2 ? 4 : 2;
        delete sz.cols;
      }
    });
    return this._panelSizes;
  },

  _savePanelSizes() {
    Store.set('budget_panel_sizes', this._panelSizes);
  },

  _changePanelWidth(id, delta) {
    const sizes = this._getPanelSizes();
    if (!sizes[id]) sizes[id] = { wStep: 2, hStep: 1 };
    sizes[id].wStep = Math.max(1, Math.min(4, (sizes[id].wStep || 2) + delta));
    this._savePanelSizes();
    this.renderOverview();
  },

  _changePanelHeight(id, delta) {
    const sizes = this._getPanelSizes();
    if (!sizes[id]) sizes[id] = { cols: 1, hStep: 1 };
    sizes[id].hStep = Math.max(0, Math.min(11, sizes[id].hStep + delta));
    this._savePanelSizes();
    this.renderOverview();
  },

  // ── Edit mode toggle ──────────────────────────────────────
  toggleEditMode() {
    this._editMode = !this._editMode;
    this._updateTopbarActions();
    this.renderOverview();
  },

  _registerPanels() {
    UI.registerPagePanels('budget', [
      { id: 'budget-panel-summary',    label: UI.t('bud_summary_title')      },
      { id: 'budget-panel-daily',      label: UI.t('bud_panel_daily')        },
      { id: 'budget-panel-pie',        label: UI.t('bud_panel_pie')          },
      { id: 'budget-panel-inc',        label: UI.t('bud_panel_timeline')     },
      { id: 'budget-panel-subcats',    label: UI.t('bud_panel_subcats')      },
      { id: 'budget-panel-nethistory', label: UI.t('bud_panel_net_history')  },
    ]);
  },

  // ── Overview panel grid ───────────────────────────────────
  renderOverview() {
    const order      = this._getPanelOrder();
    const sizes      = this._getPanelSizes();
    const grid       = document.getElementById('overview-panels-grid');
    if (!grid) return;

    const PANEL_H = [80, 120, 170, 230, 300, 380, 470, 580, 700, 840, 1000, 1200];
    const editCls  = this._editMode ? ' budget-panel-drag-enabled' : '';
    const dragAttr = this._editMode ? 'draggable="true"' : '';
    const grip     = this._editMode
      ? '<svg data-lucide="grip-vertical" class="drag-handle-icon"></svg>'
      : '';

    const ctrlBtn = (icon, onclick, title) =>
      `<button class="btn btn-icon btn-secondary"
        style="width:1.375rem;height:1.375rem;min-width:1.375rem;padding:0"
        onclick="event.stopPropagation();${onclick}" data-tooltip="${title}">
        <svg data-lucide="${icon}" style="width:0.6875rem;height:0.6875rem"></svg>
      </button>`;

    const sizeCtrl = (id, isChart) => {
      if (!this._editMode) return '';
      const hBtns = isChart
        ? ctrlBtn('chevron-up',    `Budget._changePanelHeight('${id}',-1)`, UI.t('bud_shrink_height')) +
          ctrlBtn('chevron-down',  `Budget._changePanelHeight('${id}',1)`,  UI.t('bud_grow_height'))
        : '';
      const wBtns = ctrlBtn('chevron-left',  `Budget._changePanelWidth('${id}',-1)`, UI.t('bud_collapse')) +
                    ctrlBtn('chevron-right', `Budget._changePanelWidth('${id}',1)`,  UI.t('bud_expand'));
      return `<div style="display:flex;align-items:center;gap:3px;margin-left:auto;padding-left:6px">
        ${hBtns}${wBtns}
      </div>`;
    };

    const chartPanel = (id, title, canvasId) => {
      const sz = sizes[id] || { cols: 1, hStep: 1 };
      return `
        <div class="panel-header">${grip}<span class="panel-title" style="font-size:0.9375rem">${title}</span>${sizeCtrl(id, true)}</div>
        <div class="panel-body" style="padding:0.75rem 1rem">
          <div style="height:${PANEL_H[sz.hStep]}px;position:relative"><canvas id="${canvasId}"></canvas></div>
        </div>`;
    };

    const defs = {
      'budget-panel-inc':        () => chartPanel('budget-panel-inc',        UI.t('bud_panel_timeline'),    'incExpChart'),
      'budget-panel-pie':        () => chartPanel('budget-panel-pie',        UI.t('bud_panel_pie'),         'allocPieChart'),
      'budget-panel-nethistory': () => {
        const cnt = Math.max(12, (Store.get('budget_cycles') || []).length + 1);
        return chartPanel('budget-panel-nethistory', UI.t('bud_net_history_title', cnt), 'netHistoryChart');
      },
      'budget-panel-summary': () => `
        <div class="panel-header">
          ${grip}
          <span class="panel-title" style="font-size:0.9375rem">${UI.t('bud_summary_title')}</span>
          ${sizeCtrl('budget-panel-summary', false)}
        </div>
        <div id="budget-summary-table"></div>`,
      'budget-panel-daily': () => {
        const sz  = sizes['budget-panel-daily'] || { hStep: 3 };
        const open = !!this._detailsOpen['daily'];
        const chevron = open ? 'chevron-up' : 'chevron-down';
        const dfFrom  = this._dailyFilterFrom;
        const dfTo    = this._dailyFilterTo;
        const dLabel  = (dfFrom && dfTo)
          ? (dfFrom === dfTo ? UI.formatDate(dfFrom) : `${UI.formatDate(dfFrom)} – ${UI.formatDate(dfTo)}`)
          : UI.t('bud_filter_date');
        const dColor  = (dfFrom || dfTo) ? 'var(--text-primary)' : 'var(--text-secondary)';
        const navBtn = (icon, fn, tip) =>
          `<button type="button" onclick="${fn}"
            data-tooltip="${tip}" data-tooltip-pos="top"
            style="display:flex;align-items:center;justify-content:center;width:1.75rem;height:1.75rem;
                   box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);
                   border-radius:var(--radius-sm);cursor:pointer;flex-shrink:0">
            <svg data-lucide="${icon}" style="width:0.8125rem;height:0.8125rem;color:var(--text-secondary)"></svg>
          </button>`;
        return `
          <div class="panel-header">${grip}<span class="panel-title" style="font-size:0.9375rem">${UI.t('bud_panel_daily')}</span>
            <div style="display:inline-flex;align-items:center;gap:0.25rem;flex-shrink:0;margin-left:auto">
              ${navBtn('chevron-left',  "Budget._shiftDailyDateRange(-1)", '−1 gün')}
              ${navBtn('chevron-right', "Budget._shiftDailyDateRange(1)",  '+1 gün')}
              <div style="position:relative;display:inline-flex;height:1.75rem;flex-shrink:0">
                <button type="button" id="dailyFilterDateBtn" onclick="Budget._toggleDailyDateFilter()"
                  style="display:flex;align-items:center;gap:6px;padding:0 0.5rem;height:1.75rem;box-sizing:border-box;
                         background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;white-space:nowrap">
                  <svg data-lucide="calendar" style="width:0.8125rem;height:0.8125rem;color:var(--text-muted);flex-shrink:0"></svg>
                  <span id="dailyFilterDateLabel" style="font-size:0.75rem;color:${dColor}">${dLabel}</span>
                </button>
                <input type="hidden" id="dailyFilterFrom" value="${dfFrom}">
                <input type="hidden" id="dailyFilterTo" value="${dfTo}">
              </div>
            </div>
            ${sizeCtrl('budget-panel-daily', true)}</div>
          <div class="panel-body" style="padding:0.75rem 1rem">
            <div style="height:${PANEL_H[sz.hStep]}px;position:relative"><canvas id="dailySpendChart"></canvas></div>
            <div id="dailySpendLegend" style="display:flex;flex-wrap:wrap;gap:0.375rem 0.875rem;padding:0.5rem 0 0;justify-content:center"></div>
          </div>
          <div class="budget-details-toggle" onclick="Budget.toggleDetails('daily', this)">
            <span>${UI.t('bud_details')}</span>
            <svg data-lucide="${chevron}" id="daily-toggle-icon" style="width:0.875rem;height:0.875rem"></svg>
          </div>
          <div id="budget-daily-table" style="display:none"></div>`;
      },
      'budget-panel-subcats': () => {
        const sz  = sizes['budget-panel-subcats'] || { hStep: 3 };
        const open = !!this._detailsOpen['subcats'];
        const chevron = open ? 'chevron-up' : 'chevron-down';
        return `
          <div class="panel-header">${grip}<span class="panel-title" style="font-size:0.9375rem">${UI.t('bud_panel_subcats')}</span>${sizeCtrl('budget-panel-subcats', true)}</div>
          <div class="panel-body" style="padding:0.75rem 1rem">
            <div style="height:${PANEL_H[sz.hStep]}px;position:relative"><canvas id="subcatDoughnut"></canvas></div>
          </div>
          <div class="budget-details-toggle" onclick="Budget.toggleDetails('subcats', this)">
            <span>${UI.t('bud_details')}</span>
            <svg data-lucide="${chevron}" id="subcats-toggle-icon" style="width:0.875rem;height:0.875rem"></svg>
          </div>
          <div id="budget-subcats-table" style="display:none"></div>`;
      },
    };

    const validOrder = order.filter(id => defs[id] && UI.isPanelVisible(id));
    const getWStep = id => {
      const sz = sizes[id] || {};
      if (sz.wStep !== undefined) return sz.wStep;
      if (sz.cols === 2) return 4;
      return 2;
    };

    grid.innerHTML = this._applyFontScale(validOrder.map(id => {
      const colStyle = `grid-column:span ${getWStep(id)};`;
      return `<div id="${id}" class="panel budget-draggable-panel${editCls}" ${dragAttr} style="${colStyle}">${defs[id]()}</div>`;
    }).join(''));

    lucide.createIcons({ nodes: [grid] });

    if (this._editMode) this._initDragEvents();

    this.renderCharts();
    this.renderSummaryTable();
  },

  _applyRowSpans() { /* CSS grid auto-placement handles layout — no manual row calculation needed */ },

  // ── Drag & drop ───────────────────────────────────────────
  _initDragEvents() {
    const panels = [...document.querySelectorAll('#overview-panels-grid .budget-draggable-panel')];
    let dragSrcId = null;

    panels.forEach(panel => {
      panel.addEventListener('dragstart', e => {
        dragSrcId = panel.id;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => panel.classList.add('budget-panel-dragging'), 0);
      });

      panel.addEventListener('dragend', () => {
        panel.classList.remove('budget-panel-dragging');
        panels.forEach(p => p.classList.remove('budget-panel-drag-over'));
      });

      panel.addEventListener('dragover', e => {
        e.preventDefault();
        if (panel.id !== dragSrcId) {
          panels.forEach(p => p.classList.remove('budget-panel-drag-over'));
          panel.classList.add('budget-panel-drag-over');
        }
      });

      panel.addEventListener('dragleave', e => {
        if (!panel.contains(e.relatedTarget)) panel.classList.remove('budget-panel-drag-over');
      });

      panel.addEventListener('drop', e => {
        e.preventDefault();
        panel.classList.remove('budget-panel-drag-over');
        if (!dragSrcId || dragSrcId === panel.id) return;
        const order = this._getPanelOrder();
        const si = order.indexOf(dragSrcId);
        const di = order.indexOf(panel.id);
        if (si !== -1 && di !== -1) {
          [order[si], order[di]] = [order[di], order[si]];
          this._savePanelOrder();
          this.renderOverview();
        }
      });
    });
  },

  _bindEvents() {
    document.getElementById('searchTx').addEventListener('input', () => this.renderTransactions());
  },

  // ── Modal openers ────────────────────────────────────────
  openAddGroup() {
    const html = `
      <form id="addGroupForm" style="display:flex;flex-direction:column;gap:16px">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_group_name_label')}</label>
          <input class="form-control" type="text" name="groupName" placeholder="${UI.t('bud_group_name_placeholder')}">
        </div>
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('lbl_type')}</label>
            <button type="button" id="addGroupTypeBtn" onclick="Budget.openGroupTypeDropdown(this)"
              style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
              <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${UI.t('bud_type_expense')}</span>
              <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
            </button>
            <input type="hidden" id="groupTypeHidden" name="groupType" value="expense">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('lbl_color')}</label>
            <button type="button" id="addGroupColorBtn"
              style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;
                     background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
              <span id="addGroupColorSwatch" style="width:1rem;height:1rem;border-radius:3px;background:#7C6CFC;
                    flex-shrink:0;border:1px solid rgba(255,255,255,.15)"></span>
              <span id="addGroupColorHex" class="mono" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">#7C6CFC</span>
              <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
            </button>
            <input type="hidden" name="groupColor" id="addGroupColorInput" value="#7C6CFC">
          </div>
        </div>
      </form>`;
    this._addGroupModal = new CustomModal({
      title:   UI.t('bud_add_group_modal'),
      content: html,
      width:   380,
      zIndex:  1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   icon: 'folder-plus', onClick: () => this.saveGroup() },
      ],
    });
    this._addGroupModal.open();
    lucide.createIcons({ nodes: [this._addGroupModal.getBody()] });
    this._addGroupColorPicker = new CustomColorPicker({
      btn:   'addGroupColorBtn',
      input: 'addGroupColorInput',
      align: 'left',
      onChange: hex => {
        const sw = document.getElementById('addGroupColorSwatch');
        const lb = document.getElementById('addGroupColorHex');
        if (sw) sw.style.background = hex;
        if (lb) lb.textContent = hex.toUpperCase();
      },
    });
    document.getElementById('addGroupColorBtn').addEventListener('click', e => {
      e.stopPropagation();
      this._addGroupColorPicker.toggle();
    });
    document.getElementById('addGroupForm').addEventListener('submit', e => { e.preventDefault(); this.saveGroup(); });
  },

  openAddTx() {
    const html = `
      <form id="addTxForm" style="display:flex;flex-direction:column;gap:16px">
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('lbl_date')}</label>
            <button type="button" id="txDateBtn" onclick="Budget._toggleTxDatePicker('add')"
              style="width:100%;display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
              <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
              <span id="txDateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
            </button>
            <input type="hidden" name="txDate" id="txDateInput" value="">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('bud_amount_label')}</label>
            <input class="form-control" type="number" name="txAmount" min="0" step="0.01" placeholder="0.00">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_desc_label')}</label>
          <input class="form-control" type="text" name="txDesc" placeholder="${UI.t('bud_tx_desc_placeholder')}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_sub_cat_label')}</label>
          <button type="button" id="txSubBtn" onclick="Budget.openTxSubDropdown(this, 'txSubHidden')"
            style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-muted);text-align:left">${UI.t('bud_select_sub')}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="txSubHidden" name="txSubSel" value="">
        </div>
      </form>`;
    this._addTxModal = new CustomModal({
      title:        UI.t('bud_add_trans_modal'),
      content:      html,
      width:        480,
      zIndex:       1050,
      buttons: [
        { label: UI.t('btn_cancel'),       variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('bud_add_continue'), variant: 'secondary', onClick: () => this.saveTxAndContinue() },
        { label: UI.t('btn_add'),          variant: 'primary',   onClick: () => this.saveTx() },
      ],
    });
    this._addTxModal.open();

    const today = UI.today();
    document.getElementById('txDateInput').value = today;
    this._applyTxDateLabel('add', today);

    this._addTxCdp = new CustomDatePicker({
      btn: 'txDateBtn', input: 'txDateInput', align: 'left',
      onSelect: date => this._applyTxDateLabel('add', date),
    });
    lucide.createIcons({ nodes: [this._addTxModal.getBody()] });
    document.getElementById('addTxForm').addEventListener('submit', e => { e.preventDefault(); this.saveTx(); });
  },

  openEditTx(id) {
    const { transactions, groups } = Store.getBudget();
    const t = transactions.find(t => t.id === id);
    if (!t) return;

    const html = `
      <form id="editTxForm" style="display:flex;flex-direction:column;gap:16px">
        <input type="hidden" name="editTxId">
        <div class="form-row" style="margin-bottom:0">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('lbl_date')}</label>
            <button type="button" id="editTxDateBtn" onclick="Budget._toggleTxDatePicker('edit')"
              style="width:100%;display:flex;align-items:center;gap:6px;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
              <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
              <span id="editTxDateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
            </button>
            <input type="hidden" name="editTxDate" id="editTxDateInput" value="">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">${UI.t('bud_amount_label')}</label>
            <input class="form-control" type="number" name="editTxAmount" min="0" step="0.01" placeholder="0.00">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_edit_desc_label')}</label>
          <input class="form-control" type="text" name="editTxDesc" placeholder="${UI.t('bud_tx_desc_placeholder')}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_sub_cat_label')}</label>
          <button type="button" id="editTxSubBtn" onclick="Budget.openTxSubDropdown(this, 'editTxSubHidden')"
            style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-muted);text-align:left">${UI.t('bud_select_sub')}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="editTxSubHidden" name="editTxSubSel" value="">
        </div>
      </form>`;
    this._editTxModal = new CustomModal({
      title:        UI.t('bud_edit_tx_modal'),
      content:      html,
      width:        480,
      zIndex:       1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => this.saveEditTx() },
      ],
    });
    this._editTxModal.open();

    const f = document.getElementById('editTxForm');
    f.editTxId.value     = t.id;
    document.getElementById('editTxDateInput').value = t.date;
    this._applyTxDateLabel('edit', t.date);
    f.editTxAmount.value = t.amount;
    f.editTxDesc.value   = t.desc;
    document.getElementById('editTxSubHidden').value = t.subId;
    const g = groups.find(g => g.subs.some(s => s.id === t.subId));
    const s = g?.subs.find(s => s.id === t.subId);
    const editBtn = document.getElementById('editTxSubBtn');
    if (editBtn) editBtn.querySelector('.dd-label').textContent = g && s ? `${g.name} · ${s.name}` : UI.t('bud_select_sub');

    this._editTxCdp = new CustomDatePicker({
      btn: 'editTxDateBtn', input: 'editTxDateInput', align: 'left',
      onSelect: date => this._applyTxDateLabel('edit', date),
    });
    lucide.createIcons({ nodes: [this._editTxModal.getBody()] });
    f.addEventListener('submit', e => { e.preventDefault(); this.saveEditTx(); });
  },

  openTxSubDropdown(btn, hiddenId) {
    const { groups } = Store.getBudget();
    if (!groups.some(g => g.subs.length)) { UI.toast(UI.t('bud_no_subs_hint'), 'info'); return; }
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const { groups } = Store.getBudget();
          const cur = document.getElementById(hiddenId)?.value || '';
          const items = [];
          groups.forEach(g => g.subs.forEach(s => items.push({ value: s.id, label: `${g.name} · ${s.name}`, active: s.id === cur })));
          dd.setItems(items);
        },
        onSelect: (val) => {
          const inp = document.getElementById(hiddenId);
          if (inp) inp.value = val;
          const { groups } = Store.getBudget();
          let label = UI.t('bud_select_sub');
          groups.forEach(g => g.subs.forEach(s => { if (s.id === val) label = `${g.name} · ${s.name}`; }));
          const lbl = btn.querySelector('.dd-label');
          if (lbl) { lbl.style.color = 'var(--text-primary)'; lbl.textContent = label; }
        },
        minWidth: 240, align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  openGroupTypeDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = document.getElementById('groupTypeHidden')?.value || 'expense';
          dd.setItems([
            { value: 'expense', label: UI.t('bud_type_expense'), active: cur === 'expense' },
            { value: 'income',  label: UI.t('bud_type_income'),  active: cur === 'income'  },
          ]);
        },
        onSelect: (val) => {
          const inp = document.getElementById('groupTypeHidden');
          if (inp) inp.value = val;
          btn.querySelector('.dd-label').textContent = val === 'expense' ? UI.t('bud_type_expense') : UI.t('bud_type_income');
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  openAddSub(groupId) {
    this.activeGroup = groupId;
    const { groups } = Store.getBudget();
    const g = groups.find(g => g.id === groupId);
    const title = g ? UI.t('bud_add_sub_for', g.name) : UI.t('bud_add_sub_modal');
    const html = `
      <form id="addSubForm" style="display:flex;flex-direction:column;gap:16px">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_sub_name_label')}</label>
          <input class="form-control" type="text" name="subName" placeholder="${UI.t('bud_sub_name_placeholder')}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_monthly_budget')}</label>
          <input class="form-control" type="number" name="subBudget" min="0" step="1" placeholder="0">
        </div>
      </form>`;
    this._addSubModal = new CustomModal({
      title,
      content: html,
      width:   380,
      zIndex:  1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => this.saveSub() },
      ],
    });
    this._addSubModal.open();
    document.getElementById('addSubForm').addEventListener('submit', e => { e.preventDefault(); this.saveSub(); });
  },

  // ── KPIs ─────────────────────────────────────────────────
  renderKPIs() {
    const { groups, transactions } = Store.getBudget();
    const totalInc       = transactions.filter(t => t.type === 'income').reduce((a,t) => a+t.amount, 0);
    const totalExp       = transactions.filter(t => t.type === 'expense').reduce((a,t) => a+t.amount, 0);
    const net            = totalInc - totalExp;
    const totalIncBudget = groups.filter(g => g.type === 'income').reduce((a,g) => a+g.subs.reduce((b,s) => b+(+s.budget||0), 0), 0);
    const totalBudgetExp = groups.filter(g => g.type === 'expense').reduce((a,g) => a+g.subs.reduce((b,s) => b+(+s.budget||0), 0), 0);
    // Kalan = planlanan gelir - planlanan gider (bütçe özeti KALAN satırıyla eşleşir)
    const kalan          = totalIncBudget - totalBudgetExp;
    const kalanVal       = kalan < 0
      ? `<span style="color:var(--red)">${UI.maskCurrency(kalan, this.cur)}</span>`
      : UI.maskCurrency(kalan, this.cur);
    const pctLeft        = totalBudgetExp ? Math.round((1 - totalExp / totalBudgetExp) * 100) : 100;

    const cards = [
      { label: UI.t('bud_total_income'),  value: UI.maskCurrency(totalInc,this.cur), mono:true, change:UI.t('bud_this_period'),                         changeUp:true,    icon:'arrow-down-circle', iconColor:'#34D399' },
      { label: UI.t('bud_total_expense'), value: UI.maskCurrency(totalExp,this.cur), mono:true, change:UI.t('bud_this_period'),                         changeUp:false,   icon:'arrow-up-circle',   iconColor:'#F87171' },
      { label: UI.t('bud_net_balance'),   value: UI.maskCurrency(net,this.cur),      mono:true, change:net>=0?UI.t('bud_positive'):UI.t('bud_negative'), changeUp:net>=0,  icon:'bar-chart-2',       iconColor:'#7C6CFC' },
      { label: UI.t('bud_balance_kpi'),   value: kalanVal,                            mono:true, change:UI.t('bud_kpi_pct_left', pctLeft),               changeUp:kalan>=0, icon:'wallet',            iconColor:'#FBBF24' },
    ];
    const grid = document.getElementById('kpi-grid');
    grid.innerHTML = cards.map(c => UI.kpiCard(c)).join('');
    grid.className = 'kpi-grid';
    lucide.createIcons({ nodes: [grid] });
  },

  // ── Charts ───────────────────────────────────────────────
  renderCharts() {
    const { groups, transactions } = Store.getBudget();
    const expGroups = groups.filter(g => g.type === 'expense');
    const fmt = v => (v >= 1000 ? (v/1000).toFixed(0)+'B' : v) + this.cur;

    // Doughnut: Harcama Dağılımı (maks 10 kategori)
    if (expGroups.length) {
      let entries = expGroups.map(g => ({
        name:  g.name,
        color: g.color,
        real:  transactions.filter(t => t.groupId === g.id).reduce((a, t) => a + t.amount, 0),
      }));
      entries.sort((a, b) => b.real - a.real);
      const totalReal = entries.reduce((a, e) => a + e.real, 0);

      const TOP = 10;
      let display = entries.slice(0, TOP);
      if (entries.length > TOP) {
        const otherReal = entries.slice(TOP).reduce((a, e) => a + e.real, 0);
        if (otherReal > 0) display.push({ name: UI.t('bud_others'), color: '#6B7280', real: otherReal });
      }

      const labels  = display.map(e => e.name);
      const pieData = display.map(e => totalReal > 0 ? Math.round(e.real / totalReal * 100) : 0);

      if (this._pieChart) this._pieChart.destroy();
      this._pieChart = Charts.doughnut('allocPieChart', labels, pieData, {
        colors: display.map(e => e.color),
        extra: {
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: c => ` ${c.label}: %${c.parsed} (${UI.maskCurrency(display[c.dataIndex].real, this.cur)})` } }
          }
        }
      });
    }

    // 2. Horizontal Bar: Gelir vs Gider
    const totalInc = transactions.filter(t => t.type === 'income').reduce((a,t) => a+t.amount, 0);
    const totalExp = transactions.filter(t => t.type === 'expense').reduce((a,t) => a+t.amount, 0);

    Charts._destroy('incExpChart');
    const incExpCtx = document.getElementById('incExpChart');
    if (incExpCtx) {
      this._incExpChart = new Chart(incExpCtx, {
        type: 'bar',
        data: {
          labels: [UI.t('bud_income_label'), UI.t('bud_expense_label')],
          datasets: [{
            data: [totalInc, totalExp],
            backgroundColor: [_cv('--green') + 'BF', _cv('--red') + 'BF'],
            borderColor: [_cv('--green'), _cv('--red')],
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: c => ` ${UI.formatCurrency(c.parsed.x, this.cur)}` } }
          },
          scales: {
            x: { grid:{ color:_cv('--border') }, border:{ display:false }, ticks:{ color:_cv('--text-secondary'), font:{ size:11 }, callback: fmt } },
            y: { grid:{ display:false }, border:{ display:false }, ticks:{ color:_cv('--text-secondary'), font:{ size:13, weight:'600' } } }
          }
        }
      });
    }

    this.renderDailyChart();
    this.renderSubcatsPanel();
    this.renderNetHistoryChart();
  },

  // ── Daily Spending Chart ──────────────────────────────────
  renderDailyChart() {
    const { groups, transactions } = Store.getBudget();
    if (!document.getElementById('dailySpendChart')) return;

    this._initDailyCdp();

    // Filtre aktifse geçmiş döngü verilerini de dahil et
    let allGroups = [...groups];
    let allTx     = [...transactions];
    if (this._dailyFilterFrom || this._dailyFilterTo) {
      const fFrom = this._dailyFilterFrom || '0000-00-00';
      const fTo   = this._dailyFilterTo   || '9999-99-99';
      (Store.get('budget_cycles') || []).forEach(cycle => {
        if ((cycle.end || '') < fFrom || (cycle.start || '') > fTo) return;
        if (cycle.transactions) allTx = allTx.concat(cycle.transactions);
        if (cycle.groups) cycle.groups.forEach(g => {
          if (!allGroups.find(ag => ag.id === g.id)) allGroups.push(g);
        });
      });
    }

    const expGroups = allGroups.filter(g => g.type === 'expense');
    const expTx     = allTx.filter(t => t.type === 'expense');

    // Varsayılan: mevcut döngü; filtre aktifse filtre aralığı
    const cfg        = Store.get('budget_cfg') || {};
    const cycleDay   = cfg.cycleDay || 1;
    const cycleStart = cfg.lastCycleStart || this._calcCycleStart(cycleDay);
    const [sy, sm, sd] = cycleStart.split('-').map(Number);
    let startDate    = new Date(sy, sm - 1, sd);
    let endDate      = new Date(sy, sm, sd);
    endDate.setDate(endDate.getDate() - 1);

    if (this._dailyFilterFrom) {
      const [fy, fm, fd] = this._dailyFilterFrom.split('-').map(Number);
      startDate = new Date(fy, fm - 1, fd);
    }
    if (this._dailyFilterTo) {
      const [ty, tm, td] = this._dailyFilterTo.split('-').map(Number);
      endDate = new Date(ty, tm - 1, td);
    }

    const today    = UI.today();
    this._dailyRenderedFrom = this._localDateStr(startDate);
    this._dailyRenderedTo   = this._localDateStr(endDate);

    const allCycleDates = [];
    const cur = new Date(startDate);
    while (cur <= endDate) {
      allCycleDates.push(this._localDateStr(cur));
      cur.setDate(cur.getDate() + 1);
    }

    // İşlem olan tarihler detay tablosu için ayrı hesaplanır (filtre aralığına göre)
    const txDates = [...new Set(transactions
      .filter(t => t.date >= this._localDateStr(startDate) && t.date <= this._localDateStr(endDate))
      .map(t => t.date))].sort();

    if (!allCycleDates.length) { Charts._destroy('dailySpendChart'); return; }

    const todayIdx = allCycleDates.indexOf(today);
    const labels   = allCycleDates.map(d => { const [,m,day] = d.split('-'); return `${parseInt(day)}/${parseInt(m)}`; });

    const activeGroups = expGroups;

    // Her grup için ham günlük değerler
    const rawGroupData = activeGroups.map(g =>
      allCycleDates.map(d => expTx.filter(t => t.groupId === g.id && t.date === d).reduce((a,t) => a+t.amount, 0))
    );

    // Doğal sırada render; Chart.js stacked Y ekseni yığılımı yönetir
    const renderDatasets = activeGroups.map((g, gi) => ({
      label: g.name,
      data:  rawGroupData[gi],
      color: g.color,
    }));

    // Bugün çizgisi plugin'i
    const todayLinePlugin = {
      id: 'dailyTodayLine',
      afterDraw(chart) {
        if (todayIdx < 0) return;
        const { ctx, chartArea, scales } = chart;
        const x = scales.x.getPixelForValue(todayIdx);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, chartArea.top);
        ctx.lineTo(x, chartArea.bottom);
        ctx.lineWidth   = 1.5;
        ctx.strokeStyle = _cv('--accent');
        ctx.globalAlpha = 0.6;
        ctx.setLineDash([4, 3]);
        ctx.stroke();
        ctx.restore();
      }
    };

    const fmt = v => (v >= 1000 ? (v/1000).toFixed(0)+'B' : v) + this.cur;
    Charts._destroy('dailySpendChart');
    Charts._applyDefaults();
    const canvas = document.getElementById('dailySpendChart');
    if (!canvas) return;

    const PAL     = [_cv('--chart-1'), _cv('--chart-2'), _cv('--chart-3'), _cv('--chart-4'), _cv('--chart-5'), _cv('--chart-6')];
    const textSec = _cv('--text-secondary');
    const border  = _cv('--border');
    const bgBase  = _cv('--bg-base');

    this._dailyChart = new Chart(canvas, {
      type:    'line',
      plugins: [todayLinePlugin],
      data: {
        labels,
        datasets: renderDatasets.map((d, ri) => {
          const col   = d.color || PAL[ri % PAL.length];
          const ghost = ri > 0; // Harcamalar (ri=0) taban — hiçbir zaman gizlenmez
          return {
            label:                     d.label,
            data:                      d.data,
            borderColor:               col,
            backgroundColor:           col + '80',
            tension:                   0.2,
            fill:                      ri === 0 ? 'origin' : '-1',
            pointRadius:               ghost ? (ctx => ctx.raw === 0 ? 0 : 4) : 2,
            pointBackgroundColor:      ghost ? (ctx => ctx.raw === 0 ? 'transparent' : col) : col,
            pointBorderColor:          'transparent',
            pointHoverRadius:          ghost ? (ctx => ctx.raw === 0 ? 0 : 8) : 6,
            pointHoverBackgroundColor: col,
            pointHoverBorderColor:     bgBase,
            pointHoverBorderWidth:     2,
            borderWidth:               ri === 2 ? 3 : 2,
            ...(ghost && {
              segment: {
                borderColor:     ctx => ctx.p0.raw === 0 && ctx.p1.raw === 0 ? 'transparent' : col,
                backgroundColor: ctx => ctx.p0.raw === 0 && ctx.p1.raw === 0 ? 'transparent' : col + '66',
              },
            }),
          };
        })
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        animation:           false,
        interaction:         { mode: 'nearest', intersect: false },
        scales: {
          x: { grid:{ display:false }, border:{ display:false }, ticks:{ color:textSec, font:{ size:11 }, maxRotation:0, autoSkip:true, autoSkipPadding:12 } },
          y: { stacked: true, grid:{ color:border }, border:{ display:false }, ticks:{ color:textSec, font:{ size:11 }, callback: fmt }, beginAtZero:true }
        },
        plugins: {
          legend:  { display: false },
          tooltip: {
            mode:      'index',
            intersect: false,
            position:  'nearest',
            bodyColor:  '#e8e8e8',
            footerColor: '#ffffff',
            callbacks: {
              label: c => {
                const raw = c.raw ?? 0;
                return raw > 0 ? ` ${c.dataset.label}: ${UI.formatCurrency(raw, this.cur)}` : null;
              },
              footer: items => {
                const total = items.reduce((sum, c) => sum + (c.raw ?? 0), 0);
                return total > 0 ? `Toplam: ${UI.formatCurrency(total, this.cur)}` : null;
              },
            }
          }
        }
      }
    });

    // HTML legend — bottom-aligned box + label
    const legendEl = document.getElementById('dailySpendLegend');
    if (legendEl) {
      legendEl.innerHTML = renderDatasets.map((d, ri) => {
        const col = d.color || PAL[ri % PAL.length];
        return `<div style="display:flex;align-items:flex-end;gap:0.3125rem">` +
          `<span style="width:0.625rem;height:0.625rem;background:${col};border-radius:0.125rem;flex-shrink:0"></span>` +
          `<span style="font-size:0.6875rem;color:${textSec};line-height:1">${d.label}</span>` +
          `</div>`;
      }).join('');
    }

    // Detay tablosu — bakiyeyi eski→yeni hesapla, sonra tersine çevirerek göster
    const tableEl = document.getElementById('budget-daily-table');
    if (!tableEl) return;
    const thS = 'padding:0.5rem 0.625rem;font-size:0.5625rem;font-weight:700;letter-spacing:.1em;color:var(--text-secondary);border-bottom:1px solid var(--border);white-space:nowrap';
    let balance = 0;
    const rowData = txDates.map(d => {
      const dayTx = transactions.filter(t => t.date === d);
      const inc   = dayTx.filter(t => t.type === 'income').reduce((a,t) => a+t.amount, 0);
      const exp   = dayTx.filter(t => t.type === 'expense').reduce((a,t) => a+t.amount, 0);
      balance += inc - exp;
      return { d, inc, exp, balance };
    });
    const tableRows = [...rowData].reverse().map(({ d, inc, exp, balance }) => {
      const balColor = balance >= 0 ? 'var(--green)' : 'var(--red)';
      return `<tr style="border-bottom:1px solid var(--border)">
        <td class="mono" style="padding:0.5rem 0.75rem;font-size:0.75rem;color:var(--text-secondary)">${UI.formatDate(d)}</td>
        <td class="mono pos" style="text-align:right;padding:0.5rem 0.625rem;font-size:0.75rem">${inc > 0 ? UI.maskCurrency(inc, this.cur) : '<span style="color:var(--text-muted)">—</span>'}</td>
        <td class="mono neg" style="text-align:right;padding:0.5rem 0.625rem;font-size:0.75rem">${exp > 0 ? UI.maskCurrency(exp, this.cur) : '<span style="color:var(--text-muted)">—</span>'}</td>
        <td class="mono" style="text-align:right;padding:0.5rem 0.75rem;font-size:0.75rem;font-weight:600;color:${balColor}">${UI.maskCurrency(balance, this.cur)}</td>
      </tr>`;
    }).join('');
    tableEl.innerHTML = this._applyFontScale(`<div style="overflow-x:auto;max-height:21.25rem;overflow-y:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead style="position:sticky;top:0;z-index:1;background:var(--bg-surface)"><tr style="background:var(--bg-elevated)">
          <th style="${thS};text-align:left">${UI.t('bud_date_col')}</th>
          <th style="${thS};text-align:right">${UI.t('bud_daily_inc_col')}</th>
          <th style="${thS};text-align:right">${UI.t('bud_daily_exp_col')}</th>
          <th style="${thS};text-align:right">${UI.t('bud_daily_balance')}</th>
        </tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>`);
    this._refreshOverlayIfOpen('daily');
  },

  // ── Subcategory Analysis Panel ────────────────────────────
  renderSubcatsPanel() {
    const { groups, transactions } = Store.getBudget();
    const table = document.getElementById('budget-subcats-table');
    if (!table) return;

    const expGroups = groups.filter(g => g.type === 'expense');
    const rows = [];
    expGroups.forEach(g => {
      g.subs.forEach(s => {
        const real = transactions.filter(t => t.subId === s.id).reduce((a,t) => a+t.amount, 0);
        rows.push({ name: s.name, budget: s.budget, real, color: g.color });
      });
    });
    rows.sort((a,b) => b.real - a.real);

    const totalReal = rows.reduce((a,r) => a+r.real, 0);

    // Doughnut — maks 7 legend kalemi, fazlası "Diğer" olarak gruplandırılır
    const nonZero = rows.filter(r => r.real > 0);
    const TOP = 7;
    let chartRows = nonZero.slice(0, TOP);
    if (nonZero.length > TOP) {
      const otherReal = nonZero.slice(TOP).reduce((a, r) => a + r.real, 0);
      if (otherReal > 0) chartRows.push({ name: UI.t('bud_others'), real: otherReal, color: '#6B7280', budget: 0 });
    }
    if (chartRows.length && document.getElementById('subcatDoughnut')) {
      if (this._subcatChart) this._subcatChart.destroy();
      this._subcatChart = Charts.doughnut(
        'subcatDoughnut',
        chartRows.map(r => r.name),
        chartRows.map(r => totalReal > 0 ? parseFloat((r.real/totalReal*100).toFixed(1)) : 0),
        {
          colors: chartRows.map(r => r.color),
          tip: c => ` ${c.label}: ${c.parsed.toFixed(1)}%`,
          extra: {
            plugins: {
              legend: { display:true, position:'left', labels:{ color:_cv('--text-secondary'), boxWidth:10, font:{ size:12 }, padding:10 } },
              tooltip: { callbacks: { label: c => ` ${c.label}: ${c.parsed.toFixed(1)}% (${UI.maskCurrency(chartRows[c.dataIndex].real, this.cur)})` } }
            }
          }
        }
      );
    }

    // Table
    if (!rows.length) { table.innerHTML = ''; return; }
    const thS = 'padding:0.5rem 0.625rem;font-size:0.5625rem;font-weight:700;letter-spacing:.1em;color:var(--text-secondary);border-bottom:1px solid var(--border);white-space:nowrap';
    const tableRows = rows.map(r => {
      const pct = totalReal > 0 ? (r.real/totalReal*100).toFixed(1) : '0.0';
      const over = r.real > r.budget && r.budget > 0;
      return `<tr style="border-bottom:1px solid var(--border)">
        <td style="padding:0.5rem 0.75rem">
          <div style="display:flex;align-items:center;gap:7px">
            <div style="width:7px;height:7px;border-radius:2px;background:${r.color};flex-shrink:0"></div>
            <span style="font-size:0.75rem;color:var(--text-primary)">${r.name}</span>
          </div>
        </td>
        <td style="text-align:right;padding:0.5rem 0.625rem;font-family:var(--font-mono);font-size:0.75rem;color:var(--text-secondary)">${UI.maskCurrency(r.budget, this.cur)}</td>
        <td style="text-align:right;padding:0.5rem 0.625rem;font-family:var(--font-mono);font-size:0.75rem;color:${r.real>0?'var(--text-primary)':'var(--text-muted)'}">${UI.maskCurrency(r.real, this.cur)}</td>
        <td style="text-align:right;padding:0.5rem 0.75rem;font-family:var(--font-mono);font-size:0.75rem;color:${over?'var(--red)':'var(--text-secondary)'}">${pct}%</td>
      </tr>`;
    }).join('');
    table.innerHTML = this._applyFontScale(`<div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead><tr style="background:var(--bg-elevated)">
          <th style="${thS};text-align:left">${UI.t('bud_sub_col')}</th>
          <th style="${thS};text-align:right">${UI.t('bud_budget_col')}</th>
          <th style="${thS};text-align:right">${UI.t('bud_actual_col')}</th>
          <th style="${thS};text-align:right">${UI.t('bud_perc_col')}</th>
        </tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>`);
    this._refreshOverlayIfOpen('subcats');
  },

  // ── Net History Chart ─────────────────────────
  renderNetHistoryChart() {
    if (!document.getElementById('netHistoryChart')) return;

    const cycles = Store.get('budget_cycles') || [];
    const past   = [...cycles].reverse(); // eskiden yeniye

    const { transactions } = Store.getBudget();
    const curNet = transactions.filter(t => t.type === 'income').reduce((a,t) => a+t.amount, 0)
                 - transactions.filter(t => t.type === 'expense').reduce((a,t) => a+t.amount, 0);

    // Gerçek veri noktaları: 1. Ay'dan başlar, aktif döngü en sonda, sonra 12'ye tamamlanır
    const realSlots = [
      ...past.map(c => ({ net: c.net, current: false, real: true })),
      { net: curNet, current: true, real: true },
    ];
    const SLOTS   = Math.max(12, realSlots.length);
    const padEnd  = SLOTS - realSlots.length;
    const slots   = [...realSlots, ...Array(padEnd).fill({ net: 0, current: false, real: false })];

    const labels   = slots.map((_, i) => UI.t('bud_net_month', i + 1));
    const nets     = slots.map(p => p.net);
    const ptColors = slots.map(p => {
      if (!p.real) return _cv('--accent');
      return p.current ? _cv('--accent') : (p.net >= 0 ? _cv('--green') : _cv('--red'));
    });
    const ptRadius = slots.map(p => {
      if (!p.real) return 3;
      return p.current ? 5 : 3;
    });

    const fmt = v => {
      const abs = Math.abs(v);
      return (v < 0 ? '-' : '') + (abs >= 1000 ? (abs / 1000).toFixed(1) + 'B' : String(Math.round(abs))) + this.cur;
    };

    this._netHistChart = Charts.line('netHistoryChart', labels, [{
      label: UI.t('bud_panel_net_history'),
      data: nets,
      pointColors: ptColors,
      pointRadius: ptRadius,
    }], {
      solidFill: true,
      monotone: true,
      tip: ctx => ` ${fmt(ctx.parsed.y)}${slots[ctx.dataIndex]?.current ? '  (aktif)' : ''}`,
      extra: {
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: _cv('--text-secondary'), maxRotation: 45, autoSkip: true },
          },
          y: {
            grid: { color: _cv('--border') },
            border: { display: false },
            ticks: { color: _cv('--text-secondary'), callback: fmt },
            afterDataLimits: scale => {
              const hasNeg = nets.some(v => v < 0);
              if (!hasNeg) {
                scale.min = 0;
              } else {
                if (scale.max < 0) scale.max = 0;
              }
              if (scale.min > 0) scale.min = 0;
              // Alt-1 aralığını önle: tick etiketleri anlamsız görünmesin
              if (scale.max - scale.min < 1) scale.max = scale.min + 1;
            },
          },
        },
      },
    });
  },

  // ── Budget Summary ────────────────────────────────────────
  renderSummaryTable() {
    const { groups, transactions } = Store.getBudget();
    const c = document.getElementById('budget-summary-table');
    if (!groups.length) {
      c.innerHTML = `<div style="padding:2.5rem;text-align:center;color:var(--text-muted)">
        ${UI.t('bud_no_groups_hint')}
      </div>`;
      return;
    }

    let totalIncBudget=0, totalIncReal=0, totalExpBudget=0, totalExpReal=0;
    const groupCalc = groups.map(g => {
      const gBudget = g.subs.reduce((a,s) => a+(+s.budget||0), 0);
      const gReal   = transactions.filter(t => t.groupId === g.id).reduce((a,t) => a+t.amount, 0);
      if (g.type === 'income') { totalIncBudget += gBudget; totalIncReal += gReal; }
      else                     { totalExpBudget += gBudget; totalExpReal += gReal; }
      return { g, gBudget, gReal };
    });

    const netBudget = totalIncBudget - totalExpBudget;
    const netReal   = totalIncReal   - totalExpReal;
    const totalBudgetAll = totalIncBudget + totalExpBudget;

    const thStyle = 'padding:0.5rem 0.625rem;font-size:0.5625rem;font-weight:700;letter-spacing:.1em;color:var(--text-secondary);border-bottom:1px solid var(--border);white-space:nowrap';

    const rows = groupCalc.map(({ g, gBudget, gReal }) => {
      const budgetPct = totalBudgetAll > 0 ? Math.round(gBudget / totalBudgetAll * 100) : 0;
      const realRef   = g.type === 'income' ? Math.max(totalIncReal, 1) : Math.max(totalExpReal, 1);
      const realPct   = realRef > 0 ? Math.round(gReal / realRef * 100) : 0;
      const utilPct   = gBudget > 0 ? Math.min(Math.round(gReal / gBudget * 100), 200) : 0;
      const over      = g.type === 'expense' ? gReal > gBudget : gReal < gBudget;
      const barCol    = over ? '#F87171' : utilPct > 75 ? '#FBBF24' : g.color;

      let ind, indColor;
      if (gBudget === 0 && gReal === 0) { ind = '—'; indColor = 'var(--text-muted)'; }
      else if (over) { ind = '▼'; indColor = 'var(--red)'; }
      else           { ind = '▲'; indColor = 'var(--green)'; }

      return `<tr style="border-bottom:1px solid var(--border)">
        <td style="padding:0.5625rem 0.75rem">
          <div style="display:flex;align-items:center;gap:7px">
            <div style="width:7px;height:7px;border-radius:2px;background:${g.color};flex-shrink:0"></div>
            <span style="font-weight:700;font-size:0.6875rem;letter-spacing:.05em;color:var(--text-primary)">${g.name.toUpperCase()}</span>
          </div>
        </td>
        <td style="text-align:right;padding:0.5625rem 0.625rem;font-family:var(--font-mono);font-size:0.6875rem;color:var(--text-primary)">${UI.maskCurrency(gBudget, this.cur)}</td>
        <td style="text-align:right;padding:0.5625rem 0.375rem;font-family:var(--font-mono);font-size:0.625rem;color:var(--text-muted)">${budgetPct}%</td>
        <td style="text-align:right;padding:0.5625rem 0.625rem;font-family:var(--font-mono);font-size:0.6875rem;color:${gReal>0?'var(--text-primary)':'var(--text-muted)'}">${UI.maskCurrency(gReal, this.cur)}</td>
        <td style="text-align:right;padding:0.5625rem 0.375rem;font-family:var(--font-mono);font-size:0.625rem;color:var(--text-muted)">${realPct}%</td>
        <td style="text-align:center;padding:0.5625rem 0.375rem;font-size:0.75rem;font-weight:700;color:${indColor}">${ind}</td>
        <td style="padding:0.5625rem 0.75rem">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="flex:1;height:0.3125rem;background:var(--bg-elevated);border-radius:0.1875rem;overflow:hidden;min-width:50px">
              <div style="height:100%;width:${Math.min(utilPct,100)}%;background:${barCol};border-radius:0.1875rem;transition:width .3s ease"></div>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.625rem;color:${over?'var(--red)':'var(--text-secondary)'};width:30px;text-align:right;flex-shrink:0">${utilPct}%</span>
          </div>
        </td>
      </tr>`;
    }).join('');

    const netUtilPct = Math.abs(netBudget) > 0 ? Math.min(Math.round(totalExpReal / Math.abs(netBudget) * 100), 999) : 0;
    const netColor   = netReal >= 0 ? 'var(--green)' : 'var(--red)';

    c.innerHTML = this._applyFontScale(`
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:var(--bg-elevated)">
            <th style="${thStyle};text-align:left">${UI.t('bud_source_col')}</th>
            <th style="${thStyle};text-align:right">${UI.t('bud_budget_col')}</th>
            <th style="${thStyle};text-align:right">%</th>
            <th style="${thStyle};text-align:right">${UI.t('bud_actual_col')}</th>
            <th style="${thStyle};text-align:right">%</th>
            <th style="${thStyle};text-align:center;width:18px"></th>
            <th style="${thStyle}">${UI.t('bud_usage_col')}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr style="background:var(--bg-elevated)">
            <td style="padding:0.6875rem 0.75rem;border-top:2px solid var(--border)">
              <span style="font-size:0.6875rem;font-weight:700;letter-spacing:.06em;color:var(--text-primary)">${UI.t('bud_remaining_footer')}</span>
            </td>
            <td style="text-align:right;padding:0.6875rem 0.625rem;font-family:var(--font-mono);font-size:0.6875rem;font-weight:700;color:${netBudget>=0?'var(--green)':'var(--red)'};border-top:2px solid var(--border)">${UI.maskCurrency(netBudget, this.cur)}</td>
            <td style="border-top:2px solid var(--border)"></td>
            <td style="text-align:right;padding:0.6875rem 0.625rem;font-family:var(--font-mono);font-size:0.6875rem;font-weight:700;color:${netColor};border-top:2px solid var(--border)">${UI.maskCurrency(netReal, this.cur)}</td>
            <td style="border-top:2px solid var(--border)"></td>
            <td style="text-align:center;padding:0.6875rem 0.375rem;font-size:0.75rem;font-weight:700;color:${netColor};border-top:2px solid var(--border)">${netReal>=0?'▲':'▼'}</td>
            <td style="padding:0.6875rem 0.75rem;border-top:2px solid var(--border)">
              <div style="display:flex;align-items:center;gap:6px">
                <div style="flex:1;height:0.3125rem;background:var(--bg-elevated);border-radius:0.1875rem;overflow:hidden;border:1px solid var(--border);min-width:50px">
                  <div style="height:100%;width:${Math.min(netUtilPct,100)}%;background:${netColor};border-radius:0.1875rem"></div>
                </div>
                <span style="font-family:var(--font-mono);font-size:0.625rem;color:${netColor};width:30px;text-align:right;flex-shrink:0">${netUtilPct}%</span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      </div>`);
  },

  // ── Ana Kategoriler View ──────────────────────────────────
  renderCategoriesView() {
    const { groups, transactions } = Store.getBudget();
    const c = document.getElementById('categories-content');
    if (!groups.length) {
      c.innerHTML = `<div style="padding:3.75rem;text-align:center;color:var(--text-muted)">
        <p style="margin-bottom:16px;font-size:1rem">${UI.t('bud_no_groups')}</p>
        <button class="btn btn-primary" onclick="Budget.openAddGroup()">
          <svg data-lucide="folder-plus"></svg> ${UI.t('bud_add_first_group')}
        </button>
      </div>`;
      lucide.createIcons({ nodes: [c] });
      return;
    }
    c.innerHTML = this._applyFontScale(`<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      ${groups.map(g => this._renderGroupCard(g, transactions)).join('')}
    </div>`);
    lucide.createIcons({ nodes: [c] });
  },

  _renderGroupCard(g, transactions) {
    const totalBudget = g.subs.reduce((a,s) => a+(+s.budget||0), 0);
    const totalReal   = transactions.filter(t => t.groupId === g.id).reduce((a,t) => a+t.amount, 0);
    const typeLabel   = g.type === 'income' ? UI.t('bud_income_label') : UI.t('bud_expense_label');
    const typeColor   = g.type === 'income' ? 'var(--green)' : 'var(--red)';
    const totalPct    = totalBudget > 0 ? Math.min(Math.round(totalReal/totalBudget*100), 200) : 0;
    const totalOver   = totalReal > totalBudget;
    const totalBarCol = totalOver ? 'var(--red)' : totalPct > 75 ? 'var(--yellow)' : g.color;
    const totalDiff   = g.type === 'income' ? totalReal - totalBudget : totalBudget - totalReal;

    const subRows = g.subs.map(s => {
      const real   = transactions.filter(t => t.subId === s.id).reduce((a,t) => a+t.amount, 0);
      const pct    = s.budget > 0 ? Math.min(Math.round(real/s.budget*100), 200) : 0;
      const over   = real > s.budget;
      const barCol = over ? 'var(--red)' : pct > 75 ? 'var(--yellow)' : g.color;
      return `<div style="display:flex;flex-direction:column;gap:5px;padding:0.625rem 0;border-bottom:1px solid var(--border)">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:0.8125rem;color:var(--text-primary);font-weight:500">${s.name}</span>
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-secondary)">
              <span style="cursor:pointer;border-bottom:1px dashed var(--border)"
                onclick="Budget.editBudget('${g.id}','${s.id}','${s.name}',${s.budget})"
                data-tooltip="${UI.t('bud_edit_budget_title')}">${UI.maskCurrency(s.budget, this.cur)}</span>
            </span>
            <span style="font-family:var(--font-mono);font-size:0.8125rem;font-weight:600;color:var(--text-primary)">${UI.maskCurrency(real, this.cur)}</span>
            <button class="btn btn-icon btn-danger" style="width:1.5rem;height:1.5rem;min-width:1.5rem"
              onclick="Budget.deleteSub('${g.id}','${s.id}')">
              <svg data-lucide="x" style="width:0.75rem;height:0.75rem"></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-bar" style="flex:1;height:0.25rem">
            <div class="progress-fill" style="width:${Math.min(pct,100)}%;background:${barCol}"></div>
          </div>
          <span style="font-family:var(--font-mono);font-size:0.625rem;color:${over?'var(--red)':'var(--text-muted)'};width:28px;text-align:right">%${pct}</span>
        </div>
      </div>`;
    }).join('');

    return `
      <div class="panel" style="display:flex;flex-direction:column;border-top:3px solid ${g.color}">
        <div style="padding:1rem 18px 0.875rem;border-bottom:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:0.9375rem;font-weight:700;color:${g.color}">${g.name}</span>
              <span style="font-size:0.625rem;font-weight:700;letter-spacing:.08em;padding:0.125rem 7px;border-radius:0.25rem;background:${typeColor}18;color:${typeColor}">${typeLabel}</span>
            </div>
            <div style="display:flex;gap:6px">
              <button class="btn btn-icon btn-secondary" style="width:1.75rem;height:1.75rem;min-width:1.75rem"
                onclick="Budget.editGroup('${g.id}')" data-tooltip="${UI.t('bud_edit_name_title')}">
                <svg data-lucide="pencil" style="width:0.875rem;height:0.875rem"></svg>
              </button>
              <button class="btn btn-icon btn-secondary" style="width:1.75rem;height:1.75rem;min-width:1.75rem"
                onclick="Budget.openAddSub('${g.id}')" data-tooltip="${UI.t('bud_add_sub_title')}">
                <svg data-lucide="plus" style="width:0.875rem;height:0.875rem"></svg>
              </button>
              <button class="btn btn-icon btn-danger" style="width:1.75rem;height:1.75rem;min-width:1.75rem"
                onclick="Budget.deleteGroup('${g.id}')" data-tooltip="${UI.t('bud_delete_group_title')}">
                <svg data-lucide="trash-2" style="width:0.875rem;height:0.875rem"></svg>
              </button>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
            <span style="font-family:var(--font-mono);font-size:1.25rem;font-weight:700;color:var(--text-primary)">${UI.maskCurrency(totalReal, this.cur)}</span>
            <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-secondary)">/ ${UI.maskCurrency(totalBudget, this.cur)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <div class="progress-bar" style="flex:1;height:0.375rem">
              <div class="progress-fill" style="width:${Math.min(totalPct,100)}%;background:${totalBarCol}"></div>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.6875rem;color:${totalOver?'var(--red)':'var(--text-muted)'};width:32px;text-align:right">%${totalPct}</span>
          </div>
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:${totalDiff>=0?'var(--green)':'var(--red)'}">
            ${totalDiff>=0?'▲ +':'▼ '}${UI.maskCurrency(Math.abs(totalDiff), this.cur)} ${totalDiff>=0?UI.t('bud_surplus'):UI.t('bud_over')}
          </div>
        </div>
        <div style="padding:0 18px;flex:1">
          ${g.subs.length ? subRows : `
            <div style="padding:1.25rem 0;text-align:center;color:var(--text-muted);font-size:0.8125rem">
              ${UI.t('bud_no_subs')}
              <span style="color:var(--accent);cursor:pointer;font-weight:600" onclick="Budget.openAddSub('${g.id}')">${UI.t('habits_add_sub_btn')}</span>
            </div>`}
        </div>
        <div style="padding:0.625rem 18px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:0.6875rem;color:var(--text-muted)">${UI.t('bud_sub_count', g.subs.length)}</span>
          <button class="btn btn-ghost btn-sm" style="font-size:0.6875rem;padding:0.25rem 0.625rem"
            onclick="Budget.openAddSub('${g.id}')">
            <svg data-lucide="plus"></svg> ${UI.t('bud_add_sub_btn')}
          </button>
        </div>
      </div>`;
  },

  // ── Transactions ─────────────────────────────────────────
  renderTransactions() {
    const { groups, transactions } = Store.getBudget();
    const q   = (document.getElementById('searchTx')?.value || '').toLowerCase();
    const gf  = document.getElementById('filterGroupVal')?.value || '';
    const dfFrom = document.getElementById('filterDateFrom')?.value || '';
    const dfTo   = document.getElementById('filterDateTo')?.value || '';

    let rows = [...transactions].sort((a,b) => b.date.localeCompare(a.date));
    if (q)      rows = rows.filter(t => (t.desc || '').toLowerCase().includes(q) || this._subName(groups, t.groupId, t.subId).toLowerCase().includes(q));
    if (gf)     rows = rows.filter(t => t.groupId === gf);
    if (dfFrom) rows = rows.filter(t => t.date >= dfFrom);
    if (dfTo)   rows = rows.filter(t => t.date <= dfTo);

    const tbody  = document.getElementById('txBody');
    const table  = document.getElementById('txTable');
    const empty  = document.getElementById('txEmpty');
    if (!rows.length) {
      table.style.display = 'none';
      empty.style.display = '';
      empty.innerHTML = UI.emptyState(UI.t('bud_no_tx'), 'receipt');
      lucide.createIcons({ nodes: [empty] });
      return;
    }
    table.style.display = '';
    empty.style.display = 'none';

    tbody.innerHTML = this._applyFontScale(rows.map(t => {
      const g = groups.find(g => g.id === t.groupId);
      const subName = this._subName(groups, t.groupId, t.subId);
      return `<tr>
        <td class="mono">${UI.formatDate(t.date)}</td>
        <td class="mono ${t.type==='income'?'pos':'neg'}">${t.type==='income'?'+':'-'}${UI.maskCurrency(t.amount, this.cur)}</td>
        <td>${subName ? `<span class="badge badge-purple">${subName}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
        <td>${g ? `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;color:${g.color}">
          <span style="width:7px;height:7px;border-radius:2px;background:${g.color};display:inline-block"></span>${g.name}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
        <td style="color:var(--text-secondary)">${t.desc}</td>
        <td style="text-align:right;white-space:nowrap">
          <div style="display:flex;gap:6px;align-items:center;justify-content:flex-end">
            <button class="btn btn-icon btn-secondary" onclick="Budget.openEditTx('${t.id}')" data-tooltip="${UI.t('habits_edit')}">
              <svg data-lucide="pencil"></svg>
            </button>
            <button class="btn btn-icon btn-danger" onclick="Budget.deleteTx('${t.id}')">
              <svg data-lucide="trash-2"></svg>
            </button>
          </div>
        </td>
      </tr>`;
    }).join(''));
    lucide.createIcons({ nodes: [tbody] });
  },

  // ── Helpers ──────────────────────────────────────────────
  _subName(groups, groupId, subId) {
    const g = groups.find(g => g.id === groupId);
    if (!g) return '';
    const s = g.subs.find(s => s.id === subId);
    return s ? s.name : '';
  },

  _fillGroupSel(selId) {
    const { groups } = Store.getBudget();
    const sel = document.getElementById(selId);
    if (!sel) return;
    sel.innerHTML = `<option value="">${UI.t('bud_select_main')}</option>` +
      groups.map(g => `<option value="${g.id}">${g.name}</option>`).join('');
  },

  _fillSubSel(selId, groupId) {
    const { groups } = Store.getBudget();
    const sel = document.getElementById(selId);
    if (!sel) return;
    const g = groups.find(g => g.id === groupId);
    sel.innerHTML = `<option value="">${UI.t('bud_select_sub')}</option>` +
      (g ? g.subs.map(s => `<option value="${s.id}">${s.name}</option>`).join('') : '');
  },

  _fillAllSubSel(selId) {
    const { groups } = Store.getBudget();
    const sel = document.getElementById(selId);
    if (!sel) return;
    sel.innerHTML = `<option value="">${UI.t('bud_select_sub')}</option>` +
      groups.map(g => g.subs.length
        ? `<optgroup label="${g.name}">${g.subs.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</optgroup>`
        : ''
      ).join('');
  },

  _fillFilterGroup() {
    const btn = document.getElementById('filterGroupBtn');
    if (!btn) return;
    const curVal = document.getElementById('filterGroupVal')?.value || '';
    if (!curVal) {
      const lbl = document.getElementById('filterGroupLabel');
      if (lbl) lbl.textContent = UI.t('bud_all_cats');
    }
  },

  openFilterGroupDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const { groups } = Store.getBudget();
          const curVal = document.getElementById('filterGroupVal')?.value || '';
          dd.setItems([
            { value: '', label: UI.t('bud_all_cats'), active: curVal === '' },
            ...groups.map(g => ({ value: g.id, label: g.name, active: g.id === curVal })),
          ]);
        },
        onSelect: (value) => {
          document.getElementById('filterGroupVal').value = value;
          const { groups } = Store.getBudget();
          const lbl = btn.querySelector('#filterGroupLabel');
          if (lbl) {
            lbl.textContent = value ? (groups.find(g => g.id === value)?.name || UI.t('bud_all_cats')) : UI.t('bud_all_cats');
            lbl.style.color = value ? 'var(--text-primary)' : 'var(--text-secondary)';
          }
          this.renderTransactions();
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  clearDateRangeFilter() {
    ['filterDateFrom','filterDateTo'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const lbl = document.getElementById('filterDateLabel');
    if (lbl) { lbl.textContent = UI.t('bud_filter_date'); lbl.style.color = 'var(--text-secondary)'; }
    this.renderTransactions();
  },

  _applyTxDateLabel(type, val) {
    const labelId = type === 'add' ? 'txDateLabel' : 'editTxDateLabel';
    const el = document.getElementById(labelId);
    if (el) el.textContent = val ? UI.formatDate(val) : '';
  },

  _toggleTxDatePicker(type) {
    (type === 'add' ? this._addTxCdp : this._editTxCdp).toggle();
  },

  toggleCycleDatePicker() {
    this._cycleCdp.toggle();
  },

  toggleDateFilter() {
    this._filterDateCdp.toggle();
  },

  // ── Save / Delete ─────────────────────────────────────────
  _buildTx() {
    const f     = document.getElementById('addTxForm');
    const subId = f.txSubSel.value;
    const { groups } = Store.getBudget();
    const g       = groups.find(g => g.subs.some(s => s.id === subId));
    const groupId = g?.id || '';
    const tx = {
      date:    f.txDate.value,
      desc:    f.txDesc.value.trim(),
      groupId, subId,
      amount:  parseFloat(f.txAmount.value),
      type:    g?.type === 'income' ? 'income' : 'expense',
    };
    if (!tx.date || !subId || !tx.amount) return null;
    return tx;
  },

  saveTx() {
    const tx = this._buildTx();
    if (!tx) return;
    if (Store.get('budget_seeded')) { const b = Store.getBudget(); Store.setBudget({ groups: b.groups, transactions: [] }); Store.set('budget_seeded', null); }
    Store.addTransaction(tx);
    document.getElementById('addTxForm').reset();
    this._addTxModal.close();
    UI.toast(UI.t('bud_trans_added'), 'success');
    this.render();
  },

  saveTxAndContinue() {
    const tx = this._buildTx();
    if (!tx) return;
    if (Store.get('budget_seeded')) { const b = Store.getBudget(); Store.setBudget({ groups: b.groups, transactions: [] }); Store.set('budget_seeded', null); }
    Store.addTransaction(tx);
    const f = document.getElementById('addTxForm');
    const keepSubSel = f.txSubSel.value;
    const keepDate   = f.txDate.value;
    f.reset();
    f.txDate.value   = keepDate;
    this._applyTxDateLabel('add', keepDate);
    f.txSubSel.value = keepSubSel;
    const subBtn = document.getElementById('txSubBtn');
    if (subBtn) {
      const { groups } = Store.getBudget();
      const sub = groups.flatMap(g => g.subs).find(s => s.id === keepSubSel);
      if (sub) subBtn.querySelector('.dd-label').textContent = sub.name;
    }
    UI.toast(UI.t('bud_trans_added'), 'success');
    this.render();
  },

  saveEditTx() {
    const f     = document.getElementById('editTxForm');
    const id    = f.editTxId.value;
    const subId = f.editTxSubSel.value;
    const { groups } = Store.getBudget();
    const g       = groups.find(g => g.subs.some(s => s.id === subId));
    const groupId = g?.id || '';
    const updates = {
      date:    f.editTxDate.value,
      desc:    f.editTxDesc.value.trim(),
      groupId, subId,
      amount:  parseFloat(f.editTxAmount.value),
      type:    g?.type === 'income' ? 'income' : 'expense',
    };
    if (!updates.date || !subId || !updates.amount) return;
    Store.updateTransaction(id, updates);
    this._editTxModal.close();
    UI.toast(UI.t('bud_tx_updated'), 'success');
    this.render();
  },

  saveGroup() {
    const f    = document.getElementById('addGroupForm');
    const name = f.groupName.value.trim();
    if (!name) return;
    Store.addBudgetGroup({ name, type: f.groupType.value, color: f.groupColor.value });
    f.reset();
    this._addGroupModal.close();
    UI.toast(UI.t('bud_group_added'), 'success');
    if (this.activeView === 'overview') this.setView('categories');
    else this.render();
  },

  saveSub() {
    const f      = document.getElementById('addSubForm');
    const name   = f.subName.value.trim();
    const budget = parseFloat(f.subBudget.value);
    if (!name || !this.activeGroup) return;
    Store.addBudgetSub(this.activeGroup, { name, budget: budget || 0 });
    f.reset();
    this._addSubModal.close();
    UI.toast(UI.t('bud_sub_added'), 'success');
    this.render();
  },

  editGroup(id) {
    const { groups } = Store.getBudget();
    const g = groups.find(g => g.id === id);
    if (!g) return;
    this._editingGroupId = id;
    const initColor = (g.color || '#7C6CFC').toUpperCase();
    const html = `
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_group_name_label')}</label>
          <input class="form-control" type="text" id="editGroupName" placeholder="${UI.t('bud_group_name_placeholder')}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('lbl_color')}</label>
          <button type="button" id="editGroupColorBtn"
            style="width:100%;display:flex;align-items:center;gap:8px;padding:0 0.625rem;height:2.375rem;
                   background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <span id="editGroupColorSwatch" style="width:1rem;height:1rem;border-radius:3px;background:${initColor};
                  flex-shrink:0;border:1px solid rgba(255,255,255,.15)"></span>
            <span id="editGroupColorHex" class="mono" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${initColor}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="editGroupColor" value="${initColor}">
        </div>
      </div>`;
    this._editGroupModal = new CustomModal({
      title:   UI.t('bud_edit_group_modal'),
      content: html,
      width:   380,
      zIndex:  1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   icon: 'check', onClick: () => this._saveGroupEdit() },
      ],
    });
    this._editGroupModal.open();
    lucide.createIcons({ nodes: [this._editGroupModal.getBody()] });
    document.getElementById('editGroupName').value = g.name;
    this._editGroupColorPicker = new CustomColorPicker({
      btn:   'editGroupColorBtn',
      input: 'editGroupColor',
      align: 'left',
      onChange: hex => {
        const sw = document.getElementById('editGroupColorSwatch');
        const lb = document.getElementById('editGroupColorHex');
        if (sw) sw.style.background = hex;
        if (lb) lb.textContent = hex.toUpperCase();
      },
    });
    document.getElementById('editGroupColorBtn').addEventListener('click', e => {
      e.stopPropagation();
      this._editGroupColorPicker.toggle();
    });
    setTimeout(() => document.getElementById('editGroupName').select(), 80);
  },

  _saveGroupEdit() {
    const name  = document.getElementById('editGroupName').value.trim();
    const color = document.getElementById('editGroupColor').value;
    if (!name) { document.getElementById('editGroupName').focus(); return; }
    Store.updateBudgetGroup(this._editingGroupId, { name, color });
    this._editGroupModal.close();
    UI.toast(UI.t('bud_cat_updated'), 'success');
    this.render();
  },

  _editSubTarget: null,

  editBudget(groupId, subId, name, current) {
    this._editSubTarget = { groupId, subId };
    const html = `
      <form id="editSubForm" style="display:flex;flex-direction:column;gap:16px">
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_sub_name_label')}</label>
          <input class="form-control" type="text" id="editSubName" placeholder="${UI.t('bud_sub_name_placeholder')}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">${UI.t('bud_monthly_budget')} (${this.cur})</label>
          <input class="form-control" type="number" id="editSubBudget" min="0" step="1" placeholder="0">
        </div>
      </form>`;
    this._editSubModal = new CustomModal({
      title:   UI.t('bud_edit_sub_modal'),
      content: html,
      width:   380,
      zIndex:  1050,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => this._saveSubEdit() },
      ],
    });
    this._editSubModal.open();
    document.getElementById('editSubName').value   = name;
    document.getElementById('editSubBudget').value = current;
    setTimeout(() => document.getElementById('editSubBudget')?.focus(), 120);
    document.getElementById('editSubForm').addEventListener('submit', e => { e.preventDefault(); this._saveSubEdit(); });
  },

  _saveSubEdit() {
    if (!this._editSubTarget) return;
    const { groupId, subId } = this._editSubTarget;
    const name   = document.getElementById('editSubName')?.value.trim();
    const budget = parseFloat(document.getElementById('editSubBudget')?.value);
    if (!name) { UI.toast(UI.t('bud_sub_name_required'), 'error'); return; }
    if (isNaN(budget) || budget < 0) { UI.toast(UI.t('inv_invalid_price'), 'error'); return; }
    Store.updateBudgetSub(groupId, subId, { name, budget });
    UI.toast(UI.t('bud_budget_updated'), 'success');
    this._editSubModal.close();
    this._editSubTarget = null;
    this.render();
  },

  deleteTx(id) {
    DeleteManager.confirm({
      module:       'budget',
      title:        UI.t('bud_confirm_title'),
      message:      UI.t('bud_confirm_delete_trans'),
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        Store.deleteTransaction(id);
        UI.toast(UI.t('bud_trans_deleted'), 'info');
        this.render();
      },
    });
  },

  deleteSub(groupId, subId) {
    DeleteManager.confirm({
      module:       'budget',
      title:        UI.t('bud_confirm_title'),
      message:      UI.t('bud_confirm_delete_sub'),
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        Store.deleteBudgetSub(groupId, subId);
        UI.toast(UI.t('bud_sub_deleted'), 'info');
        this.render();
      },
    });
  },

  toggleDetails(panel, toggleEl) {
    const wasOpen = !!this._detailsOpen[panel];

    // Close all details first
    ['daily', 'subcats'].forEach(p => {
      this._detailsOpen[p] = false;
      const icon = document.getElementById(`${p}-toggle-icon`);
      if (icon) { icon.setAttribute('data-lucide', 'chevron-down'); lucide.createIcons({ nodes: [icon.parentElement] }); }
    });
    this._hideDetailsOverlay();

    if (!wasOpen) {
      this._detailsOpen[panel] = true;
      const iconEl = document.getElementById(`${panel}-toggle-icon`);
      if (iconEl) { iconEl.setAttribute('data-lucide', 'chevron-up'); lucide.createIcons({ nodes: [iconEl.parentElement] }); }
      this._showDetailsOverlay(panel, toggleEl);
    }
  },

  _showDetailsOverlay(panel, anchorEl) {
    const overlay = document.getElementById('budget-details-overlay');
    if (!overlay) return;

    const title = panel === 'daily' ? UI.t('bud_panel_daily') : UI.t('bud_panel_subcats');
    overlay.querySelector('.bdo-title').textContent = title;

    const tableEl = document.getElementById(`budget-${panel}-table`);
    overlay.querySelector('.bdo-body').innerHTML = tableEl ? tableEl.innerHTML : '';

    // Measure before positioning
    overlay.style.visibility = 'hidden';
    overlay.style.display    = 'flex';
    overlay.style.top        = '-9999px';
    lucide.createIcons({ nodes: [overlay] });

    const overlayH  = overlay.offsetHeight || 300;
    const sidebar   = document.querySelector('.sidebar');
    const topbar    = document.querySelector('.topbar');
    const sidebarW  = sidebar?.offsetWidth  || 240;
    const topbarH   = topbar?.offsetHeight  || 64;

    // All coordinates are viewport-relative (position:fixed)
    const rect      = anchorEl ? anchorEl.getBoundingClientRect() : { bottom: topbarH + 100, left: sidebarW };
    const panelEl   = anchorEl ? anchorEl.parentElement : null;
    const panelRect = panelEl  ? panelEl.getBoundingClientRect() : null;

    const maxW    = panelRect ? Math.round(panelRect.width) : Math.min(720, window.innerWidth - sidebarW - 16);
    const rawLeft = panelRect ? Math.round(panelRect.left)  : Math.round(rect.left);
    const left    = Math.max(sidebarW, Math.min(rawLeft, window.innerWidth - maxW));

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp     = spaceBelow < overlayH + 16 && rect.top - topbarH > overlayH + 16;
    const rawTop     = openUp ? Math.round(rect.top - overlayH - 6) : Math.round(rect.bottom + 6);
    const top        = Math.max(topbarH, Math.min(rawTop, window.innerHeight - overlayH - 8));

    overlay.style.width      = maxW + 'px';
    overlay.style.left       = left + 'px';
    overlay.style.top        = top  + 'px';
    overlay.style.visibility = '';
  },

  _hideDetailsOverlay() {
    const overlay = document.getElementById('budget-details-overlay');
    if (overlay) overlay.style.display = 'none';
  },

  _initOverlayDrag() {
    const overlay = document.getElementById('budget-details-overlay');
    const handle  = document.getElementById('budget-details-drag-handle');
    if (!overlay || !handle) return;

    let dragging = false, ox = 0, oy = 0, sx = 0, sy = 0;

    handle.addEventListener('mousedown', e => {
      if (e.button !== 0 || e.target.closest('button')) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      ox = parseInt(overlay.style.left) || 0;
      oy = parseInt(overlay.style.top)  || 0;
      handle.style.cursor        = 'grabbing';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      const sidebarW = document.querySelector('.sidebar')?.offsetWidth  || 240;
      const topbarH  = document.querySelector('.topbar')?.offsetHeight  || 64;
      const newLeft  = Math.max(sidebarW, Math.min(ox + e.clientX - sx, window.innerWidth  - overlay.offsetWidth));
      const newTop   = Math.max(topbarH,  Math.min(oy + e.clientY - sy, window.innerHeight - overlay.offsetHeight));
      overlay.style.left = newLeft + 'px';
      overlay.style.top  = newTop  + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      handle.style.cursor        = 'grab';
      document.body.style.userSelect = '';
    });
  },

  closeDetailsOverlay() {
    ['daily', 'subcats'].forEach(p => {
      this._detailsOpen[p] = false;
      const icon = document.getElementById(`${p}-toggle-icon`);
      if (icon) { icon.setAttribute('data-lucide', 'chevron-down'); lucide.createIcons({ nodes: [icon.parentElement] }); }
    });
    this._hideDetailsOverlay();
  },

  _refreshOverlayIfOpen(panel) {
    const overlay = document.getElementById('budget-details-overlay');
    if (!overlay || overlay.style.display === 'none') return;
    if (!this._detailsOpen[panel]) return;
    const tableEl = document.getElementById(`budget-${panel}-table`);
    if (tableEl) overlay.querySelector('.bdo-body').innerHTML = tableEl.innerHTML;
  },

  deleteGroup(id) {
    DeleteManager.confirm({
      module:       'budget',
      title:        UI.t('bud_confirm_title'),
      message:      UI.t('bud_confirm_delete_group'),
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        Store.deleteBudgetGroup(id);
        const b = Store.getBudget();
        this.activeGroup = b.groups[0]?.id || null;
        UI.toast(UI.t('bud_group_deleted'), 'info');
        this.render();
      },
    });
  }
};
