document.addEventListener("DOMContentLoaded", () => 
    {
    const user = sessionStorage.getItem("user");
    const compteLink = document.getElementById("compte-link");
    const navbar = document.querySelector(".nav-list");
    const utilisateurActuel = sessionStorage.getItem('user');

    if (user) 
        {

        if (compteLink) { compteLink.remove(); }

        const li = document.createElement("li");
        const a = document.createElement("a");
        const pfp = document.createElement("img");

        pfp.src = localStorage.getItem(`profilePhotoUrl_${utilisateurActuel}`);
        pfp.id = "profilePicture";
        a.href = "account.html"; 

        a.innerHTML += `${user}`;
        a.append(pfp);
        li.appendChild(a);
        navbar.appendChild(li);
    }
});
