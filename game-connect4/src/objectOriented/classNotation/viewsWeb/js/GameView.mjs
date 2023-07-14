import { Game } from '../../models/Game.mjs'
import { BoardView } from './BoardView.mjs'
import { PlayerView } from './PlayerView.mjs'
import { DialogView } from './DialogView.mjs'

export class GameView {
    #game
    #activePlayer
    #boardView

    constructor(numPlayers){
        this.#game = new Game(numPlayers);
        this.#boardView = new BoardView(this.#game.getBoard());
        DialogView.writeIfNotWelcome('');
    }
    
    #writeFinish() {
        if(this.#game.isWinner()){
            DialogView.writeWinner();
            this.#activePlayer.setWinner();
            this.#boardView.displayWinnerLine();
        } else {
            DialogView.writeTie();
            this.#activePlayer.setTie();
        }
    }

    play() {
        this.#activePlayer = new PlayerView(this.#game.getTurn().getActivePlayer(), this.#boardView, this.isFinished.bind(this));
        this.#activePlayer.playTurn();
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