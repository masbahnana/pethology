import { getAvailableQuizzes, showQuizSelectionModal, loadSelectedQuiz } from './quiz-selector.js';
import { calculateConfidenceScores, categorizeModules, selectAdaptiveQuestions, saveAdaptiveMetadata } from '../adaptive-quiz-ai.js';
import { PethologyFirebaseREST } from '../firebase-rest.js';

const quizTopics = [
  { name: "Animal Anatomy and Physiology", file: "animal-anatomy.js", icon: "assets/img/animal-anatomy.png" },
  { name: "Animal Welfare", file: "animal-welfare.js", icon: "assets/img/animal-care-welfare.png" },
  { name: "Communications", file: "communications.js", icon: "assets/img/cell.png" },
  { name: "Work Experience", file: "work-experience.js", icon: "assets/img/cell.png" },
  { name: "Vet. Assistant Skills", file: "vet-assistant-skills.js", icon: "assets/img/vas.png" },
  { name: "Small Animals H&H", file: "small-animals.js", icon: "assets/img/small-animals.png" },
  { name: "Biology", file: "biology.js", icon: "assets/img/cell.png" },
  { name: "Grooming", file: "grooming.js", icon: "assets/img/grooming.png" },
  { name: "Animal Behaviour", file: "animal-behaviour.js", icon: "assets/img/animal-behaviour.png" },
  { name: "Word Processing", file: "word-processing.js", icon: "assets/img/word-processing.png" },
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let isAnswerCorrect = false;
let currentQuizModule = '';
let correctAnswersCount = 0;
let userAnswers = [];
let quizStartTime = null;
let isAdaptiveMode = false; // Track if in adaptive quiz mode
let adaptiveMetadata = null; // Store adaptive quiz metadata
let isExamMode = false; // Track if in exam mode
let examTimeLimit = 30 * 60; // 30 minutes in seconds
let examTimer = null; // Timer interval
let examTimeRemaining = examTimeLimit; // Remaining time in seconds

// Check if user is logged in
const userSession = sessionStorage.getItem('pethologyUser');
const isLoggedIn = !!userSession;
const VISITOR_QUESTION_LIMIT = 0.3; // 30% for visitors

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function loadQuiz(file, topicName) {
  try {
    console.log('🎯 Loading quiz:', topicName || file);
    const module = await import('./' + file);

    // Randomize questions
    let allQuestions = shuffleArray(module.questions);

    // Randomize answer options for each question
    allQuestions = allQuestions.map(q => {
      const correctAnswer = q.options[q.answer];
      const shuffledOptions = shuffleArray(q.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

      return {
        ...q,
        options: shuffledOptions,
        answer: newCorrectIndex
      };
    });

    // Limit questions for visitors (30%)
    if (!isLoggedIn) {
      const limit = Math.ceil(allQuestions.length * VISITOR_QUESTION_LIMIT);
      currentQuestions = allQuestions.slice(0, limit);
      console.log(`⚠️ Visitor mode: Limited to ${currentQuestions.length} of ${allQuestions.length} questions (${Math.round(VISITOR_QUESTION_LIMIT * 100)}%)`);
      console.log('🔒 Login to access all questions and save your progress!');
    } else {
      currentQuestions = allQuestions;
      console.log(`✅ Logged in: Full access to all ${currentQuestions.length} questions`);
    }

    currentQuestionIndex = 0;
    isAnswerCorrect = false;
    currentQuizModule = topicName || file.replace('.js', '');
    correctAnswersCount = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    console.log(`✅ Quiz loaded! ${currentQuestions.length} questions available (randomized)`);
    if (isLoggedIn) {
      console.log('💡 TIP: You can save progress anytime using "Save Progress & Exit" button');
    }
    if (isExamMode) {
      startExamTimer();
    }
    showQuestion();
  } catch (error) {
    console.error("❌ ERRO FATAL:", error);
    alert("Quiz não encontrado! Verifique o console.");
  }
}

function showQuestion() {
  const quizContainer = document.getElementById("quiz-buttons");
  const question = currentQuestions[currentQuestionIndex];
  isAnswerCorrect = false;

  const progress = currentQuestionIndex + 1;
  const total = currentQuestions.length;
  // Percentage shows how many questions have been ANSWERED (0% at start, 100% at end)
  const percentage = Math.round((currentQuestionIndex / total) * 100);

  quizContainer.innerHTML = `
    ${isAdaptiveMode ? `
    <!-- Adaptive Quiz Badge -->
    <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 24px;">🤖</span>
      <div style="flex: 1;">
        <div style="font-weight: 700; color: #1e40af; margin-bottom: 4px;">Adaptive Quiz Mode</div>
        <div style="font-size: 0.9rem; color: #2563eb;">AI-powered quiz personalized to your learning needs. Focus on your weak areas!</div>
      </div>
    </div>
    ` : !isLoggedIn ? `
    <!-- Visitor Warning Banner -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 24px;">🔒</span>
      <div style="flex: 1;">
        <div style="font-weight: 700; color: #92400e; margin-bottom: 4px;">Limited Access - Visitor Mode</div>
        <div style="font-size: 0.9rem; color: #78350f;">You're viewing ${Math.round(VISITOR_QUESTION_LIMIT * 100)}% of this quiz. <a href="auth0-login.html" style="color: #92400e; font-weight: 600; text-decoration: underline;">Login</a> to access all questions and save your progress!</div>
      </div>
    </div>
    ` : ''}

    <!-- Progress Bar -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; gap: 16px;">
        <span style="font-weight: 600; color: #374151; white-space: nowrap;">Question ${progress} of ${total}</span>
        <span style="font-weight: 600; color: #3b82f6; white-space: nowrap;">${percentage}&nbsp;% Complete</span>
      </div>
      <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 999px; overflow: hidden;">
        <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6); transition: width 0.3s ease;"></div>
      </div>
    </div>

    <h2 style="text-align: center; margin-bottom: 24px;">${question.question}</h2>
    <ul style="list-style: none; padding: 0; text-align: center;">
      ${question.options.map((opt, i) => `
        <li style="margin-bottom: 10px;">
          <button class="minimal-button answer-button" onclick="selectAnswer(${i})" style="width: 100%; text-align: center;">${opt}</button>
        </li>
      `).join('')}
    </ul>
    <div id="feedback" style="text-align: center;"></div>
    <div class="quiz-navigation" style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
      ${!isExamMode ? `<button onclick="goBackToMenu()" class="quiz-navigation" style="background: #6b7280;">← Back to Menu</button>` : ''}
      ${isLoggedIn && !isExamMode ? `
        <button onclick="saveProgressAndExit()" class="quiz-navigation" style="background: #f59e0b;">💾 Save Progress & Exit</button>
        <button onclick="finishQuizEarly()" class="quiz-navigation" style="background: #10b981;">✓ Finish Quiz Now</button>
      ` : ''}
    </div>
  `;
}

function selectAnswer(index) {
  const question = currentQuestions[currentQuestionIndex];
  const correct = question.answer;
  const feedbackEl = document.getElementById("feedback");

  // Bloquear todos os botões de resposta (uma tentativa só!)
  const answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
    btn.style.opacity = '0.6';
  });

  // Destacar a resposta clicada
  const clickedButton = answerButtons[index];
  if (clickedButton) {
    clickedButton.style.opacity = '1';
    clickedButton.style.transform = 'scale(1.02)';
  }

  // Verificar se está correto
  const isCorrect = index === correct;

  if (isCorrect) {
    // RESPOSTA CORRETA ✅
    correctAnswersCount++;
    userAnswers.push({
      question: question.question,
      selectedAnswer: index,
      correctAnswer: correct,
      isCorrect: true
    });

    console.log(`✅ Correct! Score: ${correctAnswersCount}/${currentQuestionIndex + 1}`);

    // Destacar resposta correta em verde
    clickedButton.style.background = '#10b981';
    clickedButton.style.color = 'white';
    clickedButton.style.borderColor = '#10b981';

    feedbackEl.innerHTML = `
      <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin-top: 20px;">
        <p style="color: #065f46; font-size: 1.1rem; font-weight: 600; margin: 0 0 12px 0;">
          ✅ Correct!
        </p>
        ${!isExamMode ? `
          <p style="color: #047857; margin: 0; line-height: 1.6;">
            ${question.explanation}
          </p>
        ` : ''}
      </div>
      <p style="color: #6b7280; font-size: 0.9rem; margin-top: 16px; text-align: center;">
        Moving to next question in 3 seconds... ⏱️
      </p>
    `;

    // Avançar automaticamente após 3 segundos
    setTimeout(() => {
      nextQuestion();
    }, 3000);

  } else {
    // RESPOSTA ERRADA ❌
    userAnswers.push({
      question: question.question,
      selectedAnswer: index,
      correctAnswer: correct,
      isCorrect: false
    });

    console.log(`❌ Wrong answer. Score: ${correctAnswersCount}/${currentQuestionIndex + 1}`);

    // Destacar resposta errada em vermelho
    clickedButton.style.background = '#ef4444';
    clickedButton.style.color = 'white';
    clickedButton.style.borderColor = '#ef4444';

    // Destacar resposta correta em verde
    const correctButton = answerButtons[correct];
    if (correctButton) {
      correctButton.style.background = '#10b981';
      correctButton.style.color = 'white';
      correctButton.style.borderColor = '#10b981';
      correctButton.style.opacity = '1';
    }

    feedbackEl.innerHTML = `
      <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin-top: 20px;">
        <p style="color: #991b1b; font-size: 1.1rem; font-weight: 600; margin: 0 0 12px 0;">
          ❌ Incorrect
        </p>
        ${!isExamMode ? `
          <p style="color: #b91c1c; margin: 0 0 12px 0;">
            The correct answer is: <strong>${question.options[correct]}</strong>
          </p>
          <p style="color: #dc2626; margin: 0; line-height: 1.6;">
            ${question.explanation}
          </p>
        ` : ''}
      </div>
      <p style="color: #6b7280; font-size: 0.9rem; margin-top: 16px; text-align: center;">
        Moving to next question in 3 seconds... ⏱️
      </p>
    `;

    // Avançar automaticamente após 3 segundos (mesmo errado!)
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  }
}

