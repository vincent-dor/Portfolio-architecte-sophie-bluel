// modal.js - Gère les fonctionnalités liées à la modal et à sa visualisation

import { loadWorkImages, displayAllWorks } from "./works.js";
import { fetchCategories, sendWorkData } from "./api.js";

// Fonction pour ouvrir la modal principale
export const openModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  // Initialisation du contenu de la modal
  modalContent.innerHTML = "";

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

// Fonction pour ouvrir la modal d'ajout de photo
const openAddPhotoModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  // Initialisation du contenu de la modal
  modalContent.innerHTML = "";

  // Conteneur pour l'icône de suppression
  const trashIconContainer = document.createElement("div");
  trashIconContainer.classList.add("trash-icon-container");

  // Icône de suppression
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-regular", "fa-image");
  trashIcon.style.display = "inline";
  trashIconContainer.appendChild(trashIcon);

  // Conteneur pour les boutons de navigation
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Bouton de retour à la modal principale
  const backButtonContainer = document.createElement("div");
  backButtonContainer.classList.add("back-container");
  const backButton = document.createElement("button");
  backButton.classList.add("back", "fa-solid", "fa-arrow-left");
  backButton.addEventListener("click", openModal);
  backButtonContainer.appendChild(backButton);
  buttonContainer.appendChild(backButtonContainer);

  // Conteneur pour le bouton de fermeture
  const closeButtonContainer = document.createElement("div");
  closeButtonContainer.classList.add("close-container");
  const closeButton = document.createElement("button");
  closeButton.classList.add("close", "fa-solid", "fa-x");
  closeButton.addEventListener("click", closeModal);
  closeButtonContainer.appendChild(closeButton);
  buttonContainer.appendChild(closeButtonContainer);

  // Ajout des éléments à la modal
  modalContent.append(trashIconContainer, buttonContainer);

  // Titre de la modal
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Ajout Photo";
  modalTitle.classList.add("modal-title");

  // Conteneur pour le formulaire d'ajout de photo
  const addPhotoFormContainer = document.createElement("div");
  addPhotoFormContainer.classList.add("add-photo-form-container");

  // Formulaire d'ajout de photo
  const addPhotoForm = document.createElement("form");
  addPhotoForm.addEventListener("submit", handleAddPhoto);

  // Label et champ de saisie pour le titre
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Titre";
  titleLabel.for = "titleInput";
  titleLabel.classList.add("form-label");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "titleInput";
  titleInput.name = "title";
  titleInput.placeholder = "";
  titleInput.required = true;

  // Label et liste déroulante pour la catégorie
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Catégorie";
  categoryLabel.for = "categorySelect";
  categoryLabel.classList.add("form-label");
  const categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect";
  categorySelect.name = "category";
  categorySelect.required = true;

  // Option vide comme première option
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.text = "";
  categorySelect.appendChild(emptyOption);

  // Chargement des catégories depuis l'API
  fetchCategories()
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Erreur lors du chargement des catégories : ", error));

  // Bouton de soumission du formulaire
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.textContent = "Valider";
  submitButton.classList.add("submit");

  // Conteneur pour les éléments du formulaire
  const formElementsContainer = document.createElement("div");
  formElementsContainer.classList.add("form-elements-container");

  // Conteneur pour le champ d'ajout de photo
  const imageInputContainer = document.createElement("div");
  imageInputContainer.classList.add("image-input-container");

  // Champ d'ajout de photo
  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "imageInput";
  imageInput.name = "imageUrl";
  imageInput.accept = "image/*";
  imageInput.required = true;
  imageInput.style.display = "none";

  // Label pour le champ d'ajout de photo
  const imageInputLabel = document.createElement("label");
  imageInputLabel.textContent = "+ Ajouter photo";
  imageInputLabel.htmlFor = "imageInput";
  imageInputLabel.classList.add("form-label");

  // Aide textuelle pour le format de la photo
  const addPhotoHelpText = document.createElement("p");
  addPhotoHelpText.textContent = "jpg, png : 4mo max";
  addPhotoHelpText.classList.add("help-text");
  addPhotoHelpText.style.display = "inline";

  // Conteneur pour l'aperçu de l'image
  const imagePreviewContainer = document.createElement("div");
  imagePreviewContainer.id = "image-preview";

  // Écouteur d'événement pour le changement de l'input de l'image
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePreview = document.createElement("img");
        imagePreview.src = e.target.result;
        imagePreview.id = "image-preview-img";
        imagePreviewContainer.innerHTML = "";
        imagePreviewContainer.appendChild(imagePreview);
        trashIcon.style.display = "none";
        imageInput.style.display = "none";
        addPhotoHelpText.style.display = "none";
        imageInputLabel.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

  // Ajout des éléments à la modal
  modalContent.append(modalTitle, addPhotoForm);
  formElementsContainer.append(titleLabel, titleInput, categoryLabel, categorySelect);

  // Ajout des éléments pour l'ajout de photo
  imageInputContainer.append(trashIconContainer, imageInput, imageInputLabel, addPhotoHelpText);
  addPhotoFormContainer.append(imageInputContainer, imagePreviewContainer);
  addPhotoForm.append(addPhotoFormContainer, formElementsContainer, submitButton);

  // Affichage de la modal
  modal.style.display = "flex";
};

// Fonction de gestion de l'ajout de photo
const handleAddPhoto = async (event) => {
  event.preventDefault();

  // Récupération des éléments du formulaire
  const imageInput = document.querySelector('input[name="imageUrl"]');
  const titleInput = document.querySelector('input[name="title"]');
  const categorySelect = document.querySelector('select[name="category"]');

  // Récupération du fichier image
  const imageFile = imageInput.files[0];

  // Création d'un objet FormData avec les données du formulaire
  const formData = new FormData();
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value);
  formData.append("image", imageFile);

  try {
    // Envoi des données à l'API
    const response = await sendWorkData(formData);
    console.log("Réponse de la requête POST :", response);

    // Fermeture de la modal et actualisation de la liste des œuvres
    closeModal();
    displayAllWorks();
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête POST : ", error);
  }
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
