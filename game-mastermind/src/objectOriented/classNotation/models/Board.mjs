import { Result } from './Result.mjs'

export class Board {

    MAX_ATTEMPTS = 10;

    #proposedCombinations
    #secretCombination
    #results

    constructor(secretCombination){
        this.#secretCombination = secretCombination;
        this.#proposedCombinations = [];
        this.#results = [];
    }

    getSecretCombination(){
        return this.#secretCombination;
    }

    setLastProposedCombination(proposedCombination){
        this.#proposedCombinations[this.#proposedCombinations.length] = proposedCombination;
    }

    getLastProposedCombination(){
        return this.#proposedCombinations[this.getProposedCombinationsLength()-1];
    }

    getProposedCombination(position){
        return this.#proposedCombinations[position];
    }

    getProposedCombinationsLength(){
        return this.#proposedCombinations.length;
    }

    getResult(position){
        return this.#results[position];
    }

    checkBlacksAndWhites(){
        const result = new Result();
        for (let i = 0; i < this.#secretCombination.getLength(); i++) {
            if (this.#secretCombination.getValue()[i] === this.getLastProposedCombination().getValue()[i]) {
                result.addBlacks();
            } else {
                if (this.#secretCombination.hasColor(this.getLastProposedCombination().getValue()[i])) {
                    result.addWhites();
                }
            }
        }
        result.setWinner(this.#secretCombination.getLength());
        this.#results[this.#results.length] = result;

    }

    isLastProposedCombinationAWinner(){
        return this.#results[this.#results.length-1].isWinner();
    }

    isComplete(){
        return this.getProposedCombinationsLength() === this.MAX_ATTEMPTS;
    }
}