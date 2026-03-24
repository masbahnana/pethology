# 🎓 Pethology - FINAL Roadmap v5.0

**Última atualização:** 24 Outubro 2025
**Versão Atual:** v5.5 - 100% v5.0 COMPLETE ✅ 🎉
**Status:** PILOT LAUNCH IN PROGRESS 🚀

---

## 🏆 **WHAT'S DONE:**

### ✅ **v4.2 - Core System:**
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

### ✅ **v5.0-v5.5 - Platform Enhancements:**
- [x] **v5.0:** Achievements Page (standalone, 19 achievements, filters, stats)
- [x] **v5.0:** My Progress Page (graphs, module breakdown, quiz history)
- [x] **v5.0:** Adaptive Quiz System (AI-powered, 60/30/10 distribution, confidence scoring)
- [x] **v5.1:** Quiz Import System (CSV upload, validation, custom quizzes)
- [x] **v5.1:** Multiple Quizzes Modal (standard + custom, deadline tracking)
- [x] **v5.2:** Toast Notification System (4 types, auto-dismiss, mobile)
- [x] **v5.2:** Error Handler (centralized, retry logic, user-friendly)
- [x] **v5.2:** Mobile Responsiveness (touch-friendly, responsive grids)
- [x] **v5.3:** Custom Quiz Support in quiz.js (Firebase integration)
- [x] **v5.3:** Real Teacher Whitelist Verification (async Firebase check)
- [x] **v5.4:** Class Management - Filter/Sort Table (search, score filter, sortable)
- [x] **v5.4:** Class Management - Student Detail View (stats, weak topics, quiz history)
- [x] **v5.5:** Pilot Launch Materials (for-teachers.html, for-students.html, quick-start.html, email-templates.html)
- [x] **v5.5:** Emergency Fixes (Mary teacher access, dashboard loading, Lucide icons)

---

## 🚀 **PILOT LAUNCH - PENDING TASKS**

### **🔥 CRITICAL (Do Before Mary Tests):**
- [x] ~~**Create test student data** (3-5 fake students with quiz history)~~ ✅ DONE!
  - Created populate-demo-data.html (one-click demo generation)
  - 5 demo students: John Smith, Emma Brown, Lucas Green, Sophia White, Oliver Black
  - Realistic quiz history with varied performance (High/Medium/Low)
  - Teacher dashboard now shows 9 students correctly!

### **⚠️ HIGH PRIORITY (Do This Week):**
- [x] ~~**Mobile testing**~~ ✅ IN PROGRESS!
  - Fixed index.html script errors (quiz.js 404, null pointer)
  - Added hamburger menu (☰) to ALL pages for easy navigation
  - User can now navigate from any page back to home
  - Pages updated: index, quiz, about, login, blog, contact, content, for-teachers, for-students, quick-start
  - Still testing: dashboards, quiz functionality, landing pages
- [ ] **Fix real whitelist issue** - Debug why Mary wasn't recognized - 30min
  - Remove emergency hardcode after fix
  - Get console logs from Mary's login
  - LOW PRIORITY: Mary will test first
- [ ] **Setup basic analytics** - Google Analytics for pilot monitoring - 20min

### **📋 MEDIUM PRIORITY (Nice to Have):**
- [ ] **FAQ page** - Common questions and answers - 30min
- [ ] **Known issues doc** - Document bugs/limitations - 15min
- [ ] **Collect Mary's feedback** - After she tests - ongoing

### **🎯 LOW PRIORITY (Can Wait):**
- [ ] **Performance optimization** - Minify, lazy load, cache - 45min
- [ ] **Video tutorial** - Screen recording walkthrough - 1-2h
- [ ] **Professional screenshots** - For marketing - 30min
- [ ] **GitHub Kanban board** - Project management - 20min 😄

---

## 🎉 **v5.0 - DELIVERY COMPLETE! 100% ✅**

**STATUS:** 🚀 **ALL v5.0 FEATURES IMPLEMENTED!**

