// CSS değişkenlerini aktif temadan oku
function _cv(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function _palette() {
  return [
    _cv('--chart-1'), _cv('--chart-2'), _cv('--chart-3'),
    _cv('--chart-4'), _cv('--chart-5'), _cv('--chart-6'), _cv('--chart-1'),
  ];
}

Chart.defaults.font.family    = "'DM Sans', sans-serif";
Chart.defaults.font.size      = 12;
Chart.defaults.plugins.legend.display = false;

function _chartFontSize(base = 12) {
  const scale = (typeof Store !== 'undefined') ? (Store.getSettings().uiScale || 1) : 1;
  return Math.round(base * scale);
}

// Plugin: gradient fill hesabını her çizimde yeniden yapar (resize güvenli)
const _areaGradPlugin = {
  id: 'areaGrad',
  beforeDraw(chart) {
    chart.data.datasets.forEach(ds => {
      if (!ds._gc) return;
      const { ctx, chartArea: { top, bottom } } = chart;
      const g = ctx.createLinearGradient(0, top, 0, bottom);
      g.addColorStop(0,   ds._gc + '99');
      g.addColorStop(0.5, ds._gc + '33');
      g.addColorStop(1,   ds._gc + '00');
      ds.backgroundColor = g;
    });
  }
};

const Charts = {
  _destroy(id) {
    const old = document.getElementById(id);
    if (!old) return;
    const c = Chart.getChart(old);
    if (c) c.destroy();
    // Canvas'ı temiz bir klonla değiştir — Chart.js bazen instance'ı kayıt defterinden kaybeder
    const fresh = document.createElement('canvas');
    fresh.id = old.id;
    fresh.className = old.className;
    fresh.style.cssText = old.style.cssText;
    old.parentNode.replaceChild(fresh, old);
  },

  _applyDefaults() {
    Chart.defaults.font.size   = _chartFontSize(12);
    Chart.defaults.color       = _cv('--text-secondary');
    Chart.defaults.borderColor = _cv('--border');
    Object.assign(Chart.defaults.plugins.tooltip, {
      backgroundColor: _cv('--bg-elevated'),
      borderColor:     _cv('--border'),
      borderWidth:     1,
      padding:         Math.round(10 * (Store.getSettings().uiScale || 1)),
      titleColor:      _cv('--text-primary'),
      bodyColor:       _cv('--text-secondary'),
      cornerRadius:    8,
      displayColors:   true,
      boxPadding:      4,
      titleFont:       { size: _chartFontSize(12) },
      bodyFont:        { size: _chartFontSize(12) },
    });
  },

  bar(id, labels, datasets, opts = {}) {
    this._destroy(id);
    this._applyDefaults();
    const PAL = _palette();
    const ctx = document.getElementById(id); if (!ctx) return null;
    const textSec = _cv('--text-secondary');
    const border  = _cv('--border');
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((d, i) => ({
          backgroundColor: d.color || PAL[i % PAL.length],
          borderRadius: 6,
          borderSkipped: false,
          ...d
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid:{display:false}, border:{display:false}, ticks:{color:textSec} },
          y: { grid:{color:border}, border:{display:false}, ticks:{color:textSec, callback: opts.yFmt} }
        },
        plugins: {
          legend: { display: datasets.length > 1, labels:{ color:textSec, boxWidth:12 } },
          tooltip: { callbacks: { label: opts.tip } }
        },
        ...(opts.extra||{})
      }
    });
  },

  // filled area line chart — gradient dolgusu tema rengine uyar
  line(id, labels, datasets, opts = {}) {
    this._destroy(id);
    this._applyDefaults();
    const PAL     = _palette();
    const ctx     = document.getElementById(id); if (!ctx) return null;
    const textSec = _cv('--text-secondary');
    const border  = _cv('--border');
    const bgBase  = _cv('--bg-base');
    return new Chart(ctx, {
      type: 'line',
      plugins: [_areaGradPlugin],
      data: {
        labels,
        datasets: datasets.map((d, i) => {
          const col = d.color || PAL[i % PAL.length];
          const ptCol = Array.isArray(d.pointColors) ? d.pointColors : col;
          return {
            label:               d.label,
            data:                d.data,
            borderColor:         col,
            backgroundColor:     opts.solidFill ? col + '55' : 'transparent',
            _gc:                 opts.solidFill ? null : col,
            tension:             opts.tension ?? 0.35,
            cubicInterpolationMode: opts.monotone ? 'monotone' : 'default',
            pointRadius:         Array.isArray(d.pointRadius) ? d.pointRadius : 3,
            pointBackgroundColor: ptCol,
            pointBorderColor:    'transparent',
            pointHoverRadius:    6,
            pointHoverBackgroundColor: col,
            pointHoverBorderColor: bgBase,
            pointHoverBorderWidth: 2,
            borderWidth:         2,
            fill:                'origin',
          };
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode:'index', intersect:false },
        scales: {
          x: { grid:{display:false}, border:{display:false}, ticks:{color:textSec, maxRotation:0} },
          y: {
            grid: { color:border },
            border: { display:false },
            ticks: { color:textSec, callback: opts.yFmt },
            beginAtZero: true,
            ...(opts.yMinWidth ? { afterFit(s) { if (s.width < opts.yMinWidth) s.width = opts.yMinWidth; } } : {})
          }
        },
        plugins: {
          legend:  { display: datasets.length > 1, labels:{ color:textSec, boxWidth:12 } },
          tooltip: { callbacks: { label: opts.tip } }
        },
        ...(opts.extra||{})
      }
    });
  },

  doughnut(id, labels, data, opts = {}) {
    this._destroy(id);
    this._applyDefaults();
    const PAL    = _palette();
    const ctx    = document.getElementById(id); if (!ctx) return null;
    const bgBase = _cv('--bg-base');
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: opts.colors || PAL, borderColor:bgBase, borderWidth:3, hoverBorderWidth:0 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: opts.externalTooltip
            ? { enabled: false, external: opts.externalTooltip, callbacks: { label: opts.tip || (c => ` ${c.label}: %${c.parsed}`) } }
            : { callbacks: { label: opts.tip || (c => ` ${c.label}: %${c.parsed}`) } }
        },
        ...(opts.extra||{})
      }
    });
  }
};
