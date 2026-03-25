# 📋 KANBAN - Pethology

**Última atualização:** 25 Março 2026
**Versão Atual:** v6.2
**Status:** CI/CD + Responsive Polish + 73 E2E Tests Passing

---

## 🔴 TO DO

### ⚠️ High Priority
- [ ] **Collect teacher feedback** — Após testes iniciais com Mary + alunos

### 📋 Medium Priority
- [ ] **Flashcards** — Gerar automaticamente das perguntas de quiz existentes (pergunta = frente, resposta = verso). Zero custo, zero API externa. Flip card animation.
- [ ] **Notes** — Editor de texto simples por módulo. Aluno escreve notas enquanto estuda. Guarda no Firebase.
- [ ] **Goals** — Meta semanal por módulo (ex: "Biology 80%+"). Dashboard mostra progresso vs meta. Badge ao atingir.
- [ ] **3D Anatomy** — anatomy-3d.html criado (coming soon). Feature real a planear — modelo 3D interativo com hotspots ligados aos módulos de quiz.

### 📝 Low Priority
- [ ] **Microsoft Forms Import** — Import quizzes from MS Forms — *4-6h*
- [ ] **Export Grades** — CSV export de resultados por turma — *2-3h*
- [ ] **Class Management P2** — Remove students, bulk actions — *3-4h*
- [ ] **Video tutorial** — Screen recording walkthrough — *1-2h*
- [ ] **Professional screenshots** — Para marketing — *30min*

### 🔮 Future (v7.0+)
- [ ] **Advanced Gamification** — XP, Levels, Leaderboards — *4-6h*
- [ ] **PWA & Offline Support** — Service Worker, offline quizzes — *6-8h*
- [ ] **Internship Journal** — Log work experience, photos, timeline — *4-6h*
- [ ] **Content Manager Migration** — Migrate to REST API — *3-4h*

---

## 🟡 IN PROGRESS

- [ ] **Mobile Responsiveness** — Em progresso. Teacher dashboard ✅, Student dashboard ✅, iPad a testar

---

## 🟢 DONE

### ✅ 25 Março 2026 — CI/CD + Responsive Polish

#### Cypress E2E — 73 Tests Passing
- [x] GitHub Actions workflow (`.github/workflows/cypress.yml`) — Node 24, Chrome headless, `serve` + `wait-on`
- [x] 5 test suites: authentication, student dashboard, teacher dashboard, quiz system, public pages
- [x] Badge no README
- [x] Fix: `cy.visit` overwrite para injetar `sessionStorage` via `onBeforeLoad` (ES module timing issue)
- [x] Fix: URL params perdidos no 301 redirect do `serve` (`/quiz.html` → `/quiz`)
- [x] Fix: selectors corrigidos — `.answer-button`, `.user-section`, `#profileModal`, `#guide-students`
- [x] Fix: `cy.session` → `Cypress.Commands.overwrite('visit')` para autenticação consistente
- [x] Fix: `force: true` nos sidebar links cobertos por `.nav-section`
- [x] Fix: `module=biology` (não `biology.js`) no URL param do quiz

#### Teacher Dashboard Responsive
- [x] Header actions fazem wrap em mobile (`flex-wrap: wrap`)
- [x] Class selector move para nova linha em mobile
- [x] Publish Content + Settings movidos do header para Quick Actions

#### Student Dashboard Responsive
- [x] Smart Learning Tools grid stack para 1 coluna em mobile (`smart-tools-grid`)
- [x] Achievement filters fazem wrap em mobile
- [x] Achievement header (título + filtros) stack verticalmente em mobile

#### README
- [x] Criado `README.md` com badge CI, descrição, stack e features

---

### ✅ 24 Março 2026 — UX Polish + Smart Review (v6.1)

- [x] **Smart Review System** — Analisa módulo mais fraco, lança quiz direto. Modal "no history yet" com CTA
- [x] **Stat cards real data** — Dashboard mostra dados reais do Firebase (não hardcoded)
- [x] **Achievements real data** — Grid usa dados reais do Firebase
- [x] **Avatar bug** — Banner "undefined" corrigido, avatar persiste entre páginas
- [x] **Favicon 🐾** — `favicon.svg` em todas as páginas (funciona no Netlify)
- [x] **Exam Mode layout** — Esconde h1, remove laterais pretas, full width
- [x] **Quiz nav** — Mostra Dashboard quando logado, Login quando não logado
- [x] **Flashcards / Notes / Goals** — Coming soon toasts com mensagens divertidas
- [x] **guide.html** — Página de onboarding com guia aluno + professor
- [x] **anatomy-3d.html** — Coming soon page com 3 feature cards
- [x] **3D Anatomy no sidebar** — Adicionado à secção Tools do student dashboard
- [x] **Avatar dropdown** — Report Issue, Help & FAQ, Logout movidos para dropdown
- [x] **Sidebar logo** — Substituído imagem por "🐾 Pethology" texto centrado
- [x] **KANBAN v6.1** — Atualizado

