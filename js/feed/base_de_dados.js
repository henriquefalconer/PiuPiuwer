// ---------------------------
// BASE DE DADOS DO PIUPIUWER:
// ---------------------------

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