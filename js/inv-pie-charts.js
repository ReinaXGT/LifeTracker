const InvPieCharts = (() => {
  const TYPE_COLORS = {
    Stock: '#B0B8C8', StockOther: '#78828E', Crypto: '#34D399', ETF: '#60A5FA',
    Commodity: '#FBBF24', Bond: '#F87171', Cash: '#94A3B8', Deposit: '#2DD4BF',
  };
  const PALETTE = ['#7C6CFC','#34D399','#60A5FA','#FBBF24','#F87171','#F472B6','#A78BFA','#FB923C','#22D3EE','#4ADE80','#E879F9','#FCD34D'];

  const TYPE_I18N = {
    Stock: 'inv_type_stock_lbl', StockOther: 'inv_type_stock_other_lbl',
    ETF: 'inv_type_etf_lbl', Crypto: 'inv_type_crypto_lbl',
    Commodity: 'inv_type_commodity_lbl', Bond: 'inv_type_bond_lbl', Cash: 'inv_type_cash_lbl',
    Deposit: 'inv_hist_tab_deposits',
  };

  const typeColor = t => TYPE_COLORS[t] || PALETTE[0];
  const typeLabel = t => UI.t(TYPE_I18N[t] || t);
  const _palCol   = i => PALETTE[i % PALETTE.length];

  function _html(p) {
    return `
<div style="flex:1;display:flex;gap:1.5rem;align-items:flex-start">
  <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:0.625rem">
    <div style="font-size:0.6875rem;font-weight:600;letter-spacing:.05em;color:var(--text-muted);text-transform:uppercase">${UI.t('inv_by_symbol')}</div>
    <div style="display:flex;align-items:center;gap:1rem">
      <div class="chart-doughnut" style="flex-shrink:0">
        <canvas id="${p}-sym-chart"></canvas>
        <div id="${p}-sym-center" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;gap:0.125rem"></div>
      </div>
      <div id="${p}-sym-legend" class="chart-legend" style="flex-direction:column;gap:0.5rem;flex:1;min-width:0"></div>
    </div>
  </div>
  <div style="width:1px;background:var(--border);align-self:stretch;flex-shrink:0"></div>
  <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:0.625rem">
    <div style="font-size:0.6875rem;font-weight:600;letter-spacing:.05em;color:var(--text-muted);text-transform:uppercase">${UI.t('inv_by_type')}</div>
    <div style="display:flex;align-items:center;gap:1rem">
      <div class="chart-doughnut" style="flex-shrink:0">
        <canvas id="${p}-type-chart"></canvas>
        <div id="${p}-type-center" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;gap:0.125rem"></div>
      </div>
      <div id="${p}-type-legend" class="chart-legend" style="flex-direction:column;gap:0.5rem;flex:1;min-width:0"></div>
    </div>
  </div>
</div>`;
  }

  // items: [{ symbol, value, type }]
  // opts:  { prefix, mask, externalTooltip }
  //   prefix           — ID prefix, must be unique per page (default: 'ipc')
  //   mask(value)      — currency display function
  //   externalTooltip  — false to disable TooltipCore external tooltips (default: true)
  function render(containerEl, items, opts = {}) {
    if (typeof containerEl === 'string') containerEl = document.getElementById(containerEl);
    if (!containerEl) return;

    const p    = opts.prefix || 'ipc';
    const mask = opts.mask   || (v => String(v));
    const useExt = opts.externalTooltip !== false;

    containerEl.innerHTML = _html(p);

    const total    = items.reduce((s, x) => s + x.value, 0);
    const emptyMsg = `<div style="color:var(--text-muted);font-size:0.8125rem;text-align:center;padding:1.25rem 0">${UI.t('inv_no_assets_legend')}</div>`;

    if (!items.length || total === 0) {
      Charts.doughnut(`${p}-sym-chart`,  [], [], {});
      Charts.doughnut(`${p}-type-chart`, [], [], {});
      document.getElementById(`${p}-sym-legend`).innerHTML  = emptyMsg;
      document.getElementById(`${p}-type-legend`).innerHTML = emptyMsg;
      return;
    }

    // ── Symbol chart ──
    const sorted  = [...items].sort((a, b) => b.value - a.value);
    const symCols = sorted.map((_, i) => _palCol(i));
    const symPcts = sorted.map(x => +(x.value / total * 100).toFixed(1));

    Charts.doughnut(`${p}-sym-chart`, sorted.map(x => x.symbol), symPcts, {
      colors: symCols,
      tip: ctx => ` ${ctx.label}: %${ctx.parsed.toFixed(1)} (${mask(sorted[ctx.dataIndex].value)})`,
      ...(useExt && { externalTooltip: TooltipCore.chartExternal({ id: `${p}-sym-tt` }) }),
    });

    const symCenter = document.getElementById(`${p}-sym-center`);
    if (symCenter) symCenter.innerHTML =
      `<span style="font-family:var(--font-mono);font-size:clamp(1.25rem,3vw,1.75rem);font-weight:700;color:var(--text-primary);line-height:1">${items.length}</span>
       <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:500;letter-spacing:.5px;margin-top:0.1875rem">${UI.t('inv_asset_label')}</span>`;

    const LEGEND_LIMIT = 8;
    const legendVisible  = sorted.slice(0, LEGEND_LIMIT);
    const legendHidden   = sorted.length - LEGEND_LIMIT;
    document.getElementById(`${p}-sym-legend`).innerHTML =
      legendVisible.map((x, i) =>
        `<div class="legend-item" style="gap:0.375rem;min-width:0;width:100%;justify-content:flex-start">
          <div class="legend-dot" style="background:${symCols[i]};flex-shrink:0"></div>
          <span style="font-size:0.8125rem;font-weight:600;white-space:nowrap">${x.symbol}</span>
          <span style="font-family:var(--font-mono);font-size:0.75rem;font-weight:700;color:${symCols[i]};white-space:nowrap">%${symPcts[i].toFixed(1)}</span>
        </div>`
      ).join('')
      + (legendHidden > 0
        ? `<div style="font-size:0.75rem;color:var(--text-muted);padding-top:0.125rem">+${legendHidden} ${UI.t('inv_more_assets')}</div>`
        : '');

    // ── Type chart ──
    const byType = {};
    items.forEach(x => { byType[x.type] = (byType[x.type] || 0) + x.value; });
    const typeKeys   = Object.keys(byType);
    const typeVals   = typeKeys.map(k => byType[k]);
    const typePcts   = typeVals.map(v => +(v / total * 100).toFixed(1));
    const typeCols   = typeKeys.map(t => typeColor(t));
    const typeLabels = typeKeys.map(t => typeLabel(t));

    Charts.doughnut(`${p}-type-chart`, typeLabels, typePcts, {
      colors: typeCols,
      tip: ctx => ` ${ctx.label}: %${ctx.parsed.toFixed(1)} (${mask(typeVals[ctx.dataIndex])})`,
      ...(useExt && { externalTooltip: TooltipCore.chartExternal({ id: `${p}-type-tt` }) }),
    });

    const typeCenter = document.getElementById(`${p}-type-center`);
    if (typeCenter) typeCenter.innerHTML =
      `<span style="font-family:var(--font-mono);font-size:clamp(1.25rem,3vw,1.75rem);font-weight:700;color:var(--text-primary);line-height:1">${typeKeys.length}</span>
       <span style="font-size:0.6875rem;color:var(--text-muted);font-weight:500;letter-spacing:.5px;margin-top:0.1875rem">${UI.t('inv_type_label')}</span>`;

    document.getElementById(`${p}-type-legend`).innerHTML = typeKeys.map((t, i) =>
      `<div class="legend-item" style="gap:0.375rem;min-width:0;width:100%;justify-content:flex-start">
        <div class="legend-dot" style="background:${typeCols[i]};flex-shrink:0"></div>
        <span style="font-size:0.8125rem;font-weight:600;white-space:nowrap">${typeLabels[i]}</span>
        <span style="font-family:var(--font-mono);font-size:0.75rem;font-weight:700;color:${typeCols[i]};white-space:nowrap">%${typePcts[i].toFixed(1)}</span>
      </div>`
    ).join('');
  }

  return { render, typeColor, typeLabel, TYPE_COLORS };
})();
