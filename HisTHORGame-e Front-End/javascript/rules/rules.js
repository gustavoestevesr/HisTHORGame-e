var rules = [
    "Você tem 3 minutos para responder cada questão.",
    "Após escolher uma alternativa, não é escolher outra alternativa.",
]

rules.forEach( rule => {
    document.querySelector(".div-rules").innerHTML += 
    `
        <div class="alert alert-danger" role="alert">${rule}</div>
    `
});

