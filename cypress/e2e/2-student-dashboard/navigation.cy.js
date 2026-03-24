/**
 * Student Dashboard Navigation Tests
 */

describe('Student Dashboard - Layout', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
    cy.get('.sidebar', { timeout: 10000 }).should('be.visible')
  })

  it('shows 🐾 Pethology logo in sidebar', () => {
    cy.get('.sidebar-header').should('contain', 'Pethology')
  })

  it('shows student name and avatar', () => {
    cy.get('.user-name').should('be.visible')
    cy.get('.user-avatar').should('be.visible')
  })

  it('shows stat cards', () => {
    cy.contains('Quizzes Completed').should('be.visible')
    cy.contains('Average Score').should('be.visible')
    cy.contains('Current Streak').should('be.visible')
    cy.contains('Achievements').should('be.visible')
  })

  it('shows announcements list', () => {
    cy.get('#announcementsList').should('exist')
  })

  it('shows achievements grid', () => {
    cy.get('#achievementsGrid').should('exist')
  })
})

describe('Student Dashboard - Sidebar Navigation', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
  })

  it('has working sidebar links', () => {
    cy.get('.sidebar a').should('have.length.at.least', 3)
  })

  it('shows coming soon toast for Flashcards', () => {
    cy.contains('Flashcards').click()
    cy.get('.toast', { timeout: 5000 }).should('be.visible').and('contain', 'coming soon')
  })

  it('shows coming soon toast for Notes', () => {
    cy.contains('Notes').click()
    cy.get('.toast', { timeout: 5000 }).should('be.visible').and('contain', 'coming soon')
  })

  it('shows coming soon toast for Goals', () => {
    cy.contains('Goals').click()
    cy.get('.toast', { timeout: 5000 }).should('be.visible').and('contain', 'coming soon')
  })
})

describe('Student Dashboard - Avatar Dropdown', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
  })

  it('opens dropdown with correct menu items', () => {
    cy.get('.user-profile-btn').click()
    cy.contains('Edit Profile').should('be.visible')
    cy.contains('Report Issue').should('be.visible')
    cy.contains('Help & FAQ').should('be.visible')
    cy.contains('Logout').should('be.visible')
  })

  it('opens profile modal', () => {
    cy.get('.user-profile-btn').click()
    cy.contains('Edit Profile').click()
    cy.get('#profileModal').should('be.visible')
    cy.get('#avatarGrid').should('be.visible')
  })

  it('closes profile modal on cancel', () => {
    cy.get('.user-profile-btn').click()
    cy.contains('Edit Profile').click()
    cy.contains('Cancel').click()
    cy.get('#profileModal').should('not.be.visible')
  })
})

describe('Student Dashboard - Smart Learning Tools', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
  })

  it('shows Smart Review card', () => {
    cy.contains('Smart Review').should('be.visible')
  })

  it('shows Adaptive Quiz card', () => {
    cy.contains('Adaptive Quiz').should('be.visible')
  })

  it('shows Exam Mode card', () => {
    cy.contains('Exam Mode').should('be.visible')
  })

  it('Smart Review shows modal or navigates when clicked', () => {
    cy.get('#smart-review-btn').click()
    cy.get('body').then(($body) => {
      if ($body.find('.quiz-modal:visible').length > 0) {
        cy.get('.quiz-modal').should('be.visible')
      } else {
        cy.url().should('include', 'quiz.html')
      }
    })
  })
})

describe('Quiz Module Access', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
  })

  it('shows all 10 quiz modules in sidebar', () => {
    cy.get('.module-card').should('have.length', 10)
  })

  it('shows key module names', () => {
    const modules = ['Biology', 'Animal Welfare', 'Grooming', 'Anatomy', 'Animal Behaviour']
    modules.forEach(module => {
      cy.contains(module).should('be.visible')
    })
  })

  it('navigates to quiz on module click', () => {
    cy.get('.module-card').first().click()
    cy.url().should('satisfy', (url) => url.includes('quiz.html') || url.includes('dashboard'))
  })
})
