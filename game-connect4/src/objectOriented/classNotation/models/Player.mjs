export class Player{
    #color

    constructor(color){
        this.#color = color;
    }
    
    getColor() {
        return this.#color
    }
}

