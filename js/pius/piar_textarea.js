// ----------------------------------------------------
// CONTROLAR FUNCIONALIDADES DA CAIXA DE TEXTO DE PIAR:
// ----------------------------------------------------

// Amuentar altura da caixa de texto de pius automaticamente:
autoSizeTextArea();

// Ativar funcionamento do botão de piar do topo do Feed:
piarButtonListener();

function autoSizeTextArea() {
    var textArea = document.querySelector("#piar_textfield");
    textArea.addEventListener("input", function() {

        // Reset field height
        this.style.height = 'inherit';
    
        // Get the computed styles for the element
        var computed = window.getComputedStyle(this);
    
        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                     + parseInt(computed.getPropertyValue('padding-top'), 10)
                     + this.scrollHeight
                     + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                     + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
        this.style.height = height + 'px';
    });
}

function piarButtonListener() {
    var piarButton = document.querySelector("#piar_box_button");

    if (piarButton != null) {
        var piarTextArea = document.querySelector("#piar_textfield");
    
        piarButton.addEventListener("click", function(){
            event.preventDefault();
    
            if (piarTextArea.value.length > 0 && piarTextArea.value.length <= 140) {
                baseDeDados.adicionarPiuABaseDeDados(piarTextArea.value);
                piarTextArea.value = "";
            }
        });

    }
}


