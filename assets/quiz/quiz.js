// Lista dos quizzes disponíveis com nome e caminho do arquivo
const quizTopics = [
    { name: "Biology", file: "biology.js" },
    // Você pode adicionar mais: { name: "Animal Welfare", file: "animal_welfare.js" }
  ];
  
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  
  // Carrega os botões dos quizzes disponíveis
  function loadQuizButtons() {
    const quizContainer = document.getElementById("quiz-buttons");
    quizContainer.innerHTML = "";
  
    quizTopics.forEach(topic => {
      const button = document.createElement("button");
      button.textContent = `Start ${topic.name} Quiz`;
      button.classList.add("quiz-button");
      button.onclick = () => loadQuiz(topic.file);
      quizContainer.appendChild(button);
    });
  }
  
  // Carrega o arquivo do quiz e inicializa
  async function loadQuiz(file) {
    try {
        const module = await import(`./assets/js/quiz/${file}`);
        const questions = module.questions;
        currentQuestions = questions;
        currentQuestionIndex = 0;
        displayQuiz(questions);
    } catch (error) {
        console.error("Erro ao carregar o arquivo do quiz:", error);
    }
}
  
  // Mostra a interface do quiz e a primeira pergunta
  function displayQuiz() {
    const quizContainer = document.getElementById("quiz-buttons");
    quizContainer.innerHTML = "";
  
    const container = document.createElement("div");
    container.id = "question-container";
    quizContainer.appendChild(container);
  
    showQuestion(currentQuestions, currentQuestionIndex);
  
    const navigationButtons = document.createElement("div");
    navigationButtons.classList.add("navigation-buttons");
    navigationButtons.innerHTML = `
      <button onclick="showPrevious()">Previous</button>
      <button onclick="showNext()">Next</button>
    `;
    quizContainer.appendChild(navigationButtons);
  }
  
  // Exibe uma pergunta do quiz
  function showQuestion(questions, index) {
    const container = document.getElementById("question-container");
    container.innerHTML = "";
  
    const questionData = questions[index];
  
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-container");
  
    const optionsHTML = questionData.options
      .map(option => `<li>${option}</li>`)
      .join("");
  
    questionDiv.innerHTML = `
      <h2>Question ${index + 1}: ${questionData.question}</h2>
      <ul>${optionsHTML}</ul>
      <p class="hint"><em>Click below to see the answer</em></p>
      <p id="answer" style="display: none;">Answer: ${questionData.answer}</p>
      <div class="show-answer-container">
        <button onclick="toggleAnswer()">Show Answer</button>
      </div>
    `;
  
    container.appendChild(questionDiv);
  }
  
  // Alterna visibilidade da resposta
  function toggleAnswer() {
    const answer = document.getElementById("answer");
    const hint = document.querySelector(".hint");
  
    if (answer.style.display === "none") {
      answer.style.display = "block";
      hint.style.display = "none";
    } else {
      answer.style.display = "none";
      hint.style.display = "block";
    }
  }
  
  // Navegação
  function showNext() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestions, currentQuestionIndex);
    }
  }
  
  function showPrevious() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestions, currentQuestionIndex);
    }
  }
  
  // Inicializa os botões ao carregar
  window.onload = loadQuizButtons;