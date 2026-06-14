const UI = {
  MONTHS_SHORT: ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'],
  MONTHS_LONG:  ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
  DAYS:         ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],

  MONTHS_SHORT_EN: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  MONTHS_LONG_EN:  ['January','February','March','April','May','June','July','August','September','October','November','December'],
  DAYS_EN:         ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],

  MONTHS_SHORT_ZH: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  MONTHS_LONG_ZH:  ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  DAYS_ZH:         ['周日','周一','周二','周三','周四','周五','周六'],

  MONTHS_SHORT_ES: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  MONTHS_LONG_ES:  ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
  DAYS_ES:         ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],

  MONTHS_SHORT_FR: ['jan.','fév.','mar.','avr.','mai','juin','juil.','août','sep.','oct.','nov.','déc.'],
  MONTHS_LONG_FR:  ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
  DAYS_FR:         ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],

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
      dash_net_worth_change: 'yatırım + bütçe tasarrufu',
      dash_over_limit: 'limit aşıldı',
      dash_in_limit: 'limit dahilinde',
      dash_no_plans: 'Yaklaşan plan yok',
      dash_today: 'Bugün',
      dash_tomorrow: 'Yarın',
      dash_no_assets: 'Portföyde varlık yok',
      dash_no_sessions: 'Henüz oturum yok',
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
      inv_no_assets: 'Henüz varlık eklenmedi',
      inv_asset_added: 'Varlık eklendi',
      inv_asset_updated: 'Varlık güncellendi',
      inv_asset_deleted: 'Varlık silindi',
      inv_confirm_delete: 'Bu varlığı silmek istediğinizden emin misiniz?',
      inv_just_now: 'az önce',
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
      bud_history_btn:     'Geçmiş',
      bud_history_title:   'Bütçe Geçmişi',
      bud_history_empty:   'Henüz tamamlanmış döngü yok',
      bud_history_no_data: 'Bu döngü için işlem verisi kaydedilmemiş',
      bud_history_cycle:   'Döngü',
      bud_history_add_tx:  'İşlem Ekle',
      bud_history_no_tx:   'Bu döngüde işlem kaydı yok',
      bud_cycle_settings_title: 'Bütçe Döngüsü',
      bud_cycle_start: 'Başlangıç',
      bud_cycle_end: 'Bitiş',
      bud_cycle_desc: 'Bitiş tarihi geçtiğinde işlemler arşivlenir; net bakiye grafik verisi olarak saklanır.',
      bud_cycle_saved: 'Döngü ayarları kaydedildi',
      bud_add_tx_btn: 'İşlem Ekle',
      bud_import_budget_btn: 'Veri Aktar',
      import_data_btn:      'Veri Aktar',
      import_data_confirm:  'Mevcut modül verileri silinecek ve dosyadaki verilerle değiştirilecek. Devam edilsin mi?',
      import_data_ok:       'Veriler başarıyla aktarıldı',
      import_data_err:      'Geçerli modül verisi bulunamadı',
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
      inv_type_bond: '📄 Tahvil / Mevduat',
      inv_type_cash: '💵 Nakit / Döviz',
      inv_type_stock_lbl: 'Hisse', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Kripto',
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
      dash_net_worth_change: 'investments + budget savings',
      dash_over_limit: 'over limit',
      dash_in_limit: 'within limit',
      dash_no_plans: 'No upcoming plans',
      dash_today: 'Today',
      dash_tomorrow: 'Tomorrow',
      dash_no_assets: 'No assets in portfolio',
      dash_no_sessions: 'No sessions yet',
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
      inv_no_assets: 'No assets added yet',
      inv_asset_added: 'Asset added',
      inv_asset_updated: 'Asset updated',
      inv_asset_deleted: 'Asset deleted',
      inv_confirm_delete: 'Are you sure you want to delete this asset?',
      inv_just_now: 'just now',
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
      bud_history_btn:     'History',
      bud_history_title:   'Budget History',
      bud_history_empty:   'No completed cycles yet',
      bud_history_no_data: 'No transaction data saved for this cycle',
      bud_history_cycle:   'Cycle',
      bud_history_add_tx:  'Add Transaction',
      bud_history_no_tx:   'No transactions in this cycle',
      bud_cycle_settings_title: 'Budget Cycle',
      bud_cycle_start: 'Start',
      bud_cycle_end: 'End',
      bud_cycle_desc: 'When the end date passes, transactions are archived; net balance is saved for charts.',
      bud_cycle_saved: 'Cycle settings saved',
      bud_add_tx_btn: 'Add Transaction',
      bud_import_budget_btn: 'Import Data',
      import_data_btn:      'Import Data',
      import_data_confirm:  'Existing module data will be deleted and replaced with the imported data. Continue?',
      import_data_ok:       'Data imported successfully',
      import_data_err:      'No valid module data found in file',
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
      inv_type_bond: '📄 Bond / Deposit',
      inv_type_cash: '💵 Cash / Currency',
      inv_type_stock_lbl: 'Stock', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Crypto',
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
      dash_net_worth_change: '投资 + 预算储蓄',
      dash_over_limit: '超出限额',
      dash_in_limit: '在限额内',
      dash_no_plans: '暂无即将到来的计划',
      dash_today: '今天',
      dash_tomorrow: '明天',
      dash_no_assets: '投资组合中没有资产',
      dash_no_sessions: '暂无会话',
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
      inv_no_assets: '暂未添加资产',
      inv_asset_added: '资产已添加',
      inv_asset_updated: '资产已更新',
      inv_asset_deleted: '资产已删除',
      inv_confirm_delete: '确定要删除此资产吗？',
      inv_just_now: '刚刚',
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
      bud_history_btn:     '历史',
      bud_history_title:   '预算历史',
      bud_history_empty:   '暂无已完成的周期',
      bud_history_no_data: '此周期未保存交易数据',
      bud_history_cycle:   '周期',
      bud_history_add_tx:  '添加交易',
      bud_history_no_tx:   '此周期暂无交易',
      bud_cycle_settings_title: '预算周期',
      bud_cycle_start: '开始',
      bud_cycle_end: '结束',
      bud_cycle_desc: '截止日期过后，交易将被归档；净余额将保存用于图表。',
      bud_cycle_saved: '周期设置已保存',
      bud_add_tx_btn: '添加交易',
      bud_import_budget_btn: '导入数据',
      import_data_btn:      '导入数据',
      import_data_confirm:  '现有模块数据将被删除并替换为导入的数据。是否继续？',
      import_data_ok:       '数据导入成功',
      import_data_err:      '文件中未找到有效的模块数据',
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
      inv_type_bond: '📄 债券 / 存款',
      inv_type_cash: '💵 现金 / 外汇',
      inv_type_stock_lbl: '股票', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: '加密货币',
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
      dash_net_worth_change: 'inversiones + ahorro presupuestario',
      dash_over_limit: 'sobre el límite',
      dash_in_limit: 'dentro del límite',
      dash_no_plans: 'Sin planes próximos',
      dash_today: 'Hoy',
      dash_tomorrow: 'Mañana',
      dash_no_assets: 'Sin activos en el portafolio',
      dash_no_sessions: 'Sin sesiones aún',
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
      inv_no_assets: 'Aún no hay activos',
      inv_asset_added: 'Activo añadido',
      inv_asset_updated: 'Activo actualizado',
      inv_asset_deleted: 'Activo eliminado',
      inv_confirm_delete: '¿Seguro que quieres eliminar este activo?',
      inv_just_now: 'ahora mismo',
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
      bud_history_btn:     'Historial',
      bud_history_title:   'Historial de presupuesto',
      bud_history_empty:   'Aún no hay ciclos completados',
      bud_history_no_data: 'No hay datos de transacciones guardados para este ciclo',
      bud_history_cycle:   'Ciclo',
      bud_history_add_tx:  'Añadir transacción',
      bud_history_no_tx:   'No hay transacciones en este ciclo',
      bud_cycle_settings_title: 'Ciclo de presupuesto',
      bud_cycle_start: 'Inicio',
      bud_cycle_end: 'Fin',
      bud_cycle_desc: 'Cuando pase la fecha de fin, las transacciones se archivan; el saldo neto se guarda para los gráficos.',
      bud_cycle_saved: 'Ajustes del ciclo guardados',
      bud_add_tx_btn: 'Añadir transacción',
      bud_import_budget_btn: 'Importar datos',
      import_data_btn:      'Importar datos',
      import_data_confirm:  'Los datos del módulo actuales se eliminarán y reemplazarán con los importados. ¿Continuar?',
      import_data_ok:       'Datos importados correctamente',
      import_data_err:      'No se encontraron datos válidos del módulo',
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
      inv_type_bond: '📄 Bono / Depósito',
      inv_type_cash: '💵 Efectivo / Divisa',
      inv_type_stock_lbl: 'Acción', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Cripto',
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
      dash_net_worth_change: 'investissements + épargne budgétaire',
      dash_over_limit: 'au-dessus de la limite',
      dash_in_limit: 'dans la limite',
      dash_no_plans: 'Aucun plan à venir',
      dash_today: "Aujourd'hui",
      dash_tomorrow: 'Demain',
      dash_no_assets: 'Aucun actif dans le portefeuille',
      dash_no_sessions: "Aucune session pour l'instant",
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
      inv_no_assets: "Aucun actif pour l'instant",
      inv_asset_added: 'Actif ajouté',
      inv_asset_updated: 'Actif mis à jour',
      inv_asset_deleted: 'Actif supprimé',
      inv_confirm_delete: 'Êtes-vous sûr de vouloir supprimer cet actif ?',
      inv_just_now: "à l'instant",
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
      bud_history_btn:     'Historique',
      bud_history_title:   'Historique budgétaire',
      bud_history_empty:   'Aucun cycle terminé pour le moment',
      bud_history_no_data: 'Aucune donnée de transaction enregistrée pour ce cycle',
      bud_history_cycle:   'Cycle',
      bud_history_add_tx:  'Ajouter une transaction',
      bud_history_no_tx:   'Aucune transaction dans ce cycle',
      bud_cycle_settings_title: 'Cycle budgétaire',
      bud_cycle_start: 'Début',
      bud_cycle_end: 'Fin',
      bud_cycle_desc: 'Quand la date de fin est passée, les transactions sont archivées ; le solde net est sauvegardé pour les graphiques.',
      bud_cycle_saved: 'Paramètres du cycle enregistrés',
      bud_add_tx_btn: 'Ajouter une transaction',
      bud_import_budget_btn: 'Importer les données',
      import_data_btn:      'Importer les données',
      import_data_confirm:  "Les données actuelles du module seront supprimées et remplacées. Continuer ?",
      import_data_ok:       'Données importées avec succès',
      import_data_err:      'Aucune donnée de module valide trouvée',
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
      inv_type_bond: '📄 Obligation / Dépôt',
      inv_type_cash: '💵 Liquidités / Devise',
      inv_type_stock_lbl: 'Action', inv_type_etf_lbl: 'ETF', inv_type_crypto_lbl: 'Crypto',
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
      'index.html':       'nav_dashboard',
      'pomodoro.html':    'nav_pomodoro',
      'time.html':        'nav_time',
      'habits.html':      'nav_habits',
      'gym.html':         'nav_gym',
      'plans.html':       'nav_plans',
      'goals.html':       'nav_goals',
      'budget.html':      'nav_budget',
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

    // Settings link in footer
    const settingsLink = document.querySelector('.sidebar-footer .nav-link');
    if (settingsLink) {
      const label = settingsLink.querySelector('.nav-label');
      const txt = this.t('sidebar_settings');
      if (label) label.textContent = txt;
      settingsLink.dataset.tooltip = txt;
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
    const pages = this._helpPages()[lang] || this._helpPages()['en'];
    const titles = { tr: 'Kullanım Kılavuzu', en: 'User Guide', zh: '使用指南', es: 'Guía de uso', fr: "Guide d'utilisation" };
    const tipLabels = { tr: 'İpucu', en: 'Tip', zh: '提示', es: 'Consejo', fr: 'Astuce' };
    const featLabels = { tr: 'Özellikler', en: 'Features', zh: '功能', es: 'Funciones', fr: 'Fonctionnalités' };
    const closeLabel = { tr: 'Kapat', en: 'Close', zh: '关闭', es: 'Cerrar', fr: 'Fermer' };

    if (document.getElementById('lt-help-overlay')) return;

    let activePage = 0;

    const overlay = document.createElement('div');
    overlay.id = 'lt-help-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9900;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);animation:lt-fade-in 140ms ease';

    const render = () => {
      const p = pages[activePage];
      const navItems = pages.map((pg, i) => `
        <button onclick="document.getElementById('lt-help-overlay')._setPage(${i})"
          style="display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;border:none;border-radius:var(--radius-sm);cursor:pointer;text-align:left;font-size:0.8125rem;font-weight:${i===activePage?'600':'400'};color:${i===activePage?'var(--accent)':'var(--text-secondary)'};background:${i===activePage?'rgba(124,108,252,.12)':'transparent'};transition:background 120ms">
          <svg data-lucide="${pg.icon}" style="width:15px;height:15px;flex-shrink:0;color:${i===activePage?'var(--accent)':'var(--text-muted)'}"></svg>
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
      overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    };

    overlay._setPage = (i) => { activePage = i; render(); };
    document.body.appendChild(overlay);
    render();
  },

  _helpPages() {
    return {
      tr: [
        { icon:'settings', title:'Ayarlar', desc:'Genel tercihler, görünüm ve veri yönetimi merkezi. Sidebar alt kısmındaki dişli çark ikonuna tıklayarak her sayfadan açılır. Değişiklikler tüm sayfalara anında yansır.',
          features:['Dil seçimi: TR / EN / ZH / ES / FR — arayüz seçilen dile anında geçer','Para birimi: ₺, $, €, £ ve diğerleri — finansal değerlerin gösterim sembolü','Tema: 12 tema (Dark, Midnight, Ocean, Forest, Sunset, Rose, Amber, Crimson, Nebula, Arctic, Neon, White)','Arayüz Ölçeği: %60–%140 arası kaydırıcı — rem tabanlı tüm ölçüler orantılı büyür/küçülür','Gizlilik Modu: para değerlerini •••• ile maskeler; sidebar\'daki göz butonu ya da buradan açılıp kapatılır','Hafta Başlangıcı: Pazartesi veya Pazar seçilebilir — alışkanlık ve zaman grafiklerini etkiler','Yatırım API Anahtarları: Alpha Vantage (hisse/ETF/kripto fiyatı) ve Exchange Rates API (döviz kuru)','Veri Dışa Aktar: tüm lt_ verilerini JSON dosyası olarak bilgisayara indirir','Veri İçe Aktar: JSON dosyasındaki verilerle mevcut tüm verilerin üzerine yazar (geri dönüşü yok)','Tüm Verileri Sil: 🔄 Seed veriye dön — tüm veriler silinir, uygulama örnek verilerle yeniden başlar (sıfırlama güvenli kapı); 💥 Tamamen sil — hiçbir veri kalmaz, geri dönüş yoktur'],
          tip:'İçe Aktar, mevcut tüm verileri silerek dosyadakileri yazar — önce Dışa Aktar ile yedek al. Verilerini kaybetme endişesi varsa "Seed veriye dön" seçeneği her zaman örnek içerikli temiz bir başlangıç sağlar.' },
        { icon:'layout-dashboard', title:'Dashboard', desc:'Tüm modüllerin merkezi özet ekranı. Net varlık, harcama, alışkanlık tamamlama oranı ve aktif hedef sayısı gibi kritik metrikleri tek bakışta görürsün. Panel sırasını ve görünürlüğünü kendi tercihine göre düzenleyebilirsin.',
          features:['Haftalık / Aylık / Yıllık period seçimi ile trend analizi','Panelleri kilit butonuyla sürükle-bırak ile yeniden sırala','Yaklaşan planlar ve gecikmiş görev uyarıları','Yatırım portföyü pasta grafiği ve varlık dağılımı','Hedefler ilerleme çubukları ve milestone sayacı','Son antrenmanlar ve egzersiz detayları','Bütçe harcama durumu — kategori bazlı progress bar\'lar'],
          tip:'Sağ üstteki kilit ikonuna tıklayarak panelleri sürükleyip sıralayabilir, göz ikonuyla da istediğin paneli gizleyebilirsin.' },
        { icon:'timer', title:'Pomodoro', desc:'Üç modlu odak zamanlayıcı. Klasik Pomodoro döngüsü (çalışma + mola), sınırsız Flow modu veya özel geri sayımla derinlemesine odaklanabilirsin. Her oturum otomatik olarak Zaman sayfasına kaydedilir.',
          features:['Pomodoro (25 dk çalışma + mola döngüsü), Flow (sınırsız) ve Geri Sayım modları','Göreve bağlama — aktif görevi başlığa yansıtır; harcanan pomodoro sayısı takip edilir','Alt görev paneli — çalışırken subtask\'ları görüntüle ve işaretle','Bayrak butonu: timer çalışırken anlık split noktası işaretler; geçen süre ve saat kaydedilir','Sıfırla butonu: son flag\'e kadar kaydet / son flag\'e sar / tümünü sil — 3 seçenek sunar','Bitir butonu: tüm süreyi kaydet ya da flag\'lere göre bölerek kaydet seçeneği sunar','Fazla mesai modu: süre dolunca +MM:SS ile devam eder, Bitir butonuyla sonlandırılır','Tarayıcı kapatılsa veya sayfa yenilense bile timer kaldığı yerden devam eder (8 saatlik TTL)','Birden fazla açık sekme gerçek zamanlı olarak birbiriyle senkronize çalışır'],
          tip:'Ayarlar bölümünden çalışma, kısa mola ve uzun mola sürelerini ihtiyacına göre değiştirebilirsin.' },
        { icon:'clock', title:'Zaman Takibi', desc:'Günlük aktivitelerini kategori ve projeye göre kaydet. Pomodoro tamamlandığında loglar otomatik aktarılır; manuel giriş de her zaman yapabilirsin. 30 günlük bar grafik ile zaman dağılımını analiz et.',
          features:['Manuel log ekleme: tarih, kategori, proje, başlangıç–bitiş saati','Pomodoro oturumları otomatik olarak "pomodoro" kaynağıyla aktarılır','Kaynak filtresi: Tümü / Sadece Manuel / Sadece Pomodoro','Tarih aralığı seçimi ile geçmişi analiz et','30 günlük ve haftalık bar grafikler','Aylık geçmiş modalı — gün ve hafta toplamlarıyla'],
          tip:'Pomodoro\'dan gelen kayıtlar "pomodoro" kaynağıyla otomatik eklenir; kaynak filtresiyle sadece Pomodoro veya sadece manuel girişleri ayrı ayrı görüntüleyebilirsin.' },
        { icon:'check-circle', title:'Alışkanlıklar', desc:'Günlük alışkanlıklarını takip et ve seri oluştur. Kalıcı (her gün) veya zamanlanmış (belirli günlerde) alışkanlıklar ekleyebilir, günlük ilerlemeyi görsel ızgara ve grafiklerle izleyebilirsin.',
          features:['İki alışkanlık tipi: Kalıcı (her gün) ve Zamanlanmış (seçili günler)','Günlük atlama (Skip) sistemi — o günü kayıp saymadan geçebilirsin','🔥 Seri sayacı: kaç gün üst üste tamamladığını gösterir','30 günlük tamamlama ızgarası — her alışkanlık için geçmiş','Haftalık donut grafikler ile tamamlama yüzdesi','Sürükle-bırak ile alışkanlık sıralamasını düzenle'],
          tip:'Zamanlanmış bir alışkanlık, seçili olmayan günlerde listede görünmez — o günlerin serini etkilemez.' },
        { icon:'dumbbell', title:'Spor', desc:'Antrenman günlüğü. Kuvvet, kardiyo, esneklik ve diğer türlerde antrenman ekle; egzersizlerini set/tekrar/ağırlık veya süre/mesafe ile kaydet. Şablon kaydet ve birden fazla seferde kullan.',
          features:['Antrenman türleri: Kuvvet, Kardiyo, Esneklik, CrossFit, Spor, Diğer','Kuvvet: set, tekrar, ağırlık (kg/lb) ve kas grubu','Kardiyo: süre (dk) ve mesafe (km)','Şablon kaydetme — sık kullandığın egzersiz setlerini yeniden kullan','Vücut ölçümleri takibi (göğüs, bel, kalça vb.)','1 Tekrar Maksimum (1TM) otomatik hesaplama','Haftalık antrenman hacmi ve ilerleme grafikleri'],
          tip:'kg ve lb arasında geçiş yapmak için sağ üstteki birim toggle\'ını kullan — tüm veriler otomatik dönüştürülür.' },
        { icon:'kanban', title:'Planlar', desc:'Kanban tarzı görev yöneticisi. Görevlerini Yapılacak, Devam Eden ve Tamamlandı sütunlarında takip et. Her görevin altında sürükleyip sıralayabileceğin alt görevler ekleyebilirsin.',
          features:['Kanban (sütun) ve Liste (tablo) görünümleri arasında geçiş','Alt görevler: tamamlandı işareti, çok satırlı metin, sürükle-bırak sıralama','Öncelik seviyeleri: Yüksek (kırmızı), Orta (sarı), Düşük (mavi)','Kategori etiketleri ve son tarih ile organize et','Gecikmiş görevlerde kırmızı tarih uyarısı','Alt görev metni Shift+Enter ile çok satırlı olabilir'],
          tip:'Kanban ve Liste görünümleri arasında geçiş yapabilirsin — Liste modu tüm görevleri son tarihe göre sıralı tek tabloda gösterir, takibi kolaylaştırır.' },
        { icon:'star', title:'Hayaller & Hedefler', desc:'Hayallerini ve hedeflerini milestone\'larla takip et. Her hedefe ilerleme yüzdesi, hedef tarihi, emoji ve renk atayabilirsin. Tamamlanma yaklaştığında kalan gün sayısını gösterir.',
          features:['Milestone (kilometre taşı) listesi — her tik ilerlemeyi günceller','Tamamlama yüzdesi milestone oranından otomatik hesaplanır','Hedef tarihine kaç gün kaldığını gösterir (30 günden az ise kırmızı)','Emoji ve renk özelleştirmesi — her hedef kendine özgü görünür','Düzenleme modunda sürükle-bırak ile hedef sıralaması','Kategori grupları: Kariyer, Seyahat, Sağlık, Eğitim ve daha fazlası'],
          tip:'%100 tamamlandığında konfeti animasyonu ve tebrik bildirimi çıkar.' },
        { icon:'wallet', title:'Bütçe', desc:'Aylık bütçe ve harcama takibi. 3 sekmeli yapısıyla gelir/gider kategori yönetimi, bütçe limitleri ve döngü tabanlı tarihsel arşiv sunar.',
          features:['3 sekme: Özet (KPI ve grafikler), Kategoriler (bütçe yapısı), İşlem Takibi (tüm hareketler)','Özet sekmesi: net gelir, toplam gider, bütçe doluluğu pasta grafiği ve panel sıralama','Kategoriler sekmesi: gelir/gider grupları ve alt kategoriler oluştur, her birine bütçe limiti ata','İşlem Takibi: tüm kayıtlar, metin arama ve kategori/tarih aralığı filtresi','Döngü sistemi: bütçe her ayın belirlenen gününde sıfırlanır; geçmiş dönemler otomatik arşivlenir','Geçmiş döngü modalı: önceki aylara göz at, her dönemin gelir/gider/net özetini incele'],
          tip:'Bütçe > Veri Aktar butonuyla tam bir yedekten yalnızca bütçe verilerini geri yükleyebilirsin.' },
        { icon:'trending-up', title:'Yatırım', desc:'Yatırım portföyünü takip et. Alpha Vantage API ile hisse, ETF ve kripto fiyatlarını otomatik çek; döviz kuru entegrasyonuyla TRY/USD çift para birimi desteği kullan.',
          features:['Varlık türleri: Hisse, ETF, Kripto, Emtia, Tahvil, Nakit','Alpha Vantage API ile otomatik fiyat güncelleme (24 saatlik önbellek)','K/Z hesaplama: Günlük / Haftalık / Aylık / Toplam dönem seçimi','TRY ↔ USD görüntüleme para birimi toggle\'ı','Portföy dağılımı pasta grafiği ve yüzdesel paylar','Ayarlar\'dan Alpha Vantage ve Döviz Kuru API anahtarı girilebilir'],
          tip:'Fiyat çekilemeyen varlıklar (Emtia, Tahvil, Nakit) alış fiyatını kullanır. Gerekirse kalemek üzerinden manuel fiyat girebilirsin.' }
      ],
      en: [
        { icon:'settings', title:'Settings', desc:'General preferences, appearance, and data management hub. Open it from the gear icon at the bottom of the sidebar on any page. Changes apply instantly across all pages.',
          features:['Language: TR / EN / ZH / ES / FR — the entire interface switches immediately','Currency: ₺, $, €, £, and others — controls the display symbol for all financial values','Theme: 12 themes (Dark, Midnight, Ocean, Forest, Sunset, Rose, Amber, Crimson, Nebula, Arctic, Neon, White)','UI Scale: 60%–140% slider — all rem-based sizes scale proportionally up or down','Privacy Mode: masks all currency values with ••••; toggle here or via the eye icon in the sidebar','Week Start: Monday or Sunday — affects habit and time tracking charts','Investment API Keys: Alpha Vantage (stock/ETF/crypto prices) and Exchange Rates API (FX rate)','Export Data: downloads all lt_ data as a JSON backup file to your computer','Import Data: replaces all existing data with the contents of a JSON file (irreversible)','Delete All Data: two options — 🔄 Reset to seed data (all data cleared, app restarts with built-in sample data — safe escape hatch); 💥 Wipe everything (complete erasure, no recovery possible)'],
          tip:'Import overwrites all existing data — always Export a backup first. If you just want a clean slate, "Reset to seed data" is a safe way to restart with sample content.' },
        { icon:'layout-dashboard', title:'Dashboard', desc:'Central overview of all modules. See critical metrics like net worth, spending, habit completion rate, and active goals at a glance. Customize which panels are shown and in what order.',
          features:['Week / Month / Year period selector for trend analysis','Drag-to-reorder panels via the lock button in the top bar','Upcoming plans with overdue task alerts','Investment portfolio pie chart and asset allocation','Goals progress bars and milestone counters','Recent workouts with exercise details','Budget spending status — per-category progress bars'],
          tip:'Click the lock icon in the top bar to enter edit mode, then drag panels to rearrange. Use the eye icon to hide panels you don\'t need.' },
        { icon:'timer', title:'Pomodoro', desc:'Three-mode focus timer. Use classic Pomodoro cycles (work + break), unlimited Flow mode, or a custom countdown. Every completed session is automatically logged to the Time Tracking page.',
          features:['Pomodoro (25 min work + break cycle), Flow (unlimited), and Countdown modes','Link sessions to a task — active task name shown in header; pomodoro usage is tracked','Subtask panel — view and check off subtasks while working','Flag button: marks a split point while the timer runs; records elapsed time and current clock time','Reset button: 3 options — save up to last flag / rewind to last flag / hard reset (discard all)','Finish button: save the full elapsed time, or split by flags and save each segment separately','Overtime mode: continues past the time limit with a +MM:SS counter; ended via the Finish button','Timer state auto-saves — reloading or reopening the tab resumes from where you left off (8h TTL)','Real-time sync across multiple browser tabs'],
          tip:'Adjust work, short break, and long break durations from the settings panel at the top of the timer page.' },
        { icon:'clock', title:'Time Tracking', desc:'Log daily activities by category and project. Pomodoro sessions auto-import; you can also add manual entries anytime. Analyze time distribution with 30-day bar charts.',
          features:['Manual log: date, category, project, start and end time','Pomodoro sessions auto-import tagged with "pomodoro" source','Source filter: All / Manual only / Pomodoro only','Date range picker for historical analysis','30-day and weekly bar charts','Monthly history modal — daily and weekly totals'],
          tip:'Pomodoro sessions are auto-imported with a "pomodoro" source tag. Use the source filter to view only Pomodoro or only manual entries separately.' },
        { icon:'check-circle', title:'Habits', desc:'Track daily habits and build streaks. Add permanent (every day) or scheduled (specific days) habits, and monitor progress through visual grids and charts.',
          features:['Two habit types: Permanent (daily) and Scheduled (selected days only)','Skip system for today — doesn\'t break your streak','🔥 Streak counter: consecutive days completed','30-day completion grid — visual history per habit','Weekly donut charts with completion percentage','Drag-to-reorder habits in the daily checklist'],
          tip:'Scheduled habits only appear on their assigned days — they won\'t affect streaks on other days.' },
        { icon:'dumbbell', title:'Gym', desc:'Workout journal. Add strength, cardio, flexibility and other workouts; log exercises with sets/reps/weight or duration/distance. Save templates to reuse across sessions.',
          features:['Workout types: Strength, Cardio, Flexibility, CrossFit, Sport, Other','Strength: sets, reps, weight (kg/lb) and muscle group','Cardio: duration (min) and distance (km)','Template saving — reuse your most common exercise sets','Body measurements tracker (chest, waist, hips, etc.)','1 Rep Max (1RM) auto-calculation','Weekly volume and progress charts per exercise'],
          tip:'Use the unit toggle in the top right to switch between kg and lb — all existing data converts automatically.' },
        { icon:'kanban', title:'Plans', desc:'Kanban-style task manager. Track tasks across Todo, In Progress, and Done columns. Add subtasks to each task with drag-to-reorder support.',
          features:['Switch between Kanban (columns) and List (table) views','Subtasks: checkboxes, multi-line text, drag-to-reorder','Priority levels: High (red), Medium (yellow), Low (blue)','Category tags and due dates to stay organized','Red overdue alert on past-due tasks','Shift+Enter in subtask text creates a new line'],
          tip:'Switch between Kanban and List views — List mode shows all tasks sorted by due date in a single table, ideal when managing many tasks at once.' },
        { icon:'star', title:'Goals & Dreams', desc:'Track your dreams and goals with milestones. Assign a progress percentage, target date, emoji, and color to each goal. Days remaining is shown as the deadline approaches.',
          features:['Milestone checklist — each tick auto-updates progress percentage','Completion % calculated automatically from milestone ratio','Days remaining shown (red when fewer than 30 days left)','Emoji and color customization for each goal','Drag-to-reorder goals in edit mode','Category groups: Career, Travel, Health, Education, and more'],
          tip:'Reaching 100% triggers a confetti animation and a congratulation toast.' },
        { icon:'wallet', title:'Budget', desc:'Monthly budget and expense tracker with a 3-tab layout. Manage categories, set budget limits, and review historical cycles with full income/expense breakdowns.',
          features:['3 tabs: Overview (KPIs & charts), Categories (budget structure), Transactions (all entries)','Overview tab: net income, total expenses, spending allocation pie chart, and panel reordering','Categories tab: create income/expense groups and subcategories, assign budget limits to each','Transactions tab: full list of entries with text search and date/category filters','Cycle system: budget resets on a chosen day each month; all past periods are archived automatically','Past cycle modal: browse previous months with income, expense, and net summary per period'],
          tip:'Use the "Import Data" button in the Transactions tab to restore only budget data from a full backup.' },
        { icon:'trending-up', title:'Investments', desc:'Track your investment portfolio. Auto-fetch stock, ETF, and crypto prices via the Alpha Vantage API. Multi-currency support with live exchange rate integration.',
          features:['Asset types: Stock, ETF, Crypto, Commodity, Bond, Cash','Auto price updates via Alpha Vantage API (24-hour cache)','P&L tracking: Daily / Weekly / Monthly / Total period selector','TRY ↔ USD display currency toggle','Portfolio allocation pie chart with percentage breakdown','Enter Alpha Vantage and Exchange Rate API keys in Settings'],
          tip:'Assets without API prices (Commodity, Bond, Cash) use the purchase price. You can also override any asset\'s price manually.' }
      ],
      zh: [
        { icon:'settings', title:'设置', desc:'通用偏好设置、外观和数据管理中心。点击任意页面侧边栏底部的齿轮图标即可打开。更改立即反映到所有页面。',
          features:['语言：TR / EN / ZH / ES / FR — 整个界面立即切换','货币：₺、$、€、£等 — 控制所有财务值的显示符号','主题：12个主题（Dark、Midnight、Ocean、Forest、Sunset、Rose、Amber、Crimson、Nebula、Arctic、Neon、White）','界面缩放：60%–140%滑块 — 所有基于rem的尺寸按比例缩放','隐私模式：用••••遮盖所有货币值；在此处或侧边栏眼睛图标切换','周起始日：周一或周日 — 影响习惯和时间追踪图表','投资API密钥：Alpha Vantage（股票/ETF/加密货币价格）和汇率API','导出数据：将所有lt_数据下载为JSON备份文件','导入数据：用JSON文件内容替换所有现有数据（不可撤销）','删除所有数据：两个选项 — 🔄 重置为种子数据（所有数据清除，应用以内置示例数据重新启动，安全的后路）；💥 彻底清除（完全擦除，无法恢复）'],
          tip:'导入会用文件内容覆盖所有现有数据 — 导入前请先导出备份。如果只想重新开始，"重置为种子数据"是安全地以示例内容重启的方式。' },
        { icon:'layout-dashboard', title:'仪表盘', desc:'所有模块的中央概览。一目了然地查看净资产、支出、习惯完成率和活跃目标等关键指标。可自定义面板的显示和排列顺序。',
          features:['周/月/年时间段选择器，用于趋势分析','通过顶部栏的锁定按钮拖拽重新排列面板','即将到期的计划及逾期任务提醒','投资组合饼图和资产分配','目标进度条和里程碑计数器','最近的训练记录及练习详情','预算支出状态 — 按类别显示进度条'],
          tip:'点击顶部栏的锁定图标进入编辑模式，然后拖拽面板重新排列。使用眼睛图标可隐藏不需要的面板。' },
        { icon:'timer', title:'番茄钟', desc:'三模式专注计时器。使用经典番茄钟循环（工作+休息）、无限流动模式或自定义倒计时。每次完成的会话自动记录到时间追踪页面。',
          features:['番茄钟（25分钟工作+休息循环）、流动（无限）和倒计时模式','关联任务 — 当前任务名称显示在标题中；已使用的番茄钟数量被追踪','子任务面板 — 工作时查看并勾选子任务','标记按钮：计时器运行时标记分割点，记录已用时间和当前时刻','重置按钮：3个选项 — 保存到最后标记 / 回退到最后标记 / 硬重置（丢弃全部）','完成按钮：保存全部时间，或按标记分段分别保存','超时模式：超过时间限制后以+MM:SS继续，通过完成按钮结束','即使关闭浏览器或刷新页面，计时器也会从中断处继续（8小时TTL）','跨多个浏览器标签实时同步'],
          tip:'从计时器页面顶部的设置面板调整工作、短休息和长休息时长。' },
        { icon:'clock', title:'时间追踪', desc:'按类别和项目记录每日活动。番茄钟会话自动导入；您也可以随时手动添加记录。通过30天柱状图分析时间分配。',
          features:['手动记录：日期、类别、项目、开始和结束时间','番茄钟会话自动导入，标记为"pomodoro"来源','来源筛选：全部 / 仅手动 / 仅番茄钟','日期范围选择器用于历史分析','30天和每周柱状图','月度历史弹窗 — 每日和每周合计'],
          tip:'番茄钟会话以"pomodoro"来源自动导入。使用来源筛选器可单独查看番茄钟或手动记录。' },
        { icon:'check-circle', title:'习惯', desc:'追踪每日习惯并建立连续记录。添加永久性（每天）或计划性（特定天）习惯，通过可视化网格和图表监控进度。',
          features:['两种习惯类型：永久性（每日）和计划性（仅限特定天）','今日跳过系统 — 不会中断连续记录','🔥 连续天数计数器：显示连续完成的天数','30天完成网格 — 每个习惯的可视化历史','带完成百分比的每周甜甜圈图','拖拽重新排列习惯列表'],
          tip:'计划性习惯只在指定天显示 — 在其他天不会影响连续记录。' },
        { icon:'dumbbell', title:'健身', desc:'训练日志。添加力量、有氧、柔韧等训练；记录组数/次数/重量或时长/距离。保存模板以便在多次训练中复用。',
          features:['训练类型：力量、有氧、柔韧、CrossFit、运动、其他','力量：组数、次数、重量（kg/lb）和肌肉群','有氧：时长（分钟）和距离（km）','模板保存 — 复用最常用的练习组合','身体测量追踪（胸围、腰围、臀围等）','1次最大重量（1RM）自动计算','每周训练量和每个练习的进度图表'],
          tip:'使用右上角的单位切换在kg和lb之间切换 — 所有现有数据自动转换。' },
        { icon:'kanban', title:'计划', desc:'看板式任务管理器。在待办、进行中和已完成列中追踪任务。为每个任务添加支持拖拽排序的子任务。',
          features:['在看板（列）和列表（表格）视图之间切换','子任务：复选框、多行文本、拖拽排序','优先级：高（红色）、中（黄色）、低（蓝色）','类别标签和截止日期，便于整理','逾期任务显示红色警告','在子任务文本中使用Shift+Enter创建新行'],
          tip:'可在看板和列表视图之间切换 — 列表模式按截止日期排序显示所有任务，便于管理大量任务。' },
        { icon:'star', title:'梦想与目标', desc:'用里程碑追踪您的梦想和目标。为每个目标分配进度百分比、目标日期、表情符号和颜色。随着截止日期临近显示剩余天数。',
          features:['里程碑清单 — 每次勾选自动更新进度百分比','完成百分比根据里程碑比例自动计算','显示剩余天数（少于30天时变为红色）','为每个目标自定义表情符号和颜色','在编辑模式下拖拽重新排列目标','类别组：职业、旅行、健康、教育等'],
          tip:'完成度达到100%时会触发彩纸动画和祝贺通知。' },
        { icon:'wallet', title:'预算', desc:'月度预算和支出追踪，三标签页布局。管理类别、设置预算限额，并查看包含完整收支明细的历史周期。',
          features:['3个标签页：概览（KPI和图表）、类别（预算结构）、交易记录（所有条目）','概览标签页：净收入、总支出、支出分配饼图和面板排序','类别标签页：创建收入/支出组和子类别，为每个分配预算限额','交易记录：完整条目列表，支持文本搜索和日期/类别筛选','周期系统：预算在每月设定日重置；所有历史周期自动归档','历史周期弹窗：浏览以前的月份，查看每期收入、支出和净额摘要'],
          tip:'使用交易选项卡中的"导入数据"按钮，可从完整备份中仅恢复预算数据。' },
        { icon:'trending-up', title:'投资', desc:'追踪您的投资组合。通过Alpha Vantage API自动获取股票、ETF和加密货币价格。支持实时汇率整合的多币种功能。',
          features:['资产类型：股票、ETF、加密货币、大宗商品、债券、现金','通过Alpha Vantage API自动更新价格（24小时缓存）','盈亏追踪：日/周/月/总计时间段选择','人民币 ↔ 美元显示货币切换','带百分比分配的投资组合饼图','在设置中输入Alpha Vantage和汇率API密钥'],
          tip:'没有API价格的资产（大宗商品、债券、现金）使用购买价格。您也可以手动覆盖任何资产的价格。' }
      ],
      es: [
        { icon:'settings', title:'Configuración', desc:'Centro de preferencias generales, apariencia y gestión de datos. Ábrelo desde el icono de engranaje en la parte inferior de la barra lateral en cualquier página. Los cambios se aplican instantáneamente.',
          features:['Idioma: TR / EN / ZH / ES / FR — toda la interfaz cambia inmediatamente','Moneda: ₺, $, €, £ y otras — controla el símbolo de visualización para todos los valores financieros','Tema: 12 temas (Dark, Midnight, Ocean, Forest, Sunset, Rose, Amber, Crimson, Nebula, Arctic, Neon, White)','Escala de UI: deslizador del 60%–140% — todos los tamaños rem escalan proporcionalmente','Modo privacidad: enmascara todos los valores de moneda con ••••; actívalo aquí o con el icono de ojo','Inicio de semana: Lunes o Domingo — afecta los gráficos de hábitos y seguimiento de tiempo','Claves API de inversión: Alpha Vantage (precios acciones/ETF/cripto) y Exchange Rates API','Exportar datos: descarga todos los datos lt_ como archivo JSON de respaldo','Importar datos: reemplaza todos los datos existentes con el contenido del archivo JSON (irreversible)','Eliminar todos los datos: dos opciones — 🔄 Restablecer datos semilla (todo se borra, la app reinicia con datos de ejemplo integrados); 💥 Borrar todo (borrado completo, sin recuperación posible)'],
          tip:'Importar sobreescribe todos los datos existentes — exporta una copia de seguridad antes. Si solo quieres empezar de nuevo, "Restablecer datos semilla" es una forma segura de reiniciar con contenido de ejemplo.' },
        { icon:'layout-dashboard', title:'Dashboard', desc:'Vista general central de todos los módulos. Consulta métricas clave como patrimonio neto, gastos, tasa de hábitos y metas activas de un vistazo. Personaliza qué paneles se muestran y en qué orden.',
          features:['Selector de período Semanal / Mensual / Anual para análisis de tendencias','Arrastra y reorganiza paneles con el botón de bloqueo en la barra superior','Planes próximos con alertas de tareas vencidas','Gráfico de tarta del portafolio de inversiones y asignación de activos','Barras de progreso de metas y contadores de hitos','Entrenamientos recientes con detalles de ejercicios','Estado de gastos del presupuesto — barras de progreso por categoría'],
          tip:'Haz clic en el icono de candado en la barra superior para entrar en modo edición y arrastrar paneles. Usa el icono de ojo para ocultar los paneles que no necesitas.' },
        { icon:'timer', title:'Pomodoro', desc:'Temporizador de enfoque de tres modos. Usa ciclos clásicos Pomodoro (trabajo + descanso), modo Flow ilimitado o una cuenta regresiva personalizada. Cada sesión completada se registra automáticamente en la página de Seguimiento de Tiempo.',
          features:['Modos Pomodoro (25 min trabajo + descanso), Flow (ilimitado) y Cuenta regresiva','Vincula sesiones a una tarea — el nombre aparece en el encabezado; el uso de pomodoros es rastreado','Panel de subtareas — ve y marca subtareas mientras trabajas','Botón de marca: registra un punto de división mientras el temporizador corre; guarda tiempo y hora','Botón Reiniciar: 3 opciones — guardar hasta la última marca / retroceder / reinicio completo','Botón Finalizar: guarda el tiempo total o divide y guarda cada segmento por separado','Modo horas extra: continúa más allá del límite con +MM:SS; se cierra con el botón Finalizar','El temporizador se guarda automáticamente — recargar la pestaña reanuda desde donde quedaste (8h TTL)','Sincronización en tiempo real entre múltiples pestañas'],
          tip:'Ajusta las duraciones de trabajo, descanso corto y largo desde el panel de configuración en la parte superior de la página.' },
        { icon:'clock', title:'Seguimiento de Tiempo', desc:'Registra actividades diarias por categoría y proyecto. Las sesiones Pomodoro se importan automáticamente; también puedes añadir entradas manuales. Analiza la distribución del tiempo con gráficos de barras de 30 días.',
          features:['Registro manual: fecha, categoría, proyecto, hora de inicio y fin','Las sesiones Pomodoro se importan automáticamente con fuente "pomodoro"','Filtro de fuente: Todo / Solo manual / Solo Pomodoro','Selector de rango de fechas para análisis histórico','Gráficos de barras de 30 días y semanales','Modal de historial mensual — totales diarios y semanales'],
          tip:'Las sesiones Pomodoro se importan automáticamente con la fuente "pomodoro". Usa el filtro de fuente para ver solo entradas Pomodoro o manuales por separado.' },
        { icon:'check-circle', title:'Hábitos', desc:'Rastrea hábitos diarios y construye rachas. Añade hábitos permanentes (cada día) o programados (días específicos), y monitorea el progreso con cuadrículas visuales y gráficos.',
          features:['Dos tipos de hábito: Permanente (diario) y Programado (solo días seleccionados)','Sistema de omisión para hoy — no rompe tu racha','🔥 Contador de racha: días consecutivos completados','Cuadrícula de finalización de 30 días — historial visual por hábito','Gráficos de rosquilla semanales con porcentaje de finalización','Arrastra para reordenar hábitos en la lista diaria'],
          tip:'Los hábitos programados solo aparecen en sus días asignados — no afectarán las rachas en otros días.' },
        { icon:'dumbbell', title:'Gimnasio', desc:'Diario de entrenamientos. Añade sesiones de fuerza, cardio, flexibilidad y otros; registra ejercicios con series/repeticiones/peso o duración/distancia. Guarda plantillas para reutilizarlas.',
          features:['Tipos de entrenamiento: Fuerza, Cardio, Flexibilidad, CrossFit, Deporte, Otros','Fuerza: series, repeticiones, peso (kg/lb) y grupo muscular','Cardio: duración (min) y distancia (km)','Guardado de plantillas — reutiliza tus combinaciones de ejercicios más frecuentes','Seguimiento de medidas corporales (pecho, cintura, caderas, etc.)','Cálculo automático de 1 Repetición Máxima (1RM)','Gráficos de volumen semanal y progreso por ejercicio'],
          tip:'Usa el botón de cambio de unidad en la esquina superior derecha para cambiar entre kg y lb — todos los datos existentes se convierten automáticamente.' },
        { icon:'kanban', title:'Planes', desc:'Gestor de tareas estilo Kanban. Rastrea tareas en columnas Pendiente, En Progreso y Completado. Añade subtareas con soporte de arrastrar y soltar para reordenar.',
          features:['Cambia entre vistas Kanban (columnas) y Lista (tabla)','Subtareas: casillas de verificación, texto multilínea, reordenamiento drag-and-drop','Niveles de prioridad: Alta (rojo), Media (amarillo), Baja (azul)','Etiquetas de categoría y fechas de vencimiento para organización','Alerta de vencimiento roja en tareas atrasadas','Shift+Enter en texto de subtarea crea una nueva línea'],
          tip:'Cambia entre vistas Kanban y Lista — la vista Lista muestra todas las tareas ordenadas por fecha de vencimiento en una sola tabla, ideal para gestionar muchas tareas a la vez.' },
        { icon:'star', title:'Sueños y Metas', desc:'Rastrea tus sueños y metas con hitos. Asigna porcentaje de progreso, fecha objetivo, emoji y color a cada meta. Se muestra los días restantes conforme se acerca el plazo.',
          features:['Lista de hitos — cada marca actualiza automáticamente el porcentaje de progreso','El % de finalización se calcula automáticamente a partir de la proporción de hitos','Días restantes mostrados (rojo cuando quedan menos de 30 días)','Personalización de emoji y color para cada meta','Arrastra para reordenar metas en modo edición','Grupos de categorías: Carrera, Viajes, Salud, Educación y más'],
          tip:'Alcanzar el 100% activa una animación de confeti y una notificación de felicitación.' },
        { icon:'wallet', title:'Presupuesto', desc:'Seguimiento de presupuesto y gastos mensuales con diseño de 3 pestañas. Gestiona categorías, establece límites y revisa ciclos históricos con desgloses completos.',
          features:['3 pestañas: Resumen (KPIs y gráficos), Categorías (estructura), Transacciones (todos los registros)','Pestaña Resumen: ingreso neto, gastos totales, gráfico circular de distribución y reordenamiento de paneles','Pestaña Categorías: crea grupos y subcategorías de ingresos/gastos, asigna límites a cada uno','Pestaña Transacciones: lista completa con búsqueda de texto y filtros de fecha/categoría','Sistema de ciclos: el presupuesto se reinicia en el día elegido cada mes; todos los períodos se archivan','Modal de ciclos pasados: navega por meses anteriores con resumen de ingresos, gastos y neto por período'],
          tip:'Usa el botón "Importar datos" en la pestaña Transacciones para restaurar solo datos de presupuesto desde una copia de seguridad completa.' },
        { icon:'trending-up', title:'Inversiones', desc:'Rastrea tu portafolio de inversiones. Obtén precios automáticos de acciones, ETFs y criptomonedas mediante la API Alpha Vantage. Soporte multi-divisa con integración de tipos de cambio en tiempo real.',
          features:['Tipos de activos: Acciones, ETF, Criptomonedas, Materias primas, Bonos, Efectivo','Actualizaciones automáticas de precios via Alpha Vantage API (caché de 24 horas)','Seguimiento de P&G: selector de período Diario / Semanal / Mensual / Total','Cambio de divisa de visualización entre moneda local ↔ USD','Gráfico de tarta de asignación del portafolio con desglose porcentual','Introduce las claves API de Alpha Vantage y tipo de cambio en Configuración'],
          tip:'Los activos sin precios de API (Materias primas, Bonos, Efectivo) usan el precio de compra. También puedes anular manualmente el precio de cualquier activo.' }
      ],
      fr: [
        { icon:'settings', title:'Paramètres', desc:'Centre de préférences générales, d\'apparence et de gestion des données. Ouvrez-le depuis l\'icône d\'engrenage en bas de la barre latérale sur n\'importe quelle page. Les modifications s\'appliquent instantanément.',
          features:['Langue : TR / EN / ZH / ES / FR — toute l\'interface bascule immédiatement','Devise : ₺, $, €, £ et autres — contrôle le symbole d\'affichage pour toutes les valeurs financières','Thème : 12 thèmes (Dark, Midnight, Ocean, Forest, Sunset, Rose, Amber, Crimson, Nebula, Arctic, Neon, White)','Échelle UI : curseur 60%–140% — toutes les tailles rem s\'adaptent proportionnellement','Mode confidentialité : masque toutes les valeurs monétaires avec •••• ; activez ici ou via l\'icône œil','Début de semaine : Lundi ou Dimanche — affecte les graphiques habitudes et suivi du temps','Clés API Investissements : Alpha Vantage (prix actions/ETF/crypto) et Exchange Rates API','Exporter les données : télécharge toutes les données lt_ dans un fichier JSON de sauvegarde','Importer les données : remplace toutes les données existantes par le contenu du fichier JSON (irréversible)','Supprimer toutes les données : deux options — 🔄 Réinitialiser aux données initiales (tout effacé, l\'app repart avec des données d\'exemple intégrées) ; 💥 Tout supprimer (suppression complète, aucune récupération possible)'],
          tip:'Importer écrase toutes les données existantes — exportez une sauvegarde avant. Si vous souhaitez simplement repartir à zéro, "Réinitialiser aux données initiales" permet un redémarrage sûr avec du contenu d\'exemple.' },
        { icon:'layout-dashboard', title:'Tableau de bord', desc:'Vue d\'ensemble centrale de tous les modules. Consultez les métriques clés comme la valeur nette, les dépenses, le taux de complétion des habitudes et les objectifs actifs en un coup d\'œil. Personnalisez les panneaux affichés et leur ordre.',
          features:['Sélecteur de période Semaine / Mois / Année pour l\'analyse des tendances','Glissez-déposez les panneaux via le bouton verrou dans la barre supérieure','Plans à venir avec alertes de tâches en retard','Graphique circulaire du portefeuille et répartition des actifs','Barres de progression des objectifs et compteurs de jalons','Entraînements récents avec détails des exercices','État des dépenses du budget — barres de progression par catégorie'],
          tip:'Cliquez sur l\'icône verrou dans la barre supérieure pour entrer en mode édition et faire glisser les panneaux. Utilisez l\'icône œil pour masquer les panneaux inutiles.' },
        { icon:'timer', title:'Pomodoro', desc:'Minuteur de concentration à trois modes. Utilisez les cycles Pomodoro classiques (travail + pause), le mode Flow illimité ou un compte à rebours personnalisé. Chaque session terminée est automatiquement enregistrée dans le Suivi du temps.',
          features:['Modes Pomodoro (25 min travail + pause), Flow (illimité) et Compte à rebours','Liez les sessions à une tâche — le nom s\'affiche dans l\'en-tête ; l\'utilisation des pomodoros est suivie','Panneau de sous-tâches — consultez et cochez les sous-tâches en travaillant','Bouton Drapeau : marque un point de découpe pendant la course ; enregistre le temps écoulé et l\'heure','Bouton Réinitialiser : 3 options — sauvegarder jusqu\'au dernier drapeau / revenir / réinitialisation complète','Bouton Terminer : sauvegarder le temps total ou découper par drapeaux et sauvegarder chaque segment','Mode heures supp. : continue au-delà de la limite avec +MM:SS ; clôturé via le bouton Terminer','L\'état du minuteur est sauvegardé — recharger l\'onglet reprend depuis l\'endroit quitté (TTL 8h)','Synchronisation en temps réel entre plusieurs onglets'],
          tip:'Ajustez les durées de travail, de courte pause et de longue pause depuis le panneau de réglages en haut de la page.' },
        { icon:'clock', title:'Suivi du temps', desc:'Enregistrez les activités quotidiennes par catégorie et projet. Les sessions Pomodoro s\'importent automatiquement ; vous pouvez aussi ajouter des entrées manuelles. Analysez la répartition du temps avec des graphiques en barres sur 30 jours.',
          features:['Saisie manuelle : date, catégorie, projet, heure de début et fin','Les sessions Pomodoro s\'importent avec la source "pomodoro"','Filtre de source : Tout / Manuel uniquement / Pomodoro uniquement','Sélecteur de plage de dates pour l\'analyse historique','Graphiques en barres sur 30 jours et hebdomadaires','Modal d\'historique mensuel — totaux quotidiens et hebdomadaires'],
          tip:'Les sessions Pomodoro sont auto-importées avec la source "pomodoro". Utilisez le filtre de source pour afficher séparément les entrées Pomodoro ou manuelles.' },
        { icon:'check-circle', title:'Habitudes', desc:'Suivez vos habitudes quotidiennes et construisez des séries. Ajoutez des habitudes permanentes (chaque jour) ou planifiées (jours spécifiques), et surveillez les progrès avec des grilles visuelles et des graphiques.',
          features:['Deux types d\'habitude : Permanente (quotidienne) et Planifiée (jours sélectionnés uniquement)','Système de saut pour aujourd\'hui — ne brise pas votre série','🔥 Compteur de série : jours consécutifs complétés','Grille de complétion sur 30 jours — historique visuel par habitude','Graphiques en donut hebdomadaires avec pourcentage de complétion','Glissez pour réorganiser les habitudes dans la liste quotidienne'],
          tip:'Les habitudes planifiées n\'apparaissent que leurs jours assignés — elles n\'affecteront pas les séries les autres jours.' },
        { icon:'dumbbell', title:'Salle de sport', desc:'Journal d\'entraînement. Ajoutez des séances de musculation, cardio, flexibilité et autres ; enregistrez les exercices avec séries/répétitions/poids ou durée/distance. Sauvegardez des modèles pour les réutiliser.',
          features:['Types d\'entraînement : Musculation, Cardio, Flexibilité, CrossFit, Sport, Autre','Musculation : séries, répétitions, poids (kg/lb) et groupe musculaire','Cardio : durée (min) et distance (km)','Sauvegarde de modèles — réutilisez vos combinaisons d\'exercices favorites','Suivi des mesures corporelles (poitrine, taille, hanches, etc.)','Calcul automatique du 1 Répétition Maximum (1RM)','Graphiques de volume hebdomadaire et de progression par exercice'],
          tip:'Utilisez le bouton de changement d\'unité en haut à droite pour basculer entre kg et lb — toutes les données existantes sont converties automatiquement.' },
        { icon:'kanban', title:'Plans', desc:'Gestionnaire de tâches style Kanban. Suivez les tâches dans les colonnes À faire, En cours et Terminé. Ajoutez des sous-tâches avec support glisser-déposer pour réorganiser.',
          features:['Basculez entre les vues Kanban (colonnes) et Liste (tableau)','Sous-tâches : cases à cocher, texte multiligne, réorganisation par glisser-déposer','Niveaux de priorité : Haute (rouge), Moyenne (jaune), Basse (bleu)','Étiquettes de catégorie et dates d\'échéance pour s\'organiser','Alerte rouge sur les tâches en retard','Shift+Entrée dans le texte de sous-tâche crée une nouvelle ligne'],
          tip:'Basculez entre les vues Kanban et Liste — la vue Liste affiche toutes les tâches triées par échéance dans un seul tableau, idéale pour gérer de nombreuses tâches à la fois.' },
        { icon:'star', title:'Rêves et Objectifs', desc:'Suivez vos rêves et objectifs avec des jalons. Attribuez un pourcentage de progression, une date cible, un emoji et une couleur à chaque objectif. Les jours restants s\'affichent à l\'approche de l\'échéance.',
          features:['Liste de jalons — chaque coche met automatiquement à jour le pourcentage de progression','Le % de complétion est calculé automatiquement à partir du ratio de jalons','Jours restants affichés (rouge quand moins de 30 jours)','Personnalisation emoji et couleur pour chaque objectif','Glissez pour réorganiser les objectifs en mode édition','Groupes de catégories : Carrière, Voyage, Santé, Éducation et plus'],
          tip:'Atteindre 100% déclenche une animation de confettis et une notification de félicitations.' },
        { icon:'wallet', title:'Budget', desc:'Suivi du budget et des dépenses mensuelles avec une disposition à 3 onglets. Gérez les catégories, définissez des limites et consultez les cycles historiques avec détails complets.',
          features:['3 onglets : Vue d\'ensemble (KPIs et graphiques), Catégories (structure), Transactions (tous les enregistrements)','Onglet Vue d\'ensemble : revenu net, dépenses totales, graphique circulaire d\'allocation et réorganisation des panneaux','Onglet Catégories : créez des groupes et sous-catégories revenus/dépenses, attribuez des limites à chacun','Onglet Transactions : liste complète avec recherche textuelle et filtres date/catégorie','Système de cycles : le budget se réinitialise le jour choisi chaque mois ; toutes les périodes sont archivées','Modal des cycles passés : parcourez les mois précédents avec résumé revenu, dépenses et net par période'],
          tip:'Utilisez le bouton "Importer données" dans l\'onglet Transactions pour restaurer uniquement les données de budget depuis une sauvegarde complète.' },
        { icon:'trending-up', title:'Investissements', desc:'Suivez votre portefeuille d\'investissements. Obtenez automatiquement les prix des actions, ETF et cryptomonnaies via l\'API Alpha Vantage. Support multi-devises avec intégration des taux de change en temps réel.',
          features:['Types d\'actifs : Actions, ETF, Cryptomonnaies, Matières premières, Obligations, Liquidités','Mises à jour automatiques des prix via Alpha Vantage API (cache 24h)','Suivi P&G : sélecteur de période Quotidien / Hebdomadaire / Mensuel / Total','Basculement de devise d\'affichage devise locale ↔ USD','Graphique circulaire d\'allocation du portefeuille avec répartition en pourcentage','Saisissez les clés API Alpha Vantage et taux de change dans Paramètres'],
          tip:'Les actifs sans prix API (Matières premières, Obligations, Liquidités) utilisent le prix d\'achat. Vous pouvez aussi remplacer manuellement le prix de n\'importe quel actif.' }
      ]
    };
  },

  // ── Settings modal ───────────────────────────────────────
  openSettings() {
    if (this._settingsModal && this._settingsModal._overlay && this._settingsModal._overlay.isConnected) {
      this._renderSettingsModal();
      return;
    }
    this._settingsModal = new CustomModal({
      title:   this.t('settings_title'),
      icon:    'settings',
      width:   440,
      content: this._settingsBodyHTML(),
      buttons: [],
    });
    this._settingsModal.open();
  },

  _settingsBodyHTML() {
    const lang = this.getLang();
    const currentTheme = Store.getSettings().theme || 'dark';
    const themes = [
      { id: 'dark',     accent: '#7C6CFC', bg: '#1A1A22' },
      { id: 'midnight', accent: '#4D9EFF', bg: '#15192E' },
      { id: 'ocean',    accent: '#00CBA9', bg: '#122224' },
      { id: 'forest',   accent: '#4ADE80', bg: '#142218' },
      { id: 'sunset',   accent: '#FB923C', bg: '#241810' },
      { id: 'rose',     accent: '#F472B6', bg: '#221724' },
      { id: 'amber',    accent: '#EAB308', bg: '#1E1608' },
      { id: 'crimson',  accent: '#DC2626', bg: '#240E0E' },
      { id: 'nebula',   accent: '#A78BFA', bg: '#181224' },
      { id: 'arctic',   accent: '#22D3EE', bg: '#0D1C28' },
      { id: 'neon',     accent: '#84CC16', bg: '#101A10' },
      { id: 'white',    accent: '#6366F1', bg: '#FFFFFF' },
    ];
    const s = Store.getSettings();
    const _themeSurfaces = {
      dark:'#1A1A22',midnight:'#15192E',ocean:'#122224',forest:'#142218',
      sunset:'#241810',rose:'#221724',amber:'#1E1608',crimson:'#240E0E',
      nebula:'#181224',arctic:'#0D1C28',neon:'#101A10',white:'#FFFFFF',
    };
    const currentBg   = _themeSurfaces[currentTheme] || '#1A1A22';
    const isLightTheme = currentTheme === 'white';
    const swatches = themes.map(th => {
      const active = th.id === currentTheme;
      const inactiveLabelColor = isLightTheme ? '#55556A' : 'rgba(255,255,255,0.65)';
      const labelColor = active ? (isLightTheme ? '#1E1E2E' : th.accent) : inactiveLabelColor;
      const borderColor = active ? (th.id === 'white' ? '#CBD5E1' : th.accent) : 'transparent';
      const dotExtra = active && th.id !== 'white' ? `box-shadow:0 0 10px ${th.accent}88;` : '';
      const hoverBorder = th.id === 'white' ? '#CBD5E1' : th.accent + 'AA';
      return `<button onclick="UI._setTheme('${th.id}')" data-tooltip="${this.t('settings_theme_' + th.id)}"
        onmouseenter="this.style.borderColor='${hoverBorder}'"
        onmouseleave="this.style.borderColor='${borderColor}'"
        style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;padding:0.4rem 0.25rem;border-radius:var(--radius-sm);border:2px solid ${borderColor};background:${currentBg};cursor:pointer;transition:border-color var(--transition);min-width:0;">
        <span style="width:1.5rem;height:1.5rem;border-radius:50%;background:${th.id==='white'?'#FFFFFF':th.accent};display:block;flex-shrink:0;border:2px solid rgba(0,0,0,0.45);box-sizing:border-box;${dotExtra}"></span>
        <span style="font-size:0.625rem;color:${labelColor};font-family:var(--font-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:3.5rem;text-align:center;">${this.t('settings_theme_' + th.id)}</span>
      </button>`;
    }).join('');
    return `<div style="display:flex;flex-direction:column;gap:0.75rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
        <div class="form-group" style="margin:0">
          <label class="form-label" style="text-align:center">${this.t('settings_lang')}</label>
          ${(() => { const langs = [{ code:'en', flag:'🇬🇧', name:'English' }, { code:'zh', flag:'🇨🇳', name:'中文' }, { code:'es', flag:'🇪🇸', name:'Español' }, { code:'fr', flag:'🇫🇷', name:'Français' }, { code:'tr', flag:'🇹🇷', name:'Türkçe' }];
            const cur = langs.find(l => l.code === lang) || langs[0];
            return `<button type="button" onclick="UI._openLangDropdown(this)"
              style="width:100%;display:flex;align-items:center;gap:0.4375rem;padding:0 0.625rem;height:2.25rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
              <span style="font-family:var(--font-mono);font-size:0.75rem;font-weight:700;color:var(--accent);flex-shrink:0;letter-spacing:.04em">${cur.code.toUpperCase()}</span>
              <span style="font-size:0.75rem;color:var(--text-secondary);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cur.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>
            </button>`; })()}
        </div>
        <div class="form-group" style="margin:0">
          <label class="form-label" style="text-align:center">${this.t('settings_currency')}</label>
          <button type="button" onclick="UI._openCurrencyDropdown(this)"
            style="width:100%;display:flex;align-items:center;gap:0.375rem;padding:0 0.625rem;height:2.25rem;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden">
            ${(() => { const c = this._CURRENCIES.find(x => x.sym === s.currency) || this._CURRENCIES[0];
              return `<span style="font-family:var(--font-mono);font-size:0.8125rem;font-weight:700;color:var(--accent);flex-shrink:0">${c.sym}</span>
                      <span style="font-family:var(--font-mono);font-size:0.6875rem;font-weight:600;color:var(--text-muted);flex-shrink:0">${c.code}</span>
                      <span style="font-size:0.75rem;color:var(--text-secondary);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.name}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="6 9 12 15 18 9"/></svg>`; })()}
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
      <div class="form-group" style="margin:0">
        <label class="form-label" style="display:flex;align-items:center;gap:0.375rem">
          <svg data-lucide="key-round" style="width:0.8125rem;height:0.8125rem;color:var(--accent)"></svg>
          ${this.t('settings_api_title')}
        </label>
        <p style="font-size:0.6875rem;color:var(--text-muted);margin:0.125rem 0 0.375rem">${this.t('settings_api_hint')}</p>
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
  },

  _renderSettingsModal() {
    if (this._settingsModal && this._settingsModal._overlay && this._settingsModal._overlay.isConnected) {
      this._settingsModal.setContent(this._settingsBodyHTML());
    }
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
      icon:    confirmDanger ? 'triangle-alert' : 'info',
      variant: confirmDanger ? 'danger' : 'default',
      content: `<p>${message}</p>`,
      width:   400,
      zIndex:  9000,
      buttons: [
        { label: this.t('btn_cancel'), variant: 'secondary', onClick: m => { m.close(); onCancel?.(); } },
        { label: confirmLabel, variant: confirmDanger ? 'danger' : 'primary',
          onClick: m => { m.close(); onConfirm(); } },
      ],
    });
    modal.open();
  },

  _deleteAllData() {
    const modal = new CustomModal({
      title:    this.t('settings_delete_choice_title'),
      subtitle: this.t('settings_delete_choice_subtitle'),
      icon:     'database',
      variant:  'danger',
      width:    560,
      zIndex:   9000,
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
        title:         this.t('settings_delete_wipe_label'),
        message:       this.t('settings_delete_wipe_confirm'),
        confirmLabel:  this.t('settings_delete_wipe_btn'),
        confirmDanger: true,
        onConfirm: () => {
          Object.keys(localStorage).filter(k => k.startsWith('lt_')).forEach(k => localStorage.removeItem(k));
          ['gym','time','habits','plans','inv','goals','budget','pomo'].forEach(m => localStorage.setItem('lt_'+m+'_seeded','true'));
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
            const cycleDay  = budgetCfgRaw.cycleDay || 1;
            const today     = new Date();
            const d         = today.getDate() >= cycleDay
              ? new Date(today.getFullYear(), today.getMonth(), cycleDay)
              : new Date(today.getFullYear(), today.getMonth() - 1, cycleDay);
            const pad       = n => String(n).padStart(2, '0');
            const safeStart = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
            localStorage.setItem('lt_budget_cfg', JSON.stringify({ ...budgetCfgRaw, cycleDay, lastCycleStart: safeStart }));
          }
          this.toast(this.t('settings_import_ok'), 'success');
          setTimeout(() => location.reload(), 800);
        };
        this._showConfirm({
          title:        this.t('settings_import_title'),
          message:      this.t('settings_import_confirm'),
          confirmLabel: this.t('settings_import_btn'),
          confirmDanger: false,
          onConfirm:    _doImport,
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
  },

  _setLang(lang) {
    const s = Store.getSettings();
    Store.setSettings({ ...s, language: lang });
    this._renderSettingsModal();
    this.applyTranslations();
    document.dispatchEvent(new CustomEvent('lt:language-change', { detail: { lang } }));
  },

  _CURRENCIES: [
    { sym: '$',   code: 'USD', name: 'US Dollar'     },
    { sym: '€',   code: 'EUR', name: 'Euro'           },
    { sym: '£',   code: 'GBP', name: 'British Pound'  },
    { sym: '¥',   code: 'JPY', name: 'Japanese Yen'   },
    { sym: '元',   code: 'CNY', name: 'Chinese Yuan'   },
    { sym: '₹',   code: 'INR', name: 'Indian Rupee'   },
    { sym: 'R$',  code: 'BRL', name: 'Brazilian Real' },
    { sym: 'Mex$', code: 'MXN', name: 'Mexican Peso'   },
    { sym: '₽',   code: 'RUB', name: 'Russian Ruble'  },
    { sym: '฿',   code: 'THB', name: 'Thai Baht'      },
    { sym: '₺',   code: 'TRY', name: 'Turkish Lira'   },
  ],

  _openCurrencyDropdown(btn) {
    // Lazy-init: btn her modal açılışında yeni element olabilir (settings modal rebuild)
    if (!btn._ddInst) {
      btn._ddInst = new CustomDropdown({
        btn,
        items: this._CURRENCIES.map(c => ({ value: c.sym, label: c.name, badge: c.sym, badge2: c.code })),
        onOpen:  (dd) => dd.setValue(Store.getSettings().currency),
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
        { code: 'en', flag: '🇬🇧', name: 'English'  },
        { code: 'zh', flag: '🇨🇳', name: '中文'     },
        { code: 'es', flag: '🇪🇸', name: 'Español'  },
        { code: 'fr', flag: '🇫🇷', name: 'Français' },
        { code: 'tr', flag: '🇹🇷', name: 'Türkçe'  },
      ];
      btn._ddInst = new CustomDropdown({
        btn,
        items: langs.map(l => ({ value: l.code, label: l.name, badge: l.code.toUpperCase(), _flag: l.flag })),
        onOpen:  (dd) => dd.setValue(this.getLang()),
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
      const bg      = it.active ? 'rgba(124,108,252,.12)' : 'transparent';
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
    menu.style.top  = (spaceBelow >= mh + 8 ? rect.bottom + 4 : Math.max(8, rect.top - mh - 4)) + 'px';
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
      'index.html':       'nav_dashboard',
      'pomodoro.html':    'nav_pomodoro',
      'time.html':        'nav_time',
      'habits.html':      'nav_habits',
      'gym.html':         'nav_gym',
      'plans.html':       'nav_plans',
      'goals.html':       'nav_goals',
      'budget.html':      'nav_budget',
      'investments.html': 'nav_investments',
    };
    const page = (location.pathname.endsWith('/') ? 'index.html' : location.pathname.split('/').pop()) || 'index.html';
    const key = navMap[page];
    return key ? `${this.t(key)} — LifeTracker` : document.title;
  },

  // ── HTML escaping ────────────────────────────────────────
  esc(str) {
    if (str == null) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  },

  // ── Date & number formatting ─────────────────────────────
  today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; },

  longDate() {
    const d = new Date();
    const lang = this.getLang();
    // EN: "Saturday, June 13, 2026" (US standard)
    if (lang === 'en') {
      return `${this.DAYS_EN[d.getDay()]}, ${this.MONTHS_LONG_EN[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
    // ZH: "2026年6月13日 周六"
    if (lang === 'zh') {
      return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 ${this.DAYS_ZH[d.getDay()]}`;
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
    const dd   = String(d.getDate()).padStart(2, '0');
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    // TR: 13.06.2026
    if (lang === 'tr') return `${dd}.${mm}.${yyyy}`;
    // ZH: 2026年6月13日
    if (lang === 'zh') return `${yyyy}年${d.getMonth()+1}月${d.getDate()}日`;
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
    const h   = Math.floor(totalSecs / 3600);
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
      title:   this.t('panel_manager_title'),
      icon:    'pie-chart',
      width:   380,
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
            background:${on ? 'var(--accent)' : 'var(--bg-elevated)'};color:${on ? '#fff' : 'var(--text-muted)'};
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
      btn.innerHTML = hidden ? '<svg data-lucide="eye-off"></svg>' : '<svg data-lucide="eye"></svg>';
      btn.dataset.tooltip = hidden ? this.t('privacy_show') : this.t('privacy_hide');
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
    if (logo && !document.getElementById('sidebar-toggle-btn')) {
      const btn = document.createElement('button');
      btn.id = 'sidebar-toggle-btn';
      btn.className = 'sidebar-toggle-btn';
      btn.dataset.tooltip = this.t('sidebar_toggle');
      btn.innerHTML = '<svg data-lucide="menu"></svg>';
      btn.addEventListener('click', () => UI.toggleSidebar());
      logo.appendChild(btn);
      lucide.createIcons({ nodes: [btn] });
    }

    const settingsLink = sidebar.querySelector('.sidebar-footer .nav-link');
    if (settingsLink) {
      settingsLink.addEventListener('click', e => {
        e.preventDefault();
        UI.openSettings();
      });
    }

    if (Store.get('lt_sidebar_collapsed')) {
      sidebar.classList.add('collapsed');
    }

    this.applyTranslations();
  },

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    const isCollapsed = sidebar.classList.toggle('collapsed');
    Store.set('lt_sidebar_collapsed', isCollapsed);
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

  // ── Topbar init ──────────────────────────────────────────
  initTopbar({ noPrivacy = false } = {}) {
    this.applyScale();
    const el = document.getElementById('topbar-date');
    if (el) el.textContent = this.longDate();
    this.initSidebar();
    this._initMobileMenu();
    const savedTheme = Store.getSettings().theme || 'dark';
    if (savedTheme !== 'dark') document.documentElement.setAttribute('data-theme', savedTheme);
    else document.documentElement.removeAttribute('data-theme');

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
  },

  // ── Modal ────────────────────────────────────────────────
  openModal(id) {
    const o = document.getElementById(id);
    if (!o) return;
    o.classList.add('open');
    const close = () => o.classList.remove('open');
    o.addEventListener('click', e => { if (e.target === o) close(); }, { once: true });
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
    t.innerHTML = `<svg class="toast-icon" data-lucide="${icons[type]}"></svg><span class="toast-text">${msg}</span>`;
    c.appendChild(t);
    lucide.createIcons({ nodes: [t] });
    setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 220); }, 3000);
  },

  // ── Component helpers ────────────────────────────────────
  priorityBadge(p) {
    const map = {
      high:   ['badge-red',    this.t('priority_high')],
      medium: ['badge-yellow', this.t('priority_medium')],
      low:    ['badge-blue',   this.t('priority_low')],
    };
    const [cls, lbl] = map[p] || ['badge-gray', p];
    return `<span class="badge ${cls}">${lbl}</span>`;
  },

  catBadge(cat) {
    const _MAP = {
      // Turkish storage keys
      'Çalışma':'pomo_cat_work','Öğrenme':'pomo_cat_learn','Egzersiz':'pomo_cat_exercise',
      'Sosyal':'pomo_cat_social','Uyku':'pomo_cat_sleep','Diğer':'pomo_cat_other',
      'Proje':'plans_cat_project','Eğitim':'plans_cat_education','Finans':'plans_cat_finance',
      'Yatırım':'plans_cat_investment','Kişisel':'plans_cat_personal','Sağlık':'plans_cat_health',
      // English legacy keys (stored before value attrs were added)
      'Work':'pomo_cat_work','Learning':'pomo_cat_learn','Exercise':'pomo_cat_exercise',
      'Social':'pomo_cat_social','Sleep':'pomo_cat_sleep','Other':'pomo_cat_other',
      'Project':'plans_cat_project','Education':'plans_cat_education','Finance':'plans_cat_finance',
      'Investment':'plans_cat_investment','Personal':'plans_cat_personal','Health':'plans_cat_health',
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
    let left = panelRect ? panelRect.left : btnRect.left;
    if (left < 8) left = 8;
    if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
    let top = btnRect.bottom + 6;
    if (top + window.innerHeight * 0.55 > window.innerHeight - 16)
      top = Math.max(16, btnRect.top - Math.min(window.innerHeight * 0.55, 400) - 6);

    overlay.style.cssText = `display:block;left:${left}px;top:${top}px;width:${w}px`;
    lucide.createIcons({ nodes: [overlay] });

    const header = overlay.querySelector('.lt-expand-overlay-header');
    if (header) {
      header.style.cursor = 'grab';
      let dragX = 0, dragY = 0;
      function _onMouseMove(e) {
        const sidebarEl = document.querySelector('.sidebar');
        const topbarEl  = document.querySelector('.topbar');
        const minX = sidebarEl ? sidebarEl.offsetWidth + 4 : 4;
        const minY = topbarEl  ? topbarEl.offsetHeight + 4 : 4;
        const nx = Math.max(minX, Math.min(window.innerWidth  - overlay.offsetWidth  - 4, overlay.offsetLeft + e.clientX - dragX));
        const ny = Math.max(minY, Math.min(window.innerHeight - overlay.offsetHeight - 4, overlay.offsetTop  + e.clientY - dragY));
        overlay.style.left = nx + 'px';
        overlay.style.top  = ny + 'px';
        dragX = e.clientX;
        dragY = e.clientY;
      }
      function _onMouseUp() {
        header.style.cursor = 'grab';
        document.removeEventListener('mousemove', _onMouseMove);
        document.removeEventListener('mouseup',   _onMouseUp);
      }
      header.addEventListener('mousedown', e => {
        if (e.target.closest('button')) return;
        e.preventDefault();
        dragX = e.clientX;
        dragY = e.clientY;
        header.style.cursor = 'grabbing';
        document.addEventListener('mousemove', _onMouseMove);
        document.addEventListener('mouseup',   _onMouseUp);
      });
    }
  },

  closeExpandOverlay() {
    const el = document.getElementById('lt-expand-overlay');
    if (el) el.style.display = 'none';
  },
};
