const PARAMETRES = new URLSearchParams(window.location.search);
const DIV = document.getElementById("PrimaryDiv");
const VIDEO_URL = PARAMETRES.get("video");
const VIDEO_FOLDER = "videos/"; // Dossier

let lstVideo = [];

function main()
{
    if (lstVideo.includes(VIDEO_URL))
    {
        document.title = "TonTube - " + VIDEO_URL.substring(0, VIDEO_URL.length - 4);

        let video = document.createElement("video");
        let source = document.createElement("source");

        source.setAttribute("src", VIDEO_FOLDER + VIDEO_URL);
        video.setAttribute("controls", true);

        DIV.append(video);
        video.append(source);
    }
    else
    {
        let erreur = document.createElement("h1");
        erreur.textContent = "Error 404";
        erreur.id = "MESSAGE-ERROR";
        DIV.append(erreur);
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
