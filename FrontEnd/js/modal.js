// modal.js
import { loadWorkImages, displayAllWorks } from "./works.js";
import { fetchCategories, sendWorkData } from "./api.js";

export const openModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = "";

  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Gallerie Photo";
  modalTitle.classList.add("modal-title");

  const workImagesContainer = document.createElement("div");
  workImagesContainer.id = "workImagesContainer";

  loadWorkImages();

  const addButton = document.createElement("input");
  addButton.type = "submit";
  addButton.value = "Ajouter une photo";
  addButton.addEventListener("click", openAddPhotoModal);
  addButton.classList.add("add-photo-button");

  const closeButtonContainer = document.createElement("div");
  closeButtonContainer.classList.add("close-container");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close", "fa-solid", "fa-x");
  closeButton.addEventListener("click", closeModal);

  closeButtonContainer.appendChild(closeButton);

  modalContent.appendChild(closeButtonContainer);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(workImagesContainer);
  modalContent.appendChild(addButton);

  modal.style.display = "flex";
};

const openAddPhotoModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = "";

  const trashIconContainer = document.createElement("div");
  trashIconContainer.classList.add("trash-icon-container");

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-regular", "fa-image");
  trashIcon.style.display = "inline";

  trashIconContainer.appendChild(trashIcon);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const backButtonContainer = document.createElement("div");
  backButtonContainer.classList.add("back-container");

  const backButton = document.createElement("button");
  backButton.classList.add("back", "fa-solid", "fa-arrow-left");
  backButton.addEventListener("click", openModal);

  backButtonContainer.appendChild(backButton);
  buttonContainer.appendChild(backButtonContainer);

  const closeButtonContainer = document.createElement("div");
  closeButtonContainer.classList.add("close-container");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close", "fa-solid", "fa-x");
  closeButton.addEventListener("click", closeModal);

  closeButtonContainer.appendChild(closeButton);
  buttonContainer.appendChild(closeButtonContainer);

  modalContent.appendChild(trashIconContainer);
  modalContent.appendChild(buttonContainer);

  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Ajout Photo";
  modalTitle.classList.add("modal-title");

  const addPhotoFormContainer = document.createElement("div");
  addPhotoFormContainer.classList.add("add-photo-form-container");

  const addPhotoForm = document.createElement("form");
  addPhotoForm.addEventListener("submit", handleAddPhoto);

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Titre";
  titleLabel.for = "titleInput"; // Lie le label au champ de saisie
  titleLabel.classList.add("form-label");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "titleInput"; // Ajoutez un identifiant pour lier le label
  titleInput.name = "title";
  titleInput.placeholder = "";
  titleInput.required = true;

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Catégorie";
  categoryLabel.for = "categorySelect"; // Lie le label au champ de sélection
  categoryLabel.classList.add("form-label");

  const categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect"; // Ajoutez un identifiant pour lier le label
  categorySelect.name = "category";
  categorySelect.required = true;
  // Ajoutez une option vide comme première option
const emptyOption = document.createElement("option");
emptyOption.value = ""; // la valeur vide
emptyOption.text = "";
categorySelect.appendChild(emptyOption);

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

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.textContent = "Valider";
  submitButton.classList.add("submit");

  trashIconContainer.appendChild(trashIcon);
  // Ajoutez ces lignes dans la fonction openAddPhotoModal, après la création de modalTitle
const formElementsContainer = document.createElement("div");
formElementsContainer.classList.add("form-elements-container");

  const imageInputContainer = document.createElement("div");
  imageInputContainer.classList.add("image-input-container");

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "imageInput";
  imageInput.name = "imageUrl";
  imageInput.accept = "image/*";
  imageInput.required = true;
  imageInput.style.display = "none";

  const imageInputLabel = document.createElement("label");
  imageInputLabel.textContent = "+ Ajouter photo";
  imageInputLabel.htmlFor = "imageInput"; // Lie le label au champ de saisie
  imageInputLabel.classList.add("form-label");

  const addPhotoHelpText = document.createElement("p");
  addPhotoHelpText.textContent = "jpg, png : 4mo max";
  addPhotoHelpText.classList.add("help-text");
  addPhotoHelpText.style.display = "inline";

  const imagePreviewContainer = document.createElement("div");
  imagePreviewContainer.id = "image-preview";

  imageInputContainer.appendChild(trashIconContainer);
  imageInputContainer.appendChild(imageInput);
  imageInputContainer.appendChild(imageInputLabel);

  addPhotoFormContainer.appendChild(imageInputContainer);
  imageInputContainer.appendChild(addPhotoHelpText);
  addPhotoFormContainer.appendChild(imagePreviewContainer);

  addPhotoForm.appendChild(addPhotoFormContainer);
  addPhotoForm.appendChild(formElementsContainer);

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(addPhotoForm);
  formElementsContainer.appendChild(titleLabel);
  formElementsContainer.appendChild(titleInput);
  formElementsContainer.appendChild(categoryLabel);
  formElementsContainer.appendChild(categorySelect);
  addPhotoForm.appendChild(submitButton);

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

  modal.style.display = "flex";
};

const handleAddPhoto = async (event) => {
  event.preventDefault();

  const imageInput = document.querySelector('input[name="imageUrl"]');
  const titleInput = document.querySelector('input[name="title"]');
  const categorySelect = document.querySelector('select[name="category"]');

  const imageFile = imageInput.files[0];

  const formData = new FormData();
  formData.append("title", titleInput.value);
  formData.append("category", categorySelect.value);
  formData.append("image", imageFile);

  try {
    const response = await sendWorkData(formData);
    console.log("Réponse de la requête POST :", response);

    closeModal();
    displayAllWorks();
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête POST : ", error);
  }
};

export const closeModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = "";

  modal.style.display = "none";
};

window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
});
