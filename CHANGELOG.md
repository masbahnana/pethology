# Changelog

All notable changes to Pethology are documented here.

---

## v6.7 — 26 March 2026

### Added
- **Export Grades** — CSV download with name, email, status, total quizzes, avg score, questions answered, correct answers, and per-module score columns
- **Buy Me a Coffee** — buymeacoffee.com/pethology live; buttons active on support.html
- **GitHub Projects** — Kanban migrated to github.com/users/masbahnana/projects/2

---

## v6.6 — 26 March 2026

### Added
- **Teacher Settings modal** — Quick Actions › Settings opens teacher personal profile: Display Name, Contact Email, quiz email notifications. Saved to Firebase `teacher_profiles/{userId}`

### Changed
- Settings and Class Management are now separate — Settings is teacher profile only

---

## v6.5 — 26 March 2026

### Fixed
- **Student profile modal** — Removed double overlay that was blocking scroll and clicks
- **"0 Questions Answered" bug** — `totalQuestions` and `correctAnswers` now summed correctly from `quiz_results` in `getStudentProgress()`
- **Archived class read-only** — Clicking an archived class opens a read-only info modal (year, archive date, student count, modules) with student list; closes on outside click

---

## v6.4 — 26 March 2026

### Added
- **Work Experience Diary** — 6-field form (date picker, location, summary, skills, challenges, reflection); entry list in sidebar ordered by date; editable; photo reminder on save. Private — only the student can read. Firebase REST, isolated by userId. Sidebar Tools link active
- **Terms & Privacy** — `terms.html` (9 sections, Irish law) + `privacy.html` (GDPR compliant, data table, user rights, DPC Ireland contact). Links in footer of all public pages
- **3D Anatomy — Real Skeleton** — Real dog skeleton model (nzfauna "3D Dog Bone Project", CC BY-SA 4.0, Sketchfab). Sidebar navigation: Skull, Vertebral Column, Ribcage, Pelvis, Femur, Scapula. Info panel with function, clinical relevance, module, and quiz link. CC BY-SA attribution visible in viewer

### Fixed
- Goals Cypress test — URL check instead of coming-soon toast
- `vet-assitant-skills.js` removed (typo duplicate)
- `firebase-config.js` requireAuth redirect corrected (`/firebase-login.html` → `/index.html`)
- Cypress 3D anatomy test: `#li-skull` / `#li-femur` selectors updated

---

## v6.3 — 26 March 2026

### Added
- **Flashcards** — Module picker, flip card animation, Knew it / Didn't know. Keyboard shortcuts: Space = flip, → / 1 = knew, ← / 2 = didn't know. Results screen with score + option to practise wrong cards only. Data generated automatically from existing quiz files. Sidebar Tools link active
- **Goals** — 10 pre-defined goals (Overall + Module categories). Progress bars from Firebase `quiz_results`. Celebration banner for completed goals. Empty state with CTA if no quiz data
- **Archive Class** — Instead of deleting, teacher archives the class. Students removed from whitelist (cannot log in); quiz results, diary, and goals preserved. Dashboard shows only active classes. Clear modal before confirming

### Fixed
- Communications and Work Experience icons corrected in quiz
- Cypress tests updated for Flashcards link and 3D Anatomy viewer

---

## v6.2 — 26 March 2026

### Added
- **Mobile Responsiveness — Teacher Dashboard** — Header actions wrap on mobile; class selector moves to new line; Publish Content and Settings moved from header to Quick Actions
- **Mobile Responsiveness — Student Dashboard** — Smart Learning Tools grid stacks to 1 column on mobile; achievement filters wrap; achievement header stacks vertically on mobile

---

## v6.1 — 24 March 2026

### Added
- **Smart Review System** — Analyses weakest module, launches quiz directly. "No history yet" modal with CTA
- **guide.html** — Onboarding page with student and teacher guides
- **anatomy-3d.html** — Coming soon page with 3 feature cards
- **Avatar dropdown** — Report Issue, Help & FAQ, Logout moved to dropdown menu
- **Favicon** — `favicon.svg` added to all pages (works on Netlify)

### Changed
- Sidebar logo replaced with "🐾 Pethology" centred text

### Fixed
- **Real stat cards** — Dashboard shows real Firebase data (not hardcoded)
- **Real achievements** — Achievement grid uses real Firebase data
- **Avatar bug** — "undefined" banner fixed; avatar persists between pages
- **Exam Mode layout** — Hides h1, removes side panels, full width
- **Quiz nav** — Shows Dashboard when logged in, Login when not logged in

---

## v6.0 — 24 March 2026

### Added
- **Performance optimisation** — Image compression (PNG→JPG, −1 MB), Lucide defer, in-memory cache (30–60 s TTL)
- **Landing page redesign** — New UI (Notion/Tally style) with interactive sample quiz
- **roadmap.html** — Visual timeline page
- **store.html** — Store page with coming soon products
- **Standardised public layout** — pub-nav/pub-footer across all public pages
- **Quiz module cards** — Cards with centred icon, title, "Start quiz →"
- **FAQ in footer** — FAQ link added to index.html footer

---

## v5.6 — January 2026

### Fixed
- **Chrome login CORS** — Converted auth0-login.html to REST API
- **Student name "John Doe"** — Now prioritises name from whitelist
- **Quiz navigation** — 4 cascading fixes (collapsible, onclick, REST import, emoji syntax)
- **Exam Mode checkbox**
- **Quiz progress saving** — Recalculated from `quiz_results`
- **Data isolation** — Teachers only see their own students

---

## v5.5 — October 2025 – January 2026

### Added
- Exam Mode UI overhaul — Dark theme, top bar with timer, progress bar, tab warnings
- Dynamic exam timer — Calculated from student history (clamped 45 s–180 s/question)
- Class Settings modal — 3 tabs: Class Info, Students, Teachers
- Coordinator can add teachers — Dropdown + modal to edit modules
- Skills Demonstrations — Teacher creates, student submits, progress saved
- Calendar System — Dynamic events from Firebase with visual indicators
- Google Analytics 4 — Tracking for login, quiz_start, quiz_complete
- Demo users in dev only — Demo buttons shown only on localhost

### Fixed
- Average Score bug — Scores calculated dynamically from `quiz_results`
- Class indicator "undefined" — Fixed with safe fallback

---

## v5.0 — October 2025

### Added
- 19 achievements and badges
- My Progress page with graphs
- Adaptive quiz algorithm (60/30/10 distribution)
- Weak topic identification
- CSV quiz and student import
- Class management dashboard
- Custom quiz creation

---

## v4.0 — July 2025 – September 2025

### Added
- Auth0 secure login
- Teacher and student whitelists
- 100% REST API (zero Firebase SDK)
- Announcements system
- Calendar system

---

## v1.0 – v3.0 — April 2025 – June 2025

### Added
- Initial platform launch
- 200+ quiz questions across 10 modules (Biology, Anatomy, Grooming, and more)
- Simple progress tracking
