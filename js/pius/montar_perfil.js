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