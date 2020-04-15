// ----------------------------------------------------
// CONTROLAR FUNCIONALIDADES DE POPUPS DE TELA INTEIRA:
// ----------------------------------------------------

popupWholeScreenCancelButtonListeners();

function closeAllWholeScreenPopups() {
    const openWholeScreenPopups = document.querySelectorAll(".popup_tela_cheia_ativo");
    openWholeScreenPopups.forEach(function(popup){
        togglePopupWholeScreen("#" + popup.id);
    });
}

function togglePopupWholeScreen(id) {
    var popupBackground = document.querySelector(id);
    popupBackground.classList.toggle("popup_tela_cheia_ativo");
}

function popupWholeScreenCancelButtonListeners() {
    var allPopupsDeTelaCheia = document.querySelectorAll(".popup_tela_cheia");

    allPopupsDeTelaCheia.forEach(function(popup){
        var popupCancelButton = popup.querySelector(".popup_exit_functionality");
    
        popupCancelButton.addEventListener("click", function(){
            togglePopupWholeScreen("#" + popup.id);
        });
    });
}