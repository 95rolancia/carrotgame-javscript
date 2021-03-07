"use strict";
import Popup from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();
const gameFinishBanner = new Popup();

game.setGameStopListener((reason) => {
  sound.stopBgm();
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay?";
      sound.playLose();
      break;
    case Reason.win:
      message = "YOU WON!";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST!";
      sound.playLose();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.show();
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
