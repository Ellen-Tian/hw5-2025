// js/video.js

let video;

window.addEventListener("load", function () {
	console.log("Good job opening the window");

	video = document.querySelector("#player1");

	const btnPlay = document.querySelector("#play");
	const btnPause = document.querySelector("#pause");
	const btnSlower = document.querySelector("#slower");
	const btnFaster = document.querySelector("#faster");
	const btnSkip = document.querySelector("#skip");
	const btnMute = document.querySelector("#mute");
	const slider = document.querySelector("#slider");
	const volumeLabel = document.querySelector("#volume");
	const btnVintage = document.querySelector("#vintage");
	const btnOrig = document.querySelector("#orig");

	// turn off autoplay and looping on load
	video.autoplay = false;
	video.loop = false;

	// set initial volume
	video.volume = (parseInt(slider.value, 10) || 100) / 100;
	updateVolumeLabel();

	function updateVolumeLabel() {
		volumeLabel.textContent = Math.round(video.volume * 100) + "%";
	}

	// play the video
	btnPlay.addEventListener("click", function () {
		console.log("Play Video");
		video.play();
		updateVolumeLabel();
	});

	// pause the video
	btnPause.addEventListener("click", function () {
		console.log("Pause Video");
		video.pause();
	});

	// slow down by 10% each click
	btnSlower.addEventListener("click", function () {
		video.playbackRate *= 0.9;
		console.log("Speed is now " + video.playbackRate);
	});

	// speed up proportionally
	btnFaster.addEventListener("click", function () {
		video.playbackRate /= 0.9;
		console.log("Speed is now " + video.playbackRate);
	});

	// skip ahead 10s, restart if beyond duration
	btnSkip.addEventListener("click", function () {
		if (isFinite(video.duration)) {
			let newTime = video.currentTime + 10;
			if (newTime >= video.duration) {
				video.currentTime = 0;
			} else {
				video.currentTime = newTime;
			}
		} else {
			video.currentTime = 0;
		}
		console.log("Current time: " + video.currentTime);
	});

	// toggle mute/unmute and update button text
	btnMute.addEventListener("click", function () {
		video.muted = !video.muted;
		this.textContent = video.muted ? "Unmute" : "Mute";
		updateVolumeLabel();
	});

	// change volume with the slider
	slider.addEventListener("input", function () {
		const val = parseInt(this.value, 10);
		video.volume = (isNaN(val) ? 100 : val) / 100;
		updateVolumeLabel();
	});

	// add oldSchool style
	btnVintage.addEventListener("click", function () {
		video.classList.add("oldSchool");
	});

	// remove oldSchool style
	btnOrig.addEventListener("click", function () {
		video.classList.remove("oldSchool");
	});
});
