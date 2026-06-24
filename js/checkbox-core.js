/**
 * CheckboxCore — Merkezi Checkbox Bileşeni
 *
 * Native <input type="checkbox"> kullanımı yasaktır; bunun yerine
 * bu modülün html() veya init() fonksiyonları kullanılır.
 *
 * Kullanım (template literal):
 *   ${CheckboxCore.html({ done, type: 'circle', color: 'var(--green)', onclick: "Habits.toggle('id')" })}
 *
 * Kullanım (native input'u değiştirme):
 *   CheckboxCore.init('inputId', { type: 'square', color: 'var(--accent)' });
 *
 * Toggle / durum okuma (modal içi):
 *   CheckboxCore.toggle(el);
 *   CheckboxCore.isChecked(el);
 */
const CheckboxCore = (() => {

  /** Inline SVG checkmark — lucide bağımlılığı olmadan */
  function _svg(size, strokeWidth) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" `
         + `stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" `
         + `stroke-linejoin="round" `
         + `style="width:${size};height:${size};pointer-events:none;flex-shrink:0">`
         + `<polyline points="20 6 9 17 4 12"/></svg>`;
  }

  function _svgForType(type) {
    if (type === 'circle') return _svg('0.75rem',   '2.5');
    if (type === 'sm')     return _svg('0.5625rem', '3');
                           return _svg('0.625rem',  '2.5');
  }

  function _shapeClass(type) {
    if (type === 'circle') return 'cbx-circle';
    if (type === 'sm')     return 'cbx-sm';
                           return 'cbx-square';
  }

  /**
   * HTML string üretir — JS template literal içinde kullanılır.
   *
   * @param {object}  opts
   * @param {boolean} [opts.done=false]        — checked durumu
   * @param {'circle'|'square'|'sm'} [opts.type='circle'] — şekil
   * @param {string}  [opts.color]             — CSS renk, örn. 'var(--green)'
   * @param {string}  [opts.onclick]           — inline onclick string
   * @param {string}  [opts.extraStyle]        — ek inline stil
   * @param {string}  [opts.extraClass]        — ek CSS sınıfı
   */
  function html({ done = false, type = 'circle', color, onclick = '', extraStyle = '', extraClass = '' } = {}) {
    const shape    = _shapeClass(type);
    const checked  = done ? ' cbx-checked' : '';
    const colorCSS = color ? `--cbx-color:${color};` : '';
    const onAttr   = onclick ? ` onclick="${onclick}"` : '';
    const extra    = extraClass ? ` ${extraClass}` : '';
    return `<div class="cbx ${shape}${checked}${extra}" style="${colorCSS}${extraStyle}"${onAttr}>${_svgForType(type)}</div>`;
  }

  /**
   * Native <input type="checkbox">'u gizleyerek önüne özel checkbox div'i ekler.
   * Input'un onchange olayı korunur; change event otomatik dispatch edilir.
   *
   * @param {string|Element} elOrId   — input element'i veya ID'si
   * @param {object}         [opts]
   * @param {'circle'|'square'|'sm'} [opts.type='square']
   * @param {string}         [opts.color]     — CSS renk değeri
   * @param {function}       [opts.onChange]  — callback(isChecked)
   */
  function init(elOrId, opts = {}) {
    const inp = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
    if (!inp || inp._cbxInit) return;
    inp._cbxInit = true;
    inp.style.display = 'none';

    const type = opts.type || 'square';
    const box  = document.createElement('div');
    box.className = `cbx ${_shapeClass(type)}${inp.checked ? ' cbx-checked' : ''}`;
    if (opts.color) box.style.setProperty('--cbx-color', opts.color);

    const tmp = document.createElement('span');
    tmp.innerHTML = _svgForType(type);
    box.appendChild(tmp.firstChild);

    box.addEventListener('click', (e) => {
      e.stopPropagation();
      inp.checked = !inp.checked;
      inp.dispatchEvent(new Event('change', { bubbles: true }));
      box.classList.toggle('cbx-checked', inp.checked);
      if (opts.onChange) opts.onChange(inp.checked);
    });

    inp.parentNode.insertBefore(box, inp);
  }

  /**
   * cbx div'inin checked durumunu toggle eder.
   * Modal içi checkboxlarda (input olmadan) kullanılır.
   */
  function toggle(el) {
    if (!el || !el.classList) return;
    el.classList.toggle('cbx-checked');
  }

  /** cbx div'inin checked olup olmadığını döner. */
  function isChecked(el) {
    return el?.classList?.contains('cbx-checked') ?? false;
  }

  return { html, init, toggle, isChecked };
})();
