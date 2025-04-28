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