function nextQuestion() {
  // Avançar independente de estar certo ou errado (modo uma tentativa)
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showQuizCompleted();
  }
}

async function showQuizCompleted() {
  const quizContainer = document.getElementById("quiz-buttons");

  // Calculate time spent
  const timeSpent = quizStartTime ? Math.floor((Date.now() - quizStartTime) / 1000) : 0;
  const scorePercentage = Math.round((correctAnswersCount / currentQuestions.length) * 100);

  // Show completion message with better navigation
  quizContainer.innerHTML = `
    <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
      <h2 style="font-size: 2rem; margin-bottom: 16px; color: #111827;">Quiz Completed!</h2>

      <div style="background: #f3f4f6; border-radius: 16px; padding: 24px; margin: 24px 0;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
          <div>
            <div style="font-size: 2.5rem; font-weight: 700; color: #3b82f6;">${scorePercentage} %</div>
            <div style="color: #6b7280; font-size: 0.9rem;">Score</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: 700; color: #10b981;">${correctAnswersCount}/${currentQuestions.length}</div>
            <div style="color: #6b7280; font-size: 0.9rem;">Correct</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: 700; color: #f59e0b;">${Math.floor(timeSpent / 60)}:${String(timeSpent % 60).padStart(2, '0')}</div>
            <div style="color: #6b7280; font-size: 0.9rem;">Time</div>
          </div>
        </div>
      </div>

      ${isLoggedIn ? `
        <p style="color: #6b7280; margin-bottom: 32px;">Your progress has been saved! 💾</p>
      ` : `
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 32px;">
          <div style="font-weight: 700; color: #92400e; margin-bottom: 8px;">🔒 Want to see your full potential?</div>
          <p style="color: #78350f; margin: 0 0 16px 0; font-size: 0.95rem;">You completed ${Math.round(VISITOR_QUESTION_LIMIT * 100)}% of this quiz. Login to access all questions and track your progress!</p>
          <a href="auth0-login.html" class="minimal-button" style="background: #f59e0b; color: white; padding: 12px 24px; font-size: 1rem; font-weight: 600; text-decoration: none; display: inline-block; border-radius: 8px;">
            🚀 Login Now
          </a>
        </div>
      `}

      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px; margin: 0 auto;">
        ${isLoggedIn ? `
          <button onclick="window.location.href='student-dashboard.html'" class="minimal-button" style="background: #3b82f6; color: white; padding: 14px; font-size: 1rem; font-weight: 600;">
            🏠 Back to Dashboard
          </button>
        ` : ''}
        <button onclick="goBackToMenu()" class="minimal-button" style="background: #10b981; color: white; padding: 14px; font-size: 1rem; font-weight: 600;">
          📚 Try Another Quiz
        </button>
        <button onclick="location.reload()" class="minimal-button" style="background: #8b5cf6; color: white; padding: 14px; font-size: 1rem; font-weight: 600;">
          🔄 Retake This Quiz
        </button>
      </div>
    </div>
  `;

  // Save to Firebase (only for logged in users)
  if (isLoggedIn) {
    const quizData = {
      moduleName: currentQuizModule,
      totalQuestions: currentQuestions.length,
      correctAnswers: correctAnswersCount,
      timeSpent: timeSpent,
      answers: userAnswers,
      examMode: isExamMode
    };

    await saveQuizToFirebase(quizData);

    // Clean up exam mode
    if (isExamMode) {
      exitFullscreen();
      clearInterval(examTimer);
      isExamMode = false;
      examTimeRemaining = examTimeLimit;
    }

    // Save adaptive metadata if in adaptive mode
    if (isAdaptiveMode && adaptiveMetadata) {
      try {
        const user = JSON.parse(userSession);
        await saveAdaptiveMetadata(user.id, {
          module: 'adaptive',
          score: scorePercentage,
          totalQuestions: currentQuestions.length
        }, {
          weakTopics: adaptiveMetadata.weakTopics,
          strongTopics: adaptiveMetadata.strongTopics,
          recommendations: [] // Can add more later
        });
        console.log('✅ Adaptive metadata saved');
      } catch (error) {
        console.error('❌ Failed to save adaptive metadata:', error);
      }
    }
  } else {
    console.log('⚠️ Visitor mode: Quiz results not saved to Firebase');
  }
}

