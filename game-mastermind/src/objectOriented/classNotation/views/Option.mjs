export class Option {
    #title
    #value
    
    constructor(title, value) {
        this.#title = title;
        this.#value = value;
    }

    getValue(){
        return this.#value;
    }

    getTitle() {
        return this.#title;
    }
}