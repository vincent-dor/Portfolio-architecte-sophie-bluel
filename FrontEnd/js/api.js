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

// Fonction pour envoyer les données d'une nouvelle œuvre
export const sendWorkData = async (formData) => {
  const postWorkUrl = 'http://localhost:5678/api/works';
  const token = sessionStorage.getItem("token");

  try {
    const response = await fetch(postWorkUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  // Inclure le token d'authentification dans l'en-tête
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout de la photo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during POST request:', error);
    if (error instanceof Response) {
      // Log the details of the error response
      const responseText = await error.text();
      console.error('Error response:', responseText);
    }
    throw error;
  }
};

export const deleteWorkImage = async (workId) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Remplacez authToken par votre jeton d'authentification
      },
    });

    if (!response.ok) {
      throw new Error(`La suppression de l'image a échoué. Statut : ${response.status}`);
    }

    // Si la réponse n'inclut pas de données JSON valide, ou si le statut est 204, renvoyer null
    return response.status === 204 ? null : await response.json();
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de l'image : ${error.message}`);
  }
};