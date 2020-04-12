// ----------------------------------------------------
// CONTROLAR FUNCIONALIDADES DA CAIXA DE TEXTO DE PIAR:
// ----------------------------------------------------

autoSizeTextArea();

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
    
        console.log(height);
        this.style.height = height + 'px';
    });
}

