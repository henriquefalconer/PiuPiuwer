// ---------------------------------------------------
// IMPLEMENTAÇÃO DOS PIUS DO SERVIDOR À BASE DE DADOS:
// ---------------------------------------------------

getJsonData("https://next.json-generator.com/api/json/get/EkyZfHLU_", implementarPius);

function implementarPius(piusData) {
    piusData.forEach(function(usuarioJsonData){

        // Caso o usuário não possua imagem, associe a imagem de usuário nulo:
        if (usuarioJsonData["imagem"].length == 0) {
            var imageUrl = "null.svg";
        } else {
            var imageUrl = usuarioJsonData["imagem"];
        }

        const username = usuarioJsonData["username"].split("@")[1];

        var usuarioData = new UsuarioData(
            new InfoUsuario(
                // Nome:
                usuarioJsonData["nome"],
                // Nome de usuário:
                username,
                // Arquivo de avatar:
                imageUrl,
                // Arquivo de plano de fundo do perfil:
                "Fundo PJ.jpg",
                // Seguidores:
                [
                    "rosi.plat",
                    "richar.lison",
                ],
                // Seguindo:
                [
                    "cleber.cunha",
                    "rosi.plat",
                    "richar.lison",
                ],
                // IDs dos pius que o usuário deu like:
                [],
                // Pius destacados:
                [],
                // Na plataforma desde:
                Date.parse("02 Apr 2020 7:00:00"),
                // Descrição de perfil
                "Jogador de Gartic com eventuais trabalhos na PJ.",
            ),
            [
                new Piu(
                    // PiuId, com o horário em que piu foi postado (neste caso, aleatório) e o nome de usuário de quem postou:
                    username + ":" + getTimeForServerUser(username),
                    usuarioJsonData["mensagem"],
                ),
            ],
        );

        baseDeDados.data.push(usuarioData);
    });

    // Atualizar feed de pius:
    montarPiusFeed();

    // Atualizar dados da página de perfil, caso ela exista:
    montarDadosPessoais();
}

function getTimeForServerUser(username) {
    const lista = {
        "YeVictor": 1586920279000,
        "Murilo_T": 1586920952000,
        "Clau": 1586922954000,
        "Jorel": 1586923140000,
        "FabioBassoi": 1586923741000,
        "Diegoo": 1586924665000,
        "Mateeus": 1586926007000,
        "MatiasH": 1586926500000,
        "Ken?": 1586929207000,
        "Enzo": 1586935441000,
        "Gakio": 1586950236000,
        "Magodosdoces": 1586958322000,
        "MagaldiNarguileiro": 1586958585000,
    };

    return (Object.keys(lista).includes(username)) ? lista[username] : getRandomTime();
}

function getRandomTime() {
    const horarioAtual = Date.parse(new Date());
    var horario = horarioAtual + 1;

    while (horario > horarioAtual) {
        const hora = Math.floor(Math.random() * 24);
        const minuto = Math.floor(Math.random() * 60);
        const segundo = Math.floor(Math.random() * 60);

        horario = Date.parse("15 Apr 2020 " + hora + ":" + minuto + ":" + segundo);
    }
    return horario;
}

function montarDadosPessoais() {
    var perfilArea = document.querySelector("#perfil_content");

    if (perfilArea != null) {
        // Obter dados do usuário em questão:
        var dadosUsuario = baseDeDados.getDadosUsuarioFromUsername(usuarioSelecionado);

        // Alterar dados da página de perfil:
        var planoDeFundo = perfilArea.querySelector("#fundo_perfil");
        planoDeFundo.src = "../../img/background/" + dadosUsuario.infoUsuario.background;

        var perfilAvatar = perfilArea.querySelector("#perfil_avatar");
        perfilAvatar.src = getAvatarSrc(dadosUsuario.infoUsuario.avatar, ImgurSize.medium);

        var seguidoresCounter = perfilArea.querySelector("#seguidores_counter");
        seguidoresCounter.textContent = dadosUsuario.infoUsuario.seguidores.length;

        if (dadosUsuario.infoUsuario.seguidores.length == 1) {
            seguidoresCounter.parentNode.querySelector(".number_text").textContent = "Seguidor";
        }

        var conoscoDesdeCounter = perfilArea.querySelector("#conosco_desde");
        conoscoDesdeCounter.textContent = GeneralFunctions.getDateFromMilisseconds(dadosUsuario.infoUsuario.conoscoDesde);

        var seguindoCounter = perfilArea.querySelector("#seguindo_counter");
        seguindoCounter.textContent = dadosUsuario.infoUsuario.seguindo.length;

        var nomePerfil = perfilArea.querySelector("#nome_perfil");
        nomePerfil.textContent = dadosUsuario.infoUsuario.nome;

        var usernamePerfil = perfilArea.querySelector("#username_perfil");
        usernamePerfil.textContent = "@" + dadosUsuario.infoUsuario.username;
        
        var descricaoPerfil = perfilArea.querySelector("#descricao_perfil");
        descricaoPerfil.textContent = dadosUsuario.infoUsuario.descricao;
    }
}