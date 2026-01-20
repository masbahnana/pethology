# 📋 KANBAN - Pethology

**Última atualização:** 19 Janeiro 2026
**Versão Atual:** v5.5
**Status:** PILOT LAUNCH + Bug Fixes

---

## 🔴 TO DO (Urgente)

### 🚨 Critical Bugs
- [ ] **Setup basic analytics** - Google Analytics para monitorar pilot - *20min*

### ⚠️ High Priority
- [ ] **Collect Mary's feedback** - Após ela testar - *ongoing*

### 📋 Medium Priority (This Week)
- [ ] **Performance optimization** - Minify, lazy load, cache - *45min*

---

## 🟡 IN PROGRESS

### 🧪 Testing Phase - Aguardando Mary
- [ ] **Teacher login verification** - Aguardando Mary testar
  - ✅ Fix implementado (whitelist verificada primeiro)
  - ⏳ Aguardando teste da professora
  - Action: Mary precisa fazer logout e login novamente

- [ ] **Mobile testing** - Em andamento
  - ✅ Fixed index.html script errors
  - ✅ Hamburger menu em TODAS as páginas
  - ✅ Navegação funcional em landing pages
  - ⏳ Ainda testando: dashboards, quiz functionality

---

## 🟢 DONE (Recent Completions)

### ✅ January 2026 - Features & Bug Fixes
- [x] **Exam Mode** - Complete exam simulation with strict rules (20 Jan 2026)
  - Quiz selection: Exam mode checkbox with warning banner
  - Timer: 30min countdown with color warnings (5min orange, 1min red)
  - Auto-submit: Automatic submission when time runs out
  - Fullscreen: Forced fullscreen mode with exit prevention
  - Restrictions: No hints, no explanations, no progress save, no menu access
  - Tab detection: Warning after 3 tab switches
  - Back button: Disabled browser back during exam
  - Progress tracking: examMode flag saved to Firebase history
- [x] **Support Ticket System** - Complete support system with admin dashboard (20 Jan 2026)
  - Reusable support-modal.js component
  - Report Issue button in both dashboards (student sidebar, teacher header)
  - Reporting guidelines modal with form validation
  - Auto-captured metadata: page URL, user agent, screen size, user info
  - Firebase /support_tickets collection with full CRUD
  - Admin dashboard: stats, filters, search, ticket management
  - Status management: open → in-progress → resolved
  - Priority levels: low, medium, high, critical
  - Admin notes system with timestamps
- [x] **FAQ Page** - Complete FAQ with 20 questions in 4 categories (20 Jan 2026)
  - Categories: Getting Started, For Students, For Teachers, Technical
  - Accordion-style expandable answers
  - Category cards with smooth scroll
  - Links added to: student dashboard, teacher dashboard, index.html
  - Fully responsive design
- [x] **Deadlines System** - Complete deadline tracking for custom quizzes (20 Jan 2026)
  - Teacher: Add optional deadline when creating custom quiz
  - Student: See deadline with countdown in quiz selection modal
  - Visual indicators: "Due in X days" or "X days overdue"
  - Overdue badge: Red badge for quizzes past deadline
  - Firebase integration: Deadline stored as timestampValue
- [x] **Skills Demos System** - Complete practical demonstration checklist system (20 Jan 2026)
  - Teacher: Create/edit/delete demos, save as draft or publish, view student progress
  - Student: View published demos, mark tasks complete, progress tracking, mark ready for assessment
  - Progress tracking: Teachers can see each student's completion percentage and status
  - Integration: Links in both dashboards, Firebase REST API with student_skills_progress collection
  - Status badges: Not Started, In Progress, Ready for Assessment
- [x] **Glossary System** - Complete veterinary terminology management (19 Jan 2026)
  - Teacher: Add/edit/delete terms, search, filter by category, stats
  - Student: Browse terms, search, multiple view modes (A-Z, by category)
  - Integration: Links in both dashboards, Firebase REST API
  - Categories: Anatomy, Diseases, Procedures, Tools, Medications