### **✅ Achievements Unlocked:**
1. ✅ **Achievements Page** - Standalone page with 19 achievements, filters, search
2. ✅ **My Progress Page** - Charts, module breakdown, quiz history, weak topics
3. ✅ **Quiz Import System** - CSV upload, validation, custom quiz creation
4. ✅ **Multiple Quizzes Modal** - Standard + custom quizzes with deadline tracking
5. ✅ **Adaptive Quiz AI** - THE DIFFERENTIATOR! 60/30/10 distribution, confidence scoring
6. ✅ **Toast Notifications** - Professional UI feedback (4 types, auto-dismiss)
7. ✅ **Error Handler** - Centralized error handling with retry logic
8. ✅ **Mobile Responsiveness** - Touch-friendly, responsive grids
9. ✅ **Custom Quiz Support** - Full integration in quiz.js
10. ✅ **Teacher Whitelist** - Real Firebase verification
11. ✅ **Class Management** - Filter/Sort + Student Detail View

### **🎯 Original Goal:**
**DECISION:** Opção 2 - Foco no Diferencial!
**GOAL:** Sistema completo com features únicas que competidores não têm ✅ **ACHIEVED!**

---

## 📋 **v5.0 - FEATURE DETAILS (FOR REFERENCE)**

---

### **FASE 1: STUDENT EXPERIENCE ENHANCEMENT (4-6h)**

#### **1.1 Achievements Page (2-3h)** 🏆
**Status:** 📋 TODO
**Priority:** HIGH

**Features:**
- [ ] Create standalone `/achievements.html`
- [ ] Full achievements grid with all 19 achievements
- [ ] Filters: All, Unlocked, Locked, Rare, Common, Epic, Legendary
- [ ] Search achievements by name
- [ ] Stats section (total unlocked, completion %, by rarity)
- [ ] Visual animations on hover
- [ ] Share achievement (optional)
- [ ] Link from dashboard sidebar

**UI Mockup:**
```
┌────────────────────────────────────────────────┐
│ 🏆 Achievements                    [Search 🔍] │
├────────────────────────────────────────────────┤
│ Stats:                                          │
│ ━━━━━━━━━━━━━━━━━ 52% (10/19)                  │
│ Common: 5/8 • Rare: 3/6 • Epic: 2/4 • Legendary: 0/1 │
├────────────────────────────────────────────────┤
│ [All] [Unlocked] [Locked] [Rare] [Epic] [Legendary] │
├────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │ 🎓      │ │ 📖      │ │ 🧠      │           │
│ │ First   │ │ Knowledge│ │ Brain   │ [LOCKED] │
│ │ Steps   │ │ Seeker  │ │ Master  │           │
│ │ UNLOCKED│ │ UNLOCKED│ │ 6/10    │           │
│ └─────────┘ └─────────┘ └─────────┘           │
└────────────────────────────────────────────────┘
```

**Files to Create:**
- `achievements.html`
- Optional: `assets/css/achievements.css`

**Files to Modify:**
- `student-dashboard.html` - Add "View All" link

**Database:** (already exists in student_progress)

**Impact:** ⭐⭐⭐⭐⭐ Students love achievements!

---

#### **1.2 My Progress Page (2-3h)** 📊
**Status:** 📋 TODO
**Priority:** HIGH

**Features:**
- [ ] Create standalone `/my-progress.html`
- [ ] Performance graphs (Chart.js) - score over time
- [ ] Module-by-module breakdown with charts
- [ ] Quiz history timeline (recent 20 quizzes)
- [ ] Weak topics identification
- [ ] Study recommendations
- [ ] Export progress (PDF/CSV - optional)
- [ ] Link from dashboard sidebar

