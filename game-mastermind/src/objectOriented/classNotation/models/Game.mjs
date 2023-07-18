import { SecretCombination } from './SecretCombination.mjs'
import { Board } from './Board.mjs'

export class Game {

    #board
    #state

    constructor(numPlayers){
        this.#board = new Board(new SecretCombination());
        this.#state = 2;
    }

    getBoard(){
        return this.#board;
    }

    checkEnd(){
        const STATES = { PLAYER_LOOSE: 0, PLAYER_WIN: 1, PLAYER_IN_GAME: 2 };

        if (this.#board.isLastProposedCombinationAWinner()) {
            this.#state = STATES.PLAYER_WIN
        } else if (this.#board.isComplete()) {
            this.#state  = STATES.PLAYER_LOOSE;
        } else{
            this.#state = STATES.PLAYER_IN_GAME;
        }
        return this.#state !== STATES.PLAYER_IN_GAME;
    }

    getState(){
        return this.#state;
    }
}