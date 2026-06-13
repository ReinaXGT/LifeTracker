const Investments = (() => {
  let _currency = 'USD';
  let _addDateCdp  = null;
  let _editDateCdp = null;
  let _addAssetModal     = null;
  let _editAssetModal    = null;
  let _manualPriceModal  = null;

  const PRICE_TTL = 24 * 60 * 60 * 1000; // 24 hours — end-of-day
  const HIST_TTL  = 24 * 60 * 60 * 1000; // history cache same TTL
  const AV_DELAY  = 13000; // 5 req/min → 13s gap

  const _today = () => new Date().toISOString().split('T')[0];

  function _getApiKeys() {
    const s = Store.getSettings();
    return {
      avKey: s.avKey || '',
      fxKey: s.fxKey || '',
    };
  }

  const _SYM_TO_CODE = { '$':'USD','€':'EUR','£':'GBP','¥':'JPY','元':'CNY','₹':'INR','R$':'BRL','Mex$':'MXN','₽':'RUB','฿':'THB','₺':'TRY' };
  const _CODE_TO_SYM = { USD:'$',EUR:'€',GBP:'£',JPY:'¥',CNY:'元',INR:'₹',BRL:'R$',MXN:'Mex$',RUB:'₽',THB:'฿',TRY:'₺' };
  const _getCurrencySymbol = code => _CODE_TO_SYM[code] || code;

  function _getCurrencyCode() {
    const sym = Store.getSettings().currency || '₺';
    return _SYM_TO_CODE[sym] || 'TRY';
  }

  function _getTryRate() {
    const s = Store.getSettings();
    return Number(s.tryRate) || Number(s.exchangeRate) || 35;
  }

  // ── display helpers ───────────────────────────────────────
  const _TYPE_COLORS = {
    Stock: '#7C6CFC', Crypto: '#34D399', ETF: '#60A5FA',
    Commodity: '#FBBF24', Bond: '#F87171', Cash: '#94A3B8',
  };
  const _PALETTE = ['#7C6CFC','#34D399','#60A5FA','#FBBF24','#F87171','#F472B6','#A78BFA','#FB923C','#22D3EE','#4ADE80','#E879F9','#FCD34D'];
  const _col     = t => _TYPE_COLORS[t] || '#7C6CFC';
  const _palCol  = i => _PALETTE[i % _PALETTE.length];
  const _TYPE_I18N = { Stock:'inv_type_stock_lbl', ETF:'inv_type_etf_lbl', Crypto:'inv_type_crypto_lbl', Commodity:'inv_type_commodity_lbl', Bond:'inv_type_bond_lbl', Cash:'inv_type_cash_lbl' };
  const _typeLabel = t => UI.t(_TYPE_I18N[t] || t);
  const _sym    = () => _currency === 'USD' ? '$' : (Store.getSettings().currency || '$');
  const _mask   = v => UI.maskCurrency(v, _sym());
  const _fmtPct = v => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;

  // ── PnL period selection ──────────────────────────────────
  let _pnlPeriod = 'total';
  let _avRateLimited = false;
  function _getPnlPeriods() {
    return [
      { key: 'total',   label: UI.t('inv_pnl_total')           },
      { key: 'daily',   label: UI.t('inv_pnl_daily'),   days: 1  },
      { key: 'weekly',  label: UI.t('inv_pnl_weekly'),  days: 7  },
      { key: 'monthly', label: UI.t('inv_pnl_monthly'), days: 30 },
    ];
  }
  const _PNL_PERIODS = [
    { key: 'total',   label: 'Toplam K/Z'              },
    { key: 'daily',   label: 'Günlük K/Z',   days: 1  },
    { key: 'weekly',  label: 'Haftalık K/Z', days: 7  },
    { key: 'monthly', label: 'Aylık K/Z',    days: 30 },
  ];

  // ── price & history cache ─────────────────────────────────
  const _getPrices  = () => Store.get('inv_prices')  || {};
  const _setPrices  = p  => Store.set('inv_prices', p);
  const _getHistory = () => Store.get('inv_history') || {};
  const _setHistory = h  => Store.set('inv_history', h);

  // ── date utils ────────────────────────────────────────────
  function _dateAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  }

  function _priceOnOrBefore(series, dateStr) {
    const dates = Object.keys(series).sort().reverse();
    for (const d of dates) {
      if (d <= dateStr) return series[d];
    }
    return null;
  }

  // ── portfolio return calculation ──────────────────────────
  // period: 1 | 7 | 30 | 90 | 'all'
  function _calcReturn(period) {
    const assets = Store.getInvestments().assets || [];
    if (!assets.length) return null;

    const prices  = _getPrices();
    const history = _getHistory();
    const toUSD   = (p, asset) => { const c = _assetCur(asset.symbol, asset.buyCurrency); return c === 'USD' ? p : p / _getUSDRate(c); };

    let num = 0, den = 0;
    for (const a of assets) {
      const qty    = Number(a.quantity) || 0;
      const buyRaw = Number(a.buyPrice) || 0;
      if (!qty || !buyRaw) continue;

      // Güncel fiyat: cache varsa kullan, yoksa alış fiyatı (0 getiri)
      const curRaw = prices[a.symbol]?.price || buyRaw;
      let   pastRaw;

      if (period === 'all') {
        // Tüm zamanlar: alış fiyatından bu yana
        pastRaw = buyRaw;
      } else {
        const periodStart  = _dateAgo(period);
        const purchaseDate = a.purchaseDate || null;

        if (purchaseDate && purchaseDate > periodStart) {
          // Asset bought within this period → use buy price as baseline
          pastRaw = buyRaw;
        } else {
          const series       = history[a.symbol]?.series;
          const maxStaleDate = _dateAgo(period + 10);
          const foundDate    = series
            ? Object.keys(series).sort().reverse().find(d => d <= periodStart) || null
            : null;
          if (series) {
            // Has history: use only if fresh; skip asset if stale
            pastRaw = (foundDate && foundDate >= maxStaleDate) ? series[foundDate] : null;
            if (pastRaw == null) continue;
          } else {
            // No history (manually priced): use buy price as baseline
            pastRaw = buyRaw;
          }
        }
      }

      const cur  = toUSD(curRaw,  a);
      const past = toUSD(pastRaw, a);
      num += qty * (cur - past);
      den += qty * past;
    }
    return den > 0 ? (num / den) * 100 : null;
  }

  function _currentPrice(asset) {
    const cached = _getPrices()[asset.symbol];
    if (cached?.price) return cached.price;
    return Number(asset.currentPrice) || Number(asset.buyPrice) || 0;
  }

  // ── currency conversion ───────────────────────────────────
  // Returns: units of user's selected currency per 1 USD
  function _getRate() { return Number(Store.getSettings().exchangeRate) || 1; }

  // Returns units of `code` per 1 USD (e.g. TRY→38, EUR→0.92, USD→1)
  function _getUSDRate(code) {
    if (!code || code === 'USD') return 1;
    const s = Store.getSettings();
    if (s.rates && s.rates[code] > 0) return s.rates[code];
    if (code === 'TRY') return _getTryRate();
    if (code === _getCurrencyCode()) return _getRate();
    return 1;
  }

  function _assetCur(symbol, buyCurrency) {
    return buyCurrency || 'USD';
  }

  function _toDisplay(price, assetCur) {
    // Step 1: normalize to USD using per-currency rate
    const priceUSD = assetCur === 'USD' ? price : price / _getUSDRate(assetCur);
    // Step 2: convert USD → display currency
    if (_currency === 'USD') return priceUSD;
    return priceUSD * _getRate();
  }

  // ── portfolio build ───────────────────────────────────────
  function _buildPortfolio() {
    const rawAssets = (Store.getInvestments().assets || []).map(a => {
      const qty    = Number(a.quantity) || 0;
      const buyRaw = Number(a.buyPrice) || 0;
      const curRaw = _currentPrice(a);
      const aCur   = _assetCur(a.symbol, a.buyCurrency);

      const avgCost      = _toDisplay(buyRaw, aCur);
      const currentPrice = _toDisplay(curRaw, aCur);
      const totalValue   = qty * currentPrice;
      const invested     = qty * avgCost;
      const totalPnL     = totalValue - invested;
      const totalPnLPct  = invested > 0 ? (totalPnL / invested) * 100 : 0;

      let periodPnL = totalPnL, periodPnLPercent = totalPnLPct, periodNoHistory = false;
      if (_pnlPeriod !== 'total') {
        const def        = _PNL_PERIODS.find(p => p.key === _pnlPeriod);
        const series     = _getHistory()[a.symbol]?.series;
        const targetDate = _dateAgo(def.days);
        // Accept history only if the found data point is within (days+10) days of today
        // to avoid stale/migrated history data producing wildly wrong P&L figures
        const maxStaleDate = _dateAgo(def.days + 10);
        const foundDate  = series
          ? Object.keys(series).sort().reverse().find(d => d <= targetDate) || null
          : null;
        if (series) {
          // History series exists → validate staleness
          const pastRaw = (foundDate && foundDate >= maxStaleDate) ? series[foundDate] : null;
          if (pastRaw != null) {
            const pastDisplay = _toDisplay(pastRaw, aCur);
            const pastTotal   = qty * pastDisplay;
            periodPnL         = qty * (currentPrice - pastDisplay);
            periodPnLPercent  = pastTotal > 0 ? (periodPnL / pastTotal) * 100 : 0;
          } else {
            // Series exists but data is stale/missing → show dash
            periodNoHistory  = true;
            periodPnL        = 0;
            periodPnLPercent = 0;
          }
        }
        // No series → manually priced asset; keep initialized totalPnL as fallback
      }

      return {
        id: a.id,
        symbol:    a.symbol || a.name || '?',
        name:      a.name   || a.symbol || '?',
        assetType: a.assetType || 'Stock',
        quantity:  qty,
        avgCost,
        currentPrice,
        totalValue,
        totalPnL,
        totalPnLPercent: totalPnLPct,
        periodPnL,
        periodPnLPercent,
        periodNoHistory,
        dailyPnL: 0,
        dailyPnLPercent: 0,
        allocationPercent: 0,
      };
    });

    const totalValue    = rawAssets.reduce((s, a) => s + a.totalValue, 0);
    const totalInvested = rawAssets.reduce((s, a) => s + a.avgCost * a.quantity, 0);
    const totalPnL      = totalValue - totalInvested;
    const totalPnLPct   = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    rawAssets.forEach(a => {
      a.allocationPercent = totalValue > 0
        ? Math.round(a.totalValue / totalValue * 100) : 0;
    });

    return {
      baseCurrency: _currency,
      totalValue, totalInvested, totalPnL,
      totalPnLPercent: totalPnLPct,
      dailyPnL: 0, dailyPnLPercent: 0,
      assets: rawAssets,
    };
  }

  function _load() {
    const p = _buildPortfolio();
    document.getElementById('portfolioContent').style.display = 'block';
    _renderKPIs(p);
    _renderChart(p);
    _renderPerformance();
    _renderTable(p);
    _updateToggle();
    _updateRateDisplay();
    _updateRefreshBtn();
  }

  // ── render ────────────────────────────────────────────────
  function _renderKPIs(p) {
    const pUp = p.totalPnL >= 0;
    const lang = UI.getLang();
    const cards = [
      { label: UI.t('inv_kpi_portfolio_label'), value: _mask(p.totalValue), mono: true,
        icon: 'briefcase', iconColor: '#7C6CFC',
        change: `${_fmtPct(p.totalPnLPercent)} ${UI.t('inv_kpi_total_return')}`, changeUp: pUp },
      { label: UI.t('inv_pnl'), value: `${pUp ? '+' : ''}${_mask(p.totalPnL)}`, mono: true,
        icon: pUp ? 'trending-up' : 'trending-down', iconColor: pUp ? '#34D399' : '#F87171',
        change: `${_fmtPct(p.totalPnLPercent)} ${UI.t('inv_kpi_vs_invested')}`, changeUp: pUp },
      { label: UI.t('inv_total_cost'), value: _mask(p.totalInvested), mono: true,
        icon: 'circle-dollar-sign', iconColor: '#60A5FA',
        change: UI.t('inv_kpi_cost_basis'), changeUp: true },
      { label: UI.t('inv_kpi_asset_count_label'), value: String(p.assets.length), mono: false,
        icon: 'layers', iconColor: '#FBBF24',
        change: UI.t('inv_kpi_instruments'), changeUp: true },
    ];
    const grid = document.getElementById('kpi-grid');
    grid.className = 'kpi-grid';
    grid.innerHTML = cards.map(c => UI.kpiCard(c)).join('');
    lucide.createIcons({ nodes: [grid] });
  }

  function _renderChart(p) {
    const assets    = p.assets;
    const centerEl  = document.getElementById('alloc-center');
    const legendEl  = document.getElementById('alloc-legend');

    if (!assets.length) {
      if (centerEl) centerEl.innerHTML = '';
      legendEl.innerHTML =
        `<div style="color:var(--text-muted);font-size:0.8125rem;text-align:center;padding:1.25rem 0">${UI.t('inv_no_assets_legend')}</div>`;
      return;
    }

    const sorted = [...assets].sort((a, b) => b.allocationPercent - a.allocationPercent);
    const colors = sorted.map((_, i) => _palCol(i));
    Charts.doughnut('allocChart', sorted.map(a => a.symbol), sorted.map(a => a.allocationPercent), {
      colors,
      tip: ctx => `${ctx.label}: %${ctx.parsed} (${_mask(sorted[ctx.dataIndex].totalValue)})`,
    });

    if (centerEl) {
      centerEl.innerHTML = `
        <span style="font-family:var(--font-mono);font-size:clamp(1.25rem,3vw,1.75rem);font-weight:700;color:var(--text-primary);line-height:1">${assets.length}</span>
        <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:500;letter-spacing:.5px;margin-top:0.1875rem">${UI.t('inv_asset_label')}</span>`;
    }

    legendEl.innerHTML = sorted.map((a, i) => `
      <div class="legend-item" style="justify-content:space-between;width:100%;gap:0.375rem;min-width:0">
        <div style="display:flex;align-items:center;gap:0.375rem;min-width:0;flex:1;overflow:hidden">
          <div class="legend-dot" style="background:${colors[i]};flex-shrink:0"></div>
          <span style="font-size:0.8125rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">${a.symbol}</span>
          <span style="font-family:var(--font-mono);font-size:0.75rem;font-weight:700;color:${colors[i]};white-space:nowrap;flex-shrink:0">%${a.allocationPercent}</span>
          <span style="font-size:0.6875rem;color:var(--text-muted);white-space:nowrap;flex-shrink:0">${_typeLabel(a.assetType)}</span>
        </div>
      </div>`).join('');
  }

  function _renderTable(p) {
    const tbody  = document.getElementById('assetBody');
    const assets = p.assets;
    const prices = _getPrices();

    // Update column header label — innerHTML yalnızca ilk kurulumda yazılır;
    // sonraki render'larda sadece label span'ı güncellenir, menü DOM'dan silinmez.
    const th = document.getElementById('pnl-col-th');
    if (th) {
      const label = _getPnlPeriods().find(pd => pd.key === _pnlPeriod)?.label || UI.t('inv_pnl');
      let ls = th.querySelector('.pnl-period-label');
      if (!ls) {
        th.innerHTML = `<span class="pnl-period-label">${label}</span><span style="opacity:.45;font-size:0.5625rem"> ▾</span>`;
        th.onclick = () => Investments.togglePnlPeriodMenu(th);
      } else {
        ls.textContent = label;
      }
    }

    if (!assets.length) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:3rem;color:var(--text-muted)">
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem">
          <svg data-lucide="inbox" style="width:2.25rem;height:2.25rem;opacity:.2"></svg>
          <span style="font-size:0.875rem">${UI.t('inv_no_assets_table')}</span>
        </div></td></tr>`;
      lucide.createIcons({ nodes: [tbody] });
      return;
    }

    tbody.innerHTML = assets.map(a => {
      const color    = _col(a.assetType);
      const pUp      = a.totalPnL >= 0;
      const init     = (a.symbol || '?').slice(0, 2).toUpperCase();
      const cached   = prices[a.symbol];
      const priceAge = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:0.3125rem;margin-top:0.1875rem">
        ${cached ? `<span style="font-size:0.625rem;color:var(--text-muted);opacity:.7">${_relativeTime(cached.fetchedAt)}</span><span style="font-size:0.625rem;color:var(--text-muted);opacity:.35">·</span>` : ''}
        <button onclick="Investments.editManualPrice('${a.symbol}')"
          style="background:none;border:none;cursor:pointer;padding:2px 4px;color:var(--text-muted);display:flex;align-items:center;gap:2px;border-radius:0.25rem;transition:color .15s,background .15s"
          onmouseover="this.style.color='var(--accent)';this.style.background='rgba(124,108,252,.1)'"
          onmouseout="this.style.color='var(--text-muted)';this.style.background='transparent'"
          data-tooltip="${UI.t('inv_edit_price_title')}">
          <svg data-lucide="pencil-line" style="width:0.5625rem;height:0.5625rem"></svg>
        </button>
      </div>`;

      return `<tr class="inv-asset-row" data-id="${a.id}">
        <td>
          <div style="display:flex;align-items:center;gap:0.625rem">
            <div style="width:34px;height:34px;border-radius:0.5rem;background:${color}18;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid ${color}30">
              <span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:700;color:${color}">${init}</span>
            </div>
            <div>
              <div style="font-weight:600;font-size:0.875rem">${a.symbol}</div>
              <div style="font-size:0.75rem;color:var(--text-muted)">${a.name}</div>
            </div>
          </div>
        </td>
        <td><span class="badge" style="background:${color}15;color:${color};border:1px solid ${color}30">${_typeLabel(a.assetType)}</span></td>
        <td class="mono" style="text-align:right">${UI.isPrivate() ? '••••' : a.quantity}</td>
        <td class="mono" style="text-align:right;color:var(--text-secondary)">${_mask(a.avgCost)}</td>
        <td style="text-align:right;vertical-align:middle">
          <span class="mono" style="font-weight:600">${_mask(a.currentPrice)}</span>
          ${priceAge}
        </td>
        <td class="mono" style="text-align:right;font-weight:700">${_mask(a.totalValue)}</td>
        <td style="text-align:right">
          ${a.periodNoHistory
            ? `<span style="color:var(--text-muted);font-size:0.8125rem">—</span>`
            : `<span style="font-family:var(--font-mono);font-weight:600;color:${a.periodPnL >= 0 ? 'var(--green)' : 'var(--red)'}">${a.periodPnL >= 0 ? '+' : ''}${_mask(a.periodPnL)}</span>
               <div style="font-size:0.6875rem;font-weight:400;opacity:.8;color:${a.periodPnL >= 0 ? 'var(--green)' : 'var(--red)'}">${_fmtPct(a.periodPnLPercent)}</div>`
          }
        </td>
        <td class="mono" style="text-align:right;color:var(--accent);font-weight:600">%${a.allocationPercent}</td>
        <td style="padding:0.5rem 0.75rem;text-align:center">
          <div style="display:flex;gap:0.375rem;justify-content:center">
            <button class="btn btn-icon" onclick="Investments.editAsset('${a.id}')" data-tooltip="${UI.t('btn_edit')}"
                    style="color:var(--text-secondary);transition:background .15s,border-color .15s,color .15s"
                    onmouseenter="this.style.background='var(--bg-elevated)';this.style.borderColor='var(--border)';this.style.color='var(--text-primary)'"
                    onmouseleave="this.style.background='';this.style.borderColor='transparent';this.style.color='var(--text-secondary)'">
              <svg data-lucide="pencil"></svg>
            </button>
            <button class="btn btn-icon btn-danger" onclick="Investments.deleteAsset('${a.id}')" data-tooltip="${UI.t('btn_delete')}">
              <svg data-lucide="trash-2"></svg>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');
    lucide.createIcons({ nodes: [tbody] });
    _initAssetDrag();
  }

  function _initAssetDrag() {
    const tbody = document.getElementById('assetBody');
    if (!tbody) return;

    let _dragIdx = null;
    const rows = [...tbody.querySelectorAll('tr.inv-asset-row')];

    rows.forEach((row, idx) => {
      row.draggable = true;

      row.addEventListener('dragstart', e => {
        if (e.target.closest('button')) { e.preventDefault(); return; }
        _dragIdx = idx;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => row.classList.add('inv-dragging'), 0);
      });

      row.addEventListener('dragend', () => {
        row.classList.remove('inv-dragging');
        rows.forEach(r => r.classList.remove('inv-drag-over-top', 'inv-drag-over-bot'));
        _dragIdx = null;
      });

      row.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        rows.forEach(r => r.classList.remove('inv-drag-over-top', 'inv-drag-over-bot'));
        const mid = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2;
        row.classList.add(e.clientY < mid ? 'inv-drag-over-top' : 'inv-drag-over-bot');
      });

      row.addEventListener('dragleave', e => {
        if (!row.contains(e.relatedTarget)) {
          row.classList.remove('inv-drag-over-top', 'inv-drag-over-bot');
        }
      });

      row.addEventListener('drop', e => {
        e.preventDefault();
        row.classList.remove('inv-drag-over-top', 'inv-drag-over-bot');
        const fromIdx = _dragIdx;
        if (fromIdx === null || fromIdx === idx) return;

        const inv    = Store.getInvestments();
        const assets = [...inv.assets];
        const [moved] = assets.splice(fromIdx, 1);

        const mid      = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2;
        let insertAt   = e.clientY < mid ? idx : idx + 1;
        if (fromIdx < idx) insertAt = Math.max(0, insertAt - 1);

        assets.splice(Math.min(assets.length, insertAt), 0, moved);
        Store.setInvestments({ ...inv, assets });

        const p = _buildPortfolio();
        _renderKPIs(p);
        _renderChart(p);
        _renderTable(p);
      });
    });
  }

  function _renderPerformance() {
    const el = document.getElementById('perf-panel');
    if (!el) return;

    const periods = [
      { label: UI.t('inv_period_daily'),   days: 1     },
      { label: UI.t('inv_period_weekly'),  days: 7     },
      { label: UI.t('inv_period_monthly'), days: 30    },
      { label: UI.t('inv_period_3month'),  days: 90    },
      { label: UI.t('inv_period_alltime'), days: 'all' },
    ];

    el.innerHTML = periods.map((p, i) => {
      const ret    = _calcReturn(p.days);
      const last   = i === periods.length - 1;
      const border = last ? '' : 'border-bottom:1px solid var(--border)';

      if (ret === null) {
        return `<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;${border}">
          <span style="font-size:0.8125rem;font-weight:500;color:var(--text-secondary)">${p.label}</span>
          <span style="font-size:0.75rem;color:var(--text-muted)">—</span>
        </div>`;
      }

      const up    = ret >= 0;
      const color = up ? 'var(--green)' : 'var(--red)';
      const tri   = up ? '▲' : '▼';
      const pct   = `${Math.abs(ret).toFixed(2)}%`;

      return `<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;${border}">
        <span style="font-size:0.8125rem;font-weight:500">${p.label}</span>
        <div style="display:flex;align-items:center;gap:7px">
          <span style="font-size:0.625rem;color:${color};line-height:1">${tri}</span>
          <span style="font-family:var(--font-mono);font-size:0.875rem;font-weight:700;color:${color}">${pct}</span>
        </div>
      </div>`;
    }).join('');
  }

  function _updateToggle() {
    const userCode = _getCurrencyCode();
    const s        = Store.getSettings();
    const userSym  = s.currency || '₺';

    const toggleSection = document.getElementById('currencyToggleSection');
    if (toggleSection) toggleSection.style.display = userCode === 'USD' ? 'none' : '';

    const userBtn = document.getElementById('toggleUSER');
    const usdBtn  = document.getElementById('toggleUSD');
    if (userBtn) {
      userBtn.textContent = `${userSym} ${userCode}`;
      userBtn.className = _currency !== 'USD' ? 'btn btn-primary' : 'btn btn-secondary';
    }
    if (usdBtn) {
      usdBtn.className = _currency === 'USD' ? 'btn btn-primary' : 'btn btn-secondary';
    }
  }

  function _updateRateDisplay() {
    const s       = Store.getSettings();
    const rate    = s.exchangeRate || 1;
    const userSym = s.currency || '₺';
    const userCode = _getCurrencyCode();

    const section = document.getElementById('exchangeRateSection');
    if (section) section.style.display = userCode === 'USD' ? 'none' : '';

    const el = document.getElementById('exchangeRateInput');
    if (el) { el.value = Math.floor(rate * 10) / 10; el.style.width = (String(el.value).length + 0.3) + 'ch'; }

    const symEl = document.getElementById('rateCurrencySymbol');
    if (symEl) symEl.textContent = userSym;

    const ts   = s.exchangeRateFetchedAt;
    const info = document.getElementById('rateUpdateInfo');
    if (info) {
      const txt = ts ? _relativeTime(ts) : '';
      info.textContent = txt;
      info.style.display = txt ? '' : 'none';
    }
  }

  function _relativeTime(ts) {
    const diff = Date.now() - ts;
    const m    = Math.floor(diff / 60000);
    if (m < 1)   return UI.t('inv_just_now');
    if (m < 60)  return UI.t('inv_mins_ago', m);
    const h = Math.floor(m / 60);
    if (h < 24)  return UI.t('inv_hours_ago', h);
    return UI.t('inv_days_ago', Math.floor(h / 24));
  }

  // ── API: exchange rate ────────────────────────────────────
  // Fetches ONLY the active currency — 1 call per currency per day.
  // rates      = { EUR: 0.92, TRY: 38.5, ... }   units per 1 USD, accumulates over time
  // ratesDates = { EUR: '2026-05-19', TRY: '2026-05-18', ... }  date of last fetch per code
  // All non-EUR codes supported by the app (EUR is base on free tier → computed as 1/rates.USD)
  const _ALL_RATE_CODES = ['USD','GBP','JPY','CNY','INR','BRL','MXN','RUB','THB','TRY'];

  // First-time bulk fetch: pulls every supported currency in one request
  async function _fetchAllExchangeRates(fxKey) {
    const resp = await fetch(
      `https://api.exchangeratesapi.io/v1/latest?access_key=${encodeURIComponent(fxKey)}&symbols=${_ALL_RATE_CODES.join(',')}`
    );
    const data = await resp.json();
    if (!data.rates?.USD) return null;

    const cross = code => code === 'EUR'
      ? Math.round(10000 / data.rates.USD) / 10000
      : Math.round(data.rates[code] / data.rates.USD * 10000) / 10000;

    const today    = _today();
    const rates    = { USD: 1, EUR: cross('EUR') };
    const newDates = {};
    for (const code of _ALL_RATE_CODES) {
      if (data.rates[code]) {
        rates[code]    = cross(code);
        newDates[code] = today;
      }
    }
    return { rates, newDates };
  }

  async function _fetchExchangeRate(force = false) {
    const { fxKey } = _getApiKeys();
    if (!fxKey) return;

    const s          = Store.getSettings();
    const ratesDates = s.ratesDates || {};
    const today      = _today();
    const userCode   = _getCurrencyCode();

    try {
      let rates, newDates;

      // First connection or incomplete cache: bulk fetch if any supported currency is missing
      const existingRates = s.rates || {};
      const hasAnyRate = _ALL_RATE_CODES.every(c => existingRates[c] > 0);
      if (!hasAnyRate) {
        const result = await _fetchAllExchangeRates(fxKey);
        if (!result) return;
        rates    = { ...(s.rates || {}), ...result.rates };
        newDates = { ...ratesDates, ...result.newDates };
      } else {
        // Subsequent days: only refresh the active currency
        if (!force && ratesDates[userCode] === today) return;
        if (userCode === 'USD') return;

        const codes = new Set(['USD', userCode]);
        if (userCode !== 'TRY') codes.add('TRY');
        codes.delete('EUR');

        const resp = await fetch(
          `https://api.exchangeratesapi.io/v1/latest?access_key=${encodeURIComponent(fxKey)}&symbols=${[...codes].join(',')}`
        );
        const data = await resp.json();
        if (!data.rates?.USD) return;

        const cross = code => code === 'EUR'
          ? Math.round(10000 / data.rates.USD) / 10000
          : Math.round(data.rates[code] / data.rates.USD * 10000) / 10000;

        rates    = { ...(s.rates || {}), USD: 1, [userCode]: cross(userCode) };
        newDates = { ...ratesDates, [userCode]: today };
        if (data.rates.TRY) {
          rates.TRY    = cross('TRY');
          newDates.TRY = today;
        }
      }

      const userRate = userCode === 'USD' ? 1 : (rates[userCode] || 1);
      const tryRate  = rates.TRY || s.tryRate || 35;

      Store.setSettings({ ...Store.getSettings(), exchangeRate: userRate, tryRate, rates, ratesDates: newDates, exchangeRateFetchedAt: Date.now() });
      _updateRateDisplay();
      _load();
    } catch { /* keep cached values */ }
  }

  // ── API: asset prices (Alpha Vantage) ─────────────────────
  // buyCurrency=null/undefined means US market (NYSE/NASDAQ/Crypto) → auto-priceable via Alpha Vantage
  // buyCurrency set to ANY value (incl. 'USD') means OTHER exchange → manual price only
  function _canAutoPrice(assetType, buyCurrency) {
    if (buyCurrency != null) return false;
    return assetType === 'Stock' || assetType === 'ETF' || assetType === 'Crypto';
  }

  function _handleAvLimit() {
    if (_avRateLimited) return;
    _avRateLimited = true;
    UI.toast(UI.t('inv_api_limit'), 'warning');
  }

  async function _fetchPricesBackground() {
    const { avKey } = _getApiKeys();
    if (!avKey) return;

    _avRateLimited = false;
    const assets  = (Store.getInvestments().assets || []).filter(a => _canAutoPrice(a.assetType, a.buyCurrency));
    const prices  = _getPrices();
    const history = _getHistory();
    const now     = Date.now();
    const stale   = assets.filter(a => {
      const cached = prices[a.symbol];
      if (!cached || (now - cached.fetchedAt) > PRICE_TTL) return true;
      if (a.assetType !== 'Crypto' && (!history[a.symbol] || (now - history[a.symbol].fetchedAt) > HIST_TTL)) return true;
      return false;
    });

    if (!stale.length) return;

    _setPriceStatus('loading');

    for (const [i, asset] of stale.entries()) {
      if (_avRateLimited) break;
      if (i > 0) await _sleep(AV_DELAY);
      await _fetchOnePrice(asset);
    }

    _setPriceStatus('done');
  }

  async function _fetchOnePrice(asset) {
    const { avKey } = _getApiKeys();
    if (!avKey) return;
    try {
      if (asset.assetType === 'Crypto') {
        const resp  = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE` +
          `&from_currency=${encodeURIComponent(asset.symbol)}&to_currency=USD&apikey=${encodeURIComponent(avKey)}`
        );
        const data  = await resp.json();
        if (data?.Note || data?.Information) { _handleAvLimit(); return; }
        const price = parseFloat(data?.['Realtime Currency Exchange Rate']?.['5. Exchange Rate']);
        if (price > 0) {
          const prices = _getPrices();
          prices[asset.symbol] = { price, fetchedAt: Date.now() };
          _setPrices(prices);
          _load();
        }
      } else {
        // TIME_SERIES_DAILY: one call gives current price + 100-day history
        const resp   = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY` +
          `&symbol=${encodeURIComponent(asset.symbol)}&outputsize=compact&apikey=${encodeURIComponent(avKey)}`
        );
        const data   = await resp.json();
        if (data?.Note || data?.Information) { _handleAvLimit(); return; }
        const series = data?.['Time Series (Daily)'];
        if (!series) return;

        const dates  = Object.keys(series).sort().reverse();
        const latest = parseFloat(series[dates[0]]?.['4. close']);
        if (!(latest > 0)) return;

        const prices = _getPrices();
        prices[asset.symbol] = { price: latest, fetchedAt: Date.now() };
        _setPrices(prices);

        const hist = _getHistory();
        const compact = {};
        for (const [d, v] of Object.entries(series)) compact[d] = parseFloat(v['4. close']);
        hist[asset.symbol] = { series: compact, fetchedAt: Date.now() };
        _setHistory(hist);

        _load();
      }
    } catch { /* skip, continue loop */ }
  }

  function _setPriceStatus(state) {
    const el  = document.getElementById('priceStatusBadge');
    const svg = document.getElementById('refreshPricesBtn')?.querySelector('svg');
    if (!el) return;
    if (state === 'loading') {
      el.style.display = 'flex';
      el.innerHTML = `<svg data-lucide="refresh-cw" style="width:0.75rem;height:0.75rem;animation:spin .9s linear infinite"></svg><span>${UI.t('inv_updating')}</span>`;
      if (svg) svg.classList.add('spinning');
      lucide.createIcons({ nodes: [el] });
    } else {
      el.style.display = 'none';
      if (svg) svg.classList.remove('spinning');
    }
  }

  // ── refresh button state ──────────────────────────────────
  function _updateRefreshBtn() {
    const btn = document.getElementById('refreshPricesBtn');
    if (!btn) return;
    const COOLDOWN    = 60 * 60 * 1000;
    const lastRefresh = Store.get('inv_lastRefresh') || 0;
    const elapsed     = Date.now() - lastRefresh;
    if (elapsed < COOLDOWN) {
      const mins = Math.ceil((COOLDOWN - elapsed) / 60000);
      btn.dataset.tooltip = UI.t('inv_refresh_in', mins);
      btn.style.opacity = '0.4';
      btn.style.cursor  = 'not-allowed';
    } else {
      btn.dataset.tooltip = UI.t('inv_refresh_title');
      btn.style.opacity = '';
      btn.style.cursor  = '';
    }
  }

  // ── PnL period menu ──────────────────────────────────────
  function _togglePnlPeriodMenu(thEl) {
    if (!thEl._ddMenu || !thEl._ddMenu.isConnected) {
      thEl.style.position = 'relative';
      thEl.style.overflow = 'visible';
      const menu = document.createElement('div');
      menu.className = 'dd-menu dd-align-right dd-pnl-menu';
      thEl.appendChild(menu);
      thEl._ddMenu = menu;
      document.addEventListener('click', function (e) {
        if (menu.classList.contains('is-open') && !thEl.contains(e.target)) {
          menu.classList.remove('is-open');
        }
      }, true);
    }
    const menu = thEl._ddMenu;
    if (menu.classList.contains('is-open')) { menu.classList.remove('is-open'); return; }
    menu.innerHTML = _getPnlPeriods().map(pd => {
      const active = pd.key === _pnlPeriod;
      return `<div class="dd-item${active ? ' is-active' : ''}" data-pnl-key="${pd.key}">
        <span class="dd-item-label">${pd.label}</span>
        <svg class="dd-item-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>`;
    }).join('');
    menu.querySelectorAll('.dd-item').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        _setPnlPeriodFn(el.dataset.pnlKey);
        menu.classList.remove('is-open');
      });
    });
    menu.classList.add('is-open');
  }

  function _setPnlPeriodFn(key) {
    _pnlPeriod = key;
    Store.setSettings({ ...Store.getSettings(), pnlPeriod: key });
    _renderTable(_buildPortfolio());
  }

  // ── manual refresh (1h cooldown) ──────────────────────────
  async function _manualRefresh() {
    const COOLDOWN    = 60 * 60 * 1000;
    const lastRefresh = Store.get('inv_lastRefresh') || 0;
    const elapsed     = Date.now() - lastRefresh;

    if (elapsed < COOLDOWN) {
      const mins = Math.ceil((COOLDOWN - elapsed) / 60000);
      UI.toast(UI.t('inv_wait_min', mins), 'info');
      return;
    }

    // Tüm otomatik fiyatlanan varlıkların cache'ini sıfırla
    const assets = Store.getInvestments().assets || [];
    const prices = _getPrices();
    const hist   = _getHistory();
    for (const a of assets) {
      if (!_canAutoPrice(a.assetType, a.buyCurrency)) continue;
      if (prices[a.symbol]) prices[a.symbol].fetchedAt = 0;
      if (hist[a.symbol])   hist[a.symbol].fetchedAt   = 0;
    }
    _setPrices(prices);
    _setHistory(hist);

    Store.set('inv_lastRefresh', Date.now());
    _updateRefreshBtn();
    await _fetchPricesBackground();
  }

  const _sleep = ms => new Promise(r => setTimeout(r, ms));

  // ── themed dropdown items ─────────────────────────────────
  const _INV_TYPE_ITEMS    = () => [
    { value: 'Stock',     label: UI.t('inv_type_stock') },
    { value: 'ETF',       label: UI.t('inv_type_etf') },
    { value: 'Crypto',    label: UI.t('inv_type_crypto') },
    { value: 'Commodity', label: UI.t('inv_type_commodity') },
    { value: 'Bond',      label: UI.t('inv_type_bond') },
    { value: 'Cash',      label: UI.t('inv_type_cash') },
  ];
  const _INV_EXCHANGE_ITEMS = () => [
    { value: 'NYSE',  label: UI.t('inv_exchange_us') },
    { value: 'OTHER', label: UI.t('inv_exchange_other') },
  ];
  const _INV_CURRENCY_ITEMS = [
    { value: 'USD', label: '$ USD — ABD Doları' },
    { value: 'EUR', label: '€ EUR — Euro' },
    { value: 'GBP', label: '£ GBP — Sterlin' },
    { value: 'JPY', label: '¥ JPY — Japon Yeni' },
    { value: 'CNY', label: '元 CNY — Çin Yuanı' },
    { value: 'INR', label: '₹ INR — Hint Rupisi' },
    { value: 'BRL', label: 'R$ BRL — Brezilya Reali' },
    { value: 'MXN', label: 'Mex$ MXN — Meksika Pesosu' },
    { value: 'RUB', label: '₽ RUB — Rus Rublesi' },
    { value: 'THB', label: '฿ THB — Tayland Bahtı' },
    { value: 'TRY', label: '₺ TRY — Türk Lirası' },
  ];

  function _ddItems(kind) {
    if (kind === 'type')     return _INV_TYPE_ITEMS();
    if (kind === 'exchange') return _INV_EXCHANGE_ITEMS();
    return _INV_CURRENCY_ITEMS;
  }
  function _ddHiddenName(kind, prefix) {
    if (kind === 'type')     return `${prefix}AssetType`;
    if (kind === 'exchange') return `${prefix}Exchange`;
    return `${prefix}PriceCurrency`;
  }
  function _ddBtnId(kind, prefix) {
    if (kind === 'type')     return `${prefix}TypeDDBtn`;
    if (kind === 'exchange') return `${prefix}ExchangeDDBtn`;
    return `${prefix}CurrencyDDBtn`;
  }

  // Set dropdown value + update button label (used by editAsset)
  function _setDDVal(kind, prefix, value) {
    const name  = _ddHiddenName(kind, prefix);
    const btnId = _ddBtnId(kind, prefix);
    const inp   = document.querySelector(`[name="${name}"]`);
    if (inp) inp.value = value;
    const btn   = document.getElementById(btnId);
    if (btn) {
      const item = _ddItems(kind).find(i => i.value === value);
      if (item) btn.querySelector('.inv-dd-label').textContent = item.label;
    }
  }

  function openInvDropdown(btn, kind, prefix) {
    if (!btn._ddInst) {
      const name = _ddHiddenName(kind, prefix);
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = document.querySelector(`[name="${name}"]`)?.value || '';
          dd.setItems(_ddItems(kind).map(it => ({ ...it, active: it.value === cur })));
        },
        onSelect: (value) => {
          const inp = document.querySelector(`[name="${name}"]`);
          if (inp) { inp.value = value; inp.dispatchEvent(new Event('change')); }
          const item = _ddItems(kind).find(i => i.value === value);
          if (item) btn.querySelector('.inv-dd-label').textContent = item.label;
        },
        minWidth: kind === 'currency' ? 220 : 180,
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  }

  // ── form sync ─────────────────────────────────────────────
  function _syncForm(prefix) {
    const type    = document.querySelector(`[name="${prefix}AssetType"]`)?.value || 'Stock';
    const exch    = document.getElementById(`${prefix}Exchange`)?.value || 'NYSE';
    const isStock = type === 'Stock' || type === 'ETF';
    const isCrypto = type === 'Crypto';
    const isOther  = isStock && exch === 'OTHER';

    // Exchange row: only for Stock / ETF
    const exchRow = document.getElementById(`${prefix}ExchangeRow`);
    if (exchRow) exchRow.style.display = isStock ? '' : 'none';

    // Currency select: for "Diğer Borsalar" stocks/ETF, or any non-equity non-crypto type
    const needsCurrency = isOther || (!isStock && !isCrypto);
    const curRow = document.getElementById(`${prefix}PriceCurrencyRow`);
    if (curRow) curRow.style.display = needsCurrency ? '' : 'none';

    // Buy price label currency symbol
    let sym;
    if (needsCurrency) {
      const selected = document.querySelector(`[name="${prefix}PriceCurrency"]`)?.value || 'USD';
      sym = `(${_getCurrencySymbol(selected)})`;
    } else {
      sym = '($)';
    }

    const lbl    = document.getElementById(`${prefix}BuyPriceLabel`);
    const ticker = document.getElementById(`${prefix}Ticker`);
    if (lbl) lbl.textContent = UI.t('inv_buy_price_sym', sym);

    if (ticker) {
      if (isCrypto)         ticker.placeholder = 'BTC, ETH, SOL';
      else if (isOther)     ticker.placeholder = 'ASML, NVO, BABA…';
      else if (type === 'Commodity') ticker.placeholder = 'GLD, SLV…';
      else                  ticker.placeholder = 'AAPL, NVDA, GOOG';
    }
  }

  // ── asset form HTML builder ───────────────────────────────
  const _INV_CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>`;

  function _invAssetFormHTML(p) {
    const isEdit = p === 'edit';
    const usdLabel = _INV_CURRENCY_ITEMS.find(i => i.value === 'USD')?.label || '$ USD — ABD Doları';
    return `
