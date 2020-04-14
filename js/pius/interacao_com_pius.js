// --------------------------------------
// INTERATIVIDADE DO USUÁRIO COM OS PIUS:
// --------------------------------------

function ativarFuncoesPius() {
    amarButtonListeners();
    replyButtonListeners();
    destacarButtonListeners();
}

function amarButtonListeners() {
    var allPius = document.querySelectorAll(".piu");

    allPius.forEach(function(piu){
        var amarButton = piu.querySelector(".amar_button");
        var replyButton = piu.querySelector(".reply_button");
        var destacarButton = piu.querySelector(".destacar_button");

        amarButton.parentNode.addEventListener("click", function(){
            baseDeDados.togglePiuLike(piu.id);
        });

        replyButton.parentNode.addEventListener("click", function(){
            var piarTextArea = document.querySelector("#piar_textfield");
            baseDeDados.replyPiu(piu.id, piarTextArea.value);
        });

        destacarButton.parentNode.addEventListener("click", function(){
            baseDeDados.togglePiuDestaque(piu.id);
        });
    });
}

function replyButtonListeners() {
    var allPius = document.querySelectorAll(".piu");

    allPius.forEach(function(piu){
    });
}

function destacarButtonListeners() {
    var allPius = document.querySelectorAll(".piu");

    allPius.forEach(function(piu){
    });
}