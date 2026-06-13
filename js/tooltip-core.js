/**
 * TooltipCore — Merkezi Tooltip Sistemi
 *
 * Kullanım:
 *   // Otomatik (data-tooltip attribute):
 *   <button data-tooltip="Metni buraya">
 *   <button data-tooltip="i18n_key" data-tooltip-i18n>
 *   <button data-tooltip="Metin" data-tooltip-pos="bottom">   // pos: top|bottom|left|right
 *
 *   // Programatik:
 *   TooltipCore.show(element, 'İçerik', { pos: 'top', delay: 400 });
 *   TooltipCore.hide();
 *
 *   // Chart.js harici tooltip fabrikası:
 *   Charts.doughnut(id, labels, data, { externalTooltip: TooltipCore.chartExternal() });
 *   Charts.doughnut(id, labels, data, { externalTooltip: TooltipCore.chartExternal({ id: 'my-tt' }) });
 */

const TooltipCore = (() => {
  'use strict';

  const DELAY_DEFAULT = 420;
  const GAP           = 7;
  const MARGIN        = 8;

  let _el          = null;
  let _showTimer   = null;
  let _hideTimer   = null;
  let _curAnchor   = null;

  // ── Singleton element ────────────────────────────────────────────────────

  function _getEl() {
    if (!_el) {
      _el = document.createElement('div');
      _el.className = 'tlt';
      _el.style.cssText = 'display:none;position:fixed;z-index:1600';
      document.body.appendChild(_el);
    }
    return _el;
  }

  // ── Konumlandırma ────────────────────────────────────────────────────────

  function _position(anchor, preferredPos) {
    const tt = _getEl();
    const ar = anchor.getBoundingClientRect();
    const tr = tt.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let pos  = preferredPos || 'top';

    // Otomatik yön belirleme: üstte yer yoksa aşağı
    if (pos === 'top' && ar.top - tr.height - GAP < MARGIN) pos = 'bottom';
    if (pos === 'bottom' && ar.bottom + tr.height + GAP > vh - MARGIN) pos = 'top';
    if (pos === 'left'  && ar.left - tr.width - GAP < MARGIN) pos = 'right';
    if (pos === 'right' && ar.right + tr.width + GAP > vw - MARGIN) pos = 'left';

    tt.dataset.pos = pos;

    let top, left;

    if (pos === 'top') {
      top  = ar.top - tr.height - GAP;
      left = ar.left + ar.width / 2 - tr.width / 2;
    } else if (pos === 'bottom') {
      top  = ar.bottom + GAP;
      left = ar.left + ar.width / 2 - tr.width / 2;
    } else if (pos === 'left') {
      top  = ar.top + ar.height / 2 - tr.height / 2;
      left = ar.left - tr.width - GAP;
    } else {
      top  = ar.top + ar.height / 2 - tr.height / 2;
      left = ar.right + GAP;
    }

    // Viewport sınırlarına kilitle
    left = Math.max(MARGIN, Math.min(left, vw - tr.width  - MARGIN));
    top  = Math.max(MARGIN, Math.min(top,  vh - tr.height - MARGIN));

    tt.style.left = left + 'px';
    tt.style.top  = top  + 'px';
  }

  // ── Genel API ────────────────────────────────────────────────────────────

  /**
   * @param {Element} anchor   - tooltip'in yakınında gösterileceği element
   * @param {string}  content  - metin içeriği
   * @param {object}  [opts]
   * @param {string}  [opts.pos]   - 'top'|'bottom'|'left'|'right' (varsayılan: 'top')
   * @param {number}  [opts.delay] - gösterim gecikmesi ms (varsayılan: 420)
   * @param {boolean} [opts.html]  - içerik HTML olarak yorumlanır
   */
  function show(anchor, content, opts = {}) {
    clearTimeout(_showTimer);
    clearTimeout(_hideTimer);
    if (!content) return;

    const delay = opts.delay !== undefined ? opts.delay : DELAY_DEFAULT;

    _showTimer = setTimeout(() => {
      const tt = _getEl();
      tt.classList.remove('tlt-visible');

      if (opts.html) {
        tt.innerHTML = content;
      } else {
        tt.textContent = content;
      }

      tt.dataset.pos  = opts.pos || 'top';
      tt.style.display = '';
      tt.style.opacity = '0';

      // Pozisyonu boyut hesabı tamamlandıktan sonra uygula
      requestAnimationFrame(() => {
        _position(anchor, opts.pos || 'top');
        tt.classList.add('tlt-visible');
        _curAnchor = anchor;
      });
    }, delay);
  }

  /**
   * @param {boolean} [immediate=false] - animasyon beklemeden gizle
   */
  function hide(immediate) {
    clearTimeout(_showTimer);
    if (!_el) return;
    if (immediate) {
      _el.classList.remove('tlt-visible');
      _el.style.display = 'none';
      _curAnchor = null;
      return;
    }
    clearTimeout(_hideTimer);
    _hideTimer = setTimeout(() => {
      if (_el) {
        _el.classList.remove('tlt-visible');
        _el.style.display = 'none';
        _curAnchor = null;
      }
    }, 90);
  }

  // ── data-tooltip otomatik event delegation ───────────────────────────────

  function _resolveContent(el) {
    const raw = el.dataset.tooltip;
    if (!raw) return '';
    if (el.hasAttribute('data-tooltip-i18n') && typeof UI !== 'undefined') {
      return UI.t(raw) || raw;
    }
    return raw;
  }

  function _onOver(e) {
    const el = e.target.closest('[data-tooltip]');
    if (!el) return;

    // Sidebar nav linkleri: sidebar açıkken label zaten görünür, tooltip gereksiz
    if (el.dataset.tooltipPos === 'right' && el.closest('.sidebar:not(.collapsed)')) return;

    const content = _resolveContent(el);
    if (!content) return;
    show(el, content, { pos: el.dataset.tooltipPos || 'top' });
  }

  function _onOut(e) {
    const el = e.target.closest('[data-tooltip]');
    if (!el) return;
    if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-tooltip]') === el) return;
    hide();
  }

  function _onFocusIn(e) {
    const el = e.target.closest('[data-tooltip]');
    if (!el) return;
    const content = _resolveContent(el);
    if (!content) return;
    show(el, content, { pos: el.dataset.tooltipPos || 'top', delay: 0 });
  }

  function _onFocusOut(e) {
    const el = e.target.closest('[data-tooltip]');
    if (!el) return;
    hide();
  }

  /**
   * Event delegation'ı başlatır.
   * DOMContentLoaded'de otomatik çağrılır; elle çağırmaya gerek yoktur.
   */
  function init() {
    document.addEventListener('mouseover',  _onOver,    true);
    document.addEventListener('mouseout',   _onOut,     true);
    document.addEventListener('focusin',    _onFocusIn, true);
    document.addEventListener('focusout',   _onFocusOut, true);
    window.addEventListener('scroll', () => hide(true), { passive: true, capture: true });
    window.addEventListener('resize', () => hide(true), { passive: true });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(true); }, true);
  }

  // ── Chart.js Harici Tooltip Fabrikası ────────────────────────────────────

  /**
   * Chart.js externalTooltip fonksiyonu üretir.
   * Kullanım: Charts.doughnut(id, labels, data, { externalTooltip: TooltipCore.chartExternal() })
   *
   * @param {object} [opts]
   * @param {string} [opts.id]         - tooltip element ID'si (benzersiz olmalı)
   * @param {string} [opts.titleField] - tooltip başlık alanı ('title' varsayılan)
   */
  function chartExternal(opts = {}) {
    const elId = opts.id || ('tlt-chart-' + Math.random().toString(36).slice(2, 7));

    return function(context) {
      const { chart, tooltip } = context;

      let el = document.getElementById(elId);
      if (!el) {
        el = document.createElement('div');
        el.id        = elId;
        el.className = 'tlt-chart';
        document.body.appendChild(el);
      }

      if (tooltip.opacity === 0) {
        el.classList.remove('tlt-chart-visible');
        el.style.opacity = '0';
        setTimeout(() => { if (el.style.opacity === '0') el.style.display = 'none'; }, 100);
        return;
      }

      el.style.display = 'block';

      // İçerik oluştur
      let html = '';

      if (tooltip.title && tooltip.title.length) {
        html += `<div class="tlt-chart-title">${tooltip.title.join('<br>')}</div>`;
      }

      const lines  = (tooltip.body  || []).flatMap(b => b.lines);
      const colors = tooltip.labelColors || [];

      lines.forEach((line, i) => {
        const bg = colors[i]?.backgroundColor;
        const color = (Array.isArray(bg) ? bg[0] : bg) || 'var(--text-secondary)';
        html += `<div class="tlt-chart-row">
          <span class="tlt-chart-dot" style="background:${color}"></span>
          <span class="tlt-chart-label">${line}</span>
        </div>`;
      });

      el.innerHTML = html;

      // Konumlandır — canvas'a göre fixed
      const rect = chart.canvas.getBoundingClientRect();
      const vw   = window.innerWidth;
      const vh   = window.innerHeight;

      requestAnimationFrame(() => {
        const er   = el.getBoundingClientRect();
        const rawL = rect.left + tooltip.caretX + 12;
        const rawT = rect.top  + tooltip.caretY - er.height / 2;
        const left = Math.min(rawL, vw - er.width  - MARGIN);
        const top  = Math.max(MARGIN, Math.min(rawT, vh - er.height - MARGIN));
        el.style.left = left + 'px';
        el.style.top  = top  + 'px';
        el.classList.add('tlt-chart-visible');
        el.style.opacity = '1';
      });
    };
  }

  // ── Otomatik başlat ──────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init, show, hide, chartExternal };
})();
