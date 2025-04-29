const dataListeRech = document.getElementById("listeBarRech");
const sectionVideo = document.getElementById("video-section");

function main()
{
    creationOptionsDataList();
}

function creationOptionsDataList()
{
    localVideos.forEach(element => {
        let opt = document.createElement("option");
        opt.value = getVideoNom(element);
        opt.text = getVideoNom(element);
        dataListeRech.append(opt);
    });
}

function recherche(input)
{
    cacherVideos();
    afficherVideo(input);
}

function getVideoLookALike(input)
{
    let vList = [];

    for (let index = 0; index < sectionVideo.children.length; index++)
    {
        const video = sectionVideo.children[index];
        let titreVideo = video.querySelector(".titre-video").textContent.toLowerCase();
        input = input.toLowerCase();

        if (titreVideo.search(input) != -1)
        {
            vList.push(video);
        }
    }
    
    return vList;
}

function cacherVideos()
{
    for (let index = 0; index < sectionVideo.children.length; index++)
    {
        const element = sectionVideo.children[index];

        element.setAttribute("hidden", "true");
    }
}

function afficherVideo(listeVideos)
{
    listeVideos.forEach(element => {
        element.removeAttribute("hidden");
    });
}

document.getElementById("search-input").addEventListener("input", function(e)
{
    recherche(getVideoLookALike(e.target.value));
});

document.addEventListener('DOMContentLoaded', () => {
    const formulaireRecherche = document.getElementById('search-form');
    const champRecherche = document.getElementById('search-input');

    async function chargerListeVideos() {
        try {
            const reponse = await fetch('videos.json');
            const donnees = await reponse.json();
            return donnees.videos || [];
        } catch {
            return [];
        }
    }

    async function initialiserRecherche() {
        const videos = await chargerListeVideos();

        if (formulaireRecherche && champRecherche) {
            formulaireRecherche.addEventListener('submit', (event) => {
                event.preventDefault();
                const requete = champRecherche.value.toLowerCase().trim();
                const correspondance = videos.find(video => video.toLowerCase().includes(requete));

                if (correspondance) {
                    window.location.href = `video.html?video=${encodeURIComponent(correspondance)}`;
                } else {
                    window.location.href = `video.html`;
                }
            });
        }
    }

    initialiserRecherche();
});

main();