<form id="${p}AssetForm" onsubmit="return false">
  ${isEdit ? '<input type="hidden" name="editId">' : ''}
  <div style="display:grid;gap:1rem">
    <div class="form-group">
      <label class="form-label">${UI.t('inv_asset_type_label')}</label>
      <button type="button" id="${p}TypeDDBtn" onclick="Investments.openInvDropdown(this,'type','${p}')"
        style="width:100%;display:flex;align-items:center;gap:0.5rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;text-align:left;overflow:hidden">
        <span class="inv-dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left">${UI.t('inv_type_stock')}</span>
        ${_INV_CHEVRON}
      </button>
      <input type="hidden" name="${p}AssetType" value="Stock">
    </div>
    <div id="${p}ExchangeRow" class="form-group" style="display:none">
      <label class="form-label">${UI.t('inv_exchange_label')}</label>
      <button type="button" id="${p}ExchangeDDBtn" onclick="Investments.openInvDropdown(this,'exchange','${p}')"
        style="width:100%;display:flex;align-items:center;gap:0.5rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;text-align:left;overflow:hidden">
        <span class="inv-dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left">${UI.t('inv_exchange_us')}</span>
        ${_INV_CHEVRON}
      </button>
      <input type="hidden" name="${p}Exchange" id="${p}Exchange" value="NYSE">
    </div>
    <div id="${p}PriceCurrencyRow" class="form-group" style="display:none">
      <label class="form-label">${UI.t('inv_price_currency_label')}</label>
      <button type="button" id="${p}CurrencyDDBtn" onclick="Investments.openInvDropdown(this,'currency','${p}')"
        style="width:100%;display:flex;align-items:center;gap:0.5rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;text-align:left;overflow:hidden">
        <span class="inv-dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left">${usdLabel}</span>
        ${_INV_CHEVRON}
      </button>
      <input type="hidden" name="${p}PriceCurrency" value="USD">
    </div>
    <div class="form-group">
      <label class="form-label">${UI.t('inv_symbol_label')}</label>
      <input class="form-control" type="text" id="${p}Ticker" name="${p}Ticker"
             ${!isEdit ? 'placeholder="AAPL, NVDA, GOOG"' : ''}
             style="text-transform:uppercase;font-family:var(--font-mono);letter-spacing:.05em" required>
    </div>
    <div class="form-group">
      <label class="form-label">
        <span>${UI.t('inv_display_name_label')}</span>
        <small style="color:var(--text-muted);font-weight:400">${UI.t('inv_optional_suffix')}</small>
      </label>
      <input class="form-control" type="text" name="${p}Name"${isEdit ? ` id="${p}Name"` : ''}${!isEdit ? ' placeholder="Apple, Thyao, Bitcoin…"' : ''}>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">${UI.t('inv_quantity_label')}</label>
        <input class="form-control" type="number" name="${p}Qty" min="0.000001" step="any" placeholder="0" required>
      </div>
      <div class="form-group">
        <label class="form-label" id="${p}BuyPriceLabel">${UI.t('inv_buy_price_label')}</label>
        <input class="form-control" type="number" name="${p}BuyPrice" min="0" step="any" placeholder="0.00" required>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">${UI.t('inv_buy_date_label')}</label>
      <button type="button" id="${p}DateBtn" onclick="Investments.toggleInvDatePicker('${p}')"
        style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
        <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
        <span id="${p}DateLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left"></span>
      </button>
      <input type="hidden" name="${p}Date" id="${p}Date" value="">
    </div>
    ${!isEdit ? `<p style="font-size:0.75rem;color:var(--text-muted);margin:0;line-height:1.5;display:flex;align-items:center;gap:0.375rem">
      <svg data-lucide="refresh-cw" style="width:0.75rem;height:0.75rem;flex-shrink:0"></svg>
      <span>${UI.t('inv_auto_price_info')}</span>
    </p>` : ''}
  </div>