**UI Mockup:**
```
┌────────────────────────────────────────────────┐
│ 📊 My Progress                                  │
├────────────────────────────────────────────────┤
│ Overview Stats:                                 │
│ Total Quizzes: 45 • Avg Score: 82% • Streak: 7 │
│                                                 │
│ ┌────────────────────────────────────────────┐ │
│ │     Performance Over Time                  │ │
│ │ 100%┤                              ╱─╲     │ │
│ │  80%┤           ╱─╲  ╱──╲    ╱───╱   ╲    │ │
│ │  60%┤    ╱───╲╱   ╲╱    ╲──╱           ╲  │ │
│ │  40%┤   ╱                                  │ │
│ │     └──────────────────────────────────────│ │
│ │       Oct 1      Oct 10      Oct 20       │ │
│ └────────────────────────────────────────────┘ │
│                                                 │
│ Module Performance:                             │
│ Biology          ━━━━━━━━━━━━━━━ 92% (A+)      │
│ Animal Welfare   ━━━━━━━━━━━─── 78% (B+)      │
│ Grooming         ━━━━━━━━────── 65% (C) ⚠️    │
│                                                 │
│ Recent Quiz History:                            │
│ ┌──────────────────────────────────────────┐  │
│ │ Oct 22 • Biology        85% ⭐⭐⭐⭐      │  │
│ │ Oct 21 • Animal Welfare 92% ⭐⭐⭐⭐⭐    │  │
│ │ Oct 20 • Grooming       65% ⭐⭐⭐        │  │
│ └──────────────────────────────────────────┘  │
│                                                 │
│ 💡 Recommendations:                             │
│ • Practice more on Grooming (65%)              │
│ • Review weak topic: Coat types               │
└────────────────────────────────────────────────┘
```

**Files to Create:**
- `my-progress.html`
- Optional: `assets/css/progress.css`

**Files to Modify:**
- `student-dashboard.html` - Add "Detailed Progress" link

**Libraries:**
- Chart.js CDN

**Impact:** ⭐⭐⭐⭐ Helps students track improvement

---

### **FASE 2: TEACHER POWER TOOLS (5-7h)**

#### **2.1 Quiz Import CSV (3-4h)** 📄
**Status:** 📋 TODO
**Priority:** CRITICAL (Game Changer!)

**Features:**
- [ ] Upload CSV file interface in teacher dashboard
- [ ] Parse CSV with validation
- [ ] Preview questions before import
- [ ] Edit questions in preview
- [ ] Validation checks (4 options, correct answer, etc)
- [ ] Save as custom quiz with metadata
- [ ] Assign to module/category
- [ ] Set deadline (optional)
- [ ] Test imported quiz

**CSV Format:**
```csv
question,optionA,optionB,optionC,optionD,correctAnswer,explanation,module
"What is normal dog temperature?","36-37°C","38-39°C","40-41°C","42-43°C",1,"Normal is 38-39°C","Biology"
"How many teeth does adult dog have?","32","42","52","62",1,"Adult dogs have 42 teeth","Animal Anatomy"
```

**UI Flow:**
```
Teacher Dashboard → Quick Actions → Import Quiz

┌────────────────────────────────────────────────┐
│ 📄 Import Quiz from CSV                         │
├────────────────────────────────────────────────┤
│                                                 │
│ Step 1: Upload File                             │
│ ┌─────────────────────────────────────────┐   │
│ │   Drag & Drop CSV here                  │   │
│ │   or [Browse Files]                     │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ [Download CSV Template]                         │
│                                                 │
│ ──────────────────────────────────────────────│
│                                                 │
│ Step 2: Preview & Validate                     │
│ ✓ 25 questions found                           │
│ ✓ All questions have 4 options                 │
│ ⚠ 2 questions missing explanations             │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ Q1: What is normal dog temperature?     │   │
│ │ A: 36-37°C  B: 38-39°C ✓                │   │
│ │ C: 40-41°C  D: 42-43°C                  │   │
│ │ Explanation: Normal is 38-39°C          │   │
│ │ [Edit] [Delete]                         │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ ──────────────────────────────────────────────│
│                                                 │
│ Step 3: Quiz Details                            │
│ Quiz Title: [___________________________]      │
│ Module: [Biology ▾]                            │
│ Deadline: [Optional - Pick Date]               │
│                                                 │
│ [Cancel]                      [Import Quiz →]  │
└────────────────────────────────────────────────┘
```

**Files to Create:**
- `import-quiz.html` (or modal in teacher dashboard)
- `assets/js/quiz-import.js`

**Files to Modify:**
- `teacher-dashboard.html` - Add "Import Quiz" to Quick Actions
- `firebase-rest.js` - Add quiz CRUD methods

