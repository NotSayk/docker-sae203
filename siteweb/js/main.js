
const localVideos = [
        "neymar_compil.mp4",
        "rick_roll.mp4",
        "my_10_second_football_clip.mp4",
        "penguin(very_emotional).mp4",
        "เจอเรเต้นกับลิ.mp4",
        "เพนกวินเต้นตึงๆ.mp4",
        "tralalero_tralala.mp4",
        "shimi_shimi.mp4",
        "Gegagedigedagedago.mp4",
        "skibidi-puttin.mp4",
        "low_quality_gag_nam.mp4",
        "birthday_isIt.mp4",
        "young_ronaldo.mp4"
];

function getJson(fichier)
{
    try
    {
        let json = fetch(ficher);
        let data = json.json();
        return data;
    }
    catch (error)
    {
        return [];
    }
}

function getVideoNom(nomVideo)
{
    return nomVideo.replaceAll(".mp4", "").replaceAll("_", " ");   
}