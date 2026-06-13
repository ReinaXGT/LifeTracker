/* ── Custom Time Picker (CTP) ─────────────────────────────────────────────
   Portal mimarisi: document.body'e append, position:fixed, z-index:1500.
   12 saatlik görünüm + AM/PM toggle. Dahili değer HH:MM (24h) formatında.
   ──────────────────────────────────────────────────────────────────────── */

class CustomTimePicker {
  constructor(opts) {
    this._btn      = typeof opts.btn   === 'string' ? document.getElementById(opts.btn)   : opts.btn;
    this._input    = typeof opts.input === 'string' ? document.getElementById(opts.input) : opts.input;
    this._align    = opts.align    || 'left';
    this._clearable = opts.clearable || false;
    this._onSelect = opts.onSelect || null;
    this._onClear  = opts.onClear  || null;
    this._value    = (this._input && this._input.value) ? this._input.value : '';
    this._ampm     = 'AM';
    this._pick     = null;
    this._open     = false;

    this._outsideHandler = (e) => {
      if (this._pick && !this._pick.contains(e.target) && !this._btn.contains(e.target)) {
        this.close();
      }
    };
    this._scrollHandler = () => { if (this._open) this._reposition(); };
    this._resizeHandler = () => { if (this._open) this._reposition(); };
  }

  toggle() { this._open ? this.close() : this.open(); }

  open() {
    if (this._open) return;
    this._open = true;
    this._renderPicker();
    document.addEventListener('mousedown', this._outsideHandler, true);
    window.addEventListener('scroll',      this._scrollHandler,  true);
    window.addEventListener('resize',      this._resizeHandler);
  }

  close() {
    if (!this._open) return;
    this._open = false;
    if (this._pick) { this._pick.remove(); this._pick = null; }
    document.removeEventListener('mousedown', this._outsideHandler, true);
    window.removeEventListener('scroll',      this._scrollHandler,  true);
    window.removeEventListener('resize',      this._resizeHandler);
  }

  destroy() { this.close(); }
  getValue() { return this._value; }

  setValue(time) {
    if (!time) {
      this._value = '';
      if (this._input) this._input.value = '';
      return;
    }
    this._value = time;
    if (this._input) this._input.value = time;
    if (this._onSelect) this._onSelect(time);
  }

  /* 12h → 24h dönüşümü */
  _to24(h12, ampm) {
    let h = h12 % 12;
    if (ampm === 'PM') h += 12;
    return h;
  }

