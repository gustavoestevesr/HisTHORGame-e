async function Login() {

    // manter o mesmo nome das propriedades das requests
    const email = document.querySelector('#emailUsuario').value
    const password = document.querySelector('#senhaUsuario').value

    const res = await fetch('http://localhost:3000/auth/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        }),
    })

    if (res.status === 200) {
        let info = await res.json()
        saveTokenLocalStorage(info.token)
        saveIDLocalStorage(info.user._id)
        window.location.href = 'principal.html'
    } else {
        alert('Usuário ou senha incorretos, tente novamente')
    }

}

function saveTokenLocalStorage(token) {
    localStorage.setItem("token", token);
}

function getTokenLocalStorage() {
    return localStorage.getItem("token");
}

function saveIDLocalStorage(id) {
    localStorage.setItem("id", id);
}

function getIDLocalStorage() {
    return localStorage.getItem("id");
}

async function ResetPassword(){
    // manter o mesmo nome das propriedades das requests
    const email = document.querySelector('#emailUsuario').value
    const token = document.querySelector('#tokenUsuario').value
    const password = document.querySelector('#senhaUsuario').value
    const confirmPassword = document.querySelector('#confirmarSenhaUsuario').value

    if (password != confirmPassword) {
        alert('Senhas diferentes')
    } else {
        const res = await fetch('http://localhost:3000/auth/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({                
                email,
                token,
                password
            }),
        })

        if (res.status === 200) {
            alert('Senha alterada com sucesso!')
            window.location.href = 'index.html'
        } else {
            alert('Não foi possível alterar a senha da conta, tente novamente')
        }
    }
}

async function ForgotPassword(){
    // manter o mesmo nome das propriedades das requests
    const email = document.querySelector('#emailUsuario').value

    const res = await fetch('http://localhost:3000/auth/forgot_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    })

    if (res.status === 200) {
        alert('Token de confirmação enviado com sucesso!')
        window.location.href = 'resetPassword.html'
    } else {
        alert('Não foi possível enviar Token de confirmação, tente novamente')
    }
}

async function Register() {

    // manter o mesmo nome das propriedades das requests
    const name = document.querySelector('#nomeUsuario').value
    const email = document.querySelector('#emailUsuario').value
    const password = document.querySelector('#senhaUsuario').value
    const confirmPassword = document.querySelector('#confirmarSenhaUsuario').value

    if (password != confirmPassword) {
        alert('Senhas diferentes')
    } else {
        const res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
        })

        if (res.status === 200) {
            alert('Cadastro realizado com sucesso!')
            window.location.href = 'index.html'
        } else {
            alert('Não foi possível cadastrar a conta, tente novamente')
        }
    }

}

async function getProfile() {

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        let name = (info.user.name == undefined) ? '' : info.user.name
        let email = (info.user.email == undefined) ? '' : info.user.email
        let university = (info.user.university == undefined) ? '' : info.user.university

        document.querySelector('#nomeUsuario').value = name
        document.querySelector('#emailUsuario').value = email
        document.querySelector('#nomeUniversidade').value = university

    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function updateProfile() {

    // manter o mesmo nome das propriedades das requests
    const email = document.querySelector('#emailUsuario').value
    const name = document.querySelector('#nomeUsuario').value
    const university = document.querySelector('#nomeUniversidade').value

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/profile' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        },
        body: JSON.stringify({
            name,
            email,
            university
        }),
    })

    if (res.status === 200) {
        document.location.reload()
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function getBadges() {

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/badges', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        // console.log(info.badges)

        let badges = info.badges

        // limpando a tela, opcional
        document.querySelector('#all_badges').innerHTML = ''

        badges.forEach(badge => {
            document.querySelector('#all_badges').innerHTML +=
                `
                    <div class="card" style="width: 20rem;">
                        <div class="card-body">
                            <img class="gray-scale" src="${badge.image}" alt="" height="100px">
                            <p>
                            <h5 class="card-title">${badge.title}</h5>
                            <p>${badge.quiz}</p>
                            </p>
                        </div>            
                    </div>
                `
        });

    } else {
        alert('Erro em buscar os emblemas do usuário, tente novamente')
    }

}

async function getMyBadges() {

    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        console.log(info.user.badges)

        let badges = info.user.badges

        // limpando a tela, opcional
        document.querySelector('#my_badges').innerHTML = ''

        badges.forEach(badge => {
            document.querySelector('#my_badges').innerHTML +=
                `
                    <div class="card" style="width: 20rem;">
                        <div class="card-body">
                            <img src="${badge.image}" alt="" height="100px">
                            <p>
                            <h5 class="card-title">${badge.title}</h5>
                            <p>${badge.quiz}</p>
                            </p>
                        </div>            
                    </div>
                `
        });

    } else {
        alert('Erro em buscar os emblemas do usuário, tente novamente')
    }

}

async function mainPage() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()

        let solved = (info.user.solved == undefined) ? '0' : info.user.solved
        let score = (info.user.score == undefined) ? '0' : info.user.score
        let progress = (info.user.progress == undefined) ? '0%' : info.user.progress

        document.querySelector('#solved').innerHTML = solved
        document.querySelector('#score').innerHTML = score
        document.querySelector('#progress').innerHTML = progress

        top5University()
        top5General()
        top5Warriors()

    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function top5University() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/top5university', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()                

        // encontrar o "ul" corresponde
        var ulUniversidades = document.querySelector('#top5-university');        

        // adicionar dinamicamente o top 5 ordenado
        for (var i = 0; i < info.users.length; i++) {            
            //criar um array temp para armazenar as universidades e não haver repetidos
            var university = (info.users[i] === undefined) ? '' : info.users[i];
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(university));
            ulUniversidades.appendChild(li);          
        }

    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function top5General() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/top5general', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()
        
        // encontrar o "ul" corresponde
        var ulGeneral = document.querySelector('#top5-general');

        // adicionar dinamicamente o top 5 ordenado
        for (var i = 0; i < info.users.length; i++) {
            //criar um array temp para armazenar as universidades e não haver repetidos
            var user = (info.users[i] === undefined) ? '' : info.users[i];
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(user.name));
            ulGeneral.appendChild(li);
        }
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}

async function top5Warriors() {
    const id = getIDLocalStorage()
    const token = getTokenLocalStorage()
    const bearer = 'Bearer ' + token;
    const res = await fetch('http://localhost:3000/users/top5warriors', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer,
        }
    })

    if (res.status === 200) {
        let info = await res.json()
        
        // encontrar o "ul" corresponde
        var ulWarriors = document.querySelector('#top5-warriors');

        // adicionar dinamicamente o top 5 ordenado
        for (var i = 0; i < info.users.length; i++) {
            //criar um array temp para armazenar as universidades e não haver repetidos
            var user = (info.users[i] === undefined) ? '' : info.users[i];
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(user.name));
            ulWarriors.appendChild(li);
        }
    } else {
        alert('Erro em buscar os dados do usuário, tente novamente')
    }

}


