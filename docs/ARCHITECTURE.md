# Pethology - Architecture Documentation

> **Version:** 5.6 (Pilot Launch)
> **Last Updated:** 22 Janeiro 2026

---

## 1. Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Icons** | Lucide Icons (CDN) |
| **Auth** | Auth0 (Primary) + Firebase Auth |
| **Database** | Firebase Firestore (NoSQL) |
| **API** | Firebase REST API (no SDK WebChannel) |
| **Hosting** | Netlify (Static SPA) |
| **Analytics** | Google Analytics 4 |
| **Testing** | Cypress E2E |

---

## 2. File Structure

```
pethology/
├── Root HTML Pages
│   ├── index.html                 # Landing page (public)
│   ├── auth0-login.html           # Login page
│   ├── auth0-callback.html        # Auth0 callback handler
│   ├── student-dashboard.html     # Student main interface
│   ├── teacher-dashboard.html     # Teacher main interface
│   ├── quiz.html                  # Quiz selection & play
│   ├── achievements.html          # Student achievements
│   ├── my-progress.html           # Progress tracking
│   ├── admin-whitelist.html       # Teacher whitelist management
│   └── admin-support.html         # Support system
│
├── assets/
│   ├── css/
│   │   ├── style.css              # Main stylesheet
│   │   ├── mobile-nav.css         # Mobile navigation
│   │   ├── loading.css            # Loading animations
│   │   └── toast.css              # Toast notifications
│   │
│   ├── js/
│   │   ├── auth0-service.js       # Auth0 + Firebase integration
│   │   ├── firebase-service.js    # Firebase SDK operations
│   │   ├── firebase-rest.js       # Firebase REST API
│   │   ├── firebase-config.js     # Firebase configuration
│   │   ├── analytics.js           # Google Analytics 4
│   │   ├── toast.js               # Notification system
│   │   ├── achievements.js        # Achievements system
│   │   └── quiz/                  # Quiz modules
│   │       ├── quiz.js            # Main quiz engine
│   │       ├── biology.js
│   │       ├── animal-welfare.js
│   │       └── [8+ quiz modules]
│   │
│   └── img/                       # Images & logos
│
├── docs/                          # Documentation
├── cypress/                       # E2E Tests
├── netlify.toml                   # Deployment config
└── package.json                   # Dependencies
```

---

## 3. Authentication Flow

```
┌─────────────────┐
│  index.html     │
│  (Landing)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ auth0-login.html│──────► Auth0 OAuth
└────────┬────────┘        (Microsoft/Google/Email)
         │
         ▼
┌─────────────────┐
│auth0-callback   │
│     .html       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Auth0Service.handleCallback()       │
│  1. Get Auth0 user data             │
│  2. Check teacher_whitelist         │
│  3. Determine role (Teacher/Student)│
│  4. Create session object           │
│  5. Save to Firebase                │
└────────┬────────────────────────────┘
         │
         ├──► Teacher ──► teacher-dashboard.html
         │
         └──► Student ──► student-dashboard.html
```

### Role Determination Priority

1. **Teacher Whitelist** - Check `teacher_whitelist` collection in Firestore
2. **Email Pattern** - `@stconlethcc365.ie` = Teacher, `plc*` = Student
3. **Fallback** - Default to Student

### Session Storage

```javascript
sessionStorage.setItem('pethologyUser', JSON.stringify({
  id: 'auth0|...',
  name: 'User Name',
  email: 'user@email.com',
  role: 'Teacher' | 'Student',
  photo: 'https://...',
  provider: 'auth0',
  loginTime: timestamp
}));
```

---

## 4. Database Schema (Firestore)

**Project ID:** `pethology-7e9d7`

### Collections

#### `users`
```javascript
{
  id: string,           // Auth0 user ID
  name: string,
  email: string,
  role: 'Teacher' | 'Student',
  photo: string,
  provider: string,
  lastLogin: timestamp,
  updatedAt: timestamp
}
```

#### `student_progress`
```javascript
{
  overallStats: {
    totalQuizzes: number,
    averageScore: number,
    totalTimeSpent: number,
    streak: number,
    lastActivity: timestamp
  },
  moduleProgress: {
    biology: { completed: number, score: number },
    'animal-welfare': { ... },
    // ... other modules
  },
  achievements: [],
  adaptiveProfile: {
    confidence: number,
    learningSpeed: string,
    strongTopics: [],
    weakTopics: []
  }
}
```

#### `quiz_results`
```javascript
{
  userId: string,
  moduleId: string,
  score: number,
  timeSpent: number,
  answers: [],
  completedAt: timestamp
}
```

#### `teacher_whitelist`
```javascript
{
  email: string  // lowercase for comparison
}
```

#### `announcements`
```javascript
{
  title: string,
  message: string,
  icon: string,
  color: string,
  createdAt: timestamp
}
```

#### `calendar_events`
```javascript
{
  title: string,
  date: string,
  type: 'quiz' | 'assignment' | 'exam' | 'announcement',
  color: string
}
```

