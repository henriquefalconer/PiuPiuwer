// ------------------------
// MONTAR PÁGINA DE PERFIL:
// ------------------------

// Selecionar tipo de feed:
var tipoDeFeed = TipoDeFeed.apenasPiusDoUsuario;
var usuarioSelecionado;

// Montar elementos da página de perfil:
carregarPaginaDePerfil();

// Listener da largura de tela, que define se textos (como os nomes de usuários) deveriam ser abreviados:
listenerLarguraTela();

listenerDosBotoesDeTipoDeFeed();

function carregarPaginaDePerfil() {
    // A partir dos parâmetros passsados pelo url, obter nome de usuário requisitado:
    var parameters = new URLSearchParams(location.search);
    var usuario = parameters.get("perfil");

    // Alterar nome da aba para o nome de usuário em questão:
    var tabTitle = document.querySelector("#tab_title");
    tabTitle.textContent = "@" + usuario;

    // Caso a página de perfil seja do próprio usuário logado, alterar cor do botão de perfil:
    if (usuario == loggedInUser) {
        var perfilButton = document.querySelector("#perfil_button");
        perfilButton.classList.add("selected_navigation_button");
        const perfilIcon = perfilButton.querySelector("img");
        perfilIcon.src = perfilIcon.src.split(".svg")[0] + " Vermelho.svg";
    }

    // Registrar usuário selecionado:
    usuarioSelecionado = usuario;
}

function listenerDosBotoesDeTipoDeFeed() {
    var botoesFeed = document.querySelectorAll(".button_navigation_perfil");

    botoesFeed.forEach(function(botao){
        botao.addEventListener("click", function(){
            // Atualizar tipo de feed:
            tipoDeFeed = TipoDeFeed[this.id];

            // Atualizar feed de pius:
            montarPiusFeed();

            // Atualizar aparência dos botões:
            botoesFeed.forEach(function(cadaBotao){
                cadaBotao.classList.remove("selected_navigation_perfil_button");
            })
            this.classList.add("selected_navigation_perfil_button");

            // Abreviar nomes, se necessário:
            abreviarNomesCasoNecessario();
        });
    });
}

function montarDadosPessoais() {
    var perfilArea = document.querySelector("#perfil_content");

    if (perfilArea != null) {
        // Obter dados do usuário em questão:
        var dadosUsuario = baseDeDados.getDadosUsuarioFromUsername(usuarioSelecionado);

        // Alterar dados da página de perfil:
        var planoDeFundo = perfilArea.querySelector("#fundo_perfil");
        planoDeFundo.src = "../../img/background/" + dadosUsuario.infoUsuario.background;

        var perfilAvatar = perfilArea.querySelector("#perfil_avatar");
        perfilAvatar.src = getAvatarSrc(dadosUsuario.infoUsuario.avatar, ImgurSize.medium);

        var seguidoresCounter = perfilArea.querySelector("#seguidores_counter");
        seguidoresCounter.textContent = dadosUsuario.infoUsuario.seguidores.length;

        if (dadosUsuario.infoUsuario.seguidores.length == 1) {
            seguidoresCounter.parentNode.querySelector(".number_text").textContent = "Seguidor";
        }

        var seguirButtonArea = document.querySelector("#numbers_right_side");
        seguirButtonArea.innerHTML = "";
        if (loggedInUser == usuarioSelecionado) {
            seguirButtonArea.appendChild(montarBotaoDeAlterarPerfil());
        } else if (baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.seguindo.includes(usuarioSelecionado)) {
            seguirButtonArea.appendChild(montarBotaoDeSeguindo());
        } else {
            seguirButtonArea.appendChild(montarBotaoDeSeguir());
        }

        var seguindoCounter = perfilArea.querySelector("#seguindo_counter");
        seguindoCounter.textContent = dadosUsuario.infoUsuario.seguindo.length;

        var nomePerfil = perfilArea.querySelector("#nome_perfil");
        nomePerfil.textContent = dadosUsuario.infoUsuario.nome;

        var usernamePerfil = perfilArea.querySelector("#username_perfil");
        usernamePerfil.textContent = "@" + dadosUsuario.infoUsuario.username;
        
        var descricaoPerfil = perfilArea.querySelector("#descricao_perfil");
        descricaoPerfil.textContent = dadosUsuario.infoUsuario.descricao;

        listenerBotaoSeguir();
        listenerBotaoAlterarPerfil();
    }
}

function montarBotaoDeAlterarPerfil() {
    var divElement = document.createElement("div");
    divElement.classList.add("hollow_button");
    divElement.classList.add("seguir_button");
    divElement.id = "alterar_perfil";

    var pElement = document.createElement("p");
    pElement.textContent = "Alterar perfil";
    divElement.appendChild(pElement);

    return divElement;
}

function montarBotaoDeSeguir() {
    var divElement = document.createElement("div");
    divElement.classList.add("hollow_button");
    divElement.classList.add("seguir_button");
    divElement.id = "seguir_button";

    var pElement = document.createElement("p");
    pElement.textContent = "Seguir";
    divElement.appendChild(pElement);

    return divElement;
}

function montarBotaoDeSeguindo() {
    var divElement = document.createElement("div");
    divElement.classList.add("filled_button");
    divElement.classList.add("seguindo_button");
    divElement.id = "seguir_button";

    var iconElement = document.createElement("i");
    iconElement.classList.add("fa");
    iconElement.classList.add("fa-check");
    iconElement.ariaHidden = "true";
    divElement.appendChild(iconElement);

    var pElement = document.createElement("p");
    pElement.textContent = "Seguindo";
    divElement.appendChild(pElement);

    return divElement;
}

function listenerBotaoSeguir() {
    var botaoSeguir = document.querySelector("#seguir_button");

    if (botaoSeguir != null) {
    
        botaoSeguir.addEventListener("click", function(){
            var seguindoList = baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.seguindo;
            const index = seguindoList.indexOf(usuarioSelecionado)
            if (index == -1) {
                seguindoList.push(usuarioSelecionado);
            } else {
                seguindoList.splice(index, 1);
            }
            montarDadosPessoais();
        });

    }
}

function listenerBotaoAlterarPerfil() {
    var botaoAlterarPerfil = document.querySelector("#alterar_perfil");

    if (botaoAlterarPerfil != null) {
        botaoAlterarPerfil.addEventListener("click", function(){
            console.log("www");
            setupFormAlterarPerfil();
            togglePopupWholeScreen("#popup_alterar_perfil");
        });
    }
}

function setupFormAlterarPerfil() {
    if (loggedInUser == usuarioSelecionado) {
        const infoUsuario = baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario;
        document.querySelector("#name").value = infoUsuario.nome;
        document.querySelector("#description").value = infoUsuario.descricao;
    }
}