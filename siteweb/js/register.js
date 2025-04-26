
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username)) {
        alert("Ce nom d'utilisateur est déjà utilisé.");
    } else {
        localStorage.setItem(username, password);
        alert("Inscription réussie !");
        window.location.href = "login.html";
    }
});
