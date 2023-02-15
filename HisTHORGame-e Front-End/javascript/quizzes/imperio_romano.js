/* Introdução do jogo para o usuário */

var intro = [
    {
        img: "mitologia.jpg",
        title: "Mitologia",
        description: `A Idade Média é o nome do período da história localizado entre os anos 476 e 1453. A nomeação “Idade Média” é utilizada pelos historiadores dentro de uma periodização que engloba quatro idades: Antiga, Média, Moderna e Contemporânea. Quando nos referimos à Idade Média, geralmente referimo-nos a assuntos relacionados, direta ou indiretamente, com a Europa. A Idade Média iniciou-se com a desagregação do Império Romano do Ocidente, no século V. Isso deu início a um processo de mescla da cultura latina, oriunda dos romanos, e da cultura germânica, oriunda dos povos que invadiram e instalaram-se nas terras que pertenciam a Roma, na Europa Ocidental. Desse período destacam-se o processo de ruralização que a Europa viveu entre os séculos V e X; o fortalecimento da Igreja Católica; a estruturação do sistema feudal, não apenas economicamente mas também política e socialmente. A partir do século XI, o renascimento urbano e comercial abre caminho para a crise do século XIV, que determina o fim da Idade Média.`        
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
var sound = "musics/bensound-moose.mp3"

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