const ITEM_SIZE = 80;
const gameField = document.querySelector(".game__field");
const gameFieldRect = gameField.getBoundingClientRect();
const gameFieldWidth = gameFieldRect.width;
const gameFieldHeight = gameFieldRect.height;
console.log(gameFieldWidth, gameFieldHeight);

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

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function initGame() {
  createItem("carrot", 5, "img/carrot.png");
  createItem("bug", 5, "img/bug.png");
}

initGame();
