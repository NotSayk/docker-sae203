const dataListeRech = document.getElementById("listeBarRech");

// document.addEventListener('DOMContentLoaded', () => {
//     const formulaireRecherche = document.getElementById('search-form');
//     const champRecherche = document.getElementById('search-input');

//     async function chargerListeVideos() {
//         try {
//             const reponse = await fetch('videos.json');
//             const donnees = await reponse.json();
//             return donnees.videos || [];
//         } catch {
//             return [];
//         }
//     }

//     async function initialiserRecherche() {
//         const videos = await chargerListeVideos();

//         if (formulaireRecherche && champRecherche) {
//             formulaireRecherche.addEventListener('submit', (event) => {
//                 event.preventDefault();
//                 const requete = champRecherche.value.toLowerCase().trim();
//                 const correspondance = videos.find(video => video.toLowerCase().includes(requete));

//                 if (correspondance) {
//                     window.location.href = `video.html?video=${encodeURIComponent(correspondance)}`;
//                 } else {
//                     window.location.href = `video.html`;
//                 }
//             });
//         }
//     }

//     initialiserRecherche();
// });

function getVideoNom(nomVideo)
{
    return nomVideo.replaceAll(".mp4", "").replaceAll("_", " ");   
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

creationOptionsDataList();

// FAIRE la page des videos rechercher (quand il y a des video avec simi mais pas de recherche precises)

// document.getElementById("barreRecherche").addEventListener('input', function(e) {
//     let lstVideoTrouver = [];
//     let message = e.target.value.toLowerCase();
    
//     if (message)
//     {
//         rechercheVideoSimilaire(message);
//     }
    
// });

function rechercheVideoSimilaire(input)
{

    let videos = []
    
    localVideos.forEach(element => {
        let elt = element.toLowerCase();
        let search = elt.search(input);
        if (search != -1)
        {
            videos.push(element)
        }
    });
}