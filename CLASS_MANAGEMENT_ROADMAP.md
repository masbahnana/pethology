# 📚 Class Management Features - Roadmap

**Date:** October 24, 2025
**Version:** v5.4 (planned)
**Focus:** Teacher Class Management Tools

---

## 🎯 **Priority Levels**

### 🔥 **PRIORITY 1: CRITICAL FOR PILOT** (Implement First)

#### **1.1 Student Detail View** ⏱️ 45-60 min
**File:** Create `student-detail.html` or modal in `teacher-dashboard.html`

**Description:**
Click on student name in table → See full profile with detailed analytics

**Features:**
- Student profile header (name, email, photo, join date)
- Performance graph over time (Chart.js line chart)
- Complete quiz history table (date, module, score, time taken)
- Weak topics identification (modules with score < 70%)
- Achievements unlocked (badge display)
- Quick actions: Send message, Export student report

**UI Mockup:**
```
┌─────────────────────────────────────────────────────┐
│ ← Back to Dashboard                                  │
├─────────────────────────────────────────────────────┤
│ 👤 John Doe                                          │
│    john.doe@stconleths.ie                           │
│    Joined: Oct 1, 2025 • Last active: 2 hours ago  │
├─────────────────────────────────────────────────────┤
│ Performance Over Time                                │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 100%┤                         ╱─╲              │ │
│ │  80%┤           ╱─╲      ╱──╱   ╲             │ │
│ │  60%┤    ╱───╲╱   ╲────╱                       │ │
│ │  40%┤   ╱                                       │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
│ Quiz History (24 quizzes)                           │
│ ┌──────────────────────────────────────────────┐   │
│ │ Oct 22 • Biology          85% ⭐⭐⭐⭐       │   │
│ │ Oct 21 • Animal Welfare   92% ⭐⭐⭐⭐⭐     │   │
│ │ Oct 20 • Grooming         65% ⭐⭐⭐ ⚠️     │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│ Weak Topics (Need attention)                        │
│ • Grooming (65% avg) - Last attempt: 3 days ago    │
│ • Parasitology (68% avg) - Last attempt: 1 week    │
└─────────────────────────────────────────────────────┘
```

**Implementation:**
1. Add onclick to student name in table: `onclick="viewStudentDetail('${student.id}')"`
2. Create modal or new page with student ID
3. Fetch student data from Firebase
4. Render charts with Chart.js
5. Show quiz history with filtering
6. Identify weak topics (avg score < 70%)

**Impact:** ⭐⭐⭐⭐⭐
Teacher can give personalized feedback and identify struggling students!

---

#### **1.2 Filter/Sort Student Table** ⏱️ 30-40 min
**File:** Modify `teacher-dashboard.html`

**Description:**
Add sorting and filtering to student progress table

**Features:**
- Sort by: Name (A-Z), Quizzes Completed (↑↓), Average Score (↑↓), Last Active (↑↓)
- Search box: Filter by student name
- Filter dropdown: All / High Performers (>80%) / Need Help (<60%)
- Persist sort/filter state in localStorage

**UI Mockup:**
```
┌─────────────────────────────────────────────────────┐
│ Student Progress              [Search: _____] [🔽All]│
├─────────────────────────────────────────────────────┤
│ Student Name ↕ │ Quizzes ↕ │ Avg Score ↕ │ Last Active ↕│
│ Alice Brown    │     15     │     92%     │  2 hours ago │
│ Bob Smith      │      8     │     78%     │  1 day ago   │
│ Carol White    │     12     │     55%     │  3 days ago  │
└─────────────────────────────────────────────────────┘
```

**Implementation:**
1. Add search input above table
2. Add filter dropdown: `<select id="scoreFilter">`
3. Add clickable headers with sort icons
4. Implement `sortStudents(column, direction)` function
5. Implement `filterStudents(searchTerm, scoreRange)` function
6. Update table on sort/filter change

**Impact:** ⭐⭐⭐⭐
Teacher can quickly find students who need help!

---

### 🟡 **PRIORITY 2: NICE TO HAVE** (After Pilot Feedback)

#### **2.1 Export Grades (CSV)** ⏱️ 30-40 min
**File:** Modify `teacher-dashboard.html`

**Description:**
Export student grades to CSV file

**Features:**
- Export all students or filtered list
- CSV format: Name, Email, Quizzes Completed, Average Score, Last Active
- Filename: `grades_[date].csv`
- Optional: PDF export with charts

**CSV Format:**
```csv
Name,Email,Quizzes Completed,Average Score,Last Active
Alice Brown,alice@example.com,15,92%,2025-10-24
Bob Smith,bob@example.com,8,78%,2025-10-23
Carol White,carol@example.com,12,55%,2025-10-21
```

**Implementation:**
1. Add "Export Grades" button with onclick
2. Create `exportGrades()` function
3. Convert student data to CSV format
4. Use Blob + download link to trigger download
5. Optional: Add jsPDF for PDF export

**Impact:** ⭐⭐⭐
Useful for reports and documentation

---

### 🟢 **PRIORITY 3: FUTURE** (Post-Pilot)

#### **3.1 Remove Student from Class** ⏱️ 15-20 min
**File:** Modify `teacher-dashboard.html`

**Description:**
Delete student from class with confirmation

**Features:**
- Delete button on student row (trash icon)
- Confirmation modal: "Are you sure?"
- Soft delete (mark as inactive) vs Hard delete
- Toast notification on success

**Implementation:**
1. Add delete button to each row
2. Show confirmation modal
3. Call Firebase delete API
4. Update table without reload
5. Show success toast

**Impact:** ⭐⭐
Not critical for pilot, can be dangerous

---

## 📊 **Summary**

| Priority | Feature | Time | Status |
|----------|---------|------|--------|
| 🔥 P1 | Student Detail View | 45-60 min | 📋 TODO |
| 🔥 P1 | Filter/Sort Table | 30-40 min | 📋 TODO |
| 🟡 P2 | Export Grades (CSV) | 30-40 min | 📋 TODO |
| 🟢 P3 | Remove Student | 15-20 min | 📋 TODO |
| **TOTAL** | **All Features** | **~2h-2.5h** | |

---

## 🚀 **Recommended Implementation Order:**

1. ✅ **Filter/Sort Table** (30-40 min) - Quick win, immediate impact
2. ✅ **Student Detail View** (45-60 min) - Most valuable for teachers
3. 🟡 **Export Grades** (30-40 min) - After pilot feedback
4. 🟢 **Remove Student** (15-20 min) - After pilot feedback

---

## 📝 **Notes:**

- All features integrate with existing Firebase REST API
- Use toast notifications for user feedback
- Mobile responsive design required
- Error handling with errorHandler utility
- Loading states with spinner components

---

**Next Step:** Implement P1 features for pilot launch! 🎯
