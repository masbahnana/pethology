const quizTopics = [
  { name: "Biology", file: "biology.js" }
];

let currentQuestions = [];
let currentQuestionIndex = 0;

async function loadQuiz(file) {
  try {
    // CAMINHO CORRIGIDO - Importa do diretório quiz/
    const module = await import('./' + file);
    currentQuestions = module.questions;
    currentQuestionIndex = 0;
    showQuestion();
  } catch (error) {
    console.error("ERRO FATAL:", error);
    alert("Quiz não encontrado! Verifique o console.");
  }
}

function showQuestion() {
  const quizContainer = document.getElementById("quiz-buttons");
  const question = currentQuestions[currentQuestionIndex];
  
  quizContainer.innerHTML = `
    <h2>${question.question}</h2>
    <ul>
      ${question.options.map((opt, i) => `
        <li><button onclick="selectAnswer(${i})">${opt}</button></li>
      `).join('')}
    </ul>
    <div>
      <button onclick="loadQuizButtons()">Voltar</button>
    </div>
  `;
}

function selectAnswer(index) {
  const correct = currentQuestions[currentQuestionIndex].answer;
  alert(index === correct ? "Correto!" : "Errado!");
}

function loadQuizButtons() {
  const quizContainer = document.getElementById("quiz-buttons");
  quizContainer.innerHTML = `
    
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

// Inicializa
window.onload = loadQuizButtons;
window.loadQuiz = loadQuiz;
window.selectAnswer = selectAnswer;