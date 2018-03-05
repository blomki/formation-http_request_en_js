$(document).ready(function () {
    // Création du journal des combats
    var historique = "";

    // lettre saisie dans l´input ´Mon nom´
    $("#moi").keyup(function (event) {
        var myName = $("#moi").val();
        $("#megaphone").text(promptMessage(myName));
    });

    // Génère le message diffusé à l´adversaire
    function promptMessage(playerName) {
        if (playerName.length > 0) {
            return ">> " + playerName + " va attaquer en ...";
        } else {
            return "> En attente d'un joueur";
        }
    }

    // Prototype de bateau
    var bateau = {
        init: function (nom, cases, etat) {
            this.leNom = nom;
            this.lesCases = cases;
            this.coule = etat;
        }
    };

    // CREATION DES BATEAUX
    var bateau0 = Object.create(bateau);
    bateau0.init("Vaisseau amiral La Vallée", ["b4", "b5", "b6"], false);

    var bateau1 = Object.create(bateau);
    bateau1.init("Mistral", ["d9", "e9", "f9"], false);

    // CREATION DE LA FLOTTE
    var bateaux = [];
    bateaux.push(bateau0, bateau1);
    nbBateaux = 2;

    function afficherMessage(texte) {
        $("#history").append(texte);
    }


    // Vérifie le bateau si la case n'est pas vide
    function verifierBateau(coordonnees) {
        if (nbBateaux > 0) {
            for (i = 0; i < bateaux.length; i++) {

                // si le bateau est encore à flot au moment du tir
                if (bateaux[i].coule === false) {

                    //bateaux[i].coule === true;
                    var analyseBateau = bateaux[i].lesCases;

                    // on teste les classes des différentes cellules
                    for (x = 0; x < analyseBateau.length; x++) {
                        bateaux[i].coule = true;
                        var identifiantCase = "#" + analyseBateau[x];
                        if ($(identifiantCase).hasClass("tir")) {
                            //console.log(identifiantCase + ": est endommagé.");
                        }
                        if (!$(identifiantCase).hasClass("tir")) {
                            bateaux[i].coule = false;
                            //console.log(identifiantCase + ": est intacte.");
                        }
                    }
                    if (bateaux[i].coule === true) {
                        nbBateaux = nbBateaux - 1;
                        afficherMessage("👍 COULE : Mille sabords, le " + bateaux[i].leNom + " a coulé.<br />");
                    }
                }
            }
        } if (nbBateaux === 0) {
            afficherMessage("😎 WIN : Bien joué, la partie est terminée, c'est l'heure de l'afterwork !<br />")
            $("#no-mans-land").click(function () {
                $(this).css("background-image", "url(http://r.ddmcdn.com/w_624/s_f/o_1/cx_0/cy_17/cw_624/ch_416/APL/uploads/2014/10/buy-a-boat-cat-01-625x450.jpg)");
                $(this).css("height", "416px");
            }
            )
        }
    }


    // Génère la couleur de fond de la cellule
    $("#canon").keyup(function (touche) {
        var nom = $("#moi").val();

        var appui = touche.wich || touche.keyCode;
        var destination = $("#canon").val().toLowerCase();
        var identifiant = "#" + destination;

        if (appui === 13 && nom.length > 0) {

            if (($(identifiant).text() === "") && (!$(identifiant).hasClass("tir"))) {
                $(identifiant).addClass("tir");
                afficherMessage("Plouf !<br />");
            } else if (($(identifiant).text() === "") && ($(identifiant).hasClass("tir"))) {
                afficherMessage("Re-plouf !<br />");
            }

            if (($(identifiant).text() != "") && ($(identifiant).hasClass("tir"))) {
                afficherMessage("Inutile de s'acharner, là c'est mort. Essaie d'autres coordonnées..<br />");
            }
            else if (($(identifiant).text() != "") && (!$(identifiant).hasClass("tir"))) {
                $(identifiant).addClass("tir");
                afficherMessage("TOUCHE !<br />");
                verifierBateau(identifiant);
            }
        }
    }
    )
});