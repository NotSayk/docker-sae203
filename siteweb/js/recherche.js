document.addEventListener('DOMContentLoaded', () => 
    {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let query = searchInput.value.trim().replace(/ /g, '_');
        if (query) {
                query += '.mp4'; 
            window.location.href = `video.html?video=${encodeURIComponent(query)}`;
        }
    });
});