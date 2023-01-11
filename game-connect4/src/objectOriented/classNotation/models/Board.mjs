import { Line } from './Line.mjs'
import { Direction } from '../types/Direction.mjs'
import { Coordinate } from '../types/Coordinate.mjs'
import { Color } from '../types/Color.mjs'


export class Board {
    #tokens
    #lastCoordinate

    constructor(){
        this.#tokens = [];
        this.#lastCoordinate = new Coordinate();
        
        for (let i = 0; i < Coordinate.MAX_ROWS; i++) {
            this.#tokens[i] = [];
            for (let j = 0; j < Coordinate.MAX_COLUMNS; j++) {
                this.#tokens[i][j] = Color.NULL;
            }
        }
    }

    getMaxRows(){
        return Coordinate.MAX_ROWS;
    }
    
    getMaxColumns(){
        return Coordinate.MAX_COLUMNS;
    }

    getLastCoordinate(){
        return this.#lastCoordinate;
    }
    
    getToken(row, column){
        return this.#tokens[row][column];
    }
    
    isLastCoordinateColumnEmpty(){
       return this.#tokens[0][this.#lastCoordinate.getColumn()] === Color.NULL;
    }
    
    putLastCoordinate(token){
        for (let i = this.getMaxRows()-1; i > -1 ; i--) {
            if(this.#tokens[i][this.#lastCoordinate.getColumn()] === Color.NULL){
                this.#tokens[i][this.#lastCoordinate.getColumn()] = token;
                this.#lastCoordinate.setRow(i);
                break;
            }
        }
    }

    putCoordinate(column, token){
        this.#lastCoordinate.setColumn(column);
        this.putLastCoordinate(token);
        return this.#lastCoordinate.getRow();
    }
    
    removeCoordinate(column){
        for (let i = 0; i < this.getMaxRows(); i++) {
            if(this.#tokens[i][column] !== Color.NULL){
                this.#tokens[i][column] = Color.NULL;
                break;
            }
        }
    }

    isComplete(){
        for (let i = 0; i < this.getMaxColumns(); i++) {
            if (this.isColumnEmpty(i)) {
              return false;
            }
        }
        return true;
    }
    
    isColumnEmpty(column) {
        return this.#tokens[0][column] === Color.NULL;
    }

    getEmptyColumns() {
        let emptyColumns = [];
        for (let i = 0; i < Coordinate.MAX_COLUMNS; i++) {
            if (this.isColumnEmpty(i)) {
                emptyColumns.push(i);
            }
        }
        return emptyColumns;
    }

    isLastTokenInLine(){
        const directions = Direction.getValues(); 
    
        for (let direction of directions) {
            const line = new Line(this.#lastCoordinate, direction);
            for(let i=0; i < Line.LENGTH; i++){
                if(this.isInLine(line)){
                    return true;
                }
                line.shift();
            }
        }
        return false;
    }
    
    isInLine (line) {
        for (let coordinate of line.getCoordinates()) { 
            if (!coordinate.isValid()) {
                return false;
            }
            if (this.getToken(coordinate.getRow(), coordinate.getColumn()) !== this.getToken(this.#lastCoordinate.getRow(), this.#lastCoordinate.getColumn())) {
                return false;
            }
        }
        return true;    
    }

} 