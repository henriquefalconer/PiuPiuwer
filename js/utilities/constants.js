class BaseDeDados {
    constructor(data) {
        this.data = data;
    }

    adicionarPiuABaseDeDados(mensagem, piuReplyId) {
        var currentTime = Date.parse(new Date());

        // Inserir piu a base de dados:
        this.getDadosUsuarioFromUsername(loggedInUser).pius.push(
            new Piu(
                loggedInUser + ":" + currentTime,
                mensagem,
                piuReplyId,
            ),
        );
        
        // Recarregar feed de pius:
        montarPiusFeed();
    }

    togglePiuLike(piuId) {
        const index = this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.indexOf(piuId);

        // Se o like não existe, adicioná-lo:
        if (index == -1) {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.push(piuId);
        }
        // Caso contrário, retire-o:
        else {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.likes.splice(index, 1);
        }
        
        // Recarregar feed de pius:
        montarPiusFeed();
    }

    replyPiu(piuReplyId) {
        // Acionar popup de tela cheia:
        togglePopupWholeScreen("#popup_piar_reply");

        // Encontrar o popup de tela cheia:
        var popupBox = document.querySelector("#popup_piar_reply");

        // Montar o piu de reply:
        var piuReply = montarPiuReply(piuReplyId);

        // Inserir o piu de reply no popup:
        var popupPiarReplyPiu = popupBox.querySelector(".piu_reply_box");
        popupPiarReplyPiu.innerHTML = "";
        popupPiarReplyPiu.appendChild(piuReply);
    }

    togglePiuDestaque(piuId) {
        const index = this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.indexOf(piuId);

        // Se o piu não está destacado, destaque-o:
        if (index == -1) {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.push(piuId);
        }
        // Caso contrário tire ele do destaque:
        else {
            this.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.splice(index, 1);
        }
        
        // Recarregar feed de pius:
        montarPiusFeed();
    }

    getDadosUsuarioFromUsername(username) {
        var correctUsuarioData = null;

        this.data.forEach(function(usuarioData){
            if (usuarioData.infoUsuario.username == username) correctUsuarioData = usuarioData;
        });

        return correctUsuarioData;
    }
    
    getDadosUsuarioFromPiuId(piuId) {
        var nomeUsuario = GeneralFunctions.getUserNameFromPiuId(piuId);
    
        var infoUsuario = null;
    
        this.data.forEach(function(dadosUsuario){
            if (dadosUsuario.infoUsuario.username == nomeUsuario) {
                infoUsuario = dadosUsuario.infoUsuario;
            }
        });
    
        return infoUsuario;
    }
    
    getDadosPiuFromPiuId(piuId) {
        var nomeUsuario = GeneralFunctions.getUserNameFromPiuId(piuId);

        var piuData = null;

        this.data.forEach(function(dadosUsuario){
            if (dadosUsuario.infoUsuario.username == nomeUsuario) {
                dadosUsuario.pius.forEach(function(piu){
                    if (piu.piuId == piuId) piuData = piu;
                });
            }
        });

        return piuData;
    }
}

class UsuarioData {
    constructor(infoUsuario, pius) {
        this.infoUsuario = infoUsuario;
        this.pius = pius;
    }
}

class InfoUsuario {
    constructor(nome, username, avatar, 
        background, seguidores, seguindo, 
        likes, destacados) {
            this.nome = nome;
            this.username = username;
            this.avatar = avatar;
            this.background = background;
            this.seguidores = seguidores;
            this.seguindo = seguindo;
            this.likes = likes;
            this.destacados = destacados;
    }
}

class Piu {
    constructor(piuId, message, piuReplyId) {
        this.piuId = piuId;
        this.message = message;
        this.piuReplyId = piuReplyId;
    }

    getLikes() {
        var likesList = [];

        var thisPiu = this;

        baseDeDados.data.forEach(function(usuarioData){
            if (usuarioData.infoUsuario.likes.includes(thisPiu.piuId)) likesList.push(usuarioData.infoUsuario.username);
        });
        
        return likesList;
    }

    getReplies() {
        var repliesList = [];

        var thisPiu = this;

        baseDeDados.data.forEach(function(usuarioData){
            var piusUsuario = usuarioData.pius;

            piusUsuario.forEach(function(piu){
                if (piu.piuReplyId == thisPiu.piuId) repliesList.push(usuarioData.infoUsuario.username);
            });
        });

        return repliesList;
    }

    hasDestaque() {
        return baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.destacados.includes(this.piuId);
    }
}

String.prototype.abreviar = String.prototype.abreviar ||
      function(){
          return (this.count(" ") > 0) ? this.substring(0, this.indexOf(" ")+1) + this.substring(this.lastIndexOf(" ")+1, this.length).substring(0, 1) + "." : this;
      };

String.prototype.count = String.prototype.count || 
      function(substring){
          return (this.match(new RegExp(substring, "g")) || []).length;
      }; 