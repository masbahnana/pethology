// ***********************************************************
// Custom Cypress Commands for Pethology
// ***********************************************************

/**
 * Login as student with pre-registered email
 * @example cy.loginAsStudent('test@plc.ie')
 */
Cypress.Commands.add('loginAsStudent', (email) => {
  cy.log(`🔐 Logging in as student: ${email}`)

  const mockStudent = {
    id: 'test-student-id',
    email: email,
    name: 'Test Student',
    role: 'Student',
    photo: '',
    loginTime: new Date().toISOString(),
    provider: 'auth0'
  }

  cy.session(email, () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem('pethologyUser', JSON.stringify(mockStudent))
      }
    })
  }, {
    validate() {
      cy.window().its('sessionStorage').invoke('getItem', 'pethologyUser').should('not.be.null')
    },
    cacheAcrossSpecs: true
  })
})

/**
 * Login as teacher with whitelisted email
 * @example cy.loginAsTeacher('teacher@school.com')
 */
Cypress.Commands.add('loginAsTeacher', (email) => {
  cy.log(`🔐 Logging in as teacher: ${email}`)

  const mockTeacher = {
    id: 'test-teacher-id',
    email: email,
    name: 'Test Teacher',
    role: 'Teacher',
    photo: '',
    loginTime: new Date().toISOString(),
    provider: 'auth0'
  }

  cy.session(`teacher-${email}`, () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem('pethologyUser', JSON.stringify(mockTeacher))
      }
    })
  }, {
    validate() {
      cy.window().its('sessionStorage').invoke('getItem', 'pethologyUser').should('not.be.null')
    },
    cacheAcrossSpecs: true
  })
})

/**
 * Navigate to page and wait for load
 * @example cy.visitAndWait('/student-dashboard.html')
 */
Cypress.Commands.add('visitAndWait', (url) => {
  cy.visit(url)
  cy.wait(500) // Wait for page to settle
})

/**
 * Check if element exists and is visible
 * @example cy.shouldBeVisible('#dashboard')
 */
Cypress.Commands.add('shouldBeVisible', (selector) => {
  cy.get(selector).should('exist').should('be.visible')
})

/**
 * Fill announcement form (teacher)
 * @example cy.createAnnouncement('Title', 'Message', true)
 */
Cypress.Commands.add('createAnnouncement', (title, message, pinned = false) => {
  cy.log(`📢 Creating announcement: ${title}`)

  cy.get('#announcementTitle').type(title)
  cy.get('#announcementMessage').type(message)

  if (pinned) {
    cy.get('#announcementPinned').check()
  }

  cy.get('#announcementForm').submit()
})

/**
 * Start a quiz module
 * @example cy.startQuiz('biology')
 */
Cypress.Commands.add('startQuiz', (module) => {
  cy.log(`🎯 Starting quiz: ${module}`)

  cy.get(`[data-module="${module}"]`).click()
  cy.url().should('include', 'quiz.html')
})

/**
 * Answer quiz question
 * @example cy.answerQuestion(0)
 */
Cypress.Commands.add('answerQuestion', (optionIndex) => {
  cy.get('.option').eq(optionIndex).click()
  cy.get('.next-btn').click()
})

/**
 * Mock API response
 * @example cy.mockFirebaseAPI('announcements', [])
 */
Cypress.Commands.add('mockFirebaseAPI', (endpoint, data) => {
  cy.intercept('GET', `**/firestore.googleapis.com/**/${endpoint}*`, {
    statusCode: 200,
    body: { documents: data }
  }).as(`get${endpoint}`)
})

/**
 * Check for console errors
 * @example cy.checkNoConsoleErrors()
 */
Cypress.Commands.add('checkNoConsoleErrors', () => {
  cy.window().then((win) => {
    const errors = []
    const originalError = win.console.error

    win.console.error = (...args) => {
      errors.push(args)
      originalError.apply(win.console, args)
    }

    cy.wrap(errors).should('have.length', 0)
  })
})
