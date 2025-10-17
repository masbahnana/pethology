/**
 * Pethology Achievement System
 * Gamification system to engage students with emoji-based achievements
 */

export const ACHIEVEMENTS = {
  // 📚 Learning Achievements
  first_steps: {
    id: 'first_steps',
    name: 'First Steps',
    emoji: '🎓',
    description: 'Complete your first quiz',
    condition: (stats) => stats.totalQuizzes >= 1,
    rarity: 'common',
    category: 'learning'
  },

  knowledge_seeker: {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    emoji: '📖',
    description: 'Complete 5 quizzes',
    condition: (stats) => stats.totalQuizzes >= 5,
    rarity: 'common',
    category: 'learning'
  },

  dedicated_learner: {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    emoji: '📚',
    description: 'Complete 10 quizzes',
    condition: (stats) => stats.totalQuizzes >= 10,
    rarity: 'uncommon',
    category: 'learning'
  },

  quiz_master: {
    id: 'quiz_master',
    name: 'Quiz Master',
    emoji: '👑',
    description: 'Complete 25 quizzes',
    condition: (stats) => stats.totalQuizzes >= 25,
    rarity: 'rare',
    category: 'learning'
  },

  brain_master: {
    id: 'brain_master',
    name: 'Brain Master',
    emoji: '🧠',
    description: 'Complete all 10 modules',
    condition: (stats) => stats.completedModules >= 10,
    rarity: 'legendary',
    category: 'learning'
  },

  perfect_score: {
    id: 'perfect_score',
    name: 'Perfect Score',
    emoji: '🔥',
    description: 'Score 100% on a quiz',
    condition: (stats) => stats.perfectScores >= 1,
    rarity: 'rare',
    category: 'learning'
  },

  excellence: {
    id: 'excellence',
    name: 'Excellence',
    emoji: '⭐',
    description: 'Score 90%+ on 5 quizzes',
    condition: (stats) => stats.excellentScores >= 5,
    rarity: 'rare',
    category: 'learning'
  },

  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    emoji: '💯',
    description: 'Score 100% on 3 different quizzes',
    condition: (stats) => stats.perfectScores >= 3,
    rarity: 'legendary',
    category: 'learning'
  },

  // ⚡ Consistency Achievements
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    emoji: '🌅',
    description: 'Complete 3 quizzes before noon',
    condition: (stats) => stats.morningQuizzes >= 3,
    rarity: 'uncommon',
    category: 'consistency'
  },

  streak_master: {
    id: 'streak_master',
    name: 'Streak Master',
    emoji: '🔄',
    description: 'Study for 7 consecutive days',
    condition: (stats) => stats.currentStreak >= 7,
    rarity: 'rare',
    category: 'consistency'
  },

  speed_demon: {
    id: 'speed_demon',
    name: 'Speed Demon',
    emoji: '🚀',
    description: 'Complete a quiz in under 5 minutes with 80%+',
    condition: (stats) => stats.fastAndAccurate >= 1,
    rarity: 'rare',
    category: 'consistency'
  },

  focused: {
    id: 'focused',
    name: 'Focused',
    emoji: '🎯',
    description: 'Complete 3 quizzes in the same day',
    condition: (stats) => stats.maxQuizzesInDay >= 3,
    rarity: 'uncommon',
    category: 'consistency'
  },

  // 🎯 Specialized Achievements
  animal_lover: {
    id: 'animal_lover',
    name: 'Animal Lover',
    emoji: '🐾',
    description: 'Complete all animal-related modules',
    condition: (stats) => {
      const animalModules = ['small-animals', 'animal-behaviour', 'animal-welfare'];
      return animalModules.every(mod => stats.completedModulesList?.includes(mod));
    },
    rarity: 'rare',
    category: 'specialized'
  },

  vet_pro: {
    id: 'vet_pro',
    name: 'Vet Pro',
    emoji: '⚕️',
    description: 'Complete all clinical modules',
    condition: (stats) => {
      const clinicalModules = ['vet-assistant-skills', 'anatomy', 'parasitology'];
      return clinicalModules.every(mod => stats.completedModulesList?.includes(mod));
    },
    rarity: 'rare',
    category: 'specialized'
  },

  nutrition_expert: {
    id: 'nutrition_expert',
    name: 'Nutrition Expert',
    emoji: '🥗',
    description: 'Score 90%+ on the Nutrition module',
    condition: (stats) => stats.moduleScores?.nutrition >= 90,
    rarity: 'uncommon',
    category: 'specialized'
  },

  grooming_guru: {
    id: 'grooming_guru',
    name: 'Grooming Guru',
    emoji: '✂️',
    description: 'Score 90%+ on the Grooming module',
    condition: (stats) => stats.moduleScores?.grooming >= 90,
    rarity: 'uncommon',
    category: 'specialized'
  },

  communication_pro: {
    id: 'communication_pro',
    name: 'Communication Pro',
    emoji: '💬',
    description: 'Score 90%+ on the Communications module',
    condition: (stats) => stats.moduleScores?.communications >= 90,
    rarity: 'uncommon',
    category: 'specialized'
  },

  biology_boss: {
    id: 'biology_boss',
    name: 'Biology Boss',
    emoji: '🔬',
    description: 'Score 90%+ on the Biology module',
    condition: (stats) => stats.moduleScores?.biology >= 90,
    rarity: 'uncommon',
    category: 'specialized'
  },

  // 🌟 Special Achievements
  overachiever: {
    id: 'overachiever',
    name: 'Overachiever',
    emoji: '🌟',
    description: 'Maintain 85%+ average across all quizzes',
    condition: (stats) => stats.overallAverage >= 85,
    rarity: 'rare',
    category: 'special'
  },

  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    emoji: '💪',
    description: 'Improve your score by 20% on a retake',
    condition: (stats) => stats.biggestImprovement >= 20,
    rarity: 'uncommon',
    category: 'special'
  }
};

