document.addEventListener("DOMContentLoaded", () => 
    {
    const user = sessionStorage.getItem("user");
    const compteLink = document.getElementById("compte-link");
    const navbar = document.querySelector(".nav-list");

    if (user) 
        {

        if (compteLink) compteLink.remove();

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "account.html"; 
        a.innerHTML = `<i class="fas fa-user"></i> ${user}`;
        li.appendChild(a);
        navbar.appendChild(li);
    }
});
