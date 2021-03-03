const ITEM_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameField = document.querySelector(".game__field");
const gameFieldRect = gameField.getBoundingClientRect();
const gameFieldWidth = gameFieldRect.width;
const gameFieldHeight = gameFieldRect.height;

const gameBtn = document.querySelector(".game__button");
const gameBtnIcon = document.querySelector(".game__button > .fas");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const popup = document.querySelector(".pop-up");
const popupText = document.querySelector(".pop-up__message");
const popupRefresh = document.querySelector(".pop-up__refresh");

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener("click", (e) => {
  const target = e.target;
  console.log(started);
  if (target.nodeName === "I") {
    if (started) {
      stopGame();
    } else {
      startGame();
    }
  }
});

popupRefresh.addEventListener("click", () => {
  startGame();
  showGameBtn();
  hidePopUp();
});

function createItem(item, number, imgPath) {
  for (let i = 0; i < number; i++) {
    let target = document.createElement("img");
    target.setAttribute("class", item);
    target.setAttribute("src", imgPath);
    target.style.position = "absolute";
    target.style.left = `${randomNumber(0, gameFieldWidth - ITEM_SIZE)}px`;
    target.style.top = `${randomNumber(0, gameFieldHeight - ITEM_SIZE)}px`;
    gameField.appendChild(target);
  }
}

function startGame() {
  started = !started;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = !started;
  hideGameBtn();
  stopGameTimer();
  showPopUp();
}

function showStopBtn() {
  gameBtnIcon.classList.remove("fa-play");
  gameBtnIcon.classList.add("fa-stop");
}

function showGameBtn() {
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

function showPopUp() {
  popup.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popup.classList.add("pop-up--hide");
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function initGame() {
  gameField.innerHTML = "";
  gameScore.textContent = CARROT_COUNT;
  createItem("carrot", CARROT_COUNT, "img/carrot.png");
  createItem("bug", BUG_COUNT, "img/bug.png");
}
