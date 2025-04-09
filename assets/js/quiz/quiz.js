const quizTopics = [
  { name: "Biology", file: "biology.js" }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let isAnswerCorrect = false; // Novo controle

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
    <ul>
      ${question.options.map((opt, i) => `
        <li><button class="quiz-button" onclick="selectAnswer(${i})">${opt}</button></li>
      `).join('')}
    </ul>
    <div id="feedback"></div>
    <div>
      <button onclick="loadQuizButtons()" class="quiz-navigation">Back</button>
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
      <p style="color:green;">You Did it! ✅<br>${question.explanation}</p>
      <button onclick="nextQuestion() class="quiz-navigation">Next</button>
    `;
  } else {
    feedbackEl.innerHTML = `<p style="color:red;">Nope! ❌ Are you sure about that?.</p>`;
  }
}

function nextQuestion() {
  if (!isAnswerCorrect) return; // Segurança

  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz-buttons").innerHTML = `
      <h2>Congrats, you completed our quiz! 🎉</h2>
      <button onclick="loadQuizButtons()" class="quiz-navigation">Back to the beggining</button>
    `;
  }
}

function loadQuizButtons() {
  const quizContainer = document.getElementById("quiz-buttons");
  quizContainer.innerHTML = `
    <h1></h1>
    ${quizTopics.map(topic => `
      <button 
        onclick="loadQuiz('${topic.file}')"
        class="quiz-button"
      >
        ${topic.name}
      </button>
    `).join('')}
  `;
}

window.onload = loadQuizButtons;
window.loadQuiz = loadQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;