// works.js - Gère l'affichage des œuvres dans la galerie

import { fetchWorks } from "./api.js";
import { deleteWorkImage } from "./api.js";

// Crée un élément de la galerie pour une œuvre
const createGalleryItem = ({ imageUrl = "defaultImage.jpg", title = "Untitled" }) => {
  // Crée les éléments HTML pour une œuvre dans la galerie
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = title;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = title;

  // Ajoute l'image et le titre à l'élément de la galerie
  figure.appendChild(image);
  figure.appendChild(figcaption);
  return figure;
};

// Affiche les œuvres dans la galerie
export const showWorks = (works) => {
  const gallery = document.querySelector(".gallery");
  try {
    gallery.innerHTML = ""; // Nettoie la galerie avant d'ajouter de nouveaux éléments
    works.forEach((work) => {
      const galleryItem = createGalleryItem(work);
      gallery.appendChild(galleryItem);
    });
  } catch (error) {
    // Capture et affiche les erreurs liées à l'affichage des œuvres dans la galerie
    console.error("Une erreur s'est produite : ", error);
  }
};

// Affiche toutes les œuvres
export const displayAllWorks = async () => {
  try {
    // Récupère toutes les œuvres depuis l'API
    const works = await fetchWorks();
    
    // Affiche les œuvres dans la galerie
    showWorks(works);
  } catch (error) {
    // Capture et affiche les erreurs qui pourraient se produire lors de l'affichage des œuvres
    console.error("Erreur lors de l'affichage de tous les objets : ", error);
  }
};

export const loadWorkImages = async () => {
  try {
    const works = await fetchWorks();
    const workImagesContainer = document.getElementById("workImagesContainer");

    works.forEach((work) => {
      const image = document.createElement("img");
      image.src = work.imageUrl;
      image.alt = work.title;

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "X";

      deleteButton.addEventListener("click", async () => {
        try {
          // Appeler la fonction deleteWorkImage depuis api.js
          await deleteWorkImage(work.id);

          // Supprimer l'image et le bouton lorsque la suppression réussit
          workImagesContainer.removeChild(image);
          workImagesContainer.removeChild(deleteButton);
        } catch (error) {
          console.error(error.message);
        }
      });

      workImagesContainer.appendChild(image);
      workImagesContainer.appendChild(deleteButton);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des images des projets : ", error);
  }
};