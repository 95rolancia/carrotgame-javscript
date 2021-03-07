import * as sound from "./sound.js";
import Field from "./field.js";

// Builder Pattern
export default class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector(".game__button");
    this.gameBtnIcon = document.querySelector(".game__button > .fas");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn.addEventListener("click", (e) => {
      const target = e.target;
      if (target.nodeName === "I") {
        if (this.started) {
          this.stop();
        } else {
          this.start();
        }
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBgm();
  }

  stop() {
    this.started = false;
    this.hideGameBtn();
    this.stopGameTimer();
    // this.gameFinishBanner.show();
    sound.playLose();
    sound.stopBgm();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.hideGameBtn();
    // this.gameFinishBanner.show();
    this.stopGameTimer();
    sound.stopBgm();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    if (item === "carrot") {
      this.score++;
      this.updateGameScore();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  showStopBtn() {
    this.gameBtnIcon.classList.remove("fa-play");
    this.gameBtnIcon.classList.add("fa-stop");
    this.gameBtn.classList.remove("invisible");
  }

  hideGameBtn() {
    this.gameBtn.classList.add("invisible");
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(false);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.textContent = `${minutes}:${seconds}`;
  }

  updateGameScore() {
    this.gameScore.textContent = this.carrotCount - this.score;
  }

  initGame() {
    this.score = 0;
    this.gameScore.textContent = this.carrotCount;
    this.gameField.init();
  }
}
