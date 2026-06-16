/**
 * CustomDatePicker — Merkezi takvim bileşeni
 *
 * Gereksinimler: ui.js (UI.today, UI.getLang, UI.t) + cdp-style.css
 *
 * ── Tek tarih modu ───────────────────────────────────────────────────────
 *   const picker = new CustomDatePicker({
 *     btn:        'myBtnId',
 *     input:      'myInputId',
 *     align:      'right',   // 'right' | 'left'  (varsayılan: 'right')
 *     clearable:  true,
 *     onSelect(date) { },    // 'YYYY-MM-DD'
 *     onClear()      { },
 *   });
 *
 * ── Aralık modu (range: true) ────────────────────────────────────────────
 *   const picker = new CustomDatePicker({
 *     btn:          'myBtnId',
 *     input:        'myInputId',    // from tarihi
 *     inputTo:      'myInputToId',  // to tarihi
 *     range:        true,
 *     clearable:    true,
 *     onStartSelect(from)      { }, // ilk tarih seçilince (picker açık kalır)
 *     onSelect(from, to)       { }, // her iki tarih seçilince
 *     onClear()                { },
 *   });
 *
 * ── API ──────────────────────────────────────────────────────────────────
 *   picker.toggle() / open() / close()
 *   picker.getValue()          // tek: 'YYYY-MM-DD' | aralık: { from, to }
 *   picker.setValue('2026-06-15')
 */

class CustomDatePicker {
  constructor({ btn, input, inputTo, align = 'right', clearable = false, clearLabel,
                range = false, onSelect, onStartSelect, onClear } = {}) {
    this._btn          = typeof btn     === 'string' ? document.getElementById(btn)     : btn;
    this._input        = typeof input   === 'string' ? document.getElementById(input)   : input;
    this._inputTo      = typeof inputTo === 'string' ? document.getElementById(inputTo) : (inputTo || null);
    this._align        = align;
    this._clearable    = clearable;
    this._clearLabel   = clearLabel || (typeof UI !== 'undefined' ? UI.t('bud_clear_date') : 'Temizle');
    this._range        = range;
    this._onSelect     = onSelect      || null;
    this._onStartSelect= onStartSelect || null;
    this._onClear      = onClear       || null;
    this._pick         = null;
    this._closeHandler      = null;
    this._repositionHandler = null;
    // Aralık durumu
    this._rangeStart = null;
    this._rangeEnd   = null;
    this._rangeStep  = 0; // 0=boşta, 1=ilk tarih seçildi, ikincisi bekleniyor
  }

  // ── Genel API ──────────────────────────────────────────────────────────

