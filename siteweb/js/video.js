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

    const views = localStorage.getItem(`views_${VIDEO_URL}`) || 0;

    DIV2.id = "DescriptionDiv";
    titre.textContent = VIDEO_URL.substring(0, VIDEO_URL.length - 4).replaceAll('_', ' ');
    vuesInfo.innerHTML = `<i class="fas fa-eye"></i> ${views} vues`;
    vuesInfo.id = "vuesCount";
    
    DIV1.append(DIV2);
    DIV2.append(titre);
    DIV2.append(vuesInfo);
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
