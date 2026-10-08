// ========================================
// MISSÃO CIENTISTA - JAVASCRIPT
// Jogo educativo de Ciências para o 6º ano
// ========================================

// Perguntas do jogo
const questions = [
  {
    question: "Qual planeta é conhecido como Planeta Vermelho?",
    answers: ["Vênus", "Marte", "Júpiter", "Saturno"],
    correct: 1,
    explanation:
      "Marte é conhecido como Planeta Vermelho por causa do óxido de ferro presente em sua superfície."
  },
  {
    question: "Qual é o processo pelo qual as plantas produzem seu próprio alimento?",
    answers: ["Respiração", "Digestão", "Fotossíntese", "Evaporação"],
    correct: 2,
    explanation:
      "Na fotossíntese, as plantas usam luz solar, água e gás carbônico para produzir açúcares e liberar oxigênio."
  },
  {
    question: "Qual destes animais é um mamífero?",
    answers: ["Tubarão", "Sapo", "Golfinho", "Galinha"],
    correct: 2,
    explanation:
      "O golfinho é um mamífero: respira por pulmões, tem sangue quente e alimenta seus filhotes com leite."
  },
  {
    question: "Em qual estado físico a água se encontra quando vira gelo?",
    answers: ["Líquido", "Gasoso", "Plasma", "Sólido"],
    correct: 3,
    explanation:
      "Quando a água congela, ela passa do estado líquido para o estado sólido."
  },
  {
    question: "Qual órgão é responsável por bombear o sangue pelo corpo?",
    answers: ["Pulmão", "Coração", "Estômago", "Cérebro"],
    correct: 1,
    explanation:
      "O coração funciona como uma bomba, impulsionando o sangue para diferentes partes do corpo."
  },
  {
    question: "Qual é a principal fonte natural de energia para a Terra?",
    answers: ["A Lua", "O vento", "O Sol", "O oceano"],
    correct: 2,
    explanation:
      "O Sol fornece luz e calor, sendo essencial para muitos processos naturais e para a vida na Terra."
  },
  {
    question: "Qual destes materiais costuma ser atraído por um ímã?",
    answers: ["Madeira", "Plástico", "Ferro", "Papel"],
    correct: 2,
    explanation:
      "O ferro é um material ferromagnético, por isso pode ser atraído por um ímã."
  },
  {
    question: "Qual gás os seres humanos precisam absorver para respirar?",
    answers: ["Gás carbônico", "Oxigênio", "Hélio", "Hidrogênio"],
    correct: 1,
    explanation:
      "O corpo utiliza o oxigênio na respiração celular para liberar energia dos nutrientes."
  },
  {
    question: "Qual atitude ajuda a preservar o meio ambiente?",
    answers: [
      "Jogar lixo nos rios",
      "Desperdiçar água",
      "Queimar lixo ao ar livre",
      "Separar materiais recicláveis"
    ],
    correct: 3,
    explanation:
      "Separar materiais recicláveis facilita o reaproveitamento de recursos e pode reduzir a quantidade de lixo enviada aos aterros."
  },
  {
    question: "O que acontece com a sombra de um objeto quando ele bloqueia a luz?",
    answers: [
      "A luz atravessa todos os objetos",
      "Forma-se uma região com menos luz",
      "O objeto desaparece",
      "A sombra produz luz própria"
    ],
    correct: 1,
    explanation:
      "A sombra se forma quando um objeto bloqueia a passagem da luz, criando uma região menos iluminada."
  }
];

// Elementos da página
const homeScreen = document.getElementById("home-screen");
const instructionsScreen = document.getElementById("instructions-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const instructionsButton = document.getElementById("instructions-button");
const backButton = document.getElementById("back-button");
const playButton = document.getElementById("play-button");
const restartButton = document.getElementById("restart-button");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const correctAnswersDisplay = document.getElementById("correct-answers");
const wrongAnswersDisplay = document.getElementById("wrong-answers");
const bestStreakDisplay = document.getElementById("best-streak");

// Estado do jogo
let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let currentStreak = 0;
let bestStreak = 0;
let answered = false;

// Troca de telas
function showScreen(screen) {
  const screens = [
    homeScreen,
    instructionsScreen,
    quizScreen,
    resultScreen
  ];

  screens.forEach((item) => {
    if (item) {
      item.classList.remove("active");
    }
  });

  if (screen) {
    screen.classList.add("active");
  }
}

// Inicia ou reinicia o jogo
function startGame() {
  currentQuestion = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  currentStreak = 0;
  bestStreak = 0;
  answered = false;

  updateScore();
  showScreen(quizScreen);
  displayQuestion();
}

// Mostra a pergunta atual
function displayQuestion() {
  const question = questions[currentQuestion];

  if (!question) {
    finishGame();
    return;
  }

  answered = false;

  questionText.textContent = question.question;
  questionNumber.textContent =
    `Pergunta ${currentQuestion + 1} de ${questions.length}`;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  answersContainer.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Ver resultado 🏆"
      : "Próxima pergunta ➜";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(index, button);
    });

    answersContainer.appendChild(button);
  });
}

// Verifica a resposta selecionada
function checkAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const answerButtons =
    answersContainer.querySelectorAll(".answer-button");

  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  const isCorrect = selectedIndex === question.correct;

  if (isCorrect) {
    score += 10;
    correctCount++;
    currentStreak++;

    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }

    selectedButton.classList.add("correct");
    feedback.textContent = `🎉 Muito bem! ${question.explanation}`;
    feedback.classList.add("correct-feedback");
  } else {
    wrongCount++;
    currentStreak = 0;

    selectedButton.classList.add("incorrect");
    answerButtons[question.correct].classList.add("correct");

    feedback.textContent =
      `Quase! A resposta correta é "${question.answers[question.correct]}". ${question.explanation}`;

    feedback.classList.add("incorrect-feedback");
  }

  updateScore();

  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  nextButton.disabled = false;
}

// Atualiza a pontuação
function updateScore() {
  scoreDisplay.textContent = score;
}

// Avança para a próxima pergunta
function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    finishGame();
  }
}

// Exibe o resultado final
function finishGame() {
  showScreen(resultScreen);

  finalScore.textContent = score;
  correctAnswersDisplay.textContent = correctCount;
  wrongAnswersDisplay.textContent = wrongCount;
  bestStreakDisplay.textContent = bestStreak;

  progressBar.style.width = "100%";

  if (correctCount === questions.length) {
    resultMessage.textContent =
      "Incrível! Você acertou todas as perguntas e se tornou um cientista nota 10! 🧪";
  } else if (correctCount >= 7) {
    resultMessage.textContent =
      "Excelente trabalho! Você demonstrou que conhece muito sobre Ciências! 🔬";
  } else if (correctCount >= 4) {
    resultMessage.textContent =
      "Muito bem! Você está aprendendo. Continue explorando o mundo da Ciência! 🌎";
  } else {
    resultMessage.textContent =
      "Toda descoberta começa com uma pergunta! Estude um pouquinho mais e tente novamente! 🚀";
  }
}

// Eventos dos botões
startButton.addEventListener("click", startGame);

instructionsButton.addEventListener("click", () => {
  showScreen(instructionsScreen);
});

backButton.addEventListener("click", () => {
  showScreen(homeScreen);
});

playButton.addEventListener("click", startGame);

nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", startGame);

// Inicialização
showScreen(homeScreen);
updateScore();
