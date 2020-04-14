function getJsonData(url, onReady) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dados = JSON.parse(this.responseText);
            onReady(dados);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}