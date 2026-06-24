const UI = {
  VERSION: 'v2.0',

  MONTHS_SHORT: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  MONTHS_LONG: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  DAYS: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],

  MONTHS_SHORT_EN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  MONTHS_LONG_EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  DAYS_EN: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  MONTHS_SHORT_ZH: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  MONTHS_LONG_ZH: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  DAYS_ZH: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],

  MONTHS_SHORT_ES: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  MONTHS_LONG_ES: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  DAYS_ES: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],

  MONTHS_SHORT_FR: ['jan.', 'fév.', 'mar.', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sep.', 'oct.', 'nov.', 'déc.'],
  MONTHS_LONG_FR: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  DAYS_FR: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],

  // ── i18n dictionary ──────────────────────────────────────
  _i18n: {
    tr: {
      // UI chrome
      settings_title: 'Ayarlar',
      settings_lang: 'Dil',
      settings_lang_tr: 'Türkçe',
      settings_lang_en: 'İngilizce',
      settings_lang_zh: 'Çince',
      settings_lang_es: 'İspanyolca',
      settings_lang_fr: 'Fransızca',
      settings_currency: 'Kullandığınız para birimi',
      settings_ui_scale: 'Arayüz Ölçeği',
      settings_tab_ui: 'Arayüz',
      settings_tab_panels: 'Paneller',
      settings_panels_hint: 'Seçili modülleri gizleyin — veriler korunur, yalnızca arayüzden kaldırılır.',
      btn_hide: 'Gizle',
      btn_show: 'Göster',
      settings_theme: 'Tema Modu',
      settings_theme_dark: 'Karanlık',
      settings_theme_midnight: 'Gece Yarısı',
      settings_theme_ocean: 'Okyanus',
      settings_theme_forest: 'Orman',
      settings_theme_sunset: 'Gün Batımı',
      settings_theme_rose: 'Gül',
      settings_theme_amber: 'Kehribar',
      settings_theme_crimson: 'Kızıl',
      settings_theme_nebula: 'Nebula',
      settings_theme_arctic: 'Arktik',
      settings_theme_neon: 'Neon',
      settings_theme_white: 'Beyaz',
      settings_data_title: 'Veri Yönetimi',
      settings_export_btn: 'Dışa Aktar',
      settings_export_desc: 'Tüm verilerini JSON dosyası olarak indir.',
      settings_import_btn: 'İçe Aktar',
      settings_import_title: 'Veri İçe Aktar',
      settings_import_desc: 'Daha önce dışa aktarılan JSON dosyasını yükle.',
      settings_import_confirm: 'Mevcut tüm veriler yeni dosyadaki verilerle değiştirilecek. Devam edilsin mi?',
      settings_import_ok: 'Veriler başarıyla yüklendi.',
      settings_import_err: 'Geçersiz dosya formatı.',
      settings_delete_btn: 'Tüm Verileri Sil',
      settings_delete_title: 'Tüm Verileri Sil',
      settings_delete_msg: 'Tüm verilerinizi — bütçe, plan, alışkanlık, yatırım, API anahtarları ve ayarlar — kalıcı olarak silmek üzeresiniz. Bu işlem <strong>geri alınamaz</strong>.',
      settings_delete_confirm: '⚠️ DİKKAT\n\nTüm verilerinizi (bütçe, plan, alışkanlık, yatırım, API anahtarları…) kalıcı olarak silmek üzeresiniz.\n\nBu işlem geri alınamaz. Onaylıyor musunuz?',
      settings_delete_ok: 'Tüm veriler silindi.',
      seed_warning_label: 'Demo Veri Aktif',
      seed_warning_desc: 'Sisteme geçici örnek veriler yüklü — Ayarlar\'dan temizleyip kendi verilerinizi girin',
      settings_delete_choice_title: 'Veri Sil',
      settings_delete_choice_subtitle: 'Nasıl sıfırlamak istediğinizi seçin:',
      settings_delete_reset_label: 'Demo\'ya Sıfırla',
      settings_delete_reset_desc: 'Kişisel verileriniz silinir, demo verileri geri yüklenir. Paneller dolu görünmeye devam eder.',
      settings_delete_reset_btn: 'Demo\'ya Sıfırla',
      settings_delete_wipe_label: 'Her Şeyi Sil',
      settings_delete_wipe_desc: 'Tüm veriler — kullanıcı verileri ve demo verileri — tamamen silinir. Uygulama boş başlar.',
      settings_delete_wipe_btn: 'Her Şeyi Sil',
      settings_delete_wipe_confirm: 'Tüm veriler (demo dahil) kalıcı olarak silinecek. Onaylıyor musunuz?',
      settings_delete_wipe_ok: 'Tüm veriler silindi.',
      settings_delete_reset_ok: 'Demo verilerine sıfırlandı.',
      settings_api_title: 'API Anahtarları',
      settings_api_hint: 'Yatırım modülü canlı fiyat verisi için gerekli.',
      settings_api_av: 'Alpha Vantage (Hisse, ETF, Kripto)',
      settings_api_fx: 'Exchange Rates (Döviz kuru)',
      settings_api_save: 'Anahtarları Kaydet',
      settings_api_saved: 'API anahtarları kaydedildi.',
      settings_update_rates: 'Kurları Güncelle',
      settings_update_rates_title: 'Tüm döviz kurlarını şimdi çek',
      panel_manager_title: 'Panel Görünürlüğü',
      panel_on: 'Açık',
      panel_off: 'Kapalı',
      panel_empty: 'Bu sayfada yönetilebilir panel yok.',
      privacy_show: 'Değerleri göster',
      privacy_hide: 'Değerleri gizle',
      sidebar_settings: 'Ayarlar',
      sidebar_help: 'Yardım',
      sidebar_privacy: 'Gizlilik',
      sidebar_toggle: 'Menüyü Daralt / Genişlet',
      priority_high: 'Yüksek',
      priority_medium: 'Orta',
      priority_low: 'Düşük',
      hours_suffix: 's',
      mins_suffix: 'dk',
      secs_suffix: 'sn',

      // nav & topbar labels
      nav_dashboard: 'Dashboard',
      nav_pomodoro: 'Odaklanma Modu',
      nav_time: 'Zaman Takibi',
      nav_habits: 'Alışkanlıklar',
      nav_plans: 'Planlar',
      nav_goals: 'Hayaller & Hedefler',
      nav_budget: 'Bütçe',
      nav_investments: 'Yatırım',

      // days (short)
      day_mon: 'Pzt', day_tue: 'Sal', day_wed: 'Çar',
      day_thu: 'Per', day_fri: 'Cum', day_sat: 'Cmt', day_sun: 'Paz',

      // Dashboard
      dash_net_worth: 'NET VARLIK',
      dash_today_spent: 'BUGÜN HARCANAN',
      dash_habits_done: 'TAMAMLANAN ALIŞKANLIKLAR',
      dash_active_goals: 'AKTİF HEDEFLER',
      dash_habits_pct: '%{0} bugün',
      dash_goals_of: '{0} hedeften',
      dash_net_worth_change: 'yatırım + mevduat + bütçe',
      dash_nw_inv: 'Yatırım',
      dash_nw_dep: 'Mevduat',
      dash_nw_bud: 'Bütçe',
      dash_over_limit: 'limit aşıldı',
      dash_in_limit: 'limit dahilinde',
      dash_budget_total: 'TOPLAM BÜTÇE',
      dash_completion_rate: 'TAMAMLANMA ORANI',
      dash_avg_progress: 'ORT. İLERLEME',
      dash_no_plans: 'Yaklaşan plan yok',
      dash_today: 'Bugün',
      dash_tomorrow: 'Yarın',
      dash_no_assets: 'Portföyde varlık yok',
      dash_no_sessions: 'Henüz oturum yok',
      dash_n_more: '+{0} daha',
      dash_today_sessions: 'Bugün Pomodoro',
      dash_week_total: 'Bu Hafta',
      dash_focused: 'odaklandı',
      dash_focus_month: 'Bu Ay',
      dash_focus_streak: 'Günlük Seri',
      dash_focus_streak_days: '{0} gün',
      dash_focus_cats_week: 'Bu Hafta Kategoriler',
      dash_focus_no_logs: 'Henüz zaman kaydı yok',
      dash_recent_tasks: 'Son Görevler',
      dash_no_goals: 'Henüz hayal yok',
      dash_in_progress: 'Devam Eden',
      dash_completed: 'Tamamlanan',
      dash_no_spending: 'Harcama verisi yok',
      dash_no_workouts: 'Henüz antrenman yok',
      dash_gym_week_dur: 'Bu Hafta Süre',
      dash_gym_streak_lbl: 'Seri',
      dash_gym_exercises: 'egzersiz',
      dash_surplus: 'artı',
      dash_over: 'aşım',
      dash_hour_label: 'Saat',
      asset_stock: 'Hisse',
      asset_stock_us: 'ABD Hissesi',
      asset_stock_other: 'Diğer Borsa Hissesi',
      asset_etf: 'ETF',
      asset_crypto: 'Kripto',
      asset_commodity: 'Emtia',
      asset_bond: 'Tahvil',
      asset_cash: 'Nakit',

      // Plans
      plans_todo: 'YAPILACAK',
      plans_progress: 'DEVAM EDEN',
      plans_done: 'TAMAMLANDI',
      plans_kpi_pending: 'bekleyen görev',
      plans_kpi_ongoing: 'süren görev',
      plans_kpi_from_total: '{0} toplamdan',
      plans_no_tasks: 'Görev yok',
      plans_start: 'Başlat',
      plans_complete: 'Bitir',
      plans_title_col: 'BAŞLIK',
      plans_due_col: 'TARİH',
      plans_cat_col: 'KATEGORİ',
      plans_status_col: 'DURUM',
      plans_priority_col: 'ÖNCELİK',
      plans_added: 'Plan eklendi',
      plans_updated: 'Plan güncellendi',
      plans_deleted: 'Plan silindi',
      plans_confirm_delete: 'Bu planı silmek istediğinizden emin misiniz?',
      plans_edit_modal: 'Planı Düzenle',
      plans_subtasks: 'Alt Planlar',
      plans_subtask_placeholder: 'Alt plan ekle...',
      plans_subtask_count: '{0}/{1} tamamlandı',
      plans_no_subtasks: 'Henüz alt plan yok',
      plans_confirm_delete_sub: 'Bu alt planı silmek istediğinizden emin misiniz?',
      status_todo: 'Yapılacak',
      status_progress: 'Devam Ediyor',
      status_done: 'Tamamlandı',

      // Time
      time_today_kpi: 'BUGÜN',
      time_week_kpi: 'BU HAFTA',
      time_month_kpi: 'BU AY',
      time_focus_pct: '⏱ %{0} odak',
      time_total_dur: 'toplam süre',
      time_last7: 'son 7 gün',
      time_last30: 'son 30 gün',
      time_duration_label: 'Süre',
      time_no_logs: 'Henüz log yok',
      time_auto_end: '⏱ Otomatik',
      time_history_title: 'Günlük Dağılım: {0}',
      time_min_suffix: 'dk',
      time_date_col: 'TARİH',
      time_category_col: 'KATEGORİ',
      time_project_col: 'PROJE',
      time_start_col: 'BAŞLANGIC',
      time_end_col: 'BİTİŞ',
      time_dur_col: 'SÜRE',

      // Habits
      habits_no_habits: 'Henüz alışkanlık yok.',
      habits_no_day_selected: 'Gün seçilmemiş',
      habits_daily: 'Kalıcı — her gün',
      habits_edit: 'Düzenle',
      habits_delete: 'Sil',
      habits_skip: 'Bugün Atla',
      habits_unskip: 'Geri Al',
      habits_skipped_section: 'Bugün Yapılmayacaklar',
      habits_all_done: 'Tüm alışkanlıklar tamamlandı!',
      habits_none_today: 'Bugün için alışkanlık yok.',
      habits_total: 'TOPLAM ALIŞKANLIK',
      habits_today_kpi: 'BUGÜN',
      habits_streak_best: 'EN UZUN SERİ',
      habits_completed_label: 'Tamamlanan',
      habits_remaining_label: 'Kalan',
      habits_week_title: 'Hafta',
      habits_week_n: 'HAFTA {0}',
      habits_30_day: '30 Günlük Geçmiş',
      habits_older: '← daha eski',
      habits_today_arrow: 'bugün →',
      habits_habit_col: 'Alışkanlık',
      habits_pct_col: '%',
      habits_time_badge: 'Zam.',
      habits_added: 'Alışkanlık eklendi',
      habits_deleted: 'Alışkanlık silindi',
      habits_confirm_delete: 'Bu alışkanlığı silmek istediğinizden emin misiniz?',
      habits_current_streak: 'Güncel Seri',
      habits_best_streak: 'En İyi Seri',

      // Goals
      goals_active_kpi: 'AKTİF HEDEF',
      goals_avg_progress: 'ORT. İLERLEME',
      goals_total_kpi: 'TOPLAM HEDEF',
      goals_none: 'Henüz hedef eklenmedi...',
      goals_days_left: '{0} gün kaldı',
      goals_overdue: 'Süresi doldu',
      goals_update_progress: 'İlerleme Güncelle',
      goals_progress_prompt: 'Yeni ilerleme yüzdesi (0-100):',
      goals_added: 'Hedef eklendi',
      goals_updated: 'Hedef güncellendi',
      goals_deleted: 'Hedef silindi',
      goals_confirm_delete: 'Bu hedefi silmek istediğinizden emin misiniz?',
      goals_dream_added: 'Hayal eklendi',
      goals_dream_updated: 'Hayal güncellendi',
      goals_dream_deleted: 'Hayal silindi',
      goals_all_done: '🎉 Tüm adımlar tamamlandı!',
      goals_days_overdue: '{0} gün geçti',
      goals_ms_empty_card: 'Alt hedef yok — düzenlemeden ekle',
      goals_ms_empty_modal: 'Henüz alt hedef eklenmedi',
      goals_ms_confirm_del: 'Bu alt hedefi silmek istediğine emin misin?',
      goals_none_dreams: 'Henüz hayal eklenmedi',

      // Budget
      bud_income_kpi: 'GELİR',
      bud_expense_kpi: 'GİDER',
      bud_balance_kpi: 'KALAN BÜTÇE',
      bud_total_income: 'TOPLAM GELİR',
      bud_total_expense: 'TOPLAM GİDER',
      bud_kpi_pct_left: '%{0} bütçe kaldı',
      bud_kpi_over: '%{0} aşım',
      bud_budget_label: 'Bütçe',
      bud_actual_label: 'Gerçek',
      bud_income_label: 'GELİR',
      bud_expense_label: 'GİDER',
      bud_summary_title: 'Bütçe Özeti',
      bud_source_col: 'KAYNAK',
      bud_budget_col: 'BÜTÇE',
      bud_actual_col: 'GERÇEK',
      bud_usage_col: 'KULLANIM',
      bud_remaining_footer: 'KALAN',
      bud_no_groups: 'Henüz grup yok',
      bud_no_transactions: 'Henüz işlem yok',
      bud_type_income: 'Gelir',
      bud_type_expense: 'Gider',
      bud_surplus: 'artı',
      bud_over: 'aşım',
      bud_sub_count: '{0} alt kategori',
      bud_group_added: 'Grup eklendi',
      bud_group_deleted: 'Grup silindi',
      bud_trans_added: 'İşlem eklendi',
      bud_add_continue: 'Ekle ve Devam Et',
      bud_trans_deleted: 'İşlem silindi',
      bud_confirm_delete_group: 'Bu grubu ve tüm işlemlerini silmek istediğinizden emin misiniz?',
      bud_confirm_delete_trans: 'Bu işlemi silmek istediğinizden emin misiniz?',
      bud_panel_bar: 'Bütçe vs Gerçek',
      bud_panel_pie: 'Harcama Dağılımı',
      bud_panel_timeline: 'Gelir/Gider Trendi',
      bud_panel_daily: 'Ne Zaman Harcıyorum?',
      bud_daily_last30: 'Son 30 Gün',
      bud_daily_dist: 'Günlük Dağılım (7g)',
      bud_panel_subcats: 'Harcamam Nereye Gidiyor?',
      bud_panel_net_history: 'Net Tasarruf',
      bud_net_history_title: 'Net Tasarruf (Son {0} Ay)',
      bud_net_month: '{0}. Ay',
      bud_sub_col: 'ALT KATEGORİ',
      bud_perc_col: 'ORAN',
      bud_details: 'Detaylar',
      bud_daily_balance: 'BAKİYE',
      bud_daily_inc_col: 'TOPLAM GELİR',
      bud_daily_exp_col: 'TOPLAM GİDER',
      bud_panel_transactions: 'İşlemler',
      bud_desc_col: 'AÇIKLAMA',
      bud_date_col: 'TARİH',
      bud_group_col: 'GRUP',
      bud_amount_col: 'TUTAR',
      bud_type_col: 'TİP',

      // Investments
      inv_total_value: 'TOPLAM DEĞER',
      inv_total_cost: 'TOPLAM MALİYET',
      inv_pnl: 'KAR/ZARAR',
      inv_pnl_pct: 'GETİRİ %',
      inv_asset_label: 'VARLIK',
      inv_more_assets: 'varlık daha',
      inv_type_label: 'TÜR',
      inv_no_assets: 'Henüz varlık eklenmedi',
      inv_asset_added: 'Varlık eklendi',
      inv_asset_updated: 'Varlık güncellendi',
      inv_asset_deleted: 'Varlık silindi',
      inv_confirm_delete: 'Bu varlığı silmek istediğinizden emin misiniz?',
      inv_just_now: 'az önce',
      inv_sell: 'Sat',
      inv_sell_title: 'Varlık Sat',
      inv_sell_qty: 'Satış Miktarı',
      inv_buy_qty: 'Alım Miktarı',
      inv_sell_price: 'Satış Fiyatı',
      inv_sell_date: 'Satış Tarihi',
      inv_sell_preview: 'Tahmini K/Z',
      inv_sell_confirm: 'Sat',
      inv_sell_success: 'Varlık satıldı',
      inv_sell_err_qty: 'Geçersiz miktar',
      inv_sell_err_price: 'Geçersiz fiyat',
      inv_sell_max: 'mevcut',
      inv_realized_pnl: 'Gerçekleşmiş K/Z',
      inv_buy: 'Al',
      inv_buy_title: 'Alım Yap',
      inv_buy_confirm: 'Al',
      inv_buy_success: 'Alım kaydedildi',
      inv_buy_new_avg: 'Yeni Ort. Maliyet',
      inv_avg_cost: 'Ort. Maliyet',
      inv_select_asset: 'Varlık Seçin',
      inv_no_assets: 'Portföyde varlık yok',
      inv_trade_history: 'İşlem Geçmişi',
      inv_col_trade_type: 'İşlem',
      inv_col_trade_price: 'Fiyat',
      inv_trade_type_buy: 'Alım',
      inv_trade_type_sell: 'Satım',
      inv_no_trades: 'Henüz işlem yok',
      inv_edit_trade: 'İşlemi Düzenle',
      inv_delete_trade: 'İşlemi Sil',
      inv_trade_deleted: 'İşlem silindi',
      inv_trade_updated: 'İşlem güncellendi',
      inv_col_actions: 'İşlemler',
      inv_trade_action: 'Varlık Al/Sat',
      inv_trade_filter_all: 'Tarih',
      inv_tab_portfolio: 'Portföy',
      inv_tab_trades: 'İşlem Geçmişi',
      inv_history_btn: 'Geçmiş',
      inv_hist_tab_trades: 'İşlemler',
      inv_hist_tab_deposits: 'Mevduatlar',
      inv_dep_term_short: 'Vadeli',
      inv_dep_free_short: 'Vadesiz',
      inv_dep_type_label: 'Tür',
      inv_trade_search: 'Sembol, isim...',
      inv_trade_opt_new_desc: 'Portföyde olmayan yeni bir varlık ekle',
      inv_trade_opt_buy_desc: 'Mevcut varlıktan daha fazla al, ortalama maliyet güncellenir',
      inv_trade_opt_sell_desc: 'Mevcut varlığının bir kısmını veya tamamını sat',
      inv_mins_ago: '{0} dk önce',
      inv_hours_ago: '{0} sa önce',
      inv_days_ago: '{0} g önce',
      inv_manual: 'manuel',
      inv_period_1d: '1G',
      inv_period_1w: '1H',
      inv_period_1m: '1A',
      inv_period_3m: '3A',
      inv_period_6m: '6A',
      inv_period_1y: '1Y',

      // Pomodoro
      pomo_work: 'POMODORO',
      pomo_short: 'KISA MOLA',
      pomo_long: 'UZUN MOLA',
      pomo_flow: 'AKIŞ MODU',
      pomo_countdown: 'GERİ SAYIM',
      pomo_overtime: 'FAZLA MESAI',
      pomo_start: 'Başlat',
      pomo_resume: 'Devam Et',
      pomo_pause: 'Duraklat',
      pomo_reset: 'Sıfırla',
      pomo_session_saved: 'Seans kaydedildi — {0}',
      pomo_today_sessions: 'BUGÜN SEANSLAR',
      pomo_week_total: 'BU HAFTA TOPLAM',
      pomo_total_sessions: 'TOPLAM SEANS',
      pomo_flags: '{0} bayrak',
      pomo_flags_count: '{0} bayrak işaretlendi',
      pomo_flags_none: 'Bayrak yok',
      pomo_flow_save_desc: 'Son bayrak anına kadar {0} loglanır, sonrası yok sayılır.',
      pomo_flow_save_none: 'Bayrak olmadığı için hiçbir şey loglanmaz.',
      pomo_flow_hard_flow: "Hiçbir şey kaydetmez — sayacı 0:00'a döndürür.",
      pomo_flow_hard_count: 'Hiçbir şey kaydetmez — sayacı başa döndürür.',
      pomo_confirm_reset: 'Zamanlayıcıyı sıfırlamak istediğinizden emin misiniz?',
      pomo_confirm_del_todo: 'Bu görevi silmek istediğine emin misin?',
      pomo_add_sub_ph: 'Alt görev ekle...',
      pomo_mode_switch_title: 'Mod Değişikliği',
      pomo_mode_switch_msg: 'Mod değişikliği gerçekleştiriyorsunuz.',
      pomo_mode_switch_flags: 'Mod değişikliğinde kayıtlı bayraklar zaman takibine kaydedilir.',
      pomo_mode_switch_duration: 'Kaydedilecek süre: {0}',
      pomo_mode_switch_no_flags: 'Mevcut bayrağınız yok — mod değiştirirseniz süreniz sıfırlanacaktır.',
      pomo_mode_switch_confirm: 'Devam Et',
      pomo_mode_switch_dontask: 'Bugünlük bir daha sorma',
      pomo_toast_overtime: 'Süre doldu{0} ⚡ Hazır olunca Bitir\'e bas',
      pomo_toast_break_done: 'Mola bitti! Çalışmaya devam 💪',
      pomo_toast_countdown_done: 'Geri sayım tamamlandı! 🎯',
      pomo_flow_saved: 'Akış seansı kaydedildi — {0} 🌊',
      pomo_kpi_today: 'Bugün Tamamlanan',
      pomo_kpi_total: 'Toplam Seanslar',
      pomo_kpi_flow: 'Akış Süresi',
      pomo_kpi_streak: 'Günlük Seri',
      pomo_sessions_n: '{0} seans',
      pomo_days_n: '{0} gün',
      pomo_focus_sub: 'odaklanma',
      pomo_all_time: 'tüm zamanlar',
      pomo_today_sub: 'bugün',
      pomo_streak_sub: 'kesintisiz',
      pomo_vs_yday_more: 'dünden fazla',
      pomo_vs_yday_less: 'dünden az',
      pomo_vs_yday_none: 'dün veri yok',
      pomo_switch_running_label: 'Timer çalışıyor',
      pomo_task_switch_current: 'Mevcut görev',
      pomo_switch_no_today: 'Bugün bir daha sorma',
      pomo_todo_empty: 'Henüz görev yok. "Görev Ekle" butonuna bas.',
      pomo_todo_all_done: 'Tüm görevler tamamlandı!',
      pomo_task_added: 'Görev eklendi',
      pomo_task_updated: 'Görev güncellendi',
      pomo_task_select: 'Görev seç',
      pomo_no_tasks_today: 'Bugün için görev yok',
      pomo_todo_hint: 'Aşağıdaki yapılacaklar listesinden ekle',
      pomo_lap_split: 'Aralık',
      pomo_lap_total: 'Toplam',
      pomo_lap_time: 'Saat',
      pomo_flag_deleted: 'Bayrak silindi',
      pomo_flag_del_confirm_msg: 'Bu bayrak kalıcı olarak silinecek. Devam etmek istiyor musunuz?',
      pomo_flag_del_no_today: 'Bugünlük daha gösterme',
      pomo_subtasks_header: 'Alt Görevler',
      pomo_minute_n: '{0}. dakika',
      pomo_settings_close: 'Kapat',
      pomo_fullscreen: 'Tam Ekran',
      pomo_minimize: 'Küçült',
      pomo_task_switch: 'Görev Değiştir',
      pomo_switch_running_msg: 'Timer çalışıyor. Görevi değiştirirsen mevcut Pomodoro sayacı sıfırlanacak. Yine de devam etmek istiyor musun?',
      pomo_switch_elapsed_msg: 'Bu görev için zaman aktı. Değiştirirsen Pomodoro sayacı sıfırlanacak. Devam etmek istiyor musun?',
      pomo_switch_confirm_btn: 'Değiştir',
      pomo_btn_flow: 'Akış Modu',
      pomo_btn_pomodoro: 'Pomodoro',
      pomo_btn_countdown: 'Geri Sayım',
      pomo_btn_short: 'Kısa Mola',
      pomo_btn_long: 'Uzun Mola',
      pomo_btn_finish: 'Bitir',
      pomo_finish_confirm_title: 'Oturumu Bitir',
      pomo_finish_confirm_msg: 'Mevcut süreniz kaydedilecektir. Süre:',
      pomo_finish_select_msg: 'Nasıl bitirmek istediğinizi seçin:',
      pomo_finish_opt1_title: 'Mevcut Süreyi Kaydet',
      pomo_finish_opt1_desc: 'Süre {0} kaydedilecek ve oturum bitirilecek.',
      pomo_finish_opt2_title: 'Bayraklarla Bitir',
      pomo_finish_opt2_desc: 'Son bayrak anına kadar {0} loglanır ve oturum bitirilir.',
      pomo_finish_opt2_no_flags: 'Bayrak yok — önce bayrak ekleyin.',
      pomo_btn_flag: 'Bayrak',
      pomo_task_label: 'Çalışılacak Görev',
      pomo_todo_title: 'To-Do List',
      pomo_todo_subtitle: 'Günlük görevler',
      pomo_todo_done_count: 'tamamlandı',
      pomo_todo_add_btn: 'Görev Ekle',
      pomo_edit_task: 'Görevi Düzenle',
      pomo_todo_completed_section: 'Tamamlananlar',
      pomo_settings_pomo_tip: 'Her 4 pomodoro sonrası uzun mola başlar.',
      pomo_settings_countdown_tip: 'Ayarlar timer durdurulduğunda geçerli olur.',
      pomo_settings_fs_kpi: 'Bilgi Paneli',
      pomo_settings_duration: 'Süre',
      pomo_flow_reset_title: 'Sıfırlama Seçeneği',
      pomo_flow_reset_question: 'Ne yapmak istersiniz?',
      pomo_flow_opt1_title: 'Bayrakları Kaydet ve Sıfırla',
      pomo_flow_opt1_desc: 'Son bayrak anına kadar olan süreyi loglar, sonrasını yok sayar.',
      pomo_flow_opt2_title: 'Son Bayraktan Devam Et',
      pomo_flow_opt2_desc: 'Sayacı son bayrak anına geri çeker ve kaldığı yerden devam eder.',
      pomo_flow_opt3_title: 'Tam Sıfırla',
      pomo_flow_opt3_desc_flow: 'Hiçbir şey kaydetmez — sayacı 0:00\'a döndürür.',
      pomo_flow_opt3_desc: 'Hiçbir şey kaydetmez — sayacı başa döndürür.',
      pomo_flow_opt3_desc_count: 'Hiçbir şey kaydetmez — geri sayımı 00:00:00\'a döndürür.',
      pomo_new_todo_title: 'Yeni Görev',
      pomo_edit_todo_title: 'Görevi Düzenle',
      pomo_form_task: 'Görev',
      pomo_form_duration: 'Tahmini Süre',
      pomo_form_category: 'Kategori',
      pomo_form_note: 'Not',
      pomo_form_subtasks: 'Alt Görevler',
      pomo_form_add_subtask: 'Alt Görev Ekle',
      pomo_form_optional: '(opsiyonel)',
      pomo_form_minutes: 'dakika',
      pomo_exit_fullscreen: 'Küçült',
      pomo_short_break_label: 'Kısa Mola',
      pomo_long_break_label: 'Uzun Mola',
      pomo_cat_work: 'Çalışma',
      pomo_cat_learn: 'Öğrenme',
      pomo_cat_exercise: 'Egzersiz',
      pomo_cat_social: 'Sosyal',
      pomo_cat_sleep: 'Uyku',
      pomo_cat_other: 'Diğer',
      pomo_default_project: 'Serbest Akış',

      // Focus Widget
      fw_pause_resume: 'Duraklat / Devam Et',
      fw_add_flag: 'Bayrak Ekle',
      fw_stop: 'Durdur',
      fw_open_focus: 'Odaklanma Moduna Git',
      fw_paused: 'Duraklatıldı',

      // Pomodoro todo form
      pomo_task_text_label: 'Görev',
      pomo_est_duration: 'Tahmini Süre',
      pomo_pomodoro_count: 'Pomodoro Sayısı',
      lbl_optional: '(opsiyonel)',
      pomo_minutes_label: 'dakika',
      pomo_note_label: 'Not',
      pomo_subtasks_label: 'Alt Görevler',
      pomo_add_subtask_btn: 'Alt Görev Ekle',
      pomo_subtask_placeholder: 'Alt görev...',
      pomo_task_placeholder: 'Yapılacak iş...',
      pomo_note_placeholder: 'Ek açıklama...',
      time_project_placeholder: 'Proje adı (isteğe bağlı)',

      // Common buttons & labels
      btn_cancel: 'İptal',
      btn_back: '← Geri',
      btn_add: 'Ekle',
      btn_save: 'Kaydet',
      btn_edit: 'Düzenle',
      btn_delete: 'Sil',
      dm_noask_today: 'Bugün bir daha sorma',
      btn_details: 'Detaylar →',
      btn_all: 'Tümü →',
      lbl_title: 'Başlık',
      lbl_desc: 'Açıklama',
      lbl_category: 'Kategori',
      lbl_date: 'Tarih',
      lbl_priority: 'Öncelik',
      lbl_notes: 'Notlar',
      lbl_name: 'Ad',
      lbl_color: 'Renk',
      lbl_emoji: 'Emoji',
      lbl_type: 'Tür',
      lbl_amount: 'Tutar',
      lbl_all: 'Tümü',
      lbl_manual: 'Manuel',
      lbl_project: 'Proje',
      lbl_optional: '(opsiyonel)',
      lbl_status: 'Durum',

      // Plans modals/UI
      plans_add_modal: 'Yeni Plan',
      plans_add_btn: 'Plan Ekle',
      plans_kanban_view: 'Kanban',
      plans_list_view: 'Liste',
      plans_end_date: 'Bitiş Tarihi',
      plans_cat_project: 'Proje',
      plans_cat_education: 'Eğitim',
      plans_cat_finance: 'Finans',
      plans_cat_investment: 'Yatırım',
      plans_cat_personal: 'Kişisel',
      plans_cat_health: 'Sağlık',
      plans_cat_other: 'Diğer',
      plans_title_placeholder: 'Görev başlığı...',
      plans_notes_placeholder: 'Ek notlar...',
      plans_pri_high: 'Yüksek',
      plans_pri_medium: 'Orta',
      plans_pri_low: 'Düşük',

      // Time modals/UI
      time_add_modal: 'Log Ekle',
      time_history_modal: 'Geçmiş Görünüm',
      time_add_btn: 'Log Ekle',
      time_project_label: 'Proje / Aktivite',
      time_task_today: 'Bugünkü Görevler',
      time_task_other: 'Diğer Görevler',
      time_task_create: 'Görev Oluştur',
      time_task_required: 'Görev başlığı gereklidir',
      time_start_label: 'Başlangıç',
      time_end_label: 'Bitiş',
      time_panel_30day: 'Son 30 Gün',
      time_panel_daily: 'Günlük Dağılım (Son 7 Gün)',
      time_panel_logs: 'Zaman Logları',
      time_panel_weekly: 'Haftalık Özet',
      time_filter_all: 'Tümü',
      time_filter_manual: 'Manuel',
      time_filter_auto: '⏱ Otomatik',
      time_filter_date_placeholder: 'Tarih',
      cdp_range_hint: 'İkinci tarihi seçin',
      time_col_date: 'Tarih',
      time_col_category: 'Kategori',
      time_col_project: 'Proje',
      time_col_range: 'Saat Aralığı',
      time_col_duration: 'Süre',
      time_hist_subtitle: 'Aylık ve haftalık dağılım',
      time_prev_month: 'Önceki ay',
      time_hist_total: 'Toplam',
      time_hist_tab_summary: 'Özet',
      time_hist_tab_logs: 'Loglar',
      time_hist_active_days: 'Aktif Gün',
      time_hist_daily_avg: 'Günlük Ort.',
      time_hist_top_cat: 'En Çok',
      time_next_month: 'Sonraki ay',
      time_invalid_range: 'Geçerli bir saat aralığı girin',
      time_log_added: 'Log eklendi',
      time_log_deleted: 'Log silindi',
      time_del_confirm_msg: 'Bu zaman logu kalıcı olarak silinecek. Devam etmek istiyor musunuz?',
      time_del_no_today: 'Bugünlük daha gösterme',
      time_edit_modal: 'Log Düzenle',
      time_log_updated: 'Log güncellendi',

      // Habits modals/UI
      habits_add_modal: 'Yeni Alışkanlık',
      habits_manage_modal: 'Alışkanlıkları Yönet',
      habits_edit_modal: 'Alışkanlığı Düzenle',
      habits_add_btn: 'Alışkanlık Ekle',
      habits_name_label: 'Alışkanlık Adı',
      habits_icon_label: 'İkon (emoji)',
      habits_type_label: 'Tür',
      habits_days_label: 'Hangi günler?',
      habits_type_permanent: 'Kalıcı',
      habits_type_permanent_desc: 'Her gün otomatik görünür',
      habits_type_timed: 'Zamanlanmış',
      habits_type_timed_desc: 'Seçili günlerde görünür',
      habits_today_done: 'Bugün Tamamlanan',
      habits_week_success: 'Haftalık Başarı',
      habits_last7: 'son 7 gün',
      habits_streak_unit: 'kesintisiz',
      habits_add_link: 'Ekle →',
      habits_no_subs: 'Alt kategori yok.',
      habits_add_sub_btn: '+ Ekle',
      habits_min_one_day: 'En az bir gün seçin',
      habits_name_placeholder: 'örn: Sabah koşusu, Kitap okuma...',
      habits_weekly_progress: 'Haftalık İlerleme',
      habits_weekly_sub: 'Günlük tamamlama oranları',
      habits_updated: 'Alışkanlık güncellendi',

      // Goals modals/UI
      goals_add_modal: 'Yeni Hedef',
      goals_add_btn: 'Hedef Ekle',
      goals_target_date: 'Hedef Tarih',
      goals_new_modal: 'Yeni Hayal',
      goals_edit_modal: 'Hayali Düzenle',
      goals_delete_modal: 'Hayali Sil',
      goals_reorder: 'Sırayı Düzenle',
      goals_reorder_close: 'Düzenlemeyi Kapat',
      goals_category: 'Kategori',
      goals_emoji: 'Emoji',
      goals_color: 'Renk',
      goals_milestones: 'Alt Hedefler',
      goals_ms_placeholder: 'Alt hedef ekle...',
      goals_title_placeholder: 'Hayalini yaz...',
      goals_desc_placeholder: 'Detaylı açıklama...',
      goals_delete_confirm_q: 'Silmek istediğine emin misin?',
      goals_delete_yes: 'Evet, Sil',
      goals_edit_btn: 'Düzenle',
      goals_del_btn: 'Sil',
      goals_cat_kariyer: 'Kariyer',
      goals_cat_seyahat: 'Seyahat',
      goals_cat_saglik: 'Sağlık',
      goals_cat_egitim: 'Eğitim',
      goals_cat_kisisel: 'Kişisel',
      goals_cat_finansal: 'Finansal',

      // Budget modals/UI
      bud_add_trans_modal: 'Yeni İşlem',
      bud_add_group_modal: 'Yeni Kategori Grubu',
      bud_add_sub_modal: 'Alt Kategori Ekle',
      bud_group_name_label: 'Grup Adı',
      bud_sub_name_label: 'Alt Kategori Adı',
      bud_monthly_budget: 'Aylık Bütçe',
      bud_sub_cat_label: 'Alt Kategori',
      bud_amount_label: 'Tutar',
      bud_desc_label: 'Açıklama',
      bud_summary_tab: 'Özet',
      bud_groups_tab: 'Ana Kategoriler',
      bud_trans_tab: 'İşlem Takibi',
      bud_search: 'Ara...',
      bud_no_tx: 'Henüz işlem kaydı yok',
      bud_others: 'Diğer',
      bud_history_btn: 'Geçmiş',
      bud_history_title: 'Bütçe Geçmişi',
      bud_history_empty: 'Henüz tamamlanmış döngü yok',
      bud_history_no_data: 'Bu döngü için işlem verisi kaydedilmemiş',
      bud_history_cycle: 'Döngü',
      bud_history_add_tx: 'İşlem Ekle',
      bud_history_no_tx: 'Bu döngüde işlem kaydı yok',
      bud_cycle_settings_title: 'Bütçe Döngüsü',
      bud_cycle_start: 'Başlangıç',
      bud_cycle_end: 'Bitiş',
      bud_cycle_desc: 'Bitiş tarihi geçtiğinde işlemler arşivlenir; net bakiye grafik verisi olarak saklanır.',
      bud_cycle_saved: 'Döngü ayarları kaydedildi',
      bud_add_tx_btn: 'İşlem Ekle',
      bud_import_budget_btn: 'Veri Aktar',
      import_data_btn: 'Veri Aktar',
      import_data_confirm: 'Mevcut modül verileri silinecek ve dosyadaki verilerle değiştirilecek. Devam edilsin mi?',
      import_data_ok: 'Veriler başarıyla aktarıldı',
      import_data_err: 'Geçerli modül verisi bulunamadı',
      bud_import_budget_confirm: 'Mevcut bütçe verileri silinip dosyadaki verilerle değiştirilecek. Devam edilsin mi?',
      bud_import_budget_ok: 'Bütçe verileri başarıyla aktarıldı',
      bud_import_budget_err: 'Geçersiz dosya — bütçe verisi bulunamadı',
      bud_add_group_btn: 'Kategori Ekle',
      bud_edit_open: 'Panelleri Düzenle',
      bud_edit_close: 'Düzenlemeyi Kapat',
      bud_edit_tx_modal: 'İşlemi Düzenle',
      bud_edit_desc_label: 'Açıklama',
      bud_trans_panel: 'İşlem Takibi',
      bud_col_date: 'TARİH',
      bud_col_amount: 'TUTAR',
      bud_col_subcat: 'ALT KATEGORİ',
      bud_col_maincat: 'ANA KATEGORİ',
      bud_col_desc: 'AÇIKLAMA',

      bud_shrink_height: 'Yüksekliği Azalt',
      bud_grow_height: 'Yüksekliği Artır',
      bud_collapse: 'Daralt',
      bud_expand: 'Genişlet',
      bud_add_sub_for: '{0} — Alt Kategori Ekle',
      bud_net_balance: 'NET BAKİYE',
      bud_this_period: 'bu dönem',
      bud_positive: 'pozitif',
      bud_negative: 'negatif',
      bud_cat_name_prompt: 'Kategori adı:',
      bud_no_groups: 'Henüz kategori grubu yok.',
      bud_add_first_group: 'İlk Kategoriyi Ekle',
      bud_no_subs: 'Alt kategori yok.',
      bud_sub_count: '{0} alt kategori',
      bud_add_sub_btn: 'Alt Kategori Ekle',
      bud_select_main: '— Ana kategori seç —',
      bud_select_sub: '— Alt kategori seç —',
      bud_no_subs_hint: 'Önce Kategoriler sekmesinden bir kategori grubu ve alt kategori ekleyin.',
      bud_all_cats: 'Tüm Kategoriler',
      bud_filter_by_date: 'Tarihe göre filtrele',
      bud_filter_date: 'Tarih',
      bud_filter_from: 'Başlangıç',
      bud_filter_to: 'Bitiş',
      bud_filter_date_range: 'Tarih Aralığı',
      bud_hist_search: 'Ara...',
      bud_hist_all_cats: 'Tüm Kategoriler',
      bud_clear_date: 'Temizle',
      bud_tx_updated: 'İşlem güncellendi',
      bud_group_added: 'Kategori grubu eklendi',
      bud_sub_added: 'Alt kategori eklendi',
      bud_cat_updated: 'Kategori güncellendi',
      bud_budget_updated: 'Bütçe güncellendi',
      bud_confirm_delete_sub: 'Bu alt kategoriyi ve tüm işlemlerini silmek istediğinize emin misiniz?',
      bud_sub_deleted: 'Alt kategori silindi',
      bud_tx_desc_placeholder: 'Açıklama girin...',
      bud_group_name_placeholder: 'örn: Harcamalar, Tasarruf, Abonelikler...',
      bud_sub_name_placeholder: 'örn: Market Harcamaları...',
      bud_edit_budget_title: 'Bütçeyi düzenle',
      bud_edit_sub_modal: 'Alt Kategoriyi Düzenle',
      bud_sub_name_required: 'Alt kategori adı boş bırakılamaz',
      bud_confirm_title: 'Onay',
      bud_edit_name_title: 'Adı Düzenle',
      bud_edit_group_modal: 'Kategoriyi Düzenle',
      bud_add_sub_title: 'Alt Kategori Ekle',
      bud_delete_group_title: 'Grubu Sil',
      bud_no_groups_hint: 'Henüz kategori yok. "Ana Kategoriler" sekmesinden başlayın.',
      bud_edit_budget_prompt: '"{0}" için yeni bütçe miktarı ({1}):',

      // Investments modals/UI
      inv_add_modal: 'Varlık Ekle',
      inv_edit_modal: 'Varlığı Düzenle',
      inv_add_btn: 'Varlık Ekle',
      inv_asset_type_label: 'Varlık Türü',
      inv_type_stock: '📈 Hisse Senedi',
      inv_type_etf: '🗂️ ETF / Fon',
      inv_type_crypto: '₿ Kripto Para',
      inv_type_commodity: '🥇 Emtia (Altın, Gümüş…)',
      inv_type_bond: '📄 Tahvil',
      inv_type_cash: '💵 Nakit / Döviz',
      inv_type_stock_lbl: 'ABD Hissesi', inv_type_stock_other_lbl: 'Diğer Hisse', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Kripto',
      inv_type_commodity_lbl: 'Emtia', inv_type_bond_lbl: 'Tahvil', inv_type_cash_lbl: 'Nakit',
      inv_exchange_label: 'Borsa / Piyasa',
      inv_exchange_us: '🇺🇸 ABD Borsası (NYSE / NASDAQ)',
      inv_exchange_other: '🌐 Diğer Borsalar',
      inv_auto_price_info: 'Hisse, ETF ve kripto fiyatları Alpha Vantage üzerinden otomatik güncellenir.',
      inv_price_currency_label: 'Fiyat Birimi',
      inv_symbol_label: 'Sembol / Ticker',
      inv_display_name_label: 'Görünen İsim',
      inv_quantity_label: 'Adet / Miktar',
      inv_buy_price_label: 'Alış Fiyatı',
      inv_buy_date_label: 'Alış Tarihi',
      inv_dist_panel: 'Varlık Dağılımı',
      inv_perf_panel: 'Getiri Analizi',
      inv_portfolio_panel: 'Portföy Detayı',
      inv_kpi_portfolio_label: 'PORTFÖY DEĞERİ',
      inv_kpi_total_return: 'toplam getiri',
      inv_kpi_vs_invested: 'yatırıma göre',
      inv_kpi_cost_basis: 'maliyet bazı',
      inv_kpi_asset_count_label: 'VARLIK SAYISI',
      inv_kpi_instruments: 'farklı enstrüman',
      inv_pnl_total: 'Toplam K/Z',
      inv_pnl_daily: 'Günlük K/Z',
      inv_pnl_weekly: 'Haftalık K/Z',
      inv_pnl_monthly: 'Aylık K/Z',
      inv_period_daily: 'Günlük',
      inv_period_weekly: 'Haftalık',
      inv_period_monthly: 'Aylık',
      inv_period_3month: '3 Aylık',
      inv_period_alltime: 'Tüm Zamanlar',
      time_daily_total_sub: 'Günlük toplam süre',
      inv_no_assets_legend: 'Portföyde varlık yok',
      inv_no_assets_table: 'Portföyünüzde henüz varlık yok — "Varlık Ekle" ile başlayın',
      inv_by_symbol: 'Varlıklar',
      inv_by_type: 'Varlık Türü',
      inv_top_gainers: 'Kazananlar',
      inv_top_losers: 'Kaybedenler',
      inv_updating: 'Fiyatlar güncelleniyor…',
      inv_refresh_in: '{0} dakika sonra güncellenebilir',
      inv_refresh_title: 'Fiyatları güncelle (API)',
      inv_rate_input_title: 'Manuel kur — otomatik güncellenir',
      inv_api_keys_title: 'API Anahtarları',
      inv_wait_min: '{0} dakika sonra tekrar güncelleyebilirsiniz',
      inv_api_limit: 'Alpha Vantage günlük limit doldu (25 istek/gün). Fiyatlar yarın güncellenecek.',
      inv_asset_merged: '{0} güncellendi — ort. maliyet: {1}, toplam: {2}',
      inv_asset_added: 'Varlık eklendi',
      inv_asset_updated: 'Varlık güncellendi',
      inv_manual_price_label: '{0} — Güncel Fiyat ({1})',
      inv_manual_price_note: '{0} {1} cinsinden',
      inv_invalid_price: 'Geçerli bir fiyat girin',
      inv_price_saved: 'Güncel fiyat kaydedildi',
      inv_optional_suffix: '— opsiyonel',
      inv_fx_error: 'Kur verisi alınamadı',
      inv_fx_updated: 'Tüm kurlar güncellendi',
      inv_enter_symbol: 'Sembol giriniz',
      inv_invalid_qty: 'Geçerli bir adet girin',
      inv_invalid_buy: 'Geçerli bir alış fiyatı girin',
      inv_buy_price_sym: 'Alış Fiyatı {0}',
      inv_manual_price_info: 'Girdiğiniz fiyat yalnızca portföy değeri hesabında kullanılır; alış fiyatınız değişmez.',
      inv_no_history_note: 'Geçmiş veri yok, toplam gösteriliyor',
      inv_edit_price_title: 'Güncel fiyatı düzenle',
      inv_col_asset: 'Varlık / Sembol',
      inv_col_type: 'Tür',
      inv_col_qty: 'Adet',
      inv_col_cost: 'Ort. Maliyet',
      inv_col_price: 'Güncel Fiyat',
      inv_col_value: 'Toplam Değer',
      inv_col_pnl: 'Toplam K/Z',
      inv_col_pct: 'Dağılım %',
      inv_pnl_toggle_title: 'K/Z görünümünü değiştir',
      inv_tab_deposits: 'Mevduat',
      inv_dep_add: 'Mevduat Ekle',
      inv_dep_edit: 'Mevduatı Düzenle',
      inv_dep_type_term: 'Vadeli Mevduat',
      inv_dep_type_free: 'Serbest / Günlük Faiz',
      inv_dep_bank: 'Banka Adı',
      inv_dep_bank_ph: 'Garanti, Yapı Kredi…',
      inv_dep_principal: 'Anapara',
      inv_dep_rate: 'Yıllık Faiz Oranı (%)',
      inv_dep_term: 'Vade Süresi',
      inv_dep_term_1m: '1 Ay (30 gün)',
      inv_dep_term_3m: '3 Ay (90 gün)',
      inv_dep_term_6m: '6 Ay (180 gün)',
      inv_dep_term_1y: '1 Yıl (365 gün)',
      inv_dep_term_custom: 'Özel',
      inv_dep_term_custom_days: 'Gün Sayısı',
      inv_dep_term_custom_ph: 'Örn: 45',
      inv_dep_free_info: 'Günlük bileşik faiz — para vade beklemeksizin her gün büyür.',
      inv_dep_start: 'Başlangıç Tarihi',
      inv_dep_notes: 'Notlar',
      inv_dep_current_val: 'Güncel Değer',
      inv_dep_daily_gain: 'Günlük Kazanç',
      inv_dep_accrued: 'Birikmiş Faiz',
      inv_dep_maturity: 'Vade Tarihi',
      inv_dep_days_left: 'Kalan',
      inv_dep_days_left_val: '{0} gün',
      inv_dep_expired: 'Vade Doldu',
      inv_dep_no_deposits: 'Henüz mevduat hesabı yok',
      inv_dep_confirm_delete: 'Bu mevduatı silmek istediğinden emin misin?',
      inv_dep_skip_confirm: 'Bugün tekrar sorma',
      inv_sub_stocks:       'Borsa / ETF',
      inv_dep_status:       'Durum',
      inv_dep_deleted: 'Mevduat silindi',
      inv_dep_view_cards:   'Kartlar',
      inv_dep_view_table:   'Tablo',
      inv_dep_maturity_interest: 'Vade Faizi',
      inv_dep_total_return: 'Vade Sonu',
      inv_dep_status_active: 'Aktif',
      inv_dep_search_ph:    'Banka ara...',
      inv_tab_hist:         'İşlem Geçmişi',
      inv_dep_saved: 'Mevduat kaydedildi',
      inv_dep_free_note: 'Serbest hesap: günlük bileşik faiz, vade yok.',
      inv_dep_term_note: 'Vadeli hesap: vade sonunda basit faiz ödenir.',

      // Dashboard panels
      dash_this_week: 'Bu Hafta',
      dash_this_month: 'Bu Ay',
      dash_this_year: 'Bu Yıl',
      dash_week_time: 'Bu Hafta Zaman Dağılımı',
      dash_month_time: 'Bu Ay Zaman Dağılımı',
      dash_year_time: 'Bu Yıl Zaman Dağılımı',
      dash_week_spent: 'BU HAFTA HARCANAN',
      dash_month_spent: 'BU AY HARCANAN',
      dash_year_spent: 'BU YIL HARCANAN',
      dash_upcoming: 'Yaklaşan Planlar',
      dash_inv_dist: 'Yatırım Dağılımı',
      dash_budget_status: 'Bütçe Durumu',
      dash_dreams_panel: 'Hayaller',

      // Gym
      nav_gym: 'Spor',
      gym_add_btn: 'Antrenman Ekle',
      gym_add_modal: 'Yeni Antrenman',
      gym_edit_modal: 'Antrenmanı Düzenle',
      gym_type_label: 'Antrenman Türü',
      gym_type_strength: 'Güç Antrenmanı',
      gym_type_cardio: 'Kardiyo',
      gym_type_flexibility: 'Esneklik / Yoga',
      gym_type_crossfit: 'Crossfit / HIIT',
      gym_type_sport: 'Spor / Oyun',
      gym_type_other: 'Diğer',
      gym_duration_label: 'Süre (dakika)',
      gym_notes_label: 'Notlar',
      gym_notes_placeholder: 'Antrenman notları...',
      gym_exercises_label: 'Egzersizler',
      gym_add_exercise_btn: 'Egzersiz Ekle',
      gym_exercise_name_ph: 'Egzersiz adı (örn: Bench Press)',
      gym_sets_label: 'Set',
      gym_reps_label: 'Tekrar',
      gym_weight_label: 'Ağırlık (kg)',
      gym_ex_duration_label: 'Süre (dk)',
      gym_ex_distance_label: 'Mesafe (km)',
      gym_no_workouts: 'Henüz antrenman kaydı yok.',
      gym_workout_added: 'Antrenman eklendi',
      gym_workout_updated: 'Antrenman güncellendi',
      gym_workout_deleted: 'Antrenman silindi',
      gym_confirm_delete: 'Bu antrenmanı silmek istediğinizden emin misiniz?',
      gym_kpi_week: 'BU HAFTA',
      gym_kpi_month: 'BU AY',
      gym_kpi_total_hours: 'TOPLAM SÜRE',
      gym_kpi_streak: 'AKTİF SERİ',
      gym_kpi_sessions: 'antrenman',
      gym_kpi_hours_sub: 'saat',
      gym_kpi_streak_sub: 'gün',
      gym_off_days: 'Dinlenme Günleri',
      gym_off_day_title: 'Dinlenme günü — seri sayılmaz',
      gym_panel_chart: 'Haftalık Antrenman Frekansı',
      gym_panel_prs: 'Kişisel Rekorlar',
      gym_panel_history: 'Antrenman Geçmişi',
      gym_pr_exercise: 'Egzersiz',
      gym_pr_weight: 'En Yüksek (kg)',
      gym_pr_date: 'Tarih',
      gym_no_prs: 'Henüz kişisel rekör yok.',
      gym_this_week: 'Bu Hafta',
      gym_sessions_suffix: 'antrenman',
      gym_minutes_label: 'dk',
      gym_no_exercises: 'Egzersiz eklenmedi',
      gym_type_badge_strength: 'Güç',
      gym_type_badge_cardio: 'Kardiyo',
      gym_type_badge_flexibility: 'Esneklik',
      gym_type_badge_crossfit: 'Crossfit',
      gym_type_badge_sport: 'Spor',
      gym_type_badge_other: 'Diğer',
      gym_panel_progress: 'Egzersiz İlerlemesi',
      gym_panel_muscles: 'Kas Grubu Dağılımı',
      gym_panel_volume: 'Haftalık Hacim',
      gym_panel_body: 'Vücut Ölçümleri',
      gym_panel_templates: 'Antrenman Şablonları',
      gym_pr_1rm: 'Tahmini 1RM',
      gym_rpe_label: 'Yoğunluk (RPE 1–10)',
      gym_distance_label: 'Mesafe (km)',
      gym_muscle_label: 'Kas Grubu',
      gym_muscle_none: '—',
      gym_muscle_chest: 'Göğüs',
      gym_muscle_back: 'Sırt',
      gym_muscle_legs: 'Bacak',
      gym_muscle_shoulders: 'Omuz',
      gym_muscle_arms: 'Kollar',
      gym_muscle_core: 'Core',
      gym_muscle_cardio: 'Kardio',
      gym_progress_select: 'Egzersiz seç...',
      gym_progress_no_data: 'Bu egzersiz için veri yok.',
      gym_volume_unit: 'ton hacim',
      gym_kpi_volume: 'HAFTALIK HACİM',
      gym_kpi_volume_sub: 'ton (set×tekrar×kg)',
      gym_kpi_goal: 'HAFTALIK HEDEF',
      gym_kpi_goal_sub: 'antrenman / hedef',
      gym_weekly_goal_label: 'Haftalık hedef (gün)',
      gym_body_modal_title: 'Vücut Ölçümü Ekle',
      gym_body_weight_label: 'Vücut Ağırlığı (kg)',
      gym_body_fat_label: 'Yağ Oranı (%)',
      gym_body_waist_label: 'Bel (cm)',
      gym_body_chest_label: 'Göğüs (cm)',
      gym_body_arm_label: 'Kol (cm)',
      gym_body_leg_label: 'Bacak (cm)',
      gym_body_add_btn: 'Ölçüm Ekle',
      gym_body_added: 'Ölçüm eklendi',
      gym_body_deleted: 'Ölçüm silindi',
      gym_body_no_data: 'Henüz vücut ölçümü yok.',
      gym_body_weight_chart: 'Vücut Ağırlığı (kg)',
      gym_body_table_date: 'Tarih',
      gym_body_table_weight: 'Ağırlık',
      gym_body_table_fat: 'Yağ %',
      gym_body_table_waist: 'Bel',
      gym_no_muscle_data: 'Kas grubu verisi için egzersiz ekleyin.',
      gym_template_modal_title: 'Şablon Kaydet',
      gym_template_name_ph: 'Şablon adı (örn: Push Day)',
      gym_template_save_btn: 'Şablon Olarak Kaydet',
      gym_template_load_btn: 'Şablon Yükle',
      gym_template_added: 'Şablon kaydedildi',
      gym_template_deleted: 'Şablon silindi',
      gym_no_templates: 'Henüz kaydedilmiş şablon yok.',
      gym_template_confirm_delete: 'Bu şablonu silmek istediğinizden emin misiniz?',
      gym_load_template_title: 'Şablon Seç',
      gym_volume_label: 'Hacim',
      gym_unit_kg: 'kg',
      gym_unit_lb: 'lb',
      gym_body_edit_modal_title: 'Ölçümü Düzenle',
      gym_body_updated: 'Ölçüm güncellendi',
      gym_template_rename_title: 'Şablonu Yeniden Adlandır',
      gym_template_updated: 'Şablon güncellendi',
      gym_template_edit_title: 'Şablonu Düzenle',
      gym_template_duplicate: 'Çoğalt',
      gym_template_duplicated: 'Şablon çoğaltıldı',
      gym_template_type_label: 'Şablon Türü',
    },

    en: {
      // UI chrome
      settings_title: 'Settings',
      settings_lang: 'Language',
      settings_lang_tr: 'Turkish',
      settings_lang_en: 'English',
      settings_lang_zh: 'Chinese',
      settings_lang_es: 'Spanish',
      settings_lang_fr: 'French',
      settings_currency: 'Currency you use',
      settings_ui_scale: 'Interface Scale',
      settings_tab_ui: 'Interface',
      settings_tab_panels: 'Panels',
      settings_panels_hint: 'Hide modules you don\'t need — data is preserved, only removed from the UI.',
      btn_hide: 'Hide',
      btn_show: 'Show',
      settings_theme: 'Theme Mode',
      settings_theme_dark: 'Dark',
      settings_theme_midnight: 'Midnight',
      settings_theme_ocean: 'Ocean',
      settings_theme_forest: 'Forest',
      settings_theme_sunset: 'Sunset',
      settings_theme_rose: 'Rose',
      settings_theme_amber: 'Amber',
      settings_theme_crimson: 'Crimson',
      settings_theme_nebula: 'Nebula',
      settings_theme_arctic: 'Arctic',
      settings_theme_neon: 'Neon',
      settings_theme_white: 'White',
      settings_data_title: 'Data Management',
      settings_export_btn: 'Export',
      settings_export_desc: 'Download all your data as a JSON file.',
      settings_import_btn: 'Import',
      settings_import_title: 'Import Data',
      settings_import_desc: 'Load a previously exported JSON file.',
      settings_import_confirm: 'All existing data will be replaced with the data from the file. Continue?',
      settings_import_ok: 'Data loaded successfully.',
      settings_import_err: 'Invalid file format.',
      settings_delete_btn: 'Delete All Data',
      settings_delete_title: 'Delete All Data',
      settings_delete_msg: 'You are about to permanently delete <strong>all data</strong> — budget, plans, habits, investments, API keys and settings. This action <strong>cannot be undone</strong>.',
      settings_delete_confirm: '⚠️ WARNING\n\nYou are about to permanently delete all your data (budget, plans, habits, investments, API keys…).\n\nThis action cannot be undone. Are you sure?',
      settings_delete_ok: 'All data deleted.',
      seed_warning_label: 'Demo Data Active',
      seed_warning_desc: 'Sample data is loaded — clear it in Settings and enter your own data',
      settings_delete_choice_title: 'Delete Data',
      settings_delete_choice_subtitle: 'Choose how you want to reset:',
      settings_delete_reset_label: 'Reset to Demo',
      settings_delete_reset_desc: 'Your personal data is removed and demo data is restored. Panels will still look populated.',
      settings_delete_reset_btn: 'Reset to Demo',
      settings_delete_wipe_label: 'Delete Everything',
      settings_delete_wipe_desc: 'All data — including demo data — is permanently deleted. The app starts completely empty.',
      settings_delete_wipe_btn: 'Delete Everything',
      settings_delete_wipe_confirm: 'All data (including demo) will be permanently deleted. Are you sure?',
      settings_delete_wipe_ok: 'All data deleted.',
      settings_delete_reset_ok: 'Reset to demo data.',
      settings_api_title: 'API Keys',
      settings_api_hint: 'Required for the Investments module to fetch live prices.',
      settings_api_av: 'Alpha Vantage (Stocks, ETF, Crypto)',
      settings_api_fx: 'Exchange Rates (Currency rate)',
      settings_api_save: 'Save Keys',
      settings_api_saved: 'API keys saved.',
      settings_update_rates: 'Update Rates',
      settings_update_rates_title: 'Fetch all exchange rates now',
      panel_manager_title: 'Panel Visibility',
      panel_on: 'On',
      panel_off: 'Off',
      panel_empty: 'No manageable panels on this page.',
      privacy_show: 'Show values',
      privacy_hide: 'Hide values',
      sidebar_settings: 'Settings',
      sidebar_help: 'Help',
      sidebar_privacy: 'Privacy',
      sidebar_toggle: 'Collapse / Expand Menu',
      priority_high: 'High',
      priority_medium: 'Medium',
      priority_low: 'Low',
      hours_suffix: 'h',
      mins_suffix: 'min',
      secs_suffix: 'sec',

      // nav & topbar labels
      nav_dashboard: 'Dashboard',
      nav_pomodoro: 'Focus Mode',
      nav_time: 'Time Tracking',
      nav_habits: 'Habits',
      nav_plans: 'Plans',
      nav_goals: 'Dreams & Goals',
      nav_budget: 'Budget',
      nav_investments: 'Investments',

      // days (short)
      day_mon: 'Mon', day_tue: 'Tue', day_wed: 'Wed',
      day_thu: 'Thu', day_fri: 'Fri', day_sat: 'Sat', day_sun: 'Sun',

      // Dashboard
      dash_net_worth: 'NET WORTH',
      dash_today_spent: 'TODAY SPENT',
      dash_habits_done: 'COMPLETED HABITS',
      dash_active_goals: 'ACTIVE GOALS',
      dash_habits_pct: '{0}% today',
      dash_goals_of: 'of {0} goals',
      dash_net_worth_change: 'investments + deposits + budget',
      dash_nw_inv: 'Invest.',
      dash_nw_dep: 'Deposits',
      dash_nw_bud: 'Budget',
      dash_over_limit: 'over limit',
      dash_in_limit: 'within limit',
      dash_budget_total: 'TOTAL BUDGET',
      dash_completion_rate: 'COMPLETION RATE',
      dash_avg_progress: 'AVG. PROGRESS',
      dash_no_plans: 'No upcoming plans',
      dash_today: 'Today',
      dash_tomorrow: 'Tomorrow',
      dash_no_assets: 'No assets in portfolio',
      dash_no_sessions: 'No sessions yet',
      dash_n_more: '+{0} more',
      dash_today_sessions: "Today's Pomodoros",
      dash_week_total: 'This Week',
      dash_focused: 'focused',
      dash_focus_month: 'This Month',
      dash_focus_streak: 'Daily Streak',
      dash_focus_streak_days: '{0} days',
      dash_focus_cats_week: 'Categories This Week',
      dash_focus_no_logs: 'No time logs yet',
      dash_recent_tasks: 'Recent Tasks',
      dash_no_goals: 'No dreams yet',
      dash_in_progress: 'In Progress',
      dash_completed: 'Completed',
      dash_no_spending: 'No spending data',
      dash_no_workouts: 'No workouts yet',
      dash_gym_week_dur: 'Week Duration',
      dash_gym_streak_lbl: 'Streak',
      dash_gym_exercises: 'exercises',
      dash_surplus: 'surplus',
      dash_over: 'over budget',
      dash_hour_label: 'Hour',
      asset_stock: 'Stock',
      asset_stock_us: 'US Stock',
      asset_stock_other: 'Other Exchange Stock',
      asset_etf: 'ETF',
      asset_crypto: 'Crypto',
      asset_commodity: 'Commodity',
      asset_bond: 'Bond',
      asset_cash: 'Cash',

      // Plans
      plans_todo: 'TO DO',
      plans_progress: 'IN PROGRESS',
      plans_done: 'DONE',
      plans_kpi_pending: 'pending task',
      plans_kpi_ongoing: 'active task',
      plans_kpi_from_total: 'of {0} total',
      plans_no_tasks: 'No tasks',
      plans_start: 'Start',
      plans_complete: 'Complete',
      plans_title_col: 'TITLE',
      plans_due_col: 'DATE',
      plans_cat_col: 'CATEGORY',
      plans_status_col: 'STATUS',
      plans_priority_col: 'PRIORITY',
      plans_added: 'Plan added',
      plans_updated: 'Plan updated',
      plans_deleted: 'Plan deleted',
      plans_confirm_delete: 'Are you sure you want to delete this plan?',
      plans_edit_modal: 'Edit Plan',
      plans_subtasks: 'Sub-plans',
      plans_subtask_placeholder: 'Add sub-plan...',
      plans_subtask_count: '{0}/{1} completed',
      plans_no_subtasks: 'No sub-plans yet',
      plans_confirm_delete_sub: 'Are you sure you want to delete this sub-plan?',
      status_todo: 'To Do',
      status_progress: 'In Progress',
      status_done: 'Done',

      // Time
      time_today_kpi: 'TODAY',
      time_week_kpi: 'THIS WEEK',
      time_month_kpi: 'THIS MONTH',
      time_focus_pct: '⏱ {0}% focus',
      time_total_dur: 'total time',
      time_last7: 'last 7 days',
      time_last30: 'last 30 days',
      time_duration_label: 'Duration',
      time_no_logs: 'No logs yet',
      time_auto_end: '⏱ Auto',
      time_history_title: 'Daily Breakdown: {0}',
      time_min_suffix: 'min',
      time_date_col: 'DATE',
      time_category_col: 'CATEGORY',
      time_project_col: 'PROJECT',
      time_start_col: 'START',
      time_end_col: 'END',
      time_dur_col: 'DURATION',

      // Habits
      habits_no_habits: 'No habits yet.',
      habits_no_day_selected: 'No day selected',
      habits_daily: 'Permanent — every day',
      habits_edit: 'Edit',
      habits_delete: 'Delete',
      habits_skip: 'Skip Today',
      habits_unskip: 'Undo Skip',
      habits_skipped_section: "Won't Do Today",
      habits_all_done: 'All habits completed!',
      habits_none_today: 'No habits for today.',
      habits_total: 'TOTAL HABITS',
      habits_today_kpi: 'TODAY',
      habits_streak_best: 'BEST STREAK',
      habits_completed_label: 'Completed',
      habits_remaining_label: 'Remaining',
      habits_week_title: 'Week',
      habits_week_n: 'WEEK {0}',
      habits_30_day: '30-Day History',
      habits_older: '← older',
      habits_today_arrow: 'today →',
      habits_habit_col: 'Habit',
      habits_pct_col: '%',
      habits_time_badge: 'Time',
      habits_added: 'Habit added',
      habits_deleted: 'Habit deleted',
      habits_confirm_delete: 'Are you sure you want to delete this habit?',
      habits_current_streak: 'Current Streak',
      habits_best_streak: 'Best Streak',

      // Goals
      goals_active_kpi: 'ACTIVE GOALS',
      goals_avg_progress: 'AVG PROGRESS',
      goals_total_kpi: 'TOTAL GOALS',
      goals_none: 'No goals added yet...',
      goals_days_left: '{0} days left',
      goals_overdue: 'Overdue',
      goals_update_progress: 'Update Progress',
      goals_progress_prompt: 'New progress percentage (0-100):',
      goals_added: 'Goal added',
      goals_updated: 'Goal updated',
      goals_deleted: 'Goal deleted',
      goals_confirm_delete: 'Are you sure you want to delete this goal?',
      goals_dream_added: 'Dream added',
      goals_dream_updated: 'Dream updated',
      goals_dream_deleted: 'Dream deleted',
      goals_all_done: '🎉 All steps completed!',
      goals_days_overdue: '{0} days overdue',
      goals_ms_empty_card: 'No milestones — add from edit',
      goals_ms_empty_modal: 'No milestones added yet',
      goals_ms_confirm_del: 'Are you sure you want to delete this sub-goal?',
      goals_none_dreams: 'No dreams added yet',
      goals_cat_kariyer: 'Career',
      goals_cat_seyahat: 'Travel',
      goals_cat_saglik: 'Health',
      goals_cat_egitim: 'Education',
      goals_cat_kisisel: 'Personal',
      goals_cat_finansal: 'Financial',

      // Budget
      bud_income_kpi: 'INCOME',
      bud_expense_kpi: 'EXPENSE',
      bud_balance_kpi: 'REMAINING BUDGET',
      bud_total_income: 'TOTAL INCOME',
      bud_total_expense: 'TOTAL EXPENSE',
      bud_kpi_pct_left: '{0}% budget left',
      bud_kpi_over: '{0}% over',
      bud_budget_label: 'Budget',
      bud_actual_label: 'Actual',
      bud_income_label: 'INCOME',
      bud_expense_label: 'EXPENSE',
      bud_summary_title: 'Budget Summary',
      bud_source_col: 'SOURCE',
      bud_budget_col: 'BUDGET',
      bud_actual_col: 'ACTUAL',
      bud_usage_col: 'USAGE',
      bud_remaining_footer: 'REMAINING',
      bud_no_groups: 'No groups yet',
      bud_no_transactions: 'No transactions yet',
      bud_type_income: 'Income',
      bud_type_expense: 'Expense',
      bud_surplus: 'surplus',
      bud_over: 'over',
      bud_sub_count: '{0} subcategories',
      bud_group_added: 'Group added',
      bud_group_deleted: 'Group deleted',
      bud_trans_added: 'Transaction added',
      bud_add_continue: 'Add & Continue',
      bud_trans_deleted: 'Transaction deleted',
      bud_confirm_delete_group: 'Are you sure you want to delete this group and all its transactions?',
      bud_confirm_delete_trans: 'Are you sure you want to delete this transaction?',
      bud_panel_bar: 'Budget vs Actual',
      bud_panel_pie: 'Spending Breakdown',
      bud_panel_timeline: 'Income/Expense Trend',
      bud_panel_daily: 'When Do I Spend?',
      bud_panel_subcats: 'Where Does My Money Go?',
      bud_panel_net_history: 'Net Savings',
      bud_net_history_title: 'Net Savings (Last {0} Months)',
      bud_net_month: 'Month {0}',
      bud_sub_col: 'SUB-CATEGORY',
      bud_perc_col: 'PERC.',
      bud_details: 'Details',
      bud_daily_balance: 'BALANCE',
      bud_daily_inc_col: 'TOTAL INC.',
      bud_daily_exp_col: 'TOTAL EXP.',
      bud_panel_transactions: 'Transactions',
      bud_desc_col: 'DESCRIPTION',
      bud_date_col: 'DATE',
      bud_group_col: 'GROUP',
      bud_amount_col: 'AMOUNT',
      bud_type_col: 'TYPE',

      // Investments
      inv_total_value: 'TOTAL VALUE',
      inv_total_cost: 'TOTAL COST',
      inv_pnl: 'PROFIT/LOSS',
      inv_pnl_pct: 'RETURN %',
      inv_asset_label: 'ASSET',
      inv_more_assets: 'more assets',
      inv_type_label: 'TYPE',
      inv_no_assets: 'No assets added yet',
      inv_asset_added: 'Asset added',
      inv_asset_updated: 'Asset updated',
      inv_asset_deleted: 'Asset deleted',
      inv_confirm_delete: 'Are you sure you want to delete this asset?',
      inv_just_now: 'just now',
      inv_sell: 'Sell',
      inv_sell_title: 'Sell Asset',
      inv_sell_qty: 'Quantity to Sell',
      inv_buy_qty: 'Quantity to Buy',
      inv_sell_price: 'Sell Price',
      inv_sell_date: 'Sell Date',
      inv_sell_preview: 'Est. P/L',
      inv_sell_confirm: 'Sell',
      inv_sell_success: 'Asset sold',
      inv_sell_err_qty: 'Invalid quantity',
      inv_sell_err_price: 'Invalid price',
      inv_sell_max: 'available',
      inv_realized_pnl: 'Realized P/L',
      inv_buy: 'Buy',
      inv_buy_title: 'Buy More',
      inv_buy_confirm: 'Buy',
      inv_buy_success: 'Purchase recorded',
      inv_buy_new_avg: 'New Avg. Cost',
      inv_avg_cost: 'Avg. Cost',
      inv_select_asset: 'Select Asset',
      inv_no_assets: 'No assets in portfolio',
      inv_trade_history: 'Trade History',
      inv_col_trade_type: 'Type',
      inv_col_trade_price: 'Price',
      inv_trade_type_buy: 'Buy',
      inv_trade_type_sell: 'Sell',
      inv_no_trades: 'No trades yet',
      inv_edit_trade: 'Edit Trade',
      inv_delete_trade: 'Delete Trade',
      inv_trade_deleted: 'Trade deleted',
      inv_trade_updated: 'Trade updated',
      inv_col_actions: 'Actions',
      inv_trade_action: 'Trade Assets',
      inv_trade_filter_all: 'Date',
      inv_tab_portfolio: 'Portfolio',
      inv_tab_trades: 'Trade History',
      inv_history_btn: 'History',
      inv_hist_tab_trades: 'Trades',
      inv_hist_tab_deposits: 'Deposits',
      inv_dep_term_short: 'Term',
      inv_dep_free_short: 'Flex',
      inv_dep_type_label: 'Type',
      inv_trade_search: 'Symbol, name...',
      inv_trade_opt_new_desc: 'Add a new asset not yet in your portfolio',
      inv_trade_opt_buy_desc: 'Buy more of an existing asset, average cost updates',
      inv_trade_opt_sell_desc: 'Sell part or all of an existing asset',
      inv_mins_ago: '{0} min ago',
      inv_hours_ago: '{0} hr ago',
      inv_days_ago: '{0} d ago',
      inv_manual: 'manual',
      inv_period_1d: '1D',
      inv_period_1w: '1W',
      inv_period_1m: '1M',
      inv_period_3m: '3M',
      inv_period_6m: '6M',
      inv_period_1y: '1Y',

      // Pomodoro
      pomo_work: 'POMODORO',
      pomo_short: 'SHORT BREAK',
      pomo_long: 'LONG BREAK',
      pomo_flow: 'FLOW MODE',
      pomo_countdown: 'COUNTDOWN',
      pomo_overtime: 'OVERTIME',
      pomo_start: 'Start',
      pomo_resume: 'Resume',
      pomo_pause: 'Pause',
      pomo_reset: 'Reset',
      pomo_session_saved: 'Session saved — {0}',
      pomo_today_sessions: "TODAY'S SESSIONS",
      pomo_week_total: 'THIS WEEK TOTAL',
      pomo_total_sessions: 'TOTAL SESSIONS',
      pomo_flags: '{0} flags',
      pomo_flags_count: '{0} flag(s) marked',
      pomo_flags_none: 'No flags',
      pomo_flow_save_desc: 'Logs {0} up to the last flag; the rest is discarded.',
      pomo_flow_save_none: 'No flags — nothing will be logged.',
      pomo_flow_hard_flow: 'Nothing is saved — resets timer to 0:00.',
      pomo_flow_hard_count: 'Nothing is saved — resets timer to the beginning.',
      pomo_confirm_reset: 'Are you sure you want to reset the timer?',
      pomo_confirm_del_todo: 'Are you sure you want to delete this task?',
      pomo_add_sub_ph: 'Add subtask...',
      pomo_mode_switch_title: 'Mode Change',
      pomo_mode_switch_msg: 'You are about to switch modes.',
      pomo_mode_switch_flags: 'Saved flags are recorded to time logs on mode switch.',
      pomo_mode_switch_duration: 'Time to be saved: {0}',
      pomo_mode_switch_no_flags: 'No flags recorded — switching modes will reset your progress.',
      pomo_mode_switch_confirm: 'Continue',
      pomo_mode_switch_dontask: "Don't ask again today",
      pomo_toast_overtime: 'Time\'s up{0} ⚡ Press Finish when ready',
      pomo_toast_break_done: 'Break over! Back to work 💪',
      pomo_toast_countdown_done: 'Countdown complete! 🎯',
      pomo_flow_saved: 'Flow session saved — {0} 🌊',
      pomo_kpi_today: 'Today Completed',
      pomo_kpi_total: 'Total Sessions',
      pomo_kpi_flow: 'Flow Time',
      pomo_kpi_streak: 'Daily Streak',
      pomo_sessions_n: '{0} sessions',
      pomo_days_n: '{0} days',
      pomo_focus_sub: 'focus',
      pomo_all_time: 'all time',
      pomo_today_sub: 'today',
      pomo_streak_sub: 'streak',
      pomo_vs_yday_more: 'more than yesterday',
      pomo_vs_yday_less: 'less than yesterday',
      pomo_vs_yday_none: 'no data for yesterday',
      pomo_switch_running_label: 'Timer is running',
      pomo_task_switch_current: 'Current task',
      pomo_switch_no_today: "Don't ask again today",
      pomo_todo_empty: 'No tasks yet. Press "Add Task".',
      pomo_todo_all_done: 'All tasks completed!',
      pomo_task_added: 'Task added',
      pomo_task_updated: 'Task updated',
      pomo_task_select: 'Select task',
      pomo_no_tasks_today: 'No tasks for today',
      pomo_todo_hint: 'Add from the to-do list below',
      pomo_lap_split: 'Split',
      pomo_lap_total: 'Total',
      pomo_lap_time: 'Time',
      pomo_flag_deleted: 'Flag deleted',
      pomo_flag_del_confirm_msg: 'This flag will be permanently deleted. Do you want to continue?',
      pomo_flag_del_no_today: 'Don\'t show this again today',
      pomo_subtasks_header: 'Subtasks',
      pomo_minute_n: 'Minute {0}',
      pomo_settings_close: 'Close',
      pomo_fullscreen: 'Fullscreen',
      pomo_minimize: 'Minimize',
      pomo_task_switch: 'Switch Task',
      pomo_switch_running_msg: 'The timer is running. Switching tasks will reset the Pomodoro counter. Do you want to continue?',
      pomo_switch_elapsed_msg: 'Time has elapsed for this task. Switching will reset the Pomodoro counter. Do you want to continue?',
      pomo_switch_confirm_btn: 'Switch',
      pomo_btn_flow: 'Flow Mode',
      pomo_btn_pomodoro: 'Pomodoro',
      pomo_btn_countdown: 'Countdown',
      pomo_btn_short: 'Short Break',
      pomo_btn_long: 'Long Break',
      pomo_btn_finish: 'Finish',
      pomo_finish_confirm_title: 'Finish Session',
      pomo_finish_confirm_msg: 'Your current session will be saved. Time:',
      pomo_finish_select_msg: 'Choose how to finish:',
      pomo_finish_opt1_title: 'Save Current Time',
      pomo_finish_opt1_desc: 'Duration {0} will be saved and session finished.',
      pomo_finish_opt2_title: 'Finish with Flags',
      pomo_finish_opt2_desc: 'Logs {0} up to last flag and finishes the session.',
      pomo_finish_opt2_no_flags: 'No flags — add a flag first.',
      pomo_btn_flag: 'Flag',
      pomo_task_label: 'Current Task',
      pomo_todo_title: 'To-Do List',
      pomo_todo_subtitle: "Today's tasks",
      pomo_todo_done_count: 'completed',
      pomo_todo_add_btn: 'Add Task',
      pomo_edit_task: 'Edit Task',
      pomo_todo_completed_section: 'Completed',
      pomo_settings_pomo_tip: 'Long break starts after every 4 pomodoros.',
      pomo_settings_countdown_tip: 'Settings apply when timer is stopped.',
      pomo_settings_fs_kpi: 'Info Panel',
      pomo_settings_duration: 'Duration',
      pomo_flow_reset_title: 'Reset Options',
      pomo_flow_reset_question: 'What would you like to do?',
      pomo_flow_opt1_title: 'Save Flags and Reset',
      pomo_flow_opt1_desc: 'Logs up to last flag, discards the rest.',
      pomo_flow_opt2_title: 'Continue from Last Flag',
      pomo_flow_opt2_desc: 'Rewinds timer to last flag and continues.',
      pomo_flow_opt3_title: 'Full Reset',
      pomo_flow_opt3_desc_flow: 'Saves nothing — resets timer to 0:00.',
      pomo_flow_opt3_desc: 'Saves nothing — resets timer to start.',
      pomo_flow_opt3_desc_count: 'Saves nothing — resets countdown to 00:00:00.',
      pomo_new_todo_title: 'New Task',
      pomo_edit_todo_title: 'Edit Task',
      pomo_form_task: 'Task',
      pomo_form_duration: 'Estimated Duration',
      pomo_form_category: 'Category',
      pomo_form_note: 'Note',
      pomo_form_subtasks: 'Subtasks',
      pomo_form_add_subtask: 'Add Subtask',
      pomo_form_optional: '(optional)',
      pomo_form_minutes: 'minutes',
      pomo_exit_fullscreen: 'Minimize',
      pomo_short_break_label: 'Short Break',
      pomo_long_break_label: 'Long Break',
      pomo_cat_work: 'Work',
      pomo_cat_learn: 'Learning',
      pomo_cat_exercise: 'Exercise',
      pomo_cat_social: 'Social',
      pomo_cat_sleep: 'Sleep',
      pomo_cat_other: 'Other',
      pomo_default_project: 'Free Flow',

      // Focus Widget
      fw_pause_resume: 'Pause / Resume',
      fw_add_flag: 'Add Flag',
      fw_stop: 'Stop',
      fw_open_focus: 'Go to Focus Mode',
      fw_paused: 'Paused',

      // Pomodoro todo form
      pomo_task_text_label: 'Task',
      pomo_est_duration: 'Estimated Duration',
      pomo_pomodoro_count: 'Pomodoro Count',
      lbl_optional: '(optional)',
      pomo_minutes_label: 'minutes',
      pomo_note_label: 'Note',
      pomo_subtasks_label: 'Subtasks',
      pomo_add_subtask_btn: 'Add Subtask',
      pomo_subtask_placeholder: 'Subtask...',
      pomo_task_placeholder: 'Task to do...',
      pomo_note_placeholder: 'Additional note...',
      time_project_placeholder: 'Project name (optional)',

      // Common buttons & labels
      btn_cancel: 'Cancel',
      btn_back: '← Back',
      btn_add: 'Add',
      btn_save: 'Save',
      btn_edit: 'Edit',
      btn_delete: 'Delete',
      dm_noask_today: "Don't ask again today",
      btn_details: 'Details →',
      btn_all: 'All →',
      lbl_title: 'Title',
      lbl_desc: 'Description',
      lbl_category: 'Category',
      lbl_date: 'Date',
      lbl_priority: 'Priority',
      lbl_notes: 'Notes',
      lbl_name: 'Name',
      lbl_color: 'Color',
      lbl_emoji: 'Emoji',
      lbl_type: 'Type',
      lbl_amount: 'Amount',
      lbl_all: 'All',
      lbl_manual: 'Manual',
      lbl_project: 'Project',
      lbl_optional: '(optional)',
      lbl_status: 'Status',

      // Plans modals/UI
      plans_add_modal: 'New Plan',
      plans_add_btn: 'Add Plan',
      plans_kanban_view: 'Kanban',
      plans_list_view: 'List',
      plans_end_date: 'Due Date',
      plans_cat_project: 'Project',
      plans_cat_education: 'Education',
      plans_cat_finance: 'Finance',
      plans_cat_investment: 'Investment',
      plans_cat_personal: 'Personal',
      plans_cat_health: 'Health',
      plans_cat_other: 'Other',
      plans_title_placeholder: 'Task title...',
      plans_notes_placeholder: 'Additional notes...',
      plans_pri_high: 'High',
      plans_pri_medium: 'Medium',
      plans_pri_low: 'Low',

      // Time modals/UI
      time_add_modal: 'Add Log',
      time_history_modal: 'History View',
      time_add_btn: 'Add Log',
      time_project_label: 'Project / Activity',
      time_task_today: "Today's Tasks",
      time_task_other: 'Other Tasks',
      time_task_create: 'Create Task',
      time_task_required: 'Task title is required',
      time_start_label: 'Start',
      time_end_label: 'End',
      time_panel_30day: 'Last 30 Days',
      time_panel_daily: 'Daily Distribution (Last 7 Days)',
      time_panel_logs: 'Time Logs',
      time_panel_weekly: 'Weekly Summary',
      time_filter_all: 'All',
      time_filter_manual: 'Manual',
      time_filter_auto: '⏱ Auto',
      time_filter_date_placeholder: 'Date',
      cdp_range_hint: 'Select end date',
      time_col_date: 'Date',
      time_col_category: 'Category',
      time_col_project: 'Project',
      time_col_range: 'Time Range',
      time_col_duration: 'Duration',
      time_hist_subtitle: 'Monthly and weekly breakdown',
      time_prev_month: 'Previous month',
      time_hist_total: 'Total',
      time_hist_tab_summary: 'Summary',
      time_hist_tab_logs: 'Logs',
      time_hist_active_days: 'Active Days',
      time_hist_daily_avg: 'Daily Avg.',
      time_hist_top_cat: 'Top Category',
      time_next_month: 'Next month',
      time_invalid_range: 'Enter a valid time range',
      time_log_added: 'Log added',
      time_log_deleted: 'Log deleted',
      time_del_confirm_msg: 'This time log will be permanently deleted. Do you want to continue?',
      time_del_no_today: 'Don\'t show this again today',
      time_edit_modal: 'Edit Log',
      time_log_updated: 'Log updated',

      // Habits modals/UI
      habits_add_modal: 'New Habit',
      habits_manage_modal: 'Manage Habits',
      habits_edit_modal: 'Edit Habit',
      habits_add_btn: 'Add Habit',
      habits_name_label: 'Habit Name',
      habits_icon_label: 'Icon (emoji)',
      habits_type_label: 'Type',
      habits_days_label: 'Which days?',
      habits_type_permanent: 'Permanent',
      habits_type_permanent_desc: 'Appears every day automatically',
      habits_type_timed: 'Timed',
      habits_type_timed_desc: 'Appears on selected days',
      habits_today_done: 'Completed Today',
      habits_week_success: 'Weekly Success',
      habits_last7: 'last 7 days',
      habits_streak_unit: 'streak',
      habits_add_link: 'Add →',
      habits_no_subs: 'No subcategories.',
      habits_add_sub_btn: '+ Add',
      habits_min_one_day: 'Select at least one day',
      habits_name_placeholder: 'e.g. Morning run, Reading...',
      habits_weekly_progress: 'Weekly Progress',
      habits_weekly_sub: 'Daily completion rates',
      habits_updated: 'Habit updated',

      // Goals modals/UI
      goals_add_modal: 'New Goal',
      goals_add_btn: 'Add Goal',
      goals_target_date: 'Target Date',
      goals_new_modal: 'New Dream',
      goals_edit_modal: 'Edit Dream',
      goals_delete_modal: 'Delete Dream',
      goals_reorder: 'Reorder',
      goals_reorder_close: 'Close Editing',
      goals_category: 'Category',
      goals_emoji: 'Emoji',
      goals_color: 'Color',
      goals_milestones: 'Milestones',
      goals_ms_placeholder: 'Add milestone...',
      goals_title_placeholder: 'Write your dream...',
      goals_desc_placeholder: 'Detailed description...',
      goals_delete_confirm_q: 'Are you sure?',
      goals_delete_yes: 'Yes, Delete',
      goals_edit_btn: 'Edit',
      goals_del_btn: 'Delete',

      // Budget modals/UI
      bud_add_trans_modal: 'New Transaction',
      bud_add_group_modal: 'New Category Group',
      bud_add_sub_modal: 'Add Subcategory',
      bud_group_name_label: 'Group Name',
      bud_sub_name_label: 'Subcategory Name',
      bud_monthly_budget: 'Monthly Budget',
      bud_sub_cat_label: 'Subcategory',
      bud_amount_label: 'Amount',
      bud_desc_label: 'Description',
      bud_summary_tab: 'Summary',
      bud_groups_tab: 'Main Categories',
      bud_trans_tab: 'Transaction Log',
      bud_search: 'Search...',
      bud_no_tx: 'No transactions yet',
      bud_others: 'Others',
      bud_history_btn: 'History',
      bud_history_title: 'Budget History',
      bud_history_empty: 'No completed cycles yet',
      bud_history_no_data: 'No transaction data saved for this cycle',
      bud_history_cycle: 'Cycle',
      bud_history_add_tx: 'Add Transaction',
      bud_history_no_tx: 'No transactions in this cycle',
      bud_cycle_settings_title: 'Budget Cycle',
      bud_cycle_start: 'Start',
      bud_cycle_end: 'End',
      bud_cycle_desc: 'When the end date passes, transactions are archived; net balance is saved for charts.',
      bud_cycle_saved: 'Cycle settings saved',
      bud_add_tx_btn: 'Add Transaction',
      bud_import_budget_btn: 'Import Data',
      import_data_btn: 'Import Data',
      import_data_confirm: 'Existing module data will be deleted and replaced with the imported data. Continue?',
      import_data_ok: 'Data imported successfully',
      import_data_err: 'No valid module data found in file',
      bud_import_budget_confirm: 'Current budget data will be deleted and replaced with the file data. Continue?',
      bud_import_budget_ok: 'Budget data imported successfully',
      bud_import_budget_err: 'Invalid file — no budget data found',
      bud_add_group_btn: 'Add Category',
      bud_edit_open: 'Edit Panels',
      bud_edit_close: 'Close Editing',
      bud_edit_tx_modal: 'Edit Transaction',
      bud_edit_desc_label: 'Description',
      bud_trans_panel: 'Transaction Log',
      bud_col_date: 'DATE',
      bud_col_amount: 'AMOUNT',
      bud_col_subcat: 'SUBCATEGORY',
      bud_col_maincat: 'MAIN CATEGORY',
      bud_col_desc: 'DESCRIPTION',
      bud_shrink_height: 'Shrink Height',
      bud_grow_height: 'Grow Height',
      bud_collapse: 'Collapse',
      bud_expand: 'Expand',
      bud_add_sub_for: '{0} — Add Subcategory',
      bud_net_balance: 'NET BALANCE',
      bud_this_period: 'this period',
      bud_positive: 'positive',
      bud_negative: 'negative',
      bud_cat_name_prompt: 'Category name:',
      bud_no_groups: 'No category groups yet.',
      bud_add_first_group: 'Add First Category',
      bud_no_subs: 'No subcategories.',
      bud_sub_count: '{0} subcategories',
      bud_add_sub_btn: 'Add Subcategory',
      bud_select_main: '— Select main category —',
      bud_select_sub: '— Select subcategory —',
      bud_no_subs_hint: 'First add a category group and sub-category from the Categories tab.',
      bud_all_cats: 'All Categories',
      bud_filter_by_date: 'Filter by date',
      bud_filter_date: 'Date',
      bud_filter_from: 'From',
      bud_filter_to: 'To',
      bud_filter_date_range: 'Date Range',
      bud_hist_search: 'Search...',
      bud_hist_all_cats: 'All Categories',
      bud_clear_date: 'Clear',
      bud_tx_updated: 'Transaction updated',
      bud_group_added: 'Category group added',
      bud_sub_added: 'Subcategory added',
      bud_cat_updated: 'Category updated',
      bud_budget_updated: 'Budget updated',
      bud_confirm_delete_sub: 'Are you sure you want to delete this subcategory and all its transactions?',
      bud_sub_deleted: 'Subcategory deleted',
      bud_tx_desc_placeholder: 'Enter description...',
      bud_group_name_placeholder: 'e.g. Expenses, Savings, Subscriptions...',
      bud_sub_name_placeholder: 'e.g. Grocery spending...',
      bud_edit_budget_title: 'Edit Budget',
      bud_edit_sub_modal: 'Edit Subcategory',
      bud_sub_name_required: 'Subcategory name cannot be empty',
      bud_confirm_title: 'Confirm',
      bud_edit_name_title: 'Edit Name',
      bud_edit_group_modal: 'Edit Category',
      bud_add_sub_title: 'Add Subcategory',
      bud_delete_group_title: 'Delete Group',
      bud_no_groups_hint: 'No categories yet. Start from the "Main Categories" tab.',
      bud_edit_budget_prompt: 'New budget amount for "{0}" ({1}):',

      // Investments modals/UI
      inv_add_modal: 'Add Asset',
      inv_edit_modal: 'Edit Asset',
      inv_add_btn: 'Add Asset',
      inv_asset_type_label: 'Asset Type',
      inv_type_stock: '📈 Stock',
      inv_type_etf: '🗂️ ETF / Fund',
      inv_type_crypto: '₿ Crypto',
      inv_type_commodity: '🥇 Commodity (Gold, Silver…)',
      inv_type_bond: '📄 Bond',
      inv_type_cash: '💵 Cash / Currency',
      inv_type_stock_lbl: 'US Stock', inv_type_stock_other_lbl: 'Other Stock', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Crypto',
      inv_type_commodity_lbl: 'Commodity', inv_type_bond_lbl: 'Bond', inv_type_cash_lbl: 'Cash',
      inv_exchange_label: 'Exchange / Market',
      inv_exchange_us: '🇺🇸 US Market (NYSE / NASDAQ)',
      inv_exchange_other: '🌐 Other Exchanges',
      inv_auto_price_info: 'Stock, ETF and crypto prices are automatically updated via Alpha Vantage.',
      inv_price_currency_label: 'Price Currency',
      inv_symbol_label: 'Symbol / Ticker',
      inv_display_name_label: 'Display Name',
      inv_quantity_label: 'Quantity',
      inv_buy_price_label: 'Buy Price',
      inv_buy_date_label: 'Buy Date',
      inv_dist_panel: 'Asset Distribution',
      inv_perf_panel: 'Performance Analysis',
      inv_portfolio_panel: 'Portfolio Detail',
      inv_kpi_portfolio_label: 'PORTFOLIO VALUE',
      inv_kpi_total_return: 'total return',
      inv_kpi_vs_invested: 'vs invested',
      inv_kpi_cost_basis: 'cost basis',
      inv_kpi_asset_count_label: 'ASSET COUNT',
      inv_kpi_instruments: 'instruments',
      inv_pnl_total: 'Total P&L',
      inv_pnl_daily: 'Daily P&L',
      inv_pnl_weekly: 'Weekly P&L',
      inv_pnl_monthly: 'Monthly P&L',
      inv_period_daily: 'Daily',
      inv_period_weekly: 'Weekly',
      inv_period_monthly: 'Monthly',
      inv_period_3month: '3-Month',
      inv_period_alltime: 'All Time',
      time_daily_total_sub: 'Daily total time',
      inv_no_assets_legend: 'No assets in portfolio',
      inv_no_assets_table: 'No assets yet — click "Add Asset" to get started',
      inv_by_symbol: 'Assets',
      inv_by_type: 'By Type',
      inv_top_gainers: 'Gainers',
      inv_top_losers: 'Losers',
      inv_updating: 'Updating prices…',
      inv_refresh_in: 'Available in {0} min',
      inv_refresh_title: 'Update Prices (API)',
      inv_rate_input_title: 'Manual rate — updates automatically',
      inv_api_keys_title: 'API Keys',
      inv_wait_min: 'Wait {0} more minutes to refresh',
      inv_api_limit: 'Alpha Vantage daily limit reached (25 req/day). Prices will update tomorrow.',
      inv_asset_merged: '{0} updated — avg cost: {1}, total: {2}',
      inv_asset_added: 'Asset added',
      inv_asset_updated: 'Asset updated',
      inv_manual_price_label: '{0} — Current Price ({1})',
      inv_manual_price_note: '{0} denominated in {1}',
      inv_invalid_price: 'Enter a valid price',
      inv_price_saved: 'Price saved',
      inv_optional_suffix: '— optional',
      inv_fx_error: 'Could not fetch rate data',
      inv_fx_updated: 'All rates updated',
      inv_enter_symbol: 'Enter symbol',
      inv_invalid_qty: 'Enter a valid quantity',
      inv_invalid_buy: 'Enter a valid buy price',
      inv_buy_price_sym: 'Buy Price {0}',
      inv_manual_price_info: 'The price you enter is only used for portfolio value calculations; your buy price remains unchanged.',
      inv_no_history_note: 'No historical data, showing total',
      inv_edit_price_title: 'Edit current price',
      inv_col_asset: 'Asset / Symbol',
      inv_col_type: 'Type',
      inv_col_qty: 'Qty',
      inv_col_cost: 'Avg. Cost',
      inv_col_price: 'Current Price',
      inv_col_value: 'Total Value',
      inv_col_pnl: 'Total P&L',
      inv_col_pct: 'Allocation %',
      inv_pnl_toggle_title: 'Toggle P&L view',
      inv_tab_deposits: 'Deposits',
      inv_dep_add: 'Add Deposit',
      inv_dep_edit: 'Edit Deposit',
      inv_dep_type_term: 'Term Deposit',
      inv_dep_type_free: 'Flexible / Daily Interest',
      inv_dep_bank: 'Bank Name',
      inv_dep_bank_ph: 'Chase, Wells Fargo…',
      inv_dep_principal: 'Principal',
      inv_dep_rate: 'Annual Interest Rate (%)',
      inv_dep_term: 'Term Length',
      inv_dep_term_1m: '1 Month (30 days)',
      inv_dep_term_3m: '3 Months (90 days)',
      inv_dep_term_6m: '6 Months (180 days)',
      inv_dep_term_1y: '1 Year (365 days)',
      inv_dep_term_custom: 'Custom',
      inv_dep_term_custom_days: 'Number of Days',
      inv_dep_term_custom_ph: 'E.g: 45',
      inv_dep_free_info: 'Daily compound interest — your money grows every day without waiting for maturity.',
      inv_dep_start: 'Start Date',
      inv_dep_notes: 'Notes',
      inv_dep_current_val: 'Current Value',
      inv_dep_daily_gain: 'Daily Gain',
      inv_dep_accrued: 'Accrued Interest',
      inv_dep_maturity: 'Maturity Date',
      inv_dep_days_left: 'Remaining',
      inv_dep_days_left_val: '{0} days',
      inv_dep_expired: 'Matured',
      inv_dep_no_deposits: 'No deposit accounts yet',
      inv_dep_confirm_delete: 'Are you sure you want to delete this deposit?',
      inv_dep_skip_confirm: "Don't ask again today",
      inv_sub_stocks:       'Stocks / ETF',
      inv_dep_status:       'Status',
      inv_dep_deleted: 'Deposit deleted',
      inv_dep_view_cards:   'Cards',
      inv_dep_view_table:   'Table',
      inv_dep_maturity_interest: 'Maturity Interest',
      inv_dep_total_return: 'At Maturity',
      inv_dep_status_active: 'Active',
      inv_dep_search_ph:    'Search bank...',
      inv_tab_hist:         'Transaction History',
      inv_dep_saved: 'Deposit saved',
      inv_dep_free_note: 'Flexible account: daily compound interest, no fixed term.',
      inv_dep_term_note: 'Term deposit: simple interest paid at maturity.',

      // Dashboard panels
      dash_this_week: 'This Week',
      dash_this_month: 'This Month',
      dash_this_year: 'This Year',
      dash_week_time: 'This Week Time Distribution',
      dash_month_time: 'This Month Time Distribution',
      dash_year_time: 'This Year Time Distribution',
      dash_week_spent: 'THIS WEEK SPENT',
      dash_month_spent: 'THIS MONTH SPENT',
      dash_year_spent: 'THIS YEAR SPENT',
      dash_upcoming: 'Upcoming Plans',
      dash_inv_dist: 'Investment Distribution',
      dash_budget_status: 'Budget Status',
      dash_dreams_panel: 'Dreams',

      // Gym
      nav_gym: 'Gym',
      gym_add_btn: 'Add Workout',
      gym_add_modal: 'New Workout',
      gym_edit_modal: 'Edit Workout',
      gym_type_label: 'Workout Type',
      gym_type_strength: 'Strength Training',
      gym_type_cardio: 'Cardio',
      gym_type_flexibility: 'Flexibility / Yoga',
      gym_type_crossfit: 'Crossfit / HIIT',
      gym_type_sport: 'Sport / Game',
      gym_type_other: 'Other',
      gym_duration_label: 'Duration (minutes)',
      gym_notes_label: 'Notes',
      gym_notes_placeholder: 'Workout notes...',
      gym_exercises_label: 'Exercises',
      gym_add_exercise_btn: 'Add Exercise',
      gym_exercise_name_ph: 'Exercise name (e.g. Bench Press)',
      gym_sets_label: 'Sets',
      gym_reps_label: 'Reps',
      gym_weight_label: 'Weight (kg)',
      gym_ex_duration_label: 'Duration (min)',
      gym_ex_distance_label: 'Distance (km)',
      gym_no_workouts: 'No workouts logged yet.',
      gym_workout_added: 'Workout added',
      gym_workout_updated: 'Workout updated',
      gym_workout_deleted: 'Workout deleted',
      gym_confirm_delete: 'Are you sure you want to delete this workout?',
      gym_kpi_week: 'THIS WEEK',
      gym_kpi_month: 'THIS MONTH',
      gym_kpi_total_hours: 'TOTAL TIME',
      gym_kpi_streak: 'ACTIVE STREAK',
      gym_kpi_sessions: 'sessions',
      gym_kpi_hours_sub: 'hours',
      gym_kpi_streak_sub: 'days',
      gym_off_days: 'Rest Days',
      gym_off_day_title: 'Rest day — does not break streak',
      gym_panel_chart: 'Weekly Workout Frequency',
      gym_panel_prs: 'Personal Records',
      gym_panel_history: 'Workout History',
      gym_pr_exercise: 'Exercise',
      gym_pr_weight: 'Best (kg)',
      gym_pr_date: 'Date',
      gym_no_prs: 'No personal records yet.',
      gym_this_week: 'This Week',
      gym_sessions_suffix: 'sessions',
      gym_minutes_label: 'min',
      gym_no_exercises: 'No exercises added',
      gym_type_badge_strength: 'Strength',
      gym_type_badge_cardio: 'Cardio',
      gym_type_badge_flexibility: 'Flexibility',
      gym_type_badge_crossfit: 'Crossfit',
      gym_type_badge_sport: 'Sport',
      gym_type_badge_other: 'Other',
      gym_panel_progress: 'Exercise Progress',
      gym_panel_muscles: 'Muscle Group Distribution',
      gym_panel_volume: 'Weekly Volume',
      gym_panel_body: 'Body Measurements',
      gym_panel_templates: 'Workout Templates',
      gym_pr_1rm: 'Est. 1RM',
      gym_rpe_label: 'Intensity (RPE 1–10)',
      gym_distance_label: 'Distance (km)',
      gym_muscle_label: 'Muscle Group',
      gym_muscle_none: '—',
      gym_muscle_chest: 'Chest',
      gym_muscle_back: 'Back',
      gym_muscle_legs: 'Legs',
      gym_muscle_shoulders: 'Shoulders',
      gym_muscle_arms: 'Arms',
      gym_muscle_core: 'Core',
      gym_muscle_cardio: 'Cardio',
      gym_progress_select: 'Select exercise...',
      gym_progress_no_data: 'No data for this exercise.',
      gym_volume_unit: 'ton volume',
      gym_kpi_volume: 'WEEKLY VOLUME',
      gym_kpi_volume_sub: 'tons (sets×reps×kg)',
      gym_kpi_goal: 'WEEKLY GOAL',
      gym_kpi_goal_sub: 'sessions / goal',
      gym_weekly_goal_label: 'Weekly goal (days)',
      gym_body_modal_title: 'Add Body Measurement',
      gym_body_weight_label: 'Body Weight (kg)',
      gym_body_fat_label: 'Body Fat (%)',
      gym_body_waist_label: 'Waist (cm)',
      gym_body_chest_label: 'Chest (cm)',
      gym_body_arm_label: 'Arm (cm)',
      gym_body_leg_label: 'Leg (cm)',
      gym_body_add_btn: 'Add Measurement',
      gym_body_added: 'Measurement added',
      gym_body_deleted: 'Measurement deleted',
      gym_body_no_data: 'No body measurements yet.',
      gym_body_weight_chart: 'Body Weight (kg)',
      gym_body_table_date: 'Date',
      gym_body_table_weight: 'Weight',
      gym_body_table_fat: 'Fat %',
      gym_body_table_waist: 'Waist',
      gym_no_muscle_data: 'Add exercises with muscle groups to see distribution.',
      gym_template_modal_title: 'Save Template',
      gym_template_name_ph: 'Template name (e.g. Push Day)',
      gym_template_save_btn: 'Save as Template',
      gym_template_load_btn: 'Load Template',
      gym_template_added: 'Template saved',
      gym_template_deleted: 'Template deleted',
      gym_no_templates: 'No saved templates yet.',
      gym_template_confirm_delete: 'Are you sure you want to delete this template?',
      gym_load_template_title: 'Select Template',
      gym_volume_label: 'Volume',
      gym_unit_kg: 'kg',
      gym_unit_lb: 'lb',
      gym_body_edit_modal_title: 'Edit Measurement',
      gym_body_updated: 'Measurement updated',
      gym_template_rename_title: 'Rename Template',
      gym_template_updated: 'Template updated',
      gym_template_edit_title: 'Edit Template',
      gym_template_duplicate: 'Duplicate',
      gym_template_duplicated: 'Template duplicated',
      gym_template_type_label: 'Template Type',
    },

    zh: {
      // UI chrome
      settings_title: '设置',
      settings_lang: '语言',
      settings_lang_tr: '土耳其语',
      settings_lang_en: '英语',
      settings_lang_zh: '中文',
      settings_lang_es: '西班牙语',
      settings_lang_fr: '法语',
      settings_currency: '您使用的货币',
      settings_ui_scale: '界面缩放',
      settings_tab_ui: '界面',
      settings_tab_panels: '面板',
      settings_panels_hint: '隐藏不需要的模块 — 数据将被保留，仅从界面中移除。',
      btn_hide: '隐藏',
      btn_show: '显示',
      settings_theme: '主题模式',
      settings_theme_dark: '深色',
      settings_theme_midnight: '午夜',
      settings_theme_ocean: '海洋',
      settings_theme_forest: '森林',
      settings_theme_sunset: '日落',
      settings_theme_rose: '玫瑰',
      settings_theme_amber: '琥珀',
      settings_theme_crimson: '深红',
      settings_theme_nebula: '星云',
      settings_theme_arctic: '北极',
      settings_theme_neon: '霓虹',
      settings_theme_white: '白色',
      settings_data_title: '数据管理',
      settings_export_btn: '导出',
      settings_export_desc: '将所有数据下载为 JSON 文件。',
      settings_import_btn: '导入',
      settings_import_title: '导入数据',
      settings_import_desc: '加载之前导出的 JSON 文件。',
      settings_import_confirm: '所有现有数据将被替换为文件中的数据。继续？',
      settings_import_ok: '数据加载成功。',
      settings_import_err: '文件格式无效。',
      settings_delete_btn: '删除所有数据',
      settings_delete_title: '删除所有数据',
      settings_delete_msg: '您即将永久删除<strong>所有数据</strong>——预算、计划、习惯、投资、API 密钥和设置。此操作<strong>无法撤销</strong>。',
      settings_delete_confirm: '⚠️ 警告\n\n您即将永久删除所有数据（预算、计划、习惯、投资、API 密钥…）。\n\n此操作无法撤销。确定吗？',
      settings_delete_ok: '所有数据已删除。',
      seed_warning_label: '演示数据已启用',
      seed_warning_desc: '系统已加载示例数据 — 请前往设置清除并输入您自己的数据',
      settings_delete_choice_title: '删除数据',
      settings_delete_choice_subtitle: '选择重置方式：',
      settings_delete_reset_label: '重置为演示',
      settings_delete_reset_desc: '删除您的个人数据并恢复演示数据，面板仍显示内容。',
      settings_delete_reset_btn: '重置为演示',
      settings_delete_wipe_label: '删除所有内容',
      settings_delete_wipe_desc: '永久删除所有数据（包括演示数据），应用将完全空白。',
      settings_delete_wipe_btn: '删除所有内容',
      settings_delete_wipe_confirm: '所有数据（包括演示数据）将被永久删除，确定吗？',
      settings_delete_wipe_ok: '所有数据已删除。',
      settings_delete_reset_ok: '已重置为演示数据。',
      settings_api_title: 'API 密钥',
      settings_api_hint: '投资模块获取实时价格所需。',
      settings_api_av: 'Alpha Vantage（股票、ETF、加密货币）',
      settings_api_fx: 'Exchange Rates（汇率）',
      settings_api_save: '保存密钥',
      settings_api_saved: 'API 密钥已保存。',
      settings_update_rates: '更新汇率',
      settings_update_rates_title: '立即获取所有汇率',
      panel_manager_title: '面板可见性',
      panel_on: '开',
      panel_off: '关',
      panel_empty: '此页面没有可管理的面板。',
      privacy_show: '显示数值',
      privacy_hide: '隐藏数值',
      sidebar_settings: '设置',
      sidebar_help: '帮助',
      sidebar_privacy: '隐私',
      sidebar_toggle: '收起 / 展开菜单',
      priority_high: '高',
      priority_medium: '中',
      priority_low: '低',
      hours_suffix: '时',
      mins_suffix: '分',
      secs_suffix: '秒',

      // nav & topbar labels
      nav_dashboard: '仪表盘',
      nav_pomodoro: '专注模式',
      nav_time: '时间追踪',
      nav_habits: '习惯',
      nav_plans: '计划',
      nav_goals: '梦想与目标',
      nav_budget: '预算',
      nav_investments: '投资',

      // days (short)
      day_mon: '周一', day_tue: '周二', day_wed: '周三',
      day_thu: '周四', day_fri: '周五', day_sat: '周六', day_sun: '周日',

      // Dashboard
      dash_net_worth: '净资产',
      dash_today_spent: '今日支出',
      dash_habits_done: '已完成习惯',
      dash_active_goals: '活跃目标',
      dash_habits_pct: '今日 {0}%',
      dash_goals_of: '共 {0} 个目标',
      dash_net_worth_change: '投资 + 存款 + 预算',
      dash_nw_inv: '投资',
      dash_nw_dep: '存款',
      dash_nw_bud: '预算',
      dash_over_limit: '超出限额',
      dash_in_limit: '在限额内',
      dash_budget_total: '总预算',
      dash_completion_rate: '完成率',
      dash_avg_progress: '平均进度',
      dash_no_plans: '暂无即将到来的计划',
      dash_today: '今天',
      dash_tomorrow: '明天',
      dash_no_assets: '投资组合中没有资产',
      dash_no_sessions: '暂无会话',
      dash_n_more: '+{0} 更多',
      dash_today_sessions: '今日番茄钟',
      dash_week_total: '本周',
      dash_focused: '已专注',
      dash_focus_month: '本月',
      dash_focus_streak: '连续天数',
      dash_focus_streak_days: '{0}天',
      dash_focus_cats_week: '本周类别',
      dash_focus_no_logs: '暂无时间记录',
      dash_recent_tasks: '最近任务',
      dash_no_goals: '暂无梦想',
      dash_in_progress: '进行中',
      dash_completed: '已完成',
      dash_no_spending: '暂无支出数据',
      dash_no_workouts: '暂无训练记录',
      dash_gym_week_dur: '本周时长',
      dash_gym_streak_lbl: '连续',
      dash_gym_exercises: '个动作',
      dash_surplus: '结余',
      dash_over: '超出预算',
      dash_hour_label: '小时',
      asset_stock: '股票',
      asset_stock_us: '美股',
      asset_stock_other: '其他交易所股票',
      asset_etf: 'ETF',
      asset_crypto: '加密货币',
      asset_commodity: '大宗商品',
      asset_bond: '债券',
      asset_cash: '现金',

      // Plans
      plans_todo: '待办',
      plans_progress: '进行中',
      plans_done: '已完成',
      plans_kpi_pending: '待办任务',
      plans_kpi_ongoing: '进行中任务',
      plans_kpi_from_total: '共 {0} 个',
      plans_no_tasks: '暂无任务',
      plans_start: '开始',
      plans_complete: '完成',
      plans_title_col: '标题',
      plans_due_col: '日期',
      plans_cat_col: '分类',
      plans_status_col: '状态',
      plans_priority_col: '优先级',
      plans_added: '计划已添加',
      plans_updated: '计划已更新',
      plans_deleted: '计划已删除',
      plans_confirm_delete: '确定要删除此计划吗？',
      plans_edit_modal: '编辑计划',
      plans_subtasks: '子计划',
      plans_subtask_placeholder: '添加子计划...',
      plans_subtask_count: '{0}/{1} 已完成',
      plans_no_subtasks: '暂无子计划',
      plans_confirm_delete_sub: '确定要删除此子计划吗？',
      status_todo: '待办',
      status_progress: '进行中',
      status_done: '已完成',

      // Time
      time_today_kpi: '今天',
      time_week_kpi: '本周',
      time_month_kpi: '本月',
      time_focus_pct: '⏱ {0}% 专注',
      time_total_dur: '总时长',
      time_last7: '最近 7 天',
      time_last30: '最近 30 天',
      time_duration_label: '时长',
      time_no_logs: '暂无记录',
      time_auto_end: '⏱ 自动',
      time_history_title: '每日分布：{0}',
      time_min_suffix: '分',
      time_date_col: '日期',
      time_category_col: '分类',
      time_project_col: '项目',
      time_start_col: '开始',
      time_end_col: '结束',
      time_dur_col: '时长',

      // Habits
      habits_no_habits: '暂无习惯。',
      habits_no_day_selected: '未选择日期',
      habits_daily: '固定 — 每天',
      habits_edit: '编辑',
      habits_delete: '删除',
      habits_skip: '今天跳过',
      habits_unskip: '撤销跳过',
      habits_skipped_section: '今天不做',
      habits_all_done: '所有习惯已完成！',
      habits_none_today: '今天没有习惯。',
      habits_total: '习惯总数',
      habits_today_kpi: '今天',
      habits_streak_best: '最长连续',
      habits_completed_label: '已完成',
      habits_remaining_label: '剩余',
      habits_week_title: '第',
      habits_week_n: '第 {0} 周',
      habits_30_day: '30 天历史',
      habits_older: '← 更早',
      habits_today_arrow: '今天 →',
      habits_habit_col: '习惯',
      habits_pct_col: '%',
      habits_time_badge: '定时',
      habits_added: '习惯已添加',
      habits_deleted: '习惯已删除',
      habits_confirm_delete: '确定要删除此习惯吗？',
      habits_current_streak: '当前连续',
      habits_best_streak: '最佳连续',

      // Goals
      goals_active_kpi: '活跃目标',
      goals_avg_progress: '平均进度',
      goals_total_kpi: '总目标数',
      goals_none: '暂未添加目标...',
      goals_days_left: '还有 {0} 天',
      goals_overdue: '已逾期',
      goals_update_progress: '更新进度',
      goals_progress_prompt: '新进度百分比（0-100）：',
      goals_added: '目标已添加',
      goals_updated: '目标已更新',
      goals_deleted: '目标已删除',
      goals_confirm_delete: '确定要删除此目标吗？',
      goals_dream_added: '梦想已添加',
      goals_dream_updated: '梦想已更新',
      goals_dream_deleted: '梦想已删除',
      goals_all_done: '🎉 所有步骤已完成！',
      goals_days_overdue: '逾期 {0} 天',
      goals_ms_empty_card: '暂无里程碑 — 从编辑中添加',
      goals_ms_empty_modal: '暂未添加里程碑',
      goals_ms_confirm_del: '确定要删除此子目标吗？',
      goals_none_dreams: '暂未添加梦想',
      goals_cat_kariyer: '职业',
      goals_cat_seyahat: '旅行',
      goals_cat_saglik: '健康',
      goals_cat_egitim: '教育',
      goals_cat_kisisel: '个人',
      goals_cat_finansal: '财务',

      // Budget
      bud_income_kpi: '收入',
      bud_expense_kpi: '支出',
      bud_balance_kpi: '剩余预算',
      bud_total_income: '总收入',
      bud_total_expense: '总支出',
      bud_kpi_pct_left: '剩余 {0}% 预算',
      bud_kpi_over: '超出 {0}%',
      bud_budget_label: '预算',
      bud_actual_label: '实际',
      bud_income_label: '收入',
      bud_expense_label: '支出',
      bud_summary_title: '预算摘要',
      bud_source_col: '来源',
      bud_budget_col: '预算',
      bud_actual_col: '实际',
      bud_usage_col: '使用率',
      bud_remaining_footer: '剩余',
      bud_no_groups: '暂无分组',
      bud_no_transactions: '暂无交易',
      bud_type_income: '收入',
      bud_type_expense: '支出',
      bud_surplus: '结余',
      bud_over: '超出',
      bud_sub_count: '{0} 个子分类',
      bud_group_added: '分组已添加',
      bud_group_deleted: '分组已删除',
      bud_trans_added: '交易已添加',
      bud_add_continue: '添加并继续',
      bud_trans_deleted: '交易已删除',
      bud_confirm_delete_group: '确定要删除此分组及所有关联交易吗？',
      bud_confirm_delete_trans: '确定要删除此交易吗？',
      bud_panel_bar: '预算与实际对比',
      bud_panel_pie: '支出分布',
      bud_panel_timeline: '收支趋势',
      bud_panel_daily: '我什么时候消费？',
      bud_panel_subcats: '我的钱花在哪里？',
      bud_panel_net_history: '净储蓄',
      bud_net_history_title: '净储蓄（近{0}个月）',
      bud_net_month: '第{0}月',
      bud_sub_col: '子分类',
      bud_perc_col: '占比',
      bud_details: '详情',
      bud_daily_balance: '余额',
      bud_daily_inc_col: '总收入',
      bud_daily_exp_col: '总支出',
      bud_panel_transactions: '交易',
      bud_desc_col: '描述',
      bud_date_col: '日期',
      bud_group_col: '分组',
      bud_amount_col: '金额',
      bud_type_col: '类型',

      // Investments
      inv_total_value: '总价值',
      inv_total_cost: '总成本',
      inv_pnl: '盈亏',
      inv_pnl_pct: '收益率 %',
      inv_asset_label: '资产',
      inv_more_assets: '更多资产',
      inv_type_label: '类型',
      inv_no_assets: '暂未添加资产',
      inv_asset_added: '资产已添加',
      inv_asset_updated: '资产已更新',
      inv_asset_deleted: '资产已删除',
      inv_confirm_delete: '确定要删除此资产吗？',
      inv_just_now: '刚刚',
      inv_sell: '卖出',
      inv_sell_title: '卖出资产',
      inv_sell_qty: '卖出数量',
      inv_buy_qty: '买入数量',
      inv_sell_price: '卖出价格',
      inv_sell_date: '卖出日期',
      inv_sell_preview: '预计盈亏',
      inv_sell_confirm: '卖出',
      inv_sell_success: '资产已卖出',
      inv_sell_err_qty: '数量无效',
      inv_sell_err_price: '价格无效',
      inv_sell_max: '可用',
      inv_realized_pnl: '已实现盈亏',
      inv_buy: '买入',
      inv_buy_title: '买入更多',
      inv_buy_confirm: '买入',
      inv_buy_success: '买入已记录',
      inv_buy_new_avg: '新平均成本',
      inv_avg_cost: '平均成本',
      inv_select_asset: '选择资产',
      inv_no_assets: '投资组合中没有资产',
      inv_trade_history: '交易历史',
      inv_col_trade_type: '类型',
      inv_col_trade_price: '价格',
      inv_trade_type_buy: '买入',
      inv_trade_type_sell: '卖出',
      inv_no_trades: '暂无交易记录',
      inv_edit_trade: '编辑交易',
      inv_delete_trade: '删除交易',
      inv_trade_deleted: '交易已删除',
      inv_trade_updated: '交易已更新',
      inv_col_actions: '操作',
      inv_trade_action: '买卖资产',
      inv_trade_filter_all: '日期',
      inv_tab_portfolio: '投资组合',
      inv_tab_trades: '交易记录',
      inv_history_btn: '历史记录',
      inv_hist_tab_trades: '交易',
      inv_hist_tab_deposits: '存款',
      inv_dep_term_short: '定期',
      inv_dep_free_short: '活期',
      inv_dep_type_label: '类型',
      inv_trade_search: '代码、名称...',
      inv_trade_opt_new_desc: '添加投资组合中尚未存在的新资产',
      inv_trade_opt_buy_desc: '买入更多现有资产，平均成本自动更新',
      inv_trade_opt_sell_desc: '卖出现有资产的部分或全部',
      inv_mins_ago: '{0} 分钟前',
      inv_hours_ago: '{0} 小时前',
      inv_days_ago: '{0} 天前',
      inv_manual: '手动',
      inv_period_1d: '1天',
      inv_period_1w: '1周',
      inv_period_1m: '1月',
      inv_period_3m: '3月',
      inv_period_6m: '6月',
      inv_period_1y: '1年',

      // Pomodoro
      pomo_work: '番茄钟',
      pomo_short: '短休息',
      pomo_long: '长休息',
      pomo_flow: '心流模式',
      pomo_countdown: '倒计时',
      pomo_overtime: '超时',
      pomo_start: '开始',
      pomo_resume: '继续',
      pomo_pause: '暂停',
      pomo_reset: '重置',
      pomo_session_saved: '会话已保存 — {0}',
      pomo_today_sessions: '今日会话',
      pomo_week_total: '本周总计',
      pomo_total_sessions: '总会话数',
      pomo_flags: '{0} 个标记',
      pomo_flags_count: '已标记 {0} 个',
      pomo_flags_none: '无标记',
      pomo_flow_save_desc: '记录到最后标记 {0}；其余丢弃。',
      pomo_flow_save_none: '无标记 — 不会记录任何内容。',
      pomo_flow_hard_flow: '不保存任何内容 — 计时器重置为 0:00。',
      pomo_flow_hard_count: '不保存任何内容 — 计时器重置到开始。',
      pomo_confirm_reset: '确定要重置计时器吗？',
      pomo_confirm_del_todo: '确定要删除此任务吗？',
      pomo_add_sub_ph: '添加子任务...',
      pomo_mode_switch_title: '模式切换',
      pomo_mode_switch_msg: '您正在执行模式切换。',
      pomo_mode_switch_flags: '切换模式时，已保存的标记将记录到时间日志中。',
      pomo_mode_switch_duration: '将保存的时长：{0}',
      pomo_mode_switch_no_flags: '暂无标记 — 切换模式将重置您的计时进度。',
      pomo_mode_switch_confirm: '继续',
      pomo_mode_switch_dontask: '今天不再提示',
      pomo_toast_overtime: '时间到{0} ⚡ 准备好后按完成',
      pomo_toast_break_done: '休息结束！继续工作 💪',
      pomo_toast_countdown_done: '倒计时完成！🎯',
      pomo_flow_saved: '心流会话已保存 — {0} 🌊',
      pomo_kpi_today: '今日已完成',
      pomo_kpi_total: '总会话数',
      pomo_kpi_flow: '心流时间',
      pomo_kpi_streak: '每日连续',
      pomo_sessions_n: '{0} 次会话',
      pomo_days_n: '{0} 天',
      pomo_focus_sub: '专注',
      pomo_all_time: '所有时间',
      pomo_today_sub: '今天',
      pomo_streak_sub: '连续',
      pomo_vs_yday_more: '比昨天多',
      pomo_vs_yday_less: '比昨天少',
      pomo_vs_yday_none: '昨天无数据',
      pomo_switch_running_label: '计时器运行中',
      pomo_task_switch_current: '当前任务',
      pomo_switch_no_today: '今天不再询问',
      pomo_todo_empty: '暂无任务。点击"添加任务"。',
      pomo_todo_all_done: '所有任务已完成！',
      pomo_task_added: '任务已添加',
      pomo_task_updated: '任务已更新',
      pomo_task_select: '选择任务',
      pomo_no_tasks_today: '今天没有任务',
      pomo_todo_hint: '从下方待办列表添加任务',
      pomo_lap_split: '分段',
      pomo_lap_total: '总计',
      pomo_lap_time: '时间',
      pomo_flag_deleted: '标记已删除',
      pomo_flag_del_confirm_msg: '此标记将被永久删除。是否继续？',
      pomo_flag_del_no_today: '今天不再显示',
      pomo_subtasks_header: '子任务',
      pomo_minute_n: '第 {0} 分钟',
      pomo_settings_close: '关闭',
      pomo_fullscreen: '全屏',
      pomo_minimize: '最小化',
      pomo_task_switch: '切换任务',
      pomo_switch_running_msg: '计时器正在运行。切换任务将重置番茄钟计数器。是否继续？',
      pomo_switch_elapsed_msg: '此任务已有时间流逝。切换将重置番茄钟计数器。是否继续？',
      pomo_switch_confirm_btn: '切换',
      pomo_btn_flow: '心流模式',
      pomo_btn_pomodoro: '番茄钟',
      pomo_btn_countdown: '倒计时',
      pomo_btn_short: '短休息',
      pomo_btn_long: '长休息',
      pomo_btn_finish: '完成',
      pomo_finish_confirm_title: '完成会话',
      pomo_finish_confirm_msg: '您当前的会话将被保存。时间：',
      pomo_finish_select_msg: '选择完成方式：',
      pomo_finish_opt1_title: '保存当前时间',
      pomo_finish_opt1_desc: '将保存时长 {0} 并结束会话。',
      pomo_finish_opt2_title: '用标记完成',
      pomo_finish_opt2_desc: '记录到最后标记 {0} 并完成会话。',
      pomo_finish_opt2_no_flags: '无标记 — 请先添加标记。',
      pomo_btn_flag: '标记',
      pomo_task_label: '当前任务',
      pomo_todo_title: '待办清单',
      pomo_todo_subtitle: '今日任务',
      pomo_todo_done_count: '已完成',
      pomo_todo_add_btn: '添加任务',
      pomo_edit_task: '编辑任务',
      pomo_todo_completed_section: '已完成',
      pomo_settings_pomo_tip: '每 4 个番茄钟后开始长休息。',
      pomo_settings_countdown_tip: '设置在计时器停止时生效。',
      pomo_settings_fs_kpi: '信息面板',
      pomo_settings_duration: '时长',
      pomo_flow_reset_title: '重置选项',
      pomo_flow_reset_question: '您想怎么做？',
      pomo_flow_opt1_title: '保存标记并重置',
      pomo_flow_opt1_desc: '记录到最后一个标记，丢弃其余部分。',
      pomo_flow_opt2_title: '从最后标记继续',
      pomo_flow_opt2_desc: '将计时器倒回到最后一个标记并继续。',
      pomo_flow_opt3_title: '完全重置',
      pomo_flow_opt3_desc_flow: '不保存任何内容 — 计时器重置为 0:00。',
      pomo_flow_opt3_desc: '不保存任何内容 — 计时器重置到开始。',
      pomo_flow_opt3_desc_count: '不保存任何内容 — 倒计时重置为 00:00:00。',
      pomo_new_todo_title: '新任务',
      pomo_edit_todo_title: '编辑任务',
      pomo_form_task: '任务',
      pomo_form_duration: '预计时长',
      pomo_form_category: '分类',
      pomo_form_note: '备注',
      pomo_form_subtasks: '子任务',
      pomo_form_add_subtask: '添加子任务',
      pomo_form_optional: '（可选）',
      pomo_form_minutes: '分钟',
      pomo_exit_fullscreen: '最小化',
      pomo_short_break_label: '短休息',
      pomo_long_break_label: '长休息',
      pomo_cat_work: '工作',
      pomo_cat_learn: '学习',
      pomo_cat_exercise: '运动',
      pomo_cat_social: '社交',
      pomo_cat_sleep: '睡眠',
      pomo_cat_other: '其他',
      pomo_default_project: '自由流',

      // Focus Widget
      fw_pause_resume: '暂停 / 继续',
      fw_add_flag: '添加标记',
      fw_stop: '停止',
      fw_open_focus: '前往专注模式',
      fw_paused: '已暂停',

      // Pomodoro todo form
      pomo_task_text_label: '任务',
      pomo_est_duration: '预计时长',
      pomo_pomodoro_count: 'Pomodoro 数量',
      lbl_optional: '（可选）',
      pomo_minutes_label: '分钟',
      pomo_note_label: '备注',
      pomo_subtasks_label: '子任务',
      pomo_add_subtask_btn: '添加子任务',
      pomo_subtask_placeholder: '子任务...',
      pomo_task_placeholder: '要做的任务...',
      pomo_note_placeholder: '附加备注...',
      time_project_placeholder: '项目名称（可选）',

      // Common buttons & labels
      btn_cancel: '取消',
      btn_back: '← 返回',
      btn_add: '添加',
      btn_save: '保存',
      btn_edit: '编辑',
      btn_delete: '删除',
      dm_noask_today: '今天不再询问',
      btn_details: '详情 →',
      btn_all: '全部 →',
      lbl_title: '标题',
      lbl_desc: '描述',
      lbl_category: '分类',
      lbl_date: '日期',
      lbl_priority: '优先级',
      lbl_notes: '备注',
      lbl_name: '名称',
      lbl_color: '颜色',
      lbl_emoji: '表情',
      lbl_type: '类型',
      lbl_amount: '金额',
      lbl_all: '全部',
      lbl_manual: '手动',
      lbl_project: '项目',
      lbl_optional: '（可选）',
      lbl_status: '状态',

      // Plans modals/UI
      plans_add_modal: '新计划',
      plans_add_btn: '添加计划',
      plans_kanban_view: '看板',
      plans_list_view: '列表',
      plans_end_date: '截止日期',
      plans_cat_project: '项目',
      plans_cat_education: '教育',
      plans_cat_finance: '财务',
      plans_cat_investment: '投资',
      plans_cat_personal: '个人',
      plans_cat_health: '健康',
      plans_cat_other: '其他',
      plans_title_placeholder: '任务标题...',
      plans_notes_placeholder: '附加备注...',
      plans_pri_high: '高',
      plans_pri_medium: '中',
      plans_pri_low: '低',

      // Time modals/UI
      time_add_modal: '添加记录',
      time_history_modal: '历史视图',
      time_add_btn: '添加记录',
      time_project_label: '项目 / 活动',
      time_task_today: '今日任务',
      time_task_other: '其他任务',
      time_task_create: '创建任务',
      time_task_required: '任务标题不能为空',
      time_start_label: '开始',
      time_end_label: '结束',
      time_panel_30day: '最近 30 天',
      time_panel_daily: '每日分布（最近 7 天）',
      time_panel_logs: '时间记录',
      time_panel_weekly: '每周摘要',
      time_filter_all: '全部',
      time_filter_manual: '手动',
      time_filter_auto: '⏱ 自动',
      time_filter_date_placeholder: '日期',
      cdp_range_hint: '请选择结束日期',
      time_col_date: '日期',
      time_col_category: '分类',
      time_col_project: '项目',
      time_col_range: '时间范围',
      time_col_duration: '时长',
      time_hist_subtitle: '月度和周度细分',
      time_prev_month: '上个月',
      time_hist_total: '总计',
      time_hist_tab_summary: '摘要',
      time_hist_tab_logs: '日志',
      time_hist_active_days: '活跃天',
      time_hist_daily_avg: '日均',
      time_hist_top_cat: '最多',
      time_next_month: '下个月',
      time_invalid_range: '请输入有效的时间范围',
      time_log_added: '记录已添加',
      time_log_deleted: '记录已删除',
      time_del_confirm_msg: '此时间记录将被永久删除。是否继续？',
      time_del_no_today: '今天不再显示',
      time_edit_modal: '编辑记录',
      time_log_updated: '记录已更新',

      // Habits modals/UI
      habits_add_modal: '新习惯',
      habits_manage_modal: '管理习惯',
      habits_edit_modal: '编辑习惯',
      habits_add_btn: '添加习惯',
      habits_name_label: '习惯名称',
      habits_icon_label: '图标（表情）',
      habits_type_label: '类型',
      habits_days_label: '哪几天？',
      habits_type_permanent: '固定',
      habits_type_permanent_desc: '每天自动显示',
      habits_type_timed: '定时',
      habits_type_timed_desc: '在选定的日期显示',
      habits_today_done: '今日已完成',
      habits_week_success: '每周完成率',
      habits_last7: '最近 7 天',
      habits_streak_unit: '连续',
      habits_add_link: '添加 →',
      habits_no_subs: '暂无子分类。',
      habits_add_sub_btn: '+ 添加',
      habits_min_one_day: '至少选择一天',
      habits_name_placeholder: '例：晨跑、阅读...',
      habits_weekly_progress: '每周进度',
      habits_weekly_sub: '每日完成率',
      habits_updated: '习惯已更新',

      // Goals modals/UI
      goals_add_modal: '新目标',
      goals_add_btn: '添加目标',
      goals_target_date: '目标日期',
      goals_new_modal: '新梦想',
      goals_edit_modal: '编辑梦想',
      goals_delete_modal: '删除梦想',
      goals_reorder: '重新排序',
      goals_reorder_close: '关闭编辑',
      goals_category: '分类',
      goals_emoji: '表情',
      goals_color: '颜色',
      goals_milestones: '里程碑',
      goals_ms_placeholder: '添加里程碑...',
      goals_title_placeholder: '写下您的梦想...',
      goals_desc_placeholder: '详细描述...',
      goals_delete_confirm_q: '确定吗？',
      goals_delete_yes: '是的，删除',
      goals_edit_btn: '编辑',
      goals_del_btn: '删除',

      // Budget modals/UI
      bud_add_trans_modal: '新交易',
      bud_add_group_modal: '新分类组',
      bud_add_sub_modal: '添加子分类',
      bud_group_name_label: '组名',
      bud_sub_name_label: '子分类名称',
      bud_monthly_budget: '月预算',
      bud_sub_cat_label: '子分类',
      bud_amount_label: '金额',
      bud_desc_label: '描述',
      bud_summary_tab: '摘要',
      bud_groups_tab: '主分类',
      bud_trans_tab: '交易记录',
      bud_search: '搜索...',
      bud_no_tx: '暂无交易',
      bud_others: '其他',
      bud_history_btn: '历史',
      bud_history_title: '预算历史',
      bud_history_empty: '暂无已完成的周期',
      bud_history_no_data: '此周期未保存交易数据',
      bud_history_cycle: '周期',
      bud_history_add_tx: '添加交易',
      bud_history_no_tx: '此周期暂无交易',
      bud_cycle_settings_title: '预算周期',
      bud_cycle_start: '开始',
      bud_cycle_end: '结束',
      bud_cycle_desc: '截止日期过后，交易将被归档；净余额将保存用于图表。',
      bud_cycle_saved: '周期设置已保存',
      bud_add_tx_btn: '添加交易',
      bud_import_budget_btn: '导入数据',
      import_data_btn: '导入数据',
      import_data_confirm: '现有模块数据将被删除并替换为导入的数据。是否继续？',
      import_data_ok: '数据导入成功',
      import_data_err: '文件中未找到有效的模块数据',
      bud_import_budget_confirm: '当前预算数据将被删除并替换为文件中的数据。是否继续？',
      bud_import_budget_ok: '预算数据导入成功',
      bud_import_budget_err: '无效文件 — 未找到预算数据',
      bud_add_group_btn: '添加分类',
      bud_edit_open: '编辑面板',
      bud_edit_close: '关闭编辑',
      bud_edit_tx_modal: '编辑交易',
      bud_edit_desc_label: '描述',
      bud_trans_panel: '交易记录',
      bud_col_date: '日期',
      bud_col_amount: '金额',
      bud_col_subcat: '子分类',
      bud_col_maincat: '主分类',
      bud_col_desc: '描述',
      bud_shrink_height: '缩小高度',
      bud_grow_height: '增加高度',
      bud_collapse: '折叠',
      bud_expand: '展开',
      bud_add_sub_for: '{0} — 添加子分类',
      bud_net_balance: '净余额',
      bud_this_period: '本期',
      bud_positive: '正值',
      bud_negative: '负值',
      bud_cat_name_prompt: '分类名称：',
      bud_no_groups: '暂无分类组。',
      bud_add_first_group: '添加第一个分类',
      bud_no_subs: '暂无子分类。',
      bud_sub_count: '{0} 个子分类',
      bud_add_sub_btn: '添加子分类',
      bud_select_main: '— 选择主分类 —',
      bud_select_sub: '— 选择子分类 —',
      bud_no_subs_hint: '请先在分类标签页中添加分类组和子分类。',
      bud_all_cats: '所有分类',
      bud_filter_by_date: '按日期筛选',
      bud_filter_date: '日期',
      bud_filter_from: '开始',
      bud_filter_to: '结束',
      bud_filter_date_range: '日期范围',
      bud_hist_search: '搜索...',
      bud_hist_all_cats: '所有分类',
      bud_clear_date: '清除',
      bud_tx_updated: '交易已更新',
      bud_group_added: '分类组已添加',
      bud_sub_added: '子分类已添加',
      bud_cat_updated: '分类已更新',
      bud_budget_updated: '预算已更新',
      bud_confirm_delete_sub: '确定要删除此子分类及所有关联交易吗？',
      bud_sub_deleted: '子分类已删除',
      bud_tx_desc_placeholder: '输入描述...',
      bud_group_name_placeholder: '例：支出、储蓄、订阅...',
      bud_sub_name_placeholder: '例：杂货支出...',
      bud_edit_budget_title: '编辑预算',
      bud_edit_sub_modal: '编辑子分类',
      bud_sub_name_required: '子分类名称不能为空',
      bud_confirm_title: '确认',
      bud_edit_name_title: '编辑名称',
      bud_edit_group_modal: '编辑分类',
      bud_add_sub_title: '添加子分类',
      bud_delete_group_title: '删除组',
      bud_no_groups_hint: '暂无分类。从"主分类"选项卡开始。',
      bud_edit_budget_prompt: '"{0}"的新预算金额（{1}）：',

      // Investments modals/UI
      inv_add_modal: '添加资产',
      inv_edit_modal: '编辑资产',
      inv_add_btn: '添加资产',
      inv_asset_type_label: '资产类型',
      inv_type_stock: '📈 股票',
      inv_type_etf: '🗂️ ETF / 基金',
      inv_type_crypto: '₿ 加密货币',
      inv_type_commodity: '🥇 大宗商品（黄金、白银…）',
      inv_type_bond: '📄 债券',
      inv_type_cash: '💵 现金 / 外汇',
      inv_type_stock_lbl: '美股', inv_type_stock_other_lbl: '其他市场', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: '加密货币',
      inv_type_commodity_lbl: '商品', inv_type_bond_lbl: '债券', inv_type_cash_lbl: '现金',
      inv_exchange_label: '交易所 / 市场',
      inv_exchange_us: '🇺🇸 美国市场（NYSE / NASDAQ）',
      inv_exchange_other: '🌐 其他交易所',
      inv_auto_price_info: '股票、ETF 和加密货币价格通过 Alpha Vantage 自动更新。',
      inv_price_currency_label: '价格货币',
      inv_symbol_label: '代码 / Ticker',
      inv_display_name_label: '显示名称',
      inv_quantity_label: '数量',
      inv_buy_price_label: '买入价',
      inv_buy_date_label: '买入日期',
      inv_dist_panel: '资产分布',
      inv_perf_panel: '收益分析',
      inv_portfolio_panel: '投资组合详情',
      inv_kpi_portfolio_label: '投资组合价值',
      inv_kpi_total_return: '总收益',
      inv_kpi_vs_invested: '对比投入',
      inv_kpi_cost_basis: '成本基础',
      inv_kpi_asset_count_label: '资产数量',
      inv_kpi_instruments: '种工具',
      inv_pnl_total: '总盈亏',
      inv_pnl_daily: '日盈亏',
      inv_pnl_weekly: '周盈亏',
      inv_pnl_monthly: '月盈亏',
      inv_period_daily: '每日',
      inv_period_weekly: '每周',
      inv_period_monthly: '每月',
      inv_period_3month: '3个月',
      inv_period_alltime: '所有时间',
      time_daily_total_sub: '每日总时长',
      inv_no_assets_legend: '投资组合中没有资产',
      inv_no_assets_table: '暂无资产 — 点击"添加资产"开始',
      inv_by_symbol: '按代码',
      inv_by_type: '按类型',
      inv_top_gainers: '涨幅排名',
      inv_top_losers: '跌幅排名',
      inv_updating: '价格更新中…',
      inv_refresh_in: '{0} 分钟后可更新',
      inv_refresh_title: '更新价格（API）',
      inv_rate_input_title: '手动汇率 — 自动更新',
      inv_api_keys_title: 'API 密钥',
      inv_wait_min: '再等 {0} 分钟后可刷新',
      inv_api_limit: 'Alpha Vantage 每日限制已达到（25次/天）。明天将更新价格。',
      inv_asset_merged: '{0} 已更新 — 平均成本：{1}，总计：{2}',
      inv_asset_added: '资产已添加',
      inv_asset_updated: '资产已更新',
      inv_manual_price_label: '{0} — 当前价格（{1}）',
      inv_manual_price_note: '{0} 以 {1} 计价',
      inv_invalid_price: '请输入有效价格',
      inv_price_saved: '价格已保存',
      inv_optional_suffix: '— 可选',
      inv_fx_error: '无法获取汇率数据',
      inv_fx_updated: '所有汇率已更新',
      inv_enter_symbol: '输入代码',
      inv_invalid_qty: '请输入有效数量',
      inv_invalid_buy: '请输入有效买入价',
      inv_buy_price_sym: '买入价 {0}',
      inv_manual_price_info: '您输入的价格仅用于投资组合价值计算；您的买入价不会改变。',
      inv_no_history_note: '无历史数据，显示总计',
      inv_edit_price_title: '编辑当前价格',
      inv_col_asset: '资产 / 代码',
      inv_col_type: '类型',
      inv_col_qty: '数量',
      inv_col_cost: '平均成本',
      inv_col_price: '当前价格',
      inv_col_value: '总价值',
      inv_col_pnl: '总盈亏',
      inv_col_pct: '占比 %',
      inv_pnl_toggle_title: '切换盈亏视图',
      inv_tab_deposits: '存款',
      inv_dep_add: '添加存款',
      inv_dep_edit: '编辑存款',
      inv_dep_type_term: '定期存款',
      inv_dep_type_free: '活期/日利率',
      inv_dep_bank: '银行名称',
      inv_dep_bank_ph: '工商银行、建设银行…',
      inv_dep_principal: '本金',
      inv_dep_rate: '年利率 (%)',
      inv_dep_term: '存款期限',
      inv_dep_term_1m: '1个月（30天）',
      inv_dep_term_3m: '3个月（90天）',
      inv_dep_term_6m: '6个月（180天）',
      inv_dep_term_1y: '1年（365天）',
      inv_dep_term_custom: '自定义',
      inv_dep_term_custom_days: '天数',
      inv_dep_term_custom_ph: '例如：45',
      inv_dep_free_info: '每日复利——您的资金每天增长，无需等待到期。',
      inv_dep_start: '开始日期',
      inv_dep_notes: '备注',
      inv_dep_current_val: '当前价值',
      inv_dep_daily_gain: '每日收益',
      inv_dep_accrued: '应计利息',
      inv_dep_maturity: '到期日',
      inv_dep_days_left: '剩余',
      inv_dep_days_left_val: '{0}天',
      inv_dep_expired: '已到期',
      inv_dep_no_deposits: '暂无存款账户',
      inv_dep_confirm_delete: '确定要删除此存款吗？',
      inv_dep_skip_confirm: '今天不再询问',
      inv_sub_stocks:       '股票/ETF',
      inv_dep_view_cards:   '卡片',
      inv_dep_view_table:   '表格',
      inv_dep_maturity_interest: '到期利息',
      inv_dep_total_return: '到期价值',
      inv_dep_status_active: '活跃',
      inv_dep_search_ph:    '搜索银行...',
      inv_tab_hist:         '交易历史',
      inv_dep_status:       '状态',
      inv_dep_deleted: '存款已删除',
      inv_dep_saved: '存款已保存',
      inv_dep_free_note: '活期账户：每日复利，无固定期限。',
      inv_dep_term_note: '定期存款：到期时支付单利。',

      // Dashboard panels
      dash_this_week: '本周',
      dash_this_month: '本月',
      dash_this_year: '本年',
      dash_week_time: '本周时间分布',
      dash_month_time: '本月时间分布',
      dash_year_time: '本年时间分布',
      dash_week_spent: '本周支出',
      dash_month_spent: '本月支出',
      dash_year_spent: '本年支出',
      dash_upcoming: '即将到来的计划',
      dash_inv_dist: '投资分布',
      dash_budget_status: '预算状态',
      dash_dreams_panel: '梦想',

      // Gym
      nav_gym: '健身',
      gym_add_btn: '添加训练',
      gym_add_modal: '新训练',
      gym_edit_modal: '编辑训练',
      gym_type_label: '训练类型',
      gym_type_strength: '力量训练',
      gym_type_cardio: '有氧运动',
      gym_type_flexibility: '柔韧性 / 瑜伽',
      gym_type_crossfit: 'Crossfit / HIIT',
      gym_type_sport: '运动 / 游戏',
      gym_type_other: '其他',
      gym_duration_label: '时长（分钟）',
      gym_notes_label: '备注',
      gym_notes_placeholder: '训练备注...',
      gym_exercises_label: '训练项目',
      gym_add_exercise_btn: '添加项目',
      gym_exercise_name_ph: '项目名称（例如：卧推）',
      gym_sets_label: '组数',
      gym_reps_label: '次数',
      gym_weight_label: '重量（kg）',
      gym_ex_duration_label: '时长（分钟）',
      gym_ex_distance_label: '距离（km）',
      gym_no_workouts: '暂无训练记录。',
      gym_workout_added: '训练已添加',
      gym_workout_updated: '训练已更新',
      gym_workout_deleted: '训练已删除',
      gym_confirm_delete: '确定要删除此训练吗？',
      gym_kpi_week: '本周',
      gym_kpi_month: '本月',
      gym_kpi_total_hours: '总时长',
      gym_kpi_streak: '连续天数',
      gym_kpi_sessions: '次训练',
      gym_kpi_hours_sub: '小时',
      gym_kpi_streak_sub: '天',
      gym_off_days: '休息日',
      gym_off_day_title: '休息日 — 不中断连续记录',
      gym_panel_chart: '每周训练频率',
      gym_panel_prs: '个人记录',
      gym_panel_history: '训练历史',
      gym_pr_exercise: '训练项目',
      gym_pr_weight: '最佳（kg）',
      gym_pr_date: '日期',
      gym_no_prs: '暂无个人记录。',
      gym_this_week: '本周',
      gym_sessions_suffix: '次',
      gym_minutes_label: '分钟',
      gym_no_exercises: '未添加训练项目',
      gym_type_badge_strength: '力量',
      gym_type_badge_cardio: '有氧',
      gym_type_badge_flexibility: '柔韧',
      gym_type_badge_crossfit: 'Crossfit',
      gym_type_badge_sport: '运动',
      gym_type_badge_other: '其他',
      gym_panel_progress: '训练进度',
      gym_panel_muscles: '肌肉群分布',
      gym_panel_volume: '每周训练量',
      gym_panel_body: '身体测量',
      gym_panel_templates: '训练模板',
      gym_pr_1rm: '预估1RM',
      gym_rpe_label: '强度 (RPE 1–10)',
      gym_distance_label: '距离 (km)',
      gym_muscle_label: '肌肉群',
      gym_muscle_none: '—',
      gym_muscle_chest: '胸部',
      gym_muscle_back: '背部',
      gym_muscle_legs: '腿部',
      gym_muscle_shoulders: '肩部',
      gym_muscle_arms: '手臂',
      gym_muscle_core: '核心',
      gym_muscle_cardio: '有氧',
      gym_progress_select: '选择训练项目...',
      gym_progress_no_data: '该训练项目暂无数据。',
      gym_volume_unit: '吨训练量',
      gym_kpi_volume: '每周训练量',
      gym_kpi_volume_sub: '吨 (组×次×kg)',
      gym_kpi_goal: '每周目标',
      gym_kpi_goal_sub: '次训练 / 目标',
      gym_weekly_goal_label: '每周目标（天）',
      gym_body_modal_title: '添加身体测量',
      gym_body_weight_label: '体重 (kg)',
      gym_body_fat_label: '体脂率 (%)',
      gym_body_waist_label: '腰围 (cm)',
      gym_body_chest_label: '胸围 (cm)',
      gym_body_arm_label: '手臂 (cm)',
      gym_body_leg_label: '腿部 (cm)',
      gym_body_add_btn: '添加测量',
      gym_body_added: '测量已添加',
      gym_body_deleted: '测量已删除',
      gym_body_no_data: '暂无身体测量数据。',
      gym_body_weight_chart: '体重 (kg)',
      gym_body_table_date: '日期',
      gym_body_table_weight: '体重',
      gym_body_table_fat: '体脂%',
      gym_body_table_waist: '腰围',
      gym_no_muscle_data: '请添加带肌肉群的训练项目。',
      gym_template_modal_title: '保存模板',
      gym_template_name_ph: '模板名称（例如：推胸日）',
      gym_template_save_btn: '保存为模板',
      gym_template_load_btn: '加载模板',
      gym_template_added: '模板已保存',
      gym_template_deleted: '模板已删除',
      gym_no_templates: '暂无保存的模板。',
      gym_template_confirm_delete: '确定要删除此模板吗？',
      gym_load_template_title: '选择模板',
      gym_volume_label: '训练量',
      gym_unit_kg: 'kg',
      gym_unit_lb: 'lb',
      gym_body_edit_modal_title: '编辑测量',
      gym_body_updated: '测量已更新',
      gym_template_rename_title: '重命名模板',
      gym_template_updated: '模板已更新',
      gym_template_edit_title: '编辑模板',
      gym_template_duplicate: '复制',
      gym_template_duplicated: '模板已复制',
      gym_template_type_label: '模板类型',
    },

    es: {
      // UI chrome
      settings_title: 'Configuración',
      settings_lang: 'Idioma',
      settings_lang_tr: 'Turco',
      settings_lang_en: 'Inglés',
      settings_lang_zh: 'Chino',
      settings_lang_es: 'Español',
      settings_lang_fr: 'Francés',
      settings_currency: 'Moneda que usas',
      settings_ui_scale: 'Escala de interfaz',
      settings_tab_ui: 'Interfaz',
      settings_tab_panels: 'Paneles',
      settings_panels_hint: 'Oculta los módulos que no necesitas — los datos se conservan.',
      btn_hide: 'Ocultar',
      btn_show: 'Mostrar',
      settings_theme: 'Modo de tema',
      settings_theme_dark: 'Oscuro',
      settings_theme_midnight: 'Medianoche',
      settings_theme_ocean: 'Océano',
      settings_theme_forest: 'Bosque',
      settings_theme_sunset: 'Atardecer',
      settings_theme_rose: 'Rosa',
      settings_theme_amber: 'Ámbar',
      settings_theme_crimson: 'Carmesí',
      settings_theme_nebula: 'Nebulosa',
      settings_theme_arctic: 'Ártico',
      settings_theme_neon: 'Neón',
      settings_theme_white: 'Blanco',
      settings_data_title: 'Gestión de datos',
      settings_export_btn: 'Exportar',
      settings_export_desc: 'Descarga todos tus datos como archivo JSON.',
      settings_import_btn: 'Importar',
      settings_import_title: 'Importar datos',
      settings_import_desc: 'Carga un archivo JSON exportado anteriormente.',
      settings_import_confirm: 'Todos los datos existentes serán reemplazados por los del archivo. ¿Continuar?',
      settings_import_ok: 'Datos cargados correctamente.',
      settings_import_err: 'Formato de archivo no válido.',
      settings_delete_btn: 'Eliminar todos los datos',
      settings_delete_title: 'Eliminar todos los datos',
      settings_delete_msg: 'Estás a punto de eliminar permanentemente <strong>todos los datos</strong>: presupuesto, planes, hábitos, inversiones, claves API y configuración. Esta acción <strong>no se puede deshacer</strong>.',
      settings_delete_confirm: '⚠️ ADVERTENCIA\n\nEstás a punto de eliminar permanentemente todos tus datos (presupuesto, planes, hábitos, inversiones, claves API…).\n\nEsta acción no se puede deshacer. ¿Estás seguro?',
      settings_delete_ok: 'Todos los datos eliminados.',
      seed_warning_label: 'Datos Demo Activos',
      seed_warning_desc: 'Datos de muestra cargados — bórrelos en Configuración e ingrese sus propios datos',
      settings_delete_choice_title: 'Eliminar datos',
      settings_delete_choice_subtitle: 'Elige cómo quieres reiniciar:',
      settings_delete_reset_label: 'Restablecer a Demo',
      settings_delete_reset_desc: 'Se eliminan tus datos personales y se restauran los de demostración. Los paneles seguirán mostrando contenido.',
      settings_delete_reset_btn: 'Restablecer a Demo',
      settings_delete_wipe_label: 'Eliminar todo',
      settings_delete_wipe_desc: 'Todos los datos (incluidos los de demostración) se eliminan permanentemente. La app quedará completamente vacía.',
      settings_delete_wipe_btn: 'Eliminar todo',
      settings_delete_wipe_confirm: 'Todos los datos (incluidos los de demo) se eliminarán permanentemente. ¿Estás seguro?',
      settings_delete_wipe_ok: 'Todos los datos eliminados.',
      settings_delete_reset_ok: 'Restablecido a datos de demostración.',
      settings_api_title: 'Claves API',
      settings_api_hint: 'Necesarias para que el módulo de inversiones obtenga precios en tiempo real.',
      settings_api_av: 'Alpha Vantage (Acciones, ETF, Cripto)',
      settings_api_fx: 'Exchange Rates (Tipo de cambio)',
      settings_api_save: 'Guardar claves',
      settings_api_saved: 'Claves API guardadas.',
      settings_update_rates: 'Actualizar tipos',
      settings_update_rates_title: 'Obtener todos los tipos de cambio ahora',
      panel_manager_title: 'Visibilidad de paneles',
      panel_on: 'Activo',
      panel_off: 'Inactivo',
      panel_empty: 'No hay paneles gestionables en esta página.',
      privacy_show: 'Mostrar valores',
      privacy_hide: 'Ocultar valores',
      sidebar_settings: 'Configuración',
      sidebar_help: 'Ayuda',
      sidebar_privacy: 'Privacidad',
      sidebar_toggle: 'Contraer / Expandir menú',
      priority_high: 'Alta',
      priority_medium: 'Media',
      priority_low: 'Baja',
      hours_suffix: 'h',
      mins_suffix: 'min',
      secs_suffix: 's',

      // nav & topbar labels
      nav_dashboard: 'Panel',
      nav_pomodoro: 'Modo enfoque',
      nav_time: 'Seguimiento de tiempo',
      nav_habits: 'Hábitos',
      nav_plans: 'Planes',
      nav_goals: 'Sueños y metas',
      nav_budget: 'Presupuesto',
      nav_investments: 'Inversiones',

      // days (short)
      day_mon: 'Lun', day_tue: 'Mar', day_wed: 'Mié',
      day_thu: 'Jue', day_fri: 'Vie', day_sat: 'Sáb', day_sun: 'Dom',

      // Dashboard
      dash_net_worth: 'PATRIMONIO NETO',
      dash_today_spent: 'GASTO DE HOY',
      dash_habits_done: 'HÁBITOS COMPLETADOS',
      dash_active_goals: 'METAS ACTIVAS',
      dash_habits_pct: '{0}% hoy',
      dash_goals_of: 'de {0} metas',
      dash_net_worth_change: 'inversiones + depósitos + presupuesto',
      dash_nw_inv: 'Inversión',
      dash_nw_dep: 'Depósitos',
      dash_nw_bud: 'Ppto.',
      dash_over_limit: 'sobre el límite',
      dash_in_limit: 'dentro del límite',
      dash_budget_total: 'PRESUPUESTO TOTAL',
      dash_completion_rate: 'TASA COMPLETADO',
      dash_avg_progress: 'PROGRESO PROM.',
      dash_no_plans: 'Sin planes próximos',
      dash_today: 'Hoy',
      dash_tomorrow: 'Mañana',
      dash_no_assets: 'Sin activos en el portafolio',
      dash_no_sessions: 'Sin sesiones aún',
      dash_n_more: '+{0} más',
      dash_today_sessions: 'Pomodoros de hoy',
      dash_week_total: 'Esta semana',
      dash_focused: 'enfocado',
      dash_focus_month: 'Este mes',
      dash_focus_streak: 'Racha diaria',
      dash_focus_streak_days: '{0} días',
      dash_focus_cats_week: 'Categorías esta semana',
      dash_focus_no_logs: 'Sin registros de tiempo',
      dash_recent_tasks: 'Tareas recientes',
      dash_no_goals: 'Sin sueños aún',
      dash_in_progress: 'En progreso',
      dash_completed: 'Completado',
      dash_no_spending: 'Sin datos de gasto',
      dash_no_workouts: 'Sin entrenamientos aún',
      dash_gym_week_dur: 'Duración Semana',
      dash_gym_streak_lbl: 'Racha',
      dash_gym_exercises: 'ejercicios',
      dash_surplus: 'superávit',
      dash_over: 'sobre presupuesto',
      dash_hour_label: 'Hora',
      asset_stock: 'Acción',
      asset_stock_us: 'Acción EE.UU.',
      asset_stock_other: 'Acción Otra Bolsa',
      asset_etf: 'ETF',
      asset_crypto: 'Cripto',
      asset_commodity: 'Materia prima',
      asset_bond: 'Bono',
      asset_cash: 'Efectivo',

      // Plans
      plans_todo: 'POR HACER',
      plans_progress: 'EN PROGRESO',
      plans_done: 'HECHO',
      plans_kpi_pending: 'tarea pendiente',
      plans_kpi_ongoing: 'tarea activa',
      plans_kpi_from_total: 'de {0} en total',
      plans_no_tasks: 'Sin tareas',
      plans_start: 'Iniciar',
      plans_complete: 'Completar',
      plans_title_col: 'TÍTULO',
      plans_due_col: 'FECHA',
      plans_cat_col: 'CATEGORÍA',
      plans_status_col: 'ESTADO',
      plans_priority_col: 'PRIORIDAD',
      plans_added: 'Plan añadido',
      plans_updated: 'Plan actualizado',
      plans_deleted: 'Plan eliminado',
      plans_confirm_delete: '¿Seguro que quieres eliminar este plan?',
      plans_edit_modal: 'Editar Plan',
      plans_subtasks: 'Sub-planes',
      plans_subtask_placeholder: 'Agregar sub-plan...',
      plans_subtask_count: '{0}/{1} completados',
      plans_no_subtasks: 'Sin sub-planes aún',
      plans_confirm_delete_sub: '¿Seguro que quieres eliminar este sub-plan?',
      status_todo: 'Por hacer',
      status_progress: 'En progreso',
      status_done: 'Hecho',

      // Time
      time_today_kpi: 'HOY',
      time_week_kpi: 'ESTA SEMANA',
      time_month_kpi: 'ESTE MES',
      time_focus_pct: '⏱ {0}% enfoque',
      time_total_dur: 'tiempo total',
      time_last7: 'últimos 7 días',
      time_last30: 'últimos 30 días',
      time_duration_label: 'Duración',
      time_no_logs: 'Sin registros aún',
      time_auto_end: '⏱ Auto',
      time_history_title: 'Desglose diario: {0}',
      time_min_suffix: 'min',
      time_date_col: 'FECHA',
      time_category_col: 'CATEGORÍA',
      time_project_col: 'PROYECTO',
      time_start_col: 'INICIO',
      time_end_col: 'FIN',
      time_dur_col: 'DURACIÓN',

      // Habits
      habits_no_habits: 'Sin hábitos aún.',
      habits_no_day_selected: 'Ningún día seleccionado',
      habits_daily: 'Permanente — cada día',
      habits_edit: 'Editar',
      habits_delete: 'Eliminar',
      habits_skip: 'Saltar hoy',
      habits_unskip: 'Deshacer omisión',
      habits_skipped_section: 'No se hará hoy',
      habits_all_done: '¡Todos los hábitos completados!',
      habits_none_today: 'Sin hábitos para hoy.',
      habits_total: 'TOTAL DE HÁBITOS',
      habits_today_kpi: 'HOY',
      habits_streak_best: 'MEJOR RACHA',
      habits_completed_label: 'Completados',
      habits_remaining_label: 'Restantes',
      habits_week_title: 'Semana',
      habits_week_n: 'SEMANA {0}',
      habits_30_day: 'Historial de 30 días',
      habits_older: '← anterior',
      habits_today_arrow: 'hoy →',
      habits_habit_col: 'Hábito',
      habits_pct_col: '%',
      habits_time_badge: 'Tiempo',
      habits_added: 'Hábito añadido',
      habits_deleted: 'Hábito eliminado',
      habits_confirm_delete: '¿Seguro que quieres eliminar este hábito?',
      habits_current_streak: 'Racha actual',
      habits_best_streak: 'Mejor racha',

      // Goals
      goals_active_kpi: 'METAS ACTIVAS',
      goals_avg_progress: 'PROGRESO MEDIO',
      goals_total_kpi: 'TOTAL DE METAS',
      goals_none: 'Aún no hay metas...',
      goals_days_left: '{0} días restantes',
      goals_overdue: 'Vencida',
      goals_update_progress: 'Actualizar progreso',
      goals_progress_prompt: 'Nuevo porcentaje de progreso (0-100):',
      goals_added: 'Meta añadida',
      goals_updated: 'Meta actualizada',
      goals_deleted: 'Meta eliminada',
      goals_confirm_delete: '¿Seguro que quieres eliminar esta meta?',
      goals_dream_added: 'Sueño añadido',
      goals_dream_updated: 'Sueño actualizado',
      goals_dream_deleted: 'Sueño eliminado',
      goals_all_done: '🎉 ¡Todos los pasos completados!',
      goals_days_overdue: '{0} días de retraso',
      goals_ms_empty_card: 'Sin hitos — añade desde edición',
      goals_ms_empty_modal: 'Aún no hay hitos',
      goals_ms_confirm_del: '¿Seguro que quieres eliminar este subobjetivo?',
      goals_none_dreams: 'Aún no hay sueños',
      goals_cat_kariyer: 'Carrera',
      goals_cat_seyahat: 'Viajes',
      goals_cat_saglik: 'Salud',
      goals_cat_egitim: 'Educación',
      goals_cat_kisisel: 'Personal',
      goals_cat_finansal: 'Finanzas',

      // Budget
      bud_income_kpi: 'INGRESOS',
      bud_expense_kpi: 'GASTOS',
      bud_balance_kpi: 'PRESUPUESTO RESTANTE',
      bud_total_income: 'INGRESOS TOTALES',
      bud_total_expense: 'GASTOS TOTALES',
      bud_kpi_pct_left: '{0}% de presupuesto restante',
      bud_kpi_over: '{0}% excedido',
      bud_budget_label: 'Presupuesto',
      bud_actual_label: 'Real',
      bud_income_label: 'INGRESOS',
      bud_expense_label: 'GASTOS',
      bud_summary_title: 'Resumen de Presupuesto',
      bud_source_col: 'ORIGEN',
      bud_budget_col: 'PRESUPUESTO',
      bud_actual_col: 'REAL',
      bud_usage_col: 'USO',
      bud_remaining_footer: 'RESTANTE',
      bud_no_groups: 'Sin grupos aún',
      bud_no_transactions: 'Sin transacciones aún',
      bud_type_income: 'Ingreso',
      bud_type_expense: 'Gasto',
      bud_surplus: 'superávit',
      bud_over: 'excedido',
      bud_sub_count: '{0} subcategorías',
      bud_group_added: 'Grupo añadido',
      bud_group_deleted: 'Grupo eliminado',
      bud_trans_added: 'Transacción añadida',
      bud_add_continue: 'Añadir y continuar',
      bud_trans_deleted: 'Transacción eliminada',
      bud_confirm_delete_group: '¿Seguro que quieres eliminar este grupo y todas sus transacciones?',
      bud_confirm_delete_trans: '¿Seguro que quieres eliminar esta transacción?',
      bud_panel_bar: 'Presupuesto vs Real',
      bud_panel_pie: 'Desglose de gastos',
      bud_panel_timeline: 'Tendencia ingresos/gastos',
      bud_panel_daily: '¿Cuándo gasto?',
      bud_panel_subcats: '¿En qué gasto mi dinero?',
      bud_panel_net_history: 'Ahorro neto',
      bud_net_history_title: 'Ahorro neto (últimos {0} meses)',
      bud_net_month: 'Mes {0}',
      bud_sub_col: 'SUBCATEGORÍA',
      bud_perc_col: 'PORC.',
      bud_details: 'Detalles',
      bud_daily_balance: 'SALDO',
      bud_daily_inc_col: 'INGR. TOTAL',
      bud_daily_exp_col: 'GASTO TOTAL',
      bud_panel_transactions: 'Transacciones',
      bud_desc_col: 'DESCRIPCIÓN',
      bud_date_col: 'FECHA',
      bud_group_col: 'GRUPO',
      bud_amount_col: 'IMPORTE',
      bud_type_col: 'TIPO',

      // Investments
      inv_total_value: 'VALOR TOTAL',
      inv_total_cost: 'COSTE TOTAL',
      inv_pnl: 'GANANCIA/PÉRDIDA',
      inv_pnl_pct: 'RENDIMIENTO %',
      inv_asset_label: 'ACTIVO',
      inv_more_assets: 'activos más',
      inv_type_label: 'TIPO',
      inv_no_assets: 'Aún no hay activos',
      inv_asset_added: 'Activo añadido',
      inv_asset_updated: 'Activo actualizado',
      inv_asset_deleted: 'Activo eliminado',
      inv_confirm_delete: '¿Seguro que quieres eliminar este activo?',
      inv_just_now: 'ahora mismo',
      inv_sell: 'Vender',
      inv_sell_title: 'Vender activo',
      inv_sell_qty: 'Cantidad a vender',
      inv_buy_qty: 'Cantidad a comprar',
      inv_sell_price: 'Precio de venta',
      inv_sell_date: 'Fecha de venta',
      inv_sell_preview: 'P/G estimado',
      inv_sell_confirm: 'Vender',
      inv_sell_success: 'Activo vendido',
      inv_sell_err_qty: 'Cantidad inválida',
      inv_sell_err_price: 'Precio inválido',
      inv_sell_max: 'disponible',
      inv_realized_pnl: 'G/P realizado',
      inv_buy: 'Comprar',
      inv_buy_title: 'Comprar más',
      inv_buy_confirm: 'Comprar',
      inv_buy_success: 'Compra registrada',
      inv_buy_new_avg: 'Nuevo coste medio',
      inv_avg_cost: 'Coste medio',
      inv_select_asset: 'Seleccionar activo',
      inv_no_assets: 'No hay activos en cartera',
      inv_trade_history: 'Historial de operaciones',
      inv_col_trade_type: 'Tipo',
      inv_col_trade_price: 'Precio',
      inv_trade_type_buy: 'Compra',
      inv_trade_type_sell: 'Venta',
      inv_no_trades: 'Sin operaciones aún',
      inv_edit_trade: 'Editar operación',
      inv_delete_trade: 'Eliminar operación',
      inv_trade_deleted: 'Operación eliminada',
      inv_trade_updated: 'Operación actualizada',
      inv_col_actions: 'Acciones',
      inv_trade_action: 'Operar Activos',
      inv_trade_filter_all: 'Fecha',
      inv_tab_portfolio: 'Portafolio',
      inv_tab_trades: 'Historial',
      inv_history_btn: 'Historial',
      inv_hist_tab_trades: 'Operaciones',
      inv_hist_tab_deposits: 'Depósitos',
      inv_dep_term_short: 'Plazo',
      inv_dep_free_short: 'Flex',
      inv_dep_type_label: 'Tipo',
      inv_trade_search: 'Símbolo, nombre...',
      inv_trade_opt_new_desc: 'Añadir un nuevo activo que no está en tu cartera',
      inv_trade_opt_buy_desc: 'Comprar más de un activo existente, se actualiza el coste medio',
      inv_trade_opt_sell_desc: 'Vender parte o todo de un activo existente',
      inv_mins_ago: 'hace {0} min',
      inv_hours_ago: 'hace {0} h',
      inv_days_ago: 'hace {0} d',
      inv_manual: 'manual',
      inv_period_1d: '1D',
      inv_period_1w: '1S',
      inv_period_1m: '1M',
      inv_period_3m: '3M',
      inv_period_6m: '6M',
      inv_period_1y: '1A',

      // Pomodoro
      pomo_work: 'POMODORO',
      pomo_short: 'DESCANSO CORTO',
      pomo_long: 'DESCANSO LARGO',
      pomo_flow: 'MODO FLUJO',
      pomo_countdown: 'CUENTA ATRÁS',
      pomo_overtime: 'TIEMPO EXTRA',
      pomo_start: 'Iniciar',
      pomo_resume: 'Reanudar',
      pomo_pause: 'Pausar',
      pomo_reset: 'Reiniciar',
      pomo_session_saved: 'Sesión guardada — {0}',
      pomo_today_sessions: 'SESIONES DE HOY',
      pomo_week_total: 'TOTAL DE LA SEMANA',
      pomo_total_sessions: 'SESIONES TOTALES',
      pomo_flags: '{0} marcas',
      pomo_flags_count: '{0} marca(s) registrada(s)',
      pomo_flags_none: 'Sin marcas',
      pomo_flow_save_desc: 'Registra {0} hasta la última marca; el resto se descarta.',
      pomo_flow_save_none: 'Sin marcas — no se registrará nada.',
      pomo_flow_hard_flow: 'No se guarda nada — reinicia el temporizador a 0:00.',
      pomo_flow_hard_count: 'No se guarda nada — reinicia el temporizador al inicio.',
      pomo_confirm_reset: '¿Seguro que quieres reiniciar el temporizador?',
      pomo_confirm_del_todo: '¿Seguro que quieres eliminar esta tarea?',
      pomo_add_sub_ph: 'Añadir subtarea...',
      pomo_mode_switch_title: 'Cambio de modo',
      pomo_mode_switch_msg: 'Estás realizando un cambio de modo.',
      pomo_mode_switch_flags: 'Al cambiar de modo, las marcas guardadas se registran en el tiempo.',
      pomo_mode_switch_duration: 'Tiempo a guardar: {0}',
      pomo_mode_switch_no_flags: 'Sin marcas — cambiar de modo reiniciará tu progreso.',
      pomo_mode_switch_confirm: 'Continuar',
      pomo_mode_switch_dontask: 'No preguntar hoy',
      pomo_toast_overtime: 'Tiempo agotado{0} ⚡ Pulsa Finalizar cuando estés listo',
      pomo_toast_break_done: '¡Descanso terminado! Vuelve al trabajo 💪',
      pomo_toast_countdown_done: '¡Cuenta atrás completada! 🎯',
      pomo_flow_saved: 'Sesión de flujo guardada — {0} 🌊',
      pomo_kpi_today: 'Completadas hoy',
      pomo_kpi_total: 'Sesiones totales',
      pomo_kpi_flow: 'Tiempo de flujo',
      pomo_kpi_streak: 'Racha diaria',
      pomo_sessions_n: '{0} sesiones',
      pomo_days_n: '{0} días',
      pomo_focus_sub: 'enfoque',
      pomo_all_time: 'todo el tiempo',
      pomo_today_sub: 'hoy',
      pomo_streak_sub: 'racha',
      pomo_vs_yday_more: 'más que ayer',
      pomo_vs_yday_less: 'menos que ayer',
      pomo_vs_yday_none: 'sin datos de ayer',
      pomo_switch_running_label: 'Temporizador activo',
      pomo_task_switch_current: 'Tarea actual',
      pomo_switch_no_today: 'No preguntar hoy',
      pomo_todo_empty: 'Sin tareas. Pulsa "Añadir tarea".',
      pomo_todo_all_done: '¡Todas las tareas completadas!',
      pomo_task_added: 'Tarea añadida',
      pomo_task_updated: 'Tarea actualizada',
      pomo_task_select: 'Seleccionar tarea',
      pomo_no_tasks_today: 'No hay tareas para hoy',
      pomo_todo_hint: 'Añade desde la lista de tareas de abajo',
      pomo_lap_split: 'Parcial',
      pomo_lap_total: 'Total',
      pomo_lap_time: 'Tiempo',
      pomo_flag_deleted: 'Marca eliminada',
      pomo_flag_del_confirm_msg: 'Esta marca se eliminará permanentemente. ¿Deseas continuar?',
      pomo_flag_del_no_today: 'No mostrar hoy',
      pomo_subtasks_header: 'Sub-tareas',
      pomo_minute_n: 'Minuto {0}',
      pomo_settings_close: 'Cerrar',
      pomo_fullscreen: 'Pantalla completa',
      pomo_minimize: 'Minimizar',
      pomo_task_switch: 'Cambiar tarea',
      pomo_switch_running_msg: 'El temporizador está en marcha. Cambiar de tarea reiniciará el contador Pomodoro. ¿Deseas continuar?',
      pomo_switch_elapsed_msg: 'Ha transcurrido tiempo para esta tarea. Cambiarla reiniciará el contador Pomodoro. ¿Deseas continuar?',
      pomo_switch_confirm_btn: 'Cambiar',
      pomo_btn_flow: 'Modo flujo',
      pomo_btn_pomodoro: 'Pomodoro',
      pomo_btn_countdown: 'Cuenta atrás',
      pomo_btn_short: 'Descanso corto',
      pomo_btn_long: 'Descanso largo',
      pomo_btn_finish: 'Finalizar',
      pomo_finish_confirm_title: 'Finalizar sesión',
      pomo_finish_confirm_msg: 'Su sesión actual será guardada. Tiempo:',
      pomo_finish_select_msg: 'Elige cómo finalizar:',
      pomo_finish_opt1_title: 'Guardar tiempo actual',
      pomo_finish_opt1_desc: 'Se guardará la duración {0} y se terminará la sesión.',
      pomo_finish_opt2_title: 'Finalizar con marcas',
      pomo_finish_opt2_desc: 'Registra {0} hasta la última marca y finaliza la sesión.',
      pomo_finish_opt2_no_flags: 'Sin marcas — añade una marca primero.',
      pomo_btn_flag: 'Marcar',
      pomo_task_label: 'Tarea actual',
      pomo_todo_title: 'Lista de tareas',
      pomo_todo_subtitle: 'Tareas de hoy',
      pomo_todo_done_count: 'completadas',
      pomo_todo_add_btn: 'Añadir tarea',
      pomo_edit_task: 'Editar tarea',
      pomo_todo_completed_section: 'Completadas',
      pomo_settings_pomo_tip: 'El descanso largo comienza cada 4 pomodoros.',
      pomo_settings_countdown_tip: 'Los ajustes se aplican cuando el temporizador está parado.',
      pomo_settings_fs_kpi: 'Panel de información',
      pomo_settings_duration: 'Duración',
      pomo_flow_reset_title: 'Opciones de reinicio',
      pomo_flow_reset_question: '¿Qué quieres hacer?',
      pomo_flow_opt1_title: 'Guardar marcas y reiniciar',
      pomo_flow_opt1_desc: 'Registra hasta la última marca, descarta el resto.',
      pomo_flow_opt2_title: 'Continuar desde la última marca',
      pomo_flow_opt2_desc: 'Retrocede el temporizador a la última marca y continúa.',
      pomo_flow_opt3_title: 'Reinicio completo',
      pomo_flow_opt3_desc_flow: 'No se guarda nada — reinicia el temporizador a 0:00.',
      pomo_flow_opt3_desc: 'No se guarda nada — reinicia el temporizador al inicio.',
      pomo_flow_opt3_desc_count: 'No se guarda nada — reinicia la cuenta regresiva a 00:00:00.',
      pomo_new_todo_title: 'Nueva tarea',
      pomo_edit_todo_title: 'Editar tarea',
      pomo_form_task: 'Tarea',
      pomo_form_duration: 'Duración estimada',
      pomo_form_category: 'Categoría',
      pomo_form_note: 'Nota',
      pomo_form_subtasks: 'Subtareas',
      pomo_form_add_subtask: 'Añadir subtarea',
      pomo_form_optional: '(opcional)',
      pomo_form_minutes: 'minutos',
      pomo_exit_fullscreen: 'Minimizar',
      pomo_short_break_label: 'Descanso corto',
      pomo_long_break_label: 'Descanso largo',
      pomo_cat_work: 'Trabajo',
      pomo_cat_learn: 'Aprendizaje',
      pomo_cat_exercise: 'Ejercicio',
      pomo_cat_social: 'Social',
      pomo_cat_sleep: 'Sueño',
      pomo_cat_other: 'Otro',
      pomo_default_project: 'Flujo libre',

      // Focus Widget
      fw_pause_resume: 'Pausar / Reanudar',
      fw_add_flag: 'Añadir marca',
      fw_stop: 'Detener',
      fw_open_focus: 'Ir al modo enfoque',
      fw_paused: 'En pausa',

      // Pomodoro todo form
      pomo_task_text_label: 'Tarea',
      pomo_est_duration: 'Duración estimada',
      pomo_pomodoro_count: 'Número de Pomodoros',
      lbl_optional: '(opcional)',
      pomo_minutes_label: 'minutos',
      pomo_note_label: 'Nota',
      pomo_subtasks_label: 'Subtareas',
      pomo_add_subtask_btn: 'Añadir subtarea',
      pomo_subtask_placeholder: 'Subtarea...',
      pomo_task_placeholder: 'Tarea a realizar...',
      pomo_note_placeholder: 'Nota adicional...',
      time_project_placeholder: 'Nombre del proyecto (opcional)',

      // Common buttons & labels
      btn_cancel: 'Cancelar',
      btn_back: '← Volver',
      btn_add: 'Añadir',
      btn_save: 'Guardar',
      btn_edit: 'Editar',
      btn_delete: 'Eliminar',
      dm_noask_today: 'No preguntar hoy',
      btn_details: 'Detalles →',
      btn_all: 'Todo →',
      lbl_title: 'Título',
      lbl_desc: 'Descripción',
      lbl_category: 'Categoría',
      lbl_date: 'Fecha',
      lbl_priority: 'Prioridad',
      lbl_notes: 'Notas',
      lbl_name: 'Nombre',
      lbl_color: 'Color',
      lbl_emoji: 'Emoji',
      lbl_type: 'Tipo',
      lbl_amount: 'Importe',
      lbl_all: 'Todo',
      lbl_manual: 'Manual',
      lbl_project: 'Proyecto',
      lbl_optional: '(opcional)',
      lbl_status: 'Estado',

      // Plans modals/UI
      plans_add_modal: 'Nuevo plan',
      plans_add_btn: 'Añadir plan',
      plans_kanban_view: 'Kanban',
      plans_list_view: 'Lista',
      plans_end_date: 'Fecha límite',
      plans_cat_project: 'Proyecto',
      plans_cat_education: 'Educación',
      plans_cat_finance: 'Finanzas',
      plans_cat_investment: 'Inversión',
      plans_cat_personal: 'Personal',
      plans_cat_health: 'Salud',
      plans_cat_other: 'Otro',
      plans_title_placeholder: 'Título de la tarea...',
      plans_notes_placeholder: 'Notas adicionales...',
      plans_pri_high: 'Alta',
      plans_pri_medium: 'Media',
      plans_pri_low: 'Baja',

      // Time modals/UI
      time_add_modal: 'Añadir registro',
      time_history_modal: 'Vista del historial',
      time_add_btn: 'Añadir registro',
      time_project_label: 'Proyecto / Actividad',
      time_task_today: 'Tareas de hoy',
      time_task_other: 'Otras tareas',
      time_task_create: 'Crear tarea',
      time_task_required: 'El título de la tarea es obligatorio',
      time_start_label: 'Inicio',
      time_end_label: 'Fin',
      time_panel_30day: 'Últimos 30 días',
      time_panel_daily: 'Distribución diaria (últimos 7 días)',
      time_panel_logs: 'Registros de tiempo',
      time_panel_weekly: 'Resumen semanal',
      time_filter_all: 'Todo',
      time_filter_manual: 'Manual',
      time_filter_auto: '⏱ Auto',
      time_filter_date_placeholder: 'Fecha',
      cdp_range_hint: 'Selecciona la fecha final',
      time_col_date: 'Fecha',
      time_col_category: 'Categoría',
      time_col_project: 'Proyecto',
      time_col_range: 'Intervalo',
      time_col_duration: 'Duración',
      time_hist_subtitle: 'Desglose mensual y semanal',
      time_prev_month: 'Mes anterior',
      time_hist_total: 'Total',
      time_hist_tab_summary: 'Resumen',
      time_hist_tab_logs: 'Registros',
      time_hist_active_days: 'Días Activos',
      time_hist_daily_avg: 'Prom. Diario',
      time_hist_top_cat: 'Top Categoría',
      time_next_month: 'Mes siguiente',
      time_invalid_range: 'Introduce un intervalo de tiempo válido',
      time_log_added: 'Registro añadido',
      time_log_deleted: 'Registro eliminado',
      time_del_confirm_msg: 'Este registro de tiempo se eliminará permanentemente. ¿Deseas continuar?',
      time_del_no_today: 'No mostrar hoy',
      time_edit_modal: 'Editar registro',
      time_log_updated: 'Registro actualizado',

      // Habits modals/UI
      habits_add_modal: 'Nuevo hábito',
      habits_manage_modal: 'Gestionar hábitos',
      habits_edit_modal: 'Editar hábito',
      habits_add_btn: 'Añadir hábito',
      habits_name_label: 'Nombre del hábito',
      habits_icon_label: 'Icono (emoji)',
      habits_type_label: 'Tipo',
      habits_days_label: '¿Qué días?',
      habits_type_permanent: 'Permanente',
      habits_type_permanent_desc: 'Aparece todos los días automáticamente',
      habits_type_timed: 'Programado',
      habits_type_timed_desc: 'Aparece en los días seleccionados',
      habits_today_done: 'Completados hoy',
      habits_week_success: 'Éxito semanal',
      habits_last7: 'últimos 7 días',
      habits_streak_unit: 'racha',
      habits_add_link: 'Añadir →',
      habits_no_subs: 'Sin subcategorías.',
      habits_add_sub_btn: '+ Añadir',
      habits_min_one_day: 'Selecciona al menos un día',
      habits_name_placeholder: 'Ej.: Correr por la mañana, Leer...',
      habits_weekly_progress: 'Progreso semanal',
      habits_weekly_sub: 'Tasas de finalización diaria',
      habits_updated: 'Hábito actualizado',

      // Goals modals/UI
      goals_add_modal: 'Nueva meta',
      goals_add_btn: 'Añadir meta',
      goals_target_date: 'Fecha objetivo',
      goals_new_modal: 'Nuevo sueño',
      goals_edit_modal: 'Editar sueño',
      goals_delete_modal: 'Eliminar sueño',
      goals_reorder: 'Reordenar',
      goals_reorder_close: 'Cerrar edición',
      goals_category: 'Categoría',
      goals_emoji: 'Emoji',
      goals_color: 'Color',
      goals_milestones: 'Hitos',
      goals_ms_placeholder: 'Añadir hito...',
      goals_title_placeholder: 'Escribe tu sueño...',
      goals_desc_placeholder: 'Descripción detallada...',
      goals_delete_confirm_q: '¿Estás seguro?',
      goals_delete_yes: 'Sí, eliminar',
      goals_edit_btn: 'Editar',
      goals_del_btn: 'Eliminar',

      // Budget modals/UI
      bud_add_trans_modal: 'Nueva transacción',
      bud_add_group_modal: 'Nuevo grupo de categorías',
      bud_add_sub_modal: 'Añadir subcategoría',
      bud_group_name_label: 'Nombre del grupo',
      bud_sub_name_label: 'Nombre de subcategoría',
      bud_monthly_budget: 'Presupuesto mensual',
      bud_sub_cat_label: 'Subcategoría',
      bud_amount_label: 'Importe',
      bud_desc_label: 'Descripción',
      bud_summary_tab: 'Resumen',
      bud_groups_tab: 'Categorías principales',
      bud_trans_tab: 'Registro de transacciones',
      bud_search: 'Buscar...',
      bud_no_tx: 'Sin transacciones aún',
      bud_others: 'Otros',
      bud_history_btn: 'Historial',
      bud_history_title: 'Historial de presupuesto',
      bud_history_empty: 'Aún no hay ciclos completados',
      bud_history_no_data: 'No hay datos de transacciones guardados para este ciclo',
      bud_history_cycle: 'Ciclo',
      bud_history_add_tx: 'Añadir transacción',
      bud_history_no_tx: 'No hay transacciones en este ciclo',
      bud_cycle_settings_title: 'Ciclo de presupuesto',
      bud_cycle_start: 'Inicio',
      bud_cycle_end: 'Fin',
      bud_cycle_desc: 'Cuando pase la fecha de fin, las transacciones se archivan; el saldo neto se guarda para los gráficos.',
      bud_cycle_saved: 'Ajustes del ciclo guardados',
      bud_add_tx_btn: 'Añadir transacción',
      bud_import_budget_btn: 'Importar datos',
      import_data_btn: 'Importar datos',
      import_data_confirm: 'Los datos del módulo actuales se eliminarán y reemplazarán con los importados. ¿Continuar?',
      import_data_ok: 'Datos importados correctamente',
      import_data_err: 'No se encontraron datos válidos del módulo',
      bud_import_budget_confirm: 'Los datos de presupuesto actuales serán eliminados y reemplazados por los del archivo. ¿Continuar?',
      bud_import_budget_ok: 'Datos de presupuesto importados correctamente',
      bud_import_budget_err: 'Archivo no válido — no se encontraron datos de presupuesto',
      bud_add_group_btn: 'Añadir categoría',
      bud_edit_open: 'Editar paneles',
      bud_edit_close: 'Cerrar edición',
      bud_edit_tx_modal: 'Editar transacción',
      bud_edit_desc_label: 'Descripción',
      bud_trans_panel: 'Registro de transacciones',
      bud_col_date: 'FECHA',
      bud_col_amount: 'IMPORTE',
      bud_col_subcat: 'SUBCATEGORÍA',
      bud_col_maincat: 'CATEGORÍA PRINCIPAL',
      bud_col_desc: 'DESCRIPCIÓN',
      bud_shrink_height: 'Reducir altura',
      bud_grow_height: 'Aumentar altura',
      bud_collapse: 'Contraer',
      bud_expand: 'Expandir',
      bud_add_sub_for: '{0} — Añadir subcategoría',
      bud_net_balance: 'SALDO NETO',
      bud_this_period: 'este período',
      bud_positive: 'positivo',
      bud_negative: 'negativo',
      bud_cat_name_prompt: 'Nombre de categoría:',
      bud_no_groups: 'Aún no hay grupos de categorías.',
      bud_add_first_group: 'Añadir primera categoría',
      bud_no_subs: 'Sin subcategorías.',
      bud_sub_count: '{0} subcategorías',
      bud_add_sub_btn: 'Añadir subcategoría',
      bud_select_main: '— Selecciona categoría principal —',
      bud_select_sub: '— Selecciona subcategoría —',
      bud_no_subs_hint: 'Primero añade un grupo de categoría y subcategoría desde la pestaña Categorías.',
      bud_all_cats: 'Todas las categorías',
      bud_filter_by_date: 'Filtrar por fecha',
      bud_filter_date: 'Fecha',
      bud_filter_from: 'Desde',
      bud_filter_to: 'Hasta',
      bud_filter_date_range: 'Rango de fechas',
      bud_hist_search: 'Buscar...',
      bud_hist_all_cats: 'Todas las categorías',
      bud_clear_date: 'Limpiar',
      bud_tx_updated: 'Transacción actualizada',
      bud_group_added: 'Grupo de categorías añadido',
      bud_sub_added: 'Subcategoría añadida',
      bud_cat_updated: 'Categoría actualizada',
      bud_budget_updated: 'Presupuesto actualizado',
      bud_confirm_delete_sub: '¿Seguro que quieres eliminar esta subcategoría y todas sus transacciones?',
      bud_sub_deleted: 'Subcategoría eliminada',
      bud_tx_desc_placeholder: 'Introduce una descripción...',
      bud_group_name_placeholder: 'Ej.: Gastos, Ahorros, Suscripciones...',
      bud_sub_name_placeholder: 'Ej.: Compra del supermercado...',
      bud_edit_budget_title: 'Editar presupuesto',
      bud_edit_sub_modal: 'Editar subcategoría',
      bud_sub_name_required: 'El nombre de la subcategoría no puede estar vacío',
      bud_confirm_title: 'Confirmar',
      bud_edit_name_title: 'Editar nombre',
      bud_edit_group_modal: 'Editar categoría',
      bud_add_sub_title: 'Añadir subcategoría',
      bud_delete_group_title: 'Eliminar grupo',
      bud_no_groups_hint: 'Aún no hay categorías. Empieza desde la pestaña "Categorías principales".',
      bud_edit_budget_prompt: 'Nuevo importe de presupuesto para "{0}" ({1}):',

      // Investments modals/UI
      inv_add_modal: 'Añadir activo',
      inv_edit_modal: 'Editar activo',
      inv_add_btn: 'Añadir activo',
      inv_asset_type_label: 'Tipo de activo',
      inv_type_stock: '📈 Acción',
      inv_type_etf: '🗂️ ETF / Fondo',
      inv_type_crypto: '₿ Cripto',
      inv_type_commodity: '🥇 Materia prima (Oro, Plata…)',
      inv_type_bond: '📄 Bono',
      inv_type_cash: '💵 Efectivo / Divisa',
      inv_type_stock_lbl: 'Bolsa EE.UU.', inv_type_stock_other_lbl: 'Otra Bolsa', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Cripto',
      inv_type_commodity_lbl: 'Emtia', inv_type_bond_lbl: 'Bono', inv_type_cash_lbl: 'Efectivo',
      inv_exchange_label: 'Bolsa / Mercado',
      inv_exchange_us: '🇺🇸 Mercado EE.UU. (NYSE / NASDAQ)',
      inv_exchange_other: '🌐 Otras bolsas',
      inv_auto_price_info: 'Los precios de acciones, ETF y cripto se actualizan automáticamente a través de Alpha Vantage.',
      inv_price_currency_label: 'Moneda del precio',
      inv_symbol_label: 'Símbolo / Ticker',
      inv_display_name_label: 'Nombre visible',
      inv_quantity_label: 'Cantidad',
      inv_buy_price_label: 'Precio de compra',
      inv_buy_date_label: 'Fecha de compra',
      inv_dist_panel: 'Distribución de activos',
      inv_perf_panel: 'Análisis de rendimiento',
      inv_portfolio_panel: 'Detalle del portafolio',
      inv_kpi_portfolio_label: 'VALOR DEL PORTAFOLIO',
      inv_kpi_total_return: 'rendimiento total',
      inv_kpi_vs_invested: 'vs invertido',
      inv_kpi_cost_basis: 'base de coste',
      inv_kpi_asset_count_label: 'NÚMERO DE ACTIVOS',
      inv_kpi_instruments: 'instrumentos',
      inv_pnl_total: 'G/P Total',
      inv_pnl_daily: 'G/P Diaria',
      inv_pnl_weekly: 'G/P Semanal',
      inv_pnl_monthly: 'G/P Mensual',
      inv_period_daily: 'Diario',
      inv_period_weekly: 'Semanal',
      inv_period_monthly: 'Mensual',
      inv_period_3month: '3 meses',
      inv_period_alltime: 'Todo el tiempo',
      time_daily_total_sub: 'Tiempo total diario',
      inv_no_assets_legend: 'Sin activos en el portafolio',
      inv_no_assets_table: 'Aún no hay activos — haz clic en "Añadir activo" para empezar',
      inv_by_symbol: 'Por símbolo',
      inv_by_type: 'Por tipo',
      inv_top_gainers: 'Ganadores',
      inv_top_losers: 'Perdedores',
      inv_updating: 'Actualizando precios…',
      inv_refresh_in: 'Disponible en {0} min',
      inv_refresh_title: 'Actualizar precios (API)',
      inv_rate_input_title: 'Tipo manual — se actualiza automáticamente',
      inv_api_keys_title: 'Claves API',
      inv_wait_min: 'Espera {0} minutos más para actualizar',
      inv_api_limit: 'Límite diario de Alpha Vantage alcanzado (25 req/día). Los precios se actualizarán mañana.',
      inv_asset_merged: '{0} actualizado — coste medio: {1}, total: {2}',
      inv_asset_added: 'Activo añadido',
      inv_asset_updated: 'Activo actualizado',
      inv_manual_price_label: '{0} — Precio actual ({1})',
      inv_manual_price_note: '{0} denominado en {1}',
      inv_invalid_price: 'Introduce un precio válido',
      inv_price_saved: 'Precio guardado',
      inv_optional_suffix: '— opcional',
      inv_fx_error: 'No se pudo obtener el tipo de cambio',
      inv_fx_updated: 'Todos los tipos actualizados',
      inv_enter_symbol: 'Introduce el símbolo',
      inv_invalid_qty: 'Introduce una cantidad válida',
      inv_invalid_buy: 'Introduce un precio de compra válido',
      inv_buy_price_sym: 'Precio de compra {0}',
      inv_manual_price_info: 'El precio que introduces solo se usa para el cálculo del valor del portafolio; tu precio de compra no cambia.',
      inv_no_history_note: 'Sin datos históricos, mostrando total',
      inv_edit_price_title: 'Editar precio actual',
      inv_col_asset: 'Activo / Símbolo',
      inv_col_type: 'Tipo',
      inv_col_qty: 'Cant.',
      inv_col_cost: 'Coste medio',
      inv_col_price: 'Precio actual',
      inv_col_value: 'Valor total',
      inv_col_pnl: 'G/P Total',
      inv_col_pct: 'Asignación %',
      inv_pnl_toggle_title: 'Cambiar vista de G/P',
      inv_tab_deposits: 'Depósitos',
      inv_dep_add: 'Añadir Depósito',
      inv_dep_edit: 'Editar Depósito',
      inv_dep_type_term: 'Depósito a Plazo',
      inv_dep_type_free: 'Flexible / Interés Diario',
      inv_dep_bank: 'Nombre del Banco',
      inv_dep_bank_ph: 'BBVA, Santander…',
      inv_dep_principal: 'Principal',
      inv_dep_rate: 'Tasa de Interés Anual (%)',
      inv_dep_term: 'Plazo',
      inv_dep_term_1m: '1 Mes (30 días)',
      inv_dep_term_3m: '3 Meses (90 días)',
      inv_dep_term_6m: '6 Meses (180 días)',
      inv_dep_term_1y: '1 Año (365 días)',
      inv_dep_term_custom: 'Personalizado',
      inv_dep_term_custom_days: 'Número de Días',
      inv_dep_term_custom_ph: 'Ej: 45',
      inv_dep_free_info: 'Interés compuesto diario — su dinero crece cada día sin esperar al vencimiento.',
      inv_dep_start: 'Fecha de Inicio',
      inv_dep_notes: 'Notas',
      inv_dep_current_val: 'Valor Actual',
      inv_dep_daily_gain: 'Ganancia Diaria',
      inv_dep_accrued: 'Interés Acumulado',
      inv_dep_maturity: 'Fecha de Vencimiento',
      inv_dep_days_left: 'Restante',
      inv_dep_days_left_val: '{0} días',
      inv_dep_expired: 'Vencido',
      inv_dep_no_deposits: 'No hay cuentas de depósito aún',
      inv_dep_confirm_delete: '¿Estás seguro de que deseas eliminar este depósito?',
      inv_dep_skip_confirm: 'No preguntar hoy',
      inv_sub_stocks:       'Acciones / ETF',
      inv_dep_view_cards:   'Tarjetas',
      inv_dep_view_table:   'Tabla',
      inv_dep_maturity_interest: 'Interés al Vencimiento',
      inv_dep_total_return: 'Al Vencimiento',
      inv_dep_status_active: 'Activo',
      inv_dep_search_ph:    'Buscar banco...',
      inv_tab_hist:         'Historial de Transacciones',
      inv_dep_status:       'Estado',
      inv_dep_deleted: 'Depósito eliminado',
      inv_dep_saved: 'Depósito guardado',
      inv_dep_free_note: 'Cuenta flexible: interés compuesto diario, sin plazo fijo.',
      inv_dep_term_note: 'Depósito a plazo: interés simple pagado al vencimiento.',

      // Dashboard panels
      dash_this_week: 'Esta semana',
      dash_this_month: 'Este mes',
      dash_this_year: 'Este año',
      dash_week_time: 'Distribución de tiempo esta semana',
      dash_month_time: 'Distribución de tiempo este mes',
      dash_year_time: 'Distribución de tiempo este año',
      dash_week_spent: 'GASTO SEMANAL',
      dash_month_spent: 'GASTO MENSUAL',
      dash_year_spent: 'GASTO ANUAL',
      dash_upcoming: 'Planes próximos',
      dash_inv_dist: 'Distribución de inversiones',
      dash_budget_status: 'Estado del presupuesto',
      dash_dreams_panel: 'Sueños',

      // Gym
      nav_gym: 'Gimnasio',
      gym_add_btn: 'Agregar Entrenamiento',
      gym_add_modal: 'Nuevo Entrenamiento',
      gym_edit_modal: 'Editar Entrenamiento',
      gym_type_label: 'Tipo de Entrenamiento',
      gym_type_strength: 'Entrenamiento de Fuerza',
      gym_type_cardio: 'Cardio',
      gym_type_flexibility: 'Flexibilidad / Yoga',
      gym_type_crossfit: 'Crossfit / HIIT',
      gym_type_sport: 'Deporte / Juego',
      gym_type_other: 'Otro',
      gym_duration_label: 'Duración (minutos)',
      gym_notes_label: 'Notas',
      gym_notes_placeholder: 'Notas del entrenamiento...',
      gym_exercises_label: 'Ejercicios',
      gym_add_exercise_btn: 'Agregar Ejercicio',
      gym_exercise_name_ph: 'Nombre del ejercicio (ej. Bench Press)',
      gym_sets_label: 'Series',
      gym_reps_label: 'Reps',
      gym_weight_label: 'Peso (kg)',
      gym_ex_duration_label: 'Duración (min)',
      gym_ex_distance_label: 'Distancia (km)',
      gym_no_workouts: 'Aún no hay entrenamientos registrados.',
      gym_workout_added: 'Entrenamiento agregado',
      gym_workout_updated: 'Entrenamiento actualizado',
      gym_workout_deleted: 'Entrenamiento eliminado',
      gym_confirm_delete: '¿Estás seguro de que quieres eliminar este entrenamiento?',
      gym_kpi_week: 'ESTA SEMANA',
      gym_kpi_month: 'ESTE MES',
      gym_kpi_total_hours: 'TIEMPO TOTAL',
      gym_kpi_streak: 'RACHA ACTIVA',
      gym_kpi_sessions: 'sesiones',
      gym_kpi_hours_sub: 'horas',
      gym_kpi_streak_sub: 'días',
      gym_off_days: 'Días de descanso',
      gym_off_day_title: 'Día de descanso — no rompe la racha',
      gym_panel_chart: 'Frecuencia Semanal de Entrenamiento',
      gym_panel_prs: 'Récords Personales',
      gym_panel_history: 'Historial de Entrenamientos',
      gym_pr_exercise: 'Ejercicio',
      gym_pr_weight: 'Mejor (kg)',
      gym_pr_date: 'Fecha',
      gym_no_prs: 'Aún no hay récords personales.',
      gym_this_week: 'Esta Semana',
      gym_sessions_suffix: 'sesiones',
      gym_minutes_label: 'min',
      gym_no_exercises: 'No se agregaron ejercicios',
      gym_type_badge_strength: 'Fuerza',
      gym_type_badge_cardio: 'Cardio',
      gym_type_badge_flexibility: 'Flexibilidad',
      gym_type_badge_crossfit: 'Crossfit',
      gym_type_badge_sport: 'Deporte',
      gym_type_badge_other: 'Otro',
      gym_panel_progress: 'Progreso del Ejercicio',
      gym_panel_muscles: 'Distribución por Músculo',
      gym_panel_volume: 'Volumen Semanal',
      gym_panel_body: 'Medidas Corporales',
      gym_panel_templates: 'Plantillas de Entrenamiento',
      gym_pr_1rm: '1RM Estimado',
      gym_rpe_label: 'Intensidad (RPE 1–10)',
      gym_distance_label: 'Distancia (km)',
      gym_muscle_label: 'Grupo Muscular',
      gym_muscle_none: '—',
      gym_muscle_chest: 'Pecho',
      gym_muscle_back: 'Espalda',
      gym_muscle_legs: 'Piernas',
      gym_muscle_shoulders: 'Hombros',
      gym_muscle_arms: 'Brazos',
      gym_muscle_core: 'Core',
      gym_muscle_cardio: 'Cardio',
      gym_progress_select: 'Seleccionar ejercicio...',
      gym_progress_no_data: 'No hay datos para este ejercicio.',
      gym_volume_unit: 'ton volumen',
      gym_kpi_volume: 'VOLUMEN SEMANAL',
      gym_kpi_volume_sub: 'toneladas (series×reps×kg)',
      gym_kpi_goal: 'OBJETIVO SEMANAL',
      gym_kpi_goal_sub: 'sesiones / objetivo',
      gym_weekly_goal_label: 'Objetivo semanal (días)',
      gym_body_modal_title: 'Agregar Medida Corporal',
      gym_body_weight_label: 'Peso Corporal (kg)',
      gym_body_fat_label: 'Grasa Corporal (%)',
      gym_body_waist_label: 'Cintura (cm)',
      gym_body_chest_label: 'Pecho (cm)',
      gym_body_arm_label: 'Brazo (cm)',
      gym_body_leg_label: 'Pierna (cm)',
      gym_body_add_btn: 'Agregar Medida',
      gym_body_added: 'Medida agregada',
      gym_body_deleted: 'Medida eliminada',
      gym_body_no_data: 'Aún no hay medidas corporales.',
      gym_body_weight_chart: 'Peso Corporal (kg)',
      gym_body_table_date: 'Fecha',
      gym_body_table_weight: 'Peso',
      gym_body_table_fat: 'Grasa %',
      gym_body_table_waist: 'Cintura',
      gym_no_muscle_data: 'Agrega ejercicios con grupo muscular para ver la distribución.',
      gym_template_modal_title: 'Guardar Plantilla',
      gym_template_name_ph: 'Nombre de plantilla (ej: Día de Empuje)',
      gym_template_save_btn: 'Guardar como Plantilla',
      gym_template_load_btn: 'Cargar Plantilla',
      gym_template_added: 'Plantilla guardada',
      gym_template_deleted: 'Plantilla eliminada',
      gym_no_templates: 'Aún no hay plantillas guardadas.',
      gym_template_confirm_delete: '¿Estás seguro de que quieres eliminar esta plantilla?',
      gym_load_template_title: 'Seleccionar Plantilla',
      gym_volume_label: 'Volumen',
      gym_unit_kg: 'kg',
      gym_unit_lb: 'lb',
      gym_body_edit_modal_title: 'Editar Medida',
      gym_body_updated: 'Medida actualizada',
      gym_template_rename_title: 'Renombrar Plantilla',
      gym_template_updated: 'Plantilla actualizada',
      gym_template_edit_title: 'Editar Plantilla',
      gym_template_duplicate: 'Duplicar',
      gym_template_duplicated: 'Plantilla duplicada',
      gym_template_type_label: 'Tipo de Plantilla',
    },

    fr: {
      // UI chrome
      settings_title: 'Paramètres',
      settings_lang: 'Langue',
      settings_lang_tr: 'Turc',
      settings_lang_en: 'Anglais',
      settings_lang_zh: 'Chinois',
      settings_lang_es: 'Espagnol',
      settings_lang_fr: 'Français',
      settings_currency: 'Devise utilisée',
      settings_ui_scale: "Échelle de l'interface",
      settings_tab_ui: 'Interface',
      settings_tab_panels: 'Panneaux',
      settings_panels_hint: 'Masquez les modules inutiles — vos données sont conservées.',
      btn_hide: 'Masquer',
      btn_show: 'Afficher',
      settings_theme: 'Mode de thème',
      settings_theme_dark: 'Sombre',
      settings_theme_midnight: 'Minuit',
      settings_theme_ocean: 'Océan',
      settings_theme_forest: 'Forêt',
      settings_theme_sunset: 'Coucher de soleil',
      settings_theme_rose: 'Rose',
      settings_theme_amber: 'Ambre',
      settings_theme_crimson: 'Cramoisi',
      settings_theme_nebula: 'Nébuleuse',
      settings_theme_arctic: 'Arctique',
      settings_theme_neon: 'Néon',
      settings_theme_white: 'Blanc',
      settings_data_title: 'Gestion des données',
      settings_export_btn: 'Exporter',
      settings_export_desc: 'Téléchargez toutes vos données en fichier JSON.',
      settings_import_btn: 'Importer',
      settings_import_title: 'Importer des données',
      settings_import_desc: 'Chargez un fichier JSON précédemment exporté.',
      settings_import_confirm: 'Toutes les données existantes seront remplacées par celles du fichier. Continuer ?',
      settings_import_ok: 'Données chargées avec succès.',
      settings_import_err: 'Format de fichier invalide.',
      settings_delete_btn: 'Supprimer toutes les données',
      settings_delete_title: 'Supprimer toutes les données',
      settings_delete_msg: 'Vous êtes sur le point de supprimer définitivement <strong>toutes les données</strong> — budget, plans, habitudes, investissements, clés API et paramètres. Cette action <strong>ne peut pas être annulée</strong>.',
      settings_delete_confirm: '⚠️ AVERTISSEMENT\n\nVous êtes sur le point de supprimer définitivement toutes vos données (budget, plans, habitudes, investissements, clés API…).\n\nCette action ne peut pas être annulée. Êtes-vous sûr ?',
      settings_delete_ok: 'Toutes les données supprimées.',
      seed_warning_label: 'Données Démo Actives',
      seed_warning_desc: 'Données de démonstration chargées — effacez-les dans Paramètres et entrez vos propres données',
      settings_delete_choice_title: 'Supprimer les données',
      settings_delete_choice_subtitle: 'Choisissez comment réinitialiser :',
      settings_delete_reset_label: 'Réinitialiser en démo',
      settings_delete_reset_desc: 'Vos données personnelles sont supprimées et les données de démonstration sont restaurées. Les panneaux afficheront toujours du contenu.',
      settings_delete_reset_btn: 'Réinitialiser en démo',
      settings_delete_wipe_label: 'Tout supprimer',
      settings_delete_wipe_desc: 'Toutes les données (y compris la démo) sont définitivement supprimées. L\'application démarrera complètement vide.',
      settings_delete_wipe_btn: 'Tout supprimer',
      settings_delete_wipe_confirm: 'Toutes les données (démo incluse) seront définitivement supprimées. Êtes-vous sûr ?',
      settings_delete_wipe_ok: 'Toutes les données supprimées.',
      settings_delete_reset_ok: 'Réinitialisé aux données de démonstration.',
      settings_api_title: 'Clés API',
      settings_api_hint: "Nécessaires pour que le module d'investissement récupère les prix en direct.",
      settings_api_av: 'Alpha Vantage (Actions, ETF, Crypto)',
      settings_api_fx: 'Exchange Rates (Taux de change)',
      settings_api_save: 'Enregistrer les clés',
      settings_api_saved: 'Clés API enregistrées.',
      settings_update_rates: 'Mettre à jour les taux',
      settings_update_rates_title: 'Récupérer tous les taux de change maintenant',
      panel_manager_title: 'Visibilité des panneaux',
      panel_on: 'Activé',
      panel_off: 'Désactivé',
      panel_empty: 'Aucun panneau gérable sur cette page.',
      privacy_show: 'Afficher les valeurs',
      privacy_hide: 'Masquer les valeurs',
      sidebar_settings: 'Paramètres',
      sidebar_help: 'Aide',
      sidebar_privacy: 'Confidentialité',
      sidebar_toggle: 'Réduire / Développer le menu',
      priority_high: 'Haute',
      priority_medium: 'Moyenne',
      priority_low: 'Basse',
      hours_suffix: 'h',
      mins_suffix: 'min',
      secs_suffix: 's',

      // nav & topbar labels
      nav_dashboard: 'Tableau de bord',
      nav_pomodoro: 'Mode concentration',
      nav_time: 'Suivi du temps',
      nav_habits: 'Habitudes',
      nav_plans: 'Plans',
      nav_goals: 'Rêves et objectifs',
      nav_budget: 'Budget',
      nav_investments: 'Investissements',

      // days (short)
      day_mon: 'Lun', day_tue: 'Mar', day_wed: 'Mer',
      day_thu: 'Jeu', day_fri: 'Ven', day_sat: 'Sam', day_sun: 'Dim',

      // Dashboard
      dash_net_worth: 'PATRIMOINE NET',
      dash_today_spent: 'DÉPENSES DU JOUR',
      dash_habits_done: 'HABITUDES COMPLÉTÉES',
      dash_active_goals: 'OBJECTIFS ACTIFS',
      dash_habits_pct: "{0}% aujourd'hui",
      dash_goals_of: 'sur {0} objectifs',
      dash_net_worth_change: 'investissements + dépôts + budget',
      dash_nw_inv: 'Invest.',
      dash_nw_dep: 'Dépôts',
      dash_nw_bud: 'Budget',
      dash_over_limit: 'au-dessus de la limite',
      dash_in_limit: 'dans la limite',
      dash_budget_total: 'BUDGET TOTAL',
      dash_completion_rate: 'TAUX D\'ACHÈVEMENT',
      dash_avg_progress: 'PROGRESSION MOY.',
      dash_no_plans: 'Aucun plan à venir',
      dash_today: "Aujourd'hui",
      dash_tomorrow: 'Demain',
      dash_no_assets: 'Aucun actif dans le portefeuille',
      dash_no_sessions: "Aucune session pour l'instant",
      dash_n_more: '+{0} de plus',
      dash_today_sessions: "Pomodoros aujourd'hui",
      dash_week_total: 'Cette semaine',
      dash_focused: 'concentré',
      dash_focus_month: 'Ce mois',
      dash_focus_streak: 'Série quotidienne',
      dash_focus_streak_days: '{0} jours',
      dash_focus_cats_week: 'Catégories cette semaine',
      dash_focus_no_logs: 'Aucun journal de temps',
      dash_recent_tasks: 'Tâches récentes',
      dash_no_goals: "Aucun rêve pour l'instant",
      dash_in_progress: 'En cours',
      dash_completed: 'Terminé',
      dash_no_spending: 'Aucune donnée de dépense',
      dash_no_workouts: "Aucun entraînement pour l'instant",
      dash_gym_week_dur: 'Durée Semaine',
      dash_gym_streak_lbl: 'Série',
      dash_gym_exercises: 'exercices',
      dash_surplus: 'excédent',
      dash_over: 'dépassement',
      dash_hour_label: 'Heure',
      asset_stock: 'Action',
      asset_stock_us: 'Action US',
      asset_stock_other: 'Action Autre Bourse',
      asset_etf: 'ETF',
      asset_crypto: 'Crypto',
      asset_commodity: 'Matière première',
      asset_bond: 'Obligation',
      asset_cash: 'Liquidités',

      // Plans
      plans_todo: 'À FAIRE',
      plans_progress: 'EN COURS',
      plans_done: 'TERMINÉ',
      plans_kpi_pending: 'tâche en attente',
      plans_kpi_ongoing: 'tâche active',
      plans_kpi_from_total: 'sur {0} au total',
      plans_no_tasks: 'Aucune tâche',
      plans_start: 'Démarrer',
      plans_complete: 'Terminer',
      plans_title_col: 'TITRE',
      plans_due_col: 'DATE',
      plans_cat_col: 'CATÉGORIE',
      plans_status_col: 'STATUT',
      plans_priority_col: 'PRIORITÉ',
      plans_added: 'Plan ajouté',
      plans_updated: 'Plan mis à jour',
      plans_deleted: 'Plan supprimé',
      plans_confirm_delete: 'Êtes-vous sûr de vouloir supprimer ce plan ?',
      plans_edit_modal: 'Modifier le plan',
      plans_subtasks: 'Sous-plans',
      plans_subtask_placeholder: 'Ajouter un sous-plan...',
      plans_subtask_count: '{0}/{1} terminés',
      plans_no_subtasks: 'Aucun sous-plan pour l\'instant',
      plans_confirm_delete_sub: 'Êtes-vous sûr de vouloir supprimer ce sous-plan ?',
      status_todo: 'À faire',
      status_progress: 'En cours',
      status_done: 'Terminé',

      // Time
      time_today_kpi: "AUJOURD'HUI",
      time_week_kpi: 'CETTE SEMAINE',
      time_month_kpi: 'CE MOIS',
      time_focus_pct: '⏱ {0}% concentration',
      time_total_dur: 'temps total',
      time_last7: '7 derniers jours',
      time_last30: '30 derniers jours',
      time_duration_label: 'Durée',
      time_no_logs: "Aucun journal pour l'instant",
      time_auto_end: '⏱ Auto',
      time_history_title: 'Répartition quotidienne : {0}',
      time_min_suffix: 'min',
      time_date_col: 'DATE',
      time_category_col: 'CATÉGORIE',
      time_project_col: 'PROJET',
      time_start_col: 'DÉBUT',
      time_end_col: 'FIN',
      time_dur_col: 'DURÉE',

      // Habits
      habits_no_habits: "Aucune habitude pour l'instant.",
      habits_no_day_selected: 'Aucun jour sélectionné',
      habits_daily: 'Permanent — chaque jour',
      habits_edit: 'Modifier',
      habits_delete: 'Supprimer',
      habits_skip: "Passer aujourd'hui",
      habits_unskip: 'Annuler le saut',
      habits_skipped_section: "Ne sera pas fait aujourd'hui",
      habits_all_done: 'Toutes les habitudes complétées !',
      habits_none_today: "Aucune habitude pour aujourd'hui.",
      habits_total: 'TOTAL DES HABITUDES',
      habits_today_kpi: "AUJOURD'HUI",
      habits_streak_best: 'MEILLEURE SÉRIE',
      habits_completed_label: 'Complétées',
      habits_remaining_label: 'Restantes',
      habits_week_title: 'Semaine',
      habits_week_n: 'SEMAINE {0}',
      habits_30_day: 'Historique 30 jours',
      habits_older: '← plus ancien',
      habits_today_arrow: "aujourd'hui →",
      habits_habit_col: 'Habitude',
      habits_pct_col: '%',
      habits_time_badge: 'Temp.',
      habits_added: 'Habitude ajoutée',
      habits_deleted: 'Habitude supprimée',
      habits_confirm_delete: 'Êtes-vous sûr de vouloir supprimer cette habitude ?',
      habits_current_streak: 'Série actuelle',
      habits_best_streak: 'Meilleure série',

      // Goals
      goals_active_kpi: 'OBJECTIFS ACTIFS',
      goals_avg_progress: 'PROGRÈS MOYEN',
      goals_total_kpi: 'TOTAL DES OBJECTIFS',
      goals_none: "Aucun objectif ajouté pour l'instant...",
      goals_days_left: '{0} jours restants',
      goals_overdue: 'En retard',
      goals_update_progress: 'Mettre à jour le progrès',
      goals_progress_prompt: 'Nouveau pourcentage de progrès (0-100) :',
      goals_added: 'Objectif ajouté',
      goals_updated: 'Objectif mis à jour',
      goals_deleted: 'Objectif supprimé',
      goals_confirm_delete: 'Êtes-vous sûr de vouloir supprimer cet objectif ?',
      goals_dream_added: 'Rêve ajouté',
      goals_dream_updated: 'Rêve mis à jour',
      goals_dream_deleted: 'Rêve supprimé',
      goals_all_done: '🎉 Toutes les étapes complétées !',
      goals_days_overdue: '{0} jours de retard',
      goals_ms_empty_card: "Aucun jalon — ajoutez depuis l'édition",
      goals_ms_empty_modal: "Aucun jalon ajouté pour l'instant",
      goals_ms_confirm_del: 'Êtes-vous sûr de vouloir supprimer ce sous-objectif ?',
      goals_none_dreams: "Aucun rêve ajouté pour l'instant",
      goals_cat_kariyer: 'Carrière',
      goals_cat_seyahat: 'Voyage',
      goals_cat_saglik: 'Santé',
      goals_cat_egitim: 'Éducation',
      goals_cat_kisisel: 'Personnel',
      goals_cat_finansal: 'Finance',

      // Budget
      bud_income_kpi: 'REVENUS',
      bud_expense_kpi: 'DÉPENSES',
      bud_balance_kpi: 'BUDGET RESTANT',
      bud_total_income: 'REVENUS TOTAUX',
      bud_total_expense: 'DÉPENSES TOTALES',
      bud_kpi_pct_left: '{0}% du budget restant',
      bud_kpi_over: '{0}% dépassé',
      bud_budget_label: 'Budget',
      bud_actual_label: 'Réel',
      bud_income_label: 'REVENUS',
      bud_expense_label: 'DÉPENSES',
      bud_summary_title: 'Résumé du Budget',
      bud_source_col: 'SOURCE',
      bud_budget_col: 'BUDGET',
      bud_actual_col: 'RÉEL',
      bud_usage_col: 'USAGE',
      bud_remaining_footer: 'RESTANT',
      bud_no_groups: "Aucun groupe pour l'instant",
      bud_no_transactions: "Aucune transaction pour l'instant",
      bud_type_income: 'Revenu',
      bud_type_expense: 'Dépense',
      bud_surplus: 'excédent',
      bud_over: 'dépassé',
      bud_sub_count: '{0} sous-catégories',
      bud_group_added: 'Groupe ajouté',
      bud_group_deleted: 'Groupe supprimé',
      bud_trans_added: 'Transaction ajoutée',
      bud_add_continue: 'Ajouter et continuer',
      bud_trans_deleted: 'Transaction supprimée',
      bud_confirm_delete_group: 'Êtes-vous sûr de vouloir supprimer ce groupe et toutes ses transactions ?',
      bud_confirm_delete_trans: 'Êtes-vous sûr de vouloir supprimer cette transaction ?',
      bud_panel_bar: 'Budget vs Réel',
      bud_panel_pie: 'Répartition des dépenses',
      bud_panel_timeline: 'Tendance revenus/dépenses',
      bud_panel_daily: 'Quand est-ce que je dépense ?',
      bud_panel_subcats: 'Où va mon argent ?',
      bud_panel_net_history: 'Épargne nette',
      bud_net_history_title: 'Épargne nette ({0} derniers mois)',
      bud_net_month: 'Mois {0}',
      bud_sub_col: 'SOUS-CATÉGORIE',
      bud_perc_col: 'PORC.',
      bud_details: 'Détails',
      bud_daily_balance: 'SOLDE',
      bud_daily_inc_col: 'REV. TOTAL',
      bud_daily_exp_col: 'DÉP. TOTAL',
      bud_panel_transactions: 'Transactions',
      bud_desc_col: 'DESCRIPTION',
      bud_date_col: 'DATE',
      bud_group_col: 'GROUPE',
      bud_amount_col: 'MONTANT',
      bud_type_col: 'TYPE',

      // Investments
      inv_total_value: 'VALEUR TOTALE',
      inv_total_cost: 'COÛT TOTAL',
      inv_pnl: 'GAIN/PERTE',
      inv_pnl_pct: 'RENDEMENT %',
      inv_asset_label: 'ACTIF',
      inv_more_assets: 'actifs de plus',
      inv_type_label: 'TYPE',
      inv_no_assets: "Aucun actif pour l'instant",
      inv_asset_added: 'Actif ajouté',
      inv_asset_updated: 'Actif mis à jour',
      inv_asset_deleted: 'Actif supprimé',
      inv_confirm_delete: 'Êtes-vous sûr de vouloir supprimer cet actif ?',
      inv_just_now: "à l'instant",
      inv_sell: 'Vendre',
      inv_sell_title: 'Vendre un actif',
      inv_sell_qty: 'Quantité à vendre',
      inv_buy_qty: 'Quantité à acheter',
      inv_sell_price: 'Prix de vente',
      inv_sell_date: 'Date de vente',
      inv_sell_preview: 'P/G estimé',
      inv_sell_confirm: 'Vendre',
      inv_sell_success: 'Actif vendu',
      inv_sell_err_qty: 'Quantité invalide',
      inv_sell_err_price: 'Prix invalide',
      inv_sell_max: 'disponible',
      inv_realized_pnl: 'G/P réalisé',
      inv_buy: 'Acheter',
      inv_buy_title: 'Acheter plus',
      inv_buy_confirm: 'Acheter',
      inv_buy_success: 'Achat enregistré',
      inv_buy_new_avg: 'Nouveau coût moy.',
      inv_avg_cost: 'Coût moyen',
      inv_select_asset: 'Sélectionner un actif',
      inv_no_assets: 'Aucun actif dans le portefeuille',
      inv_trade_history: 'Historique des opérations',
      inv_col_trade_type: 'Type',
      inv_col_trade_price: 'Prix',
      inv_trade_type_buy: 'Achat',
      inv_trade_type_sell: 'Vente',
      inv_no_trades: 'Aucune opération pour l\'instant',
      inv_edit_trade: 'Modifier l\'opération',
      inv_delete_trade: 'Supprimer l\'opération',
      inv_trade_deleted: 'Opération supprimée',
      inv_trade_updated: 'Opération mise à jour',
      inv_col_actions: 'Actions',
      inv_trade_action: 'Opérations',
      inv_trade_filter_all: 'Date',
      inv_tab_portfolio: 'Portefeuille',
      inv_tab_trades: 'Historique',
      inv_history_btn: 'Historique',
      inv_hist_tab_trades: 'Opérations',
      inv_hist_tab_deposits: 'Dépôts',
      inv_dep_term_short: 'Terme',
      inv_dep_free_short: 'Flex',
      inv_dep_type_label: 'Type',
      inv_trade_search: 'Symbole, nom...',
      inv_trade_opt_new_desc: 'Ajouter un nouvel actif absent de votre portefeuille',
      inv_trade_opt_buy_desc: 'Acheter davantage d\'un actif existant, le coût moyen se met à jour',
      inv_trade_opt_sell_desc: 'Vendre une partie ou la totalité d\'un actif existant',
      inv_mins_ago: 'il y a {0} min',
      inv_hours_ago: 'il y a {0} h',
      inv_days_ago: 'il y a {0} j',
      inv_manual: 'manuel',
      inv_period_1d: '1J',
      inv_period_1w: '1S',
      inv_period_1m: '1M',
      inv_period_3m: '3M',
      inv_period_6m: '6M',
      inv_period_1y: '1A',

      // Pomodoro
      pomo_work: 'POMODORO',
      pomo_short: 'PAUSE COURTE',
      pomo_long: 'PAUSE LONGUE',
      pomo_flow: 'MODE FLOW',
      pomo_countdown: 'COMPTE À REBOURS',
      pomo_overtime: 'DÉPASSEMENT',
      pomo_start: 'Démarrer',
      pomo_resume: 'Reprendre',
      pomo_pause: 'Pause',
      pomo_reset: 'Réinitialiser',
      pomo_session_saved: 'Session enregistrée — {0}',
      pomo_today_sessions: 'SESSIONS DU JOUR',
      pomo_week_total: 'TOTAL DE LA SEMAINE',
      pomo_total_sessions: 'SESSIONS TOTALES',
      pomo_flags: '{0} marqueur(s)',
      pomo_flags_count: '{0} marqueur(s) posé(s)',
      pomo_flags_none: 'Aucun marqueur',
      pomo_flow_save_desc: "Enregistre {0} jusqu'au dernier marqueur ; le reste est supprimé.",
      pomo_flow_save_none: 'Aucun marqueur — rien ne sera enregistré.',
      pomo_flow_hard_flow: "Rien n'est enregistré — remet le minuteur à 0:00.",
      pomo_flow_hard_count: "Rien n'est enregistré — remet le minuteur au début.",
      pomo_confirm_reset: 'Êtes-vous sûr de vouloir réinitialiser le minuteur ?',
      pomo_confirm_del_todo: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      pomo_add_sub_ph: 'Ajouter une sous-tâche...',
      pomo_mode_switch_title: 'Changement de mode',
      pomo_mode_switch_msg: 'Vous effectuez un changement de mode.',
      pomo_mode_switch_flags: 'Les marqueurs enregistrés sont sauvegardés dans le temps lors du changement.',
      pomo_mode_switch_duration: 'Durée à enregistrer : {0}',
      pomo_mode_switch_no_flags: 'Aucun marqueur — changer de mode réinitialisera votre progression.',
      pomo_mode_switch_confirm: 'Continuer',
      pomo_mode_switch_dontask: "Ne plus demander aujourd'hui",
      pomo_toast_overtime: 'Temps écoulé{0} ⚡ Appuyez sur Terminer quand vous êtes prêt',
      pomo_toast_break_done: 'Pause terminée ! Retour au travail 💪',
      pomo_toast_countdown_done: 'Compte à rebours terminé ! 🎯',
      pomo_flow_saved: 'Session de flow enregistrée — {0} 🌊',
      pomo_kpi_today: "Terminées aujourd'hui",
      pomo_kpi_total: 'Sessions totales',
      pomo_kpi_flow: 'Temps de flow',
      pomo_kpi_streak: 'Série quotidienne',
      pomo_sessions_n: '{0} sessions',
      pomo_days_n: '{0} jours',
      pomo_focus_sub: 'concentration',
      pomo_all_time: 'tout le temps',
      pomo_today_sub: "aujourd'hui",
      pomo_streak_sub: 'série',
      pomo_vs_yday_more: "plus qu'hier",
      pomo_vs_yday_less: "moins qu'hier",
      pomo_vs_yday_none: 'pas de données hier',
      pomo_switch_running_label: 'Minuterie active',
      pomo_task_switch_current: 'Tâche en cours',
      pomo_switch_no_today: "Ne plus demander aujourd'hui",
      pomo_todo_empty: 'Aucune tâche. Cliquez sur "Ajouter une tâche".',
      pomo_todo_all_done: 'Toutes les tâches complétées !',
      pomo_task_added: 'Tâche ajoutée',
      pomo_task_updated: 'Tâche mise à jour',
      pomo_task_select: 'Sélectionner une tâche',
      pomo_no_tasks_today: "Pas de tâches pour aujourd'hui",
      pomo_todo_hint: 'Ajoutez depuis la liste ci-dessous',
      pomo_lap_split: 'Split',
      pomo_lap_total: 'Total',
      pomo_lap_time: 'Temps',
      pomo_flag_deleted: 'Marqueur supprimé',
      pomo_flag_del_confirm_msg: 'Ce marqueur sera définitivement supprimé. Voulez-vous continuer ?',
      pomo_flag_del_no_today: 'Ne plus afficher aujourd\'hui',
      pomo_subtasks_header: 'Sous-tâches',
      pomo_minute_n: 'Minute {0}',
      pomo_settings_close: 'Fermer',
      pomo_fullscreen: 'Plein écran',
      pomo_minimize: 'Réduire',
      pomo_task_switch: 'Changer de tâche',
      pomo_switch_running_msg: 'Le minuteur est en cours. Changer de tâche réinitialisera le compteur Pomodoro. Voulez-vous continuer ?',
      pomo_switch_elapsed_msg: "Du temps s'est écoulé pour cette tâche. Changer réinitialisera le compteur Pomodoro. Voulez-vous continuer ?",
      pomo_switch_confirm_btn: 'Changer',
      pomo_btn_flow: 'Mode flow',
      pomo_btn_pomodoro: 'Pomodoro',
      pomo_btn_countdown: 'Compte à rebours',
      pomo_btn_short: 'Pause courte',
      pomo_btn_long: 'Pause longue',
      pomo_btn_finish: 'Terminer',
      pomo_finish_confirm_title: 'Terminer la session',
      pomo_finish_confirm_msg: 'Votre session actuelle sera enregistrée. Durée :',
      pomo_finish_select_msg: 'Choisissez comment terminer :',
      pomo_finish_opt1_title: 'Enregistrer le temps actuel',
      pomo_finish_opt1_desc: 'La durée {0} sera enregistrée et la session terminée.',
      pomo_finish_opt2_title: 'Terminer avec les marqueurs',
      pomo_finish_opt2_desc: 'Enregistre {0} jusqu\'au dernier marqueur et termine la session.',
      pomo_finish_opt2_no_flags: 'Aucun marqueur — ajoutez-en un d\'abord.',
      pomo_btn_flag: 'Marquer',
      pomo_task_label: 'Tâche en cours',
      pomo_todo_title: 'Liste de tâches',
      pomo_todo_subtitle: 'Tâches du jour',
      pomo_todo_done_count: 'complétées',
      pomo_todo_add_btn: 'Ajouter une tâche',
      pomo_edit_task: 'Modifier la tâche',
      pomo_todo_completed_section: 'Complétées',
      pomo_settings_pomo_tip: 'La pause longue commence après chaque 4 pomodoros.',
      pomo_settings_countdown_tip: "Les paramètres s'appliquent quand le minuteur est arrêté.",
      pomo_settings_fs_kpi: "Panneau d'info",
      pomo_settings_duration: 'Durée',
      pomo_flow_reset_title: 'Options de réinitialisation',
      pomo_flow_reset_question: 'Que voulez-vous faire ?',
      pomo_flow_opt1_title: 'Enregistrer les marqueurs et réinitialiser',
      pomo_flow_opt1_desc: "Enregistre jusqu'au dernier marqueur, supprime le reste.",
      pomo_flow_opt2_title: 'Reprendre depuis le dernier marqueur',
      pomo_flow_opt2_desc: "Remet le minuteur au dernier marqueur et continue.",
      pomo_flow_opt3_title: 'Réinitialisation complète',
      pomo_flow_opt3_desc_flow: "Rien n'est enregistré — remet le minuteur à 0:00.",
      pomo_flow_opt3_desc: "Rien n'est enregistré — remet le minuteur au début.",
      pomo_flow_opt3_desc_count: "Rien n'est enregistré — remet le compte à rebours à 00:00:00.",
      pomo_new_todo_title: 'Nouvelle tâche',
      pomo_edit_todo_title: 'Modifier la tâche',
      pomo_form_task: 'Tâche',
      pomo_form_duration: 'Durée estimée',
      pomo_form_category: 'Catégorie',
      pomo_form_note: 'Note',
      pomo_form_subtasks: 'Sous-tâches',
      pomo_form_add_subtask: 'Ajouter une sous-tâche',
      pomo_form_optional: '(optionnel)',
      pomo_form_minutes: 'minutes',
      pomo_exit_fullscreen: 'Réduire',
      pomo_short_break_label: 'Pause courte',
      pomo_long_break_label: 'Pause longue',
      pomo_cat_work: 'Travail',
      pomo_cat_learn: 'Apprentissage',
      pomo_cat_exercise: 'Exercice',
      pomo_cat_social: 'Social',
      pomo_cat_sleep: 'Sommeil',
      pomo_cat_other: 'Autre',
      pomo_default_project: 'Flux libre',

      // Focus Widget
      fw_pause_resume: 'Pause / Reprendre',
      fw_add_flag: 'Ajouter un marqueur',
      fw_stop: 'Arrêter',
      fw_open_focus: 'Aller en mode concentration',
      fw_paused: 'En pause',

      // Pomodoro todo form
      pomo_task_text_label: 'Tâche',
      pomo_est_duration: 'Durée estimée',
      pomo_pomodoro_count: 'Nombre de Pomodoros',
      lbl_optional: '(optionnel)',
      pomo_minutes_label: 'minutes',
      pomo_note_label: 'Note',
      pomo_subtasks_label: 'Sous-tâches',
      pomo_add_subtask_btn: 'Ajouter une sous-tâche',
      pomo_subtask_placeholder: 'Sous-tâche...',
      pomo_task_placeholder: 'Tâche à faire...',
      pomo_note_placeholder: 'Note additionnelle...',
      time_project_placeholder: 'Nom du projet (optionnel)',

      // Common buttons & labels
      btn_cancel: 'Annuler',
      btn_back: '← Retour',
      btn_add: 'Ajouter',
      btn_save: 'Enregistrer',
      btn_edit: 'Modifier',
      btn_delete: 'Supprimer',
      dm_noask_today: "Ne plus demander aujourd'hui",
      btn_details: 'Détails →',
      btn_all: 'Tout →',
      lbl_title: 'Titre',
      lbl_desc: 'Description',
      lbl_category: 'Catégorie',
      lbl_date: 'Date',
      lbl_priority: 'Priorité',
      lbl_notes: 'Notes',
      lbl_name: 'Nom',
      lbl_color: 'Couleur',
      lbl_emoji: 'Emoji',
      lbl_type: 'Type',
      lbl_amount: 'Montant',
      lbl_all: 'Tout',
      lbl_manual: 'Manuel',
      lbl_project: 'Projet',
      lbl_optional: '(optionnel)',
      lbl_status: 'Statut',

      // Plans modals/UI
      plans_add_modal: 'Nouveau plan',
      plans_add_btn: 'Ajouter un plan',
      plans_kanban_view: 'Kanban',
      plans_list_view: 'Liste',
      plans_end_date: 'Date limite',
      plans_cat_project: 'Projet',
      plans_cat_education: 'Éducation',
      plans_cat_finance: 'Finance',
      plans_cat_investment: 'Investissement',
      plans_cat_personal: 'Personnel',
      plans_cat_health: 'Santé',
      plans_cat_other: 'Autre',
      plans_title_placeholder: 'Titre de la tâche...',
      plans_notes_placeholder: 'Notes additionnelles...',
      plans_pri_high: 'Haute',
      plans_pri_medium: 'Moyenne',
      plans_pri_low: 'Basse',

      // Time modals/UI
      time_add_modal: 'Ajouter un enregistrement',
      time_history_modal: 'Vue historique',
      time_add_btn: 'Ajouter',
      time_project_label: 'Projet / Activité',
      time_task_today: "Tâches d'aujourd'hui",
      time_task_other: 'Autres tâches',
      time_task_create: 'Créer une tâche',
      time_task_required: 'Le titre de la tâche est requis',
      time_start_label: 'Début',
      time_end_label: 'Fin',
      time_panel_30day: '30 derniers jours',
      time_panel_daily: 'Répartition quotidienne (7 derniers jours)',
      time_panel_logs: 'Journaux de temps',
      time_panel_weekly: 'Résumé hebdomadaire',
      time_filter_all: 'Tout',
      time_filter_manual: 'Manuel',
      time_filter_auto: '⏱ Auto',
      time_filter_date_placeholder: 'Date',
      cdp_range_hint: 'Sélectionnez la date de fin',
      time_col_date: 'Date',
      time_col_category: 'Catégorie',
      time_col_project: 'Projet',
      time_col_range: 'Plage horaire',
      time_col_duration: 'Durée',
      time_hist_subtitle: 'Répartition mensuelle et hebdomadaire',
      time_prev_month: 'Mois précédent',
      time_hist_total: 'Total',
      time_hist_tab_summary: 'Résumé',
      time_hist_tab_logs: 'Journaux',
      time_hist_active_days: 'Jours Actifs',
      time_hist_daily_avg: 'Moy. Journ.',
      time_hist_top_cat: 'Catégorie Top',
      time_next_month: 'Mois suivant',
      time_invalid_range: 'Entrez une plage horaire valide',
      time_log_added: 'Enregistrement ajouté',
      time_log_deleted: 'Enregistrement supprimé',
      time_del_confirm_msg: 'Cet enregistrement de temps sera définitivement supprimé. Voulez-vous continuer ?',
      time_del_no_today: 'Ne plus afficher aujourd\'hui',
      time_edit_modal: 'Modifier l\'enregistrement',
      time_log_updated: 'Enregistrement mis à jour',

      // Habits modals/UI
      habits_add_modal: 'Nouvelle habitude',
      habits_manage_modal: 'Gérer les habitudes',
      habits_edit_modal: "Modifier l'habitude",
      habits_add_btn: 'Ajouter une habitude',
      habits_name_label: "Nom de l'habitude",
      habits_icon_label: 'Icône (emoji)',
      habits_type_label: 'Type',
      habits_days_label: 'Quels jours ?',
      habits_type_permanent: 'Permanent',
      habits_type_permanent_desc: 'Apparaît chaque jour automatiquement',
      habits_type_timed: 'Programmé',
      habits_type_timed_desc: 'Apparaît les jours sélectionnés',
      habits_today_done: "Complétées aujourd'hui",
      habits_week_success: 'Succès hebdomadaire',
      habits_last7: '7 derniers jours',
      habits_streak_unit: 'série',
      habits_add_link: 'Ajouter →',
      habits_no_subs: 'Aucune sous-catégorie.',
      habits_add_sub_btn: '+ Ajouter',
      habits_min_one_day: 'Sélectionnez au moins un jour',
      habits_name_placeholder: 'Ex : Courir le matin, Lire...',
      habits_weekly_progress: 'Progrès hebdomadaire',
      habits_weekly_sub: 'Taux de complétion quotidiens',
      habits_updated: 'Habitude mise à jour',

      // Goals modals/UI
      goals_add_modal: 'Nouvel objectif',
      goals_add_btn: 'Ajouter un objectif',
      goals_target_date: 'Date cible',
      goals_new_modal: 'Nouveau rêve',
      goals_edit_modal: 'Modifier le rêve',
      goals_delete_modal: 'Supprimer le rêve',
      goals_reorder: 'Réordonner',
      goals_reorder_close: "Fermer l'édition",
      goals_category: 'Catégorie',
      goals_emoji: 'Emoji',
      goals_color: 'Couleur',
      goals_milestones: 'Jalons',
      goals_ms_placeholder: 'Ajouter un jalon...',
      goals_title_placeholder: 'Écrivez votre rêve...',
      goals_desc_placeholder: 'Description détaillée...',
      goals_delete_confirm_q: 'Êtes-vous sûr ?',
      goals_delete_yes: 'Oui, supprimer',
      goals_edit_btn: 'Modifier',
      goals_del_btn: 'Supprimer',

      // Budget modals/UI
      bud_add_trans_modal: 'Nouvelle transaction',
      bud_add_group_modal: 'Nouveau groupe de catégories',
      bud_add_sub_modal: 'Ajouter une sous-catégorie',
      bud_group_name_label: 'Nom du groupe',
      bud_sub_name_label: 'Nom de la sous-catégorie',
      bud_monthly_budget: 'Budget mensuel',
      bud_sub_cat_label: 'Sous-catégorie',
      bud_amount_label: 'Montant',
      bud_desc_label: 'Description',
      bud_summary_tab: 'Résumé',
      bud_groups_tab: 'Catégories principales',
      bud_trans_tab: 'Journal des transactions',
      bud_search: 'Rechercher...',
      bud_no_tx: "Aucune transaction pour l'instant",
      bud_others: 'Autres',
      bud_history_btn: 'Historique',
      bud_history_title: 'Historique budgétaire',
      bud_history_empty: 'Aucun cycle terminé pour le moment',
      bud_history_no_data: 'Aucune donnée de transaction enregistrée pour ce cycle',
      bud_history_cycle: 'Cycle',
      bud_history_add_tx: 'Ajouter une transaction',
      bud_history_no_tx: 'Aucune transaction dans ce cycle',
      bud_cycle_settings_title: 'Cycle budgétaire',
      bud_cycle_start: 'Début',
      bud_cycle_end: 'Fin',
      bud_cycle_desc: 'Quand la date de fin est passée, les transactions sont archivées ; le solde net est sauvegardé pour les graphiques.',
      bud_cycle_saved: 'Paramètres du cycle enregistrés',
      bud_add_tx_btn: 'Ajouter une transaction',
      bud_import_budget_btn: 'Importer les données',
      import_data_btn: 'Importer les données',
      import_data_confirm: "Les données actuelles du module seront supprimées et remplacées. Continuer ?",
      import_data_ok: 'Données importées avec succès',
      import_data_err: 'Aucune donnée de module valide trouvée',
      bud_import_budget_confirm: 'Les données budgétaires actuelles seront supprimées et remplacées par celles du fichier. Continuer ?',
      bud_import_budget_ok: 'Données budgétaires importées avec succès',
      bud_import_budget_err: 'Fichier invalide — aucune donnée budgétaire trouvée',
      bud_add_group_btn: 'Ajouter une catégorie',
      bud_edit_open: 'Modifier les panneaux',
      bud_edit_close: 'Fermer la modification',
      bud_edit_tx_modal: 'Modifier la transaction',
      bud_edit_desc_label: 'Description',
      bud_trans_panel: 'Journal des transactions',
      bud_col_date: 'DATE',
      bud_col_amount: 'MONTANT',
      bud_col_subcat: 'SOUS-CATÉGORIE',
      bud_col_maincat: 'CATÉGORIE PRINCIPALE',
      bud_col_desc: 'DESCRIPTION',
      bud_shrink_height: 'Réduire la hauteur',
      bud_grow_height: 'Augmenter la hauteur',
      bud_collapse: 'Réduire',
      bud_expand: 'Développer',
      bud_add_sub_for: '{0} — Ajouter une sous-catégorie',
      bud_net_balance: 'SOLDE NET',
      bud_this_period: 'cette période',
      bud_positive: 'positif',
      bud_negative: 'négatif',
      bud_cat_name_prompt: 'Nom de la catégorie :',
      bud_no_groups: "Aucun groupe de catégories pour l'instant.",
      bud_add_first_group: 'Ajouter la première catégorie',
      bud_no_subs: 'Aucune sous-catégorie.',
      bud_sub_count: '{0} sous-catégories',
      bud_add_sub_btn: 'Ajouter une sous-catégorie',
      bud_select_main: '— Sélectionner une catégorie principale —',
      bud_select_sub: '— Sélectionner une sous-catégorie —',
      bud_no_subs_hint: 'Ajoutez d\'abord un groupe de catégorie et une sous-catégorie depuis l\'onglet Catégories.',
      bud_all_cats: 'Toutes les catégories',
      bud_filter_by_date: 'Filtrer par date',
      bud_filter_date: 'Date',
      bud_filter_from: 'Début',
      bud_filter_to: 'Fin',
      bud_filter_date_range: 'Plage de dates',
      bud_hist_search: 'Rechercher...',
      bud_hist_all_cats: 'Toutes les catégories',
      bud_clear_date: 'Effacer',
      bud_tx_updated: 'Transaction mise à jour',
      bud_group_added: 'Groupe de catégories ajouté',
      bud_sub_added: 'Sous-catégorie ajoutée',
      bud_cat_updated: 'Catégorie mise à jour',
      bud_budget_updated: 'Budget mis à jour',
      bud_confirm_delete_sub: 'Êtes-vous sûr de vouloir supprimer cette sous-catégorie et toutes ses transactions ?',
      bud_sub_deleted: 'Sous-catégorie supprimée',
      bud_tx_desc_placeholder: 'Entrez une description...',
      bud_group_name_placeholder: 'Ex : Dépenses, Épargne, Abonnements...',
      bud_sub_name_placeholder: 'Ex : Courses alimentaires...',
      bud_edit_budget_title: 'Modifier le budget',
      bud_edit_sub_modal: 'Modifier la sous-catégorie',
      bud_sub_name_required: 'Le nom de la sous-catégorie ne peut pas être vide',
      bud_confirm_title: 'Confirmer',
      bud_edit_name_title: 'Modifier le nom',
      bud_edit_group_modal: 'Modifier la catégorie',
      bud_add_sub_title: 'Ajouter une sous-catégorie',
      bud_delete_group_title: 'Supprimer le groupe',
      bud_no_groups_hint: 'Aucune catégorie pour l\'instant. Commencez par l\'onglet "Catégories principales".',
      bud_edit_budget_prompt: 'Nouveau montant de budget pour "{0}" ({1}) :',

      // Investments modals/UI
      inv_add_modal: 'Ajouter un actif',
      inv_edit_modal: "Modifier l'actif",
      inv_add_btn: 'Ajouter un actif',
      inv_asset_type_label: "Type d'actif",
      inv_type_stock: '📈 Action',
      inv_type_etf: '🗂️ ETF / Fonds',
      inv_type_crypto: '₿ Crypto',
      inv_type_commodity: '🥇 Matière première (Or, Argent…)',
      inv_type_bond: '📄 Obligation',
      inv_type_cash: '💵 Liquidités / Devise',
      inv_type_stock_lbl: 'Bourse US', inv_type_stock_other_lbl: 'Autre Bourse', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Crypto',
      inv_type_commodity_lbl: 'Matière première', inv_type_bond_lbl: 'Obligation', inv_type_cash_lbl: 'Liquidités',
      inv_exchange_label: 'Bourse / Marché',
      inv_exchange_us: '🇺🇸 Marché US (NYSE / NASDAQ)',
      inv_exchange_other: '🌐 Autres bourses',
      inv_auto_price_info: 'Les prix des actions, ETF et crypto sont mis à jour automatiquement via Alpha Vantage.',
      inv_price_currency_label: 'Devise du prix',
      inv_symbol_label: 'Symbole / Ticker',
      inv_display_name_label: 'Nom affiché',
      inv_quantity_label: 'Quantité',
      inv_buy_price_label: "Prix d'achat",
      inv_buy_date_label: "Date d'achat",
      inv_dist_panel: 'Répartition des actifs',
      inv_perf_panel: 'Analyse de performance',
      inv_portfolio_panel: 'Détail du portefeuille',
      inv_kpi_portfolio_label: 'VALEUR DU PORTEFEUILLE',
      inv_kpi_total_return: 'rendement total',
      inv_kpi_vs_invested: 'vs investi',
      inv_kpi_cost_basis: 'base de coût',
      inv_kpi_asset_count_label: "NOMBRE D'ACTIFS",
      inv_kpi_instruments: 'instruments',
      inv_pnl_total: 'G/P Total',
      inv_pnl_daily: 'G/P Journalier',
      inv_pnl_weekly: 'G/P Hebdomadaire',
      inv_pnl_monthly: 'G/P Mensuel',
      inv_period_daily: 'Quotidien',
      inv_period_weekly: 'Hebdomadaire',
      inv_period_monthly: 'Mensuel',
      inv_period_3month: '3 mois',
      inv_period_alltime: 'Tout le temps',
      time_daily_total_sub: 'Temps total quotidien',
      inv_no_assets_legend: 'Aucun actif dans le portefeuille',
      inv_no_assets_table: "Aucun actif pour l'instant — cliquez sur \"Ajouter un actif\" pour commencer",
      inv_by_symbol: 'Par symbole',
      inv_by_type: 'Par type',
      inv_top_gainers: 'Gagnants',
      inv_top_losers: 'Perdants',
      inv_updating: 'Mise à jour des prix…',
      inv_refresh_in: 'Disponible dans {0} min',
      inv_refresh_title: 'Mettre à jour les prix (API)',
      inv_rate_input_title: 'Taux manuel — mis à jour automatiquement',
      inv_api_keys_title: 'Clés API',
      inv_wait_min: 'Attendez encore {0} minutes pour actualiser',
      inv_api_limit: 'Limite quotidienne Alpha Vantage atteinte (25 req/jour). Les prix seront mis à jour demain.',
      inv_asset_merged: '{0} mis à jour — coût moyen : {1}, total : {2}',
      inv_asset_added: 'Actif ajouté',
      inv_asset_updated: 'Actif mis à jour',
      inv_manual_price_label: '{0} — Prix actuel ({1})',
      inv_manual_price_note: '{0} libellé en {1}',
      inv_invalid_price: 'Entrez un prix valide',
      inv_price_saved: 'Prix enregistré',
      inv_optional_suffix: '— optionnel',
      inv_fx_error: 'Impossible de récupérer les données de taux',
      inv_fx_updated: 'Tous les taux mis à jour',
      inv_enter_symbol: 'Entrez le symbole',
      inv_invalid_qty: 'Entrez une quantité valide',
      inv_invalid_buy: "Entrez un prix d'achat valide",
      inv_buy_price_sym: "Prix d'achat {0}",
      inv_manual_price_info: "Le prix que vous entrez est uniquement utilisé pour le calcul de la valeur du portefeuille ; votre prix d'achat ne change pas.",
      inv_no_history_note: 'Aucune donnée historique, affichage du total',
      inv_edit_price_title: 'Modifier le prix actuel',
      inv_col_asset: 'Actif / Symbole',
      inv_col_type: 'Type',
      inv_col_qty: 'Qté',
      inv_col_cost: 'Coût moy.',
      inv_col_price: 'Prix actuel',
      inv_col_value: 'Valeur totale',
      inv_col_pnl: 'G/P Total',
      inv_col_pct: 'Répartition %',
      inv_pnl_toggle_title: 'Changer la vue G/P',
      inv_tab_deposits: 'Dépôts',
      inv_dep_add: 'Ajouter un Dépôt',
      inv_dep_edit: 'Modifier le Dépôt',
      inv_dep_type_term: 'Dépôt à Terme',
      inv_dep_type_free: 'Flexible / Intérêt Quotidien',
      inv_dep_bank: 'Nom de la Banque',
      inv_dep_bank_ph: 'BNP Paribas, Crédit Agricole…',
      inv_dep_principal: 'Principal',
      inv_dep_rate: "Taux d'Intérêt Annuel (%)",
      inv_dep_term: 'Durée',
      inv_dep_term_1m: '1 Mois (30 jours)',
      inv_dep_term_3m: '3 Mois (90 jours)',
      inv_dep_term_6m: '6 Mois (180 jours)',
      inv_dep_term_1y: '1 An (365 jours)',
      inv_dep_term_custom: 'Personnalisé',
      inv_dep_term_custom_days: 'Nombre de Jours',
      inv_dep_term_custom_ph: 'Ex : 45',
      inv_dep_free_info: 'Intérêts composés quotidiens — votre argent croît chaque jour sans attendre l\'échéance.',
      inv_dep_start: 'Date de Début',
      inv_dep_notes: 'Notes',
      inv_dep_current_val: 'Valeur Actuelle',
      inv_dep_daily_gain: 'Gain Quotidien',
      inv_dep_accrued: 'Intérêts Courus',
      inv_dep_maturity: "Date d'Échéance",
      inv_dep_days_left: 'Restant',
      inv_dep_days_left_val: '{0} jours',
      inv_dep_expired: 'Échu',
      inv_dep_no_deposits: 'Aucun compte de dépôt pour le moment',
      inv_dep_confirm_delete: 'Êtes-vous sûr de vouloir supprimer ce dépôt ?',
      inv_dep_skip_confirm: 'Ne plus demander aujourd\'hui',
      inv_sub_stocks:       'Actions / ETF',
      inv_dep_view_cards:   'Cartes',
      inv_dep_view_table:   'Tableau',
      inv_dep_maturity_interest: "Intérêt à l'Échéance",
      inv_dep_total_return: "À l'Échéance",
      inv_dep_status_active: 'Actif',
      inv_dep_search_ph:    'Rechercher une banque...',
      inv_tab_hist:         "Historique des Transactions",
      inv_dep_status:       'Statut',
      inv_dep_deleted: 'Dépôt supprimé',
      inv_dep_saved: 'Dépôt enregistré',
      inv_dep_free_note: 'Compte flexible : intérêts composés quotidiens, sans durée fixe.',
      inv_dep_term_note: "Dépôt à terme : intérêts simples versés à l'échéance.",

      // Dashboard panels
      dash_this_week: 'Cette semaine',
      dash_this_month: 'Ce mois',
      dash_this_year: 'Cette année',
      dash_week_time: 'Répartition du temps cette semaine',
      dash_month_time: 'Répartition du temps ce mois',
      dash_year_time: 'Répartition du temps cette année',
      dash_week_spent: 'DÉPENSES DE LA SEMAINE',
      dash_month_spent: 'DÉPENSES DU MOIS',
      dash_year_spent: 'DÉPENSES DE L\'ANNÉE',
      dash_upcoming: 'Plans à venir',
      dash_inv_dist: 'Répartition des investissements',
      dash_budget_status: 'État du budget',
      dash_dreams_panel: 'Rêves',

      // Gym
      nav_gym: 'Sport',
      gym_add_btn: 'Ajouter une séance',
      gym_add_modal: 'Nouvelle séance',
      gym_edit_modal: 'Modifier la séance',
      gym_type_label: "Type d'entraînement",
      gym_type_strength: 'Musculation',
      gym_type_cardio: 'Cardio',
      gym_type_flexibility: 'Souplesse / Yoga',
      gym_type_crossfit: 'Crossfit / HIIT',
      gym_type_sport: 'Sport / Jeu',
      gym_type_other: 'Autre',
      gym_duration_label: 'Durée (minutes)',
      gym_notes_label: 'Notes',
      gym_notes_placeholder: 'Notes sur la séance...',
      gym_exercises_label: 'Exercices',
      gym_add_exercise_btn: 'Ajouter un exercice',
      gym_exercise_name_ph: "Nom de l'exercice (ex. Développé couché)",
      gym_sets_label: 'Séries',
      gym_reps_label: 'Reps',
      gym_weight_label: 'Poids (kg)',
      gym_ex_duration_label: 'Durée (min)',
      gym_ex_distance_label: 'Distance (km)',
      gym_no_workouts: 'Aucune séance enregistrée.',
      gym_workout_added: 'Séance ajoutée',
      gym_workout_updated: 'Séance mise à jour',
      gym_workout_deleted: 'Séance supprimée',
      gym_confirm_delete: 'Êtes-vous sûr de vouloir supprimer cette séance ?',
      gym_kpi_week: 'CETTE SEMAINE',
      gym_kpi_month: 'CE MOIS',
      gym_kpi_total_hours: 'TEMPS TOTAL',
      gym_kpi_streak: 'SÉRIE ACTIVE',
      gym_kpi_sessions: 'séances',
      gym_kpi_hours_sub: 'heures',
      gym_kpi_streak_sub: 'jours',
      gym_off_days: 'Jours de repos',
      gym_off_day_title: 'Jour de repos — ne brise pas la série',
      gym_panel_chart: 'Fréquence hebdomadaire',
      gym_panel_prs: 'Records personnels',
      gym_panel_history: 'Historique des séances',
      gym_pr_exercise: 'Exercice',
      gym_pr_weight: 'Meilleur (kg)',
      gym_pr_date: 'Date',
      gym_no_prs: 'Aucun record personnel.',
      gym_this_week: 'Cette semaine',
      gym_sessions_suffix: 'séances',
      gym_minutes_label: 'min',
      gym_no_exercises: 'Aucun exercice ajouté',
      gym_type_badge_strength: 'Musculation',
      gym_type_badge_cardio: 'Cardio',
      gym_type_badge_flexibility: 'Souplesse',
      gym_type_badge_crossfit: 'Crossfit',
      gym_type_badge_sport: 'Sport',
      gym_type_badge_other: 'Autre',
      gym_panel_progress: 'Progression des Exercices',
      gym_panel_muscles: 'Répartition Musculaire',
      gym_panel_volume: 'Volume Hebdomadaire',
      gym_panel_body: 'Mesures Corporelles',
      gym_panel_templates: 'Modèles d\'Entraînement',
      gym_pr_1rm: '1RM Estimé',
      gym_rpe_label: 'Intensité (RPE 1–10)',
      gym_distance_label: 'Distance (km)',
      gym_muscle_label: 'Groupe Musculaire',
      gym_muscle_none: '—',
      gym_muscle_chest: 'Poitrine',
      gym_muscle_back: 'Dos',
      gym_muscle_legs: 'Jambes',
      gym_muscle_shoulders: 'Épaules',
      gym_muscle_arms: 'Bras',
      gym_muscle_core: 'Core',
      gym_muscle_cardio: 'Cardio',
      gym_progress_select: 'Sélectionner un exercice...',
      gym_progress_no_data: 'Aucune donnée pour cet exercice.',
      gym_volume_unit: 'ton de volume',
      gym_kpi_volume: 'VOLUME HEBDO',
      gym_kpi_volume_sub: 'tonnes (séries×reps×kg)',
      gym_kpi_goal: 'OBJECTIF HEBDO',
      gym_kpi_goal_sub: 'séances / objectif',
      gym_weekly_goal_label: 'Objectif hebdomadaire (jours)',
      gym_body_modal_title: 'Ajouter une Mesure',
      gym_body_weight_label: 'Poids Corporel (kg)',
      gym_body_fat_label: 'Masse Grasse (%)',
      gym_body_waist_label: 'Tour de Taille (cm)',
      gym_body_chest_label: 'Tour de Poitrine (cm)',
      gym_body_arm_label: 'Tour de Bras (cm)',
      gym_body_leg_label: 'Tour de Cuisse (cm)',
      gym_body_add_btn: 'Ajouter une Mesure',
      gym_body_added: 'Mesure ajoutée',
      gym_body_deleted: 'Mesure supprimée',
      gym_body_no_data: 'Aucune mesure corporelle pour l\'instant.',
      gym_body_weight_chart: 'Poids Corporel (kg)',
      gym_body_table_date: 'Date',
      gym_body_table_weight: 'Poids',
      gym_body_table_fat: 'Masse Grasse %',
      gym_body_table_waist: 'Tour de Taille',
      gym_no_muscle_data: 'Ajoutez des exercices avec groupe musculaire.',
      gym_template_modal_title: 'Enregistrer le Modèle',
      gym_template_name_ph: 'Nom du modèle (ex: Jour Push)',
      gym_template_save_btn: 'Enregistrer comme Modèle',
      gym_template_load_btn: 'Charger un Modèle',
      gym_template_added: 'Modèle enregistré',
      gym_template_deleted: 'Modèle supprimé',
      gym_no_templates: 'Aucun modèle enregistré pour l\'instant.',
      gym_template_confirm_delete: 'Êtes-vous sûr de vouloir supprimer ce modèle ?',
      gym_load_template_title: 'Sélectionner un Modèle',
      gym_volume_label: 'Volume',
      gym_unit_kg: 'kg',
      gym_unit_lb: 'lb',
      gym_body_edit_modal_title: 'Modifier la Mesure',
      gym_body_updated: 'Mesure mise à jour',
      gym_template_rename_title: 'Renommer le Modèle',
      gym_template_updated: 'Modèle mis à jour',
      gym_template_edit_title: 'Modifier le Modèle',
      gym_template_duplicate: 'Dupliquer',
      gym_template_duplicated: 'Modèle dupliqué',
      gym_template_type_label: 'Type de Modèle',
    },
  },

  // ── Translation helpers ──────────────────────────────────
  getLang() {
    return Store.getSettings().language || 'en';
  },

  t(key, ...args) {
    const lang = this.getLang();
    let text = (this._i18n[lang] && this._i18n[lang][key]) ||
      (this._i18n.tr && this._i18n.tr[key]) ||
      key;
    args.forEach((arg, i) => { text = text.replace(`{${i}}`, arg); });
    return text;
  },

  applyTranslations() {
    // Nav links
    const navMap = {
      'index.html': 'nav_dashboard',
      'focusmode.html': 'nav_pomodoro',
      'timelog.html': 'nav_time',
      'habits.html': 'nav_habits',
      'gym.html': 'nav_gym',
      'plans.html': 'nav_plans',
      'goals.html': 'nav_goals',
      'budget.html': 'nav_budget',
      'investments.html': 'nav_investments',
    };
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      const key = href && href !== '#' ? href : null;
      if (key && navMap[key]) {
        const label = link.querySelector('.nav-label');
        const txt = this.t(navMap[key]);
        if (label) label.textContent = txt;
        link.dataset.tooltip = txt;
      }
    });

    // Settings & Help links in footer
    const settingsLink = document.querySelector('.sidebar-footer .settings-privacy-row .nav-link');
    if (settingsLink) {
      const label = settingsLink.querySelector('.nav-label');
      const txt = this.t('sidebar_settings');
      if (label) label.textContent = txt;
      settingsLink.dataset.tooltip = txt;
    }
    const helpLink = document.querySelector('.sidebar-footer > .nav-link');
    if (helpLink) {
      helpLink.dataset.tooltip = this.t('sidebar_help');
    }

    // Topbar title + browser tab title
    const page = (location.pathname.endsWith('/') ? 'index.html' : location.pathname.split('/').pop()) || 'index.html';
    const titleEl = document.querySelector('.topbar-title');
    if (titleEl && navMap[page]) {
      titleEl.textContent = this.t(navMap[page]);
    }
    if (navMap[page]) document.title = `${this.t(navMap[page])} — LifeTracker`;

    // Topbar date
    const dateEl = document.getElementById('topbar-date');
    if (dateEl) dateEl.textContent = this.longDate();

    // html lang attribute
    document.documentElement.lang = this.getLang();

    // data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.getAttribute('data-i18n-placeholder'));
    });
    // [data-tooltip-i18n] elementleri TooltipCore tarafından hover anında çevrilir — burada işlem gerekmez
  },

  // ── Help modal ───────────────────────────────────────────
  _openHelp() {
    const lang = this.getLang();
    const allPages = this._helpPages()[lang] || this._helpPages()['en'];
    const titles = { tr: 'Kullanım Kılavuzu', en: 'User Guide', zh: '使用指南', es: 'Guía de uso', fr: "Guide d'utilisation" };
    const tipLabels = { tr: 'İpucu', en: 'Tip', zh: '提示', es: 'Consejo', fr: 'Astuce' };
    const featLabels = { tr: 'Özellikler', en: 'Features', zh: '功能', es: 'Funciones', fr: 'Fonctionnalités' };
    const closeLabel = { tr: 'Kapat', en: 'Close', zh: '关闭', es: 'Cerrar', fr: 'Fermer' };

    if (document.getElementById('lt-help-overlay')) return;

    // Page index 0=Settings,1=Dashboard,2=focusmode,3=timelog,4=habits,5=gym,6=plans,7=goals,8=budget,9=investments
    const _PAGE_MODULE_KEYS = [null, null, 'focusmode', 'timelog', 'habits', 'gym', 'plans', 'goals', 'budget', 'investments'];
    const _hidden = Store.get('hidden_modules') || {};
    const pages = allPages.filter((_, i) => !_PAGE_MODULE_KEYS[i] || !_hidden[_PAGE_MODULE_KEYS[i]]);

    let activePage = 0;

    const overlay = document.createElement('div');
    overlay.id = 'lt-help-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9900;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);animation:lt-fade-in 140ms ease';

    const render = () => {
      const p = pages[activePage];
      const navItems = pages.map((pg, i) => `
        <button onclick="document.getElementById('lt-help-overlay')._setPage(${i})"
          style="display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;border:none;border-radius:var(--radius-sm);cursor:pointer;text-align:left;font-size:0.8125rem;font-weight:${i === activePage ? '600' : '400'};color:${i === activePage ? 'var(--accent)' : 'var(--text-secondary)'};background:${i === activePage ? 'rgba(124,108,252,.12)' : 'transparent'};transition:background 120ms">
          <svg data-lucide="${pg.icon}" style="width:15px;height:15px;flex-shrink:0;color:${i === activePage ? 'var(--accent)' : 'var(--text-muted)'}"></svg>
          <span>${pg.title}</span>
        </button>`).join('');

      const feats = p.features.map(f => `
        <li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;font-size:0.8125rem;color:var(--text-secondary);line-height:1.5">
          <span style="margin-top:3px;width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;display:inline-block"></span>
          <span>${f}</span>
        </li>`).join('');

      overlay.innerHTML = `
        <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-lg);width:min(860px,96vw);height:min(82vh,640px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.45);animation:lt-slide-up 180ms cubic-bezier(.22,1,.36,1)">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px 14px;border-bottom:1px solid var(--border);flex-shrink:0">
            <div style="display:flex;align-items:center;gap:10px">
              <svg data-lucide="book-open" style="width:18px;height:18px;color:var(--accent)"></svg>
              <span style="font-size:1rem;font-weight:700;color:var(--text-primary)">${titles[lang]}</span>
            </div>
            <button id="lt-help-close" style="width:30px;height:30px;border:none;background:transparent;cursor:pointer;color:var(--text-muted);display:flex;align-items:center;justify-content:center;border-radius:var(--radius-sm)">
              <svg data-lucide="x" style="width:16px;height:16px"></svg>
            </button>
          </div>
          <div style="display:flex;flex:1;overflow:hidden">
            <div style="width:190px;flex-shrink:0;border-right:1px solid var(--border);padding:10px 8px;overflow-y:auto;display:flex;flex-direction:column;gap:2px">
              ${navItems}
            </div>
            <div style="flex:1;overflow-y:auto;padding:22px 26px">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                <div style="width:32px;height:32px;border-radius:var(--radius-sm);background:rgba(124,108,252,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                  <svg data-lucide="${p.icon}" style="width:16px;height:16px;color:var(--accent)"></svg>
                </div>
                <h2 style="font-size:1.0625rem;font-weight:700;color:var(--text-primary);margin:0">${p.title}</h2>
              </div>
              <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.6;margin:0 0 18px">${p.desc}</p>
              <p style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin:0 0 10px">${featLabels[lang]}</p>
              <ul style="margin:0 0 20px;padding:0;list-style:none">${feats}</ul>
              ${p.tip ? `<div style="background:rgba(124,108,252,.08);border:1px solid rgba(124,108,252,.25);border-radius:var(--radius-sm);padding:12px 14px;display:flex;align-items:flex-start;gap:10px"><svg data-lucide="lightbulb" style="width:14px;height:14px;color:var(--accent);flex-shrink:0;margin-top:1px"></svg><div><span style="font-size:0.75rem;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.05em">${tipLabels[lang]}: </span><span style="font-size:0.8125rem;color:var(--text-secondary)">${p.tip}</span></div></div>` : ''}
            </div>
          </div>
          <div style="padding:12px 22px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;flex-shrink:0">
            <button id="lt-help-close2" style="padding:0 18px;height:32px;border:1px solid var(--border);background:var(--bg-elevated);border-radius:var(--radius-sm);cursor:pointer;font-size:0.8125rem;color:var(--text-primary)">${closeLabel[lang]}</button>
          </div>
        </div>`;

      lucide.createIcons({ nodes: [overlay] });
      const close = () => { overlay.remove(); };
      overlay.querySelector('#lt-help-close').addEventListener('click', close);
      overlay.querySelector('#lt-help-close2').addEventListener('click', close);
      overlay.addEventListener('click', e => { if (e.target === overlay) { e.stopPropagation(); close(); } });
    };

    overlay._setPage = (i) => { activePage = i; render(); };
    document.body.appendChild(overlay);
    render();
  },

  _helpPages() {
    return {
      tr: [
        {
          icon: 'settings', title: 'Ayarlar', desc: 'Uygulamanın tüm görünüm ve davranış ayarları burada toplanmıştır. Sol menünün en altındaki dişli çark simgesine tıklayarak her sayfadan ulaşabilirsiniz. Yaptığınız değişiklikler hemen geçerli olur.',
          features: ['Dil: Uygulamanın dilini Türkçe, İngilizce, Çince, İspanyolca veya Fransızca olarak seçin. Tüm menüler ve yazılar seçtiğiniz dilde görünür.', 'Para birimi: Uygulamada tutarlar hangi sembolle gösterilsin? Türk lirası (₺), dolar ($), euro (€) ve daha fazlası arasından seçim yapın.', 'Renk düzeni (Tema): Uygulamanın renklerini değiştirin. 12 farklı renk seçeneği var — koyu, açık ve renkli tasarımlar arasından dilediğinizi seçin.', 'Yazı ve öğe boyutu: Ekranınız küçükse ya da büyük yazı tercih ediyorsanız, kaydırıcıyla her şeyi büyütebilir veya küçültebilirsiniz.', 'Gizlilik modu: Açıkken tüm para miktarları •••• olarak gizlenir. Yanınızda biri varken bilgilerinizi korumak için kullanışlıdır.', 'Hafta başlangıcı: Haftanın Pazartesi mi Pazar mı başladığını seçin. Bu tercih alışkanlık ve zaman takibi grafiklerini etkiler.', 'Canlı fiyat güncelleme: Hisse senedi, kripto para ve döviz kurlarının otomatik güncellenmesi için bağlantı anahtarlarını buradan girebilirsiniz. (Yatırım modülü kullanıcıları içindir.)', 'Yedekleme (Dışa Aktar): Tüm verilerinizi bilgisayarınıza dosya olarak kaydeder. Verilerinizi korumak için düzenli yedek almanızı öneririz.', 'Yedekten Yükleme (İçe Aktar): Daha önce aldığınız yedeği geri yükler. Dikkat: mevcut verilerinizin üzerine yazar ve bu işlem geri alınamaz.', 'Veri sil — iki farklı seçenek sunar: "Örnek verilere sıfırla" kişisel verilerinizi siler ve uygulama hazır örnek içerikle yeniden başlar; "Her şeyi sil" ise tüm verileri kalıcı olarak siler, geri dönüş yoktur.', 'Modülleri gizle (Paneller sekmesi): Kullanmadığınız sayfaları sol menüden kaldırabilirsiniz. Verileriniz silinmez, yalnızca o sayfa menüde görünmez olur.'],
          tip: 'Verilerinizi düzenli olarak yedeklemek için "Dışa Aktar" butonunu kullanın. İçe Aktar işlemi mevcut verilerinizin üzerine yazar — önce mutlaka yedek alın. Uygulamayı temizden başlatmak istiyorsanız "Örnek verilere sıfırla" seçeneği hazır içerikli bir başlangıç sunar.'
        },
        {
          icon: 'layout-dashboard', title: 'Dashboard', desc: 'Uygulamanın tüm bölümlerinin özetini tek ekranda gösteren ana sayfanızdır. Harcamalarınız, alışkanlıklarınız, hedefleriniz, antrenmalarınız ve daha fazlası burada bir arada görünür. Hangi bilgilerin öne çıkacağını ve sıralamayı siz belirlersiniz.',
          features: [
            'Dört özet kutucuk (sayfanın en üstünde): Net varlığınız, seçilen dönemdeki toplam harcamanız, alışkanlıklarınızı ne oranda tamamladığınız ve kaç aktif hedefiniz olduğu — en önemli bilgiler sizi hemen karşılar.',
            'Zaman grafiği: Seçilen hafta, ay veya yılda aktivitelerinize toplam kaç dakika harcadığınızı çizgi grafik olarak gösterir. Yoğun günlerinizi ve boş geçen haftaları kolayca fark edebilirsiniz.',
            'Pomodoro bölümü: Çalışma seanslarınızın kısa özeti — kaç oturum tamamladığınız, odaklanarak kaç dakika geçirdiğiniz ve kaç günlük çalışma seriniz olduğu görünür.',
            'Spor bölümü: Son iki antrenmanınızın tarihi, türü ve süresi listelenir. Üzerine tıklayarak hangi egzersizleri yaptığınızı ve detaylarını görebilirsiniz.',
            'Bütçe bölümü: Belirlediğiniz bütçeye göre her gider kategorisinde ne kadar harcadığınız yatay çubuk grafiklerle gösterilir. Dolmak üzere olan kategoriler daha koyu renkte öne çıkar.',
            'Yatırım bölümü: Portföyünüzdeki varlıkların dağılımını iki pasta grafik olarak gösterir — biri varlık varlık bazında, diğeri hisse/kripto/tahvil gibi türlere göre.',
            'Hayaller & Hedefler bölümü: Tamamlanmamış hedefleriniz ilerleme çubuklarıyla listelenir. Hangi hedefinizin ne kadar yol kat ettiğini bir bakışta anlarsınız.',
            'Yaklaşan Planlar bölümü: Önümüzdeki 7 gün içinde bitirilmesi gereken görevleriniz ve geciken işler burada listelenir; hiçbir şeyi gözden kaçırmazsınız.',
            'Dönem seçici (sağ üst köşe): "Bu Hafta", "Bu Ay" veya "Bu Yıl" seçeneğini değiştirerek özet kutucukları ve grafiklerin hangi zaman dilimini kapsayacağını belirleyebilirsiniz.',
            'Bölümleri yeniden sıralama: Sağ üstteki kilit simgesine tıkladığınızda bölümler kesik çerçeveli hale gelir. Bu modda bölümleri tutup istediğiniz yere sürükleyebilirsiniz. Kilit simgesine tekrar tıklayarak düzenlemeyi kaydedip çıkabilirsiniz.',
            'Hangi bölümler görünsün? Ayarlar → Paneller sekmesinden kullanmadığınız bölümleri kapatabilirsiniz. Kapattığınızda o bölüm hem Dashboard\'dan hem de sol menüden kalkar; verileriniz silinmez, sadece ekrandan kaldırılmış olur.'
          ],
          tip: 'En sık kontrol ettiğiniz bilgileri öne alın. Örneğin yalnızca bütçe ve hedef takip ediyorsanız spor ve pomodoro bölümlerini gizleyerek daha sade bir görünüm elde edebilirsiniz. Bölümleri istediğiniz zaman tekrar açabilirsiniz.'
        },
        {
          icon: 'timer', title: 'Odaklanma Modu', desc: 'Çalışma sürenizi ölçen ve kayıt altına alan zamanlayıcı sayfasıdır. Üç farklı çalışma biçimi sunar: klasik Pomodoro döngüsü, sınırsız akış modu ve kendi belirlediğiniz geri sayım. Her oturum tamamlandığında Zaman Takibi sayfasına otomatik olarak eklenir.',
          features: [
            'Pomodoro modu: 25 dakika çalışma, ardından 5 dakika kısa mola döngüsüyle ilerler. Dört oturum tamamlandıktan sonra 15 dakikalık uzun mola başlar. Çalışma ve mola sürelerini ayarlar bölümünden istediğiniz gibi değiştirebilirsiniz.',
            'Akış modu (Flow): Süre sınırı olmayan, sıfırdan ilerleyen bir kronometre. Ne kadar çalıştığınızı kayıt altına almak ama süreyle sınırlı kalmamak istediğinizde kullanın.',
            'Geri sayım modu: Kendiniz saat, dakika ve saniye girersiniz; süre dolduğunda sesli uyarı alırsınız ve sayaç sıfırlanır.',
            'Göreve bağlama: Zamanlayıcıyı başlatmadan önce o gün yapmanız gereken görevlerden birini seçebilirsiniz. Seçili görevin adı sayaç ekranında görünür ve harcadığınız süre o görevin üzerine yazılır.',
            'Alt görev paneli: Seçili görevin alt adımları ekranın sol tarafında görünür. Çalışırken bunları tıklayarak tamamlanmış olarak işaretleyebilirsiniz. Oturumu bitirdiğinizde kalan alt adımlar otomatik olarak tamamlandı kabul edilir.',
            'Bayrak butonu: Çalışırken "şu ana kadar olan kısmı kaydet" demek için bayrağa tıklarsınız. Her bayrak, o anın saatini ve geçen süreyi hatırlar. Daha sonra bayrağa kadar olan kısmı kaydedip devam edebilirsiniz.',
            'Sıfırla butonu — üç seçenek sunar: (1) "Son bayrağa kadar kaydet ve çık" — bayrağa kadar geçen süre kaydedilir, kalanı silinir; (2) "Son bayrağa geri dön ve devam et" — sayaç son bayrak noktasına döner, çalışmaya devam edersiniz; (3) "Tamamen sıfırla" — hiçbir şey kaydedilmez, sayaç başa döner.',
            'Bitir butonu: Oturumu sona erdirir ve sürenizi Zaman Takibi sayfasına kaydeder. Bayrak koyduysanız "son bayrağa kadar kaydet" seçeneği de sunulur.',
            'Fazla mesai modu: Pomodoro süresi dolduğunda sayaç durmaz; +01:23 gibi ekstra geçen süreyi göstermeye devam eder ve sarı renge döner. İstediğiniz an Bitir butonuna basarak oturumu kapatabilirsiniz.',
            'Sekme kapatılsa da kaybolmaz: Tarayıcıyı veya sekmeyi kapatsanız bile sayaç bilgileri 8 saat boyunca saklanır. Sayfayı tekrar açtığınızda kaldığınız yerden devam edebilirsiniz.',
            'Tam ekran modu: Sağ üstteki simgeye tıklayarak sol menü ve üst çubuk gizlenir, yalnızca sayaç ekranda kalır. Daha derin odaklanmak için idealdir. Tam ekran açıkken alt köşede bir bilgi çubuğu da açabilirsiniz — günün toplam çalışma süresini ve serinizi gösterir.'
          ],
          tip: 'Başlamadan önce bir görev seçin — çalışırken "şu anda ne yapıyorum" sorusunu sormak zorunda kalmazsınız ve geçen süre doğrudan o göreve bağlanır. Odaklanmayı kesmeden devam etmek istediğinizde bayrak kullanın: ara kayıt gibi çalışır.'
        },
        {
          icon: 'clock', title: 'Zaman Takibi', desc: 'Günlük aktivitelerinize ne kadar süre harcadığınızı kayıt altına aldığınız sayfadır. Odaklanma modunda tamamlanan oturumlar buraya otomatik eklenir; istediğiniz zaman kendiniz de kayıt girebilirsiniz. Günlük, haftalık ve aylık grafikler zamanınızı nereye harcadığınızı görmenizi sağlar.',
          features: [
            'Özet bilgi kartları (üstte üç rakam): Bugün kaç dakika geçirdiniz, bu hafta toplam kaç saat oldu ve bu ayki toplamınız nedir — en üstte sizi karşılar.',
            'Manuel kayıt ekleme: Sağ üstteki "Log Ekle" butonuna tıklayın. Tarih, kategori (Çalışma, Öğrenme, Egzersiz, Sosyal, Uyku, Diğer), proje adı ile başlangıç ve bitiş saatini girersiniz. Süre otomatik hesaplanır.',
            'Odaklanma modundan otomatik gelen kayıtlar: Pomodoro veya akış oturumu tamamlandığında bu sayfaya otomatik olarak eklenir. Bu kayıtlar tabloda küçük bir "Otomatik" etiketiyle ayrı gösterilir.',
            'Kayıt filtreleme: Tablonun üstündeki butonlarla "Tümü", "Manuel" veya "Otomatik" kayıtları ayrı ayrı görüntüleyebilirsiniz. Seçtiğiniz filtre sayfayı kapatsanız bile korunur.',
            'Tarih aralığı filtresi: Belirli bir tarih veya tarih aralığı seçerek yalnızca o döneme ait kayıtları görebilirsiniz. Takvim simgesine tıklayarak başlangıç ve bitiş tarihini belirleyin.',
            '30 günlük trend grafiği: Son otuz günün her biri için o gün kaç dakika geçirdiğinizi gösterir. Yükselen ve düşen günleri kolayca fark edebilirsiniz.',
            'Haftalık dağılım grafiği: Son yedi günü tek tek karşılaştırır. Haftanın hangi günlerinde daha yoğun çalıştığınızı görmenizi sağlar.',
            'Kayıt düzenleme ve silme: Tablodaki her kaydın yanında kalem (düzenle) ve çöp kutusu (sil) simgesi bulunur. Silme işleminde onay istenir; "Bugün bir daha sorma" seçeneğini işaretlerseniz o gün sonraki silmelerde onay penceresi açılmaz.',
            'Aylık geçmiş: Sağ üstteki "Geçmiş" butonuna tıklayarak geçmiş aylara bakabilirsiniz. Ok butonlarıyla aylar arasında geçiş yapın. "Özet" sekmesinde ay grafik ve haftalık toplamlar, "Loglar" sekmesinde ise günlük bazda tüm kayıtlar listelenir. Her ay için o ayın toplam aktif gün sayısını, günlük ortalamanızı ve en çok vakit harcadığınız kategoriyi görebilirsiniz.'
          ],
          tip: 'Odaklanma modunu düzenli kullanıyorsanız kayıtlarınız zaten otomatik geliyor. "Manuel" filtresini açarak yalnızca elle girdiğiniz kayıtları görebilir, "Otomatik" filtresini seçerek de yalnızca Pomodoro seanslarınızı inceleyebilirsiniz.'
        },
        {
          icon: 'check-circle', title: 'Alışkanlıklar', desc: 'Her gün yapmak istediğiniz şeyleri takip ettiğiniz sayfadır. Alışkanlıklarınızı tamamladıkça seri oluşturur, geçmiş ilerlemelerinizi görsel olarak izlersiniz. Hem her gün tekrarlanan hem de haftanın belirli günlerine özel alışkanlıklar tanımlayabilirsiniz.',
          features: [
            'İki alışkanlık tipi: "Her gün" tipi alışkanlıklar her sabah listede sizi bekler. "Belirli günler" tipi ise yalnızca seçtiğiniz günlerde (örneğin Pazartesi–Cuma) listede görünür; diğer günlerde tamamen kaybolur ve o günler seriyi etkilemez.',
            'Alışkanlık eklerken: bir ad yazın, istediğinizde emoji ve renk seçin, ardından "Her gün" ya da "Belirli günler" tipini belirleyin. Uygulama yazdığınız ada uygun emojiyi otomatik olarak önerir.',
            'Günlük liste üç bölüme ayrılır: üstte henüz yapılmayanlar, ortada tamamladıklarınız, altta ise o gün için atladıklarınız. Başlıkta "3 / 5" gibi bir sayaç kaç tanesini bitirdiğinizi gösterir.',
            'Atlama (Geç) butonu: Her alışkanlığın yanındaki küçük eksi simgesine tıklarsanız o gün için atlayabilirsiniz. Önemli olan şu: atlama seriyi kırmaz. Hastalandığınız ya da o güne gerçekten fırsat bulamadığınız günlerde güvenle kullanabilirsiniz. Fikrinizi değiştirirseniz döner ok simgesine tıklayarak geri alabilirsiniz.',
            '🔥 Seri sayacı: Bir alışkanlığı art arda kaç gün tamamladığınızı gösterir. Bir gün yapamazsanız seri sıfırlanır — ama atlama (Geç) yaptığınız günler bu hesaba girmez. Zamanlanmış alışkanlıklarda ise yalnızca o alışkanlığın atanmış günleri sayılır; diğer günler seriyi etkilemez.',
            '30 günlük ilerleme ızgarası: Her alışkanlık için son otuz günü küçük kutucuklarla gösterir. Tamamladığınız günler alışkanlığınızın rengiyle dolar, yapmadığınız günler boş kalır. Bugünün kutucuğu mavi çerçeveyle öne çıkar. Satırın başında tamamlama yüzdeniz yazar.',
            'Haftalık grafikler: Haftanın her günü için küçük bir daire grafik gösterilir. Yeşil doluluk o gün kaç alışkanlığı tamamladığınızın oranıdır. Yanında haftanın genel özeti de yer alır.',
            'Üç özet bilgi kartı: Bugün kaç alışkanlık tamamladığınız, bu haftaki ortalama tamamlama yüzdeniz ve tüm alışkanlıklarınız arasındaki en uzun seri — en alta sizi bekler.',
            'Sırayı değiştirme: Günlük listede bir alışkanlığı basılı tutup sürükleyerek istediğiniz sıraya taşıyabilirsiniz. Sıra değişikliği otomatik olarak kaydedilir.',
            'Düzenleme ve silme: Sağ üstteki "Yönet" butonuna tıklayın. Açılan pencerede tüm alışkanlıklarınız listelenir; kalem simgesiyle düzenleyebilir, çöp kutusuyla silebilirsiniz. Silme işlemi o alışkanlığa ait geçmiş kayıtları da siler ve geri alınamaz.'
          ],
          tip: 'Seriyi korumak için her gün yapmak zorunda değilsiniz — "Belirli günler" tipiyle sadece seçtiğiniz günleri takip edin. Bir günü gerçekten atlayacaksanız seriyi kırmamak için Geç butonunu kullanın; ilerisi için kendinize baskı yaratmamış olursunuz.'
        },
        {
          icon: 'dumbbell', title: 'Spor', desc: 'Antrenman günlüğünüzdür. Her çalışma sonrası yaptıklarınızı kaydeder, zaman içindeki ilerlemenizi grafiklerle takip eder ve kişisel rekorlarınızı otomatik olarak listeleyen bir sayfa. Hem ağırlık hem de kardiyo hem de başka tür antrenmanları destekler.',
          features: [
            'Antrenman ekleme: "Antrenman Ekle" butonuna tıklayın. Tarih, süre (dakika) ve tür seçin. Altı antrenman türü vardır: Kuvvet, Kardiyo, Esneklik, CrossFit, Spor ve Diğer. İsteğe bağlı olarak not ve zorluk derecesi (1–10) girebilirsiniz.',
            'Egzersiz kaydetme: Antrenman formunun altında her egzersizi ayrı ayrı eklersiniz. Kuvvet antrenmanlarında egzersiz adı, kas grubu, kaç set, kaç tekrar ve kaç kilo giriyorsunuz. Kardiyo antrenmanlarında ise süre ve mesafe (km) giriyorsunuz. Form seçtiğiniz türe göre otomatik değişir.',
            'Şablonlar: Sık yaptığınız antrenman planını bir kez kaydedip her seferinde tek tıkla yükleyebilirsiniz. Antrenman formunu doldurun, "Şablon Olarak Kaydet" butonuna tıklayın ve bir ad verin. Bir dahaki seferde "Şablon Yükle" açılır menüsünden seçerek egzersizler otomatik dolar.',
            'Kişisel rekortlar (PR) paneli: Her egzersiz adı için o egzersizde kaldırdığınız en yüksek ağırlığı ve tarihi otomatik olarak listeler. Ayrıca her PR için 1 Tekrar Maksimum değerinizi (kaldırdığınız ağırlık ve tekrar sayısından hesaplanan teorik maksimum) otomatik hesaplar.',
            'Vücut ölçümleri: Vücut ağırlığı, vücut yağ yüzdesi, bel, göğüs, kol ve bacak çevresi olmak üzere altı ölçümü tarihli olarak girebilirsiniz. Vücut ağırlığınızın zaman içindeki değişimi grafikle gösterilir.',
            'Antrenman frekansı grafiği: Son sekiz haftada kaç antrenman yaptığınızı haftalar bazında gösterir. Düzenli mi çalışıyorsunuz, boşluk var mı, bir bakışta anlarsınız.',
            'Hacim grafiği: Son sekiz haftada toplam ne kadar ağırlık kaldırdığınızı (set × tekrar × kilo) gösterir. Antrenmanlarınızın yoğunluğunun haftalara göre değişimini takip edebilirsiniz.',
            'Kas grubu dağılımı ve egzersiz ilerleme grafiği: Hangi kas gruplarına ne kadar zaman ayırdığınızı pasta grafikle görürsünüz. Belirli bir egzersizi seçerek o egzersizdeki ağırlığınızın zaman içinde nasıl ilerlediğini de takip edebilirsiniz.',
            'Antrenman geçmişi kartları: Kaydettiğiniz her antrenman tarih, tür, süre ve egzersiz özeti olarak listelenir. Herhangi bir kartın üzerine tıklayarak düzenleyebilirsiniz.',
            'kg / lb değişimi: Sağ üstteki düğmeyle kilogram ve pound arasında geçiş yapabilirsiniz. Tüm ağırlık değerleri, grafikler ve kişisel rekortlar otomatik olarak dönüştürülür.',
            'Panel yönetimi: Sağ üstteki ızgara simgesine tıklayarak hangi panellerin görüneceğini seçebilirsiniz. Kilit simgesiyle panelleri sürükleyip yeniden sıralayabilir, genişliklerini ayarlayabilirsiniz.'
          ],
          tip: 'Şablonları düzenli kullanırsanız her antrenmanda egzersizleri tek tek girmek zorunda kalmazsınız. Ayrıca kişisel rekortlar panelini takip etmek motivasyon için oldukça işe yarar — geçen ayki en yüksek kilonuzu görmek bir sonraki antrenmanı planlamayı kolaylaştırır.'
        },
        {
          icon: 'kanban', title: 'Planlar', desc: 'Yapılacak işlerinizi takip ettiğiniz görev yönetimi sayfasıdır. Görevlerinizi üç aşamada izleyebilirsiniz: Yapılacak, Devam Eden ve Tamamlandı. Her görevin içine adım adım tamamlanacak alt görevler ekleyebilirsiniz.',
          features: [
            'İki görünüm arasında geçiş yapabilirsiniz. Kanban görünümü görevleri üç sütun halinde yan yana gösterir — her görev bir kart olarak durur. Liste görünümü ise tüm görevleri tek bir tabloda, son tarihe göre sıralı şekilde gösterir; çok sayıda görev varken taramak daha kolaydır.',
            'Görev ekleme: "Görev Ekle" butonuna tıklayın. Bir başlık girin, öncelik (Yüksek, Orta, Düşük) ve kategori seçin, isteğe bağlı olarak son tarih ile notlar ekleyin.',
            'Yedi sabit kategori arasından seçim yapabilirsiniz: Proje, Eğitim, Finans, Yatırım, Kişisel, Sağlık ve Diğer. Kategoriler görevi sınıflandırmanıza ve bir bakışta hangi alana ait olduğunu görmenize yardımcı olur.',
            'Öncelik renkleri: Yüksek öncelikli görevler kırmızı, orta öncelikli görevler sarı, düşük öncelikli görevler mavi renkli etiketle gösterilir. Bir bakışta hangisinin acil olduğunu anlarsınız.',
            'Görevi ilerletme: Kanban ve Liste görünümlerinde her görevin yanında iki buton bulunur. "Başla" butonu görevi Yapılacak\'tan Devam Eden\'e taşır. "Tamamla" butonu ise Devam Eden\'den Tamamlandı\'ya taşır. Geri almak isterseniz "Geri" butonu bir adım geri döndürür.',
            'Gecikmiş görevler: Son tarihi geçmiş olan ve henüz tamamlanmamış görevlerin tarihi otomatik olarak kırmızıya döner. Tamamlandı sütununa taşınan görevlerde bu uyarı görünmez.',
            'Alt görevler: Bir görevi düzenlerken altına adım adım yapılacaklar ekleyebilirsiniz. Her alt görevin yanında bir onay kutusu bulunur; tıklayarak tamamlandı olarak işaretleyebilirsiniz. Görev kartında "2 / 5" gibi bir sayaç ve doluluk çubuğu kaç adımı bitirdiğinizi gösterir.',
            'Alt görev düzenleme: Alt görev adının üzerine tıklayarak metnini düzenleyebilirsiniz. Enter tuşu değişikliği kaydeder; Shift+Enter ise metin içinde yeni satır açar. Alt görevleri tutup sürükleyerek sıralarını değiştirebilirsiniz.',
            'Üç özet bilgi kartı (sayfanın üstünde): Kaç görevin Yapılacak, kaç görevin Devam Eden aşamasında olduğunu ve kaç görevinizi tamamladığınızı yüzdeyle birlikte gösterir.',
            'Düzenleme ve silme: Her görevin yanındaki kalem simgesiyle düzenleyebilir, çöp kutusu simgesiyle silebilirsiniz. Silme işleminde onay istenir ve görevle birlikte tüm alt görevler de kalıcı olarak silinir.'
          ],
          tip: 'Çok sayıda göreviniz varsa Liste görünümüne geçin — tümü tek tabloda son tarihe göre sıralanmış şekilde görünür, geciken ve yaklaşan görevleri hızlıca fark edebilirsiniz. Kanban görünümü ise bir projenin hangi aşamada olduğunu anlamak için daha uygundur.'
        },
        {
          icon: 'star', title: 'Hayaller & Hedefler', desc: 'Hayallerinizi ve uzun vadeli hedeflerinizi takip ettiğiniz sayfadır. Her hayali adım adım ilerleyerek tamamlayabilir, ne kadar yol kat ettiğinizi görebilirsiniz. Büyük bir hedefi küçük adımlara bölerek ilerlemeyi hissetmek çok daha kolay olur.',
          features: [
            'Hayal eklemek için "Hayal Ekle" butonuna tıklayın ve bir başlık girin. Açıklama, kategori, hedef tarih, emoji ve renk seçmek tamamen isteğe bağlıdır — sadece başlık bile yeterlidir.',
            'Altı sabit kategori arasından seçim yapabilirsiniz: Kariyer, Seyahat, Sağlık, Eğitim, Kişisel ve Finansal. Kategori, kartın üzerinde renkli bir etiketle gösterilir, bu sayede benzer hayalleri bir bakışta gruplandırabilirsiniz.',
            'Her hayale bir emoji seçebilirsiniz. Seçtiğiniz emoji kartın en üstünde büyük olarak görünür ve hayalinizi görsel olarak tanımlar. Renk seçimi ise kartın kenarlığını, ilerleme çubuğunu ve kategori etiketini renklendirir.',
            'Alt adımlar (kilometre taşları): bir hayali düzenlerken içine küçük adımlar ekleyebilirsiniz. Her adımın yanında bir onay kutusu bulunur. Adımları tamamladıkça onları işaretleyin — ilerleme yüzdesi otomatik olarak hesaplanır.',
            'İlerleme yüzdesi tamamen otomatiktir. Kaç adımdan kaçını tamamladığınıza göre sistem yüzdeyi kendisi hesaplar. Elle bir yüzde girmenize gerek yoktur.',
            'Alt adımları düzenlemek için adımın üzerine tıklayın ve yazıyı değiştirin. Sırayı değiştirmek istiyorsanız adımları tutup yukarı veya aşağı sürükleyebilirsiniz.',
            'Hedef tarih belirlediğinizde kartın alt kısmında kaç gün kaldığı yazar. 30 günden az kaldığında bu sayı kırmızıya döner, böylece aciliyeti olan hayalleri hemen fark edebilirsiniz.',
            'Sırayı değiştirmek için sağ üstteki kilit simgesine tıklayın — düzenleme modu açılır ve kartların üzerinde tutma tutacakları belirir. Kartları istediğiniz sıraya sürükleyin, ardından kilidi kapatın.',
            'Bir hayalin tüm adımları tamamlandığında ve ilerleme %100\'e ulaştığında ekranda kutlama bildirimi görünür.',
            'Düzenlemek için kartın üzerindeki kalem simgesine, silmek için çöp kutusu simgesine tıklayın. Silme işlemi geri alınamaz, bu nedenle uygulama sizden onay ister.'
          ],
          tip: 'Büyük bir hayali doğrudan eklemeye çalışmak bunaltıcı gelebilir. Hayali önce ekleyin, sonra düzenleme ekranında küçük adımlara bölün. Her adımı tamamladıkça ilerleme çubuğunun dolduğunu görmek sizi motive eder.'
        },
        {
          icon: 'wallet', title: 'Bütçe', desc: 'Aylık gelir ve giderlerinizi takip ettiğiniz sayfadır. Ne kadar para geldiğini, nereye harcadığınızı ve ne kadar artıp artmadığını görebilirsiniz. Bütçe limitleri belirleyerek harcamalarınızın sınırın içinde kalıp kalmadığını anlık olarak takip edebilirsiniz.',
          features: [
            'Sayfa üç sekmeden oluşur: Özet (grafikler ve özet bilgiler), Ana Kategoriler (gelir-gider yapısı) ve İşlem Takibi (tüm kayıtlar). Sekme seçimi sayfa yenilendiğinde de hatırlanır.',
            'Özet sekmesinde dört özet kart gösterilir: toplam gelir, toplam gider, net bakiye (gelir eksi gider) ve bütçeden ne kadar kaldığı. Ayrıca grafikler bulunur: harcama dağılımı pasta grafiği, günlük harcama çizgi grafiği ve aylara göre net bakiye trendi.',
            'Ana Kategoriler sekmesinde harcama kategorilerinizi oluşturursunuz. Önce bir grup ekleyin (örneğin "Market" veya "Maaş"), ardından altına alt kategoriler ekleyin. Her alt kategoriye aylık bir bütçe limiti belirleyebilirsiniz.',
            'Bütçe limiti: bir alt kategoriye limit koyduğunuzda o aya ait gerçek harcamanız limitin yüzde kaçına ulaşmış gösterilir. %75\'in üzerinde sarıya, limitin üzerinde kırmızıya döner. Uygulama sizi engellemez — sadece görsel uyarı verir.',
            'İşlem Takibi sekmesinde tüm gelir ve gider kayıtlarınız listelenir. Tarih, açıklama, kategori ve tutar ile yeni kayıt ekleyebilirsiniz. Mevcut kayıtları düzenleyebilir veya silebilirsiniz.',
            'Kayıtları bulmak için: açıklama veya kategori adına göre metin araması yapabilirsiniz. Tarih aralığı ve kategori grubuna göre de filtre uygulayabilirsiniz.',
            'Döngü sistemi: bütçe her ay belirli bir günde sıfırlanır (varsayılan: ayın 1\'i). Bu günü kendiniz ayarlayabilirsiniz. Ayı kapattığınızda o döneme ait tüm veriler arşivlenir, üzerine yazılmaz.',
            'Geçmiş dönemler: sağ üstteki geçmiş butonu ile eski aylara bakabilirsiniz. Her dönemin toplam geliri, gideri ve net farkı görüntülenir. Geçmiş dönemlere yeni kayıt ekleyebilir veya mevcut kayıtları düzenleyebilirsiniz.',
            'Panel düzeni: Özet sekmesindeki grafik panellerini istediğiniz sıraya koyabilirsiniz — kalem simgesine tıklayarak düzenleme modunu açın. Kullanmadığınız panelleri sağ üstteki panel yöneticisinden gizleyebilirsiniz.',
            'Bütçe verisini ayrı yedekleyip geri yükleyebilirsiniz. İşlem Takibi sekmesindeki "Veri Aktar" butonu yalnızca bütçeye ait verileri içe aktarır; diğer modüllerdeki bilgilerinize dokunmaz.'
          ],
          tip: 'Başlarken önce Ana Kategoriler sekmesine gidin ve gelir/gider gruplarınızı oluşturun. Gruplar olmadan işlem ekleyemezsiniz. Birkaç basit kategori bile — örneğin "Maaş" ve "Market" — başlangıç için yeterlidir.'
        },
        {
          icon: 'trending-up', title: 'Yatırım', desc: 'Hisse senedi, kripto para, ETF ve diğer yatırımlarınızı tek bir yerden izlediğiniz sayfadır. Portföyünüzün toplam değerini, kârınızı veya zararınızı ve varlıklarınızın dağılımını görürsünüz. Banka mevduat hesaplarınızı da buraya ekleyebilir, her gün ne kadar faiz kazandığınızı takip edebilirsiniz.',
          features: [
            'Altı farklı yatırım türü desteklenir: Hisse Senedi, ETF (fon), Kripto Para, Emtia (altın, gümüş gibi), Tahvil ve Nakit/Döviz. Her varlık için sembol, ad, kaç adet aldığınız, alış fiyatı ve tarih bilgisi girersiniz.',
            'Yeni yatırım eklemek veya mevcut varlığınızı değiştirmek için sağ üstteki "Varlık Al/Sat" butonunu kullanın. "Yeni Ekle" ile sıfırdan varlık eklersiniz; "Daha Fazla Al" ile aynı varlıktan ek alım yaparsınız — ortalama maliyetiniz otomatik güncellenir; "Sat" ile bir kısmını ya da tamamını satarsınız.',
            'Otomatik fiyat güncellemesi: Ayarlar bölümünden bir ücretsiz Alpha Vantage anahtarı girdiğinizde, ABD borsasındaki hisseler, ETF\'ler ve kripto paralar için fiyatlar her 24 saatte bir otomatik çekilir. Sağ üstteki yenile düğmesine basarak da elle güncelleme yapabilirsiniz.',
            'Altın veya kendi bankanızın hissesi gibi otomatik fiyat desteği olmayan varlıklarda fiyatı kendiniz girebilirsiniz: portföy tablosunda o satırın kalem simgesine tıklayın ve güncel fiyatı yazın.',
            'Kâr/Zarar sütunu: portföy tablosunun sağ üstündeki sütun başlığına tıklayarak Günlük, Haftalık, Aylık veya Tüm Zamanlar görünümüne geçebilirsiniz. Hangi varlığın ne kadar kazandırdığını ya da kaybettirdiğini tek bakışta görürsünüz.',
            'Para birimi seçimi: Portföyünüzü Türk Lirası veya Amerikan Doları olarak görmek istiyorsanız sayfanın sağ üstündeki TRY/USD düğmesine basmanız yeterli. Döviz kuru otomatik güncellenir; isterseniz topbardaki "1$=" kutusuna kuru kendiniz de yazabilirsiniz.',
            'Banka mevduatı takibi: Sayfanın alt bölümündeki "🏦 Mevduat" panelinde vadeli veya serbest (günlük faizli) hesaplarınızı kayıt altına alabilirsiniz. Bankanızın adı, anapara, yıllık faiz oranı ve başlangıç tarihini girin — uygulama her gün birikmiş faizi, kalan vade gününü ve vade sonunda elinize geçecek toplam tutarı otomatik hesaplar.',
            'Mevduat görünümü: Mevduat panelinin sağ üstündeki "Kartlar / Tablo" düğmeleriyle hesaplarınızı iki farklı biçimde görebilirsiniz. Kartlar görünümü her hesabı geniş bir bilgi kartı olarak açar; Tablo görünümü tüm detayları yan yana sütunlarda dizer. Uygulama son tercih ettiğiniz görünümü hatırlar.',
            'Sıralama — sürükle bırak: Portföy tablosundaki varlıkları ve mevduat listesindeki hesapları istediğiniz sıraya dizebilirsiniz. Taşımak istediğiniz satırın üzerine gelin, sol fare tuşunu basılı tutun ve yukarı ya da aşağı sürükleyin. Bıraktığınızda yeni sıra otomatik kaydedilir.',
            'İşlem geçmişi sekmesi: "İşlem Geçmişi" sekmesinde "Borsa/ETF" ve "Mevduat" olmak üzere iki ayrı bölüm vardır. Hangisi seçiliyken "Geçmiş" butonuna basarsanız, açılan pencerede o bölüm zaten seçili gelir — tekrar tıklamanıza gerek kalmaz. Geçmiş penceresinde aylık görünümle ok tuşlarıyla geriye gidip eski işlemlerinizi inceleyebilirsiniz.',
            'Satış kâr/zararı: Bir varlığı sattığınızda, o satıştan elde ettiğiniz kâr ya da zarar ayrıca kaydedilir ve işlem geçmişinde görünür. Bu sayede portföyünüzden çıkardığınız yatırımların toplam getirisi kaybolmaz.',
            'Bağlantı anahtarları Ayarlar → Yatırım API Anahtarları bölümünden girilir. Anahtar olmadan da uygulamayı kullanabilirsiniz; yalnızca fiyatları elle güncellemeniz gerekir.'
          ],
          tip: 'Mevduat hesabınızı eklerken faiz oranını yıllık olarak girin (örneğin %42 için "42" yazın). Vadeli hesaplarda vade süresini günü gününe seçin — uygulama bitiş tarihini ve vade faizini otomatik hesaplar. Portföy için de, hisse anahtarı olmadan bile alış fiyatlarını kendiniz girerek kâr/zarar takibini kullanabilirsiniz.'
        }
      ],
      en: [
        {
          icon: 'settings', title: 'Settings', desc: 'All appearance and behavior settings for the app are gathered here. Click the gear icon at the bottom of the left menu on any page to open it. Changes take effect right away.',
          features: ['Language: Choose the app\'s language — Turkish, English, Chinese, Spanish, or French. All menus and text will switch to the language you pick.', 'Currency: Choose which currency symbol is shown throughout the app — Turkish Lira (₺), Dollar ($), Euro (€), and more.', 'Color theme: Change the look of the app. There are 12 color themes to choose from — dark, light, and colorful options.', 'Text and item size: If the screen feels cramped or text is hard to read, use the slider to make everything larger or smaller.', 'Privacy mode: When turned on, all money amounts are hidden and shown as ••••. Handy when others are nearby and you don\'t want them to see your figures.', 'Week start day: Choose whether your week starts on Monday or Sunday. This changes how habit and time tracking charts look.', 'Live price updates: Enter the connection keys here to enable automatic updates for stock, crypto, and exchange rate prices. (Only needed if you use the Investments section.)', 'Backup (Export): Saves all your data as a file on your computer. We recommend doing this regularly to keep your data safe.', 'Restore from backup (Import): Loads a backup file you saved earlier. Important: this replaces all your current data and cannot be undone.', 'Delete data — two choices: "Reset to sample data" removes your personal data and restarts the app with ready-made example content; "Wipe everything" permanently deletes all data with no way to get it back.', 'Hide sections (Panels tab): You can remove pages you don\'t use from the left menu. Your data is not deleted — the page simply disappears from the menu.'],
          tip: 'Use the "Export" button regularly to back up your data. Importing a backup will replace your current data — always export a backup first. If you want a fresh start, "Reset to sample data" gives you a clean app with example content already filled in.'
        },
        {
          icon: 'layout-dashboard', title: 'Dashboard', desc: 'The home screen that shows a summary of all sections in one place. Your spending, habits, goals, workouts, and more are all visible at a glance. You decide which sections appear and in what order.',
          features: [
            'Four summary cards (at the very top): Your net worth, total spending for the selected period, habit completion percentage, and number of active goals — the most important figures are right there when you open the app.',
            'Time chart: Shows how many minutes you spent on activities during the selected week, month, or year as a line graph. You can easily spot your most productive days and the quiet stretches.',
            'Pomodoro section: A quick summary of your work sessions — how many sessions you completed, how many minutes you spent in deep focus, and how many days in a row you\'ve kept at it.',
            'Gym section: Lists your last two workouts with their date, type, and duration. Click on any workout to expand it and see exactly which exercises you did.',
            'Budget section: Shows how much of each spending category you\'ve used up, displayed as horizontal bars. Categories that are nearly full stand out so you can see where your money is going.',
            'Investments section: Displays how your portfolio is spread across two pie charts — one showing each individual holding, the other grouping by type such as stocks, crypto, or bonds.',
            'Goals section: All unfinished goals are listed with progress bars so you can see at a glance how far along each one is.',
            'Upcoming Plans section: Tasks due within the next 7 days and any overdue items are listed here so nothing slips through the cracks.',
            'Period selector (top right corner): Switch between "This Week", "This Month", and "This Year" to change the time range the summary cards and charts cover.',
            'Rearranging sections: Click the lock icon in the top right. The sections get a dashed border — in this mode you can grab any section and drag it wherever you like. Click the lock icon again to save and exit.',
            'Which sections appear? Go to Settings → Panels tab to hide sections you don\'t use. When you hide one, it disappears from both the Dashboard and the left menu. Your data is not deleted — it\'s just tucked out of sight and can be brought back any time.'
          ],
          tip: 'Move the information you check most often to the top. If you mainly track budget and goals, you can hide the gym and pomodoro sections for a cleaner view. You can always bring them back from Settings → Panels.'
        },
        {
          icon: 'timer', title: 'Focus Mode', desc: 'The timer page that measures and records your work sessions. It offers three different ways to work: classic Pomodoro cycles, an open-ended flow timer, and a custom countdown. Each completed session is automatically added to the Time Tracking page.',
          features: [
            'Pomodoro mode: Runs in 25-minute work intervals followed by a 5-minute short break. After four sessions, a 15-minute long break begins. You can change all durations from the settings panel at the top of the page.',
            'Flow mode: An open-ended stopwatch that counts up from zero with no time limit. Use it when you want to record how long you work without being tied to a fixed interval.',
            'Countdown mode: You set the hours, minutes, and seconds yourself. When the time runs out, an alert sounds and the timer resets.',
            'Link to a task: Before starting, you can choose one of today\'s tasks from a list. The task name appears on the timer screen and the time you spend is recorded against that task.',
            'Subtask panel: The steps of your selected task appear on the left side of the screen. You can check them off as you finish each one without leaving the timer. When you finish the session, any remaining steps are automatically marked as done.',
            'Flag button: Tap the flag while the timer is running to mark the current moment — like placing a bookmark in time. Each flag remembers the exact time of day and how long had passed. You can later save up to a flag or rewind to it.',
            'Reset button — three choices: (1) "Save up to last flag and stop" — everything up to your last flag is saved, the rest is discarded; (2) "Rewind to last flag and continue" — the timer jumps back to your last flag so you can carry on from there; (3) "Start over" — nothing is saved and the timer goes back to the beginning.',
            'Finish button: Ends the session and saves your time to the Time Tracking page. If you placed flags, you also get the option to save only up to the last flag.',
            'Overtime mode: When the Pomodoro time runs out, the timer keeps going and shows the extra time as +01:23 in yellow. Press Finish whenever you\'re ready to wrap up.',
            'Stays put if you close the tab: Your timer is saved for up to 8 hours even if you close the browser or the tab. When you come back, it picks up right where you left off.',
            'Full-screen mode: Click the icon in the top right to hide the menu and toolbar, leaving only the timer on screen. Great for deeper focus. In full-screen you can also open a small info bar at the bottom that shows your total work time and daily streak.'
          ],
          tip: 'Select a task before you start — that way your time is automatically tied to what you\'re actually working on. Use the flag button like a mid-session checkpoint: it lets you mark a moment without stopping, so you can save or rewind to it later.'
        },
        {
          icon: 'clock', title: 'Time Tracking', desc: 'The page where you record how much time you spend on your daily activities. Sessions from Focus Mode are added here automatically; you can also enter time manually whenever you like. Daily, weekly, and monthly charts help you see where your time actually goes.',
          features: [
            'Three summary cards at the top: How many minutes you logged today, your total for the week, and your total for the month — the most important figures right at the top.',
            'Adding a manual entry: Click the "Add Log" button in the top right. You fill in the date, a category (Work, Learning, Exercise, Social, Sleep, or Other), an optional project name, and the start and end time. The duration is calculated for you automatically.',
            'Automatic entries from Focus Mode: Whenever you finish a Pomodoro or Flow session, it is added to this page automatically. These entries are shown in the table with a small "Automatic" label so you can tell them apart from manual ones.',
            'Filtering entries: The buttons above the table let you switch between "All", "Manual only", and "Automatic only". The filter you choose is remembered even after you close the page.',
            'Date range filter: Click the calendar icon to pick a start and end date and see only the entries from that period. Clear the filter to go back to the full list.',
            '30-day trend chart: Shows how many minutes you logged on each of the past thirty days. You can easily spot your most active days and the quiet stretches at a glance.',
            'Weekly breakdown chart: Compares the last seven days side by side. A quick way to see which days of the week you tend to be most productive.',
            'Editing and deleting entries: Every row in the table has a pencil icon to edit it and a bin icon to delete it. Deleting asks for confirmation; tick "Don\'t ask again today" and you won\'t see the confirmation prompt for the rest of the day.',
            'Monthly history: Click the "History" button in the top right to browse past months. Use the arrow buttons to move between months. The "Summary" tab shows a monthly chart and weekly totals; the "Logs" tab lists every entry day by day. At the top of each month you can see the number of active days, your daily average, and the category you spent the most time on.'
          ],
          tip: 'If you use Focus Mode regularly, your entries are already coming in automatically. Switch to the "Manual" filter to see only what you entered by hand, or choose "Automatic" to review just your Pomodoro and Flow sessions.'
        },
        {
          icon: 'check-circle', title: 'Habits', desc: 'The page where you track the things you want to do every day. As you complete habits you build streaks, and you can look back at your progress visually. You can set up habits that repeat every single day, or ones that only apply on certain days of the week.',
          features: [
            'Two habit types: "Every day" habits appear in your list every morning. "Specific days" habits only show up on the days you chose — for example Monday to Friday — and stay completely hidden on other days, so those days don\'t affect your streak at all.',
            'Adding a habit: type a name, optionally pick an emoji and a color, then choose whether it\'s an every-day or specific-days habit. The app suggests a matching emoji automatically based on what you type.',
            'The daily list has three sections: habits you haven\'t done yet at the top, completed ones in the middle, and any you\'ve skipped for the day at the bottom. A counter like "3 / 5" in the heading shows how many you\'ve finished.',
            'Skip button: click the small minus icon next to any habit to mark it as skipped for today. Crucially, skipping does not break your streak. Use it freely on days you\'re ill or simply can\'t fit it in. If you change your mind, click the circular arrow icon to undo the skip.',
            '🔥 Streak counter: shows how many days in a row you\'ve completed a habit. Miss a day and the streak resets — but days you skipped are not counted against you. For scheduled habits, only the assigned days count; the rest of the week doesn\'t affect the streak at all.',
            '30-day progress grid: shows the last thirty days as small squares for each habit. Days you completed are filled in with that habit\'s color; days you missed stay empty. Today\'s square has a blue border to stand out. The completion percentage is shown at the start of each row.',
            'Weekly charts: a small circular chart appears for each day of the week, showing what proportion of your habits you completed that day. A summary chart for the whole week sits alongside it.',
            'Three summary cards: how many habits you completed today, your average completion rate for the week, and the longest streak across all your habits — shown at the bottom of the page.',
            'Reordering: press and hold a habit in the daily list, then drag it to where you want it. The new order is saved automatically.',
            'Editing and deleting: click the "Manage" button in the top right. A window lists all your habits; use the pencil icon to edit one or the bin icon to delete it. Deleting also removes all the historical records for that habit and cannot be undone.'
          ],
          tip: 'You don\'t have to do something every day to build a streak — use the "Specific days" type to only track the days that make sense. And if you genuinely can\'t do a habit on a given day, hit Skip instead of leaving it undone: it keeps your streak intact and removes the pressure of an open task.'
        },
        {
          icon: 'dumbbell', title: 'Gym', desc: 'Your workout journal. Record what you do after each session, track your progress over time with charts, and let the app automatically keep a list of your personal bests. Works for weight training, cardio, and any other type of exercise.',
          features: [
            'Adding a workout: click "Add Workout". Choose the date, how long it lasted in minutes, and the type. There are six types to choose from: Strength, Cardio, Flexibility, CrossFit, Sport, and Other. You can also add notes and a difficulty rating from 1 to 10.',
            'Logging exercises: at the bottom of the workout form you add each exercise one by one. For strength workouts you enter the exercise name, muscle group, how many sets, how many reps, and how much weight. For cardio workouts you enter the duration and distance in kilometres. The form adjusts automatically to match the type you chose.',
            'Templates: if you follow the same workout plan regularly, save it once and load it with a single click every time. Fill in the workout form, hit "Save as Template" and give it a name. Next time, pick it from the "Load Template" menu and all your exercises fill in automatically.',
            'Personal records panel: for every exercise you have ever logged, the app automatically tracks your heaviest weight and the date you lifted it. It also calculates your estimated one-rep maximum — the heaviest weight you could theoretically lift once — based on your sets and reps.',
            'Body measurements: you can log six measurements with a date: body weight, body fat percentage, waist, chest, arm, and leg circumference. Your body weight change over time is shown as a chart.',
            'Workout frequency chart: shows how many sessions you did in each of the last eight weeks. A quick way to see whether you are training consistently or whether there are gaps.',
            'Volume chart: shows the total weight you moved each week over the last eight weeks (sets × reps × weight). Helps you see whether your training is getting heavier over time.',
            'Muscle group chart and exercise progress: a pie chart shows which muscle groups you have been training and how much. You can also pick a specific exercise from a menu to see a chart of how your weight has increased over time for that exercise.',
            'Workout history cards: every workout you logged is listed as a card with the date, type, duration, and a summary of exercises. Click on any card to open and edit it.',
            'kg / lb switch: use the button in the top right to toggle between kilograms and pounds. All weights, charts, and personal records convert automatically.',
            'Panel management: click the grid icon in the top right to choose which panels are visible. Use the lock icon to drag panels into a different order or adjust their width on screen.'
          ],
          tip: 'Use templates for your regular sessions so you never have to re-enter the same exercises from scratch. And keep an eye on the personal records panel — seeing your previous best weight is a simple but effective way to set a target for your next session.'
        },
        {
          icon: 'kanban', title: 'Plans', desc: 'This is your task management page where you track everything you need to do. Tasks move through three stages — To Do, In Progress, and Done — so you always know what\'s pending, what you\'re working on, and what\'s finished.',
          features: [
            'Two views to choose from: Kanban view arranges your tasks in three side-by-side columns (To Do, In Progress, Done), which makes it easy to see your overall workload at a glance. List view shows everything in a single scrollable table sorted by due date — better when you have many tasks and want to see deadlines.',
            'Adding a task: click the "Add Task" button and fill in the title. You can also set a due date, priority level, category, and add notes. None of these extra fields are required — even a title alone is enough.',
            'Seven fixed categories to organize your tasks by area of life: Work, Learning, Personal, Health, Finance, Home, and Other. Each has its own color label so you can tell them apart at a glance.',
            'Priority colors: High priority tasks are marked red, Medium are yellow, Low are blue. Use priority to decide what to tackle first when your list gets long.',
            'Moving a task forward: in Kanban view, you can drag a task card from one column to the next, or click the arrow button on the card to advance it one stage. In List view, click the status label to change it directly.',
            'Overdue tasks: any task whose due date has passed is highlighted in red. This makes it easy to spot things that need your immediate attention without hunting through the list.',
            'Subtasks: when editing a task, you can add a list of smaller steps inside it. Each subtask has its own checkbox. Breaking a big task into steps makes it less intimidating and helps you track partial progress.',
            'Editing subtasks: click on a subtask\'s text to edit it in place. Press Enter to save, or Shift+Enter to add a new line within the same subtask. You can also drag subtasks up or down to reorder them.',
            'Three summary cards at the top of the page: Total tasks, Completed today, and Overdue. These give you an instant overview of where things stand without scrolling through the full list.',
            'Editing and deleting: click the pencil icon on any task to open the edit form, or the trash icon to delete it. Deleted tasks cannot be recovered, so the app asks for confirmation before removing one.'
          ],
          tip: 'If you have many tasks, switch to List view — it shows all tasks in one table sorted by due date, making it much easier to see what\'s coming up next. Use Kanban view when you want to drag tasks across stages and see your workflow visually.'
        },
        {
          icon: 'star', title: 'Goals & Dreams', desc: 'This is the page where you track your dreams and long-term goals. You can move each dream forward step by step and see how far you\'ve come. Breaking a big goal into small steps makes progress feel real and achievable.',
          features: [
            'To add a dream, click the "Add Dream" button and type a title. Description, category, target date, emoji, and color are all optional — a title alone is enough to save.',
            'Six fixed categories to choose from: Career, Travel, Health, Education, Personal, and Financial. The category appears as a colored badge on the card so you can group similar goals at a glance.',
            'Each goal can have an emoji, which appears large at the top of the card and gives your dream a visual identity. The color you choose applies to the card\'s border, progress bar, and category badge.',
            'Milestones (steps): when editing a goal, you can add a list of small steps inside it. Each step has its own checkbox. Check them off as you complete them — the progress percentage updates automatically.',
            'The progress percentage is fully automatic. The app calculates it from how many milestones you\'ve completed out of the total. You never need to enter a percentage manually.',
            'To edit a milestone\'s text, click on it and type the new wording. To reorder milestones, drag them up or down using the handle that appears beside each one.',
            'When you set a target date, the card shows how many days remain. If fewer than 30 days are left, that number turns red — making it easy to spot goals that need attention soon.',
            'To reorder your goals, click the lock icon in the top-right corner — this opens edit mode, and each card gets a drag handle. Move the cards into your preferred order, then close the lock.',
            'When all milestones are ticked and progress reaches 100%, a congratulation notification appears on screen.',
            'To edit a goal, click the pencil icon on its card. To delete it, click the trash icon. Deletion is permanent, so the app asks for confirmation first.'
          ],
          tip: 'If a big goal feels overwhelming, add it first with just a title, then open it to break it into smaller steps. Watching the progress bar fill up as you tick each step off is surprisingly motivating.'
        },
        {
          icon: 'wallet', title: 'Budget', desc: 'This is the page where you track your monthly income and expenses. You can see how much money comes in, where it\'s going, and whether you\'re saving or overspending. By setting spending limits per category, you can tell at a glance if you\'re staying within your budget.',
          features: [
            'The page is divided into three tabs: Overview (charts and summary), Categories (your income and expense structure), and Transactions (a complete list of every entry). The app remembers which tab you were on when you return.',
            'The Overview tab shows four summary cards: total income, total expenses, net balance (income minus expenses), and how much budget remains. It also includes charts — a spending breakdown pie chart, a daily spending line chart, and a net balance trend across months.',
            'The Categories tab is where you set up your spending structure. First create a group (for example "Groceries" or "Salary"), then add subcategories inside it. Each subcategory can have a monthly budget limit.',
            'Budget limits: once you set a limit for a subcategory, the page shows how much of it you\'ve used as a percentage. Above 75% the bar turns yellow; above 100% it turns red. The app doesn\'t block you from spending — it just gives you a visual warning.',
            'The Transactions tab lists all your income and expense entries. You can add a new entry with a date, description, category, and amount. Existing entries can be edited or deleted.',
            'To find specific entries, use the text search box to search by description or category name. You can also filter by date range and by category group.',
            'The cycle system: the budget resets each month on a day you choose (default: the 1st). When a new cycle starts, the previous month\'s data is automatically archived — nothing is deleted.',
            'Past cycles: click the history button in the top-right to browse previous months. Each past period shows its total income, expenses, and net result. You can also add or edit transactions in past cycles.',
            'Panel layout: the charts in the Overview tab can be rearranged — click the pencil icon to enter edit mode. You can also hide panels you don\'t use by opening the panel manager in the top-right corner.',
            'Budget-specific backup: the "Import Data" button in the Transactions tab lets you restore only your budget data from a backup file, without affecting any other module (habits, plans, goals, etc.).'
          ],
          tip: 'Start by going to the Categories tab and creating your income and expense groups. You can\'t add transactions until you have at least one category set up. A few simple groups — like "Salary" and "Groceries" — are enough to get started.'
        },
        {
          icon: 'trending-up', title: 'Investments', desc: 'This page lets you track all your investments in one place — stocks, crypto, ETFs, and more. You can see your total portfolio value, profit or loss, and how your assets are spread across different types. Bank savings accounts can also be added here, so you can see the interest building up every day.',
          features: [
            'Six asset types are supported: Stock, ETF, Crypto, Commodity (gold, silver, etc.), Bond, and Cash. For each asset you enter a symbol, name, quantity, purchase price, and date.',
            'To add a new position, click the "Add/Trade" button in the top-right corner and choose "Add New". Later, use "Buy More" to add to an existing position, or "Sell" to record a partial or full sale.',
            'Automatic price updates: once you enter a connection key (Alpha Vantage) in Settings, prices for US-listed stocks, ETFs, and cryptocurrencies will update automatically in the background every 24 hours.',
            'For assets without automatic pricing — Commodity, Bond, Cash, or non-US stocks — you can manually enter the current price by clicking the pencil icon on that asset\'s row in the portfolio table.',
            'Profit and loss tracking: click the column header in the portfolio table to switch between Daily, Weekly, Monthly, or Total gain/loss views. Each asset shows how much it has earned or lost in the selected period.',
            'Currency toggle: view your entire portfolio in your local currency or US Dollars — switch any time with the TRY/USD button in the top-right. The exchange rate updates automatically; you can also type it directly into the "1$=" box in the topbar.',
            'Bank deposit tracking: the "🏦 Deposits" panel at the bottom of the page lets you record term or flexible savings accounts. Enter the bank name, principal, annual interest rate, and start date — the app automatically calculates accrued interest, days remaining, and the final payout at maturity.',
            'Deposit view: use the "Cards / Table" buttons in the top-right corner of the Deposits panel to switch between two layouts. Cards view shows each account as a wide detail card; Table view lines up all the details in columns side by side. The app remembers your last choice.',
            'Drag-and-drop reordering: both the portfolio table and the deposits list support drag-and-drop. Hover over a row, hold the left mouse button, and drag it up or down. The new order saves automatically.',
            'Trade history tab sync: the "Trade History" section has two tabs — "Stocks/ETF" and "Deposits". Whichever one is active when you click the "History" button, that tab opens straight away in the history window. Use the arrow buttons inside to navigate between months.',
            'When you sell an asset, the realized profit or loss is recorded separately. These completed sale results appear in the trade history and are reflected in the portfolio summary cards.',
            'Connection keys are entered in Settings → Investment API Keys. The app works without keys — you just need to update prices manually. Automatic price fetching is a convenience feature, not a requirement.'
          ],
          tip: 'You can use the app without any connection keys: add your assets, enter purchase prices, and update current prices manually when you check them. For the deposits section, enter the interest rate as a yearly figure — for example, type "42" for 42%. The app does the rest, including the daily interest calculation and maturity date.'
        }
      ],
      zh: [
        {
          icon: 'settings', title: '设置', desc: '应用程序的所有外观和行为设置都在这里。点击任意页面左侧菜单底部的齿轮图标即可打开。您所做的更改会立即生效。',
          features: ['语言：选择应用程序的语言 — 土耳其语、英语、中文、西班牙语或法语。所有菜单和文字将以您选择的语言显示。', '货币：选择应用程序中显示的货币符号 — 土耳其里拉 (₺)、美元 ($)、欧元 (€) 等。', '颜色主题：更改应用程序的外观。共有12种颜色主题可供选择 — 深色、浅色和多彩选项。', '文字和内容大小：如果屏幕显得拥挤或文字难以阅读，可使用滑块将所有内容放大或缩小。', '隐私模式：开启后，所有金额将显示为 ••••。当他人在旁时，这个功能可以保护您的财务信息。', '周起始日：选择您的一周从星期一还是星期日开始。这会影响习惯和时间追踪图表的显示方式。', '实时价格更新：在此输入连接密钥，以启用股票、加密货币和汇率价格的自动更新。（仅适用于使用投资功能的用户。）', '备份（导出）：将您的所有数据保存为文件到电脑中。建议定期执行此操作以确保数据安全。', '从备份恢复（导入）：加载您之前保存的备份文件。注意：这将替换您当前的所有数据，且无法撤销。', '删除数据 — 两种选择："重置为示例数据"会删除您的个人数据，应用程序以示例内容重新开始；"清除所有内容"会永久删除所有数据，无法恢复。', '隐藏模块（面板选项卡）：您可以从左侧菜单中移除不使用的页面。您的数据不会被删除 — 只是该页面从菜单中消失。'],
          tip: '请定期使用"导出"按钮备份您的数据。导入备份将替换您当前的数据 — 请务必先导出备份。如果您想重新开始，"重置为示例数据"会给您一个已填入示例内容的全新应用程序。'
        },
        {
          icon: 'layout-dashboard', title: '仪表盘', desc: '在一个屏幕上显示所有功能模块摘要的主页面。您的支出、习惯、目标、锻炼记录等信息汇聚于此。您可以决定哪些内容显示以及如何排列。',
          features: [
            '四个摘要卡片（页面最顶部）：您的净资产、所选时间段的总支出、习惯完成百分比以及活跃目标数量 — 最重要的数据在您打开应用时便一目了然。',
            '时间图表：以折线图的形式显示所选周、月或年内您在各类活动上花费的总分钟数。您可以轻松发现最有效率的日子和空闲较多的时段。',
            '番茄钟区块：您工作专注阶段的简短摘要 — 完成了多少次专注，进入心流状态的分钟数，以及连续坚持的天数。',
            '运动区块：列出您最近两次锻炼的日期、类型和时长。点击任意一次锻炼，即可展开查看您做了哪些具体练习。',
            '预算区块：以横向进度条显示每个支出类别已使用的比例。接近上限的类别会更加醒目，方便您了解钱花在了哪里。',
            '投资区块：通过两个饼图展示您的投资组合分布 — 一个按具体持仓显示，另一个按股票、加密货币、债券等类型分组显示。',
            '梦想与目标区块：所有未完成的目标附带进度条列出，让您一眼看出每个目标进展到了哪里。',
            '即将到来的计划区块：未来7天内到期的任务和所有逾期事项列于此处，确保您不会遗漏任何事情。',
            '时间段选择器（右上角）：在"本周"、"本月"和"本年"之间切换，以改变摘要卡片和图表所覆盖的时间范围。',
            '重新排列区块：点击右上角的锁定图标，各区块会出现虚线边框 — 在此模式下，您可以抓住任意区块拖到您喜欢的位置。再次点击锁定图标即可保存并退出。',
            '哪些区块显示？进入"设置"→"面板"选项卡，可以隐藏您不使用的区块。隐藏后，该区块将从仪表盘和左侧菜单中消失。您的数据不会被删除 — 随时可以重新开启。'
          ],
          tip: '将您最常查看的信息移至顶部。如果您主要追踪预算和目标，可以隐藏运动和番茄钟区块，让界面更加简洁。随时可以在"设置"→"面板"中恢复它们。'
        },
        {
          icon: 'timer', title: '专注模式', desc: '用于记录工作时间的计时页面。提供三种不同的工作方式：经典番茄钟循环、无时限的自由计时，以及自定义倒计时。每次完成的工作阶段都会自动添加到时间追踪页面。',
          features: [
            '番茄钟模式：以25分钟工作+5分钟短暂休息的节奏循环进行。完成四个工作阶段后，自动开始15分钟的长休息。您可以在页面顶部的设置面板中随意更改这些时长。',
            '心流模式：从零开始向上计数、没有时间限制的秒表。当您想记录工作时长但不希望被固定时间约束时使用。',
            '倒计时模式：由您自己设定小时、分钟和秒数。时间结束时会发出提醒声，计时器随即归零。',
            '关联任务：开始之前，您可以从今天的任务列表中选择一项任务。任务名称会显示在计时屏幕上，您花费的时间将记录到该任务下。',
            '子任务面板：所选任务的步骤会显示在屏幕左侧。您可以在不离开计时页面的情况下逐一勾选完成的步骤。结束工作阶段时，剩余步骤会自动标记为已完成。',
            '标记按钮：在计时器运行过程中点击标记，即可在当前时刻打下一个"书签"。每个标记都会记住打标时的时刻和已用时长。您随后可以选择保存到标记处或回退到标记处继续。',
            '重置按钮 — 三个选项：(1)"保存到最后标记并停止" — 最后一个标记之前的时间被保存，其余部分丢弃；(2)"回退到最后标记并继续" — 计时器跳回最后一个标记处，您可以从那里继续；(3)"完全重置" — 不保存任何内容，计时器回到起点。',
            '完成按钮：结束工作阶段并将时间保存到时间追踪页面。如果打过标记，还可以选择只保存到最后一个标记处。',
            '超时模式：番茄钟时间结束后，计时器不会停止，而是继续以 +01:23 的形式显示超出的时间，并变为黄色。当您准备好结束时，按下"完成"即可。',
            '关闭标签不会丢失进度：即使关闭浏览器或标签页，计时器状态也会保存长达8小时。重新打开页面后，可以从上次离开的地方继续。',
            '全屏模式：点击右上角的图标，左侧菜单和顶部工具栏会隐藏，只留下计时器。适合需要深度专注时使用。全屏下还可以在底部打开一个信息栏，显示今日总工作时长和连续坚持天数。'
          ],
          tip: '开始前先选择一项任务 — 这样您的时间会自动关联到正在做的事情上。使用标记按钮就像在工作途中设置检查点：它让您在不停止计时的情况下记录一个时刻，方便之后保存或回退。'
        },
        {
          icon: 'clock', title: '时间追踪', desc: '记录您每天在各类活动上花费了多少时间的页面。专注模式中完成的工作阶段会自动添加到这里；您也可以随时手动输入记录。每日、每周和每月图表帮助您清楚地看到时间花在了哪里。',
          features: [
            '顶部三个摘要卡片：今天记录了多少分钟、本周总计和本月总计 — 最重要的数据一目了然。',
            '手动添加记录：点击右上角的"添加记录"按钮。填写日期、类别（工作、学习、运动、社交、睡眠或其他）、可选的项目名称，以及开始和结束时间，时长会自动计算。',
            '来自专注模式的自动记录：每次完成番茄钟或心流工作阶段后，记录会自动添加到这个页面。这些记录在表格中会显示一个小小的"自动"标签，方便与手动记录区分。',
            '筛选记录：表格上方的按钮可以在"全部"、"仅手动"和"仅自动"之间切换。您选择的筛选条件在关闭页面后仍会保留。',
            '日期范围筛选：点击日历图标，选择开始和结束日期，只查看该时间段内的记录。清除筛选条件即可回到完整列表。',
            '30天趋势图：显示过去三十天中每天记录的分钟数。一眼便能看出您最活跃的日子和较为清闲的时段。',
            '每周分布图：将最近七天逐一对比。快速了解一周中哪些天您通常最高效。',
            '编辑和删除记录：表格中每条记录旁都有铅笔图标（编辑）和垃圾桶图标（删除）。删除时会弹出确认提示；勾选"今天不再询问"后，当天的后续删除操作将不再弹出确认窗口。',
            '月度历史：点击右上角的"历史"按钮即可浏览过去的月份。用箭头按钮在月份之间切换。"概览"标签显示月度图表和每周汇总；"记录"标签按天列出所有条目。每个月顶部可以看到当月的活跃天数、每日平均时长以及花费时间最多的类别。'
          ],
          tip: '如果您经常使用专注模式，记录就已经自动进来了。切换到"仅手动"筛选可以只查看您手动输入的内容，选择"仅自动"则可以专门回顾您的番茄钟和心流工作阶段。'
        },
        {
          icon: 'check-circle', title: '习惯', desc: '记录您每天想做的事情的页面。随着您完成习惯，您会建立连续记录，并可以直观地回顾自己的进步。您可以设置每天重复的习惯，也可以设置只在一周中特定日子出现的习惯。',
          features: [
            '两种习惯类型："每天"习惯每天早上都会出现在您的列表中。"特定日期"习惯只在您选择的日子显示——例如周一到周五——在其他日子完全不显示，因此那些日子不会影响您的连续记录。',
            '添加习惯：输入名称，可选择添加表情符号和颜色，然后选择是每天还是特定日期的习惯。应用程序会根据您输入的内容自动推荐合适的表情符号。',
            '每日列表分为三个部分：尚未完成的习惯在顶部，已完成的在中间，今天跳过的在底部。标题中的计数器（如"3 / 5"）显示您完成了多少项。',
            '跳过按钮：点击任意习惯旁的小减号图标，即可将其标记为今天跳过。关键是：跳过不会中断连续记录。身体不适或确实没有时间的日子里可以放心使用。如果改变主意，点击循环箭头图标即可撤销跳过。',
            '🔥 连续记录计数器：显示您连续完成某个习惯的天数。某天未完成则连续记录归零——但跳过的日子不计入其中。对于特定日期的习惯，只有指定的日子才会计入；其他日子完全不影响连续记录。',
            '30天进度网格：以小方格的形式显示每个习惯过去三十天的情况。完成的日子用该习惯的颜色填充，未完成的日子保持空白。今天的方格有蓝色边框以突出显示。每行开头显示完成百分比。',
            '每周图表：一周中每天都有一个小圆形图表，显示当天完成习惯的比例。旁边还有整周的汇总图表。',
            '三个摘要卡片：今天完成了多少习惯、本周的平均完成率，以及所有习惯中最长的连续记录——显示在页面底部。',
            '重新排列顺序：按住每日列表中的某个习惯并拖动到您想要的位置，新顺序会自动保存。',
            '编辑和删除：点击右上角的"管理"按钮，弹出窗口列出所有习惯；点击铅笔图标可以编辑，点击垃圾桶图标可以删除。删除操作同时会删除该习惯的所有历史记录，且无法撤销。'
          ],
          tip: '保持连续记录不需要每天都做——使用"特定日期"类型，只追踪有意义的日子。如果某天真的无法完成，点击"跳过"而不是让它变成未完成：这样既保留了您的连续记录，也减少了一项未完成任务带来的压力。'
        },
        {
          icon: 'dumbbell', title: '健身', desc: '您的训练日记。每次锻炼后记录所做的内容，通过图表追踪随时间的进步，并让应用自动整理您的个人最佳记录。支持力量训练、有氧运动及其他所有类型的锻炼。',
          features: [
            '添加训练：点击"添加训练"。选择日期、持续时间（分钟）和训练类型。共有六种类型可选：力量、有氧、柔韧、CrossFit、运动和其他。您还可以添加备注和1到10的难度评级。',
            '记录练习：在训练表单底部逐一添加每个练习。力量训练需填写练习名称、肌肉群、组数、次数和重量；有氧训练则填写时长和距离（千米）。表单会根据您选择的训练类型自动调整。',
            '模板：如果您经常遵循相同的训练计划，只需保存一次，以后每次点击一下即可加载。填写好训练表单后，点击"另存为模板"并命名。下次从"加载模板"菜单中选择，所有练习将自动填入。',
            '个人最佳记录面板：对于您曾经记录过的每一个练习，应用会自动追踪您举过的最重重量及日期。它还会根据您的组数和次数计算估算的单次最大重量。',
            '身体测量：您可以按日期记录六项测量数据：体重、体脂率、腰围、胸围、手臂围和腿围。您的体重随时间的变化会以图表形式显示。',
            '训练频率图：显示过去八周中每周进行了多少次训练。一眼便能看出您的训练是否规律，或者是否存在空缺。',
            '训练量图：显示过去八周每周移动的总重量（组数 × 次数 × 重量）。帮助您了解训练强度是否随时间增长。',
            '肌肉群图表和练习进步追踪：饼图显示您训练了哪些肌肉群以及各占多少比例。您还可以从菜单中选择特定练习，查看该练习重量随时间变化的曲线图。',
            '训练历史卡片：您记录的每次训练都以卡片形式显示，包含日期、类型、时长和练习摘要。点击任意卡片即可打开并编辑。',
            'kg / lb 切换：使用右上角的按钮在千克和磅之间切换。所有重量、图表和个人最佳记录将自动转换。',
            '面板管理：点击右上角的网格图标，选择哪些面板可见。使用锁定图标可拖动面板以改变排列顺序或调整显示宽度。'
          ],
          tip: '对于固定的训练计划使用模板，这样就不必每次从头重新输入练习了。另外，经常查看个人最佳记录面板——看到上次的最重记录是设定下次目标的简单而有效的方式。'
        },
        {
          icon: 'kanban', title: '计划', desc: '这是您追踪所有待办事项的任务管理页面。任务分为三个阶段进行管理——待办、进行中和已完成——让您随时掌握哪些事项待处理、哪些正在进行、哪些已经完成。',
          features: [
            '两种视图可选：看板视图将任务分三列并排显示（待办、进行中、已完成），让您一目了然地掌握整体工作量。列表视图则将所有任务按截止日期排成一张表格——任务较多时更便于查看截止日期。',
            '添加任务：点击"添加任务"按钮并填写标题。您也可以设置截止日期、优先级、类别和备注，但这些都是可选的——仅填写标题也可以保存。',
            '七个固定类别，按生活领域整理任务：工作、学习、个人、健康、财务、家庭和其他。每个类别都有专属颜色标签，一眼即可区分。',
            '优先级颜色：高优先级任务标为红色，中等为黄色，低等为蓝色。当任务列表很长时，优先级帮助您决定先处理哪些事项。',
            '推进任务：在看板视图中，您可以将任务卡片拖到下一列，也可以点击卡片上的箭头按钮使其前进一个阶段。在列表视图中，直接点击状态标签即可更改。',
            '逾期任务：截止日期已过的任务会以红色突出显示，让您无需翻找即可快速发现需要立即处理的事项。',
            '子任务：编辑任务时，可以在其中添加一系列小步骤，每个子任务都有自己的复选框。将大任务拆解为小步骤，不仅让任务更易于着手，也便于追踪部分进度。',
            '编辑子任务：点击子任务文字即可直接在原处编辑。按回车保存，按Shift+回车可在同一子任务内换行。您也可以拖动子任务上下调整顺序。',
            '页面顶部三张摘要卡片：总任务数、今日完成数和逾期数。无需翻阅完整列表，即可快速了解当前任务状态。',
            '编辑与删除：点击任意任务的铅笔图标打开编辑表单，点击垃圾桶图标删除任务。删除操作不可恢复，应用会在删除前要求您确认。'
          ],
          tip: '任务较多时，切换到列表视图——所有任务按截止日期排列在一张表格中，更容易看清哪些事项即将到期。如果您想通过拖拽操作推进任务、直观查看工作流程，则使用看板视图更为合适。'
        },
        {
          icon: 'star', title: '梦想与目标', desc: '这是您追踪梦想和长期目标的页面。您可以一步一步地推进每个梦想，随时查看自己走了多远。将大目标拆解为小步骤，会让进步变得真实可感、更易实现。',
          features: [
            '点击"添加梦想"按钮并输入标题即可新建目标。描述、类别、目标日期、表情符号和颜色均为可选项——仅填写标题即可保存。',
            '六个固定类别供您选择：职业、旅行、健康、教育、个人和财务。类别以彩色标签的形式显示在卡片上，让您一眼就能将相似的目标归类。',
            '每个目标都可以设置一个表情符号，它会以较大的尺寸显示在卡片顶部，为您的梦想赋予视觉形象。您选择的颜色将应用于卡片边框、进度条和类别标签。',
            '里程碑（步骤）：编辑目标时，可以在其中添加一系列小步骤，每个步骤都有自己的复选框。完成时逐一勾选——进度百分比会自动更新。',
            '进度百分比完全自动计算。系统根据您已完成的里程碑数量占总数的比例来计算进度，无需手动输入任何数字。',
            '要编辑里程碑的文字，直接点击文字进行修改。要调整里程碑的顺序，通过旁边的拖拽手柄上下拖动即可。',
            '设置目标日期后，卡片上会显示剩余天数。若少于30天，该数字会变为红色，便于您快速发现需要重点关注的目标。',
            '要调整目标顺序，点击右上角的锁定图标进入编辑模式，每张卡片上会出现拖拽手柄。将卡片拖到您喜欢的位置后，关闭锁定即可保存。',
            '当所有里程碑全部勾选、进度达到100%时，屏幕上会出现祝贺通知。',
            '点击卡片上的铅笔图标可编辑目标，点击垃圾桶图标可删除目标。删除操作不可恢复，应用会在删除前要求您确认。'
          ],
          tip: '如果一个大目标让您感到无从下手，可以先只填写标题将其添加进来，再打开编辑页面将其拆解为小步骤。随着每个步骤被逐一勾选，看着进度条慢慢填满，会带来意想不到的成就感与动力。'
        },
        {
          icon: 'wallet', title: '预算', desc: '这是您追踪每月收入和支出的页面。您可以清晰了解资金的来源与去向，以及是否有所结余。通过为每个类别设定支出限额，您能一眼判断自己是否在预算范围内消费。',
          features: [
            '页面分为三个标签页：概览（图表与摘要信息）、分类（收支结构管理）和交易记录（所有条目列表）。切换到任一标签页后，刷新页面时应用会记住您上次停留的位置。',
            '概览标签页展示四张摘要卡片：总收入、总支出、净余额（收入减支出）和剩余可用预算。同时提供多个图表——支出分类饼图、每日支出折线图，以及各月净余额走势图。',
            '分类标签页是搭建您收支结构的地方。首先创建一个分类组（例如"购物"或"工资"），然后在其下添加子类别。每个子类别都可以设定月度预算限额。',
            '预算限额：为子类别设定限额后，页面会以百分比形式显示当月已使用的比例。超过75%时进度条变为黄色，超过100%则变为红色。应用不会阻止您继续消费，只提供视觉提醒。',
            '交易记录标签页列出所有收入和支出条目。您可以通过日期、描述、类别和金额添加新记录，也可以对现有记录进行编辑或删除。',
            '查找特定记录时，可在搜索框中输入描述或类别名称进行文字搜索，也可通过日期范围和类别组进行筛选。',
            '周期系统：预算在您选定的每月某天自动重置（默认为每月1日）。新周期开始时，上一个月的数据会自动归档，不会被删除。',
            '历史周期：点击右上角的历史按钮，即可查看以往每个月的数据。每个历史周期显示总收入、总支出和净差额。您还可以在历史周期中添加或编辑交易记录。',
            '面板布局：概览标签页中的图表面板可以自由排列——点击铅笔图标进入编辑模式。您也可以通过右上角的面板管理器隐藏不常用的面板。',
            '预算专属备份：交易记录标签页中的"导入数据"按钮可从备份文件中单独恢复预算数据，不会影响其他模块（习惯、计划、目标等）的内容。'
          ],
          tip: '入门时，建议先前往分类标签页创建收入和支出分类组。没有类别就无法添加交易记录。从简单的几个分类开始即可——例如"工资"和"购物"，足以迈出第一步。'
        },
        {
          icon: 'trending-up', title: '投资', desc: '这是您在一处追踪所有投资的页面——股票、加密货币、ETF等一应俱全。您可以查看投资组合总价值、盈亏情况以及各类资产的比例分布。银行储蓄账户也可以在此添加，每天自动计算利息增长。',
          features: [
            '支持六种资产类型：股票、ETF、加密货币、大宗商品（黄金、白银等）、债券和现金。添加每类资产时，需输入代码、名称、数量、买入价格和日期。',
            '要添加新持仓，点击右上角的"买入/卖出"按钮，选择"新增"。之后，使用"继续买入"可加仓现有资产，使用"卖出"可记录部分或全部卖出操作。',
            '自动价格更新：在设置中填入连接密钥（Alpha Vantage）后，美国上市的股票、ETF及加密货币价格将在后台每24小时自动更新一次。',
            '对于不支持自动报价的资产——大宗商品、债券、现金或非美国上市股票——您可以点击投资组合表格中该资产行的铅笔图标，手动输入当前价格。',
            '盈亏追踪：点击投资组合表格的列标题，可在日/周/月/总计盈亏视图之间切换，直观了解每项资产在所选时间段内的收益或亏损情况。',
            '货币切换：通过右上角的TRY/USD按钮，随时以本地货币或美元查看整个投资组合。汇率自动更新，也可在顶栏的"1$="输入框中手动填写。',
            '银行存款追踪：页面底部的"🏦 存款"面板可记录定期或活期储蓄账户。输入银行名称、本金、年利率和起始日期，应用将自动计算已累积利息、剩余天数以及到期时的最终收益。',
            '存款视图：使用存款面板右上角的"卡片 / 表格"按钮，可在两种布局之间切换。卡片视图将每个账户以宽幅详情卡展示；表格视图则将所有信息整齐排列在并排的列中。应用会记住您上次的选择。',
            '拖拽排序：投资组合表格和存款列表均支持拖拽排序。将鼠标悬停在某行上，按住左键向上或向下拖动，松开后新顺序自动保存。',
            '交易记录标签同步："交易记录"板块分为"股票/ETF"和"存款"两个标签。点击"历史"按钮时，当前激活的标签会在历史窗口中直接显示。在历史窗口内可通过箭头按钮按月浏览。',
            '每次卖出时，已实现的盈利或亏损会单独记录，并在交易记录中显示，同时反映在投资组合摘要卡片中。',
            '连接密钥在设置 → 投资API密钥中填写。即使没有密钥，应用同样可以使用——只需手动更新价格即可。自动价格更新是额外的便捷功能，而非必要前提。'
          ],
          tip: '无需任何连接密钥即可开始使用：添加资产、输入买入价格，并在查看时手动更新当前价格。添加存款账户时，请以年利率形式输入利率（例如42%利率输入"42"）。应用会自动完成其余计算，包括每日利息和到期日期。'
        }
      ],
      es: [
        {
          icon: 'settings', title: 'Configuración', desc: 'Todos los ajustes de apariencia y comportamiento de la aplicación están aquí. Haz clic en el icono de engranaje en la parte inferior del menú izquierdo en cualquier página para abrirlo. Los cambios se aplican de inmediato.',
          features: ['Idioma: Elige el idioma de la aplicación — turco, inglés, chino, español o francés. Todos los menús y textos aparecerán en el idioma que elijas.', 'Moneda: Elige qué símbolo de moneda se muestra en toda la aplicación — lira turca (₺), dólar ($), euro (€) y más.', 'Tema de color: Cambia el aspecto visual de la aplicación. Hay 12 temas de color disponibles — opciones oscuras, claras y coloridas.', 'Tamaño del texto y los elementos: Si la pantalla se ve recargada o el texto es difícil de leer, usa el deslizador para agrandar o reducir todo.', 'Modo privacidad: Cuando está activado, todos los importes de dinero se muestran como ••••. Muy útil cuando otras personas están cerca y no quieres que vean tus cifras.', 'Día de inicio de semana: Elige si tu semana empieza el lunes o el domingo. Esto cambia cómo se ven los gráficos de hábitos y seguimiento de tiempo.', 'Actualización de precios en tiempo real: Introduce aquí las claves de conexión para activar las actualizaciones automáticas de precios de acciones, criptomonedas y tipos de cambio. (Solo necesario si usas la sección de Inversiones.)', 'Copia de seguridad (Exportar): Guarda todos tus datos como un archivo en tu computadora. Te recomendamos hacerlo regularmente para mantener tus datos seguros.', 'Restaurar desde copia de seguridad (Importar): Carga un archivo de copia de seguridad que guardaste antes. Importante: esto reemplaza todos tus datos actuales y no se puede deshacer.', 'Eliminar datos — dos opciones: "Restablecer a datos de ejemplo" elimina tus datos personales y reinicia la aplicación con contenido de ejemplo listo para usar; "Borrar todo" elimina permanentemente todos los datos sin posibilidad de recuperación.', 'Ocultar secciones (pestaña Paneles): Puedes quitar del menú izquierdo las páginas que no uses. Tus datos no se eliminan — solo esa página deja de aparecer en el menú.'],
          tip: 'Usa el botón "Exportar" regularmente para hacer copias de seguridad. Importar una copia reemplazará todos tus datos actuales — exporta siempre una copia primero. Si quieres empezar de cero, "Restablecer a datos de ejemplo" te da una aplicación limpia con contenido de ejemplo ya incluido.'
        },
        {
          icon: 'layout-dashboard', title: 'Inicio', desc: 'La pantalla principal que muestra un resumen de todas las secciones en un solo lugar. Tus gastos, hábitos, metas, entrenamientos y más, todo visible de un vistazo. Tú decides qué secciones aparecen y en qué orden.',
          features: [
            'Cuatro tarjetas de resumen (en la parte superior): Tu patrimonio neto, el gasto total del período seleccionado, el porcentaje de hábitos completados y el número de metas activas — los datos más importantes te esperan nada más abrir la app.',
            'Gráfico de tiempo: Muestra en minutos cuánto tiempo dedicaste a actividades durante la semana, mes o año seleccionado. Puedes identificar fácilmente tus días más productivos y los períodos más tranquilos.',
            'Sección Pomodoro: Un breve resumen de tus sesiones de trabajo — cuántas sesiones completaste, cuántos minutos estuviste en concentración profunda y cuántos días seguidos llevas.',
            'Sección Gimnasio: Lista tus dos últimos entrenamientos con fecha, tipo y duración. Haz clic en cualquier entrenamiento para desplegarlo y ver exactamente qué ejercicios hiciste.',
            'Sección Presupuesto: Muestra cuánto has gastado de cada categoría mediante barras horizontales. Las categorías casi llenas destacan para que veas de un vistazo dónde va tu dinero.',
            'Sección Inversiones: Muestra la distribución de tu cartera en dos gráficos circulares — uno con cada posición individual y otro agrupado por tipo: acciones, cripto, bonos, etc.',
            'Sección Metas: Todas las metas sin terminar aparecen con barras de progreso para que veas de un vistazo cuánto has avanzado en cada una.',
            'Sección Planes próximos: Las tareas con fecha límite en los próximos 7 días y cualquier asunto pendiente vencido aparecen aquí para que no se te escape nada.',
            'Selector de período (esquina superior derecha): Cambia entre "Esta Semana", "Este Mes" y "Este Año" para ajustar el rango de tiempo que cubren las tarjetas y los gráficos.',
            'Reorganizar secciones: Haz clic en el icono de candado (arriba a la derecha). Las secciones mostrarán un borde discontinuo — en este modo puedes arrastrar cualquier sección a donde quieras. Vuelve a hacer clic en el candado para guardar y salir.',
            '¿Qué secciones se muestran? Ve a Configuración → pestaña Paneles para ocultar las secciones que no usas. Al ocultarlas, desaparecen del inicio y del menú izquierdo. Tus datos no se eliminan — se pueden volver a mostrar en cualquier momento.'
          ],
          tip: 'Mueve la información que consultas con más frecuencia hacia arriba. Si principalmente sigues el presupuesto y las metas, puedes ocultar las secciones de gimnasio y pomodoro para una vista más limpia. Puedes recuperarlas cuando quieras desde Configuración → Paneles.'
        },
        {
          icon: 'timer', title: 'Modo Concentración', desc: 'La página del temporizador que mide y registra tus sesiones de trabajo. Ofrece tres formas diferentes de trabajar: ciclos Pomodoro clásicos, un cronómetro libre sin límite de tiempo y una cuenta regresiva personalizada. Cada sesión completada se añade automáticamente a la página de Seguimiento de Tiempo.',
          features: [
            'Modo Pomodoro: Trabaja en intervalos de 25 minutos seguidos de 5 minutos de descanso corto. Tras cuatro sesiones, comienza un descanso largo de 15 minutos. Puedes cambiar todas estas duraciones desde el panel de ajustes en la parte superior de la página.',
            'Modo Flow (flujo): Un cronómetro que cuenta hacia arriba desde cero sin límite de tiempo. Úsalo cuando quieras registrar cuánto trabajas sin estar limitado a un intervalo fijo.',
            'Modo cuenta regresiva: Tú mismo introduces las horas, minutos y segundos. Cuando el tiempo se acaba, suena una alerta y el temporizador se reinicia.',
            'Vincular a una tarea: Antes de empezar, puedes elegir una de las tareas de hoy de una lista. El nombre de la tarea aparece en la pantalla del temporizador y el tiempo que dediques quedará registrado en esa tarea.',
            'Panel de subtareas: Los pasos de la tarea seleccionada aparecen en el lado izquierdo de la pantalla. Puedes marcarlos como completados uno a uno sin salir del temporizador. Al terminar la sesión, los pasos que queden se marcan como completados automáticamente.',
            'Botón de marca: Pulsa la bandera mientras el temporizador corre para marcar el momento actual, como poner un marcador en el tiempo. Cada marca recuerda la hora exacta y el tiempo transcurrido. Después puedes guardar hasta esa marca o volver a ella.',
            'Botón Reiniciar — tres opciones: (1) "Guardar hasta la última marca y parar" — se guarda todo hasta la última marca y se descarta el resto; (2) "Volver a la última marca y continuar" — el temporizador salta a tu última marca para que puedas seguir desde allí; (3) "Empezar de cero" — no se guarda nada y el temporizador vuelve al principio.',
            'Botón Finalizar: Termina la sesión y guarda tu tiempo en la página de Seguimiento de Tiempo. Si pusiste marcas, también tienes la opción de guardar solo hasta la última.',
            'Modo horas extra: Cuando el tiempo del Pomodoro se acaba, el temporizador no se detiene; sigue mostrando el tiempo extra como +01:23 en amarillo. Pulsa Finalizar cuando estés listo para terminar.',
            'No se pierde si cierras la pestaña: Tu temporizador se guarda durante hasta 8 horas aunque cierres el navegador o la pestaña. Al volver, retoma justo donde lo dejaste.',
            'Modo pantalla completa: Haz clic en el icono de la esquina superior derecha para ocultar el menú y la barra superior, dejando solo el temporizador en pantalla. Ideal para concentrarse al máximo. En pantalla completa también puedes abrir una pequeña barra de información en la parte inferior que muestra el tiempo total trabajado hoy y tu racha de días.'
          ],
          tip: 'Selecciona una tarea antes de empezar — así tu tiempo se vincula automáticamente a lo que estás haciendo. Usa el botón de marca como un punto de control a mitad de sesión: te permite marcar un momento sin parar, para luego guardar hasta allí o retroceder si lo necesitas.'
        },
        {
          icon: 'clock', title: 'Seguimiento de Tiempo', desc: 'La página donde registras cuánto tiempo dedicas a tus actividades del día. Las sesiones del Modo Concentración se añaden aquí de forma automática; también puedes introducir registros manualmente cuando quieras. Los gráficos diarios, semanales y mensuales te ayudan a ver con claridad en qué empleas tu tiempo.',
          features: [
            'Tres tarjetas de resumen en la parte superior: cuántos minutos registraste hoy, el total de la semana y el total del mes — los datos más importantes a la vista nada más entrar.',
            'Añadir un registro manualmente: haz clic en el botón "Añadir registro" en la esquina superior derecha. Rellenas la fecha, una categoría (Trabajo, Aprendizaje, Ejercicio, Social, Sueño u Otros), un nombre de proyecto opcional, y la hora de inicio y fin. La duración se calcula sola.',
            'Registros automáticos del Modo Concentración: cada vez que terminas una sesión Pomodoro o de flujo, se añade a esta página de forma automática. Estos registros aparecen en la tabla con una pequeña etiqueta "Automático" para distinguirlos de los manuales.',
            'Filtrar registros: los botones encima de la tabla te permiten cambiar entre "Todos", "Solo manuales" y "Solo automáticos". El filtro que elijas se recuerda aunque cierres la página.',
            'Filtro por rango de fechas: haz clic en el icono de calendario para elegir una fecha de inicio y fin y ver solo los registros de ese período. Borra el filtro para volver a la lista completa.',
            'Gráfico de tendencia de 30 días: muestra cuántos minutos registraste en cada uno de los últimos treinta días. De un vistazo puedes distinguir tus días más activos y los momentos de menor actividad.',
            'Gráfico de distribución semanal: compara los últimos siete días uno a uno. Una forma rápida de ver en qué días de la semana sueles rendir más.',
            'Editar y eliminar registros: cada fila de la tabla tiene un icono de lápiz para editarla y uno de papelera para borrarla. Al eliminar se pide confirmación; si marcas "No preguntar más hoy", no volverá a aparecer el aviso durante el resto del día.',
            'Historial mensual: haz clic en el botón "Historial" en la esquina superior derecha para explorar meses anteriores. Usa las flechas para moverte entre meses. La pestaña "Resumen" muestra un gráfico mensual y totales semanales; la pestaña "Registros" lista todas las entradas día a día. En la parte superior de cada mes puedes ver los días activos, tu promedio diario y la categoría a la que más tiempo dedicaste.'
          ],
          tip: 'Si usas el Modo Concentración con regularidad, tus registros ya llegan solos. Cambia al filtro "Solo manuales" para ver únicamente lo que introdujiste a mano, o elige "Solo automáticos" para revisar exclusivamente tus sesiones Pomodoro y de flujo.'
        },
        {
          icon: 'check-circle', title: 'Hábitos', desc: 'La página donde llevas el seguimiento de las cosas que quieres hacer cada día. A medida que completas hábitos construyes rachas y puedes revisar tu progreso visualmente. Puedes definir hábitos que se repiten todos los días o que solo aparecen ciertos días de la semana.',
          features: [
            'Dos tipos de hábito: los de "Todos los días" aparecen en tu lista cada mañana. Los de "Días específicos" solo se muestran en los días que elegiste — por ejemplo de lunes a viernes — y desaparecen completamente los demás días, sin afectar tu racha en absoluto.',
            'Añadir un hábito: escribe un nombre, elige opcionalmente un emoji y un color, y luego selecciona si es de todos los días o de días específicos. La aplicación sugiere automáticamente un emoji adecuado según lo que escribas.',
            'La lista diaria tiene tres secciones: los hábitos que aún no has hecho arriba, los completados en el medio y los que has omitido ese día abajo. Un contador como "3 / 5" en el encabezado muestra cuántos has terminado.',
            'Botón de omitir: haz clic en el pequeño icono de menos junto a cualquier hábito para marcarlo como omitido hoy. Lo importante es que omitir no rompe tu racha. Úsalo sin preocupación los días que estés enfermo o que de verdad no puedas. Si cambias de opinión, haz clic en el icono de flecha circular para deshacer la omisión.',
            '🔥 Contador de racha: muestra cuántos días seguidos has completado un hábito. Si fallas un día la racha se reinicia — pero los días que omitiste no cuentan en tu contra. En los hábitos de días específicos, solo se cuentan los días asignados; el resto de la semana no afecta la racha en absoluto.',
            'Cuadrícula de progreso de 30 días: muestra los últimos treinta días como pequeños cuadrados para cada hábito. Los días completados se rellenan con el color de ese hábito; los días no completados quedan vacíos. El cuadrado de hoy tiene un borde azul para destacar. Al inicio de cada fila se muestra el porcentaje de cumplimiento.',
            'Gráficos semanales: aparece un pequeño gráfico circular para cada día de la semana, mostrando qué proporción de tus hábitos completaste ese día. Junto a ellos hay un gráfico resumen de toda la semana.',
            'Tres tarjetas de resumen: cuántos hábitos completaste hoy, tu porcentaje de cumplimiento promedio de la semana y la racha más larga entre todos tus hábitos — mostradas en la parte inferior de la página.',
            'Reordenar: mantén pulsado un hábito en la lista diaria y arrástralo a donde quieras. El nuevo orden se guarda automáticamente.',
            'Editar y eliminar: haz clic en el botón "Gestionar" en la esquina superior derecha. Una ventana lista todos tus hábitos; usa el icono de lápiz para editar o el de papelera para eliminar. Eliminar también borra todos los registros históricos de ese hábito y no se puede deshacer.'
          ],
          tip: 'No necesitas hacerlo todos los días para mantener una racha — usa el tipo "Días específicos" para rastrear solo los días que tienen sentido. Y si un día de verdad no puedes con un hábito, usa Omitir en lugar de dejarlo sin hacer: así mantienes tu racha intacta y eliminas la presión de tener una tarea pendiente.'
        },
        {
          icon: 'dumbbell', title: 'Gimnasio', desc: 'Tu diario de entrenamiento. Registra lo que haces después de cada sesión, sigue tu progreso a lo largo del tiempo con gráficas y deja que la aplicación lleve automáticamente un registro de tus mejores marcas personales. Compatible con entrenamiento de fuerza, cardio y cualquier otro tipo de ejercicio.',
          features: [
            'Añadir un entrenamiento: haz clic en "Añadir entrenamiento". Elige la fecha, cuánto duró en minutos y el tipo. Hay seis tipos disponibles: Fuerza, Cardio, Flexibilidad, CrossFit, Deporte y Otros. También puedes añadir notas y un nivel de dificultad del 1 al 10.',
            'Registrar ejercicios: en la parte inferior del formulario añades cada ejercicio uno a uno. Para entrenamientos de fuerza introduces el nombre del ejercicio, el grupo muscular, cuántas series, cuántas repeticiones y cuánto peso. Para cardio introduces la duración y la distancia en kilómetros. El formulario se ajusta automáticamente según el tipo que hayas elegido.',
            'Plantillas: si sigues el mismo plan de entrenamiento con frecuencia, guárdalo una vez y cárgalo con un solo clic cada vez. Rellena el formulario de entrenamiento, pulsa "Guardar como plantilla" y ponle un nombre. La próxima vez, selecciónala en el menú "Cargar plantilla" y todos tus ejercicios se rellenarán solos.',
            'Panel de marcas personales: para cada ejercicio que hayas registrado, la aplicación lleva automáticamente el seguimiento del mayor peso que hayas levantado y la fecha en que lo hiciste. También calcula tu estimación de una repetición máxima — el mayor peso que teóricamente podrías levantar una sola vez — basándose en tus series y repeticiones.',
            'Medidas corporales: puedes registrar seis medidas con fecha: peso corporal, porcentaje de grasa corporal, cintura, pecho, brazo y pierna. El cambio de tu peso corporal a lo largo del tiempo se muestra como una gráfica.',
            'Gráfica de frecuencia de entrenamientos: muestra cuántas sesiones hiciste en cada una de las últimas ocho semanas. Un vistazo rápido para ver si estás entrenando de forma constante o si hay semanas sin actividad.',
            'Gráfica de volumen: muestra el peso total que moviste cada semana durante las últimas ocho semanas (series × repeticiones × peso). Te ayuda a ver si la intensidad de tu entrenamiento está aumentando con el tiempo.',
            'Gráfica de grupos musculares y progreso por ejercicio: un gráfico circular muestra qué grupos musculares has trabajado y cuánto. También puedes elegir un ejercicio concreto del menú para ver una gráfica de cómo ha aumentado tu peso en ese ejercicio a lo largo del tiempo.',
            'Historial de entrenamientos: cada entrenamiento registrado aparece como una tarjeta con la fecha, el tipo, la duración y un resumen de ejercicios. Haz clic en cualquier tarjeta para abrirla y editarla.',
            'Cambio de unidades kg / lb: usa el botón en la esquina superior derecha para cambiar entre kilogramos y libras. Todos los pesos, gráficas y marcas personales se convierten automáticamente.',
            'Gestión de paneles: haz clic en el icono de cuadrícula en la esquina superior derecha para elegir qué paneles son visibles. Usa el icono de candado para arrastrar paneles a un orden diferente o ajustar su ancho en pantalla.'
          ],
          tip: 'Usa las plantillas para tus sesiones habituales y así no tendrás que volver a introducir los mismos ejercicios desde cero. Además, consulta el panel de marcas personales con frecuencia — ver tu récord anterior de peso es una forma sencilla y efectiva de fijarte un objetivo para la próxima sesión.'
        },
        {
          icon: 'kanban', title: 'Planes', desc: 'Esta es tu página de gestión de tareas donde puedes llevar el seguimiento de todo lo que necesitas hacer. Las tareas avanzan por tres etapas — Pendiente, En Progreso y Completado — para que siempre sepas qué está pendiente, en qué estás trabajando y qué ya terminaste.',
          features: [
            'Dos vistas a elegir: la vista Kanban organiza tus tareas en tres columnas (Pendiente, En Progreso, Completado), lo que te permite ver tu carga de trabajo de un vistazo. La vista Lista muestra todo en una única tabla ordenada por fecha de vencimiento — mejor cuando tienes muchas tareas y quieres ver los plazos.',
            'Añadir una tarea: haz clic en el botón "Añadir Tarea" y escribe el título. También puedes definir una fecha de vencimiento, nivel de prioridad, categoría y notas. Ninguno de estos campos adicionales es obligatorio — incluso solo el título es suficiente para guardar.',
            'Siete categorías fijas para organizar tus tareas por área de vida: Trabajo, Aprendizaje, Personal, Salud, Finanzas, Hogar y Otros. Cada una tiene su propia etiqueta de color para distinguirlas fácilmente.',
            'Colores de prioridad: las tareas de alta prioridad se marcan en rojo, las de prioridad media en amarillo y las de baja en azul. Usa la prioridad para decidir qué abordar primero cuando la lista sea larga.',
            'Avanzar una tarea: en la vista Kanban puedes arrastrar una tarjeta de tarea a la siguiente columna, o hacer clic en el botón de flecha de la tarjeta para avanzarla una etapa. En la vista Lista, haz clic directamente en la etiqueta de estado para cambiarlo.',
            'Tareas vencidas: cualquier tarea cuya fecha de vencimiento haya pasado se resalta en rojo. Esto te permite identificar al instante lo que necesita atención inmediata sin tener que revisar toda la lista.',
            'Subtareas: al editar una tarea, puedes añadir una lista de pasos más pequeños dentro de ella. Cada subtarea tiene su propia casilla de verificación. Dividir una tarea grande en pasos la hace menos intimidante y te ayuda a seguir el progreso parcial.',
            'Editar subtareas: haz clic en el texto de una subtarea para editarla directamente. Presiona Intro para guardar, o Mayús+Intro para añadir una nueva línea dentro de la misma subtarea. También puedes arrastrar las subtareas hacia arriba o abajo para reordenarlas.',
            'Tres tarjetas de resumen en la parte superior: Total de tareas, Completadas hoy y Vencidas. Te dan una visión instantánea del estado sin necesidad de desplazarte por la lista completa.',
            'Editar y eliminar: haz clic en el icono de lápiz de cualquier tarea para abrir el formulario de edición, o en el icono de papelera para eliminarla. Las tareas eliminadas no se pueden recuperar, por lo que la aplicación pide confirmación antes de borrar.'
          ],
          tip: 'Si tienes muchas tareas, cambia a la vista Lista — muestra todas las tareas en una sola tabla ordenada por fecha de vencimiento, lo que facilita ver qué viene a continuación. Usa la vista Kanban cuando quieras arrastrar tareas entre etapas y visualizar tu flujo de trabajo.'
        },
        {
          icon: 'star', title: 'Sueños y Metas', desc: 'Esta es la página donde llevas el seguimiento de tus sueños y metas a largo plazo. Puedes avanzar en cada sueño paso a paso y ver cuánto camino has recorrido. Dividir una meta grande en pequeños pasos hace que el progreso se sienta real y alcanzable.',
          features: [
            'Para añadir un sueño, haz clic en el botón "Añadir Sueño" y escribe un título. La descripción, categoría, fecha objetivo, emoji y color son todos opcionales — con solo el título es suficiente para guardar.',
            'Seis categorías fijas para elegir: Carrera, Viajes, Salud, Educación, Personal y Financiero. La categoría aparece como una etiqueta de color en la tarjeta para que puedas agrupar metas similares de un vistazo.',
            'Cada meta puede tener un emoji, que aparece en grande en la parte superior de la tarjeta y le da una identidad visual a tu sueño. El color elegido se aplica al borde de la tarjeta, la barra de progreso y la etiqueta de categoría.',
            'Hitos (pasos): al editar una meta, puedes añadir una lista de pequeños pasos dentro de ella. Cada paso tiene su propia casilla de verificación. Márcalos conforme los completes — el porcentaje de progreso se actualiza automáticamente.',
            'El porcentaje de progreso es completamente automático. La aplicación lo calcula en función de cuántos hitos has completado del total. No necesitas introducir ningún porcentaje manualmente.',
            'Para editar el texto de un hito, haz clic en él y escribe el nuevo texto. Para reordenar los hitos, arrástralos hacia arriba o abajo usando el controlador que aparece junto a cada uno.',
            'Cuando estableces una fecha objetivo, la tarjeta muestra cuántos días quedan. Si quedan menos de 30 días, ese número se vuelve rojo — así puedes identificar fácilmente las metas que necesitan atención pronto.',
            'Para reordenar tus metas, haz clic en el ícono de candado en la esquina superior derecha — esto abre el modo de edición y cada tarjeta obtiene un controlador de arrastre. Mueve las tarjetas al orden que prefieras y luego cierra el candado.',
            'Cuando todos los hitos están marcados y el progreso llega al 100%, aparece una notificación de felicitación en pantalla.',
            'Para editar una meta, haz clic en el ícono de lápiz de su tarjeta. Para eliminarla, haz clic en el ícono de papelera. La eliminación es permanente, así que la aplicación pedirá confirmación antes de borrar.'
          ],
          tip: 'Si una meta grande te parece abrumadora, añádela primero con solo un título y luego ábrela para dividirla en pasos más pequeños. Ver cómo se llena la barra de progreso al marcar cada paso es sorprendentemente motivador.'
        },
        {
          icon: 'wallet', title: 'Presupuesto', desc: 'Esta es la página donde llevas el seguimiento de tus ingresos y gastos mensuales. Puedes ver cuánto dinero entra, a dónde va y si estás ahorrando o gastando de más. Al establecer límites de gasto por categoría, puedes saber de un vistazo si te estás manteniendo dentro de tu presupuesto.',
          features: [
            'La página se divide en tres pestañas: Resumen (gráficos e información resumida), Categorías (tu estructura de ingresos y gastos) y Transacciones (lista completa de todos los registros). La aplicación recuerda en qué pestaña estabas al volver.',
            'La pestaña Resumen muestra cuatro tarjetas de resumen: ingresos totales, gastos totales, saldo neto (ingresos menos gastos) y cuánto presupuesto queda. También incluye gráficos — un gráfico circular de distribución de gastos, un gráfico de líneas de gasto diario y una tendencia de saldo neto por meses.',
            'La pestaña Categorías es donde configuras tu estructura de gastos. Primero crea un grupo (por ejemplo "Alimentación" o "Sueldo"), luego añade subcategorías dentro de él. Cada subcategoría puede tener un límite de presupuesto mensual.',
            'Límites de presupuesto: cuando estableces un límite para una subcategoría, la página muestra qué porcentaje has usado. Por encima del 75% la barra se vuelve amarilla; por encima del 100% se vuelve roja. La aplicación no te impide gastar más — solo te da una advertencia visual.',
            'La pestaña Transacciones lista todos tus registros de ingresos y gastos. Puedes añadir una nueva entrada con fecha, descripción, categoría e importe. Los registros existentes se pueden editar o eliminar.',
            'Para encontrar registros específicos, usa el cuadro de búsqueda de texto para buscar por descripción o nombre de categoría. También puedes filtrar por rango de fechas y por grupo de categoría.',
            'El sistema de ciclos: el presupuesto se reinicia cada mes en el día que elijas (por defecto el día 1). Cuando comienza un nuevo ciclo, los datos del mes anterior se archivan automáticamente — nada se elimina.',
            'Ciclos pasados: haz clic en el botón de historial en la esquina superior derecha para revisar meses anteriores. Cada período pasado muestra sus ingresos totales, gastos y resultado neto. También puedes añadir o editar transacciones en ciclos anteriores.',
            'Diseño de paneles: los gráficos de la pestaña Resumen se pueden reorganizar — haz clic en el icono de lápiz para entrar en modo edición. También puedes ocultar paneles que no uses abriendo el gestor de paneles en la esquina superior derecha.',
            'Copia de seguridad específica del presupuesto: el botón "Importar datos" en la pestaña Transacciones te permite restaurar solo tus datos de presupuesto desde un archivo de copia de seguridad, sin afectar a ningún otro módulo.'
          ],
          tip: 'Empieza yendo a la pestaña Categorías y creando tus grupos de ingresos y gastos. No puedes añadir transacciones hasta tener al menos una categoría configurada. Unos pocos grupos simples — como "Sueldo" y "Alimentación" — son suficientes para comenzar.'
        },
        {
          icon: 'trending-up', title: 'Inversiones', desc: 'Esta página te permite seguir todas tus inversiones en un solo lugar — acciones, criptomonedas, ETFs y más. Puedes ver el valor total de tu cartera, las ganancias o pérdidas y cómo están distribuidos tus activos. Las cuentas de ahorro bancarias también se pueden añadir aquí para ver los intereses acumulados día a día.',
          features: [
            'Se admiten seis tipos de activos: Acciones, ETF, Criptomonedas, Materias primas (oro, plata, etc.), Bonos y Efectivo. Para cada activo introduces un símbolo, nombre, cantidad, precio de compra y fecha.',
            'Para añadir una nueva posición, haz clic en el botón "Comprar/Vender" en la esquina superior derecha y elige "Añadir nuevo". Luego usa "Comprar más" para aumentar una posición existente, o "Vender" para registrar una venta parcial o total.',
            'Actualización automática de precios: una vez que introduces una clave de conexión (Alpha Vantage) en Configuración, los precios de acciones, ETFs y criptomonedas listados en EE.UU. se actualizarán automáticamente en segundo plano cada 24 horas.',
            'Para activos sin precio automático — Materias primas, Bonos, Efectivo o acciones no cotizadas en EE.UU. — puedes introducir manualmente el precio actual haciendo clic en el icono de lápiz en la fila de ese activo en la tabla.',
            'Seguimiento de ganancias y pérdidas: haz clic en el encabezado de la columna en la tabla para cambiar entre vistas de ganancia/pérdida Diaria, Semanal, Mensual o Total. Cada activo muestra cuánto ha ganado o perdido en el período seleccionado.',
            'Cambio de divisa: usa el botón TRY/USD en la esquina superior derecha para ver toda tu cartera en moneda local o en dólares. El tipo de cambio se actualiza automáticamente; también puedes escribirlo a mano en el campo "1$=" de la barra superior.',
            'Seguimiento de depósitos bancarios: el panel "🏦 Depósitos" en la parte inferior de la página te permite registrar cuentas de ahorro a plazo o flexibles. Introduce el nombre del banco, el capital, la tasa de interés anual y la fecha de inicio — la aplicación calcula automáticamente los intereses acumulados, los días que quedan y el total que recibirás al vencimiento.',
            'Vista de depósitos: usa los botones "Tarjetas / Tabla" en la esquina superior derecha del panel de depósitos para alternar entre dos formatos. La vista Tarjetas muestra cada cuenta como una tarjeta amplia con todos sus detalles; la vista Tabla alinea todos los datos en columnas una al lado de la otra. La aplicación recuerda tu última preferencia.',
            'Reordenación con arrastrar y soltar: tanto la tabla de cartera como la lista de depósitos admiten arrastrar y soltar. Pasa el cursor sobre una fila, mantén pulsado el botón izquierdo del ratón y arrástrala hacia arriba o hacia abajo. El nuevo orden se guarda automáticamente.',
            'Sincronización de pestañas en el historial: la sección "Historial de operaciones" tiene dos pestañas — "Bolsa/ETF" y "Depósitos". La pestaña que esté activa cuando pulses el botón "Historial" se abrirá directamente en la ventana de historial. Dentro puedes navegar entre meses con los botones de flecha.',
            'Cuando vendes un activo, la ganancia o pérdida realizada se registra por separado. Estos resultados aparecen en el historial de operaciones y se reflejan en las tarjetas de resumen del portafolio.',
            'Las claves de conexión se introducen en Configuración → Claves API de Inversiones. La aplicación funciona sin claves — simplemente necesitas actualizar los precios manualmente. Las actualizaciones automáticas son una función extra, no un requisito.'
          ],
          tip: 'Puedes usar la aplicación sin ninguna clave de conexión: añade tus activos, introduce los precios de compra y actualiza los precios actuales manualmente cuando los consultes. Para los depósitos, introduce la tasa de interés como cifra anual — por ejemplo, escribe "42" para un 42%. La aplicación se encarga del resto, incluido el cálculo diario de intereses.'
        }
      ],
      fr: [
        {
          icon: 'settings', title: 'Paramètres', desc: 'Tous les réglages d\'apparence et de comportement de l\'application se trouvent ici. Cliquez sur l\'icône d\'engrenage en bas du menu gauche sur n\'importe quelle page pour l\'ouvrir. Les modifications prennent effet immédiatement.',
          features: ['Langue : Choisissez la langue de l\'application — turc, anglais, chinois, espagnol ou français. Tous les menus et textes s\'afficheront dans la langue choisie.', 'Devise : Choisissez quel symbole monétaire est affiché dans toute l\'application — lire turque (₺), dollar ($), euro (€) et plus.', 'Thème de couleur : Changez l\'apparence visuelle de l\'application. 12 thèmes de couleur sont disponibles — options sombres, claires et colorées.', 'Taille du texte et des éléments : Si l\'écran semble encombré ou le texte est difficile à lire, utilisez le curseur pour tout agrandir ou réduire.', 'Mode confidentialité : Lorsqu\'il est activé, tous les montants d\'argent s\'affichent sous forme de ••••. Pratique quand d\'autres personnes sont à côté et que vous ne souhaitez pas qu\'elles voient vos chiffres.', 'Jour de début de semaine : Choisissez si votre semaine commence le lundi ou le dimanche. Cela modifie l\'affichage des graphiques d\'habitudes et de suivi du temps.', 'Mises à jour de prix en temps réel : Entrez ici les clés de connexion pour activer les mises à jour automatiques des prix des actions, cryptomonnaies et taux de change. (Uniquement nécessaire si vous utilisez la section Investissements.)', 'Sauvegarde (Exporter) : Enregistre toutes vos données sous forme de fichier sur votre ordinateur. Nous vous recommandons de le faire régulièrement pour sécuriser vos données.', 'Restaurer depuis une sauvegarde (Importer) : Charge un fichier de sauvegarde enregistré précédemment. Important : cela remplace toutes vos données actuelles et ne peut pas être annulé.', 'Supprimer des données — deux options : "Réinitialiser aux données d\'exemple" supprime vos données personnelles et redémarre l\'application avec du contenu d\'exemple prêt à l\'emploi ; "Tout effacer" supprime définitivement toutes les données sans possibilité de récupération.', 'Masquer des sections (onglet Panneaux) : Vous pouvez retirer du menu gauche les pages que vous n\'utilisez pas. Vos données ne sont pas supprimées — seule cette page disparaît du menu.'],
          tip: 'Utilisez régulièrement le bouton "Exporter" pour sauvegarder vos données. Importer une sauvegarde remplacera toutes vos données actuelles — exportez toujours une sauvegarde en premier. Si vous souhaitez repartir de zéro, "Réinitialiser aux données d\'exemple" vous donne une application propre avec du contenu d\'exemple déjà rempli.'
        },
        {
          icon: 'layout-dashboard', title: 'Accueil', desc: 'L\'écran principal qui affiche un résumé de toutes les sections au même endroit. Vos dépenses, habitudes, objectifs, séances de sport et bien plus encore sont visibles d\'un coup d\'œil. Vous choisissez quelles sections apparaissent et dans quel ordre.',
          features: [
            'Quatre cartes de résumé (tout en haut) : Votre valeur nette, les dépenses totales de la période sélectionnée, le pourcentage d\'habitudes complétées et le nombre d\'objectifs actifs — les données les plus importantes vous accueillent dès l\'ouverture de l\'application.',
            'Graphique de temps : Affiche en minutes le temps passé sur vos activités pendant la semaine, le mois ou l\'année sélectionnée, sous forme de courbe. Vous repérez facilement vos journées les plus productives et les périodes plus calmes.',
            'Section Pomodoro : Un bref résumé de vos sessions de travail — combien de sessions vous avez terminées, combien de minutes vous avez passé en concentration profonde et votre série de jours consécutifs.',
            'Section Sport : Liste vos deux dernières séances d\'entraînement avec la date, le type et la durée. Cliquez sur une séance pour la déplier et voir exactement quels exercices vous avez faits.',
            'Section Budget : Affiche via des barres horizontales la proportion de chaque catégorie de dépenses déjà utilisée. Les catégories presque pleines ressortent clairement pour vous montrer où va votre argent.',
            'Section Investissements : Présente la répartition de votre portefeuille en deux graphiques circulaires — l\'un par position individuelle, l\'autre regroupé par type : actions, cryptos, obligations, etc.',
            'Section Rêves et Objectifs : Tous les objectifs en cours sont listés avec des barres de progression pour voir d\'un coup d\'œil votre avancement sur chacun.',
            'Section Plans à venir : Les tâches dont la date limite tombe dans les 7 prochains jours et les tâches en retard sont affichées ici pour ne rien laisser passer.',
            'Sélecteur de période (coin supérieur droit) : Basculez entre "Cette Semaine", "Ce Mois" et "Cette Année" pour changer la plage de temps couverte par les cartes et les graphiques.',
            'Réorganiser les sections : Cliquez sur l\'icône de cadenas (en haut à droite). Les sections affichent alors un contour pointillé — dans ce mode, vous pouvez attraper n\'importe quelle section et la glisser où vous le souhaitez. Recliquez sur le cadenas pour enregistrer et quitter.',
            'Quelles sections apparaissent ? Allez dans Paramètres → onglet Panneaux pour masquer les sections que vous n\'utilisez pas. En les masquant, elles disparaissent de l\'accueil et du menu gauche. Vos données ne sont pas supprimées — vous pouvez les réafficher à tout moment.'
          ],
          tip: 'Déplacez les informations que vous consultez le plus souvent vers le haut. Si vous suivez principalement votre budget et vos objectifs, vous pouvez masquer les sections sport et pomodoro pour une vue plus épurée. Vous pouvez les récupérer à tout moment depuis Paramètres → Panneaux.'
        },
        {
          icon: 'timer', title: 'Mode Concentration', desc: 'La page minuteur qui mesure et enregistre vos sessions de travail. Elle propose trois façons différentes de travailler : les cycles Pomodoro classiques, un chronomètre libre sans limite de temps, et un compte à rebours personnalisé. Chaque session terminée est automatiquement ajoutée à la page de Suivi du temps.',
          features: [
            'Mode Pomodoro : Travaillez par tranches de 25 minutes suivies d\'une courte pause de 5 minutes. Au bout de quatre sessions, une longue pause de 15 minutes commence automatiquement. Vous pouvez modifier toutes ces durées depuis le panneau de réglages en haut de la page.',
            'Mode Flow (flux) : Un chronomètre qui compte à la hausse depuis zéro, sans limite de temps. Utilisez-le quand vous voulez noter combien de temps vous travaillez sans être contraint à un intervalle fixe.',
            'Mode compte à rebours : Vous entrez vous-même les heures, minutes et secondes souhaitées. À la fin du temps, une alerte sonore retentit et le minuteur se réinitialise.',
            'Associer à une tâche : Avant de démarrer, vous pouvez choisir l\'une des tâches du jour dans une liste. Le nom de la tâche s\'affiche sur l\'écran du minuteur et le temps passé sera enregistré sous cette tâche.',
            'Panneau de sous-tâches : Les étapes de la tâche sélectionnée s\'affichent sur le côté gauche de l\'écran. Vous pouvez les cocher une à une sans quitter le minuteur. En terminant la session, les étapes restantes sont automatiquement marquées comme accomplies.',
            'Bouton drapeau : Appuyez sur le drapeau pendant que le minuteur tourne pour marquer ce moment précis, comme poser un signet dans le temps. Chaque drapeau mémorise l\'heure exacte et le temps écoulé. Vous pourrez ensuite sauvegarder jusqu\'à ce drapeau ou y revenir.',
            'Bouton Réinitialiser — trois choix : (1) "Sauvegarder jusqu\'au dernier drapeau et arrêter" — tout ce qui précède le dernier drapeau est sauvegardé, le reste est supprimé ; (2) "Revenir au dernier drapeau et continuer" — le minuteur saute à votre dernier drapeau pour reprendre depuis là ; (3) "Tout recommencer" — rien n\'est sauvegardé et le minuteur repart depuis le début.',
            'Bouton Terminer : Met fin à la session et enregistre votre temps dans la page de Suivi du temps. Si vous avez posé des drapeaux, vous avez aussi l\'option de sauvegarder uniquement jusqu\'au dernier.',
            'Mode heures supplémentaires : Quand le temps du Pomodoro s\'écoule, le minuteur ne s\'arrête pas ; il continue à afficher le temps supplémentaire comme +01:23 en jaune. Appuyez sur Terminer quand vous êtes prêt à conclure.',
            'Ne se perd pas si vous fermez l\'onglet : Votre minuteur est sauvegardé pendant 8 heures même si vous fermez le navigateur ou l\'onglet. À votre retour, il reprend exactement là où vous en étiez.',
            'Mode plein écran : Cliquez sur l\'icône en haut à droite pour masquer le menu et la barre d\'outils, ne laissant que le minuteur à l\'écran. Idéal pour une concentration maximale. En plein écran, vous pouvez également ouvrir une petite barre d\'informations en bas qui affiche le temps total travaillé aujourd\'hui et votre série de jours consécutifs.'
          ],
          tip: 'Sélectionnez une tâche avant de commencer — ainsi votre temps est automatiquement lié à ce que vous faites. Utilisez le bouton drapeau comme un point de contrôle en cours de session : il vous permet de marquer un instant sans vous arrêter, pour ensuite sauvegarder jusqu\'à ce point ou y revenir si nécessaire.'
        },
        {
          icon: 'clock', title: 'Suivi du temps', desc: 'La page où vous enregistrez combien de temps vous consacrez à vos activités quotidiennes. Les sessions du Mode Concentration sont ajoutées ici automatiquement ; vous pouvez aussi saisir des entrées manuellement quand vous le souhaitez. Des graphiques journaliers, hebdomadaires et mensuels vous aident à voir clairement où passe votre temps.',
          features: [
            'Trois cartes de résumé en haut : combien de minutes vous avez enregistrées aujourd\'hui, le total de la semaine et celui du mois — les données les plus importantes visibles dès l\'ouverture.',
            'Ajouter une entrée manuellement : cliquez sur le bouton "Ajouter un enregistrement" en haut à droite. Renseignez la date, une catégorie (Travail, Apprentissage, Exercice, Social, Sommeil ou Autre), un nom de projet facultatif, puis l\'heure de début et de fin. La durée est calculée automatiquement.',
            'Entrées automatiques du Mode Concentration : chaque fois que vous terminez une session Pomodoro ou de flux, elle est ajoutée à cette page automatiquement. Ces entrées apparaissent dans le tableau avec une petite étiquette "Automatique" pour les distinguer des saisies manuelles.',
            'Filtrer les entrées : les boutons au-dessus du tableau vous permettent de basculer entre "Tout", "Manuel uniquement" et "Automatique uniquement". Le filtre choisi est mémorisé même après avoir fermé la page.',
            'Filtre par plage de dates : cliquez sur l\'icône de calendrier pour choisir une date de début et de fin et n\'afficher que les entrées de cette période. Effacez le filtre pour revenir à la liste complète.',
            'Graphique de tendance sur 30 jours : affiche combien de minutes vous avez enregistrées chacun des trente derniers jours. Vos journées les plus actives et les périodes plus calmes ressortent immédiatement.',
            'Graphique de répartition hebdomadaire : compare les sept derniers jours côte à côte. Un moyen rapide de voir quels jours de la semaine vous êtes habituellement le plus productif.',
            'Modifier et supprimer des entrées : chaque ligne du tableau dispose d\'une icône crayon pour la modifier et d\'une icône corbeille pour la supprimer. La suppression demande une confirmation ; cochez "Ne plus demander aujourd\'hui" et la fenêtre de confirmation ne réapparaîtra plus pour le reste de la journée.',
            'Historique mensuel : cliquez sur le bouton "Historique" en haut à droite pour parcourir les mois précédents. Utilisez les flèches pour naviguer entre les mois. L\'onglet "Résumé" affiche un graphique mensuel et les totaux hebdomadaires ; l\'onglet "Enregistrements" liste toutes les entrées jour par jour. En haut de chaque mois, vous pouvez voir le nombre de jours actifs, votre moyenne quotidienne et la catégorie à laquelle vous avez consacré le plus de temps.'
          ],
          tip: 'Si vous utilisez régulièrement le Mode Concentration, vos entrées arrivent déjà automatiquement. Passez au filtre "Manuel uniquement" pour ne voir que ce que vous avez saisi vous-même, ou choisissez "Automatique uniquement" pour revoir uniquement vos sessions Pomodoro et de flux.'
        },
        {
          icon: 'check-circle', title: 'Habitudes', desc: 'La page où vous suivez les choses que vous voulez faire chaque jour. Au fil de vos habitudes complétées, vous construisez des séries et pouvez regarder vos progrès visuellement. Vous pouvez définir des habitudes qui se répètent tous les jours, ou qui n\'apparaissent que certains jours de la semaine.',
          features: [
            'Deux types d\'habitude : les habitudes "Chaque jour" apparaissent dans votre liste chaque matin. Les habitudes "Jours spécifiques" ne s\'affichent que les jours que vous avez choisis — par exemple du lundi au vendredi — et disparaissent complètement les autres jours, sans affecter votre série du tout.',
            'Ajouter une habitude : saisissez un nom, choisissez éventuellement un emoji et une couleur, puis sélectionnez si c\'est une habitude quotidienne ou à jours spécifiques. L\'application suggère automatiquement un emoji adapté selon ce que vous tapez.',
            'La liste quotidienne comporte trois sections : les habitudes pas encore faites en haut, les habitudes complétées au milieu, et celles que vous avez passées ce jour en bas. Un compteur comme "3 / 5" dans l\'en-tête indique combien vous en avez terminé.',
            'Bouton Passer : cliquez sur la petite icône moins à côté d\'une habitude pour la marquer comme passée aujourd\'hui. L\'essentiel : passer ne brise pas votre série. Utilisez-le sans hésiter les jours où vous êtes malade ou où vous n\'avez vraiment pas le temps. Si vous changez d\'avis, cliquez sur l\'icône de flèche circulaire pour annuler.',
            '🔥 Compteur de série : indique combien de jours de suite vous avez accompli une habitude. Manquer un jour remet le compteur à zéro — mais les jours où vous avez passé ne comptent pas contre vous. Pour les habitudes à jours spécifiques, seuls les jours assignés sont pris en compte ; le reste de la semaine n\'affecte pas la série du tout.',
            'Grille de progression sur 30 jours : affiche les trente derniers jours sous forme de petits carrés pour chaque habitude. Les jours complétés sont remplis avec la couleur de cette habitude ; les jours non complétés restent vides. Le carré d\'aujourd\'hui a un bord bleu pour se distinguer. Le pourcentage de réussite est indiqué au début de chaque ligne.',
            'Graphiques hebdomadaires : un petit graphique circulaire apparaît pour chaque jour de la semaine, montrant la proportion de vos habitudes accomplies ce jour-là. Un graphique récapitulatif de toute la semaine est affiché à côté.',
            'Trois cartes de résumé : combien d\'habitudes vous avez accomplies aujourd\'hui, votre taux de complétion moyen pour la semaine et la plus longue série parmi toutes vos habitudes — affichées en bas de la page.',
            'Réorganiser : appuyez longuement sur une habitude dans la liste quotidienne et faites-la glisser là où vous le souhaitez. Le nouvel ordre est sauvegardé automatiquement.',
            'Modifier et supprimer : cliquez sur le bouton "Gérer" en haut à droite. Une fenêtre liste toutes vos habitudes ; utilisez l\'icône crayon pour modifier ou l\'icône corbeille pour supprimer. La suppression efface également tout l\'historique de cette habitude et ne peut pas être annulée.'
          ],
          tip: 'Vous n\'avez pas besoin de le faire tous les jours pour construire une série — utilisez le type "Jours spécifiques" pour ne suivre que les jours qui ont du sens. Et si un jour vous ne pouvez vraiment pas faire une habitude, appuyez sur Passer plutôt que de la laisser en suspens : cela préserve votre série et supprime la pression d\'une tâche non accomplie.'
        },
        {
          icon: 'dumbbell', title: 'Sport', desc: 'Votre journal d\'entraînement. Enregistrez ce que vous faites après chaque séance, suivez vos progrès dans le temps avec des graphiques et laissez l\'application tenir automatiquement la liste de vos meilleures performances. Compatible avec la musculation, le cardio et tous les autres types d\'exercice.',
          features: [
            'Ajouter un entraînement : cliquez sur "Ajouter un entraînement". Choisissez la date, la durée en minutes et le type. Six types sont disponibles : Musculation, Cardio, Flexibilité, CrossFit, Sport et Autre. Vous pouvez aussi ajouter des notes et un niveau de difficulté de 1 à 10.',
            'Enregistrer les exercices : en bas du formulaire, vous ajoutez chaque exercice un par un. Pour la musculation, vous saisissez le nom de l\'exercice, le groupe musculaire, le nombre de séries, de répétitions et le poids. Pour le cardio, vous entrez la durée et la distance en kilomètres. Le formulaire s\'adapte automatiquement selon le type d\'entraînement choisi.',
            'Modèles : si vous suivez régulièrement le même programme, enregistrez-le une fois et chargez-le en un clic à chaque fois. Remplissez le formulaire d\'entraînement, cliquez sur "Enregistrer comme modèle" et donnez-lui un nom. La prochaine fois, sélectionnez-le dans le menu "Charger un modèle" et tous vos exercices se remplissent automatiquement.',
            'Panneau des records personnels : pour chaque exercice que vous avez déjà enregistré, l\'application suit automatiquement le poids le plus lourd soulevé et la date. Elle calcule aussi votre estimation de répétition maximale — le poids le plus lourd que vous pourriez théoriquement soulever une seule fois — à partir de vos séries et répétitions.',
            'Mesures corporelles : vous pouvez enregistrer six mesures avec une date : poids corporel, pourcentage de graisse, tour de taille, tour de poitrine, tour de bras et tour de cuisse. L\'évolution de votre poids dans le temps est affichée sous forme de graphique.',
            'Graphique de fréquence des entraînements : montre combien de séances vous avez faites chacune des huit dernières semaines. Un coup d\'œil suffit pour voir si vous vous entraînez régulièrement ou s\'il y a des semaines sans activité.',
            'Graphique de volume : montre le poids total déplacé chaque semaine sur les huit dernières semaines (séries × répétitions × poids). Vous aide à voir si l\'intensité de vos entraînements augmente avec le temps.',
            'Graphique des groupes musculaires et progression par exercice : un graphique circulaire montre quels groupes musculaires vous avez travaillés et dans quelle proportion. Vous pouvez aussi choisir un exercice spécifique dans un menu pour voir un graphique de la progression de votre charge sur cet exercice au fil du temps.',
            'Historique des entraînements : chaque entraînement enregistré apparaît sous forme de carte avec la date, le type, la durée et un résumé des exercices. Cliquez sur n\'importe quelle carte pour l\'ouvrir et la modifier.',
            'Basculement kg / lb : utilisez le bouton en haut à droite pour passer entre kilogrammes et livres. Tous les poids, graphiques et records personnels sont convertis automatiquement.',
            'Gestion des panneaux : cliquez sur l\'icône de grille en haut à droite pour choisir quels panneaux sont visibles. Utilisez l\'icône de cadenas pour faire glisser les panneaux dans un ordre différent ou ajuster leur largeur à l\'écran.'
          ],
          tip: 'Utilisez les modèles pour vos séances habituelles afin de ne jamais avoir à ressaisir les mêmes exercices depuis le début. Consultez aussi régulièrement le panneau des records personnels — voir votre précédent record de poids est un moyen simple et efficace de vous fixer un objectif pour la prochaine séance.'
        },
        {
          icon: 'kanban', title: 'Plans', desc: 'C\'est votre page de gestion des tâches où vous suivez tout ce que vous avez à faire. Les tâches progressent à travers trois étapes — À faire, En cours et Terminé — pour que vous sachiez toujours ce qui est en attente, ce sur quoi vous travaillez et ce qui est achevé.',
          features: [
            'Deux vues au choix : la vue Kanban organise vos tâches en trois colonnes côte à côte (À faire, En cours, Terminé), ce qui vous permet de visualiser votre charge de travail en un coup d\'œil. La vue Liste affiche tout dans un seul tableau trié par date d\'échéance — pratique quand vous avez beaucoup de tâches et souhaitez voir les délais.',
            'Ajouter une tâche : cliquez sur le bouton "Ajouter une tâche" et saisissez le titre. Vous pouvez aussi définir une date d\'échéance, un niveau de priorité, une catégorie et des notes. Ces champs supplémentaires sont tous facultatifs — même un simple titre suffit pour enregistrer.',
            'Sept catégories fixes pour organiser vos tâches par domaine de vie : Travail, Apprentissage, Personnel, Santé, Finance, Maison et Autre. Chacune a sa propre étiquette de couleur pour les distinguer facilement.',
            'Couleurs de priorité : les tâches haute priorité sont marquées en rouge, les priorités moyennes en jaune et les basses en bleu. Utilisez la priorité pour décider ce qu\'il faut traiter en premier quand la liste est longue.',
            'Faire avancer une tâche : en vue Kanban, vous pouvez faire glisser une carte de tâche vers la colonne suivante, ou cliquer sur le bouton flèche de la carte pour la faire avancer d\'une étape. En vue Liste, cliquez directement sur l\'étiquette de statut pour la modifier.',
            'Tâches en retard : toute tâche dont la date d\'échéance est dépassée est mise en évidence en rouge. Cela vous permet de repérer immédiatement ce qui nécessite votre attention sans parcourir toute la liste.',
            'Sous-tâches : lors de la modification d\'une tâche, vous pouvez y ajouter une liste de petites étapes. Chaque sous-tâche a sa propre case à cocher. Décomposer une grande tâche en étapes la rend moins intimidante et vous aide à suivre la progression partielle.',
            'Modifier les sous-tâches : cliquez sur le texte d\'une sous-tâche pour la modifier directement sur place. Appuyez sur Entrée pour sauvegarder, ou Maj+Entrée pour ajouter une nouvelle ligne dans la même sous-tâche. Vous pouvez aussi faire glisser les sous-tâches vers le haut ou le bas pour les réorganiser.',
            'Trois cartes de résumé en haut de la page : Total des tâches, Complétées aujourd\'hui et En retard. Elles vous donnent un aperçu immédiat de la situation sans faire défiler toute la liste.',
            'Modifier et supprimer : cliquez sur l\'icône crayon d\'une tâche pour ouvrir le formulaire de modification, ou sur l\'icône corbeille pour la supprimer. Les tâches supprimées ne peuvent pas être récupérées, aussi l\'application demande une confirmation avant de les effacer.'
          ],
          tip: 'Si vous avez beaucoup de tâches, passez à la vue Liste — elle affiche toutes les tâches dans un seul tableau trié par date d\'échéance, ce qui facilite la visibilité de ce qui arrive prochainement. Utilisez la vue Kanban quand vous voulez faire glisser les tâches entre les étapes et visualiser votre flux de travail.'
        },
        {
          icon: 'star', title: 'Rêves et Objectifs', desc: 'C\'est la page où vous suivez vos rêves et objectifs à long terme. Vous pouvez faire avancer chaque rêve étape par étape et voir le chemin parcouru. Diviser un grand objectif en petites étapes rend les progrès concrets et atteignables.',
          features: [
            'Pour ajouter un rêve, cliquez sur le bouton "Ajouter un rêve" et saisissez un titre. La description, la catégorie, la date cible, l\'emoji et la couleur sont tous facultatifs — un simple titre suffit pour sauvegarder.',
            'Six catégories fixes au choix : Carrière, Voyage, Santé, Éducation, Personnel et Finance. La catégorie apparaît sous forme d\'étiquette colorée sur la carte pour regrouper les objectifs similaires d\'un coup d\'œil.',
            'Chaque objectif peut avoir un emoji, qui s\'affiche en grand en haut de la carte et donne une identité visuelle à votre rêve. La couleur choisie s\'applique à la bordure de la carte, à la barre de progression et à l\'étiquette de catégorie.',
            'Jalons (étapes) : lors de la modification d\'un objectif, vous pouvez y ajouter une liste de petites étapes. Chaque étape a sa propre case à cocher. Cochez-les au fur et à mesure — le pourcentage de progression se met à jour automatiquement.',
            'Le pourcentage de progression est entièrement automatique. L\'application le calcule en fonction du nombre de jalons complétés par rapport au total. Vous n\'avez jamais besoin d\'entrer un pourcentage manuellement.',
            'Pour modifier le texte d\'un jalon, cliquez dessus et tapez le nouveau texte. Pour réorganiser les jalons, faites-les glisser vers le haut ou le bas à l\'aide de la poignée qui apparaît à côté de chacun.',
            'Lorsque vous définissez une date cible, la carte affiche le nombre de jours restants. Si moins de 30 jours restent, ce nombre devient rouge — vous permettant de repérer facilement les objectifs qui demandent une attention prochaine.',
            'Pour réorganiser vos objectifs, cliquez sur l\'icône cadenas en haut à droite — cela ouvre le mode édition et chaque carte obtient une poignée de glissement. Déplacez les cartes dans l\'ordre souhaité, puis fermez le cadenas.',
            'Lorsque tous les jalons sont cochés et que la progression atteint 100%, une notification de félicitations s\'affiche à l\'écran.',
            'Pour modifier un objectif, cliquez sur l\'icône crayon de sa carte. Pour le supprimer, cliquez sur l\'icône corbeille. La suppression est définitive, aussi l\'application demande une confirmation avant d\'effacer.'
          ],
          tip: 'Si un grand objectif vous semble insurmontable, ajoutez-le d\'abord avec juste un titre, puis ouvrez-le pour le diviser en petites étapes. Regarder la barre de progression se remplir au fur et à mesure que vous cochez chaque étape est étonnamment motivant.'
        },
        {
          icon: 'wallet', title: 'Budget', desc: 'C\'est la page où vous suivez vos revenus et dépenses mensuels. Vous pouvez voir combien d\'argent entre, où il va et si vous épargnez ou dépensez trop. En fixant des limites par catégorie, vous savez d\'un coup d\'œil si vous respectez votre budget.',
          features: [
            'La page est divisée en trois onglets : Vue d\'ensemble (graphiques et résumé), Catégories (votre structure de revenus et dépenses) et Transactions (la liste complète de chaque entrée). L\'application se souvient de l\'onglet sur lequel vous étiez lorsque vous revenez.',
            'L\'onglet Vue d\'ensemble affiche quatre cartes de résumé : revenus totaux, dépenses totales, solde net (revenus moins dépenses) et budget restant. Il comprend aussi des graphiques — un diagramme circulaire de répartition des dépenses, un graphique de dépenses journalières et une tendance du solde net par mois.',
            'L\'onglet Catégories est l\'endroit où vous organisez votre structure de dépenses. Créez d\'abord un groupe (par exemple "Courses" ou "Salaire"), puis ajoutez des sous-catégories à l\'intérieur. Chaque sous-catégorie peut avoir une limite de budget mensuelle.',
            'Limites de budget : une fois une limite définie pour une sous-catégorie, la page affiche le pourcentage utilisé. Au-dessus de 75%, la barre devient jaune ; au-dessus de 100%, elle devient rouge. L\'application ne vous bloque pas — elle vous avertit simplement visuellement.',
            'L\'onglet Transactions liste tous vos enregistrements de revenus et dépenses. Vous pouvez ajouter une nouvelle entrée avec une date, une description, une catégorie et un montant. Les entrées existantes peuvent être modifiées ou supprimées.',
            'Pour trouver des entrées spécifiques, utilisez la zone de recherche pour chercher par description ou nom de catégorie. Vous pouvez aussi filtrer par plage de dates et par groupe de catégorie.',
            'Le système de cycles : le budget se réinitialise chaque mois à la date que vous choisissez (par défaut le 1er). Quand un nouveau cycle commence, les données du mois précédent sont archivées automatiquement — rien n\'est supprimé.',
            'Cycles passés : cliquez sur le bouton historique en haut à droite pour consulter les mois précédents. Chaque période affiche ses revenus totaux, dépenses et résultat net. Vous pouvez aussi ajouter ou modifier des transactions dans les cycles passés.',
            'Disposition des panneaux : les graphiques de l\'onglet Vue d\'ensemble peuvent être réorganisés — cliquez sur l\'icône crayon pour entrer en mode édition. Vous pouvez aussi masquer les panneaux inutilisés via le gestionnaire de panneaux en haut à droite.',
            'Sauvegarde spécifique au budget : le bouton "Importer données" dans l\'onglet Transactions vous permet de restaurer uniquement vos données de budget depuis un fichier de sauvegarde, sans toucher aux autres modules.'
          ],
          tip: 'Commencez par aller dans l\'onglet Catégories et créez vos groupes de revenus et dépenses. Vous ne pouvez pas ajouter de transactions sans au moins une catégorie configurée. Quelques groupes simples — comme "Salaire" et "Courses" — suffisent pour démarrer.'
        },
        {
          icon: 'trending-up', title: 'Investissements', desc: 'Cette page vous permet de suivre tous vos investissements en un seul endroit — actions, cryptomonnaies, ETF et plus. Vous pouvez voir la valeur totale de votre portefeuille, les gains ou pertes et la répartition de vos actifs. Les comptes d\'épargne bancaires peuvent aussi être ajoutés ici pour voir les intérêts s\'accumuler jour après jour.',
          features: [
            'Six types d\'actifs sont pris en charge : Actions, ETF, Cryptomonnaies, Matières premières (or, argent, etc.), Obligations et Liquidités. Pour chaque actif vous saisissez un symbole, un nom, une quantité, un prix d\'achat et une date.',
            'Pour ajouter une nouvelle position, cliquez sur le bouton "Acheter/Vendre" en haut à droite et choisissez "Ajouter". Ensuite, utilisez "Acheter plus" pour renforcer une position existante, ou "Vendre" pour enregistrer une vente partielle ou totale.',
            'Mise à jour automatique des prix : une fois une clé de connexion (Alpha Vantage) saisie dans Paramètres, les prix des actions, ETF et cryptomonnaies cotés aux États-Unis se mettront à jour automatiquement en arrière-plan toutes les 24 heures.',
            'Pour les actifs sans prix automatique — Matières premières, Obligations, Liquidités ou actions non cotées aux États-Unis — vous pouvez saisir manuellement le prix actuel en cliquant sur l\'icône crayon dans la ligne de cet actif dans le tableau.',
            'Suivi des gains et pertes : cliquez sur l\'en-tête de colonne dans le tableau pour basculer entre les vues Quotidien, Hebdomadaire, Mensuel ou Total. Chaque actif montre combien il a gagné ou perdu sur la période sélectionnée.',
            'Changement de devise : utilisez le bouton TRY/USD en haut à droite pour afficher tout votre portefeuille en devise locale ou en dollars. Le taux de change se met à jour automatiquement ; vous pouvez aussi le saisir manuellement dans le champ "1$=" de la barre supérieure.',
            'Suivi des dépôts bancaires : le panneau "🏦 Dépôts" en bas de la page vous permet d\'enregistrer des comptes d\'épargne à terme ou à taux libre. Saisissez le nom de la banque, le capital, le taux d\'intérêt annuel et la date de début — l\'application calcule automatiquement les intérêts accumulés, les jours restants et le montant total perçu à l\'échéance.',
            'Vue des dépôts : utilisez les boutons "Cartes / Tableau" en haut à droite du panneau Dépôts pour basculer entre deux formats. La vue Cartes affiche chaque compte sous forme d\'une large fiche détaillée ; la vue Tableau aligne toutes les informations dans des colonnes côte à côte. L\'application se souvient de votre dernier choix.',
            'Réorganisation par glisser-déposer : le tableau de portefeuille et la liste des dépôts prennent tous deux en charge le glisser-déposer. Survolez une ligne, maintenez le bouton gauche de la souris enfoncé et faites-la glisser vers le haut ou le bas. Le nouvel ordre est sauvegardé automatiquement.',
            'Synchronisation des onglets dans l\'historique : la section "Historique des opérations" comporte deux onglets — "Bourse/ETF" et "Dépôts". L\'onglet actif lorsque vous cliquez sur le bouton "Historique" s\'ouvre directement dans la fenêtre d\'historique. À l\'intérieur, naviguez entre les mois avec les boutons fléchés.',
            'Lorsque vous vendez un actif, le gain ou la perte réalisé est enregistré séparément. Ces résultats apparaissent dans l\'historique des opérations et se reflètent dans les cartes de résumé du portefeuille.',
            'Les clés de connexion se saisissent dans Paramètres → Clés API Investissements. L\'application fonctionne sans clés — vous devez simplement mettre à jour les prix manuellement. Les mises à jour automatiques sont une fonction pratique, pas une obligation.'
          ],
          tip: 'Vous pouvez utiliser l\'application sans aucune clé de connexion : ajoutez vos actifs, saisissez les prix d\'achat et mettez à jour les prix actuels manuellement lorsque vous les vérifiez. Pour les dépôts, saisissez le taux d\'intérêt en valeur annuelle — par exemple, tapez "42" pour un taux de 42 %. L\'application s\'occupe du reste, y compris le calcul quotidien des intérêts.'
        }
      ]
    };
  },

  // ── Settings modal ───────────────────────────────────────
  isModuleHidden(key) {
    return !!(Store.get('hidden_modules') || {})[key];
  },

  _setModuleHidden(key, isHidden) {
    const hidden = Store.get('hidden_modules') || {};
    if (isHidden) hidden[key] = true;
    else delete hidden[key];
    Store.set('hidden_modules', hidden);
  },

  applyHiddenModules() {
    const hidden = Store.get('hidden_modules') || {};
    const MAP = {
      focusmode: 'focusmode.html',
      timelog: 'timelog.html',
      habits: 'habits.html',
      gym: 'gym.html',
      plans: 'plans.html',
      goals: 'goals.html',
      budget: 'budget.html',
      investments: 'investments.html',
    };
    Object.entries(MAP).forEach(([key, page]) => {
      const link = document.querySelector(`.sidebar-nav a[href="${page}"]`);
      if (link) link.style.display = hidden[key] ? 'none' : '';
    });
    const hidePrivacy = !!(hidden['budget'] && hidden['investments']);
    document.querySelectorAll('.privacy-toggle-btn').forEach(btn => {
      btn.style.display = hidePrivacy ? 'none' : '';
    });
  },

  _toggleModule(key) {
    const willHide = !this.isModuleHidden(key);
    const MAP = {
      focusmode: 'focusmode.html',
      timelog: 'timelog.html',
      habits: 'habits.html',
      gym: 'gym.html',
      plans: 'plans.html',
      goals: 'goals.html',
      budget: 'budget.html',
      investments: 'investments.html',
    };
    const page = MAP[key];
    const onPage = page && window.location.href.includes('/' + page);
    const onDashboard = !Object.values(MAP).some(p => window.location.href.includes('/' + p));
    this._setModuleHidden(key, willHide);
    this.applyHiddenModules();
    this._renderSettingsModal();
    document.dispatchEvent(new CustomEvent('lt:modules-change'));
    if (willHide && !onDashboard) {
      sessionStorage.setItem('lt_settings_reopen', 'panels');
      window.location.href = 'index.html';
    }
  },

  openSettings(tab) {
    if (tab) this._settingsActiveTab = tab;
    else this._settingsActiveTab = 'ui';
    if (this._settingsModal && this._settingsModal._overlay && this._settingsModal._overlay.isConnected) {
      this._renderSettingsModal();
      return;
    }
    this._settingsModal = new CustomModal({
      title: this.t('settings_title'),
      icon: 'settings',
      width: 440,
      content: this._settingsBodyHTML(),
      buttons: [],
    });
    this._settingsModal.open();
  },

  _settingsBodyHTML() {
    const lang = this.getLang();
    const currentTheme = Store.getSettings().theme || 'dark';
    const themes = [
      { id: 'dark', accent: '#404050', bg: '#111111' },
      { id: 'midnight', accent: '#4D9EFF', bg: '#15192E' },
      { id: 'ocean', accent: '#00CBA9', bg: '#122224' },
      { id: 'forest', accent: '#4ADE80', bg: '#142218' },
      { id: 'sunset', accent: '#FB923C', bg: '#241810' },
      { id: 'rose', accent: '#F472B6', bg: '#221724' },
      { id: 'amber', accent: '#EAB308', bg: '#1E1608' },
      { id: 'crimson', accent: '#DC2626', bg: '#240E0E' },
      { id: 'nebula', accent: '#A78BFA', bg: '#181224' },
      { id: 'arctic', accent: '#22D3EE', bg: '#0D1C28' },
      { id: 'neon', accent: '#84CC16', bg: '#101A10' },
      { id: 'white', accent: '#6366F1', bg: '#FFFFFF' },
    ];
    const s = Store.getSettings();
    const _themeSurfaces = {
      dark: '#111111', midnight: '#15192E', ocean: '#122224', forest: '#142218',
      sunset: '#241810', rose: '#221724', amber: '#1E1608', crimson: '#240E0E',
      nebula: '#181224', arctic: '#0D1C28', neon: '#101A10', white: '#FFFFFF',
    };
    const currentBg = _themeSurfaces[currentTheme] || '#111111';
    const isLightTheme = currentTheme === 'white';
    const swatches = themes.map(th => {
      const active = th.id === currentTheme;
      const isDark = th.id === 'dark';
      const inactiveLabelColor = isLightTheme ? '#55556A' : 'rgba(255,255,255,0.65)';
      const labelColor = active ? (isLightTheme ? '#1E1E2E' : isDark ? '#FFFFFF' : th.accent) : inactiveLabelColor;
      const activeBorderColor = th.id === 'white' ? '#CBD5E1' : isDark ? 'rgba(220,220,220,0.6)' : th.accent;
      const borderColor = active ? activeBorderColor : 'transparent';
      const dotExtra = active && !isLightTheme ? (isDark ? 'box-shadow:0 0 10px rgba(255,255,255,0.4);' : `box-shadow:0 0 10px ${th.accent}88;`) : '';
      const dotBorder = th.id === 'white' ? 'rgba(0,0,0,0.15)' : isDark ? 'rgba(220,220,220,0.7)' : 'rgba(0,0,0,0.45)';
      const hoverBorder = th.id === 'white' ? '#CBD5E1' : isDark ? 'rgba(220,220,220,0.5)' : th.accent + 'AA';
      return `<button onclick="UI._setTheme('${th.id}')" data-tooltip="${this.t('settings_theme_' + th.id)}"
        onmouseenter="this.style.borderColor='${hoverBorder}'"
        onmouseleave="this.style.borderColor='${borderColor}'"
        style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;padding:0.4rem 0.25rem;border-radius:var(--radius-sm);border:2px solid ${borderColor};background:${currentBg};cursor:pointer;transition:border-color var(--transition);min-width:0;">
        <span style="width:1.5rem;height:1.5rem;border-radius:50%;background:${th.id === 'white' ? '#FFFFFF' : th.accent};display:block;flex-shrink:0;border:2px solid ${dotBorder};box-sizing:border-box;${dotExtra}"></span>
        <span style="font-size:0.625rem;color:${labelColor};font-family:var(--font-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:3.5rem;text-align:center;">${this.t('settings_theme_' + th.id)}</span>
      </button>`;
    }).join('');
    const activeTab = this._settingsActiveTab || 'ui';
    const _tabBtn = (id, label) => {
      const isActive = activeTab === id;
      return `<button onclick="UI._switchSettingsTab('${id}')"
        style="display:flex;align-items:center;padding:0.5rem 1rem;font-size:0.8125rem;font-weight:${isActive ? 600 : 500};cursor:pointer;border:none;background:none;border-bottom:2px solid ${isActive ? 'var(--accent)' : 'transparent'};margin-bottom:-1px;color:${isActive ? 'var(--accent)' : 'var(--text-secondary)'};transition:color var(--transition),border-color var(--transition);white-space:nowrap;flex-shrink:0">
        ${label}
      </button>`;
    };
    const uiTabHTML = `<div style="display:flex;flex-direction:column;gap:0.75rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
        <div class="form-group" style="margin:0">
          <label class="form-label" style="text-align:center">${this.t('settings_lang')}</label>
          ${(() => {
        const langs = [{ code: 'en', flag: '🇬🇧', name: 'English' }, { code: 'zh', flag: '🇨🇳', name: '中文' }, { code: 'es', flag: '🇪🇸', name: 'Español' }, { code: 'fr', flag: '🇫🇷', name: 'Français' }, { code: 'tr', flag: '🇹🇷', name: 'Türkçe' }];
        const cur = langs.find(l => l.code === lang) || langs[0];
        return `<button type="button" onclick="UI._openLangDropdown(this)"
              style="width:100%;display:flex;align-items:center;gap:0.4375rem;padding:0 0.625rem;height:2.25rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
              <span style="font-family:var(--font-mono);font-size:0.75rem;font-weight:700;color:var(--accent);flex-shrink:0;letter-spacing:.04em">${cur.code.toUpperCase()}</span>
              <span style="font-size:0.75rem;color:var(--text-secondary);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cur.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>
            </button>`;
      })()}
        </div>
        <div class="form-group" style="margin:0">
          <label class="form-label" style="text-align:center">${this.t('settings_currency')}</label>
          <button type="button" onclick="UI._openCurrencyDropdown(this)"
            style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.25rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            ${(() => {
        const c = this._CURRENCIES.find(x => x.sym === s.currency) || this._CURRENCIES[0];
        return `<span style="font-family:var(--font-mono);font-size:0.8125rem;font-weight:700;color:var(--accent);flex-shrink:0">${c.sym}</span>
                      <span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:600;color:var(--text-muted);flex-shrink:0">${c.code}</span>
                      <span style="font-size:0.75rem;color:var(--text-secondary);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.name}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>`;
      })()}
          </button>
        </div>
      </div>
      <div class="form-group" style="margin:0">
        <label class="form-label" style="display:flex;align-items:center;justify-content:space-between">
          <span>${this.t('settings_ui_scale')}</span>
          <span id="ui-scale-label" style="font-family:var(--font-mono);font-size:0.8125rem;font-weight:700;color:var(--accent)">${Math.round((s.uiScale || 0.75) * 100)}%</span>
        </label>
        <input type="range" id="ui-scale-slider" class="ui-scale-slider"
          min="0.60" max="1.40" step="0.05"
          value="${s.uiScale || 0.75}"
          oninput="UI._onScaleInput(this)"
          onchange="UI._onScaleChange(this)"
          style="width:100%;margin-top:0.25rem;display:block">
      </div>
      <div class="form-group" style="margin:0">
        <label class="form-label">${this.t('settings_theme')}</label>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:0.375rem;margin-top:0.25rem">${swatches}</div>
      </div>
      <div class="form-group" style="margin:0">
        <label class="form-label">${this.t('settings_data_title')}</label>
        <div style="display:flex;gap:0.5rem;margin-top:0.25rem">
          <button class="btn btn-secondary" onclick="UI._exportData()" style="flex:1;display:flex;align-items:center;justify-content:center;gap:0.375rem;font-size:0.8125rem">
            <svg data-lucide="download" style="width:0.875rem;height:0.875rem;flex-shrink:0"></svg>${this.t('settings_export_btn')}
          </button>
          <button class="btn btn-secondary" onclick="UI._triggerImport()" style="flex:1;display:flex;align-items:center;justify-content:center;gap:0.375rem;font-size:0.8125rem">
            <svg data-lucide="upload" style="width:0.875rem;height:0.875rem;flex-shrink:0"></svg>${this.t('settings_import_btn')}
          </button>
        </div>
        <input type="file" id="lt-import-file" accept=".json" style="display:none" onchange="UI._importData(this)">
        <button class="btn" onclick="UI._deleteAllData()"
          style="margin-top:0.375rem;width:100%;display:flex;align-items:center;justify-content:center;gap:0.375rem;font-size:0.8125rem;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.3);color:#F87171">
          <svg data-lucide="trash-2" style="width:0.875rem;height:0.875rem;flex-shrink:0"></svg>${this.t('settings_delete_btn')}
        </button>
      </div>
    </div>`;
    const apiTabHTML = `<div style="display:flex;flex-direction:column;gap:0.75rem">
      <div class="form-group" style="margin:0">
        <p style="font-size:0.6875rem;color:var(--text-muted);margin:0 0 0.625rem">${this.t('settings_api_hint')}</p>
        <div style="display:flex;flex-direction:column;gap:0.375rem">
          ${[
        { id: 'lt-api-av', label: this.t('settings_api_av'), val: s.avKey || '' },
        { id: 'lt-api-fx', label: this.t('settings_api_fx'), val: s.fxKey || '' },
      ].map(f => `
            <div>
              <span style="font-size:0.6875rem;color:var(--text-secondary);display:block;margin-bottom:0.1875rem">${f.label}</span>
              <div style="position:relative">
                <input id="${f.id}" type="password" class="form-control"
                  value="${f.val.replace(/"/g, '&quot;')}"
                  style="font-family:var(--font-mono);letter-spacing:.04em;padding-right:2.375rem;font-size:0.75rem">
                <button type="button" onclick="UI._toggleApiVis('${f.id}',this)"
                  style="position:absolute;right:0.5625rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--text-muted);display:flex;align-items:center;padding:0">
                  <svg data-lucide="eye" style="width:0.875rem;height:0.875rem"></svg>
                </button>
              </div>
            </div>`).join('')}
        </div>
        <div style="display:flex;gap:0.5rem;margin-top:0.375rem">
          <button class="btn btn-secondary" onclick="UI._saveApiKeys()"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:0.375rem;font-size:0.8125rem">
            <svg data-lucide="save" style="width:0.8125rem;height:0.8125rem;flex-shrink:0"></svg>${this.t('settings_api_save')}
          </button>
          <button class="btn btn-secondary" id="fetchAllRatesBtn" onclick="typeof Investments!=='undefined'&&Investments.fetchAllRates()"
            data-tooltip="${this.t('settings_update_rates_title')}"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:0.375rem;font-size:0.8125rem">
            <svg data-lucide="refresh-cw" style="width:0.8125rem;height:0.8125rem;flex-shrink:0"></svg>${this.t('settings_update_rates')}
          </button>
        </div>
      </div>
    </div>`;
    const panelsTabHTML = (() => {
      const modules = [
        { key: 'focusmode', icon: 'timer', labelKey: 'nav_pomodoro' },
        { key: 'timelog', icon: 'clock', labelKey: 'nav_time' },
        { key: 'habits', icon: 'check-square', labelKey: 'nav_habits' },
        { key: 'gym', icon: 'dumbbell', labelKey: 'nav_gym' },
        { key: 'plans', icon: 'kanban', labelKey: 'nav_plans' },
        { key: 'goals', icon: 'star', labelKey: 'nav_goals' },
        { key: 'budget', icon: 'wallet', labelKey: 'nav_budget' },
        { key: 'investments', icon: 'trending-up', labelKey: 'nav_investments' },
      ];
      const rows = modules.map(m => {
        const hidden = this.isModuleHidden(m.key);
        const on = !hidden;
        return `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.5625rem 0;border-bottom:1px solid var(--border)">
          <svg data-lucide="${m.icon}" style="width:1rem;height:1rem;color:${on ? 'var(--accent)' : 'var(--text-muted)'};flex-shrink:0;transition:color 0.2s"></svg>
          <span style="flex:1;font-size:0.8125rem;color:${on ? 'var(--text-primary)' : 'var(--text-muted)'};transition:color 0.2s">${this.t(m.labelKey)}</span>
          <button onclick="UI._toggleModule('${m.key}')"
            role="switch" aria-checked="${on}"
            style="position:relative;width:3.25rem;height:1.5rem;border-radius:0.75rem;border:none;padding:0;cursor:pointer;flex-shrink:0;
                   background:${on ? 'var(--green)' : 'var(--red)'};transition:background 0.2s">
            <span style="position:absolute;top:50%;transform:translateY(-50%);
                         ${on ? 'left:0.25rem' : 'right:0.25rem'};
                         font-size:0.5625rem;font-weight:700;letter-spacing:.04em;
                         color:${on ? 'rgba(0,60,30,0.85)' : 'rgba(100,0,0,0.8)'};user-select:none;line-height:1">
              ${on ? 'ON' : 'OFF'}
            </span>
            <span style="position:absolute;top:50%;transform:translateY(-50%);
                         left:${on ? '1.9375rem' : '0.125rem'};
                         width:1.125rem;height:1.125rem;border-radius:50%;
                         background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.35);
                         transition:left 0.2s"></span>
          </button>
        </div>`;
      }).join('');
      return `<div style="display:flex;flex-direction:column;gap:0">
        <p style="font-size:0.6875rem;color:var(--text-muted);margin:0 0 0.625rem">${this.t('settings_panels_hint')}</p>
        ${rows}
      </div>`;
    })();
    return `<div style="display:flex;flex-direction:column;gap:0">
      <div style="display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:0.875rem">
        ${_tabBtn('ui', this.t('settings_tab_ui'))}
        ${_tabBtn('panels', this.t('settings_tab_panels'))}
        ${_tabBtn('api', 'API')}
      </div>
      ${activeTab === 'panels' ? panelsTabHTML : activeTab === 'api' ? apiTabHTML : uiTabHTML}
    </div>`;
  },

  _renderSettingsModal() {
    if (this._settingsModal && this._settingsModal._overlay && this._settingsModal._overlay.isConnected) {
      this._settingsModal.setContent(this._settingsBodyHTML());
    }
  },

  _switchSettingsTab(tab) {
    this._settingsActiveTab = tab;
    this._renderSettingsModal();
  },

  _exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('lt_')) {
        try { data[key] = JSON.parse(localStorage.getItem(key)); }
        catch { data[key] = localStorage.getItem(key); }
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `lifetracker-backup-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  _triggerImport() {
    const input = document.getElementById('lt-import-file');
    if (input) { input.value = ''; input.click(); }
  },

  _showConfirm({ title, message, confirmLabel, confirmDanger = false, onConfirm, onCancel }) {
    const modal = new CustomModal({
      title,
      icon: confirmDanger ? 'triangle-alert' : 'info',
      variant: confirmDanger ? 'danger' : 'default',
      content: `<p>${message}</p>`,
      width: 400,
      zIndex: 9000,
      buttons: [
        { label: this.t('btn_cancel'), variant: 'secondary', onClick: m => { m.close(); onCancel?.(); } },
        {
          label: confirmLabel, variant: confirmDanger ? 'danger' : 'primary',
          onClick: m => { m.close(); onConfirm(); }
        },
      ],
    });
    modal.open();
  },

  _deleteAllData() {
    const modal = new CustomModal({
      title: this.t('settings_delete_choice_title'),
      subtitle: this.t('settings_delete_choice_subtitle'),
      icon: 'database',
      variant: 'danger',
      width: 560,
      zIndex: 9000,
      content: `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius);padding:1.125rem;display:flex;flex-direction:column;gap:0.625rem">
            <div style="font-size:1.5rem">🔄</div>
            <div style="font-size:0.8125rem;font-weight:600;color:var(--text-primary)">${this.t('settings_delete_reset_label')}</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.55;flex:1">${this.t('settings_delete_reset_desc')}</div>
            <button id="lt-delete-reset-btn"
              style="margin-top:0.25rem;padding:0.5625rem 0.875rem;border-radius:var(--radius-sm);
                     background:var(--bg-surface);border:1.5px solid var(--accent);
                     color:var(--accent);font-size:0.8125rem;font-weight:600;cursor:pointer;width:100%;
                     font-family:var(--font-body)">
              ${this.t('settings_delete_reset_btn')}
            </button>
          </div>
          <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius);padding:1.125rem;display:flex;flex-direction:column;gap:0.625rem">
            <div style="font-size:1.5rem">💥</div>
            <div style="font-size:0.8125rem;font-weight:600;color:var(--red)">${this.t('settings_delete_wipe_label')}</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.55;flex:1">${this.t('settings_delete_wipe_desc')}</div>
            <button id="lt-delete-wipe-btn"
              style="margin-top:0.25rem;padding:0.5625rem 0.875rem;border-radius:var(--radius-sm);
                     background:var(--bg-surface);border:1.5px solid var(--red);
                     color:var(--red);font-size:0.8125rem;font-weight:600;cursor:pointer;width:100%;
                     font-family:var(--font-body)">
              ${this.t('settings_delete_wipe_btn')}
            </button>
          </div>
        </div>`,
      buttons: [
        { label: this.t('btn_cancel'), variant: 'secondary', onClick: m => m.close() },
      ],
    });
    modal.open();

    const body = modal.getBody();

    body.querySelector('#lt-delete-reset-btn').addEventListener('click', () => {
      modal.close();
      Object.keys(localStorage).filter(k => k.startsWith('lt_')).forEach(k => localStorage.removeItem(k));
      Store.seed();
      this.toast(this.t('settings_delete_reset_ok'), 'success');
      setTimeout(() => location.reload(), 800);
    });

    body.querySelector('#lt-delete-wipe-btn').addEventListener('click', () => {
      modal.close();
      this._showConfirm({
        title: this.t('settings_delete_wipe_label'),
        message: this.t('settings_delete_wipe_confirm'),
        confirmLabel: this.t('settings_delete_wipe_btn'),
        confirmDanger: true,
        onConfirm: () => {
          Object.keys(localStorage).filter(k => k.startsWith('lt_')).forEach(k => localStorage.removeItem(k));
          ['gym', 'time', 'habits', 'plans', 'inv', 'goals', 'budget', 'pomo', 'todos', 'deposits'].forEach(m => localStorage.setItem('lt_' + m + '_seeded', 'true'));
          this.toast(this.t('settings_delete_wipe_ok'), 'success');
          setTimeout(() => location.reload(), 800);
        },
      });
    });
  },

  _saveApiKeys() {
    const av = (document.getElementById('lt-api-av')?.value || '').trim();
    const fx = (document.getElementById('lt-api-fx')?.value || '').trim();
    Store.setSettings({ ...Store.getSettings(), avKey: av, fxKey: fx });
    this.toast(this.t('settings_api_saved'), 'success');
  },

  _toggleApiVis(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    const show = el.type === 'password';
    el.type = show ? 'text' : 'password';
    btn.innerHTML = `<svg data-lucide="${show ? 'eye-off' : 'eye'}" style="width:0.875rem;height:0.875rem"></svg>`;
    lucide.createIcons({ nodes: [btn] });
  },

  _importData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        const hasLtKey = Object.keys(data).some(k => k.startsWith('lt_'));
        if (!hasLtKey) throw new Error('no_lt');
        const _doImport = () => {
          Object.keys(localStorage)
            .filter(k => k.startsWith('lt_'))
            .forEach(k => localStorage.removeItem(k));
          Object.entries(data).forEach(([k, v]) => {
            if (k.startsWith('lt_')) localStorage.setItem(k, JSON.stringify(v));
          });
          const budgetCfgRaw = data['lt_budget_cfg'];
          if (budgetCfgRaw && typeof budgetCfgRaw === 'object') {
            const cycleDay = budgetCfgRaw.cycleDay || 1;
            const today = new Date();
            const d = today.getDate() >= cycleDay
              ? new Date(today.getFullYear(), today.getMonth(), cycleDay)
              : new Date(today.getFullYear(), today.getMonth() - 1, cycleDay);
            const pad = n => String(n).padStart(2, '0');
            const safeStart = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            localStorage.setItem('lt_budget_cfg', JSON.stringify({ ...budgetCfgRaw, cycleDay, lastCycleStart: safeStart }));
          }
          this.toast(this.t('settings_import_ok'), 'success');
          setTimeout(() => location.reload(), 800);
        };
        this._showConfirm({
          title: this.t('settings_import_title'),
          message: this.t('settings_import_confirm'),
          confirmLabel: this.t('settings_import_btn'),
          confirmDanger: false,
          onConfirm: _doImport,
        });
      } catch {
        this.toast(this.t('settings_import_err'), 'error');
      }
    };
    reader.readAsText(file);
  },

  _setTheme(theme) {
    const s = Store.getSettings();
    Store.setSettings({ ...s, theme });
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? '' : theme);
    if (theme === 'dark') document.documentElement.removeAttribute('data-theme');
    this._renderSettingsModal();
    document.dispatchEvent(new CustomEvent('lt:theme-change', { detail: { theme } }));
    requestAnimationFrame(() => this._updateFavicon());
  },

  _updateFavicon() {
    const isWhite = (Store.getSettings().theme || 'dark') === 'white';
    const bg = isWhite ? '#F2F2F2' : '#0D0D0D';
    const stroke = isWhite ? '#111111' : (getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#DEDEDE');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${bg}"/><polyline points="3,20 7,20 10,10 13.5,25 17,13 20.5,22 24,16 29,16" fill="none" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector('link[rel="icon"]');
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; link.type = 'image/svg+xml'; document.head.appendChild(link); }
    const old = link.href;
    link.href = url;
    if (old && old.startsWith('blob:')) URL.revokeObjectURL(old);
  },

  _setLang(lang) {
    const s = Store.getSettings();
    Store.setSettings({ ...s, language: lang });
    this._renderSettingsModal();
    this.applyTranslations();
    document.dispatchEvent(new CustomEvent('lt:language-change', { detail: { lang } }));
  },

  _CURRENCIES: [
    { sym: '$', code: 'USD', name: 'US Dollar' },
    { sym: '€', code: 'EUR', name: 'Euro' },
    { sym: '£', code: 'GBP', name: 'British Pound' },
    { sym: '¥', code: 'JPY', name: 'Japanese Yen' },
    { sym: '元', code: 'CNY', name: 'Chinese Yuan' },
    { sym: '₹', code: 'INR', name: 'Indian Rupee' },
    { sym: 'R$', code: 'BRL', name: 'Brazilian Real' },
    { sym: 'Mex$', code: 'MXN', name: 'Mexican Peso' },
    { sym: '₽', code: 'RUB', name: 'Russian Ruble' },
    { sym: '฿', code: 'THB', name: 'Thai Baht' },
    { sym: '₺', code: 'TRY', name: 'Turkish Lira' },
  ],

  _openCurrencyDropdown(btn) {
    // Lazy-init: btn her modal açılışında yeni element olabilir (settings modal rebuild)
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn,
        items: this._CURRENCIES.map(c => ({ value: c.sym, label: c.name, badge: c.sym, badge2: c.code })),
        onOpen: (dd) => dd.setValue(Store.getSettings().currency),
        onSelect: (sym) => this._setCurrency(sym),
        renderItem: (item) =>
          `<span style="font-family:var(--font-mono);font-size:0.8125rem;font-weight:700;color:var(--accent);flex-shrink:0;min-width:2.25rem">${item.badge}</span>` +
          `<span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:600;color:var(--text-muted);flex-shrink:0;min-width:2rem">${item.badge2}</span>` +
          `<span class="dd-item-label">${item.label}</span>` +
          `<svg class="dd-item-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        minWidth: 220,
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _setCurrency(currency) {
    const s = Store.getSettings();
    Store.setSettings({ ...s, currency });
    this._renderSettingsModal();
    document.dispatchEvent(new CustomEvent('lt:currency-change', { detail: { currency } }));
  },

  _openLangDropdown(btn) {
    // Lazy-init: btn her modal açılışında yeni element olabilir (settings modal rebuild)
    if (!btn._ddInst) {
      const langs = [
        { code: 'en', flag: '🇬🇧', name: 'English' },
        { code: 'zh', flag: '🇨🇳', name: '中文' },
        { code: 'es', flag: '🇪🇸', name: 'Español' },
        { code: 'fr', flag: '🇫🇷', name: 'Français' },
        { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
      ];
      btn._ddInst = new CustomDropdown({
        btn,
        items: langs.map(l => ({ value: l.code, label: l.name, badge: l.code.toUpperCase(), _flag: l.flag })),
        onOpen: (dd) => dd.setValue(this.getLang()),
        onSelect: (code) => this._setLang(code),
        renderItem: (item) =>
          `<span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:700;color:var(--accent);flex-shrink:0;min-width:1.625rem;letter-spacing:.04em">${item.badge}</span>` +
          `<span class="dd-item-label">${item.label}</span>` +
          `<svg class="dd-item-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        minWidth: 160,
        align: 'left',
      });
    }
    btn._ddInst.toggle();
  },

  _onScaleInput(slider) {
    const val = parseFloat(slider.value);
    const label = document.getElementById('ui-scale-label');
    if (label) label.textContent = Math.round(val * 100) + '%';
    document.documentElement.style.fontSize = (16 * val) + 'px';
  },

  _onScaleChange(slider) {
    const val = parseFloat(slider.value);
    const s = Store.getSettings();
    Store.setSettings({ ...s, uiScale: val });
    document.dispatchEvent(new CustomEvent('lt:scale-change', { detail: { scale: val } }));
  },

  // ── Generic themed dropdown ──────────────────────────────
  // items: [{ value, label, active }]
  openDropdown(btn, items, onSelect) {
    const MENU_ID = 'lt-custom-dropdown';
    const existing = document.getElementById(MENU_ID);
    if (existing) {
      if (existing._trigger === btn) { existing.remove(); return; }
      existing.remove();
    }
    const chk = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent);flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>`;
    const menu = document.createElement('div');
    menu.id = MENU_ID;
    menu._trigger = btn;
    menu.style.cssText = 'position:fixed;z-index:99999;background:var(--bg-surface);border:1px solid var(--border);border-radius:0.625rem;padding:4px;box-shadow:0 12px 36px rgba(0,0,0,.8);overflow-y:auto;max-height:300px;';
    menu.innerHTML = items.map(it => {
      const bg = it.active ? 'rgba(124,108,252,.12)' : 'transparent';
      const hoverBg = it.active ? 'rgba(124,108,252,.18)' : 'rgba(255,255,255,.05)';
      return `<div data-val="${it.value}"
        style="display:flex;align-items:center;gap:0.5rem;padding:9px 10px;border-radius:0.4375rem;cursor:pointer;background:${bg}"
        onmouseover="this.style.background='${hoverBg}'"
        onmouseout="this.style.background='${bg}'">
        <span style="font-size:0.8125rem;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${it.label}</span>
        ${it.active ? chk : ''}
      </div>`;
    }).join('');
    menu.querySelectorAll('[data-val]').forEach(el => {
      el.addEventListener('click', () => { onSelect(el.dataset.val); menu.remove(); });
    });
    document.body.appendChild(menu);
    const rect = btn.getBoundingClientRect();
    menu.style.width = btn.offsetWidth + 'px';
    const mh = Math.min(menu.scrollHeight, 300);
    const spaceBelow = window.innerHeight - rect.bottom;
    menu.style.top = (spaceBelow >= mh + 8 ? rect.bottom + 4 : Math.max(8, rect.top - mh - 4)) + 'px';
    menu.style.left = Math.max(8, rect.left) + 'px';
    setTimeout(() => {
      document.addEventListener('click', function h(e) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
          menu.remove(); document.removeEventListener('click', h);
        }
      });
    }, 0);
  },

  // ── Page title helper ────────────────────────────────────
  pageTitle() {
    const navMap = {
      'index.html': 'nav_dashboard',
      'focusmode.html': 'nav_pomodoro',
      'timelog.html': 'nav_time',
      'habits.html': 'nav_habits',
      'gym.html': 'nav_gym',
      'plans.html': 'nav_plans',
      'goals.html': 'nav_goals',
      'budget.html': 'nav_budget',
      'investments.html': 'nav_investments',
    };
    const page = (location.pathname.endsWith('/') ? 'index.html' : location.pathname.split('/').pop()) || 'index.html';
    const key = navMap[page];
    return key ? `${this.t(key)} — LifeTracker` : document.title;
  },

  // ── HTML escaping ────────────────────────────────────────
  esc(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  // ── Date & number formatting ─────────────────────────────
  today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; },

  longDate() {
    const d = new Date();
    const lang = this.getLang();
    // EN: "Saturday, June 13, 2026" (US standard)
    if (lang === 'en') {
      return `${this.DAYS_EN[d.getDay()]}, ${this.MONTHS_LONG_EN[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
    // ZH: "2026年6月13日 周六"
    if (lang === 'zh') {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${this.DAYS_ZH[d.getDay()]}`;
    }
    // ES: "sábado, 13 de junio de 2026"
    if (lang === 'es') {
      return `${this.DAYS_ES[d.getDay()]}, ${d.getDate()} de ${this.MONTHS_LONG_ES[d.getMonth()]} de ${d.getFullYear()}`;
    }
    // FR: "samedi 13 juin 2026"
    if (lang === 'fr') {
      return `${this.DAYS_FR[d.getDay()]} ${d.getDate()} ${this.MONTHS_LONG_FR[d.getMonth()]} ${d.getFullYear()}`;
    }
    // TR: "13 Haziran 2026, Pazar"
    return `${d.getDate()} ${this.MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}, ${this.DAYS[d.getDay()]}`;
  },

  formatDate(s) {
    if (!s) return '—';
    const d = new Date(s + 'T00:00:00');
    const lang = this.getLang();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    // TR: 13.06.2026
    if (lang === 'tr') return `${dd}.${mm}.${yyyy}`;
    // ZH: 2026年6月13日
    if (lang === 'zh') return `${yyyy}年${d.getMonth() + 1}月${d.getDate()}日`;
    // ES: 13/06/2026
    if (lang === 'es') return `${dd}/${mm}/${yyyy}`;
    // FR: 13/06/2026
    if (lang === 'fr') return `${dd}/${mm}/${yyyy}`;
    // EN: 06/13/2026
    return `${mm}/${dd}/${yyyy}`;
  },

  _numLocale() {
    return { tr: 'tr-TR', en: 'en-US', zh: 'zh-CN', es: 'es-ES', fr: 'fr-FR' }[this.getLang()] || 'tr-TR';
  },

  formatCurrency(n, cur = '₺') {
    return cur + new Intl.NumberFormat(this._numLocale(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  },

  formatNum(n) { return new Intl.NumberFormat(this._numLocale()).format(n); },

  fmtMinutes(m) {
    const totalSecs = Math.round(m * 60);
    const h = Math.floor(totalSecs / 3600);
    const min = Math.floor((totalSecs % 3600) / 60);
    const sec = totalSecs % 60;
    const hs = this.t('hours_suffix'), ms = this.t('mins_suffix'), ss = this.t('secs_suffix');
    if (h > 0 && min === 0 && sec === 0) return `${h}${hs}`;
    if (h > 0 && sec === 0) return `${h}${hs} ${min}${ms}`;
    if (h > 0) return `${h}${hs} ${min}${ms} ${sec}${ss}`;
    if (min > 0 && sec === 0) return `${min}${ms}`;
    if (min > 0) return `${min}${ms} ${sec}${ss}`;
    return `${sec}${ss}`;
  },

  // Saat/dakika gösterimi — saniye göstermez; 60 saniyeye dolmayan dakikalar "0dk" gösterir
  fmtMinutesHM(m) {
    const ms2 = this.t('mins_suffix');
    if (m <= 0) return `0${ms2}`;
    const totalSecs = Math.round(m * 60);
    const mins = Math.floor(totalSecs / 60);
    const hs = this.t('hours_suffix');
    const h = Math.floor(mins / 60), min = mins % 60;
    if (h > 0 && min === 0) return `${h}${hs}`;
    if (h > 0) return `${h}${hs} ${min}${ms2}`;
    return `${min}${ms2}`;
  },

  // ── Panel Visibility Manager ─────────────────────────────
  _panelPageId: '',
  _pagePanelDefs: [],

  registerPagePanels(pageId, defs) {
    this._panelPageId = pageId;
    this._pagePanelDefs = defs;
    const existing = document.getElementById('panel-manager-btn');
    if (!existing) {
      const header = document.querySelector('header.topbar');
      if (!header) return;
      let right = header.querySelector('.topbar-right');
      if (!right) { right = document.createElement('div'); right.className = 'topbar-right'; header.appendChild(right); }
      const btn = document.createElement('button');
      btn.id = 'panel-manager-btn';
      btn.className = 'btn btn-icon btn-secondary';
      btn.style.cssText = 'color:var(--text-secondary);width:34px;height:34px;min-width:34px;padding:0';
      btn.dataset.tooltip = this.t('panel_manager_title');
      btn.innerHTML = '<svg data-lucide="pie-chart"></svg>';
      btn.addEventListener('click', () => UI.openPanelManager());
      const privacyBtn = document.getElementById('privacy-toggle-btn');
      if (privacyBtn && privacyBtn.parentNode === right) {
        right.insertBefore(btn, privacyBtn.nextSibling);
      } else {
        right.appendChild(btn);
      }
      lucide.createIcons({ nodes: [btn] });
    }
  },

  isPanelVisible(panelId) {
    const v = Store.get(`lt_panels_${this._panelPageId}`) || {};
    return v[panelId] !== false;
  },

  togglePanelVisibility(panelId) {
    const key = `lt_panels_${this._panelPageId}`;
    const v = Store.get(key) || {};
    v[panelId] = !this.isPanelVisible(panelId);
    Store.set(key, v);
    this._renderPanelModal();
    document.dispatchEvent(new CustomEvent('lt:panel-change', { detail: { panelId } }));
  },

  openPanelManager() {
    if (this._panelManagerModal && this._panelManagerModal._overlay && this._panelManagerModal._overlay.isConnected) {
      this._renderPanelModal();
      return;
    }
    this._panelManagerModal = new CustomModal({
      title: this.t('panel_manager_title'),
      icon: 'pie-chart',
      width: 380,
      content: '<div id="lt-panel-list-cm"></div>',
      buttons: [],
    });
    this._panelManagerModal.open();
    this._renderPanelModal();
  },

  _renderPanelModal() {
    if (!this._panelManagerModal || !this._panelManagerModal._overlay || !this._panelManagerModal._overlay.isConnected) return;
    const body = this._panelManagerModal.getBody();
    if (!body) return;

    if (!this._pagePanelDefs || !this._pagePanelDefs.length) {
      body.innerHTML = `<p style="color:var(--text-muted);font-size:0.8125rem;text-align:center">${this.t('panel_empty')}</p>`;
      return;
    }
    body.innerHTML = this._pagePanelDefs.map((p, i, arr) => {
      const on = this.isPanelVisible(p.id);
      const last = i === arr.length - 1;
      return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;${last ? '' : 'border-bottom:1px solid var(--border)'}">
        <div style="display:flex;align-items:center;gap:0.625rem">
          <div style="width:8px;height:8px;border-radius:50%;background:${on ? 'var(--accent)' : 'var(--text-muted)'}"></div>
          <span style="font-size:0.8125rem;font-weight:500;color:${on ? 'var(--text-primary)' : 'var(--text-muted)'}">${p.label}</span>
        </div>
        <button onclick="UI.togglePanelVisibility('${p.id}')"
          style="min-width:3.75rem;height:1.75rem;border-radius:14px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;font-family:var(--font-body);transition:all .15s;
            background:${on ? 'var(--accent)' : 'var(--bg-elevated)'};color:${on ? 'var(--accent-contrast, #fff)' : 'var(--text-muted)'};
            border:1px solid ${on ? 'var(--accent)' : 'var(--border)'}">
          ${on ? this.t('panel_on') : this.t('panel_off')}
        </button>
      </div>`;
    }).join('');
  },

  // ── Privacy ──────────────────────────────────────────────
  isPrivate() { return !!(Store.getSettings().privacyMode); },

  maskCurrency(v, sym = '₺') {
    return this.isPrivate() ? '••••' : this.formatCurrency(v, sym);
  },

  togglePrivacy() {
    const s = Store.getSettings();
    Store.setSettings({ ...s, privacyMode: !s.privacyMode });
    this._syncPrivacyBtns();
    document.dispatchEvent(new CustomEvent('lt:privacy-change'));
  },

  _syncPrivacyBtns() {
    const hidden = this.isPrivate();
    document.querySelectorAll('.privacy-toggle-btn').forEach(btn => {
      btn.dataset.tooltip = hidden ? this.t('privacy_show') : this.t('privacy_hide');
      const svgEl = btn.querySelector('svg');
      if (svgEl) {
        svgEl.setAttribute('data-lucide', hidden ? 'eye-off' : 'eye');
      } else {
        btn.innerHTML = `<svg data-lucide="${hidden ? 'eye-off' : 'eye'}"></svg>`;
      }
      lucide.createIcons({ nodes: [btn] });
    });
  },

  // ── Sidebar ──────────────────────────────────────────────
  initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebar.querySelectorAll('.nav-link').forEach(link => {
      Array.from(link.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const span = document.createElement('span');
          span.className = 'nav-label';
          span.textContent = node.textContent.trim();
          link.replaceChild(span, node);
          link.dataset.tooltip = span.textContent;
        }
      });
    });

    const logo = sidebar.querySelector('.sidebar-logo');

    if (logo && !document.getElementById('lt-version-badge')) {
      const logoText = logo.querySelector('.sidebar-logo-text');
      if (logoText) {
        const group = document.createElement('div');
        group.className = 'sidebar-logo-group';
        logo.insertBefore(group, logoText);
        group.appendChild(logoText);
        const badge = document.createElement('span');
        badge.id = 'lt-version-badge';
        badge.className = 'lt-version-badge';
        badge.textContent = this.VERSION;
        group.appendChild(badge);
      }
    }

    if (logo && !document.getElementById('sidebar-toggle-btn')) {
      const btn = document.createElement('button');
      btn.id = 'sidebar-toggle-btn';
      btn.className = 'sidebar-toggle-btn';
      btn.dataset.tooltip = this.t('sidebar_toggle');
      btn.dataset.tooltipPos = 'right';
      btn.innerHTML = '<svg data-lucide="menu"></svg>';
      btn.addEventListener('click', () => UI.toggleSidebar());
      logo.appendChild(btn);
      lucide.createIcons({ nodes: [btn] });
    }

    if (Store.get('lt_sidebar_collapsed')) {
      sidebar.classList.add('collapsed');
    }
    document.documentElement.classList.remove('sb-collapsed');

    this.applyTranslations();
    this.applyHiddenModules();
  },

  _sidebarToggling: false,

  toggleSidebar() {
    if (this._sidebarToggling) return;
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    this._sidebarToggling = true;
    const isCollapsed = sidebar.classList.toggle('collapsed');
    Store.set('lt_sidebar_collapsed', isCollapsed);
    setTimeout(() => { this._sidebarToggling = false; }, 260);
  },

  // ── Mobile menu ──────────────────────────────────────────
  _initMobileMenu() {
    const header = document.querySelector('header.topbar');
    if (!header || document.getElementById('mobile-menu-btn')) return;

    // Backdrop
    if (!document.getElementById('sidebar-backdrop')) {
      const bd = document.createElement('div');
      bd.id = 'sidebar-backdrop';
      bd.className = 'sidebar-backdrop';
      bd.addEventListener('click', () => UI._closeMobileSidebar());
      document.body.appendChild(bd);
    }

    // Hamburger butonu
    const btn = document.createElement('button');
    btn.id = 'mobile-menu-btn';
    btn.className = 'mobile-menu-btn';
    btn.setAttribute('aria-label', 'Menü');
    btn.innerHTML = '<svg data-lucide="menu"></svg>';
    btn.addEventListener('click', () => UI._toggleMobileSidebar());
    header.insertBefore(btn, header.firstChild);
    lucide.createIcons({ nodes: [btn] });
  },

  _toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;
    if (sidebar.classList.contains('mobile-open')) {
      this._closeMobileSidebar();
    } else {
      // collapsed durumunu sakla, drawer açılırken tam sidebar göster
      sidebar.dataset.mobileWasCollapsed = sidebar.classList.contains('collapsed');
      sidebar.classList.remove('collapsed');
      sidebar.classList.add('mobile-open');
      backdrop?.classList.add('active');
    }
  },

  _closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;
    sidebar.classList.remove('mobile-open');
    backdrop?.classList.remove('active');
    // Animasyon bitince collapsed durumunu geri yükle
    if (sidebar.dataset.mobileWasCollapsed === 'true') {
      setTimeout(() => {
        if (!sidebar.classList.contains('mobile-open')) sidebar.classList.add('collapsed');
      }, 240);
    }
  },

  // ── UI Scale ─────────────────────────────────────────────
  applyScale() {
    const scale = Store.getSettings().uiScale || 0.75;
    const label = document.getElementById('ui-scale-label');
    if (label) label.textContent = Math.round(scale * 100) + '%';
    document.documentElement.style.fontSize = (16 * scale) + 'px';
  },

  // ── Seed data warning ─────────────────────────────────────
  _hasSeedData() {
    if (!Store.get('seed_active')) return false;
    // Auto-clear seed_active if user has deleted all seeded modules' data.
    const keys = ['gym_seeded', 'time_seeded', 'habits_seeded', 'plans_seeded', 'inv_seeded', 'goals_seeded', 'budget_seeded', 'pomo_seeded', 'deposits_seeded'];
    if (!keys.some(k => !!Store.get(k))) {
      Store.set('seed_active', null);
      return false;
    }
    return true;
  },

  _injectSeedWarning() {
    if (!this._hasSeedData()) return;
    if (document.getElementById('seed-warning-badge')) return;
    const header = document.querySelector('header.topbar');
    if (!header) return;

    const badge = document.createElement('div');
    badge.id = 'seed-warning-badge';
    badge.className = 'seed-warning-badge';
    badge.innerHTML = `
      <svg class="swb-icon" data-lucide="alert-triangle"></svg>
      <div class="swb-content">
        <span class="swb-label" data-i18n="seed_warning_label">${this.t('seed_warning_label')}</span>
        <span class="swb-sub" data-i18n="seed_warning_desc">${this.t('seed_warning_desc')}</span>
      </div>
    `;

    badge.addEventListener('click', () => UI.openSettings());

    // Insert as flex child before topbar-right so it stays centered
    // between the title and the right-side buttons without overlapping the focus widget.
    const right = header.querySelector('.topbar-right');
    if (right) header.insertBefore(badge, right);
    else header.appendChild(badge);

    lucide.createIcons({ nodes: [badge] });
  },

  // ── Topbar init ──────────────────────────────────────────
  initTopbar({ noPrivacy = false } = {}) {
    this.applyScale();
    const el = document.getElementById('topbar-date');
    if (el) el.textContent = this.longDate();
    this.initSidebar();
    const _reopenTab = sessionStorage.getItem('lt_settings_reopen');
    if (_reopenTab) {
      sessionStorage.removeItem('lt_settings_reopen');
      setTimeout(() => this.openSettings(_reopenTab), 350);
    }
    this._initMobileMenu();
    const savedTheme = Store.getSettings().theme || 'dark';
    if (savedTheme !== 'dark') document.documentElement.setAttribute('data-theme', savedTheme);
    else document.documentElement.removeAttribute('data-theme');
    this._updateFavicon();

    if (!noPrivacy && !document.getElementById('privacy-toggle-btn')) {
      const header = document.querySelector('header.topbar');
      if (header) {
        let right = header.querySelector('.topbar-right');
        if (!right) {
          right = document.createElement('div');
          right.className = 'topbar-right';
          header.appendChild(right);
        }
        const btn = document.createElement('button');
        btn.id = 'privacy-toggle-btn';
        btn.className = 'btn btn-icon btn-secondary privacy-toggle-btn';
        btn.style.cssText = 'color:var(--text-secondary);width:34px;height:34px;min-width:34px;padding:0';
        btn.innerHTML = '<svg data-lucide="eye"></svg>';
        btn.addEventListener('click', () => UI.togglePrivacy());
        right.insertBefore(btn, right.firstChild);
        lucide.createIcons({ nodes: [btn] });
      }
    }

    if (!noPrivacy) this._syncPrivacyBtns();
    this._injectSeedWarning();
  },

  // ── Modal ────────────────────────────────────────────────
  openModal(id) {
    const o = document.getElementById(id);
    if (!o) return;
    o.classList.add('open');
    const close = () => o.classList.remove('open');
    let _mdOnOverlay = false;
    o.addEventListener('mousedown', e => { _mdOnOverlay = e.target === o; }, { once: true });
    o.addEventListener('click', e => { if (e.target === o && _mdOnOverlay) close(); }, { once: true });
  },
  closeModal(id) { document.getElementById(id)?.classList.remove('open'); },

  initEsc() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    });
  },

  // ── Toast ────────────────────────────────────────────────
  toast(msg, type = 'info') {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const icons = { success: 'check-circle', error: 'x-circle', info: 'info', warning: 'alert-triangle' };
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    // Sadece background'u nötr tut — tema renkli bg-elevated'ın lacivert/renkli tonunu engelle
    const _th = document.documentElement.getAttribute('data-theme') || 'dark';
    t.style.background = _th === 'white' ? '#FFFFFF' : '#242428';
    t.innerHTML = `<svg class="toast-icon" data-lucide="${icons[type]}"></svg><span class="toast-text">${msg}</span>`;
    c.appendChild(t);
    lucide.createIcons({ nodes: [t] });
    setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 220); }, 3000);
  },

  // ── Component helpers ────────────────────────────────────
  priorityBadge(p) {
    const map = {
      high: ['badge-red', this.t('priority_high')],
      medium: ['badge-yellow', this.t('priority_medium')],
      low: ['badge-blue', this.t('priority_low')],
    };
    const [cls, lbl] = map[p] || ['badge-gray', p];
    return `<span class="badge ${cls}">${lbl}</span>`;
  },

  catBadge(cat) {
    const _MAP = {
      // Turkish storage keys
      'Çalışma': 'pomo_cat_work', 'Öğrenme': 'pomo_cat_learn', 'Egzersiz': 'pomo_cat_exercise',
      'Sosyal': 'pomo_cat_social', 'Uyku': 'pomo_cat_sleep', 'Diğer': 'pomo_cat_other',
      'Proje': 'plans_cat_project', 'Eğitim': 'plans_cat_education', 'Finans': 'plans_cat_finance',
      'Yatırım': 'plans_cat_investment', 'Kişisel': 'plans_cat_personal', 'Sağlık': 'plans_cat_health',
      // English legacy keys (stored before value attrs were added)
      'Work': 'pomo_cat_work', 'Learning': 'pomo_cat_learn', 'Exercise': 'pomo_cat_exercise',
      'Social': 'pomo_cat_social', 'Sleep': 'pomo_cat_sleep', 'Other': 'pomo_cat_other',
      'Project': 'plans_cat_project', 'Education': 'plans_cat_education', 'Finance': 'plans_cat_finance',
      'Investment': 'plans_cat_investment', 'Personal': 'plans_cat_personal', 'Health': 'plans_cat_health',
    };
    const display = _MAP[cat] ? this.t(_MAP[cat]) : cat;
    return `<span class="badge badge-purple">${display}</span>`;
  },

  emptyState(text, icon = 'inbox') {
    return `<div class="empty-state">
      <svg class="empty-state-icon" data-lucide="${icon}"></svg>
      <p class="empty-state-text">${text}</p>
    </div>`;
  },

  kpiCard({ label, value, mono = false, change, changeUp, icon, iconColor }) {
    return `<div class="kpi-card">
      <div class="kpi-card-header">
        <span class="kpi-label">${label}</span>
        <div class="kpi-icon" style="background:${iconColor}22;color:${iconColor}">
          <svg data-lucide="${icon}"></svg>
        </div>
      </div>
      <div class="kpi-value${mono ? ' mono' : ''}">${value}</div>
      <div class="kpi-change">
        <span class="${changeUp ? 'badge-up' : 'badge-down'}">${changeUp ? '▲' : '▼'} ${change}</span>
      </div>
    </div>`;
  },

  // ── Expand overlay (sabit-pozisyon, layout kaymaz) ─────────
  showExpandOverlay(btnEl, title, htmlContent) {
    let overlay = document.getElementById('lt-expand-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'lt-expand-overlay';
      overlay.className = 'lt-expand-overlay';
      document.body.appendChild(overlay);

      document.addEventListener('click', e => {
        const ov = document.getElementById('lt-expand-overlay');
        if (!ov || ov.style.display === 'none') return;
        if (!ov.contains(e.target) && !e.target.closest('.lt-show-more-btn'))
          UI.closeExpandOverlay();
      });
    }

    overlay.innerHTML = `
      <div class="lt-expand-overlay-header">
        <span>${title}</span>
        <button class="btn btn-icon btn-secondary" style="width:1.625rem;height:1.625rem;flex-shrink:0" onclick="UI.closeExpandOverlay()">
          <svg data-lucide="x" style="width:0.875rem;height:0.875rem"></svg>
        </button>
      </div>
      <div class="lt-expand-overlay-body">${htmlContent}</div>`;

    const panel = btnEl.closest ? btnEl.closest('.panel') : null;
    const panelRect = panel ? panel.getBoundingClientRect() : null;
    const btnRect = btnEl.getBoundingClientRect();
    const w = panelRect ? Math.floor(panelRect.width) : Math.min(520, window.innerWidth - 32);
    const _sidebarEl = document.querySelector('.sidebar');
    const _topbarEl = document.querySelector('.topbar');
    const minX = _sidebarEl ? _sidebarEl.offsetWidth + 4 : 8;
    const minY = _topbarEl ? _topbarEl.offsetHeight + 4 : 8;
    let left = panelRect ? panelRect.left : btnRect.left;
    if (left < minX) left = minX;
    if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
    let top = btnRect.bottom + 6;
    if (top + window.innerHeight * 0.55 > window.innerHeight - 16)
      top = Math.max(minY, btnRect.top - Math.min(window.innerHeight * 0.55, 400) - 6);
    if (top < minY) top = minY;

    overlay.style.cssText = `display:block;left:${left}px;top:${top}px;width:${w}px`;
    lucide.createIcons({ nodes: [overlay] });

    const header = overlay.querySelector('.lt-expand-overlay-header');
    if (header) {
      header.style.cursor = 'grab';
      let dragX = 0, dragY = 0;
      function _onMouseMove(e) {
        const sidebarEl = document.querySelector('.sidebar');
        const topbarEl = document.querySelector('.topbar');
        const minX = sidebarEl ? sidebarEl.offsetWidth + 4 : 4;
        const minY = topbarEl ? topbarEl.offsetHeight + 4 : 4;
        const nx = Math.max(minX, Math.min(window.innerWidth - overlay.offsetWidth - 4, overlay.offsetLeft + e.clientX - dragX));
        const ny = Math.max(minY, Math.min(window.innerHeight - overlay.offsetHeight - 4, overlay.offsetTop + e.clientY - dragY));
        overlay.style.left = nx + 'px';
        overlay.style.top = ny + 'px';
        dragX = e.clientX;
        dragY = e.clientY;
      }
      function _onMouseUp() {
        header.style.cursor = 'grab';
        document.removeEventListener('mousemove', _onMouseMove);
        document.removeEventListener('mouseup', _onMouseUp);
      }
      header.addEventListener('mousedown', e => {
        if (e.target.closest('button')) return;
        e.preventDefault();
        dragX = e.clientX;
        dragY = e.clientY;
        header.style.cursor = 'grabbing';
        document.addEventListener('mousemove', _onMouseMove);
        document.addEventListener('mouseup', _onMouseUp);
      });
    }
  },

  closeExpandOverlay() {
    const el = document.getElementById('lt-expand-overlay');
    if (el) el.style.display = 'none';
  },
};
