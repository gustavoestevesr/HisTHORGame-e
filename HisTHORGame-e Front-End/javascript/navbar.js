document.getElementById("navbar").innerHTML =
    `<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="principal.html">
                <img src="midias/icone.png" alt="" width="30" height="30"
                    class="d-inline-block align-text-top">
                HisTHORGame-e
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="principal.html">Início</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#"
                            id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Perfil
                        </a>
                        <ul class="dropdown-menu"
                            aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="meus_dados.html">Meus Dados</a></li>                           
                            <li><a class="dropdown-item" href="meus_emblemas.html">Meus Emblemas</a></li>                            
                            <li><a class="dropdown-item" href="meu_desempenho.html">Meu Desempenho</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#"
                            id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Ranking
                        </a>
                        <ul class="dropdown-menu"
                            aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="ranking_principal.html">Principal</a></li>
                            <li><a class="dropdown-item" href="ranking_semanal.html">Semanal</a></li>
                            <li><a class="dropdown-item" href="ranking_universidade.html">Universidade</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page"
                            href="index.html">Sair</a>
                    </li>
                </div>
            </div>
        </nav>`