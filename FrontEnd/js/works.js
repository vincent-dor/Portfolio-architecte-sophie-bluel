// works.js - Gère l'affichage et la manipulation des œuvres dans la galerie

// Importation des fonctions nécessaires depuis api.js
import { fetchWorks, deleteWorkImage } from "./api.js";

// Fonction pour créer un élément de la galerie pour une œuvre
const createGalleryItem = ({ imageUrl = "defaultImage.jpg", title = "Untitled" }) => {
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = title;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = title;
  figure.appendChild(image);
  figure.appendChild(figcaption);
  return figure;
};

// Fonction pour afficher les œuvres dans la galerie
export const showWorks = (works) => {
  const gallery = document.querySelector(".gallery");
  try {
    gallery.innerHTML = "";
    works.forEach((work) => {
      const galleryItem = createGalleryItem(work);
      gallery.appendChild(galleryItem);
    });
  } catch (error) {
    console.error("Une erreur s'est produite lors de l'affichage des œuvres : ", error);
  }
};

// Fonction pour afficher toutes les œuvres
export const displayAllWorks = async () => {
  try {
    const works = await fetchWorks();
    showWorks(works);
  } catch (error) {
    console.error("Erreur lors de l'affichage de tous les objets : ", error);
  }
};

// Fonction pour charger les images des œuvres avec la possibilité de suppression
export const loadWorkImages = async () => {
  try {
    const works = await fetchWorks();
    const workImagesContainer = document.getElementById("workImagesContainer");

    works.forEach((work) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("work-image-container");

      const image = document.createElement("img");
      image.src = work.imageUrl;
      image.alt = work.title;

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-xs"></i>';

      deleteButton.addEventListener("click", async () => {
        try {
          await deleteWorkImage(work.id);
          workImagesContainer.removeChild(imageContainer);
          displayAllWorks();
        } catch (error) {
          console.error(error.message);
        }
      });

      imageContainer.appendChild(image);
      imageContainer.appendChild(deleteButton);
      workImagesContainer.appendChild(imageContainer);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des images des projets : ", error);
  }
};