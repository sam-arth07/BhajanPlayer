const musicPlayer = document.querySelector(".music-player");
const audio = document.getElementById("audio");
const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".artist-name");
const playBtn = document.querySelector(".play-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const progress = document.querySelector(".progress-bar");
const volumeSlider = document.querySelector(".volume-slider");
const playlist = document.querySelector(".playlist");
const addSongBtn = document.querySelector(".add-song-btn");
const speedControl = document.getElementById("speed");
const start = document.querySelector(".start");
const end = document.querySelector(".end");
const mute = document.querySelector(".mute");
const maxVolume = document.querySelector(".max-volume");
let songs = [];
let currentSongIndex = 0;
let currentPlaybackSpeed = 1;
const HanumanChalisa = "./assets/Hanuman Chalisa.mp3";
const bhaktambar = "./assets/bhaktambar.mp3";
const nakodaChalisa = "./assets/nakodachalisa.mp3";
const parshwanathchalisa = "./assets/parshwanathchalisa.mp3";
const shantinathmantra = "./assets/shantinathmantra.mp3";
const Logas = "./assets/Logos.mp3";
const GaneshMantra = "./assets/Vakratunda Mahakaya.mp3";
// audio thumbnails

const tracks = [
	{
		title: "Vakratunda Mahakaya",
		src: GaneshMantra,
		img: "https://images.news18.com/ibnkhabar/uploads/2022/12/lord-ganesh-idol-place-16704194753x2.jpg",
		id: 0,
	},
	{
		title: "Logassa Path",
		src: Logas,
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHLQSkis7B-OCEOOaKCrQEpPVe270w8pWmSw&usqp=CAU",
		id: 1,
	},
	{
		title: "Bhaktambar Stotra",
		src: bhaktambar,
		img: "https://play-lh.googleusercontent.com/G-HK0mrnEgV9dG5mFED8_suGBLvbyhV21_GARoO8KSColP6BA5bpcnhjtTHRMoNZxg",
		id: 2,
	},
	{
		title: "Hanuman Chalisa",
		src: HanumanChalisa,
		img: "https://www.tallengestore.com/cdn/shop/products/Shree_Hanuman_Chalisa_Poster_b576187a-d260-4c26-9b4d-78dcfbe4ceca.jpg?v=1569326945",
		id: 3,
	},
	{
		title: "Nakoda Chalisa",
		src: nakodaChalisa,
		img: "https://cdn.shopify.com/s/files/1/1328/9161/files/Bhairav_chalisa_hindi_large.jpg?v=1492632651",
		id: 4,
	},
	{
		title: "Parshwanath Chalisa",
		src: parshwanathchalisa,
		img: "https://cdn.newsnationtv.com/images/2022/04/27/parasnath-bhagwan-chalisa-81.jpg",
		id: 5,
	},
	{
		title: "Shantinath Mantra",
		src: shantinathmantra,
		img: "https://4.bp.blogspot.com/-kWZHwgM8qP0/W3wZvK7JbcI/AAAAAAAAAA0/qzQakGIxGzIdRuLcQS31R2bBrhENbgN8gCLcBGAs/s1600/Parola%2BShantinath....jpg",
		id: 6,
	},
];
songs.push(...tracks);
/* Load Songs from Local Storage */
loadSongs();

function loadSongs() {
	const storedSongs = localStorage.getItem("songs");
	if (storedSongs) {
		songs = JSON.parse(storedSongs);
		updatePlaylist();
	}
}
function removeSong(index) {
	// Find the index of the song to be removed
    const songIndex = songs.findIndex(song => song.id === index);

    // Remove the song from the songs array
    songs.splice(songIndex, 1);
	// songs = songs.filter((song) => song.id !== index);
	 // Update the playlist to reflect the change
	// Additional handling if the current song is deleted
	if (songIndex === currentSongIndex) {
	    if (songs.length > 0&& songIndex < songs.length) {
	        // Play the next song or the first if the last one was deleted
			audio.pause();
	        playBtn.classList.add('active');
	        playBtn.innerHTML = '<i class="fas fa-play"></i>';
	        playSong({target: {dataset: {index: currentSongIndex < songs.length ? currentSongIndex : 0}}});
	    } else {
	        // No more songs in the playlist
	        audio.src = '';
	        songTitle.textContent = 'No song playing';
	        // Handle UI changes for no songs
	    }
	} else if (songIndex < currentSongIndex) {
	    // Adjust the currentSongIndex if a song before the current song is deleted
	    currentSongIndex -= 1;
	}
	updatePlaylist();
}
function updatePlaylist() {
	playlist.innerHTML = "";
	songs.forEach((song, index) => {
		const li = document.createElement("li");
		const text = document.createTextNode(song.title);
		const deleteIcon = document.createElement("div");
		deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
		deleteIcon.classList.add("delete-icon");
		deleteIcon.dataset.index = song.id;
		li.appendChild(text);
		li.appendChild(deleteIcon);
		li.dataset.index = index;

		if (index === currentSongIndex) {
			li.classList.add("active");
		}
		li.addEventListener("click", playSong);
		deleteIcon.addEventListener("click", function (e) {
			e.stopPropagation(); // Prevent event bubbling to li
			const idx = parseInt(e.currentTarget.dataset.index, 10);
			removeSong(idx);
		});
		playlist.appendChild(li);
	});
}

/* Play Song */
function playSong(e) {
	const index = e ? parseInt(e.target.dataset.index,10) : currentSongIndex;
	currentSongIndex = index;
	const song = songs[currentSongIndex];
	audio.src = song.src;
	songTitle.textContent = song.title;
	// artistName.textContent = song.artist;

	audio.playbackRate = currentPlaybackSpeed; // Apply the stored playback speed
	audio.play();
	playBtn.classList.remove("active");
	playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	updatePlaylist();
}
speedControl.addEventListener("change", function () {
	console.log(this.value);
	audio.playbackRate = this.value;
	currentPlaybackSpeed = this.value; // Store the selected playback speed
});
setInterval(() => {
    start.innerHTML =
		Math.round(audio.currentTime / 60) +
		":" +
		`${Math.round(audio.currentTime % 60) < 10 ? "0" + Math.round(audio.currentTime % 60) : Math.round(audio.currentTime % 60)}`
	end.innerHTML =
		Math.round(audio.duration / 60) + ":" + Math.round(audio.duration % 60);
    if(start.innerHTML==end.innerHTML){
        nextBtn.click();
    }
},1000)
/* Pause/Play Song */
playBtn.addEventListener("click", () => {
	if (audio.paused) {
		audio.play();
		playBtn.classList.remove("active");
		playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	} else {
		audio.pause();
		playBtn.classList.add("active");
		playBtn.innerHTML = '<i class="fas fa-play"></i>';
	}
});

/* Previous Song */
prevBtn.addEventListener("click", () => {
	currentSongIndex--;
	if (currentSongIndex < 0) {
		currentSongIndex = songs.length - 1;
	}
	playSong();
});

/* Next Song */
nextBtn.addEventListener("click", () => {
	currentSongIndex++;
	if (currentSongIndex >= songs.length) {
		currentSongIndex = 0;
	}
	playSong();
});

/* Progress Bar */
audio.addEventListener("timeupdate", (e) => {
	const progressPercent = (audio.currentTime / audio.duration) * 100;
	progress.value = progressPercent?progressPercent/100:0;
    
});

/* Update Current Time on Progress Bar */
progress.addEventListener("click", (e) => {
	const clickedXPosition = e.offsetX;
	const progressWidth = progress.offsetWidth;
	const seekTime = (clickedXPosition / progressWidth) * audio.duration;
	audio.currentTime = seekTime;
    audio.play();
    playBtn.classList.remove("active");
	playBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

/* Volume Control */
volumeSlider.addEventListener("input", () => {
	audio.volume = volumeSlider.value;
});

mute.addEventListener("click", () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0
    } else {
        audio.volume = volumeSlider.value;
    }
});
maxVolume.addEventListener("click", () => {
    audio.volume = 1;
    volumeSlider.value = 1;
})
/* Add New Song */
addSongBtn.addEventListener("click", () => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "audio/mp3";
	input.onchange = handleFileUpload;
	input.click();
});

function handleFileUpload(event) {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.onload = function (e) {
		const songTitleInput = prompt("Enter song title:", "");
		if (songTitleInput) {
			songs.push({
				title: songTitleInput,
				src: window.URL.createObjectURL(file),
				id: songs.length,
			});
			console.log(window.URL.createObjectURL(file));
			localStorage.setItem("songs", JSON.stringify(songs));
			updatePlaylist();
		}
	};
	reader.readAsDataURL(file);
}

/* Play first song on load */
if (songs.length > 0) {
	playSong();
	audio.pause();
	playBtn.classList.add("active");
	playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
