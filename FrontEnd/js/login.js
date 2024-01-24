// login.js - Gère la soumission du formulaire de connexion et l'authentification utilisateur

// Sélectionne le formulaire de connexion dans le HTML
const loginForm = document.querySelector(".form-connexion");

// Ajoute un écouteur d'événement pour intercepter la soumission du formulaire
loginForm.addEventListener("submit", async (event) => {
  // Empêche le comportement par défaut du formulaire
  event.preventDefault();

  // Récupère les valeurs des champs email et password du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Envoie une requête POST au serveur pour l'authentification
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Vérifie si la requête a réussi
    if (!response.ok) {
      throw new Error("Erreur d'authentification");
    }

    // Récupère les données de la réponse (token) au format JSON
    const data = await response.json();

    // Stocke le token dans la session de l'utilisateur
    sessionStorage.setItem("token", data.token);

    // Redirige l'utilisateur vers la page d'accueil (index.html)
    window.location.href = "index.html";
  } catch (error) {
    // En cas d'erreur, affiche un message dans la console
    console.error("Erreur de connexion :", error);
  }
});