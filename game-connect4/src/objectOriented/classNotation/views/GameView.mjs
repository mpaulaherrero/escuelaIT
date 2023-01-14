import { Game } from '../models/Game.mjs'
import { PlayerView } from './PlayerView.mjs'
import { BoardView } from './BoardView.mjs'

export class GameView {
    #game
    #boardView
    #console

    constructor(numPlayers, console){
        this.#game = new Game(numPlayers);
        this.#boardView = new BoardView(this.#game.getBoard(),console);
        this.#console = console;
    }
    
    writeFinish() {
        if(this.#game.isWinner()){
            this.#console.writeln(`Victoria para ${this.#game.getWinnerToken().getCode()}`);
        } else {
            this.#console.writeln(`¡Empate!`);
        }
    }

    play() {
        let finished;
        this.#console.writeln(`--------- Connecta 4 --------`);  
        do {
            this.#boardView.writeTokens();
            new PlayerView(this.#game.getTurn().getActivePlayer(),this.#console).playTurn();
            finished = this.#game.isFinished();
            if (!finished) {
                this.#game.nextTurn();
            }
        } while (!finished);
        this.#boardView.writeTokens();
        this.writeFinish();
    }
}