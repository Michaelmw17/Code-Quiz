const timerElement = document.getElementById("time-remaining");
const timerView = document.getElementById("timer");
const highScoreView = document.getElementById("#highscores");
const startButton = document.getElementById("start-quiz");

const mainElement = document.getElementById("#main-content");
const messageElement = document.getElementById("h1");
const textElement = document.getElementById("p");

const choicesListElement = document.getElementById("choices-list");
const indicatorElement = document.getElementById("indicator");

const formElement = document.getElementById("div");
const highscorcesElement = document.getElementById("div");
const textInputElement = document.getElementById("input");
const formButton = document.getElementById("button");
const backButton = document.getElementById("button");
const clearButton = document.getElementById("button");

var highscores = {
  initials: "",
  score: 0,
};
var highscores = [];
var secondsLeft;
var timerInterval;

//Questions
var questions = [
  {
    questions: "Which answer is an incorrect way of defining a variable?",
    choices: ["C. var e = C", "B. B = bob", "A. const x = A"],
    answer: 1,
  },
  {
    questions: "How is the Event Listener added?",
    choices: [
      "A. input.addEventListener('click', function)",
      "B. Beat up scooter",
      "C. Both are correct",
    ],
    answer: 0,
  },
  {
    questions: "Who invented JavaScript?",
    choices: ["B. A Cookie Company", "A. Dr Einstein", "C. Brendan Eich"],
    answer: 2,
  },
  {
    questions: "Which one of these is a JavaScript package manager?",
    choices: ["A. A mafia boss", "B. npm", "C. Node.js"],
    answer: 1,
  },
  {
    questions: "What answer is a querySelector Method?",
    choices: [
      "A. document.querySelector()",
      "B. language.querySelector()",
      "C. Hello World",
    ],
    answer: 0,
  },
];
// Functions

init();

function init() {
  score = 0;
  secondsLeft = 60;
}
function startGame() {
  startButton.remove();
  textElement.remove();
  timerElement = setInterval(function () {
    secondsLeft--;
    timerElement.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  renderQuiz();
}

function renderQuiz(questionsNumber) {
  questionsNumber = questionsNumber || 0;
  var questionsItem = questions[questionsNumber];
  messageElement.textContent == questionsItem.questions;

  var newChoices = document.createElement("div");
  choicesListElement.appendChild(newChoices);

  for (var i = 0; i < questionsItem.choices.length; i++) {
    var choices = questionsItem.choices[i];

    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    li.textContent = choices;
    newChoices.appendChild(li);

    li.addEventListener("click", function (event) {
      if (
        questionsItem.answer ===
        parseInt(event.target.getAttribute("data-index"))
      ) {
        score += 10;
        indicatorElement.innerHTML = "<hr> CORRECT!";
        indicatorElement.setAttribute("style", "color: lightgreen");
      } else {
        secondsLeft -= 10;
        indicatorElement.innerHtml = "<hr> WRONG!";
        indicatorElement.setAttribute("style", "color: red");
      }

      questionsNumber++;

      if (questionsNumber === questions.length) {
        clearInterval(timerInterval);
        indicatorElement.textContent = "";
        newChoices.remove();
        messageElement.textContent = "Game Done";
        messageElement.appendChild(textElement);
        textElement.textContent = "Your final score is: " + score;

        renderForm();
      } else {
        setTimeout(function () {
          renderQuiz(questionsNumber);
          newChoices.remove();
          indicatorElement.textContent = "";
        }, 1000);
      }
    });
  }
}




//ADD EVENT LISTENER
startButton.addEventListener("click", startGame);
// formButton.addEventListener("click", submitHighscore);
// backButton.addEventListener("click", home);
// clearButton.addEventListener("click", clear);
