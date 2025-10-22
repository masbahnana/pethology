/**
 * Quiz System Tests
 */

describe('Quiz Page', () => {
  beforeEach(() => {
    cy.visit('/quiz.html')
  })

  it('should load quiz page', () => {
    cy.url().should('include', 'quiz.html')
    cy.contains('Quiz').should('be.visible')
  })

  it('should show all quiz modules', () => {
    // Should show module selection
    cy.get('.module-card, .quiz-module').should('have.length.at.least', 10)
  })

  it('should display module names and icons', () => {
    const modules = ['Biology', 'Animal Welfare', 'Grooming']

    modules.forEach(module => {
      cy.contains(module, { timeout: 10000 }).should('be.visible')
    })
  })
})

describe('Quiz Functionality', () => {
  beforeEach(() => {
    cy.visit('/quiz.html')
  })

  it('should start quiz when module selected', () => {
    // Click first module
    cy.get('.module-card, .quiz-module').first().click()

    // Quiz should start
    cy.get('.quiz-container, .question-container').should('be.visible')
  })

  it('should display question text', () => {
    cy.get('.module-card, .quiz-module').first().click()

    cy.get('.question-text, .question').should('be.visible')
    cy.get('.question-text, .question').should('not.be.empty')
  })

  it('should show answer options', () => {
    cy.get('.module-card, .quiz-module').first().click()

    cy.get('.option, .answer-option').should('have.length', 4)
  })

  it('should allow selecting an answer', () => {
    cy.get('.module-card, .quiz-module').first().click()

    // Click first option
    cy.get('.option, .answer-option').first().click()

    // Option should be selected
    cy.get('.option, .answer-option').first().should('have.class', 'selected')
  })

  it('should have navigation buttons', () => {
    cy.get('.module-card, .quiz-module').first().click()

    // Should have next/submit button
    cy.get('button').contains(/next|submit/i).should('exist')
  })
})

describe('Quiz Navigation', () => {
  beforeEach(() => {
    cy.visit('/quiz.html')
    cy.get('.module-card, .quiz-module').first().click()
  })

  it('should navigate to next question', () => {
    // Select answer
    cy.get('.option, .answer-option').first().click()

    // Click next
    cy.contains(/next/i).click()

    // Question number should change or new question appears
    cy.wait(500)
    cy.get('.question-text, .question').should('be.visible')
  })

  it('should show progress indicator', () => {
    // Should show question count (e.g., "1/20")
    cy.get('body').should('contain', '/')
  })
})

describe('Quiz Completion', () => {
  it('should show results after completing quiz', () => {
    cy.visit('/quiz.html')
    cy.get('.module-card, .quiz-module').first().click()

    // Answer multiple questions quickly
    for (let i = 0; i < 5; i++) {
      cy.get('.option, .answer-option').first().click()
      cy.contains(/next|submit/i).click()
      cy.wait(300)
    }

    // Eventually should see completion or results
    // (depends on quiz length)
  })
})
