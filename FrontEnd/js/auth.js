const updateLoginButton = (isLoggedIn) => {
  const loginButton = document.getElementById("login-button");
  loginButton.textContent = isLoggedIn ? "logout" : "login";
  loginButton.addEventListener("click", () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("token");
      window.location.reload();
    } else {
      window.location.href = "login.html";
    }
  });
};

const updateFilterContainer = (isLoggedIn) => {
  const filterContainer = document.querySelector(".filter");
  if (filterContainer) {
    filterContainer.style.display = isLoggedIn ? "none" : "flex";
  }
};

const addModifyButton = () => {
  const portfolioTitle = document.querySelector(".portfolio-title");
  if (portfolioTitle) {
    const addButton = document.createElement("button");
    addButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';
    addButton.classList.add("modify");
    portfolioTitle.appendChild(addButton);
  }
};

export const checkAuthStatus = () => {
  const token = sessionStorage.getItem("token");
  updateLoginButton(token);
  updateFilterContainer(token);
  
  if (token) {
    addModifyButton();
  }
};