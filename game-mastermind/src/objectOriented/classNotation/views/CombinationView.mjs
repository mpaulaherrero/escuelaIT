import { Combination } from '../models/Combination.mjs'
import { Color } from '../types/Color.mjs'

export class CombinationView {
    #message
    #combination
    #console

    constructor(console, combination, message=`Propose a combination`){
        this.#message = message;
        this.#combination = combination;
        this.#console = console;
    }

    readValue(){
        let correctCombination;
        do {
            this.#combination.setValue(this.#console.readString(`${this.#message} (valid colors: ${Color.colorsCodeToString()}): `));
            const errors = this.checkErrors();
            correctCombination = errors.length === 0;
            if (!correctCombination) {
                for (let i = 0; i < errors.length; i++) {
                    this.#console.writeln(errors[i]);
                }
            }
        } while (!correctCombination);
        return this.#combination;
    }

    checkErrors(){
        let errors = [];
        if (this.#combination.validateLength()) {
            errors[errors.length] = `Wrong proposed combination length`;
        }
        if (!this.#combination.validateColors()) {
            errors[errors.length] = `Wrong colors, they must be: ${Color.colorsCodeToString()}`;
        }
        if (!this.#combination.validateUniqueColors()) {
            errors[errors.length] = `Wrong proposed combination, at least one color is repeated`;
        }
        return errors;
    }
}