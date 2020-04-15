// ----------------------------------------------------
// CONTROLAR FUNCIONALIDADES DA CAIXA DE TEXTO DE PIAR:
// ----------------------------------------------------

// Amuentar altura da caixa de texto de pius automaticamente:
autoSizeTextArea();

// Ativar funcionamento do botão de piar do topo do Feed:
piarButtonListener();

// Controlar o contador de caracteres:
changeNumberOfCharactersColor();

function autoSizeTextArea() {
    var allTextAreas = document.querySelectorAll(".piar_textfield");
    allTextAreas.forEach(function(textArea){
        textArea.addEventListener("input", function() {
            // Reset field height:
            this.style.height = 'inherit';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
}

function piarButtonListener() {
    var piarBoxes = document.querySelectorAll(".piar_box");

    piarBoxes.forEach(function(piarBox){
        var piarTextArea = piarBox.querySelector(".piar_textfield");
        var piarButton = piarBox.querySelector(".piar_box_button");
    
        piarButton.addEventListener("click", function(){
            if (piarTextArea.value.length > 0 && piarTextArea.value.length <= 140) {
                var replyPiuId = null;

                if (piarBox.classList.contains("popup_reply_piu")) {
                    console.log(piarBox.querySelector(".piu_reply").id);
                    replyPiuId = piarBox.querySelector(".piu_reply").id;
                }

                baseDeDados.adicionarPiuABaseDeDados(piarTextArea.value, replyPiuId);
                piarTextArea.value = "";
                atualizarEstiloTextarea(piarBox);

                // Caso o botão esteja em um popup de tela cheia, fechar ele:
                if (piarBox.classList.contains("popup_piar_box")) {
                    closeAllWholeScreenPopups();
                }
            } else {
                togglePopupWholeScreen("#popup_piar_box_erro");
            }
        });
    });
}

function changeNumberOfCharactersColor() {
    var piarBoxes = document.querySelectorAll(".piar_box");

    piarBoxes.forEach(function(piarBox){
        var textArea = piarBox.querySelector(".piar_textfield");
        
        textArea.addEventListener("input", function(){
            atualizarEstiloTextarea(piarBox);
        });
    });
}

function atualizarEstiloTextarea(piarBox) {
    var textArea = piarBox.querySelector(".piar_textfield");
    var numberOfCharacters = piarBox.querySelector(".number_of_characters");
    var piarButton = piarBox.querySelector(".piar_box_button");

    if (textArea.value.length > 0) {
        numberOfCharacters.parentNode.classList.remove("invisible");
        piarButton.classList.remove("invalid_button_piu");

        if (textArea.value.length > 140) {
            numberOfCharacters.classList.add("invalid_number_of_characters");
            textArea.classList.add("invalid_text_area");
            piarButton.classList.add("invalid_button_piu");
        }
        else {
            numberOfCharacters.classList.remove("invalid_number_of_characters");
            textArea.classList.remove("invalid_text_area");
            piarButton.classList.remove("invalid_button_piu");
        }
        numberOfCharacters.textContent = textArea.value.length;
        
    }
    else {
        numberOfCharacters.parentNode.classList.add("invisible");
        piarButton.classList.add("invalid_button_piu");
        numberOfCharacters.classList.remove("invalid_number_of_characters");
        textArea.classList.remove("invalid_text_area");
    }
}