import { Player } from '../models/Player.mjs'
import { Color } from '../types/Color.mjs'

export class Turn {
    static NUMBER_PLAYERS  = 2;
    
    #board
    #players
    #activePlayer

    constructor(board){
        this.#board = board;
        this.#players = [new Player(Color.RED), new Player(Color.YELLOW)];
        this.#activePlayer = 0;
    }

    next() {
        this.#activePlayer = (this.#activePlayer + 1) % Turn.NUMBER_PLAYERS;
    }
    
    getToken() {
        return this.#players[this.#activePlayer].getColor();
    }

    coordinateColumnEmpty() {
        return this.#board.isLastCoordinateColumnEmpty();
    }
    
    getCoordinate() {
        return this.#board.getLastCoordinate();
    }
    
    putCoordinate() {
        this.#board.putLastCoordinate(this.getToken());
    }
}
