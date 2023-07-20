import { CombinationView } from './CombinationView.mjs'

export class BoardView {
    #board
    #console

    constructor(board,console) {
        this.#board = board;
        this.#console = console;
     }

    setSecretCombination(){
        this.#board.getSecretCombination().accept(this);
    }

    visitRandomSecretCombination(){
        this.#board.getSecretCombination().setCombination();
        //this.#console.writeln(`The random secret combination is ${this.#board.getSecretCombination().getValue()}`);
    }

    visitUserSecretCombination(){
        new CombinationView(this.#console,this.#board.getSecretCombination(),`Propose a secret combination`).readValue();
        //this.#console.writeln(`The user secret combination is ${this.#board.getSecretCombination().getValue()}`);

    }

    getProposedCombination(){
        this.#board.newLastProposedCombination();
        this.#board.getLastProposedCombination().accept(this);
    }

    visitMinimaxSecretCombination(){
        this.#board.getLastProposedCombination().setCombination();
        this.#board.getLastProposedCombination().setResult(this.#board.getBlacksAndWhites());
    }

    visitUserProposedCombination(){
        new CombinationView(this.#console,this.#board.getLastProposedCombination()).readValue();
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
}