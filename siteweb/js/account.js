document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments
    const profileImage = document.getElementById('profile-image');
    const photoOptions = document.getElementById('photo-options');
    const changePhotoBtn = document.getElementById('change-photo-btn');
    const deletePhotoBtn = document.getElementById('delete-photo-btn');
    const profileUpload = document.getElementById('profile-upload');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Afficher le nom d'utilisateur
    const currentUser = sessionStorage.getItem('user');
    if (currentUser) {
        usernameDisplay.textContent = currentUser;
    } else {
        window.location.href = 'login.html';
    }
    
    // Charger la photo de profil si elle existe
    const savedProfileImage = localStorage.getItem(`${currentUser}_profileImage`);
    if (savedProfileImage) {
        profileImage.src = savedProfileImage;
    }
    
    // Afficher/masquer les options au clic sur la photo
    profileImage.addEventListener('click', function(e) {
        e.stopPropagation();
        photoOptions.style.display = photoOptions.style.display === 'none' ? 'flex' : 'none';
    });
    
    // Fermer les options si on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!photoOptions.contains(e.target) && e.target !== profileImage) {
            photoOptions.style.display = 'none';
        }
    });
    
    // Changer la photo
    changePhotoBtn.addEventListener('click', function() {
        profileUpload.click();
    });
    
    // Traiter le fichier sélectionné
    profileUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                // Sauvegarder l'image dans le localStorage
                localStorage.setItem(`${currentUser}_profileImage`, e.target.result);
            };
            reader.readAsDataURL(file);
        }
        photoOptions.style.display = 'none';
    });
    
    // Supprimer la photo
    deletePhotoBtn.addEventListener('click', function() {
        profileImage.src = 'images/logo.png';
        localStorage.removeItem(`${currentUser}_profileImage`);
        photoOptions.style.display = 'none';
    });
    
    // Déconnexion
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('user');
        window.location.href = 'index.html';
    });
});