  toggle() {
    if (this._pick && this._pick.isConnected) {
      // Kapanırken yarım kalmış aralığı sıfırla
      if (this._range && this._rangeStep === 1) {
        this._rangeStart = null;
        this._rangeStep  = 0;
      }
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.close();

    const todayS = UI.today();

    // Aralık modu: mevcut değerleri göster (sadece boşta iken)
    if (this._range && this._rangeStep === 0) {
      this._rangeStart = this._input?.value   || null;
      this._rangeEnd   = this._inputTo?.value || null;
    }

    const startStr = this._rangeStart || this._input?.value || todayS;
    const parts    = startStr.split('-');
    let viewYear   = parseInt(parts[0]);
    let viewMonth  = parseInt(parts[1]) - 1;

    const locale = { tr: 'tr-TR', en: 'en-US', zh: 'zh-CN', es: 'es-ES', fr: 'fr-FR' }[UI.getLang()] || 'tr-TR';

    const pick = document.createElement('div');
    pick.className = `cdp-pick cdp-align-${this._align}`;
    this._pick = pick;

    const render = () => {
      const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
        .format(new Date(viewYear, viewMonth, 1));

      const dayHeaders = [...Array(7)].map((_, i) =>
        new Intl.DateTimeFormat(locale, { weekday: 'short' })
          .format(new Date(2024, 0, i + 1))
          .replace('.', '')
      );

      const firstDow   = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
      const daysInMon  = new Date(viewYear, viewMonth + 1, 0).getDate();
      const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();
      const totalCells = Math.ceil((firstDow + daysInMon) / 7) * 7;

      // Aralık sınırlarını normalize et (from <= to)
      let rangeFrom = null, rangeTo = null;
      if (this._range) {
        const rs = this._rangeStart, re = this._rangeEnd;
        if (rs && re) {
          rangeFrom = rs < re ? rs : re;
          rangeTo   = rs < re ? re : rs;
        } else if (rs) {
          rangeFrom = rs;
        }
      }

      let cells = '';
      for (let i = 0; i < totalCells; i++) {
        let d, m, y, other = false;
        if (i < firstDow) {
          d = daysInPrev - firstDow + i + 1;
          m = viewMonth === 0 ? 12 : viewMonth;
          y = viewMonth === 0 ? viewYear - 1 : viewYear;
          other = true;
        } else if (i < firstDow + daysInMon) {
          d = i - firstDow + 1;
          m = viewMonth + 1;
          y = viewYear;
        } else {
          d = i - firstDow - daysInMon + 1;
          m = viewMonth === 11 ? 1 : viewMonth + 2;
          y = viewMonth === 11 ? viewYear + 1 : viewYear;
          other = true;
        }
        const ds = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

        let selCls = '';
        if (this._range) {
          if (rangeFrom && rangeTo) {
            if (ds === rangeFrom && ds === rangeTo) selCls = 'cdp-sel';
            else if (ds === rangeFrom)              selCls = 'cdp-range-start';
            else if (ds === rangeTo)                selCls = 'cdp-range-end';
            else if (ds > rangeFrom && ds < rangeTo) selCls = 'cdp-in-range';
          } else if (rangeFrom && ds === rangeFrom) {
            selCls = 'cdp-range-start';
          }
        } else {
          if (ds === (this._input?.value || '')) selCls = 'cdp-sel';
        }

        const cls = ['cdp-day',
          other        ? 'cdp-other' : '',
          ds === todayS ? 'cdp-today' : '',
          selCls,
        ].filter(Boolean).join(' ');
        cells += `<button class="${cls}" data-d="${ds}">${d}</button>`;
      }

      // Temizle butonu — clearable ise her zaman göster; range'de ilk tarih seçildiğinde de aktif
      const hasSel = this._range
        ? (this._input?.value || this._inputTo?.value || this._rangeStart)
        : this._input?.value;
      const clearHtml = this._clearable
        ? `<div class="cdp-foot"><button class="cdp-clear" style="${hasSel ? '' : 'opacity:.45;pointer-events:none'}">${this._clearLabel}</button></div>`
        : '';

      // Aralık ipucu: ilk tarih seçildi, ikinci bekleniyor
      const hintHtml = (this._range && this._rangeStep === 1)
        ? `<div class="cdp-range-hint">${typeof UI !== 'undefined' ? UI.t('cdp_range_hint') : 'İkinci tarihi seçin'}</div>`
        : '';

      pick.innerHTML = `
        ${hintHtml}
        <div class="cdp-hdr">
          <button class="cdp-nav cdp-nav-prev">
            <svg data-lucide="chevron-left" style="width:13px;height:13px"></svg>
          </button>
          <span class="cdp-lbl">${monthLabel}</span>
          <button class="cdp-nav cdp-nav-next">
            <svg data-lucide="chevron-right" style="width:13px;height:13px"></svg>
          </button>
        </div>
        <div class="cdp-grid">
          ${dayHeaders.map(d => `<div class="cdp-dh">${d}</div>`).join('')}
          ${cells}
        </div>
        ${clearHtml}
      `;

      lucide.createIcons({ nodes: [pick] });

      pick.querySelector('.cdp-nav-prev').onclick = e => {
        e.stopPropagation();
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        render();
      };
      pick.querySelector('.cdp-nav-next').onclick = e => {
        e.stopPropagation();
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        render();
      };

      pick.querySelectorAll('.cdp-day').forEach(b => {
        b.onclick = e => {
          e.stopPropagation();
          const date = b.dataset.d;

          if (this._range) {
            if (this._rangeStep === 0) {
              // İlk tıklama: başlangıç tarihi
              this._rangeStart = date;
              this._rangeEnd   = null;
              this._rangeStep  = 1;
              render();
              if (this._onStartSelect) this._onStartSelect(date);
            } else {
              // İkinci tıklama: aralığı tamamla
              this._rangeEnd  = date;
              this._rangeStep = 0;
              let from = this._rangeStart, to = this._rangeEnd;
              if (from > to) { [from, to] = [to, from]; }
              if (this._input)   this._input.value   = from;
              if (this._inputTo) this._inputTo.value = to;
              this.close();
              if (this._onSelect) this._onSelect(from, to);
            }
          } else {
            this._input.value = date;
            this._input.dispatchEvent(new Event('change', { bubbles: true }));
            this.close();
            if (this._onSelect) this._onSelect(date);
          }
        };
      });

      pick.querySelector('.cdp-clear')?.addEventListener('click', e => {
        e.stopPropagation();
        if (this._input)   this._input.value   = '';
        if (this._inputTo) this._inputTo.value = '';
        this._rangeStart = null;
        this._rangeEnd   = null;
        this._rangeStep  = 0;
        if (!this._range) this._input?.dispatchEvent(new Event('change', { bubbles: true }));
        this.close();
        if (this._onClear) this._onClear();
      });
    };

    // Portal: body'e eklenir, position:fixed ile konumlandırılır
    // render()'dan önce eklenmeli — lucide.createIcons DOM'da çalışır
    document.body.appendChild(pick);

    render();

    const _applyDirection = () => {
      const rect  = this._btn.getBoundingClientRect();
      const pickH = pick.offsetHeight || 300;
      const below = window.innerHeight - rect.bottom;
      const above = rect.top;
      const openUp = below < pickH && above > below;
      pick.classList.toggle('cdp-open-up', openUp);

      pick.style.position = 'fixed';
      pick.style.zIndex   = '1500';
      if (openUp) {
        pick.style.top    = 'auto';
        pick.style.bottom = `${window.innerHeight - rect.top + 4}px`;
      } else {
        pick.style.bottom = 'auto';
        pick.style.top    = `${rect.bottom + 4}px`;
      }
      if (this._align === 'right') {
        pick.style.left  = 'auto';
        pick.style.right = `${window.innerWidth - rect.right}px`;
      } else {
        pick.style.right = 'auto';
        pick.style.left  = `${rect.left}px`;
      }
    };
    _applyDirection();

    this._repositionHandler = _applyDirection;
    window.addEventListener('resize', this._repositionHandler);
    window.addEventListener('scroll', this._repositionHandler, true);

    setTimeout(() => {
      this._closeHandler = e => {
        if (!pick.contains(e.target) && e.target !== this._btn) {
          if (this._range && this._rangeStep === 1) {
            this._rangeStart = null;
            this._rangeStep  = 0;
          }
          this.close();
        }
      };
      document.addEventListener('click', this._closeHandler);
    }, 0);
  }

  close() {
    if (this._pick) {
      this._pick.remove();
      this._pick = null;
    }
    if (this._closeHandler) {
      document.removeEventListener('click', this._closeHandler);
      this._closeHandler = null;
    }
    if (this._repositionHandler) {
      window.removeEventListener('resize', this._repositionHandler);
      window.removeEventListener('scroll', this._repositionHandler, true);
      this._repositionHandler = null;
    }
  }

  getValue() {
    if (this._range) {
      return { from: this._input?.value || '', to: this._inputTo?.value || '' };
    }
    return this._input?.value || '';
  }

  setValue(date) {
    if (this._input) this._input.value = date || '';
    if (date && this._onSelect) this._onSelect(date);
    if (!date && this._onClear) this._onClear();
  }
}

// ── Otomatik başlatma ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cdp-trigger[data-input]').forEach(btn => {
    const align      = btn.dataset.align      || 'right';
    const clearable  = btn.dataset.clearable  === 'true';
    const clearLabel = btn.dataset.clearLabel || undefined;
    const range      = btn.dataset.range      === 'true';

    const resolve = path => path
      ? path.split('.').reduce((o, k) => o?.[k], window) || null
      : null;

    const picker = new CustomDatePicker({
      btn, input: btn.dataset.input, align, clearable, clearLabel, range,
      onSelect:      resolve(btn.dataset.onselect),
      onStartSelect: resolve(btn.dataset.onstartselect),
      onClear:       resolve(btn.dataset.onclear),
    });

    btn._cdpInstance = picker;
    btn.addEventListener('click', e => { e.stopPropagation(); picker.toggle(); });
  });
});
