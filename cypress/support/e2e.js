// ***********************************************************
// Pethology E2E Test Support File
// ***********************************************************

// Import commands
import './commands'

// Hide fetch/XHR warnings
Cypress.on('uncaught:exception', (err, runnable) => {
  // Suppress all uncaught exceptions so page-level errors don't fail tests
  return false
})

// Set default timeout
Cypress.config('defaultCommandTimeout', 10000)
Cypress.config('requestTimeout', 10000)

// Intercept every cy.visit and inject pethologyUser if loginAsStudent/Teacher was called
Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  const mockUser = Cypress.env('mockStudent')
  if (mockUser) {
    const originalOnBeforeLoad = options.onBeforeLoad
    options.onBeforeLoad = (win) => {
      win.sessionStorage.setItem('pethologyUser', JSON.stringify(mockUser))
      if (originalOnBeforeLoad) originalOnBeforeLoad(win)
    }
  }
  return originalFn(url, options)
})

// Before each test
beforeEach(() => {
  // Clear stored mock user so tests don't bleed into each other
  Cypress.env('mockStudent', null)
  // Clear storage
  cy.clearLocalStorage()
  cy.clearCookies()

  // Log test name
  cy.log(`🧪 Running: ${Cypress.currentTest.title}`)
})

// After each test
afterEach(() => {
  // Screenshot on failure (automatic)
  // Clean up if needed
})
