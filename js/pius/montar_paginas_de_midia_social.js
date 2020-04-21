// ---------------------------------------------
// MONTAR ELEMENTOS DAS PÁGINAS DE MÍDIA SOCIAL:
// ---------------------------------------------

// Carregar elementos do usuário logado:
carregarElementosDoUsuarioLogado();

// Ativar listener do botão de recarregar página:
recarregarPaginaButtonListener();

// Montar, para cada avatar do usuário da página, a sua foto:
montarAvataresUsuario();

// Ativar link de perfil do usuário:
setPerfilButtonLink();

// Ativar listener do botão de piar do sidebar:
setSidebarPiarButtonListener();

// Alterar links para repassar usuário logado:
alterarLinksParaRepassarUsuarioLogado();

// Ativar listener para a mudança do estilo do pesquisar no piupiuwer:
pesquisarNoPiupiuwerListener(); 

// Ativar listener da barra de pesquisa:
listenerDePesquisa();

// Definir se mouse está acima do pesquisa resultados:
var isMouseOverPesquisaBox = false;
isMouseOverPesquisaResultadosListener();

function carregarElementosDoUsuarioLogado() {
    // A partir dos parâmetros passsados pelo url, obter nome de usuário logado:
    const parameters = new URLSearchParams(location.search);
    const usuario = parameters.get("loggedInAs");

    // Alterar usuario logado para o selecionado:
    loggedInUser = usuario;
}

function recarregarPaginaButtonListener() {
    var recarregarButton = document.querySelector("#recarregar_button");

    recarregarButton.addEventListener("click", function(){
        montarPiusFeed();
        montarAvataresUsuario();
    });
}

function montarAvataresUsuario() {
    var avatarPiarBox = document.querySelectorAll(".avatar_usuario_logado");

    avatarPiarBox.forEach(function(avatar){
        // Adicionar imagem do usuário logado:
        avatar.src = "../../img/avatars/" + baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.avatar;
        
        // Adicionar link para acesso ao perfil do usuário logado:
        var avatarLink = avatar.parentNode;
        avatarLink.href = "perfil.html?perfil=" + loggedInUser;
    })
}

function setPerfilButtonLink() {
    var perfilButton = document.querySelector("#perfil_button");

    // Adicionar link para acesso ao perfil do usuário logado:
    perfilButton.href = "perfil.html?perfil=" + loggedInUser;
}

function setSidebarPiarButtonListener() {
    const piarButtonSidebar = document.querySelector("#navigation_piar_button");

    piarButtonSidebar.addEventListener("click", function(){
        togglePopupWholeScreen("#popup_piar_sidebar");
    });
}

function alterarLinksParaRepassarUsuarioLogado() {
    // Alterar todos os links da página que não são o logout button para repassar usuario selecionado na sua url: 
    const allATags = document.querySelectorAll("a");

    allATags.forEach(function(aTag){
        if (aTag.id != "logout_button") {
            aTag.href = aTag.href + (aTag.href.includes("loggedInAs") ? "" : (aTag.href.includes("?") ? "&" : "?") + "loggedInAs=" + loggedInUser);
        }
    });
}

function pesquisarNoPiupiuwerListener() {
    var pesquisarBox = document.querySelector("#pesquisar_no_piupiwer_box");
    var textfieldBox = pesquisarBox.querySelector(".pesquisar_no_piupiwer_input");
    var pesquisarIcon = textfieldBox.querySelector("img");
    var results = pesquisarBox.querySelector("#pesquisar_no_piupiuwer_results");

    // Adicionar listener para acionar os resultados de pesquisa:
    document.addEventListener("click", function(){
        if (isMouseOverPesquisaBox) {
            montarResultadosDePesquisa();
            textfieldBox.classList.add("pesquisar_no_piupiwer_input_active");
            pesquisarIcon.src = "../../img/icons/Pesquisar Vermelho.svg";
            results.classList.remove("not_displayed");
        } else {
            textfieldBox.classList.remove("pesquisar_no_piupiwer_input_active");
            pesquisarIcon.src = "../../img/icons/Pesquisar.svg";
            results.classList.add("not_displayed");

        }
    });
}

function listenerDePesquisa() {
    var pesquisarBox = document.querySelector("#pesquisar_no_piupiwer_box");
    var textfield = pesquisarBox.querySelector("input");

    textfield.addEventListener("input", montarResultadosDePesquisa);
}

function montarResultadosDePesquisa() {
    var pesquisarBox = document.querySelector("#pesquisar_no_piupiwer_box");
    var textfield = pesquisarBox.querySelector("input");
    var searchTerm = textfield.value;

    var results = document.querySelector("#pesquisar_no_piupiuwer_results");

    var allResults = [];

    var sortedUsuarioDatas = baseDeDados.data;

    sortedUsuarioDatas.sort((a,b) => a.infoUsuario.nome > b.infoUsuario.nome ? 1 : -1);

    sortedUsuarioDatas.forEach(function(usuarioData){
        if (usuarioData.infoUsuario.nome.count(searchTerm) > 0 || usuarioData.infoUsuario.username.count(searchTerm) > 0) {
            allResults.push(montarPesquisaCard(usuarioData.infoUsuario));
        }
    });

    results.innerHTML = "";

    if (allResults.length > 0 && searchTerm.length > 0) {
        var ol = document.createElement("ol");

        allResults.forEach(function(card){
            ol.appendChild(card);
        });

        results.appendChild(ol);

        alterarLinksParaRepassarUsuarioLogado();
    } else {
        var p = document.createElement("p");
        p.classList.add("pesquisar_no_piupiwer_dica");
        p.textContent = "Tente buscar por pessoas no Piupiuwer";

        results.appendChild(p);
    }
}

function montarPesquisaCard(infoUsuario) {
    var pesquisaCard = document.createElement("li");

    var link = document.createElement("a");
    link.classList.add("pesquisa_card");
    link.href = "perfil.html?perfil=" + infoUsuario.username;

    var avatar = montarAvatarDoPiu("avatar_pesquisa", infoUsuario.avatar);
    link.appendChild(avatar);

    var textArea = document.createElement("div");
    textArea.classList.add("text_area");

    var title = document.createElement("h3");
    title.classList.add("nome_pesquisa");
    title.textContent = infoUsuario.nome.length > 24 ? infoUsuario.nome.abreviar() : infoUsuario.nome;
    textArea.appendChild(title);

    var username = document.createElement("p");
    username.classList.add("username_pesquisa");
    username.textContent = "@" + infoUsuario.username;
    textArea.appendChild(username);
    
    link.appendChild(textArea);

    pesquisaCard.appendChild(link);

    return pesquisaCard;
}

function isMouseOverPesquisaResultadosListener() {
    var pesquisarBox = document.querySelector("#pesquisar_no_piupiwer_box");

    pesquisarBox.addEventListener("mouseover", function(){
        isMouseOverPesquisaBox = true;
    });

    pesquisarBox.addEventListener("mouseout", function(){
        isMouseOverPesquisaBox = false;
    });
}