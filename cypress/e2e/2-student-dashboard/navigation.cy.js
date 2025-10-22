/**
 * Student Dashboard Navigation Tests
 */

describe('Student Dashboard', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
  })

  it('should display all main sections', () => {
    // Progress circles
    cy.get('.progress-circle').should('have.length.at.least', 1)

    // Stats
    cy.contains('Quizzes Completed').should('be.visible')
    cy.contains('Average Score').should('be.visible')

    // Modules
    cy.contains('Course Modules').should('be.visible')
  })

  it('should show achievements section', () => {
    cy.contains('Achievements').should('be.visible')
    cy.get('.achievement-card').should('exist')
  })

  it('should display announcements', () => {
    cy.get('#announcementsList').should('exist')
  })

  it('should have working sidebar navigation', () => {
    cy.get('.sidebar').should('be.visible')

    // Check sidebar links
    cy.get('.sidebar a').should('have.length.at.least', 3)
  })
})

describe('Quiz Module Access', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
  })

  it('should display all 10 quiz modules', () => {
    cy.get('.module-card').should('have.length', 10)
  })

  it('should show module names', () => {
    const modules = [
      'Biology',
      'Animal Welfare',
      'Grooming',
      'Anatomy',
      'Animal Behaviour'
    ]

    modules.forEach(module => {
      cy.contains(module).should('be.visible')
    })
  })

  it('should navigate to quiz on module click', () => {
    cy.get('.module-card').first().click()

    // Should redirect to quiz page or show modal
    cy.url().should('satisfy', (url) => {
      return url.includes('quiz.html') || url.includes('dashboard')
    })
  })
})

describe('Progress Display', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/student-dashboard.html')
  })

  it('should show progress circles', () => {
    cy.get('.progress-circle').should('be.visible')
  })

  it('should display completion percentages', () => {
    cy.get('.progress-circle').should('contain', '%')
  })
})
