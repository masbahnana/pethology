/**
 * Quiz System Tests
 */

describe('Quiz Page - Nav', () => {
  it('shows Login button when not logged in', () => {
    cy.visit('/quiz.html')
    cy.get('#nav-user-area').should('contain', 'Log in')
  })

  it('shows Dashboard button when logged in', () => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/quiz.html')
    cy.get('#nav-user-area').should('contain', 'Dashboard')
    cy.get('#nav-user-area').should('not.contain', 'Log in')
  })
})

describe('Quiz Page - Module Selection', () => {
  beforeEach(() => {
    cy.visit('/quiz.html')
  })

  it('loads the quiz page', () => {
    cy.url().should('include', 'quiz')
  })

  it('shows 10 module cards', () => {
    cy.get('[onclick*="handleQuizSelection"]', { timeout: 10000 }).should('have.length.at.least', 10)
  })

  it('shows module names', () => {
    const modules = ['Biology', 'Animal Welfare', 'Grooming', 'Animal Anatomy']
    modules.forEach(module => {
      cy.contains(module, { timeout: 10000 }).should('be.visible')
    })
  })
})

describe('Quiz Functionality - Visitor', () => {
  beforeEach(() => {
    cy.visit('/quiz.html')
    cy.get('[onclick*="handleQuizSelection"]', { timeout: 15000 }).first().click()
  })

  it('shows question text', () => {
    cy.get('body').should('contain.text', '?')
  })

  it('shows 4 answer options', () => {
    cy.get('.answer-button', { timeout: 10000 }).should('have.length.at.least', 4)
  })

  it('shows progress indicator', () => {
    cy.contains(/Question \d+ of \d+/).should('be.visible')
  })
})

describe('Quiz Functionality - Logged In', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/quiz.html')
    cy.get('[onclick*="handleQuizSelection"]', { timeout: 10000 }).first().click()
  })

  it('shows all questions (not limited to 30%)', () => {
    cy.contains(/Question 1 of (\d+)/).invoke('text').then((text) => {
      const total = parseInt(text.match(/of (\d+)/)[1])
      expect(total).to.be.greaterThan(10)
    })
  })

  it('can answer a question and advance', () => {
    cy.get('.answer-button').first().click()
    cy.wait(600) // wait for next question
    cy.contains(/Question \d+ of \d+/).should('be.visible')
  })
})

describe('Exam Mode', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/quiz.html?module=biology&examMode=true')
    cy.get('.answer-button', { timeout: 15000 }).should('have.length.at.least', 1)
  })

  it('shows exam mode banner', () => {
    cy.contains('Exam Mode Active', { timeout: 10000 }).should('be.visible')
  })

  it('shows timer', () => {
    cy.contains('Time Remaining', { timeout: 10000 }).should('be.visible')
  })

  it('does not show "Practice your Wisdom" heading', () => {
    cy.get('h1').should('not.be.visible')
  })
})

describe('Smart Review Mode', () => {
  beforeEach(() => {
    cy.loginAsStudent('test@plc.ie')
    cy.visit('/quiz.html?module=biology&smartReview=true&moduleName=Biology')
    cy.get('.answer-button', { timeout: 15000 }).should('have.length.at.least', 1)
  })

  it('shows Smart Review banner', () => {
    cy.contains('Smart Review', { timeout: 10000 }).should('be.visible')
    cy.contains('Biology', { timeout: 10000 }).should('be.visible')
  })
})
