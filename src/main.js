"use strict";
import Popup from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const ITEM_SIZE = 100;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameBtnIcon = document.querySelector(".game__button > .fas");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new Popup();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT, ITEM_SIZE);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }

  if (item === "carrot") {
    score++;
    updateGameScore();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  }
}

gameBtn.addEventListener("click", (e) => {
  const target = e.target;
  if (target.nodeName === "I") {
    if (started) {
      stopGame();
    } else {
      startGame();
    }
  }
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  sound.playBgm();
}

function stopGame() {
  started = false;
  hideGameBtn();
  stopGameTimer();
  gameFinishBanner.show();
  sound.playLose();
  sound.stopBgm();
}

function finishGame(win) {
  started = false;
  hideGameBtn();
  gameFinishBanner.show();
  stopGameTimer();
  sound.stopBgm();
}

function showStopBtn() {
  gameBtnIcon.classList.remove("fa-play");
  gameBtnIcon.classList.add("fa-stop");
  gameBtn.classList.remove("invisible");
}

function hideGameBtn() {
  gameBtn.classList.add("invisible");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minutes}:${seconds}`;
}

function updateGameScore() {
  gameScore.textContent = CARROT_COUNT - score;
}

function initGame() {
  score = 0;
  gameScore.textContent = CARROT_COUNT;
  gameField.init();
}
