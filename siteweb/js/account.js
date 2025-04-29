const boutonDeconnexion = document.getElementById('deco-bouton');
const boutonChangerPhoto = document.getElementById('changer');
const photoProfil = document.getElementById('logo-compte');
const utilisateurActuel = sessionStorage.getItem('user');

document.addEventListener('DOMContentLoaded', function() {
    const statDiv = document.querySelector('#likes');
    let likes = parseInt(localStorage.getItem(`likes_${utilisateurActuel}`)) || 0;

    statDiv.textContent = `Likes : ${likes}`;

    statDiv.addEventListener('click', function() {
        likes++;
        statDiv.textContent = `Likes : ${likes}`;
        localStorage.setItem(`likes_${utilisateurActuel}`, likes);
    });


    if (!utilisateurActuel) 
    {
        window.location.href = 'index.html'; 
        return;
    }

    const urlPhotoEnregistree = localStorage.getItem(`profilePhotoUrl_${utilisateurActuel}`);
    if (urlPhotoEnregistree) 
    {
        photoProfil.src = urlPhotoEnregistree;
    }

    boutonDeconnexion.addEventListener('click', function() 
    {
        sessionStorage.removeItem('user');
        window.location.href = 'index.html';
    });

    boutonChangerPhoto.addEventListener('click', function() 
    {
        const nouvelleUrlPhoto = prompt('Entrez l\'URL de la nouvelle photo de profil :');

        if (nouvelleUrlPhoto)
        {
            photoProfil.src = nouvelleUrlPhoto;
            localStorage.setItem(`profilePhotoUrl_${utilisateurActuel}`, nouvelleUrlPhoto);
            location.reload();    
        }
        else
        {
            photoProfil.src = "images/pfp-defaut.png";
            localStorage.setItem(`profilePhotoUrl_${utilisateurActuel}`, "images/pfp-defaut.png");
            location.reload();
        }
    });
});