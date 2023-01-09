import { Color } from '../types/Color.mjs'

export class Player{
    #color

    constructor(indexColor){
        this.#color = Color.get(indexColor);
    }
    
    getColor() {
        return this.#color
    }
}

