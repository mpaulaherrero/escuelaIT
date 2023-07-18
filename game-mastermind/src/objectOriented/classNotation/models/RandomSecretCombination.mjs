import { SecretCombination } from './SecretCombination.mjs'

export class RandomSecretCombination extends SecretCombination {

    constructor(){
        super();
    }

    accept(visitor){
        visitor.visitRandomSecretCombination();
    }

    setCombination(){
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