const carrotSound = new Audio("../sound/carrot_pull.mp3");
const bugSound = new Audio("../sound/bug_pull.mp3");
const bgmSound = new Audio("../sound/bg.mp3");
const winSound = new Audio("../sound/game_win.mp3");
const loseSound = new Audio("../sound/alert.wav");

export function playCarrot() {
  playSound(carrotSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playWin() {
  playSound(winSound);
}

export function playLose() {
  playSound(loseSound);
}

export function playBgm() {
  playSound(bgmSound);
}

export function stopBgm() {
  stopSound(bgmSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
