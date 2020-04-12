// ----------------------------------------------------------------
// A PARTIR DE UMA BASE DE DADOS, MONTAR SEQUÊNCIA DE PIUS NO FEED:
// ----------------------------------------------------------------

var loggedInUser = "fulano.beltrano";

var baseDeDados = {
    "fulano.beltrano": {
        info_usuario: {
            nome: "Fulano Beltrano da Silva",
            avatar: "Fulano.png",
            seguidores: [
                "rosi.plat",
                "richar.lison",
            ],
            seguindo: [
                "cleber.cunha",
                "rosi.plat",
                "richar.lison",
            ],
        },
        pius: [
            {
                piu_id: "fulano.beltrano:" + Date.parse("12 Apr 2020 12:17:00"),
                actions: {
                    likes: 11,
                    replies: 5,
                    destacado: false,
                },
                message: "E pensar que tem caras por aí que só piam a quantidade de pius que eles já postaram... Eles parecem mal saber de todo o potencial que a plataforma PiuPiuwer tem!",
                piu_reply_id: null,
            },
        ],
    },
    "cleber.cunha": {
        info_usuario: {
            nome: "Cleber",
            avatar: "Cleber.png",
            seguidores: [
                "richar.lison",
            ],
            seguindo: [
                "fulano.beltrano",
                "rosi.plat",
                "richar.lison",
            ],
        },
        pius: [
            {
                piu_id: "cleber.cunha:" + Date.parse("12 Apr 2020 11:00:00"),
                actions: {
                    likes: 10,
                    replies: 4,
                    destacado: false,
                },
                message: "Este é meu 100º piu! Esperei bastante por este momento!",
                piu_reply_id: null,
            },
            {
                piu_id: "cleber.cunha:" + Date.parse("12 Apr 2020 8:00:00"),
                actions: {
                    likes: 10,
                    replies: 4,
                    destacado: false,
                },
                message: "Este é meu 99º piu! Isso é 1 a menos que 100!",
                piu_reply_id: null,
            },
        ],
    },
    "richar.lison": {
        info_usuario: {
            nome: "Richarlison",
            avatar: "Richarlison.png",
            seguidores: [
                "rosi.plat",
                "fulano.beltrano",
            ],
            seguindo: [
                "rosi.plat",
                "fulano.beltrano",
            ],
        },
        pius: [
            {
                piu_id: "richar.lison:" + Date.parse("12 Apr 2020 8:30:00"),
                actions: {
                    likes: 10,
                    replies: 5,
                    destacado: false,
                },
                message: "Sim! Sem dúvidas, é a melhor rede social que existe.",
                piu_reply_id: "rosi.plat:" + Date.parse("12 Apr 2020 7:00:00"),
            },
        ],
    },
    "rosi.plat": {
        info_usuario: {
            nome: "Rosimary",
            avatar: "Rosimary.png",
            seguidores: [
                "richar.lison",
            ],
            seguindo: [],
        },
        pius: [
            {
                piu_id: "rosi.plat:" + Date.parse("12 Apr 2020 7:00:00"),
                actions: {
                    likes: 10,
                    replies: 5,
                    destacado: false,
                },
                message: "Comecei a usar hoje! Parece ser bom esse PiuPiwer.",
                piu_reply_id: null,
            },
        ],
    },
};

montarPiusFeed();

function montarPiusFeed() {
    var allPius = [];

    Object.keys(baseDeDados).forEach(function(user){
        var userInfo = baseDeDados[user].info_usuario;
        var userPius = baseDeDados[user].pius;

        userPius.forEach(function(piu){
            allPius.push(piu);
        });
    });

    sortPiusInTime(allPius);

    var piusArea = document.querySelector("#pius_area");

    allPius.forEach(function(piu){
        var piuElement = montarPiuElement(piu);

        piusArea.appendChild(piuElement);
    });
    
}

function sortPiusInTime(pius){
    pius.sort(function(a, b){return getTimeFromPiuId(b.piu_id) - getTimeFromPiuId(a.piu_id)});
}

