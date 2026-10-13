document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // TELAS
  const homeScreen = $("home-screen");
  const instructionsScreen = $("instructions-screen");
  const quizScreen = $("quiz-screen");
  const resultScreen = $("result-screen");

  // BOTÕES
  const startButton = $("start-button");
  const instructionsButton = $("instructions-button");
  const backButton = $("back-button");
  const playButton = $("play-button");
  const nextButton = $("next-button");
  const restartButton = $("restart-button");
  const reviewButton = $("review-button");
  const soundToggle = $("sound-toggle");

  // ELEMENTOS DO QUIZ
  const questionNumber = $("question-number");
  const scoreElement = $("score");
  const progressBar = $("progress-bar");
  const progressTrack = $("progress-track");
  const questionText = $("question-text");
  const answersContainer = $("answers-container");
  const categorySymbol = $("category-symbol");
  const categoryLabel = $("category-label");
  const feedback = $("feedback");
  const feedbackSymbol = $("feedback-symbol");
  const feedbackTitle = $("feedback-title");
  const feedbackText = $("feedback-text");
  const streakLabel = $("streak-label");
  const statusLabel = $("status-label");
  const sidebarQuestion = $("sidebar-question");

  // ELEMENTOS DO RESULTADO
  const finalScore = $("final-score");
  const resultTitle = $("result-title");
  const resultMessage = $("result-message");
  const correctAnswers = $("correct-answers");
  const wrongAnswers = $("wrong-answers");
  const bestStreak = $("best-streak");
  const rankLabel = $("rank-label");
  const resultSeal = $("result-seal");
  const reviewPanel = $("review-panel");
  const reviewArrow = $("review-arrow");

  // PERGUNTAS
  const questions = [
    {
      category: "ASTRONOMIA",
      icon: "☀️",
      question: "Qual estrela é a principal fonte de luz e calor da Terra?",
      answers: [
        "A Lua",
        "O Sol",
        "Marte",
        "Júpiter"
      ],
      correct: 1,
      explanation:
        "O Sol é uma estrela que fornece luz e energia para a Terra. Sua energia é fundamental para a vida no nosso planeta."
    },
    {
      category: "CORPO HUMANO",
      icon: "❤️",
      question: "Qual órgão bombeia o sangue para o corpo?",
      answers: [
        "O pulmão",
        "O estômago",
        "O coração",
        "O cérebro"
      ],
      correct: 2,
      explanation:
        "O coração funciona como uma bomba, impulsionando o sangue que transporta oxigênio e nutrientes pelo corpo."
    },
    {
      category: "BOTÂNICA",
      icon: "🌱",
      question: "Qual é uma das principais funções das raízes de uma planta?",
      answers: [
        "Absorver água e sais minerais do solo",
        "Produzir luz",
        "Espalhar sementes pelo vento",
        "Transformar pedras em alimento"
      ],
      correct: 0,
      explanation:
        "As raízes ajudam a fixar a planta no solo e absorvem água e sais minerais importantes para seu desenvolvimento."
    },
    {
      category: "MEIO AMBIENTE",
      icon: "♻️",
      question: "Qual atitude ajuda a diminuir a quantidade de lixo no ambiente?",
      answers: [
        "Jogar resíduos nos rios",
        "Queimar todo o lixo",
        "Usar descartáveis sem necessidade",
        "Separar materiais para reciclagem"
      ],
      correct: 3,
      explanation:
        "A reciclagem permite reaproveitar materiais e pode reduzir a quantidade de resíduos enviados aos aterros."
    },
    {
      category: "ESTADOS FÍSICOS",
      icon: "🧊",
      question: "Quando o gelo derrete e vira água líquida, ocorre qual transformação?",
      answers: [
        "Evaporação",
        "Fusão",
        "Condensação",
        "Solidificação"
      ],
      correct: 1,
      explanation:
        "A fusão acontece quando uma substância passa do estado sólido para o líquido, como ocorre com o gelo ao derreter."
    },
    {
      category: "SERES VIVOS",
      icon: "🌿",
      question: "Por que muitas plantas são chamadas de produtoras?",
      answers: [
        "Porque se alimentam de outros animais",
        "Porque vivem somente na água",
        "Porque produzem seu próprio alimento por fotossíntese",
        "Porque não precisam de energia"
      ],
      correct: 2,
      explanation:
        "Na fotossíntese, as plantas usam energia luminosa para produzir açúcares a partir de água e gás carbônico."
    },
    {
      category: "PLANETA TERRA",
      icon: "🌍",
      question: "O que explica principalmente a existência das estações do ano?",
      answers: [
        "A inclinação do eixo da Terra e seu movimento ao redor do Sol",
        "A aproximação da Lua com a Terra",
        "A mudança de tamanho do Sol",
        "A rotação da Lua ao redor da Terra"
      ],
      correct: 0,
      explanation:
        "A inclinação do eixo terrestre, combinada com o movimento da Terra ao redor do Sol, faz variar a incidência de luz solar ao longo do ano."
    },
    {
      category: "MATERIAIS",
      icon: "⚡",
      question: "Qual destes materiais é um bom condutor de eletricidade?",
      answers: [
        "Borracha",
        "Madeira seca",
        "Plástico",
        "Cobre"
      ],
      correct: 3,
      explanation:
        "O cobre é um metal que conduz bem a eletricidade. Por isso, é muito usado na fabricação de fios elétricos."
    },
    {
      category: "INVESTIGAÇÃO",
      icon: "🔬",
      question: "Qual instrumento ajuda a observar células muito pequenas?",
      answers: [
        "Binóculo",
        "Microscópio",
        "Termômetro",
        "Bússola"
      ],
      correct: 1,
      explanation:
        "O microscópio amplia a imagem de objetos muito pequenos, permitindo observar estruturas que não conseguimos enxergar a olho nu."
    },
    {
      category: "MÉTODO CIENTÍFICO",
      icon: "✨",
      question: "Ao investigar uma pergunta científica, o que é importante fazer?",
      answers: [
        "Escolher uma resposta sem verificar",
        "Ignorar os resultados",
        "Observar, investigar e analisar evidências",
        "Aceitar qualquer informação como verdadeira"
      ],
      correct: 2,
      explanation:
        "A investigação científica envolve perguntas, observações, testes e análise de evidências para construir explicações confiáveis."
    }
  ];

  // ESTADO DO JOGO
  let currentQuestion = 0;
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let hasAnswered = false;
  let soundEnabled = true;
  let results = [];

  // TROCA DE TELAS
  function showScreen(screenToShow) {
    [homeScreen, instructionsScreen, quizScreen, resultScreen]
      .forEach((screen) => {
        screen.classList.remove("active");
      });

    screenToShow.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // EFEITOS SONOROS SIMPLES
  function playTone(frequency = 550, duration = 0.12) {
    if (!soundEnabled) return;

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    try {
      const audio = new AudioContextClass();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.08, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + duration
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start();
      oscillator.stop(audio.currentTime + duration);

      oscillator.onended = () => audio.close();
    } catch (error) {
      // O jogo continua funcionando mesmo se o navegador
      // não permitir reproduzir o som.
    }
  }

  // INICIAR OU REINICIAR
  function startGame() {
    currentQuestion = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    currentStreak = 0;
    maxStreak = 0;
    hasAnswered = false;
    results = [];

    scoreElement.textContent = "0";
    reviewPanel.innerHTML = "";
    reviewPanel.hidden = true;
    reviewButton.setAttribute("aria-expanded", "false");
    reviewArrow.textContent = "＋";

    showScreen(quizScreen);
    renderQuestion();
  }

  // MOSTRAR PERGUNTA
  function renderQuestion() {
    const question = questions[currentQuestion];
    hasAnswered = false;

    questionNumber.textContent =
      `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;

    scoreElement.textContent = score;
    questionText.textContent = question.question;
    categorySymbol.textContent = question.icon;
    categoryLabel.textContent = question.category;

    progressBar.style.width =
      `${(currentQuestion / questions.length) * 100}%`;

    progressTrack.setAttribute("aria-valuenow", currentQuestion);

    sidebarQuestion.textContent =
      `${currentQuestion} de ${questions.length}`;

    statusLabel.textContent = "Em busca de descobertas";

    streakLabel.textContent = `🔥 Sequência: ${currentStreak}`;

    feedback.hidden = true;
    feedback.classList.remove("is-incorrect");

    nextButton.disabled = true;
    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "Ver resultado 🏆"
        : "Próximo desafio ➜";

    answersContainer.innerHTML = "";

    const letters = ["A", "B", "C", "D"];

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";

      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = letters[index];

      const answerText = document.createElement("span");
      answerText.className = "answer-text";
      answerText.textContent = answer;

      button.append(letter, answerText);

      button.addEventListener("click", () => {
        selectAnswer(index, button);
      });

      answersContainer.appendChild(button);
    });
  }

  // SELECIONAR RESPOSTA
  function selectAnswer(selectedIndex, selectedButton) {
    if (hasAnswered) return;

    hasAnswered = true;

    const question = questions[currentQuestion];
    const answerButtons = answersContainer.querySelectorAll(
      ".answer-option"
    );

    answerButtons.forEach((button) => {
      button.disabled = true;
    });

    const isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
      score += 10;
      correctCount += 1;
      currentStreak += 1;
      maxStreak = Math.max(maxStreak, currentStreak);

      selectedButton.classList.add("correct");

      feedbackSymbol.textContent = "🎉";
      feedbackTitle.textContent = "Resposta correta! Mandou bem!";
      feedback.classList.remove("is-incorrect");

      playTone(660, 0.13);
      window.setTimeout(() => playTone(880, 0.16), 110);
    } else {
      wrongCount += 1;
      currentStreak = 0;

      selectedButton.classList.add("incorrect");
      answerButtons[question.correct].classList.add("correct");

      feedbackSymbol.textContent = "💡";
      feedbackTitle.textContent = "Quase! Vamos aprender juntos.";
      feedback.classList.add("is-incorrect");

      playTone(300, 0.18);
    }

    feedbackText.textContent = question.explanation;
    feedback.hidden = false;

    scoreElement.textContent = score;
    streakLabel.textContent = `🔥 Sequência: ${currentStreak}`;
    statusLabel.textContent = isCorrect
      ? "Descoberta realizada!"
      : "Conhecimento adquirido!";

    progressBar.style.width =
      `${((currentQuestion + 1) / questions.length) * 100}%`;

    progressTrack.setAttribute(
      "aria-valuenow",
      currentQuestion + 1
    );

    sidebarQuestion.textContent =
      `${currentQuestion + 1} de ${questions.length}`;

    results.push({
      question: question.question,
      selectedAnswer: question.answers[selectedIndex],
      correctAnswer: question.answers[question.correct],
      explanation: question.explanation,
      isCorrect
    });

    nextButton.disabled = false;
    nextButton.focus();
  }

  // AVANÇAR PARA A PRÓXIMA PERGUNTA
  function nextQuestion() {
    if (!hasAnswered) return;

    if (currentQuestion < questions.length - 1) {
      currentQuestion += 1;
      renderQuestion();
    } else {
      showResults();
    }
  }

  // CALCULAR E MOSTRAR RESULTADO
  function showResults() {
    showScreen(resultScreen);

    finalScore.textContent = score;
    correctAnswers.textContent = correctCount;
    wrongAnswers.textContent = wrongCount;
    bestStreak.textContent = maxStreak;

    if (score === 100) {
      resultSeal.textContent = "🏆";
      resultTitle.textContent = "Incrível, supercientista!";
      resultMessage.textContent =
        "Você acertou tudo! Sua curiosidade está brilhando!";
      rankLabel.textContent = "🌟 Mestre das descobertas";
    } else if (score >= 70) {
      resultSeal.textContent = "✨";
      resultTitle.textContent = "Parabéns, cientista!";
      resultMessage.textContent =
        "Você mandou muito bem! Continue explorando o mundo.";
      rankLabel.textContent = "🔬 Cientista brilhante";
    } else if (score >= 40) {
      resultSeal.textContent = "✨";
      resultTitle.textContent = "Uma ótima aventura!";
      resultMessage.textContent =
        "Você aprendeu várias coisas. Que tal revisar e tentar de novo?";
      rankLabel.textContent = "🌱 Explorador do conhecimento";
    } else {
      resultSeal.textContent = "🌈";
      resultTitle.textContent = "Sua jornada está começando!";
      resultMessage.textContent =
        "Todo cientista aprende um pouquinho a cada descoberta. Tente novamente!";
      rankLabel.textContent = "🔎 Explorador curioso";
    }

    buildReview();
    playTone(740, 0.2);
  }

  // MONTAR REVISÃO DAS RESPOSTAS
  function buildReview() {
    reviewPanel.innerHTML = "";

    results.forEach((result, index) => {
      const item = document.createElement("article");
      item.className = "review-item";

      const status = document.createElement("span");
      status.className = result.isCorrect
        ? "review-status"
        : "review-status wrong";

      status.textContent = result.isCorrect
        ? "✓ RESPOSTA CORRETA"
        : "💡 APRENDA COM ESTA QUESTÃO";

      const title = document.createElement("strong");
      title.textContent = `${index + 1}. ${result.question}`;

      const chosen = document.createElement("p");
      chosen.textContent = `Sua resposta: ${result.selectedAnswer}`;

      const correct = document.createElement("p");
      correct.textContent = `Resposta correta: ${result.correctAnswer}`;

      const explanation = document.createElement("p");
      explanation.textContent = result.explanation;

      item.append(status, title, chosen, correct, explanation);
      reviewPanel.appendChild(item);
    });
  }

  // EVENTOS DOS BOTÕES
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

  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    $("sound-icon").textContent = soundEnabled ? "🔊" : "🔇";
    $("sound-label").textContent = soundEnabled
      ? "Som ligado"
      : "Som desligado";

    soundToggle.setAttribute(
      "aria-label",
      soundEnabled ? "Desativar sons" : "Ativar sons"
    );

    if (soundEnabled) {
      playTone(600, 0.12);
    }
  });

  reviewButton.addEventListener("click", () => {
    const isExpanded =
      reviewButton.getAttribute("aria-expanded") === "true";

    reviewButton.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    reviewPanel.hidden = isExpanded;
    reviewArrow.textContent = isExpanded ? "＋" : "−";
  });

  // INICIAR NA TELA INICIAL
  showScreen(homeScreen);
});
