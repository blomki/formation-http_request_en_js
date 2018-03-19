document.addEventListener("DOMContentLoaded", function(event) {
  let bouton = document.getElementById("lancerRequete");
  const numeroApi = "&APPID=99369413f7518455be64c6789df88b45";

  bouton.addEventListener("click", function(evenement) {
    let cityName = champVille.value;
    let ville = encodeURIComponent(cityName);
    adresseUrl = ville + numeroApi + "&units=metric";
    quelTempsFaitIl(adresseUrl);
    evenement.preventDefault();
  });
});

let champVille = document.getElementById("ville");

// Préparation de la requête

function quelTempsFaitIl(adresse) {
  const adresseRequete =
    `http://api.openweathermap.org/data/2.5/weather?q=` + adresse;
  //console.log(adresse);
  var xhr = new XMLHttpRequest();
  //console.log(adresse);
  // On souhaite juste récupérer le contenu du fichier, la méthode GET suffit amplement :
  xhr.open("GET", adresseRequete);
  xhr.addEventListener("readystatechange", function() {
    // On gère ici une requête asynchrone
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Si le fichier est chargé sans erreur
      const reponseTexte = xhr.responseText;
      const reponseJson = JSON.parse(reponseTexte);
      console.log(reponseJson);
      document.getElementById("reponse").innerHTML = `Il fait ${
        reponseJson.main.temp
      } ° c à ${reponseJson.name}`;
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 400) {
      console.log("La requête n'est pas passée");
    }
  });
  xhr.send(null); // La requête est prête, on envoie tout
}
