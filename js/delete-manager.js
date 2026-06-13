/**
 * DeleteManager — Merkezi Silme Yöneticisi
 *
 * Kullanım: DeleteManager.confirm({ module, title, message, confirmLabel, onConfirm })
 *
 * localStorage anahtarı: lt_hide_delete_{module}_{YYYYMMDD}
 * Anahtar varsa modal açılmadan onConfirm doğrudan çalışır.
 * Yoksa CustomModal açılır; kullanıcı "Bugün bir daha sorma" checkbox'ını
 * işaretleyip onaylarsa anahtar yazılır.
 *
 * Gereksinimler: modal-core.js, ui.js
 */

const DeleteManager = (() => {
  function _key(module) {
    return 'lt_hide_delete_' + module + '_' + UI.today().replace(/-/g, '');
  }

  function confirm({ module = '', title, message, confirmLabel, onConfirm } = {}) {
    if (localStorage.getItem(_key(module)) === '1') {
      onConfirm && onConfirm();
      return;
    }

    const rowId = 'dm-row-' + Date.now();

    const modal = new CustomModal({
      title:   title || UI.t('btn_delete'),
      icon:    'trash-2',
      variant: 'danger',
      content: (message ? `<p style="margin:0 0 1rem;font-size:0.8125rem;color:var(--text-secondary);line-height:1.6">${message}</p>` : '') +
               `<div id="${rowId}" style="display:flex;align-items:center;gap:0.625rem;cursor:pointer;user-select:none;width:100%">
                  ${CheckboxCore.html({ done: false, type: 'sm', color: 'var(--red)', extraClass: 'cbx-bordered' })}
                  <span style="font-size:0.8125rem;color:var(--text-secondary);line-height:1.4;flex:1">${UI.t('dm_noask_today')}</span>
                </div>`,
      width:   400,
      zIndex:  9000,
      buttons: [
        { label: UI.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
        { label: confirmLabel || UI.t('btn_delete'), variant: 'danger', onClick: m => {
            const r = document.getElementById(rowId);
            if (r && CheckboxCore.isChecked(r.querySelector('.cbx'))) localStorage.setItem(_key(module), '1');
            m.close();
            onConfirm && onConfirm();
        }},
      ],
    });
    modal.open();
    const row = document.getElementById(rowId);
    if (row) row.addEventListener('click', () => { CheckboxCore.toggle(row.querySelector('.cbx')); });
  }

  return { confirm };
})();
