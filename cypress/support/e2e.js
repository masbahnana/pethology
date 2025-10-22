// ***********************************************************
// Pethology E2E Test Support File
// ***********************************************************

// Import commands
import './commands'

// Hide fetch/XHR warnings
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore Firebase/Auth0 errors that don't affect tests
  if (err.message.includes('Firebase') ||
      err.message.includes('auth0') ||
      err.message.includes('ResizeObserver')) {
    return false
  }
  // Let other errors fail the test
  return true
})

// Set default timeout
Cypress.config('defaultCommandTimeout', 10000)
Cypress.config('requestTimeout', 10000)

// Before each test
beforeEach(() => {
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
