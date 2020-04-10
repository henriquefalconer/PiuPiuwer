// -----------------------------------------
// CONTROLAR BOTÕES DE AJUDA DOS FORMULÁRIOS
// -----------------------------------------

controlarAjudaButtonListener();

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
        
        // Desativar popup, caso seja clicado:
        popupAjuda.addEventListener("click", function(){
            this.classList.remove("show");
        });

    });
}