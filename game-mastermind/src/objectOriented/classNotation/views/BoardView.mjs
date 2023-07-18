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
        this.#console.writeln(`The random secret combination is ${this.#board.getSecretCombination().getValue()}`);
    }

    visitUserSecretCombination(){
        this.#board.getSecretCombination().setCombination(new CombinationView(this.#console,`Propose a secret combination`).readValue());
        //this.#console.writeln(`The user secret combination is ${this.#board.getSecretCombination().getValue()}`);

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

}