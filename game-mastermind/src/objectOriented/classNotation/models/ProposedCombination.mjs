import { Combination } from './Combination.mjs'
import { Result } from './Result.mjs'

export class ProposedCombination{
    #combination
    #result

    constructor(){
        this.#combination = new Combination();
        this.#result = new Result();
    }

    setValue(value){
        this.#combination.setValue(value);
    }

    checkErrors(){
        let errors = [];
        if (this.#combination.validateLength()) {
            errors[errors.length] = `Wrong proposed combination length`;
        }
        if (!this.#combination.validateColors()) {
            errors[errors.length] = `Wrong colors, they must be: ${this.#combination.colorsToString()}`;
        }
        if (!this.#combination.validateUniqueColors()) {
            errors[errors.length] = `Wrong proposed combination, at least one color is repeated`;
        }
        return errors;
    }

    compare(secretCombination){
        for (let i = 0; i < this.#combination.getLength(); i++) {
            if (secretCombination.getValue()[i] === this.#combination.getValue()[i]) {
                this.#result.addBlacks();
            } else {
                if (secretCombination.hasColor(this.#combination.getValue()[i])) {
                    this.#result.addWhites();
                }
            }
        }
        this.#result.setWinner(this.#combination.getLength());
    }

    isWinner(){
        return this.#result.isWinner();
    }

    toString(){
        return `${this.#combination.getValue()}  --> ${this.#result.getBlacks()} blacks and ${this.#result.getWhites()} whites`;
    }
}