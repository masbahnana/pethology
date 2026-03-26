/**
 * Teacher Announcements Tests
 */

describe('Teacher Announcements', () => {
  beforeEach(() => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/teacher-dashboard.html')
  })

  it('should have announcements section', () => {
    cy.contains('Announcements').should('be.visible')
  })

  it('should open create announcement modal', () => {
    cy.contains('Create Announcement').click()

    // Modal should appear
    cy.get('#announcementModal').should('be.visible')
  })

  it('should have announcement form fields', () => {
    cy.contains('Create Announcement').click()

    // Check form fields exist
    cy.get('#announcementTitle').should('exist')
    cy.get('#announcementMessage').should('exist')
    cy.get('#announcementPinned').should('exist')
  })

  it('should close modal on cancel', () => {
    cy.contains('Create Announcement').click()
    cy.get('#announcementModal').should('be.visible')

    // Close modal
    cy.contains('Cancel').click()
    cy.get('#announcementModal').should('not.be.visible')
  })

  it('should validate empty form submission', () => {
    cy.contains('Create Announcement').click()

    // Try to submit empty form
    cy.get('#announcementForm').submit()

    // Should show validation error or prevent submission
    cy.get('#announcementModal').should('be.visible')
  })
})

describe('Announcement List', () => {
  beforeEach(() => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/teacher-dashboard.html')
  })

  it('should display announcements list container', () => {
    cy.get('#announcementsListContainer').should('exist')
  })

  it('should show empty state if no announcements', () => {
    // If empty, should show message
    cy.get('#announcementsListContainer').then(($container) => {
      if (!$container.find('.announcement-item').length) {
        cy.contains('No announcements yet').should('be.visible')
      }
    })
  })

  it('should show announcement items with edit/delete buttons if any exist', () => {
    cy.get('#announcementsListContainer').then(($container) => {
      const items = $container.find('.announcement-item')
      if (items.length) {
        cy.wrap(items.first()).find('[title="Edit"]').should('exist')
        cy.wrap(items.first()).find('[title="Delete"]').should('exist')
      } else {
        cy.log('No announcements to check — skipping edit/delete assertion')
      }
    })
  })
})

describe('Quick Actions', () => {
  beforeEach(() => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/teacher-dashboard.html')
  })

  it('should display quick actions grid', () => {
    cy.get('.quick-actions').should('be.visible')
  })

  it('should have multiple action items', () => {
    cy.get('.quick-action-item').should('have.length.at.least', 4)
  })

  it('should show icons for each action', () => {
    cy.get('.quick-action-icon').should('have.length.at.least', 4)
  })
})

describe('Teacher Settings Modal', () => {
  beforeEach(() => {
    cy.loginAsTeacher('teacher@school.com')
    cy.visit('/teacher-dashboard.html')
  })

  it('opens settings modal from Quick Actions', () => {
    cy.contains('Settings').click({ force: true })
    cy.get('#teacherSettingsModal').should('be.visible')
  })

  it('settings modal has profile fields', () => {
    cy.contains('Settings').click({ force: true })
    cy.get('#ts-displayName').should('exist')
    cy.get('#ts-contactEmail').should('exist')
    cy.get('#ts-notifyOnQuiz').should('exist')
  })

  it('closes settings modal on cancel', () => {
    cy.contains('Settings').click({ force: true })
    cy.get('#teacherSettingsModal').should('be.visible')
    cy.get('#teacherSettingsModal').contains('Cancel').click()
    cy.get('#teacherSettingsModal').should('not.be.visible')
  })

  it('shows Roadmap & Feedback in help dropdown', () => {
    cy.get('.help-dropdown-toggle').click({ force: true })
    cy.contains('Roadmap & Feedback').should('be.visible')
  })
})
