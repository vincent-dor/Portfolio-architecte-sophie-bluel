// filter.js - Gère la création des boutons de filtrage par catégorie

import { fetchCategories, fetchWorks } from "./api.js";
import { showWorks } from "./works.js";

// Crée les boutons de filtrage pour chaque catégorie et le bouton "Afficher tous les objets"

export const createFilterButtons = async () => {
  try {
    const categories = await fetchCategories();
    const works = await fetchWorks();

    const filterContainer = document.querySelector(".filter");

    const removeAllSelected = () => {
      const allButtons = document.querySelectorAll(".filter-button");
      allButtons.forEach((button) => {
        button.classList.remove("selected");
      });
    };

    const showAllButton = document.createElement("button");
    showAllButton.textContent = "Tous";
    showAllButton.classList.add("filter-button", "selected");
    showAllButton.addEventListener("click", () => {
      showWorks(works);
      removeAllSelected();
      showAllButton.classList.add("selected");
    });
    filterContainer.appendChild(showAllButton);

    categories.forEach((category) => {
      const categoryButton = document.createElement("button");
      categoryButton.textContent = `${category.name}`;
      categoryButton.classList.add("filter-button");
      categoryButton.addEventListener("click", () => {
        displayCategoryWorks(category);
        removeAllSelected();
        categoryButton.classList.add("selected");
      });
      filterContainer.appendChild(categoryButton);
    });
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
  }
};

// Affiche les œuvres correspondant à une catégorie donnée

const displayCategoryWorks = async (category) => {
  try {
    const works = await fetchWorks();
    const categoryWorks = works.filter((work) => work.category.name === category.name);
    showWorks(categoryWorks);
  } catch (error) {
    console.error(`Erreur lors de l'affichage des objets de la catégorie ${category.name} : `, error);
  }
};