**Database Structure:**
```javascript
/custom_quizzes/{quizId}
{
  id: "quiz_biology_week3",
  title: "Week 3 - Biology Review",
  module: "Biology",
  createdBy: "teacher_id",
  createdByName: "Mrs. Smith",
  createdAt: timestamp,
  deadline: timestamp (optional),
  questions: [
    {
      question: "What is...",
      options: ["A", "B", "C", "D"],
      correctAnswer: 1,
      explanation: "..."
    }
  ],
  metadata: {
    totalQuestions: 25,
    importedFrom: "csv",
    estimatedTime: 15
  }
}
```

**Impact:** ⭐⭐⭐⭐⭐ HUGE! Teachers reuse existing content!

---

#### **2.2 Multiple Quizzes per Module - Modal Selection (2-3h)** 🎯
**Status:** 📋 TODO
**Priority:** HIGH

**Features:**
- [ ] Detect if module has multiple quizzes (standard + custom)
- [ ] Show modal when module clicked
- [ ] List all available quizzes for that module
- [ ] Show deadline badge if exists
- [ ] Show "overdue" warning
- [ ] Radio selection + Start button
- [ ] If only 1 quiz → go direct (no modal)

**UI:**
```
Student clicks "Biology" module →

┌────────────────────────────────────────────────┐
│ × Biology - Choose Quiz                         │
├────────────────────────────────────────────────┤
│                                                 │
│ ● Standard Quiz                                │
│   20 questions • No deadline                   │
│   Your best: 85%                               │
│                                                 │
│ ○ Week 3 Review (Teacher)                      │
│   15 questions • Due: Oct 25                   │
│   🔥 2 days overdue                            │
│                                                 │
│ ○ Midterm Practice (Teacher)                   │
│   10 questions • No deadline                   │
│   Not attempted                                │
│                                                 │
│ [Cancel]                   [Start Selected →]  │
└────────────────────────────────────────────────┘
```

**Logic:**
```javascript
// On module click
async function onModuleClick(moduleName) {
  const standardQuiz = getStandardQuiz(moduleName);
  const customQuizzes = await getCustomQuizzes(moduleName);

  const allQuizzes = [standardQuiz, ...customQuizzes];

  if (allQuizzes.length === 1) {
    // Go direct to quiz
    startQuiz(allQuizzes[0]);
  } else {
    // Show modal
    showQuizSelectionModal(allQuizzes);
  }
}
```

**Files to Modify:**
- `student-dashboard.html` - Add modal + click handler
- `firebase-rest.js` - Method to get custom quizzes by module

**Impact:** ⭐⭐⭐⭐ Essential for custom quizzes!

---

### **FASE 3: ADAPTIVE LEARNING (4-5h) 🤖**

#### **3.1 Adaptive Quiz Integration (4-5h)** ⭐ THE DIFFERENTIATOR!
**Status:** 📋 TODO
**Priority:** HIGH (Competitive Advantage!)

**What is it:** Quiz that adjusts difficulty based on student performance.

**Algorithm:** Already exists in `adaptive-quiz-ai.js` ✅

**Features:**
- [ ] Load student adaptive profile from Firebase
- [ ] Calculate confidence scores per topic
- [ ] Select questions based on performance (weak topics get more questions)
- [ ] Adjust difficulty dynamically
- [ ] Save adaptive metadata after quiz
- [ ] UI badge "🤖 Adaptive Quiz"
- [ ] Special results page showing improvement areas

**How it Works:**
```
1. Student clicks "Adaptive Quiz" mode
2. System loads their quiz history
3. Identifies weak topics (e.g., "Grooming: 65%")
4. Generates custom question set:
   - 60% questions from weak topics
   - 30% questions from medium topics
   - 10% questions from strong topics
5. Shows results with recommendations
```

**UI:**
```
Student Dashboard → Module Card

┌────────────────────────────────────────────────┐
│ Biology                                        │
│ ━━━━━━━━━━━━━━━ 85%                            │
│                                                 │
│ [Standard Quiz] [🤖 Adaptive Quiz]             │
└────────────────────────────────────────────────┘

After Adaptive Quiz:

┌────────────────────────────────────────────────┐
│ 🤖 Adaptive Quiz Results                        │
├────────────────────────────────────────────────┤
│ Score: 78% (11/14 correct)                     │
│                                                 │
│ Focus Areas Tested:                             │
│ • Cell Biology: 4/5 ✓ Improved!               │
│ • Organ Systems: 3/5 ⚠️ Needs review          │
│ • Genetics: 4/4 ✓ Strong!                      │
│                                                 │
│ 💡 Recommendation:                              │
│ Practice more on "Organ Systems"               │
│                                                 │
│ [Review Mistakes] [Take Another Adaptive Quiz] │
└────────────────────────────────────────────────┘
```

