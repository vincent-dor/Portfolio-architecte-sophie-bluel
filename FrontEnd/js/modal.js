// modal.js
import { loadWorkImages, displayAllWorks } from "./works.js";
import { fetchCategories, sendWorkData } from "./api.js";

// Fonction pour créer et afficher le modal
export const openModal = () => {
  // Récupérer l'élément modal
  const modal = document.getElementById("myModal");
  // Récupérer l'élément de contenu du modal
  const modalContent = document.getElementById("modal-content");

  // Effacer le contenu précédent du modalContent
  modalContent.innerHTML = "";

  // Créer un titre h3
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Ajouter une photo";

  // Créer une div pour le contenu de loadWorkImages
  const workImagesContainer = document.createElement("div");
  workImagesContainer.id = "workImagesContainer";

  // Appeler la fonction loadWorkImages pour charger les images dans la div
  loadWorkImages();

  // Créer un bouton "Ajouter une photo"
  const addButton = document.createElement("button");
  addButton.textContent = "Ajouter une photo";
  addButton.addEventListener("click", openAddPhotoModal);

  // Ajouter les éléments au modalContent
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(workImagesContainer);
  modalContent.appendChild(addButton);

  // Afficher le modal
  modal.style.display = "block";
};

// Fonction pour ouvrir le modal d'ajout de photo
const openAddPhotoModal = () => {
  // Récupérer l'élément modal
  const modal = document.getElementById("myModal");
  // Récupérer l'élément de contenu du modal
  const modalContent = document.getElementById("modal-content");

  // Effacer le contenu précédent du modalContent
  modalContent.innerHTML = "";

  // Créer un titre h3
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "Ajout Photo";

  // Créer une div pour le formulaire d'ajout de photo
  const addPhotoFormContainer = document.createElement("div");

  // Créer un formulaire
  const addPhotoForm = document.createElement("form");
  addPhotoForm.addEventListener("submit", handleAddPhoto);

  // Ajouter un input de type file pour l'image
  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.name = "imageUrl";
  imageInput.accept = "image/*";
  imageInput.required = true;

  // Ajouter un input de type text pour le titre
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Titre de la photo";
  titleInput.required = true;

  // Ajouter une liste déroulante pour les catégories
  const categorySelect = document.createElement("select");
  categorySelect.name = "category";
  categorySelect.required = true;

  // Charger les catégories depuis l'API
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

  // Ajouter un bouton "Valider"
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Valider";

  // Ajouter les éléments au formulaire
  addPhotoForm.appendChild(imageInput);
  addPhotoForm.appendChild(titleInput);
  addPhotoForm.appendChild(categorySelect);
  addPhotoForm.appendChild(submitButton);

  // Ajouter le formulaire à la div de contenu
  addPhotoFormContainer.appendChild(addPhotoForm);

  // Ajouter les éléments au modalContent
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(addPhotoFormContainer);

  // Afficher le modal
  modal.style.display = "block";
};

const handleAddPhoto = async (event) => {
  event.preventDefault();

  // Récupérer les valeurs du formulaire
  const imageInput = document.querySelector('input[name="imageUrl"]');
  const titleInput = document.querySelector('input[name="title"]');
  const categorySelect = document.querySelector('select[name="category"]');

  const imageFile = imageInput.files[0]; // Récupérer le fichier image

  // Créer un objet FormData pour envoyer les données
  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('category', categorySelect.value);
  formData.append('image', imageFile);

  try {
    // Envoyer la requête POST à l'API
    const response = await sendWorkData(formData);

    // Traiter la réponse (vous pouvez afficher un message, etc.)
    console.log('Réponse de la requête POST :', response);
    

    // Fermer le modal
    closeModal();
    
    displayAllWorks();
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la requête POST : ', error);
    // Gérer l'erreur (afficher un message d'erreur, etc.)
  }
};

// Fonction pour fermer le modal
export const closeModal = () => {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  // Supprimer le contenu du modal
  modalContent.innerHTML = "";

  // Masquer le modal (en option, si vous souhaitez le masquer)
  modal.style.display = "none";
};

window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    // Fermer le modal si le clic est en dehors du contenu du modal
    closeModal();
  }
});