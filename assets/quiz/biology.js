// Array com os temas das disciplinas e seus respectivos arquivos JS
export const questions = [
    {
        question: "What is the powerhouse of the cell?",
        answer: "Mitochondria"
    },
    {
        question: "What is the function of red blood cells?",
        answer: "Transport oxygen throughout the body."
    },
    {
        question: "Which organ produces insulin?",
        answer: "Pancreas"
    }
  ];

// Função para carregar os botões de cada disciplina
function loadQuizButtons() {
    const quizContainer = document.getElementById('quiz-buttons');
    quizContainer.innerHTML = ''; // Limpa os botões anteriores

    quizTopics.forEach(topic => {
        const button = document.createElement('button');
        button.textContent = `Start ${topic.name} Quiz`;
        button.classList.add('quiz-button');
        button.onclick = function() {
            loadQuiz(topic.file); // Chama a função para carregar o quiz da disciplina
        };
        quizContainer.appendChild(button);
    });
}

// Função para carregar as perguntas do quiz de cada disciplina
function loadQuiz(file) {
    // Exemplo de como carregar as perguntas dos arquivos JS
    // O arquivo JS deve exportar um array de perguntas

    import(`./assets/js/quiz/biology.js${file}`).then(module => {
        const questions = module.questions; // Supondo que cada arquivo tenha um array 'questions'
        displayQuiz(questions); // Função para exibir as perguntas na página
    }).catch(error => {
        console.error("Erro ao carregar o arquivo do quiz:", error);
    });
}

// Função para exibir as perguntas no HTML
function displayQuiz(questions) {
    const quizContainer = document.getElementById('quiz-buttons');
    quizContainer.innerHTML = ''; // Limpa o conteúdo dos botões e da página de quiz

    const container = document.createElement('div');
    container.id = "question-container";
    quizContainer.appendChild(container);

    // Exibir a primeira pergunta
    showQuestion(questions, 0);

    // Adicionar botões para navegação
    const navigationButtons = document.createElement('div');
    navigationButtons.classList.add('navigation-buttons');
    navigationButtons.innerHTML = `
        <button onclick="showPrevious(questions)">Previous</button>
        <button onclick="showNext(questions)">Next</button>
    `;
    quizContainer.appendChild(navigationButtons);
}

// Função para exibir uma pergunta
function showQuestion(questions, index) {
    const container = document.getElementById("question-container");
    if (!container) {
        console.log("Container not found!");
    }

    container.innerHTML = ""; // Limpa a pergunta anterior

    const questionData = questions[index];
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-container");

    questionDiv.innerHTML = `
        <h2>Question ${index + 1}: ${questionData.question}</h2>
        <p class="hint"><em>Click below to see the answer</em></p>
        <p id="answer" style="display: none;">${questionData.answer}</p>
        <div class="show-answer-container">
            <button onclick="toggleAnswer()">Show Answer</button>
        </div>
    `;

    container.appendChild(questionDiv);
}

// Função para mostrar/ocultar a resposta
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

// Função para mostrar a próxima pergunta
function showNext(questions) {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions, currentQuestionIndex);
    }
}

// Função para mostrar a pergunta anterior
function showPrevious(questions) {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions, currentQuestionIndex);
    }
}

// Carregar os botões ao carregar a página
window.onload = loadQuizButtons;