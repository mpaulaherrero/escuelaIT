export class Direction{
    #name
    #coordinate

    constructor(name, coordinate) {
        this.#name = name;
        this.#coordinate = coordinate;
    }

    toString() {
        return `(${this.#name} -> direction: ${this.#coordinate.toString()}, oposite direction: ${this.#coordinate.getOposite().toString()})`;
    }
    
    getOpositeCoordinate() {
        return this.#coordinate.getOposite();
    }

    getCoordinate(){
        return this.#coordinate;
    }
}
