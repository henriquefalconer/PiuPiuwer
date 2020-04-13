// --------------------------------------
// INTERATIVIDADE DO USUÁRIO COM OS PIUS:
// --------------------------------------

function ativarFuncoesPius() {
    replyButtonListeners();
    amarButtonListeners();
}

function replyButtonListeners() {
    var allPius = document.querySelectorAll(".piu");

    allPius.forEach(function(piu){
        var replyButton = piu.querySelector(".reply_button");

        replyButton.parentNode.addEventListener("click", function(){
            var piarTextArea = document.querySelector("#piar_textfield");

            baseDeDados.adicionarPiuABaseDeDados(piarTextArea.value, piu.id);
        });
    });
}

function amarButtonListeners() {
    var allPius = document.querySelectorAll(".piu");

    allPius.forEach(function(piu){
        var amarButton = piu.querySelector(".amar_button");

        amarButton.parentNode.addEventListener("click", function(){
            baseDeDados.togglePiuLike(piu.id);
        });
    });
}