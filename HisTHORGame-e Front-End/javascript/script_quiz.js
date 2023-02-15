// Initialize globals
var speedResponseAverage = 0;
var speedResponse = 0;
var correctResponseAverage = 0;
var answerText = "";
var duration = 20 * questions.length; // get the full duration of the game
var time = duration; // countdown
var timeLimit;
var questionDiv = document.querySelector("#questionBlock");
var alertBoxDiv = document.querySelector("#alertBox");
var answerDiv = document.querySelector("#answerResult");
var endGameDiv = document.querySelector("#endGameBlock");
var optionButtons = [document.querySelector("#quizOption1"), document.querySelector("#quizOption2"),
document.querySelector("#quizOption3"), document.querySelector("#quizOption4")]
//var playerInitials = document.querySelector("#playerInitials");
var questionNum = 0;
//var scoresArray;
var score = 0;
//playerInitials.value = '';

function finishQuiz() {
    submitScore( score )
}

// Do some fancy animations to hide the title screen and show the quiz
function startQuiz() {
    // play music
    play();

    // call the function to shuffle the questions
    shuffleArray(questions)

    event.stopPropagation();

    document.querySelector("#titleScreen").style = "animation-play-state: running;"
    document.querySelector(".navbar-text").textContent = "Tempo Restante: " + time;

    // Replace placeholder with the first question
    changeQuestion();

    // Wait for the title animation to finish, then show the question
    setTimeout(function () {
        document.querySelector("#titleScreen").style = "display: none;";
        document.querySelector("#questionBlock").style = "display: block;";
        document.querySelector("#questionBlock").className = "slideUp";
    }, 400);

    timeLimit = setInterval(function () {
        time--;
        document.querySelector(".navbar-text").textContent = "Tempo Restante: " + time;
        if (time <= 0) {
            clearInterval(timeLimit);
            showEndGame();
        }
    }, 1000);
}

// changeQuestion operates only when the element clicked is a button
function changeQuestion() {
    var questionInfo = questions[questionNum];

    // ...If there are no questions left, stop the timer and end the function...
    if (questionInfo == undefined) {
        clearInterval(timeLimit);
        showEndGame();
        return;
    }

    // call the function to shuffle the buttons
    shuffleArray(optionButtons)

    // ...Otherwise write the information into the next question...
    setTimeout(function () {
        for (var i = 0; i < optionButtons.length; i++) {
            optionButtons[i].textContent = questionInfo.choices[i];
            optionButtons[i].value = questionInfo.choices[i];
        }
        document.querySelector("#questionPrompt").textContent = questionInfo.title;
        // ...And show the question
        questionDiv.className = "questionFadeIn";
    }, 400);

}

// Checks the user input and compares it with the answer on file.
function checkAnswer() {
    if (event.target.nodeName == "BUTTON") {
        var playerAnswer = event.target.value;
        if (playerAnswer) {
            if (playerAnswer === questions[questionNum].answer) {
                score++; // incrementar acertos
                speedResponse += (duration - time); // total menos o tempo de resposta
                answerText = "Correto!";
                // If there is not enough time left over, set time to 0
            } else {
                answerText = "Errado!";
                time -= 15;
                if (time <= 0) {
                    time = 0;
                }
            }

            // This block shows the result of the answer, then hides it after a given time.
            answerDiv.innerHTML = `${answerText}`
            if (answerDiv.style != "display: block;") {
                answerDiv.style = "display: block;";
            }
            answerDiv.className = "answerSlideUp";
            setTimeout(function () {
                answerDiv.className = "fadeAway";
                setTimeout(function () {
                    answerDiv.style = "display: none;";
                }, 300); // 300
            }, 700); // 700

            // Slide away the current question to prepare the next
            questionDiv.className = "questionFadeOut";
        }
        // questionNum is iterated and the next question is called
        questionNum++;
        changeQuestion();
    }
}

function showEndGame() {
    // Rewrites remaining time if the final question was wrong
    document.querySelector(".navbar-text").textContent = "Time: " + time;

    // Writes the final score to showScore
    if (time != 0) {
        document.querySelector("#showScore").textContent = score;
    } else {
        document.querySelector("#showScore").textContent = score;
    }

    // Animation handlers
    if (questionDiv.className != "questionFadeOut") {
        questionDiv.className = "questionFadeOut";
    }
    setTimeout(function () {
        questionDiv.style = "display: none;";
        answerDiv.style = "display: none;";
        endGameDiv.style = "display: block;";
        endGameDiv.className = "slideDown";
    }, 700)
}

function toggleBadge() {
    document.querySelector("#box_badges").style.display = "block"
    document.querySelector("#box_rules").style.display = "none"
    document.querySelector("#box_presentation").style.display = "none"
}

function toggleRule() {
    document.querySelector("#box_badges").style.display = "none"
    document.querySelector("#box_rules").style.display = "block"
    document.querySelector("#box_presentation").style.display = "none"
}

function toggleQuiz() {
    document.querySelector("#box_badges").style = "display: none;";
    document.querySelector("#questionBlock").style = "display: block;";
}

// The only event listeners in the entire script
// It's kind of sad, really. Three dinky little lines.
document.querySelector("#quizStart").onclick = startQuiz;
document.querySelector("#quizBadges").onclick = toggleBadge;
document.querySelector("#quizRules").onclick = toggleRule;
document.querySelector("#quizFinish").onclick = finishQuiz;

document.addEventListener("click", checkAnswer);

// MUSIC
function play() {
    var audio = new Audio(sound);
    audio.volume = 0.1;
    audio.play();
}

// SHUFFLE QUESTIONS
function shuffleArray(arr) {
    // Loop em todos os elementos
    let size = arr.length
    for (let i = size - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
}

function checkBadge( score, speedResponse ) {

    if (condition) {
        
    } else if (condition) {
        
    } else if (condition) {
        
    }

}

async function badgeReward( ) {

    var badge = "X"

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/badge/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        },
        body: JSON.stringify({
            badge,
        }),
    })

    if (res.status === 200) {
        document.location.reload()
    } else {
        alert('Erro em salvar os pontos do usuário, tente novamente')
    }

}

async function submitScore( score ) {

    speedResponseAverage = speedResponse / questions.length; //media do tempo de resposta
    correctResponseAverage = score / questions.length // media de acertos

    var timePlayed = duration
   
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/quiz/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        },
        body: JSON.stringify({
            score,
            timePlayed,
            speedResponseAverage,
            correctResponseAverage,
        }),
    })

    if (res.status === 200) {
        document.location.reload()
    } else {
        alert('Erro em salvar os pontos do usuário, tente novamente')
    }

}