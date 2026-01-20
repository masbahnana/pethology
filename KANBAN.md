# 📋 KANBAN - Pethology

**Última atualização:** 19 Janeiro 2026
**Versão Atual:** v5.5
**Status:** PILOT LAUNCH + Bug Fixes

---

## 🔴 TO DO (Urgente)

### 🚨 Critical Bugs
- [ ] **Setup basic analytics** - Google Analytics para monitorar pilot - *20min*

### ⚠️ High Priority
- [ ] **FAQ page** - Perguntas comuns e respostas - *30min*
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
- [ ] **Deadlines System** - Set deadlines for custom quizzes - *2-3h*
- [ ] **Class Management P2/P3** - Export grades, remove students - *4-6h*

#### Support & Help
- [ ] **Support Ticket System** - Complete support system with admin dashboard - *2-3h*
  - User-facing: "Support" button in both dashboards (student + teacher)
  - Support modal: subject dropdown, description textarea, screenshot upload
  - Firebase collection: /support_tickets with full metadata
  - Admin dashboard: /admin-support.html (whitelist protected)
  - Admin features: View all tickets, filter by status, add notes, change priority
  - Ticket fields: id, userEmail, userName, userRole, subject, description, screenshot, status (open/in-progress/resolved), priority (low/medium/high/critical), pageUrl, browser, createdAt, resolvedAt
  - Auto-includes: user info, browser details, current page URL for debugging

#### Student Experience
- [ ] **Smart Review System** - AI-powered weak topic review - *3-4h*
- [ ] **Exam Mode** - Strict timer, no hints, fullscreen - *2-3h*
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