- [x] **KANBAN.md** - Visual task board criado (19 Jan 2026)
- [x] **KNOWN_ISSUES.md** - Documentação completa de bugs e limitações (19 Jan 2026)
- [x] **Teacher login fix** - Whitelist verificada primeiro (19 Jan 2026)
  - Fix crítico: role determination agora verifica whitelist antes de email patterns
  - Teachers podem logar corretamente independente do formato do email

### ✅ v5.5 - Pilot Launch Materials (24 Oct 2025)
- [x] for-teachers.html - Página explicativa para professores
- [x] for-students.html - Página explicativa para estudantes
- [x] quick-start.html - Guia rápido de início
- [x] email-templates.html - Templates de email para comunicação
- [x] Emergency fixes (Mary teacher access, dashboard loading, Lucide icons)

### ✅ v5.4 - Class Management (Oct 2025)
- [x] Filter/Sort Table - Search, score filter, sortable columns
- [x] Student Detail View - Stats, weak topics, quiz history

### ✅ v5.3 - Custom Quiz Support (Oct 2025)
- [x] Custom Quiz Support in quiz.js
- [x] Real Teacher Whitelist Verification (async Firebase check)

### ✅ v5.2 - UI/UX Improvements (Oct 2025)
- [x] Toast Notification System (4 types, auto-dismiss, mobile-friendly)
- [x] Error Handler (centralized, retry logic, user-friendly)
- [x] Mobile Responsiveness (touch-friendly, responsive grids)

### ✅ v5.1 - Quiz Features (Oct 2025)
- [x] Quiz Import System (CSV upload, validation)
- [x] Multiple Quizzes Modal (standard + custom, deadline tracking)

### ✅ v5.0 - Core Features (Oct 2025)
- [x] Achievements Page (standalone, 19 achievements, filters, stats)
- [x] My Progress Page (graphs, module breakdown, quiz history)
- [x] Adaptive Quiz System (AI-powered, 60/30/10 distribution)

### ✅ v4.2 - Core System (Sep-Oct 2025)
- [x] 100% REST API (zero Firebase SDK)
- [x] Teacher Whitelist System
- [x] Student Whitelist System (pre-registration)
- [x] Announcements System (REST API)
- [x] Dashboard Redesign (stats + calendar + quick actions)
- [x] Calendar System (REST API)
- [x] Achievement System (19 achievements)
- [x] Import Students (CSV + Manual)
- [x] Auth0 Authentication
- [x] 200 Quiz Questions (10 modules)
- [x] Quiz Randomization
- [x] Cypress E2E Testing Structure

### ✅ Recent Fixes (Jan 2026)
- [x] Teacher login whitelist check priority fix (19 Jan 2026)
- [x] Hamburger navigation on all pages (Oct 2025)
- [x] Mobile layout and script errors (Oct 2025)
- [x] Demo data population system (Oct 2025)

---

## 📊 BACKLOG

### 🎯 Low Priority (Can Wait)
- [ ] **Video tutorial** - Screen recording walkthrough - *1-2h*
- [ ] **Professional screenshots** - Para marketing - *30min*
- [ ] **GitHub Kanban board** - Project management UI - *20min* 😄

### 🔮 Future Features (v6.0+)

#### Teacher Tools
- [ ] **Microsoft Forms Import** - Import quizzes from MS Forms - *4-6h*
- [ ] **Class Management P2/P3** - Export grades, remove students - *4-6h*

#### Student Experience
- [ ] **Smart Review System** - AI-powered weak topic review - *3-4h*
- [ ] **Flashcards System** - Auto-generate from quiz questions - *3-4h*

#### Advanced Features
- [ ] **Advanced Gamification** - XP, Levels, Leaderboards - *4-6h*
- [ ] **PWA & Offline Support** - Service Worker, offline quizzes - *6-8h*
- [ ] **Internship Journal** - Log work experience, photos, timeline - *4-6h*
- [ ] **Content Manager Migration** - Migrate to REST API - *3-4h*

---

## 📝 NOTES & REMINDERS

### 🐛 Known Issues
- Teacher whitelist check agora funciona corretamente (fix: 19 Jan 2026)
- Mobile testing ainda em progresso (dashboards + quiz pages)

