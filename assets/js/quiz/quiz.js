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

async function loadQuiz(file) {
  try {
    const module = await import('./' + file);
    currentQuestions = module.questions;
    currentQuestionIndex = 0;
    isAnswerCorrect = false;
    showQuestion();
  } catch (error) {
    console.error("ERRO FATAL:", error);
    alert("Quiz não encontrado! Verifique o console.");
  }
}

function showQuestion() {
  const quizContainer = document.getElementById("quiz-buttons");
  const question = currentQuestions[currentQuestionIndex];
  isAnswerCorrect = false;

  quizContainer.innerHTML = `
    <h2>${question.question}</h2>
    <ul style="list-style: none; padding: 0;">
      ${question.options.map((opt, i) => `
        <li style="margin-bottom: 10px;">
          <button class="minimal-button" onclick="selectAnswer(${i})">${opt}</button>
        </li>
      `).join('')}
    </ul>
    <div id="feedback"></div>
    <div class="quiz-navigation">
      <button onclick="goBackToMenu()" class="quiz-navigation">Back</button>
    </div>
  `;
}

function selectAnswer(index) {
  const question = currentQuestions[currentQuestionIndex];
  const correct = question.answer;

  const feedbackEl = document.getElementById("feedback");

  if (index === correct) {
    isAnswerCorrect = true;
    feedbackEl.innerHTML = `
      <p style="color:green;">✅<br>${question.explanation}</p>
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button class="minimal-button" onclick="goBackToMenu()">Back</button>
        <button class="minimal-button" onclick="nextQuestion()">Next</button>
      </div>
    `;
  } else {
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

function showQuizCompleted() {
  const quizContainer = document.getElementById("quiz-buttons");
  quizContainer.innerHTML = `
    <h2>Congrats, you completed our quiz! 🎉</h2>
    <button class="minimal-button" onclick="goBackToMenu()">Back to the beginning</button>
  `;
}

function goBackToMenu() {
  currentQuestions = [];
  currentQuestionIndex = 0;
  isAnswerCorrect = false;
  loadQuizButtons();
}

function loadQuizButtons() {
  const quizContainer = document.getElementById("quiz-buttons");
  quizContainer.innerHTML = `
    <h1></h1>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
      ${quizTopics.map(topic => `
        <button 
          onclick="loadQuiz('${topic.file}')"
          class="minimal-button"
        >
          ${topic.icon ? `<img src="${topic.icon}" alt="${topic.name} icon">` : ""}
          ${topic.name}
        </button>
      `).join('')}
    </div>
  `;
}

window.onload = loadQuizButtons;
window.loadQuiz = loadQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.goBackToMenu = goBackToMenu;