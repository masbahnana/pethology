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

async function loadQuiz(file, topicName) {
  try {
    console.log('🎯 Loading quiz:', topicName || file);
    const module = await import('./' + file);
    currentQuestions = module.questions;
    currentQuestionIndex = 0;
    isAnswerCorrect = false;
    currentQuizModule = topicName || file.replace('.js', '');
    correctAnswersCount = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    console.log(`✅ Quiz loaded! ${currentQuestions.length} questions available`);
    console.log('💡 TIP: You can save progress anytime using "Save Progress & Exit" button');
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
    <!-- Progress Bar -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 600; color: #374151;">Question ${progress} of ${total}</span>
        <span style="font-weight: 600; color: #3b82f6;">${percentage}% Complete</span>
      </div>
      <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 999px; overflow: hidden;">
        <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6); transition: width 0.3s ease;"></div>
      </div>
    </div>

    <h2>${question.question}</h2>
    <ul style="list-style: none; padding: 0;">
      ${question.options.map((opt, i) => `
        <li style="margin-bottom: 10px;">
          <button class="minimal-button" onclick="selectAnswer(${i})">${opt}</button>
        </li>
      `).join('')}
    </ul>
    <div id="feedback"></div>
    <div class="quiz-navigation" style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
      <button onclick="goBackToMenu()" class="quiz-navigation" style="background: #6b7280;">← Back to Menu</button>
      <button onclick="saveProgressAndExit()" class="quiz-navigation" style="background: #f59e0b;">💾 Save Progress & Exit</button>
      <button onclick="finishQuizEarly()" class="quiz-navigation" style="background: #10b981;">✓ Finish Quiz Now</button>
    </div>
  `;
}

function selectAnswer(index) {
  const question = currentQuestions[currentQuestionIndex];
  const correct = question.answer;

  const feedbackEl = document.getElementById("feedback");

  if (index === correct) {
    isAnswerCorrect = true;
    correctAnswersCount++;
    userAnswers.push({
      question: question.question,
      selectedAnswer: index,
      correctAnswer: correct,
      isCorrect: true
    });
    console.log(`✅ Correct! Score: ${correctAnswersCount}/${currentQuestionIndex + 1}`);
    feedbackEl.innerHTML = `
      <p style="color:green;">✅<br>${question.explanation}</p>
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button class="minimal-button" onclick="goBackToMenu()">Back</button>
        <button class="minimal-button" onclick="nextQuestion()">Next</button>
      </div>
    `;
  } else {
    userAnswers.push({
      question: question.question,
      selectedAnswer: index,
      correctAnswer: correct,
      isCorrect: false
    });
    console.log(`❌ Wrong answer. Score: ${correctAnswersCount}/${currentQuestionIndex + 1}`);
    feedbackEl.innerHTML = `<p style="color:red;">Nope! ❌ Are you sure about that?</p>`;
  }
}

function nextQuestion() {
  if (!isAnswerCorrect) return;

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

  // Show completion message
  quizContainer.innerHTML = `
    <h2>Congrats, you completed our quiz! 🎉</h2>
    <p>Score: ${correctAnswersCount} / ${currentQuestions.length}</p>
    <p>Time: ${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s</p>
    <button class="minimal-button" onclick="goBackToMenu()">Back to the beginning</button>
  `;

  // Save to Firebase
  const quizData = {
    moduleName: currentQuizModule,
    totalQuestions: currentQuestions.length,
    correctAnswers: correctAnswersCount,
    timeSpent: timeSpent,
    answers: userAnswers
  };

  await saveQuizToFirebase(quizData);
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
    const moduleName = quizData.moduleName || 'biology';

    if (progress.moduleProgress[moduleName]) {
      const moduleData = progress.moduleProgress[moduleName];

      // Atualizar score do módulo
      moduleData.averageScore = newScore;

      // Incrementar completion (máximo 100%)
      moduleData.completion = Math.min(100, (moduleData.completion || 0) + 10);

      // Adicionar tempo gasto
      moduleData.timeSpent = (moduleData.timeSpent || 0) + (quizData.timeSpent || 0);
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

  alert(`✅ Progress saved!\n\n${correctAnswersCount} correct answers\nTime: ${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s\n\nYou can continue later!`);

  goBackToMenu();
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