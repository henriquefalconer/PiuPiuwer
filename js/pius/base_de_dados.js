// ---------------------------
// BASE DE DADOS DO PIUPIUWER:
// ---------------------------

var loggedInUser = "fulano.beltrano";

var baseDeDados = new BaseDeDados([
    new UsuarioData(
        new InfoUsuario(
            // Nome:
            "Fulano Beltrano da Silva",
            // Nome de usuário:
            "fulano.beltrano",
            // Arquivo de avatar:
            "Fulano.png",
            // Arquivo de plano de fundo do perfil:
            "Pés%20na%20praia.png",
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
            [
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
            ],
            // Pius destacados:
            [],
            // Na plataforma desde:
            Date.parse("02 Feb 2020 7:00:00"),
            // Descrição de perfil:
            "O primeiro de muitos usuários do PiuPiwer!",
        ),
        [
            new Piu(
                "fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00"),
                "E pensar que tem caras por aí que só piam a quantidade de pius que eles já postaram... Eles parecem mal saber de todo o potencial que a plataforma PiuPiuwer tem!",
                "cleber.cunha:" + Date.parse("15 Apr 2020 11:00:00"),
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Cleber Cunha",
            "cleber.cunha",
            "Cleber.png",
            "Pés%20na%20praia.png",
            [
                "richar.lison",
            ],
            [
                "fulano.beltrano",
                "rosi.plat",
                "richar.lison",
            ],
            [
                "fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00"),
                "cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00"),
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
            ],
            [],
            Date.parse("30 Mar 2020 7:00:00"),
            "O segundo de muitos usuários do PiuPiwer!",
        ),
        [
            new Piu(
                "cleber.cunha:" + Date.parse("15 Apr 2020 11:00:00"),
                "Este é meu 100º piu! Esperei bastante por este momento!",
                null,            
            ),
            new Piu(
                "cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00"),
                "Este é meu 99º piu! Isso é 1 a menos que 100!",
                null,      
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Richarlison Dos Santos Neves Querubim Machado",
            "richar.lison",
            "Richarlison.png",
            "Pés%20na%20praia.png",
            [
                "rosi.plat",
                "fulano.beltrano",
            ],
            [
                "rosi.plat",
                "fulano.beltrano",
            ],
            [
                "cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00"),
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
            ],
            [
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
            ],
            Date.parse("01 Apr 2020 7:00:00"),
            "O terceiro de muitos usuários do PiuPiwer!",
        ),
        [
            new Piu(
                "richar.lison:" + Date.parse("18 Apr 2020 11:07:00"),
                "Concordo totalmente!",
                "fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00"),
            ),
            new Piu(
                "richar.lison:" + Date.parse("15 Apr 2020 8:30:00"),
                "Sim! Sem dúvidas, é a melhor rede social que existe.",
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Rosimary",
            "rosi.plat",
            "Rosimary.png",
            "Pés%20na%20praia.png",
            [
                "richar.lison",
            ],
            [
                "richar.lison",
            ],
            [],
            [],
            Date.parse("15 Apr 2020 6:00:00"),
            "Sou nova, não sei o que colocar aqui.",
        ),
        [
            new Piu(
                "rosi.plat:" + Date.parse("15 Apr 2020 7:00:00"),
                "Comecei a usar hoje! Parece ser bom esse PiuPiwer.",
                null,
            ),
        ]
    ),
]);