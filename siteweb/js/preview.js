const videos = document.querySelectorAll('video');

videos.forEach(video => {

    video.muted = true;

    video.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play();
        video.loopInterval = setInterval(() => 
            {
            if (video.currentTime >= 2) {
                video.currentTime = 0;
            }
        }, 100);
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; 
        clearInterval(video.loopInterval);
    });
});
