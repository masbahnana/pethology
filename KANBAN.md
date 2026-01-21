# 📋 KANBAN - Pethology

**Última atualização:** 21 Janeiro 2026
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
- [x] Quiz navigation complete fix - 4 cascading issues (21 Jan 2026)
  - Course Modules collapsible now open by default
  - Module cards clickable on dashboard
  - Firebase REST API imported in quiz.html
  - Emoji characters removed from JavaScript strings
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

## 🐛 RESOLVED BUGS (20 Jan 2026)

### ✅ Chrome Login CORS Issue (CRITICAL)
**Problem:** Chrome users couldn't log in - page hung after Auth0 redirect, never reached dashboard
**Cause:** auth0-login.html used Firebase SDK (setDoc) which triggers WebChannel CORS in Chrome
**Root Cause:** Chrome blocks WebChannel CORS when credentials mode is 'include'; Safari more lenient
**Fix:** Converted auth0-login.html to use Firebase REST API instead of SDK
**Files Modified:** auth0-login.html - replaced Firebase SDK imports with PethologyFirebaseREST
**Testing:** ✅ Verified working in Chrome, Safari, and Firefox
**Status:** ✅ FIXED - commit d04d17d

### ✅ John Doe Name Issue
**Problem:** Students logging in with PLC accounts saw "John Doe" instead of their real name
**Cause:** Auth0 user.name returning placeholder; whitelist name not being used
**Fix:** Modified auth0-callback.html to prioritize studentData.name from whitelist
**Status:** ✅ FIXED - commit 4ad10df

### ✅ Quiz Navigation Issues (21 Jan 2026)
**Problem:** Clicking Biology module from dashboard did nothing - no navigation, blank page
**Root Causes:** Multiple cascading issues discovered:
1. Course Modules collapsible menu was closed by default (max-height: 0)
2. Module cards on dashboard were not clickable (missing onclick handlers)
3. quiz.html missing Firebase REST API import (quiz.js requires it)
4. JavaScript syntax errors from emoji characters (⏰, ⚠️) in strings

**Fixes Applied:**
1. **Commit 20d052c** - Made "Course Modules" collapsible open by default
   - Added "open" class to both collapsible content and icon
   - Users can now immediately see and click module links in sidebar

2. **Commit 2f7434b** - Made all 7 module cards clickable on dashboard
   - Added onclick handlers: `window.location.href='quiz.html?module=X'`
   - Added cursor: pointer for visual feedback
   - Modules: biology, animal-welfare, grooming, animal-anatomy, small-animals, vet-assistant-skills, animal-behaviour

3. **Commit 738ebce** - Added Firebase REST API import to quiz.html
   - quiz.js was migrated to REST API but quiz.html wasn't updated
   - Added script block to import and expose window.PethologyFirebaseREST
   - Without this, quiz.js failed silently and page stayed blank

4. **Commit 890c224** - Removed emoji characters causing JavaScript syntax errors
   - UTF-8 emoji bytes (⏰ ⏱️ ⚠️) confused JavaScript parser
   - Browser error: "Uncaught SyntaxError: missing ) after argument list (at quiz.js:1313:15)"
   - Replaced all emojis in alerts/console.logs with plain text: "WARNING:", "Time is up!"
   - Verified syntax with `node -c quiz.js`

**Testing:** ✅ All module cards now clickable, Biology quiz loads and runs perfectly in Chrome
**Status:** ✅ FULLY FIXED - 4 consecutive fixes completed

---

*Este Kanban é atualizado manualmente. Para ver detalhes completos das features, consulte TODO.md e TODO-v4.md*
