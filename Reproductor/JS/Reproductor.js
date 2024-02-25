const btnPlay = document.querySelector("#play_button"); 
const btnPlayIcon = document.querySelector("#play");
const btnPuaseIcon = document.querySelector("#pause");
const btnRepeat = document.querySelector("#btn-repeat");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVolume = document.querySelector("#btn-volume");
const iconVolumeUP = document.querySelector("#UP");
const iconVolumeMID = document.querySelector("#MID");
const iconVolumeDOWN = document.querySelector("#DOWN");
const iconVolumeMUTE = document.querySelector("#MUTE");
const playerVolume = document.querySelector(".player-volume");
const songName = document.querySelector("#song-name");
const songAuthor = document.querySelector("#song-author");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector(".player-progress");
const audioPlayer = document.querySelector("#audio-player");
const slideValue = document.querySelector(".slide-value");



let currentSong = 1;
let repeatSong = false;
let miniRangeVal = 0;

const formatSecondsToMinutes = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const songs = [ 
    {
        name: "Hikaru Nara",
        author: "Goose House",
        path: "./songs/Hikaru Nara.mp3",
    },
    {
        name: "Nothing is Lost",
        author: "Marco Sfogli",
        path: "./songs/Nothing is Lost.mp3",
    },
    {
        name: "This game",
        author: "Konomi Suzuki",
        path: "./songs/This game.mp3",
    },
    //   {
    //     name: "Best Time",
    //     author: "FASSounds",
    //     path: "./assets/songs/FASSounds - Best Time.mp3",
    //   },
    //   {
    //     name: "Guitar Electro Sport",
    //     author: "Gvidon",
    //     path: "./assets/songs/Gvidon - Guitar Electro Sport Trailer.mp3",
    //   },
];


btnPlay.addEventListener("click", () => play_pause());
playerVolume.addEventListener("input", () => changeVolume());
audioPlayer.addEventListener("timeupdate", () => timeUpdate());
playerProgress.addEventListener("input", () => changeTime());

const play_pause = () => {
    // const song = songs[currentSong];
    // audioPlayer.src = song.path;
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlayIcon.classList.remove("visible");
        btnPuaseIcon.classList.add("visible");
    } else {
        audioPlayer.pause();
        btnPlayIcon.classList.add("visible");
        btnPuaseIcon.classList.remove("visible");
    }
}
const changeVolume = () => {
    const { value } = playerVolume;
    slideValue.innerHTML = value;
    miniRangeVal = value / 100;
    audioPlayer.volume = miniRangeVal;

    if((value <= 60)&(value > 30)){
        iconVolumeUP.classList.remove("visible");
        iconVolumeMID.classList.add("visible");
        iconVolumeDOWN.classList.remove("visible");
    }
    else if((value <= 30)&(value > 0)){
        iconVolumeMID.classList.remove("visible");
        iconVolumeDOWN.classList.add("visible");
        iconVolumeMUTE.classList.remove("visible");
    }
    else if(value == 0){
        iconVolumeDOWN.classList.remove("visible");
        iconVolumeMUTE.classList.add("visible");
    }
    else{
        iconVolumeUP.classList.add("visible");
    }
}
const timeUpdate = () => {
    const { currentTime, duration } = audioPlayer;
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
    playerDuration.innerHTML = formatSecondsToMinutes(duration);
    playerProgress.max = duration;
    playerProgress.value = currentTime;
}
const changeTime = () => {
    audioPlayer.currentTime = playerProgress.value;
};

btnNext.addEventListener("click", () => changeSong());
const changeSong = (next = true) => {
    if (next && currentSong < songs.length - 1) {
        currentSong++;
    } else if (!next && currentSong > 0) {
        currentSong--;
    } else {
        return;
    }

    updatePlayer();
    togglePlaySong();
};
const updatePlayer = () => {
    const song = songs[currentSong];

    songName.innerHTML = song.name;
    songAuthor.innerHTML = song.author;
    audioPlayer.src = song.path;
    playerProgress.value = audioPlayer.currentTime;
};

btnPrev.addEventListener("click", () => changeSong(false));




btnRepeat.addEventListener("click", () => toggleRepeatSong());

audioPlayer.addEventListener("ended", () => ended());






const toggleRepeatSong = () => {
    repeatSong = !repeatSong;
    btnRepeat.classList.toggle("btn-activated");
};
const ended = () => {
    repeatSong ? togglePlaySong() : changeSong(true);
};

window.onload = () => {
    updatePlayer();
};