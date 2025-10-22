const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5500',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,

    // Retry failed tests
    retries: {
      runMode: 2,
      openMode: 0
    },

    // Setup before tests
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Test files pattern
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Support file
    supportFile: 'cypress/support/e2e.js',

    // Environment variables
    env: {
      // Add test credentials here (NOT in git)
      TEST_STUDENT_EMAIL: 'test.student@plc.ie',
      TEST_TEACHER_EMAIL: 'test.teacher@school.com'
    }
  },

  component: {
    devServer: {
      framework: 'vanilla',
      bundler: 'vite'
    }
  }
})
