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

        var todosOsCamposSaoValidos = true;

        camposFormulario.forEach(function(campo){
            var textfield = campo.querySelector(".textfield");
            var campoEhValido = valorDoCampoEhValido(textfield);
            
            if (!campoEhValido) {
                todosOsCamposSaoValidos = false;
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

        if (todosOsCamposSaoValidos) {

            if (!location.href.includes("perfil.html")) {
                const usuarioSelecionado = document.querySelector("#username").value;
                location.replace("../paginas_de_midia_social/feed.html?loggedInAs=" + usuarioSelecionado);    
            } else {
                var infoUsuario = baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario;
                infoUsuario.nome = document.querySelector("#name").value;
                infoUsuario.descricao = document.querySelector("#description").value;
                montarDadosPessoais();
                montarPiusFeed();
                togglePopupWholeScreen("#popup_alterar_perfil");
            }

        } else {

            var primeiroCampoComErro = document.querySelector(".erro_no_campo");
    
            var errorText = document.querySelector(".error_text");
    
            if (primeiroCampoComErro != null) {
                errorText.classList.remove("not_displayed");
                primeiroCampoComErro.focus();
            }
            else errorText.classList.add("not_displayed");

        }

    });
}

function valorDoCampoEhValido(textfield) {
    var tipoCampo = textfield.id;
    var valor = textfield.value;
    var parentOfParent = textfield.parentNode.parentNode;
    
    if (valor.length == 0) return false;
    
    // Se, e apenas se, a caixa do formulário do textfield estiver envolvida por uma pai de popup ajuda, faça o seguinte:
    if (parentOfParent.classList.contains("input_box_help_parent")) {
        if (tipoCampo == "username") {
            // Se o nome de usuário não for válido, retornar falso:
            const usernamesValidos = ["fulano.beltrano", "cleber.cunha", "richar.lison", "rosi.plat"];
            if (!usernamesValidos.includes(valor)) return false;
        }
        
        if (tipoCampo == "email") {
            // Se o valor do campo possuir mais de um "@", retornar falso:
            if (valor.count("@") != 1) return false;
            
            // Separação do domínio:
            var dominio = valor.split("@")[1];
            
            // Se domínio não possuir ".", retornar falso:
            if (dominio.count(/\./) == 0) return false;
            
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
            var password = document.querySelector("#password").value;
            // Verificar se a confirmação de senha é igual à senha:
            if (valor != password) return false;
        }

        else if (tipoCampo == "password_login") {
            // Se o valor inserido for diferente de "Password", retornar falso:
            if (valor != "Password") return false;
        }

        else if (tipoCampo == "description") {
            // Se o valor for maior que 140 caracteres, retornar falso:
            if (valor.length > 140) return false;
        }
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
    if (stringData.count("-") > 0) return NaN;
    var listaData = stringData.split("/");
    return Date.parse(listaData[2]+"-"+listaData[1]+"-"+listaData[0]); 
}

function dataEhMaisDeTantosAnosAtras(stringData, anos) {
    // Obtenção do dia, mês e ano especificado:
    var diaString = stringData.split("/")[0];
    var mesString = stringData.split("/")[1];
    var anoString = stringData.split("/")[2];
    
    // Obtenção do dia, mês e ano atuais:
    var dataHoje = new Date();
    var anoAtual = dataHoje.getFullYear();
    var mesAtual = dataHoje.getMonth() + 1;
    var diaAtual = dataHoje.getDate();
    
    // Verificação de ordem:
    if (anoString > (anoAtual - anos)) return false;
    if (anoString == (anoAtual - anos)) {
        if (mesString > mesAtual) return false;
        if (mesString == mesAtual) {
            if (diaString > diaAtual) return false;
        }
    }
    return true;
}