import { Game } from '../models/Game.mjs'
import { BoardView } from './BoardView.mjs'

export class GameView {

    #game
    #boardView
    #console

    constructor(numPlayers, console){
        this.#game = new Game(numPlayers);
        this.#boardView = new BoardView(this.#game,console);
        this.#console = console;
        //console.writeln(`The secret combination is ${this.#game.getSecretCombination().getValue()}`);
    }

    writeFinish() {
        const STATES_MESSAGE = ["You've lost!!! :-(", "You've won!!! ;-)","You're playing"];
        this.#console.writeln(STATES_MESSAGE[this.#game.getState()]);
        // if(this.#game.isWinner()){
        //     this.#console.writeln(`Victoria para ${this.#game.getWinnerToken().getCode()}`);
        // } else {
        //     this.#console.writeln(`¡Empate!`);
        // }
    }

    play(){
        this.#console.writeln(`----- MASTERMIND -----`);
        do {
            this.#boardView.showResults();
            this.#boardView.readProposedCombination();
            this.#game.compareSecretCombination();
        } while (!this.#game.checkEnd());
        this.#boardView.showResults();
        this.writeFinish();
    }
}