  _select(h12, m, ampm) {
    const h24 = this._to24(h12, ampm);
    const time = `${String(h24).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    this._value = time;
    if (this._input) this._input.value = time;
    if (this._onSelect) this._onSelect(time);
  }

  /* Picker'ı butona göre konumlandır */
  _reposition() {
    if (!this._pick) return;
    const rect = this._btn.getBoundingClientRect();
    const pw   = this._pick.offsetWidth  || 192;
    const ph   = this._pick.offsetHeight || 290;

    /* Dikey: altında yer yoksa yukarı aç */
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    let top, openUp = false;
    if (spaceBelow >= ph || spaceBelow >= spaceAbove) {
      top = rect.bottom + 6;
    } else {
      top = rect.top - ph - 6;
      openUp = true;
    }
    this._pick.classList.toggle('ctp-open-up', openUp);
    this._pick.style.top = Math.max(8, top) + 'px';

    /* Yatay */
    if (this._align === 'right') {
      let left = rect.right - pw;
      if (left < 8) left = 8;
      this._pick.style.left = left + 'px';
    } else {
      let left = rect.left;
      if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
      if (left < 8) left = 8;
      this._pick.style.left = left + 'px';
    }
  }

  _renderPicker() {
    /* Mevcut değeri ayrıştır */
    const [rawH, rawM] = this._value ? this._value.split(':').map(Number) : [null, null];
    const curAmPm = rawH !== null ? (rawH >= 12 ? 'PM' : 'AM') : 'AM';
    const curH12  = rawH !== null ? (rawH % 12 || 12) : null;
    const curM    = rawM;
    this._ampm    = curAmPm;

    const pick = document.createElement('div');
    pick.className = 'ctp-pick';

    /* Saat öğeleri: 12, 1, 2 … 11 */
    const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const hourItems = HOURS.map(h =>
      `<div class="ctp-item${h === curH12 ? ' ctp-active' : ''}" data-col="h" data-val="${h}">${String(h).padStart(2,'0')}</div>`
    ).join('');

    /* Dakika öğeleri: 00–59 */
    const minItems = Array.from({length: 60}, (_, i) =>
      `<div class="ctp-item${i === curM ? ' ctp-active' : ''}" data-col="m" data-val="${i}">${String(i).padStart(2,'0')}</div>`
    ).join('');

    pick.innerHTML = `
      <div class="ctp-ampm-row">
        <button class="ctp-ampm-btn${curAmPm === 'AM' ? ' ctp-ampm-active' : ''}" type="button" data-ampm="AM">AM</button>
        <button class="ctp-ampm-btn${curAmPm === 'PM' ? ' ctp-ampm-active' : ''}" type="button" data-ampm="PM">PM</button>
      </div>
      <div class="ctp-header">
        <span class="ctp-col-lbl">Saat</span>
        <span style="width:11px;flex-shrink:0"></span>
        <span class="ctp-col-lbl">Dakika</span>
      </div>
      <div class="ctp-cols">
        <div class="ctp-col-list" data-col="h">${hourItems}</div>
        <div class="ctp-sep"></div>
        <div class="ctp-col-list" data-col="m">${minItems}</div>
      </div>
      ${this._clearable ? '<div class="ctp-footer"><button class="ctp-clear-btn" type="button">Temizle</button></div>' : ''}
    `;

    /* AM/PM toggle */
    pick.querySelectorAll('.ctp-ampm-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._ampm = btn.dataset.ampm;
        pick.querySelectorAll('.ctp-ampm-btn').forEach(b => b.classList.remove('ctp-ampm-active'));
        btn.classList.add('ctp-ampm-active');
        const aH = pick.querySelector('.ctp-col-list[data-col="h"] .ctp-active');
        const aM = pick.querySelector('.ctp-col-list[data-col="m"] .ctp-active');
        if (aH && aM) this._select(parseInt(aH.dataset.val), parseInt(aM.dataset.val), this._ampm);
      });
    });

    /* Saat / dakika öğe seçimi */
    pick.querySelectorAll('.ctp-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const col = item.dataset.col;
        const val = parseInt(item.dataset.val);

        pick.querySelectorAll(`.ctp-col-list[data-col="${col}"] .ctp-item`).forEach(i => i.classList.remove('ctp-active'));
        item.classList.add('ctp-active');

        const other = col === 'h' ? 'm' : 'h';
        let otherActive = pick.querySelector(`.ctp-col-list[data-col="${other}"] .ctp-active`);
        if (!otherActive) {
          otherActive = pick.querySelector(`.ctp-col-list[data-col="${other}"] .ctp-item[data-val="0"]`);
          if (otherActive) otherActive.classList.add('ctp-active');
        }
        const otherVal = otherActive ? parseInt(otherActive.dataset.val) : 0;
        const h = col === 'h' ? val : otherVal;
        const m = col === 'm' ? val : otherVal;
        this._select(h, m, this._ampm);
      });
    });

    /* Temizle */
    if (this._clearable) {
      pick.querySelector('.ctp-clear-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this._value = '';
        if (this._input) this._input.value = '';
        if (this._onClear) this._onClear();
        this.close();
      });
    }

    /* Portal: body'e ekle, konumlandır */
    document.body.appendChild(pick);
    this._pick = pick;
    this._reposition();

    /* Aktif öğeleri merkeze kaydır */
    setTimeout(() => {
      const aH = pick.querySelector('.ctp-col-list[data-col="h"] .ctp-active');
      const aM = pick.querySelector('.ctp-col-list[data-col="m"] .ctp-active');
      if (aH) aH.scrollIntoView({ block: 'center', behavior: 'smooth' });
      if (aM) aM.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 30);
  }
}
