import {Game} from "../JS/game";

const game = new Game();
game.showWitcher();
game.showCoin();
game.startGame();
document.addEventListener("keydown", (event) => game.turnWitcher(event));
document.querySelector('#result button').addEventListener("click",() => game.startAgain());
