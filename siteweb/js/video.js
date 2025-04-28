const PARAMETRES = new URLSearchParams(window.location.search);
const DIV1 = document.getElementById("VideoDiv");
const VIDEO_URL = PARAMETRES.get("video");
const VIDEO_FOLDER = "videos/"; 

let lstVideo = [];

function main()
{
    ajouterVideo();
    ajouterBarInfo();
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
            icon.style.color = "blue"; // Pouce bleu si liké
        } else {
            icon.style.color = ""; // Couleur de base sinon
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
            currentLikes = Math.max(currentLikes - 1, 0); // éviter d'aller en négatif
            localStorage.setItem(`likes_${VIDEO_URL}`, currentLikes);
            localStorage.setItem(`${currentUser}_liked_${VIDEO_URL}`, 'false');
            aLike = false;
        } else {
            currentLikes += 1;
            localStorage.setItem(`likes_${VIDEO_URL}`, currentLikes);
            localStorage.setItem(`${currentUser}_liked_${VIDEO_URL}`, 'true');
            aLike = true;
        }

        // Mettre à jour l'affichage
        const likesCountElement = document.getElementById("likesCount");
        likesCountElement.textContent = currentLikes;
        updateLikeButtonAppearance();
    });

    // Nouvelle structure des éléments
    DIV1.append(DIV2);
    DIV2.append(titre);
    // Ajout du statsContainer à DIV2
    DIV2.append(statsContainer);
    // Ajout des vues et des likes au statsContainer
    statsContainer.append(vuesInfo);
    statsContainer.append(likesContainer);
    likesContainer.append(likeButton);
}

function ajouterVideo()
{
    if (lstVideo.includes(VIDEO_URL))
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

function getContenuJSON(json)
{
    return fetch(json)
        .then(response => response.json())
        .then(jsonData => {
            lstVideo = jsonData.videos || [];
            main();
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier JSON:', error);
        });
}



getContenuJSON("videos.json");
