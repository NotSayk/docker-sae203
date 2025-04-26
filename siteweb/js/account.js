document.addEventListener("DOMContentLoaded", () => {
    const username = sessionStorage.getItem("user");

    if (!username) {
        window.location.href = "login.html";
    } else {
        document.getElementById("username-display").textContent = username;
    }

    document.getElementById("logout-btn").addEventListener("click", () => {
        sessionStorage.removeItem("user");
        window.location.href = "index.html";
    });
});
