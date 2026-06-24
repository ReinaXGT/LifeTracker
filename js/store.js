const Store = {
  _p: 'lt_',

  get(k)    { try { const r = localStorage.getItem(this._p+k); return r ? JSON.parse(r) : null; } catch { return null; } },
  set(k, v) { try { localStorage.setItem(this._p+k, JSON.stringify(v)); return true; } catch { return false; } },
  _id()     { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); },

  // ── Budget ──────────────────────────────────────────────
  getBudget()  { return this.get('budget') || { groups:[], transactions:[] }; },
  setBudget(d) { return this.set('budget', d); },

  addBudgetGroup(g) {
    const b = this.getBudget(); b.groups.push({...g, id:this._id(), subs:[]}); return this.setBudget(b);
  },
  updateBudgetGroup(id, u) {
    const b = this.getBudget(); const i = b.groups.findIndex(g=>g.id===id);
    if (i>-1) b.groups[i] = {...b.groups[i], ...u}; return this.setBudget(b);
  },
  deleteBudgetGroup(id) {
    const b = this.getBudget();
    b.groups = b.groups.filter(g=>g.id!==id);
    b.transactions = b.transactions.filter(t=>t.groupId!==id);
    return this.setBudget(b);
  },
  addBudgetSub(groupId, sub) {
    const b = this.getBudget(); const g = b.groups.find(g=>g.id===groupId);
    if (g) g.subs.push({...sub, id:this._id()}); return this.setBudget(b);
  },
  updateBudgetSub(groupId, subId, u) {
    const b = this.getBudget(); const g = b.groups.find(g=>g.id===groupId);
    if (g) { const i=g.subs.findIndex(s=>s.id===subId); if(i>-1) g.subs[i]={...g.subs[i],...u}; }
    return this.setBudget(b);
  },
  deleteBudgetSub(groupId, subId) {
    const b = this.getBudget(); const g = b.groups.find(g=>g.id===groupId);
    if (g) g.subs = g.subs.filter(s=>s.id!==subId);
    b.transactions = b.transactions.filter(t=>!(t.groupId===groupId && t.subId===subId));
    return this.setBudget(b);
  },
  addTransaction(tx)    { const b=this.getBudget(); b.transactions.unshift({...tx,id:this._id()}); return this.setBudget(b); },
  updateTransaction(id, updates) { const b=this.getBudget(); b.transactions=b.transactions.map(t=>t.id===id?{...t,...updates}:t); return this.setBudget(b); },
  deleteTransaction(id) { const b=this.getBudget(); b.transactions=b.transactions.filter(t=>t.id!==id); return this.setBudget(b); },

  // ── Time ────────────────────────────────────────────────
  getTime()        { return this.get('time') || { logs:[] }; },
  setTime(d)       { return this.set('time', d); },
  addTimeLog(log)  { const t=this.getTime(); t.logs.unshift({...log,id:this._id()}); const _r=this.setTime(t); document.dispatchEvent(new CustomEvent('lt:pomo-kpi-change')); return _r; },
  updateTimeLog(id, updates){
    const t = this.getTime();
    const old = t.logs.find(l => l.id === id);
    t.logs = t.logs.map(l => l.id === id ? {...l, ...updates} : l);
    const _r = this.setTime(t);
    // Eşleşen pomo session'ı da güncelle (tarih veya süre değişmişse)
    if (old && old.source === 'pomodoro' && (updates.date || updates.duration)) {
      const p = this.getPomo();
      const dur = s => Math.abs((s.duration || 0) - (old.duration || 0)) <= 1 && s.mode !== 'short' && s.mode !== 'long';
      let idx = p.sessions.findIndex(s => s.date === old.date && dur(s));
      if (idx < 0) {
        // Gece yarısı geçen seans: time log başlanan güne, pomo session bitirilen güne yazılmış olabilir
        const next = new Date(old.date + 'T00:00:00');
        next.setDate(next.getDate() + 1);
        const nd = `${next.getFullYear()}-${String(next.getMonth()+1).padStart(2,'0')}-${String(next.getDate()).padStart(2,'0')}`;
        idx = p.sessions.findIndex(s => s.date === nd && dur(s));
      }
      if (idx >= 0) {
        if (updates.date)     p.sessions[idx].date     = updates.date;
        if (updates.duration) p.sessions[idx].duration = updates.duration;
        this.setPomo(p);
      }
    }
    document.dispatchEvent(new CustomEvent('lt:pomo-kpi-change'));
    return _r;
  },
  deleteTimeLog(id){ const t=this.getTime(); t.logs=t.logs.filter(l=>l.id!==id); const _r=this.setTime(t); document.dispatchEvent(new CustomEvent('lt:pomo-kpi-change')); return _r; },

  // ── Task Progress (Single Source of Truth) ──────────────
  // pomoDone'u her zaman zaman loglarından hesapla — depolanan değere güvenme
  calcTaskPomodoros(taskId, taskText) {
    const cfg      = this.get('pomo_cfg') || {};
    const workMin  = Math.max(1, cfg.work || 25);
    // taskId varsa göreve ait tarihi bul — aynı isimli farklı gün görevleri
    // birbirinin loglarını saymasın (fallback sadece o güne sınırlanır)
    const taskDate = taskId
      ? (this.get('habits_todos') || { items: [] }).items.find(t => t.id === taskId)?.date ?? null
      : null;
    const logs = this.getTime().logs.filter(l =>
      ((l.taskId && l.taskId === taskId) ||
       (!l.taskId && l.source === 'pomodoro' && l.project === taskText)) &&
      (!taskDate || l.date === taskDate)
    );
    return Math.round(logs.reduce((s, l) => s + (l.duration || 0), 0) / workMin * 1000) / 1000;
  },

  syncTaskProgress(taskId) {
    if (!taskId) return;
    const data = this.get('habits_todos') || { items: [] };
    const item = data.items.find(t => t.id === taskId);
    if (!item || !item.pomodoros) return;
    item.pomoDone = this.calcTaskPomodoros(taskId, item.text);
    this.set('habits_todos', data);
  },

  syncAllTaskProgress() {
    const data = this.get('habits_todos') || { items: [] };
    let changed = false;
    data.items.forEach(item => {
      if (item.pomodoros) {
        const pd = this.calcTaskPomodoros(item.id, item.text);
        if (item.pomoDone !== pd) { item.pomoDone = pd; changed = true; }
      }
    });
    if (changed) this.set('habits_todos', data);
  },

  // ── Habits ──────────────────────────────────────────────
  getHabits()     { return this.get('habits') || { list:[], logs:[] }; },
  setHabits(d)    { return this.set('habits', d); },
  addHabit(h)     { const hb=this.getHabits(); hb.list.push({...h,id:this._id()}); return this.setHabits(hb); },
  deleteHabit(id) { const hb=this.getHabits(); hb.list=hb.list.filter(h=>h.id!==id); hb.logs=hb.logs.filter(l=>l.habitId!==id); return this.setHabits(hb); },
  toggleHabitLog(habitId, date) {
    const hb=this.getHabits();
    const idx=hb.logs.findIndex(l=>l.habitId===habitId&&l.date===date);
    if(idx>-1) hb.logs.splice(idx,1); else hb.logs.push({habitId,date,done:true});
    return this.setHabits(hb);
  },

  // ── Plans ───────────────────────────────────────────────
  getPlans()       { return this.get('plans') || { items:[] }; },
  setPlans(d)      { return this.set('plans', d); },
  addPlan(p)       { const pl=this.getPlans(); pl.items.unshift({...p,id:this._id()}); return this.setPlans(pl); },
  updatePlan(id,u) { const pl=this.getPlans(); const i=pl.items.findIndex(p=>p.id===id); if(i>-1) pl.items[i]={...pl.items[i],...u}; return this.setPlans(pl); },
  deletePlan(id)   { const pl=this.getPlans(); pl.items=pl.items.filter(p=>p.id!==id); return this.setPlans(pl); },

  // ── Investments ─────────────────────────────────────────
  getInvestments()  { return this.get('investments') || { assets:[] }; },
  setInvestments(d) { return this.set('investments', d); },
  addAsset(a)       { const iv=this.getInvestments(); iv.assets.push({...a,id:this._id()}); return this.setInvestments(iv); },
  updateAsset(id,u) { const iv=this.getInvestments(); const i=iv.assets.findIndex(a=>a.id===id); if(i>-1) iv.assets[i]={...iv.assets[i],...u}; return this.setInvestments(iv); },
  deleteAsset(id)   { const iv=this.getInvestments(); iv.assets=iv.assets.filter(a=>a.id!==id); return this.setInvestments(iv); },

  // ── Deposits ─────────────────────────────────────────
  getDeposits()      { return this.get('inv_deposits') || []; },
  setDeposits(d)     { return this.set('inv_deposits', d); },
  addDeposit(d)      { const list=this.getDeposits(); list.push({...d,id:this._id()}); return this.setDeposits(list); },
  updateDeposit(id,u){ const list=this.getDeposits(); const i=list.findIndex(x=>x.id===id); if(i>-1) list[i]={...list[i],...u}; return this.setDeposits(list); },
  deleteDeposit(id)  { return this.setDeposits(this.getDeposits().filter(x=>x.id!==id)); },

  // ── Goals ───────────────────────────────────────────────
  getGoals()       { return this.get('goals') || { items:[] }; },
  setGoals(d)      { return this.set('goals', d); },
  addGoal(g)       { const gl=this.getGoals(); gl.items.push({...g,id:this._id(),milestones:[]}); return this.setGoals(gl); },
  updateGoal(id,u) { const gl=this.getGoals(); const i=gl.items.findIndex(g=>g.id===id); if(i>-1) gl.items[i]={...gl.items[i],...u}; return this.setGoals(gl); },
  deleteGoal(id)   { const gl=this.getGoals(); gl.items=gl.items.filter(g=>g.id!==id); return this.setGoals(gl); },

  // ── Pomodoro ─────────────────────────────────────────────
  getPomo()         { return this.get('pomo') || { sessions:[] }; },
  setPomo(d)        { return this.set('pomo', d); },
  addPomoSession(s)    { const p=this.getPomo(); p.sessions.push({...s,id:this._id()}); return this.setPomo(p); },
  deletePomoSession(id){ const p=this.getPomo(); p.sessions=p.sessions.filter(s=>s.id!==id); return this.setPomo(p); },

  // ── Gym ─────────────────────────────────────────────────
  getGym()            { return this.get('gym') || { workouts:[] }; },
  setGym(d)           { return this.set('gym', d); },
  addWorkout(w)       { const g=this.getGym(); g.workouts.unshift({...w,id:this._id()}); return this.setGym(g); },
  updateWorkout(id,u) { const g=this.getGym(); const i=g.workouts.findIndex(w=>w.id===id); if(i>-1) g.workouts[i]={...g.workouts[i],...u}; return this.setGym(g); },
  deleteWorkout(id)   { const g=this.getGym(); g.workouts=g.workouts.filter(w=>w.id!==id); return this.setGym(g); },

  // ── Gym Body Measurements ────────────────────────────────
  getGymBody()              { return this.get('gym_body') || { logs:[] }; },
  setGymBody(d)             { return this.set('gym_body', d); },
  addBodyMeasurement(m)     { const b=this.getGymBody(); b.logs.unshift({...m,id:this._id()}); return this.setGymBody(b); },
  updateBodyMeasurement(id,u){ const b=this.getGymBody(); const i=b.logs.findIndex(l=>l.id===id); if(i>-1) b.logs[i]={...b.logs[i],...u}; return this.setGymBody(b); },
  deleteBodyMeasurement(id) { const b=this.getGymBody(); b.logs=b.logs.filter(l=>l.id!==id); return this.setGymBody(b); },

  // ── Gym Templates ────────────────────────────────────────
  getGymTemplates()         { return this.get('gym_templates') || { templates:[] }; },
  setGymTemplates(d)        { return this.set('gym_templates', d); },
  addGymTemplate(t)         { const g=this.getGymTemplates(); g.templates.unshift({...t,id:this._id()}); return this.setGymTemplates(g); },
  updateGymTemplate(id,u)   { const g=this.getGymTemplates(); const i=g.templates.findIndex(t=>t.id===id); if(i>-1) g.templates[i]={...g.templates[i],...u}; return this.setGymTemplates(g); },
  deleteGymTemplate(id)     { const g=this.getGymTemplates(); g.templates=g.templates.filter(t=>t.id!==id); return this.setGymTemplates(g); },

  // ── Settings ────────────────────────────────────────────
  getSettings()  { return this.get('settings') || { currency:'$', theme:'dark', weekStart:1, uiScale:0.75 }; },
  setSettings(d) { return this.set('settings', d); },

  // ── Seed data ───────────────────────────────────────────
  seed(lang) {
    const _l = lang || (this.getSettings().language) || 'en';
    const T  = _SEED_TEXTS[_l] || _SEED_TEXTS['en'];
    const ago    = n => { const d=new Date(); d.setDate(d.getDate()-n); return d.toISOString().split('T')[0]; };
    const future = n => { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().split('T')[0]; };

    if (false && !this.get('seeded')) {
      this.setTime({ logs: [
        {id:this._id(),date:ago(0),category:'Çalışma', project:'Ana Proje',        start:'09:00',end:'12:30',duration:210},
        {id:this._id(),date:ago(0),category:'Öğrenme', project:'React Kursu',       start:'14:00',end:'15:30',duration:90},
        {id:this._id(),date:ago(0),category:'Egzersiz',project:'Sabah Koşusu',      start:'07:00',end:'07:45',duration:45},
        {id:this._id(),date:ago(1),category:'Çalışma', project:'Ana Proje',        start:'09:00',end:'13:00',duration:240},
        {id:this._id(),date:ago(1),category:'Sosyal',  project:'Arkadaş Buluşması', start:'19:00',end:'21:30',duration:150},
        {id:this._id(),date:ago(2),category:'Çalışma', project:'Yan Proje',        start:'10:00',end:'14:00',duration:240},
        {id:this._id(),date:ago(2),category:'Öğrenme', project:'Kitap Okuma',       start:'20:00',end:'21:00',duration:60},
        {id:this._id(),date:ago(3),category:'Egzersiz',project:'Yürüyüş',           start:'07:30',end:'08:15',duration:45},
        {id:this._id(),date:ago(3),category:'Çalışma', project:'Ana Proje',        start:'09:30',end:'17:30',duration:480},
        {id:this._id(),date:ago(4),category:'Çalışma', project:'Ana Proje',        start:'09:00',end:'12:00',duration:180},
        {id:this._id(),date:ago(4),category:'Öğrenme', project:'TypeScript',        start:'14:00',end:'16:00',duration:120},
        {id:this._id(),date:ago(5),category:'Egzersiz',project:'Spor Salonu',       start:'08:00',end:'09:30',duration:90},
        {id:this._id(),date:ago(5),category:'Çalışma', project:'Yan Proje',        start:'10:00',end:'13:00',duration:180},
        {id:this._id(),date:ago(6),category:'Sosyal',  project:'Aile Yemeği',       start:'13:00',end:'16:00',duration:180},
      ]});

      const hIds = [this._id(),this._id(),this._id(),this._id(),this._id()];
      const habits = {
        list: [
          {id:hIds[0],name:'Sabah Koşusu',      color:'#34D399',frequency:'daily',icon:'🏃'},
          {id:hIds[1],name:'Kitap Okuma (30dk)', color:'#60A5FA',frequency:'daily',icon:'📚'},
          {id:hIds[2],name:'Meditasyon',         color:'#7C6CFC',frequency:'daily',icon:'🧘'},
          {id:hIds[3],name:'Dil Öğrenme',        color:'#FBBF24',frequency:'daily',icon:'🌍'},
          {id:hIds[4],name:'Su İçme (2L)',        color:'#F87171',frequency:'daily',icon:'💧'},
        ],
        logs: []
      };
      const donePcts = [0.75, 0.85, 0.60, 0.70, 0.90];
      for (let i=0; i<30; i++) {
        const d = ago(i);
        hIds.forEach((hid,idx) => { if (Math.random()<donePcts[idx]) habits.logs.push({habitId:hid,date:d,done:true}); });
      }
      this.setHabits(habits);

      this.setPlans({ items: [
        {id:this._id(),title:'LifeTracker Dashboard Tasarımı',status:'done',    priority:'high',  dueDate:ago(2),    category:'Proje',   notes:'Dark theme tamamlandı'},
        {id:this._id(),title:'React Kursu Tamamla',           status:'progress',priority:'high',  dueDate:future(22),category:'Eğitim',  notes:"Bölüm 8'de kaldım"},
        {id:this._id(),title:'Aylık Bütçe Planlaması',        status:'progress',priority:'medium',dueDate:future(7), category:'Finans',  notes:''},
        {id:this._id(),title:'Portföy Rebalancing',           status:'todo',    priority:'medium',dueDate:future(5), category:'Yatırım', notes:'Kripto oranını düşür'},
        {id:this._id(),title:'Tatil Planı Yap',               status:'todo',    priority:'low',   dueDate:future(45),category:'Kişisel', notes:'Kapadokya veya Bodrum'},
        {id:this._id(),title:'Freelance Portföy Sitesi',      status:'todo',    priority:'high',  dueDate:future(30),category:'Proje',   notes:'Next.js ile yapılacak'},
        {id:this._id(),title:'Sigorta Yenileme',              status:'todo',    priority:'medium',dueDate:future(3), category:'Finans',  notes:''},
      ]});

      this.setInvestments({ assets: [
        {id:this._id(),name:'Global ETF',      type:'hisse',  quantity:150,  buyPrice:85.20,  currentPrice:102.40},
        {id:this._id(),name:'Teknoloji Fonu', type:'hisse',  quantity:50,   buyPrice:142.50, currentPrice:168.30},
        {id:this._id(),name:'Bitcoin (BTC)',  type:'kripto', quantity:0.05, buyPrice:62000,  currentPrice:72500},
        {id:this._id(),name:'Ethereum (ETH)', type:'kripto', quantity:0.8,  buyPrice:3200,   currentPrice:3650},
        {id:this._id(),name:'Altın (22 Ayar)',type:'altin',  quantity:10,   buyPrice:2850,   currentPrice:3120},
        {id:this._id(),name:'Vadeli Mevduat', type:'mevduat',quantity:1,    buyPrice:50000,  currentPrice:54200},
      ]});

      this.setGoals({ items: [
        {id:this._id(),title:'Yazılım Mimarı Olmak',  desc:"Senior'den mimariye geçiş",         category:'Kariyer', targetDate:'2027-12-31',progress:35,emoji:'💼',milestones:['System design öğren','Liderlik deneyimi','Teknik blog']},
        {id:this._id(),title:'Japonya Seyahati',       desc:'Tokyo, Kyoto ve Osaka.',            category:'Seyahat', targetDate:'2026-04-15',progress:20,emoji:'🗾',milestones:['80K₺ birikim','Vize al','Otel rezervasyonu']},
        {id:this._id(),title:'5K Koşu Hedefi',         desc:"5 km'yi 25 dakikada koşmak.",      category:'Sağlık',  targetDate:'2026-08-01',progress:60,emoji:'🏃',milestones:['3K ✓','4K','5K']},
        {id:this._id(),title:'Kendi Ürününü Yayınla',  desc:'Bağımsız bir SaaS ürünü.',         category:'Kariyer', targetDate:'2026-12-31',progress:15,emoji:'🚀',milestones:['Validasyon','MVP','İlk müşteri']},
        {id:this._id(),title:'Net Varlık 1M₺',         desc:'Yatırım ve tasarruflarla 1M TL.',  category:'Finansal',targetDate:'2028-01-01',progress:42,emoji:'💰',milestones:['250K ✓','500K','750K','1M']},
        {id:this._id(),title:'İngilizce C1 Seviyesi',  desc:'İş İngilizcesinde akıcı olmak.',   category:'Eğitim',  targetDate:'2026-06-01',progress:55,emoji:'🇬🇧',milestones:['B2 ✓','IELTS hazırlık','IELTS sınav']},
      ]});

      this.set('seeded', true);
    }

    // Budget v2: category/subcategory based structure
    if (false && !this.get('budget_v2')) {
      const g1=this._id(), g2=this._id(), g3=this._id(), g4=this._id(), g5=this._id(), g6=this._id();
      const s1=[this._id()];
      const s2=[this._id(),this._id(),this._id(),this._id()];
      const s3=[this._id(),this._id(),this._id(),this._id(),this._id()];
      const s4=[this._id(),this._id()];
      const s6=[this._id(),this._id(),this._id(),this._id(),this._id()];
      const ago = n => { const d=new Date(); d.setDate(d.getDate()-n); return d.toISOString().split('T')[0]; };

      this.setBudget({
        groups: [
          { id:g1, name:'Gelir',       type:'income',  color:'#34D399', subs:[
            { id:s1[0], name:'Aile Geliri',                  budget:35000 },
          ]},
          { id:g2, name:'Giderler',    type:'expense', color:'#F87171', subs:[
            { id:s2[0], name:'Market Harcamaları',           budget:7500 },
            { id:s2[1], name:'Dışarıdan Yemek Harcamaları', budget:2000 },
            { id:s2[2], name:'Course / Books / Game',        budget:750  },
            { id:s2[3], name:'Diğer / Miscellaneous',        budget:3000 },
          ]},
          { id:g3, name:'Faturalar',   type:'expense', color:'#60A5FA', subs:[
            { id:s3[0], name:'Kyk Ücreti',        budget:1700 },
            { id:s3[1], name:'Telefon Faturası',  budget:935  },
            { id:s3[2], name:'Comtech Internet',  budget:430  },
            { id:s3[3], name:'Gym Membership',    budget:1600 },
            { id:s3[4], name:'Midas İşlem Ücreti',budget:500  },
          ]},
          { id:g4, name:'Tasarruf',    type:'expense', color:'#FBBF24', subs:[
            { id:s4[0], name:'GOOGLE / NVDIA / AMZN / VRT', budget:14000 },
            { id:s4[1], name:'ALTINS1',                      budget:2000  },
          ]},
          { id:g5, name:'Borçlar',     type:'expense', color:'#F472B6', subs:[] },
          { id:g6, name:'Abonelikler', type:'expense', color:'#A78BFA', subs:[
            { id:s6[0], name:'Netflix',         budget:190  },
            { id:s6[1], name:'Youtube Premium', budget:80   },
            { id:s6[2], name:'Spotify',         budget:55   },
            { id:s6[3], name:'Prime Video',     budget:70   },
            { id:s6[4], name:'Claude Code AI',  budget:1000 },
          ]},
        ],
        transactions: [
          {id:this._id(),date:ago(4),desc:'Ekmek / Kahve',              groupId:g2,subId:s2[0],amount:84,  type:'expense'},
          {id:this._id(),date:ago(4),desc:'Tracker Şablonları alındı',  groupId:g2,subId:s2[3],amount:213, type:'expense'},
          {id:this._id(),date:ago(3),desc:'Soğuk Kahve',                groupId:g2,subId:s2[0],amount:60,  type:'expense'},
          {id:this._id(),date:ago(3),desc:'Midas İşlem Ücreti 3x',      groupId:g3,subId:s3[4],amount:180, type:'expense'},
          {id:this._id(),date:ago(2),desc:'Soğuk Kahve',                groupId:g2,subId:s2[0],amount:60,  type:'expense'},
          {id:this._id(),date:ago(2),desc:'AI Agent Create Course n8n', groupId:g2,subId:s2[2],amount:550, type:'expense'},
          {id:this._id(),date:ago(2),desc:'Kahve / Ayran',              groupId:g2,subId:s2[0],amount:196, type:'expense'},
          {id:this._id(),date:ago(2),desc:'Ekmek / Bisküvit',           groupId:g2,subId:s2[0],amount:55,  type:'expense'},
          {id:this._id(),date:ago(2),desc:'Kahve',                      groupId:g2,subId:s2[0],amount:60,  type:'expense'},
          {id:this._id(),date:ago(1),desc:'Kahve / Kraker',             groupId:g2,subId:s2[0],amount:100, type:'expense'},
          {id:this._id(),date:ago(1),desc:'Midas İşlem Ücreti 2x',      groupId:g3,subId:s3[4],amount:135, type:'expense'},
          {id:this._id(),date:ago(1),desc:'Claude Code AI Üyelik',      groupId:g6,subId:s6[4],amount:800, type:'expense'},
          {id:this._id(),date:ago(1),desc:'Kahve / Soda',               groupId:g2,subId:s2[0],amount:100, type:'expense'},
          {id:this._id(),date:ago(1),desc:'3X Lahmacun',                groupId:g2,subId:s2[1],amount:350, type:'expense'},
          {id:this._id(),date:ago(0),desc:'Market',                     groupId:g2,subId:s2[0],amount:165, type:'expense'},
        ]
      });
      this.set('budget_v2', true);
    }

    // ── Gym seed ──────────────────────────────────────────────
    if (!this.get('gym_seeded') && !this.getGym().workouts.length) {
      this.set('seed_active', true);
      const wid = () => this._id();
      const gn = T.gym.n, gtn = T.gym.tn;

      this.setGym({ workouts: [
        { id:wid(), date:ago(0),  type:'strength',   duration:65, rpe:8,   distance:null, notes:gn[0],
          exercises:[
            { id:wid(), name:'Bench Press',       muscle:'chest',     sets:4, reps:8,  weight:80  },
            { id:wid(), name:'Incline Dumbbell',  muscle:'chest',     sets:3, reps:10, weight:28  },
            { id:wid(), name:'Cable Flyes',       muscle:'chest',     sets:3, reps:15, weight:15  },
            { id:wid(), name:'Tricep Pushdown',   muscle:'arms',      sets:3, reps:12, weight:25  },
            { id:wid(), name:'Overhead Press',    muscle:'shoulders', sets:3, reps:8,  weight:50  },
          ]},
        { id:wid(), date:ago(2),  type:'strength',   duration:70, rpe:7.5, distance:null, notes:gn[1],
          exercises:[
            { id:wid(), name:'Pull-ups',          muscle:'back',      sets:4, reps:8,  weight:0   },
            { id:wid(), name:'Barbell Row',       muscle:'back',      sets:4, reps:8,  weight:70  },
            { id:wid(), name:'Lat Pulldown',      muscle:'back',      sets:3, reps:12, weight:60  },
            { id:wid(), name:'Face Pull',         muscle:'shoulders', sets:3, reps:15, weight:20  },
            { id:wid(), name:'Bicep Curl',        muscle:'arms',      sets:3, reps:12, weight:16  },
          ]},
        { id:wid(), date:ago(4),  type:'strength',   duration:80, rpe:9,   distance:null, notes:gn[2],
          exercises:[
            { id:wid(), name:'Squat',             muscle:'legs', sets:5, reps:5,  weight:100 },
            { id:wid(), name:'Leg Press',         muscle:'legs', sets:3, reps:12, weight:150 },
            { id:wid(), name:'Romanian Deadlift', muscle:'legs', sets:3, reps:10, weight:70  },
            { id:wid(), name:'Leg Curl',          muscle:'legs', sets:3, reps:12, weight:45  },
            { id:wid(), name:'Calf Raise',        muscle:'legs', sets:4, reps:20, weight:60  },
          ]},
        { id:wid(), date:ago(6),  type:'cardio',     duration:35, rpe:6,   distance:5.2,  notes:gn[3], exercises:[] },
        { id:wid(), date:ago(7),  type:'strength',   duration:60, rpe:8,   distance:null, notes:gn[4],
          exercises:[
            { id:wid(), name:'Bench Press',       muscle:'chest',     sets:4, reps:8,  weight:77.5 },
            { id:wid(), name:'Overhead Press',    muscle:'shoulders', sets:3, reps:8,  weight:50   },
            { id:wid(), name:'Tricep Pushdown',   muscle:'arms',      sets:3, reps:12, weight:25   },
          ]},
        { id:wid(), date:ago(9),  type:'strength',   duration:75, rpe:7,   distance:null, notes:gn[5],
          exercises:[
            { id:wid(), name:'Deadlift',          muscle:'back', sets:4, reps:5,  weight:120 },
            { id:wid(), name:'Pull-ups',          muscle:'back', sets:3, reps:7,  weight:0   },
            { id:wid(), name:'Barbell Row',       muscle:'back', sets:3, reps:8,  weight:65  },
            { id:wid(), name:'Bicep Curl',        muscle:'arms', sets:3, reps:12, weight:15  },
          ]},
        { id:wid(), date:ago(11), type:'crossfit',   duration:45, rpe:9.5, distance:null, notes:gn[6],
          exercises:[
            { id:wid(), name:'Burpee',           muscle:'cardio', sets:null, reps:null, weight:null },
            { id:wid(), name:'Box Jump',         muscle:'legs',   sets:null, reps:null, weight:null },
            { id:wid(), name:'Kettlebell Swing', muscle:'back',   sets:null, reps:null, weight:24   },
          ]},
        { id:wid(), date:ago(13), type:'cardio',     duration:50, rpe:5,   distance:7.5,  notes:gn[7], exercises:[] },
        { id:wid(), date:ago(14), type:'strength',   duration:70, rpe:8,   distance:null, notes:gn[8],
          exercises:[
            { id:wid(), name:'Squat',             muscle:'legs',      sets:5, reps:5,  weight:97.5 },
            { id:wid(), name:'Bench Press',       muscle:'chest',     sets:4, reps:8,  weight:75   },
            { id:wid(), name:'Overhead Press',    muscle:'shoulders', sets:3, reps:8,  weight:47.5 },
            { id:wid(), name:'Deadlift',          muscle:'back',      sets:1, reps:5,  weight:115  },
          ]},
        { id:wid(), date:ago(16), type:'flexibility', duration:40, rpe:3,   distance:null, notes:gn[9],
          exercises:[
            { id:wid(), name:'Hip Flexor Stretch', muscle:'legs', sets:null, reps:null, weight:null },
            { id:wid(), name:'Thoracic Rotation',  muscle:'core', sets:null, reps:null, weight:null },
          ]},
        { id:wid(), date:ago(18), type:'strength',   duration:65, rpe:7.5, distance:null, notes:gn[10],
          exercises:[
            { id:wid(), name:'Bench Press',       muscle:'chest', sets:4, reps:8,  weight:75   },
            { id:wid(), name:'Cable Flyes',       muscle:'chest', sets:3, reps:15, weight:15   },
            { id:wid(), name:'Tricep Pushdown',   muscle:'arms',  sets:3, reps:12, weight:22.5 },
          ]},
        { id:wid(), date:ago(21), type:'strength',   duration:80, rpe:8.5, distance:null, notes:gn[11],
          exercises:[
            { id:wid(), name:'Squat',             muscle:'legs', sets:5, reps:5,  weight:95  },
            { id:wid(), name:'Leg Press',         muscle:'legs', sets:4, reps:10, weight:140 },
            { id:wid(), name:'Romanian Deadlift', muscle:'legs', sets:3, reps:10, weight:65  },
          ]},
      ]});

      this.setGymBody({ logs: [
        { id:wid(), date:ago(0),  weight:78.2, bodyFat:16.5, waist:82, chest:98, arm:36,   leg:56   },
        { id:wid(), date:ago(7),  weight:78.8, bodyFat:17.0, waist:83, chest:97, arm:35.5, leg:55.5 },
        { id:wid(), date:ago(14), weight:79.4, bodyFat:17.5, waist:84, chest:96, arm:35,   leg:55   },
        { id:wid(), date:ago(21), weight:79.9, bodyFat:18.0, waist:85, chest:96, arm:34.5, leg:54.5 },
        { id:wid(), date:ago(28), weight:80.5, bodyFat:18.5, waist:86, chest:95, arm:34,   leg:54   },
        { id:wid(), date:ago(35), weight:81.0, bodyFat:19.0, waist:87, chest:95, arm:34,   leg:53.5 },
      ]});

      this.setGymTemplates({ templates: [
        { id:wid(), name:gtn[0], type:'strength', exercises:[
            { id:wid(), name:'Bench Press',      muscle:'chest',     sets:4, reps:8,  weight:80 },
            { id:wid(), name:'Incline Dumbbell', muscle:'chest',     sets:3, reps:10, weight:28 },
            { id:wid(), name:'Overhead Press',   muscle:'shoulders', sets:3, reps:8,  weight:50 },
            { id:wid(), name:'Tricep Pushdown',  muscle:'arms',      sets:3, reps:12, weight:25 },
          ]},
        { id:wid(), name:gtn[1], type:'strength', exercises:[
            { id:wid(), name:'Pull-ups',     muscle:'back', sets:4, reps:8,  weight:0  },
            { id:wid(), name:'Barbell Row',  muscle:'back', sets:4, reps:8,  weight:70 },
            { id:wid(), name:'Lat Pulldown', muscle:'back', sets:3, reps:12, weight:60 },
            { id:wid(), name:'Bicep Curl',   muscle:'arms', sets:3, reps:12, weight:16 },
          ]},
        { id:wid(), name:gtn[2], type:'strength', exercises:[
            { id:wid(), name:'Squat',             muscle:'legs', sets:5, reps:5,  weight:100 },
            { id:wid(), name:'Leg Press',         muscle:'legs', sets:3, reps:12, weight:150 },
            { id:wid(), name:'Romanian Deadlift', muscle:'legs', sets:3, reps:10, weight:70  },
            { id:wid(), name:'Calf Raise',        muscle:'legs', sets:4, reps:20, weight:60  },
          ]},
        { id:wid(), name:gtn[3], type:'cardio', exercises:[] },
      ]});

      this.set('gym_seeded', true);
    }

    // ── Time seed ─────────────────────────────────────────────
    if (!this.get('time_seeded') && !this.getTime().logs.length) {
      const tt = T.time;
      this.setTime({ logs: [
        {id:this._id(),date:ago(0), category:tt[0][0], project:tt[0][1], start:'09:15',end:'12:30',duration:195},
        {id:this._id(),date:ago(0), category:tt[1][0], project:tt[1][1], start:'14:00',end:'16:00',duration:120},
        {id:this._id(),date:ago(1), category:tt[2][0], project:tt[2][1], start:'09:00',end:'13:00',duration:240},
        {id:this._id(),date:ago(1), category:tt[3][0], project:tt[3][1], start:'07:00',end:'08:15',duration:75},
        {id:this._id(),date:ago(2), category:tt[4][0], project:tt[4][1], start:'20:00',end:'21:30',duration:90},
        {id:this._id(),date:ago(2), category:tt[5][0], project:tt[5][1], start:'10:00',end:'14:00',duration:240},
        {id:this._id(),date:ago(3), category:tt[6][0], project:tt[6][1], start:'09:30',end:'17:30',duration:480},
        {id:this._id(),date:ago(3), category:tt[7][0], project:tt[7][1], start:'19:00',end:'21:00',duration:120},
        {id:this._id(),date:ago(4), category:tt[8][0], project:tt[8][1], start:'07:30',end:'08:15',duration:45},
        {id:this._id(),date:ago(4), category:tt[9][0], project:tt[9][1], start:'20:00',end:'22:00',duration:120},
        {id:this._id(),date:ago(5), category:tt[10][0],project:tt[10][1],start:'09:00',end:'12:00',duration:180},
        {id:this._id(),date:ago(5), category:tt[11][0],project:tt[11][1],start:'14:00',end:'16:30',duration:150},
        {id:this._id(),date:ago(6), category:tt[12][0],project:tt[12][1],start:'08:00',end:'09:30',duration:90},
        {id:this._id(),date:ago(6), category:tt[13][0],project:tt[13][1],start:'21:00',end:'22:00',duration:60},
        {id:this._id(),date:ago(7), category:tt[14][0],project:tt[14][1],start:'09:00',end:'11:30',duration:150},
        {id:this._id(),date:ago(7), category:tt[15][0],project:tt[15][1],start:'14:00',end:'16:00',duration:120},
        {id:this._id(),date:ago(8), category:tt[16][0],project:tt[16][1],start:'09:30',end:'13:30',duration:240},
        {id:this._id(),date:ago(8), category:tt[17][0],project:tt[17][1],start:'07:00',end:'07:45',duration:45},
        {id:this._id(),date:ago(9), category:tt[18][0],project:tt[18][1],start:'20:00',end:'21:30',duration:90},
        {id:this._id(),date:ago(9), category:tt[19][0],project:tt[19][1],start:'10:00',end:'14:00',duration:240},
        {id:this._id(),date:ago(10),category:tt[20][0],project:tt[20][1],start:'09:00',end:'17:00',duration:480},
        {id:this._id(),date:ago(10),category:tt[21][0],project:tt[21][1],start:'19:30',end:'22:00',duration:150},
        {id:this._id(),date:ago(11),category:tt[22][0],project:tt[22][1],start:'08:00',end:'09:30',duration:90},
        {id:this._id(),date:ago(11),category:tt[23][0],project:tt[23][1],start:'20:30',end:'22:00',duration:90},
        {id:this._id(),date:ago(12),category:tt[24][0],project:tt[24][1],start:'10:00',end:'13:00',duration:180},
        {id:this._id(),date:ago(12),category:tt[25][0],project:tt[25][1],start:'14:30',end:'17:30',duration:180},
        {id:this._id(),date:ago(13),category:tt[26][0],project:tt[26][1],start:'07:30',end:'08:15',duration:45},
        {id:this._id(),date:ago(13),category:tt[27][0],project:tt[27][1],start:'21:00',end:'22:00',duration:60},
      ]});
      this.set('time_seeded', true);
    }

    // ── Habits seed ───────────────────────────────────────────
    if (!this.get('habits_seeded') && !this.getHabits().list.length) {
      const ht = T.habits;
      const h = [this._id(),this._id(),this._id(),this._id(),this._id(),this._id()];
      const data = {
        list: [
          {id:h[0],name:ht[0],color:'#7C6CFC',icon:'🍳',type:'permanent',days:[]},
          {id:h[1],name:ht[1],color:'#34D399',icon:'📋',type:'permanent',days:[]},
          {id:h[2],name:ht[2],color:'#F87171',icon:'🏃',type:'scheduled',days:[1,2,3,4,5,6]},
          {id:h[3],name:ht[3],color:'#60A5FA',icon:'📚',type:'scheduled',days:[1,3,5,0]},
          {id:h[4],name:ht[4],color:'#FBBF24',icon:'🦷',type:'permanent',days:[]},
          {id:h[5],name:ht[5],color:'#A78BFA',icon:'🌊',type:'permanent',days:[]},
        ],
        logs: []
      };
      const rates = [0.90, 0.85, 0.70, 0.60, 0.95, 0.65];
      for (let i=0; i<30; i++) {
        const d = ago(i);
        h.forEach((hid, idx) => { if (Math.random() < rates[idx]) data.logs.push({habitId:hid, date:d, done:true}); });
      }
      this.setHabits(data);
      this.set('habits_seeded', true);
    }

    // ── Plans seed ────────────────────────────────────────────
    if (!this.get('plans_seeded') && !this.getPlans().items.length) {
      const pt = T.plans;
      const si = () => this._id();
      this.setPlans({ items: [
        {id:si(),title:pt[0][0],status:'progress',priority:'high',  dueDate:future(10),category:'Project',  notes:pt[0][1],subTasks:[{id:si(),title:pt[0][2][0],done:true},{id:si(),title:pt[0][2][1],done:false},{id:si(),title:pt[0][2][2],done:false}]},
        {id:si(),title:pt[1][0],status:'progress',priority:'high',  dueDate:future(20),category:'Education',notes:pt[1][1],subTasks:[{id:si(),title:pt[1][2][0],done:true},{id:si(),title:pt[1][2][1],done:false},{id:si(),title:pt[1][2][2],done:false}]},
        {id:si(),title:pt[2][0],status:'todo',    priority:'medium',dueDate:future(7), category:'Finance',  notes:pt[2][1],subTasks:[{id:si(),title:pt[2][2][0],done:false},{id:si(),title:pt[2][2][1],done:false}]},
        {id:si(),title:pt[3][0],status:'todo',    priority:'medium',dueDate:future(5), category:'Invest',   notes:pt[3][1],subTasks:[{id:si(),title:pt[3][2][0],done:false},{id:si(),title:pt[3][2][1],done:false}]},
        {id:si(),title:pt[4][0],status:'todo',    priority:'high',  dueDate:future(14),category:'Project',  notes:pt[4][1],subTasks:[{id:si(),title:pt[4][2][0],done:false},{id:si(),title:pt[4][2][1],done:false},{id:si(),title:pt[4][2][2],done:false}]},
        {id:si(),title:pt[5][0],status:'todo',    priority:'low',   dueDate:future(60),category:'Personal', notes:pt[5][1],subTasks:[{id:si(),title:pt[5][2][0],done:false},{id:si(),title:pt[5][2][1],done:false}]},
        {id:si(),title:pt[6][0],status:'done',    priority:'medium',dueDate:ago(2),    category:'Education',notes:pt[6][1],subTasks:[{id:si(),title:pt[6][2][0],done:true},{id:si(),title:pt[6][2][1],done:true}]},
        {id:si(),title:pt[7][0],status:'todo',    priority:'high',  dueDate:future(30),category:'Project',  notes:pt[7][1],subTasks:[{id:si(),title:pt[7][2][0],done:false},{id:si(),title:pt[7][2][1],done:false},{id:si(),title:pt[7][2][2],done:false}]},
      ]});
      this.set('plans_seeded', true);
    }

    // ── Investments seed ──────────────────────────────────────
    if (!this.get('inv_seeded') && !this.getInvestments().assets.length) {
      this.setInvestments({ assets: [
        {id:this._id(),symbol:'GOOGL',name:'Alphabet Inc.',   assetType:'Stock',     quantity:2,    buyPrice:155.00,purchaseDate:'2023-08-12'},
        {id:this._id(),symbol:'VRT',  name:'Vertiv Holdings', assetType:'Stock',     quantity:3,    buyPrice:82.00, purchaseDate:'2023-11-04'},
        {id:this._id(),symbol:'NVDA', name:'NVIDIA Corp.',    assetType:'Stock',     quantity:1,    buyPrice:495.00,purchaseDate:'2023-10-18'},
        {id:this._id(),symbol:'BTC',  name:'Bitcoin',         assetType:'Crypto',    quantity:0.02, buyPrice:42000, purchaseDate:'2024-01-15'},
        {id:this._id(),symbol:'GOLD', name:'Gold (gram)',     assetType:'Commodity', quantity:5,    buyPrice:62.00, purchaseDate:'2024-03-01'},
        {id:this._id(),symbol:'CASH', name:'Cash Reserve',    assetType:'Cash',      quantity:2000, buyPrice:1},
      ]});
      this.set('inv_seeded', true);
    }

    // ── Investments price cache seed (mock current prices) ────
    if (!this.get('inv_prices_seeded')) {
      const prices = this.get('inv_prices') || {};
      const now = Date.now();
      const mock = { GOOGL:186.40, VRT:168.50, NVDA:1287.00, BTC:107500, GOLD:101.80 };
      Object.entries(mock).forEach(([sym, price]) => {
        if (!prices[sym]) prices[sym] = { price, fetchedAt: now };
      });
      this.set('inv_prices', prices);
      this.set('inv_prices_seeded', true);
    }

    // ── Investments history seed (period-specific mock closes) ─
    // Without this, all periods fall back to buyPrice, showing the same all-time return.
    // Dates: ago(1)/ago(2) → daily cur/past; ago(8) → weekly past;
    //        ago(31) → monthly past; ago(91) → 3-month past.
    if (!this.get('inv_history_seeded')) {
      const hist = this.get('inv_history') || {};
      const now  = Date.now();
      const mockH = {
        GOOGL: { [ago(1)]:183.50, [ago(2)]:180.80, [ago(8)]:178.50, [ago(31)]:171.20, [ago(91)]:163.80 },
        VRT:   { [ago(1)]:172.10, [ago(2)]:174.00, [ago(8)]:159.40, [ago(31)]:143.80, [ago(91)]:156.20 },
        NVDA:  { [ago(1)]:1268.50,[ago(2)]:1245.20,[ago(8)]:1232.00,[ago(31)]:1172.50,[ago(91)]:1045.00 },
        BTC:   { [ago(1)]:105800, [ago(2)]:103200, [ago(8)]:101500, [ago(31)]:96000,  [ago(91)]:87500  },
        GOLD:  { [ago(1)]:100.90, [ago(2)]:100.10, [ago(8)]:99.30,  [ago(31)]:95.50,  [ago(91)]:91.20  },
      };
      Object.entries(mockH).forEach(([sym, series]) => {
        if (!hist[sym]) hist[sym] = { series, fetchedAt: now };
      });
      this.set('inv_history', hist);
      this.set('inv_history_seeded', true);
    }

    // ── Goals seed ────────────────────────────────────────────
    if (!this.get('goals_seeded') && !this.getGoals().items.length) {
      const gt = T.goals;
      const gi = () => this._id();
      this.setGoals({ items: [
        {id:gi(),title:gt[0][0],desc:gt[0][1],category:'Career',   targetDate:'2027-01-01',progress:30,emoji:'⚡',color:'#60A5FA',
          milestones:gt[0][2].map((text,i)=>({id:gi(),text,done:i<2}))},
        {id:gi(),title:gt[1][0],desc:gt[1][1],category:'Financial',targetDate:'2040-01-01',progress:13,emoji:'💰',color:'#FB923C',
          milestones:gt[1][2].map((text,i)=>({id:gi(),text,done:i<1}))},
        {id:gi(),title:gt[2][0],desc:gt[2][1],category:'Career',   targetDate:'2027-05-01',progress:0, emoji:'💻',color:'#A78BFA',
          milestones:gt[2][2].map((text,i)=>({id:gi(),text,done:false}))},
        {id:gi(),title:gt[3][0],desc:gt[3][1],category:'Health',   targetDate:'2026-12-31',progress:60,emoji:'🏃',color:'#34D399',
          milestones:gt[3][2].map((text,i)=>({id:gi(),text,done:i<1}))},
        {id:gi(),title:gt[4][0],desc:gt[4][1],category:'Education',targetDate:'2027-06-01',progress:25,emoji:'🌍',color:'#F87171',
          milestones:gt[4][2].map((text,i)=>({id:gi(),text,done:i<1}))},
      ]});
      this.set('goals_seeded', true);
    }

    // ── Budget seed ───────────────────────────────────────────
    if (!this.get('budget_seeded') && !this.getBudget().groups.length) {
      const bt = T.budget;
      const g1=this._id(),g2=this._id(),g3=this._id(),g4=this._id(),g5=this._id();
      const s1=[this._id()];
      const s2=[this._id(),this._id(),this._id(),this._id()];
      const s3=[this._id(),this._id(),this._id(),this._id()];
      const s4=[this._id()];
      const s5=[this._id(),this._id(),this._id(),this._id()];
      this.setBudget({
        groups: [
          {id:g1,name:bt.g[0],type:'income', color:'#34D399',subs:[{id:s1[0],name:bt.s[0][0],budget:3500}]},
          {id:g2,name:bt.g[1],type:'expense',color:'#F87171',subs:[{id:s2[0],name:bt.s[1][0],budget:500},{id:s2[1],name:bt.s[1][1],budget:200},{id:s2[2],name:bt.s[1][2],budget:100},{id:s2[3],name:bt.s[1][3],budget:200}]},
          {id:g3,name:bt.g[2],type:'expense',color:'#60A5FA',subs:[{id:s3[0],name:bt.s[2][0],budget:400},{id:s3[1],name:bt.s[2][1],budget:60},{id:s3[2],name:bt.s[2][2],budget:40},{id:s3[3],name:bt.s[2][3],budget:50}]},
          {id:g4,name:bt.g[3],type:'expense',color:'#FBBF24',subs:[{id:s4[0],name:bt.s[3][0],budget:1000}]},
          {id:g5,name:bt.g[4],type:'expense',color:'#A78BFA',subs:[{id:s5[0],name:bt.s[4][0],budget:15},{id:s5[1],name:bt.s[4][1],budget:10},{id:s5[2],name:bt.s[4][2],budget:14},{id:s5[3],name:bt.s[4][3],budget:20}]},
        ],
        transactions: [
          {id:this._id(),date:ago(0), desc:bt.tx[0],groupId:g2,subId:s2[0],amount:68,   type:'expense'},
          {id:this._id(),date:ago(1), desc:bt.tx[1],groupId:g2,subId:s2[1],amount:22,   type:'expense'},
          {id:this._id(),date:ago(2), desc:bt.tx[2],groupId:g2,subId:s2[0],amount:45,   type:'expense'},
          {id:this._id(),date:ago(3), desc:bt.tx[3],groupId:g2,subId:s2[2],amount:89,   type:'expense'},
          {id:this._id(),date:ago(4), desc:bt.tx[4],groupId:g5,subId:s5[0],amount:15,   type:'expense'},
          {id:this._id(),date:ago(5), desc:bt.tx[5],groupId:g2,subId:s2[0],amount:55,   type:'expense'},
          {id:this._id(),date:ago(6), desc:bt.tx[6],groupId:g1,subId:s1[0],amount:3500, type:'income'},
          {id:this._id(),date:ago(6), desc:bt.tx[7],groupId:g3,subId:s3[0],amount:400,  type:'expense'},
          {id:this._id(),date:ago(6), desc:bt.tx[8],groupId:g3,subId:s3[1],amount:60,   type:'expense'},
          {id:this._id(),date:ago(7), desc:bt.tx[9],groupId:g4,subId:s4[0],amount:1000, type:'expense'},
          {id:this._id(),date:ago(8), desc:bt.tx[10],groupId:g3,subId:s3[2],amount:40,  type:'expense'},
          {id:this._id(),date:ago(9), desc:bt.tx[11],groupId:g3,subId:s3[3],amount:50,  type:'expense'},
          {id:this._id(),date:ago(10),desc:bt.tx[12],groupId:g2,subId:s2[2],amount:35,  type:'expense'},
          {id:this._id(),date:ago(11),desc:bt.tx[13],groupId:g2,subId:s2[3],amount:25,  type:'expense'},
          {id:this._id(),date:ago(12),desc:bt.tx[0], groupId:g2,subId:s2[0],amount:78,  type:'expense'},
          {id:this._id(),date:ago(13),desc:bt.tx[1], groupId:g2,subId:s2[1],amount:35,  type:'expense'},
          {id:this._id(),date:ago(14),desc:bt.tx[2], groupId:g2,subId:s2[0],amount:52,  type:'expense'},
          {id:this._id(),date:ago(15),desc:bt.tx[5], groupId:g5,subId:s5[1],amount:10,  type:'expense'},
          {id:this._id(),date:ago(16),desc:bt.tx[5], groupId:g5,subId:s5[2],amount:14,  type:'expense'},
          {id:this._id(),date:ago(17),desc:bt.tx[5], groupId:g5,subId:s5[3],amount:20,  type:'expense'},
        ]
      });
      this.set('budget_seeded', true);

      // Past cycle snapshots — used by the Cycle History view
      const snapshotGroups = JSON.parse(JSON.stringify(this.getBudget().groups));
      const c1txs = [
        {id:this._id(),date:ago(2), desc:bt.tx[0], groupId:g2,subId:s2[0],amount:72,   type:'expense'},
        {id:this._id(),date:ago(3), desc:bt.tx[1], groupId:g2,subId:s2[1],amount:18,   type:'expense'},
        {id:this._id(),date:ago(5), desc:bt.tx[2], groupId:g2,subId:s2[0],amount:50,   type:'expense'},
        {id:this._id(),date:ago(7), desc:bt.tx[3], groupId:g2,subId:s2[2],amount:79,   type:'expense'},
        {id:this._id(),date:ago(8), desc:bt.tx[4], groupId:g5,subId:s5[0],amount:15,   type:'expense'},
        {id:this._id(),date:ago(9), desc:bt.tx[5], groupId:g2,subId:s2[0],amount:60,   type:'expense'},
        {id:this._id(),date:ago(10),desc:bt.tx[6], groupId:g1,subId:s1[0],amount:3500, type:'income'},
        {id:this._id(),date:ago(10),desc:bt.tx[7], groupId:g3,subId:s3[0],amount:400,  type:'expense'},
        {id:this._id(),date:ago(10),desc:bt.tx[8], groupId:g3,subId:s3[1],amount:60,   type:'expense'},
        {id:this._id(),date:ago(11),desc:bt.tx[9], groupId:g4,subId:s4[0],amount:1000, type:'expense'},
        {id:this._id(),date:ago(12),desc:bt.tx[1], groupId:g2,subId:s2[1],amount:32,   type:'expense'},
        {id:this._id(),date:ago(14),desc:bt.tx[0], groupId:g2,subId:s2[0],amount:65,   type:'expense'},
        {id:this._id(),date:ago(16),desc:bt.tx[3], groupId:g2,subId:s2[2],amount:45,   type:'expense'},
        {id:this._id(),date:ago(17),desc:bt.tx[4], groupId:g5,subId:s5[1],amount:10,   type:'expense'},
        {id:this._id(),date:ago(18),desc:bt.tx[5], groupId:g2,subId:s2[0],amount:48,   type:'expense'},
        {id:this._id(),date:ago(19),desc:bt.tx[8], groupId:g3,subId:s3[2],amount:40,   type:'expense'},
        {id:this._id(),date:ago(21),desc:bt.tx[4], groupId:g5,subId:s5[2],amount:14,   type:'expense'},
        {id:this._id(),date:ago(22),desc:bt.tx[4], groupId:g5,subId:s5[3],amount:20,   type:'expense'},
        {id:this._id(),date:ago(26),desc:bt.tx[8], groupId:g3,subId:s3[3],amount:50,   type:'expense'},
        {id:this._id(),date:ago(27),desc:bt.tx[10],groupId:g3,subId:s3[2],amount:40,   type:'expense'},
      ];
      const c1inc  = c1txs.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0);
      const c1exp  = c1txs.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0);
      const c2txs = [
        {id:this._id(),date:ago(32),desc:bt.tx[0], groupId:g2,subId:s2[0],amount:66,   type:'expense'},
        {id:this._id(),date:ago(33),desc:bt.tx[1], groupId:g2,subId:s2[1],amount:25,   type:'expense'},
        {id:this._id(),date:ago(35),desc:bt.tx[2], groupId:g2,subId:s2[0],amount:55,   type:'expense'},
        {id:this._id(),date:ago(36),desc:bt.tx[3], groupId:g2,subId:s2[2],amount:60,   type:'expense'},
        {id:this._id(),date:ago(38),desc:bt.tx[4], groupId:g5,subId:s5[0],amount:15,   type:'expense'},
        {id:this._id(),date:ago(39),desc:bt.tx[5], groupId:g2,subId:s2[0],amount:70,   type:'expense'},
        {id:this._id(),date:ago(40),desc:bt.tx[6], groupId:g1,subId:s1[0],amount:3500, type:'income'},
        {id:this._id(),date:ago(40),desc:bt.tx[7], groupId:g3,subId:s3[0],amount:400,  type:'expense'},
        {id:this._id(),date:ago(40),desc:bt.tx[8], groupId:g3,subId:s3[1],amount:60,   type:'expense'},
        {id:this._id(),date:ago(41),desc:bt.tx[9], groupId:g4,subId:s4[0],amount:1000, type:'expense'},
        {id:this._id(),date:ago(42),desc:bt.tx[1], groupId:g2,subId:s2[1],amount:28,   type:'expense'},
        {id:this._id(),date:ago(45),desc:bt.tx[0], groupId:g2,subId:s2[0],amount:58,   type:'expense'},
        {id:this._id(),date:ago(47),desc:bt.tx[4], groupId:g5,subId:s5[1],amount:10,   type:'expense'},
        {id:this._id(),date:ago(48),desc:bt.tx[4], groupId:g5,subId:s5[2],amount:14,   type:'expense'},
        {id:this._id(),date:ago(49),desc:bt.tx[4], groupId:g5,subId:s5[3],amount:20,   type:'expense'},
        {id:this._id(),date:ago(50),desc:bt.tx[8], groupId:g3,subId:s3[2],amount:40,   type:'expense'},
        {id:this._id(),date:ago(52),desc:bt.tx[3], groupId:g2,subId:s2[2],amount:35,   type:'expense'},
        {id:this._id(),date:ago(55),desc:bt.tx[8], groupId:g3,subId:s3[3],amount:50,   type:'expense'},
      ];
      const c2inc  = c2txs.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0);
      const c2exp  = c2txs.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0);
      const c3txs = [
        {id:this._id(),date:ago(62), desc:bt.tx[0], groupId:g2,subId:s2[0],amount:70,   type:'expense'},
        {id:this._id(),date:ago(63), desc:bt.tx[1], groupId:g2,subId:s2[1],amount:28,   type:'expense'},
        {id:this._id(),date:ago(65), desc:bt.tx[2], groupId:g2,subId:s2[0],amount:55,   type:'expense'},
        {id:this._id(),date:ago(66), desc:bt.tx[3], groupId:g2,subId:s2[2],amount:75,   type:'expense'},
        {id:this._id(),date:ago(68), desc:bt.tx[4], groupId:g5,subId:s5[0],amount:15,   type:'expense'},
        {id:this._id(),date:ago(69), desc:bt.tx[5], groupId:g2,subId:s2[0],amount:62,   type:'expense'},
        {id:this._id(),date:ago(70), desc:bt.tx[6], groupId:g1,subId:s1[0],amount:3500, type:'income'},
        {id:this._id(),date:ago(70), desc:bt.tx[7], groupId:g3,subId:s3[0],amount:400,  type:'expense'},
        {id:this._id(),date:ago(70), desc:bt.tx[8], groupId:g3,subId:s3[1],amount:60,   type:'expense'},
        {id:this._id(),date:ago(71), desc:bt.tx[9], groupId:g4,subId:s4[0],amount:1000, type:'expense'},
        {id:this._id(),date:ago(72), desc:bt.tx[1], groupId:g2,subId:s2[1],amount:22,   type:'expense'},
        {id:this._id(),date:ago(74), desc:bt.tx[0], groupId:g2,subId:s2[0],amount:68,   type:'expense'},
        {id:this._id(),date:ago(76), desc:bt.tx[10],groupId:g3,subId:s3[2],amount:40,   type:'expense'},
        {id:this._id(),date:ago(78), desc:bt.tx[4], groupId:g5,subId:s5[1],amount:10,   type:'expense'},
        {id:this._id(),date:ago(79), desc:bt.tx[4], groupId:g5,subId:s5[2],amount:14,   type:'expense'},
        {id:this._id(),date:ago(80), desc:bt.tx[4], groupId:g5,subId:s5[3],amount:20,   type:'expense'},
        {id:this._id(),date:ago(82), desc:bt.tx[11],groupId:g3,subId:s3[3],amount:50,   type:'expense'},
        {id:this._id(),date:ago(85), desc:bt.tx[13],groupId:g2,subId:s2[3],amount:30,   type:'expense'},
      ];
      const c3inc  = c3txs.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0);
      const c3exp  = c3txs.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0);
      const c4txs = [
        {id:this._id(),date:ago(92), desc:bt.tx[0], groupId:g2,subId:s2[0],amount:65,   type:'expense'},
        {id:this._id(),date:ago(93), desc:bt.tx[1], groupId:g2,subId:s2[1],amount:30,   type:'expense'},
        {id:this._id(),date:ago(95), desc:bt.tx[2], groupId:g2,subId:s2[0],amount:48,   type:'expense'},
        {id:this._id(),date:ago(96), desc:bt.tx[3], groupId:g2,subId:s2[2],amount:89,   type:'expense'},
        {id:this._id(),date:ago(98), desc:bt.tx[4], groupId:g5,subId:s5[0],amount:15,   type:'expense'},
        {id:this._id(),date:ago(99), desc:bt.tx[5], groupId:g2,subId:s2[0],amount:58,   type:'expense'},
        {id:this._id(),date:ago(100),desc:bt.tx[6], groupId:g1,subId:s1[0],amount:3500, type:'income'},
        {id:this._id(),date:ago(100),desc:bt.tx[7], groupId:g3,subId:s3[0],amount:400,  type:'expense'},
        {id:this._id(),date:ago(100),desc:bt.tx[8], groupId:g3,subId:s3[1],amount:60,   type:'expense'},
        {id:this._id(),date:ago(101),desc:bt.tx[9], groupId:g4,subId:s4[0],amount:1000, type:'expense'},
        {id:this._id(),date:ago(102),desc:bt.tx[1], groupId:g2,subId:s2[1],amount:26,   type:'expense'},
        {id:this._id(),date:ago(104),desc:bt.tx[0], groupId:g2,subId:s2[0],amount:72,   type:'expense'},
        {id:this._id(),date:ago(108),desc:bt.tx[4], groupId:g5,subId:s5[1],amount:10,   type:'expense'},
        {id:this._id(),date:ago(109),desc:bt.tx[4], groupId:g5,subId:s5[2],amount:14,   type:'expense'},
        {id:this._id(),date:ago(110),desc:bt.tx[4], groupId:g5,subId:s5[3],amount:20,   type:'expense'},
        {id:this._id(),date:ago(112),desc:bt.tx[10],groupId:g3,subId:s3[2],amount:40,   type:'expense'},
        {id:this._id(),date:ago(115),desc:bt.tx[11],groupId:g3,subId:s3[3],amount:50,   type:'expense'},
      ];
      const c4inc  = c4txs.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0);
      const c4exp  = c4txs.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0);
      this.set('budget_cycles', [
        { start:ago(30),  end:ago(1),  income:c1inc, expense:c1exp, net:c1inc-c1exp, transactions:c1txs, groups:snapshotGroups },
        { start:ago(60),  end:ago(31), income:c2inc, expense:c2exp, net:c2inc-c2exp, transactions:c2txs, groups:snapshotGroups },
        { start:ago(90),  end:ago(61), income:c3inc, expense:c3exp, net:c3inc-c3exp, transactions:c3txs, groups:snapshotGroups },
        { start:ago(120), end:ago(91), income:c4inc, expense:c4exp, net:c4inc-c4exp, transactions:c4txs, groups:snapshotGroups },
      ]);
    }

    // ── Pomo seed ─────────────────────────────────────────────
    if (!this.get('pomo_seeded') && !this.getPomo().sessions.length) {
      const pk = T.pomo;
      this.setPomo({ sessions: [
        {id:this._id(),date:ago(0), mode:'work',task:pk[0], duration:90, completedAt:'11:30'},
        {id:this._id(),date:ago(0), mode:'work',task:pk[1], duration:45, completedAt:'15:15'},
        {id:this._id(),date:ago(1), mode:'work',task:pk[2], duration:90, completedAt:'12:00'},
        {id:this._id(),date:ago(1), mode:'flow',task:pk[3], duration:120,completedAt:'16:00'},
        {id:this._id(),date:ago(2), mode:'work',task:pk[4], duration:90, completedAt:'21:30'},
        {id:this._id(),date:ago(3), mode:'work',task:pk[5], duration:180,completedAt:'13:00'},
        {id:this._id(),date:ago(4), mode:'flow',task:pk[6], duration:120,completedAt:'22:00'},
        {id:this._id(),date:ago(5), mode:'work',task:pk[7], duration:90, completedAt:'12:00'},
        {id:this._id(),date:ago(6), mode:'work',task:pk[8], duration:90, completedAt:'13:00'},
        {id:this._id(),date:ago(6), mode:'work',task:pk[9], duration:45, completedAt:'14:30'},
        {id:this._id(),date:ago(7), mode:'work',task:pk[10],duration:90, completedAt:'10:30'},
        {id:this._id(),date:ago(7), mode:'flow',task:pk[11],duration:120,completedAt:'16:00'},
        {id:this._id(),date:ago(8), mode:'work',task:pk[12],duration:45, completedAt:'11:00'},
        {id:this._id(),date:ago(9), mode:'work',task:pk[13],duration:90, completedAt:'20:00'},
        {id:this._id(),date:ago(10),mode:'work',task:pk[14],duration:90, completedAt:'12:30'},
        {id:this._id(),date:ago(11),mode:'flow',task:pk[15],duration:120,completedAt:'23:00'},
        {id:this._id(),date:ago(12),mode:'work',task:pk[16],duration:45, completedAt:'10:00'},
        {id:this._id(),date:ago(12),mode:'work',task:pk[17],duration:90, completedAt:'14:00'},
        {id:this._id(),date:ago(13),mode:'work',task:pk[18],duration:90, completedAt:'11:00'},
        {id:this._id(),date:ago(13),mode:'work',task:pk[19],duration:90, completedAt:'16:00'},
      ]});
      this.set('pomo_seeded', true);
    }

    // ── Todos seed ────────────────────────────────────────────────
    if (!this.get('todos_seeded') && !(this.get('habits_todos') || { items: [] }).items.length) {
      const tk     = T.todos;
      const tc     = T.todoCats;
      const pomos  = [2, 1, null, 1, null];
      const catIdx = [0, 1, 2, 3, 0];
      this.set('habits_todos', { items: tk.map((text, i) => ({
        id:        this._id(),
        text,
        date:      ago(0),
        done:      false,
        pomodoros: pomos[i],
        pomoDone:  0,
        category:  tc[catIdx[i]],
        note:      null,
        subtasks:  [],
      }))});
      this.set('todos_seeded', true);
    }

    // ── Deposits seed ─────────────────────────────────────────
    if (!this.get('deposits_seeded') && !this.getDeposits().length) {
      const dt = T.deposits;
      this.set('seed_active', true);
      this.setDeposits([
        { id:this._id(), bankName:'Alpha Bank',  type:'term',   principal:10000, rate:35,  startDate:ago(45), termDays:90,  currency:'TRY' },
        { id:this._id(), bankName:'Beta Bank',   type:'term',   principal:25000, rate:42,  startDate:ago(20), termDays:180, currency:'TRY' },
        { id:this._id(), bankName:'Global Bank', type:'demand', principal:500,   rate:4.5, startDate:ago(60), termDays:null, currency:'USD' },
      ]);
      this.set('deposits_seeded', true);
    }
  },

  // Updates text fields of still-seeded modules in-place when language changes.
  reseed(lang) {
    const T = _SEED_TEXTS[lang] || _SEED_TEXTS['en'];

    if (this.get('time_seeded')) {
      const time = this.getTime();
      T.time.forEach((t, i) => { if (time.logs[i]) { time.logs[i].category = t[0]; time.logs[i].project = t[1]; } });
      this.setTime(time);
    }

    if (this.get('habits_seeded')) {
      const hb = this.getHabits();
      T.habits.forEach((name, i) => { if (hb.list[i]) hb.list[i].name = name; });
      this.setHabits(hb);
    }

    if (this.get('plans_seeded')) {
      const pl = this.getPlans();
      T.plans.forEach((p, i) => {
        if (!pl.items[i]) return;
        pl.items[i].title = p[0];
        pl.items[i].notes = p[1];
        p[2].forEach((st, j) => { if (pl.items[i].subTasks[j]) pl.items[i].subTasks[j].title = st; });
      });
      this.setPlans(pl);
    }

    if (this.get('goals_seeded')) {
      const gl = this.getGoals();
      T.goals.forEach((g, i) => {
        if (!gl.items[i]) return;
        gl.items[i].title = g[0];
        gl.items[i].desc  = g[1];
        g[2].forEach((text, j) => { if (gl.items[i].milestones[j]) gl.items[i].milestones[j].text = text; });
      });
      this.setGoals(gl);
    }

    if (this.get('budget_seeded')) {
      const bud = this.getBudget();
      T.budget.g.forEach((name, i) => { if (bud.groups[i]) bud.groups[i].name = name; });
      T.budget.s.forEach((subs, i) => {
        if (!bud.groups[i]) return;
        subs.forEach((name, j) => { if (bud.groups[i].subs[j]) bud.groups[i].subs[j].name = name; });
      });
      T.budget.tx.forEach((desc, i) => { if (bud.transactions[i]) bud.transactions[i].desc = desc; });
      this.setBudget(bud);

      // Update cycle history snapshots (tx descriptions + group/sub names)
      const txReverseMap = {};
      Object.values(_SEED_TEXTS).forEach(lt => {
        lt.budget.tx.forEach((desc, i) => { txReverseMap[desc] = i; });
      });
      const cycles = this.get('budget_cycles') || [];
      cycles.forEach(cycle => {
        (cycle.transactions || []).forEach(tx => {
          const idx = txReverseMap[tx.desc];
          if (idx !== undefined && T.budget.tx[idx] !== undefined) tx.desc = T.budget.tx[idx];
        });
        (cycle.groups || []).forEach((g, gi) => {
          if (T.budget.g[gi]) g.name = T.budget.g[gi];
          (g.subs || []).forEach((sub, si) => {
            if (T.budget.s[gi] && T.budget.s[gi][si]) sub.name = T.budget.s[gi][si];
          });
        });
      });
      if (cycles.length) this.set('budget_cycles', cycles);
    }

    if (this.get('pomo_seeded')) {
      const po = this.getPomo();
      T.pomo.forEach((task, i) => { if (po.sessions[i]) po.sessions[i].task = task; });
      this.setPomo(po);
    }

    if (this.get('gym_seeded')) {
      if (!this.get('gym_workouts_user')) {
        const gym = this.getGym();
        T.gym.n.forEach((note, i) => { if (gym.workouts[i]) gym.workouts[i].notes = note; });
        this.setGym(gym);
      }
      if (!this.get('gym_templates_user')) {
        const tmpl = this.getGymTemplates();
        T.gym.tn.forEach((name, i) => { if (tmpl.templates[i]) tmpl.templates[i].name = name; });
        this.setGymTemplates(tmpl);
      }
    }

    if (this.get('todos_seeded')) {
      const todosData = this.get('habits_todos') || { items: [] };
      const catIdx = [0, 1, 2, 3, 0];
      T.todos.forEach((text, i) => {
        if (!todosData.items[i]) return;
        todosData.items[i].text = text;
        if (T.todoCats[catIdx[i]]) todosData.items[i].category = T.todoCats[catIdx[i]];
      });
      this.set('habits_todos', todosData);
    }

    if (this.get('deposits_seeded')) {
      const deps = this.getDeposits();
      T.deposits.forEach((name, i) => { if (deps[i]) deps[i].name = name; });
      this.setDeposits(deps);
    }
  }
};