### 💡 Ideas from Manual Testing (23 Oct 2025)
**Página Inicial:**
- Melhorar headers para ficar mais centralizado (tipo Notion)?
- Páginas for-teacher/for-students: tornar mais realista, remover "free trial"
- Página about: adicionar roadmap visual

**Página Quiz:**
- Usar mesmo layout dos dashboards (mesmos icons)

**Página Login:**
- Ajustar "how to login" para nossa realidade

### 🎯 Success Criteria for Pilot Launch
- ✅ Authentication working (Auth0 + Whitelist)
- ✅ Teacher can add students
- ✅ Students can take quizzes
- ✅ Progress tracking works
- ✅ Achievements unlock
- ⏳ Mobile responsive (in testing)
- ⏳ No critical bugs (fixing as found)

### 👥 Pilot Users
- **Teacher:** Mary Deegan (mdeegan@stconlethcc365.ie) - ✅ IN WHITELIST
- **Students:** 5 demo students created + real students to be imported

---

## 🚀 QUICK REFERENCE

### Files to Watch
- `auth0-callback.html` - Login flow (JUST FIXED)
- `teacher-dashboard.html` - Teacher main page
- `student-dashboard.html` - Student main page
- `assets/js/firebase-rest.js` - REST API service
- `assets/js/auth0-service.js` - Auth service

### Important Collections
- `/teacher_whitelist` - Authorized teachers
- `/student_whitelist` - Pre-registered students
- `/users` - All user accounts
- `/student_progress` - Quiz history + achievements
- `/announcements` - Teacher announcements
- `/calendar_events` - Calendar events
- `/custom_quizzes` - Teacher-created quizzes

### Testing
- Cypress tests: `cypress/e2e/`
- Manual test checklist: See TODO.md lines 700-711

---

**🎉 We're SO CLOSE to full pilot launch!**

Próximos passos:
1. ✅ Fix teacher login (DONE!)
2. ⏳ Mary testa o sistema
3. ⏳ Coletar feedback
4. ⏳ Fix bugs críticos
5. 🚀 Full pilot launch!

---

*Este Kanban é atualizado manualmente. Para ver detalhes completos das features, consulte TODO.md e TODO-v4.md*

BUG: Quando eu logo com a minha conta PLC meu nome segue sendo john doe e tem uma "welcome back john" bem grande
BUG: checar erros no google chrome: [Error] Fetch API cannot load https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?gsessionid=qCtryzV71r9HzGnbngG8Et8nxtXeq4rd27Gs7mGt-9E&VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=rpc&SID=IzByWncWWVkkSSm02GUQMg&AID=2&CI=0&TYPE=xmlhttp&zx=58caiv600968&t=1 due to access control checks.
	(anonymous function) (firebase-firestore.js:1:33582)
	(anonymous function) (firebase-firestore.js:1:49976)
	ic (firebase-firestore.js:1:21188)
	Md (firebase-firestore.js:1:40273)
	(anonymous function) (firebase-firestore.js:1:51844)
	ub (firebase-firestore.js:1:17037)
[Error] Failed to load resource: the server responded with a status of 404 () (auth0|68f005ae44cd2424e8e74abd, line 0)
[Error] ❌ REST request failed: GET /progress/auth0|68f005ae44cd2424e8e74abd – Error: HTTP 404:  — firebase-rest.js:31
Error: HTTP 404:  — firebase-rest.js:31
	(anonymous function) (firebase-rest.js:35)
[Error] ❌ Error getting user progress: – Error: HTTP 404:  — firebase-rest.js:31
Error: HTTP 404:  — firebase-rest.js:31
	(anonymous function) (firebase-rest.js:198)
[Error] Failed to load resource: the server responded with a status of 404 () (auth0|68f005ae44cd2424e8e74abd, line 0)
[Error] ❌ REST request failed: GET /progress/auth0|68f005ae44cd2424e8e74abd – Error: HTTP 404:  — firebase-rest.js:31
Error: HTTP 404:  — firebase-rest.js:31
	(anonymous function) (firebase-rest.js:35)
