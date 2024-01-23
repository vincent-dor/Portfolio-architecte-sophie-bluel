import { openModal } from "./modal.js";
import { createFilterButtons } from "./filter.js";

const update = (isLoggedIn) => {
  const loginButton = document.getElementById("login-button");
  loginButton.textContent = isLoggedIn ? "logout" : "login";
  loginButton.onclick = isLoggedIn ? logout : () => (window.location.href = "login.html");

  const filterContainer = document.querySelector(".filter");

  if (filterContainer) {
    if (isLoggedIn) {
      filterContainer.innerHTML = "";
    }
  }

  const portfolioTitle = document.querySelector(".portfolio-title");

  if (isLoggedIn) {
    const newButton = document.createElement("button");
    newButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';
    newButton.classList.add("modify");
    newButton.id = "openModalBtn";
    newButton.onclick = openModal;
    portfolioTitle.appendChild(newButton);
  }
};

const logout = () => {
  sessionStorage.removeItem("token");
  update();
  const addButton = document.getElementById("openModalBtn");
  if (addButton) {
    addButton.remove();
    createFilterButtons();
  }
};

export const checkAuthStatus = () => {
  const token = sessionStorage.getItem("token");
  update(token);
};
