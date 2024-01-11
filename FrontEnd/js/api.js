// api.js - Gère les appels aux API pour récupérer les catégories et les œuvres

// Fonction pour récupérer les œuvres depuis l'API
export const fetchWorks = async () => {
  // Effectue une requête pour récupérer les œuvres
  const response = await fetch("http://localhost:5678/api/works");
  
  // Vérifie si la réponse de la requête est OK, sinon lance une erreur avec le statut HTTP
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  
  // Retourne les données des œuvres au format JSON
  return response.json();
};

// Fonction pour récupérer les catégories depuis l'API
export const fetchCategories = async () => {
  // Effectue une requête pour récupérer les catégories
  const response = await fetch("http://localhost:5678/api/categories");
  
  // Vérifie si la réponse de la requête est OK, sinon lance une erreur avec le statut HTTP
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }
  
  // Retourne les données des catégories au format JSON
  return response.json();
};