[Error] ❌ Error getting user progress: – Error: HTTP 404:  — firebase-rest.js:31
Error: HTTP 404:  — firebase-rest.js:31
	(anonymous function) (firebase-rest.js:198)

Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=78897&CVER=22&X-HTTP-Session-Id=gsessionid&zx=p7799mirb4wu&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=78897&CVER=22&X-HTTP-Session-Id=gsessionid&zx=p7799mirb4wu&t=1:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
base.js:1 [2026-01-20T12:22:54.018Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf3b transport errored: Qd
defaultLogHandler @ base.js:1Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=20384&CVER=22&X-HTTP-Session-Id=gsessionid&zx=nvqwezjx6ju&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=20384&CVER=22&X-HTTP-Session-Id=gsessionid&zx=nvqwezjx6ju&t=1:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
base.js:1 [2026-01-20T12:22:54.127Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf3c transport errored: Qd
defaultLogHandler @ base.js:1Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=76513&CVER=22&X-HTTP-Session-Id=gsessionid&zx=rnklbwyzz77v&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=76513&CVER=22&X-HTTP-Session-Id=gsessionid&zx=rnklbwyzz77v&t=1:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
base.js:1 [2026-01-20T12:22:55.624Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf3d transport errored: Qd
defaultLogHandler @ base.js:1Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=17716&CVER=22&X-HTTP-Session-Id=gsessionid&zx=38epa9ckwnak&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=17716&CVER=22&X-HTTP-Session-Id=gsessionid&zx=38epa9ckwnak&t=1:1  Failed to load resource: net::ERR_FAILEDUnderstand this error
base.js:1 [2026-01-20T12:22:57.493Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf3e transport errored: Qd
defaultLogHandler @ base.js:1Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=80271&CVER=22&X-HTTP-Session-Id=gsessionid&zx=rkas9uuwcwf1&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=80271&CVER=22&X-HTTP-Session-Id=gsessionid&zx=rkas9uuwcwf1&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this error
logger.ts:209 [2026-01-20T12:23:00.079Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf3f transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=86029&CVER=22&X-HTTP-Session-Id=gsessionid&zx=km948m20sbew&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=86029&CVER=22&X-HTTP-Session-Id=gsessionid&zx=km948m20sbew&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this error
logger.ts:209 [2026-01-20T12:23:05.059Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf40 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=25612&CVER=22&X-HTTP-Session-Id=gsessionid&zx=y1yir2w7k8bb&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=25612&CVER=22&X-HTTP-Session-Id=gsessionid&zx=y1yir2w7k8bb&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this error
logger.ts:209 [2026-01-20T12:23:11.989Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf41 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=15514&CVER=22&X-HTTP-Session-Id=gsessionid&zx=nmvu74ekosar&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=15514&CVER=22&X-HTTP-Session-Id=gsessionid&zx=nmvu74ekosar&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this error
logger.ts:209 [2026-01-20T12:23:17.160Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf42 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=94308&CVER=22&X-HTTP-Session-Id=gsessionid&zx=npiorrcdwtrz&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=94308&CVER=22&X-HTTP-Session-Id=gsessionid&zx=npiorrcdwtrz&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55Understand this error
logger.ts:209 [2026-01-20T12:23:31.197Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf43 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=92330&CVER=22&X-HTTP-Session-Id=gsessionid&zx=svegrktwktf9&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=92330&CVER=22&X-HTTP-Session-Id=gsessionid&zx=svegrktwktf9&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55Understand this error
logger.ts:209 [2026-01-20T12:23:46.235Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf44 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=33000&CVER=22&X-HTTP-Session-Id=gsessionid&zx=npvwnbivjroy&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=33000&CVER=22&X-HTTP-Session-Id=gsessionid&zx=npvwnbivjroy&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55Understand this error
logger.ts:209 [2026-01-20T12:24:23.754Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf45 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=60042&CVER=22&X-HTTP-Session-Id=gsessionid&zx=bvq5apuplqfh&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=60042&CVER=22&X-HTTP-Session-Id=gsessionid&zx=bvq5apuplqfh&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55Understand this error
logger.ts:209 [2026-01-20T12:25:06.670Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf46 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483Understand this warning
auth0-login.html:1 Access to fetch at 'https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=73210&CVER=22&X-HTTP-Session-Id=gsessionid&zx=wtwqqba0pytv&t=1' from origin 'https://pethology.netlify.app' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.Understand this error
webchannel_connection.ts:265  POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?VER=8&database=projects%2Fpethology-7e9d7%2Fdatabases%2F(default)&RID=73210&CVER=22&X-HTTP-Session-Id=gsessionid&zx=wtwqqba0pytv&t=1 net::ERR_FAILED 200 (OK)
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55Understand this error
logger.ts:209 [2026-01-20T12:25:36.454Z]  @firebase/firestore: Firestore (10.7.1): WebChannelConnection RPC 'Write' stream 0x7b7eaf47 transport errored: Qd {type: 'c', target: Q$1, g: Q$1, defaultPrevented: false, status: 1}
defaultLogHandler @ base.js:1
warn @ logger.ts:209
__PRIVATE_logWarn @ log.ts:76
(anonymous) @ webchannel_connection.ts:328
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483
Promise.then
m.send @ fetchxmlhttpfactory.js:272
m.ha @ xhrio.js:739
ic @ channelrequest.js:585
gc @ channelrequest.js:547
m.Na @ webchannelbase.js:1366
ub @ freelist.js:55
Promise.then
X @ run.js:115
Gc @ webchannelbase.js:1536
Q$1.m @ webchannelbasetransport.js:216
co @ webchannel_connection.ts:265
send @ stream_bridge.ts:85
e_ @ persistent_stream.ts:319
E_ @ persistent_stream.ts:845
__PRIVATE_onWriteStreamOpen @ remote_store.ts:758
(anonymous) @ persistent_stream.ts:512
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:497
Ao @ webchannel_connection.ts:50
(anonymous) @ dom.ts:22
setTimeout
vo @ dom.ts:19
__ @ persistent_stream.ts:784
s_ @ persistent_stream.ts:492
(anonymous) @ persistent_stream.ts:464
Promise.then
auth @ persistent_stream.ts:459
start @ persistent_stream.ts:263
start @ persistent_stream.ts:775
(anonymous) @ persistent_stream.ts:51
(anonymous) @ backoff.ts:145
(anonymous) @ async_queue.ts:200
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
handleDelayElapsed @ async_queue.ts:194
(anonymous) @ async_queue.ts:168
setTimeout
start @ async_queue.ts:160
createAndSchedule @ async_queue.ts:160
enqueueAfterDelay @ async_queue_impl.ts:230
ko @ backoff.ts:136
Jo @ persistent_stream.ts:542
start @ persistent_stream.ts:264
start @ persistent_stream.ts:775
__PRIVATE_startWriteStream @ remote_store.ts:752
__PRIVATE_onWriteStreamClose @ remote_store.ts:863
close @ persistent_stream.ts:441
o_ @ persistent_stream.ts:568
(anonymous) @ persistent_stream.ts:516
(anonymous) @ persistent_stream.ts:574
(anonymous) @ async_queue_impl.ts:137
(anonymous) @ async_queue_impl.ts:327
Promise.then
ou @ async_queue_impl.ts:188
enqueue @ async_queue_impl.ts:135
enqueueAndForget @ async_queue_impl.ts:96
(anonymous) @ persistent_stream.ts:572
(anonymous) @ persistent_stream.ts:515
Ro @ webchannel_connection.ts:50
(anonymous) @ webchannel_connection.ts:334
(anonymous) @ webchannel_connection.ts:298
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
R.za @ webchannelbasetransport.js:444
J$1 @ webchannelbase.js:2486
sc @ webchannelbase.js:2210
pc @ dispose.js:21
m.Pa @ channelrequest.js:986
m.nb @ channelrequest.js:656
ib @ eventtarget.js:91
C$1 @ eventtarget.js:490
Ad @ xhrio.js:922
m.kb @ xhrio.js:1052
m.La @ xhrio.js:1050
od @ fetchxmlhttpfactory.js:237
pd @ fetchxmlhttpfactory.js:559
m.ka @ fetchxmlhttpfactory.js:483Understand this warning