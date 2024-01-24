// auth.js - Gère les fonctionnalités liées à l'authentification et à l'interface utilisateur

// Importation des fonctions nécessaires depuis d'autres fichiers
import { openModal } from "./modal.js";
import { createFilterButtons } from "./filter.js";

// Fonction de mise à jour de l'interface utilisateur en fonction de l'état de connexion
const updateUI = (isLoggedIn) => {
  // Récupération du bouton de connexion
  const loginButton = document.getElementById("login-button");

  // Mise à jour du texte et du comportement du bouton en fonction de l'état de connexion
  loginButton.textContent = isLoggedIn ? "logout" : "login";
  loginButton.onclick = isLoggedIn ? logout : () => (window.location.href = "login.html");

  // Récupération du conteneur des filtres
  const filterContainer = document.querySelector(".filter");

  // Effacement des filtres si l'utilisateur est connecté
  if (filterContainer && isLoggedIn) {
    filterContainer.innerHTML = "";
  }

  // Récupération du titre du portfolio
  const portfolioTitle = document.querySelector(".portfolio-title");

  // Ajout d'un bouton de modification si l'utilisateur est connecté
  if (isLoggedIn) {
    const modifyButton = document.createElement("button");
    modifyButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';
    modifyButton.classList.add("modify");
    modifyButton.id = "openModalBtn";
    modifyButton.onclick = openModal;
    portfolioTitle.appendChild(modifyButton);
  }
};

// Fonction de déconnexion
const logout = () => {
  // Suppression du jeton de session
  sessionStorage.removeItem("token");

  // Mise à jour de l'interface utilisateur
  updateUI();

  // Suppression du bouton de modification et recréation des boutons de filtre
  const modifyButton = document.getElementById("openModalBtn");
  if (modifyButton) {
    modifyButton.remove();
    createFilterButtons();
  }
};

// Fonction pour vérifier l'état d'authentification
export const checkAuthStatus = () => {
  // Récupération du jeton de session
  const token = sessionStorage.getItem("token");

  // Mise à jour de l'interface utilisateur en fonction de l'état de connexion
  updateUI(token);
};
