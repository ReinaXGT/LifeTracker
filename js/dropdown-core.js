/**
 * CustomDropdown — Merkezi Dropdown Sistemi (Portal mimarisi)
 *
 * Portal mimarisi: .dd-menu her zaman document.body içinde yaşar.
 * Açıldığında getBoundingClientRect() ile tetikleyici butonun viewport
 * koordinatları alınır; position:fixed ile body üzerinde konumlandırılır.
 * Bu sayede overflow:hidden olan kart, modal veya herhangi bir konteyner
 * dropdown'ı kırpamaz — menü daima en üst derinlik katmanında görünür.
 *
 * Toggle düzeltmesi: _build() listener'ı capture phase + stopImmediatePropagation
 * ile lazy-init kalıbındaki çift-toggle hatasını engeller.
 *
 * Yeni özellikler (v2):
 *   - onOpen(instance)        — menü açılmadan önce çağrılır (items güncelleme için ideal)
 *   - renderItem(item,active) — tüm öğeler için özel iç HTML üretici
 *   - item.renderItem         — tek öğeye özel iç HTML üretici (global olanı ezer)
 *   - emptyHtml               — boş liste için özel HTML (emptyMsg yerine)
 *   - setEmptyHtml(html)      — dinamik olarak boş state HTML'ini günceller
 *   - item.noSelect           — tıklanabilir değil (emoji/uyarı panelleri için)
 *   - Detached instance temizliği (settings modal yeniden render gibi durumlar için)
 *
 * Temel kullanım:
 *   const dd = new CustomDropdown({
 *     btn:      'myBtnId',
 *     items: [
 *       { value: 'opt1', label: 'Seçenek 1' },
 *       { value: 'opt2', label: 'Seçenek 2', active: true },
 *       { separator: true },
 *       { value: 'opt3', label: 'Renkli',    color: '#f472b6' },
 *       { header: 'Grup Başlığı' },
 *     ],
 *     onSelect: (value, item) => console.log(value),
 *     align:    'left',   // 'left' | 'right'
 *   });
 *
 * Item şeması:
 *   { value, label }                        — temel öğe
 *   { value, label, active: true }          — seçili öğe (checkmark + vurgu)
 *   { value, label, color: '#hex' }         — renk noktası
 *   { value, label, badge: '₺' }            — kısa badge (para birimi, dil kodu)
 *   { value, label, badge2: 'TRY' }         — ikinci badge (para kodu)
 *   { value, label, icon: 'lucide-name' }   — Lucide ikon
 *   { value, label, renderItem: fn }        — öğeye özel iç HTML üretici
 *   { value, ..., noSelect: true }          — tıklanamaz (emoji/uyarı paneli)
 *   { separator: true }                     — ayırıcı çizgi
 *   { header: 'Metin' }                     — grup başlığı
 */

