const quizTopics = [
  { name: "Biology", file: "biology.js" },
  // Adicione mais quizzes aqui
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

function loadQuizButtons() {
  const quizContainer = document.getElementById("quiz-buttons");
  quizContainer.innerHTML = "<h1>Select a Quiz</h1>";
  
  quizTopics.forEach(topic => {
      const button = document.createElement("button");
      button.textContent = topic.name;
      button.classList.add("quiz-button");
      button.onclick = () => loadQuiz(topic.file);
      quizContainer.appendChild(button);
  });
}

async function loadQuiz(file) {
  try {
      const module = await import(`./assets/js/quiz/${file}`)
      currentQuestions = module.questions;
      currentQuestionIndex = 0;
      score = 0;
      displayQuiz();
  } catch (error) {
      console.error("Error loading quiz:", error);
      alert("Failed to load quiz. Please try again.");
  }
}

function displayQuiz() {
  const quizContainer = document.getElementById("quiz-buttons");
  quizContainer.innerHTML = "";
  
  const container = document.createElement("div");
  container.id = "question-container";
  quizContainer.appendChild(container);
  
  showQuestion();
  
  const navButtons = document.createElement("div");
  navButtons.className = "navigation-buttons";
  navButtons.innerHTML = `
      <button onclick="showPrevious()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>Previous</button>
      <button onclick="showNext()">${currentQuestionIndex === currentQuestions.length - 1 ? 'Finish' : 'Next'}</button>
  `;
  quizContainer.appendChild(navButtons);
}

function showQuestion() {
  startTimer();
  const question = currentQuestions[currentQuestionIndex];
  const container = document.getElementById("question-container");
  
  container.innerHTML = `
      <div id="timer">Time left: ${timeLeft}s</div>
      <h2>Question ${currentQuestionIndex + 1}/${currentQuestions.length}</h2>
      <p>Score: ${score}/${currentQuestions.length}</p>
      <div class="question">${question.question}</div>
      <ul class="options">
          ${question.options.map((opt, i) => `
              <li><button onclick="selectAnswer(${i})">${opt}</button></li>
          `).join("")}
      </ul>
      ${question.explanation ? `
          <div class="explanation" style="display:none;">
              <strong>Explanation:</strong> ${question.explanation}
          </div>
      ` : ''}
  `;
}

function selectAnswer(selectedIndex) {
  clearInterval(timer);
  const question = currentQuestions[currentQuestionIndex];
  const explanation = document.querySelector(".explanation");
  
  if (selectedIndex === question.answer) {
      score++;
      alert("Correct! 🎉");
  } else {
      alert(`Incorrect! The correct answer was: ${question.options[question.answer]}`);
  }
  
  if (explanation) {
      explanation.style.display = "block";
  }
  
  // Auto-avança após 3 segundos
  setTimeout(showNext, 3000);
}

// Funções de navegação e timer (como mostrado acima)
// ... restante do código ...

window.onload = loadQuizButtons;