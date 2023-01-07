import { Game } from '../models/Game.mjs'
import { TurnView } from '../views/TurnView.mjs'
import { BoardView } from '../views/BoardView.mjs'

export class GameView {
    #game
    #boardView
    #turnView
    #console

    constructor(console){
        this.#game = new Game();
        this.#boardView = new BoardView(this.#game.getBoard(),console);
        this.#turnView = new TurnView(this.#game.getTurn(),console);
        this.#console = console;
    }
    
    writeFinish() {
        if(this.#game.isWinner()){
            this.#console.writeln(`Victoria para ${this.#game.getWinnerToken()}`);
        } else {
            this.#console.writeln(`¡Empate!`);
        }
    }

    play() {
        let finished;
        this.#console.writeln(`--------- Connecta 4 --------`);  
        do {
            this.#boardView.writeTokens();
            this.#turnView.playTurn();
            finished = this.#game.isFinished();
            if (!finished) {
                this.#game.nextTurn();
            }
        } while (!finished);
        this.#boardView.writeTokens();
        this.writeFinish();
    }
}