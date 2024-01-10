// api.js - Gère les appels aux API pour récupérer les catégories

export const fetchWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  return response.json();
};
