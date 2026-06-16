/**
 * CustomModal — Merkezi Modal / Dialog Sistemi (DOM Injection)
 *
 * CDP ve CustomDropdown ile aynı mimari kalıpta. Çağrıldığında modal HTML'ini
 * document.body içine inject eder; kapandığında DOM'dan tamamen kaldırır.
 *
 * Gereksinimler: modal-style.css, ui.js (btn sınıfları için components.css)
 *
 * ── Temel kullanım ───────────────────────────────────────────────────────────
 *
 *   const modal = new CustomModal({
 *     title:   'Antrenmanı Sil',
 *     icon:    'trash-2',
 *     variant: 'danger',
 *     content: '<p>Bu antrenmanı kalıcı olarak silmek istediğinize emin misiniz?</p>',
 *     buttons: [
 *       { label: 'İptal',  variant: 'secondary', onClick: m => m.close() },
 *       { label: 'Sil',    variant: 'danger',    onClick: m => { doDelete(); m.close(); } },
 *     ],
 *   });
 *   modal.open();
 *
 * ── Yapıcı parametreleri ─────────────────────────────────────────────────────
 *
 *   title            {string}   — Modal başlığı
 *   subtitle         {string}   — Başlık altı açıklama (opsiyonel)
 *   icon             {string}   — Lucide ikon adı (opsiyonel)
 *   variant          {string}   — İkon + renk tonu: 'default'|'danger'|'warning'|'success'
 *   content          {string}   — .cm-body içine yerleştirilecek HTML string
 *   width            {number}   — Panel genişliği px (varsayılan: 480)
 *   zIndex           {number}   — Overlay z-index (varsayılan: 1050; confirm için 9000 geç)
 *   closeOnBackdrop  {boolean}  — Dışa tıklayınca kapat (varsayılan: true)
 *   closeOnEscape    {boolean}  — Escape ile kapat (varsayılan: true)
 *   onClose          {Function} — Kapanışta çağrılır
 *   buttons          {Array}    — Footer butonları dizisi (aşağıya bak)
 *
 * ── Buton şeması ─────────────────────────────────────────────────────────────
 *
 *   {
 *     label:   'Sil',
 *     variant: 'danger',    // 'primary' | 'secondary' | 'danger' | 'ghost'
 *     onClick: (modal) => { /* iş mantığı *\/ modal.close(); },
 *   }
 *
 * ── API ──────────────────────────────────────────────────────────────────────
 *
 *   modal.open()             — DOM'a ekler ve gösterir
 *   modal.close()            — animasyonla kapatır, DOM'dan kaldırır
 *   modal.setContent(html)   — açıkken .cm-body içeriğini günceller
 *   modal.getBody()          — .cm-body DOM elementini döner (form erişimi)
 *   modal.onClose            — dışarıdan değiştirilebilir kapanış callback'i
 */

class CustomModal {
  constructor({
    title           = '',
    subtitle        = '',
    icon            = '',
    variant         = 'default',
    content         = '',
    width           = 480,
    zIndex          = 1050,
    closeOnBackdrop = true,
    closeOnEscape   = true,
    onClose         = null,
    buttons         = [],
    overflowBody    = 'auto',  // cdp-core.js portal mimarisi kullandığı için 'visible' artık gerekmez
  } = {}) {
    this._title           = title;
    this._subtitle        = subtitle;
    this._icon            = icon;
    this._variant         = variant;
    this._content         = content;
    this._width           = width;
    this._zIndex          = zIndex;
    this._closeOnBackdrop = closeOnBackdrop;
    this._closeOnEscape   = closeOnEscape;
    this.onClose          = onClose;
    this._buttons         = buttons;
    this._overflowBody    = overflowBody;
    this._overlay         = null;
    this._escHandler      = null;
  }

  // ── Genel API ──────────────────────────────────────────────────────────────

  open() {
    if (this._overlay && this._overlay.isConnected) return;
    this._build();
    document.body.appendChild(this._overlay);
    lucide.createIcons({ nodes: [this._overlay] });
    if (this._closeOnEscape) {
      this._escHandler = (e) => { if (e.key === 'Escape') this.close(); };
      document.addEventListener('keydown', this._escHandler);
    }
  }

  close() {
    if (!this._overlay || !this._overlay.isConnected) return;
    this._overlay.classList.add('cm-closing');
    setTimeout(() => {
      if (this._overlay) { this._overlay.remove(); this._overlay = null; }
    }, 110);
    if (this._escHandler) {
      document.removeEventListener('keydown', this._escHandler);
      this._escHandler = null;
    }
    if (typeof this.onClose === 'function') this.onClose();
  }

  setContent(html) {
    this._content = html;
    const body = this.getBody();
    if (body) { body.innerHTML = html; lucide.createIcons({ nodes: [body] }); }
  }

  getBody() {
    return this._overlay ? this._overlay.querySelector('.cm-body') : null;
  }

  // ── İç inşa ────────────────────────────────────────────────────────────────

  _build() {
    const overlay = document.createElement('div');
    overlay.className = 'cm-overlay';
    overlay.style.zIndex = String(this._zIndex);
    this._overlay = overlay;

    const iconHtml = this._icon
      ? `<div class="cm-icon-wrap${this._variant !== 'default' ? ` cm-icon-${this._variant}` : ''}">
           <svg data-lucide="${this._icon}"></svg>
         </div>`
      : '';

    const subtitleHtml = this._subtitle
      ? `<div class="cm-subtitle">${this._subtitle}</div>`
      : '';

    const buttonsHtml = this._buttons.map((btn, i) => {
      const cls = btn.variant === 'primary'   ? 'btn btn-primary'
                : btn.variant === 'danger'    ? 'btn btn-danger'
                : btn.variant === 'ghost'     ? 'btn btn-ghost'
                : 'btn btn-secondary';
      const style = btn.align === 'left' ? ' style="margin-right:auto"' : '';
      return `<button type="button" class="${cls}"${style} data-cm-btn="${i}">${btn.label}</button>`;
    }).join('');

    const panelOverflow = this._overflowBody === 'visible' ? 'overflow:visible;' : '';
    const bodyOverflow  = this._overflowBody !== 'auto'    ? `overflow:${this._overflowBody};` : '';

    overlay.innerHTML = `
      <div class="cm-panel" style="width:min(${this._width / 16}rem,100%);${panelOverflow}">
        <div class="cm-header">
          ${iconHtml}
          <div class="cm-title-wrap">
            <div class="cm-title">${this._title}</div>
            ${subtitleHtml}
          </div>
          <button type="button" class="cm-close" data-cm-close>
            <svg data-lucide="x"></svg>
          </button>
        </div>
        <div class="cm-body" style="${bodyOverflow}">${this._content}</div>
        ${buttonsHtml ? `<div class="cm-footer">${buttonsHtml}</div>` : ''}
      </div>
    `;

    overlay.querySelector('[data-cm-close]')
      .addEventListener('click', () => this.close());

    if (this._closeOnBackdrop) {
      let _mdOnOverlay = false;
      overlay.addEventListener('mousedown', (e) => { _mdOnOverlay = e.target === overlay; });
      overlay.addEventListener('click', (e) => { if (e.target === overlay && _mdOnOverlay) this.close(); });
    }

    this._buttons.forEach((btn, i) => {
      const el = overlay.querySelector(`[data-cm-btn="${i}"]`);
      if (el) el.addEventListener('click', () => btn.onClick && btn.onClick(this));
    });
  }
}
