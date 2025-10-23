/**
 * Adaptive Quiz AI - v5.0
 * Intelligent question selection based on student performance
 * THE DIFFERENTIATOR: No competitor has this!
 */

import { PethologyFirebaseREST } from './firebase-rest.js';

/**
 * Calculate student's confidence scores per topic/module
 * @param {Array} quizHistory - Student's quiz results
 * @returns {Object} Confidence scores by module
 */
export function calculateConfidenceScores(quizHistory) {
  const moduleScores = {};

  quizHistory.forEach(result => {
    const module = result.module || result.quizId;
    const score = (result.correctAnswers / result.totalQuestions) * 100;

    if (!moduleScores[module]) {
      moduleScores[module] = {
        scores: [],
        attempts: 0,
        lastAttempt: null
      };
    }

    moduleScores[module].scores.push(score);
    moduleScores[module].attempts++;
    moduleScores[module].lastAttempt = new Date(result.completedAt);
  });

  // Calculate confidence (weighted average with recency bias)
  const confidenceScores = {};
  for (const [module, data] of Object.entries(moduleScores)) {
    const recentScores = data.scores.slice(-3); // Last 3 attempts
    const avgScore = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;

    // Confidence = average score with recency factor
    const daysSinceLastAttempt = (new Date() - data.lastAttempt) / (1000 * 60 * 60 * 24);
    const recencyFactor = Math.max(0.7, 1 - (daysSinceLastAttempt / 30)); // Decay over 30 days

    confidenceScores[module] = {
      confidence: (avgScore / 100) * recencyFactor,
      rawScore: avgScore,
      attempts: data.attempts,
      lastAttempt: data.lastAttempt,
      trend: data.scores.length >= 2 ?
        (data.scores[data.scores.length - 1] - data.scores[0]) : 0
    };
  }

  return confidenceScores;
}

/**
 * Categorize modules by confidence level
 * @param {Object} confidenceScores - Module confidence scores
 * @returns {Object} Categorized modules {weak, medium, strong}
 */
export function categorizeModules(confidenceScores) {
  const modules = Object.entries(confidenceScores).map(([module, data]) => ({
    module,
    ...data
  }));

  return {
    weak: modules.filter(m => m.confidence < 0.70).sort((a, b) => a.confidence - b.confidence),
    medium: modules.filter(m => m.confidence >= 0.70 && m.confidence < 0.85).sort((a, b) => a.confidence - b.confidence),
    strong: modules.filter(m => m.confidence >= 0.85).sort((a, b) => b.confidence - a.confidence)
  };
}

/**
 * Generate adaptive question set based on student's weak areas
 * @param {Array} allQuestions - All available questions for module
 * @param {Object} studentProfile - Student's adaptive profile
 * @param {number} targetCount - Desired number of questions (default: 15)
 * @returns {Array} Selected questions
 */
export function selectAdaptiveQuestions(allQuestions, studentProfile, targetCount = 15) {
  const { weak, medium, strong } = categorizeModules(studentProfile);

  // Distribution: 60% weak, 30% medium, 10% strong
  const weakCount = Math.ceil(targetCount * 0.60);
  const mediumCount = Math.ceil(targetCount * 0.30);
  const strongCount = targetCount - weakCount - mediumCount;

  const selectedQuestions = [];

  // Helper to get questions for topics
  function getQuestionsForTopics(topics, count) {
    const topicNames = topics.map(t => t.module);
    const filtered = allQuestions.filter(q =>
      topicNames.some(name =>
        q.module?.toLowerCase().includes(name.toLowerCase()) ||
        q.category?.toLowerCase().includes(name.toLowerCase())
      )
    );

    // Shuffle and take count
    return shuffleArray(filtered).slice(0, count);
  }

  // Select from weak topics
  if (weak.length > 0) {
    selectedQuestions.push(...getQuestionsForTopics(weak, weakCount));
  }

  // Select from medium topics
  if (medium.length > 0) {
    selectedQuestions.push(...getQuestionsForTopics(medium, mediumCount));
  }

  // Select from strong topics (reinforcement)
  if (strong.length > 0) {
    selectedQuestions.push(...getQuestionsForTopics(strong, strongCount));
  }

  // If not enough questions, fill with random
  if (selectedQuestions.length < targetCount) {
    const remaining = shuffleArray(allQuestions.filter(q =>
      !selectedQuestions.includes(q)
    )).slice(0, targetCount - selectedQuestions.length);
    selectedQuestions.push(...remaining);
  }

  return shuffleArray(selectedQuestions).slice(0, targetCount);
}

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get adaptive recommendations based on quiz results
 * @param {Array} quizResults - Results from adaptive quiz
 * @param {Object} studentProfile - Student's profile
 * @returns {Object} Recommendations
 */
