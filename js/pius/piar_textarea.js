// ----------------------------------------------------
// CONTROLAR FUNCIONALIDADES DA CAIXA DE TEXTO DE PIAR:
// ----------------------------------------------------

// Amuentar altura da caixa de texto de pius automaticamente:
autoSizeTextArea();

// Ativar funcionamento do botão de piar do topo do Feed:
piarButtonListener();

// Controlar o contador de caracteres:
changeNumberOfCharactersColor();

// Ativar botão de "OK" na caixa de erro do piar box:
popupWholeScreenCancelButtonListener("#popup_piar_box_erro");

function autoSizeTextArea() {
    var allTextAreas = document.querySelectorAll(".piar_textfield");
    allTextAreas.forEach(function(textArea){
        textArea.addEventListener("input", function() {
            // Reset field height:
            this.style.height = 'inherit';
            
            // Get the computed styles for the element:
            var computed = window.getComputedStyle(this);
            
            // Calculate the height:
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                         + parseInt(computed.getPropertyValue('padding-top'), 10)
                         + this.scrollHeight
                         + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                         + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
            this.style.height = height + 'px';
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
                baseDeDados.adicionarPiuABaseDeDados(piarTextArea.value);
                piarTextArea.value = "";
                atualizarEstiloTextarea(piarBox);
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