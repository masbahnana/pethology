# 🧪 Pethology Cypress Tests

E2E testing structure for Pethology platform.

## 📁 Structure

```
cypress/
├── e2e/                          # Test specs
│   ├── 1-authentication/         # Login, whitelist, auth flow
│   ├── 2-student-dashboard/      # Student features
│   ├── 3-teacher-dashboard/      # Teacher features
│   └── 4-quiz-system/            # Quiz functionality
├── fixtures/                     # Test data
│   └── test-data.json           # Mock data for tests
└── support/                      # Custom commands & config
    ├── commands.js              # Reusable test commands
    └── e2e.js                   # Global test setup
```

## 🚀 Running Tests

### Install Cypress
```bash
npm install
```

### Open Cypress UI (Interactive)
```bash
npm run cy:open
```

### Run All Tests (Headless)
```bash
npm test
# or
npm run cy:run
```

### Run Specific Browser
```bash
npm run test:chrome
npm run test:firefox
```

### Run With UI (Headed)
```bash
npm run test:headed
```

## 📝 Writing Tests

### Basic Test Structure
```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
    cy.visit('/page.html')
  })

  it('should do something', () => {
    cy.get('.element').should('be.visible')
    cy.contains('Text').click()
  })
})
```

### Using Custom Commands

#### Login Commands
```javascript
// Login as student
cy.loginAsStudent('test@plc.ie')

// Login as teacher
cy.loginAsTeacher('teacher@school.com')
```

#### Navigation
```javascript
// Visit and wait for load
cy.visitAndWait('/student-dashboard.html')

// Check visibility
cy.shouldBeVisible('#dashboard')
```

#### Announcements
```javascript
// Create announcement (teacher)
cy.createAnnouncement('Title', 'Message', true) // pinned
```

#### Quiz
```javascript
// Start quiz
cy.startQuiz('biology')

// Answer question
cy.answerQuestion(0) // Select first option
```

#### API Mocking
```javascript
// Mock Firebase response
cy.mockFirebaseAPI('announcements', mockData)
```

## 🎯 Test Categories

### 1. Authentication (`1-authentication/`)
- Login flow
- Whitelist validation
- Student/teacher role detection
- Access control

### 2. Student Dashboard (`2-student-dashboard/`)
- Dashboard display
- Module navigation
- Progress tracking
- Announcements viewing

### 3. Teacher Dashboard (`3-teacher-dashboard/`)
- Analytics display
- Announcement management
- Student progress view
- Quick actions

### 4. Quiz System (`4-quiz-system/`)
- Module selection
- Question display
- Answer selection
- Quiz completion
- Results display

## 🔧 Configuration

Edit `cypress.config.js` to change:
- Base URL
- Viewport size
- Timeouts
- Retry settings
- Environment variables

## 📊 Test Data

Fixtures in `fixtures/test-data.json`:
- Mock students
- Mock teachers
- Sample announcements
- Quiz results
- Module list

## 🐛 Debugging

### View Test in Browser
```bash
npm run cy:open
```

### Screenshots
Failed tests automatically save screenshots to `cypress/screenshots/`

### Videos
Enable video recording in `cypress.config.js`:
```javascript
video: true
```

### Console Logs
Use `cy.log()` in tests:
```javascript
cy.log('🔍 Checking element...')
```

## ✅ Best Practices

1. **Use data attributes for test selectors**
   ```html
   <button data-cy="submit-btn">Submit</button>
   ```
   ```javascript
   cy.get('[data-cy="submit-btn"]').click()
   ```

2. **Keep tests independent**
   - Each test should work standalone
   - Use `beforeEach` for setup

3. **Use custom commands for reusable actions**
   - Login flows
   - Common interactions

4. **Mock external APIs when possible**
   - Faster tests
   - More reliable

5. **Descriptive test names**
   ```javascript
   it('should display error message when form is empty', () => {})
   ```

## 📚 Resources

- [Cypress Docs](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

## 🚦 CI/CD Integration

Add to GitHub Actions:
```yaml
- name: Cypress Tests
  run: npm run cy:run
```

## 📝 TODO

- [ ] Add more authentication tests
- [ ] Test whitelist scenarios with API mocking
- [ ] Add performance tests
- [ ] Test mobile viewport
- [ ] Add accessibility tests (cypress-axe)
- [ ] Test error states
- [ ] Test loading states
- [ ] Add visual regression tests
