const dataListeRech = document.getElementById("listeBarRech");

document.addEventListener('DOMContentLoaded', () => {
    const formulaireRecherche = document.getElementById('search-form');
    const champRecherche = document.getElementById('search-input');

    async function initialiserRecherche()
    {
        const videos = await getJson("videos.json");

        if (formulaireRecherche && champRecherche)
            {
            formulaireRecherche.addEventListener('submit', (event) => {
                event.preventDefault();
                const requete = champRecherche.value.toLowerCase().trim();
                const correspondance = videos.find(video => video.toLowerCase().includes(requete));

                if (correspondance)
                    {
                    window.location.href = `video.html?video=${encodeURIComponent(correspondance)}`;
                }
                else
                {
                    window.location.href = `video.html`;
                }
            });
        }
    }

    initialiserRecherche();
});

function creationOptionsDataList()
{
    localVideos.forEach(element => {
        let opt = document.createElement("option");
        opt.value = getVideoNom(element);
        opt.text = getVideoNom(element);
        dataListeRech.append(opt);
    });
}

creationOptionsDataList();