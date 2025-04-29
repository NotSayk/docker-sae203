document.getElementById('login-form').addEventListener('submit', function (e) 
{
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username.endsWith('.mp4') || username.includes('profilePhotoUrl') ||  username.includes('commentaires')) {
        alert("Le nom d'utilisateur ne peut pas contenir 'profilePhotoUrl' ni se terminer par .mp4.");
        return;
    }

    const savedPassword = localStorage.getItem(username);
    if (savedPassword && savedPassword === password) 
    {
        sessionStorage.setItem("user", username);
        window.location.href = "index.html";
    } 
    else 
    {
        alert("Identifiants incorrects.");
    }
});
