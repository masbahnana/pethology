# 📋 KANBAN - Pethology

**Última atualização:** 27 Março 2026
**Versão Atual:** v6.7
**Status:** Pilot activo — MailerLite integration pendente (aguarda embeds)

---

## 🔴 TO DO

### ⚠️ High Priority
- [ ] **Collect teacher feedback** — Após testes iniciais com Mary + alunos
- [x] **Archive Class** — ✅ DONE (26 Mar) — Em vez de deletar, professora arquiva a turma. Alunos removidos da whitelist (não conseguem logar), quiz results/diary/goals preservados. Dashboard mostra só classes activas. Modal com explicação clara antes de confirmar.

### 📋 Medium Priority
- [x] **Flashcards** — ✅ DONE (26 Mar) — 10 módulos, flip card, Knew it / Didn't know, resultados, praticar cards errados. Sidebar Tools link activo.
- [x] **Goals** — ✅ DONE (26 Mar) — 10 goals pré-definidos (Overall + Module), progress bars do Firebase, celebration banner. Sidebar Tools link activo.
- [x] **Work Experience Diary** — ✅ DONE (26 Mar) — 6 campos (date picker, local, summary, skills, challenges, reflection), lista de entradas no sidebar, edição, lembrete de fotos ao salvar. Firebase REST. Privado — só o aluno lê.
- [x] **3D Anatomy prototype** — ✅ DONE (26 Mar) — Three.js viewer com esqueleto real de cão (nzfauna CC BY-SA, Sketchfab). Navegação por lista lateral (Skull, Vertebral Column, Ribcage, Pelvis, Femur, Scapula). Info panel com função, relevância clínica, módulo e link quiz. "More structures coming soon".

### 📝 Low Priority
- [x] **Terms & Privacy** — ✅ DONE (26 Mar) — `terms.html` (9 secções, direito irlandês) + `privacy.html` (GDPR compliant, tabela de dados, direitos do utilizador, contacto DPC Ireland). Links no footer de todas as páginas públicas.
- [ ] **MailerLite Integration** — Tudo via MailerLite (contact.html, store "Be the first to know", newsletter). 3 formulários a criar no painel: Contact (Nome + Email + Mensagem custom), Store Launch (Email), Newsletter (Email). Aguarda embeds do MailerLite para implementar.
  - **Stack:** MailerLite (free até 1000 subscribers, 12k emails/mês).
  - **Contact** — embed substitui form actual (`submit_form.php` não funciona)
  - **Store** — embed na secção "Be the first to know", lista "Store Launch"
  - **Newsletter** — embed em settings do aluno + footer do site
  - **Personal email field** — Na página de settings do perfil do aluno: campo de email pessoal opcional com mensagem *"Stay connected after graduation — add a personal email"*. Email da escola expira ao terminar o curso. GDPR: double opt-in via MailerLite, consentimento explícito.
- [ ] **Community** — Servidor Discord para manter alunos conectados após a escola.
  - **Stack:** Discord (gratuito, fácil de moderar, sem expiração de conta)
  - **Canais:** `#announcements`, `#introductions`, `#questions`, `#study-together`, `#quiz-discussion`, `#work-experience`, `#pet-cases`, `#general`
  - **Roles:** `@Student` (alunos activos), `@Teacher` (Mary + professores), `@Alumni` (formados — mantêm acesso pós-escola, chave para engagement a longo prazo)
  - **Integração:** Link no sidebar do student dashboard + footer do site + guide.html
- [x] **Public Roadmap + Changelog** — ✅ DONE (27 Mar) — `roadmap.html` atualizado (Phase 5 Completed, Phase 6 In Progress, Phase 7 Future). `changelog.html` criado, renderiza `CHANGELOG.md` via marked.js CDN. Link "Changelog" adicionado no footer de todas as páginas públicas.
- [x] **Funding** — ✅ DONE (26 Mar) — buymeacoffee.com/pethology. Botões no support.html activos.
- [ ] **Microsoft Forms Import** — Import quizzes from MS Forms — *4-6h*
- [x] **Export Grades** — ✅ DONE (26 Mar) — CSV com nome, email, status, total quizzes, avg score, questions answered, correct answers, score por módulo.
- [ ] **Class Management P2** — Remove students, bulk actions — *3-4h*
- [ ] **Canny Roadmap content** — Definir lista de items a publicar no pethology.canny.io (Under Review / Planned / In Progress / Live). A fazer em conjunto.
- [ ] **Video tutorial** — Screen recording walkthrough — *1-2h*
- [ ] **Professional screenshots** — Para marketing — *30min*

### 🔮 Future (v7.0+)
- [ ] **Advanced Gamification** — XP, Levels, Leaderboards — *4-6h*
  - **Stack:** Sem biblioteca externa. XP calculado dos `quiz_results` já no Firebase (pontos por score + bónus por streak). Levels por thresholds simples (0-100 = Beginner, 100-300 = Intermediate, etc.). Leaderboard via query dos `quiz_results` por classe ordenado por XP — dados já existem, só falta apresentar.
