let motSecret = "";
let now = new Date(); // Date d'aujourd'hui
let tableauMot = new Array(); // Le tableau qui contient les lettres du mot à trouver

let mots = new Array(); // Le tableau qui contient tous les mots possibles
let tailleMot; // Le nombre de lettres du mot à trouver
let coupsManques = 0; // Le nombre de lettres fausses essayées
let coupsTotals = 9; // Le nombre de coups possible
let lettresTrouvees = 0; // Le nombre de lettres trouvées
let fini = false; // true si le jeu est terminé

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
function changeBackground(element, couleur) {
  element.style.backgroundColor = couleur;
}
function changeCouleur(element, couleur) {
  element.style.color = couleur;
}

// Gère tous les traitements à faire lorsqu'on appuie sur une touche
function proposer(element) {
  // Si la couleur de fond est Black, c'est qu'on a déjà essayé - on quitte la fonction
  if (element.style.backgroundColor == "black" || fini) return;

  // On récupère la lettre du clavier et on met la touche en black (pour signaler qu'elle est cliquée)
  let lettre = element.innerHTML;
  changeCouleur(element, "black");
  changeBackground(element, "black");

  // On met la letiable trouve à false;
  let trouve = false;
  // On parcours chaque lettre du mot, on cherche si on trouve la lettre sélectionnée au clavier
  for (let i = 0; i < tailleMot; i++) {
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
    let coupsRestant = document.getElementById("coupsRestant");
    coupsManques++;
    coupsTotals--;
    coupsRestant.innerHTML = coupsTotals;

    document.images["pendu"].src = "assets/img/pendu_" + coupsManques + ".png"; // On change l'image du pendu

    // Si on a raté 9 fois :
    if (coupsManques == 9) {
      let message = document.getElementById("message");
      message.classList.remove("hidden");
      message.classList.add("visible");
      message.innerHTML ='<img class="d-block mx-auto" src="assets/img/perdu.png" alt="Perdu"><p class="alertMessage"><b>Vous avez perdu !</b></p><form method="post" href="javascript:location.reload();"><button type="submit" class="btnReplay btn-primary d-block mx-auto"><img class="logo" src="assets/img/replay.png"></button></form>';
      for (let i = 0; i < tailleMot; i++)
        tableauMot[i].style.visibility = "visible";
       
      fini = true;
      // on affiche le mot, on fini le jeu
    }
  }
  if (lettresTrouvees == tailleMot) {
    document.images["pendu"].src = "assets/img/gagner.png"; // On change l'image du pendu
    let cacherP = document.querySelector(".siGagner");
    let cacherDiv = document.querySelector(".cacher");
    let visibleBtn = document.querySelector("#divReplay");
    let gold = document.querySelector("body");
    cacherP.classList.add("d-none");
    gold.classList.add("gold");
    cacherDiv.classList.add("d-none");
    cacherDiv.classList.remove("d-flex");
    visibleBtn.classList.add("d-flex");
    visibleBtn.classList.remove("d-none");
    fini = true;
  }
}

function getValue() {
  // Sélectionner l'élément input et récupérer sa valeur
  let input = document.querySelector("#motProposer").value;
  let gold = document.querySelector("body");
  let motRechercher = document.querySelector("#motReveler");
  let lettreReveler = document.querySelector("#lettreReveler");
  let cacherP = document.querySelector(".siGagner");
  let cacherDiv = document.querySelector(".cacher");
  let visibleBtn = document.querySelector("#divReplay");
  let inputMaj = input.toUpperCase();
  if (inputMaj != motSecret) {
    coupsManques++;
    coupsTotals--;
    coupsRestant.innerHTML = coupsTotals;
    document.images["pendu"].src = "assets/img/pendu_" + coupsManques + ".png"; // On change l'image du pendu
  }
  if (coupsManques == 9) {
    let message = document.getElementById("message");
    message.classList.remove("hidden");
    message.classList.add("visible");
    message.innerHTML ='<img class="d-block mx-auto" src="assets/img/perdu.png" alt="Perdu"><p class="alertMessage"><b>Vous avez perdu !</b></p><form method="post" href="javascript:location.reload();"><button type="submit" class="btnReplay btn-primary d-block mx-auto"><img class="logo" src="assets/img/replay.png"></button></form>';
    for (let i = 0; i < tailleMot; i++)
      tableauMot[i].style.visibility = "visible";
    fini = true;
   
    // on affiche le mot, on fini le jeu
  }

  if (inputMaj == motSecret) {
    document.images["pendu"].src = "assets/img/gagner.png"; // On change l'image du pendu
    motRechercher.innerHTML = motSecret.substring(0, tailleMot);
    cacherP.classList.add("d-none");
    lettreReveler.classList.add("d-none");
    lettreReveler.classList.remove("d-flex");
    cacherDiv.classList.add("d-none");
    cacherDiv.classList.remove("d-flex");
    gold.classList.add("gold");
    visibleBtn.classList.add("d-flex");
    visibleBtn.classList.remove("d-none");
    fini = true;
  }
}
