let oscillator;
let isPlaying = false;
let gainNode;
let fadeOutInterval;
let audioContext; // Move audioContext variable to a higher scope

function fadeIn() {
  const fadeDuration = 0.5; // 0.5 seconds fade duration
  const currentTime = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, currentTime);
  gainNode.gain.linearRampToValueAtTime(1, currentTime + fadeDuration);
}

function fadeOut() {
  const fadeDuration = 0.5; // 0.5 seconds fade duration
  const currentTime = audioContext.currentTime;
  gainNode.gain.setValueAtTime(1, currentTime);
  gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeDuration);
  oscillator.stop(currentTime + fadeDuration);
}

function togglePlay() {
  const frequency = parseFloat(document.getElementById('frequency').value);

  if (isPlaying) {
    clearInterval(fadeOutInterval);
    fadeOut();
    isPlaying = false;
    document.getElementById('playBtn').classList.remove('playing');
    document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
    document.getElementById('toneText').classList.remove('vibrate'); // Remove vibrate class
  } else {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    oscillator.type = 'sine'; // You can experiment with other oscillator types (sine, square, triangle, sawtooth)
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    fadeIn();
    oscillator.start();

    isPlaying = true;
    document.getElementById('playBtn').classList.add('playing');
    document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
    document.getElementById('toneText').classList.add('vibrate'); // Add vibrate class
  }
}


// Event listener for the play/stop button
document.getElementById('playBtn').addEventListener('click', togglePlay);
