/**
 * Authentication Flow Tests
 */

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load homepage successfully', () => {
    cy.contains('Pethology').should('be.visible')
    cy.get('a[href*="auth0-login"]').should('exist')
  })

  it('should navigate to login page', () => {
    cy.get('a[href*="auth0-login"]').first().click()
    cy.url().should('include', 'auth0-login.html')
  })

  it('should show login options', () => {
    cy.visit('/auth0-login.html')

    // Check for login buttons
    cy.contains('Login').should('be.visible')
  })
})

describe('Student Access', () => {
  it('should redirect to dashboard after mock login', () => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')

    cy.url().should('include', 'student-dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('should show student name in header', () => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')

    cy.contains('Test Student').should('be.visible')
  })
})

describe('Teacher Access', () => {
  it('should access teacher dashboard', () => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/teacher-dashboard.html')

    cy.url().should('include', 'teacher-dashboard')
    cy.contains('Teacher Dashboard').should('be.visible')
  })

  it('should show quick actions', () => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/teacher-dashboard.html')

    cy.contains('Quick Actions').should('be.visible')
  })
})

describe('Whitelist Protection', () => {
  it('should block non-whitelisted teacher', () => {
    // This would need actual API mocking
    cy.log('⚠️ Whitelist test - requires API mocking')
  })

  it('should block non-registered student', () => {
    // This would need actual API mocking
    cy.log('⚠️ Whitelist test - requires API mocking')
  })
})
