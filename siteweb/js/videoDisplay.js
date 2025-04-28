const videoSection = document.getElementById('video-section');

const localVideos =    
[
        "heres_a_10_seconde_joke.mp4",
        "my_10_second_football_clip.mp4",
        "penguin(very_emotional).mp4",
        "เจอเรเต้นกับลิ.mp4",
        "เพนกวินเต้นตึงๆ.mp4",
        "tralalero_tralala.mp4",
        "shimi_shimi.mp4",
        "china_lore.mp4",
        "Gegagedigedagedago.mp4",
        "skibidi-puttin.mp4",
        "yoooooo.mp4",
        "low_quality_gag_nam.mp4",
        "Low_Quality_Memes.mp4",
        "memes_discord.mp4",
        "Low_quality_vids.mp4",
        "Horizontally_spinning_man.mp4"
]

async function loadVideos() 
{
    try {
        const response = await fetch('/videos.json');
        if (!response.ok) throw new Error('Fichier json non trouvé');
        const data = await response.json();
        displayVideos(data.videos);
    } catch (error) {
        console.log('utilisation de la liste locale:', error.message);
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
        
        button.type = "submit";
        button.onclick = function() 
        {
            let currentUrl = document.URL.replace("index.html", "video.html");
            if (!currentUrl.includes("video.html")) {
                currentUrl = currentUrl.replace(/\$/, '') + "/video.html";
            }
            window.location.href = currentUrl + "?video=" + video;
        };

        const videoTitle = document.createElement('p');
        videoTitle.textContent = video.replace('.mp4', '').replace(/_/g, ' ');
        videoTitle.className = 'titre-video';

        button.appendChild(videoElement);
        button.appendChild(videoTitle);
        videoSection.appendChild(button);
    });
}

loadVideos();

