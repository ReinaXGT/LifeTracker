const Dashboard = {

  _editMode: false,
  _period: 'week',

  _periodFrom() {
    const d = new Date();
    if (this._period === 'month') d.setDate(d.getDate() - 29);
    else if (this._period === 'year')  d.setDate(d.getDate() - 364);
    else                               d.setDate(d.getDate() - 6);
    return d.toISOString().split('T')[0];
  },

  _setPeriod(p) {
    this._period = p;
    const lbl = document.getElementById('periodDDLabel');
    if (lbl) lbl.textContent = UI.t(`dash_this_${p}`);
    this.renderKPIs();
    this.renderTimeChart();
    this.renderBudgetStatus();
    this.renderGym();
  },

  openPeriodDropdown(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn,
        items: [],
        onOpen: (dd) => {
          dd.setItems([
            { value: 'week',  label: UI.t('dash_this_week'),  active: this._period === 'week'  },
            { value: 'month', label: UI.t('dash_this_month'), active: this._period === 'month' },
            { value: 'year',  label: UI.t('dash_this_year'),  active: this._period === 'year'  },
          ]);
        },
        onSelect: (val) => { this._setPeriod(val); },
        align: 'right',
        minWidth: 120,
      });
    }
    btn._ddInst.toggle();
  },

  _initPanelDrag() {
    const grid = document.getElementById('dash-panels-grid');
    if (!grid) return;
    const panels = () => [...grid.querySelectorAll('.dash-panel-wrap')];
    let dragSrc = null;

    panels().forEach(panel => {
      const header = panel.querySelector('.panel-header');
      if (!header) return;

      header.setAttribute('draggable', 'true');

      header.addEventListener('dragstart', e => {
        if (!this._editMode) { e.preventDefault(); return; }
        if (e.target.closest('a, button')) { e.preventDefault(); return; }
        dragSrc = panel;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', panel.dataset.panelId);
        setTimeout(() => panel.classList.add('dash-panel-dragging'), 0);
      });

      header.addEventListener('dragend', () => {
        panel.classList.remove('dash-panel-dragging');
        panels().forEach(p => p.classList.remove('dash-panel-drag-over'));
        dragSrc = null;
      });

      panel.addEventListener('dragover', e => {
        if (!this._editMode) return;
        e.preventDefault();
        if (panel !== dragSrc) {
          panels().forEach(p => p.classList.remove('dash-panel-drag-over'));
          panel.classList.add('dash-panel-drag-over');
        }
      });

      panel.addEventListener('dragleave', e => {
        if (!panel.contains(e.relatedTarget)) panel.classList.remove('dash-panel-drag-over');
      });

      panel.addEventListener('drop', e => {
        if (!this._editMode) return;
        e.preventDefault();
        panel.classList.remove('dash-panel-drag-over');
        if (!dragSrc || dragSrc === panel) return;
        const all = panels();
        const srcIdx = all.indexOf(dragSrc);
        const tgtIdx = all.indexOf(panel);
        if (srcIdx < tgtIdx) {
          grid.insertBefore(dragSrc, panel.nextSibling);
        } else {
          grid.insertBefore(dragSrc, panel);
        }
        this._savePanelOrder();
      });
    });
  },

  _savePanelOrder() {
    const order = [...document.querySelectorAll('#dash-panels-grid .dash-panel-wrap')].map(p => p.dataset.panelId);
    Store.set('dash_panel_order', order);
  },

  _applyPanelOrder() {
    const order = Store.get('dash_panel_order');
    if (!order || !order.length) return;
    const grid = document.getElementById('dash-panels-grid');
    if (!grid) return;
    order.forEach(panelId => {
      const panel = grid.querySelector(`[data-panel-id="${panelId}"]`);
      if (panel) grid.appendChild(panel);
    });
  },

  toggleLayoutEdit() {
    this._editMode = !this._editMode;
    const btn = document.getElementById('dashLayoutLockBtn');
    if (btn) {
      btn.className = `btn btn-icon ${this._editMode ? 'btn-primary' : 'btn-secondary'}`;
      btn.dataset.tooltip = UI.t(this._editMode ? 'goals_reorder_close' : 'goals_reorder');
      btn.innerHTML = `<svg data-lucide="${this._editMode ? 'lock-open' : 'lock'}"></svg>`;
      lucide.createIcons({ nodes: [btn] });
    }
    document.getElementById('dash-panels-grid')?.classList.toggle('dash-edit-mode', this._editMode);
  },

  _applyHiddenPanels() {
    const panelMap = {
      focusmode:   'panel-focus',
      timelog:     'panel-time',
      gym:         'panel-gym',
      plans:       'panel-plans',
      goals:       'panel-goals',
      budget:      'panel-budget',
      investments: 'panel-invest',
    };
    Object.entries(panelMap).forEach(([module, panelId]) => {
      const el = document.querySelector(`[data-panel-id="${panelId}"]`);
      if (el) el.style.display = UI.isModuleHidden(module) ? 'none' : '';
    });
    const allHidden = Object.keys(panelMap).every(m => UI.isModuleHidden(m));
    const lockBtn   = document.getElementById('dashLayoutLockBtn');
    const periodWrap = document.getElementById('periodDDBtn')?.parentElement;
    if (lockBtn)    lockBtn.style.display    = allHidden ? 'none' : '';
    if (periodWrap) periodWrap.style.display = allHidden ? 'none' : '';
  },

  init() {
    UI.initTopbar();
    UI.initEsc();
    this._applyPanelOrder();
    this._initPanelDrag();
    this._applyHiddenPanels();

    this.renderKPIs();
    this.renderTimeChart();
    this.renderPlans();
    this.renderInvestPie();
    this.renderBudgetStatus();
    this.renderFocusMode();
    this.renderGoals();
    this.renderGym();
    document.addEventListener('lt:privacy-change', () => {
      this.renderKPIs();
      this.renderBudgetStatus();
      this.renderInvestPie();
    });
    const _fullRender = () => {
      this._applyHiddenPanels();
      this.renderKPIs();
      this.renderTimeChart();
      this.renderPlans();
      this.renderInvestPie();
      this.renderBudgetStatus();
      this.renderFocusMode();
      this.renderGoals();
      this.renderGym();
    };
    document.addEventListener('lt:theme-change',    _fullRender);
    document.addEventListener('lt:modules-change',  _fullRender);
    document.addEventListener('lt:currency-change', () => {
      this.renderKPIs();
      this.renderInvestPie();
      this.renderBudgetStatus();
    });
    document.addEventListener('lt:language-change', () => {
      const lbl = document.getElementById('periodDDLabel');
      if (lbl) lbl.textContent = UI.t(`dash_this_${this._period}`);
      this.renderKPIs();
      this.renderTimeChart();
      this.renderPlans();
      this.renderInvestPie();
      this.renderBudgetStatus();
      this.renderFocusMode();
      this.renderGoals();
      this.renderGym();
    });

    // Gece yarısı geçişinde dashboard'u otomatik yenile
    let _watchDate = UI.today();
    setInterval(() => {
      const now = UI.today();
      if (now !== _watchDate) {
        _watchDate = now;
        _fullRender();
      }
    }, 60000);
  },

  // ── Net Worth custom KPI card (gym week-style) ──────────
  _netWorthKpiHtml(totalInv, depVal, hasDeposits, budNet, net, cur) {
    const showInv = !UI.isModuleHidden('investments');
    const showDep = showInv;
    const showBud = !UI.isModuleHidden('budget');

    const invColor = '#34D399';
    const depColor = '#F472B6';
    const budColor = '#FB923C';
    const netColor = '#7C6CFC';

    // Each bar fills proportionally to the total absolute sum
    const absSum = (showInv ? Math.abs(totalInv) : 0)
                 + (showDep ? Math.abs(depVal)   : 0)
                 + (showBud ? Math.abs(budNet)   : 0) || 1;
    const _pct = v => Math.max(0, Math.round(Math.abs(v) / absSum * 100));

    const _bar = (color, pct) =>
      `<div style="margin-top:.1875rem;height:3px;border-radius:2px;background:var(--bg-elevated)">
        <div style="height:100%;background:${color};width:${pct}%;border-radius:2px;transition:width 300ms ease-out"></div>
      </div>`;

    const _dot = c =>
      `<span style="width:.375rem;height:.375rem;border-radius:50%;background:${c};flex-shrink:0;display:inline-block"></span>`;

    const _row = (lbl, dotC, val, valC, barColor, barPct) =>
      `<div style="margin-top:.3125rem">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="display:flex;align-items:center;gap:.3125rem">
            ${_dot(dotC)}
            <span style="font-size:.625rem;color:var(--text-muted);letter-spacing:.03em">${lbl}</span>
          </span>
          <span class="mono" style="font-size:.6875rem;font-weight:700;color:${valC || 'var(--text-primary)'};">${val}</span>
        </div>
        ${_bar(barColor, barPct)}
      </div>`;

    let rows = '';
    if (showDep) rows += _row(UI.t('dash_nw_dep'), depColor, UI.maskCurrency(depVal, cur),   depColor, depColor, _pct(depVal));
    if (showBud) {
      const sign = budNet < 0 ? '−' : '+';
      rows += _row(UI.t('dash_nw_bud'), budColor,
        sign + UI.maskCurrency(Math.abs(budNet), cur),
        budNet < 0 ? 'var(--red)' : budColor,
        budColor, _pct(budNet));
    }
    if (showInv) rows += _row(UI.t('dash_nw_inv'), invColor, UI.maskCurrency(totalInv, cur), invColor, invColor, _pct(totalInv));

    // Bottom net worth bar — only include colors for non-zero values
    const gradColors = [];
    if (showInv && totalInv !== 0) gradColors.push(invColor);
    if (showDep && depVal  !== 0) gradColors.push(depColor);
    if (showBud && budNet  !== 0) gradColors.push(budColor);
    if (gradColors.length === 0)  gradColors.push('var(--text-muted)');
    const gradCss = gradColors.length === 1
      ? gradColors[0]
      : `linear-gradient(90deg,${gradColors.join(',')})`;
    const netBar = `<div style="margin-top:auto;padding-top:.4375rem;border-top:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:.625rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)">${UI.t('dash_net_worth')}</span>
        <span class="mono" style="font-size:.6875rem;font-weight:700;color:var(--accent)">${UI.maskCurrency(net, cur)}</span>
      </div>
      <div style="margin-top:.1875rem;height:4px;border-radius:2px;background:var(--bg-elevated)">
        <div style="height:100%;width:100%;border-radius:2px;background:${gradCss};opacity:.9"></div>
      </div>
    </div>`;

    return `<div class="kpi-card" style="cursor:default;display:flex;flex-direction:column">
      <div class="kpi-card-header">
        <span class="kpi-label">${UI.t('dash_net_worth')}</span>
        <span class="kpi-icon" style="background:rgba(124,108,252,.15)">
          <svg data-lucide="trending-up" style="color:${netColor}"></svg>
        </span>
      </div>
      <div class="kpi-value mono">${UI.maskCurrency(net, cur)}</div>
      ${rows}
      ${netBar}
    </div>`;
  },

  // ── Budget KPI card ─────────────────────────────────────
  _budgetKpiHtml(periodExp, cur, bud, period, from, cycles) {
    const spentKey  = `dash_${period}_spent`;
    const expGroups = bud.groups.filter(g => g.type === 'expense');

    // Dönem filtreli işlemler: mevcut döngü + geçmiş döngüler
    const _periodTx = (groupId) => {
      const cur_ = bud.transactions.filter(t => t.groupId === groupId && t.type === 'expense' && t.date >= from);
      const hist_ = cycles.flatMap(c => (c.transactions || []).filter(t => t.groupId === groupId && t.type === 'expense' && t.date >= from));
      return [...cur_, ...hist_];
    };

    const groupData = expGroups.map(g => {
      const budget = g.subs.reduce((a, s) => a + s.budget, 0);
      const spent  = _periodTx(g.id).reduce((a, t) => a + t.amount, 0);
      return { name: g.name, color: g.color, spent, budget };
    }).sort((a, b) => b.spent - a.spent).slice(0, 3);

    // Dönemde kaç bütçe döngüsü varsa bütçeyi o kadar çarp
    const cyclesInPeriod = cycles.filter(c =>
      (c.end && c.end >= from) || (c.transactions || []).some(t => t.date >= from)
    ).length;
    const budgetMultiplier = 1 + cyclesInPeriod; // +1 aktif döngü

    const singleBudget = expGroups.reduce((a, g) => a + g.subs.reduce((b, s) => b + s.budget, 0), 0);
    const totalBudget  = singleBudget * budgetMultiplier;
    const totalSpent   = periodExp;
    const totalPct     = totalBudget > 0 ? Math.round(totalSpent / totalBudget * 100) : 0; // %100 tavanı yok
    const totalOver    = totalSpent > totalBudget;

    const _bar = (color, pct) =>
      `<div style="margin-top:.1875rem;height:3px;border-radius:2px;background:var(--bg-elevated)">
        <div style="height:100%;background:${color};width:${pct}%;border-radius:2px;transition:width 300ms ease-out"></div>
      </div>`;
    const _dot = c =>
      `<span style="width:.375rem;height:.375rem;border-radius:50%;background:${c};flex-shrink:0;display:inline-block"></span>`;

    const rows = groupData.map(g => {
      const periodGroupBudget = g.budget * budgetMultiplier;
      const pct   = periodGroupBudget > 0 ? Math.min(Math.round(g.spent / periodGroupBudget * 100), 100) : (g.spent > 0 ? 100 : 0);
      const over  = g.spent > periodGroupBudget;
      const color = over ? 'var(--red)' : g.color;
      return `<div style="margin-top:.3125rem">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="display:flex;align-items:center;gap:.3125rem">
            ${_dot(color)}
            <span style="font-size:.625rem;color:var(--text-muted);letter-spacing:.03em">${g.name}</span>
          </span>
          <span class="mono" style="font-size:.6875rem;font-weight:700;color:${over ? 'var(--red)' : 'var(--text-primary)'};">${UI.maskCurrency(g.spent, cur)}</span>
        </div>
        ${_bar(color, pct)}
      </div>`;
    }).join('');

    const footer = totalBudget > 0
      ? `<div style="margin-top:auto;padding-top:.4375rem;border-top:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:.625rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)">${UI.t('dash_budget_total')}</span>
            <span class="mono" style="font-size:.6875rem;font-weight:700;color:${totalOver ? 'var(--red)' : 'var(--accent)'}">${totalPct}%</span>
          </div>
          <div style="margin-top:.1875rem;height:4px;border-radius:2px;background:var(--bg-elevated)">
            <div style="height:100%;width:${Math.min(totalPct, 100)}%;border-radius:2px;background:${totalOver ? 'var(--red)' : 'var(--accent)'};opacity:.85"></div>
          </div>
        </div>`
      : `<div class="kpi-change" style="margin-top:auto">
          <span class="${totalOver ? 'badge-down' : 'badge-up'}">${totalOver ? '▼' : '▲'} ${UI.t(totalOver ? 'dash_over_limit' : 'dash_in_limit')}</span>
        </div>`;

    return `<div class="kpi-card" style="cursor:default;display:flex;flex-direction:column">
      <div class="kpi-card-header">
        <span class="kpi-label">${UI.t(spentKey)}</span>
        <span class="kpi-icon" style="background:rgba(248,113,113,.15)">
          <svg data-lucide="shopping-cart" style="color:#F87171"></svg>
        </span>
      </div>
      <div class="kpi-value mono">${UI.maskCurrency(periodExp, cur)}</div>
      ${expGroups.length ? rows : ''}
      ${footer}
    </div>`;
  },

  // ── Habits KPI card ─────────────────────────────────────
  _habitsKpiHtml(periodDone, periodPoss, periodPct, hab, period) {
    const today      = UI.today();
    const dayIdx     = new Date().getDay();
    const habList    = hab.list;
    const todayDone  = hab.logs.filter(l => l.date === today && l.done).length;
    const todayPoss  = habList.filter(h =>
      h.frequency === 'daily' || (h.frequency === 'scheduled' && (h.days || []).includes(dayIdx))
    ).length;
    const todayPct   = todayPoss > 0 ? Math.min(Math.round(todayDone / todayPoss * 100), 100) : 0;
    const perPct     = Math.min(periodPct, 100);
    const periodKey  = period === 'month' ? 'dash_this_month' : period === 'year' ? 'dash_this_year' : 'dash_this_week';
    const clr        = p => p >= 80 ? 'var(--green)' : p >= 50 ? 'var(--yellow)' : 'var(--red)';
    const todayColor = clr(todayPct);
    const perColor   = clr(perPct);

    const _bar = (color, pct) =>
      `<div style="margin-top:.1875rem;height:3px;border-radius:2px;background:var(--bg-elevated)">
        <div style="height:100%;background:${color};width:${pct}%;border-radius:2px;transition:width 300ms ease-out"></div>
      </div>`;
    const _dot = c =>
      `<span style="width:.375rem;height:.375rem;border-radius:50%;background:${c};flex-shrink:0;display:inline-block"></span>`;

    const rows = habList.length ? `
      <div style="margin-top:.3125rem">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="display:flex;align-items:center;gap:.3125rem">
            ${_dot(todayColor)}
            <span style="font-size:.625rem;color:var(--text-muted);letter-spacing:.03em">${UI.t('dash_today')}</span>
          </span>
          <span class="mono" style="font-size:.6875rem;font-weight:700;color:${todayColor}">${todayDone} / ${todayPoss}</span>
        </div>
        ${_bar(todayColor, todayPct)}
      </div>
      <div style="margin-top:.3125rem">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="display:flex;align-items:center;gap:.3125rem">
            ${_dot(perColor)}
            <span style="font-size:.625rem;color:var(--text-muted);letter-spacing:.03em">${UI.t(periodKey)}</span>
          </span>
          <span class="mono" style="font-size:.6875rem;font-weight:700;color:${perColor}">${periodDone} / ${periodPoss}</span>
        </div>
        ${_bar(perColor, perPct)}
      </div>` : '';

    const footer = habList.length
      ? `<div style="margin-top:auto;padding-top:.4375rem;border-top:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:.625rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)">${UI.t('dash_completion_rate')}</span>
            <span class="mono" style="font-size:.6875rem;font-weight:700;color:${perColor}">${perPct}%</span>
          </div>
          <div style="margin-top:.1875rem;height:4px;border-radius:2px;background:var(--bg-elevated)">
            <div style="height:100%;width:${perPct}%;border-radius:2px;background:${perColor};opacity:.85"></div>
          </div>
        </div>`
      : `<div class="kpi-change" style="margin-top:auto">
          <span class="${periodDone >= periodPoss * 0.5 ? 'badge-up' : 'badge-down'}">${periodDone >= periodPoss * 0.5 ? '▲' : '▼'} ${UI.t('dash_habits_pct', periodPct)}</span>
        </div>`;

    return `<div class="kpi-card" style="cursor:default;display:flex;flex-direction:column">
      <div class="kpi-card-header">
        <span class="kpi-label">${UI.t('dash_habits_done')}</span>
        <span class="kpi-icon" style="background:rgba(52,211,153,.15)">
          <svg data-lucide="check-circle" style="color:#34D399"></svg>
        </span>
      </div>
      <div class="kpi-value">${periodDone} / ${periodPoss}</div>
      ${rows}
      ${footer}
    </div>`;
  },

  // ── Goals KPI card ──────────────────────────────────────
  _goalsKpiHtml(activeGoals, gls) {
    const items     = gls.items;
    const topActive = items
      .filter(g => g.progress < 100)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 3);
    const avgProg   = activeGoals > 0
      ? Math.round(items.filter(g => g.progress < 100).reduce((a, g) => a + (g.progress || 0), 0) / activeGoals)
      : 0;
    const clr       = p => p >= 75 ? 'var(--green)' : p >= 40 ? 'var(--yellow)' : 'var(--accent)';
    const avgColor  = clr(avgProg);

    const _bar = (color, pct) =>
      `<div style="margin-top:.1875rem;height:3px;border-radius:2px;background:var(--bg-elevated)">
        <div style="height:100%;background:${color};width:${pct}%;border-radius:2px;transition:width 300ms ease-out"></div>
      </div>`;
    const _dot = c =>
      `<span style="width:.375rem;height:.375rem;border-radius:50%;background:${c};flex-shrink:0;display:inline-block"></span>`;

    const rows = topActive.map(g => {
      const p = g.progress || 0;
      const c = clr(p);
      return `<div style="margin-top:.3125rem">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.375rem">
          <span style="display:flex;align-items:center;gap:.3125rem;min-width:0;overflow:hidden">
            ${_dot(c)}
            <span style="font-size:.625rem;color:var(--text-muted);letter-spacing:.03em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g.title}</span>
          </span>
          <span class="mono" style="font-size:.6875rem;font-weight:700;color:${c};flex-shrink:0">%${p}</span>
        </div>
        ${_bar(c, p)}
      </div>`;
    }).join('');

    const footer = items.length
      ? `<div style="margin-top:auto;padding-top:.4375rem;border-top:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:.625rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)">${UI.t('dash_avg_progress')}</span>
            <span class="mono" style="font-size:.6875rem;font-weight:700;color:${avgColor}">%${avgProg}</span>
          </div>
          <div style="margin-top:.1875rem;height:4px;border-radius:2px;background:var(--bg-elevated)">
            <div style="height:100%;width:${avgProg}%;border-radius:2px;background:${avgColor};opacity:.85"></div>
          </div>
        </div>`
      : `<div class="kpi-change" style="margin-top:auto">
          <span class="badge-up">▲ ${UI.t('dash_goals_of', items.length)}</span>
        </div>`;

    return `<div class="kpi-card" style="cursor:default;display:flex;flex-direction:column">
      <div class="kpi-card-header">
        <span class="kpi-label">${UI.t('dash_active_goals')}</span>
        <span class="kpi-icon" style="background:rgba(251,191,36,.15)">
          <svg data-lucide="star" style="color:#FBBF24"></svg>
        </span>
      </div>
      <div class="kpi-value">${activeGoals}</div>
      ${topActive.length ? rows : ''}
      ${footer}
    </div>`;
  },

  // ── KPI ─────────────────────────────────────────────────
  renderKPIs() {
    const s   = Store.getSettings();
    const cur = s.currency || '₺';
    const bud = Store.getBudget();
    const hab = Store.getHabits();
    const inv = Store.getInvestments();
    const gls = Store.getGoals();

    const invPrices  = Store.get('inv_prices') || {};
    const rate       = Number(s.exchangeRate) || 1;
    const rates      = s.rates || {};
    const _usdRate   = code => (!code || code === 'USD') ? 1 : (rates[code] || (code === 'TRY' ? (Number(s.tryRate) || rate || 35) : 1));
    const totalInv   = inv.assets.reduce((a, x) => {
      const priceRaw  = invPrices[x.symbol]?.price || Number(x.buyPrice) || 0;
      const qty       = Number(x.quantity) || 0;
      const assetCur  = x.buyCurrency || 'USD';
      const priceUSD  = assetCur === 'USD' ? priceRaw : priceRaw / _usdRate(assetCur);
      return a + qty * priceUSD * rate;
    }, 0);
    const inc     = bud.transactions.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
    const exp     = bud.transactions.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
    const cycles  = Store.get('budget_cycles') || [];
    const _tryRateDash = Number(s.tryRate) || Number(s.exchangeRate) || 35;
    const deposits = Store.getDeposits();
    const depTotalUSD = deposits.reduce((sum, dep) => {
      const p = Number(dep.principal) || 0;
      const r = Number(dep.rate) || 0;
      const today = UI.today();
      const elapsed = Math.max(0, Math.floor((new Date(today) - new Date(dep.startDate)) / 86400000));
      const dailyRate = r / 100 / 365;
      let curVal;
      if (dep.type === 'term') {
        const td = Number(dep.termDays) || 30;
        const usedDays = Math.min(elapsed, td);
        curVal = p + p * dailyRate * usedDays;
      } else {
        curVal = p * Math.pow(1 + dailyRate, elapsed);
      }
      const depCode = dep.currency || 'TRY';
      return sum + (depCode === 'USD' ? curVal : curVal / _tryRateDash);
    }, 0);
    const budNet  = inc - exp;  // sadece mevcut döngü — bütçe sayfasındaki Net Bakiye ile eşleşir
    const net     = totalInv + depTotalUSD * rate + budNet;

    const from        = this._periodFrom();
    const periodDays  = this._period === 'month' ? 30 : this._period === 'year' ? 365 : 7;
    const curExp      = bud.transactions.filter(t => t.type === 'expense' && t.date >= from).reduce((a, t) => a + t.amount, 0);
    const histExp     = cycles.reduce((sum, c) => sum + (c.transactions || []).filter(t => t.type === 'expense' && t.date >= from).reduce((a, t) => a + t.amount, 0), 0);
    const periodExp   = curExp + histExp;
    const totalHab    = hab.list.length;
    const periodDone  = hab.logs.filter(l => l.date >= from && l.done).length;
    const periodPoss  = totalHab * periodDays;
    const periodPct   = periodPoss > 0 ? Math.round(periodDone / periodPoss * 100) : 0;
    const activeGoals = gls.items.filter(g => g.progress < 100).length;

    const nwHidden = UI.isModuleHidden('budget') && UI.isModuleHidden('investments');
    const nwHtml   = nwHidden ? '' : this._netWorthKpiHtml(totalInv, depTotalUSD * rate, deposits.length > 0, budNet, net, cur);
    const budHtml  = UI.isModuleHidden('budget')  ? '' : this._budgetKpiHtml(periodExp, cur, bud, this._period, from, cycles);
    const habHtml  = UI.isModuleHidden('habits')  ? '' : this._habitsKpiHtml(periodDone, periodPoss, periodPct, hab, this._period);
    const goaHtml  = UI.isModuleHidden('goals')   ? '' : this._goalsKpiHtml(activeGoals, gls);

    const grid = document.getElementById('kpi-grid');
    grid.innerHTML = nwHtml + budHtml + habHtml + goaHtml;
    lucide.createIcons({ nodes: [grid] });
  },

  // ── Time chart (period-aware) ────────────────────────────
  renderTimeChart() {
    const logs     = Store.getTime().logs;
    const today    = new Date();
    const todayStr = UI.today();
    const ms = UI.t('mins_suffix'), hs = UI.t('hours_suffix');
    const yFmt = v => { const m = Math.round(v); return m < 60 ? (m ? m + ms : '0') : parseFloat((m/60).toFixed(1)) + hs; };
    const tip  = c => ` ${UI.fmtMinutesHM(c.parsed.y)}`;

    const lang = UI.getLang();
    const monthShort = { tr: UI.MONTHS_SHORT, en: UI.MONTHS_SHORT_EN, zh: UI.MONTHS_SHORT_ZH, es: UI.MONTHS_SHORT_ES, fr: UI.MONTHS_SHORT_FR }[lang] || UI.MONTHS_SHORT_EN;

    const titleKey = this._period === 'year' ? 'dash_year_time' : this._period === 'month' ? 'dash_month_time' : 'dash_week_time';
    const titleEl  = document.querySelector('.panel-title[data-i18n]');
    if (titleEl && ['dash_week_time','dash_month_time','dash_year_time'].includes(titleEl.dataset.i18n)) {
      titleEl.dataset.i18n = titleKey;
      titleEl.textContent  = UI.t(titleKey);
    }

    if (this._period === 'week') {
      const dayLabels = [UI.t('day_mon'), UI.t('day_tue'), UI.t('day_wed'), UI.t('day_thu'), UI.t('day_fri'), UI.t('day_sat'), UI.t('day_sun')];
      const labels = [], data = [], ptColors = [], ptRadius = [];
      for (let i = 6; i >= 0; i--) {
        const d  = new Date(today); d.setDate(today.getDate() - i);
        const ds = d.toISOString().split('T')[0];
        const mins = logs.filter(l => l.date === ds).reduce((a, l) => a + l.duration, 0);
        labels.push(dayLabels[(d.getDay()+6)%7]);
        data.push(mins);
        const isToday = ds === todayStr;
        ptColors.push(isToday ? _cv('--green') : _cv('--accent'));
        ptRadius.push(isToday ? 5 : 3);
      }
      Charts.line('weeklyTimeChart', labels, [
        { label: UI.t('time_duration_label'), data, color: _cv('--accent'), pointColors: ptColors, pointRadius: ptRadius }
      ], { solidFill: true, yFmt, tip, yMinWidth: 52 });

    } else if (this._period === 'month') {
      const labels = [], data = [], ptColors = [], ptRadius = [];
      for (let i = 29; i >= 0; i--) {
        const d  = new Date(today); d.setDate(today.getDate() - i);
        const ds = d.toISOString().split('T')[0];
        const mins = logs.filter(l => l.date === ds).reduce((a, l) => a + l.duration, 0);
        labels.push(`${d.getDate()} ${monthShort[d.getMonth()]}`);
        data.push(mins);
        const isToday = ds === todayStr;
        ptColors.push(isToday ? _cv('--green') : _cv('--accent'));
        ptRadius.push(isToday ? 5 : 2);
      }
      Charts.line('weeklyTimeChart', labels, [
        { label: UI.t('time_duration_label'), data, color: _cv('--accent'), pointColors: ptColors, pointRadius: ptRadius }
      ], { solidFill: true, yFmt, tip, yMinWidth: 52 });

    } else {
      const labels = [], data = [], ptColors = [], ptRadius = [];
      for (let i = 11; i >= 0; i--) {
        const d    = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const y    = d.getFullYear(), m = d.getMonth();
        const mStr = `${y}-${String(m+1).padStart(2,'0')}`;
        const mins = logs.filter(l => l.date.startsWith(mStr)).reduce((a, l) => a + l.duration, 0);
        const isCur = i === 0;
        labels.push(monthShort[m]);
        data.push(mins);
        ptColors.push(isCur ? _cv('--green') : _cv('--accent'));
        ptRadius.push(isCur ? 5 : 3);
      }
      Charts.line('weeklyTimeChart', labels, [
        { label: UI.t('time_duration_label'), data, color: _cv('--accent'), pointColors: ptColors, pointRadius: ptRadius }
      ], { solidFill: true, yFmt, tip, yMinWidth: 52 });
    }
  },

  renderWeekly() { this.renderTimeChart(); },

  // ── Upcoming plans ──────────────────────────────────────
  renderPlans() {
    const items = Store.getPlans().items;
    const td    = UI.today();
    const tmr   = (() => { const d = new Date(); d.setDate(d.getDate()+1); return d.toISOString().split('T')[0]; })();
    const upcoming = items
      .filter(p => p.status !== 'done' && p.dueDate && p.dueDate >= td)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 7);

    const c = document.getElementById('upcoming-plans');
    if (!upcoming.length) {
      c.innerHTML = UI.emptyState(UI.t('dash_no_plans'), 'calendar');
      lucide.createIcons({ nodes: [c] }); return;
    }
    const pColor = { high: 'var(--red)', medium: 'var(--yellow)', low: 'var(--blue)' };
    c.innerHTML = upcoming.map(p => {
      const lbl     = p.dueDate === td ? UI.t('dash_today') : p.dueDate === tmr ? UI.t('dash_tomorrow') : UI.formatDate(p.dueDate);
      const overdue = p.dueDate < td;
      return `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.8125rem 1.25rem;border-bottom:1px solid var(--border)">
        <div class="dot" style="background:${pColor[p.priority]||'var(--blue)'}"></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:0.875rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.title}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.125rem">${p.category}</div>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.75rem;color:${overdue||p.dueDate===td?'var(--red)':'var(--text-muted)'};flex-shrink:0">${lbl}</div>
      </div>`;
    }).join('');
  },

  // ── Investment pie ──────────────────────────────────────
  renderInvestPie() {
    const assets     = Store.getInvestments().assets;
    const settings   = Store.getSettings();
    const displayCur = settings.displayCurrency || 'USD';
    const rate       = Number(settings.exchangeRate) || 1;
    const userSym    = settings.currency || '$';
    const sym        = displayCur === 'USD' ? '$' : userSym;
    const prices     = Store.get('inv_prices') || {};
    const ratesMap   = settings.rates || {};
    const _usdRate   = code => (!code || code === 'USD') ? 1 : (ratesMap[code] || (code === 'TRY' ? (Number(settings.tryRate) || rate || 35) : 1));
    const _toDisp    = (price, aCur) => {
      const priceUSD = aCur === 'USD' ? price : price / _usdRate(aCur);
      return displayCur === 'USD' ? priceUSD : priceUSD * rate;
    };

    const today = UI.today();
    const depItems = (Store.getDeposits ? Store.getDeposits() : []).map(dep => {
      const p2     = Number(dep.principal) || 0;
      const r2     = Number(dep.rate) || 0;
      const start  = dep.startDate || today;
      const elapsed = Math.max(0, Math.round((new Date(today) - new Date(start)) / 86400000));
      const dailyRate = r2 / 100 / 365;
      const curVal = dep.type === 'term'
        ? p2 + p2 * dailyRate * Math.min(elapsed, Number(dep.termDays) || 30)
        : p2 * Math.pow(1 + dailyRate, elapsed);
      const depCode = dep.currency || 'TRY';
      const value   = _toDisp(curVal, depCode);
      return { symbol: dep.bankName || 'Mevduat', value, type: 'Deposit' };
    });

    const items = assets.map(a => {
      const rawPrice = prices[a.symbol]?.price || a.buyPrice || 0;
      const value    = _toDisp(rawPrice, a.buyCurrency || 'USD') * (a.quantity || 0);
      let type = a.assetType || 'Stock';
      if (type === 'Stock' && a.buyCurrency != null) type = 'StockOther';
      return { symbol: a.symbol, value, type };
    }).concat(depItems);

    InvPieCharts.render('dash-pie-container', items, {
      prefix: 'dash',
      mask:   v => UI.maskCurrency(v, sym),
      externalTooltip: false,
    });
  },

  // ── Focus Mode ──────────────────────────────────────────
  renderFocusMode() {
    const logs     = Store.getTime().logs;
    const sessions = Store.getPomo().sessions;
    const td       = UI.today();
    const today    = new Date();

    const weekAgo  = (() => { const d = new Date(); d.setDate(d.getDate() - 6);  return d.toISOString().split('T')[0]; })();
    const monthAgo = (() => { const d = new Date(); d.setDate(d.getDate() - 29); return d.toISOString().split('T')[0]; })();

    const c = document.getElementById('focus-status');
    if (!logs.length && !sessions.length) {
      c.innerHTML = UI.emptyState(UI.t('dash_focus_no_logs'), 'clock');
      lucide.createIcons({ nodes: [c] }); return;
    }

    // Zaman istatistikleri (time tracking)
    const todayMins = logs.filter(l => l.date === td).reduce((a, l) => a + l.duration, 0);
    const weekMins  = logs.filter(l => l.date >= weekAgo).reduce((a, l) => a + l.duration, 0);
    const monthMins = logs.filter(l => l.date >= monthAgo).reduce((a, l) => a + l.duration, 0);

    // Bu hafta kategori dağılımı (top 4)
    const catTotals = {};
    logs.filter(l => l.date >= weekAgo).forEach(l => {
      catTotals[l.category] = (catTotals[l.category] || 0) + l.duration;
    });
    const topCats = Object.entries(catTotals).sort(([, a], [, b]) => b - a).slice(0, 4);
    const maxCat  = topCats[0]?.[1] || 1;

    const kpi = FocusWidget.getKPIData();
    const catColors = ['var(--accent)', 'var(--green)', 'var(--blue)', 'var(--yellow)'];

    const statBlock = (label, mins) => `
      <div style="background:var(--bg-elevated);padding:0.875rem;text-align:center">
        <div style="font-family:var(--font-display);font-size:1.25rem;font-weight:700;color:var(--text-primary);line-height:1.1">${mins > 0 ? UI.fmtMinutesHM(mins) : '—'}</div>
        <div style="font-size:0.625rem;color:var(--text-muted);margin-top:0.3125rem;letter-spacing:0.05em;text-transform:uppercase">${label}</div>
      </div>`;

    c.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border);border-radius:var(--radius-sm);overflow:hidden;margin-bottom:0.875rem">
        ${statBlock(UI.t('dash_today'),        todayMins)}
        ${statBlock(UI.t('dash_week_total'),   weekMins)}
        ${statBlock(UI.t('dash_focus_month'),  monthMins)}
      </div>

      ${topCats.length ? `
      <div style="margin-bottom:0.875rem">
        <div style="font-size:0.625rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.5625rem">${UI.t('dash_focus_cats_week')}</div>
        ${topCats.map(([cat, mins], i) => `
          <div style="display:flex;align-items:center;gap:0.625rem;margin-bottom:0.4375rem">
            <span style="font-size:0.75rem;color:var(--text-secondary);min-width:4.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cat}</span>
            <div style="flex:1;height:0.25rem;border-radius:0.1875rem;background:var(--bg-base);overflow:hidden">
              <div style="height:100%;width:${(mins / maxCat * 100).toFixed(0)}%;background:${catColors[i]};border-radius:0.1875rem"></div>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.6875rem;color:var(--text-secondary);min-width:3.5rem;text-align:right">${UI.fmtMinutesHM(mins)}</span>
          </div>`).join('')}
      </div>` : ''}

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;border-radius:var(--radius-sm);overflow:hidden;border:1px solid var(--border)">
        <div style="background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.75rem 0.5rem;border-right:1px solid var(--border)">
          <svg data-lucide="timer" style="width:0.9375rem;height:0.9375rem;color:var(--accent);flex-shrink:0"></svg>
          <div style="text-align:center">
            <div style="font-family:var(--font-mono);font-size:0.9375rem;font-weight:700;color:${kpi.sessionCount > 0 ? 'var(--accent)' : 'var(--text-muted)'};line-height:1">${kpi.sessionCount > 0 ? UI.t('pomo_sessions_n', kpi.sessionCount) : '—'}</div>
            <div style="font-size:0.625rem;color:var(--text-muted);margin-top:0.25rem;text-transform:uppercase;letter-spacing:0.05em">${UI.t('pomo_kpi_today')}</div>
          </div>
        </div>
        <div style="background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.75rem 0.5rem;border-right:1px solid var(--border)">
          <svg data-lucide="clock" style="width:0.9375rem;height:0.9375rem;color:var(--green);flex-shrink:0"></svg>
          <div style="text-align:center">
            <div style="font-family:var(--font-mono);font-size:0.9375rem;font-weight:700;color:${kpi.flowMins > 0 ? 'var(--green)' : 'var(--text-muted)'};line-height:1">${kpi.flowMins > 0 ? UI.fmtMinutes(kpi.flowMins) : '—'}</div>
            <div style="font-size:0.625rem;color:var(--text-muted);margin-top:0.25rem;text-transform:uppercase;letter-spacing:0.05em">${UI.t('pomo_kpi_flow')}</div>
          </div>
        </div>
        <div style="background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.75rem 0.5rem">
          <svg data-lucide="flame" style="width:0.9375rem;height:0.9375rem;color:var(--yellow);flex-shrink:0"></svg>
          <div style="text-align:center">
            <div style="font-family:var(--font-mono);font-size:0.9375rem;font-weight:700;color:${kpi.streak > 0 ? 'var(--yellow)' : 'var(--text-muted)'};line-height:1">${kpi.streak > 0 ? UI.t('dash_focus_streak_days', kpi.streak) : '—'}</div>
            <div style="font-size:0.625rem;color:var(--text-muted);margin-top:0.25rem;text-transform:uppercase;letter-spacing:0.05em">${UI.t('dash_focus_streak')}</div>
          </div>
        </div>
      </div>
    `;
    lucide.createIcons({ nodes: [c] });
  },

  // ── Goals (Hayaller) ────────────────────────────────────
  renderGoals() {
    const { items } = Store.getGoals();
    const c = document.getElementById('goals-status');
    const active = items.filter(g => g.progress < 100).slice(0, 5);
    const done   = items.filter(g => g.progress >= 100).length;

    if (!items.length) {
      c.innerHTML = UI.emptyState(UI.t('dash_no_goals'), 'star');
      lucide.createIcons({ nodes: [c] }); return;
    }

    c.innerHTML = `
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;padding:0.75rem;background:var(--bg-elevated);border-radius:var(--radius-sm)">
        <div style="text-align:center;flex:1">
          <div style="font-family:var(--font-display);font-size:1.375rem;font-weight:700;color:var(--text-primary);line-height:1">${active.length}</div>
          <div style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.1875rem;letter-spacing:0.04em;text-transform:uppercase">${UI.t('dash_in_progress')}</div>
        </div>
        <div style="width:1px;height:2.25rem;background:var(--border)"></div>
        <div style="text-align:center;flex:1">
          <div style="font-family:var(--font-display);font-size:1.375rem;font-weight:700;color:var(--green);line-height:1">${done}</div>
          <div style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.1875rem;letter-spacing:0.04em;text-transform:uppercase">${UI.t('dash_completed')}</div>
        </div>
      </div>
      ${active.map(g => {
        const col = g.color || '#7C6CFC';
        return `
        <div style="margin-bottom:0.875rem">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.375rem">
            <div style="display:flex;align-items:center;gap:0.4375rem;min-width:0">
              ${g.emoji ? `<span style="font-size:0.9375rem">${g.emoji}</span>` : ''}
              <span style="font-size:0.8125rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-primary)">${UI.esc(g.title)}</span>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.75rem;color:${col};font-weight:600;flex-shrink:0;margin-left:0.5rem">%${g.progress}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${g.progress}%;background:${col}"></div>
          </div>
        </div>`;
      }).join('')}
    `;
  },

  // ── Gym summary ─────────────────────────────────────────
  renderGym() {
    const { workouts } = Store.getGym();
    const c = document.getElementById('gym-status');

    if (!workouts || !workouts.length) {
      c.innerHTML = UI.emptyState(UI.t('dash_no_workouts'), 'dumbbell');
      lucide.createIcons({ nodes: [c] });
      return;
    }

    const today   = new Date();
    const from    = this._periodFrom();

    const weekWorkouts = workouts.filter(w => w.date >= from);
    const weekCount    = weekWorkouts.length;
    const weekMins     = weekWorkouts.reduce((a, w) => a + (w.duration || 0), 0);

    const _gymOffDays = new Set((Store.get('gym_cfg') || {}).offDays || []);
    let streak = 0;
    let _cur = new Date(today);
    for (let i = 0; i <= 365; i++) {
      const ds  = _cur.getFullYear() + '-' + String(_cur.getMonth()+1).padStart(2,'0') + '-' + String(_cur.getDate()).padStart(2,'0');
      const dow = _cur.getDay();
      if (_gymOffDays.has(dow)) { _cur.setDate(_cur.getDate() - 1); continue; }
      if (workouts.some(w => w.date === ds)) { streak++; _cur.setDate(_cur.getDate() - 1); }
      else break;
    }

    const allSorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date));
    const recent    = allSorted.slice(0, 2);

    const typeColors = {
      strength:    'var(--accent)',
      cardio:      'var(--green)',
      flexibility: 'var(--blue)',
      crossfit:    'var(--yellow)',
      sport:       '#F87171',
      other:       'var(--text-muted)'
    };

    const statCell = (label, val, color) => `
      <div style="background:var(--bg-elevated);padding:0.875rem;text-align:center">
        <div style="font-family:var(--font-display);font-size:1.25rem;font-weight:700;color:${color};line-height:1.1">${val}</div>
        <div style="font-size:0.625rem;color:var(--text-muted);margin-top:0.3125rem;letter-spacing:0.05em;text-transform:uppercase">${label}</div>
      </div>`;

    const exDetailHtml = exs => exs.map(ex => {
      let meta;
      if (ex.muscle === 'cardio') {
        meta = [ex.exDuration ? ex.exDuration + ' dk' : '', ex.exDistance ? ex.exDistance + ' km' : ''].filter(Boolean).join(' · ');
      } else {
        meta = [ex.sets ? ex.sets + ' set' : '', ex.reps ? ex.reps + ' tekrar' : '', ex.weight ? ex.weight + ' kg' : ''].filter(Boolean).join(' · ');
      }
      return `<div style="display:flex;align-items:center;justify-content:space-between;padding:0.4375rem 0.75rem;border-bottom:1px solid var(--border)">
        <span style="font-size:0.75rem;color:var(--text-primary)">${ex.name || '—'}</span>
        <span style="font-size:0.6875rem;font-family:var(--font-mono);color:var(--text-muted)">${meta || '—'}</span>
      </div>`;
    }).join('');

    c.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border);border-radius:var(--radius-sm);overflow:hidden;margin-bottom:0.875rem">
        ${statCell(UI.t('dash_week_total'),    weekCount > 0 ? weekCount : '—',                         weekCount > 0 ? 'var(--accent)'  : 'var(--text-muted)')}
        ${statCell(UI.t('dash_gym_week_dur'),  weekMins  > 0 ? UI.fmtMinutes(weekMins) : '—',           'var(--text-primary)')}
        ${statCell(UI.t('dash_gym_streak_lbl'), streak > 0 ? UI.t('dash_focus_streak_days', streak) : '—', streak > 0 ? 'var(--yellow)' : 'var(--text-muted)')}
      </div>
      <div>
        ${recent.map(w => {
          const exs        = w.exercises || [];
          const hasDetail  = exs.length > 0;
          const rowStyle   = hasDetail
            ? 'display:flex;align-items:center;gap:0.75rem;padding:0.625rem 0;border-bottom:1px solid var(--border);cursor:pointer;transition:background 150ms ease-out'
            : 'display:flex;align-items:center;gap:0.75rem;padding:0.625rem 0;border-bottom:1px solid var(--border)';
          return `
            <div style="position:relative">
              <div class="gym-wd-row" style="${rowStyle}"${hasDetail ? ` onclick="Dashboard.toggleWorkoutDetail('${w.id}', this)"` : ''}>
                <div style="width:3px;height:2.25rem;border-radius:2px;background:${typeColors[w.type] || 'var(--text-muted)'};flex-shrink:0"></div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:0.8125rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${UI.t('gym_type_' + (w.type || 'other'))}</div>
                  <div style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.125rem">${UI.formatDate(w.date)}${exs.length ? ' · ' + exs.length + ' ' + UI.t('dash_gym_exercises') : ''}</div>
                </div>
                <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-secondary);flex-shrink:0">${UI.fmtMinutes(w.duration || 0)}</div>
                ${hasDetail ? `<svg data-lucide="chevron-down" class="gym-wd-chevron" style="width:0.8125rem;height:0.8125rem;color:var(--text-muted);margin-left:0.25rem;flex-shrink:0;transition:transform 200ms ease-out"></svg>` : ''}
              </div>
              ${hasDetail ? `
                <div
                  id="gym-wdd-${w.id}"
                  class="gym-wd-detail"
                  style="display:none;position:absolute;left:0;right:0;top:100%;z-index:120;background:var(--bg-surface);border:1px solid var(--border);border-top:none;border-radius:0 0 var(--radius-sm) var(--radius-sm);box-shadow:0 12px 40px rgba(0,0,0,0.45)">
                  ${exDetailHtml(exs)}
                  ${w.notes ? `<div style="padding:0.4375rem 0.75rem;font-size:0.6875rem;color:var(--text-muted);border-top:1px solid var(--border)">${UI.esc(w.notes)}</div>` : ''}
                </div>` : ''}
            </div>`;
        }).join('')}
      </div>
      ${allSorted.length > 2 ? `<div style="padding:0.5rem 0.75rem;border-top:1px solid var(--border)">
        <button class="btn btn-secondary lt-show-more-btn" onclick="Dashboard.showGymMore(this)">
          <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem"></svg>
          ${UI.t('dash_n_more', allSorted.length - 2)}
        </button>
      </div>` : ''}`;

    const gymPanel = c.closest('.panel');
    if (gymPanel) gymPanel.style.overflow = 'visible';

    lucide.createIcons({ nodes: [c] });
  },

  toggleWorkoutDetail(id, row) {
    const panel   = document.getElementById(`gym-wdd-${id}`);
    if (!panel) return;
    const chevron = row?.querySelector('.gym-wd-chevron');
    const isOpen  = panel.style.display !== 'none';

    document.querySelectorAll('.gym-wd-detail').forEach(el => {
      if (el.id !== `gym-wdd-${id}`) {
        el.style.display = 'none';
        const sibRow = el.previousElementSibling;
        const c = sibRow?.querySelector('.gym-wd-chevron');
        if (c) c.style.transform = '';
        if (sibRow) sibRow.style.background = '';
      }
    });

    panel.style.display = isOpen ? 'none' : 'block';
    if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
    if (row) row.style.background = isOpen ? '' : 'var(--bg-elevated)';
  },

  showGymMore(btn) {
    const { workouts } = Store.getGym();
    const allSorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date));
    const more = allSorted.slice(2);
    if (!more.length) return;

    const typeColors = {
      strength: 'var(--accent)', cardio: 'var(--green)', flexibility: 'var(--blue)',
      crossfit: 'var(--yellow)', sport: '#F87171', other: 'var(--text-muted)',
    };

    const html = more.map(w => {
      const exs = w.exercises || [];
      const exChips = exs.map(ex => {
        let meta;
        if (ex.muscle === 'cardio') {
          meta = [ex.exDuration ? ex.exDuration + ' dk' : '', ex.exDistance ? ex.exDistance + ' km' : ''].filter(Boolean).join(' · ');
        } else {
          meta = [ex.sets ? ex.sets + ' set' : '', ex.reps ? ex.reps + ' tekrar' : '', ex.weight ? ex.weight + ' kg' : ''].filter(Boolean).join(' · ');
        }
        return `<span style="font-size:0.6875rem;padding:0.125rem 0.4375rem;border-radius:0.3125rem;background:var(--bg-elevated);color:var(--text-secondary);font-family:var(--font-mono);border:1px solid var(--border)">${ex.name || '—'}${meta ? ' · ' + meta : ''}</span>`;
      }).join('');
      return `<div style="padding:0.75rem 1rem;border-bottom:1px solid var(--border)">
        <div style="display:flex;align-items:center;gap:0.625rem;margin-bottom:${exs.length ? '0.5rem' : '0'}">
          <div style="width:3px;height:2.25rem;border-radius:2px;background:${typeColors[w.type] || 'var(--text-muted)'};flex-shrink:0"></div>
          <div style="flex:1;min-width:0">
            <div style="font-size:0.8125rem;font-weight:500">${UI.t('gym_type_' + (w.type || 'other'))}</div>
            <div style="font-size:0.6875rem;color:var(--text-muted);margin-top:0.125rem">${UI.formatDate(w.date)}</div>
          </div>
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-secondary);flex-shrink:0">${UI.fmtMinutes(w.duration || 0)}</div>
        </div>
        ${exChips ? `<div style="display:flex;flex-wrap:wrap;gap:0.25rem;padding-left:0.8125rem">${exChips}</div>` : ''}
      </div>`;
    }).join('');

    UI.showExpandOverlay(btn, UI.t('nav_gym'), html);
  },

  // ── Budget status ───────────────────────────────────────
  renderBudgetStatus() {
    const { groups, transactions } = Store.getBudget();
    const cur = Store.getSettings().currency || '₺';
    const c   = document.getElementById('budget-status');
    const tx  = transactions;

    if (!groups.length) {
      const cats = {};
      tx.filter(t => t.type === 'expense').forEach(t => {
        const key = t.category || 'Diğer';
        cats[key] = (cats[key]||0) + t.amount;
      });
      const sorted = Object.entries(cats).sort(([,a],[,b]) => b-a).slice(0, 5);
      const max    = sorted[0]?.[1] || 1;
      const cols   = ['#7C6CFC','#34D399','#60A5FA','#FBBF24','#F87171'];
      if (!sorted.length) { c.innerHTML = UI.emptyState(UI.t('dash_no_spending'), 'wallet'); lucide.createIcons({nodes:[c]}); return; }
      c.innerHTML = sorted.map(([cat, amt], i) => `
        <div style="margin-bottom:1rem">
          <div style="display:flex;justify-content:space-between;margin-bottom:0.375rem">
            <span style="font-size:0.8125rem;color:var(--text-secondary)">${cat}</span>
            <span style="font-family:var(--font-mono);font-size:0.8125rem;font-weight:600">${UI.maskCurrency(amt, cur)}</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${(amt/max*100).toFixed(0)}%;background:${cols[i]}"></div></div>
        </div>`).join('');
      return;
    }

    const expGroups = groups.filter(g => g.type === 'expense');
    if (!expGroups.length) { c.innerHTML = UI.emptyState(UI.t('dash_no_spending'), 'wallet'); return; }

    c.innerHTML = expGroups.map(g => {
      const budget = g.subs.reduce((a, s) => a + s.budget, 0);
      const real   = tx.filter(t => t.groupId === g.id).reduce((a, t) => a + t.amount, 0);
      const pct    = budget > 0 ? Math.min(Math.round(real/budget*100), 100) : 0;
      const over   = real > budget;
      return `<div style="margin-bottom:1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:0.375rem">
          <span style="font-size:0.8125rem;color:var(--text-secondary);display:flex;align-items:center;gap:0.375rem">
            <span style="width:0.5rem;height:0.5rem;border-radius:0.125rem;background:${g.color};display:inline-block"></span>
            ${g.name}
          </span>
          <span style="font-family:var(--font-mono);font-size:0.75rem;color:${over?'var(--red)':'var(--text-muted)'}">
            ${UI.maskCurrency(real,cur)} / ${UI.maskCurrency(budget,cur)}
          </span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%;background:${over?'var(--red)':g.color}"></div>
        </div>
      </div>`;
    }).join('');
  }
};