</form>`;
  }

  function _openAddAsset() {
    _addAssetModal = new CustomModal({
      title:        UI.t('inv_add_modal'),
      icon:         'plus-circle',
      content:      _invAssetFormHTML('add'),
      width:        520,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_add'),    variant: 'primary',   onClick: () => _save() },
      ],
    });
    _addAssetModal.open();

    const dateEl = document.getElementById('addDate');
    if (dateEl) { dateEl.value = UI.today(); _applyInvDateLabel('add', UI.today()); }

    _addDateCdp = new CustomDatePicker({
      btn: 'addDateBtn', input: 'addDate', align: 'left',
      onSelect: date => _applyInvDateLabel('add', date),
    });

    const f = document.getElementById('addAssetForm');
    f.querySelector('[name="addAssetType"]')?.addEventListener('change', () => _syncForm('add'));
    document.getElementById('addExchange')?.addEventListener('change', () => _syncForm('add'));
    f.querySelector('[name="addPriceCurrency"]')?.addEventListener('change', () => _syncForm('add'));

    _syncForm('add');
  }

  // ── add asset ─────────────────────────────────────────────
  function _save() {
    const f      = document.getElementById('addAssetForm');
    const type   = f.querySelector('[name="addAssetType"]').value;
    const ticker = f.addTicker.value.trim().toUpperCase();
    const qty    = parseFloat(f.addQty.value);
    const buy    = parseFloat(f.addBuyPrice.value);

    if (!ticker)                 { UI.toast(UI.t('inv_enter_symbol'), 'error');   return; }
    if (isNaN(qty)  || qty <= 0) { UI.toast(UI.t('inv_invalid_qty'), 'error');   return; }
    if (isNaN(buy)  || buy < 0)  { UI.toast(UI.t('inv_invalid_buy'), 'error');  return; }

    const exch        = f.querySelector('[name="addExchange"]')?.value || 'NYSE';
    const isStock     = type === 'Stock' || type === 'ETF';
    const isCrypto    = type === 'Crypto';
    const isOther     = isStock && exch === 'OTHER';
    const needsCur    = isOther || (!isStock && !isCrypto);
    const symbol      = ticker;
    const buyCurrency = needsCur ? (f.querySelector('[name="addPriceCurrency"]')?.value || 'USD') : null;
    const date        = f.addDate.value || UI.today();
    const existing    = (Store.getInvestments().assets || []).find(a => a.symbol === symbol);

    if (existing) {
      const totalQty  = existing.quantity + qty;
      const newAvg    = (existing.quantity * existing.buyPrice + qty * buy) / totalQty;
      const firstDate = existing.purchaseDate && existing.purchaseDate < date ? existing.purchaseDate : date;
      Store.updateAsset(existing.id, {
        quantity:     totalQty,
        buyPrice:     Math.round(newAvg * 10000) / 10000,
        purchaseDate: firstDate,
      });
      UI.toast(UI.t('inv_asset_merged', symbol, newAvg.toFixed(4), totalQty), 'success');
    } else {
      const assetData = { symbol, name: f.addName.value.trim() || ticker, assetType: type, quantity: qty, buyPrice: buy, purchaseDate: date };
      if (buyCurrency) assetData.buyCurrency = buyCurrency;
      if (Store.get('inv_seeded')) { Store.setInvestments({ assets: [] }); Store.set('inv_seeded', null); }
      Store.addAsset(assetData);
      UI.toast(UI.t('inv_asset_added'), 'success');
    }

    _addAssetModal.close();
    _load();

    if (!existing) {
      const assets   = Store.getInvestments().assets;
      const newAsset = assets[assets.length - 1];
      if (newAsset && _canAutoPrice(newAsset.assetType, newAsset.buyCurrency)) _fetchOnePrice(newAsset);
    }
  }

  // ── edit asset ────────────────────────────────────────────
  function editAsset(id) {
    const asset = (Store.getInvestments().assets || []).find(a => a.id === id);
    if (!asset) return;

    _editAssetModal = new CustomModal({
      title:        UI.t('inv_edit_modal'),
      icon:         'pencil',
      content:      _invAssetFormHTML('edit'),
      width:        520,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveEdit() },
      ],
    });
    _editAssetModal.open();

    const f = document.getElementById('editAssetForm');
    f.editId.value       = id;
    _setDDVal('type', 'edit', asset.assetType || 'Stock');
    f.editTicker.value   = asset.symbol || '';
    document.getElementById('editName').value = asset.name || '';
    f.editQty.value      = asset.quantity;
    f.editBuyPrice.value = asset.buyPrice;
    const editDateVal = asset.purchaseDate || UI.today();
    document.getElementById('editDate').value = editDateVal;
    _applyInvDateLabel('edit', editDateVal);

    const isStock = asset.assetType === 'Stock' || asset.assetType === 'ETF';
    _setDDVal('exchange', 'edit', (isStock && asset.buyCurrency) ? 'OTHER' : 'NYSE');
    if (asset.buyCurrency) _setDDVal('currency', 'edit', asset.buyCurrency);

    _syncForm('edit');

    f.querySelector('[name="editAssetType"]')?.addEventListener('change', () => _syncForm('edit'));
    document.getElementById('editExchange')?.addEventListener('change', () => _syncForm('edit'));
    f.querySelector('[name="editPriceCurrency"]')?.addEventListener('change', () => _syncForm('edit'));

    _editDateCdp = new CustomDatePicker({
      btn: 'editDateBtn', input: 'editDate', align: 'left',
      onSelect: date => _applyInvDateLabel('edit', date),
    });
  }

  function _saveEdit() {
    const f      = document.getElementById('editAssetForm');
    const id     = f.editId.value;
    const type   = f.querySelector('[name="editAssetType"]').value;
    const ticker = f.editTicker.value.trim().toUpperCase();
    const qty    = parseFloat(f.editQty.value);
    const buy    = parseFloat(f.editBuyPrice.value);

    if (!ticker)                 { UI.toast(UI.t('inv_enter_symbol'), 'error');   return; }
    if (isNaN(qty)  || qty <= 0) { UI.toast(UI.t('inv_invalid_qty'), 'error');   return; }
    if (isNaN(buy)  || buy < 0)  { UI.toast(UI.t('inv_invalid_buy'), 'error');  return; }

    const exch        = f.querySelector('[name="editExchange"]')?.value || 'NYSE';
    const isStock     = type === 'Stock' || type === 'ETF';
    const isCrypto    = type === 'Crypto';
    const isOther     = isStock && exch === 'OTHER';
    const needsCur    = isOther || (!isStock && !isCrypto);
    const symbol      = ticker;
    const buyCurrency = needsCur ? (f.querySelector('[name="editPriceCurrency"]')?.value || 'USD') : null;

    Store.updateAsset(id, { symbol, name: f.editName.value.trim() || ticker, assetType: type, quantity: qty, buyPrice: buy, purchaseDate: f.editDate.value || UI.today(), buyCurrency });
    _editAssetModal.close();
    UI.toast(UI.t('inv_asset_updated'), 'success');
    _load();
  }

  // ── delete asset ──────────────────────────────────────────
  function deleteAsset(id) {
    const asset = (Store.getInvestments().assets || []).find(a => a.id === id);
    const name  = asset ? (asset.name || asset.symbol) : '';
    DeleteManager.confirm({
      module:       'investment',
      title:        UI.t('inv_confirm_delete'),
      message:      name || undefined,
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        Store.deleteAsset(id);
        UI.toast(UI.t('inv_asset_deleted'), 'info');
        _load();
      },
    });
  }

  // ── public API ────────────────────────────────────────────
  function setDisplayCurrency(cur) {
    _currency = cur;
    Store.setSettings({ ...Store.getSettings(), displayCurrency: cur });
    _load();
  }

  function getUserCurrencyCode() { return _getCurrencyCode(); }

  // ── manual price entry ───────────────────────────────────────
  let _manualPriceTarget = null;

  function editManualPrice(symbol) {
    const asset  = (Store.getInvestments().assets || []).find(a => a.symbol === symbol);
    const aCur   = _assetCur(symbol, asset?.buyCurrency);
    const sym    = _getCurrencySymbol(aCur);
    const cached = _getPrices()[symbol];
    const initVal = cached?.price > 0 ? cached.price : (asset?.buyPrice || '');

    _manualPriceTarget = { symbol, aCur };

    _manualPriceModal = new CustomModal({
      title:   UI.t('inv_manual_price_label', symbol, sym),
      icon:    'edit-3',
      width:   380,
      content: `<div style="display:grid;gap:0.75rem">
        <div class="form-group">
          <label class="form-label">${UI.t('inv_col_price')}</label>
          <input class="form-control" type="number" id="manualPriceInput" min="0" step="any" placeholder="0.00" value="${initVal}">
          <p style="font-size:0.75rem;color:var(--text-muted);margin:0.375rem 0 0;line-height:1.4">${UI.t('inv_manual_price_note', sym, aCur)}</p>
        </div>
        <p style="font-size:0.75rem;color:var(--text-muted);margin:0;line-height:1.5;display:flex;align-items:flex-start;gap:0.375rem">
          <svg data-lucide="info" style="width:0.75rem;height:0.75rem;flex-shrink:0;margin-top:1px"></svg>
          <span>${UI.t('inv_manual_price_info')}</span>
        </p>
      </div>`,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveManualPrice() },
      ],
    });
    _manualPriceModal.open();
    setTimeout(() => document.getElementById('manualPriceInput')?.focus(), 120);
  }

  function _saveManualPrice() {
    if (!_manualPriceTarget) return;
    const val = parseFloat(document.getElementById('manualPriceInput')?.value);
    if (isNaN(val) || val < 0) { UI.toast(UI.t('inv_invalid_price'), 'error'); return; }

    const prices = _getPrices();
    prices[_manualPriceTarget.symbol] = { price: val, fetchedAt: Date.now() };
    _setPrices(prices);

    _manualPriceModal?.close();
    UI.toast(UI.t('inv_price_saved'), 'success');
    _manualPriceTarget = null;
    _load();
  }


  function setExchangeRate(val) {
    const rate = parseFloat(val);
    if (!isNaN(rate) && rate > 0) {
      const s        = Store.getSettings();
      const userCode = _getCurrencyCode();
      const rates    = { ...(s.rates || {}), [userCode]: rate };
      const updates  = { exchangeRate: rate, rates };
      if (userCode === 'TRY') updates.tryRate = rate;
      Store.setSettings({ ...s, ...updates });
      _load();
    }
  }

  function _migrateLegacySymbols() {
    const tryRate = _getTryRate();
    const inv = Store.getInvestments();
    let changed = false;

    for (const asset of inv.assets) {
      // Remove old ALTIN.S1 rename → now just plain symbol
      if (asset.symbol === 'ALTIN.S1') {
        asset.symbol = 'ALTINS1';
        delete asset.buyCurrency;
        changed = true;
      }
      // Migrate .IST assets: strip suffix, convert TRY buyPrice → USD
      if ((asset.symbol || '').endsWith('.IST')) {
        asset.symbol = asset.symbol.replace(/\.IST$/, '');
        if (asset.buyPrice && tryRate > 0) {
          asset.buyPrice = Math.round(asset.buyPrice / tryRate * 10000) / 10000;
        }
        delete asset.buyCurrency;
        changed = true;
      }
    }
    if (changed) Store.set('investments', inv);

    const prices = _getPrices();
    const hist   = _getHistory();
    let cacheChanged = false;

    for (const key of Object.keys(prices)) {
      if (key.endsWith('.IST')) {
        const newKey = key.replace(/\.IST$/, '');
        const entry  = { ...prices[key] };
        if (entry.price && tryRate > 0) entry.price = Math.round(entry.price / tryRate * 10000) / 10000;
        prices[newKey] = entry;
        delete prices[key];
        cacheChanged = true;
      }
    }
    for (const key of Object.keys(hist)) {
      if (key.endsWith('.IST')) {
        const newKey = key.replace(/\.IST$/, '');
        const entry  = { ...hist[key] };
        if (entry.series) {
          const s = {};
          for (const [d, v] of Object.entries(entry.series)) s[d] = tryRate > 0 ? Math.round(v / tryRate * 10000) / 10000 : v;
          entry.series = s;
        }
        hist[newKey] = entry;
        delete hist[key];
        cacheChanged = true;
      }
    }
    if (cacheChanged) { _setPrices(prices); _setHistory(hist); }
  }

  function _applyInvDateLabel(type, val) {
    const labelId = type === 'add' ? 'addDateLabel' : 'editDateLabel';
    const el = document.getElementById(labelId);
    if (el) el.textContent = val ? UI.formatDate(val) : '';
  }

  function _toggleInvDatePicker(type) {
    (type === 'add' ? _addDateCdp : _editDateCdp).toggle();
  }

  function init() {
    _migrateLegacySymbols();
    UI.initTopbar();
    UI.initEsc();
    const _s = Store.getSettings();
    _currency  = _s.displayCurrency || _getCurrencyCode();
    _pnlPeriod = _s.pnlPeriod       || 'total';

    document.getElementById('addAssetBtn')
      ?.addEventListener('click', () => _openAddAsset());

    const rateEl = document.getElementById('exchangeRateInput');
    if (rateEl) rateEl.addEventListener('change', () => setExchangeRate(rateEl.value));

    document.getElementById('manualPriceInput')
      ?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _saveManualPrice(); } });

    document.addEventListener('lt:privacy-change',  () => _load());
    document.addEventListener('lt:language-change', () => _load());
    document.addEventListener('lt:currency-change', () => {
      const newCode = _getCurrencyCode();
      if (_currency !== 'USD') _currency = newCode;

      const s = Store.getSettings();
      if (newCode === 'USD') {
        Store.setSettings({ ...s, exchangeRate: 1 });
      } else {
        const cached = s.rates?.[newCode];
        const isToday = (s.ratesDates || {})[newCode] === _today();
        if (cached > 0 && isToday) {
          // Rate already fetched today — instant switch, no API call
          Store.setSettings({ ...s, exchangeRate: cached });
        } else {
          // Rate missing or stale → fetch fresh
          _fetchExchangeRate(true);
          return; // _fetchExchangeRate calls _load() itself after fetching
        }
      }

      _updateToggle();
      _updateRateDisplay();
      _load();
    });
    document.addEventListener('lt:theme-change',   () => _load());

    _load();

    // Non-blocking background fetches
    _fetchExchangeRate();
    _fetchPricesBackground();
  }

  async function _fetchAllRatesPublic() {
    const { fxKey } = _getApiKeys();
    if (!fxKey) { UI.toast(UI.t('inv_no_api_key'), 'error'); return; }
    const btn = document.getElementById('fetchAllRatesBtn');
    if (btn) { btn.style.animation = 'spin 1s linear infinite'; btn.disabled = true; }
    try {
      const result = await _fetchAllExchangeRates(fxKey);
      if (!result) { UI.toast(UI.t('inv_fx_error'), 'error'); return; }
      const s    = Store.getSettings();
      const rates = { ...(s.rates || {}), ...result.rates };
      const ratesDates = { ...(s.ratesDates || {}), ...result.newDates };
      const userCode   = _getCurrencyCode();
      const userRate   = userCode === 'USD' ? 1 : (rates[userCode] || 1);
      Store.setSettings({ ...Store.getSettings(), exchangeRate: userRate, tryRate: rates.TRY || s.tryRate, rates, ratesDates, exchangeRateFetchedAt: Date.now() });
      _updateRateDisplay();
      _load();
      UI.toast(UI.t('inv_fx_updated'), 'success');
    } catch { UI.toast(UI.t('inv_fx_error'), 'error'); }
    finally {
      if (btn) { btn.style.animation = ''; btn.disabled = false; }
    }
  }

  function _triggerInvImport() {
    const input = document.getElementById('lt-inv-import-file');
    if (input) { input.value = ''; input.click(); }
  }

  function _importInvData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        const isKey = k => k.startsWith('lt_inv') || k === 'lt_panels_investments';
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

  return { init, setDisplayCurrency, getUserCurrencyCode, setExchangeRate, editManualPrice, saveManualPrice: _saveManualPrice, openAddAsset: _openAddAsset, editAsset, deleteAsset, refreshPrices: _manualRefresh, togglePnlPeriodMenu: _togglePnlPeriodMenu, setPnlPeriod: _setPnlPeriodFn, fetchAllRates: _fetchAllRatesPublic, openInvDropdown, toggleInvDatePicker: _toggleInvDatePicker, triggerImport: _triggerInvImport, importData: _importInvData };
})();
