"use strict";
import Popup from "./popup.js";
import GameBuilder from "./game.js";

const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();
const gameFinishBanner = new Popup();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay?";
      break;
    case "win":
      message = "YOU WON!";
      break;
    case "lose":
      message = "YOU LOST!";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.show();
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
