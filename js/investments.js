const Investments = (() => {
  let _currency = 'USD';
  let _currentView    = 'portfolio';
  let _tradeCycleMonth  = '';
  let _tradeHistModal   = null;
  let _tradeHistMonths  = [];
  let _tradeHistIdx     = 0;
  let _tradeHistTab     = 'trades'; // 'trades' | 'deposits'
  let _depHistMonths    = [];
  let _depHistIdx       = 0;
  let _depAddModal       = null;
  let _depEditModal      = null;
  let _depAddDateCdp     = null;
  let _depEditDateCdp    = null;
  let _depSkipConfirmDate = null; // "bugün sorma" seçilince today() değeri saklanır
  let _depView           = 'table'; // 'cards' | 'table' — dep-list görünüm modu
  let _depDragIdx        = null;
  let _depHistSearch     = '';
  let _depHistFrom       = '';
  let _depHistTo         = '';
  let _depHistFilterCdp  = null;
  let _tradesSubView = 'inv';    // 'inv' | 'dep'
  let _addDateCdp  = null;
  let _editDateCdp = null;
  let _sellDateCdp       = null;
  let _buyDateCdp        = null;
  let _tradeFilterCdp    = null;
  let _addAssetModal     = null;
  let _editAssetModal    = null;
  let _editTradeModal    = null;
  let _editTradeDateCdp  = null;
  let _manualPriceModal  = null;
  let _sellAssetModal    = null;
  let _buyAssetModal     = null;

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
  const _col       = t => InvPieCharts.typeColor(t);
  const _typeLabel = t => InvPieCharts.typeLabel(t);
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
  const _getTrades     = () => Store.get('inv_trades') || [];
  const _addTrade      = t  => { const all = _getTrades(); all.push(t); Store.set('inv_trades', all); };
  const _getSellTrades = () => _getTrades().filter(t => t.type === 'sell');

  function _migrateRealizedToTrades() {
    if (Store.get('inv_trades') !== null) return;
    const old = Store.get('inv_realized') || [];
    const migrated = old.map(t => ({
      id: t.id || Store._id(), type: 'sell', date: t.date,
      symbol: t.symbol, name: t.name, assetType: t.assetType,
      quantity: t.quantity, price: t.sellPrice, buyCurrency: t.buyCurrency || null,
      costBasis: t.costBasis, realizedPnL: t.realizedPnL,
    }));
    Store.set('inv_trades', migrated);
  }

  function _fixBackfilledQty() {
    if (Store.get('inv_backfill_qty_fixed')) return;
    const assets = Store.getInvestments().assets || [];
    const trades = _getTrades();
    let changed = false;
    assets.forEach(a => {
      const buyTrades = trades.filter(t => t.type === 'buy' && t.symbol === a.symbol);
      if (buyTrades.length !== 1) return; // birden fazla buy trade varsa backfill ürünü değil
      const soldQty = trades
        .filter(t => t.type === 'sell' && t.symbol === a.symbol)
        .reduce((sum, t) => sum + (Number(t.quantity) || 0), 0);
      if (soldQty <= 0) return; // hiç satış yok, sorun yok
      const expectedQty = Math.round((Number(a.quantity) + soldQty) * 1e8) / 1e8;
      if (Math.abs(buyTrades[0].quantity - expectedQty) > 0.000001) {
        buyTrades[0].quantity = expectedQty;
        changed = true;
      }
    });
    if (changed) Store.set('inv_trades', trades);
    Store.set('inv_backfill_qty_fixed', true);
  }

  function _backfillAssetTrades() {
    const assets = Store.getInvestments().assets || [];
    if (!assets.length) return;
    const trades     = _getTrades();
    const buySymbols = new Set(trades.filter(t => t.type === 'buy').map(t => t.symbol));
    let changed = false;
    assets.forEach(a => {
      if (buySymbols.has(a.symbol)) return;
      // Satışları ekleyerek orijinal alım miktarını yeniden hesapla
      const soldQty = trades
        .filter(t => t.type === 'sell' && t.symbol === a.symbol)
        .reduce((sum, t) => sum + (Number(t.quantity) || 0), 0);
      const originalQty = Math.round((Number(a.quantity) + soldQty) * 1e8) / 1e8;
      trades.push({
        id: Store._id(), type: 'buy',
        date: a.purchaseDate || _today(),
        symbol: a.symbol, name: a.name, assetType: a.assetType,
        quantity: originalQty, price: a.buyPrice,
        buyCurrency: a.buyCurrency || null,
      });
      changed = true;
    });
    if (changed) Store.set('inv_trades', trades);
  }

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
    const toUSD   = (p, a) => { const c = _assetCur(a.symbol, a.buyCurrency); return c === 'USD' ? p : p / _getUSDRate(c); };

    let num = 0, den = 0;
    for (const a of assets) {
      const qty    = Number(a.quantity) || 0;
      const buyRaw = Number(a.buyPrice) || 0;
      if (!qty || !buyRaw) continue;

      const series = history[a.symbol]?.series;
      let curRaw, pastRaw;

      if (period === 'all') {
        // Tüm zamanlar: alış fiyatından bu yana — history gerekmez
        curRaw  = prices[a.symbol]?.price || buyRaw;
        pastRaw = buyRaw;
      } else if (period === 1) {
        // Günlük: son kapanış vs bir önceki kapanış (close-to-close)
        // API'den gelen fiyat = dünkü kapanış, dolayısıyla her ikisi de aynı olmamak için
        // history'deki son iki kapanışı karşılaştırıyoruz.
        if (series) {
          const sorted = Object.keys(series).sort().reverse();
          if (sorted.length < 2 || sorted[0] < _dateAgo(10)) continue; // yetersiz/bayat veri
          curRaw  = series[sorted[0]]; // son kapanış
          // Bugün alındıysa alış fiyatı baz alınır — o günkü piyasa hareketini yaşamadı
          pastRaw = (a.purchaseDate && a.purchaseDate >= sorted[0]) ? buyRaw : series[sorted[1]];
        } else {
          // History yok: alış fiyatına göre getiri (Commodity/Bond/Cash)
          curRaw  = prices[a.symbol]?.price || buyRaw;
          pastRaw = buyRaw;
        }
      } else {
        // Haftalık / Aylık / 3 Aylık
        curRaw = prices[a.symbol]?.price || buyRaw;
        const periodStart  = _dateAgo(period);
        const purchaseDate = a.purchaseDate || null;

        if (purchaseDate && purchaseDate > periodStart) {
          // Periyot içinde alınmış: alış fiyatı baz
          pastRaw = buyRaw;
        } else if (series) {
          const maxStaleDate = _dateAgo(period + 10);
          const foundDate    = Object.keys(series).sort().reverse().find(d => d <= periodStart);
          // History varsa kullan; bayatsa alış fiyatına düş (varlığı atlamak yerine)
          pastRaw = (foundDate && foundDate >= maxStaleDate) ? series[foundDate] : buyRaw;
        } else {
          // History yok: alış fiyatı fallback (varlığı atlamak paydayı küçültüyor)
          pastRaw = buyRaw;
        }
      }

      if (!curRaw || !pastRaw) continue;
      const cur  = toUSD(curRaw,  a);
      const past = toUSD(pastRaw, a);
      num += qty * (cur - past);
      den += qty * past;
    }

    // Gerçekleşmiş K/Z: periyot içinde gerçekleşen satışlar o dönemin getirisine dahil edilir.
    const realized = _getSellTrades();
    for (const t of realized) {
      if (period !== 'all') {
        const periodStart = _dateAgo(period);
        if (!t.date || t.date < periodStart) continue;
      }
      const rAsset  = { symbol: t.symbol, buyCurrency: t.buyCurrency };
      const costUSD = toUSD(t.costBasis, rAsset) * t.quantity;
      const pnlUSD  = toUSD(t.price - t.costBasis, rAsset) * t.quantity;
      num += pnlUSD;
      den += costUSD;
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
        const def    = _PNL_PERIODS.find(p => p.key === _pnlPeriod);
        const series = _getHistory()[a.symbol]?.series;

        if (def.key === 'daily') {
          // Günlük: son kapanış vs bir önceki kapanış (close-to-close)
          if (series) {
            const sorted = Object.keys(series).sort().reverse();
            if (sorted.length >= 2 && sorted[0] >= _dateAgo(10)) {
              const latestClose = _toDisplay(series[sorted[0]], aCur);
              // Bugün alındıysa alış fiyatı baz alınır — o günkü piyasa hareketini yaşamadı
              const pastRawVal  = (a.purchaseDate && a.purchaseDate >= sorted[0]) ? buyRaw : series[sorted[1]];
              const prevClose   = _toDisplay(pastRawVal, aCur);
              const pastTotal   = qty * prevClose;
              periodPnL         = qty * (latestClose - prevClose);
              periodPnLPercent  = pastTotal > 0 ? (periodPnL / pastTotal) * 100 : 0;
            } else {
              periodNoHistory = true; periodPnL = 0; periodPnLPercent = 0;
            }
          } else {
            periodNoHistory = true; periodPnL = 0; periodPnLPercent = 0;
          }
        } else {
          // Haftalık / Aylık / 3 Aylık
          const targetDate   = _dateAgo(def.days);
          const maxStaleDate = _dateAgo(def.days + 10);
          const foundDate    = series
            ? Object.keys(series).sort().reverse().find(d => d <= targetDate) || null
            : null;
          if (series) {
            const purchaseDate = a.purchaseDate || null;
            if (purchaseDate && purchaseDate > targetDate) {
              const pastDisplay = _toDisplay(Number(a.buyPrice) || 0, aCur);
              const pastTotal   = qty * pastDisplay;
              periodPnL         = qty * (currentPrice - pastDisplay);
              periodPnLPercent  = pastTotal > 0 ? (periodPnL / pastTotal) * 100 : 0;
            } else {
              const pastRaw = (foundDate && foundDate >= maxStaleDate) ? series[foundDate] : null;
              if (pastRaw != null) {
                const pastDisplay = _toDisplay(pastRaw, aCur);
                const pastTotal   = qty * pastDisplay;
                periodPnL         = qty * (currentPrice - pastDisplay);
                periodPnLPercent  = pastTotal > 0 ? (periodPnL / pastTotal) * 100 : 0;
              } else {
                periodNoHistory = true; periodPnL = 0; periodPnLPercent = 0;
              }
            }
          } else {
            periodNoHistory = true; periodPnL = 0; periodPnLPercent = 0;
          }
        }
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
        ? Math.round(a.totalValue / totalValue * 1000) / 10 : 0;
    });

    const realizedTrades = _getSellTrades();
    let totalRealizedPnL = 0, totalRealizedCostBasis = 0;
    for (const t of realizedTrades) {
      const aCur = _assetCur(t.symbol, t.buyCurrency);
      totalRealizedPnL      += _toDisplay(t.price - t.costBasis, aCur) * t.quantity;
      totalRealizedCostBasis += _toDisplay(t.costBasis, aCur) * t.quantity;
    }

    return {
      baseCurrency: _currency,
      totalValue, totalInvested, totalPnL,
      totalPnLPercent: totalPnLPct,
      realizedPnL: totalRealizedPnL,
      realizedCostBasis: totalRealizedCostBasis,
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
    _renderDeposits();
    _renderTradeHistory();
    _renderDepHistTable();
    _updateToggle();
    _updateRateDisplay();
    _applyViewTopbar(_currentView);
    _updateRefreshBtn();
  }

  // ── render ────────────────────────────────────────────────
  function _renderKPIs(p) {
    const combinedPnL  = p.totalPnL + p.realizedPnL;
    const combinedCost = p.totalInvested + p.realizedCostBasis;
    const combinedPct  = combinedCost > 0 ? (combinedPnL / combinedCost) * 100 : 0;
    const cUp = combinedPnL >= 0;
    const lang = UI.getLang();

    // Include deposit total in portfolio value KPI
    const depRate = _getTryRate();
    const depTotalDisplay = Store.getDeposits().reduce((sum, dep) => {
      const calc = _calcDeposit(dep);
      const depCode = dep.currency || 'TRY';
      const valUSD = depCode === 'USD' ? calc.currentValue : calc.currentValue / depRate;
      return sum + (_currency === 'USD' ? valUSD : valUSD * _getRate());
    }, 0);
    const totalWithDeposits = p.totalValue + depTotalDisplay;

    const cards = [
      { label: UI.t('inv_kpi_portfolio_label'), value: _mask(totalWithDeposits), mono: true,
        icon: 'briefcase', iconColor: '#7C6CFC',
        change: `${_fmtPct(combinedPct)} ${UI.t('inv_kpi_total_return')}`, changeUp: cUp },
      { label: UI.t('inv_pnl'), value: `${combinedPnL >= 0 ? '+' : ''}${_mask(combinedPnL)}`, mono: true,
        icon: cUp ? 'trending-up' : 'trending-down', iconColor: cUp ? '#34D399' : '#F87171',
        change: `${_fmtPct(combinedPct)} ${UI.t('inv_kpi_vs_invested')}`, changeUp: cUp },
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
    const assets = p.assets;

    const rate = _getTryRate();
    const depItems = Store.getDeposits().map(dep => {
      const calc   = _calcDeposit(dep);
      const depCode = dep.currency || 'TRY';
      let val;
      if (_currency === 'USD') {
        val = depCode === 'USD' ? calc.currentValue : calc.currentValue / rate;
      } else {
        val = depCode === 'TRY' ? calc.currentValue : calc.currentValue * rate;
      }
      return { symbol: dep.bankName || UI.t('inv_tab_deposits'), value: val, type: 'Deposit' };
    });

    const items = assets.map(a => ({
      symbol: a.symbol,
      value:  a.totalValue || 0,
      type:   (a.assetType === 'Stock' && a.buyCurrency != null) ? 'StockOther' : (a.assetType || 'Stock'),
    })).concat(depItems);
    InvPieCharts.render('inv-pie-container', items, { prefix: 'inv', mask: _mask });

    // ── Best / Worst Performers ──
    const performersEl = document.getElementById('alloc-performers');
    if (performersEl && assets.length > 0) {
      const gainers = [...assets].filter(a => a.totalPnLPercent > 0)
        .sort((a, b) => b.totalPnLPercent - a.totalPnLPercent).slice(0, 5);
      const losers  = [...assets].filter(a => a.totalPnLPercent < 0)
        .sort((a, b) => a.totalPnLPercent - b.totalPnLPercent).slice(0, 5);

      const sectionLabel = `font-size:0.6875rem;font-weight:600;letter-spacing:.05em;color:var(--text-muted);text-transform:uppercase;margin-bottom:0.625rem;text-align:center`;
      const emptySlot    = `<div style="padding:0.5rem 0;text-align:center;font-size:0.75rem;color:var(--text-muted)">—</div>`;
      const rowHtml = list => list.length
        ? list.map(a => {
            const pct   = a.totalPnLPercent;
            const color = pct > 0 ? 'var(--green)' : 'var(--red)';
            const sign  = pct > 0 ? '+' : '';
            return `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.25rem 0;min-width:0">
              <div style="width:0.5rem;height:0.5rem;border-radius:50%;background:${color};flex-shrink:0"></div>
              <span style="font-size:0.8125rem;font-weight:600;color:var(--text-primary);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.symbol}</span>
              <span style="font-size:0.75rem;font-family:var(--font-mono);font-weight:700;color:${color};flex-shrink:0">${sign}${pct.toFixed(1)}%</span>
            </div>`;
          }).join('')
        : emptySlot;

      performersEl.innerHTML =
        `<div style="border-top:1px solid var(--border);margin-top:1.25rem;padding-top:1rem;display:flex;gap:1.5rem;align-items:flex-start">
          <div style="flex:1;min-width:0">
            <div style="${sectionLabel}" data-i18n="inv_top_gainers">${UI.t('inv_top_gainers')}</div>
            ${rowHtml(gainers)}
          </div>
          <div style="width:1px;background:var(--border);align-self:stretch;flex-shrink:0"></div>
          <div style="flex:1;min-width:0">
            <div style="${sectionLabel}" data-i18n="inv_top_losers">${UI.t('inv_top_losers')}</div>
            ${rowHtml(losers)}
          </div>
        </div>`;
    } else if (performersEl) {
      performersEl.innerHTML = '';
    }
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
      const priceAge = `<div style="display:flex;align-items:center;justify-content:center;gap:0.3125rem;margin-top:0.1875rem">
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
            <div style="width:34px;height:34px;border-radius:0.5rem;background:color-mix(in srgb,var(--accent) 12%,transparent);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid color-mix(in srgb,var(--accent) 28%,transparent)">
              <span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:700;color:var(--accent)">${init}</span>
            </div>
            <div>
              <div style="font-weight:600;font-size:0.875rem">${a.symbol}</div>
              <div style="font-size:0.75rem;color:var(--text-muted)">${a.name}</div>
            </div>
          </div>
        </td>
        <td style="text-align:center;vertical-align:middle"><span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${color};background:${color}18;border:1px solid ${color}35;padding:2px 7px;border-radius:4px">${_typeLabel(a.assetType)}</span></td>
        <td class="mono" style="text-align:center">${UI.isPrivate() ? '••••' : a.quantity}</td>
        <td class="mono" style="text-align:center;color:var(--text-secondary)">${_mask(a.avgCost)}</td>
        <td style="text-align:center;vertical-align:middle">
          <span class="mono" style="font-weight:600">${_mask(a.currentPrice)}</span>
          ${priceAge}
        </td>
        <td class="mono" style="text-align:center;font-weight:700">${_mask(a.totalValue)}</td>
        <td style="text-align:center;vertical-align:middle">
          ${a.periodNoHistory
            ? `<span style="color:var(--text-muted);font-size:0.8125rem">—</span>`
            : `<span style="font-family:var(--font-mono);font-weight:600;color:${a.periodPnL >= 0 ? 'var(--green)' : 'var(--red)'}">${a.periodPnL >= 0 ? '+' : ''}${_mask(a.periodPnL)}</span>
               <div style="font-size:0.6875rem;font-weight:400;opacity:.8;color:${a.periodPnL >= 0 ? 'var(--green)' : 'var(--red)'}">${_fmtPct(a.periodPnLPercent)}</div>`
          }
        </td>
        <td class="mono" style="text-align:center;color:var(--accent);font-weight:600">%${a.allocationPercent.toFixed(1)}</td>
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

    const periodRows = periods.map((p, i) => {
      const ret    = _calcReturn(p.days);
      const last   = i === periods.length - 1;
      const border = last ? '' : 'border-bottom:1px solid var(--border)';

      if (ret === null) {
        return `<div style="flex:1;display:flex;align-items:center;justify-content:space-between;padding:0 16px;${border}">
          <span style="font-size:0.8125rem;font-weight:500;color:var(--text-secondary)">${p.label}</span>
          <span style="font-size:0.75rem;color:var(--text-muted)">—</span>
        </div>`;
      }

      const up    = ret >= 0;
      const color = up ? 'var(--green)' : 'var(--red)';
      const tri   = up ? '▲' : '▼';
      const pct   = `${Math.abs(ret).toFixed(2)}%`;

      return `<div style="flex:1;display:flex;align-items:center;justify-content:space-between;padding:0 16px;${border}">
        <span style="font-size:0.8125rem;font-weight:500">${p.label}</span>
        <div style="display:flex;align-items:center;gap:7px">
          <span style="font-size:0.625rem;color:${color};line-height:1">${tri}</span>
          <span style="font-family:var(--font-mono);font-size:0.875rem;font-weight:700;color:${color}">${pct}</span>
        </div>
      </div>`;
    }).join('');

    const realizedTrades = _getSellTrades();
    let realizedRow = '';
    if (realizedTrades.length > 0) {
      let totalRealizedDisp = 0;
      for (const t of realizedTrades) {
        const aCur = _assetCur(t.symbol, t.buyCurrency);
        totalRealizedDisp += _toDisplay(t.price - t.costBasis, aCur) * t.quantity;
      }
      const rUp    = totalRealizedDisp >= 0;
      const rColor = rUp ? 'var(--green)' : 'var(--red)';
      realizedRow = `
        <div style="border-top:1px solid var(--border)">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 16px">
            <span style="font-size:0.75rem;font-weight:500;color:var(--text-muted)">${UI.t('inv_realized_pnl')}</span>
            <span style="font-family:var(--font-mono);font-size:0.8125rem;font-weight:700;color:${rColor}">${totalRealizedDisp >= 0 ? '+' : ''}${_mask(totalRealizedDisp)}</span>
          </div>
        </div>`;
    }

    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.innerHTML = periodRows + realizedRow;
  }

  function _updateToggle() {
    const userCode = _getCurrencyCode();
    const s        = Store.getSettings();
    const userSym  = s.currency || '₺';

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
        { label: UI.t('btn_back'),   variant: 'ghost',     align: 'left', onClick: m => { m.close(); setTimeout(openTradeDropdown, 80); } },
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

    _addTrade({
      id: Store._id(), type: 'buy', date, symbol,
      name: f.addName.value.trim() || ticker,
      assetType: type, quantity: qty, price: buy, buyCurrency: buyCurrency || null,
    });

    _addAssetModal.close();
    _load();

    if (!existing) {
      const assets   = Store.getInvestments().assets;
      const newAsset = assets[assets.length - 1];
      if (newAsset && _canAutoPrice(newAsset.assetType, newAsset.buyCurrency)) _fetchOnePrice(newAsset);
    }
  }

  // ── sell asset ────────────────────────────────────────────
  function _openSellAsset(id) {
    const assets = Store.getInvestments().assets || [];
    if (!id && !assets.length) { UI.toast(UI.t('inv_no_assets'), 'error'); return; }

    const asset    = id ? assets.find(a => a.id === id) : null;
    const aCur     = asset ? _assetCur(asset.symbol, asset.buyCurrency) : '';
    const curPrice = asset ? _currentPrice(asset) : null;
    const today    = _today();

    const pickerSection = asset
      ? `<div style="margin-bottom:14px;padding:10px 14px;background:var(--bg-elevated);border-radius:var(--radius-sm);display:flex;align-items:center;gap:10px">
           <span style="font-size:0.9375rem;font-weight:700;font-family:var(--font-mono);color:var(--text-primary)">${asset.symbol}</span>
           <span style="font-size:0.75rem;color:var(--text-secondary);flex:1">${asset.name}</span>
           <span style="font-size:0.75rem;color:var(--text-muted)">${UI.t('inv_sell_max')}: <strong style="color:var(--text-primary);font-family:var(--font-mono)">${asset.quantity}</strong></span>
         </div>`
      : `<div class="form-group" style="margin-bottom:14px">
           <label class="form-label">${UI.t('inv_select_asset')}</label>
           <button type="button" id="sellPickerBtn" onclick="Investments.openSellPicker(this)"
             style="width:100%;display:flex;align-items:center;gap:8px;padding:0 10px;height:38px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
             <span class="dd-label" style="flex:1;font-size:13px;color:var(--text-muted);text-align:left">${UI.t('inv_select_asset')}</span>
             <svg data-lucide="chevron-down" style="width:14px;height:14px;color:var(--text-muted);flex-shrink:0"></svg>
           </button>
           <input type="hidden" id="sellPickerVal" value="">
         </div>`;

    const content = `
      ${pickerSection}
      <div style="display:grid;gap:12px">
        <div class="form-group">
          <label class="form-label">${UI.t('inv_sell_qty')} <span id="sellMaxLabel" style="font-size:0.75rem;color:var(--text-muted)">${asset ? `(max ${asset.quantity})` : ''}</span></label>
          <input type="number" id="sellQtyInput" class="form-control" min="0.0001" max="${asset ? asset.quantity : ''}" step="any" ${asset ? `value="${asset.quantity}"` : ''} style="font-family:var(--font-mono)">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('inv_sell_price')} <span style="color:var(--text-muted);font-size:0.75rem" id="sellCurLabel">${aCur}</span></label>
          <input type="number" id="sellPriceInput" class="form-control" min="0" step="any" value="${curPrice ? curPrice.toFixed(4) : ''}" style="font-family:var(--font-mono)">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('inv_sell_date')}</label>
          <button type="button" id="sellDateBtn" onclick="Investments.toggleSellDate()"
            style="width:100%;display:flex;align-items:center;gap:6px;padding:0 10px;height:38px;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="calendar" style="width:15px;height:15px;color:var(--text-secondary);flex-shrink:0"></svg>
            <span id="sellDateLabel" style="flex:1;font-size:13px;color:var(--text-primary);text-align:left">${UI.formatDate(today)}</span>
          </button>
          <input type="hidden" id="sellDateInput" value="${today}">
        </div>
        <div id="sellPreview" style="padding:10px 14px;background:var(--bg-elevated);border-radius:var(--radius-sm);font-size:0.8125rem;display:none">
          <span style="color:var(--text-secondary)">${UI.t('inv_sell_preview')}:</span>
          <span id="sellPreviewVal" style="font-family:var(--font-mono);font-weight:700;margin-left:6px"></span>
        </div>
      </div>
      <input type="hidden" id="sellAssetId" value="${id || ''}">
    `;

    _sellAssetModal = new CustomModal({
      title:   UI.t('inv_sell_title'),
      icon:    'trending-down',
      content,
      width:   460,
      buttons: [
        { label: UI.t('btn_back'),         variant: 'ghost',     align: 'left', onClick: m => { m.close(); setTimeout(openTradeDropdown, 80); } },
        { label: UI.t('btn_cancel'),       variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('inv_sell_confirm'), variant: 'primary',   onClick: () => _saveSell() },
      ],
    });
    _sellAssetModal.open();

    _sellDateCdp = new CustomDatePicker({
      btn: 'sellDateBtn', input: 'sellDateInput', align: 'left', clearable: false,
      onSelect: date => { document.getElementById('sellDateLabel').textContent = UI.formatDate(date); },
    });
    _sellDateCdp.setValue(today);

    const _refreshSellPreview = () => {
      const assetNow = (Store.getInvestments().assets || []).find(a => a.id === document.getElementById('sellAssetId').value);
      if (!assetNow) return;
      const qty    = parseFloat(document.getElementById('sellQtyInput').value);
      const price  = parseFloat(document.getElementById('sellPriceInput').value);
      const cost   = Number(assetNow.buyPrice) || 0;
      const curNow = _assetCur(assetNow.symbol, assetNow.buyCurrency);
      const prevEl = document.getElementById('sellPreview');
      const valEl  = document.getElementById('sellPreviewVal');
      if (!isNaN(qty) && !isNaN(price) && qty > 0 && cost > 0) {
        const pnlDisp = _toDisplay(price - cost, curNow) * qty;
        valEl.textContent = `${pnlDisp >= 0 ? '+' : ''}${_mask(pnlDisp)}`;
        valEl.style.color = pnlDisp >= 0 ? 'var(--green)' : 'var(--red)';
        prevEl.style.display = '';
      } else {
        prevEl.style.display = 'none';
      }
    };
    document.getElementById('sellQtyInput').addEventListener('input', _refreshSellPreview);
    document.getElementById('sellPriceInput').addEventListener('input', _refreshSellPreview);
    if (asset) _refreshSellPreview();
  }

  function openSellPicker(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = document.getElementById('sellPickerVal').value;
          dd.setItems((Store.getInvestments().assets || []).map(a => ({
            value: a.id, label: `${a.symbol} — ${a.name}`, badge: String(a.quantity), active: a.id === cur,
          })));
        },
        onSelect: (val) => {
          const a = (Store.getInvestments().assets || []).find(x => x.id === val);
          if (!a) return;
          document.getElementById('sellPickerVal').value = val;
          document.getElementById('sellAssetId').value   = val;
          btn.querySelector('.dd-label').textContent = `${a.symbol} — ${a.name}`;
          const qi = document.getElementById('sellQtyInput');
          const pi = document.getElementById('sellPriceInput');
          if (qi) { qi.max = a.quantity; qi.placeholder = `max ${a.quantity}`; qi.value = a.quantity; }
          const cp = _currentPrice(a);
          if (pi && cp) pi.value = cp.toFixed(4);
          const ml = document.getElementById('sellMaxLabel');
          if (ml) ml.textContent = `(max ${a.quantity})`;
          const cl = document.getElementById('sellCurLabel');
          if (cl) cl.textContent = _assetCur(a.symbol, a.buyCurrency);
        },
      });
    }
    btn._ddInst.toggle();
  }

  function _saveSell() {
    const assetId  = document.getElementById('sellAssetId').value;
    const asset    = (Store.getInvestments().assets || []).find(a => a.id === assetId);
    if (!asset) { UI.toast(UI.t('inv_select_asset'), 'error'); return; }

    const qty       = parseFloat(document.getElementById('sellQtyInput').value);
    const sellPrice = parseFloat(document.getElementById('sellPriceInput').value);
    const date      = document.getElementById('sellDateInput').value || _today();

    if (isNaN(qty) || qty <= 0 || qty > asset.quantity) {
      UI.toast(UI.t('inv_sell_err_qty'), 'error'); return;
    }
    if (isNaN(sellPrice) || sellPrice <= 0) {
      UI.toast(UI.t('inv_sell_err_price'), 'error'); return;
    }

    const costBasis = Number(asset.buyPrice) || 0;

    _addTrade({
      id: Store._id(), type: 'sell', date,
      symbol: asset.symbol, name: asset.name, assetType: asset.assetType,
      quantity: qty, price: sellPrice, buyCurrency: asset.buyCurrency || null,
      costBasis, realizedPnL: (sellPrice - costBasis) * qty,
    });

    const remaining = Math.round((asset.quantity - qty) * 1e8) / 1e8;
    if (remaining <= 0) {
      Store.deleteAsset(asset.id);
    } else {
      Store.updateAsset(asset.id, { quantity: remaining });
    }

    _sellAssetModal.close();
    UI.toast(UI.t('inv_sell_success'), 'success');
    _load();
  }

  // ── buy more ──────────────────────────────────────────────
  function _openBuyAsset(assetId) {
    const assets = Store.getInvestments().assets || [];
    if (!assetId && !assets.length) { UI.toast(UI.t('inv_no_assets'), 'error'); return; }

    const asset  = assetId ? assets.find(a => a.id === assetId) : null;
    const today  = _today();
    const aCur   = asset ? _assetCur(asset.symbol, asset.buyCurrency) : '';

    const pickerSection = asset
      ? `<div style="margin-bottom:14px;padding:10px 14px;background:var(--bg-elevated);border-radius:var(--radius-sm);display:flex;align-items:center;gap:10px">
           <span style="font-size:0.9375rem;font-weight:700;font-family:var(--font-mono);color:var(--text-primary)">${asset.symbol}</span>
           <span style="font-size:0.75rem;color:var(--text-secondary);flex:1">${asset.name}</span>
           <span style="font-size:0.75rem;color:var(--text-muted)">${UI.t('inv_avg_cost')}: <strong style="font-family:var(--font-mono);color:var(--text-primary)">${_mask(asset.buyPrice)}</strong></span>
         </div>`
      : `<div class="form-group" style="margin-bottom:14px">
           <label class="form-label">${UI.t('inv_select_asset')}</label>
           <button type="button" id="buyPickerBtn" onclick="Investments.openBuyPicker(this)"
             style="width:100%;display:flex;align-items:center;gap:8px;padding:0 10px;height:38px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
             <span class="dd-label" style="flex:1;font-size:13px;color:var(--text-muted);text-align:left">${UI.t('inv_select_asset')}</span>
             <svg data-lucide="chevron-down" style="width:14px;height:14px;color:var(--text-muted);flex-shrink:0"></svg>
           </button>
           <input type="hidden" id="buyPickerVal" value="">
         </div>`;

    const content = `
      ${pickerSection}
      <div style="display:grid;gap:12px">
        <div class="form-group">
          <label class="form-label">${UI.t('inv_buy_qty')}</label>
          <input type="number" id="buyQtyInput" class="form-control" min="0.000001" step="any" placeholder="0" style="font-family:var(--font-mono)">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('inv_buy_price_label')} <span style="color:var(--text-muted);font-size:0.75rem" id="buyCurLabel">${aCur}</span></label>
          <input type="number" id="buyPriceInput" class="form-control" min="0" step="any" placeholder="0.00" style="font-family:var(--font-mono)">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('inv_buy_date_label')}</label>
          <button type="button" id="buyDateBtn" onclick="Investments.toggleBuyDate()"
            style="width:100%;display:flex;align-items:center;gap:6px;padding:0 10px;height:38px;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="calendar" style="width:15px;height:15px;color:var(--text-secondary);flex-shrink:0"></svg>
            <span id="buyDateLabel" style="flex:1;font-size:13px;color:var(--text-primary);text-align:left">${UI.formatDate(today)}</span>
          </button>
          <input type="hidden" id="buyDateInput" value="${today}">
        </div>
        <div id="buyPreview" style="padding:10px 14px;background:var(--bg-elevated);border-radius:var(--radius-sm);font-size:0.8125rem;display:none">
          <span style="color:var(--text-secondary)">${UI.t('inv_buy_new_avg')}:</span>
          <span id="buyPreviewVal" style="font-family:var(--font-mono);font-weight:700;margin-left:6px;color:var(--accent)"></span>
        </div>
      </div>
      <input type="hidden" id="buyTargetId" value="${assetId || ''}">
    `;

    _buyAssetModal = new CustomModal({
      title:   UI.t('inv_buy_title'),
      icon:    'trending-up',
      content,
      width:   460,
      buttons: [
        { label: UI.t('btn_back'),        variant: 'ghost',     align: 'left', onClick: m => { m.close(); setTimeout(openTradeDropdown, 80); } },
        { label: UI.t('btn_cancel'),      variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('inv_buy_confirm'), variant: 'primary',   onClick: () => _saveBuy() },
      ],
    });
    _buyAssetModal.open();

    _buyDateCdp = new CustomDatePicker({
      btn: 'buyDateBtn', input: 'buyDateInput', align: 'left', clearable: false,
      onSelect: date => { document.getElementById('buyDateLabel').textContent = UI.formatDate(date); },
    });
    _buyDateCdp.setValue(today);

    const _refreshBuyPreview = () => {
      const a = (Store.getInvestments().assets || []).find(x => x.id === document.getElementById('buyTargetId').value);
      if (!a) return;
      const qty   = parseFloat(document.getElementById('buyQtyInput').value);
      const price = parseFloat(document.getElementById('buyPriceInput').value);
      const prevEl = document.getElementById('buyPreview');
      const valEl  = document.getElementById('buyPreviewVal');
      if (!isNaN(qty) && qty > 0 && !isNaN(price) && price > 0) {
        const newAvg = (Number(a.quantity) * Number(a.buyPrice) + qty * price) / (Number(a.quantity) + qty);
        valEl.textContent = _mask(newAvg);
        prevEl.style.display = '';
      } else {
        prevEl.style.display = 'none';
      }
    };
    document.getElementById('buyQtyInput').addEventListener('input', _refreshBuyPreview);
    document.getElementById('buyPriceInput').addEventListener('input', _refreshBuyPreview);
    if (asset) _refreshBuyPreview();
  }

  function openBuyPicker(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: (dd) => {
          const cur = document.getElementById('buyPickerVal').value;
          dd.setItems((Store.getInvestments().assets || []).map(a => ({
            value: a.id, label: `${a.symbol} — ${a.name}`, badge: String(a.quantity), active: a.id === cur,
          })));
        },
        onSelect: (val) => {
          const a = (Store.getInvestments().assets || []).find(x => x.id === val);
          if (!a) return;
          document.getElementById('buyPickerVal').value  = val;
          document.getElementById('buyTargetId').value   = val;
          btn.querySelector('.dd-label').textContent = `${a.symbol} — ${a.name}`;
          const cl = document.getElementById('buyCurLabel');
          if (cl) cl.textContent = _assetCur(a.symbol, a.buyCurrency);
          document.getElementById('buyPreview').style.display = 'none';
        },
      });
    }
    btn._ddInst.toggle();
  }

  function _saveBuy() {
    const targetId = document.getElementById('buyTargetId').value;
    const asset    = (Store.getInvestments().assets || []).find(a => a.id === targetId);
    if (!asset) { UI.toast(UI.t('inv_select_asset'), 'error'); return; }

    const qty   = parseFloat(document.getElementById('buyQtyInput').value);
    const price = parseFloat(document.getElementById('buyPriceInput').value);
    const date  = document.getElementById('buyDateInput').value || _today();

    if (isNaN(qty) || qty <= 0)    { UI.toast(UI.t('inv_sell_err_qty'),   'error'); return; }
    if (isNaN(price) || price <= 0) { UI.toast(UI.t('inv_sell_err_price'), 'error'); return; }

    const totalQty = Number(asset.quantity) + qty;
    const newAvg   = (Number(asset.quantity) * Number(asset.buyPrice) + qty * price) / totalQty;

    Store.updateAsset(asset.id, {
      quantity: totalQty,
      buyPrice: Math.round(newAvg * 10000) / 10000,
    });

    _addTrade({
      id: Store._id(), type: 'buy', date,
      symbol: asset.symbol, name: asset.name, assetType: asset.assetType,
      quantity: qty, price, buyCurrency: asset.buyCurrency || null,
    });

    _buyAssetModal.close();
    UI.toast(UI.t('inv_buy_success'), 'success');
    _load();
  }

  // ── trade action panel (topbar) ──────────────────────────
  let _tradeActionModal = null;
  function openTradeDropdown() {
    _tradeActionModal = new CustomModal({
      title:   UI.t('inv_trade_action'),
      icon:    'layers',
      width:   420,
      buttons: [],
      content: `<div style="display:flex;flex-direction:column;gap:0.625rem">
        <button class="inv-trade-option opt-new" onclick="Investments._tradeActionPick('add')">
          <span class="opt-title">${UI.t('inv_add_btn')}</span>
          <span class="opt-desc">${UI.t('inv_trade_opt_new_desc')}</span>
        </button>
        <button class="inv-trade-option opt-buy" onclick="Investments._tradeActionPick('buy')">
          <span class="opt-title">${UI.t('inv_buy_title')}</span>
          <span class="opt-desc">${UI.t('inv_trade_opt_buy_desc')}</span>
        </button>
        <button class="inv-trade-option opt-sell" onclick="Investments._tradeActionPick('sell')">
          <span class="opt-title">${UI.t('inv_sell_title')}</span>
          <span class="opt-desc">${UI.t('inv_trade_opt_sell_desc')}</span>
        </button>
      </div>`,
    });
    _tradeActionModal.open();
  }

  function _tradeActionPick(action) {
    _tradeActionModal?.close();
    if (action === 'add')  { setTimeout(() => _openAddAsset(),        80); }
    if (action === 'buy')  { setTimeout(() => _openBuyAsset(null),    80); }
    if (action === 'sell') { setTimeout(() => _openSellAsset(null),   80); }
  }

  // ── trade history ─────────────────────────────────────────
  function _renderTradeHistory() {
    const tbody = document.getElementById('tradesBody');
    if (!tbody) return;

    const dfFrom  = document.getElementById('tradeFilterFrom')?.value || '';
    const dfTo    = document.getElementById('tradeFilterTo')?.value   || '';
    const search  = (document.getElementById('tradeSearch')?.value || '').toLowerCase().trim();

    let trades = _getTrades().slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    if (dfFrom)  trades = trades.filter(t => (t.date || '') >= dfFrom);
    if (dfTo)    trades = trades.filter(t => (t.date || '') <= dfTo);
    if (search)  trades = trades.filter(t =>
      (t.symbol || '').toLowerCase().includes(search) ||
      (t.name   || '').toLowerCase().includes(search)
    );

    if (!trades.length) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted)">${UI.t('inv_no_trades')}</td></tr>`;
      return;
    }

    tbody.innerHTML = trades.map(t => {
      const isBuy   = t.type === 'buy';
      const color   = isBuy ? 'var(--green)' : 'var(--red)';
      const typeLabel = UI.t(isBuy ? 'inv_trade_type_buy' : 'inv_trade_type_sell');
      const aCur    = _assetCur(t.symbol, t.buyCurrency);
      const priceDisp = _toDisplay(t.price || 0, aCur);

      let pnlCell = '<td></td>';
      if (!isBuy && t.realizedPnL != null) {
        const pnlDisp = _toDisplay((t.price - t.costBasis), aCur) * t.quantity;
        pnlCell = `<td class="mono" style="text-align:center;font-weight:600;color:${pnlDisp >= 0 ? 'var(--green)' : 'var(--red)'}">
          ${pnlDisp >= 0 ? '+' : ''}${_mask(pnlDisp)}
        </td>`;
      }

      const trId = 'tr-' + t.id;

      return `<tr id="${trId}">
        <td style="color:var(--text-secondary);font-size:0.8125rem;white-space:nowrap">${UI.formatDate(t.date || '')}</td>
        <td style="text-align:center;vertical-align:middle"><span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${color};background:${color}18;border:1px solid ${color}35;padding:2px 7px;border-radius:4px">${typeLabel}</span></td>
        <td>
          <div style="display:flex;align-items:baseline;gap:0.5rem">
            <span style="font-weight:600;font-family:var(--font-mono);font-size:0.875rem;display:inline-block;min-width:3.75rem">${t.symbol}</span>
            <span style="font-size:0.75rem;color:var(--text-muted)">${t.name || ''}</span>
          </div>
        </td>
        <td class="mono" style="text-align:center">${UI.isPrivate() ? '••••' : t.quantity}</td>
        <td class="mono" style="text-align:center;color:var(--text-secondary)">${_mask(priceDisp)}</td>
        ${pnlCell}
        <td style="white-space:nowrap;vertical-align:middle">
          <div style="display:inline-flex;gap:0.375rem;align-items:center">
            <button class="trade-act-btn trade-act-edit" onclick="Investments.editTrade('${t.id}')" data-tooltip="${UI.t('inv_edit_trade')}">
              <svg data-lucide="pencil" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
            </button>
            <button class="trade-act-btn trade-act-del" onclick="Investments.deleteTrade('${t.id}')" data-tooltip="${UI.t('inv_delete_trade')}">
              <svg data-lucide="trash-2" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');
    lucide.createIcons({ nodes: [tbody] });
  }

  // ── trade edit / delete ───────────────────────────────────
  function _updateTrade(id, updates) {
    const all = _getTrades().map(t => t.id === id ? Object.assign({}, t, updates) : t);
    Store.set('inv_trades', all);
  }

  function _editTrade(id) {
    const trade = _getTrades().find(t => t.id === id);
    if (!trade) return;
    const isBuy = trade.type === 'buy';

    _editTradeModal = new CustomModal({
      title:        UI.t('inv_edit_trade'),
      icon:         'pencil',
      width:        440,
      overflowBody: 'visible',
      content: `<form id="editTradeForm" onsubmit="return false" style="display:flex;flex-direction:column;gap:14px">
        <input type="hidden" id="editTradeId" value="${trade.id}">
        <div class="form-group">
          <label class="form-label">${UI.t('lbl_date')}</label>
          <button type="button" id="editTradeDateBtn" onclick="Investments.toggleEditTradeDate()"
            style="width:100%;display:flex;align-items:center;gap:6px;padding:0 10px;height:38px;
                   box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);
                   border-radius:var(--radius-sm);cursor:pointer">
            <svg data-lucide="calendar" style="width:15px;height:15px;color:var(--text-secondary);flex-shrink:0"></svg>
            <span id="editTradeDateLabel" style="flex:1;font-size:13px;color:var(--text-primary);text-align:left">${UI.formatDate(trade.date || _today())}</span>
          </button>
          <input type="hidden" id="editTradeDateInput" value="${trade.date || _today()}">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('inv_col_trade_type')}</label>
          <div style="display:flex;gap:8px">
            <button type="button" id="editTradeTypeBuy" onclick="Investments.setEditTradeType('buy')"
              style="flex:1;height:36px;border-radius:var(--radius-sm);cursor:pointer;font-size:13px;font-weight:600;
                     border:1px solid ${isBuy ? 'var(--green)' : 'var(--border)'};
                     background:${isBuy ? 'rgba(52,211,153,.15)' : 'var(--bg-elevated)'};
                     color:${isBuy ? 'var(--green)' : 'var(--text-secondary)'}">
              ${UI.t('inv_trade_type_buy')}
            </button>
            <button type="button" id="editTradeTypeSell" onclick="Investments.setEditTradeType('sell')"
              style="flex:1;height:36px;border-radius:var(--radius-sm);cursor:pointer;font-size:13px;font-weight:600;
                     border:1px solid ${!isBuy ? 'var(--red)' : 'var(--border)'};
                     background:${!isBuy ? 'rgba(248,113,113,.15)' : 'var(--bg-elevated)'};
                     color:${!isBuy ? 'var(--red)' : 'var(--text-secondary)'}">
              ${UI.t('inv_trade_type_sell')}
            </button>
          </div>
          <input type="hidden" id="editTradeTypeInput" value="${trade.type}">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('inv_col_qty')}</label>
          <input class="form-control" type="number" id="editTradeQty"
            min="0.000001" step="any" value="${trade.quantity}" style="height:38px">
        </div>
        <div class="form-group">
          <label class="form-label">${UI.t('inv_col_trade_price')}</label>
          <input class="form-control" type="number" id="editTradePriceInput"
            min="0" step="any" value="${trade.price}" style="height:38px">
        </div>
      </form>`,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'),   variant: 'primary',   onClick: () => _saveEditTrade() },
      ],
    });
    _editTradeModal.open();

    _editTradeDateCdp = new CustomDatePicker({
      btn: 'editTradeDateBtn', input: 'editTradeDateInput', align: 'left',
      onSelect: date => { document.getElementById('editTradeDateLabel').textContent = UI.formatDate(date); },
    });

    lucide.createIcons({ nodes: [document.getElementById('editTradeForm')] });
  }

  function _saveEditTrade() {
    const id    = document.getElementById('editTradeId').value;
    const date  = document.getElementById('editTradeDateInput').value;
    const type  = document.getElementById('editTradeTypeInput').value;
    const qty   = parseFloat(document.getElementById('editTradeQty').value);
    const price = parseFloat(document.getElementById('editTradePriceInput').value);

    if (!date)                  { UI.toast(UI.t('inv_invalid_date') || '—', 'error'); return; }
    if (isNaN(qty)  || qty <= 0) { UI.toast(UI.t('inv_invalid_qty'),  'error'); return; }
    if (isNaN(price) || price < 0) { UI.toast(UI.t('inv_invalid_buy'), 'error'); return; }

    _updateTrade(id, { date, type, quantity: qty, price });
    _editTradeModal.close();
    UI.toast(UI.t('inv_trade_updated'), 'success');
    _renderTradeHistory();
    _renderTradeHistModal();
  }

  function _setEditTradeType(type) {
    document.getElementById('editTradeTypeInput').value = type;
    const isBuy = type === 'buy';
    const buyBtn  = document.getElementById('editTradeTypeBuy');
    const sellBtn = document.getElementById('editTradeTypeSell');
    buyBtn.style.borderColor = isBuy ? 'var(--green)' : 'var(--border)';
    buyBtn.style.background  = isBuy ? 'rgba(52,211,153,.15)' : 'var(--bg-elevated)';
    buyBtn.style.color       = isBuy ? 'var(--green)' : 'var(--text-secondary)';
    sellBtn.style.borderColor = !isBuy ? 'var(--red)' : 'var(--border)';
    sellBtn.style.background  = !isBuy ? 'rgba(248,113,113,.15)' : 'var(--bg-elevated)';
    sellBtn.style.color       = !isBuy ? 'var(--red)' : 'var(--text-secondary)';
  }

  function _deleteTrade(id) {
    const trade = _getTrades().find(t => t.id === id);
    if (!trade) return;
    const typeLabel = UI.t(trade.type === 'buy' ? 'inv_trade_type_buy' : 'inv_trade_type_sell');
    DeleteManager.confirm({
      module:       'inv_trade',
      title:        UI.t('inv_delete_trade'),
      message:      `${typeLabel} — ${trade.symbol} × ${trade.quantity}`,
      confirmLabel: UI.t('btn_delete'),
      onConfirm: () => {
        const all = _getTrades().filter(t => t.id !== id);
        Store.set('inv_trades', all);
        UI.toast(UI.t('inv_trade_deleted'), 'info');
        _renderTradeHistory();
        _renderTradeHistModal();
      },
    });
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
    _migrateRealizedToTrades();
    _backfillAssetTrades();
    _fixBackfilledQty();
    UI.initTopbar();
    UI.initEsc();
    const _s = Store.getSettings();
    _currency  = _s.displayCurrency || _getCurrencyCode();
    _pnlPeriod = _s.pnlPeriod       || 'total';
    _depView        = Store.get('inv_dep_view')       || 'table';
    _tradesSubView  = Store.get('inv_trades_subview') || 'inv';

    document.getElementById('addAssetBtn')
      ?.addEventListener('click', () => _openAddAsset());

    _tradeFilterCdp = new CustomDatePicker({
      btn: 'tradeFilterDateBtn', input: 'tradeFilterFrom', inputTo: 'tradeFilterTo',
      align: 'right', clearable: true, range: true,
      onSelect: (from, to) => {
        const labelEl = document.getElementById('tradeFilterDateLabel');
        if (labelEl) {
          if (from && to)   labelEl.textContent = `${UI.formatDate(from)} – ${UI.formatDate(to)}`;
          else if (from)    labelEl.textContent = `${UI.formatDate(from)} –`;
          else              labelEl.textContent = UI.t('inv_trade_filter_all');
        }
        _renderTradeHistory();
      },
      onClear: () => {
        const labelEl = document.getElementById('tradeFilterDateLabel');
        if (labelEl) labelEl.textContent = UI.t('inv_trade_filter_all');
        _renderTradeHistory();
      },
    });

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
          // Rate missing or stale → fetch fresh (async; UI updates immediately below)
          _fetchExchangeRate(true);
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

  function _openTradeHistModal() {
    const trades   = _getTrades();
    const deposits = Store.getDeposits();
    const months   = [...new Set(trades.map(t => (t.date || '').slice(0, 7)).filter(Boolean))].sort().reverse();
    const depMonths = (() => {
      if (!deposits.length) return [];
      const earliest = deposits.reduce((mn, d) => (d.startDate || '') < mn ? (d.startDate || '') : mn, deposits[0].startDate || '');
      const startYM = earliest.slice(0, 7);
      const nowYM   = _today().slice(0, 7);
      const list    = [];
      let [y, m] = startYM.split('-').map(Number);
      const [ey, em] = nowYM.split('-').map(Number);
      while (y < ey || (y === ey && m <= em)) {
        list.push(`${y}-${String(m).padStart(2, '0')}`);
        m++; if (m > 12) { m = 1; y++; }
      }
      return list.reverse();
    })();
    if (!months.length && !depMonths.length) { UI.toast(UI.t('inv_no_trades'), 'info'); return; }
    _tradeHistMonths = months;
    _tradeHistIdx    = 0;
    _depHistMonths   = depMonths;
    _depHistIdx      = 0;
    _tradeHistTab    = (_tradesSubView === 'dep' && depMonths.length) ? 'deposits' : (months.length ? 'trades' : 'deposits');
    _tradeHistModal  = new CustomModal({
      title:   UI.t('inv_history_btn'),
      icon:    'history',
      width:   1050,
      content: '<div id="inv-hist-inner" style="min-height:7.5rem"></div>',
      buttons: [{ label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() }],
    });
    _tradeHistModal.open();
    _renderHistModal();

    // Privacy toggle butonu — header'a X butonunun soluna inject et
    const _cmHeader = _tradeHistModal._overlay.querySelector('.cm-header');
    const _cmClose  = _cmHeader.querySelector('[data-cm-close]');
    const _privBtn  = document.createElement('button');
    _privBtn.type   = 'button';
    _privBtn.className = 'cm-close';
    _privBtn.dataset.tooltip = UI.isPrivate() ? UI.t('privacy_show') : UI.t('privacy_hide');
    _privBtn.innerHTML = `<svg data-lucide="${UI.isPrivate() ? 'eye-off' : 'eye'}"></svg>`;
    _privBtn.addEventListener('click', () => {
      UI.togglePrivacy();
      const hidden = UI.isPrivate();
      _privBtn.dataset.tooltip = hidden ? UI.t('privacy_show') : UI.t('privacy_hide');
      _privBtn.innerHTML = `<svg data-lucide="${hidden ? 'eye-off' : 'eye'}"></svg>`;
      lucide.createIcons({ nodes: [_privBtn] });
      _renderHistModal();
    });
    _cmHeader.insertBefore(_privBtn, _cmClose);
    lucide.createIcons({ nodes: [_privBtn] });

    // Para birimi toggle (TRY / USD) — privacy butonunun soluna inject et
    const _curToggle = document.createElement('div');
    _curToggle.style.cssText = 'display:flex;gap:2px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:2px;flex-shrink:0';
    const _syncCurBtns = () => {
      _curToggle.querySelectorAll('button').forEach(b => {
        const active = b.dataset.cur === _currency;
        b.style.background = active ? 'var(--accent)' : 'transparent';
        b.style.color      = active ? 'var(--accent-contrast,#fff)' : 'var(--text-muted)';
      });
    };
    ['TRY', 'USD'].forEach(cur => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.cur = cur;
      b.textContent = cur;
      b.style.cssText = 'padding:3px 10px;border-radius:3px;border:none;cursor:pointer;font-size:0.6875rem;font-weight:700;font-family:var(--font-mono);letter-spacing:.03em;transition:background 150ms,color 150ms';
      b.addEventListener('click', () => {
        setDisplayCurrency(cur);
        _syncCurBtns();
        _renderHistModal();
      });
      _curToggle.appendChild(b);
    });
    _syncCurBtns();
    _cmHeader.insertBefore(_curToggle, _privBtn);
  }

  function _renderHistModal() {
    if (_tradeHistTab === 'trades') _renderTradeHistModal();
    else _renderDepHistModal();
  }

  function _switchHistTab(tab) {
    _tradeHistTab = tab;
    if (tab === 'deposits') _depHistIdx = 0;
    if (tab === 'trades')   _tradeHistIdx = 0;
    _renderHistModal();
  }

  function _histTabSwitchHtml(active) {
    const hasTrades   = _tradeHistMonths.length > 0;
    const hasDeposits = Store.getDeposits().length > 0;
    const _tab = (key, icon, label) => {
      const isActive = active === key;
      return `<button onclick="Investments.switchHistTab('${key}')"
        style="display:flex;align-items:center;gap:5px;padding:5px 14px;border-radius:3px;border:none;cursor:pointer;font-size:0.8125rem;font-weight:600;transition:background 150ms,color 150ms;
               background:${isActive ? 'var(--accent)' : 'transparent'};
               color:${isActive ? 'var(--accent-contrast,#fff)' : 'var(--text-muted)'}">
        <svg data-lucide="${icon}" style="width:12px;height:12px;flex-shrink:0"></svg>
        ${label}
      </button>`;
    };
    return `<div style="display:inline-flex;gap:2px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:2px">
      ${_tab('trades',   'receipt',  UI.t('inv_hist_tab_trades'))}
      ${_tab('deposits', 'landmark', UI.t('inv_hist_tab_deposits'))}
    </div>`;
  }

  function _renderTradeHistModal() {
    const el = document.getElementById('inv-hist-inner');
    if (!el) return;
    const tabSwitch = _histTabSwitchHtml('trades');
    if (!_tradeHistMonths.length) {
      el.innerHTML = `
        <div style="display:flex;justify-content:center;margin-bottom:1.25rem">${tabSwitch}</div>
        <div style="padding:2rem 0;text-align:center">${UI.emptyState(UI.t('inv_no_trades'), 'receipt')}</div>`;
      lucide.createIcons({ nodes: [el] });
      return;
    }
    const month = _tradeHistMonths[_tradeHistIdx];
    const [y, m] = month.split('-').map(Number);
    const lang   = UI.getLang();
    const locale = lang === 'tr' ? 'tr-TR' : lang === 'zh' ? 'zh-CN' : lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US';
    const label  = new Date(y, m - 1, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    const monthLabel = label.charAt(0).toUpperCase() + label.slice(1);

    const monthTrades = _getTrades()
      .filter(t => (t.date || '').startsWith(month))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    const buys  = monthTrades.filter(t => t.type === 'buy');
    const sells = monthTrades.filter(t => t.type === 'sell');
    const pnl   = sells.reduce((s, t) => {
      const aCur = _assetCur(t.symbol, t.buyCurrency);
      return s + _toDisplay((t.realizedPnL || 0), aCur);
    }, 0);
    const pnlColor = pnl >= 0 ? 'var(--green)' : 'var(--red)';

    const kpiHtml = `
      <div style="display:flex;gap:0.75rem;margin-bottom:1rem">
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:var(--green);text-transform:uppercase;margin-bottom:4px">${UI.t('inv_trade_type_buy')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:var(--text-primary)">${buys.length} ${UI.t('inv_col_trade_type').toLowerCase()}</div>
        </div>
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:var(--red);text-transform:uppercase;margin-bottom:4px">${UI.t('inv_trade_type_sell')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:var(--text-primary)">${sells.length} ${UI.t('inv_col_trade_type').toLowerCase()}</div>
        </div>
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:${pnlColor};text-transform:uppercase;margin-bottom:4px">${UI.t('inv_pnl')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:${pnlColor}">${pnl >= 0 ? '+' : ''}${_mask(pnl)}</div>
        </div>
      </div>`;

    const rowsHtml = monthTrades.length ? `
      <div style="overflow-x:auto">
        <table class="data-table" style="width:100%">
          <thead><tr>
            <th data-i18n="lbl_date">Tarih</th>
            <th style="text-align:center" data-i18n="inv_col_trade_type">İşlem</th>
            <th data-i18n="inv_col_asset">Varlık / Sembol</th>
            <th style="text-align:center" data-i18n="inv_col_qty">Adet</th>
            <th style="text-align:center" data-i18n="inv_col_trade_price">Fiyat</th>
            <th style="text-align:center" data-i18n="inv_pnl">K/Z</th>
            <th style="width:5rem"></th>
          </tr></thead>
          <tbody>${monthTrades.map(t => {
            const isBuy  = t.type === 'buy';
            const color  = isBuy ? 'var(--green)' : 'var(--red)';
            const typeLabel = UI.t(isBuy ? 'inv_trade_type_buy' : 'inv_trade_type_sell');
            const aCur   = _assetCur(t.symbol, t.buyCurrency);
            const price  = _toDisplay(t.price || 0, aCur);
            let pnlCell  = '<td></td>';
            if (!isBuy && t.realizedPnL != null) {
              const p = _toDisplay((t.price - t.costBasis), aCur) * t.quantity;
              pnlCell = `<td class="mono" style="text-align:center;font-weight:600;color:${p >= 0 ? 'var(--green)' : 'var(--red)'}">${p >= 0 ? '+' : ''}${_mask(p)}</td>`;
            }
            return `<tr>
              <td style="color:var(--text-secondary);font-size:0.8125rem">${UI.formatDate(t.date || '')}</td>
              <td style="text-align:center;vertical-align:middle"><span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${color};background:${color}18;border:1px solid ${color}35;padding:2px 7px;border-radius:4px">${typeLabel}</span></td>
              <td><div style="display:flex;align-items:baseline;gap:0.5rem">
                <span style="font-weight:600;font-family:var(--font-mono);font-size:0.875rem">${t.symbol}</span>
                <span style="font-size:0.75rem;color:var(--text-muted)">${t.name || ''}</span>
              </div></td>
              <td class="mono" style="text-align:center">${UI.isPrivate() ? '••••' : t.quantity}</td>
              <td class="mono" style="text-align:center;color:var(--text-secondary)">${_mask(price)}</td>
              ${pnlCell}
              <td style="text-align:center;vertical-align:middle;white-space:nowrap">
                <div style="display:inline-flex;gap:0.375rem;align-items:center">
                  <button class="trade-act-btn trade-act-edit" onclick="Investments.editTrade('${t.id}')" data-tooltip="${UI.t('inv_edit_trade')}">
                    <svg data-lucide="pencil" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
                  </button>
                  <button class="trade-act-btn trade-act-del" onclick="Investments.deleteTrade('${t.id}')" data-tooltip="${UI.t('inv_delete_trade')}">
                    <svg data-lucide="trash-2" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
                  </button>
                </div>
              </td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>` : `<div style="padding:2rem 0;text-align:center">${UI.emptyState(UI.t('inv_no_trades'), 'receipt')}</div>`;

    el.innerHTML = `
      <div style="display:flex;justify-content:center;margin-bottom:1.25rem">${tabSwitch}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;gap:0.75rem">
        <button class="btn btn-icon btn-secondary" onclick="Investments.tradeHistNavTo(1)" ${_tradeHistIdx >= _tradeHistMonths.length - 1 ? 'disabled' : ''} style="width:2.125rem;height:2.125rem;flex-shrink:0"><svg data-lucide="chevron-left"></svg></button>
        <div style="text-align:center;flex:1">
          <div style="font-weight:700;font-size:0.875rem;color:var(--text-primary)">${monthLabel}</div>
          <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px">${_tradeHistMonths.length - _tradeHistIdx}. dönem</div>
        </div>
        <button class="btn btn-icon btn-secondary" onclick="Investments.tradeHistNavTo(-1)" ${_tradeHistIdx <= 0 ? 'disabled' : ''} style="width:2.125rem;height:2.125rem;flex-shrink:0"><svg data-lucide="chevron-right"></svg></button>
      </div>
      ${kpiHtml}
      ${rowsHtml}`;
    lucide.createIcons({ nodes: [el] });
  }

  function _tradeHistNavTo(dir) {
    const next = _tradeHistIdx + dir;
    if (next < 0 || next >= _tradeHistMonths.length) return;
    _tradeHistIdx = next;
    _renderHistModal();
  }

  function _renderDepHistModal() {
    const el = document.getElementById('inv-hist-inner');
    if (!el) return;
    const tabSwitch = _histTabSwitchHtml('deposits');

    if (!_depHistMonths.length) {
      el.innerHTML = `
        <div style="display:flex;justify-content:center;margin-bottom:1.25rem">${tabSwitch}</div>
        <div style="padding:2rem 0;text-align:center">${UI.emptyState(UI.t('inv_dep_no_deposits'), 'landmark')}</div>`;
      lucide.createIcons({ nodes: [el] });
      return;
    }

    const month = _depHistMonths[_depHistIdx];
    const [y, m] = month.split('-').map(Number);
    const lang   = UI.getLang();
    const locale = lang === 'tr' ? 'tr-TR' : lang === 'zh' ? 'zh-CN' : lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US';
    const label  = new Date(y, m - 1, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    const monthLabel = label.charAt(0).toUpperCase() + label.slice(1);

    const s   = Store.getSettings();
    const cur = s.currency || '₺';
    const rate = _getTryRate();

    // Ayın son günü — değerleri o tarihe göre hesapla
    const monthLastDay = new Date(y, m, 0).toISOString().slice(0, 10);
    const refDate      = monthLastDay <= _today() ? monthLastDay : _today();

    // O ay boyunca aktif olan mevduatlar:
    // başlangıç <= ayın son günü VE (vadesiz VEYA vade sonu >= ayın ilk günü)
    const monthStart = `${month}-01`;
    const monthDeposits = Store.getDeposits()
      .filter(d => {
        if ((d.startDate || '') > monthLastDay) return false;
        if (d.type === 'term' && d.termDays) {
          const dt = new Date(d.startDate); dt.setDate(dt.getDate() + Number(d.termDays));
          return dt.toISOString().slice(0, 10) >= monthStart;
        }
        return true;
      })
      .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));

    let totalPrincipal = 0, totalCurrentVal = 0, totalAccrued = 0;
    monthDeposits.forEach(dep => {
      const calc    = _calcDeposit(dep, refDate);
      const depCode = dep.currency || 'TRY';
      const toDisp  = v => _currency === 'USD'
        ? (depCode === 'USD' ? v : v / rate)
        : (depCode === 'TRY' ? v : v * rate);
      totalPrincipal  += toDisp(Number(dep.principal) || 0);
      totalCurrentVal += toDisp(calc.currentValue);
      totalAccrued    += toDisp(calc.accruedInterest);
    });

    const kpiHtml = `
      <div style="display:flex;gap:0.75rem;margin-bottom:1rem">
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px">${UI.t('inv_dep_principal')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:var(--text-primary)">${_mask(totalPrincipal)}</div>
        </div>
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:var(--accent);text-transform:uppercase;margin-bottom:4px">${UI.t('inv_dep_current_val')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:var(--text-primary)">${_mask(totalCurrentVal)}</div>
        </div>
        <div style="flex:1;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 0.875rem">
          <div style="font-size:0.625rem;font-weight:700;letter-spacing:.1em;color:var(--green);text-transform:uppercase;margin-bottom:4px">${UI.t('inv_dep_accrued')}</div>
          <div class="mono" style="font-size:0.9375rem;font-weight:600;color:var(--green)">+${_mask(totalAccrued)}</div>
        </div>
      </div>`;

    const rowsHtml = monthDeposits.length ? `
      <table class="data-table" style="width:100%">
        <thead><tr>
          <th>${UI.t('inv_dep_bank')}</th>
          <th style="text-align:center">${UI.t('inv_dep_type_label')} / %</th>
          <th style="text-align:center">${UI.t('inv_dep_principal')}</th>
          <th style="text-align:center">${UI.t('inv_dep_maturity')} / ${UI.t('inv_dep_status')}</th>
          <th style="text-align:center">${UI.t('inv_dep_current_val')}</th>
          <th style="text-align:center">${UI.t('inv_dep_accrued')}</th>
          <th style="width:4.5rem"></th>
        </tr></thead>
        <tbody>${monthDeposits.map(dep => {
          const calc      = _calcDeposit(dep, refDate);
          const depSym    = dep.currency === 'USD' ? '$' : dep.currency === 'EUR' ? '€' : cur;
          const isTerm    = dep.type === 'term';
          const typeColor = isTerm ? 'var(--accent)' : 'var(--green)';
          const typeLabel = UI.t(isTerm ? 'inv_dep_term_short' : 'inv_dep_free_short');
          let matStatusCell;
          if (isTerm) {
            matStatusCell = calc.expired
              ? `<span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--red);background:var(--red)18;border:1px solid var(--red)35;padding:2px 7px;border-radius:4px">${UI.t('inv_dep_expired')}</span>`
              : `<div style="font-size:0.8125rem;color:var(--text-secondary)">${UI.formatDate(calc.maturityDate || '')}</div>
                 <div style="font-size:0.6875rem;color:var(--text-muted);margin-top:1px">${calc.daysLeft} ${UI.t('inv_dep_days_left').toLowerCase()}</div>`;
          } else {
            matStatusCell = `<span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--green);background:var(--green)18;border:1px solid var(--green)35;padding:2px 7px;border-radius:4px">${UI.t('inv_dep_status_active')}</span>`;
          }
          return `<tr>
            <td>
              <div style="font-weight:600">${dep.bankName || '—'}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:1px">${UI.formatDate(dep.startDate || '')}</div>
            </td>
            <td style="text-align:center;vertical-align:middle">
              <div><span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${typeColor};background:${typeColor}18;border:1px solid ${typeColor}35;padding:2px 7px;border-radius:4px">${typeLabel}</span></div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:3px">%${dep.rate}</div>
            </td>
            <td class="mono" style="text-align:center">${UI.maskCurrency(dep.principal, depSym)}</td>
            <td style="text-align:center;vertical-align:middle">${matStatusCell}</td>
            <td class="mono" style="text-align:center;font-weight:600">${UI.maskCurrency(calc.currentValue, depSym)}</td>
            <td class="mono" style="text-align:center;color:var(--green)">+${UI.maskCurrency(calc.accruedInterest, depSym)}</td>
            <td style="text-align:center;vertical-align:middle;white-space:nowrap">
              <div style="display:inline-flex;gap:0.375rem;align-items:center">
                <button class="trade-act-btn trade-act-edit" onclick="Investments.editDeposit('${dep.id}')" data-tooltip="${UI.t('btn_edit')}">
                  <svg data-lucide="pencil" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
                </button>
                <button class="trade-act-btn trade-act-del" onclick="Investments.deleteDeposit('${dep.id}')" data-tooltip="${UI.t('btn_delete')}">
                  <svg data-lucide="trash-2" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
                </button>
              </div>
            </td>
          </tr>`;
        }).join('')}</tbody>
      </table>`
      : `<div style="padding:2rem 0;text-align:center">${UI.emptyState(UI.t('inv_dep_no_deposits'), 'landmark')}</div>`;

    el.innerHTML = `
      <div style="display:flex;justify-content:center;margin-bottom:1.25rem">${tabSwitch}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;gap:0.75rem">
        <button class="btn btn-icon btn-secondary" onclick="Investments.depHistNavTo(1)" ${_depHistIdx >= _depHistMonths.length - 1 ? 'disabled' : ''} style="width:2.125rem;height:2.125rem;flex-shrink:0"><svg data-lucide="chevron-left"></svg></button>
        <div style="text-align:center;flex:1">
          <div style="font-weight:700;font-size:0.875rem;color:var(--text-primary)">${monthLabel}</div>
          <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px">${_depHistMonths.length - _depHistIdx}. dönem</div>
        </div>
        <button class="btn btn-icon btn-secondary" onclick="Investments.depHistNavTo(-1)" ${_depHistIdx <= 0 ? 'disabled' : ''} style="width:2.125rem;height:2.125rem;flex-shrink:0"><svg data-lucide="chevron-right"></svg></button>
      </div>
      ${kpiHtml}
      ${rowsHtml}`;
    lucide.createIcons({ nodes: [el] });
  }

  function _depHistNavTo(dir) {
    const next = _depHistIdx + dir;
    if (next < 0 || next >= _depHistMonths.length) return;
    _depHistIdx = next;
    _renderHistModal();
  }

  function _updateTradeCycle() {
    const [y, m] = _tradeCycleMonth.split('-').map(Number);
    const start  = `${y}-${String(m).padStart(2,'0')}-01`;
    const lastDay = new Date(y, m, 0).toISOString().slice(0, 10);  // last day of month
    document.getElementById('tradeFilterFrom').value = start;
    document.getElementById('tradeFilterTo').value   = lastDay;

    const lang = typeof UI !== 'undefined' ? UI.getLang() : 'tr';
    const locale = lang === 'tr' ? 'tr-TR' : lang === 'zh' ? 'zh-CN' : lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US';
    const label = new Date(y, m - 1, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    const el = document.getElementById('tradeCycleLabel');
    if (el) el.textContent = label.charAt(0).toUpperCase() + label.slice(1);

    const nextBtn = document.getElementById('tradeCycleNext');
    if (nextBtn) nextBtn.disabled = _tradeCycleMonth >= UI.today().slice(0, 7);
  }

  function tradeCycleNav(dir) {
    const [y, m] = _tradeCycleMonth.split('-').map(Number);
    const d = new Date(y, m - 1 + dir, 1);
    const newMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (newMonth > UI.today().slice(0, 7)) return;
    _tradeCycleMonth = newMonth;
    _updateTradeCycle();
    _renderTradeHistory();
    lucide.createIcons({ nodes: [document.getElementById('view-trades')] });
  }

  // ── Deposit helpers ───────────────────────────────────────
  function _daysBetween(a, b) {
    return Math.floor((new Date(b) - new Date(a)) / 86400000);
  }

  function _calcDeposit(dep, refDate) {
    const today = refDate || _today();
    const elapsed = Math.max(0, _daysBetween(dep.startDate, today));
    const p = Number(dep.principal) || 0;
    const r = Number(dep.rate) || 0;
    const dailyRate = r / 100 / 365;

    let currentValue, dailyGain, accruedInterest, maturityDate, maturityValue, daysLeft, expired;

    if (dep.type === 'term') {
      const td = Number(dep.termDays) || 30;
      maturityDate = (() => {
        const d = new Date(dep.startDate);
        d.setDate(d.getDate() + td);
        return d.toISOString().split('T')[0];
      })();
      expired = today >= maturityDate;
      daysLeft = expired ? 0 : _daysBetween(today, maturityDate);
      const usedDays = Math.min(elapsed, td);
      accruedInterest = p * dailyRate * usedDays;
      currentValue = p + accruedInterest;
      dailyGain = p * dailyRate;
      maturityValue = p + p * dailyRate * td;
    } else {
      // free/daily compound
      maturityDate = null;
      expired = false;
      daysLeft = null;
      currentValue = p * Math.pow(1 + dailyRate, elapsed);
      accruedInterest = currentValue - p;
      dailyGain = currentValue * dailyRate;
      maturityValue = null;
    }

    return { currentValue, dailyGain, accruedInterest, maturityDate, maturityValue, daysLeft, expired };
  }

  function _initDepDrag() {
    const container = document.getElementById('dep-list');
    if (!container) return;
    const rows = [...container.querySelectorAll('.dep-dep-row')];
    if (rows.length < 2) return;

    rows.forEach((row, idx) => {
      row.draggable = true;

      row.addEventListener('dragstart', e => {
        if (e.target.closest('button')) { e.preventDefault(); return; }
        _depDragIdx = idx;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => row.classList.add('dep-dragging'), 0);
      });

      row.addEventListener('dragend', () => {
        row.classList.remove('dep-dragging');
        rows.forEach(r => r.classList.remove('dep-drag-over-top', 'dep-drag-over-bot'));
        _depDragIdx = null;
      });

      row.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        rows.forEach(r => r.classList.remove('dep-drag-over-top', 'dep-drag-over-bot'));
        const mid = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2;
        row.classList.add(e.clientY < mid ? 'dep-drag-over-top' : 'dep-drag-over-bot');
      });

      row.addEventListener('dragleave', e => {
        if (!row.contains(e.relatedTarget)) {
          row.classList.remove('dep-drag-over-top', 'dep-drag-over-bot');
        }
      });

      row.addEventListener('drop', e => {
        e.preventDefault();
        row.classList.remove('dep-drag-over-top', 'dep-drag-over-bot');
        const fromIdx = _depDragIdx;
        if (fromIdx === null || fromIdx === idx) return;

        const deposits = [...Store.getDeposits()];
        const [moved] = deposits.splice(fromIdx, 1);

        const mid = row.getBoundingClientRect().top + row.getBoundingClientRect().height / 2;
        let insertAt = e.clientY < mid ? idx : idx + 1;
        if (fromIdx < idx) insertAt = Math.max(0, insertAt - 1);

        deposits.splice(Math.min(deposits.length, insertAt), 0, moved);
        Store.setDeposits(deposits);
        _renderDeposits();
      });
    });
  }

  function _setDepView(v) {
    _depView = v;
    Store.set('inv_dep_view', v);
    _renderDeposits();
  }

  function _depViewToggleHTML() {
    const _btn = (view, icon, label) => {
      const active = _depView === view;
      return `<button onclick="Investments.setDepView('${view}')" class="dep-view-btn${active ? ' active' : ''}">
        <svg data-lucide="${icon}" style="width:13px;height:13px;flex-shrink:0"></svg>
        ${label}
      </button>`;
    };
    return `<div style="display:flex;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:3px;gap:2px;height:34px;box-sizing:border-box;flex-shrink:0">
      ${_btn('cards', 'layout-grid', UI.t('inv_dep_view_cards'))}
      ${_btn('table', 'table-2',    UI.t('inv_dep_view_table'))}
    </div>`;
  }

  function _renderDepCards(deposits, cur) {
    return deposits.map(dep => {
      const calc = _calcDeposit(dep);
      const depSym = dep.currency === 'USD' ? '$' : dep.currency === 'EUR' ? '€' : cur;
      const maskVal = v => UI.maskCurrency(v, depSym);
      const typeLabel = dep.type === 'term' ? UI.t('inv_dep_type_term') : UI.t('inv_dep_type_free');
      const typeColor = dep.type === 'term' ? 'var(--blue)' : 'var(--green)';

      let maturityInfo = '';
      if (dep.type === 'term') {
        if (calc.expired) {
          maturityInfo = `<span style="font-size:0.75rem;font-weight:600;color:var(--yellow);background:rgba(234,179,8,.12);border:1px solid rgba(234,179,8,.3);padding:2px 8px;border-radius:4px">${UI.t('inv_dep_expired')}</span>`;
        } else {
          maturityInfo = `<span style="font-size:0.75rem;color:var(--text-muted)">${UI.t('inv_dep_days_left')}: <b style="color:var(--text-primary)">${UI.t('inv_dep_days_left_val', calc.daysLeft)}</b></span>`;
        }
      }

      return `
        <div class="dep-dep-row" data-id="${dep.id}" draggable="true" style="display:grid;grid-template-columns:1fr auto;align-items:start;gap:0.75rem;padding:1rem 1.25rem;border-bottom:1px solid var(--border)">
          <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:0">
            <div style="display:flex;align-items:center;gap:0.625rem;flex-wrap:wrap">
              <span style="font-size:0.9375rem;font-weight:700;color:var(--text-primary)">${dep.bankName || '—'}</span>
              <span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${typeColor};background:${typeColor}18;border:1px solid ${typeColor}35;padding:2px 7px;border-radius:4px">${typeLabel}</span>
              ${maturityInfo}
            </div>
            <div style="display:flex;gap:1.5rem;flex-wrap:wrap">
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_start')}</div>
                <div style="font-size:0.875rem">${dep.startDate ? UI.formatDate(dep.startDate) : '—'}</div>
              </div>
              ${dep.type === 'term' && calc.maturityDate ? `
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_maturity')}</div>
                <div style="font-size:0.875rem">${UI.formatDate(calc.maturityDate)}</div>
              </div>` : ''}
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_principal')}</div>
                <div class="mono" style="font-size:0.875rem;font-weight:600">${maskVal(dep.principal)}</div>
              </div>
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_current_val')}</div>
                <div class="mono" style="font-size:0.875rem;font-weight:600;color:var(--green)">${maskVal(calc.currentValue)}</div>
              </div>
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_accrued')}</div>
                <div class="mono" style="font-size:0.875rem;font-weight:600;color:var(--green)">+${maskVal(calc.accruedInterest)}</div>
              </div>
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_daily_gain')}</div>
                <div class="mono" style="font-size:0.875rem;font-weight:600;color:var(--accent)">+${maskVal(calc.dailyGain)}</div>
              </div>
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_rate')}</div>
                <div class="mono" style="font-size:0.875rem;font-weight:600">%${dep.rate}</div>
              </div>
              ${dep.type === 'term' && calc.maturityDate ? `
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_maturity_interest')}</div>
                <div class="mono" style="font-size:0.875rem;font-weight:600;color:var(--green)">+${maskVal(calc.maturityValue - (Number(dep.principal) || 0))}</div>
              </div>
              <div>
                <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:2px">${UI.t('inv_dep_total_return')}</div>
                <div class="mono" style="font-size:0.875rem;font-weight:700;color:var(--accent)">${maskVal(calc.maturityValue)}</div>
              </div>` : ''}
            </div>
          </div>
          <div style="display:flex;gap:0.375rem;flex-shrink:0;align-items:flex-start;padding-top:2px">
            <button class="btn btn-icon" onclick="Investments.editDeposit('${dep.id}')" data-tooltip="${UI.t('btn_edit')}"
                    style="color:var(--text-secondary);transition:background .15s,border-color .15s,color .15s"
                    onmouseenter="this.style.background='var(--bg-elevated)';this.style.borderColor='var(--border)';this.style.color='var(--text-primary)'"
                    onmouseleave="this.style.background='';this.style.borderColor='transparent';this.style.color='var(--text-secondary)'">
              <svg data-lucide="pencil"></svg>
            </button>
            <button class="btn btn-icon btn-danger" onclick="Investments.deleteDeposit('${dep.id}')" data-tooltip="${UI.t('btn_delete')}">
              <svg data-lucide="trash-2"></svg>
            </button>
          </div>
        </div>`;
    }).join('');
  }

  function _renderDepTable(deposits, cur) {
    const _th = (label, first) => `<th style="padding:0.5625rem 0.5rem;${first ? 'padding-left:1.25rem;' : ''}text-align:left;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);white-space:nowrap">${label}</th>`;
    const _thR = label => `<th style="padding:0.5625rem 0.5rem;text-align:right;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);white-space:nowrap">${label}</th>`;
    const _thC = label => `<th style="padding:0.5625rem 0.5rem;text-align:center;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);white-space:nowrap">${label}</th>`;

    const rows = deposits.map(dep => {
      const calc     = _calcDeposit(dep);
      const depSym   = dep.currency === 'USD' ? '$' : dep.currency === 'EUR' ? '€' : cur;
      const maskVal  = v => UI.maskCurrency(v, depSym);
      const typeColor = dep.type === 'term' ? 'var(--blue)' : 'var(--green)';
      const typeLabel = dep.type === 'term' ? UI.t('inv_dep_type_term') : UI.t('inv_dep_type_free');

      const maturityInterest = dep.type === 'term' && calc.maturityValue
        ? calc.maturityValue - (Number(dep.principal) || 0)
        : calc.accruedInterest || null;

      const statusHTML = (dep.type === 'term' && calc.expired)
        ? `<span style="font-size:0.625rem;font-weight:700;color:var(--yellow);background:rgba(234,179,8,.12);border:1px solid rgba(234,179,8,.3);padding:2px 7px;border-radius:4px">${UI.t('inv_dep_expired')}</span>`
        : `<span style="font-size:0.625rem;font-weight:700;color:var(--green);background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:2px 7px;border-radius:4px">${UI.t('inv_dep_status_active')}</span>`;

      return `<tr class="dep-dep-row" data-id="${dep.id}" draggable="true" style="border-bottom:1px solid var(--border)">
        <td style="padding:0.75rem 0.5rem;padding-left:1.25rem;font-weight:700;font-size:0.875rem">${dep.bankName || '—'}</td>
        <td style="padding:0.75rem 0.5rem;text-align:center">
          <span style="font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${typeColor};background:${typeColor}18;border:1px solid ${typeColor}35;padding:2px 7px;border-radius:4px">${typeLabel}</span>
        </td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:center;font-weight:600">${maskVal(dep.principal)}</td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:center;color:var(--accent);font-weight:700">%${dep.rate}</td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:center;color:var(--text-secondary);font-size:0.8125rem">
          ${dep.type === 'term' ? UI.t('inv_dep_days_left_val', Number(dep.termDays)) : '—'}
        </td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:center;font-size:0.8125rem;color:var(--text-secondary)">${dep.startDate ? UI.formatDate(dep.startDate) : '—'}</td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:center;font-size:0.8125rem;color:var(--text-secondary)">
          ${dep.type === 'term' && calc.maturityDate ? UI.formatDate(calc.maturityDate) : '—'}
        </td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:right;color:var(--green);font-weight:600">
          ${maturityInterest != null ? '+' + maskVal(maturityInterest) : '—'}
        </td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:center;font-weight:600">
          ${maskVal(calc.currentValue)}
        </td>
        <td class="mono" style="padding:0.75rem 0.5rem;text-align:center;color:var(--accent);font-weight:700">
          ${dep.type === 'term' && calc.maturityValue ? maskVal(calc.maturityValue) : '—'}
        </td>
        <td style="padding:0.75rem 0.5rem;text-align:center">${statusHTML}</td>
        <td style="padding:0.75rem 0.5rem;text-align:center">
          <div style="display:flex;gap:0.3125rem;justify-content:center">
            <button class="btn btn-icon" onclick="Investments.editDeposit('${dep.id}')" data-tooltip="${UI.t('btn_edit')}"
                    style="color:var(--text-secondary);transition:background .15s,border-color .15s,color .15s"
                    onmouseenter="this.style.background='var(--bg-elevated)';this.style.borderColor='var(--border)';this.style.color='var(--text-primary)'"
                    onmouseleave="this.style.background='';this.style.borderColor='transparent';this.style.color='var(--text-secondary)'">
              <svg data-lucide="pencil"></svg>
            </button>
            <button class="btn btn-icon btn-danger" onclick="Investments.deleteDeposit('${dep.id}')" data-tooltip="${UI.t('btn_delete')}">
              <svg data-lucide="trash-2"></svg>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');

    return `<div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:0.8125rem">
        <thead>
          <tr style="border-bottom:2px solid var(--border);background:var(--bg-elevated)">
            ${_th(UI.t('inv_dep_bank'), true)}
            ${_thC(UI.t('inv_asset_type_label'))}
            ${_thC(UI.t('inv_dep_principal'))}
            ${_thC(UI.t('inv_dep_rate'))}
            ${_thC(UI.t('inv_dep_term'))}
            ${_thC(UI.t('inv_dep_start'))}
            ${_thC(UI.t('inv_dep_maturity'))}
            ${_thR(UI.t('inv_dep_maturity_interest'))}
            ${_thC(UI.t('inv_dep_current_val'))}
            ${_thC(UI.t('inv_dep_total_return'))}
            ${_thC(UI.t('inv_dep_status'))}
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }

  function _renderDeposits() {
    const container = document.getElementById('dep-list');
    if (!container) return;
    const deposits = Store.getDeposits();
    const s = Store.getSettings();
    const cur = s.currency || '₺';
    const curSym = _currency === 'USD' ? '$' : cur;

    const toggle = _depViewToggleHTML();
    const addBtn = `<button class="acc-action-btn" onclick="Investments.openAddDeposit()">
      <svg data-lucide="plus" style="width:15px;height:15px;flex-shrink:0"></svg>
      <span>${UI.t('inv_dep_add')}</span>
    </button>`;

    if (!deposits.length) {
      container.innerHTML = `
        <div class="panel-header">
          <span class="panel-title">${UI.t('inv_tab_deposits')}</span>
          <div style="display:flex;align-items:center;gap:0.75rem">${toggle}${addBtn}</div>
        </div>
        <div style="padding:2.5rem 0;text-align:center">
          ${UI.emptyState(UI.t('inv_dep_no_deposits'), 'landmark')}
        </div>`;
      lucide.createIcons({ nodes: [container] });
      return;
    }

    let totalDepValue = 0;
    let totalDailyGain = 0;
    const rate = _getTryRate();
    deposits.forEach(dep => {
      const calc = _calcDeposit(dep);
      const depCode = dep.currency || 'TRY';
      let valInDisplay;
      if (_currency === 'USD') {
        valInDisplay = depCode === 'USD' ? calc.currentValue : calc.currentValue / rate;
      } else {
        valInDisplay = depCode === 'TRY' ? calc.currentValue : calc.currentValue * rate;
      }
      totalDepValue += valInDisplay;
      totalDailyGain += _currency === 'USD'
        ? (depCode === 'USD' ? calc.dailyGain : calc.dailyGain / rate)
        : (depCode === 'TRY' ? calc.dailyGain : calc.dailyGain * rate);
    });

    const content = _depView === 'table' ? _renderDepTable(deposits, cur) : _renderDepCards(deposits, cur);

    container.innerHTML = `
      <div class="panel-header">
        <span class="panel-title">${UI.t('inv_tab_deposits')}</span>
        <div style="display:flex;align-items:center;gap:1rem">
          <div style="display:flex;gap:1.25rem">
            <div>
              <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:1px">${UI.t('inv_dep_current_val')}</div>
              <div class="mono" style="font-size:0.875rem;font-weight:700;color:var(--text-primary)">${UI.maskCurrency(totalDepValue, curSym)}</div>
            </div>
            <div>
              <div style="font-size:0.6875rem;color:var(--text-muted);margin-bottom:1px">${UI.t('inv_dep_daily_gain')}</div>
              <div class="mono" style="font-size:0.875rem;font-weight:700;color:var(--green)">+${UI.maskCurrency(totalDailyGain, curSym)}</div>
            </div>
          </div>
          ${toggle}
          ${addBtn}
        </div>
      </div>
      ${content}`;
    lucide.createIcons({ nodes: [container] });
    _initDepDrag();
  }

  function _depFormHtml(dep) {
    const isTerm = !dep || dep.type === 'term';
    const PRESET_DAYS = ['30', '90', '180', '365'];
    const termItems = [
      { value: '30',     label: UI.t('inv_dep_term_1m') },
      { value: '90',     label: UI.t('inv_dep_term_3m') },
      { value: '180',    label: UI.t('inv_dep_term_6m') },
      { value: '365',    label: UI.t('inv_dep_term_1y') },
      { value: 'custom', label: UI.t('inv_dep_term_custom') },
    ];
    const rawTerm = dep?.termDays ? String(dep.termDays) : '30';
    const isCustomTerm = dep?.termDays && !PRESET_DAYS.includes(rawTerm);
    const selectedTerm = isCustomTerm ? 'custom' : rawTerm;
    const customDaysVal = isCustomTerm ? rawTerm : '';
    const selectedCur = dep?.currency || 'TRY';
    const selectedCurSym = Object.keys(_SYM_TO_CODE).find(k => _SYM_TO_CODE[k] === selectedCur) || selectedCur;
    const selectedCurLabel = `${selectedCurSym} ${selectedCur}`;
    const typeTermActive = isTerm;

    return `<div style="display:grid;gap:0.875rem">
      <div class="form-group">
        <label class="form-label">${UI.t('inv_asset_type_label') || 'Tür'}</label>
        <div style="display:flex;gap:0.5rem" id="depTypeToggle">
          <button type="button" id="depTypeTerm"
            onclick="Investments._depSetType('term')"
            style="flex:1;height:2.375rem;border-radius:var(--radius-sm);border:2px solid ${typeTermActive ? 'var(--accent)' : 'var(--border)'};background:${typeTermActive ? 'rgba(124,108,252,.12)' : 'var(--bg-elevated)'};cursor:pointer;font-size:0.8125rem;font-weight:600;color:${typeTermActive ? 'var(--accent)' : 'var(--text-secondary)'}">
            ${UI.t('inv_dep_type_term')}
          </button>
          <button type="button" id="depTypeFree"
            onclick="Investments._depSetType('free')"
            style="flex:1;height:2.375rem;border-radius:var(--radius-sm);border:2px solid ${!typeTermActive ? 'var(--accent)' : 'var(--border)'};background:${!typeTermActive ? 'rgba(124,108,252,.12)' : 'var(--bg-elevated)'};cursor:pointer;font-size:0.8125rem;font-weight:600;color:${!typeTermActive ? 'var(--accent)' : 'var(--text-secondary)'}">
            ${UI.t('inv_dep_type_free')}
          </button>
        </div>
        <input type="hidden" id="depTypeInput" value="${dep?.type || 'term'}">
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('inv_dep_bank')}</label>
        <input class="form-control" type="text" id="depBankInput" placeholder="${UI.t('inv_dep_bank_ph')}" value="${dep?.bankName || ''}">
      </div>
      <div style="display:grid;grid-template-columns:1fr 8.75rem;gap:0.5rem">
        <div class="form-group">
          <label class="form-label">${UI.t('inv_dep_principal')}</label>
          <input class="form-control" type="number" id="depPrincipalInput" min="0" step="any" placeholder="100000" value="${dep?.principal || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Para Birimi</label>
          <button type="button" id="depCurBtn" onclick="Investments._openDepCurDD(this)"
            style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0.625rem 0.875rem;font-size:0.875rem;font-family:var(--font-body);background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            <span class="dd-label" style="flex:1;color:var(--text-primary)">${selectedCurLabel}</span>
            <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
          </button>
          <input type="hidden" id="depCurInput" value="${selectedCur}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('inv_dep_rate')}</label>
        <input class="form-control" type="number" id="depRateInput" min="0" step="0.01" placeholder="45.00" value="${dep?.rate || ''}">
      </div>
      <div class="form-group" id="depStartGroup">
        <label class="form-label">${UI.t('inv_dep_start')}</label>
        <button type="button" id="depStartBtn" onclick="Investments._toggleDepStartDate()"
          style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.375rem;box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">
          <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-secondary);flex-shrink:0"></svg>
          <span id="depStartLabel" style="flex:1;font-size:0.8125rem;color:var(--text-primary);text-align:left">${dep?.startDate ? UI.formatDate(dep.startDate) : ''}</span>
        </button>
        <input type="hidden" id="depStartInput" value="${dep?.startDate || ''}">
      </div>
      <div class="form-group" id="depTermGroup" style="display:${isTerm ? '' : 'none'}">
        <label class="form-label">${UI.t('inv_dep_term')}</label>
        <button type="button" id="depTermBtn" onclick="Investments._openDepTermDD(this)"
          style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.375rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
          <span class="dd-label" style="flex:1;font-size:0.8125rem;color:var(--text-primary)">${termItems.find(o => o.value === selectedTerm)?.label || termItems[0].label}</span>
          <svg data-lucide="chevron-down" style="width:0.875rem;height:0.875rem;color:var(--text-muted);flex-shrink:0"></svg>
        </button>
        <input type="hidden" id="depTermInput" value="${selectedTerm}">
      </div>
      <div class="form-group" id="depCustomDaysGroup" style="display:${isTerm && isCustomTerm ? '' : 'none'}">
        <label class="form-label">${UI.t('inv_dep_term_custom_days')}</label>
        <input class="form-control" type="number" id="depCustomDaysInput" min="1" step="1"
          placeholder="${UI.t('inv_dep_term_custom_ph')}" value="${customDaysVal}">
      </div>
      <div id="depFreeInfo" style="display:${!isTerm ? '' : 'none'};padding:0.625rem 0.75rem;background:rgba(124,108,252,.08);border:1px solid rgba(124,108,252,.25);border-radius:var(--radius-sm);font-size:0.8125rem;color:var(--text-secondary);line-height:1.5">
        <svg data-lucide="info" style="width:0.875rem;height:0.875rem;color:var(--accent);display:inline;vertical-align:middle;margin-right:0.375rem"></svg>${UI.t('inv_dep_free_info')}
      </div>
      <div class="form-group">
        <label class="form-label">${UI.t('inv_dep_notes')}</label>
        <input class="form-control" type="text" id="depNotesInput" placeholder="" value="${dep?.notes || ''}">
      </div>
    </div>`;
  }

  function _openAddDeposit() {
    _depAddDateCdp = null;
    _depAddModal = new CustomModal({
      title: UI.t('inv_dep_add'),
      icon: 'landmark',
      width: 480,
      content: _depFormHtml(null),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'), variant: 'primary', onClick: () => _saveDeposit(null) },
      ],
    });
    _depAddModal.open();
    _depAddDateCdp = new CustomDatePicker({
      btn: 'depStartBtn', input: 'depStartInput', align: 'left',
      onSelect: d => { document.getElementById('depStartLabel').textContent = UI.formatDate(d); },
    });
    lucide.createIcons({ nodes: [document.querySelector('.modal')] });
  }

  function _openEditDeposit(id) {
    const dep = Store.getDeposits().find(x => x.id === id);
    if (!dep) return;
    _depEditDateCdp = null;
    _depEditModal = new CustomModal({
      title: UI.t('inv_dep_edit'),
      icon: 'landmark',
      width: 480,
      content: _depFormHtml(dep),
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_save'), variant: 'primary', onClick: () => _saveDeposit(id) },
      ],
    });
    _depEditModal.open();
    _depEditDateCdp = new CustomDatePicker({
      btn: 'depStartBtn', input: 'depStartInput', align: 'left',
      onSelect: d => { document.getElementById('depStartLabel').textContent = UI.formatDate(d); },
    });
    lucide.createIcons({ nodes: [document.querySelector('.modal')] });
  }

  function _saveDeposit(id) {
    const bankName    = document.getElementById('depBankInput')?.value?.trim();
    const type        = document.getElementById('depTypeInput')?.value || 'term';
    const principal   = parseFloat(document.getElementById('depPrincipalInput')?.value);
    const rate        = parseFloat(document.getElementById('depRateInput')?.value);
    const currency    = document.getElementById('depCurInput')?.value || 'TRY';
    const startDate   = document.getElementById('depStartInput')?.value;
    const termRaw     = document.getElementById('depTermInput')?.value || '30';
    const termDays    = termRaw === 'custom'
      ? parseInt(document.getElementById('depCustomDaysInput')?.value || '0', 10)
      : parseInt(termRaw, 10);
    const notes       = document.getElementById('depNotesInput')?.value?.trim() || '';

    if (!bankName) { UI.toast(UI.t('inv_dep_bank'), 'error'); return; }
    if (!principal || principal <= 0) { UI.toast(UI.t('inv_dep_principal'), 'error'); return; }
    if (!rate || rate <= 0) { UI.toast(UI.t('inv_dep_rate'), 'error'); return; }
    if (!startDate) { UI.toast(UI.t('inv_dep_start'), 'error'); return; }
    if (type === 'term' && (!termDays || termDays < 1)) { UI.toast(UI.t('inv_dep_term_custom_days'), 'error'); return; }

    const data = { bankName, type, principal, rate, currency, startDate, notes };
    if (type === 'term') data.termDays = termDays;

    if (id) {
      Store.updateDeposit(id, data);
      _depEditModal?.close();
    } else {
      Store.addDeposit(data);
      _depAddModal?.close();
    }
    UI.toast(UI.t('inv_dep_saved'), 'success');
    const p = _buildPortfolio();
    _renderKPIs(p);
    _renderChart(p);
    _renderDeposits();
    _renderDepHistTable();
    if (_tradeHistModal?._overlay?.isConnected) _renderHistModal();
  }

  function _deleteDeposit(id) {
    if (_depSkipConfirmDate === UI.today()) {
      Store.deleteDeposit(id);
      UI.toast(UI.t('inv_dep_deleted'), 'info');
      const p = _buildPortfolio();
      _renderKPIs(p);
      _renderChart(p);
      _renderDeposits();
      _renderDepHistTable();
      if (_tradeHistModal?._overlay?.isConnected) _renderHistModal();
      return;
    }
    const modal = new CustomModal({
      title:   UI.t('btn_delete'),
      icon:    'triangle-alert',
      variant: 'danger',
      width:   400,
      zIndex:  9000,
      content: `
        <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1rem">${UI.t('inv_dep_confirm_delete')}</p>
        <div style="display:flex;align-items:center;gap:0.5rem;cursor:pointer"
             onclick="CheckboxCore.toggle(this.querySelector('.cbx'))">
          ${CheckboxCore.html({ done: false, type: 'sm', color: 'var(--red)', extraClass: 'cbx-bordered' })}
          <span style="font-size:0.8125rem;color:var(--text-secondary)">${UI.t('inv_dep_skip_confirm')}</span>
        </div>`,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: UI.t('btn_delete'), variant: 'danger',    onClick: m => {
            if (CheckboxCore.isChecked(m.getBody().querySelector('.cbx'))) {
              _depSkipConfirmDate = UI.today();
            }
            m.close();
            Store.deleteDeposit(id);
            UI.toast(UI.t('inv_dep_deleted'), 'info');
            const p = _buildPortfolio();
            _renderKPIs(p);
            _renderChart(p);
            _renderDeposits();
            _renderDepHistTable();
            if (_tradeHistModal?._overlay?.isConnected) _renderHistModal();
          }
        },
      ],
    });
    modal.open();
  }

  function _depSetType(type) {
    document.getElementById('depTypeInput').value = type;
    const isTerm = type === 'term';
    ['depTypeTerm', 'depTypeFree'].forEach(id => {
      const isActive = (id === 'depTypeTerm') === isTerm;
      const btn = document.getElementById(id);
      btn.style.border = `2px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`;
      btn.style.background = isActive ? 'rgba(124,108,252,.12)' : 'var(--bg-elevated)';
      btn.style.color = isActive ? 'var(--accent)' : 'var(--text-secondary)';
    });
    document.getElementById('depTermGroup').style.display = isTerm ? '' : 'none';
    const curTermVal = document.getElementById('depTermInput')?.value;
    document.getElementById('depCustomDaysGroup').style.display = isTerm && curTermVal === 'custom' ? '' : 'none';
    document.getElementById('depFreeInfo').style.display = isTerm ? 'none' : '';
  }

  function _toggleDepStartDate() {
    (_depAddDateCdp || _depEditDateCdp)?.toggle();
  }

  function _openDepTermDD(btn) {
    const termItems = [
      { value: '30',     label: UI.t('inv_dep_term_1m') },
      { value: '90',     label: UI.t('inv_dep_term_3m') },
      { value: '180',    label: UI.t('inv_dep_term_6m') },
      { value: '365',    label: UI.t('inv_dep_term_1y') },
      { value: 'custom', label: UI.t('inv_dep_term_custom') },
    ];
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: termItems,
        onOpen: dd => {
          const cur = document.getElementById('depTermInput')?.value || '30';
          dd.setItems(termItems.map(i => ({...i, active: i.value === cur})));
        },
        onSelect: val => {
          document.getElementById('depTermInput').value = val;
          btn.querySelector('.dd-label').textContent = termItems.find(i => i.value === val)?.label || val;
          const customGroup = document.getElementById('depCustomDaysGroup');
          if (customGroup) {
            customGroup.style.display = val === 'custom' ? '' : 'none';
            if (val === 'custom') document.getElementById('depCustomDaysInput')?.focus();
          }
        },
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  }

  function _openDepCurDD(btn) {
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn, items: [],
        onOpen: dd => {
          const cur = document.getElementById('depCurInput')?.value || 'TRY';
          dd.setItems(_INV_CURRENCY_ITEMS.map(i => {
            const sym = Object.keys(_SYM_TO_CODE).find(k => _SYM_TO_CODE[k] === i.value) || i.value;
            return { value: i.value, label: `${sym} ${i.value}`, active: i.value === cur };
          }));
        },
        onSelect: val => {
          const sym = Object.keys(_SYM_TO_CODE).find(k => _SYM_TO_CODE[k] === val) || val;
          document.getElementById('depCurInput').value = val;
          btn.querySelector('.dd-label').textContent = `${sym} ${val}`;
        },
        align: 'right',
      });
    }
    btn._ddInst.toggle();
  }

  // Topbar item registry — single source of truth for all topbar element visibility.
  // views: which tab(s) show this item. display: value to set when visible ('' or 'flex').
  // extraHide(): optional extra condition that hides regardless of view.
  const _topbarDef = [
    { id: 'exchangeRateSection',       views: ['portfolio'],             display: 'flex', extraHide: () => _getCurrencyCode() === 'USD' },
    { id: 'currencyToggleSection',     views: ['portfolio', 'trades'],  display: 'flex', extraHide: () => _getCurrencyCode() === 'USD' },
    { id: 'apiKeyBtn',                 views: ['portfolio'],            display: ''                                                    },
    { id: 'privacy-toggle-btn',        views: ['portfolio', 'trades'], display: ''                                                    },
    { id: 'inv-tb-import',             views: ['portfolio', 'trades'],  display: 'flex'                                                },
    { id: 'tradeHistBtn',              views: ['trades'],               display: 'flex'                                                },
    { id: 'tradeActionBtn',            views: ['portfolio', 'trades'],  display: ''                                                    },
  ];

  function _applyViewTopbar(v) {
    _topbarDef.forEach(({ id, views, display = '', extraHide }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = views.includes(v) && !(extraHide && extraHide()) ? display : 'none';
    });
  }

  function setView(v) {
    _currentView = v;
    document.getElementById('view-portfolio').style.display = v === 'portfolio' ? '' : 'none';
    document.getElementById('view-trades').style.display   = v === 'trades'    ? '' : 'none';
    document.getElementById('tab-portfolio').classList.toggle('active', v === 'portfolio');
    document.getElementById('tab-trades').classList.toggle('active', v === 'trades');
    _applyViewTopbar(v);
    if (v === 'trades') {
      if (!_tradeCycleMonth) _tradeCycleMonth = UI.today().slice(0, 7);
      _updateTradeCycle();
      _applyTradeSubView();
      lucide.createIcons({ nodes: [document.getElementById('view-trades')] });
    }
  }

  function _applyTradeSubView() {
    const isInv = _tradesSubView === 'inv';
    document.getElementById('trades-inv-panel').style.display = isInv ? '' : 'none';
    document.getElementById('trades-dep-panel').style.display = isInv ? 'none' : '';
    const btnInv = document.getElementById('tradeSubViewInv');
    const btnDep = document.getElementById('tradeSubViewDep');
    if (btnInv) { btnInv.className = isInv ? 'btn btn-primary' : 'btn btn-secondary'; }
    if (btnDep) { btnDep.className = isInv ? 'btn btn-secondary' : 'btn btn-primary'; }
    _applyViewTopbar('trades');
    if (isInv) {
      _renderTradeHistory();
    } else {
      _renderDepositHistory();
    }
  }

  function setTradeSubView(v) {
    _tradesSubView = v;
    Store.set('inv_trades_subview', v);
    _applyTradeSubView();
  }

  function _onDepHistSearch() {
    _depHistSearch = (document.getElementById('depHistSearch')?.value || '').toLowerCase().trim();
    _renderDepHistTable();
  }

  function _renderDepHistTable() {
    const tbody = document.getElementById('depHistBody');
    if (!tbody) return;
    const s   = Store.getSettings();
    const cur = s.currency || '₺';

    // Panelde sadece en güncel 10 kayıt gösterilir; eskiler geçmiş modalinden erişilebilir
    const allByDate = Store.getDeposits()
      .sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));
    const totalCount = allByDate.length;
    let deposits = allByDate.slice(0, 10);
    if (_depHistSearch) {
      deposits = deposits.filter(d =>
        (d.bankName || '').toLowerCase().includes(_depHistSearch) ||
        (d.notes    || '').toLowerCase().includes(_depHistSearch)
      );
    }
    if (_depHistFrom) deposits = deposits.filter(d => (d.startDate || '') >= _depHistFrom);
    if (_depHistTo)   deposits = deposits.filter(d => (d.startDate || '') <= _depHistTo);

    if (!deposits.length) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:2rem;color:var(--text-muted)">${UI.t('inv_dep_no_deposits')}</td></tr>`;
      return;
    }

    tbody.innerHTML = deposits.map(dep => {
      const calc      = _calcDeposit(dep);
      const depSym    = dep.currency === 'USD' ? '$' : dep.currency === 'EUR' ? '€' : cur;
      const mVal      = v => UI.maskCurrency(v, depSym);
      const typeColor = dep.type === 'term' ? 'var(--blue)' : 'var(--green)';
      const typeLabel = dep.type === 'term' ? UI.t('inv_dep_type_term') : UI.t('inv_dep_type_free');
      const matInt    = dep.type === 'term' && calc.maturityValue
        ? calc.maturityValue - (Number(dep.principal) || 0) : null;

      const statusHtml = (dep.type === 'term' && calc.expired)
        ? `<span style="font-size:0.6875rem;font-weight:700;color:var(--yellow);background:rgba(234,179,8,.12);border:1px solid rgba(234,179,8,.3);padding:2px 7px;border-radius:4px">${UI.t('inv_dep_expired')}</span>`
        : `<span style="font-size:0.6875rem;font-weight:700;color:var(--green);background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:2px 7px;border-radius:4px">${UI.t('inv_dep_status_active')}</span>`;

      return `<tr>
        <td style="overflow:hidden">
          <div style="display:flex;align-items:baseline;gap:0.5rem;overflow:hidden">
            <span style="font-weight:600;font-size:0.875rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${dep.bankName || '—'}</span>
            ${dep.notes ? `<span style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${dep.notes}</span>` : ''}
          </div>
        </td>
        <td style="text-align:center;vertical-align:middle">
          <span style="font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${typeColor};background:${typeColor}18;border:1px solid ${typeColor}35;padding:2px 7px;border-radius:4px">${typeLabel}</span>
        </td>
        <td class="mono" style="text-align:center">${mVal(dep.principal)}</td>
        <td class="mono" style="text-align:center;color:var(--accent);font-weight:600">%${dep.rate}</td>
        <td class="mono" style="text-align:center;color:var(--text-secondary)">
          ${dep.type === 'term' ? UI.t('inv_dep_days_left_val', Number(dep.termDays)) : '—'}
        </td>
        <td class="mono" style="text-align:center;color:var(--text-secondary);font-size:0.8125rem;white-space:nowrap">${dep.startDate ? UI.formatDate(dep.startDate) : '—'}</td>
        <td class="mono" style="text-align:center;color:var(--text-secondary);font-size:0.8125rem;white-space:nowrap">
          ${dep.type === 'term' && calc.maturityDate ? UI.formatDate(calc.maturityDate) : '—'}
        </td>
        <td class="mono" style="text-align:center;color:var(--green);font-weight:600">
          ${matInt != null ? `+${mVal(matInt)}` : '—'}
        </td>
        <td class="mono" style="text-align:center;color:var(--accent);font-weight:700">
          ${dep.type === 'term' && calc.maturityValue ? mVal(calc.maturityValue) : mVal(calc.currentValue)}
        </td>
        <td style="text-align:center">${statusHtml}</td>
        <td style="white-space:nowrap;vertical-align:middle">
          <div style="display:inline-flex;gap:0.375rem;align-items:center;justify-content:center">
            <button class="trade-act-btn trade-act-edit" onclick="Investments.editDeposit('${dep.id}')" data-tooltip="${UI.t('btn_edit')}">
              <svg data-lucide="pencil" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
            </button>
            <button class="trade-act-btn trade-act-del" onclick="Investments.deleteDeposit('${dep.id}')" data-tooltip="${UI.t('btn_delete')}">
              <svg data-lucide="trash-2" style="width:0.8125rem;height:0.8125rem;pointer-events:none"></svg>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');

    if (totalCount > 10 && !_depHistSearch && !_depHistFrom && !_depHistTo) {
      const hiddenCount = totalCount - 10;
      tbody.innerHTML += `<tr><td colspan="11" style="text-align:center;padding:0.625rem 1rem;font-size:0.75rem;color:var(--text-muted);border-top:1px dashed var(--border)">
        <svg data-lucide="history" style="width:0.75rem;height:0.75rem;vertical-align:middle;margin-right:4px;opacity:.6"></svg>
        +${hiddenCount} eski kayıt — tümünü görmek için <strong style="color:var(--accent);cursor:pointer" onclick="Investments.openTradeHistModal()">${UI.t('inv_history_btn')}</strong> butonuna tıkla
      </td></tr>`;
    }
    lucide.createIcons({ nodes: [tbody] });
  }

  function _renderDepositHistory() {
    const panel = document.getElementById('trades-dep-panel');
    if (!panel) return;

    const filterDateLabel = _depHistFrom
      ? (_depHistTo ? `${UI.formatDate(_depHistFrom)} – ${UI.formatDate(_depHistTo)}` : UI.formatDate(_depHistFrom))
      : UI.t('inv_trade_filter_all');

    panel.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title" style="font-size:1.0625rem">${UI.t('inv_tab_hist')}</span>
          <div style="display:flex;gap:0.5rem;align-items:center">
            <div style="display:flex;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:2px;gap:2px;height:1.875rem;box-sizing:border-box">
              <button class="btn btn-secondary" onclick="Investments.setTradeSubView('inv')"
                      style="border-radius:5px;border:none;padding:0 10px;font-size:0.75rem;font-weight:600;height:100%;white-space:nowrap">${UI.t('inv_sub_stocks')}</button>
              <button class="btn btn-primary" onclick="Investments.setTradeSubView('dep')"
                      style="border-radius:5px;border:none;padding:0 10px;font-size:0.75rem;font-weight:600;height:100%;white-space:nowrap">${UI.t('inv_tab_deposits')}</button>
            </div>
            <div class="search-wrap" style="min-width:12.5rem">
              <svg data-lucide="search"></svg>
              <input class="form-control" id="depHistSearch" oninput="Investments.onDepHistSearch()"
                value="${_depHistSearch}"
                style="height:2.125rem;padding-top:0;padding-bottom:0;box-sizing:border-box"
                placeholder="${UI.t('inv_dep_search_ph')}">
            </div>
            <div style="position:relative;display:inline-flex;height:2.125rem;flex-shrink:0">
              <button type="button" id="depHistFilterBtn" onclick="Investments.toggleDepHistFilter()"
                style="display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.125rem;
                       box-sizing:border-box;background:var(--bg-elevated);border:1px solid var(--border);
                       border-radius:var(--radius-sm);cursor:pointer;white-space:nowrap">
                <svg data-lucide="calendar" style="width:0.9375rem;height:0.9375rem;color:var(--text-muted);flex-shrink:0"></svg>
                <span id="depHistFilterLabel" style="font-size:0.8125rem;color:var(--text-secondary)">${filterDateLabel}</span>
              </button>
            </div>
          </div>
        </div>
        <input type="hidden" id="depHistFilterFrom" value="${_depHistFrom}">
        <input type="hidden" id="depHistFilterTo"   value="${_depHistTo}">
        <div class="table-container">
          <table class="data-table" style="table-layout:fixed">
            <thead><tr>
              <th style="text-align:left;width:11%" data-i18n="inv_dep_bank">Banka</th>
              <th style="text-align:center;width:9%" data-i18n="inv_asset_type_label">Tür</th>
              <th style="text-align:center;width:10%" data-i18n="inv_dep_principal">Anapara</th>
              <th style="text-align:center;width:7%" data-i18n="inv_dep_rate">Faiz %</th>
              <th style="text-align:center;width:7%" data-i18n="inv_dep_term">Vade</th>
              <th style="text-align:center;width:10%" data-i18n="inv_dep_start">Başlangıç</th>
              <th style="text-align:center;width:10%" data-i18n="inv_dep_maturity">Vade Tarihi</th>
              <th style="text-align:center;width:12%" data-i18n="inv_dep_maturity_interest">Vade Faizi</th>
              <th style="text-align:center;width:12%" data-i18n="inv_dep_total_return">Vade Sonu</th>
              <th style="text-align:center;width:8%" data-i18n="inv_dep_status">Durum</th>
              <th style="width:5%"></th>
            </tr></thead>
            <tbody id="depHistBody"></tbody>
          </table>
        </div>
      </div>`;

    lucide.createIcons({ nodes: [panel] });

    _depHistFilterCdp = new CustomDatePicker({
      btn: 'depHistFilterBtn', input: 'depHistFilterFrom', inputTo: 'depHistFilterTo',
      align: 'right', clearable: true, range: true,
      onSelect: (from, to) => {
        _depHistFrom = from || '';
        _depHistTo   = to   || '';
        const lbl = document.getElementById('depHistFilterLabel');
        if (lbl) lbl.textContent = _depHistFrom
          ? (_depHistTo ? `${UI.formatDate(_depHistFrom)} – ${UI.formatDate(_depHistTo)}` : UI.formatDate(_depHistFrom))
          : UI.t('inv_trade_filter_all');
        _renderDepHistTable();
      },
      onClear: () => {
        _depHistFrom = '';
        _depHistTo   = '';
        const lbl = document.getElementById('depHistFilterLabel');
        if (lbl) lbl.textContent = UI.t('inv_trade_filter_all');
        _renderDepHistTable();
      },
    });

    _renderDepHistTable();
  }

  return { init, setView, setTradeSubView, tradeCycleNav, openTradeHistModal: _openTradeHistModal, tradeHistNavTo: _tradeHistNavTo, switchHistTab: _switchHistTab, depHistNavTo: _depHistNavTo, setDisplayCurrency, getUserCurrencyCode, setExchangeRate, editManualPrice, saveManualPrice: _saveManualPrice, openAddAsset: _openAddAsset, editAsset, deleteAsset, sellAsset: _openSellAsset, buyAsset: _openBuyAsset, toggleSellDate: () => _sellDateCdp?.toggle(), toggleBuyDate: () => _buyDateCdp?.toggle(), openSellPicker, openBuyPicker, openTradeDropdown, _tradeActionPick, toggleTradeFilter: () => _tradeFilterCdp?.toggle(), onTradeSearch: _renderTradeHistory, refreshPrices: _manualRefresh, togglePnlPeriodMenu: _togglePnlPeriodMenu, setPnlPeriod: _setPnlPeriodFn, fetchAllRates: _fetchAllRatesPublic, openInvDropdown, toggleInvDatePicker: _toggleInvDatePicker, triggerImport: _triggerInvImport, importData: _importInvData, editTrade: _editTrade, deleteTrade: _deleteTrade, setEditTradeType: _setEditTradeType, toggleEditTradeDate: () => _editTradeDateCdp?.toggle(), openAddDeposit: _openAddDeposit, editDeposit: _openEditDeposit, deleteDeposit: _deleteDeposit, setDepView: _setDepView, onDepHistSearch: _onDepHistSearch, toggleDepHistFilter: () => _depHistFilterCdp?.toggle(), _depSetType, _toggleDepStartDate, _openDepTermDD, _openDepCurDD };
})();