- [ ] **PWA & Offline Support** — Service Worker, offline quizzes — *6-8h*
- [ ] **Content Manager Migration** — Migrate to REST API — *3-4h*

---

## 🟡 IN PROGRESS

- [ ] **Mobile Responsiveness** — Em progresso. Teacher dashboard ✅, Student dashboard ✅, iPad a testar

---

## 🟢 DONE

### ✅ 26 Março 2026 — Export Grades + Funding + GitHub Projects (v6.7)

- [x] **Export Grades** — Botão no Class Management, descarrega CSV com todos os dados por aluno + coluna por módulo
- [x] **Buy Me a Coffee** — buymeacoffee.com/pethology live, botões no support.html activos
- [x] **GitHub Projects** — Kanban migrado para github.com/users/masbahnana/projects/2 (41 itens: 29 Done, 1 In Progress, 11 Todo)

---

### ✅ 26 Março 2026 — Teacher Settings + Bug fixes (v6.6)

- [x] **Teacher Settings modal** — Quick Actions > Settings abre perfil pessoal da professora: Display Name, Contact Email, notificação de quiz por email. Guardado em Firebase `teacher_profiles/{userId}`.
- [x] **Settings vs Class Management separados** — Settings agora é perfil do professor. Class Management mantém gestão de turmas.

---

### ✅ 26 Março 2026 — Bug fixes + Archived Class Read-Only (v6.5)

- [x] **Student profile modal** — Overlay duplo removido (estava bloqueando scroll e cliques). "0 Questions Answered" corrigido — `totalQuestions` e `correctAnswers` agora somados de `quiz_results` no `getStudentProgress()`
- [x] **Archived class read-only** — Clicar numa classe arquivada abre modal com info da turma (ano, data de arquivo, nº alunos, módulos) + lista de alunos. Aviso de read-only. Fecha ao clicar fora.

---

### ✅ 26 Março 2026 — Pilot Launch — Diary + Terms & Privacy + 3D Skeleton + Arch fixes

#### Work Experience Diary
- [x] `diary.html` — 6 campos: date picker, local, summary, skills, challenges, reflection
- [x] Lista de entradas no sidebar ordenada por data, clicável para editar
- [x] Lembrete de fotos após guardar
- [x] Privado — só o aluno lê (professora vê data + submitted)
- [x] Firebase REST API, isolado por userId
- [x] Sidebar Tools link activo (substituiu Notes)

#### Terms & Privacy
- [x] `terms.html` — 9 secções, direito irlandês
- [x] `privacy.html` — GDPR compliant, tabela de dados, direitos do utilizador, DPC Ireland
- [x] Links no footer de todas as páginas públicas

#### 3D Anatomy — Real Skeleton
- [x] Modelo real de cão (nzfauna "3D Dog Bone Project", CC BY-SA 4.0, Sketchfab)
- [x] Navegação por lista lateral em vez de hotspots flutuantes
- [x] Estruturas ósseas: Skull, Vertebral Column, Ribcage, Pelvis, Femur, Scapula
- [x] Atribuição CC BY-SA visível no viewer
- [x] GLB em `.gitignore` (48MB — deploy separado)

#### Architecture fixes
- [x] Goals Cypress test corrigido (URL check em vez de coming-soon toast)
- [x] `vet-assitant-skills.js` eliminado (typo duplicate)
- [x] `firebase-config.js` requireAuth redirect corrigido (`/firebase-login.html` → `/index.html`)
- [x] Cypress 3D anatomy test: `#li-skull` / `#li-femur` em vez de Heart/Lungs removidos

### ✅ 26 Março 2026 — Flashcards, Goals, 3D Prototype, Responsive

#### Flashcards
- [x] `flashcards.html` — module picker, flip card animation, Knew it / Didn't know
- [x] Keyboard shortcuts: space = flip, → / 1 = knew, ← / 2 = didn't know
- [x] Results screen com score + opção de praticar só os cards errados
- [x] Dados gerados automaticamente dos ficheiros de quiz existentes (zero custo)
- [x] Sidebar Tools link activo

#### Goals
- [x] `goals.html` — 10 goals pré-definidos em 2 categorias (Overall + Module)
- [x] Progress bars calculadas de quiz_results no Firebase
- [x] Celebration banner para goals completados
- [x] Empty state com CTA se sem dados de quiz
- [x] Sidebar Tools link activo

#### 3D Anatomy Prototype
- [x] Three.js viewer com OrbitControls (drag, zoom, pan)
- [x] Fox GLB animado via CDN (placeholder para cão)
- [x] 6 hotspots clicáveis: Heart, Lungs, Liver, Spine, Skull, Femur
- [x] Info panel: função, relevância clínica, módulo associado, botão quiz
- [x] Animal selector (Cat/Rabbit → coming soon)

#### Bug fixes & polish
- [x] Communications + Work Experience ícones corrigidos no quiz
- [x] Cypress tests actualizados para Flashcards link e 3D Anatomy viewer

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
