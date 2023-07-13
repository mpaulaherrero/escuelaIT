import { Game } from '../../models/Game.mjs'
import { BoardView } from './BoardView.mjs'
import { PlayerView } from './PlayerView.mjs'
import { DialogView } from './DialogView.mjs'

export class GameView {
    #game
    #boardView

    constructor(numPlayers){
        this.#game = new Game(numPlayers);
        this.#boardView = new BoardView(this.#game.getBoard());
        DialogView.writeIfNotWelcome('');
    }
    
    #writeFinish() {
        if(this.#game.isWinner()){
            const winnerTable = document.getElementsByClassName('turn_active')[0];
            winnerTable.id="winnerDisplay";
            winnerTable.style.width="24px";
            winnerTable.style.display="inline-block";
            winnerTable.style.marginLeft="5px";
            DialogView.writeWinner(winnerTable);
            document.getElementById('turn').innerHTML="";
            this.#boardView.displayWinnerLine();
        } else {
            DialogView.writeTie();
            document.getElementById('turn').innerHTML="";
        }
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