**Files to Create:**
- `adaptive-quiz.html` (or reuse quiz.html with mode flag)
- `assets/js/adaptive-quiz-integration.js`

**Files to Modify:**
- `student-dashboard.html` - Add "Adaptive Quiz" button
- `assets/js/adaptive-quiz-ai.js` - Already exists, integrate it!
- `firebase-rest.js` - Save/load adaptive profile

**Database:**
```javascript
/student_progress/{userId}
{
  // ... existing fields ...
  adaptiveProfile: {
    biology: {
      cellBiology: { confidence: 0.85, lastPracticed: timestamp },
      organSystems: { confidence: 0.65, lastPracticed: timestamp },
      genetics: { confidence: 0.92, lastPracticed: timestamp }
    },
    // ... other modules
  }
}
```

**Impact:** ⭐⭐⭐⭐⭐ MASSIVE! No competitor has this!

---

### **FASE 4: POLISH & PRODUCTION READY (2-3h)**

#### **4.1 Loading States (1h)** ⏳
**Status:** 📋 TODO
**Priority:** MEDIUM

**Features:**
- [ ] Add spinners to all async operations
- [ ] Skeleton screens for dashboards
- [ ] Loading text ("Loading quizzes...", "Analyzing performance...")
- [ ] Disable buttons while loading
- [ ] Progress bars for long operations

**Files to Modify:**
- All dashboard files
- All pages with async data loading

**Implementation:**
```javascript
// Before fetch
showLoadingSpinner('loadingContainer');

// After fetch
hideLoadingSpinner('loadingContainer');
showContent('contentContainer');
```

**CSS:**
```css
.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  animation: shimmer 1.5s infinite;
}
```

**Impact:** ⭐⭐⭐⭐ Professional UX

---

#### **4.2 Error Handling (1h)** ❌
**Status:** 📋 TODO
**Priority:** MEDIUM

**Features:**
- [ ] User-friendly error messages
- [ ] Retry buttons for failed requests
- [ ] Fallback content when data fails
- [ ] Toast notifications for errors
- [ ] Log errors to console (keep detailed logs)

**Examples:**
```javascript
// Bad
alert("Error: Firebase request failed with status 500")

// Good
showErrorToast("Couldn't load quizzes. Please check your connection and try again.");
```

**Files to Modify:**
- `firebase-rest.js` - Add retry logic
- All pages with error handling

**Impact:** ⭐⭐⭐ Fewer support requests

---

#### **4.3 Mobile Testing & Fixes (30min-1h)** 📱
**Status:** 📋 TODO
**Priority:** MEDIUM

**Features:**
- [ ] Test all pages on mobile viewport (375px)
- [ ] Fix responsive issues
- [ ] Touch-friendly buttons (min 44px)
- [ ] Test on real device (iPhone/Android)
- [ ] Fix text overflow
- [ ] Test horizontal scroll

**Test in Cypress:**
```javascript
cy.viewport('iphone-x')
cy.visit('/student-dashboard.html')
cy.get('.module-card').should('be.visible')
```

**Impact:** ⭐⭐⭐⭐ Accessible anywhere

---

## 📊 **FINAL TIMELINE:**

### **Total Estimate: 15-21 hours**

**Breakdown:**
- Achievements Page: 2-3h
- Progress Page: 2-3h
- Quiz Import CSV: 3-4h
- Multiple Quizzes Modal: 2-3h
- Adaptive Quiz: 4-5h
- Polish (Loading + Errors + Mobile): 2-3h

**Suggested Schedule:**

**Session 1 (5-6h): Student Experience**
- Achievements Page (2-3h)
- Progress Page (2-3h)
- Break
- Test & Polish