---

### ✅ 24 Março 2026 — Performance + Landing Redesign (v6.0)

- [x] **Performance optimization** — Image compression (PNG→JPG, -1MB), Lucide defer, in-memory cache (30-60s TTL)
- [x] **Landing page redesign** — Nova UI (Notion/Tally style), quiz interativo sample
- [x] **Roadmap page** — roadmap.html com linha do tempo visual
- [x] **Store page** — store.html com produtos coming soon
- [x] **guide.html** — Onboarding page não pública
- [x] **Padronizar layout público** — pub-nav/pub-footer em todas as páginas públicas
- [x] **Quiz module cards** — Cards com ícone centrado, título, "Start quiz →"
- [x] **FAQ no footer** — Adicionado link FAQ ao footer do index.html

---

### ✅ Janeiro–Fevereiro 2026

- [x] Exam Mode UI overhaul — Dark theme, top bar com timer, progress bar, tab warnings
- [x] Timer dinâmico no Exam Mode — Calcula baseado no histórico (clamp 45s–180s/q)
- [x] Class Settings modal — 3 abas: Class Info, Students, Teachers
- [x] Coordenador adicionar professores — Dropdown + modal para editar módulos
- [x] Average Score bug — Scores calculados dinamicamente de quiz_results
- [x] Class indicator "undefined" — Fixed com fallback seguro
- [x] Skills Demonstrations — Teacher cria, aluno submete, progresso guardado
- [x] Calendar System — Eventos dinâmicos do Firebase, indicadores visuais
- [x] Google Analytics 4 — Tracking de login, quiz_start, quiz_complete
- [x] Demo users só em dev — Botões demo só em localhost

---

### ✅ Janeiro 2026 — Critical Fixes & Launch (v5.6)

- [x] Chrome Login CORS — Convertido auth0-login.html para REST API
- [x] John Doe name — Prioriza nome da whitelist
- [x] Quiz navigation — 4 cascading fixes (collapsible, onclick, REST import, emoji syntax)
- [x] Exam Mode checkbox fix
- [x] Quiz progress saving — Recalculado de quiz_results
- [x] Data isolation — Teachers só veem os seus próprios alunos
- [x] Mobile testing — Dashboards + quiz pages responsive

---

### ✅ Outubro 2025 — Core Features (v4.2–v5.5)

- [x] 100% REST API (zero Firebase SDK)
- [x] Auth0 Authentication
- [x] Teacher + Student Whitelist System
- [x] Announcements System
- [x] Achievement System (19 achievements)
- [x] Adaptive Quiz System (AI-powered, 60/30/10 distribution)
- [x] My Progress Page
- [x] Quiz Import (CSV)
- [x] 200 Quiz Questions (10 modules)
- [x] Class Management (filter, sort, student detail view)
- [x] Toast Notification System
- [x] Mobile Responsiveness (first pass)
- [x] Pilot Launch Materials (for-teachers, for-students, quick-start, email-templates)

---

## 📝 NOTES

### 👥 Pilot Users
- **Teacher:** Mary Deegan (mdeegan@stconlethcc365.ie) ✅ IN WHITELIST
- **Students:** 5 demo students + real students a importar

### 🧪 Testing
- Cypress: `npx cypress open` (requer `npx serve . --listen 5500` em paralelo)
- CI: GitHub Actions — corre em cada push/PR para main
- Badge: [![Cypress E2E Tests](https://github.com/masbahnana/pethology/actions/workflows/cypress.yml/badge.svg)](https://github.com/masbahnana/pethology/actions/workflows/cypress.yml)

### 🎯 Próximos Passos
1. ⏳ Teste manual com alunos reais
2. ⏳ Coletar feedback da Mary
3. ⏳ Decidir ordem: Flashcards vs Goals vs Notes
4. ⏳ Planear 3D Anatomy (modelo + hotspots)
