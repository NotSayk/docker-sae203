const videoSection = document.getElementById('video-section');

function displayVideos(videos) 
{
    videos.forEach(video => {

        const views = localStorage.getItem(`views_${video}`) || 0;
        const likes = localStorage.getItem(`likes_${video}`) || 0;

        const button = document.createElement('button');
        const videoElement = document.createElement('video');

        const videoPath = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? `videos/${video}`
            : `/videos/${video}`;
        
        videoElement.src = videoPath;
        videoElement.className = 'video-player';
        videoElement.preload = 'metadata';
        
        button.onclick = function() 
        {
            localStorage.setItem(`views_${video}`, parseInt(views) + 1);
            vueVideo.innerHTML = `${parseInt(views) + 1}<i class="fas fa-eye"></i>`;
            window.location.href = `video.html?video=${video}`;

        };

        const videoTitle = document.createElement('p');
        videoTitle.textContent = video.replace('.mp4', '').replace(/_/g, ' ');
        videoTitle.className = 'titre-video';

        // Créer un conteneur pour les statistiques
        const statsContainer = document.createElement('div');
        statsContainer.className = 'video-stats';

        const vueVideo = document.createElement('p');
        vueVideo.innerHTML = `${views}<i class="fas fa-eye"></i>`;
        vueVideo.className = 'vue-video';

        const likeVideo = document.createElement('p');
        likeVideo.innerHTML = `${likes}<i class="fas fa-thumbs-up"></i>`;
        likeVideo.className = 'like-video';

        // Créer un élément pour la durée
        const durationElement = document.createElement('p');
        durationElement.className = 'duree-video';
        durationElement.innerHTML = `Durée: <i class="fas fa-clock"></i> ...`;

        // Ajouter les statistiques au conteneur
        statsContainer.appendChild(vueVideo);
        statsContainer.appendChild(likeVideo);
        statsContainer.appendChild(durationElement);

        button.appendChild(videoElement);
        button.appendChild(videoTitle);
        button.appendChild(statsContainer);
        videoSection.appendChild(button);

        videoElement.addEventListener('loadedmetadata', () => {
            // Formater la durée en minutes:secondes
            const minutes = Math.floor(videoElement.duration / 60);
            const seconds = Math.floor(videoElement.duration % 60);
            const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            durationElement.innerHTML = `${formattedDuration}`;
        });
    });
}

displayVideos(localVideos);
