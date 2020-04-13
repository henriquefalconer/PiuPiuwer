// ---------------------------
// BASE DE DADOS DO PIUPIUWER:
// ---------------------------

var loggedInUser = "fulano.beltrano";

var baseDeDados = new BaseDeDados([
    new UsuarioData(
        new InfoUsuario(
            "Fulano Beltrano da Silva",
            "fulano.beltrano",
            "Fulano.png",
            "Pés%20na%20praia.png",
            [
                "rosi.plat",
                "richar.lison",
            ],
            [
                "cleber.cunha",
                "rosi.plat",
                "richar.lison",
            ],
            [
                "fulano.beltrano:1586704620000",
                "cleber.cunha:1586700000000",
                "richar.lison:1586691000000",
                "cleber.cunha:1586689200000",
                "rosi.plat:1586685600000",
            ],
            [
                "rosi.plat:1586685600000",
            ],
        ),
        [
            new Piu(
                "fulano.beltrano:" + Date.parse("12 Apr 2020 12:17:00"),
                "E pensar que tem caras por aí que só piam a quantidade de pius que eles já postaram... Eles parecem mal saber de todo o potencial que a plataforma PiuPiuwer tem!",
                "cleber.cunha:" + Date.parse("12 Apr 2020 11:00:00"),
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Cleber",
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
                "fulano.beltrano:1586704620000",
                "cleber.cunha:1586700000000",
                "richar.lison:1586691000000",
                "cleber.cunha:1586689200000",
                "rosi.plat:1586685600000",
            ],
            [
                "rosi.plat:1586685600000",
            ],
        ),
        [
            new Piu(
                "cleber.cunha:" + Date.parse("12 Apr 2020 11:00:00"),
                "Este é meu 100º piu! Esperei bastante por este momento!",
                null,            
            ),
            new Piu(
                "cleber.cunha:" + Date.parse("12 Apr 2020 8:00:00"),
                "Este é meu 99º piu! Isso é 1 a menos que 100!",
                null,      
            ),
        ]
    ),
    new UsuarioData(
        new InfoUsuario(
            "Richarlison",
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
                "fulano.beltrano:1586704620000",
                "cleber.cunha:1586700000000",
                "richar.lison:1586691000000",
                "cleber.cunha:1586689200000",
                "rosi.plat:1586685600000",
            ],
            [
                "rosi.plat:1586685600000",
            ],
        ),
        [
            new Piu(
                "richar.lison:" + Date.parse("12 Apr 2020 8:30:00"),
                "Sim! Sem dúvidas, é a melhor rede social que existe.",
                "rosi.plat:" + Date.parse("12 Apr 2020 7:00:00"),
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
            [],
            [
                "fulano.beltrano:1586704620000",
                "cleber.cunha:1586700000000",
                "richar.lison:1586691000000",
                "cleber.cunha:1586689200000",
                "rosi.plat:1586685600000",
            ],
            [
                "rosi.plat:1586685600000",
            ],
        ),
        [
            new Piu(
                "rosi.plat:" + Date.parse("12 Apr 2020 7:00:00"),
                "Comecei a usar hoje! Parece ser bom esse PiuPiwer.",
                null,
            ),
        ]
    ),
]);