// filter.js - Gère la création des boutons de filtrage par catégorie

// Importation des fonctions depuis d'autres fichiers
import { fetchCategories, fetchWorks } from "./api.js";
import { showWorks } from "./works.js";

// Crée les boutons de filtrage pour chaque catégorie et le bouton "Afficher tous les objets"
export const createFilterButtons = async () => {
  try {
    // Récupère les catégories et les œuvres depuis l'API
    const categories = await fetchCategories();
    const works = await fetchWorks();

    // Sélectionne le conteneur des filtres dans le HTML
    const filterContainer = document.querySelector(".filter");

    // Crée le bouton "Afficher tous les objets"
    const showAllButton = createFilterButton("Tous", () => showWorks(works), true);
    filterContainer.appendChild(showAllButton);

    // Crée un bouton pour chaque catégorie
    categories.forEach((category) => {
      const categoryButton = createFilterButton(category.name, () => displayCategoryWorks(category));
      filterContainer.appendChild(categoryButton);
    });
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
  }
};

// Fonction pour créer un bouton de filtre
const createFilterButton = (text, onClickHandler, isSelected = false) => {
  const filterButton = document.createElement("button");
  filterButton.textContent = text;
  filterButton.classList.add("filter-button");
  if (isSelected) filterButton.classList.add("selected");
  filterButton.addEventListener("click", () => {
    onClickHandler();
    removeAllSelected();
    filterButton.classList.add("selected");
  });
  return filterButton;
};

// Fonction pour supprimer la sélection sur tous les boutons de filtre
const removeAllSelected = () => {
  const allButtons = document.querySelectorAll(".filter-button");
  allButtons.forEach((button) => {
    button.classList.remove("selected");
  });
};

// Affiche les œuvres correspondant à une catégorie donnée
const displayCategoryWorks = async (category) => {
  try {
    // Récupère toutes les œuvres depuis l'API
    const works = await fetchWorks();

    // Filtrage pour obtenir les œuvres de la catégorie spécifique
    const categoryWorks = works.filter((work) => work.category.name === category.name);

    // Affiche les œuvres de la catégorie spécifique
    showWorks(categoryWorks);
  } catch (error) {
    console.error(`Erreur lors de l'affichage des objets de la catégorie ${category.name} : `, error);
  }
};
