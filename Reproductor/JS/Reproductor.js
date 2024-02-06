const btnPlay = document.querySelector("#play_button"); 
const btnPlayIcon = document.querySelector("#play");
const btnPuaseIcon = document.querySelector("#pause");
const btnRepeat = document.querySelector("#btn-repeat");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVolume = document.querySelector("#btn-volume");
const btnVolumeIcon = document.querySelector("#btn-volume i");
const playerVolume = document.querySelector("#player-volume");
const songName = document.querySelector("#song-name");
const songAuthor = document.querySelector("#song-author");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");
const slideValue = document.querySelector(".slide-value");



let currentSong = 0;
let repeatSong = false;



const songs = [ 
    {
        name: "La Voz de tus Sentidos",
        author: "Jannine Rada",
        path: "./songs/La Voz de tus Sentidos - Jannine rada.mp3",
    }
    //   {
    //     name: "Jazzy Abstract Beat",
    //     author: "Coma Media",
    //     path: "./assets/songs/Coma Media - Jazzy Abstract Beat.mp3",
    //   },
    //   {
    //     name: "Sexy Fashion Beats",
    //     author: "Coma Media",
    //     path: "./assets/songs/Coma Media - Sexy Fashion Beats.mp3",
    //   },
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


btnPlay.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlayIcon.classList.remove("visible");
        btnPuaseIcon.classList.add("visible");
    } else {
        audioPlayer.pause();
        btnPlayIcon.classList.add("visible");
        btnPuaseIcon.classList.remove("visible");
    }
});
playerVolume.addEventListener("input", () => {
    let rangeVal = playerVolume.value;
    slideValue.innerHTML = rangeVal;
});
btnPrev.addEventListener("click", () => changeSong(false));

btnNext.addEventListener("click", () => changeSong());
btnRepeat.addEventListener("click", () => toggleRepeatSong());
playerProgress.addEventListener("input", () => changeTime());
audioPlayer.addEventListener("timeupdate", () => {
    let currentTime1 = audioPlayer.currentTime;
    playerCurrentTime.innerHTML = currentTime1;
    console.log(currentTime1);
});
audioPlayer.addEventListener("ended", () => ended());



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

const toggleRepeatSong = () => {
    repeatSong = !repeatSong;
    btnRepeat.classList.toggle("btn-activated");
};

const timeUpdate = () => {
    const { currentTime, duration } = audioPlayer;

    if (isNaN(duration)) return;

    playerDuration.innerHTML = formatSecondsToMinutes(duration);
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
    playerProgress.max = duration;
    playerProgress.value = currentTime;
};

// const changeVolume = () => {
//     const { value } = playerVolume;

//     audioPlayer.volume = value;

//     if (value == 0) {
//         btnVolumeIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
//     } else {
//         btnVolumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
//     }
// };

const changeTime = () => {
    audioPlayer.currentTime = playerProgress.value;
};

const formatSecondsToMinutes = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const ended = () => {
    repeatSong ? togglePlaySong() : changeSong(true);
};

window.onload = () => {
    updatePlayer();
};