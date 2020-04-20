// -----------------------------------------
// CONTROLAR BOTÕES DE AJUDA DOS FORMULÁRIOS
// -----------------------------------------

controlarAjudaButtonListener();

// Acionar listener de mouse sobre popup button:
var isMouseOverPopupButton = false;
isMouseOverPopupButtonListener();

function controlarAjudaButtonListener() {
    // Obter caixas do formulário com botão de ajuda:
    var caixasFormulario = document.querySelectorAll(".input_box_help_parent");
    
    // Para cada popup de ajuda, associar a ele seu botão de ajuda, juntamente de seus listeners:
    caixasFormulario.forEach(function(caixa){
        var botaoAjuda = caixa.querySelector(".botao_ajuda");
        var popupAjuda = caixa.querySelector(".popup_ajuda");
        
        // Acionar ou desativar popup de ajuda após apertar botão:
        botaoAjuda.addEventListener("click", function(){
                var todosOsPopupAjuda = document.querySelectorAll(".popup_ajuda");

                todosOsPopupAjuda.forEach(function(popupQualquer){
                    if (popupQualquer != popupAjuda) popupQualquer.classList.remove("show");
                });

                popupAjuda.classList.toggle("show");
        });

    });

    document.addEventListener("click", function(){
        if (!isMouseOverPopupButton) {
            var popupsAjuda = document.querySelectorAll(".popup_ajuda");
            
            // Desativar todos os popups abertos:
            popupsAjuda.forEach(function(popupAjuda){
                popupAjuda.classList.remove("show");
            });

        }
    });
}

function isMouseOverPopupButtonListener() {
    var ajudaButtons = document.querySelectorAll(".botao_ajuda");

    // Se o mouse estiver sobre qualquer botão ajuda, definir isMouseOverPopupAjuda:
    ajudaButtons.forEach(function(button){
        button.addEventListener("mouseover", function(){
            isMouseOverPopupButton = true;
        });
        button.addEventListener("mouseout", function(){
            isMouseOverPopupButton = false;
        });
    });
}