(function () {

  /* ── Global registry ── */
  const _registry = new Set();
  let   _globalBound = false;

  function _bindGlobal() {
    if (_globalBound) return;
    _globalBound = true;

    /* Click-outside — capture phase: modal stopPropagation'ını atlatır.
       Portal mimarisinde menü body'de olduğundan hem wrapper hem menü kontrol edilir. */
    document.addEventListener('click', function (e) {
      if (!e.target) return;
      _registry.forEach(function (dd) {
        if (!dd._wrapper || !dd._wrapper.isConnected) {
          dd._open = false;
          _registry.delete(dd);
          return;
        }
        if (dd._open &&
            !dd._wrapper.contains(e.target) &&
            !(dd._menu && dd._menu.contains(e.target))) {
          dd.close();
        }
      });
    }, true);

    /* Scroll veya resize → tüm açık dropdown'ları kapat.
       keepOpenOnScroll:true olan instance'lar scroll'da kapanmaz; pozisyonları güncellenir.
       Menünün kendi içinde kaydırılması (scroll sonuna gelince devam) dropdown'ı kapatmaz. */
    window.addEventListener('scroll', function (e) {
      _registry.forEach(function (dd) {
        if (!dd._open) return;
        if (dd._menu && dd._menu.contains(e.target)) return;
        if (dd._keepOpenOnScroll) {
          dd._positionMenu();
        } else {
          dd.close();
        }
      });
    }, true);
    window.addEventListener('resize', function () {
      _registry.forEach(function (dd) { if (dd._open) dd.close(); });
    });
  }

  /* ── Checkmark SVG ── */
  const CHECKMARK = '<svg class="dd-item-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  /* ─────────────────────────────────────────
     CustomDropdown sınıfı
  ───────────────────────────────────────── */
  class CustomDropdown {
    /**
     * @param {object}            opts
     * @param {string|Element}    opts.btn          — Tetikleyici buton
     * @param {Array}             [opts.items]      — Menü öğeleri
     * @param {Function}          [opts.onSelect]   — (value, item) => void
     * @param {Function}          [opts.onOpen]     — (instance) => void  (menü açılmadan önce)
     * @param {Function}          [opts.renderItem] — (item, isActive) => innerHtml
     * @param {'left'|'right'}    [opts.align]
     * @param {number}            [opts.minWidth]
     * @param {number}            [opts.maxHeight]
     * @param {string}            [opts.emptyMsg]   — Boş liste kısa mesajı
     * @param {string}            [opts.emptyHtml]  — Boş liste özel HTML (emptyMsg'yi ezer)
     */
    constructor(opts) {
      opts = opts || {};
      this._btn        = typeof opts.btn === 'string' ? document.getElementById(opts.btn) : opts.btn;
      this._items      = opts.items      || [];
      this._onSelect        = opts.onSelect        || null;
      this._onOpen          = opts.onOpen          || null;
      this._onClose         = opts.onClose         || null;
      this._keepOpenOnScroll = opts.keepOpenOnScroll || false;
      this._renderItem = opts.renderItem || null;
      this._align      = opts.align      || 'left';
      this._minWidth   = opts.minWidth   || null;
      this._maxHeight  = opts.maxHeight  || 300;
      this._emptyMsg   = opts.emptyMsg   || '';
      this._emptyHtml  = opts.emptyHtml  || '';
      this._open       = false;
      this._menu       = null;
      this._wrapper    = null;
      this._activeVal  = null;

      const active = this._items.find(function (i) { return i.active; });
      if (active) this._activeVal = String(active.value ?? '');

      if (!this._btn) { console.warn('CustomDropdown: btn bulunamadı'); return; }
      this._build();
      _bindGlobal();
      _registry.add(this);
    }

    /* ── DOM kurulumu ── */
    _build() {
      const btn = this._btn;

      // Butonu .dd-wrapper içine al (ya da mevcut wrapper'ı kullan)
      if (btn.parentElement && btn.parentElement.classList.contains('dd-wrapper')) {
        this._wrapper = btn.parentElement;
      } else {
        const wrapper = document.createElement('div');
        wrapper.className = 'dd-wrapper';
        wrapper.style.cssText = 'display:inline-flex;flex-shrink:0;overflow:visible;position:relative;';
        btn.parentNode.insertBefore(wrapper, btn);
        wrapper.appendChild(btn);
        this._wrapper = wrapper;
      }

      /* Portal: menü doğrudan body'e eklenir.
         Böylece hiçbir ebeveynin overflow:hidden'ı menüyü kırpamaz.
         Konum open() içinde getBoundingClientRect() ile hesaplanır. */
      const menu = document.createElement('div');
      menu.className = 'dd-menu';
      if (this._maxHeight) menu.style.maxHeight = this._maxHeight + 'px';
      document.body.appendChild(menu);
      this._menu = menu;

      /* Capture phase + stopImmediatePropagation:
         Lazy-init kalıbında butonun hem onclick attribute'ü hem de bu listener
         toggle() çağırırdı → çift toggle → menü kapanmıyordu.
         Capture, onclick (bubble) öncesinde ateşlenir; stopImmediatePropagation
         onclick'in çalışmasını engeller → tek toggle garantisi.
         İlk tıklamada bu listener henüz eklenmediğinden onclick normal çalışır. */
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.toggle();
      }, true);

      this._renderItems();
    }

    /* ── Viewport koordinatı hesapla ve menüyü konumlandır ── */
    _positionMenu() {
      const rect     = this._btn.getBoundingClientRect();
      const approxH  = Math.min(this._maxHeight, this._items.length * 40 + 8);
      const minW     = this._minWidth ? Math.max(this._minWidth, rect.width) : rect.width;

      // Aşağıda yer yok ve yukarıda yer varsa yukarı aç
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < approxH + 8 && rect.top > approxH + 8;

      this._menu.style.position = 'fixed';
      this._menu.style.zIndex   = '1100'; // modal (1000) üstünde, toast (2000) altında
      this._menu.style.minWidth = minW + 'px';

      if (openUpward) {
        this._menu.classList.add('dd-align-top');
        this._menu.style.top    = 'auto';
        this._menu.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
      } else {
        this._menu.classList.remove('dd-align-top');
        this._menu.style.top    = (rect.bottom + 4) + 'px';
        this._menu.style.bottom = 'auto';
      }

      if (this._align === 'right') {
        this._menu.style.left  = 'auto';
        this._menu.style.right = Math.max(4, window.innerWidth - rect.right) + 'px';
      } else {
        // Sağa taşmayı önlemek için viewport sınırına yakıştır
        const left = Math.max(4, Math.min(rect.left, window.innerWidth - minW - 4));
        this._menu.style.left  = left + 'px';
        this._menu.style.right = 'auto';
      }
    }

    /* ── Öğeleri render et ── */
    _renderItems() {
      if (!this._menu) return;

      if (!this._items.length) {
        if (this._emptyHtml) {
          this._menu.innerHTML = this._emptyHtml;
        } else if (this._emptyMsg) {
          this._menu.innerHTML = '<div class="dd-empty">' + this._emptyMsg + '</div>';
        } else {
          this._menu.innerHTML = '';
        }
        return;
      }

      this._menu.innerHTML = this._items.map((it) => {
        if (it.separator) return '<div class="dd-sep"></div>';
        if (it.header != null) return '<div class="dd-header">' + it.header + '</div>';

        const isActive = it.active || (this._activeVal !== null && String(it.value ?? '') === this._activeVal);
        const cls = 'dd-item' + (isActive ? ' is-active' : '') + (it.noSelect ? ' dd-item-noop' : '');

        const renderFn = it.renderItem || this._renderItem;
        let inner = '';

        if (renderFn) {
          inner = renderFn(it, isActive);
        } else {
          // Varsayılan render sırası: prefix → color → icon → label → badge2 → badge → checkmark
          if (it.prefix) inner += it.prefix;
          if (it.color)  inner += '<span class="dd-item-dot" style="background:' + it.color + '"></span>';
          if (it.icon)   inner += '<svg class="dd-item-icon" data-lucide="' + it.icon + '"></svg>';
          inner += '<span class="dd-item-label">' + (it.label || '') + '</span>';
          if (it.badge2) inner += '<span class="dd-item-badge" style="margin-right:2px">' + it.badge2 + '</span>';
          if (it.badge)  inner += '<span class="dd-item-badge">' + it.badge + '</span>';
          inner += CHECKMARK;
        }

        return '<div class="' + cls + '" data-dd-value="' + String(it.value ?? '') + '">' + inner + '</div>';
      }).join('');

      this._menu.querySelectorAll('.dd-item:not(.dd-item-noop)').forEach((el) => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const val  = el.dataset.ddValue;
          const item = this._items.find((i) => !i.separator && !i.header && String(i.value ?? '') === val);
          if (!item || item.noSelect) return;
          this._activeVal = val;
          this._renderItems();
          this._onSelect && this._onSelect(val, item);
          // Seçim sonrası buton içeriği animasyonlu belirir
          this._btn.classList.remove('dd-btn-selected');
          void this._btn.offsetWidth;
          this._btn.classList.add('dd-btn-selected');
          this._btn.addEventListener('animationend', () => {
            this._btn.classList.remove('dd-btn-selected');
          }, { once: true });
          this.close();
        });
      });

      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ nodes: [this._menu] });
      }
    }

    /* ─────────────────────────────────────────
       Genel API
    ───────────────────────────────────────── */

    /** Açma/kapama toggle. */
    toggle() { this._open ? this.close() : this.open(); }

    /** Dropdown'ı aç. */
    open() {
      // Detach olmuş instance'ları temizle + diğerlerini kapat
      _registry.forEach((dd) => {
        if (!dd._wrapper || !dd._wrapper.isConnected) { dd._open = false; _registry.delete(dd); return; }
        if (dd !== this && dd._open) dd.close();
      });

      // onOpen callback: items güncellenmesi için ideal nokta (konumlandırmadan önce)
      if (this._onOpen) this._onOpen(this);

      if (this._menu) {
        this._positionMenu();
        this._menu.classList.add('is-open');
      }
      this._open = true;
    }

    /** Dropdown'ı kapat. */
    close() {
      if (this._menu) this._menu.classList.remove('is-open');
      this._open = false;
      if (this._onClose) this._onClose(this);
    }

    /**
     * Öğeleri güncelle.
     * @param {Array} items
     */
    setItems(items) {
      this._items = items || [];
      const stillValid = this._items.some((i) => !i.separator && !i.header && String(i.value ?? '') === this._activeVal);
      if (!stillValid) this._activeVal = null;
      this._renderItems();
    }

    /**
     * Boş liste için özel HTML'i ayarla.
     * @param {string} html
     */
    setEmptyHtml(html) {
      this._emptyHtml = html || '';
    }

    /**
     * Aktif değeri programatik ayarla (onSelect tetiklenmez).
     * @param {string|null} value
     */
    setValue(value) {
      this._activeVal = value !== null && value !== undefined ? String(value) : null;
      this._renderItems();
    }

    /** Aktif değeri döner. */
    getValue() { return this._activeVal; }

    /** Instance'ı yok et ve DOM'dan kaldır. */
    destroy() {
      _registry.delete(this);
      // Portal menüsünü body'den temizle
      if (this._menu && this._menu.parentNode) this._menu.remove();
      // Wrapper'ı kaldır, butonu yerine geri koy
      if (this._wrapper && this._btn) {
        if (this._wrapper.parentNode) {
          this._wrapper.parentNode.insertBefore(this._btn, this._wrapper);
        }
        this._wrapper.remove();
      }
      this._menu    = null;
      this._wrapper = null;
    }
  }

  /* ─────────────────────────────────────────
     Auto-init: HTML data-attribute paterni
     Kullanım:
       <div class="dd-wrapper">
         <button data-dropdown-trigger data-dropdown-target="myMenu">...</button>
         <div id="myMenu" class="dd-menu">
           <div class="dd-item" data-dd-value="opt1"><span class="dd-item-label">Seçenek 1</span></div>
         </div>
       </div>
  ───────────────────────────────────────── */
  function _autoInit() {
    document.querySelectorAll('[data-dropdown-trigger]').forEach(function (btn) {
      if (btn._ddAutoInit) return;
      btn._ddAutoInit = true;

      const targetId = btn.dataset.dropdownTarget;
      if (!targetId) return;
      const menu = document.getElementById(targetId);
      if (!menu) return;

      const wrapper = btn.closest('.dd-wrapper') || btn.parentElement;

      const instance = {
        _open: false,
        _wrapper: wrapper,
        _menu: menu,
        toggle() { this._open ? this.close() : this.open(); },
        open() {
          _registry.forEach((dd) => {
            if (!dd._wrapper || !dd._wrapper.isConnected) { dd._open = false; _registry.delete(dd); return; }
            if (dd !== instance && dd._open) dd.close();
          });
          menu.classList.add('is-open');
          this._open = true;
        },
        close() { menu.classList.remove('is-open'); this._open = false; },
        destroy() { _registry.delete(instance); },
      };

      _registry.add(instance);
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        instance.toggle();
      });
    });
  }

  /* ── Global yayın ── */
  window.CustomDropdown = CustomDropdown;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _autoInit);
  } else {
    _autoInit();
  }

})();
