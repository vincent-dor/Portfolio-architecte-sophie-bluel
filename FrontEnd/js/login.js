const loginForm = document.querySelector('.form-connexion');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Erreur d\'authentification');
    }

    const data = await response.json();
    sessionStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Erreur de connexion :', error);
  }
});