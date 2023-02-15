/* Introdução do jogo para o usuário */

var intro = [
    {
        img: "jurassico.jpg",
        title: "Período Jurássico",
        description: `O Período Jurássico corresponde ao segundo período da Era Mesozoica (entre 205 a 142 milhões de anos atrás) sendo suas principais características o início da fragmentação da Pangeia e o surgimento dos dinossauros. Ademais, foi nesse período que surgem as reservas de petróleo, decorrente do acúmulo de sedimentos.`        
    }
]

/* Apresentar na tela a introdução do jogo */

document.querySelector("#img").src = "midias/" + intro[0].img;
document.querySelector("#title").innerHTML = intro[0].title;
document.querySelector("#description").innerHTML = intro[0].description;

/* Emblemas do jogo */

var badges = ["Semi-Deus", "Hércules", "Zeus", "Poseidon"]

/* Apresentar na tela os emblemas do jogo */
document.querySelector("#badge0").innerHTML = `Para conquistar o emblema ${badges[0]} você deve jogar pelo menos uma vez.`;
document.querySelector("#badge1").innerHTML = `Para conquistar o emblema ${badges[1]} você deve acertar pelo menos metade das questões.`;
document.querySelector("#badge2").innerHTML = `Para conquistar o emblema ${badges[2]} você deve acertar todas as questões.`;
document.querySelector("#badge3").innerHTML = `Para conquistar o emblema ${badges[3]} você deve jogar 5 vezes.`;

/* Imagens dos Emblemas do jogo */

var badgesImages = ["midias/emblemas/adventurer.png", "midias/emblemas/adventurer.png", "midias/emblemas/adventurer.png", "midias/emblemas/adventurer.png"]

/* Apresentar na tela as iomagens dos emblemas do jogo */
document.querySelector("#img_badge0").src  = `${badgesImages[0]}`;
document.querySelector("#img_badge1").src  = `${badgesImages[1]}`;
document.querySelector("#img_badge2").src  = `${badgesImages[2]}`;
document.querySelector("#img_badge3").src  = `${badgesImages[3]}`;

// sound game
var sound = "musics/Vishnu - Patrick Patrikios.mp3"

/* Questões do Quiz */

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Data is stored in localStorage as _____.",
        choices: ["strings", "objects", "arrays", "all of the above"],
        answer: "strings"
    },
    {
        title: "Which of the following is NOT a method to call an element with class 'example'?",
        choices: ["document.getElementsByClassName( 'example');", "document.body.example;", "document.querySelector( '.example')", "document.querySelectorAll( '.example')[0]"],
        answer: "document.body.example;"
    },
    {
        title: "Arrays in JavaScript can be used to store ______.",
        choices: ["strings", "numbers", "objects", "All of the Above"],
        answer: "All of the Above"
    },
    {
        title: "Undefined does NOT mean that _______.",
        choices: ["the variable in the code doesn't exist", "the variable is not assigned to a value", "the variable is assigned no value", "the property doesn't exist"],
        answer: "the variable is assigned no value"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Data is stored in localStorage as _____.",
        choices: ["strings", "objects", "arrays", "all of the above"],
        answer: "strings"
    },
    {
        title: "Which of the following is NOT a method to call an element with class 'example'?",
        choices: ["document.getElementsByClassName( 'example');", "document.body.example;", "document.querySelector( '.example')", "document.querySelectorAll( '.example')[0]"],
        answer: "document.body.example;"
    },
    {
        title: "Arrays in JavaScript can be used to store ______.",
        choices: ["strings", "numbers", "objects", "All of the Above"],
        answer: "All of the Above"
    },
    {
        title: "Undefined does NOT mean that _______.",
        choices: ["the variable in the code doesn't exist", "the variable is not assigned to a value", "the variable is assigned no value", "the property doesn't exist"],
        answer: "the variable is assigned no value"
    }

];

/* Apresentar na tela as regras do jogo */

document.querySelector("#qtdQuestions").innerHTML = `O quiz tem o total de ${questions.length} questões.`;