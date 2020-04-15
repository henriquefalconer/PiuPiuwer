// ----------------------------------------------------
// CONTROLAR FUNCIONALIDADES DE POPUPS DE TELA INTEIRA:
// ----------------------------------------------------

function togglePopupWholeScreen(id) {
    var popupBackground = document.querySelector(id);
    popupBackground.classList.toggle("popup_tela_cheia_ativo");
}

function popupWholeScreenCancelButtonListener(id) {
    var popupBackground = document.querySelector(id);
    var popupCancelButton = popupBackground.querySelector(".popup_exit_functionality");

    popupCancelButton.addEventListener("click", function(){
        togglePopupWholeScreen(id);
    });
}