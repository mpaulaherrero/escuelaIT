import { ProposedCombinationView } from './ProposedCombinationView.mjs'

export class BoardView {
    #board
    #console

    constructor(board,console) {
        this.#board = board;
        this.#console = console;
    }    

    showResults(){
        this.#console.writeln(`\n${this.#board.getProposedCombinationsLength()} attempt(s):\n****`);
        for (let i = 0; i < this.#board.getProposedCombinationsLength(); i++) {
            this.#console.writeln(this.#board.proposedCombinationToString(i));
        }
    }

    readProposedCombination(){
        this.#board.setLastProposedCombination(new ProposedCombinationView(this.#console).readValue());
    }

}