---

## 5. Quiz System

```
┌─────────────────┐
│   quiz.html     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│quiz-selector.js │──► Load quiz module dynamically
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ quiz.js (Main Engine)               │
│  - Display question                 │
│  - Track answers                    │
│  - Calculate score                  │
│  - Handle exam mode (30min timer)   │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────┐
│ Firebase        │
│ quiz_results    │
│ student_progress│
└─────────────────┘
```

### Quiz Modules
- `biology.js`
- `animal-welfare.js`
- `animal-anatomy.js`
- `animal-behaviour.js`
- `grooming.js`
- `small-animals.js`
- `vet-assistant-skills.js`
- `communications.js`
- `work-experience.js`
- `word-processing.js`

### Question Format
```javascript
{
  question: "What is...?",
  options: ["A", "B", "C", "D"],
  answer: 0,  // correct index
  explanation: "Because..."
}
```

---

## 6. External Services

| Service | Purpose | Config |
|---------|---------|--------|
| **Auth0** | Authentication | Domain: `dev-itl78pbpxq46x8gh.eu.auth0.com` |
| **Firebase** | Database | Project: `pethology-7e9d7` |
| **Google Analytics 4** | Analytics | ID: `G-BVVY1X67PX` |
| **Netlify** | Hosting | Auto-deploy from GitHub |
| **Lucide** | Icons | CDN: unpkg.com |

---

## 7. Key JavaScript Modules

| File | Purpose |
|------|---------|
| `auth0-service.js` | Auth0 integration, role detection, session management |
| `firebase-service.js` | Firestore SDK operations |
| `firebase-rest.js` | REST API for Firestore (no WebChannel) |
| `analytics.js` | GA4 event tracking |
| `quiz.js` | Quiz engine controller |
| `achievements.js` | Achievement unlock logic |
| `toast.js` | Notification system |

---

## 8. Design System

### Colors (CSS Variables)

```css
/* Brand */
--blue-primary: #2383E2;
--blue-hover: #1a73d1;

/* Semantic */
--success: #0f7b6c;
--warning: #f2994a;
--error: #eb5757;

/* Module Colors */
--module-biology: #10b981;
--module-welfare: #f59e0b;
--module-grooming: #8b5cf6;
--module-anatomy: #ef4444;
```

### Typography
- **Font:** Inter, -apple-system, BlinkMacSystemFont, Segoe UI
- **Style:** Notion-inspired, clean minimalist

---

## 9. Deployment

### Netlify Configuration (`netlify.toml`)

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
```

### Deploy Process
1. Push to `main` branch on GitHub
2. Netlify auto-detects changes
3. Builds and deploys static files
4. Available at `pethology.netlify.app`

---

## 10. Testing

### Cypress E2E

```javascript
// cypress.config.js
{
  e2e: {
    baseUrl: 'http://localhost:5500',
    viewportWidth: 1280,
    viewportHeight: 720
  }
}
```

### Run Tests
```bash
npm run test        # Headless
npm run test:open   # Interactive
```

---

## 11. Data Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                        USER                               │
└─────────────────────────┬────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    NETLIFY (CDN)                         │
│                 pethology.netlify.app                    │
└─────────────────────────┬────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │  Auth0   │   │ Firebase │   │   GA4    │
    │  OAuth   │   │ Firestore│   │ Analytics│
    └──────────┘   └──────────┘   └──────────┘
```

---

## 12. Security

- **Auth0 OAuth 2.0** - Industry standard authentication
- **Teacher Whitelist** - Verified teacher emails in Firestore
- **Session Storage** - No persistent tokens in localStorage
- **REST API** - No WebSocket (prevents certain attacks)
- **Cache Busting** - No-cache headers for sensitive files

---

## 13. Feature Summary

### Student Features
- Quiz system (10+ modules)
- Progress tracking & analytics
- Achievement system
- Learning streak
- Adaptive difficulty
- Skills demonstrations
- Calendar & announcements

### Teacher Features
- Student roster management
- Class analytics dashboard
- Teacher whitelist management
- Custom quiz creation
- Announcement posting
- Calendar event management

---

## 14. Known Limitations (v5.6 Pilot)

### Features Not Yet Implemented

| Feature | Description | Status |
|---------|-------------|--------|
| **Adaptive Quiz** | Dynamic difficulty adjustment based on student performance | Not implemented |
| **Exam Mode** | Timed quiz mode with 30-minute limit | UI exists, logic not functional |
| **Class Settings** | Teacher configuration for class parameters | Not implemented |
| **Calendar Event Edit/Delete** | Teacher ability to modify existing events | Not implemented |
| **Announcement Deletion** | Teacher ability to remove announcements | Not implemented |

### Known Bugs

- Quiz progress may start at 2% instead of 0%
- "Mark as read" for announcements not persisting
- Student profile click may show "Failed to load student data" error

---

*Documentation generated for Pethology v5.6 Pilot*
