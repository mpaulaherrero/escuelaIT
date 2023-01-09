import { Board } from '../models/Board.mjs'
import { Turn } from '../models/Turn.mjs'

export class Game {
    #board
    #turn

    constructor(){
        this.#board = new Board();
        this.#turn = new Turn(this.#board,1);
    }

    getBoard(){
        return  this.#board;
    }

    getTurn(){
        return  this.#turn;
    }

    isFinished() {
        return this.#board.isComplete() || this.#board.isLastTokenInLine()
    }

    isWinner() {
        return this.#board.isLastTokenInLine()
    }

    getWinnerToken() {
        return this.#turn.getToken();
    }

    nextTurn() {
        this.#turn.next();
    }
}    
