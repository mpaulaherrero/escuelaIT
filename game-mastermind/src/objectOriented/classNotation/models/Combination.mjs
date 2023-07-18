import { Colors } from './Colors.mjs'

export class Combination {
    COMBINATION_LENGTH = 4;

    #value
    #colors

    constructor(){
        this.#value = "";
        this.#colors = new Colors();
    }

    getLength(){
        return this.COMBINATION_LENGTH;
    }

    setValue(value){
        this.#value=value;
    }

    getValue(){
        return this.#value;
    }

    validateLength(){
        return this.COMBINATION_LENGTH !== this.#value.length;
    }

    validateColors() {
        let validColor = true;
        for (let i = 0; validColor && i < this.#value.length; i++) {
          validColor = this.#colors.validColor(this.#value[i]);
        }
        return validColor;
    }

    validateUniqueColors() {
        let uniqueColor = true;
        for (let i = 0; uniqueColor && i < this.#value.length; i++) {
          for (let j = i + 1; uniqueColor && j < this.#value.length; j++) {
            uniqueColor = this.#value[j] !== this.#value[i];
          }
        }
        return uniqueColor;
    }

    hasColor(color){
        for (let i = 0; i < this.#value.length; i++) {
            if (this.#value[i] === color) {
              return true;
            }
        }
        return false;
    }

    getRandomColor(){
        return this.#colors.getRandomColor();
    }

    colorsToString(){
        return this.#colors.toString();
    }
}