/**
 * Class Management Tests
 */

describe('Class Management Page', () => {
  beforeEach(() => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/class-management.html')
  })

  it('loads class management page', () => {
    cy.contains('Class Management').should('be.visible')
  })

  it('has class selector dropdown', () => {
    cy.get('#classSelect').should('exist')
  })

  it('has Export Grades button', () => {
    cy.contains('Export Grades').should('be.visible')
  })

  it('has Archive Class button', () => {
    cy.contains('Archive Class').should('be.visible')
  })

  it('has Archived Classes section', () => {
    cy.contains('Archived Classes').should('exist')
  })

  it('toggles archived classes section', () => {
    cy.contains('Archived Classes').click()
    cy.get('#archivedSection').should('be.visible')
  })

  it('has students table', () => {
    cy.get('#studentsTableContainer').should('exist')
  })

  it('has search and filter controls', () => {
    cy.get('#searchInput').should('exist')
  })
})

describe('Archive Class Modal', () => {
  beforeEach(() => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/class-management.html')
  })

  it('opens archive confirmation modal', () => {
    cy.contains('Archive Class').click()
    cy.get('#archiveClassModal').should('be.visible')
  })

  it('archive modal explains what archiving does', () => {
    cy.contains('Archive Class').click()
    cy.get('#archiveClassModal').within(() => {
      cy.contains('Preserve').should('exist')
    })
  })

  it('closes archive modal on cancel', () => {
    cy.contains('Archive Class').click()
    cy.get('#archiveClassModal').should('be.visible')
    cy.get('#archiveClassModal').contains('Cancel').click()
    cy.get('#archiveClassModal').should('not.be.visible')
  })
})
