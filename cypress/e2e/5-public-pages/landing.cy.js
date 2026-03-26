/**
 * Public Pages Tests
 */

describe('Landing Page', () => {
  beforeEach(() => cy.visit('/index.html'))

  it('loads successfully', () => {
    cy.title().should('contain', 'Pethology')
  })

  it('shows nav with correct links', () => {
    cy.get('nav').should('be.visible')
    cy.contains('About').should('be.visible')
    cy.contains('Blog').should('be.visible')
    cy.contains('Store').should('be.visible')
    cy.contains('Log in').should('be.visible')
  })

  it('shows hero section', () => {
    cy.get('.hero').should('be.visible')
    cy.contains('Pethology').should('be.visible')
  })

  it('shows footer with FAQ link', () => {
    cy.get('footer').should('contain', 'FAQ')
    cy.get('footer').should('contain', 'About')
    cy.get('footer').should('contain', 'Support')
  })

  it('interactive quiz sample works', () => {
    cy.get('.quiz-option').first().click()
    cy.get('.quiz-option').first().should('satisfy', ($el) => {
      return $el.hasClass('selected-right') || $el.hasClass('selected-wrong')
    })
  })
})

describe('About Page', () => {
  beforeEach(() => cy.visit('/about.html'))

  it('loads successfully', () => {
    cy.contains('Nana da Silva').should('be.visible')
  })

  it('has link to roadmap', () => {
    cy.contains('roadmap', { matchCase: false }).should('be.visible')
  })
})

describe('Roadmap Page', () => {
  beforeEach(() => cy.visit('/roadmap.html'))

  it('loads successfully', () => {
    cy.contains('Roadmap').should('be.visible')
  })

  it('shows timeline phases', () => {
    cy.get('.timeline-dot').should('have.length.at.least', 4)
  })
})

describe('Store Page', () => {
  beforeEach(() => cy.visit('/store.html'))

  it('loads successfully', () => {
    cy.contains('Store').should('be.visible')
  })

  it('shows product cards', () => {
    cy.get('.product-card').should('have.length.at.least', 2)
  })
})

describe('3D Anatomy Page', () => {
  beforeEach(() => cy.visit('/anatomy-3d'))

  it('loads successfully', () => {
    cy.contains('3D Anatomy').should('be.visible')
  })

  it('shows animal selector', () => {
    cy.contains('Dog').should('be.visible')
    cy.contains('Cat').should('be.visible')
  })

  it('shows structure list', () => {
    cy.get('#structuresList').should('be.visible')
    cy.get('#li-heart').should('be.visible')
    cy.get('#li-lungs').should('be.visible')
  })
})

describe('Guide Page', () => {
  beforeEach(() => cy.visit('/guide.html'))

  it('loads successfully', () => {
    cy.contains('Welcome to Pethology').should('be.visible')
  })

  it('shows both guide options', () => {
    cy.contains("I'm a Student").should('be.visible')
    cy.contains("I'm a Teacher").should('be.visible')
  })

  it('shows student guide on click', () => {
    cy.contains("I'm a Student").click()
    cy.get('#guide-students').should('have.class', 'active')
    cy.get('#guide-students').contains('Log in for the first time').should('be.visible')
  })

  it('shows teacher guide on click', () => {
    cy.contains("I'm a Teacher").click()
    cy.get('#guide-teachers').should('have.class', 'active')
    cy.get('#guide-teachers').contains('Create your first class').should('be.visible')
  })

  it('can go back from guide', () => {
    cy.contains("I'm a Student").click()
    cy.contains('← Back').click()
    cy.get('#chooseSection').should('be.visible')
  })
})

describe('FAQ Page', () => {
  beforeEach(() => cy.visit('/faq.html'))

  it('loads successfully', () => {
    cy.get('.pub-nav').should('be.visible')
  })
})

describe('Support Page', () => {
  beforeEach(() => cy.visit('/support.html'))

  it('loads successfully', () => {
    cy.contains('Support').should('be.visible')
  })
})
