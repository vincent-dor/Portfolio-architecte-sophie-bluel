// script.js - Initialise l'application en affichant les œuvres et les boutons de filtrage
import { displayAllWorks } from "./works.js";

// Fonction auto-appelée asynchrone pour démarrer l'application
(async () => {
  try {
    await displayAllWorks();
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
  }
})();
