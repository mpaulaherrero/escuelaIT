import { Coordinate } from '../types/Coordinate.mjs'

export class CoordinateView {
    #coordinate
    #console

    constructor(coordinate, console) {
        this.#coordinate = coordinate;
        this.#console = console;
    }    

    #read(title) {
        let column;
        let error;
        do {
            column = this.#console.readNumber(`${title}: `);
            error = column < Coordinate.MIN_COLUMNS || Coordinate.MAX_COLUMNS < column;
            if (error) {
                this.#console.writeln(`Por favor un numero entre  ${Coordinate.MIN_COLUMNS} y ${Coordinate.MAX_COLUMNS} inclusives`)
            }
        } while (error);
        return column
    }

    readColumn() {
        this.#coordinate.setColumn( this.#read(`Columna a colocar`) - 1);
    }    
}    
