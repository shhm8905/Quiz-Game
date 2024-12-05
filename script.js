window.onload = () => {
  const questions = [
    {
      question: "Which is the largest animal in the word?",
      answers: [
        { text: "Shark", correct: false },
        { text: "Blue whale", correct: true },
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false },
      ],
    },
    {
      question: "Which is the smallest country in the word?",
      answers: [
        { text: "Vatican City", correct: true },
        { text: "Bhutan", correct: false },
        { text: "Nepal", correct: false },
        { text: "Shri Lanka", correct: false },
      ],
    },
    {
      question: "Which is the largest desert in the word?",
      answers: [
        { text: "Kalahari", correct: false },
        { text: "Antractica", correct: true },
        { text: "Gobi", correct: false },
        { text: "Sahara", correct: false },
      ],
    },
    {
      question: "Which is the smallest continent in the word?",
      answers: [
        { text: "Asia", correct: false },
        { text: "Australia", correct: true },
        { text: "Arctic", correct: false },
        { text: "Africa", correct: false },
      ],
    },
  ];

  const rightAnswer = ["Blue whale", "Vatican City", "Antractica", "Australia"];

  const nextBtn = document.querySelector(".next-btn"),
    question = document.querySelector(".question"),
    result = document.querySelector(".result"),
    quizContent = document.querySelector(".quiz-content"),
    tryBtn = document.querySelector(".try-btn"),
    ans = document.querySelectorAll(".ans");
  let playerAnswer = [];
  let counter = 0;
  let correct = 0;

  function showQuestion() {
    question.innerHTML = questions[counter].question;
    questions[counter].answers.map((answer, index) => {
      ans[index].innerHTML = answer.text;
      ans[index].dataset.correct = answer.correct;
      ans.forEach((btn) => {
        const handleAnswer = () => {
          ans.forEach((d) => d.classList.remove("active"));
          btn.classList.add("active");
          nextBtn.style.display = "inline-block";
        };
        btn.addEventListener("click", handleAnswer);
      });
    });
  }
  showQuestion();

  function nextQuestion() {
    ans.forEach((d) => {
      if (d.className === "ans active" && d.dataset.correct === "true") {
        correct++;
        if (d.className === "ans active") {
          playerAnswer.push(d.textContent);
        }
        d.classList.remove("active");
      } else {
        if (d.className === "ans active") {
          playerAnswer.push(d.textContent);
        }
        d.classList.remove("active");
      }
    });
    if (counter < questions.length - 1) {
      counter++;
      nextBtn.style.display = "none";
      showQuestion();
    } else {
      quizContent.style.display = "none";
      result.style.display = "block";
      nextBtn.style.display = "none";
      tryBtn.style.display = "inline-block";
      tryBtn.addEventListener("click", () => window.location.reload());
      if (correct >= 2) {
        result.innerHTML = `<h1>Congrats you got ${correct} of 4 right Questions!!!</h2>`;
        questions.map((ques, index) => {
          result.innerHTML += `
              <h3>${ques.question}</h3>
              <p>Right answer is <span>${
                rightAnswer[index]
              }</span> and your answer is ${
            playerAnswer[index] === rightAnswer[index]
              ? `right <span>${playerAnswer[index]}</span>`
              : `fault <strong>${playerAnswer[index]}</strong>`
          }</p>
              `;
        });
      } else {
        result.innerHTML = `<h3>Unfortunately you didn't pass the questions because you got just ${correct} of 4 right Questions!!!</h3>`;
        questions.map((ques, index) => {
          result.innerHTML += `
              <h3>${ques.question}</h3>
              <p>Right answer is <span>${
                rightAnswer[index]
              }</span> and your answer is ${
            playerAnswer[index] === rightAnswer[index]
              ? `right <span>${playerAnswer[index]}</span>`
              : `fault <strong>${playerAnswer[index]}</strong>`
          }</p>
              `;
        });
      }
    }
  }
  nextBtn.addEventListener("click", nextQuestion);
};
