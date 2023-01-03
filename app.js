document.getElementById('searchBtn').addEventListener('click',function(){
    const searchInput=document.getElementById('searchInput').value;
    loadSongs(searchInput);
})
const loadSongs = searchInput => {
    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
    .then(res=>res.json())
    .then(data=>displaySongs(data.data))
}
const displaySongs = songs=>{
    const songContainer=document.getElementById('songContainer')
    songContainer.innerHTML="";
    songs.forEach(song => {
        const songDiv= document.createElement('div')
        songDiv.className='single-result row align-items-center my-3 p-3';
        songDiv.innerHTML=`
                <div class="col-md-9">
                    <div class="d-flex justify-content-start">
                    <img src=${song.artist.picture} alt="artist picture">
                        <div class="p-2">
                            <h3 class="lyrics-name">${song.title}</h3>
                            <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        </div>
                    </div>
                    <audio controls class="mt-3">
                        <source src="${song.preview}" type="audio/mpeg">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getSongLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
                    `
        songContainer.appendChild(songDiv);

    });
}
const getSongLyrics=(artistName,title)=>{
    console.log(artistName,title);
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
    .then(res=>res.json())
    .then(data=>console.log(data))
}