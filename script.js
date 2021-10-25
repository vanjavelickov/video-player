const videoPlayer = document.querySelector('.container');
const video = videoPlayer.querySelector('.video');
const playButton = videoPlayer.querySelector('.playButton');
const volume = videoPlayer.querySelector('.volume');
const currentTimeElement = videoPlayer.querySelector('.current');
const durationTimeElement = videoPlayer.querySelector('.duration');
const progress = videoPlayer.querySelector('.videoProgress');
const progressBar = videoPlayer.querySelector('.videoProgressFilled');
const mute = videoPlayer.querySelector('.mute');
const fullScreen = videoPlayer.querySelector('.fullScreen');
const speed = videoPlayer.querySelector('#speed');

playButton.addEventListener('click', (event) => {
  if(video.paused){
    video.play();
    event.target.textContent = `pause`;
  } else {
    video.pause();
    event.target.textContent = `play_arrow`;
  }
});

volume.addEventListener('mousemove', (event) => {
  video.volume = event.target.value;
});

video.addEventListener('timeupdate', currentTime);

video.addEventListener('timeupdate', () => {
  const percentage = (video.currentTime /  video.duration) * 100;
  progressBar.style.width = `${percentage}%`;
});

function currentTime () {
  let currentMinutes = Math.floor(video.currentTime / 60);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(video.duration / 60);
  let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

  currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
};

progress.addEventListener('click', (event) => {
  const progressTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = progressTime;
});

mute.addEventListener('click', () => {
  video.muted = !video.muted;
  mute.classList.toggle('muted');
});

fullScreen.addEventListener('click', () => {
  videoPlayer.requestFullscreen();
});

speed.addEventListener('change', changeSpeed);

function changeSpeed(event) {
  video.playbackRate = event.target.value;
}