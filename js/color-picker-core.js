/**
 * CustomColorPicker — Merkezi renk seçici bileşeni
 *
 * Gereksinimler: ui.js + css/color-picker-style.css
 *
 *   const cp = new CustomColorPicker({
 *     btn:      'myBtnId',    // tetikleyici buton ID veya element
 *     input:    'myInputId',  // değerin yazılacağı hidden input
 *     align:    'left',       // 'left' | 'right' (varsayılan: 'left')
 *     onChange: hex => { },   // her renk değişiminde çağrılır ('#rrggbb')
 *     onSelect: hex => { },   // picker kapandığında çağrılır
 *   });
 *
 *   cp.toggle() / cp.open() / cp.close()
 *   cp.getValue()        // '#rrggbb'
 *   cp.setValue('#hex')  // programatik atama — onChange tetikler
 */

class CustomColorPicker {
  static PRESETS = [
    '#7C6CFC', '#34D399', '#60A5FA', '#FBBF24',
    '#F87171', '#F472B6', '#A78BFA', '#F97316',
    '#14B8A6', '#E11D48', '#6B7280', '#94A3B8',
  ];

  constructor({ btn, input, align = 'left', onChange, onSelect } = {}) {
    this._btn    = typeof btn   === 'string' ? document.getElementById(btn)   : btn;
    this._input  = typeof input === 'string' ? document.getElementById(input) : (input || null);
    this._align  = align;
    this._onChange = onChange || null;
    this._onSelect = onSelect  || null;
    this._pick   = null;
    this._drag   = null; // 'canvas' | 'hue'
    this._closeHandler      = null;
    this._repositionHandler = null;

    // Renk durumu HSV (Hue 0-360, Saturation 0-100, Value 0-100)
    this._h = 264; this._s = 56; this._v = 99;

    const initVal = this._input?.value;
    if (initVal && /^#[0-9a-fA-F]{6}$/.test(initVal)) {
      const { r, g, b } = this._hexToRgb(initVal);
      const hsv = this._rgbToHsv(r, g, b);
      this._h = hsv.h; this._s = hsv.s; this._v = hsv.v;
    }

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp   = this._onMouseUp.bind(this);
  }

  // ── Genel API ────────────────────────────────────────────────────────

  toggle() {
    if (this._pick?.isConnected) this.close();
    else this.open();
  }

  open() {
    this.close();
    const pick = document.createElement('div');
    pick.className = 'ccp-pick';
    this._pick = pick;
    document.body.appendChild(pick);
    this._render();
    this._applyPosition();

    this._repositionHandler = () => this._applyPosition();
    window.addEventListener('resize', this._repositionHandler);
    window.addEventListener('scroll', this._repositionHandler, true);

    setTimeout(() => {
      this._closeHandler = e => {
        if (!pick.contains(e.target) && e.target !== this._btn) this.close();
      };
      document.addEventListener('click', this._closeHandler);
    }, 0);
  }

  close() {
    if (this._pick) { this._pick.remove(); this._pick = null; }
    if (this._closeHandler) {
      document.removeEventListener('click', this._closeHandler);
      this._closeHandler = null;
    }
    if (this._repositionHandler) {
      window.removeEventListener('resize', this._repositionHandler);
      window.removeEventListener('scroll', this._repositionHandler, true);
      this._repositionHandler = null;
    }
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup',   this._onMouseUp);
    this._drag = null;
    if (this._onSelect) this._onSelect(this._getHex());
  }

  getValue() { return this._getHex(); }

