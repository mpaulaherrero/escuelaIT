import { ProposedCombination } from '../models/ProposedCombination.mjs'

export class ProposedCombinationView {
    #proposedCombination
    #console

    constructor(console){
        this.#proposedCombination = new ProposedCombination();
        this.#console = console;
    }

    readValue(){
        let correctProposedCombination;
        do {
            this.#proposedCombination.setValue(this.#console.readString(`Propose a combination: `));
            const errors = this.#proposedCombination.checkErrors();
            correctProposedCombination = errors.length === 0;
            if (!correctProposedCombination) {
                for (let i = 0; i < errors.length; i++) {
                    this.#console.writeln(errors[i]);
                }
            }
        } while (!correctProposedCombination);
        return this.#proposedCombination;
    }
}