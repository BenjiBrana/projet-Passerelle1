var motSecret;
var now = new Date(); // Date d'aujourd'hui
var tableauMot = new Array(); // Le tableau qui contient les lettres du mot à trouver
var mots = new Array(); // Le tableau qui contient tous les mots possibles
var tailleMot; // Le nombre de lettres du mot à trouver
var coupsManques = 0; // Le nombre de lettres fausses essayées
var coupsTotals = 9; // Le nombre de coups possible
var lettresTrouvees = 0; // Le nombre de lettres trouvées
var fini = false; // true si le jeu est terminé
mots[0] = "MANGA";
mots[1] = "DEVELOPPEUR";
mots[2] = "INFORMATIQUE";
mots[3] = "CHAT";
mots[4] = "ENFANT";
mots[5] = "RADIATEUR";
mots[6] = "VOITURE";
mots[7] = "ORDINATEUR";
mots[8] = "INTERPHONE";
mots[9] = "FOUR";
mots[10] = "CHAUD";
mots[11] = "VOISIN";
mots[12] = "FRANCE";
mots[13] = "MANGER";
mots[14] = "BISOU";
mots[15] = "AMOUR";
mots[16] = "BONJOUR";
mots[17] = "JOURNEE";
mots[18] = "CATCH";
mots[19] = "COEUR";
mots[20] = "MONDE";
mots[21] = "HEUREUX";
mots[22] = "DOUCEMENT";

// On prend un mot au hasard en fonction de la seconde en cours
motSecret = mots[now.getSeconds() % mots.length];
tailleMot = motSecret.length;

// Permet de changer la couleur des touches du clavier
function changeCouleur(element, couleur) {
  element.style.backgroundColor = couleur;
}

// Gère tous les traitements à faire lorsqu'on appuie sur une touche
function proposer(element) {
  
  // Si la couleur de fond est Black, c'est qu'on a déjà essayé - on quitte la fonction
  if (element.style.backgroundColor == "black" || fini) return;

  // On récupère la lettre du clavier et on met la touche en black (pour signaler qu'elle est cliquée)
  var lettre = element.innerHTML;
  changeCouleur(element, "black");

  // On met la variable trouve à false;
  var trouve = false;
  // On parcours chaque lettre du mot, on cherche si on trouve la lettre sélectionnée au clavier
  for (var i = 0; i < tailleMot; i++) {
    // Si c'est le cas :

    tableauMot[i] = document.getElementById(i);
    if (tableauMot[i].innerHTML == lettre) {
      // On affiche la lettre
      tableauMot[i].classList.add("lettre"); // On affiche la lettre
      trouve = true;
      lettresTrouvees++;
    }
  }

  // Si la lettre n'est pas présente, trouvé vaut toujours false :
  if (!trouve) {
    var coupsRestant = document.getElementById("coupsRestant");
    coupsManques++;
    coupsTotals--;
    coupsRestant.innerHTML = coupsTotals;

    document.images["pendu"].src = "assets/img/pendu_" + coupsManques + ".png"; // On change l'image du pendu

    // Si on a raté 9 fois :
    if (coupsManques == 9) {
      alert("Vous avez perdu !");
      for (var i = 0; i < tailleMot; i++)
        tableauMot[i].style.visibility = "visible";
      fini = true;
      // on affiche le mot, on fini le jeu
    }
  }
  if (lettresTrouvees == tailleMot) {
    alert("Bravo ! Vous avez découvert le mot secret !");
    fini = true;
  }
}

function getValue() {
  // Sélectionner l'élément input et récupérer sa valeur
  var input = document.getElementById("motProposer").value;
  var motRechercher = document.getElementById("motReveler");
  var lettresReveler = document.querySelector("#lettreReveler");
  var inputMaj = input.toUpperCase();
  if (inputMaj != motSecret) {
    coupsManques++;
    coupsTotals--;
    coupsRestant.innerHTML = coupsTotals;
    document.images["pendu"].src = "assets/img/pendu_" + coupsManques + ".png"; // On change l'image du pendu
  }
  if (coupsManques == 9) {
    alert("Vous avez perdu !");
    for (var i = 0; i < tailleMot; i++)
      tableauMot[i].style.visibility = "visible";
    fini = true;
    // on affiche le mot, on fini le jeu
  }

  if (inputMaj == motSecret) {
    alert(
      "Bravo ! Vous avez découvert le mot secret qui est " + motSecret + "  !"
    );
    motRechercher.innerHTML = motSecret.substring(0, tailleMot);
    lettresReveler.classList.add('d-none');
    lettresReveler.classList.remove('d-flex');
    fini = true;
  }
}