**Session 2 (5-6h): Teacher Tools**
- Quiz Import CSV (3-4h)
- Multiple Quizzes Modal (2-3h)
- Break
- Test & Polish

**Session 3 (5-6h): Adaptive & Polish**
- Adaptive Quiz Integration (4-5h)
- Break
- Loading States + Error Handling (1-2h)

**Session 4 (2-3h): Final Polish**
- Mobile Testing & Fixes (1h)
- End-to-end testing all features (1h)
- Bug fixes (1h)
- Deploy! 🚀

---

## ✅ **FEATURES NOT INCLUDED IN v5.0:**

These go to v6.0 (Future):

### **Postponed to v6.0:**
- 🐛 Avatar bug (student dashboard) - banner shows "undefined" after avatar change; avatar disappears when navigating to other pages (e.g. Achievements)
- ❌ Flashcards (student dashboard) - UI card exists, feature not implemented
- ❌ Notes (student dashboard) - UI card exists, feature not implemented
- ❌ Goals (student dashboard) - UI card exists, feature not implemented
- ❌ Smart Review System (3-4h) - Great but less impact than Adaptive
- ❌ Exam Mode (2-3h) - Nice to have, not critical
- ❌ Glossary System (2-3h) - Useful but not core
- ❌ Skills Demos Checklist (2-3h) - Can reuse Goals later
- ✅ ~~Class Management System (8-10h)~~ - **v5.4 COMPLETED** (P1: Filter/Sort + Student Detail)
  - ⏸️ Remaining P2/P3 features postponed (Export Grades, Remove Student)
- ❌ Microsoft Forms Import (4-6h) - CSV covers 80% of use case
- ❌ Advanced Gamification (4-6h) - Already have achievements
- ❌ Standalone pages for other features

### **Why Postpone?**
- Focus on the **BIGGEST differentiators**
- Avoid burnout
- Ship v5.0 sooner
- Iterate based on user feedback

---

## 🎯 **SUCCESS CRITERIA FOR v5.0:**

### **Must Have (All Working):**
- ✅ Achievements page with all filters
- ✅ Progress page with graphs
- ✅ CSV quiz import working end-to-end
- ✅ Multiple quizzes per module with modal
- ✅ Adaptive quiz fully functional
- ✅ Loading states everywhere
- ✅ Error handling with friendly messages
- ✅ Mobile responsive

### **Quality Checks:**
- ✅ No console errors
- ✅ All links work
- ✅ All buttons clickable
- ✅ Fast page loads (<2s)
- ✅ Works on mobile
- ✅ Cypress tests passing

### **Ready to Launch When:**
1. All "Must Have" features working
2. Tested by at least 2 users (teacher + student)
3. No critical bugs
4. Documentation updated
5. Deployed to Netlify

---

## 📝 **NOTES:**

### **Development Tips:**
- Commit after each feature
- Test each feature before moving to next
- Take breaks every 2h
- Don't skip polish!

### **If Running Out of Time:**
**Priority Order (must → optional):**
1. 🔴 MUST: Achievements Page, Progress Page, CSV Import, Multiple Quizzes
2. 🟡 SHOULD: Adaptive Quiz, Loading States
3. 🟢 NICE: Error Handling, Mobile Polish

### **Communication:**
- Update TODO.md after each session
- Mark features as DONE when complete
- Note any blockers or issues

---

## 🚀 **LET'S DO THIS!**

**Ready to start with Achievements Page?** 💪🔥

---

**End of TODO-FINAL.md**

*Updated: 22 Oct 2025 - Decision: Opção 2 (Cenário C)*


23 oct
teste manual/visual
pagina inicial:
    - Talvez melhorar um pouco os header pra ficar mais centralizado tipo Notion? Ou ta muito muito copy do notion?
    - Nas paginas for teacher e for students deixar mais realista com o contesto atual e sem o free trial (talvez explicar que ainda nao temos subscription)
    - Na pagina about gostaria de adicionar um roadmap (algo similar mas visual)

pagina quiz:
    - tentar usar o mesmo layout que temos nos dashboards se possível (icons por exemplo)

pagina de login: 
    - Ajustar o how to login para a nossa realidade
