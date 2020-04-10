// ------------------------------------------
// FORMATAÇÃO DO CAMPO DE DATA DE NASCIMENTO:
// ------------------------------------------

formatarTextoDeDataDeNascimento();

function formatarTextoDeDataDeNascimento() {
    var birthdate = document.querySelector(".birthdate");

    birthdate.addEventListener("input", function(){
        // Obter texto não formatado:
        var textoDigitado = this.value;

        // Formatar texto para o formato de data:
        var textoFormatado = formatarTextoParaData(textoDigitado);

        // Inserir texto no campo do formulário:
        this.value = textoFormatado;

        // Alterar a posição do cursor de texto no campo do formulário:
        definirPosicaoDoCursorNaCaixaDeTexto(this, textoFormatado);
    });
}

function formatarTextoParaData(texto) {
    // Remover estrutura de barras e tracos do valor original do campo do formulário:
    var textoFormatado = removerBarrasETracos(texto)
    
    // Adicionar, até a string possuir um tamanho mínimo de 8 caracteres, um traço:
    while (textoFormatado.length < 8) {
        textoFormatado = textoFormatado + "-";
    }
    
    // Inserir a barra que separa o dia do mês, assim como a que separa o mês do ano:
    textoFormatado = textoFormatado.substring(0, 2) + "/" + textoFormatado.substring(2, 4) + "/" + textoFormatado.substring(4);
    
    if (textoFormatado == "--/--/----") {
        return "";
    } else {
        return textoFormatado;
    }
}


function removerBarrasETracos(texto) {
    return texto.replace(new RegExp("/", "g"), "").replace(new RegExp("-", "g"), "");
}

function definirPosicaoDoCursorNaCaixaDeTexto(elemento, texto) {
    var quantidadeNumerosDigitados = removerBarrasETracos(texto).length;
    var posicaoReal = quantidadeNumerosDigitados;
    
    // Caso a quantidade de números digitados pelo usuário for maior que 4, há duas barras ("/") que incrementam a posição do cursor, no total, em 2:
    if (quantidadeNumerosDigitados > 4) posicaoReal = quantidadeNumerosDigitados + 2;
    
    // Caso a quantidade de números digitados pelo usuário for maior que 2 e menor ou igual a 4, há uma barra ("/") que incrementa a posição do cursor em 1:
    else if (quantidadeNumerosDigitados > 2) {
        posicaoReal = quantidadeNumerosDigitados + 1;
    }
    
    // Definição definitiva da posicao do cursor:
    elemento.setSelectionRange(posicaoReal, posicaoReal);
}