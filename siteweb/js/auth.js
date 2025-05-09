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

        const defaultPfpPath = window.location.href.includes("docker-sae203") 
            ? "/docker-sae203/siteweb/images/pfp-defaut.png" 
            : "/images/pfp-defaut.png";
        pfp.src = localStorage.getItem(`profilePhotoUrl_${user}`) || defaultPfpPath;
        pfp.id = "profilePicture";
        a.href = "account.html"; 

        a.innerHTML += `${user}`;
        a.append(pfp);
        li.appendChild(a);
        navbar.appendChild(li);
    }
});