function getTimeFromPiuId(piuId){
    return piuId.split(":")[1];
}

function montarPiuElement(piu) {
    var piuElement = document.createElement("div");
    piuElement.classList.add("piu");

    var dadosUsuario = getDadosUsuarioFromPiuId(piu.piu_id);

    // Montar área principal do piu:
    var areaPrincipal = montarAreaPrincipal(piu, dadosUsuario);
    piuElement.appendChild(areaPrincipal);

    // Montar action buttons do piu:
    var actionButtons = montarPiuActionButtons(piu.actions);
    piuElement.appendChild(actionButtons);

    return piuElement;
}

function getDadosUsuarioFromPiuId(piuId) {
    var nomeUsuario = piuId.split(":")[0];

    var infoUsuario = {};

    Object.keys(baseDeDados).forEach(function(usuario){
        if (usuario == nomeUsuario) {
            infoUsuario = baseDeDados[usuario].info_usuario;
            infoUsuario["username"] = nomeUsuario;
        }
    });

    return infoUsuario;
}

function getPiuFromPiuId(piuId) {
    var nomeUsuario = piuId.split(":")[0];

    var piuData = {};

    Object.keys(baseDeDados).forEach(function(usuario){
        if (usuario == nomeUsuario) {
            baseDeDados[usuario].pius.forEach(function(piu){
                if (piu.piu_id == piuId) piuData = piu;
            });
        }
    });

    return piuData;
}

function montarAreaPrincipal(dadosPiu, dadosUsuario) {
    var piuMainArea = document.createElement("div");
    piuMainArea.classList.add("piu_main_area");

    // Montar avatar do piu:
    var piuAvatar = document.createElement("img");
    piuAvatar.classList.add("avatar_piu");
    piuAvatar.alt = "Avatar usuário";
    piuAvatar.src = "../img/avatars/" + dadosUsuario.avatar;
    piuMainArea.appendChild(piuAvatar);

    // Montar área de texto do piu:
    var piuTextArea = document.createElement("div");
    piuTextArea.classList.add("piu_text_area");

    // Montar informações do piu:
    var piuInfo = montarPiuInfo(dadosUsuario, dadosPiu);
    piuTextArea.appendChild(piuInfo);    

    // Montar mensagem do piu:
    var piuMessage = document.createElement("p");
    piuMessage.classList.add("piu_message");
    piuMessage.textContent = dadosPiu.message;
    piuTextArea.appendChild(piuMessage);

    // Caso exista, montar um piu_reply:
    if (dadosPiu.piu_reply_id != null) {
        // Montar piu_reply:
        var piuReply = montarPiuReply(dadosPiu.piu_reply_id);
        piuTextArea.appendChild(piuReply);
    }
    
    // Inserir piuTextArea em piuMainArea:
    piuMainArea.appendChild(piuTextArea);   

    return piuMainArea;
}

function montarPiuReply(replyPiuId) {
    var piuReply = document.createElement("div");
    piuReply.classList.add("piu");
    piuReply.classList.add("piu_reply");

    // Definir dados do piu_reply: 
    var replyUserData = getDadosUsuarioFromPiuId(replyPiuId);
    var replyPiuData = getPiuFromPiuId(replyPiuId);

    // Montar piuReplyInfo, porém sem avatar:
    var piuReplyInfo = montarPiuInfo(replyUserData, replyPiuData);

    // Montar avatar no piuReplyInfo: 
    var piuReplyAvatar = document.createElement("img");
    piuReplyAvatar.classList.add("avatar_piu_reply");
    piuReplyAvatar.alt = "Avatar usuário reply";
    piuReplyAvatar.src = "../img/avatars/" + replyUserData.avatar;
    piuReplyInfo.insertBefore(piuReplyAvatar, piuReplyInfo.childNodes[0]);

    // Adicionar piuReplyInfo em piuReply:
    piuReply.appendChild(piuReplyInfo);

    // Montar div da mensagem do piu_reply:
    var piuReplyTextArea = document.createElement("div");
    piuReplyTextArea.classList.add("piu_text_area");
    piuReplyTextArea.classList.add("piu_reply_text_area");

    // Montar mensagem do piu_reply:
    var piuReplyMessage = document.createElement("p");
    piuReplyMessage.classList.add("piu_message");
    piuReplyMessage.textContent = replyPiuData.message;
    piuReplyTextArea.appendChild(piuReplyMessage);

    // Adicionar piuReplyTextArea em piuReply:
    piuReply.appendChild(piuReplyTextArea);

    return piuReply;
}