/**
 * Check which new achievements the student has unlocked
 * @param {string} userId - Student's user ID
 * @param {Object} stats - Student's current statistics
 * @returns {Array} Array of newly unlocked achievements
 */
export function checkAchievements(userId, stats) {
  const unlockedAchievements = [];
  const currentAchievements = stats.achievements || [];

  for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
    // Skip if already unlocked
    if (currentAchievements.includes(key)) {
      continue;
    }

    // Check if condition is met
    if (achievement.condition(stats)) {
      unlockedAchievements.push(achievement);
    }
  }

  return unlockedAchievements;
}

/**
 * Show a toast notification when an achievement is unlocked
 * @param {Object} achievement - Achievement object
 */
export function showAchievementToast(achievement) {
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-content">
      <div class="achievement-emoji">${achievement.emoji}</div>
      <div class="achievement-info">
        <div class="achievement-toast-title">Achievement Unlocked!</div>
        <div class="achievement-toast-name">${achievement.name}</div>
        <div class="achievement-toast-rarity ${achievement.rarity}">${achievement.rarity.toUpperCase()}</div>
      </div>
    </div>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);

  // Auto-hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);

  // Play achievement sound (optional)
  playAchievementSound();
}

/**
 * Play achievement unlock sound
 */
function playAchievementSound() {
  // Simple beep sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    // Silent fail if audio not supported
    console.log('Audio not supported');
  }
}

/**
 * Get achievement statistics
 * @param {Array} unlockedAchievements - Array of unlocked achievement IDs
 * @returns {Object} Achievement statistics
 */
export function getAchievementStats(unlockedAchievements = []) {
  const total = Object.keys(ACHIEVEMENTS).length;
  const unlocked = unlockedAchievements.length;
  const percentage = Math.round((unlocked / total) * 100);

  const byRarity = {
    common: 0,
    uncommon: 0,
    rare: 0,
    legendary: 0
  };

  unlockedAchievements.forEach(achievementId => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (achievement) {
      byRarity[achievement.rarity]++;
    }
  });

  return {
    total,
    unlocked,
    percentage,
    byRarity
  };
}

/**
 * Get achievements grouped by category
 * @returns {Object} Achievements organized by category
 */
export function getAchievementsByCategory() {
  const categories = {
    learning: [],
    consistency: [],
    specialized: [],
    special: []
  };

  for (const achievement of Object.values(ACHIEVEMENTS)) {
    categories[achievement.category].push(achievement);
  }

  return categories;
}

/**
 * Calculate student statistics from quiz results
 * This is a helper function to transform raw quiz data into achievement-checkable stats
 * @param {Array} quizResults - Array of quiz result objects
 * @param {Object} moduleProgress - Module progress data
 * @returns {Object} Calculated statistics
 */
