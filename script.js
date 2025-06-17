console.log("Welcome To Spotify");
let songindex=0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitems=Array.from(document.getElementsByClassName('songitem'));
let currentPlayingId = null;

let songs=[
   {songName:"Aaj Ki Raat",filePath:"song1.mp3",coverPath:"songs1.png"},
   {songName:"Tum hi ho",filePath:"song2.mp3",coverPath:"songs2.png"},
   {songName:"Aaj Bhi",filePath:"song3.mp3",coverPath:"songs3.png"},
   {songName:"Sajde",filePath:"song4.mp3",coverPath:"songs4.png"},
   {songName:"Lean On",filePath:"song5.mp3",coverPath:"songs5.png"},
   
]

songitems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songName
})



// audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//list to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedId = parseInt(e.target.id);

        // If clicking the same song that is currently playing
        if (currentPlayingId === clickedId && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            currentPlayingId = null;
        } else {
            makeAllPlays();
            songindex = clickedId;
            currentPlayingId = songindex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            mastersongname.innerText = songs[songindex-1].songName;
            audioElement.src = `song${songindex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});

let volumeControl = document.getElementById('volumeControl');

// Set initial volume
audioElement.volume = 0.5;

// Listen to volume slider change
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});


document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=5){
        songindex=0;
    }
    else{
        songindex+=1;
}
audioElement.src=`song${songindex}.mp3`;
mastersongname.innerText = songs[songindex-1].songName;
   audioElement.currentTime=0;
   audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
}
audioElement.src=`song${songindex}.mp3`;
mastersongname.innerText = songs[songindex-1].songName;
   audioElement.currentTime=0;
   audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

})