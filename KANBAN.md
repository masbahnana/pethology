# 📋 KANBAN - Pethology

**Última atualização:** 23 Janeiro 2026
**Versão Atual:** v5.6
**Status:** PILOT LAUNCH + Core Features Complete

---

## 🔴 TO DO (Urgente)

### 🚨 Critical Bugs (Pilot Blockers)
- [x] **Exam Mode não funciona** - ✅ FIXED (22 Jan) - Adicionado onchange ao checkbox
- [x] **Quiz progress não salva** - ✅ FIXED (22 Jan) - getStudentProgress() agora calcula de quiz_results
- [x] **Failed to load student data** - ✅ FIXED (22 Jan) - formatTimeAgo no escopo global
- [x] **Dados misturados demo/real** - ✅ FIXED (22 Jan) - Filtragem por teacherId implementada

### ⚠️ High Priority
- [x] **Quiz começa em 2%** - ✅ FIXED (22 Jan) - Agora começa em 0%
- [x] **Module cards mostram 20 questões** - ✅ FIXED (23 Jan) - Agora mostra número real por módulo
- [x] **Announcements mark as read** - ✅ FIXED (23 Jan) - Non-pinned desaparecem, pinned ficam verdes
- [x] **Timer bar + pause no quiz** - ✅ FIXED (23 Jan) - Barra visual + botão pause implementados
- [x] **Module cards mostravam score como completion** - ✅ FIXED (23 Jan) - Agora mostra "Best: X%"
- [ ] **Collect teacher feedback** - Após testes iniciais - *ongoing*

### 📋 Medium Priority (This Week)
- [ ] **Deletar announcements** - Teacher precisa poder limpar announcements
- [ ] **Editar/deletar eventos** - Teacher não consegue editar eventos do calendário
- [ ] **Class Settings** - Ainda não implementado
- [ ] **Performance optimization** - Minify, lazy load, cache

### 📝 Low Priority (Features)
- [ ] **Seta no sidebar student** - Definir o que vai no dropdown

---

## 🟡 IN PROGRESS

### 🧪 Testing Phase - Pilot Launch
- [x] **Mobile testing & Dashboard fixes** - COMPLETED (22 Jan 2026)
  - ✅ Fixed index.html script errors
  - ✅ Hamburger menu em TODAS as páginas
  - ✅ Navegação funcional em landing pages
  - ✅ Skills Demonstrations feature fully working
  - ✅ Calendar events loading dynamically
  - ✅ Dashboard loading and rendering correctly
  - ✅ Quiz validation fixed
  - ✅ Logout function working
  - ✅ All core dashboards functional (student & teacher)

---

## 🟢 DONE (Recent Completions)

### ✅ January 2026 - Full Feature Implementation & Bug Fixes (22 Jan 2026)

#### Skills Demonstrations Feature - COMPLETE
- [x] **Teacher Skills Demos Management**
  - Create, edit, delete demonstrations with checklist items
  - View student progress with completion tracking
  - Firestore REST API integration working

- [x] **Student Skills Demos Interface**
  - View assigned demonstrations
  - Mark items as complete
  - Submit progress and track completion
  - Data persistence to Firebase

#### Calendar System - COMPLETE
- [x] **Dynamic Calendar Events**
  - Load events from Firebase REST API
  - Display current month calendar with event indicators
  - Show upcoming events in dedicated section
  - Event type color coding (quiz, assignment, exam, announcement)
  - CSS layout fixes for grid rendering

#### Critical Bug Fixes (22 Jan 2026)
- [x] **Exam Mode Checkbox** - Added `onchange="toggleExamMode()"` to checkbox in quiz.html
- [x] **Quiz Progress Not Saving** - Rewrote `getStudentProgress()` in firebase-rest.js to calculate from quiz_results
  - Now computes: totalQuizzes, averageScore, streak, moduleProgress with completion %
- [x] **Data Isolation (Demo vs Real)** - Teachers now only see their own students
  - `getAllStudents(teacherId)` filters by pre_registered_students.addedBy
  - `getAllStudentsProgress(teacherId)` passes filter through
  - `getTeacherAnalytics(teacherId)` filters quiz results by student IDs
  - Mary will only see students SHE imported, not demo/fake data
- [x] **Calendar Parser Error** - Fixed malformed closing brace in renderCalendar() function
- [x] **Logout Function Error** - Fixed ReferenceError by ensuring function in global scope
- [x] **Dashboard Loading Hang** - Fixed by removing 404 API calls to non-existent /progress endpoint
- [x] **Firestore Data Conversion** - Fixed nested array conversion in convertDocument()
- [x] **Progress Save/Load** - Fixed API call patterns to use document IDs instead of query parameters
- [x] **Teacher Student Progress** - Fixed loading from /users instead of empty whitelist

#### Additional Improvements (22 Jan 2026)
- [x] **Security: Removed hardcoded emails** - Replaced with generic email-based role rules
- [x] **Role Detection: Generic email rules** - @stconlethcc365.ie for Teachers, plc* for Students
- [x] **Quiz Validation: Context-aware** - Only validates role when accessing quiz
- [x] **Firestore REST API: Recursive conversion** - Properly handles nested structures

