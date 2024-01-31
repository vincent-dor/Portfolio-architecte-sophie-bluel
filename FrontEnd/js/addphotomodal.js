import { fetchCategories, sendWorkData } from "./api.js";
import { displayAllWorks } from "./works.js";
import { openModal, closeModal, updateSubmitButtonColor } from "./modal.js";

// Fonction pour ouvrir la modal d'ajout de photo
export const openAddPhotoModal = () => {
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

  // Conteneur pour l'icône de suppression
  const pictureIconContainer = document.createElement("div");
  pictureIconContainer.classList.add("picture-icon-container");

  // Icône de suppression
  const pictureIcon = document.createElement("i");
  pictureIcon.classList.add("fa-regular", "fa-image");
  pictureIcon.style.display = "inline";
  pictureIconContainer.appendChild(pictureIcon);

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
  modalContent.append(pictureIconContainer, buttonContainer);

  // Titre de la modal
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Ajout Photo";
  modalTitle.classList.add("modal-title");

  // Conteneur pour le formulaire d'ajout de photo
  const addPhotoFormContainer = document.createElement("div");
  addPhotoFormContainer.classList.add("add-photo-form-container");

  // Formulaire d'ajout de photo
  const addPhotoForm = document.createElement("form");
  addPhotoForm.classList.add("form-container");

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
  titleInput.addEventListener("input", updateSubmitButtonColor);

  // Label et liste déroulante pour la catégorie
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Catégorie";
  categoryLabel.for = "categorySelect";
  categoryLabel.classList.add("form-label");
  const categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect";
  categorySelect.name = "category";
  categorySelect.required = true;
  categorySelect.addEventListener("input", updateSubmitButtonColor);

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
        pictureIcon.style.display = "none";
        imageInput.style.display = "none";
        addPhotoHelpText.style.display = "none";
        imageInputLabel.style.display = "none";

        // Modifier les styles de add-photo-form-container
        addPhotoFormContainer.style.paddingTop = "0";
        addPhotoFormContainer.style.paddingBottom = "0";

        updateSubmitButtonColor(); // Appel pour mettre à jour la couleur du bouton
      };
      reader.readAsDataURL(file);
    } else {
      // Si aucune image n'est sélectionnée
      submitButton.style.backgroundColor = "#A7A7A7"; // Initialisation de la couleur du bouton
      imagePreviewContainer.innerHTML = "";
      updateSubmitButtonColor(); // Appel pour mettre à jour la couleur du bouton
    }
  });

  // Ajout des éléments à la modal
  modalContent.append(modalTitle, addPhotoForm);
  formElementsContainer.append(titleLabel, titleInput, categoryLabel, categorySelect);

  // Initialisation de la couleur du bouton
  submitButton.style.backgroundColor = "#A7A7A7";

  // Ajout des éléments pour l'ajout de photo
  imageInputContainer.append(pictureIconContainer, imageInput, imageInputLabel, addPhotoHelpText);
  addPhotoFormContainer.append(imageInputContainer, imagePreviewContainer);
  addPhotoForm.append(addPhotoFormContainer, formElementsContainer, submitButton);

  // Affichage de la modal
  updateSubmitButtonColor();
  modal.style.display = "flex";

  // Ajout de l'événement submit à la fin de la fonction openAddPhotoModal
  addPhotoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
  });
};

// Nouvelle fonction pour soumettre le formulaire
const submitForm = async () => {
  // Récupération des éléments du formulaire
  const imageInput = document.querySelector('input[name="imageUrl"]');
  const titleInput = document.querySelector('input[name="title"]');
  const categorySelect = document.querySelector('select[name="category"]');
  const pictureIcon = document.querySelector(".fa-regular.fa-image");
  const addPhotoHelpText = document.querySelector(".help-text");
  const imageInputLabel = document.querySelector('.form-label[for="imageInput"]');
  const imagePreviewContainer = document.getElementById("image-preview");
  const addPhotoFormContainer = document.querySelector(".add-photo-form-container");

  // Récupération du fichier image
  const imageFile = imageInput.files[0];

  // Vérification du type de fichier
  if (!imageFile || (imageFile.type !== "image/jpeg" && imageFile.type !== "image/png")) {
    console.error("Veuillez sélectionner un fichier au format JPEG ou PNG.");
    // Réinitialisation des éléments
    pictureIcon.style.display = "inline";
    addPhotoHelpText.style.display = "inline";
    imageInputLabel.style.display = "initial";

    // Réinitialisation du champ d'ajout de photo
    imagePreviewContainer.innerHTML = "";
    // Effacer le contenu des champs de titre et de catégorie
    titleInput.value = "";
    categorySelect.value = "";

    // Réinitialisation des styles de add-photo-form-container
    addPhotoFormContainer.style.paddingTop = ""; // Réinitialisation à la valeur par défaut
    addPhotoFormContainer.style.paddingBottom = ""; // Réinitialisation à la valeur par défaut

    updateSubmitButtonColor();

    return;
  }

  // Vérification de la taille du fichier (4 Mo max)
  if (imageFile.size > 4 * 1024 * 1024) {
    console.error("La taille du fichier ne doit pas dépasser 4 Mo.");
    // Réinitialisation des éléments
    pictureIcon.style.display = "inline";
    addPhotoHelpText.style.display = "inline";
    imageInputLabel.style.display = "initial";

    // Réinitialisation du champ d'ajout de photo
    imagePreviewContainer.innerHTML = "";
    // Effacer le contenu des champs de titre et de catégorie
    titleInput.value = "";
    categorySelect.value = "";

    // Réinitialisation des styles de add-photo-form-container
    addPhotoFormContainer.style.paddingTop = ""; // Réinitialisation à la valeur par défaut
    addPhotoFormContainer.style.paddingBottom = ""; // Réinitialisation à la valeur par défaut

    updateSubmitButtonColor();

    return;
  }

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
