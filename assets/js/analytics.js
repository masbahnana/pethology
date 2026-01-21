/**
 * Google Analytics 4 Helper
 * Pethology Analytics Tracking
 * Measurement ID: G-BVVY1X67PX
 */

// Initialize dataLayer if not exists
window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

// Initialize GA4
gtag('js', new Date());
gtag('config', 'G-BVVY1X67PX', {
  send_page_view: true,
  cookie_flags: 'SameSite=None;Secure'
});

console.log('📊 Google Analytics initialized: G-BVVY1X67PX');

// Custom event helpers
window.trackEvent = function(eventName, eventParams = {}) {
  gtag('event', eventName, eventParams);
  console.log('📊 Event tracked:', eventName, eventParams);
};

// Set user properties (role: teacher/student)
window.setUserProperties = function(properties) {
  gtag('set', 'user_properties', properties);
  console.log('👤 User properties set:', properties);
};

// Track custom events
window.analytics = {
  // Login events
  login: (method, role) => {
    trackEvent('login', {
      method: method,
      user_role: role
    });
  },

  // Quiz events
  quizStart: (moduleName, quizType) => {
    trackEvent('quiz_start', {
      module: moduleName,
      quiz_type: quizType
    });
  },

  quizComplete: (moduleName, score, timeSpent) => {
    trackEvent('quiz_complete', {
      module: moduleName,
      score: score,
      time_spent: timeSpent
    });
  },

  // Custom quiz events
  customQuizCreate: (quizName) => {
    trackEvent('custom_quiz_create', {
      quiz_name: quizName
    });
  },

  // Student management
  studentImport: (count) => {
    trackEvent('student_import', {
      student_count: count
    });
  },

  // Engagement events
  achievementUnlock: (achievementName) => {
    trackEvent('achievement_unlock', {
      achievement: achievementName
    });
  },

  supportTicket: (category) => {
    trackEvent('support_ticket', {
      category: category
    });
  }
};
