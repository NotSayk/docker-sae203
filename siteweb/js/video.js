const PARAMETRES = new URLSearchParams(window.location.search);
const DIV1 = document.getElementById("VideoDiv");
const VIDEO_URL = PARAMETRES.get("video");
const VIDEO_FOLDER = "videos/"; 

function main()
{
    ajouterVideo();
    ajouterBarInfo();
    ajouterEvenementPartage();
}

function ajouterBarInfo()
{
    const DIV2 = document.createElement("div");
    let titre = document.createElement("h2");
    let statsContainer = document.createElement("div");
    let vuesInfo = document.createElement("p");
    let likesContainer = document.createElement("div");
    let likeButton = document.createElement("button");

    const currentUser = sessionStorage.getItem('user');
    
    const views = localStorage.getItem(`views_${VIDEO_URL}`) || 0;
    const likes = localStorage.getItem(`likes_${VIDEO_URL}`) || 0;
    let aLike = currentUser ? localStorage.getItem(`${currentUser}_liked_${VIDEO_URL}`) === 'true' : false;

    DIV2.id = "DescriptionDiv";
    titre.textContent = VIDEO_URL.substring(0, VIDEO_URL.length - 4).replaceAll('_', ' ');

    // Création de la div stats-video pour contenir les vues et les likes
    statsContainer.className = "stats-video";

    vuesInfo.innerHTML = `<i class="fas fa-eye"></i> ${views} vues`;
    vuesInfo.id = "vuesCount";

    likesContainer.id = "likesContainer";
    likesContainer.className = "likes-section";

    likeButton.id = "likeButton";
    likeButton.innerHTML = `<i class="fas fa-thumbs-up"></i> <span id="likesCount">${likes}</span>`;

    if (!currentUser) {
        likeButton.disabled = true;
        likeButton.title = "Connectez-vous pour pouvoir liker cette vidéo";
    }

    function updateLikeButtonAppearance() {
        const icon = likeButton.querySelector('i');
        if (aLike) {
            icon.style.color = "blue"; 
        } else {
            icon.style.color = "";
        }
    }

    updateLikeButtonAppearance(); // Mise à jour 

    likeButton.addEventListener("click", function() 
    {
        if (!currentUser) {
            alert("Vous devez être connecté pour liker cette vidéo");
            return;
        }

        let currentLikes = parseInt(localStorage.getItem(`likes_${VIDEO_URL}`) || 0);

        if (aLike) {
            currentLikes = Math.max(currentLikes - 1, 0);
            localStorage.setItem(`likes_${VIDEO_URL}`, currentLikes);
            localStorage.setItem(`${currentUser}_liked_${VIDEO_URL}`, 'false');
            localStorage.setItem(`likes_${currentUser}`, Math.max(parseInt(localStorage.getItem(`likes_${currentUser}`) || 0) - 1, 0));
            aLike = false;
        } else {
            currentLikes += 1;
            localStorage.setItem(`likes_${VIDEO_URL}`, currentLikes);
            localStorage.setItem(`${currentUser}_liked_${VIDEO_URL}`, 'true');
            localStorage.setItem(`likes_${currentUser}`, (parseInt(localStorage.getItem(`likes_${currentUser}`) || 0) + 1));
            aLike = true;
        }

        const likesCountElement = document.getElementById("likesCount");
        likesCountElement.textContent = currentLikes;
        updateLikeButtonAppearance();
    });

    // Ajout des boutons de partage et de téléchargement
    const downloadButton = document.createElement("a");
    const shareButton = document.createElement("button");

    downloadButton.id = "downloadButton";
    shareButton.id = "shareButton";

    downloadButton.href = VIDEO_FOLDER + VIDEO_URL;
    downloadButton.download = VIDEO_URL;
    downloadButton.innerHTML = `<i class="fas fa-download"></i> Télécharger`;

    shareButton.innerHTML = `<i class="fas fa-share"></i> Partager`;



    DIV1.append(DIV2);
    DIV2.append(titre);
    DIV2.append(statsContainer);
    statsContainer.append(vuesInfo);
    statsContainer.appendChild(shareButton);
    statsContainer.appendChild(downloadButton);
    statsContainer.append(likesContainer);
    likesContainer.append(likeButton);
}

function ajouterVideo()
{
    if (localVideos.includes(VIDEO_URL))
    {
        document.title = "TonTube - " + VIDEO_URL.substring(0, VIDEO_URL.length - 4);

        let video = document.createElement("video");
        let source = document.createElement("source");

        source.setAttribute("src", VIDEO_FOLDER + VIDEO_URL);
        video.setAttribute("controls", true);

        DIV1.append(video);
        video.append(source);
    }
    else
    {
        let erreur = document.createElement("h1");
        erreur.textContent = "Error 404";
        erreur.id = "MESSAGE-ERROR";
        DIV1.append(erreur);
    }
}

function ajouterEvenementPartage()
{
    const shareButton = document.getElementById("shareButton");
    shareButton.addEventListener("click", function() 
    {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
        alert("Le lien de la vidéo a été copié dans le presse-papiers !");
    });
}

main();
