let musicName = document.querySelector(".aboutContent .musicPlayer .musicDetails .musicName");
let artistName = document.querySelector(".aboutContent .musicPlayer .musicDetails .artistName");
let img = document.querySelector(".aboutContent .musicPlayer .musicImageBox .musicImage img");
let imgBox = document.querySelector(".aboutContent .musicPlayer .musicImageBox .musicImage");
let music = document.querySelector(".aboutContent .musicPlayer #music");
let playPauseBtn = document.querySelector(".aboutContent .musicPlayer .btnsBox .btns .playPauseBtn");
let currTime = document.querySelector(".aboutContent .musicPlayer .musicDetails .currentTime");
let ttlTime = document.querySelector(".aboutContent .musicPlayer .musicDetails .totalTime");
let prgArea = document.querySelector(".aboutContent .musicPlayer .musicDetails .progressArea");
let prgBar = document.querySelector(".aboutContent .musicPlayer .musicDetails .progressArea .progressBar");
let backBtn = document.querySelector(".aboutContent .musicPlayer .btnsBox .btns .fast_rewind");
let nextBtn = document.querySelector(".aboutContent .musicPlayer .btnsBox .btns .fast_forward");

let musicIndex = 1;

window.addEventListener("load", ()=>{
    // calling loadMusic function on page load
    loadMusic();
})

// loadMusic function
let loadMusic =()=>{
    musicName.innerHTML = `${allMusic[musicIndex - 1].name}`;
    artistName.innerHTML = `${allMusic[musicIndex - 1].artist}`;
    music.src = `${allMusic[musicIndex - 1].src}.mp3`;
    img.src = `${allMusic[musicIndex - 1].img}.jpg`;
}

playPauseBtn.addEventListener("click", ()=>{
    // if playPauseBtn contains Class Name "play"
    if(playPauseBtn.classList.contains("play")){
        // then replace class "play" to "paused"
        playPauseBtn.classList.replace("play", "paused");
        playPauseBtn.querySelector(".material-icons").innerHTML = "pause";
        imgBox.classList.add("img-rotate");
        music.play();
    }
    else{
        // else replace class "paused" to "play"
        playPauseBtn.classList.replace("paused", "play");
        playPauseBtn.querySelector(".material-icons").innerHTML = "play_arrow";
        imgBox.classList.remove("img-rotate");
        music.pause();
    }
})

music.addEventListener("timeupdate", (e)=>{
    // music current time
    let currentTime = e.target.currentTime;
    // music total time
    let audioDuration = e.target.duration;

    // formatting music current tuimne in minute & second
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    currTime.innerHTML = `${currentMin}:${currentSec}`;

    // formatting music current tuimne in minute & second
    music.addEventListener("loadeddata", ()=>{
        let audioDuration = music.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        ttlTime.innerHTML = `${totalMin}:${totalSec}`;
    })

    // incresing progress bar width on time update
    // getting percentage
    let progressWidth = (currentTime / audioDuration) * 100;
    // passing percentage as progress width
    prgBar.style.width = `${progressWidth}%`;

    // updating prgBar width according to click on progress bar
    prgArea.addEventListener("click", (e)=>{
        // timeline width
        let progressWidth = prgArea.clientWidth;
        // coordinate of the width
        let clickedOffsetX = e.offsetX;
        // music total time
        let songDuration = music.duration;
        // updating current time
        music.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    })
})

// next music button event
nextBtn.addEventListener("click", ()=>{
    // increment of index by 1
    musicIndex++;
    // if musicIndex greater than array length,
    // then music index = 1 else musicIndex = musicIndex
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    // then replace class "play" to "paused"
    playPauseBtn.classList.replace("play", "paused");
    playPauseBtn.querySelector(".material-icons").innerHTML = "pause";
    imgBox.classList.add("img-rotate");
    setTimeout(()=>{
        music.play();
    }, 700);
    loadMusic(musicIndex);
})

// previous music button event
backBtn.addEventListener("click", ()=>{
    // decrement of index by 1
    musicIndex--;
    // if musicIndex less than 1,
    // the musicIndex qill be equal to array length
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    // then replace class "play" to "paused"
    playPauseBtn.classList.replace("play", "paused");
    playPauseBtn.querySelector(".material-icons").innerHTML = "pause";
    imgBox.classList.add("img-rotate");
    setTimeout(()=>{
        music.play();
    }, 700);
    loadMusic(musicIndex);
})

// play next music after song ends
music.addEventListener("ended", ()=>{
    nextBtn.click();
})