// Normalizar nome do módulo para o formato do Firebase
function normalizeModuleName(moduleName) {
  // Mapeamento de nomes legíveis para nomes do Firebase
  const moduleNameMap = {
    'Biology': 'biology',
    'Animal Welfare': 'animal-welfare',
    'Animal Behaviour': 'animal-behaviour',
    'Animal Anatomy and Physiology': 'animal-anatomy',
    'Grooming': 'grooming',
    'Small Animals H&H': 'small-animals',
    'Word Processing': 'word-processing',
    'Vet. Assistant Skills': 'vet-assistant'
  };

  // Se existe no mapa, retornar o valor mapeado
  if (moduleNameMap[moduleName]) {
    return moduleNameMap[moduleName];
  }

  // Fallback: converter para lowercase e substituir espaços por hífens
  return moduleName.toLowerCase().replace(/\s+/g, '-');
}

// Save quiz result using REST API
async function saveQuizResultREST(resultData) {
  try {
    console.log('💾 Saving quiz result with data:', {
      userId: resultData.userId,
      quizId: resultData.quizId,
      score: resultData.score
    });

    const firestoreData = {
      fields: {
        userId: { stringValue: resultData.userId },
        quizId: { stringValue: resultData.quizId },
        type: { stringValue: resultData.type },
        score: { doubleValue: resultData.score },
        totalQuestions: { integerValue: String(resultData.totalQuestions) },
        correctAnswers: { integerValue: String(resultData.correctAnswers) },
        timeSpent: { integerValue: String(resultData.timeSpent || 0) },
        completedAt: { timestampValue: resultData.completedAt.toISOString() },
        examMode: { booleanValue: resultData.examMode || false }
      }
    };

    const response = await PethologyFirebaseREST.request('/quiz_results', 'POST', firestoreData);
    console.log('✅ Quiz result saved via REST API, response:', response);
  } catch (error) {
    console.error('❌ Error saving quiz result:', error);
    throw error;
  }
}

