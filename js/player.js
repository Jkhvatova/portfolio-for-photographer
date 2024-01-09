// Variables
const videoPlayer = document.querySelector(".video__player");
const videoPoster = document.querySelector(".video__poster");
const video = document.querySelector("video");
const playButton = document.querySelector(".video__button");
const toggleButton = document.querySelector(".player-control");
const videoRange = document.querySelector(".video-range");
const volumeButton = document.querySelector(".volume-control");
const volume = document.querySelector(".volume-range");
const skipButtons = document.querySelectorAll("[data-skip]");
const fullScreenButton = document.querySelector(".fullscreen-control");
// Play/pause buttons

function playPause() {
  if (video.paused) {
    video.play();
    playButton.classList.add("hide");
    videoPoster.classList.add("hide");
    showPauseButton();
  } else {
    video.pause();
    playButton.classList.remove("hide");
    showPlayButton();
  }
}
function showPlayButton() {
  const background = "url(./assets/svg/play.svg) no-repeat center center";
  toggleButton.style.background = background;
}
function showPauseButton() {
  const background = "url(./assets/svg/pause.svg) no-repeat center center";
  toggleButton.style.background = background;
}
videoPoster.addEventListener("click", playPause);
video.addEventListener("click", playPause);
playButton.addEventListener("click", playPause);
toggleButton.addEventListener("click", playPause);

// Play range
videoRange.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #b3b3b3 ${value}%, #b3b3b3 100%)`;
});

videoRange.addEventListener("change", handleRangeUpdate);
video.addEventListener("timeupdate", handleVideoProgress);

// Volume range
volume.addEventListener("input", function () {
  const value = this.value * 100;
  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #b3b3b3 ${value}%, #b3b3b3 100%)`;
});

volume.addEventListener("change", handleRangeUpdate);

// Range handler

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleVideoProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  videoRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #b3b3b3 ${percent}%, #b3b3b3 100%)`;
  videoRange.value = percent;
}

function updateCurrentPosition(e) {
  var timeProgress = Math.floor(
    (e.offsetX / videoRange.offsetWidth) * video.duration,
  );
  videoRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${timeProgress}%, #b3b3b3 ${timeProgress}%, #b3b3b3 100%)`;
  video.currentTime = timeProgress;
}

let mousedown = false;
videoRange.addEventListener("click", updateCurrentPosition);
videoRange.addEventListener(
  "mousemove",
  (e) => mousedown && updateCurrentPosition(e),
);
videoRange.addEventListener("mousedown", () => (mousedown = true));
videoRange.addEventListener("mouseup", () => (mousedown = false));

// Volume button
function updateVolumeButton() {
  const buttonBackground =
    video.muted || video.volume === 0
      ? "url(./assets/svg/mute.svg) no-repeat center center"
      : "url(./assets/svg/volume.svg) no-repeat center center";
  const value = volume.value * 100;
  const rangeBackground =
    video.muted || video.volume === 0
      ? `linear-gradient(to right, #bdae82 0%, #bdae82 0%, #b3b3b3 0%, #b3b3b3 100%)`
      : `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #b3b3b3 ${value}%, #b3b3b3 100%)`;
  volumeButton.style.background = buttonBackground;
  volume.style.background = rangeBackground;
}
video.addEventListener("volumechange", updateVolumeButton);
volumeButton.addEventListener("click", toggleMute);
volume.addEventListener("input", changeVolume);

function changeVolume() {
  if (video.muted) {
    video.muted = false;
  }
  video.volume = volume.value;
  updateVolumeButton();
}

function toggleMute() {
  video.muted = !video.muted;
  if (video.muted) {
    volume.setAttribute("data-volume", volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

// Skip buttons
function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach((button) => button.addEventListener("click", skipVideo));

// Full Screen
fullScreenButton.addEventListener("click", viewFullScreen);

function viewFullScreen() {
  if (video.webkitSupportsFullscreen) {
    video.webkitEnterFullScreen();
  }
}
