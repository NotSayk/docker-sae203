const videoSection = document.getElementById('video-section');
const videoFolder = 'videos/';

fetch(videoFolder)
.then(response => {
    if (!response.ok) {
        throw new Error('Unable to fetch video folder');
    }
    return response.text();
})
.then(data => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, 'text/html');
    const videoFiles = Array.from(htmlDoc.querySelectorAll('a'))
        .map(link => link.href)
        .filter(href => href.endsWith('.mp4'));

    videoFiles.forEach(video => {
        const button = document.createElement('button');
        const videoElement = document.createElement('video');
        videoElement.src = video;
        videoElement.className = 'video-player';
        videoElement.preload = 'metadata'; // Charge uniquement les métadonnées (durée, dimensions)
        videoElement.setAttribute('poster', ''); // Utilise un placeholder ou capture automatique

        // Ajoute le titre en dessous
        const videoTitle = document.createElement('p');
        const videoName = video.split('/').pop().replace('.mp4', '');
        videoTitle.textContent = videoName;

        button.appendChild(videoElement);
        button.appendChild(videoTitle);
        videoSection.appendChild(button);
    });
})
.catch(error => console.error('Error fetching videos:', error));