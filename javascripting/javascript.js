var message = "";
var reponse = ""

patater = function () {
    for (i = 0; i < 7; i++) {
        message = message + "#";
        console.log(message);
    }
}

var question = function (etat) {
    if (etat === true) {
        var reponse = prompt('Aimez vous les patates ?');
    } else if (etat === false) {
        var reponse = prompt("Alors ? Vous aimez les patates ? \nPrenez votre temps pour répondre, on est pas pressé.");
    }
    if (reponse == "oui") {
        patater();
    } else if (reponse === "non") {
        alert("Tu n'aimes pas les patates ? Dommage, j'en avais plein mon panier...");
    } else {
        alert("je vous sens comme tiraillé");
        question(false);
    }
}

question(true);