// ── Seed text translations ─────────────────────────────────────────────────
// Each module's text strings, keyed by language code.
// time[i] = [category, project]  ·  habits[i] = name
// plans[i] = [title, notes, [subtask0, subtask1, subtask2]]
// goals[i] = [title, desc, [milestone0, …]]
// budget: g=group names, s=sub names, tx=transaction descriptions
// pomo[i] = task name  ·  gym: n=workout notes, tn=template names
// todoCats[i] = category name  ·  deposits[i] = deposit label
const _SEED_TEXTS = {
  en: {
    todoCats: ['Work','Learning','Exercise','Social','Sleep'],
    time: [
      ['Work','Main Project'],         ['Learning','JavaScript'],       ['Work','Main Project'],         ['Exercise','Gym Session'],
      ['Learning','Algorithms'],       ['Work','Side Project'],         ['Work','Main Project'],         ['Social','Friends'],
      ['Exercise','Morning Run'],      ['Learning','Data Structures'],  ['Work','Main Project'],         ['Work','Side Project'],
      ['Exercise','Gym Session'],      ['Learning','Book Reading'],
      ['Work','Main Project'],         ['Learning','System Design'],    ['Work','Main Project'],         ['Exercise','Morning Run'],
      ['Learning','Algorithms'],       ['Work','Side Project'],         ['Work','Main Project'],         ['Social','Family Dinner'],
      ['Exercise','Gym Session'],      ['Learning','System Design'],    ['Work','Side Project'],         ['Work','Main Project'],
      ['Exercise','Morning Run'],      ['Learning','Reading'],
    ],
    habits: ['Breakfast','Plan Your Day','Workout','Read a Book','Brush Teeth','3h Deep Work'],
    plans: [
      ['LifeTracker improvements',    'Optimize dashboard panels',   ['Add seed data','Mobile testing','Add chart export']],
      ['Algorithms & Data Structures','Grokking Algorithms book',    ['Binary search','Sorting algorithms','Graph BFS/DFS']],
      ['Update monthly budget',       '',                            ['Review spending categories','Set savings target']],
      ['Portfolio rebalancing',       'Review crypto allocation',    ['Check asset weights','Move to index funds']],
      ['Cybersecurity lab setup',     'Set up TryHackMe env',        ['Install Kali Linux','Complete first room','Join CTF team']],
      ['Summer vacation plan',        'Research destinations',       ['Book flights','Find accommodation']],
      ['Learn Git workflow',          '',                            ['Study branching strategy','Practice rebasing']],
      ['Launch side project MVP',     'Build and ship first version',['Define MVP scope','Build backend','Deploy to cloud']],
    ],
    goals: [
      ['Software Engineering Foundation','Build a strong technical base to switch sectors easily',['Phase 0 — Basics','Phase 1 — Algorithms','Phase 2 — Systems','Phase 3 — Advanced']],
      ['Net Worth $1M',                  'Reach 1 million dollars through investing and saving',  ['$10K','$50K','$100K','$500K','$1M']],
      ['High-End Laptop',                'Top-tier workstation for development',                  ['Research models','Save budget','Purchase']],
      ['Run 5K in 25 minutes',           'Build cardiovascular endurance step by step',           ['Run 1K without stopping','Run 3K in 18 min','Run 5K in 25 min']],
      ['Learn Spanish to B1',            'Reach conversational Spanish through daily practice',   ['Complete A1','Complete A2','Pass B1 exam']],
    ],
    budget: {
      g:  ['Income','Expenses','Bills','Investments','Subscriptions'],
      s:  [['Monthly Income'],['Groceries','Eating Out','Courses / Books','Other'],['Rent / Dorm','Phone','Internet','Gym'],['Stocks / ETF'],['Netflix','Spotify','YouTube','AI Tools']],
      tx: ['Grocery run','Lunch out','Groceries','JS course','Netflix','Groceries','Monthly Income','Rent / Dorm','Phone bill','Stock purchase','Internet bill','Gym membership','Book purchase','Transport'],
    },
    pomo: ['Main Project','JavaScript','Main Project','Learning','Algorithms','Main Project','Data Structures','Main Project','Side Project','Side Project','Main Project','Algorithms','JavaScript','Data Structures','Main Project','Side Project','Main Project','Algorithms','Side Project','Main Project'],
    gym:  { n:['Great session, PR on bench!','Pull day — felt strong on rows.','Leg day — pushed hard on squats.','Morning run — steady pace.','','Deadlift focus.','AMRAP 20min — brutal.','Long easy run.','','Yoga + mobility work.','','Heavy leg day.'], tn:['Push Day','Pull Day','Leg Day','Cardio Run'] },
    todos: ['Main Project Research','JavaScript Practice','Evening Run','Read 20 pages','Meal prep'],
    deposits: ['90-Day TRY Term','6-Month TRY Term','USD Fixed Deposit'],
  },
  tr: {
    todoCats: ['Çalışma','Öğrenme','Egzersiz','Sosyal','Uyku'],
    time: [
      ['Çalışma','Ana Proje'],     ['Öğrenme','JavaScript'],      ['Çalışma','Ana Proje'],     ['Egzersiz','Spor Salonu'],
      ['Öğrenme','Algoritmalar'],  ['Çalışma','Yan Proje'],       ['Çalışma','Ana Proje'],     ['Sosyal','Arkadaşlar'],
      ['Egzersiz','Sabah Koşusu'],['Öğrenme','Veri Yapıları'],   ['Çalışma','Ana Proje'],     ['Çalışma','Yan Proje'],
      ['Egzersiz','Spor Salonu'], ['Öğrenme','Kitap Okuma'],
      ['Çalışma','Ana Proje'],     ['Öğrenme','Sistem Tasarımı'], ['Çalışma','Ana Proje'],     ['Egzersiz','Sabah Koşusu'],
      ['Öğrenme','Algoritmalar'],  ['Çalışma','Yan Proje'],       ['Çalışma','Ana Proje'],     ['Sosyal','Aile Yemeği'],
      ['Egzersiz','Spor Salonu'], ['Öğrenme','Sistem Tasarımı'], ['Çalışma','Yan Proje'],     ['Çalışma','Ana Proje'],
      ['Egzersiz','Sabah Koşusu'],['Öğrenme','Okuma'],
    ],
    habits: ['Kahvaltı','Günü Planla','Antrenman','Kitap Oku','Diş Fırçala','3 Saat Derin Çalışma'],
    plans: [
      ['LifeTracker geliştirmeleri',   'Dashboard panellerini optimize et',['Seed veri ekle','Mobil test','Grafik dışa aktarma']],
      ['Algoritmalar & Veri Yapıları', 'Grokking Algorithms kitabı',       ['İkili arama','Sıralama algoritmaları','Graf BFS/DFS']],
      ['Aylık bütçeyi güncelle',       '',                                  ['Harcama kategorilerini gözden geçir','Tasarruf hedefi belirle']],
      ['Portföy dengeleme',            'Kripto dağılımını gözden geçir',   ['Varlık ağırlıklarını kontrol et','Endeks fonlarına geç']],
      ['Siber güvenlik lab kurulumu',  'TryHackMe ortamı kur',             ['Kali Linux kur','İlk odayı tamamla','CTF ekibine katıl']],
      ['Yaz tatili planı',             'Destinasyonları araştır',          ['Uçuşları rezerve et','Konaklama bul']],
      ['Git iş akışını öğren',         '',                                  ['Dallanma stratejisini çalış','Rebase pratiği yap']],
      ['Yan proje MVP yayınla',        'İlk versiyonu inşa et ve yayınla', ['MVP kapsamını belirle','Backend inşa et','Buluta deploy et']],
    ],
    goals: [
      ['Yazılım Mühendisliği Temeli','Sektör değiştirmek için güçlü bir teknik temel oluştur',['Faz 0 — Temel','Faz 1 — Algoritmalar','Faz 2 — Sistemler','Faz 3 — İleri Düzey']],
      ['Net Varlık 1M$',             'Yatırım ve tasarrufla 1 milyon dolar',                  ['10K$','50K$','100K$','500K$','1M$']],
      ['Üst Düzey Laptop',           'Geliştirme için üst sınıf iş istasyonu',                ['Model araştır','Bütçeyi biriktir','Satın al']],
      ["25 dk'da 5K Koş",            'Adım adım kardiyovasküler dayanıklılık oluştur',        ["Durmadan 1K koş","18 dk'da 3K koş","25 dk'da 5K koş"]],
      ['İspanyolca B1 Seviyesi',     'Günlük pratikle konuşma düzeyine ulaş',                ["A1'i tamamla","A2'yi tamamla",'B1 sınavını geç']],
    ],
    budget: {
      g:  ['Gelir','Giderler','Faturalar','Yatırım','Abonelikler'],
      s:  [['Aylık Gelir'],['Market','Dışarıda Yemek','Kurs / Kitap','Diğer'],['Kira / Yurt','Telefon','İnternet','Spor Salonu'],['Hisse / ETF'],['Netflix','Spotify','YouTube','Yapay Zeka Araçları']],
      tx: ['Market alışverişi','Öğle yemeği dışarıda','Market','JS kursu','Netflix','Market','Aylık Gelir','Kira / Yurt','Telefon faturası','Hisse alımı','İnternet faturası','Spor salonu üyeliği','Kitap alımı','Ulaşım'],
    },
    pomo: ['Ana Proje','JavaScript','Ana Proje','Öğrenme','Algoritmalar','Ana Proje','Veri Yapıları','Ana Proje','Yan Proje','Yan Proje','Ana Proje','Algoritmalar','JavaScript','Veri Yapıları','Ana Proje','Yan Proje','Ana Proje','Algoritmalar','Yan Proje','Ana Proje'],
    gym:  { n:['Harika seans, bench\'te PR kırdım!','Çekiş günü — sırtta güçlü hissettim.','Bacak günü — squatta çok zorladım.','Sabah koşusu — sabit tempo.','','Deadlift odaklı seans.','AMRAP 20dk — çok zordu.','Uzun ve rahat koşu.','','Yoga + mobilite çalışması.','','Ağır bacak günü.'], tn:['İtme Günü','Çekme Günü','Bacak Günü','Kardiyo Koşusu'] },
    todos: ['Ana Proje Araştırma','JavaScript Pratik','Akşam Koşusu','20 Sayfa Oku','Yemek Hazırlığı'],
    deposits: ['90 Günlük TRY Vadeli','6 Aylık TRY Vadeli','USD Sabit Mevduat'],
  },
  zh: {
    todoCats: ['工作','学习','运动','社交','睡眠'],
    time: [
      ['工作','主项目'],   ['学习','JavaScript'],['工作','主项目'],   ['运动','健身房'],
      ['学习','算法'],     ['工作','副项目'],    ['工作','主项目'],   ['社交','朋友聚会'],
      ['运动','晨跑'],     ['学习','数据结构'],  ['工作','主项目'],   ['工作','副项目'],
      ['运动','健身房'],   ['学习','读书'],
      ['工作','主项目'],   ['学习','系统设计'],  ['工作','主项目'],   ['运动','晨跑'],
      ['学习','算法'],     ['工作','副项目'],    ['工作','主项目'],   ['社交','家庭聚餐'],
      ['运动','健身房'],   ['学习','系统设计'],  ['工作','副项目'],   ['工作','主项目'],
      ['运动','晨跑'],     ['学习','阅读'],
    ],
    habits: ['早餐','规划每天','锻炼','读书','刷牙','3小时深度工作'],
    plans: [
      ['LifeTracker 改进',  '优化仪表板面板',  ['添加示例数据','移动端测试','添加图表导出']],
      ['算法与数据结构',     '《算法图解》一书',['二分查找','排序算法','图BFS/DFS']],
      ['更新月度预算',       '',               ['审查支出类别','设定储蓄目标']],
      ['投资组合再平衡',     '审查加密货币配置',['检查资产权重','转向指数基金']],
      ['网络安全实验室搭建', '配置TryHackMe环境',['安装Kali Linux','完成第一个房间','加入CTF团队']],
      ['夏季度假计划',       '研究目的地',      ['预订机票','寻找住宿']],
      ['学习Git工作流',      '',               ['学习分支策略','练习变基']],
      ['发布副项目MVP',      '构建并发布第一个版本',['定义MVP范围','构建后端','部署到云端']],
    ],
    goals: [
      ['软件工程基础','建立强大的技术基础以便轻松切换行业',['阶段0 — 基础','阶段1 — 算法','阶段2 — 系统','阶段3 — 高级']],
      ['净资产100万美元','通过投资和储蓄达到100万美元',  ['1万美元','5万美元','10万美元','50万美元','100万美元']],
      ['高端笔记本电脑','用于开发的顶级工作站',          ['研究型号','攒钱预算','购买']],
      ['25分钟跑完5公里','逐步建立心肺耐力',             ['不停歇跑完1公里','18分钟跑完3公里','25分钟跑完5公里']],
      ['西班牙语B1水平','通过每日练习达到对话水平',       ['完成A1','完成A2','通过B1考试']],
    ],
    budget: {
      g:  ['收入','支出','账单','投资','订阅'],
      s:  [['月收入'],['杂货','外出就餐','课程/书籍','其他'],['房租/宿舍','电话费','网费','健身房'],['股票/ETF'],['Netflix','Spotify','YouTube','AI工具']],
      tx: ['超市购物','午餐外出','杂货','JS课程','Netflix','杂货','月收入','房租/宿舍','电话账单','股票购买','网络账单','健身房会员','购书','交通'],
    },
    pomo: ['主项目','JavaScript','主项目','学习','算法','主项目','数据结构','主项目','副项目','副项目','主项目','算法','JavaScript','数据结构','主项目','副项目','主项目','算法','副项目','主项目'],
    gym:  { n:['超棒的训练，卧推创个人记录！','背部训练日 — 划船感觉很强。','腿部训练日 — 深蹲全力以赴。','晨跑 — 稳定配速。','','硬拉专项训练。','AMRAP 20分钟 — 非常艰苦。','长距离轻松跑。','','瑜伽 + 灵活性训练。','','重量腿部训练日。'], tn:['推举日','拉力日','腿部日','有氧跑步'] },
    todos: ['主项目研究','JavaScript练习','傍晚跑步','读20页书','备餐'],
    deposits: ['90天人民币定期','6个月人民币定期','美元固定存款'],
  },
  es: {
    todoCats: ['Trabajo','Aprendizaje','Ejercicio','Social','Sueño'],
    time: [
      ['Trabajo','Proyecto Principal'],    ['Aprendizaje','JavaScript'],         ['Trabajo','Proyecto Principal'],    ['Ejercicio','Gimnasio'],
      ['Aprendizaje','Algoritmos'],        ['Trabajo','Proyecto Secundario'],    ['Trabajo','Proyecto Principal'],    ['Social','Amigos'],
      ['Ejercicio','Carrera Matutina'],    ['Aprendizaje','Estructuras de Datos'],['Trabajo','Proyecto Principal'],   ['Trabajo','Proyecto Secundario'],
      ['Ejercicio','Gimnasio'],            ['Aprendizaje','Lectura'],
      ['Trabajo','Proyecto Principal'],    ['Aprendizaje','Diseño de Sistemas'], ['Trabajo','Proyecto Principal'],    ['Ejercicio','Carrera Matutina'],
      ['Aprendizaje','Algoritmos'],        ['Trabajo','Proyecto Secundario'],    ['Trabajo','Proyecto Principal'],    ['Social','Cena Familiar'],
      ['Ejercicio','Gimnasio'],            ['Aprendizaje','Diseño de Sistemas'], ['Trabajo','Proyecto Secundario'],   ['Trabajo','Proyecto Principal'],
      ['Ejercicio','Carrera Matutina'],    ['Aprendizaje','Lectura'],
    ],
    habits: ['Desayuno','Planificar el Día','Ejercicio','Leer un Libro','Cepillarse los Dientes','3h Trabajo Profundo'],
    plans: [
      ['Mejoras en LifeTracker',              'Optimizar paneles del dashboard',    ['Agregar datos semilla','Pruebas móviles','Exportar gráficos']],
      ['Algoritmos y Estructuras de Datos',   'Libro Grokking Algorithms',          ['Búsqueda binaria','Algoritmos de ordenación','Grafos BFS/DFS']],
      ['Actualizar presupuesto mensual',      '',                                   ['Revisar categorías de gasto','Establecer meta de ahorro']],
      ['Rebalanceo de portafolio',            'Revisar asignación de cripto',       ['Revisar pesos de activos','Pasar a fondos indexados']],
      ['Configurar labo ciberseguridad',      'Configurar entorno TryHackMe',       ['Instalar Kali Linux','Completar primera sala','Unirse a equipo CTF']],
      ['Plan de vacaciones de verano',        'Investigar destinos',                ['Reservar vuelos','Encontrar alojamiento']],
      ['Aprender flujo de trabajo Git',       '',                                   ['Estudiar estrategia de ramas','Practicar rebase']],
      ['Lanzar MVP proyecto secundario',      'Construir y lanzar primera versión', ['Definir alcance MVP','Construir backend','Desplegar en nube']],
    ],
    goals: [
      ['Fundamentos de Ingeniería de Software','Construir una base técnica sólida para cambiar de sector',['Fase 0 — Básicos','Fase 1 — Algoritmos','Fase 2 — Sistemas','Fase 3 — Avanzado']],
      ['Patrimonio Neto $1M',                  'Alcanzar 1 millón de dólares mediante inversión y ahorro',['$10K','$50K','$100K','$500K','$1M']],
      ['Laptop de Alta Gama',                  'Estación de trabajo de alto nivel para desarrollo',       ['Investigar modelos','Ahorrar presupuesto','Comprar']],
      ['Correr 5K en 25 minutos',              'Construir resistencia cardiovascular paso a paso',        ['Correr 1K sin parar','Correr 3K en 18 min','Correr 5K en 25 min']],
      ['Aprender español a nivel B1',          'Alcanzar español conversacional con práctica diaria',     ['Completar A1','Completar A2','Pasar examen B1']],
    ],
    budget: {
      g:  ['Ingresos','Gastos','Facturas','Inversiones','Suscripciones'],
      s:  [['Ingreso Mensual'],['Supermercado','Comer Fuera','Cursos / Libros','Otros'],['Alquiler / Residencia','Teléfono','Internet','Gimnasio'],['Acciones / ETF'],['Netflix','Spotify','YouTube','Herramientas IA']],
      tx: ['Compra supermercado','Almuerzo fuera','Supermercado','Curso JS','Netflix','Supermercado','Ingreso Mensual','Alquiler / Residencia','Factura teléfono','Compra acciones','Factura internet','Membresía gimnasio','Compra libro','Transporte'],
    },
    pomo: ['Proyecto Principal','JavaScript','Proyecto Principal','Aprendizaje','Algoritmos','Proyecto Principal','Estructuras de Datos','Proyecto Principal','Proyecto Secundario','Proyecto Secundario','Proyecto Principal','Algoritmos','JavaScript','Estructuras de Datos','Proyecto Principal','Proyecto Secundario','Proyecto Principal','Algoritmos','Proyecto Secundario','Proyecto Principal'],
    gym:  { n:['¡Gran sesión, PR en press banca!','Día de jalones — me sentí fuerte en los remos.','Día de piernas — me esforcé en sentadillas.','Carrera matutina — ritmo constante.','','Enfoque en peso muerto.','AMRAP 20min — brutal.','Carrera larga y suave.','','Yoga + trabajo de movilidad.','','Día de piernas pesado.'], tn:['Día de Empuje','Día de Jalón','Día de Piernas','Carrera Cardio'] },
    todos: ['Investigación Proyecto Principal','Práctica JavaScript','Carrera Vespertina','Leer 20 páginas','Preparar comidas'],
    deposits: ['Plazo Fijo 90 días','Plazo Fijo 6 meses','Depósito Fijo USD'],
  },
  fr: {
    todoCats: ['Travail','Apprentissage','Exercice','Social','Sommeil'],
    time: [
      ['Travail','Projet Principal'],       ['Apprentissage','JavaScript'],       ['Travail','Projet Principal'],       ['Exercice','Salle de Sport'],
      ['Apprentissage','Algorithmes'],      ['Travail','Projet Secondaire'],      ['Travail','Projet Principal'],       ['Social','Amis'],
      ['Exercice','Course Matinale'],       ['Apprentissage','Structures de Données'],['Travail','Projet Principal'],   ['Travail','Projet Secondaire'],
      ['Exercice','Salle de Sport'],        ['Apprentissage','Lecture'],
      ['Travail','Projet Principal'],       ['Apprentissage','Conception Systèmes'],['Travail','Projet Principal'],    ['Exercice','Course Matinale'],
      ['Apprentissage','Algorithmes'],      ['Travail','Projet Secondaire'],      ['Travail','Projet Principal'],       ['Social','Dîner en Famille'],
      ['Exercice','Salle de Sport'],        ['Apprentissage','Conception Systèmes'],['Travail','Projet Secondaire'],   ['Travail','Projet Principal'],
      ['Exercice','Course Matinale'],       ['Apprentissage','Lecture'],
    ],
    habits: ['Petit-déjeuner','Planifier sa Journée','Exercice','Lire un Livre','Se Brosser les Dents','3h Travail en Profondeur'],
    plans: [
      ['Améliorations LifeTracker',             'Optimiser les panneaux du tableau de bord',['Ajouter données seeds','Tests mobiles','Export graphiques']],
      ['Algorithmes et Structures de Données',  'Livre Grokking Algorithms',               ['Recherche binaire','Algorithmes de tri','Graphes BFS/DFS']],
      ['Mettre à jour le budget mensuel',       '',                                         ['Revoir catégories de dépenses','Fixer objectif épargne']],
      ['Rééquilibrage de portefeuille',         "Revoir l'allocation crypto",               ['Vérifier poids des actifs','Passer aux fonds indiciels']],
      ['Configuration labo cybersécurité',      "Configurer l'env TryHackMe",              ['Installer Kali Linux','Compléter première salle','Rejoindre équipe CTF']],
      ["Plan de vacances d'été",                'Rechercher des destinations',              ['Réserver vols','Trouver hébergement']],
      ['Apprendre le flux de travail Git',      '',                                         ['Étudier stratégie de branches','Pratiquer le rebase']],
      ['Lancer MVP projet secondaire',          'Construire et lancer première version',    ['Définir portée MVP','Construire backend','Déployer sur cloud']],
    ],
    goals: [
      ['Fondements du Génie Logiciel','Construire une base technique solide pour changer de secteur facilement',['Phase 0 — Bases','Phase 1 — Algorithmes','Phase 2 — Systèmes','Phase 3 — Avancé']],
      ['Patrimoine Net 1M$',          "Atteindre 1 million de dollars grâce à l'investissement et l'épargne",['10K$','50K$','100K$','500K$','1M$']],
      ['Ordinateur Portable Haut de Gamme','Station de travail de premier ordre pour le développement',      ['Rechercher modèles','Économiser budget','Acheter']],
      ['Courir 5K en 25 minutes',     'Construire endurance cardiovasculaire étape par étape',               ['Courir 1K sans arrêt','Courir 3K en 18 min','Courir 5K en 25 min']],
      ['Apprendre espagnol niveau B1','Atteindre espagnol conversationnel par pratique quotidienne',         ['Compléter A1','Compléter A2','Passer examen B1']],
    ],
    budget: {
      g:  ['Revenus','Dépenses','Factures','Investissements','Abonnements'],
      s:  [['Revenu Mensuel'],['Courses','Repas Extérieur','Cours / Livres','Autres'],['Loyer / Résidence','Téléphone','Internet','Salle de Sport'],['Actions / ETF'],['Netflix','Spotify','YouTube','Outils IA']],
      tx: ['Courses au supermarché','Déjeuner dehors','Courses','Cours JS','Netflix','Courses','Revenu Mensuel','Loyer / Résidence','Facture téléphone','Achat actions','Facture internet','Abonnement salle de sport','Achat livre','Transport'],
    },
    pomo: ['Projet Principal','JavaScript','Projet Principal','Apprentissage','Algorithmes','Projet Principal','Structures de Données','Projet Principal','Projet Secondaire','Projet Secondaire','Projet Principal','Algorithmes','JavaScript','Structures de Données','Projet Principal','Projet Secondaire','Projet Principal','Algorithmes','Projet Secondaire','Projet Principal'],
    gym:  { n:['Super séance, PR au développé couché !','Jour tirage — me suis senti fort aux rowing.','Jour jambes — me suis poussé dur au squat.','Course matinale — allure régulière.','','Focus soulevé de terre.','AMRAP 20min — brutal.','Longue course facile.','','Yoga + travail de mobilité.','','Jour jambes lourd.'], tn:['Jour Poussée','Jour Tirage','Jour Jambes','Course Cardio'] },
    todos: ['Recherche Projet Principal','Pratique JavaScript','Course du Soir','Lire 20 pages','Préparation repas'],
    deposits: ['Terme 90 jours TRY','Terme 6 mois TRY','Dépôt Fixe USD'],
  },
};

Store.seed();

document.addEventListener('lt:language-change', () => {
  Store.reseed(Store.getSettings().language || 'en');
});
