const videoSection = document.getElementById('video-section');

const localVideos = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",
    "13156171_3840_2160_60fps.mp4",
    "13475074_3840_2160_25fps.mp4",
    "13476456_3840_2160_120fps.mp4",
    "13510797_3840_2160_30fps.mp4",
    "14722767-uhd_3840_2160_30fps.mp4",
    "20606341-uhd_2560_1440_24fps.mp4"
];

async function loadVideos() {
    try {
        const response = await fetch('/videos.json');
        if (!response.ok) throw new Error('JSON not found, using local list');
        const data = await response.json();
        displayVideos(data.videos);
    } catch (error) {
        console.log('Using local video list:', error.message);
        displayVideos(localVideos);
    }
}

function displayVideos(videos) {
    videos.forEach(video => {
        const button = document.createElement('button');
        const videoElement = document.createElement('video');
        
        const videoPath = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? `videos/${video}`
            : `/videos/${video}`;
            
        videoElement.src = videoPath;
        videoElement.className = 'video-player';
        videoElement.preload = 'metadata';

        const videoTitle = document.createElement('p');
        videoTitle.textContent = video.replace('.mp4', '').replace(/_/g, ' ');

        button.appendChild(videoElement);
        button.appendChild(videoTitle);
        videoSection.appendChild(button);
    });
}

loadVideos();
