// Array com os temas das disciplinas e seus respectivos arquivos JS
const quizTopics = [
    { name: "Biology", file: "assets/js/biology.js" },
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

    // Carregar o arquivo JS correspondente à disciplina
    import(`./assets/js/${file}`).then(module => {
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

    // Exibir as perguntas
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        
        const questionTitle = document.createElement('h2');
        questionTitle.textContent = `Q${index + 1}: ${question.question}`;
        
        const answerOptions = document.createElement('ul');
        question.options.forEach(option => {
            const optionElement = document.createElement('li');
            optionElement.textContent = option;
            answerOptions.appendChild(optionElement);
        });

        questionElement.appendChild(questionTitle);
        questionElement.appendChild(answerOptions);
        quizContainer.appendChild(questionElement);
    });
}

// Carregar os botões ao carregar a página
window.onload = loadQuizButtons;