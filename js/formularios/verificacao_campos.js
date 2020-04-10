// ------------------------------------------------
// VERIFICAÇÃO DE VALORES DOS CAMPOS DO FORMULÁRIO:
// ------------------------------------------------

// Acionar listener do botão de confirmar:
botaoConfirmarListener();

// Após um campo do formulário se tornar vermelho, a partir do momento que o usuário digitar algo, o campo deixa de ser vermelho: 
removerErroCampoFormulario();

function botaoConfirmarListener() {
    var buttonConfirmar = document.querySelector(".button_confirmar");

    buttonConfirmar.addEventListener("click", function(){
        event.preventDefault();

        var camposFormulario = document.querySelectorAll(".input_box");

        camposFormulario.forEach(function(campo){
            var campoEhValido = valorDoCampoEhValido(campo.querySelector(".textfield"));
            
            if (!campoEhValido) {
                for (const child of campo.children) {
                    child.classList.add("erro_no_campo");
                }
            }
            else {
                for (const child of campo.children) {
                    child.classList.remove("erro_no_campo");
                }
            }
            
        });

        var primeiroCampoComErro = document.querySelector(".erro_no_campo");

        var errorText = document.querySelector(".error_text");

        if (primeiroCampoComErro != null) {
            errorText.classList.remove("invisible");
            primeiroCampoComErro.focus();
        }
        else errorText.classList.add("invisible");

    });
}

function countOcorrencesInString(string, substring) {
    return (string.match(new RegExp(substring, "g")) || []).length;
}

function valorDoCampoEhValido(campo) {
    var tipoCampo = campo.classList[1];
    var valor = campo.value;
    
    if (valor.length == 0) return false;
    
    if (tipoCampo == "username") {
        // Se o valor não possuir apenas caracteres minúsculos, retornar falso:
        if (valor != valor.toLowerCase()) return false;
        
        // Se o valor possuir algum espaço, retornar falso:
        if (countOcorrencesInString(valor, " ") > 0) return 0;
    }
    
    if (tipoCampo == "email") {
        // Se o valor do campo possuir mais de um "@", retornar falso:
        if (countOcorrencesInString(valor, "@") != 1) return false;
        
        // Separação do domínio:
        var dominio = valor.split("@")[1];
        
        // Se domínio não possuir ".", retornar falso:
        if (countOcorrencesInString(dominio, ".") == 0) return false;
        
        // Se as strings entre "." do domínio possuírem tamanho zero, retornar falso:
        dominio.split(".").forEach(function(string){
            if (string.length == 0) return false;
        });
    }
    
    else if (tipoCampo == "birthdate") {
        // Obter quantidade de milissegundos desde 01/01/1970:
        var dataObjeto = transformarStringDataEmObjeto(valor);
        
        // Criar objeto com a data atual:
        var dataHoje = Date.parse(new Date());
        
        // Verificar se data existe:
        if (isNaN(dataObjeto)) return false;
        
        // Se data for anterior a 01/01/1903, retornar falso:
        if (dataObjeto < Date.parse("1903-01-01")) return false;
        
        // Se a data não estiver no passado, retornar falso:
        if (dataObjeto > dataHoje) return false;
        
        // Se a data não for, pelo menos, 12 anos atrás, retornar falso:
        if (!dataEhMaisDeTantosAnosAtras(valor, 12)) return false;
    }
    
    else if (tipoCampo == "password") {
        // Verificar se senha possuir no mínimo 6 caracteres:
        if (valor.length < 6) return false;
        
        // Verificar se senha possui, no mínimo, um caractere maiúsculo:
        if (valor == valor.toLowerCase()) return 0;
    }
    
    else if (tipoCampo == "confirmpassword") {
        var password = document.querySelector(".password").value;
        // Verificar se a confirmação de senha é igual à senha:
        if (valor != password) return false;
    }
    
    return true;
}

function removerErroCampoFormulario() {
    var camposFormulario = document.querySelectorAll(".input_box");

    camposFormulario.forEach(function(campo){
        campo.addEventListener("input", function(){
            if (campo.querySelector(".textfield").value.length != 0) {
                for (const child of campo.children) {
                    child.classList.remove("erro_no_campo");
                }
            }
        })
    });
}

function transformarStringDataEmObjeto(stringData) {
    if (countOcorrencesInString(stringData, "-") > 0) return NaN;
    var listaData = stringData.split("/");
    return Date.parse(listaData[2]+"-"+listaData[1]+"-"+listaData[0]); 
}

function dataEhMaisDeTantosAnosAtras(stringData, anos) {
    var dataHoje = new Date();
    
    var diaString = stringData.split("/")[0];
    var mesString = stringData.split("/")[1];
    var anoString = stringData.split("/")[2];
    
    var anoAtual = dataHoje.getFullYear();
    var mesAtual = dataHoje.getMonth() + 1;
    var diaAtual = dataHoje.getDate();
    
    if (anoString > (anoAtual - anos)) return false;
    
    if (anoString == (anoAtual - anos)) {
        if (mesString > mesAtual) return false;
        
        if (mesString == mesAtual) {
            if (diaString > diaAtual) return false;
        }
    }
    
    return true;
}