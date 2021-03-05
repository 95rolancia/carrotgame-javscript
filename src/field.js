"use strict";
import * as sound from "./sound.js";
export default class Field {
  constructor(carrotCount, bugCount, itemSize) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.itemSize = itemSize;
    this.gameField = document.querySelector(".game__field");
    this.gameFieldRect = this.gameField.getBoundingClientRect();
    this.gameFieldWidth = this.gameFieldRect.width;
    this.gameFieldHeight = this.gameFieldRect.height;
    this.gameField.addEventListener("click", this.onClick);
  }

  init() {
    this.gameField.innerHTML = "";
    this._createItem("carrot", this.carrotCount, "img/carrot.png");
    this._createItem("bug", this.bugCount, "img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _createItem(item, number, imgPath) {
    for (let i = 0; i < number; i++) {
      let target = document.createElement("img");
      target.setAttribute("class", item);
      target.setAttribute("src", imgPath);
      target.style.position = "absolute";
      target.style.left = `${randomNumber(
        0,
        this.gameFieldWidth - this.itemSize
      )}px`;
      target.style.top = `${randomNumber(
        0,
        this.gameFieldHeight - this.itemSize
      )}px`;
      this.gameField.appendChild(target);
    }
  }

  onClick(e) {
    const target = e.target;
    if (target.nodeName !== "IMG") {
      return;
    }

    if (target.classList.contains("carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.classList.contains("bug")) {
      sound.playBug();
      this.onItemClick && this.onItemClick("bug");
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
