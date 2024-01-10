// api.js - Gère les appels aux API pour récupérer les catégories et les œuvres

export const fetchWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  return response.json();
};
