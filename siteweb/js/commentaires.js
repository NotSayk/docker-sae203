document.addEventListener("DOMContentLoaded", () => {
    const champCommentaire = document.getElementById("commentaire-input");
    const conteneurCommentaires = document.getElementById("section-commentaires");
    const enTeteCommentaires = document.querySelector("#commentaires h2");
    const utilisateur = sessionStorage.getItem("user");
    const photoProfilElement = document.getElementById("pfp");

    // Définir la photo de profil
    const definirPhotoProfil = () => {
        if (utilisateur) {
            const urlPhotoProfil = localStorage.getItem(`profilePhotoUrl_${utilisateur}`);
            photoProfilElement.src = urlPhotoProfil || "images/pfp-defaut.png";
        } else {
            photoProfilElement.src = "images/pfp-defaut.png";
        }
    };

    // Mettre à jour le nombre de commentaires
    const mettreAJourNombreCommentaires = () => {
        const nombre = conteneurCommentaires.children.length;
        enTeteCommentaires.textContent = `${nombre} Commentaire${nombre !== 1 ? "s" : ""}`;
    };

    // Créer un élément de commentaire
    const creerElementCommentaire = (texte, utilisateur) => {
        const divCommentaire = document.createElement("div");
        divCommentaire.classList.add("comment");

        const imageProfil = document.createElement("img");
        imageProfil.src = localStorage.getItem(`profilePhotoUrl_${utilisateur}`) || "images/pfp-defaut.png";
        imageProfil.alt = "Photo de profil utilisateur";
        imageProfil.classList.add("pfp");

        const infoCommentaire = document.createElement("div");
        infoCommentaire.classList.add("info-com");

        const nomUtilisateur = document.createElement("span");
        nomUtilisateur.textContent = `@${utilisateur}`;
        nomUtilisateur.classList.add("username");

        const texteCommentaire = document.createElement("p");
        texteCommentaire.textContent = texte;
        texteCommentaire.classList.add("comment-text");

        infoCommentaire.appendChild(nomUtilisateur);
        infoCommentaire.appendChild(texteCommentaire);

        divCommentaire.appendChild(imageProfil);
        divCommentaire.appendChild(infoCommentaire);

        return divCommentaire;
    };

    // Sauvegarder les commentaires dans le localStorage
    const sauvegarderCommentaires = () => {
        const commentaires = [];
        conteneurCommentaires.querySelectorAll(".comment").forEach(commentaire => {
            const nomUtilisateur = commentaire.querySelector(".username").textContent;
            const texte = commentaire.querySelector(".comment-text").textContent;
            const urlPhotoProfil = localStorage.getItem(`profilePhotoUrl_${nomUtilisateur.slice(1)}`);
            commentaires.push({ utilisateur: nomUtilisateur, texte, photoProfil: urlPhotoProfil });
        });
        localStorage.setItem("commentaires", JSON.stringify(commentaires));
    };

    // Charger les commentaires depuis le localStorage
    const chargerCommentaires = () => {
        const commentaires = JSON.parse(localStorage.getItem("commentaires")) || [];
        commentaires.forEach(({ utilisateur, texte, photoProfil }) => {
            if (photoProfil) {
                localStorage.setItem(`profilePhotoUrl_${utilisateur.slice(1)}`, photoProfil);
            }
            const commentaire = creerElementCommentaire(texte, utilisateur.slice(1));
            conteneurCommentaires.appendChild(commentaire);
        });
        mettreAJourNombreCommentaires();
    };

    // Ajouter un commentaire
    const ajouterCommentaire = () => {
        if (!utilisateur) {
            alert("Vous devez être connecté pour commenter.");
            return;
        }

        const texte = champCommentaire.value.trim();
        if (texte) {
            const nouveauCommentaire = creerElementCommentaire(texte, utilisateur);
            conteneurCommentaires.appendChild(nouveauCommentaire);
            champCommentaire.value = "";
            mettreAJourNombreCommentaires();
            sauvegarderCommentaires();
        }
    };

    // Gestion de l'événement pour ajouter un commentaire avec la touche Entrée
    champCommentaire.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            ajouterCommentaire();
        }
    });

    // Initialisation
    definirPhotoProfil();
    chargerCommentaires();
});
