// login.js - Gère la soumission du formulaire de connexion et l'authentification utilisateur

// Sélectionne le formulaire de connexion dans le HTML
const loginForm = document.querySelector(".form-connexion");

// Ajoute une div pour afficher les messages d'erreur
const errorDiv = document.createElement("div");
errorDiv.classList.add("error-message"); // Ajoute une classe pour le style CSS

// Ajoute un écouteur d'événement pour intercepter la soumission du formulaire
loginForm.addEventListener("submit", async (event) => {
  // Empêche le comportement par défaut du formulaire
  event.preventDefault();

  // Supprime les messages d'erreur existants
  errorDiv.innerHTML = "";

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
    // En cas d'erreur, affiche un message d'erreur
    errorDiv.innerHTML = "Votre adresse email et/ou votre mot de passe sont incorrects.";
    // Insère la div d'erreur avant le bouton de soumission
    loginForm.insertBefore(errorDiv, loginForm.querySelector(".submit"));
    
    // En cas d'erreur, affiche un message dans la console
    console.error("Erreur de connexion :", error);
  }
});