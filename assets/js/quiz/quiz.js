import { PethologyFirebaseService } from '../firebase-service.js';

const quizTopics = [
  { name: "Biology", file: "biology.js", icon: "assets/img/cell.png" },
  { name: "Animal Behaviour", file: "animal-behaviour.js", icon: "assets/img/animal-behaviour.png" },
  { name: "Animal Welfare", file: "animal-welfare.js", icon: "assets/img/animal-care-welfare.png" },
  { name: "Animal Anatomy and Physiology", file: "animal-anatomy.js", icon: "assets/img/animal-anatomy.png" },
  { name: "Grooming", file: "grooming.js", icon: "assets/img/grooming.png" },
  { name: "Small Animals H&H", file: "small-animals.js", icon: "assets/img/small-animals.png" },
  { name: "Word Processing", file: "word-processing.js", icon: "assets/img/word-processing.png" },
  { name: "Vet. Assistant Skills", file: "vet-assistant-skills.js", icon: "assets/img/vas.png" },
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let isAnswerCorrect = false;
let currentQuizModule = '';
let correctAnswersCount = 0;
let userAnswers = [];
let quizStartTime = null;

// Check if user is logged in
const userSession = sessionStorage.getItem('pethologyUser');
const isLoggedIn = !!userSession;
const VISITOR_QUESTION_LIMIT = 0.3; // 30% for visitors

async function loadQuiz(file, topicName) {
  try {
    console.log('🎯 Loading quiz:', topicName || file);
    const module = await import('./' + file);

    // Limit questions for visitors (30%)
    const allQuestions = module.questions;
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
    console.log(`✅ Quiz loaded! ${currentQuestions.length} questions available`);
    if (isLoggedIn) {
      console.log('💡 TIP: You can save progress anytime using "Save Progress & Exit" button');
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
  const percentage = Math.round((progress / total) * 100);

  quizContainer.innerHTML = `
    ${!isLoggedIn ? `
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
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 600; color: #374151;">Question ${progress} of ${total}</span>
        <span style="font-weight: 600; color: #3b82f6;">${percentage}&nbsp;% Complete</span>
      </div>
      <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 999px; overflow: hidden;">
        <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6); transition: width 0.3s ease;"></div>
      </div>
    </div>

    <h2>${question.question}</h2>
    <ul style="list-style: none; padding: 0;">
      ${question.options.map((opt, i) => `
        <li style="margin-bottom: 10px;">
          <button class="minimal-button answer-button" onclick="selectAnswer(${i})">${opt}</button>
        </li>
      `).join('')}
    </ul>
    <div id="feedback"></div>
    <div class="quiz-navigation" style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
      <button onclick="goBackToMenu()" class="quiz-navigation" style="background: #6b7280;">← Back to Menu</button>
      ${isLoggedIn ? `
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
        <p style="color: #047857; margin: 0; line-height: 1.6;">
          ${question.explanation}
        </p>
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
        <p style="color: #b91c1c; margin: 0 0 12px 0;">
          The correct answer is: <strong>${question.options[correct]}</strong>
        </p>
        <p style="color: #dc2626; margin: 0; line-height: 1.6;">
          ${question.explanation}
        </p>
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
      answers: userAnswers
    };

    await saveQuizToFirebase(quizData);
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
    const resultData = {
      userId: user.id,
      quizId: quizData.moduleName || 'general-quiz',
      type: 'normal',
      score: quizData.correctAnswers / quizData.totalQuestions,
      totalQuestions: quizData.totalQuestions,
      correctAnswers: quizData.correctAnswers,
      timeSpent: quizData.timeSpent || 0,
      completedAt: new Date(),
      answers: quizData.answers || []
    };

    console.log('📝 Result data:', resultData);

    // Salvar resultado
    const resultId = await PethologyFirebaseService.saveQuizResult(resultData);
    console.log('✅ Quiz result saved with ID:', resultId);

    // Atualizar progresso do estudante
    await updateStudentProgressAfterQuiz(user.id, quizData);

    console.log('✅ All data saved successfully!');

    return resultId;

  } catch (error) {
    console.error('❌ Error saving quiz to Firebase:', error);
    // Não bloquear o usuário se falhar
  }
}

// Atualizar progresso do estudante após completar quiz
async function updateStudentProgressAfterQuiz(userId, quizData) {
  try {
    console.log('📊 Updating student progress...');

    // Carregar progresso atual
    const progress = await PethologyFirebaseService.getStudentProgress(userId);

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

    if (progress.moduleProgress[moduleName]) {
      const moduleData = progress.moduleProgress[moduleName];
      console.log(`✅ Found module in progress:`, moduleData);

      // Atualizar score do módulo
      moduleData.averageScore = newScore;

      // Incrementar completion (máximo 100%)
      moduleData.completion = Math.min(100, (moduleData.completion || 0) + 10);

      // Adicionar tempo gasto
      moduleData.timeSpent = (moduleData.timeSpent || 0) + (quizData.timeSpent || 0);

      console.log(`📈 Updated ${moduleName}: ${moduleData.completion}% complete`);
    } else {
      console.warn(`⚠️ Module "${moduleName}" not found in progress.moduleProgress!`);
      console.log('Available modules:', Object.keys(progress.moduleProgress));
    }

    // Verificar achievements
    checkAndUnlockAchievements(progress);

    // Salvar progresso atualizado
    await PethologyFirebaseService.updateStudentProgress(userId, progress);

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
    alert('⚠️ You need to answer at least one question correctly before finishing.');
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

function loadQuizButtons() {
  const quizContainer = document.getElementById("quiz-buttons");
  quizContainer.innerHTML = `
    <h1></h1>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
      ${quizTopics.map(topic => `
        <button
          onclick="loadQuiz('${topic.file}', '${topic.name}')"
          class="minimal-button"
        >
          ${topic.icon ? `<img src="${topic.icon}" alt="${topic.name} icon">` : ""}
          ${topic.name}
        </button>
      `).join('')}
    </div>
  `;
}

// Auto-load quiz if module parameter is present in URL
window.onload = function() {
  // 🔒 PROTEÇÃO: Verificar se usuário está logado
  const userSession = sessionStorage.getItem('pethologyUser');

  if (!userSession) {
    console.warn('⚠️ User not logged in, redirecting to login page...');
    alert('Please log in to access the quizzes! 🔒');
    window.location.href = 'auth0-login.html';
    return;
  }

  // Verificar se é um estudante
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
    window.location.href = 'auth0-login.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const module = urlParams.get('module');

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
      'vet-assistant': { file: 'vet-assistant-skills.js', name: 'Vet. Assistant Skills' }
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

window.loadQuiz = loadQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.goBackToMenu = goBackToMenu;
window.saveProgressAndExit = saveProgressAndExit;
window.finishQuizEarly = finishQuizEarly;