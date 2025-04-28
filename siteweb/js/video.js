const PARAMETRES = new URLSearchParams(window.location.search);
const DIV = document.getElementById("PrimaryDiv")
const VIDEO_URL = PARAMETRES.get("video");

// Dossier
const VIDEO_FOLDER = "videos/"

if (VIDEO_URL)
{
    let video = document.createElement("video");
    let source = document.createElement("source");

    source.setAttribute("src", VIDEO_FOLDER + VIDEO_URL);
    video.setAttribute("controls", true);

    DIV.append(video);
    video.append(source);
}