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