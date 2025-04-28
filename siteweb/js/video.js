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
    let vuesInfo = document.createElement("p");
    let likesContainer = document.createElement("div");
    let likesInfo = document.createElement("p");
    let likeButton = document.createElement("button");

    // Récupérer l'utilisateur actuellement connecté
    const currentUser = sessionStorage.getItem('user');
    
    const views = localStorage.getItem(`views_${VIDEO_URL}`) || 0;
    const likes = localStorage.getItem(`likes_${VIDEO_URL}`) || 0;
    
    // Vérifier si l'utilisateur connecté a déjà liké cette vidéo
    const hasLiked = currentUser ? localStorage.getItem(`${currentUser}_liked_${VIDEO_URL}`) === 'true' : false;

    DIV2.id = "DescriptionDiv";
    titre.textContent = VIDEO_URL.substring(0, VIDEO_URL.length - 4).replaceAll('_', ' ');
    
    vuesInfo.innerHTML = `<i class="fas fa-eye"></i> ${views} vues`;
    vuesInfo.id = "vuesCount";
    
    likesContainer.id = "likesContainer";
    likesContainer.className = "likes-section";
    
    likesInfo.innerHTML = `<i class="fas fa-thumbs-up"></i> ${likes}`;
    likesInfo.id = "likesCount";
    
    likeButton.innerHTML = `J'aime`;
    likeButton.id = "likeButton";
    
    // Désactiver le bouton si l'utilisateur n'est pas connecté ou a déjà liké
    if (!currentUser) 
    {
        likeButton.disabled = true;
        likeButton.title = "Connectez-vous pour pouvoir liker cette vidéo";
    } else if (hasLiked) 
    {
        likeButton.disabled = true;
        likeButton.title = "Vous avez déjà liké cette vidéo";
    }
    
    likeButton.addEventListener("click", function() 
    {
        // Vérifier si l'utilisateur est connecté
        if (!currentUser) 
            {
            alert("Vous devez être connecté pour liker cette vidéo");
            return;
        }
        
        const currentLikes = parseInt(localStorage.getItem(`likes_${VIDEO_URL}`) || 0);
        const newLikes = currentLikes + 1;
        localStorage.setItem(`likes_${VIDEO_URL}`, newLikes);
        likesInfo.innerHTML = `<i class="fas fa-thumbs-up"></i> ${newLikes}`;

        localStorage.setItem(`${currentUser}_liked_${VIDEO_URL}`, 'true');
        this.disabled = true;
        this.title = "Vous avez déjà liké cette vidéo";
    });
    
    DIV1.append(DIV2);
    DIV2.append(titre);
    DIV2.append(vuesInfo);
    DIV2.append(likesContainer);
    likesContainer.append(likesInfo);
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