// Get student progress using REST API
async function getStudentProgressREST(userId) {
  try {
    const response = await PethologyFirebaseREST.request(`/student_progress/${userId}`);

    if (response && response.fields) {
      return PethologyFirebaseREST.convertDocument(response);
    }

    // Return default progress if not found
    return {
      overallStats: {
        totalQuizzes: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        lastActivity: new Date()
      },
      moduleProgress: {},
      achievements: []
    };
  } catch (error) {
    console.error('❌ Error getting student progress:', error);
    return {
      overallStats: {
        totalQuizzes: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        lastActivity: new Date()
      },
      moduleProgress: {},
      achievements: []
    };
  }
}

// Update student progress using REST API
async function updateStudentProgressREST(userId, progress) {
  try {
    const firestoreData = {
      fields: {
        overallStats: {
          mapValue: {
            fields: {
              totalQuizzes: { integerValue: String(progress.overallStats.totalQuizzes || 0) },
              averageScore: { doubleValue: progress.overallStats.averageScore || 0 },
              totalTimeSpent: { integerValue: String(progress.overallStats.totalTimeSpent || 0) },
              lastActivity: { timestampValue: new Date().toISOString() }
            }
          }
        },
        moduleProgress: {
          mapValue: {
            fields: Object.fromEntries(
              Object.entries(progress.moduleProgress || {}).map(([key, val]) => [
                key,
                {
                  mapValue: {
                    fields: {
                      completion: { doubleValue: val.completion || 0 },
                      timeSpent: { integerValue: String(val.timeSpent || 0) },
                      lastAttempt: { timestampValue: new Date().toISOString() }
                    }
                  }
                }
              ])
            )
          }
        },
        achievements: {
          arrayValue: {
            values: (progress.achievements || []).map(a => ({ stringValue: a }))
          }
        }
      }
    };

    await PethologyFirebaseREST.request(`/student_progress/${userId}`, 'PATCH', firestoreData);
    console.log('✅ Student progress updated via REST API');
  } catch (error) {
    console.error('❌ Error updating student progress:', error);
    throw error;
  }
}

// Salvar resultado do quiz no Firebase
async function saveQuizToFirebase(quizData) {
  try {
    console.log('💾 Saving quiz result to Firebase...');

    const userSession = sessionStorage.getItem('pethologyUser');
    if (!userSession) {
      console.warn('⚠️ No user session, skipping save');
      return;
    }

    const user = JSON.parse(userSession);

    // Preparar dados do resultado
    const normalizedModuleName = normalizeModuleName(quizData.moduleName || 'general-quiz');

    const resultData = {
      userId: user.id,
      quizId: normalizedModuleName,
      type: 'normal',
      score: quizData.correctAnswers / quizData.totalQuestions,
      totalQuestions: quizData.totalQuestions,
      correctAnswers: quizData.correctAnswers,
      timeSpent: quizData.timeSpent || 0,
      completedAt: new Date(),
      answers: quizData.answers || []
    };

    console.log(`📝 Module normalized: "${quizData.moduleName}" → "${normalizedModuleName}"`);

    console.log('📝 Result data:', resultData);

    // Salvar resultado usando REST API
    await saveQuizResultREST(resultData);
    console.log('✅ Quiz result saved');

    const achievementResult = { success: true, newAchievements: [] };

    // Atualizar progresso do estudante
    await updateStudentProgressAfterQuiz(user.id, quizData);

    // Log new achievements if any
    if (achievementResult.newAchievements && achievementResult.newAchievements.length > 0) {
      console.log('🎉 New achievements unlocked:', achievementResult.newAchievements.map(a => a.name).join(', '));
    }

    console.log('✅ All data saved successfully!');

    return achievementResult;

  } catch (error) {
    console.error('❌ Error saving quiz to Firebase:', error);
    // Não bloquear o usuário se falhar
  }
}

// Atualizar progresso do estudante após completar quiz
async function updateStudentProgressAfterQuiz(userId, quizData) {
  try {
    console.log('📊 Updating student progress...');

    // Carregar progresso atual usando REST API
    const progress = await getStudentProgressREST(userId);

    // Atualizar stats gerais
    progress.overallStats.totalQuizzes += 1;
    progress.overallStats.totalTimeSpent += quizData.timeSpent || 0;
    progress.overallStats.lastActivity = new Date();

    // Calcular nova média
    const currentAvg = progress.overallStats.averageScore || 0;
    const totalQuizzes = progress.overallStats.totalQuizzes;
    const newScore = quizData.correctAnswers / quizData.totalQuestions;

    progress.overallStats.averageScore =
      ((currentAvg * (totalQuizzes - 1)) + newScore) / totalQuizzes;

    // Atualizar progresso do módulo específico
    const moduleName = normalizeModuleName(quizData.moduleName || 'biology');
    console.log(`🔍 Looking for module: "${moduleName}"`);

    // Se o módulo não existe, criar
    if (!progress.moduleProgress[moduleName]) {
      console.log(`✨ Creating new module progress for: "${moduleName}"`);
      progress.moduleProgress[moduleName] = {
        completion: 0,
        averageScore: 0,
        timeSpent: 0
      };
    }

    const moduleData = progress.moduleProgress[moduleName];
    console.log(`✅ Found/created module in progress:`, moduleData);

    // Atualizar score do módulo
    moduleData.averageScore = newScore;

    // Incrementar completion (máximo 100%)
    moduleData.completion = Math.min(100, (moduleData.completion || 0) + 10);

    // Adicionar tempo gasto
    moduleData.timeSpent = (moduleData.timeSpent || 0) + (quizData.timeSpent || 0);

    console.log(`📈 Updated ${moduleName}: ${moduleData.completion}% complete`);

    // Verificar achievements
    checkAndUnlockAchievements(progress);

    // Salvar progresso atualizado usando REST API
    await updateStudentProgressREST(userId, progress);

    console.log('✅ Progress updated successfully!');

  } catch (error) {
    console.error('❌ Error updating progress:', error);
  }
}

