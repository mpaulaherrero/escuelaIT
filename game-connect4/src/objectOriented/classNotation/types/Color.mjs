export class Color {
    static RED = new Color(`Red`);
    static YELLOW = new Color(`Yellow`);
    static NULL = new Color(` `);
    
    #string;

    constructor(string) {
        this.#string = string;
    }

    getCode(){
        return this.#string[0];
    }

}    