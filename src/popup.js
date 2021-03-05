"use strict";
export default class Popup {
  constructor() {
    this.popup = document.querySelector(".pop-up");
    this.popupText = document.querySelector(".pop-up__message");
    this.popupRefresh = document.querySelector(".pop-up__refresh");
    this.popupRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  show() {
    this.popup.classList.remove("pop-up--hide");
  }
  hide() {
    this.popup.classList.add("pop-up--hide");
  }
}