export function getAdaptiveRecommendations(quizResults, studentProfile) {
  const recommendations = {
    strengths: [],
    weaknesses: [],
    focusAreas: [],
    nextSteps: []
  };

  // Analyze performance by topic
  const topicPerformance = {};
  quizResults.forEach(result => {
    const topic = result.module || result.category || 'General';
    if (!topicPerformance[topic]) {
      topicPerformance[topic] = { correct: 0, total: 0 };
    }
    topicPerformance[topic].total++;
    if (result.isCorrect) {
      topicPerformance[topic].correct++;
    }
  });

  // Identify strengths and weaknesses
  for (const [topic, perf] of Object.entries(topicPerformance)) {
    const score = (perf.correct / perf.total) * 100;

    if (score >= 80) {
      recommendations.strengths.push({
        topic,
        score,
        message: `Great job on ${topic}! Keep it up!`
      });
    } else if (score < 60) {
      recommendations.weaknesses.push({
        topic,
        score,
        message: `${topic} needs more practice`
      });
      recommendations.focusAreas.push(topic);
    }
  }

  // Generate next steps
  if (recommendations.focusAreas.length > 0) {
    recommendations.nextSteps.push({
      action: 'practice',
      topics: recommendations.focusAreas,
      message: `Focus on ${recommendations.focusAreas.join(', ')}`
    });
  }

  if (recommendations.strengths.length > 0) {
    recommendations.nextSteps.push({
      action: 'maintain',
      topics: recommendations.strengths.map(s => s.topic),
      message: 'Keep practicing your strong areas'
    });
  }

  return recommendations;
}

/**
 * Save adaptive metadata after quiz
 * @param {string} userId - Student user ID
 * @param {Object} quizData - Quiz result data
 * @param {Object} adaptiveMetadata - Adaptive session metadata
 */
export async function saveAdaptiveMetadata(userId, quizData, adaptiveMetadata) {
  try {
    // Get current progress
    const progress = await PethologyFirebaseREST.getStudentProgress(userId);

    // Initialize adaptive profile if doesn't exist
    if (!progress.adaptiveProfile) {
      progress.adaptiveProfile = {};
    }

    // Update adaptive profile
    const module = quizData.module || quizData.quizId;
    progress.adaptiveProfile[module] = {
      lastAdaptiveQuiz: new Date().toISOString(),
      questionsAttempted: (progress.adaptiveProfile[module]?.questionsAttempted || 0) + quizData.totalQuestions,
      adaptiveScore: quizData.score,
      weakTopics: adaptiveMetadata.weakTopics || [],
      strongTopics: adaptiveMetadata.strongTopics || [],
      recommendations: adaptiveMetadata.recommendations || []
    };

    // Save back to Firebase
    const updateData = {
      fields: {
        adaptiveProfile: {
          mapValue: {
            fields: Object.entries(progress.adaptiveProfile).reduce((acc, [key, val]) => {
              acc[key] = {
                mapValue: {
                  fields: {
                    lastAdaptiveQuiz: { timestampValue: val.lastAdaptiveQuiz },
                    questionsAttempted: { integerValue: val.questionsAttempted },
                    adaptiveScore: { doubleValue: val.adaptiveScore },
                    weakTopics: {
                      arrayValue: {
                        values: (val.weakTopics || []).map(t => ({ stringValue: t }))
                      }
                    },
                    strongTopics: {
                      arrayValue: {
                        values: (val.strongTopics || []).map(t => ({ stringValue: t }))
                      }
                    }
                  }
                }
              };
              return acc;
            }, {})
          }
        }
      }
    };

    await PethologyFirebaseREST.request(
      `/student_progress/${userId}?updateMask.fieldPaths=adaptiveProfile`,
      'PATCH',
      updateData
    );

    console.log('✅ Adaptive metadata saved');
  } catch (error) {
    console.error('❌ Failed to save adaptive metadata:', error);
  }
}

/**
 * Load student's adaptive profile
 * @param {string} userId - Student user ID
 * @returns {Promise<Object>} Adaptive profile
 */
export async function loadAdaptiveProfile(userId) {
  try {
    const progress = await PethologyFirebaseREST.getStudentProgress(userId);
    return progress.adaptiveProfile || {};
  } catch (error) {
    console.error('❌ Failed to load adaptive profile:', error);
    return {};
  }
}
