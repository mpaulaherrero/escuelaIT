import { Game } from '../../models/Game.mjs'
import { BoardView } from './BoardView.mjs'
import { PlayerView } from './PlayerView.mjs'

export class GameView {
    #game
    #boardView

    constructor(numPlayers){
        this.#game = new Game(numPlayers);
        this.#boardView = new BoardView(this.#game.getBoard());
    }
    
    #writeFinish() {
        if(this.#game.isWinner()){
            document.getElementById('dialog').innerHTML=`Victoria para ${this.#game.getWinnerToken().getCode()}`;
        } else {
            document.getElementById('dialog').innerHTML=`¡Empate!`;
        }
        this.#boardView.displayWinnerLine();
    }

    play() {
        new PlayerView(this.#game.getTurn().getActivePlayer(), this.#boardView, this.isFinished.bind(this)).playTurn();
    }

    isFinished(){
        this.#boardView.writeTokens();
        const finished = this.#game.isFinished();
        if (!finished) {
             this.#game.nextTurn();
             this.play();
        } else {
            this.#writeFinish();
        }
    }
}