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
    // Find and click "New Announcement" button
    cy.contains('New Announcement').click()

    // Modal should appear
    cy.get('#announcementModal').should('be.visible')
    cy.contains('Create Announcement').should('be.visible')
  })

  it('should have announcement form fields', () => {
    cy.contains('New Announcement').click()

    // Check form fields exist
    cy.get('#announcementTitle').should('exist')
    cy.get('#announcementMessage').should('exist')
    cy.get('#announcementPinned').should('exist')
  })

  it('should close modal on cancel', () => {
    cy.contains('New Announcement').click()
    cy.get('#announcementModal').should('be.visible')

    // Close modal
    cy.contains('Cancel').click()
    cy.get('#announcementModal').should('not.be.visible')
  })

  it('should validate empty form submission', () => {
    cy.contains('New Announcement').click()

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

  it('should show announcement items with edit/delete buttons', () => {
    // If announcements exist
    cy.get('.announcement-item').first().then(($item) => {
      if ($item.length) {
        cy.wrap($item).find('[title="Edit"]').should('exist')
        cy.wrap($item).find('[title="Delete"]').should('exist')
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
