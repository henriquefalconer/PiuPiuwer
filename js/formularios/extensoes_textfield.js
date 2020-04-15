// -----------------------
// EXTENSÕES DO TEXTFIELD:
// -----------------------

// Para todas as extensões de textfield possuírem o mesmo estilo de borda que a caixa do formulário, quando em foco:
manterEstiloDasExtensoesDoTextfieldIguaisAoDoTextfield();

// Fazer botão "Ver" funcionar, assim como alterar seu texto:
verSenhaListener();
        
// Fazer botões "Ver" apenas aparecerem quando alguma das caixas de texto não estiver vazia:
esconderBotoesVerSenha();

function manterEstiloDasExtensoesDoTextfieldIguaisAoDoTextfield() {
    // Obter caixas de formulário:
    var caixasFormulario = document.querySelectorAll(".input_box");
    
    // Para cada caixa, adicionar listeners que mudam o estilo do botão "Ver" para combinar com o de entrada de texto:
    caixasFormulario.forEach(function(caixa){
        var textfield = caixa.querySelector(".textfield");
        
        textfield.addEventListener("focusin", function(){
            for (const child of caixa.children) {z
                child.classList.add("focused_textfield");
            }
        });
        
        textfield.addEventListener("focusout", function(){
            for (const child of caixa.children) {
                child.classList.remove("focused_textfield");
            }
        });
    });
}

function verSenhaListener() {
    // Obter caixas de senha do formulário:
    var caixasSenha = document.querySelectorAll(".password_box");
    
    caixasSenha.forEach(function(caixa){
        var textfield = caixa.querySelector(".textfield");
        var verSenhaButton = caixa.querySelector(".ver_senha");
        
        verSenhaButton.addEventListener("click", function(){
            if (textfield.type == "password") {
                caixasSenha.forEach(function(_){
                    _.querySelector(".textfield").type = "text"
                    _.querySelector(".ver_senha").textContent = "Esconder"
                });
            } else {
                caixasSenha.forEach(function(_){
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
        var textfield = caixa.querySelector(".textfield");
    
        textfield.addEventListener("input", function(){
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
    
    // Para toda caixa de senha dada, verificar se algum de seus texfields possui texto:
    caixasSenha.forEach(function(caixa){
        var textfield = caixa.querySelector(".textfield");
        if (textfield.value.length > 0) {
            caixasVazias = false;
        } 
    });
    
    return caixasVazias;
}