// Verificar e desbloquear achievements
function checkAndUnlockAchievements(progress) {
  const achievements = progress.achievements || [];

  // Quiz Master - 10 quizzes
  if (progress.overallStats.totalQuizzes >= 10 && !achievements.includes('quiz-master')) {
    achievements.push('quiz-master');
    showAchievementNotification('🌟 Quiz Master Unlocked!');
  }

  // Perfect Score - 100% em um quiz
  const hasPerfectScore = Object.values(progress.moduleProgress).some(m => m.averageScore >= 1);
  if (hasPerfectScore && !achievements.includes('perfect-score')) {
    achievements.push('perfect-score');
    showAchievementNotification('🎯 Perfect Score Unlocked!');
  }

  progress.achievements = achievements;
}

// Mostrar notificação de achievement
function showAchievementNotification(message) {
  // Criar notificação visual
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: slideIn 0.5s ease;
    font-weight: 600;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remover após 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// CSS para animações
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Salvar progresso parcial e sair
async function saveProgressAndExit() {
  if (correctAnswersCount === 0) {
    if (!confirm('You haven\'t answered any questions correctly yet. Are you sure you want to exit?')) {
      return;
    }
  }

  console.log('💾 Saving partial progress...');

  const timeSpent = quizStartTime ? Math.floor((Date.now() - quizStartTime) / 1000) : 0;

  const quizData = {
    moduleName: currentQuizModule,
    totalQuestions: currentQuestionIndex + 1, // Quantas você tentou
    correctAnswers: correctAnswersCount,
    timeSpent: timeSpent,
    answers: userAnswers,
    isPartial: true
  };

  await saveQuizToFirebase(quizData);

  // Show nice save confirmation screen instead of alert
  const quizContainer = document.getElementById("quiz-buttons");
  const scorePercentage = Math.round((correctAnswersCount / (currentQuestionIndex + 1)) * 100);

  quizContainer.innerHTML = `
    <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="font-size: 4rem; margin-bottom: 20px;">💾</div>
      <h2 style="font-size: 2rem; margin-bottom: 16px; color: #111827;">Progress Saved!</h2>

      <div style="background: #f3f4f6; border-radius: 16px; padding: 24px; margin: 24px 0;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px;">
          <div>
            <div style="font-size: 2rem; font-weight: 700; color: #10b981;">${correctAnswersCount}</div>
            <div style="color: #6b7280; font-size: 0.9rem;">Correct</div>
          </div>
          <div>
            <div style="font-size: 2rem; font-weight: 700; color: #3b82f6;">${currentQuestionIndex + 1}</div>
            <div style="color: #6b7280; font-size: 0.9rem;">Answered</div>
          </div>
          <div>
            <div style="font-size: 2rem; font-weight: 700; color: #f59e0b;">${Math.floor(timeSpent / 60)}:${String(timeSpent % 60).padStart(2, '0')}</div>
            <div style="color: #6b7280; font-size: 0.9rem;">Time</div>
          </div>
        </div>
      </div>

      <p style="color: #6b7280; margin-bottom: 32px;">You can continue this quiz later! 📚</p>

      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px; margin: 0 auto;">
        <button onclick="window.location.href='student-dashboard.html'" class="minimal-button" style="background: #3b82f6; color: white; padding: 14px; font-size: 1rem; font-weight: 600;">
          🏠 Back to Dashboard
        </button>
        <button onclick="goBackToMenu()" class="minimal-button" style="background: #10b981; color: white; padding: 14px; font-size: 1rem; font-weight: 600;">
          📚 Try Another Quiz
        </button>
      </div>
    </div>
  `;
}

// Finalizar quiz antecipadamente
async function finishQuizEarly() {
  if (correctAnswersCount === 0) {
    alert('You need to answer at least one question correctly before finishing.');
    return;
  }

  const confirmed = confirm(`Finish quiz now?\n\nYou answered ${correctAnswersCount} out of ${currentQuestionIndex + 1} questions correctly.\n\nThis will be saved as a completed quiz.`);

  if (!confirmed) return;

  console.log('🏁 Finishing quiz early...');

  await showQuizCompleted();
}

function goBackToMenu() {
  currentQuestions = [];
  currentQuestionIndex = 0;
  isAnswerCorrect = false;
  currentQuizModule = '';
  correctAnswersCount = 0;
  userAnswers = [];
  quizStartTime = null;
  loadQuizButtons();
}

// New function to handle quiz selection (checks for multiple quizzes)
async function handleQuizSelection(file, topicName, moduleId) {
  try {
    // Check for multiple quizzes
    const availableQuizzes = await getAvailableQuizzes(moduleId, { file, name: topicName });

    if (availableQuizzes.length > 1) {
      // Show selection modal
      console.log(`📚 Found ${availableQuizzes.length} quizzes for ${topicName}`);
      showQuizSelectionModal(availableQuizzes, (selectedQuiz) => {
        // Check if exam mode is enabled
        if (selectedQuiz.examMode) {
          isExamMode = true;
          console.log('🎯 EXAM MODE ACTIVATED - Strict rules apply!');
          initExamMode();
        }

        loadSelectedQuiz(selectedQuiz, loadQuiz, (questions, quizName) => {
          // Custom quiz loader
          currentQuestions = shuffleArray(questions.map(q => ({
            ...q,
            options: shuffleArray(q.options)
          })));
          currentQuestionIndex = 0;
          isAnswerCorrect = false;
          currentQuizModule = quizName || topicName;
          correctAnswersCount = 0;
          userAnswers = [];
          quizStartTime = Date.now();
          console.log(`✅ Custom quiz loaded! ${currentQuestions.length} questions`);
          if (isExamMode) {
            startExamTimer();
          }
          showQuestion();
        });
      });
    } else {
      // Only one quiz, load directly
      await loadQuiz(file, topicName);
    }
  } catch (error) {
    console.error('Error checking quizzes:', error);
    // Fallback to standard quiz
    await loadQuiz(file, topicName);
  }
}

function loadQuizButtons() {
  const quizContainer = document.getElementById("quiz-buttons");

  // Skip if not on quiz page (e.g., on index.html)
  if (!quizContainer) {
    console.log('ℹ️ Quiz container not found - not on quiz page');
    return;
  }

  quizContainer.innerHTML = `
    <h1></h1>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
      ${quizTopics.map((topic, index) => `
        <button
          onclick="handleQuizSelection('${topic.file}', '${topic.name}', '${getModuleId(topic.file)}')"
          class="minimal-button"
        >
          ${topic.icon ? `<img src="${topic.icon}" alt="${topic.name} icon">` : ""}
          ${topic.name}
        </button>
      `).join('')}
    </div>
  `;
}

// Helper to get module ID from file name
function getModuleId(file) {
  return file.replace('.js', '').replace('animal-', '');
}

// Auto-load quiz if module parameter is present in URL
window.onload = function() {
  // Check if user is logged in (but don't force redirect - allow visitors!)
  const userSession = sessionStorage.getItem('pethologyUser');

  if (userSession) {
    // Verificar se é um estudante (only if actually on quiz page with module parameter)
    const urlParams = new URLSearchParams(window.location.search);
    const module = urlParams.get('module') || urlParams.get('mode') || urlParams.get('customQuizId');
    
    // Only enforce role check if actually attempting to access a quiz
    if (module) {
      try {
        const user = JSON.parse(userSession);
        if (user.role && user.role !== 'Student') {
          console.warn('⚠️ Only students can access quizzes');
          alert('Only students can access quizzes! 🎓');
          window.location.href = 'index.html';
          return;
        }
        console.log('✅ User authenticated:', user.name);
      } catch (error) {
        console.error('❌ Error parsing user session:', error);
      }
    }
  } else {
    console.log('👤 Visitor mode: Access to 30% of quiz questions');
  }

  const urlParams = new URLSearchParams(window.location.search);
  const module = urlParams.get('module');
  const mode = urlParams.get('mode');
  const customQuizId = urlParams.get('customQuizId');

  // Check for adaptive mode
  if (mode === 'adaptive') {
    console.log('🤖 Adaptive Quiz Mode activated');
    loadAdaptiveQuiz();
    return;
  }

  // Check for custom quiz ID (teacher-created quiz)
  if (customQuizId) {
    console.log('📚 Custom Quiz Mode activated, ID:', customQuizId);
    loadCustomQuiz(customQuizId);
    return;
  }

  if (module) {
    // Map module names to quiz files
    const moduleMap = {
      'biology': { file: 'biology.js', name: 'Biology' },
      'animal-behaviour': { file: 'animal-behaviour.js', name: 'Animal Behaviour' },
      'animal-welfare': { file: 'animal-welfare.js', name: 'Animal Welfare' },
      'animal-anatomy': { file: 'animal-anatomy.js', name: 'Animal Anatomy and Physiology' },
      'grooming': { file: 'grooming.js', name: 'Grooming' },
      'small-animals': { file: 'small-animals.js', name: 'Small Animals H&H' },
      'word-processing': { file: 'word-processing.js', name: 'Word Processing' },
      'vet-assistant': { file: 'vet-assistant-skills.js', name: 'Vet. Assistant Skills' },
      'communications': { file: 'communications.js', name: 'Communications' },
      'work-experience': { file: 'work-experience.js', name: 'Work Experience' }
    };

    const quizInfo = moduleMap[module.toLowerCase()];
    if (quizInfo) {
      console.log(`🎯 Auto-loading quiz: ${quizInfo.name}`);
      loadQuiz(quizInfo.file, quizInfo.name);
      return;
    }
  }

  // Default: load quiz selection menu
  loadQuizButtons();
};

// Initialize user indicator in header
async function initUserIndicator() {
  const userIndicator = document.getElementById('user-indicator');
  if (!userIndicator) return;

  try {
    // Get user from session storage instead
    const userSession = sessionStorage.getItem('pethologyUser');
    const user = userSession ? JSON.parse(userSession) : null;

    if (user) {
      // User is logged in - show avatar
      const userName = user.name || user.email || 'User';
      const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

      userIndicator.style.display = 'block';
      userIndicator.innerHTML = `
        <div class="user-avatar" onclick="toggleUserDropdown()">
          ${initials}
        </div>
        <div class="user-dropdown" id="user-dropdown">
          <div class="user-dropdown-header">
            <div class="user-dropdown-name">${userName}</div>
            <div class="user-dropdown-email">${user.email || ''}</div>
          </div>
          <a href="student-dashboard.html" class="user-dropdown-item">
            🏠 Dashboard
          </a>
          <div class="user-dropdown-divider"></div>
          <div class="user-dropdown-item" onclick="logout()">
            🚪 Logout
          </div>
        </div>
      `;

      console.log('✅ User indicator initialized for:', userName);
    } else {
      // Not logged in - hide indicator
      userIndicator.style.display = 'none';
    }
  } catch (error) {
    console.error('Error initializing user indicator:', error);
    userIndicator.style.display = 'none';
  }
}

// Toggle user dropdown menu
window.toggleUserDropdown = function() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
};

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const userIndicator = document.getElementById('user-indicator');
  const dropdown = document.getElementById('user-dropdown');

  if (userIndicator && dropdown && !userIndicator.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

// Logout function
window.logout = async function() {
  try {
    // Simply clear session and redirect
    sessionStorage.removeItem('pethologyUser');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Load Custom Quiz (Teacher-created from CSV)
async function loadCustomQuiz(quizId) {
  try {
    console.log('📚 Loading custom quiz:', quizId);

    // Check if user is logged in
    if (!isLoggedIn) {
      alert('Please login to take custom quizzes');
      window.location.href = 'auth0-login.html';
      return;
    }

    // Fetch quiz from Firebase
    const response = await PethologyFirebaseREST.request(`/custom_quizzes/${quizId}`);

    if (!response.fields) {
      throw new Error('Custom quiz not found');
    }

    // Convert Firestore format to quiz format
    const quiz = PethologyFirebaseREST.convertDocument({ name: quizId, fields: response.fields });

    console.log('✅ Custom quiz loaded:', quiz.name);

    // Set quiz metadata
    currentQuizModule = quiz.module || quiz.name;

    // Convert questions from Firebase format to quiz.js format
    currentQuestions = quiz.questions.map((q, index) => ({
      question: q.question,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      answer: q.correctAnswer,
      explanation: q.explanation || '',
      id: `${quizId}_q${index}`
    }));

    // Randomize questions
    currentQuestions = shuffleArray(currentQuestions);

    // Randomize answer options for each question
    currentQuestions = currentQuestions.map(q => {
      const correctAnswer = q.options[q.answer];
      const shuffledOptions = shuffleArray(q.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

      return {
        ...q,
        options: shuffledOptions,
        answer: newCorrectIndex
      };
    });

    console.log(`✅ Custom quiz ready! ${currentQuestions.length} questions`);

    // Show deadline warning if quiz is overdue
    if (quiz.deadline) {
      const deadline = new Date(quiz.deadline);
      const now = new Date();
      if (deadline < now) {
        const daysOverdue = Math.ceil((now - deadline) / (1000 * 60 * 60 * 24));
        alert(`WARNING: This quiz is ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue!`);
      }
    }

    // Reset quiz state
    currentQuestionIndex = 0;
    isAnswerCorrect = false;
    correctAnswersCount = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    isAdaptiveMode = false;

    // Show first question
    showQuestion();

  } catch (error) {
    console.error('❌ Error loading custom quiz:', error);
    alert('Failed to load quiz. Please try again.');
    window.location.href = 'student-dashboard.html';
  }
}

// Load Adaptive Quiz
async function loadAdaptiveQuiz() {
  try {
    if (!isLoggedIn) {
      alert('Please login to use Adaptive Quiz');
      window.location.href = 'auth0-login.html';
      return;
    }

    const user = JSON.parse(userSession);
    console.log('🤖 Loading adaptive quiz for:', user.name);

    // Get quiz history
    const quizHistory = await PethologyFirebaseREST.getStudentQuizHistory(user.id);

    if (quizHistory.length === 0) {
      alert('Please complete at least one standard quiz before using Adaptive Quiz');
      window.location.href = 'quiz.html';
      return;
    }

    // Calculate confidence scores
    const confidenceScores = calculateConfidenceScores(quizHistory);
    const categorized = categorizeModules(confidenceScores);

    console.log('📊 Confidence analysis:', categorized);

    // Load ALL questions from ALL modules
    const allQuestions = [];
    for (const topic of quizTopics) {
      try {
        const module = await import('./' + topic.file);
        const questionsWithModule = module.questions.map(q => ({
          ...q,
          module: topic.file.replace('.js', ''),
          category: topic.name
        }));
        allQuestions.push(...questionsWithModule);
      } catch (error) {
        console.warn(`Could not load ${topic.file}:`, error);
      }
    }

    console.log(`📚 Loaded ${allQuestions.length} total questions from all modules`);

    // Select adaptive questions (15 questions)
    const adaptiveQuestions = selectAdaptiveQuestions(allQuestions, confidenceScores, 15);

    console.log(`✅ Selected ${adaptiveQuestions.length} adaptive questions`);

    // Randomize answer options for each question
    const processedQuestions = adaptiveQuestions.map(q => {
      const correctAnswer = q.options[q.answer];
      const shuffledOptions = shuffleArray(q.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

      return {
        ...q,
        options: shuffledOptions,
        answer: newCorrectIndex
      };
    });

    // Set up quiz
    currentQuestions = processedQuestions;
    currentQuestionIndex = 0;
    isAnswerCorrect = false;
    currentQuizModule = 'Adaptive Quiz';
    correctAnswersCount = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    isAdaptiveMode = true;

    // Store metadata for results
    adaptiveMetadata = {
      weakTopics: categorized.weak.map(t => t.module),
      mediumTopics: categorized.medium.map(t => t.module),
      strongTopics: categorized.strong.map(t => t.module),
      confidenceScores
    };

    console.log('🎯 Adaptive quiz ready!');
    showQuestion();

  } catch (error) {
    console.error('❌ Error loading adaptive quiz:', error);
    alert('Failed to load adaptive quiz. Please try again.');
    window.location.href = 'quiz.html';
  }
}

// Initialize on page load
initUserIndicator();

// ===== EXAM MODE FUNCTIONS =====

/**
 * Initialize Exam Mode UI
 */
function initExamMode() {
  console.log('🎯 Initializing Exam Mode...');

  // Enter fullscreen
  enterFullscreen();

  // Create timer UI if doesn't exist
  if (!document.getElementById('exam-timer')) {
    createExamTimerUI();
  }

  // Hide elements that shouldn't be visible in exam mode
  hideNonExamElements();

  // Disable browser back button
  history.pushState(null, null, location.href);
  window.onpopstate = function() {
    if (isExamMode) {
      history.go(1);
      alert('WARNING: You cannot navigate away during exam mode!');
    }
  };

  // Prevent tab switching (visibility API)
  let tabSwitchCount = 0;
  document.addEventListener('visibilitychange', function() {
    if (isExamMode && document.hidden) {
      tabSwitchCount++;
      console.warn(`⚠️ Tab switch detected! Count: ${tabSwitchCount}`);
      if (tabSwitchCount >= 3) {
        alert('WARNING: Excessive tab switching detected. This may result in automatic submission.');
      }
    }
  });
}

/**
 * Create timer UI element
 */
function createExamTimerUI() {
  const timerContainer = document.createElement('div');
  timerContainer.id = 'exam-timer';
  timerContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #fee2e2;
    border: 2px solid #ef4444;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 9999;
    font-weight: 600;
    font-size: 18px;
    color: #991b1b;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 150px;
    text-align: center;
  `;
  timerContainer.innerHTML = `
    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
      ⏱️ Time Remaining
    </div>
    <div id="exam-timer-display" style="font-size: 28px; font-family: 'Courier New', monospace;">
      30:00
    </div>
  `;
  document.body.appendChild(timerContainer);
}

/**
 * Start exam timer countdown
 */
function startExamTimer() {
  examTimeRemaining = examTimeLimit;
  updateTimerDisplay();

  examTimer = setInterval(() => {
    examTimeRemaining--;
    updateTimerDisplay();

    // Warning at 5 minutes
    if (examTimeRemaining === 300) {
      alert('WARNING: 5 minutes remaining!');
    }

    // Warning at 1 minute
    if (examTimeRemaining === 60) {
      alert('WARNING: 1 minute remaining!');
    }

    // Time's up!
    if (examTimeRemaining <= 0) {
      clearInterval(examTimer);
      autoSubmitExam();
    }
  }, 1000);
}

/**
 * Update timer display
 */
function updateTimerDisplay() {
  const display = document.getElementById('exam-timer-display');
  if (!display) return;

  const minutes = Math.floor(examTimeRemaining / 60);
  const seconds = examTimeRemaining % 60;
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Change color when less than 5 minutes
  const timer = document.getElementById('exam-timer');
  if (examTimeRemaining <= 300 && examTimeRemaining > 60) {
    timer.style.background = '#fed7aa';
    timer.style.borderColor = '#f97316';
    timer.style.color = '#9a3412';
  } else if (examTimeRemaining <= 60) {
    timer.style.background = '#fecaca';
    timer.style.borderColor = '#dc2626';
    timer.style.color = '#7f1d1d';
  }
}

/**
 * Auto-submit exam when time runs out
 */
async function autoSubmitExam() {
  console.log('Time is up! Auto-submitting exam...');
  alert('Time is up! Your exam will be submitted automatically.');

  // Force finish quiz
  await finishQuiz();

  exitFullscreen();
  isExamMode = false;
}

/**
 * Enter fullscreen mode
 */
function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      console.warn('Could not enter fullscreen:', err);
    });
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * Exit fullscreen mode
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Hide non-exam elements
 */
function hideNonExamElements() {
  // Hide navigation, footer, etc.
  const elementsToHide = [
    document.querySelector('nav'),
    document.querySelector('footer'),
    document.querySelector('.hamburger-menu')
  ];

  elementsToHide.forEach(el => {
    if (el) {
      el.style.display = 'none';
      el.dataset.hiddenByExam = 'true';
    }
  });
}

window.loadQuiz = loadQuiz;
window.handleQuizSelection = handleQuizSelection;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.goBackToMenu = goBackToMenu;
window.saveProgressAndExit = saveProgressAndExit;
window.finishQuizEarly = finishQuizEarly;
window.loadAdaptiveQuiz = loadAdaptiveQuiz;