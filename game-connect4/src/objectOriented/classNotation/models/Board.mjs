import { Line } from './Line.mjs'
import { Direction } from '../types/Direction.mjs'
import { Coordinate } from '../types/Coordinate.mjs'


export class Board {
    static TOKEN_EMPTY = ` `;
    
    #tokens
    #lastCoordinate

    constructor(){
        this.#tokens = [];
        this.#lastCoordinate = new Coordinate();
        
        for (let i = 0; i < Coordinate.MAX_ROWS; i++) {
            this.#tokens[i] = [];
            for (let j = 0; j < Coordinate.MAX_COLUMNS; j++) {
                this.#tokens[i][j] = Board.TOKEN_EMPTY;
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
       return this.#tokens[0][this.#lastCoordinate.getColumn()] === Board.TOKEN_EMPTY;
    }
    
    putLastCoordinate(token){
        for (let i = this.getMaxRows()-1; i > -1 ; i--) {
            if(this.#tokens[i][this.#lastCoordinate.getColumn()] === Board.TOKEN_EMPTY){
                this.#tokens[i][this.#lastCoordinate.getColumn()] = token;
                this.#lastCoordinate.setRow(i);
                break;
            }
        }
    }
    
    isComplete(){
        for (let i = 0; i < this.getMaxColumns(); i++) {
            if (this.#tokens[0][i] === Board.TOKEN_EMPTY) {
              return false;
            }
        }
        return true;
    }
    
    isLastTokenInLine(){
        const directions = [ new Direction('NORTH', new Coordinate(1, 0)),
                             new Direction('NORTH_EAST', new Coordinate(1, 1)),
                             new Direction('EAST', new Coordinate(0, 1)),
                             new Direction('SOUTH_EAST', new Coordinate(-1, 1))]; 
    
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