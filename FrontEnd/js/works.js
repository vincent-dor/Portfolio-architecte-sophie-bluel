// works.js - Gère l'affichage des œuvres dans la galerie

import { fetchWorks } from "./api.js";

// Crée un élément de la galerie pour une œuvre

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
    console.error("Une erreur s'est produite : ", error);
  }
};

// Affiche toutes les œuvres

export const displayAllWorks = async () => {
  try {
    const works = await fetchWorks();
    showWorks(works);
  } catch (error) {
    console.error("Erreur lors de l'affichage de tous les objets : ", error);
  }
};
