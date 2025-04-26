document.getElementById('login-form').addEventListener('submit', function (e) 
{
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

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