### ✅ January 2026 - Features & Bug Fixes
- [x] **Teacher role detection fix** - Generic email-based role assignment (21 Jan 2026)
  - Teachers: emails ending with @stconlethcc365.ie → Teacher Dashboard
  - Students: emails starting with 'plc' → Student Dashboard
  - Removed hardcoded emergency fixes (scalable for all users)
  - Updated in: auth0-callback.html, auth0-login.html, auth0-service.js
  - Added security check in student-dashboard.html to auto-redirect teachers
  - Added session cleanup and cache busting to prevent stale role data
- [x] **Google Analytics 4** - Basic analytics setup for pilot monitoring (21 Jan 2026)
  - Created analytics.js helper with custom event tracking
  - Integrated GA4 (G-BVVY1X67PX) into: index.html, student-dashboard.html, teacher-dashboard.html, quiz.html, auth0-callback.html
  - Login tracking: automatically tracks user login with role (Teacher/Student)
  - Custom events ready: quiz_start, quiz_complete, custom_quiz_create, student_import, achievement_unlock, support_ticket
  - Free tier: 10 million events/month
- [x] **Exam Mode** - Complete exam simulation with strict rules (20 Jan 2026)

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
- ✅ Mobile responsive (completed 22 Jan 2026)
- ✅ No critical bugs (all resolved 22 Jan 2026)
- ✅ Skills Demonstrations working
- ✅ Calendar events functional

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

## 🐛 RESOLVED BUGS (22 Jan 2026)

### ✅ Dashboard Loading & Rendering Issues (CRITICAL - 22 Jan 2026)
**Problems Found & Fixed:**

1. **Calendar Parser Error**
   - Problem: SyntaxError in calendar-rest.js at line 243
   - Cause: Malformed closing brace breaking renderCalendar() function
   - Fix: Removed extra `}` causing incorrect function structure
   - Status: ✅ FIXED

2. **Logout Function Undefined**
   - Problem: ReferenceError "Can't find variable: logout" when clicking logout button
   - Cause: Function defined as window.logout but onclick called as logout()
   - Fix: Changed to standalone function declaration with window assignment
   - Status: ✅ FIXED

3. **Dashboard Hanging on Load**
   - Problem: Student dashboard wouldn't load, page freeze
   - Root Cause: getStudentProgress() making 404 requests to non-existent /progress/{userId} endpoint
   - Fix: Simplified to return empty structure synchronously without API calls
   - Status: ✅ FIXED - previous session

### ✅ Previous Session Bugs (21 Jan 2026)

#### Skills Demonstrations Data Conversion
**Problem:** Teacher couldn't save/load student progress, data appeared corrupted
**Cause 1:** convertDocument() wasn't recursively converting Firestore nested structures
**Cause 2:** Code used `_id` but Firebase returns `id` field
**Cause 3:** Progress save used query parameters instead of document IDs
**Fixes Applied:**
- Updated convertDocument() to recursively handle mapValue objects inside arrays
- Changed all _id references to id
- Modified saveProgress() to use PUT with studentId as document ID instead of query parameters
- Status: ✅ FIXED

#### Teacher Can't View Student Progress
**Problem:** viewProgress() showed no students
**Cause:** Loading from /student_whitelist (empty collection) instead of actual students
**Fix:** Changed to load from /users and filter by role === 'Student'
**Status:** ✅ FIXED

### ✅ Quiz & Validation Issues (21 Jan 2026)
**Problem:** Teachers on index.html got "Only students can access quizzes" alert
**Cause:** Role validation enforced globally, not just in quiz context
**Fix:** Moved role check to only run when accessing quiz (URL has module parameter)
**Status:** ✅ FIXED

### ✅ Calendar Layout Issues (21 Jan 2026)
**Problem:** Calendar grid breaking layout, days not displaying correctly
**Cause:** renderCalendar() used .calendar-grid class conflicting with outer layout
**Fix:** Changed internal grid to .calendar-days, added CSS alias in teacher-dashboard.html
**Status:** ✅ FIXED

### ✅ Chrome Login CORS Issue (CRITICAL - 20 Jan 2026)
**Problem:** Chrome users couldn't log in - page hung after Auth0 redirect, never reached dashboard
**Cause:** auth0-login.html used Firebase SDK (setDoc) which triggers WebChannel CORS in Chrome
**Root Cause:** Chrome blocks WebChannel CORS when credentials mode is 'include'; Safari more lenient
**Fix:** Converted auth0-login.html to use Firebase REST API instead of SDK
**Files Modified:** auth0-login.html - replaced Firebase SDK imports with PethologyFirebaseREST
**Testing:** ✅ Verified working in Chrome, Safari, and Firefox
**Status:** ✅ FIXED - commit d04d17d

### ✅ John Doe Name Issue (20 Jan 2026)
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

## 🐛 RESOLVED BUGS (21 Jan 2026)
