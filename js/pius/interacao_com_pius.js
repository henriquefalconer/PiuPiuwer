// --------------------------------------
// INTERATIVIDADE DO USUÁRIO COM OS PIUS:
// --------------------------------------

function ativarFuncoesPius() {
    var allPius = document.querySelectorAll(".piu");

    allPius.forEach(function(piu){
        var amarButton = piu.querySelector(".amar_button");
        var replyButton = piu.querySelector(".reply_button");
        var destacarButton = piu.querySelector(".destacar_button");

        amarButton.parentNode.addEventListener("click", function(){
            baseDeDados.togglePiuLike(piu.id);
        });

        replyButton.parentNode.addEventListener("click", function(){
            baseDeDados.replyPiu(piu.id);
        });

        destacarButton.parentNode.addEventListener("click", function(){
            baseDeDados.togglePiuDestaque(piu.id);
        });
    });
}