// -----------------------
// EXTENSÕES DO TEXTFIELD:
// -----------------------

// Para o botão "Ver" possuir o mesmo estilo de borda que a caixa do formulário, quando em foco:
manterEstiloDaBarraInferiorDasCriancasDaCaixaDoFormulario();

// Fazer botão ver funcionar, assim como alterar seu texto:
verSenhaListener();
        
// Fazer botões "Ver" apenas aparecerem quando alguma das caixas de texto não estiver vazia:
esconderBotoesVerSenha();

function manterEstiloDaBarraInferiorDasCriancasDaCaixaDoFormulario() {
    // Obter caixas de senha do formulário:
    var senhasFormulario = document.querySelectorAll(".input_box");
    
    // Para cada caixa, adicionar listeners que mudam o estilo do botão "Ver" para combinar com o de entrada de texto:
    senhasFormulario.forEach(function(caixa){
        var textoCaixa = caixa.querySelector(".textfield");
        var children = caixa.children;
        
        textoCaixa.addEventListener("focusin", function(){
            for (const child of caixa.children) {
                child.classList.add("focused_textfield");
            }
        });
        
        textoCaixa.addEventListener("focusout", function(){
            for (const child of caixa.children) {
                child.classList.remove("focused_textfield");
            }
        });
    });
}

function verSenhaListener() {
    // Obter caixas de senha do formulário:
    var senhasFormulario = document.querySelectorAll(".password_box");
    
    senhasFormulario.forEach(function(caixa){
        var senhaTextField = caixa.querySelector(".textfield");
        var verSenhaButton = caixa.querySelector(".ver_senha");
        
        verSenhaButton.addEventListener("click", function(){
            if (senhaTextField.type == "password") {
                senhasFormulario.forEach(function(_){
                    _.querySelector(".textfield").type = "text"
                    _.querySelector(".ver_senha").textContent = "Esconder"
                });
            } else {
                senhasFormulario.forEach(function(_){
                    _.querySelector(".textfield").type = "password"
                    _.querySelector(".ver_senha").textContent = "Ver"
                });
            }
        });
    });
}

function esconderBotoesVerSenha() {
    // Obter caixas de senha do formulário:
    var caixasSenha = document.querySelectorAll(".password_box");
    
    // Obter botoes "Ver":
    var verSenhaButtons = document.querySelectorAll(".ver_senha");
    
    // Para toda caixa de senha, adicione um listener em sua caixa de texto para verificar se os botões "Ver" deveriam ser mostrados:
    caixasSenha.forEach(function(caixa){
        var senhaTextField = caixa.querySelector(".textfield");
    
        senhaTextField.addEventListener("input", function(){
            if (!caixasDeSenhaEstaoTodasVazias(caixasSenha)) {
                verSenhaButtons.forEach(function(button){
                    button.classList.remove("ver_senha_invisible");
                })
            }
            else {
                verSenhaButtons.forEach(function(button){
                    button.classList.add("ver_senha_invisible");
                })
            }
        });
        
    });
}

function caixasDeSenhaEstaoTodasVazias(caixasSenha) {
    var caixasVazias = true;
    
    caixasSenha.forEach(function(caixa){
        var caixaDeTextoSenha = caixa.querySelector(".textfield");
        if (caixaDeTextoSenha.value.length > 0) {
            caixasVazias = false;
        } 
    });
    
    return caixasVazias;
}