function getRelativeTime(timeInMilliseconds) {
    var relativeTime = "";

    var currentTime = Date.parse(new Date());

    var differenceInSeconds = (currentTime - timeInMilliseconds)/1000;

    if (differenceInSeconds < 60) {
        relativeTime = differenceInSeconds.toFixed(0) + " s";
    } else if (differenceInSeconds < 3600) {
        relativeTime = (differenceInSeconds/60).toFixed(0) + " min";
    } else if (differenceInSeconds < 3600*24) {
        relativeTime = (differenceInSeconds/3600).toFixed(1) + " h";
    } else {
        relativeTime = (differenceInSeconds/3600/24).toFixed(0) + " dias";
    }

    return relativeTime;
}

function montarPiuInfo(dadosUsuario, dadosPiu) {
    var piuInfo = document.createElement("p");
    piuInfo.classList.add("piu_info");

    // Montar elementos do piuInfo:
    var piuName = document.createElement("span");
    piuName.classList.add("piuwer_name");
    piuName.textContent = dadosUsuario.nome;
    piuInfo.appendChild(piuName);

    var piuUserName = document.createElement("span");
    piuUserName.classList.add("piuwer_username");
    piuUserName.textContent = "@" + dadosUsuario.username;
    piuInfo.appendChild(piuUserName);

    var piuPonto = document.createElement("span");
    piuPonto.classList.add("ponto");
    piuPonto.classList.add("ponto_piu");
    piuInfo.appendChild(piuPonto);

    var piuTime = document.createElement("span");
    piuTime.classList.add("piu_time");
    piuTime.textContent = getRelativeTime(getTimeFromPiuId(dadosPiu.piu_id));
    piuInfo.appendChild(piuTime);    

    return piuInfo;
}

function montarPiuActionButtons(dados) {
    var piuActionsArea = document.createElement("div");
    piuActionsArea.classList.add("piu_actions_area");

    // Montar ação de amar:
    var amarBox = createActionElement("amar_button", "Amar", "Amar.png", dados.likes);
    piuActionsArea.appendChild(amarBox);

    // Montar ação de retornar:
    var retornarBox = createActionElement("reply_button", "Retornar", "Retornar.png", dados.replies);
    piuActionsArea.appendChild(retornarBox);

    // Montar ação de destacar:
    var destacarBox = createActionElement("highlight_button", "Destacar", "Alfinete.png");
    piuActionsArea.appendChild(destacarBox);
    
    return piuActionsArea;
}

function createActionElement(iconClass, iconAlt, iconSrc, actionCountNumber) {
    var actionBox = document.createElement("div");
    actionBox.classList.add("action_box");

    var amarIcon = createImgElement(["piu_action_icon", iconClass], iconAlt, "../img/icons/" + iconSrc);
    actionBox.appendChild(amarIcon);

    if (actionCountNumber != null) {
        var actionCount = document.createElement("p");
        actionCount.classList.add("action_count");
        actionCount.textContent = actionCountNumber;
        actionBox.appendChild(actionCount);
    }

    return actionBox;
}

function createImgElement(classList, alt, src) {
    var img = document.createElement("img");
    classList.forEach(function(classItem){
        img.classList.add(classItem);
    });
    img.alt = alt;
    img.src = src;
    return img;
}