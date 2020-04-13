// -------------------------------------
// MONTAR ELEMENTOS DA PÁGINA DE PERFIL:
// -------------------------------------

carregarPaginaDePerfil();

function carregarPaginaDePerfil() {
    // A partir dos parâmetros passsados pelo url, obter nome de usuário requisitado:
    let parameters = new URLSearchParams(location.search);
    var usuario = parameters.get("user");

    // Obter dados do usuário em questão:
    var dadosUsuario = baseDeDados[usuario];

    // Alterar nome da aba para o nome de usuário em questão:
    var tabTitle = document.querySelector("#tab_title");
    tabTitle.textContent = "@" + usuario;

    // Caso a página de perfil seja do próprio usuário logado, alterar cor do botão de perfil:
    if (usuario == loggedInUser) {
        var perfilButton = document.querySelector("#perfil_button");
        perfilButton.classList.add("selected_navigation_button");
    }
}