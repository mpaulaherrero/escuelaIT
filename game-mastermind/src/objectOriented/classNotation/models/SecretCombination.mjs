import { Combination } from './Combination.mjs'

export class SecretCombination {
    #combination

    constructor(){
        this.#combination = new Combination();
    }

    #generate(){
        for (let i = 0; i < this.#combination.getLength(); i++) {
            let uniqueColor;
             do {
                let randomColor = this.#combination.getRandomColor();
                let originalValue = this.#combination.getValue();
                this.#combination.setValue(originalValue + randomColor);
                uniqueColor = this.#combination.validateUniqueColors();
                if (!uniqueColor) {
                    this.#combination.setValue(originalValue);
                }
            } while (!uniqueColor);
        }
    }

    create(){
        this.#generate();
        return this.#combination
    }
}