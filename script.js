
// Questions for Code Quiz

var myQuestions = [
    {
        question: "What does CSS stand for?",
        choices: ["Cascading Style Sheet", "Code Converting Syntax", "Clever Style Sheet", "Communication Syntax Separators"],
        correctAnswer: 0
    },
    {   question: "What does it mean to pseudocode?",
        choices: ["None of these", "Using syntax to verify code", "To update a file", "To represent an implementation of code"],
        correctAnswer: 3
    },
    {
        question: "How do you intergrate CSS into a webpage?",
        choices: ["Inline", "Embedded/Internal", "External Link", "All the above"],
        correctAnswer: 3
    },
    {
        question: "What is Bootstrap?",
        choices: ["A boot with a strap", "A tool to backup code", "A CSS framework", "None of these"],
        correctAnswer: 2
    },
    {
        question: "What is the backbone of every web page?",
        choices: ["CSS", "Javascript", "C++", "HTML"],
        correctAnswer: 3
    }
]

//Buttons
var startButtonEL = document.getElementById("startButton");
var reStartBtnEL = document.getElementById("reStartBtn");
var storeBtnEl = document.getElementById("storeBtn");

//Page Elements
var headerEl = document.getElementById("header");
var contentEl = document.getElementById("content");

//Question/Time/Scores elements
var questionEL = document.getElementById("main");
var timeEl = document.querySelector("#time");
var nameIDEl = document.getElementById("nameID");
var finalScore = document.getElementById("finalScore");
var responseEl = document.getElementById("response");
var choicesEl = document.getElementById("choices");

var scoresDisplayEl = document.getElementById("scoresDisplay");
var resultsEl = document.getElementById("results");
var highScoresEl = document.getElementById("highScores");
var score = 0;
var secondsLeft = 15*myQuestions.length;
var currentQuestionIndex = 0;
var currentQuestion = myQuestions[currentQuestionIndex];



function startQuiz () {
    headerEl.innerHTML = " ";
    resultsEl.innerHTML = " ";
    startButtonEL = document.getElementById("startButton");

    //code to hide "whatever it takes!" button on click
    startButtonEL.classList.add("d-none"); 

    getChoices();
    setTime(); 
}

function getChoices() {
   
    //Curent question
    var currentQuestion = myQuestions[currentQuestionIndex];
    var titleEL = document.getElementById("main");
    titleEL.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach( function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "btn btn-dark");
        choiceButton.setAttribute("id", "quizBtn");
        choiceButton.setAttribute("value", i);
        choiceButton.textContent = i + 1 + ". "+choice;
        choiceButton.onclick = questionClick;
        choicesEl.appendChild(choiceButton);
        }
    ) 
}
    
    function questionClick (e) {
        
        e.preventDefault();
        //incorrect subtraction
        if (this.value != myQuestions[currentQuestionIndex].correctAnswer) {
            secondsLeft -= 15;
            if (secondsLeft < 0) {
                secondsLeft = 0;
            }
            
            timeEl.textContent = time;
            responseEl.innerHTML = "<br>"
            responseEl.textContent = "Incorrect";
        } else { 
            responseEl.textContent = "Genius!";
            score++;
            
        }
        currentQuestionIndex++;
        if (currentQuestionIndex===myQuestions.length || secondsLeft <= 0) {
            quizResults();
            return;
        }
        getChoices();
    }
    
    function setTime() {
        var timerInterval = setInterval(function() {
            secondsLeft--;
            timeEl.textContent = `Time: ${secondsLeft}`;
            
            if(secondsLeft === 0 || currentQuestionIndex===myQuestions.length || secondsLeft <= 0) {
                clearInterval(timerInterval);
            }
            
        }, 1000);
       
    }
 
    function quizResults() { //function that shows the results and stores it in the local storage
        questionEL.innerHTML = " ";
        choicesEl.innerHTML = ' ';
        headerEl.innerHTML = "Quiz Complete!";
        finalScore.textContent = `How genius are you?: ${score}`;
        timeEl.classList.add("d-none");
        responseEl.classList.add("d-none");
        nameIDEl.classList.remove("d-none");
        finalScore.classList.remove("d-none");
        storeBtnEl.classList.remove("d-none");
    }
    
        function storeResults() {
        console.log('started')
        localStorage.setItem(nameIDEl.value, score);
        reStartBtnEL.classList.remove("d-none");
        var scoresMessage = document.createElement("div");
        scoresMessage.innerText = `Results saved!`;
        scoresDisplayEl.prepend(scoresMessage);
    }

    
function refresh () {
    location.reload();
}

startButtonEL.addEventListener("click", startQuiz);
storeBtnEl.addEventListener("click", storeResults);
highScoresEl.addEventListener("click", renderResults);
reStartBtnEL.addEventListener("click", refresh);

function renderResults() {
        
    if (localStorage.length == 0) {
        resultsEl.innerHTML = " ";
        var resultsDiv = document.createElement("p");
        resultsDiv.innerText =`No results`;
        resultsEl.appendChild(resultsDiv);
    } else {
   
    resultsEl.innerHTML = " ";
    for (i = 0; i < localStorage.length; i++) {
        var testResult = localStorage.getItem(localStorage.key(i));
        var testKey = localStorage.key(i);
        var resultsDiv = document.createElement("p");
        
        
        resultsDiv.innerText =`${testKey} ${testResult}`;
        resultsEl.appendChild(resultsDiv);
    }
}}