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

            incrementReplyCount(piu.id);

            adicionarPiuABaseDeDados(piarTextArea.value, piu.id);
        });
    });
}

function amarButtonListeners() {
    var allPius = document.querySelectorAll(".piu");

    allPius.forEach(function(piu){
        var amarButton = piu.querySelector(".amar_button");

        amarButton.parentNode.addEventListener("click", function(){
            incrementAmarCount(piu.id);
            montarPiusFeed();
        });
    });
}

function incrementReplyCount(piuId) {
    var nomeUsuario = piuId.split(":")[0];

    baseDeDados[nomeUsuario].pius.forEach(function(piu){
        if (piu.piu_id == piuId) {
            piu.actions.replies++;
        }
    });
}

function incrementAmarCount(piuId) {
    var nomeUsuario = piuId.split(":")[0];

    baseDeDados[nomeUsuario].pius.forEach(function(piu){
        if (piu.piu_id == piuId) {
            piu.actions.likes++;
        }
    });
}