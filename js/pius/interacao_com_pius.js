// --------------------------------------
// INTERATIVIDADE DO USUÁRIO COM OS PIUS:
// --------------------------------------

function ativarFuncoesPius() {
    var allPius = document.querySelectorAll(".piu");

    // Para cada piu, adicionar suas funcionalidades:
    allPius.forEach(function(piu){
        var amarButton = piu.querySelector(".amar_button");
        var replyButton = piu.querySelector(".reply_button");
        var destacarButton = piu.querySelector(".destacar_button");

        // Adicionar listener de curtida:
        amarButton.parentNode.addEventListener("click", function(){
            baseDeDados.togglePiuLike(piu.id);
        });

        // Adicionar listener de resposta:
        replyButton.parentNode.addEventListener("click", function(){
            baseDeDados.replyPiu(piu.id);
        });

        // Adicionar listener de destaque:
        destacarButton.parentNode.addEventListener("click", function(){
            baseDeDados.togglePiuDestaque(piu.id);
        });
    });
}