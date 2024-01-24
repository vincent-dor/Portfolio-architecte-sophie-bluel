// index.js - Initialise l'application en affichant les œuvres et les boutons de filtrage

import { displayAllWorks } from "./works.js";
import { createFilterButtons } from "./filter.js";
import { checkAuthStatus } from "./auth.js";

// Fonction auto-appelée asynchrone pour démarrer l'application
// Cette fonction lance l'affichage des œuvres et la création des boutons de filtrage

(async () => {
  try {
    // Affiche toutes les œuvres sur la page
    await displayAllWorks();

    // Crée les boutons de filtrage pour les catégories ou tout autre filtrage nécessaire
    await createFilterButtons();

    // Vérifiez le statut d'authentification
    await checkAuthStatus();
  } catch (error) {
    // Capture et affiche les erreurs qui pourraient se produire lors du chargement initial
    console.error("Une erreur s'est produite : ", error);
  }
})();
