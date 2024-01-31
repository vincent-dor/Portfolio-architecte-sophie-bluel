import { loadWorkImages } from "./works.js";
import { openAddPhotoModal } from "./addphotomodal.js";

// Fonction pour ouvrir la modal principale
export const openModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  // Initialisation du contenu de la modal
  modalContent.innerHTML = "";

  const modalEditionContainer = document.createElement("div");
  modalEditionContainer.classList.add("modal-edition");

  // Ajout de l'icône et du texte dans la div modal-edition
  const editModeIcon = document.createElement("i");
  editModeIcon.classList.add("fa-solid", "fa-pen-to-square");
  const editModeText = document.createElement("span");
  editModeText.classList.add("span-text");
  editModeText.textContent = "Mode édition";
  modalEditionContainer.appendChild(editModeIcon);
  modalEditionContainer.appendChild(editModeText);

  modalContent.appendChild(modalEditionContainer);

  // Création du titre de la modal
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Galerie Photo";
  modalTitle.classList.add("modal-title");

  // Conteneur pour les images de travail
  const workImagesContainer = document.createElement("div");
  workImagesContainer.id = "workImagesContainer";
  loadWorkImages(); // Chargement des images

  // Bouton pour ajouter une photo
  const addButton = document.createElement("input");
  addButton.type = "submit";
  addButton.value = "Ajouter une photo";
  addButton.addEventListener("click", openAddPhotoModal);
  addButton.classList.add("add-photo-button");

  // Conteneur pour le bouton de fermeture
  const closeButtonContainer = document.createElement("div");
  closeButtonContainer.classList.add("close-container");

  // Bouton de fermeture
  const closeButton = document.createElement("button");
  closeButton.classList.add("close", "fa-solid", "fa-x");
  closeButton.addEventListener("click", closeModal);
  closeButtonContainer.appendChild(closeButton);

  // Ajout des éléments à la modal
  modalContent.append(closeButtonContainer, modalTitle, workImagesContainer, addButton);

  // Affichage de la modal
  modal.style.display = "flex";
};

// Fonction pour fermer la modal
export const closeModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  // Réinitialisation du contenu de la modal
  modalContent.innerHTML = "";

  // Masquage de la modal
  modal.style.display = "none";
};

// Écouteur d'événement pour fermer la modal en cliquant en dehors d'elle
window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
});

// Fonction pour mettre à jour la couleur du bouton en fonction de l'état des champs
export const updateSubmitButtonColor = () => {
  const titleInput = document.querySelector('input[name="title"]');
  const categorySelect = document.querySelector('select[name="category"]');
  const imageInput = document.querySelector('input[name="imageUrl"]');
  const submitButton = document.querySelector(".submit");

  // Vérifier si tous les champs sont remplis
  const allFieldsFilled = titleInput.value.trim() !== "" && categorySelect.value.trim() !== "" && imageInput.files.length > 0;

  // Mettre à jour la couleur du bouton en conséquence
  submitButton.style.backgroundColor = allFieldsFilled ? "#1D6154" : "#A7A7A7";
};