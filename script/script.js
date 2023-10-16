let motSecret = '';
let tableauMot = new Array();
const mots = [
  'MANGA',
  'DEVELOPPEUR',
  'INFORMATIQUE',
  'CHAT',
  'ENFANT',
  'RADIATEUR',
  'VOITURE',
  'ORDINATEUR',
  'INTERPHONE',
  'FOUR',
  'CHAUD',
  'VOISIN',
  'FRANCE',
  'MANGER',
  'BISOU',
  'AMOUR',
  'BONJOUR',
  'JOURNEE',
  'CATCH',
  'COEUR',
  'MONDE',
  'HEUREUX',
  'DOUCEMENT',
];
let coupsManques = 0;
let coupsTotals = 9;
let lettresTrouvees = 0;
let fini = false;
motSecret = mots[new Date().getSeconds() % mots.length];
let tailleMot = motSecret.length;

//Modifier style lettre utilisées

function modifierStyle(element, propriete, valeur) {
  element.style[propriete] = valeur;
}


//Si gagné applique ce style
function gagner() {
  let visibleBtn = document.querySelector('#btnReplay');
  let gold = document.querySelector('body');
  document.images['pendu'].src = 'assets/img/gagner.webp';
  visibleBtn.innerHTML =
    '<button type="submit" id="replayButton" class="btn d-flex justify-content-center mx-auto"><img class="logo" src="assets/img/replay.webp"></button>';
  gold.classList.add('gold');
  document.querySelector('.cacher').classList.add('d-none').remove('d-flex');
  document.querySelector('.siGagner').classList.add('d-none');
  fini = true;
}


//Si perdu applique ce style
function perdu() {
  let message = document.getElementById('message');
  message.classList.add('message');
  message.innerHTML =
    '<img class="d-block mx-auto" src="assets/img/perdu.webp" alt="Perdu"><p class="alertMessage"><b>Vous avez perdu !</b></p>';
  const replayButton = document.body.appendChild(document.createElement('button'));
  replayButton.innerHTML =
    '<img class="logo" src="assets/img/replay.webp">';
  replayButton.className = 'btnReplay btn-primary d-block mx-auto';
  replayButton.id = 'replayButton';
  replayButton.type = 'submit';
  replayButton.addEventListener('click', () => location.reload());
  for (let i = 0; i < tailleMot; i++)
    tableauMot[i].style.visibility = 'visible';
  fini = true;
}

// Chaque coup raté on change l'image du pendu
function coupRatee(){
  document.getElementById('coupsRestant').innerHTML = coupsTotals--;
  coupsManques++;
  document.images['pendu'].src =
    'assets/img/pendu_' + coupsManques + '.webp'; 
}

// Recharge la page au clique sur replay
document.getElementById('replayButton').addEventListener('click', location.reload);

// Affiche les lettre trouvée
function lettreAfficher(){
  const motReveler = document.querySelector('#lettreReveler');
  for (let i = 0; i < tailleMot; i++) {
    const lettre = document.createElement('p');
    lettre.id = i.toString();
    lettre.textContent = motSecret.charAt(i);
    motReveler.appendChild(lettre);
  }
}


//Affiche le clavier dynamiquement
function afficherClavier() {
  const clavier = document.getElementById('clavier');
  const lettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let lettre of lettres) {
    const button = document.createElement('button');
    button.classList.add('keyboard-button', 'btn', 'btn-light', 'col-1');
    button.textContent = lettre;
    button.addEventListener('click', () => proposer(button));
    clavier.appendChild(button);
  }
}

//Lettre proposées
function proposer(element) {
  if (element.style.backgroundColor == 'black' || fini) return;
  let lettre = element.innerHTML;

  // Modifie le background de la lettre :
  modifierStyle(element, 'backgroundColor', 'black');

  // Modifie le color de la lettre :
  modifierStyle(element, 'color', 'black');

  let trouve = false;

  for (let i = 0; i < tailleMot; i++) {
    if (motSecret[i] === lettre) {
      const letterElement = document.getElementById(i);
      if (letterElement) {
        letterElement.classList.add('lettre');
      trouve = true;
      lettresTrouvees++;
      }
    }
  }

  if (!trouve) {
    coupRatee();

    if (coupsManques == 9) {
      perdu();
    }
  }
  if (lettresTrouvees == tailleMot) {
    gagner();
  }
}

//Mot proposé
function getValue() {
  let input = document.querySelector('#motProposer').value;
  let inputMaj = input.toUpperCase();
  if (inputMaj != motSecret) {
    coupRatee();
  }
  if (coupsManques == 9) {
    perdu();
  }

  if (inputMaj == motSecret) {
    let motRechercher = document.querySelector('#motReveler');
    motRechercher.innerHTML = motSecret.substring(0, tailleMot);
    let lettreReveler = document.querySelector('#lettreReveler');
    lettreReveler.classList.add('d-none');
    lettreReveler.classList.remove('d-flex');
    gagner();
  }
}
