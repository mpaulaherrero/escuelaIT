import { CombinationView } from './CombinationView.mjs'

export class BoardView {
    #board
    #console

    constructor(board,console) {
        this.#board = board;
        this.#console = console;
        console.writeln(`The secret combination is ${this.#board.getSecretCombination().getValue()}`);
    }    

    writeAttempts(){
        this.#console.writeln(`\n${this.#board.getProposedCombinationsLength()} attempt(s):\n****`);
        for (let i = 0; i < this.#board.getProposedCombinationsLength(); i++) {
            this.#console.writeln(this.#writeLine(i));
        }
    }

    #writeLine(position){
        return `${this.#board.getProposedCombination(position).getValue()}  --> ${this.#board.getResult(position).getBlacks()} blacks and ${this.#board.getResult(position).getWhites()} whites`;
    }

    readProposedCombination(){
        this.#board.setLastProposedCombination(new CombinationView(this.#console).readValue());
        this.#board.checkBlacksAndWhites();
    }

    readSecretCombination(){
        this.#board.setSecretCombination(new CombinationView(this.#console).readValue());
    }

}