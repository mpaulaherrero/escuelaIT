import { Game } from '../models/Game.mjs'
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
        const STATES_MESSAGE = ["You've lost!!! :-(", "You've won!!! ;-)","You're playing"];
        this.#console.writeln(STATES_MESSAGE[this.#game.getState()]);
    }

    play(){
        this.#console.writeln(`----- MASTERMIND -----`);
        do {
            this.#boardView.writeAttempts();
            this.#boardView.readProposedCombination();
        } while (!this.#game.checkEnd());
        this.#boardView.writeAttempts();
        this.writeFinish();
    }
}