  setValue(hex) {
    if (!hex || !/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    const { r, g, b } = this._hexToRgb(hex);
    const hsv = this._rgbToHsv(r, g, b);
    this._h = hsv.h; this._s = hsv.s; this._v = hsv.v;
    if (this._input) this._input.value = hex;
    if (this._onChange) this._onChange(hex);
    if (this._pick?.isConnected) this._render();
  }

  // ── Render ───────────────────────────────────────────────────────────

  _render() {
    const pick = this._pick;
    const hex  = this._getHex();
    const { r, g, b } = this._hexToRgb(hex);
    const hueHex = this._hsvToHex(this._h, 100, 100);

    pick.innerHTML = `
      <div class="ccp-canvas-wrap">
        <div class="ccp-canvas-sat" style="background:linear-gradient(to right,#fff,${hueHex})"></div>
        <div class="ccp-canvas-val"></div>
        <div class="ccp-thumb" style="left:${this._s}%;top:${100 - this._v}%"></div>
      </div>
      <div class="ccp-hue-track">
        <div class="ccp-hue-thumb" style="left:${(this._h / 360 * 100).toFixed(2)}%"></div>
      </div>
      <div class="ccp-bottom">
        <div class="ccp-preview" style="background:${hex}"></div>
        <input class="ccp-hex-inp" maxlength="7" spellcheck="false" value="${hex.toUpperCase()}">
      </div>
      <div class="ccp-rgb-row">
        <div class="ccp-rgb-col">
          <input class="ccp-rgb-inp" data-ch="r" type="text" inputmode="numeric" maxlength="3" value="${r}">
          <span class="ccp-rgb-lbl">R</span>
        </div>
        <div class="ccp-rgb-col">
          <input class="ccp-rgb-inp" data-ch="g" type="text" inputmode="numeric" maxlength="3" value="${g}">
          <span class="ccp-rgb-lbl">G</span>
        </div>
        <div class="ccp-rgb-col">
          <input class="ccp-rgb-inp" data-ch="b" type="text" inputmode="numeric" maxlength="3" value="${b}">
          <span class="ccp-rgb-lbl">B</span>
        </div>
      </div>
      <div class="ccp-presets">
        ${CustomColorPicker.PRESETS.map(c =>
          `<button type="button" class="ccp-preset-btn${c.toUpperCase() === hex.toUpperCase() ? ' ccp-active' : ''}" style="background:${c}" data-c="${c}"></button>`
        ).join('')}
      </div>`;

    // Tuval sürükleme
    const canvas = pick.querySelector('.ccp-canvas-wrap');
    canvas.addEventListener('mousedown', e => {
      e.preventDefault(); e.stopPropagation();
      this._drag = 'canvas';
      this._applyCanvas(e);
      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup',   this._onMouseUp);
    });

    // Ton kaydırıcı sürükleme
    const hueTrack = pick.querySelector('.ccp-hue-track');
    hueTrack.addEventListener('mousedown', e => {
      e.preventDefault(); e.stopPropagation();
      this._drag = 'hue';
      this._applyHue(e);
      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup',   this._onMouseUp);
    });

    // Hex girişi
    const hexInp = pick.querySelector('.ccp-hex-inp');
    hexInp.addEventListener('input', e => {
      let v = e.target.value.trim();
      if (!v.startsWith('#')) v = '#' + v;
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        const { r, g, b } = this._hexToRgb(v);
        const hsv = this._rgbToHsv(r, g, b);
        this._h = hsv.h; this._s = hsv.s; this._v = hsv.v;
        this._commit(true);
      }
    });
    hexInp.addEventListener('keydown', e => { if (e.key === 'Enter') hexInp.blur(); });
    hexInp.addEventListener('click', e => e.stopPropagation());

    // RGB girişleri
    pick.querySelectorAll('.ccp-rgb-inp').forEach(inp => {
      inp.addEventListener('change', () => {
        const rr = Math.max(0, Math.min(255, parseInt(pick.querySelector('[data-ch="r"]').value) || 0));
        const gg = Math.max(0, Math.min(255, parseInt(pick.querySelector('[data-ch="g"]').value) || 0));
        const bb = Math.max(0, Math.min(255, parseInt(pick.querySelector('[data-ch="b"]').value) || 0));
        const hsv = this._rgbToHsv(rr, gg, bb);
        this._h = hsv.h; this._s = hsv.s; this._v = hsv.v;
        this._commit(true);
      });
      inp.addEventListener('click', e => e.stopPropagation());
    });

    // Preset butonları
    pick.querySelectorAll('.ccp-preset-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const { r, g, b } = this._hexToRgb(btn.dataset.c);
        const hsv = this._rgbToHsv(r, g, b);
        this._h = hsv.h; this._s = hsv.s; this._v = hsv.v;
        this._commit(true);
      });
    });
  }

  _onMouseMove(e) {
    if      (this._drag === 'canvas') this._applyCanvas(e);
    else if (this._drag === 'hue')    this._applyHue(e);
  }

  _onMouseUp() {
    this._drag = null;
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup',   this._onMouseUp);
  }

  _applyCanvas(e) {
    const rect = this._pick.querySelector('.ccp-canvas-wrap').getBoundingClientRect();
    this._s = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width  * 100));
    this._v = Math.max(0, Math.min(100, 100 - (e.clientY - rect.top) / rect.height * 100));
    this._commit(true);
  }

  _applyHue(e) {
    const rect = this._pick.querySelector('.ccp-hue-track').getBoundingClientRect();
    this._h = Math.max(0, Math.min(359.9, (e.clientX - rect.left) / rect.width * 360));
    this._commit(true);
  }

  _commit(rerender) {
    const hex = this._getHex();
    if (this._input) this._input.value = hex;
    if (this._onChange) this._onChange(hex);
    if (rerender && this._pick?.isConnected) this._render();
  }

  // ── Konumlandırma ─────────────────────────────────────────────────────

  _applyPosition() {
    const pick = this._pick;
    const rect  = this._btn.getBoundingClientRect();
    const pickH = pick.offsetHeight || 340;
    const below = window.innerHeight - rect.bottom;
    const above = rect.top;
    const openUp = below < pickH && above > below;

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
  }

  // ── Renk dönüşümleri ──────────────────────────────────────────────────

  _getHex() { return this._hsvToHex(this._h, this._s, this._v); }

  _hsvToHex(h, s, v) {
    const { r, g, b } = this._hsvToRgb(h, s, v);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  _hsvToRgb(h, s, v) {
    s /= 100; v /= 100;
    const f = n => {
      const k = (n + h / 60) % 6;
      return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return {
      r: Math.round(f(5) * 255),
      g: Math.round(f(3) * 255),
      b: Math.round(f(1) * 255),
    };
  }

  _hexToRgb(hex) {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    };
  }

  _rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d   = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    if (d !== 0) {
      if      (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else                h = ((r - g) / d + 4) / 6;
    }
    return { h: h * 360, s: s * 100, v: v * 100 };
  }
}
