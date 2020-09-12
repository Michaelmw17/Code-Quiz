const timerElement = document.getElementById("time-remaining");
const timerView = document.getElementById("timer");
const highScoreButton = document.querySelector("#highscores");
const startButton = document.getElementById("start-quiz");

const mainElement = document.querySelector("#main-content");
const messageElement = document.querySelector("h1");
const textElement = document.querySelector("p");

const choicesListElement = document.getElementById("choices-list");
const indicatorElement = document.getElementById("indicator");

const formElement = document.createElement("div");
const textInputElement = document.createElement("input");
const formButton = document.createElement("button");
const backButton = document.createElement("button");
// const clearButton = document.createElement("button");

var highscore = {
  initials: "",
  score: 0,
};
var secondsLeft;
var timerInterval;

var questions = [
  {
    question: "Which answer is a correct way of defining a variable?",
    choices: ["A. Javascript", "B. B = bob", "C. Document Object Model"],
    answer: 1,
  },

  {
    question: "How do you add an Event Listener?",
    choices: [
      "A. input.addEventListener('click', function)",
      "B. Beat up scooter!",
      "C. Both are correct",
    ],
    answer: 0,
  },

  {
    question: "Who invented JavaScript?",
    choices: ["A. A Cookie Company", "B. Brendan Eich", "C. Dr Einstein"],
    answer: 1,
  },
  {
    question: "Which is a querySelector Method?",
    choices: [
      "A. Language.querySelector()",
      "B. Hello World ",
      "C. Document.querySelector()",
    ],
    answer: 2,
  },
  {
    question: "What is Scope in Programming?",
    choices: [
      "A. Refers to where values and functions can be accessed.",
      "B. A Mouth Wash.",
      "C. Hyper Text Markup Language.",
    ],
    answer: 0,
  },
];

// FUNCTIONS
init();

function init() {
  score = 0;
  secondsLeft = 60;
}

function startGame() {
  startButton.remove();
  textElement.remove();
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerElement.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  renderQuiz();
}

function renderQuiz(questionNumber) {
  questionNumber = questionNumber || 0;
  var questionItem = questions[questionNumber];
  messageElement.textContent = questionItem.question;

  var newChoices = document.createElement("div");
  choicesListElement.appendChild(newChoices);

  for (var i = 0; i < questionItem.choices.length; i++) {
    var choice = questionItem.choices[i];

    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    li.textContent = choice;
    newChoices.appendChild(li);

    li.addEventListener("click", function (event) {
      if (li.getAttribute("clicked") == "true") return;
      li.setAttribute("clicked", "true");
      if (
        questionItem.answer ===
        parseInt(event.target.getAttribute("data-index"))
      ) {
        score += 10;
        indicatorElement.innerHTML = " CORRECT!";
        indicatorElement.setAttribute("style", "color: lightgreen");
      } else {
        secondsLeft -= 10;
        indicatorElement.innerHTML = " WRONG!";
        indicatorElement.setAttribute("style", "color: red");
      }

      questionNumber++;

      if (questionNumber === questions.length) {
        clearInterval(timerInterval);
        indicatorElement.textContent = "";
        newChoices.remove();
        messageElement.textContent = "Game Over!";
        messageElement.appendChild(textElement);
        textElement.textContent = "Your final score is: " + secondsLeft;

        renderForm();
      } else {
        setTimeout(function () {
          renderQuiz(questionNumber);
          // debugger;
          newChoices.remove();
          indicatorElement.textContent = "";
        }, 1000);
      }
    });
  }
}

function renderForm() {
  formElement.textContent = "ENTER NAME: ";
  formElement.setAttribute("style", "color: white");
  formButton.textContent = "SUBMIT";
  mainElement.appendChild(formElement);
  formElement.appendChild(textInputElement);
  formElement.appendChild(formButton);
}

function submitHighscore() {
  var initialInput = document.querySelector("input").value;
  highscore = {
    initials: initialInput,
    score: secondsLeft,
  };
  console.log("highscore", highscore);

  var currentResult =
    JSON.parse(window.localStorage.getItem("highscore")) || [];
  // currentResult.push(highscore);
  console.log(currentResult);
  localStorage.setItem("highscore", JSON.stringify(currentResult));
  mainElement.innerHTML = "";
  // highScoreButton.textContent = "";
  timerView.textContent = "";

  renderHighscores();
}

function renderHighscores() {
  var storedHighscore = JSON.parse(localStorage.getItem("highscore")) || [];
  console.log("local", storedHighscore);
  console.log(JSON.stringify(storedHighscore));
  messageElement.innerHTML = "Highscores";
  messageElement.setAttribute("style", "color: white");
  mainElement.appendChild(messageElement);
  for (var i = 0; i < storedHighscore.length; i++) {
    const highscoresElement = document.createElement("div");
    highscoresElement.setAttribute("class", "highscore-element");
    highscoresElement.textContent = `${storedHighscore[i].initials} - ${storedHighscore[i].score}`;
    mainElement.appendChild(highscoresElement);
  }
  backButton.textContent = "Home";
  // clearButton.textContent = "Clear";
  mainElement.appendChild(backButton);
  // mainElement.appendChild(clearButton);
}

// function clear() {
//   location.reload();
// }

function home() {
  location.reload();
}

highScoreButton.addEventListener("click", function () {
  textElement.remove();
  startButton.remove();
  renderHighscores();
});

startButton.addEventListener("click", startGame);
formButton.addEventListener("click", submitHighscore);
backButton.addEventListener("click", home);
// clearButton.addEventListener("click", clear);
//
