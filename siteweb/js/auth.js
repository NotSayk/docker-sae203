document.addEventListener("DOMContentLoaded", () => 
    {
    const user = sessionStorage.getItem("user");
    const compteLink = document.getElementById("compte-link");
    const navbar = document.querySelector(".nav-list");

    if (user) 
        {

        if (compteLink) { compteLink.remove(); }

        const li = document.createElement("li");
        const a = document.createElement("a");
        const pfp = document.createElement("img");

        pfp.src = localStorage.getItem(`profilePhotoUrl_${user}`) || "/docker-sae203/siteweb/images/pfp-defaut.png";
        pfp.id = "profilePicture";
        a.href = "account.html"; 

        a.innerHTML += `${user}`;
        a.append(pfp);
        li.appendChild(a);
        navbar.appendChild(li);
    }
});
