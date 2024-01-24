// api.js - Gère les appels aux API pour récupérer les catégories et les œuvres

// Fonction générique pour effectuer une requête API
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }

  return response.json();
};

// Fonction pour récupérer les œuvres depuis l'API
export const fetchWorks = () => fetchData("http://localhost:5678/api/works");

// Fonction pour récupérer les catégories depuis l'API
export const fetchCategories = () => fetchData("http://localhost:5678/api/categories");

// Fonction pour envoyer les données d'une nouvelle œuvre
export const sendWorkData = async (formData) => {
  const postWorkUrl = "http://localhost:5678/api/works";
  const token = sessionStorage.getItem("token");

  try {
    const response = await fetch(postWorkUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout de la photo");

    return await response.json();
  } catch (error) {
    console.error("Error during POST request:", error);
  }
};

// Fonction pour supprimer une image d'une œuvre
export const deleteWorkImage = async (workId) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(`La suppression de l'image a échoué. Statut : ${response.status}`);

    return response.status === 204 ? null : await response.json();
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de l'image : ${error.message}`);
  }
};
