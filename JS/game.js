import {Witcher} from "./witcher";
import {Coin} from "./coin";

class Game {
    constructor() {
        this.board = document.querySelectorAll('#board div');
        this.witcher = new Witcher();
        this.coin = new Coin();
        this.score = 0;
        this.time = 0;
        this.timeSpan = document.querySelector('#timeSpan');
    }
    index(x,y){
        return x + (y * 10);
    }
    showWitcher(){
        this.board[this.index(this.witcher.x, this.witcher.y)].classList.add("witcher");
    }
    showCoin(){
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    }
    countTime(){
        this.time++;
        this.timeSpan.innerHTML = (this.time / 100).toFixed(1);
    }
    moveWitcher(direction){
        this.hideWitcher();

        if (direction === "right"){
            this.witcher.x += 1;
        } else if (direction === "left"){
            this.witcher.x -= 1;
        } else if (direction === "up"){
            this.witcher.y -= 1;
        } else {
            this.witcher.y += 1;
        }
        if (this.witcher.x < 0 || this.witcher.x > 9 || this.witcher.y < 0 || this.witcher.y > 9) {
            this.gameOver();
            return;
        }
        this.getCoin();
        this.showWitcher();
    }
    startGame(){
        this.intervalId = setInterval(() => this.moveWitcher(this.witcher.direction), 250);
        this.timeInterval = setInterval(() => this.countTime(), 10);
    }
    hideWitcher(){
        document.querySelector('.witcher').classList.remove("witcher");
    }
    turnWitcher(event){
        switch (event.which) {
            case 37:
                this.witcher.direction = "left";
                break;
            case 38:
                this.witcher.direction = "up";
                break;
            case 39:
                this.witcher.direction = "right";
                break;
            case 40:
                this.witcher.direction = "down";
                break;
        }
    }
    getCoin(){
        if ((this.witcher.x == this.coin.x) && (this.witcher.y == this.coin.y)){
            document.querySelector('div.coin').classList.remove("coin");
            this.score++;
            document.querySelector('#scoreSpan').innerHTML = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }
    gameOver(){
        clearInterval(this.timeInterval);
        clearInterval(this.intervalId);
        document.querySelector('#result').style.display = "block";
        document.querySelector('#result span').innerHTML = this.score;
        document.querySelector('#result span:nth-of-type(2)').innerHTML = (this.time / 100).toFixed(1);

    }
    startAgain(){
        this.witcher.x = 0;
        this.witcher.y = 0;
        this.witcher.direction = "right";
        this.time = 0;
        this.showCoin();
        this.showWitcher();
        this.startGame();
        this.score = 0;
        document.querySelector('#result').style.display = "none";
        document.querySelector('#scoreSpan').innerHTML = this.score;
    }
}

export {Game};