export function calculateStudentStats(quizResults = [], moduleProgress = {}) {
  const stats = {
    totalQuizzes: quizResults.length,
    completedModules: 0,
    completedModulesList: [],
    perfectScores: 0,
    excellentScores: 0,
    morningQuizzes: 0,
    currentStreak: 0,
    fastAndAccurate: 0,
    maxQuizzesInDay: 0,
    moduleScores: {},
    overallAverage: 0,
    biggestImprovement: 0,
    achievements: []
  };

  if (quizResults.length === 0) {
    return stats;
  }

  // Calculate module completion
  Object.entries(moduleProgress).forEach(([module, progress]) => {
    if (progress.completion >= 100) {
      stats.completedModules++;
      stats.completedModulesList.push(module);
    }
    stats.moduleScores[module] = progress.averageScore || 0;
  });

  // Analyze quiz results
  let totalScore = 0;
  const quizzesByDate = {};
  const moduleAttempts = {};

  quizResults.forEach(result => {
    const score = (result.correctAnswers / result.totalQuestions) * 100;
    totalScore += score;

    // Perfect scores
    if (score === 100) {
      stats.perfectScores++;
    }

    // Excellent scores (90%+)
    if (score >= 90) {
      stats.excellentScores++;
    }

    // Morning quizzes (before noon)
    const completedDate = new Date(result.completedAt);
    if (completedDate.getHours() < 12) {
      stats.morningQuizzes++;
    }

    // Fast and accurate (< 5 min with 80%+)
    if (result.timeSpent < 300 && score >= 80) {
      stats.fastAndAccurate++;
    }

    // Count quizzes per day
    const dateKey = completedDate.toDateString();
    quizzesByDate[dateKey] = (quizzesByDate[dateKey] || 0) + 1;

    // Track module attempts for improvement calculation
    if (!moduleAttempts[result.quizId]) {
      moduleAttempts[result.quizId] = [];
    }
    moduleAttempts[result.quizId].push(score);
  });

  // Calculate overall average
  stats.overallAverage = totalScore / quizResults.length;

  // Calculate max quizzes in a day
  stats.maxQuizzesInDay = Math.max(...Object.values(quizzesByDate), 0);

  // Calculate biggest improvement (retakes)
  Object.values(moduleAttempts).forEach(attempts => {
    if (attempts.length > 1) {
      attempts.sort((a, b) => a - b);
      const improvement = attempts[attempts.length - 1] - attempts[0];
      stats.biggestImprovement = Math.max(stats.biggestImprovement, improvement);
    }
  });

  // Calculate streak (simplified - would need date-based logic)
  // This is a placeholder - implement proper streak calculation in Firebase
  stats.currentStreak = calculateStreak(quizResults);

  return stats;
}

/**
 * Calculate study streak from quiz results
 * @param {Array} quizResults - Sorted quiz results
 * @returns {number} Current streak in days
 */
function calculateStreak(quizResults) {
  if (quizResults.length === 0) return 0;

  // Sort by date (most recent first)
  const sorted = [...quizResults].sort((a, b) =>
    new Date(b.completedAt) - new Date(a.completedAt)
  );

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const result of sorted) {
    const resultDate = new Date(result.completedAt);
    resultDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate - resultDate) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak) {
      streak++;
      currentDate = resultDate;
    } else if (daysDiff > streak) {
      break;
    }
  }

  return streak;
}

/**
 * DEBUG FUNCTION - Test achievement system manually
 * Use in browser console: testAchievementSystem()
 */
window.testAchievementSystem = async function() {
  try {
    console.log('🧪 Testing Achievement System...');

    const userSession = sessionStorage.getItem('pethologyUser');
    if (!userSession) {
      console.error('❌ No user session found. Please login first.');
      return;
    }

    const user = JSON.parse(userSession);
    console.log('👤 User:', user);

    // Import Firebase service
    const { PethologyFirebaseService } = await import('./firebase-service.js');

    // Get progress
    const progress = await PethologyFirebaseService.getStudentProgress(user.id);
    console.log('📊 Progress:', progress);

    // Get quiz history
    const quizResults = await PethologyFirebaseService.getStudentQuizHistory(user.id);
    console.log('📝 Quiz results:', quizResults);

    // Calculate stats
    const stats = calculateStudentStats(quizResults, progress.moduleProgress);
    stats.achievements = progress.achievements || [];
    console.log('📈 Stats:', stats);

    // Check achievements
    const newAchievements = checkAchievements(user.id, stats);
    console.log('🏆 New achievements available:', newAchievements);

    // Show all achievements and their status
    console.log('\n📋 ALL ACHIEVEMENTS STATUS:');
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      const unlocked = (progress.achievements || []).includes(achievement.id);
      const canUnlock = achievement.condition(stats);
      console.log(`${unlocked ? '✅' : '⬜'} ${achievement.emoji} ${achievement.name} - ${unlocked ? 'UNLOCKED' : canUnlock ? '🔓 CAN UNLOCK!' : 'Locked'}`);
    });

    return { progress, stats, newAchievements };
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};
