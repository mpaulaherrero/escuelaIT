import { Combination } from './Combination.mjs'

export class SecretCombination extends Combination {

    constructor(){
        super();
        this.#create();
    }

    #create(){
        for (let i = 0; i < this.getLength(); i++) {
            let uniqueColor;
             do {
                let randomColor = this.getRandomColor();
                let originalValue = this.getValue();
                this.setValue(originalValue + randomColor);
                uniqueColor = this.validateUniqueColors();
                if (!uniqueColor) {
                    this.setValue(originalValue);
                }
            } while (!uniqueColor);
        }
    }
}