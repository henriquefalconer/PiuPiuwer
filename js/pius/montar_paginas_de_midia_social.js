// ---------------------------------------------
// MONTAR ELEMENTOS DAS PÁGINAS DE MÍDIA SOCIAL:
// ---------------------------------------------

// Ativar listener do botão de recarregar página:
recarregarPaginaButtonListener();

// Montar, para cada avatar do usuário da página, a sua foto:
montarAvataresUsuario();

// Ativar link de perfil do usuário:
setPerfilButtonLink();

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
        avatar.src = "../img/avatars/" + baseDeDados[loggedInUser].info_usuario.avatar;
        
        // Adicionar link para acesso ao perfil do usuário logado:
        var avatarLink = avatar.parentNode;
        avatarLink.href = "perfil.html?user=" + loggedInUser;
    })
}

function setPerfilButtonLink() {
    var perfilButton = document.querySelector("#perfil_button");

    // Adicionar link para acesso ao perfil do usuário logado:
    perfilButton.href = "perfil.html?user=" + loggedInUser;
}